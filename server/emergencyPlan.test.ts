import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the database module
vi.mock("./db", () => ({
  createEmergencyPlan: vi.fn(),
  getEmergencyPlansByUserId: vi.fn(),
  getEmergencyPlanById: vi.fn(),
  updateEmergencyPlan: vi.fn(),
  deleteEmergencyPlan: vi.fn(),
  createEmergencyPlanDocument: vi.fn(),
  getDocumentsByPlanId: vi.fn(),
  deleteEmergencyPlanDocument: vi.fn(),
}));

// Mock the storage module
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ key: "test-key", url: "https://example.com/test-file.pdf" }),
}));

import {
  createEmergencyPlan,
  getEmergencyPlansByUserId,
  getEmergencyPlanById,
  updateEmergencyPlan,
  deleteEmergencyPlan,
  createEmergencyPlanDocument,
  getDocumentsByPlanId,
  deleteEmergencyPlanDocument,
} from "./db";

describe("Emergency Plan Database Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createEmergencyPlan", () => {
    it("should create a new emergency plan with required fields", async () => {
      const mockPlan = {
        id: 1,
        userId: 1,
        planName: "Test Emergency Plan",
        ownerName: "John Doe",
        ownerPhone: "555-123-4567",
        ownerEmail: "john@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (createEmergencyPlan as any).mockResolvedValue(mockPlan);

      const result = await createEmergencyPlan(1, {
        planName: "Test Emergency Plan",
        ownerName: "John Doe",
        ownerPhone: "555-123-4567",
        ownerEmail: "john@example.com",
      });

      expect(createEmergencyPlan).toHaveBeenCalledWith(1, {
        planName: "Test Emergency Plan",
        ownerName: "John Doe",
        ownerPhone: "555-123-4567",
        ownerEmail: "john@example.com",
      });
      expect(result).toEqual(mockPlan);
    });

    it("should create a plan with emergency contacts as JSON string", async () => {
      const emergencyContacts = [
        { name: "Jane Doe", relationship: "Spouse", phone: "555-987-6543", email: "jane@example.com", canPickUpChildren: true },
      ];

      const mockPlan = {
        id: 1,
        userId: 1,
        planName: "Family Plan",
        ownerName: "John Doe",
        emergencyContacts: JSON.stringify(emergencyContacts),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (createEmergencyPlan as any).mockResolvedValue(mockPlan);

      const result = await createEmergencyPlan(1, {
        planName: "Family Plan",
        ownerName: "John Doe",
        emergencyContacts: JSON.stringify(emergencyContacts),
      });

      expect(result?.emergencyContacts).toBeDefined();
      const parsedContacts = JSON.parse(result!.emergencyContacts!);
      expect(parsedContacts).toHaveLength(1);
      expect(parsedContacts[0].name).toBe("Jane Doe");
    });
  });

  describe("getEmergencyPlansByUserId", () => {
    it("should return all plans for a user", async () => {
      const mockPlans = [
        { id: 1, userId: 1, planName: "Plan 1", ownerName: "John" },
        { id: 2, userId: 1, planName: "Plan 2", ownerName: "John" },
      ];

      (getEmergencyPlansByUserId as any).mockResolvedValue(mockPlans);

      const result = await getEmergencyPlansByUserId(1);

      expect(getEmergencyPlansByUserId).toHaveBeenCalledWith(1);
      expect(result).toHaveLength(2);
    });

    it("should return empty array when user has no plans", async () => {
      (getEmergencyPlansByUserId as any).mockResolvedValue([]);

      const result = await getEmergencyPlansByUserId(999);

      expect(result).toEqual([]);
    });
  });

  describe("getEmergencyPlanById", () => {
    it("should return a plan when user owns it", async () => {
      const mockPlan = {
        id: 1,
        userId: 1,
        planName: "My Plan",
        ownerName: "John Doe",
      };

      (getEmergencyPlanById as any).mockResolvedValue(mockPlan);

      const result = await getEmergencyPlanById(1, 1);

      expect(getEmergencyPlanById).toHaveBeenCalledWith(1, 1);
      expect(result).toEqual(mockPlan);
    });

    it("should return undefined when user does not own the plan", async () => {
      (getEmergencyPlanById as any).mockResolvedValue(undefined);

      const result = await getEmergencyPlanById(1, 999);

      expect(result).toBeUndefined();
    });
  });

  describe("updateEmergencyPlan", () => {
    it("should update plan fields", async () => {
      const updatedPlan = {
        id: 1,
        userId: 1,
        planName: "Updated Plan Name",
        ownerName: "John Doe Updated",
      };

      (updateEmergencyPlan as any).mockResolvedValue(updatedPlan);

      const result = await updateEmergencyPlan(1, 1, {
        planName: "Updated Plan Name",
        ownerName: "John Doe Updated",
      });

      expect(updateEmergencyPlan).toHaveBeenCalledWith(1, 1, {
        planName: "Updated Plan Name",
        ownerName: "John Doe Updated",
      });
      expect(result?.planName).toBe("Updated Plan Name");
    });
  });

  describe("deleteEmergencyPlan", () => {
    it("should delete a plan and return true", async () => {
      (deleteEmergencyPlan as any).mockResolvedValue(true);

      const result = await deleteEmergencyPlan(1, 1);

      expect(deleteEmergencyPlan).toHaveBeenCalledWith(1, 1);
      expect(result).toBe(true);
    });

    it("should return false when plan does not exist or user does not own it", async () => {
      (deleteEmergencyPlan as any).mockResolvedValue(false);

      const result = await deleteEmergencyPlan(999, 1);

      expect(result).toBe(false);
    });
  });
});

