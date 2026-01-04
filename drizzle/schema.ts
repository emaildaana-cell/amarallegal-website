import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, date } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Bond Questionnaire Submissions
 * Comprehensive form data for immigration bond hearing preparation
 * Based on "Immigration Bond Procedures: Understanding Your One Chance at Freedom"
 */
export const bondSubmissions = mysqlTable("bond_submissions", {
  id: int("id").autoincrement().primaryKey(),
  
  // Detainee Information
  detaineeName: varchar("detaineeName", { length: 255 }).notNull(),
  aNumber: varchar("aNumber", { length: 20 }),
  dateOfBirth: varchar("dateOfBirth", { length: 20 }),
  countryOfBirth: varchar("countryOfBirth", { length: 100 }),
  dateOfEntry: varchar("dateOfEntry", { length: 20 }),
  mannerOfEntry: varchar("mannerOfEntry", { length: 100 }),
  
  // Detention Information
  detentionCenter: varchar("detentionCenter", { length: 255 }),
  dateDetained: varchar("dateDetained", { length: 20 }),
  
  // Eligibility Check (Critical - determines if bond is even possible)
  hasAggravatedFelony: boolean("hasAggravatedFelony").default(false),
  hasDrugCrimes: boolean("hasDrugCrimes").default(false),
  detainedAtPortOfEntry: boolean("detainedAtPortOfEntry").default(false),
  hasPriorDeportation: boolean("hasPriorDeportation").default(false),
  hasFinalRemovalOrder: boolean("hasFinalRemovalOrder").default(false),
  
  // Criminal History (Danger to Community Assessment)
  criminalHistory: text("criminalHistory"),
  rehabilitationEvidence: text("rehabilitationEvidence"),
  hasCharacterLetters: boolean("hasCharacterLetters").default(false),
  characterLettersCount: int("characterLettersCount").default(0),
  
  // Flight Risk Assessment - Community Ties
  familyTiesInUS: text("familyTiesInUS"),
  usResidenceLength: varchar("usResidenceLength", { length: 50 }),
  hasFixedAddress: boolean("hasFixedAddress").default(false),
  currentAddress: text("currentAddress"),
  employmentHistory: text("employmentHistory"),
  currentEmployer: varchar("currentEmployer", { length: 255 }),
  hasPropertyInUS: boolean("hasPropertyInUS").default(false),
  propertyDetails: text("propertyDetails"),
  
  // Immigration History
  previousDeportations: text("previousDeportations"),
  pendingApplications: text("pendingApplications"),
  eligibleForRelief: boolean("eligibleForRelief").default(false),
  reliefType: varchar("reliefType", { length: 255 }),
  
  // Health & Humanitarian Factors
  medicalConditions: text("medicalConditions"),
  specialCircumstances: text("specialCircumstances"),
  mentalHealthHistory: text("mentalHealthHistory"),
  currentMedications: text("currentMedications"),
  mentalHealthSupport: text("mentalHealthSupport"),
  physicalDisabilities: text("physicalDisabilities"),
  
  // Prior Immigration Proceedings
  priorImmigrationHearings: text("priorImmigrationHearings"),
  priorAppeals: text("priorAppeals"),
  previousBondHearings: text("previousBondHearings"),
  
  // Financial Information
  hasAssets: boolean("hasAssets").default(false),
  assetsDescription: text("assetsDescription"),
  hasDebts: boolean("hasDebts").default(false),
  debtsDescription: text("debtsDescription"),
  bankAccounts: text("bankAccounts"),
  abilityToPostBond: varchar("abilityToPostBond", { length: 100 }),
  
  // Education & Skills
  educationLevel: varchar("educationLevel", { length: 100 }),
  certifications: text("certifications"),
  professionalSkills: text("professionalSkills"),
  
  // Dependents & Family Obligations
  hasDependents: boolean("hasDependents").default(false),
  dependentsDescription: text("dependentsDescription"),
  elderlyDependents: text("elderlyDependents"),
  childrenInUS: int("childrenInUS").default(0),
  childrenCountries: text("childrenCountries"),
  
  // Ties to Country of Origin vs. U.S.
  tiesCountryOfOrigin: text("tiesCountryOfOrigin"),
  frequencyOfVisits: varchar("frequencyOfVisits", { length: 100 }),
  lastVisitCountryOfOrigin: varchar("lastVisitCountryOfOrigin", { length: 20 }),
  
  // Expanded Criminal Record
  criminalRecordDetails: text("criminalRecordDetails"),
  sentencesServed: text("sentencesServed"),
  rehabilitationPrograms: text("rehabilitationPrograms"),
  
  // Character References (Multiple)
  characterReference1Name: varchar("characterReference1Name", { length: 255 }),
  characterReference1Relation: varchar("characterReference1Relation", { length: 100 }),
  characterReference1Contact: varchar("characterReference1Contact", { length: 100 }),
  characterReference2Name: varchar("characterReference2Name", { length: 255 }),
  characterReference2Relation: varchar("characterReference2Relation", { length: 100 }),
  characterReference2Contact: varchar("characterReference2Contact", { length: 100 }),
  characterReference3Name: varchar("characterReference3Name", { length: 255 }),
  characterReference3Relation: varchar("characterReference3Relation", { length: 100 }),
  characterReference3Contact: varchar("characterReference3Contact", { length: 100 }),
  
  // Sponsor Information
  sponsorName: varchar("sponsorName", { length: 255 }),
  sponsorRelation: varchar("sponsorRelation", { length: 100 }),
  sponsorStatus: varchar("sponsorStatus", { length: 100 }),
  sponsorIncome: varchar("sponsorIncome", { length: 50 }),
  sponsorPhone: varchar("sponsorPhone", { length: 30 }),
  sponsorEmail: varchar("sponsorEmail", { length: 320 }),
  sponsorUnderstandsRisk: boolean("sponsorUnderstandsRisk").default(false),
  sponsorCriminalHistory: text("sponsorCriminalHistory"),
  sponsorEmploymentHistory: text("sponsorEmploymentHistory"),
  
  // Contact Information (for follow-up)
  contactPhone: varchar("contactPhone", { length: 30 }),
  contactEmail: varchar("contactEmail", { length: 320 }),
  preferredLanguage: varchar("preferredLanguage", { length: 10 }).default("en"),
  
  // Administrative
  status: mysqlEnum("status", ["new", "reviewed", "in_progress", "completed", "archived"]).default("new").notNull(),
  notes: text("notes"),
  assignedTo: int("assignedTo"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BondSubmission = typeof bondSubmissions.$inferSelect;
export type InsertBondSubmission = typeof bondSubmissions.$inferInsert;


/**
 * Family Emergency Plans
 * Stores emergency plan information for families preparing for immigration enforcement
 */
export const emergencyPlans = mysqlTable("emergency_plans", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  // Plan Metadata
  planName: varchar("planName", { length: 255 }).notNull().default("My Family Emergency Plan"),
  
  // Primary Contact (Plan Owner)
  ownerName: varchar("ownerName", { length: 255 }).notNull(),
  ownerPhone: varchar("ownerPhone", { length: 30 }),
  ownerEmail: varchar("ownerEmail", { length: 320 }),
  ownerAddress: text("ownerAddress"),
  
  // Emergency Contacts (JSON array)
  emergencyContacts: text("emergencyContacts"), // JSON: [{name, relationship, phone, email, canPickUpChildren}]
  
  // Attorney Information
  attorneyName: varchar("attorneyName", { length: 255 }),
  attorneyPhone: varchar("attorneyPhone", { length: 30 }),
  attorneyEmail: varchar("attorneyEmail", { length: 320 }),
  attorneyFirm: varchar("attorneyFirm", { length: 255 }),
  
  // Consulate Information
  consulateName: varchar("consulateName", { length: 255 }),
  consulatePhone: varchar("consulatePhone", { length: 30 }),
  consulateAddress: text("consulateAddress"),
  
  // Children Information (JSON array)
  children: text("children"), // JSON: [{name, dob, school, schoolPhone, medicalInfo, specialNeeds, allergies}]
  
  // Power of Attorney
  poaDesignee: varchar("poaDesignee", { length: 255 }),
  poaDesigneePhone: varchar("poaDesigneePhone", { length: 30 }),
  poaDesigneeRelationship: varchar("poaDesigneeRelationship", { length: 100 }),
  hasPOADocument: boolean("hasPOADocument").default(false),
  
  // Document Locations (JSON object)
  documentLocations: text("documentLocations"), // JSON: {passports, birthCertificates, socialSecurityCards, etc.}
  
  // Financial Information
  bankName: varchar("bankName", { length: 255 }),
  bankAccountInfo: text("bankAccountInfo"),
  financialPOA: varchar("financialPOA", { length: 255 }),
  
  // Important Instructions
  specialInstructions: text("specialInstructions"),
  knowYourRightsAcknowledged: boolean("knowYourRightsAcknowledged").default(false),
  
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmergencyPlan = typeof emergencyPlans.$inferSelect;
export type InsertEmergencyPlan = typeof emergencyPlans.$inferInsert;

/**
 * Emergency Plan Documents
 * Stores uploaded document references for emergency plans
 */
export const emergencyPlanDocuments = mysqlTable("emergency_plan_documents", {
  id: int("id").autoincrement().primaryKey(),
  planId: int("planId").notNull(),
  userId: int("userId").notNull(),
  
  // Document Information
  documentType: mysqlEnum("documentType", [
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
  ]).notNull(),
  
  documentName: varchar("documentName", { length: 255 }).notNull(),
  description: text("description"),
  
  // File Storage (S3)
  fileKey: varchar("fileKey", { length: 500 }).notNull(),
  fileUrl: varchar("fileUrl", { length: 1000 }).notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileSize: int("fileSize").notNull(),
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  
  // For whom (optional - e.g., which family member)
  belongsTo: varchar("belongsTo", { length: 255 }),
  
  // Timestamps
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
});

export type EmergencyPlanDocument = typeof emergencyPlanDocuments.$inferSelect;
export type InsertEmergencyPlanDocument = typeof emergencyPlanDocuments.$inferInsert;
