import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import {
  createSponsorLetter,
  getSponsorLetterById,
  getSponsorLettersByUserId,
  updateSponsorLetter,
  deleteSponsorLetter,
  updateSponsorLetterPdf,
} from "../db";
import { storagePut } from "../storage";

// Validation schema for sponsor letter
const sponsorLetterSchema = z.object({
  // Respondent info
  respondentName: z.string().min(1, "Respondent name is required"),
  respondentRelationship: z.string().min(1, "Relationship is required"),
  respondentANumber: z.string().optional(),
  
  // Sponsor info
  sponsorName: z.string().min(1, "Sponsor name is required"),
  sponsorAddress: z.string().min(1, "Address is required"),
  sponsorCity: z.string().min(1, "City is required"),
  sponsorState: z.string().min(1, "State is required"),
  sponsorZip: z.string().min(1, "ZIP code is required"),
  sponsorPhone: z.string().min(1, "Phone is required"),
  sponsorEmail: z.string().email().optional().or(z.literal("")),
  sponsorDateOfBirth: z.string().optional(),
  sponsorOccupation: z.string().optional(),
  sponsorEmployer: z.string().optional(),
  sponsorEmployerAddress: z.string().optional(),
  sponsorImmigrationStatus: z.string().min(1, "Immigration status is required"),
  
  // Financial info
  sponsorAnnualIncome: z.string().optional(),
  sponsorEmploymentLength: z.string().optional(),
  householdSize: z.number().optional(),
  
  // Housing info
  housingType: z.string().optional(),
  housingAddress: z.string().optional(),
  bedroomCount: z.number().optional(),
  willProvideHousing: z.boolean().default(true),
  
  // Commitments
  willEnsureCourtAppearance: z.boolean().default(true),
  willProvideTransportation: z.boolean().default(false),
  willProvideFinancialSupport: z.boolean().default(false),
  additionalCommitments: z.string().optional(),
  
  // Relationship
  howLongKnown: z.string().optional(),
  relationshipDescription: z.string().optional(),
  
  // Statements
  whyWillingToSponsor: z.string().optional(),
  characterStatement: z.string().optional(),
  flightRiskStatement: z.string().optional(),
  
  // Signature
  signatureData: z.string().optional(),
  
  // Language
  language: z.string().default("en"),
});

export const sponsorLetterRouter = router({
  // Create a new sponsor letter
  create: publicProcedure
    .input(sponsorLetterSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user?.id;
      
      const letter = await createSponsorLetter({
        ...input,
        userId: userId || null,
        signedAt: input.signatureData ? new Date() : null,
        signedIpAddress: null, // Could capture from request if needed
      });
      
      return letter;
    }),

  // Get sponsor letter by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return getSponsorLetterById(input.id);
    }),

  // Get all sponsor letters for current user
  getMyLetters: protectedProcedure
    .query(async ({ ctx }) => {
      if (!ctx.user?.id) {
        return [];
      }
      return getSponsorLettersByUserId(ctx.user.id);
    }),

  // Update sponsor letter
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      data: sponsorLetterSchema.partial(),
    }))
    .mutation(async ({ input }) => {
      const updateData: any = { ...input.data };
      if (input.data.signatureData && !updateData.signedAt) {
        updateData.signedAt = new Date();
      }
      return updateSponsorLetter(input.id, updateData);
    }),

  // Delete sponsor letter
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      // Verify ownership
      const letter = await getSponsorLetterById(input.id);
      if (!letter || letter.userId !== ctx.user?.id) {
        throw new Error("Not authorized to delete this letter");
      }
      return deleteSponsorLetter(input.id);
    }),

  // Generate HTML letter content
  generateLetterHtml: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const letter = await getSponsorLetterById(input.id);
      if (!letter) {
        throw new Error("Letter not found");
      }
      
      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      
      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 1in; }
    .header { text-align: center; margin-bottom: 30px; }
    .date { margin-bottom: 20px; }
    .address-block { margin-bottom: 20px; }
    .salutation { margin-bottom: 15px; }
    .body p { text-indent: 0.5in; margin-bottom: 10px; text-align: justify; }
    .signature-block { margin-top: 40px; }
    .signature-line { margin-top: 50px; border-top: 1px solid black; width: 250px; }
    .signature-image { max-height: 60px; margin-bottom: -20px; }
  </style>