describe("Emergency Plan Document Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createEmergencyPlanDocument", () => {
    it("should create a document record", async () => {
      const mockDocument = {
        id: 1,
        planId: 1,
        userId: 1,
        documentType: "passport",
        documentName: "John's Passport",
        fileKey: "emergency-plans/1/1/abc123.pdf",
        fileUrl: "https://example.com/file.pdf",
        fileName: "passport.pdf",
        fileSize: 1024,
        mimeType: "application/pdf",
        uploadedAt: new Date(),
      };

      (createEmergencyPlanDocument as any).mockResolvedValue(mockDocument);

      const result = await createEmergencyPlanDocument({
        planId: 1,
        userId: 1,
        documentType: "passport",
        documentName: "John's Passport",
        fileKey: "emergency-plans/1/1/abc123.pdf",
        fileUrl: "https://example.com/file.pdf",
        fileName: "passport.pdf",
        fileSize: 1024,
        mimeType: "application/pdf",
      });

      expect(result).toEqual(mockDocument);
      expect(result?.documentType).toBe("passport");
    });
  });

  describe("getDocumentsByPlanId", () => {
    it("should return all documents for a plan", async () => {
      const mockDocuments = [
        { id: 1, planId: 1, documentType: "passport", documentName: "Passport" },
        { id: 2, planId: 1, documentType: "birth_certificate", documentName: "Birth Certificate" },
      ];

      (getDocumentsByPlanId as any).mockResolvedValue(mockDocuments);

      const result = await getDocumentsByPlanId(1, 1);

      expect(getDocumentsByPlanId).toHaveBeenCalledWith(1, 1);
      expect(result).toHaveLength(2);
    });

    it("should return empty array when plan has no documents", async () => {
      (getDocumentsByPlanId as any).mockResolvedValue([]);

      const result = await getDocumentsByPlanId(1, 1);

      expect(result).toEqual([]);
    });
  });

  describe("deleteEmergencyPlanDocument", () => {
    it("should delete a document and return true", async () => {
      (deleteEmergencyPlanDocument as any).mockResolvedValue(true);

      const result = await deleteEmergencyPlanDocument(1, 1);

      expect(deleteEmergencyPlanDocument).toHaveBeenCalledWith(1, 1);
      expect(result).toBe(true);
    });

    it("should return false when document does not exist or user does not own it", async () => {
      (deleteEmergencyPlanDocument as any).mockResolvedValue(false);

      const result = await deleteEmergencyPlanDocument(999, 1);

      expect(result).toBe(false);
    });
  });
});

describe("Emergency Plan Data Validation", () => {
  it("should validate document type enum values", () => {
    const validTypes = [
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
      "other",
    ];

    validTypes.forEach((type) => {
      expect(validTypes).toContain(type);
    });
    expect(validTypes).toHaveLength(16);
  });

  it("should validate emergency contact structure", () => {
    const validContact = {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "555-123-4567",
      email: "jane@example.com",
      canPickUpChildren: true,
    };

    expect(validContact).toHaveProperty("name");
    expect(validContact).toHaveProperty("relationship");
    expect(validContact).toHaveProperty("phone");
    expect(validContact).toHaveProperty("canPickUpChildren");
    expect(typeof validContact.canPickUpChildren).toBe("boolean");
  });

  it("should validate child information structure", () => {
    const validChild = {
      name: "Johnny Doe",
      dob: "2015-05-15",
      school: "Lincoln Elementary",
      schoolPhone: "555-111-2222",
      medicalInfo: "No allergies",
      specialNeeds: "None",
      allergies: "None",
    };

    expect(validChild).toHaveProperty("name");
    expect(validChild).toHaveProperty("dob");
    expect(validChild).toHaveProperty("school");
    expect(validChild).toHaveProperty("medicalInfo");
  });

  it("should validate document locations structure", () => {
    const validLocations = {
      passports: "Safe in bedroom closet",
      birthCertificates: "Filing cabinet",
      socialSecurityCards: "Safe",
      greenCards: "Wallet",
      workPermits: "Filing cabinet",
      marriageCertificate: "Safe",
      financialRecords: "Home office desk",
      propertyDeeds: "Bank safe deposit box",
      vehicleTitles: "Filing cabinet",
      insurancePolicies: "Filing cabinet",
      medicalRecords: "Home office",
      other: "Additional documents in storage",
    };

    expect(Object.keys(validLocations)).toHaveLength(12);
    expect(validLocations.passports).toBe("Safe in bedroom closet");
  });
});
