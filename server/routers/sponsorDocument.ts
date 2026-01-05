import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import {
  createSponsorDocument,
  getSponsorDocumentById,
  getSponsorDocumentByToken,
  getAllSponsorDocuments,
  updateSponsorDocument,
  updateSponsorDocumentStatus,
  deleteSponsorDocument,
  createSponsorDocumentFile,
  getSponsorDocumentFilesByDocumentId,
  deleteSponsorDocumentFile,
  createSponsorDocumentShareLink,
  getSponsorDocumentShareLinkByToken,
  incrementShareLinkViewCount,
  revokeSponsorDocumentShareLink,
  getShareLinksByDocumentId,
} from "../db";
import { storagePut, storageGet, storageGetBuffer } from "../storage";
import archiver from "archiver";
import { notifyOwner } from "../_core/notification";
import crypto from "crypto";

// Helper function to get human-readable category name
const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    pay_stub: "Pay Stub",
    tax_return: "Tax Return",
    w2_form: "W-2 Form",
    bank_statement: "Bank Statement",
    employment_letter: "Employment Letter",
    lease_agreement: "Lease Agreement",
    mortgage_statement: "Mortgage Statement",
    utility_bill: "Utility Bill",
    property_deed: "Property Deed",
    id_document: "ID Document",
    immigration_status: "Immigration Status",
    other: "Other Document",
  };
  return labels[category] || category;
};

// Document categories
const documentCategories = [
  "pay_stub",
  "tax_return",
  "w2_form",
  "bank_statement",
  "employment_letter",
  "lease_agreement",
  "mortgage_statement",
  "utility_bill",
  "property_deed",
  "id_document",
  "immigration_status",
  "other",
] as const;

// Validation schemas
const createSponsorDocumentSchema = z.object({
  sponsorName: z.string().min(1, "Sponsor name is required"),
  sponsorEmail: z.string().email("Valid email is required"),
  sponsorPhone: z.string().optional(),
  respondentName: z.string().min(1, "Respondent name is required"),
  respondentANumber: z.string().optional(),
  sponsorLetterId: z.number().optional(),
});

const uploadFileSchema = z.object({
  accessToken: z.string().min(1, "Access token is required"),
  documentCategory: z.enum(documentCategories),
  documentName: z.string().min(1, "Document name is required"),
  description: z.string().optional(),
  fileName: z.string().min(1, "File name is required"),
  fileData: z.string().min(1, "File data is required"), // Base64 encoded
  mimeType: z.string().min(1, "MIME type is required"),
});

const createShareLinkSchema = z.object({
  sponsorDocumentId: z.number(),
  expiresInHours: z.number().min(1).max(720).default(72), // Max 30 days
  recipientName: z.string().optional(),
  recipientEmail: z.string().email().optional(),
  maxViews: z.number().min(0).max(100).optional(),
  password: z.string().min(4).max(50).optional(),
});

