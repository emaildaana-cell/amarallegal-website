import { z } from "zod";
import { router, publicProcedure, protectedProcedure, adminProcedure } from "../_core/trpc";
import {
  createCharacterReferenceLetter,
  getCharacterReferenceLetterByToken,
  getCharacterReferenceLetterById,
  getAllCharacterReferenceLetters,
  updateCharacterReferenceLetter,
  signCharacterReferenceLetter,
  updateCharacterReferenceLetterPdf,
  deleteCharacterReferenceLetter,
} from "../db";
import { storagePut } from "../storage";

export const characterLetterRouter = router({
  // Admin: Create a new letter request
  create: adminProcedure
    .input(z.object({
      respondentName: z.string().min(1, "Respondent name is required"),
      caseType: z.enum(["bond_hearing", "asylum", "cancellation_of_removal", "adjustment_of_status", "naturalization", "waiver", "other"]).optional(),
      caseId: z.string().optional(),
      language: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const letter = await createCharacterReferenceLetter({
        ...input,
        requestedBy: ctx.user.id,
      });
      
      if (!letter) {
        throw new Error("Failed to create character reference letter request");
      }
      
      return letter;
    }),

  // Public: Get letter by access token (for filling out)
  getByToken: publicProcedure
    .input(z.object({
      accessToken: z.string(),
    }))
    .query(async ({ input }) => {
      const letter = await getCharacterReferenceLetterByToken(input.accessToken);
      
      if (!letter) {
        throw new Error("Letter not found or invalid token");
      }
      
      return letter;
    }),

  // Admin: Get letter by ID
  getById: adminProcedure
    .input(z.object({
      id: z.number(),
    }))
    .query(async ({ input }) => {
      const letter = await getCharacterReferenceLetterById(input.id);
      
      if (!letter) {
        throw new Error("Letter not found");
      }
      
      return letter;
    }),

  // Admin: Get all letters
  getAll: adminProcedure.query(async () => {
    return getAllCharacterReferenceLetters();
  }),

  // Public: Update letter content (by token)
  update: publicProcedure
    .input(z.object({
      accessToken: z.string(),
      writerName: z.string().optional(),
      writerRelationship: z.string().optional(),
      writerAddress: z.string().optional(),
      writerCity: z.string().optional(),
      writerState: z.string().optional(),
      writerZip: z.string().optional(),
      writerPhone: z.string().optional(),
      writerEmail: z.string().optional(),
      writerOccupation: z.string().optional(),
      writerEmployer: z.string().optional(),
      writerImmigrationStatus: z.string().optional(),
      howLongKnown: z.string().optional(),
      howMet: z.string().optional(),
      frequencyOfContact: z.string().optional(),
      characterDescription: z.string().optional(),
      specificExamples: z.string().optional(),
      communityInvolvement: z.string().optional(),
      familyRole: z.string().optional(),
      workEthic: z.string().optional(),
      moralCharacter: z.string().optional(),
      whyDeservesBond: z.string().optional(),
      additionalComments: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const { accessToken, ...data } = input;
      
      // Verify letter exists and is not already completed
      const existing = await getCharacterReferenceLetterByToken(accessToken);
      if (!existing) {
        throw new Error("Letter not found or invalid token");
      }
      
      if (existing.status === "completed" || existing.status === "submitted") {
        throw new Error("This letter has already been completed and cannot be modified");
      }
      
      // Update status to draft if it was pending
      const updateData = {
        ...data,
        status: existing.status === "pending" ? "draft" as const : existing.status,
      };
      
      const updated = await updateCharacterReferenceLetter(accessToken, updateData);
      
      if (!updated) {
        throw new Error("Failed to update letter");
      }
      
      return updated;
    }),

  // Public: Sign the letter
  sign: publicProcedure
    .input(z.object({
      accessToken: z.string(),
      signatureData: z.string().min(1, "Signature is required"),
    }))
    .mutation(async ({ input, ctx }) => {
      const { accessToken, signatureData } = input;
      
      // Verify letter exists
      const existing = await getCharacterReferenceLetterByToken(accessToken);
      if (!existing) {
        throw new Error("Letter not found or invalid token");
      }
      
      if (existing.status === "completed" || existing.status === "submitted") {
        throw new Error("This letter has already been signed");
      }
      
      // Verify required fields are filled
      if (!existing.writerName || !existing.characterDescription) {
        throw new Error("Please complete all required fields before signing");
      }
      
      // Get IP address (simplified - in production use proper header parsing)
      const ipAddress = "0.0.0.0";
      
      const signed = await signCharacterReferenceLetter(accessToken, signatureData, ipAddress);
      
      if (!signed) {
        throw new Error("Failed to sign letter");
      }
      
      return signed;
    }),

  // Public: Generate PDF
  generatePdf: publicProcedure
    .input(z.object({
      accessToken: z.string(),
    }))
    .mutation(async ({ input }) => {
      const letter = await getCharacterReferenceLetterByToken(input.accessToken);
      
      if (!letter) {
        throw new Error("Letter not found");
      }
      
      if (letter.status !== "completed") {
        throw new Error("Letter must be signed before generating PDF");
      }
      
      // Generate PDF content as HTML
      const pdfHtml = generateLetterHtml(letter);
      
      // Convert to PDF buffer (simplified - in production use proper PDF generation)
      const pdfBuffer = Buffer.from(pdfHtml, "utf-8");
      
      // Upload to S3
      const fileName = `character-letter-${letter.id}-${Date.now()}.html`;
      const { key, url } = await storagePut(
        `character-letters/${fileName}`,
        pdfBuffer,
        "text/html"
      );
      
      // Update letter with PDF info
      await updateCharacterReferenceLetterPdf(input.accessToken, key, url);
      
      return { pdfUrl: url };
    }),

  // Admin: Delete a letter
  delete: adminProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ input }) => {
      const success = await deleteCharacterReferenceLetter(input.id);
      
      if (!success) {
        throw new Error("Failed to delete letter");
      }
      
      return { success: true };
    }),
});

