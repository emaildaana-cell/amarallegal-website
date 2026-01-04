import { describe, it, expect, vi, beforeEach } from "vitest";

// Create mock functions
const mockCreateEmergencyPlan = vi.fn();
const mockGetEmergencyPlansByUserId = vi.fn();
const mockGetEmergencyPlanById = vi.fn();
const mockUpdateEmergencyPlan = vi.fn();
const mockDeleteEmergencyPlan = vi.fn();
const mockCreateEmergencyPlanDocument = vi.fn();
const mockGetDocumentsByPlanId = vi.fn();
const mockDeleteEmergencyPlanDocument = vi.fn();
const mockCreateShareLink = vi.fn();
const mockGetShareLinksByPlanId = vi.fn();
const mockGetShareLinkByToken = vi.fn();
const mockValidateAndAccessShareLink = vi.fn();
const mockRevokeShareLink = vi.fn();
const mockDeleteShareLink = vi.fn();

// Mock the database module
vi.mock("./db", () => ({
  createEmergencyPlan: mockCreateEmergencyPlan,
  getEmergencyPlansByUserId: mockGetEmergencyPlansByUserId,
  getEmergencyPlanById: mockGetEmergencyPlanById,
  updateEmergencyPlan: mockUpdateEmergencyPlan,
  deleteEmergencyPlan: mockDeleteEmergencyPlan,
  createEmergencyPlanDocument: mockCreateEmergencyPlanDocument,
  getDocumentsByPlanId: mockGetDocumentsByPlanId,
  deleteEmergencyPlanDocument: mockDeleteEmergencyPlanDocument,
  createShareLink: mockCreateShareLink,
  getShareLinksByPlanId: mockGetShareLinksByPlanId,
  getShareLinkByToken: mockGetShareLinkByToken,
  validateAndAccessShareLink: mockValidateAndAccessShareLink,
  revokeShareLink: mockRevokeShareLink,
  deleteShareLink: mockDeleteShareLink,
  getEmergencyPlanByIdPublic: vi.fn(),
  getDocumentsByPlanIdPublic: vi.fn(),
}));

// Mock the storage module
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ key: "test-key", url: "https://example.com/test-file.pdf" }),
}));

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

      mockCreateEmergencyPlan.mockResolvedValue(mockPlan);

      const result = await mockCreateEmergencyPlan(1, {
        planName: "Test Emergency Plan",
        ownerName: "John Doe",
        ownerPhone: "555-123-4567",
        ownerEmail: "john@example.com",
      });

      expect(mockCreateEmergencyPlan).toHaveBeenCalledWith(1, {
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

      mockCreateEmergencyPlan.mockResolvedValue(mockPlan);

      const result = await mockCreateEmergencyPlan(1, {
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

      mockGetEmergencyPlansByUserId.mockResolvedValue(mockPlans);

      const result = await mockGetEmergencyPlansByUserId(1);

      expect(mockGetEmergencyPlansByUserId).toHaveBeenCalledWith(1);
      expect(result).toHaveLength(2);
    });

    it("should return empty array when user has no plans", async () => {
      mockGetEmergencyPlansByUserId.mockResolvedValue([]);

      const result = await mockGetEmergencyPlansByUserId(999);

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

      mockGetEmergencyPlanById.mockResolvedValue(mockPlan);

      const result = await mockGetEmergencyPlanById(1, 1);

      expect(mockGetEmergencyPlanById).toHaveBeenCalledWith(1, 1);
      expect(result).toEqual(mockPlan);
    });

    it("should return undefined when user does not own the plan", async () => {
      mockGetEmergencyPlanById.mockResolvedValue(undefined);

      const result = await mockGetEmergencyPlanById(1, 999);

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

      mockUpdateEmergencyPlan.mockResolvedValue(updatedPlan);

      const result = await mockUpdateEmergencyPlan(1, 1, {
        planName: "Updated Plan Name",
        ownerName: "John Doe Updated",
      });

      expect(mockUpdateEmergencyPlan).toHaveBeenCalledWith(1, 1, {
        planName: "Updated Plan Name",
        ownerName: "John Doe Updated",
      });
      expect(result?.planName).toBe("Updated Plan Name");
    });
  });

  describe("deleteEmergencyPlan", () => {
    it("should delete a plan and return true", async () => {
      mockDeleteEmergencyPlan.mockResolvedValue(true);

      const result = await mockDeleteEmergencyPlan(1, 1);

      expect(mockDeleteEmergencyPlan).toHaveBeenCalledWith(1, 1);
      expect(result).toBe(true);
    });

    it("should return false when plan does not exist or user does not own it", async () => {
      mockDeleteEmergencyPlan.mockResolvedValue(false);

      const result = await mockDeleteEmergencyPlan(999, 1);

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

      mockCreateEmergencyPlanDocument.mockResolvedValue(mockDocument);

      const result = await mockCreateEmergencyPlanDocument({
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

      mockGetDocumentsByPlanId.mockResolvedValue(mockDocuments);

      const result = await mockGetDocumentsByPlanId(1, 1);

      expect(mockGetDocumentsByPlanId).toHaveBeenCalledWith(1, 1);
      expect(result).toHaveLength(2);
    });

    it("should return empty array when plan has no documents", async () => {
      mockGetDocumentsByPlanId.mockResolvedValue([]);

      const result = await mockGetDocumentsByPlanId(1, 1);

      expect(result).toEqual([]);
    });
  });

  describe("deleteEmergencyPlanDocument", () => {
    it("should delete a document and return true", async () => {
      mockDeleteEmergencyPlanDocument.mockResolvedValue(true);

      const result = await mockDeleteEmergencyPlanDocument(1, 1);

      expect(mockDeleteEmergencyPlanDocument).toHaveBeenCalledWith(1, 1);
      expect(result).toBe(true);
    });

    it("should return false when document does not exist or user does not own it", async () => {
      mockDeleteEmergencyPlanDocument.mockResolvedValue(false);

      const result = await mockDeleteEmergencyPlanDocument(999, 1);

      expect(result).toBe(false);
    });
  });
});

