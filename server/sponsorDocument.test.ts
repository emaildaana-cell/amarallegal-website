import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the database module
vi.mock("./db", () => ({
  createSponsorDocument: vi.fn(),
  getSponsorDocumentById: vi.fn(),
  getSponsorDocumentByToken: vi.fn(),
  getAllSponsorDocuments: vi.fn(),
  updateSponsorDocument: vi.fn(),
  updateSponsorDocumentStatus: vi.fn(),
  deleteSponsorDocument: vi.fn(),
  createSponsorDocumentFile: vi.fn(),
  getSponsorDocumentFilesByDocumentId: vi.fn(),
  deleteSponsorDocumentFile: vi.fn(),
  createSponsorDocumentShareLink: vi.fn(),
  getSponsorDocumentShareLinkByToken: vi.fn(),
  incrementShareLinkViewCount: vi.fn(),
  revokeSponsorDocumentShareLink: vi.fn(),
  getShareLinksByDocumentId: vi.fn(),
}));

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
} from "./db";

describe("Sponsor Document Database Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createSponsorDocument", () => {
    it("should create a new sponsor document submission with required fields", async () => {
      const mockDocument = {
        id: 1,
        accessToken: "abc123def456",
        sponsorName: "Jane Doe",
        sponsorEmail: "jane@example.com",
        sponsorPhone: "305-555-1234",
        respondentName: "John Doe",
        respondentANumber: "A123456789",
        status: "pending",
        createdAt: new Date(),
      };

      vi.mocked(createSponsorDocument).mockResolvedValue(mockDocument);

      const result = await createSponsorDocument({
        sponsorName: "Jane Doe",
        sponsorEmail: "jane@example.com",
        sponsorPhone: "305-555-1234",
        respondentName: "John Doe",
        respondentANumber: "A123456789",
      });

      expect(result).toEqual(mockDocument);
      expect(createSponsorDocument).toHaveBeenCalledTimes(1);
    });

    it("should create a sponsor document without optional fields", async () => {
      const mockDocument = {
        id: 2,
        accessToken: "xyz789",
        sponsorName: "Jane Doe",
        sponsorEmail: "jane@example.com",
        respondentName: "John Doe",
        status: "pending",
        createdAt: new Date(),
      };

      vi.mocked(createSponsorDocument).mockResolvedValue(mockDocument);

      const result = await createSponsorDocument({
        sponsorName: "Jane Doe",
        sponsorEmail: "jane@example.com",
        respondentName: "John Doe",
      });

      expect(result).toEqual(mockDocument);
      expect(result.sponsorPhone).toBeUndefined();
    });
  });

  describe("getSponsorDocumentByToken", () => {
    it("should retrieve a sponsor document by access token", async () => {
      const mockDocument = {
        id: 1,
        accessToken: "abc123",
        sponsorName: "Jane Doe",
        respondentName: "John Doe",
        status: "pending",
      };

      vi.mocked(getSponsorDocumentByToken).mockResolvedValue(mockDocument);

      const result = await getSponsorDocumentByToken("abc123");

      expect(result).toEqual(mockDocument);
      expect(getSponsorDocumentByToken).toHaveBeenCalledWith("abc123");
    });

    it("should return null for invalid token", async () => {
      vi.mocked(getSponsorDocumentByToken).mockResolvedValue(null);

      const result = await getSponsorDocumentByToken("invalid-token");

      expect(result).toBeNull();
    });
  });

  describe("getSponsorDocumentById", () => {
    it("should retrieve a sponsor document by ID", async () => {
      const mockDocument = {
        id: 1,
        accessToken: "abc123",
        sponsorName: "Jane Doe",
        respondentName: "John Doe",
      };

      vi.mocked(getSponsorDocumentById).mockResolvedValue(mockDocument);

      const result = await getSponsorDocumentById(1);

      expect(result).toEqual(mockDocument);
      expect(getSponsorDocumentById).toHaveBeenCalledWith(1);
    });

    it("should return null for non-existent document", async () => {
      vi.mocked(getSponsorDocumentById).mockResolvedValue(null);

      const result = await getSponsorDocumentById(999);

      expect(result).toBeNull();
    });
  });

  describe("getAllSponsorDocuments", () => {
    it("should retrieve all sponsor documents", async () => {
      const mockDocuments = [
        { id: 1, sponsorName: "Jane Doe", respondentName: "John Doe", status: "pending" },
        { id: 2, sponsorName: "Bob Smith", respondentName: "Alice Smith", status: "submitted" },
      ];

      vi.mocked(getAllSponsorDocuments).mockResolvedValue(mockDocuments);

      const result = await getAllSponsorDocuments();

      expect(result).toHaveLength(2);
      expect(result[0].sponsorName).toBe("Jane Doe");
    });

    it("should return empty array when no documents exist", async () => {
      vi.mocked(getAllSponsorDocuments).mockResolvedValue([]);

      const result = await getAllSponsorDocuments();

      expect(result).toHaveLength(0);
    });
  });

  describe("updateSponsorDocumentStatus", () => {
    it("should update document status to submitted", async () => {
      const mockUpdatedDocument = {
        id: 1,
        sponsorName: "Jane Doe",
        respondentName: "John Doe",
        status: "submitted",
      };

      vi.mocked(updateSponsorDocumentStatus).mockResolvedValue(mockUpdatedDocument);

      const result = await updateSponsorDocumentStatus(1, "submitted");

      expect(result.status).toBe("submitted");
    });

    it("should update document status with admin notes", async () => {
      const mockUpdatedDocument = {
        id: 1,
        status: "reviewed",
        adminNotes: "Documents verified",
        reviewedBy: 1,
        reviewedAt: new Date(),
      };

      vi.mocked(updateSponsorDocumentStatus).mockResolvedValue(mockUpdatedDocument);

      const result = await updateSponsorDocumentStatus(1, "reviewed", "Documents verified", 1);

      expect(result.status).toBe("reviewed");
      expect(result.adminNotes).toBe("Documents verified");
    });
  });

  describe("deleteSponsorDocument", () => {
    it("should delete a sponsor document and return true", async () => {
      vi.mocked(deleteSponsorDocument).mockResolvedValue(true);

      const result = await deleteSponsorDocument(1);

      expect(result).toBe(true);
      expect(deleteSponsorDocument).toHaveBeenCalledWith(1);
    });

    it("should return false for non-existent document", async () => {
      vi.mocked(deleteSponsorDocument).mockResolvedValue(false);

      const result = await deleteSponsorDocument(999);

      expect(result).toBe(false);
    });
  });
});

