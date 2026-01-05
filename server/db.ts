import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, bondSubmissions, InsertBondSubmission, BondSubmission, sponsorLetters, InsertSponsorLetter, SponsorLetter } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Bond Submission Functions

export async function createBondSubmission(data: Omit<InsertBondSubmission, "id" | "createdAt" | "updatedAt" | "status">): Promise<BondSubmission | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create bond submission: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(bondSubmissions).values({
      ...data,
      status: "new",
    });
    
    // Get the inserted record
    const insertId = result[0].insertId;
    const inserted = await db.select().from(bondSubmissions).where(eq(bondSubmissions.id, insertId)).limit(1);
    
    return inserted[0];
  } catch (error) {
    console.error("[Database] Failed to create bond submission:", error);
    throw error;
  }
}

export async function getAllBondSubmissions(): Promise<BondSubmission[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get bond submissions: database not available");
    return [];
  }

  try {
    const result = await db.select().from(bondSubmissions).orderBy(desc(bondSubmissions.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get bond submissions:", error);
    return [];
  }
}

export async function getBondSubmissionById(id: number): Promise<BondSubmission | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get bond submission: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(bondSubmissions).where(eq(bondSubmissions.id, id)).limit(1);
    return result[0];
  } catch (error) {
    console.error("[Database] Failed to get bond submission:", error);
    return undefined;
  }
}

export async function updateBondSubmissionStatus(
  id: number, 
  status: "new" | "reviewed" | "in_progress" | "completed" | "archived",
  notes?: string
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update bond submission: database not available");
    return;
  }

  try {
    const updateData: Record<string, unknown> = { status };
    if (notes !== undefined) {
      updateData.notes = notes;
    }
    
    await db.update(bondSubmissions).set(updateData).where(eq(bondSubmissions.id, id));
  } catch (error) {
    console.error("[Database] Failed to update bond submission:", error);
    throw error;
  }
}


// Emergency Plan Functions
import { emergencyPlans, emergencyPlanDocuments, InsertEmergencyPlan, EmergencyPlan, InsertEmergencyPlanDocument, EmergencyPlanDocument } from "../drizzle/schema";

export async function createEmergencyPlan(userId: number, data: Omit<InsertEmergencyPlan, "id" | "userId" | "createdAt" | "updatedAt">): Promise<EmergencyPlan | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create emergency plan: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(emergencyPlans).values({
      ...data,
      userId,
    });
    
    const insertId = result[0].insertId;
    const inserted = await db.select().from(emergencyPlans).where(eq(emergencyPlans.id, insertId)).limit(1);
    
    return inserted[0];
  } catch (error) {
    console.error("[Database] Failed to create emergency plan:", error);
    throw error;
  }
}

export async function getEmergencyPlansByUserId(userId: number): Promise<EmergencyPlan[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get emergency plans: database not available");
    return [];
  }

  try {
    const result = await db.select().from(emergencyPlans).where(eq(emergencyPlans.userId, userId)).orderBy(desc(emergencyPlans.updatedAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get emergency plans:", error);
    return [];
  }
}

export async function getEmergencyPlanById(id: number, userId: number): Promise<EmergencyPlan | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get emergency plan: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(emergencyPlans)
      .where(eq(emergencyPlans.id, id))
      .limit(1);
    
    // Verify ownership
    if (result[0] && result[0].userId !== userId) {
      return undefined;
    }
    
    return result[0];
  } catch (error) {
    console.error("[Database] Failed to get emergency plan:", error);
    return undefined;
  }
}

export async function updateEmergencyPlan(id: number, userId: number, data: Partial<InsertEmergencyPlan>): Promise<EmergencyPlan | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update emergency plan: database not available");
    return undefined;
  }

  try {
    // First verify ownership
    const existing = await getEmergencyPlanById(id, userId);
    if (!existing) {
      throw new Error("Emergency plan not found or access denied");
    }
    
    // Remove fields that shouldn't be updated
    const { id: _id, userId: _userId, createdAt: _createdAt, ...updateData } = data as any;
    
    await db.update(emergencyPlans).set(updateData).where(eq(emergencyPlans.id, id));
    
    return getEmergencyPlanById(id, userId);
  } catch (error) {
    console.error("[Database] Failed to update emergency plan:", error);
    throw error;
  }
}

export async function deleteEmergencyPlan(id: number, userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete emergency plan: database not available");
    return false;
  }

  try {
    // Verify ownership
    const existing = await getEmergencyPlanById(id, userId);
    if (!existing) {
      return false;
    }
    
    // Delete associated documents first
    await db.delete(emergencyPlanDocuments).where(eq(emergencyPlanDocuments.planId, id));
    
    // Delete the plan
    await db.delete(emergencyPlans).where(eq(emergencyPlans.id, id));
    
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete emergency plan:", error);
    return false;
  }
}

