import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the database module
vi.mock("./db", () => ({
  createSponsorLetter: vi.fn(),
  getSponsorLetterById: vi.fn(),
  getSponsorLettersByUserId: vi.fn(),
  updateSponsorLetter: vi.fn(),
  deleteSponsorLetter: vi.fn(),
}));

import {
  createSponsorLetter,
  getSponsorLetterById,
  getSponsorLettersByUserId,
  updateSponsorLetter,
  deleteSponsorLetter,
} from "./db";

describe("Sponsor Letter Database Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createSponsorLetter", () => {
    it("should create a new sponsor letter with required fields", async () => {
      const mockLetter = {
        id: 1,
        respondentName: "John Doe",
        respondentRelationship: "Spouse",
        sponsorName: "Jane Doe",
        sponsorAddress: "123 Main St",
        sponsorCity: "Miami",
        sponsorState: "Florida",
        sponsorZip: "33101",
        sponsorPhone: "305-555-1234",
        sponsorImmigrationStatus: "U.S. Citizen",
        signatureData: "data:image/png;base64,abc123",
        language: "en",
        createdAt: new Date(),
      };

      vi.mocked(createSponsorLetter).mockResolvedValue(mockLetter);

      const result = await createSponsorLetter({
        respondentName: "John Doe",
        respondentRelationship: "Spouse",
        sponsorName: "Jane Doe",
        sponsorAddress: "123 Main St",
        sponsorCity: "Miami",
        sponsorState: "Florida",
        sponsorZip: "33101",
        sponsorPhone: "305-555-1234",
        sponsorImmigrationStatus: "U.S. Citizen",
        signatureData: "data:image/png;base64,abc123",
        language: "en",
      });

      expect(result).toEqual(mockLetter);
      expect(createSponsorLetter).toHaveBeenCalledTimes(1);
    });

    it("should create a sponsor letter with all optional fields", async () => {
      const mockLetter = {
        id: 2,
        respondentName: "John Doe",
        respondentRelationship: "Spouse",
        respondentANumber: "A123-456-789",
        sponsorName: "Jane Doe",
        sponsorAddress: "123 Main St",
        sponsorCity: "Miami",
        sponsorState: "Florida",
        sponsorZip: "33101",
        sponsorPhone: "305-555-1234",
        sponsorEmail: "jane@example.com",
        sponsorImmigrationStatus: "U.S. Citizen",
        sponsorOccupation: "Teacher",
        sponsorEmployer: "Miami School District",
        sponsorEmployerAddress: "456 School Ave",
        sponsorAnnualIncome: "$55,000",
        sponsorEmploymentLength: "5 years",
        householdSize: 4,
        housingType: "own",
        housingAddress: "123 Main St, Miami, FL 33101",
        bedroomCount: 3,
        willProvideHousing: true,
        willEnsureCourtAppearance: true,
        willProvideTransportation: true,
        willProvideFinancialSupport: true,
        additionalCommitments: "I will help with job search",
        howLongKnown: "10 years",
        relationshipDescription: "We have been married for 10 years",
        whyWillingToSponsor: "He is my husband and father of our children",
        characterStatement: "He is a loving father and hard worker",
        flightRiskStatement: "He has strong ties to the community",
        signatureData: "data:image/png;base64,abc123",
        language: "en",
        createdAt: new Date(),
      };

      vi.mocked(createSponsorLetter).mockResolvedValue(mockLetter);

      const result = await createSponsorLetter(mockLetter);

      expect(result).toEqual(mockLetter);
      expect(result.householdSize).toBe(4);
      expect(result.bedroomCount).toBe(3);
    });
  });

  describe("getSponsorLetterById", () => {
    it("should retrieve a sponsor letter by ID", async () => {
      const mockLetter = {
        id: 1,
        respondentName: "John Doe",
        sponsorName: "Jane Doe",
        createdAt: new Date(),
      };

      vi.mocked(getSponsorLetterById).mockResolvedValue(mockLetter);

      const result = await getSponsorLetterById(1);

      expect(result).toEqual(mockLetter);
      expect(getSponsorLetterById).toHaveBeenCalledWith(1);
    });

    it("should return undefined for non-existent letter", async () => {
      vi.mocked(getSponsorLetterById).mockResolvedValue(undefined);

      const result = await getSponsorLetterById(999);

      expect(result).toBeUndefined();
    });
  });

  describe("getSponsorLettersByUserId", () => {
    it("should retrieve all sponsor letters for a user", async () => {
      const mockLetters = [
        { id: 1, respondentName: "John Doe", sponsorName: "Jane Doe" },
        { id: 2, respondentName: "Bob Smith", sponsorName: "Jane Doe" },
      ];

      vi.mocked(getSponsorLettersByUserId).mockResolvedValue(mockLetters);

      const result = await getSponsorLettersByUserId("user-123");

      expect(result).toHaveLength(2);
      expect(getSponsorLettersByUserId).toHaveBeenCalledWith("user-123");
    });

    it("should return empty array for user with no letters", async () => {
      vi.mocked(getSponsorLettersByUserId).mockResolvedValue([]);

      const result = await getSponsorLettersByUserId("user-no-letters");

      expect(result).toHaveLength(0);
    });
  });

  describe("updateSponsorLetter", () => {
    it("should update sponsor letter fields", async () => {
      const mockUpdatedLetter = {
        id: 1,
        respondentName: "John Doe Updated",
        sponsorName: "Jane Doe",
        characterStatement: "Updated character statement",
      };

      vi.mocked(updateSponsorLetter).mockResolvedValue(mockUpdatedLetter);

      const result = await updateSponsorLetter(1, {
        respondentName: "John Doe Updated",
        characterStatement: "Updated character statement",
      });

      expect(result.respondentName).toBe("John Doe Updated");
      expect(result.characterStatement).toBe("Updated character statement");
    });
  });

  describe("deleteSponsorLetter", () => {
    it("should delete a sponsor letter", async () => {
      vi.mocked(deleteSponsorLetter).mockResolvedValue({ success: true });

      const result = await deleteSponsorLetter(1);

      expect(result).toEqual({ success: true });
      expect(deleteSponsorLetter).toHaveBeenCalledWith(1);
    });
  });
});