// Helper function to generate letter HTML
function generateLetterHtml(letter: any): string {
  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Character Reference Letter for ${letter.respondentName}</title>
  <style>
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.6;
      max-width: 8.5in;
      margin: 1in auto;
      padding: 0 1in;
    }
    .header {
      text-align: center;
      margin-bottom: 2em;
    }
    .date {
      text-align: right;
      margin-bottom: 2em;
    }
    .salutation {
      margin-bottom: 1em;
    }
    .body p {
      text-indent: 0.5in;
      margin-bottom: 1em;
      text-align: justify;
    }
    .closing {
      margin-top: 2em;
    }
    .signature {
      margin-top: 1em;
    }
    .signature img {
      max-height: 60px;
    }
    .writer-info {
      margin-top: 0.5em;
    }
    .footer {
      margin-top: 3em;
      font-size: 10pt;
      color: #666;
      border-top: 1px solid #ccc;
      padding-top: 1em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>CHARACTER REFERENCE LETTER</h2>
  </div>
  
  <div class="date">
    ${formatDate(letter.signedAt)}
  </div>
  
  <div class="salutation">
    <p>To the Honorable Immigration Judge:</p>
  </div>
  
  <div class="body">
    <p>
      My name is ${letter.writerName || "[Name]"}, and I am writing this letter in support of 
      ${letter.respondentName}. I have known ${letter.respondentName} for ${letter.howLongKnown || "[duration]"} 
      as their ${letter.writerRelationship || "[relationship]"}.
    </p>
    
    ${letter.howMet ? `<p>I first met ${letter.respondentName} ${letter.howMet}.</p>` : ""}
    
    ${letter.characterDescription ? `<p>${letter.characterDescription}</p>` : ""}
    
    ${letter.specificExamples ? `<p>${letter.specificExamples}</p>` : ""}
    
    ${letter.communityInvolvement ? `<p>Regarding their involvement in the community: ${letter.communityInvolvement}</p>` : ""}
    
    ${letter.familyRole ? `<p>As a family member/friend, I have observed: ${letter.familyRole}</p>` : ""}
    
    ${letter.workEthic ? `<p>In terms of work ethic: ${letter.workEthic}</p>` : ""}
    
    ${letter.moralCharacter ? `<p>${letter.moralCharacter}</p>` : ""}
    
    ${letter.whyDeservesBond ? `<p>${letter.whyDeservesBond}</p>` : ""}
    
    ${letter.additionalComments ? `<p>${letter.additionalComments}</p>` : ""}
    
    <p>
      I respectfully request that you consider this letter in your decision regarding 
      ${letter.respondentName}'s case. I am willing to testify to these facts if needed.
    </p>
  </div>
  
  <div class="closing">
    <p>Respectfully submitted,</p>
    
    <div class="signature">
      ${letter.signatureData ? `<img src="${letter.signatureData}" alt="Signature" />` : "[Signature]"}
    </div>
    
    <div class="writer-info">
      <p><strong>${letter.writerName || "[Name]"}</strong></p>
      ${letter.writerOccupation ? `<p>${letter.writerOccupation}${letter.writerEmployer ? `, ${letter.writerEmployer}` : ""}</p>` : ""}
      ${letter.writerAddress ? `<p>${letter.writerAddress}</p>` : ""}
      ${letter.writerCity || letter.writerState || letter.writerZip ? `<p>${[letter.writerCity, letter.writerState, letter.writerZip].filter(Boolean).join(", ")}</p>` : ""}
      ${letter.writerPhone ? `<p>Phone: ${letter.writerPhone}</p>` : ""}
      ${letter.writerEmail ? `<p>Email: ${letter.writerEmail}</p>` : ""}
      ${letter.writerImmigrationStatus ? `<p>Immigration Status: ${letter.writerImmigrationStatus}</p>` : ""}
    </div>
  </div>
  
  <div class="footer">
    <p>This letter was electronically signed on ${formatDate(letter.signedAt)}.</p>
    <p>Document ID: ${letter.accessToken?.substring(0, 8)}...</p>
  </div>
</body>
</html>
  `.trim();
}