export const sponsorDocumentRouter = router({
  // Create a new sponsor document submission
  create: publicProcedure
    .input(createSponsorDocumentSchema)
    .mutation(async ({ input }) => {
      const doc = await createSponsorDocument(input);
      return doc;
    }),

  // Get sponsor document by access token (for sponsors to upload)
  getByToken: publicProcedure
    .input(z.object({ accessToken: z.string() }))
    .query(async ({ input }) => {
      const doc = await getSponsorDocumentByToken(input.accessToken);
      if (!doc) {
        throw new Error("Document submission not found");
      }
      
      // Get associated files
      const files = await getSponsorDocumentFilesByDocumentId(doc.id);
      
      return { ...doc, files };
    }),

  // Get sponsor document by ID (admin only)
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Admin access required");
      }
      
      const doc = await getSponsorDocumentById(input.id);
      if (!doc) {
        throw new Error("Document submission not found");
      }
      
      const files = await getSponsorDocumentFilesByDocumentId(doc.id);
      const shareLinks = await getShareLinksByDocumentId(doc.id);
      
      return { ...doc, files, shareLinks };
    }),

  // Get all sponsor documents (admin only)
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Admin access required");
      }
      
      const docs = await getAllSponsorDocuments();
      
      // Get file counts for each document
      const docsWithCounts = await Promise.all(
        docs.map(async (doc) => {
          const files = await getSponsorDocumentFilesByDocumentId(doc.id);
          return { ...doc, fileCount: files.length };
        })
      );
      
      return docsWithCounts;
    }),

  // Upload a file to a sponsor document submission
  uploadFile: publicProcedure
    .input(uploadFileSchema)
    .mutation(async ({ input }) => {
      // Verify the access token
      const doc = await getSponsorDocumentByToken(input.accessToken);
      if (!doc) {
        throw new Error("Invalid access token");
      }
      
      // Decode base64 file data
      const fileBuffer = Buffer.from(input.fileData, "base64");
      const fileSize = fileBuffer.length;
      
      // Validate file size (max 10MB)
      if (fileSize > 10 * 1024 * 1024) {
        throw new Error("File size exceeds 10MB limit");
      }
      
      // Generate unique file key
      const timestamp = Date.now();
      const randomId = crypto.randomBytes(8).toString("hex");
      const sanitizedFileName = input.fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
      const fileKey = `sponsor-documents/${doc.id}/${timestamp}-${randomId}-${sanitizedFileName}`;
      
      // Upload to S3
      const { url } = await storagePut(fileKey, fileBuffer, input.mimeType);
      
      // Create file record
      const file = await createSponsorDocumentFile({
        sponsorDocumentId: doc.id,
        documentCategory: input.documentCategory,
        documentName: input.documentName,
        description: input.description || null,
        fileKey,
        fileUrl: url,
        fileName: input.fileName,
        fileSize,
        mimeType: input.mimeType,
      });
      
      return file;
    }),

  // Delete a file from a sponsor document submission
  deleteFile: publicProcedure
    .input(z.object({
      accessToken: z.string(),
      fileId: z.number(),
    }))
    .mutation(async ({ input }) => {
      // Verify the access token
      const doc = await getSponsorDocumentByToken(input.accessToken);
      if (!doc) {
        throw new Error("Invalid access token");
      }
      
      // Verify the file belongs to this document
      const files = await getSponsorDocumentFilesByDocumentId(doc.id);
      const file = files.find(f => f.id === input.fileId);
      if (!file) {
        throw new Error("File not found or access denied");
      }
      
      // Delete the file record (S3 file will remain for audit purposes)
      await deleteSponsorDocumentFile(input.fileId);
      
      return { success: true };
    }),

  // Submit the document package (mark as submitted)
  submit: publicProcedure
    .input(z.object({ accessToken: z.string() }))
    .mutation(async ({ input }) => {
      const doc = await getSponsorDocumentByToken(input.accessToken);
      if (!doc) {
        throw new Error("Invalid access token");
      }
      
      // Verify at least one file has been uploaded
      const files = await getSponsorDocumentFilesByDocumentId(doc.id);
      if (files.length === 0) {
        throw new Error("Please upload at least one document before submitting");
      }
      
      // Update status to submitted
      const updated = await updateSponsorDocumentStatus(doc.id, "submitted");
      
      // Build document list for notification
      const documentList = files.map(f => `• ${getCategoryLabel(f.documentCategory)}: ${f.documentName}`).join("\n");
      
      // Send notification to legal team
      await notifyOwner({
        title: "New Sponsor Documents Submitted",
        content: `A sponsor has submitted their document package for review.\n\n` +
          `**Sponsor:** ${doc.sponsorName}\n` +
          `**Email:** ${doc.sponsorEmail}\n` +
          `**Phone:** ${doc.sponsorPhone || "Not provided"}\n\n` +
          `**Respondent:** ${doc.respondentName}\n` +
          `**A-Number:** ${doc.respondentANumber || "Not provided"}\n\n` +
          `**Documents Uploaded (${files.length}):**\n${documentList}\n\n` +
          `Please review these documents in the admin dashboard.`,
      });
      
      return updated;
    }),

  // Update document status (admin only)
  updateStatus: protectedProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "submitted", "reviewed", "approved", "rejected"]),
      adminNotes: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Admin access required");
      }
      
      const updated = await updateSponsorDocumentStatus(
        input.id,
        input.status,
        input.adminNotes,
        ctx.user.id
      );
      
      return updated;
    }),

  // Delete a sponsor document submission (admin only)
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Admin access required");
      }
      
      const success = await deleteSponsorDocument(input.id);
      return { success };
    }),

  // Create a share link for a document (admin only)
  createShareLink: protectedProcedure
    .input(createShareLinkSchema)
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Admin access required");
      }
      
      const link = await createSponsorDocumentShareLink(
        input.sponsorDocumentId,
        input.expiresInHours,
        input.recipientName,
        input.recipientEmail,
        input.maxViews,
        input.password
      );
      
      return link;
    }),

  // Access shared documents via share link
  accessSharedDocuments: publicProcedure
    .input(z.object({
      shareToken: z.string(),
      password: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const link = await getSponsorDocumentShareLinkByToken(input.shareToken);
      
      if (!link) {
        throw new Error("Share link not found");
      }
      
      if (!link.isActive) {
        throw new Error("This share link has been revoked");
      }
      
      if (new Date() > link.expiresAt) {
        throw new Error("This share link has expired");
      }
      
      if (link.maxViews && link.maxViews > 0 && link.viewCount >= link.maxViews) {
        throw new Error("This share link has reached its view limit");
      }
      
      // Check password if required
      if (link.passwordHash) {
        if (!input.password) {
          throw new Error("Password required");
        }
        const inputHash = crypto.createHash("sha256").update(input.password).digest("hex");
        if (inputHash !== link.passwordHash) {
          throw new Error("Incorrect password");
        }
      }
      
      // Get the document and files
      const doc = await getSponsorDocumentById(link.sponsorDocumentId);
      if (!doc) {
        throw new Error("Document not found");
      }
      
      const files = await getSponsorDocumentFilesByDocumentId(doc.id);
      
      // Increment view count
      await incrementShareLinkViewCount(input.shareToken);
      
      // Return limited information
      return {
        sponsorName: doc.sponsorName,
        respondentName: doc.respondentName,
        status: doc.status,
        files: files.map(f => ({
          id: f.id,
          documentCategory: f.documentCategory,
          documentName: f.documentName,
          fileName: f.fileName,
          fileSize: f.fileSize,
          mimeType: f.mimeType,
          fileUrl: f.fileUrl,
          uploadedAt: f.uploadedAt,
        })),
      };
    }),

  // Revoke a share link (admin only)
  revokeShareLink: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Admin access required");
      }
      
      const success = await revokeSponsorDocumentShareLink(input.id);
      return { success };
    }),

  // Generate a ZIP file containing all documents for a submission (admin only)
  generateBulkDownloadZip: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Admin access required");
      }
      
      const doc = await getSponsorDocumentById(input.id);
      if (!doc) {
        throw new Error("Document not found");
      }
      
      const files = await getSponsorDocumentFilesByDocumentId(doc.id);
      if (files.length === 0) {
        throw new Error("No files to download");
      }
      
      // Create ZIP archive in memory
      const archive = archiver('zip', { zlib: { level: 9 } });
      const chunks: Buffer[] = [];
      
      archive.on('data', (chunk: Buffer) => chunks.push(chunk));
      
      // Add each file to the archive
      for (const file of files) {
        try {
          // Fetch file contents using storage helper
          const fileBuffer = await storageGetBuffer(file.fileKey);
          
          // Create a sanitized filename with category prefix
          const categoryLabel = getCategoryLabel(file.documentCategory);
          const sanitizedName = `${categoryLabel}/${file.documentName || file.fileName}`;
          
          archive.append(fileBuffer, { name: sanitizedName });
        } catch (error) {
          console.error(`Failed to fetch file ${file.fileKey}:`, error);
          // Continue with other files
        }
      }
      
      // Finalize the archive
      await archive.finalize();
      
      // Wait for all data to be collected
      await new Promise<void>((resolve, reject) => {
        archive.on('end', resolve);
        archive.on('error', reject);
      });
      
      const zipBuffer = Buffer.concat(chunks);
      
      // Upload ZIP to S3 with a temporary key
      const zipKey = `sponsor-documents/bulk-downloads/${doc.id}-${Date.now()}.zip`;
      const zipFileName = `${doc.sponsorName.replace(/[^a-zA-Z0-9]/g, '_')}_${doc.respondentName.replace(/[^a-zA-Z0-9]/g, '_')}_documents.zip`;
      
      await storagePut(zipKey, zipBuffer, 'application/zip');
      
      // Get presigned URL for download
      const { url } = await storageGet(zipKey);
      
      return {
        downloadUrl: url,
        fileName: zipFileName,
        fileCount: files.length,
        totalSize: zipBuffer.length,
      };
    }),

  // Get a presigned URL for downloading a file
  getFileDownloadUrl: publicProcedure
    .input(z.object({
      accessToken: z.string().optional(),
      shareToken: z.string().optional(),
      fileId: z.number(),
    }))
    .query(async ({ input }) => {
      let doc: Awaited<ReturnType<typeof getSponsorDocumentById>> = null;
      
      if (input.accessToken) {
        doc = await getSponsorDocumentByToken(input.accessToken);
      } else if (input.shareToken) {
        const link = await getSponsorDocumentShareLinkByToken(input.shareToken);
        if (link && link.isActive && new Date() <= link.expiresAt) {
          doc = await getSponsorDocumentById(link.sponsorDocumentId);
        }
      }
      
      if (!doc) {
        throw new Error("Access denied");
      }
      
      const files = await getSponsorDocumentFilesByDocumentId(doc.id);
      const file = files.find(f => f.id === input.fileId);
      
      if (!file) {
        throw new Error("File not found");
      }
      
      // Get presigned download URL
      const { url } = await storageGet(file.fileKey);
      
      return { url, fileName: file.fileName, mimeType: file.mimeType };
    }),
});
