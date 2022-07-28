import { picsum } from "@/helpers/picsum";
import { beforeAll, afterAll, test, expect, describe } from "vitest";

let random;
beforeAll(() => {
  random = Math.random;
  Math.random = () => 0.1234;
});
afterAll(() => {
  Math.random = random;
});

describe("picsum creates proper API urls", () => {
  test("basic form", () => {
    expect(picsum()).toBe("https://picsum.photos/200/200");
  });
  test("basic form, arbitrary width and height", () => {
    const width = 1100;
    const height = 1234;
    expect(picsum({ width, height })).toBe(`https://picsum.photos/${width}/${height}`);
  });
  test("with specific id", () => {
    expect(picsum({ id: 10 })).toBe("https://picsum.photos/id/10/200/200");
  });
  test("with random seed", () => {
    expect(picsum({ seed: "abcd" })).toBe("https://picsum.photos/seed/abcd/200/200");
  });
  test("basic form, with cache protection", () => {
    expect(picsum({ random: true })).toBe("https://picsum.photos/200/200?random=" + Math.random());
  });
  test("basic form with grayscale filter", () => {
    expect(picsum({ grayscale: true })).toBe("https://picsum.photos/200/200?grayscale");
  });
  test("basic form with blur filter", () => {
    expect(picsum({ blur: 7 })).toBe("https://picsum.photos/200/200?blur=7");
  });
});
