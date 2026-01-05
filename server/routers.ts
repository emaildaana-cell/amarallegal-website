import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createBondSubmission, getAllBondSubmissions, getBondSubmissionById, updateBondSubmissionStatus } from "./db";
import { notifyOwner } from "./_core/notification";
import { emergencyPlanRouter } from "./routers/emergencyPlan";
import { characterLetterRouter } from "./routers/characterLetter";
import { sponsorLetterRouter } from "./routers/sponsorLetter";

// Zod schema for bond submission input
const bondSubmissionSchema = z.object({
  // Detainee Information
  detaineeName: z.string().min(1, "Detainee name is required"),
  aNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  countryOfBirth: z.string().optional(),
  dateOfEntry: z.string().optional(),
  mannerOfEntry: z.string().optional(),
  
  // Detention Information
  detentionCenter: z.string().optional(),
  dateDetained: z.string().optional(),
  
  // Eligibility Check
  hasAggravatedFelony: z.boolean().default(false),
  hasDrugCrimes: z.boolean().default(false),
  detainedAtPortOfEntry: z.boolean().default(false),
  hasPriorDeportation: z.boolean().default(false),
  hasFinalRemovalOrder: z.boolean().default(false),
  
  // Criminal History
  criminalHistory: z.string().optional(),
  rehabilitationEvidence: z.string().optional(),
  hasCharacterLetters: z.boolean().default(false),
  characterLettersCount: z.number().default(0),
  
  // Community Ties
  familyTiesInUS: z.string().optional(),
  usResidenceLength: z.string().optional(),
  hasFixedAddress: z.boolean().default(false),
  currentAddress: z.string().optional(),
  employmentHistory: z.string().optional(),
  currentEmployer: z.string().optional(),
  hasPropertyInUS: z.boolean().default(false),
  propertyDetails: z.string().optional(),
  
  // Immigration History
  previousDeportations: z.string().optional(),
  pendingApplications: z.string().optional(),
  eligibleForRelief: z.boolean().default(false),
  reliefType: z.string().optional(),
  
  // Health & Humanitarian
  medicalConditions: z.string().optional(),
  specialCircumstances: z.string().optional(),
  
  // Sponsor Information
  sponsorName: z.string().optional(),
  sponsorRelation: z.string().optional(),
  sponsorStatus: z.string().optional(),
  sponsorIncome: z.string().optional(),
  sponsorPhone: z.string().optional(),
  sponsorEmail: z.string().optional(),
  sponsorUnderstandsRisk: z.boolean().default(false),
  
  // Contact Information
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  preferredLanguage: z.string().default("en"),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  emergencyPlan: emergencyPlanRouter,
  characterLetter: characterLetterRouter,
  sponsorLetter: sponsorLetterRouter,

  bond: router({
    // Public procedure - anyone can submit a bond questionnaire
    submit: publicProcedure
      .input(bondSubmissionSchema)
      .mutation(async ({ input }) => {
        const submission = await createBondSubmission(input);
        
        // Notify owner of new submission
        await notifyOwner({
          title: "New Bond Questionnaire Submitted",
          content: `A new bond questionnaire has been submitted for ${input.detaineeName}.\n\nDetention Center: ${input.detentionCenter || "Not specified"}\nContact: ${input.contactEmail || input.contactPhone || "Not provided"}\n\nPlease review in the admin dashboard.`,
        });
        
        return { success: true, id: submission?.id };
      }),
    
    // Protected - only authenticated users (staff) can view submissions
    list: protectedProcedure.query(async () => {
      return getAllBondSubmissions();
    }),
    
    // Protected - get single submission by ID
    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getBondSubmissionById(input.id);
      }),
    
    // Protected - update submission status
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "reviewed", "in_progress", "completed", "archived"]),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await updateBondSubmissionStatus(input.id, input.status, input.notes);
        return { success: true };
      }),
    
    // Protected - get filtered submissions for dashboard
    getFiltered: protectedProcedure
      .input(z.object({
        status: z.enum(["new", "reviewed", "in_progress", "completed", "archived"]).optional(),
        search: z.string().optional(),
        sortBy: z.enum(["date", "name", "status"]).optional(),
        sortOrder: z.enum(["asc", "desc"]).optional(),
      }))
      .query(async ({ input }) => {
        const allSubmissions = await getAllBondSubmissions();
        
        let filtered = allSubmissions;
        
        // Filter by status
        if (input.status) {
          filtered = filtered.filter(s => s.status === input.status);
        }
        
        // Filter by search term (name, A-number, email)
        if (input.search) {
          const searchLower = input.search.toLowerCase();
          filtered = filtered.filter(s => 
            s.detaineeName?.toLowerCase().includes(searchLower) ||
            s.aNumber?.toLowerCase().includes(searchLower) ||
            s.contactEmail?.toLowerCase().includes(searchLower) ||
            s.detentionCenter?.toLowerCase().includes(searchLower)
          );
        }
        
        // Sort
        const sortBy = input.sortBy || "date";
        const sortOrder = input.sortOrder || "desc";
        
        filtered.sort((a, b) => {
          let aVal: any, bVal: any;
          
          if (sortBy === "date") {
            aVal = new Date(a.createdAt).getTime();
            bVal = new Date(b.createdAt).getTime();
          } else if (sortBy === "name") {
            aVal = a.detaineeName || "";
            bVal = b.detaineeName || "";
          } else if (sortBy === "status") {
            aVal = a.status || "";
            bVal = b.status || "";
          }
          
          if (sortOrder === "asc") {
            return aVal > bVal ? 1 : -1;
          } else {
            return aVal < bVal ? 1 : -1;
          }
        });
        
        return filtered;
      }),
  }),
});

export type AppRouter = typeof appRouter;
