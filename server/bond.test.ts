import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  createBondSubmission: vi.fn().mockResolvedValue({ id: 1 }),
  getAllBondSubmissions: vi.fn().mockResolvedValue([]),
  getBondSubmissionById: vi.fn().mockResolvedValue(null),
  updateBondSubmissionStatus: vi.fn().mockResolvedValue(undefined),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  getDb: vi.fn(),
}));

// Mock the notification function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("bond.submit", () => {
  it("accepts a valid bond submission from public users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.bond.submit({
      detaineeName: "John Doe",
      aNumber: "A-123-456-789",
      dateOfBirth: "1990-01-15",
      countryOfBirth: "Mexico",
      dateOfEntry: "2015-06-01",
      mannerOfEntry: "Visa",
      detentionCenter: "Krome Detention Center",
      dateDetained: "2024-01-10",
      hasAggravatedFelony: false,
      hasDrugCrimes: false,
      detainedAtPortOfEntry: false,
      hasPriorDeportation: false,
      hasFinalRemovalOrder: false,
      criminalHistory: "None",
      rehabilitationEvidence: "",
      hasCharacterLetters: true,
      characterLettersCount: 3,
      familyTiesInUS: "Wife (US Citizen), 2 children (US Citizens)",
      usResidenceLength: "10 years",
      hasFixedAddress: true,
      currentAddress: "123 Main St, Miami, FL 33101",
      employmentHistory: "Construction worker for 8 years",
      currentEmployer: "ABC Construction",
      hasPropertyInUS: false,
      propertyDetails: "",
      previousDeportations: "None",
      pendingApplications: "I-130 pending",
      eligibleForRelief: true,
      reliefType: "cancellation",
      medicalConditions: "None",
      specialCircumstances: "Primary breadwinner for family",
      sponsorName: "Jane Doe",
      sponsorRelation: "Wife",
      sponsorStatus: "us_citizen",
      sponsorIncome: "$55,000",
      sponsorPhone: "(305) 555-1234",
      sponsorEmail: "jane@example.com",
      sponsorUnderstandsRisk: true,
      contactPhone: "(305) 555-5678",
      contactEmail: "contact@example.com",
      preferredLanguage: "en",
    });

    expect(result).toEqual({ success: true, id: 1 });
  });

  it("requires detainee name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.bond.submit({
        detaineeName: "", // Empty name should fail validation
        hasAggravatedFelony: false,
        hasDrugCrimes: false,
        detainedAtPortOfEntry: false,
        hasPriorDeportation: false,
        hasFinalRemovalOrder: false,
        hasCharacterLetters: false,
        characterLettersCount: 0,
        hasFixedAddress: false,
        hasPropertyInUS: false,
        eligibleForRelief: false,
        sponsorUnderstandsRisk: false,
        preferredLanguage: "en",
      })
    ).rejects.toThrow();
  });
});

describe("bond.list", () => {
  it("requires authentication to list submissions", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.bond.list()).rejects.toThrow();
  });

  it("allows authenticated users to list submissions", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.bond.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("bond.getById", () => {
  it("requires authentication to get submission by ID", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.bond.getById({ id: 1 })).rejects.toThrow();
  });
});

describe("bond.updateStatus", () => {
  it("requires authentication to update status", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.bond.updateStatus({ id: 1, status: "reviewed" })
    ).rejects.toThrow();
  });

  it("allows authenticated users to update status", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.bond.updateStatus({
      id: 1,
      status: "reviewed",
      notes: "Reviewed by attorney",
    });

    expect(result).toEqual({ success: true });
  });
});