// Emergency Plan Document Functions

export async function createEmergencyPlanDocument(data: Omit<InsertEmergencyPlanDocument, "id" | "uploadedAt">): Promise<EmergencyPlanDocument | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create document: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(emergencyPlanDocuments).values(data);
    
    const insertId = result[0].insertId;
    const inserted = await db.select().from(emergencyPlanDocuments).where(eq(emergencyPlanDocuments.id, insertId)).limit(1);
    
    return inserted[0];
  } catch (error) {
    console.error("[Database] Failed to create document:", error);
    throw error;
  }
}

export async function getDocumentsByPlanId(planId: number, userId: number): Promise<EmergencyPlanDocument[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get documents: database not available");
    return [];
  }

  try {
    // Verify plan ownership first
    const plan = await getEmergencyPlanById(planId, userId);
    if (!plan) {
      return [];
    }
    
    const result = await db.select().from(emergencyPlanDocuments)
      .where(eq(emergencyPlanDocuments.planId, planId))
      .orderBy(desc(emergencyPlanDocuments.uploadedAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get documents:", error);
    return [];
  }
}

export async function deleteEmergencyPlanDocument(id: number, userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete document: database not available");
    return false;
  }

  try {
    // Get the document to verify ownership
    const doc = await db.select().from(emergencyPlanDocuments)
      .where(eq(emergencyPlanDocuments.id, id))
      .limit(1);
    
    if (!doc[0] || doc[0].userId !== userId) {
      return false;
    }
    
    await db.delete(emergencyPlanDocuments).where(eq(emergencyPlanDocuments.id, id));
    
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete document:", error);
    return false;
  }
}


// Emergency Plan Share Link Functions
import { emergencyPlanShareLinks, InsertEmergencyPlanShareLink, EmergencyPlanShareLink } from "../drizzle/schema";
import { and, lt, gt } from "drizzle-orm";

export async function createShareLink(data: Omit<InsertEmergencyPlanShareLink, "id" | "createdAt" | "viewCount">): Promise<EmergencyPlanShareLink | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create share link: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(emergencyPlanShareLinks).values({
      ...data,
      viewCount: 0,
    });
    
    const insertId = result[0].insertId;
    const inserted = await db.select().from(emergencyPlanShareLinks).where(eq(emergencyPlanShareLinks.id, insertId)).limit(1);
    
    return inserted[0];
  } catch (error) {
    console.error("[Database] Failed to create share link:", error);
    throw error;
  }
}

export async function getShareLinksByPlanId(planId: number, userId: number): Promise<EmergencyPlanShareLink[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get share links: database not available");
    return [];
  }

  try {
    const result = await db.select().from(emergencyPlanShareLinks)
      .where(and(
        eq(emergencyPlanShareLinks.planId, planId),
        eq(emergencyPlanShareLinks.userId, userId)
      ))
      .orderBy(desc(emergencyPlanShareLinks.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get share links:", error);
    return [];
  }
}

export async function getShareLinkByToken(token: string): Promise<EmergencyPlanShareLink | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get share link: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(emergencyPlanShareLinks)
      .where(eq(emergencyPlanShareLinks.shareToken, token))
      .limit(1);
    return result[0];
  } catch (error) {
    console.error("[Database] Failed to get share link:", error);
    return undefined;
  }
}

export async function validateAndAccessShareLink(token: string, clientIp?: string): Promise<{ valid: boolean; link?: EmergencyPlanShareLink; error?: string }> {
  const db = await getDb();
  if (!db) {
    return { valid: false, error: "Database not available" };
  }

  try {
    const link = await getShareLinkByToken(token);
    
    if (!link) {
      return { valid: false, error: "Share link not found" };
    }
    
    if (!link.isActive) {
      return { valid: false, error: "This share link has been revoked" };
    }
    
    if (new Date() > link.expiresAt) {
      return { valid: false, error: "This share link has expired" };
    }
    
    if (link.maxViews && link.maxViews > 0 && link.viewCount >= link.maxViews) {
      return { valid: false, error: "This share link has reached its maximum views" };
    }
    
    // Update access info
    await db.update(emergencyPlanShareLinks)
      .set({
        viewCount: link.viewCount + 1,
        lastAccessedAt: new Date(),
        lastAccessedIp: clientIp || null,
      })
      .where(eq(emergencyPlanShareLinks.id, link.id));
    
    return { valid: true, link };
  } catch (error) {
    console.error("[Database] Failed to validate share link:", error);
    return { valid: false, error: "Failed to validate share link" };
  }
}

