import { toCpf, toCpfCallback, validateCpf } from "../cpf";

describe("CPF Utils", () => {
  describe("toCpf", () => {
    it("should format a valid CPF string correctly", () => {
      expect(toCpf("12345678901")).toBe("123.456.789-01");
    });

    it("should return the original string if the length is not 11", () => {
      expect(toCpf("123")).toBe("123");
      expect(toCpf("123456789012")).toBe("123456789012");
    });

    it("should remove non-numeric characters", () => {
      expect(toCpf("123.456.789-01")).toBe("123.456.789-01");
      expect(toCpf("1234567890a")).toBe("1234567890");
    });
  });

  describe("toCpfCallback", () => {
    it("should call the callback with the formatted CPF", () => {
      const mockCallback = jest.fn();
      const event = {
        target: {
          value: "12345678901",
        },
      };

      toCpfCallback(mockCallback)(event as any);
      expect(mockCallback).toHaveBeenCalledWith("123.456.789-01");
    });
  });

  describe("validateCpf", () => {
    it("should return false for invalid CPF length", () => {
      expect(validateCpf("123")).toBe(false);
      expect(validateCpf("123456789012")).toBe(false);
    });

    it("should return false for CPF with repeated digits", () => {
      expect(validateCpf("11111111111")).toBe(false);
      expect(validateCpf("00000000000")).toBe(false);
    });

    it("should return true for valid CPF", () => {
      expect(validateCpf("037.109.780-09")).toBe(true); 
    });

    it("should return false for invalid CPF", () => {
      expect(validateCpf("123.456.789-00")).toBe(false); 
    });
  });
});