</head>
<body>
  <div class="header">
    <h2>SPONSOR'S LETTER OF SUPPORT</h2>
  </div>
  
  <div class="date">${currentDate}</div>
  
  <div class="address-block">
    <p>Immigration Judge</p>
    <p>Executive Office for Immigration Review</p>
    <p>United States Department of Justice</p>
  </div>
  
  <div class="salutation">
    <p><strong>Re: ${letter.respondentName}${letter.respondentANumber ? `, A# ${letter.respondentANumber}` : ""}</strong></p>
    <p>Dear Honorable Immigration Judge:</p>
  </div>
  
  <div class="body">
    <p>I, ${letter.sponsorName}, am writing this letter in support of ${letter.respondentName}, who is my ${letter.respondentRelationship}. I am a ${letter.sponsorImmigrationStatus} residing at ${letter.sponsorAddress}, ${letter.sponsorCity}, ${letter.sponsorState} ${letter.sponsorZip}.</p>
    
    ${letter.howLongKnown ? `<p>I have known ${letter.respondentName} for ${letter.howLongKnown}. ${letter.relationshipDescription || ""}</p>` : ""}
    
    ${letter.characterStatement ? `<p>${letter.characterStatement}</p>` : ""}
    
    ${letter.whyWillingToSponsor ? `<p>${letter.whyWillingToSponsor}</p>` : ""}
    
    <p>I am willing and able to serve as a sponsor for ${letter.respondentName} and hereby commit to the following:</p>
    
    <ul style="margin-left: 0.5in;">
      ${letter.willProvideHousing ? `<li>I will provide housing at my residence located at ${letter.housingAddress || letter.sponsorAddress + ", " + letter.sponsorCity + ", " + letter.sponsorState + " " + letter.sponsorZip}.</li>` : ""}
      ${letter.willEnsureCourtAppearance ? `<li>I will ensure that ${letter.respondentName} appears at all scheduled immigration court hearings and appointments with immigration authorities.</li>` : ""}
      ${letter.willProvideTransportation ? `<li>I will provide transportation to and from court hearings and immigration appointments.</li>` : ""}
      ${letter.willProvideFinancialSupport ? `<li>I will provide financial support as needed during the pendency of the immigration proceedings.</li>` : ""}
    </ul>
    
    ${letter.additionalCommitments ? `<p>${letter.additionalCommitments}</p>` : ""}
    
    ${letter.sponsorOccupation ? `<p>I am currently employed as a ${letter.sponsorOccupation}${letter.sponsorEmployer ? ` at ${letter.sponsorEmployer}` : ""}${letter.sponsorEmploymentLength ? ` for ${letter.sponsorEmploymentLength}` : ""}${letter.sponsorAnnualIncome ? `. My annual income is approximately ${letter.sponsorAnnualIncome}` : ""}.</p>` : ""}
    
    ${letter.flightRiskStatement ? `<p>${letter.flightRiskStatement}</p>` : `<p>I firmly believe that ${letter.respondentName} is not a flight risk and will comply with all conditions of release. I am committed to ensuring compliance with any reporting requirements or conditions set by the Court.</p>`}
    
    <p>I respectfully request that the Court grant bond to ${letter.respondentName} so that they may be released into my care while their immigration case proceeds. I am prepared to fulfill all responsibilities as a sponsor.</p>
    
    <p>Thank you for your consideration of this matter.</p>
  </div>
  
  <div class="signature-block">
    <p>Respectfully submitted,</p>
    ${letter.signatureData ? `<img src="${letter.signatureData}" class="signature-image" alt="Signature" />` : '<div class="signature-line"></div>'}
    <p><strong>${letter.sponsorName}</strong></p>
    <p>${letter.sponsorAddress}</p>
    <p>${letter.sponsorCity}, ${letter.sponsorState} ${letter.sponsorZip}</p>
    <p>Phone: ${letter.sponsorPhone}</p>
    ${letter.sponsorEmail ? `<p>Email: ${letter.sponsorEmail}</p>` : ""}
  </div>
</body>
</html>`;
      
      return html;
    }),
});
