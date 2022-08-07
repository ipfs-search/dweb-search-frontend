import { elasticSearchEscape } from "@/helpers/ApiHelper";

describe("escaping special characters", () => {
  test("multiple /", () => {
    expect(elasticSearchEscape("application/json or application/gzip")).toBe(
      "application\\/json or application\\/gzip"
    );
  });
  test(":", () => {
    expect(elasticSearchEscape("abc:123")).toBe("abc\\:123");
  });
});