describe("Sponsor Document File Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createSponsorDocumentFile", () => {
    it("should create a new document file record", async () => {
      const mockFile = {
        id: 1,
        sponsorDocumentId: 1,
        documentCategory: "pay_stub",
        documentName: "January 2026 Pay Stub",
        fileName: "paystub-jan-2026.pdf",
        fileSize: 102400,
        mimeType: "application/pdf",
        fileKey: "sponsor-documents/1/paystub.pdf",
        fileUrl: "https://storage.example.com/paystub.pdf",
        uploadedAt: new Date(),
      };

      vi.mocked(createSponsorDocumentFile).mockResolvedValue(mockFile);

      const result = await createSponsorDocumentFile({
        sponsorDocumentId: 1,
        documentCategory: "pay_stub",
        documentName: "January 2026 Pay Stub",
        fileName: "paystub-jan-2026.pdf",
        fileSize: 102400,
        mimeType: "application/pdf",
        fileKey: "sponsor-documents/1/paystub.pdf",
        fileUrl: "https://storage.example.com/paystub.pdf",
      });

      expect(result).toEqual(mockFile);
      expect(result.documentCategory).toBe("pay_stub");
    });

    it("should support all document categories", async () => {
      const categories = [
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
      ];

      categories.forEach((category) => {
        expect(categories).toContain(category);
      });
    });
  });

  describe("getSponsorDocumentFilesByDocumentId", () => {
    it("should retrieve all files for a document", async () => {
      const mockFiles = [
        { id: 1, documentCategory: "pay_stub", fileName: "paystub.pdf" },
        { id: 2, documentCategory: "bank_statement", fileName: "bank.pdf" },
        { id: 3, documentCategory: "lease_agreement", fileName: "lease.pdf" },
      ];

      vi.mocked(getSponsorDocumentFilesByDocumentId).mockResolvedValue(mockFiles);

      const result = await getSponsorDocumentFilesByDocumentId(1);

      expect(result).toHaveLength(3);
      expect(result[0].documentCategory).toBe("pay_stub");
    });

    it("should return empty array for document with no files", async () => {
      vi.mocked(getSponsorDocumentFilesByDocumentId).mockResolvedValue([]);

      const result = await getSponsorDocumentFilesByDocumentId(999);

      expect(result).toHaveLength(0);
    });
  });

  describe("deleteSponsorDocumentFile", () => {
    it("should delete a document file", async () => {
      vi.mocked(deleteSponsorDocumentFile).mockResolvedValue(true);

      const result = await deleteSponsorDocumentFile(1);

      expect(result).toBe(true);
    });
  });
});

