import { removeNonNumericCharacters } from "../remove-non-numeric-characters";

describe("removeNonNumericCharacters", () => {
  it("should remove all non-numeric characters from a string", () => {
    expect(removeNonNumericCharacters("123abc456")).toBe("123456");
    expect(removeNonNumericCharacters("!@#$%^&*()")).toBe("");
    expect(removeNonNumericCharacters("12-34.56/78")).toBe("12345678");
  });

  it("should return the same string if it contains only numeric characters", () => {
    expect(removeNonNumericCharacters("123456")).toBe("123456");
    expect(removeNonNumericCharacters("9876543210")).toBe("9876543210");
  });

  it("should return an empty string if the input is empty", () => {
    expect(removeNonNumericCharacters("")).toBe("");
  });

  it("should handle strings with mixed content", () => {
    expect(removeNonNumericCharacters("abc123!@#456def")).toBe("123456");
    expect(removeNonNumericCharacters("12 34 56")).toBe("123456");
  });
});