export async function revokeShareLink(id: number, userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot revoke share link: database not available");
    return false;
  }

  try {
    const result = await db.select().from(emergencyPlanShareLinks)
      .where(and(
        eq(emergencyPlanShareLinks.id, id),
        eq(emergencyPlanShareLinks.userId, userId)
      ))
      .limit(1);
    
    if (!result[0]) {
      return false;
    }
    
    await db.update(emergencyPlanShareLinks)
      .set({
        isActive: false,
        revokedAt: new Date(),
      })
      .where(eq(emergencyPlanShareLinks.id, id));
    
    return true;
  } catch (error) {
    console.error("[Database] Failed to revoke share link:", error);
    return false;
  }
}

export async function deleteShareLink(id: number, userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete share link: database not available");
    return false;
  }

  try {
    const result = await db.select().from(emergencyPlanShareLinks)
      .where(and(
        eq(emergencyPlanShareLinks.id, id),
        eq(emergencyPlanShareLinks.userId, userId)
      ))
      .limit(1);
    
    if (!result[0]) {
      return false;
    }
    
    await db.delete(emergencyPlanShareLinks).where(eq(emergencyPlanShareLinks.id, id));
    
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete share link:", error);
    return false;
  }
}

export async function getEmergencyPlanByIdPublic(id: number): Promise<EmergencyPlan | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get emergency plan: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(emergencyPlans)
      .where(eq(emergencyPlans.id, id))
      .limit(1);
    
    return result[0];
  } catch (error) {
    console.error("[Database] Failed to get emergency plan:", error);
    return undefined;
  }
}

export async function getDocumentsByPlanIdPublic(planId: number): Promise<EmergencyPlanDocument[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get documents: database not available");
    return [];
  }

  try {
    const result = await db.select().from(emergencyPlanDocuments)
      .where(eq(emergencyPlanDocuments.planId, planId))
      .orderBy(desc(emergencyPlanDocuments.uploadedAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get documents:", error);
    return [];
  }
}


// Character Reference Letter Functions
import { characterReferenceLetters, InsertCharacterReferenceLetter, CharacterReferenceLetter } from "../drizzle/schema";
import crypto from "crypto";

export async function createCharacterReferenceLetter(data: {
  respondentName: string;
  caseType?: "bond_hearing" | "asylum" | "cancellation_of_removal" | "adjustment_of_status" | "naturalization" | "waiver" | "other";
  caseId?: string;
  requestedBy?: number;
  language?: string;
}): Promise<CharacterReferenceLetter | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create character reference letter: database not available");
    return undefined;
  }

  try {
    // Generate unique access token
    const accessToken = crypto.randomBytes(32).toString("hex");
    
    const result = await db.insert(characterReferenceLetters).values({
      accessToken,
      respondentName: data.respondentName,
      caseType: data.caseType || "bond_hearing",
      caseId: data.caseId,
      requestedBy: data.requestedBy,
      language: data.language || "en",
      status: "pending",
    });
    
    const insertId = result[0].insertId;
    const inserted = await db.select().from(characterReferenceLetters).where(eq(characterReferenceLetters.id, insertId)).limit(1);
    
    return inserted[0];
  } catch (error) {
    console.error("[Database] Failed to create character reference letter:", error);
    throw error;
  }
}

export async function getCharacterReferenceLetterByToken(accessToken: string): Promise<CharacterReferenceLetter | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get character reference letter: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(characterReferenceLetters)
      .where(eq(characterReferenceLetters.accessToken, accessToken))
      .limit(1);
    return result[0];
  } catch (error) {
    console.error("[Database] Failed to get character reference letter:", error);
    return undefined;
  }
}

export async function getCharacterReferenceLetterById(id: number): Promise<CharacterReferenceLetter | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get character reference letter: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(characterReferenceLetters)
      .where(eq(characterReferenceLetters.id, id))
      .limit(1);
    return result[0];
  } catch (error) {
    console.error("[Database] Failed to get character reference letter:", error);
    return undefined;
  }
}