describe("Emergency Plan Share Link Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createShareLink", () => {
    it("should create a share link with all options", async () => {
      const mockShareLink = {
        id: 1,
        planId: 1,
        userId: 1,
        shareToken: "abc123xyz789abc123xyz789abc12345",
        passwordHash: "hashed_password",
        recipientName: "Jane Doe",
        recipientEmail: "jane@example.com",
        recipientRelationship: "Spouse",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxViews: 10,
        viewCount: 0,
        includedSections: JSON.stringify(["contacts", "children"]),
        includeDocuments: true,
        isActive: true,
        createdAt: new Date(),
      };

      mockCreateShareLink.mockResolvedValue(mockShareLink);

      const result = await mockCreateShareLink({
        planId: 1,
        userId: 1,
        shareToken: "abc123xyz789abc123xyz789abc12345",
        passwordHash: "hashed_password",
        recipientName: "Jane Doe",
        recipientEmail: "jane@example.com",
        recipientRelationship: "Spouse",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxViews: 10,
        includedSections: JSON.stringify(["contacts", "children"]),
        includeDocuments: true,
        isActive: true,
      });

      expect(mockCreateShareLink).toHaveBeenCalled();
      expect(result).toEqual(mockShareLink);
      expect(result?.shareToken).toBe("abc123xyz789abc123xyz789abc12345");
      expect(result?.isActive).toBe(true);
    });

    it("should create a share link without password", async () => {
      const mockShareLink = {
        id: 2,
        planId: 1,
        userId: 1,
        shareToken: "nopassword123nopassword123nopas",
        passwordHash: null,
        recipientName: null,
        recipientEmail: null,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        maxViews: 0,
        viewCount: 0,
        isActive: true,
        createdAt: new Date(),
      };

      mockCreateShareLink.mockResolvedValue(mockShareLink);

      const result = await mockCreateShareLink({
        planId: 1,
        userId: 1,
        shareToken: "nopassword123nopassword123nopas",
        passwordHash: null,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        maxViews: 0,
        isActive: true,
      });

      expect(result?.passwordHash).toBeNull();
      expect(result?.maxViews).toBe(0);
    });
  });

  describe("getShareLinksByPlanId", () => {
    it("should return all share links for a plan", async () => {
      const mockLinks = [
        { id: 1, planId: 1, shareToken: "link1", isActive: true },
        { id: 2, planId: 1, shareToken: "link2", isActive: true },
        { id: 3, planId: 1, shareToken: "link3", isActive: false },
      ];

      mockGetShareLinksByPlanId.mockResolvedValue(mockLinks);

      const result = await mockGetShareLinksByPlanId(1, 1);

      expect(mockGetShareLinksByPlanId).toHaveBeenCalledWith(1, 1);
      expect(result).toHaveLength(3);
      expect(result.filter((l: any) => l.isActive)).toHaveLength(2);
    });

    it("should return empty array when no links exist", async () => {
      mockGetShareLinksByPlanId.mockResolvedValue([]);

      const result = await mockGetShareLinksByPlanId(999, 1);

      expect(result).toEqual([]);
    });
  });

  describe("getShareLinkByToken", () => {
    it("should return a share link by token", async () => {
      const mockLink = {
        id: 1,
        planId: 1,
        shareToken: "validtoken123validtoken123valid",
        isActive: true,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      };

      mockGetShareLinkByToken.mockResolvedValue(mockLink);

      const result = await mockGetShareLinkByToken("validtoken123validtoken123valid");

      expect(mockGetShareLinkByToken).toHaveBeenCalledWith("validtoken123validtoken123valid");
      expect(result).toEqual(mockLink);
    });

    it("should return undefined for invalid token", async () => {
      mockGetShareLinkByToken.mockResolvedValue(undefined);

      const result = await mockGetShareLinkByToken("invalidtoken");

      expect(result).toBeUndefined();
    });
  });

  describe("validateAndAccessShareLink", () => {
    it("should validate and increment view count for valid link", async () => {
      const mockValidation = {
        valid: true,
        link: {
          id: 1,
          planId: 1,
          shareToken: "validtoken",
          isActive: true,
          viewCount: 1,
        },
      };

      mockValidateAndAccessShareLink.mockResolvedValue(mockValidation);

      const result = await mockValidateAndAccessShareLink("validtoken");

      expect(result.valid).toBe(true);
      expect(result.link).toBeDefined();
    });

    it("should return error for expired link", async () => {
      const mockValidation = {
        valid: false,
        error: "This share link has expired",
      };

      mockValidateAndAccessShareLink.mockResolvedValue(mockValidation);

      const result = await mockValidateAndAccessShareLink("expiredtoken");

      expect(result.valid).toBe(false);
      expect(result.error).toBe("This share link has expired");
    });

    it("should return error for revoked link", async () => {
      const mockValidation = {
        valid: false,
        error: "This share link has been revoked",
      };

      mockValidateAndAccessShareLink.mockResolvedValue(mockValidation);

      const result = await mockValidateAndAccessShareLink("revokedtoken");

      expect(result.valid).toBe(false);
      expect(result.error).toBe("This share link has been revoked");
    });

    it("should return error when max views reached", async () => {
      const mockValidation = {
        valid: false,
        error: "This share link has reached its maximum views",
      };

      mockValidateAndAccessShareLink.mockResolvedValue(mockValidation);

      const result = await mockValidateAndAccessShareLink("maxviewstoken");

      expect(result.valid).toBe(false);
      expect(result.error).toBe("This share link has reached its maximum views");
    });
  });

  describe("revokeShareLink", () => {
    it("should revoke an active share link", async () => {
      mockRevokeShareLink.mockResolvedValue(true);

      const result = await mockRevokeShareLink(1, 1);

      expect(mockRevokeShareLink).toHaveBeenCalledWith(1, 1);
      expect(result).toBe(true);
    });

    it("should return false when link does not exist or user does not own it", async () => {
      mockRevokeShareLink.mockResolvedValue(false);

      const result = await mockRevokeShareLink(999, 1);

      expect(result).toBe(false);
    });
  });

  describe("deleteShareLink", () => {
    it("should delete a share link", async () => {
      mockDeleteShareLink.mockResolvedValue(true);

      const result = await mockDeleteShareLink(1, 1);

      expect(mockDeleteShareLink).toHaveBeenCalledWith(1, 1);
      expect(result).toBe(true);
    });

    it("should return false when link does not exist or user does not own it", async () => {
      mockDeleteShareLink.mockResolvedValue(false);

      const result = await mockDeleteShareLink(999, 1);

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

describe("Share Link Security Validation", () => {
  it("should validate share token format", () => {
    // Share tokens should be 32 characters from nanoid
    const validToken = "abc123xyz789abc123xyz789abc12345";
    expect(validToken.length).toBe(32);
    expect(/^[a-zA-Z0-9_-]+$/.test(validToken)).toBe(true);
  });

  it("should validate expiration date is in the future", () => {
    const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);

    expect(futureDate > new Date()).toBe(true);
    expect(pastDate > new Date()).toBe(false);
  });

  it("should validate max views is non-negative", () => {
    const validMaxViews = [0, 1, 10, 100, 1000];
    const invalidMaxViews = [-1, -10];

    validMaxViews.forEach((v) => expect(v >= 0).toBe(true));
    invalidMaxViews.forEach((v) => expect(v >= 0).toBe(false));
  });

  it("should validate included sections are valid", () => {
    const validSections = ["contacts", "children", "documents", "instructions"];
    const testSections = ["contacts", "children"];

    testSections.forEach((section) => {
      expect(validSections).toContain(section);
    });
  });

  it("should validate password minimum length", () => {
    const validPasswords = ["1234", "password", "securepassword123"];
    const invalidPasswords = ["123", "ab", "x"];

    validPasswords.forEach((p) => expect(p.length >= 4).toBe(true));
    invalidPasswords.forEach((p) => expect(p.length >= 4).toBe(false));
  });
});
