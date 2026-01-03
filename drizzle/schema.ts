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