export async function getAllCharacterReferenceLetters(): Promise<CharacterReferenceLetter[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get character reference letters: database not available");
    return [];
  }

  try {
    const result = await db.select().from(characterReferenceLetters)
      .orderBy(desc(characterReferenceLetters.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get character reference letters:", error);
    return [];
  }
}

export async function updateCharacterReferenceLetter(
  accessToken: string,
  data: Partial<Omit<InsertCharacterReferenceLetter, "id" | "accessToken" | "createdAt" | "requestedAt" | "requestedBy">>
): Promise<CharacterReferenceLetter | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update character reference letter: database not available");
    return undefined;
  }

  try {
    await db.update(characterReferenceLetters)
      .set(data)
      .where(eq(characterReferenceLetters.accessToken, accessToken));
    
    return getCharacterReferenceLetterByToken(accessToken);
  } catch (error) {
    console.error("[Database] Failed to update character reference letter:", error);
    throw error;
  }
}

export async function signCharacterReferenceLetter(
  accessToken: string,
  signatureData: string,
  ipAddress: string
): Promise<CharacterReferenceLetter | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot sign character reference letter: database not available");
    return undefined;
  }

  try {
    await db.update(characterReferenceLetters)
      .set({
        signatureData,
        signedAt: new Date(),
        signedIpAddress: ipAddress,
        status: "completed",
      })
      .where(eq(characterReferenceLetters.accessToken, accessToken));
    
    return getCharacterReferenceLetterByToken(accessToken);
  } catch (error) {
    console.error("[Database] Failed to sign character reference letter:", error);
    throw error;
  }
}

export async function updateCharacterReferenceLetterPdf(
  accessToken: string,
  pdfFileKey: string,
  pdfFileUrl: string
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update PDF info: database not available");
    return;
  }

  try {
    await db.update(characterReferenceLetters)
      .set({
        pdfFileKey,
        pdfFileUrl,
      })
      .where(eq(characterReferenceLetters.accessToken, accessToken));
  } catch (error) {
    console.error("[Database] Failed to update PDF info:", error);
    throw error;
  }
}

export async function deleteCharacterReferenceLetter(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete character reference letter: database not available");
    return false;
  }

  try {
    await db.delete(characterReferenceLetters).where(eq(characterReferenceLetters.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete character reference letter:", error);
    return false;
  }
}


// ============================================
// Sponsor Letter Functions
// ============================================

export async function createSponsorLetter(data: Omit<InsertSponsorLetter, "id" | "createdAt" | "updatedAt">): Promise<SponsorLetter | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create sponsor letter: database not available");
    return null;
  }

  try {
    const result = await db.insert(sponsorLetters).values(data);
    const insertId = result[0].insertId;
    const [letter] = await db.select().from(sponsorLetters).where(eq(sponsorLetters.id, insertId));
    return letter || null;
  } catch (error) {
    console.error("[Database] Failed to create sponsor letter:", error);
    throw error;
  }
}

export async function getSponsorLetterById(id: number): Promise<SponsorLetter | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get sponsor letter: database not available");
    return null;
  }

  try {
    const [letter] = await db.select().from(sponsorLetters).where(eq(sponsorLetters.id, id));
    return letter || null;
  } catch (error) {
    console.error("[Database] Failed to get sponsor letter:", error);
    return null;
  }
}

export async function getSponsorLettersByUserId(userId: number): Promise<SponsorLetter[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get sponsor letters: database not available");
    return [];
  }

  try {
    const letters = await db.select().from(sponsorLetters)
      .where(eq(sponsorLetters.userId, userId))
      .orderBy(desc(sponsorLetters.createdAt));
    return letters;
  } catch (error) {
    console.error("[Database] Failed to get sponsor letters:", error);
    return [];
  }
}

export async function updateSponsorLetter(id: number, data: Partial<InsertSponsorLetter>): Promise<SponsorLetter | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update sponsor letter: database not available");
    return null;
  }

  try {
    await db.update(sponsorLetters).set(data).where(eq(sponsorLetters.id, id));
    const [letter] = await db.select().from(sponsorLetters).where(eq(sponsorLetters.id, id));
    return letter || null;
  } catch (error) {
    console.error("[Database] Failed to update sponsor letter:", error);
    throw error;
  }
}

export async function deleteSponsorLetter(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete sponsor letter: database not available");
    return false;
  }

  try {
    await db.delete(sponsorLetters).where(eq(sponsorLetters.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete sponsor letter:", error);
    return false;
  }
}

export async function updateSponsorLetterPdf(id: number, pdfFileKey: string, pdfFileUrl: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update sponsor letter PDF: database not available");
    return;
  }

  try {
    await db.update(sponsorLetters)
      .set({ pdfFileKey, pdfFileUrl })
      .where(eq(sponsorLetters.id, id));
  } catch (error) {
    console.error("[Database] Failed to update sponsor letter PDF:", error);
    throw error;
  }
}
