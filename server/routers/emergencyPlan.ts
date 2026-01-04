import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { 
  createEmergencyPlan, 
  getEmergencyPlansByUserId, 
  getEmergencyPlanById, 
  updateEmergencyPlan, 
  deleteEmergencyPlan,
  createEmergencyPlanDocument,
  getDocumentsByPlanId,
  deleteEmergencyPlanDocument
} from "../db";
import { storagePut } from "../storage";
import { nanoid } from "nanoid";

// Emergency contact schema
const emergencyContactSchema = z.object({
  name: z.string(),
  relationship: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  canPickUpChildren: z.boolean().default(false),
});

// Child information schema
const childSchema = z.object({
  name: z.string(),
  dob: z.string().optional(),
  school: z.string().optional(),
  schoolPhone: z.string().optional(),
  medicalInfo: z.string().optional(),
  specialNeeds: z.string().optional(),
  allergies: z.string().optional(),
});

// Document locations schema
const documentLocationsSchema = z.object({
  passports: z.string().optional(),
  birthCertificates: z.string().optional(),
  socialSecurityCards: z.string().optional(),
  greenCards: z.string().optional(),
  workPermits: z.string().optional(),
  marriageCertificate: z.string().optional(),
  financialRecords: z.string().optional(),
  propertyDeeds: z.string().optional(),
  vehicleTitles: z.string().optional(),
  insurancePolicies: z.string().optional(),
  medicalRecords: z.string().optional(),
  other: z.string().optional(),
});

// Main emergency plan schema
const emergencyPlanSchema = z.object({
  planName: z.string().default("My Family Emergency Plan"),
  
  // Owner info
  ownerName: z.string().min(1, "Your name is required"),
  ownerPhone: z.string().optional(),
  ownerEmail: z.string().optional(),
  ownerAddress: z.string().optional(),
  
  // Emergency contacts (stored as JSON string)
  emergencyContacts: z.array(emergencyContactSchema).optional(),
  
  // Attorney
  attorneyName: z.string().optional(),
  attorneyPhone: z.string().optional(),
  attorneyEmail: z.string().optional(),
  attorneyFirm: z.string().optional(),
  
  // Consulate
  consulateName: z.string().optional(),
  consulatePhone: z.string().optional(),
  consulateAddress: z.string().optional(),
  
  // Children (stored as JSON string)
  children: z.array(childSchema).optional(),
  
  // Power of Attorney
  poaDesignee: z.string().optional(),
  poaDesigneePhone: z.string().optional(),
  poaDesigneeRelationship: z.string().optional(),
  hasPOADocument: z.boolean().default(false),
  
  // Document locations (stored as JSON string)
  documentLocations: documentLocationsSchema.optional(),
  
  // Financial
  bankName: z.string().optional(),
  bankAccountInfo: z.string().optional(),
  financialPOA: z.string().optional(),
  
  // Instructions
  specialInstructions: z.string().optional(),
  knowYourRightsAcknowledged: z.boolean().default(false),
});

// Document type enum
const documentTypeEnum = z.enum([
  "passport",
  "birth_certificate",
  "social_security_card",
  "green_card",
  "work_permit",
  "visa",
  "marriage_certificate",
  "divorce_decree",
  "power_of_attorney",
  "medical_records",
  "school_records",
  "financial_records",
  "property_deed",
  "vehicle_title",
  "insurance_policy",
  "other"
]);

export const emergencyPlanRouter = router({
  // Create a new emergency plan
  create: protectedProcedure
    .input(emergencyPlanSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      
      // Convert arrays to JSON strings for storage
      const planData = {
        ...input,
        emergencyContacts: input.emergencyContacts ? JSON.stringify(input.emergencyContacts) : undefined,
        children: input.children ? JSON.stringify(input.children) : undefined,
        documentLocations: input.documentLocations ? JSON.stringify(input.documentLocations) : undefined,
      };
      
      const plan = await createEmergencyPlan(userId, planData);
      return { success: true, plan };
    }),
  
  // Get all plans for current user
  list: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    const plans = await getEmergencyPlansByUserId(userId);
    
    // Parse JSON fields
    return plans.map(plan => ({
      ...plan,
      emergencyContacts: plan.emergencyContacts ? JSON.parse(plan.emergencyContacts) : [],
      children: plan.children ? JSON.parse(plan.children) : [],
      documentLocations: plan.documentLocations ? JSON.parse(plan.documentLocations) : {},
    }));
  }),
  
  // Get a specific plan by ID
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      const plan = await getEmergencyPlanById(input.id, userId);
      
      if (!plan) {
        return null;
      }
      
      return {
        ...plan,
        emergencyContacts: plan.emergencyContacts ? JSON.parse(plan.emergencyContacts) : [],
        children: plan.children ? JSON.parse(plan.children) : [],
        documentLocations: plan.documentLocations ? JSON.parse(plan.documentLocations) : {},
      };
    }),
  
  // Update an existing plan
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      data: emergencyPlanSchema.partial(),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      
      // Convert arrays to JSON strings for storage
      const updateData: any = { ...input.data };
      if (input.data.emergencyContacts) {
        updateData.emergencyContacts = JSON.stringify(input.data.emergencyContacts);
      }
      if (input.data.children) {
        updateData.children = JSON.stringify(input.data.children);
      }
      if (input.data.documentLocations) {
        updateData.documentLocations = JSON.stringify(input.data.documentLocations);
      }
      
      const plan = await updateEmergencyPlan(input.id, userId, updateData);
      return { success: true, plan };
    }),
  
  // Delete a plan
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      const success = await deleteEmergencyPlan(input.id, userId);
      return { success };
    }),
  
  // Document management
  documents: router({
    // Upload a document
    upload: protectedProcedure
      .input(z.object({
        planId: z.number(),
        documentType: documentTypeEnum,
        documentName: z.string(),
        description: z.string().optional(),
        belongsTo: z.string().optional(),
        fileName: z.string(),
        fileData: z.string(), // Base64 encoded file data
        mimeType: z.string(),
        fileSize: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.user.id;
        
        // Verify plan ownership
        const plan = await getEmergencyPlanById(input.planId, userId);
        if (!plan) {
          throw new Error("Emergency plan not found or access denied");
        }
        
        // Decode base64 file data
        const fileBuffer = Buffer.from(input.fileData, "base64");
        
        // Generate unique file key
        const fileExtension = input.fileName.split('.').pop() || 'bin';
        const fileKey = `emergency-plans/${userId}/${input.planId}/${nanoid()}.${fileExtension}`;
        
        // Upload to S3
        const { url } = await storagePut(fileKey, fileBuffer, input.mimeType);
        
        // Save document record
        const document = await createEmergencyPlanDocument({
          planId: input.planId,
          userId,
          documentType: input.documentType,
          documentName: input.documentName,
          description: input.description,
          fileKey,
          fileUrl: url,
          fileName: input.fileName,
          fileSize: input.fileSize,
          mimeType: input.mimeType,
          belongsTo: input.belongsTo,
        });
        
        return { success: true, document };
      }),
    
    // Get all documents for a plan
    list: protectedProcedure
      .input(z.object({ planId: z.number() }))
      .query(async ({ ctx, input }) => {
        const userId = ctx.user.id;
        return getDocumentsByPlanId(input.planId, userId);
      }),
    
    // Delete a document
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.user.id;
        const success = await deleteEmergencyPlanDocument(input.id, userId);
        return { success };
      }),
  }),
});
