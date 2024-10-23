import { createURLWithParams } from "../create-url-with-params";

describe("createURLWithParams", () => {
  it("should create a URL with valid parameters", () => {
    const baseUrl = "https://example.com";
    const params = {
      name: "John Doe",
      age: 30,
    };

    const result = createURLWithParams(baseUrl, params);
    expect(result).toBe("https://example.com/?name=John+Doe&age=30");
  });

  it("should ignore invalid parameters", () => {
    const baseUrl = "https://example.com";
    const params = {
      validParam: "value",
      emptyString: "",
      nullValue: null,
      undefinedValue: undefined,
      zero: 0,
      falseValue: false,
    };

    const result = createURLWithParams(baseUrl, params);
    expect(result).toBe(
      "https://example.com/?validParam=value&zero=0&falseValue=false"
    );
  });

  it("should handle an empty parameter object", () => {
    const baseUrl = "https://example.com";
    const params = {};

    const result = createURLWithParams(baseUrl, params);
    expect(result).toBe("https://example.com/");
  });

  it("should encode special characters in parameter values", () => {
    const baseUrl = "https://example.com";
    const params = {
      param1: "value with spaces",
      param2: "value&with&special@characters!",
    };

    const result = createURLWithParams(baseUrl, params);
    expect(result).toBe(
      "https://example.com/?param1=value+with+spaces&param2=value%26with%26special%40characters%21"
    );
  });
});
