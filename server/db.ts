import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, bondSubmissions, InsertBondSubmission, BondSubmission } from "../drizzle/schema";
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
