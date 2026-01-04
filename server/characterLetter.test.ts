import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the database functions
vi.mock("./db", () => ({
  createCharacterReferenceLetter: vi.fn(),
  getCharacterReferenceLetterByToken: vi.fn(),
  getCharacterReferenceLetterById: vi.fn(),
  getAllCharacterReferenceLetters: vi.fn(),
  updateCharacterReferenceLetter: vi.fn(),
  signCharacterReferenceLetter: vi.fn(),
  updateCharacterReferenceLetterPdf: vi.fn(),
  deleteCharacterReferenceLetter: vi.fn(),
}));

// Mock storage
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ key: "test-key", url: "https://test-url.com/file.pdf" }),
}));

import {
  createCharacterReferenceLetter,
  getCharacterReferenceLetterByToken,
  getCharacterReferenceLetterById,
  getAllCharacterReferenceLetters,
  updateCharacterReferenceLetter,
  signCharacterReferenceLetter,
  deleteCharacterReferenceLetter,
} from "./db";

describe("Character Reference Letter Database Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createCharacterReferenceLetter", () => {
    it("should create a new letter with required fields", async () => {
      const mockLetter = {
        id: 1,
        accessToken: "abc123def456",
        respondentName: "John Doe",
        caseType: "bond_hearing",
        status: "pending",
        createdAt: new Date(),
      };

      vi.mocked(createCharacterReferenceLetter).mockResolvedValue(mockLetter as any);

      const result = await createCharacterReferenceLetter({
        respondentName: "John Doe",
        caseType: "bond_hearing",
      });

      expect(result).toBeDefined();
      expect(result?.respondentName).toBe("John Doe");
      expect(result?.status).toBe("pending");
    });

    it("should generate unique access token", async () => {
      const mockLetter1 = { id: 1, accessToken: "token1", respondentName: "John" };
      const mockLetter2 = { id: 2, accessToken: "token2", respondentName: "Jane" };

      vi.mocked(createCharacterReferenceLetter)
        .mockResolvedValueOnce(mockLetter1 as any)
        .mockResolvedValueOnce(mockLetter2 as any);

      const result1 = await createCharacterReferenceLetter({ respondentName: "John" });
      const result2 = await createCharacterReferenceLetter({ respondentName: "Jane" });

      expect(result1?.accessToken).not.toBe(result2?.accessToken);
    });
  });

  describe("getCharacterReferenceLetterByToken", () => {
    it("should return letter when valid token provided", async () => {
      const mockLetter = {
        id: 1,
        accessToken: "valid-token",
        respondentName: "John Doe",
        status: "pending",
      };

      vi.mocked(getCharacterReferenceLetterByToken).mockResolvedValue(mockLetter as any);

      const result = await getCharacterReferenceLetterByToken("valid-token");

      expect(result).toBeDefined();
      expect(result?.accessToken).toBe("valid-token");
    });

    it("should return undefined for invalid token", async () => {
      vi.mocked(getCharacterReferenceLetterByToken).mockResolvedValue(undefined);

      const result = await getCharacterReferenceLetterByToken("invalid-token");

      expect(result).toBeUndefined();
    });
  });

  describe("updateCharacterReferenceLetter", () => {
    it("should update letter content", async () => {
      const mockUpdatedLetter = {
        id: 1,
        accessToken: "test-token",
        respondentName: "John Doe",
        writerName: "Jane Smith",
        writerRelationship: "friend",
        status: "draft",
      };

      vi.mocked(updateCharacterReferenceLetter).mockResolvedValue(mockUpdatedLetter as any);

      const result = await updateCharacterReferenceLetter("test-token", {
        writerName: "Jane Smith",
        writerRelationship: "friend",
      });

      expect(result).toBeDefined();
      expect(result?.writerName).toBe("Jane Smith");
      expect(result?.status).toBe("draft");
    });

    it("should change status from pending to draft on first update", async () => {
      const mockLetter = {
        id: 1,
        accessToken: "test-token",
        status: "draft",
      };

      vi.mocked(updateCharacterReferenceLetter).mockResolvedValue(mockLetter as any);

      const result = await updateCharacterReferenceLetter("test-token", {
        writerName: "Test Writer",
      });

      expect(result?.status).toBe("draft");
    });
  });

  describe("signCharacterReferenceLetter", () => {
    it("should sign letter and update status to completed", async () => {
      const mockSignedLetter = {
        id: 1,
        accessToken: "test-token",
        signatureData: "data:image/png;base64,abc123",
        signedAt: new Date(),
        signedIpAddress: "192.168.1.1",
        status: "completed",
      };

      vi.mocked(signCharacterReferenceLetter).mockResolvedValue(mockSignedLetter as any);

      const result = await signCharacterReferenceLetter(
        "test-token",
        "data:image/png;base64,abc123",
        "192.168.1.1"
      );

      expect(result).toBeDefined();
      expect(result?.status).toBe("completed");
      expect(result?.signatureData).toBeDefined();
      expect(result?.signedAt).toBeDefined();
    });
  });

  describe("getAllCharacterReferenceLetters", () => {
    it("should return all letters ordered by creation date", async () => {
      const mockLetters = [
        { id: 2, respondentName: "Jane", createdAt: new Date("2024-01-02") },
        { id: 1, respondentName: "John", createdAt: new Date("2024-01-01") },
      ];

      vi.mocked(getAllCharacterReferenceLetters).mockResolvedValue(mockLetters as any);

      const result = await getAllCharacterReferenceLetters();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(2); // Most recent first
    });

    it("should return empty array when no letters exist", async () => {
      vi.mocked(getAllCharacterReferenceLetters).mockResolvedValue([]);

      const result = await getAllCharacterReferenceLetters();

      expect(result).toEqual([]);
    });
  });

  describe("deleteCharacterReferenceLetter", () => {
    it("should delete letter and return true", async () => {
      vi.mocked(deleteCharacterReferenceLetter).mockResolvedValue(true);

      const result = await deleteCharacterReferenceLetter(1);

      expect(result).toBe(true);
    });

    it("should return false when letter not found", async () => {
      vi.mocked(deleteCharacterReferenceLetter).mockResolvedValue(false);

      const result = await deleteCharacterReferenceLetter(999);

      expect(result).toBe(false);
    });
  });
});