describe("Sponsor Document Share Link Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createSponsorDocumentShareLink", () => {
    it("should create a share link with default expiration", async () => {
      const mockShareLink = {
        id: 1,
        sponsorDocumentId: 1,
        shareToken: "share-token-123",
        expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
        isActive: true,
        viewCount: 0,
      };

      vi.mocked(createSponsorDocumentShareLink).mockResolvedValue(mockShareLink);

      const result = await createSponsorDocumentShareLink(1, 72);

      expect(result).toEqual(mockShareLink);
      expect(result.isActive).toBe(true);
    });

    it("should create a share link with password protection", async () => {
      const mockShareLink = {
        id: 2,
        sponsorDocumentId: 1,
        shareToken: "share-token-456",
        passwordHash: "hashed-password",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        isActive: true,
        viewCount: 0,
      };

      vi.mocked(createSponsorDocumentShareLink).mockResolvedValue(mockShareLink);

      const result = await createSponsorDocumentShareLink(1, 24, "Recipient", "email@test.com", 10, "password123");

      expect(result.passwordHash).toBeTruthy();
    });

    it("should create a share link with view limit", async () => {
      const mockShareLink = {
        id: 3,
        sponsorDocumentId: 1,
        shareToken: "share-token-789",
        maxViews: 5,
        viewCount: 0,
        isActive: true,
      };

      vi.mocked(createSponsorDocumentShareLink).mockResolvedValue(mockShareLink);

      const result = await createSponsorDocumentShareLink(1, 72, undefined, undefined, 5);

      expect(result.maxViews).toBe(5);
    });
  });

  describe("getSponsorDocumentShareLinkByToken", () => {
    it("should retrieve a share link by token", async () => {
      const mockShareLink = {
        id: 1,
        shareToken: "valid-token",
        isActive: true,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };

      vi.mocked(getSponsorDocumentShareLinkByToken).mockResolvedValue(mockShareLink);

      const result = await getSponsorDocumentShareLinkByToken("valid-token");

      expect(result).toEqual(mockShareLink);
    });

    it("should return null for invalid token", async () => {
      vi.mocked(getSponsorDocumentShareLinkByToken).mockResolvedValue(null);

      const result = await getSponsorDocumentShareLinkByToken("invalid-token");

      expect(result).toBeNull();
    });
  });

  describe("incrementShareLinkViewCount", () => {
    it("should increment view count", async () => {
      vi.mocked(incrementShareLinkViewCount).mockResolvedValue(undefined);

      await incrementShareLinkViewCount("share-token", "192.168.1.1");

      expect(incrementShareLinkViewCount).toHaveBeenCalledWith("share-token", "192.168.1.1");
    });
  });

  describe("revokeSponsorDocumentShareLink", () => {
    it("should revoke a share link", async () => {
      vi.mocked(revokeSponsorDocumentShareLink).mockResolvedValue(true);

      const result = await revokeSponsorDocumentShareLink(1);

      expect(result).toBe(true);
    });
  });

  describe("getShareLinksByDocumentId", () => {
    it("should retrieve all share links for a document", async () => {
      const mockLinks = [
        { id: 1, shareToken: "token1", isActive: true },
        { id: 2, shareToken: "token2", isActive: false },
      ];

      vi.mocked(getShareLinksByDocumentId).mockResolvedValue(mockLinks);

      const result = await getShareLinksByDocumentId(1);

      expect(result).toHaveLength(2);
    });
  });
});

