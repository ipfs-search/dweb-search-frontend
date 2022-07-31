import { apiStringFormatter } from "@/helpers/ApiHelper";

describe("escaping special characters", () => {
  test("/", () => {
    expect(apiStringFormatter("application/json")).toBe("application\\/json");
  });
  test(":", () => {
    expect(apiStringFormatter("abc:123")).toBe("abc\\:123");
  });
});
