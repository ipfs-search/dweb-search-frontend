import { elasticSearchEscape } from "@/helpers/ApiHelper";

describe("escaping special characters", () => {
  test("/", () => {
    expect(elasticSearchEscape("application/json")).toBe("application\\/json");
  });
  test(":", () => {
    expect(elasticSearchEscape("abc:123")).toBe("abc\\:123");
  });
});