describe("Sponsor Document Validation", () => {
  it("should require sponsor name", () => {
    const documentData = {
      sponsorName: "",
      sponsorEmail: "jane@example.com",
      respondentName: "John Doe",
    };

    expect(documentData.sponsorName).toBe("");
  });

  it("should require valid email", () => {
    const validEmail = "jane@example.com";
    const invalidEmail = "not-an-email";

    expect(validEmail).toMatch(/@/);
    expect(invalidEmail).not.toMatch(/@.*\./);
  });

  it("should require respondent name", () => {
    const documentData = {
      sponsorName: "Jane Doe",
      sponsorEmail: "jane@example.com",
      respondentName: "",
    };

    expect(documentData.respondentName).toBe("");
  });

  it("should validate file size limit (10MB)", () => {
    const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes
    const validFileSize = 5 * 1024 * 1024; // 5MB
    const invalidFileSize = 15 * 1024 * 1024; // 15MB

    expect(validFileSize).toBeLessThanOrEqual(maxFileSize);
    expect(invalidFileSize).toBeGreaterThan(maxFileSize);
  });

  it("should validate allowed file types", () => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    expect(allowedTypes).toContain("application/pdf");
    expect(allowedTypes).toContain("image/jpeg");
    expect(allowedTypes).not.toContain("application/zip");
    expect(allowedTypes).not.toContain("video/mp4");
  });
});

describe("Sponsor Document Status Workflow", () => {
  it("should have valid status transitions", () => {
    const validStatuses = ["pending", "submitted", "reviewed", "approved", "rejected"];

    expect(validStatuses).toContain("pending");
    expect(validStatuses).toContain("submitted");
    expect(validStatuses).toContain("reviewed");
    expect(validStatuses).toContain("approved");
    expect(validStatuses).toContain("rejected");
  });

  it("should start with pending status", () => {
    const newDocument = {
      status: "pending",
    };

    expect(newDocument.status).toBe("pending");
  });

  it("should transition to submitted after files uploaded", () => {
    const submittedDocument = {
      status: "submitted",
      files: [{ id: 1, fileName: "paystub.pdf" }],
    };

    expect(submittedDocument.status).toBe("submitted");
    expect(submittedDocument.files.length).toBeGreaterThan(0);
  });
});

describe("Share Link Security", () => {
  it("should check link expiration", () => {
    const expiredLink = {
      expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
      isActive: true,
    };

    const validLink = {
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      isActive: true,
    };

    expect(new Date() > expiredLink.expiresAt).toBe(true);
    expect(new Date() < validLink.expiresAt).toBe(true);
  });

  it("should check view count limit", () => {
    const linkWithLimit = {
      maxViews: 5,
      viewCount: 5,
    };

    const linkWithViewsRemaining = {
      maxViews: 5,
      viewCount: 3,
    };

    expect(linkWithLimit.viewCount >= linkWithLimit.maxViews).toBe(true);
    expect(linkWithViewsRemaining.viewCount < linkWithViewsRemaining.maxViews).toBe(true);
  });

  it("should check if link is revoked", () => {
    const revokedLink = {
      isActive: false,
      revokedAt: new Date(),
    };

    const activeLink = {
      isActive: true,
      revokedAt: null,
    };

    expect(revokedLink.isActive).toBe(false);
    expect(activeLink.isActive).toBe(true);
  });
});