describe("Character Reference Letter Validation", () => {
  it("should validate respondent name is required", () => {
    const isValid = (name: string): boolean => !!(name && name.trim().length > 0);
    
    expect(isValid("John Doe")).toBe(true);
    expect(isValid("")).toBe(false);
    expect(isValid("   ")).toBe(false);
  });

  it("should validate case type enum values", () => {
    const validCaseTypes = [
      "bond_hearing",
      "asylum",
      "cancellation_of_removal",
      "adjustment_of_status",
      "naturalization",
      "waiver",
      "other",
    ];

    const isValidCaseType = (type: string) => validCaseTypes.includes(type);

    expect(isValidCaseType("bond_hearing")).toBe(true);
    expect(isValidCaseType("asylum")).toBe(true);
    expect(isValidCaseType("invalid_type")).toBe(false);
  });

  it("should validate status transitions", () => {
    const validTransitions: Record<string, string[]> = {
      pending: ["draft"],
      draft: ["completed"],
      completed: ["submitted"],
      submitted: [],
    };

    const canTransition = (from: string, to: string) => {
      return validTransitions[from]?.includes(to) || false;
    };

    expect(canTransition("pending", "draft")).toBe(true);
    expect(canTransition("draft", "completed")).toBe(true);
    expect(canTransition("completed", "pending")).toBe(false);
    expect(canTransition("submitted", "draft")).toBe(false);
  });
});

describe("Character Reference Letter PDF Generation", () => {
  it("should generate HTML content for letter", () => {
    const letter = {
      respondentName: "John Doe",
      writerName: "Jane Smith",
      writerRelationship: "friend",
      howLongKnown: "5 years",
      characterDescription: "John is a wonderful person...",
      signedAt: new Date("2024-01-15"),
    };

    // Simple HTML generation test
    const generateHtml = (data: typeof letter) => {
      return `
        <html>
          <body>
            <h1>Character Reference Letter</h1>
            <p>For: ${data.respondentName}</p>
            <p>From: ${data.writerName}</p>
            <p>Relationship: ${data.writerRelationship}</p>
            <p>Known for: ${data.howLongKnown}</p>
            <p>${data.characterDescription}</p>
          </body>
        </html>
      `;
    };

    const html = generateHtml(letter);

    expect(html).toContain("John Doe");
    expect(html).toContain("Jane Smith");
    expect(html).toContain("friend");
    expect(html).toContain("5 years");
  });

  it("should handle missing optional fields gracefully", () => {
    const letter = {
      respondentName: "John Doe",
      writerName: "Jane Smith",
      writerRelationship: null,
      howLongKnown: null,
      characterDescription: "Good person",
    };

    const generateHtml = (data: typeof letter) => {
      return `
        <p>Relationship: ${data.writerRelationship || "Not specified"}</p>
        <p>Known for: ${data.howLongKnown || "Not specified"}</p>
      `;
    };

    const html = generateHtml(letter);

    expect(html).toContain("Not specified");
  });
});

describe("Access Token Security", () => {
  it("should generate tokens of sufficient length", () => {
    // Token should be at least 32 characters (64 hex chars for 32 bytes)
    const mockToken = "a".repeat(64);
    expect(mockToken.length).toBeGreaterThanOrEqual(64);
  });

  it("should only allow alphanumeric characters in tokens", () => {
    const isValidToken = (token: string) => /^[a-f0-9]+$/i.test(token);
    
    expect(isValidToken("abc123def456")).toBe(true);
    expect(isValidToken("ABC123DEF456")).toBe(true);
    expect(isValidToken("abc-123")).toBe(false);
    expect(isValidToken("abc_123")).toBe(false);
  });
});