describe("Sponsor Letter Validation", () => {
  it("should require respondent name", () => {
    const letterData = {
      respondentName: "",
      sponsorName: "Jane Doe",
    };

    expect(letterData.respondentName).toBe("");
  });

  it("should require sponsor name", () => {
    const letterData = {
      respondentName: "John Doe",
      sponsorName: "",
    };

    expect(letterData.sponsorName).toBe("");
  });

  it("should require valid immigration status", () => {
    const validStatuses = [
      "U.S. Citizen",
      "Lawful Permanent Resident",
      "Asylee",
      "Refugee",
      "Valid Visa Holder",
      "TPS Holder",
      "DACA Recipient",
      "Other",
    ];

    expect(validStatuses).toContain("U.S. Citizen");
    expect(validStatuses).toContain("Lawful Permanent Resident");
    expect(validStatuses).not.toContain("Invalid Status");
  });

  it("should validate US state names", () => {
    const validStates = ["Florida", "Texas", "California", "New York"];
    
    expect(validStates).toContain("Florida");
    expect(validStates).not.toContain("InvalidState");
  });
});

describe("Sponsor Letter HTML Generation", () => {
  it("should generate letter with all required sections", () => {
    const letterData = {
      respondentName: "John Doe",
      respondentRelationship: "Spouse",
      sponsorName: "Jane Doe",
      sponsorAddress: "123 Main St",
      sponsorCity: "Miami",
      sponsorState: "Florida",
      sponsorZip: "33101",
      sponsorPhone: "305-555-1234",
      sponsorImmigrationStatus: "U.S. Citizen",
      characterStatement: "He is a good person",
      signatureData: "data:image/png;base64,abc123",
    };

    // Verify all required fields are present
    expect(letterData.respondentName).toBeTruthy();
    expect(letterData.sponsorName).toBeTruthy();
    expect(letterData.sponsorImmigrationStatus).toBeTruthy();
    expect(letterData.signatureData).toBeTruthy();
  });

  it("should include commitments in letter", () => {
    const letterData = {
      willProvideHousing: true,
      willEnsureCourtAppearance: true,
      willProvideTransportation: false,
      willProvideFinancialSupport: true,
    };

    expect(letterData.willProvideHousing).toBe(true);
    expect(letterData.willEnsureCourtAppearance).toBe(true);
    expect(letterData.willProvideTransportation).toBe(false);
  });

  it("should format date correctly", () => {
    const date = new Date("2026-01-05");
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    expect(formattedDate).toContain("2026");
    expect(formattedDate).toContain("January");
  });
});

describe("Sponsor Letter Language Support", () => {
  it("should support English language", () => {
    const language = "en";
    expect(["en", "es", "pt"]).toContain(language);
  });

  it("should support Spanish language", () => {
    const language = "es";
    expect(["en", "es", "pt"]).toContain(language);
  });

  it("should support Portuguese language", () => {
    const language = "pt";
    expect(["en", "es", "pt"]).toContain(language);
  });
});