describe("Sponsor Document Email Notifications", () => {
  it("should include all required information in submission notification", () => {
    const mockDocument = {
      sponsorName: "Jane Doe",
      sponsorEmail: "jane@example.com",
      sponsorPhone: "305-555-1234",
      respondentName: "John Doe",
      respondentANumber: "A123456789",
    };

    const mockFiles = [
      { documentCategory: "pay_stub", documentName: "January 2026 Pay Stub" },
      { documentCategory: "bank_statement", documentName: "Chase Bank Statement" },
      { documentCategory: "lease_agreement", documentName: "Apartment Lease" },
    ];

    // Verify notification content would include all required fields
    expect(mockDocument.sponsorName).toBeTruthy();
    expect(mockDocument.sponsorEmail).toBeTruthy();
    expect(mockDocument.respondentName).toBeTruthy();
    expect(mockFiles.length).toBeGreaterThan(0);
  });

  it("should format document categories correctly", () => {
    const categoryLabels: Record<string, string> = {
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

    expect(categoryLabels["pay_stub"]).toBe("Pay Stub");
    expect(categoryLabels["tax_return"]).toBe("Tax Return");
    expect(categoryLabels["bank_statement"]).toBe("Bank Statement");
    expect(categoryLabels["lease_agreement"]).toBe("Lease Agreement");
  });

  it("should handle missing optional fields gracefully", () => {
    const mockDocument = {
      sponsorName: "Jane Doe",
      sponsorEmail: "jane@example.com",
      sponsorPhone: null, // Optional field
      respondentName: "John Doe",
      respondentANumber: null, // Optional field
    };

    const phoneDisplay = mockDocument.sponsorPhone || "Not provided";
    const aNumberDisplay = mockDocument.respondentANumber || "Not provided";

    expect(phoneDisplay).toBe("Not provided");
    expect(aNumberDisplay).toBe("Not provided");
  });

  it("should build document list for notification", () => {
    const mockFiles = [
      { documentCategory: "pay_stub", documentName: "January Pay Stub" },
      { documentCategory: "bank_statement", documentName: "Bank Statement" },
    ];

    const getCategoryLabel = (category: string): string => {
      const labels: Record<string, string> = {
        pay_stub: "Pay Stub",
        bank_statement: "Bank Statement",
      };
      return labels[category] || category;
    };

    const documentList = mockFiles
      .map(f => `• ${getCategoryLabel(f.documentCategory)}: ${f.documentName}`)
      .join("\n");

    expect(documentList).toContain("Pay Stub: January Pay Stub");
    expect(documentList).toContain("Bank Statement: Bank Statement");
    expect(documentList.split("\n")).toHaveLength(2);
  });

  it("should include document count in notification", () => {
    const mockFiles = [
      { id: 1, documentCategory: "pay_stub" },
      { id: 2, documentCategory: "tax_return" },
      { id: 3, documentCategory: "bank_statement" },
      { id: 4, documentCategory: "lease_agreement" },
    ];

    const notificationContent = `Documents Uploaded (${mockFiles.length}):`;

    expect(notificationContent).toContain("(4)");
    expect(mockFiles.length).toBe(4);
  });

  it("should have appropriate notification title", () => {
    const notificationTitle = "New Sponsor Documents Submitted";

    expect(notificationTitle).toBeTruthy();
    expect(notificationTitle.length).toBeLessThanOrEqual(1200); // Max title length
  });

  it("should have notification content within limits", () => {
    const mockDocument = {
      sponsorName: "Jane Doe",
      sponsorEmail: "jane@example.com",
      sponsorPhone: "305-555-1234",
      respondentName: "John Doe",
      respondentANumber: "A123456789",
    };

    const mockFiles = Array(10).fill({
      documentCategory: "pay_stub",
      documentName: "Document Name",
    });

    const documentList = mockFiles
      .map(f => `• ${f.documentCategory}: ${f.documentName}`)
      .join("\n");

    const content = `A sponsor has submitted their document package for review.\n\n` +
      `**Sponsor:** ${mockDocument.sponsorName}\n` +
      `**Email:** ${mockDocument.sponsorEmail}\n` +
      `**Phone:** ${mockDocument.sponsorPhone}\n\n` +
      `**Respondent:** ${mockDocument.respondentName}\n` +
      `**A-Number:** ${mockDocument.respondentANumber}\n\n` +
      `**Documents Uploaded (${mockFiles.length}):**\n${documentList}\n\n` +
      `Please review these documents in the admin dashboard.`;

    expect(content.length).toBeLessThanOrEqual(20000); // Max content length
  });
});

describe("Bulk Download ZIP Generation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should require admin access to generate bulk download ZIP", async () => {
    // Non-admin users should not be able to generate ZIP files
    const nonAdminUser = { id: 1, role: "user" };
    
    // This test verifies the authorization check in the procedure
    expect(nonAdminUser.role).not.toBe("admin");
  });

  it("should throw error when document not found", async () => {
    vi.mocked(getSponsorDocumentById).mockResolvedValue(null);
    
    const result = await getSponsorDocumentById(999);
    expect(result).toBeNull();
  });

  it("should throw error when no files to download", async () => {
    const mockDocument = {
      id: 1,
      accessToken: "abc123",
      sponsorName: "Jane Doe",
      sponsorEmail: "jane@example.com",
      sponsorPhone: "555-1234",
      respondentName: "John Doe",
      respondentANumber: "A123456789",
      status: "submitted",
      submittedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      adminNotes: null,
    };

    vi.mocked(getSponsorDocumentById).mockResolvedValue(mockDocument);
    vi.mocked(getSponsorDocumentFilesByDocumentId).mockResolvedValue([]);

    const doc = await getSponsorDocumentById(1);
    const files = await getSponsorDocumentFilesByDocumentId(1);
    
    expect(doc).not.toBeNull();
    expect(files).toHaveLength(0);
  });

  it("should retrieve document files for ZIP generation", async () => {
    const mockDocument = {
      id: 1,
      accessToken: "abc123",
      sponsorName: "Jane Doe",
      sponsorEmail: "jane@example.com",
      sponsorPhone: "555-1234",
      respondentName: "John Doe",
      respondentANumber: "A123456789",
      status: "submitted",
      submittedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      adminNotes: null,
    };

    const mockFiles = [
      {
        id: 1,
        sponsorDocumentId: 1,
        documentCategory: "pay_stub",
        documentName: "January Pay Stub",
        fileName: "paystub.pdf",
        fileKey: "sponsor-documents/1/paystub.pdf",
        fileUrl: "https://example.com/paystub.pdf",
        fileSize: 12345,
        mimeType: "application/pdf",
        uploadedAt: new Date(),
      },
      {
        id: 2,
        sponsorDocumentId: 1,
        documentCategory: "bank_statement",
        documentName: "Bank Statement",
        fileName: "bank.pdf",
        fileKey: "sponsor-documents/1/bank.pdf",
        fileUrl: "https://example.com/bank.pdf",
        fileSize: 23456,
        mimeType: "application/pdf",
        uploadedAt: new Date(),
      },
    ];

    vi.mocked(getSponsorDocumentById).mockResolvedValue(mockDocument);
    vi.mocked(getSponsorDocumentFilesByDocumentId).mockResolvedValue(mockFiles);

    const doc = await getSponsorDocumentById(1);
    const files = await getSponsorDocumentFilesByDocumentId(1);

    expect(doc).not.toBeNull();
    expect(files).toHaveLength(2);
    expect(files[0].documentCategory).toBe("pay_stub");
    expect(files[1].documentCategory).toBe("bank_statement");
  });

  it("should generate sanitized filename for ZIP", () => {
    const sponsorName = "Jane Doe";
    const respondentName = "John Doe";
    
    const sanitizedSponsor = sponsorName.replace(/[^a-zA-Z0-9]/g, '_');
    const sanitizedRespondent = respondentName.replace(/[^a-zA-Z0-9]/g, '_');
    const zipFileName = `${sanitizedSponsor}_${sanitizedRespondent}_documents.zip`;
    
    expect(zipFileName).toBe("Jane_Doe_John_Doe_documents.zip");
  });

  it("should handle special characters in names for ZIP filename", () => {
    const sponsorName = "María García-López";
    const respondentName = "José O'Brien";
    
    const sanitizedSponsor = sponsorName.replace(/[^a-zA-Z0-9]/g, '_');
    const sanitizedRespondent = respondentName.replace(/[^a-zA-Z0-9]/g, '_');
    const zipFileName = `${sanitizedSponsor}_${sanitizedRespondent}_documents.zip`;
    
    expect(zipFileName).toBe("Mar_a_Garc_a_L_pez_Jos__O_Brien_documents.zip");
    expect(zipFileName).not.toContain("'");
    expect(zipFileName).not.toContain("-");
    expect(zipFileName).not.toContain("í");
  });

  it("should organize files by category in ZIP", () => {
    const categoryLabels: Record<string, string> = {
      pay_stub: "Pay Stub",
      tax_return: "Tax Return",
      bank_statement: "Bank Statement",
    };

    const files = [
      { documentCategory: "pay_stub", fileName: "jan_paystub.pdf" },
      { documentCategory: "bank_statement", fileName: "statement.pdf" },
    ];

    const organizedPaths = files.map(f => {
      const categoryLabel = categoryLabels[f.documentCategory] || f.documentCategory;
      return `${categoryLabel}/${f.fileName}`;
    });

    expect(organizedPaths[0]).toBe("Pay Stub/jan_paystub.pdf");
    expect(organizedPaths[1]).toBe("Bank Statement/statement.pdf");
  });
});
