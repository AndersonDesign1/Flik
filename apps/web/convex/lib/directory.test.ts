import { describe, expect, test } from "bun:test";
import { isDirectoryUser, parsePaginatedUsersResponse } from "./directory";

const err = (m: string) => new Error(m);

describe("isDirectoryUser", () => {
  test("accepts a minimal valid user", () => {
    expect(isDirectoryUser({ _id: "u1", email: "a@b.com" })).toBe(true);
  });
  test("rejects missing id or email", () => {
    expect(isDirectoryUser({ email: "a@b.com" })).toBe(false);
    expect(isDirectoryUser({ _id: "u1" })).toBe(false);
    expect(isDirectoryUser(null)).toBe(false);
  });
  test("rejects wrong field types", () => {
    expect(isDirectoryUser({ _id: 1, email: "a@b.com" })).toBe(false);
    expect(isDirectoryUser({ _id: "u1", email: "a@b.com", name: 5 })).toBe(
      false
    );
  });
});

describe("parsePaginatedUsersResponse", () => {
  test("returns the page and cursor for a valid payload", () => {
    const out = parsePaginatedUsersResponse(
      { page: [{ _id: "u1", email: "a@b.com" }], continueCursor: null },
      err
    );
    expect(out.page).toHaveLength(1);
    expect(out.continueCursor).toBeNull();
  });
  test("throws via the provided factory on a malformed page", () => {
    expect(() =>
      parsePaginatedUsersResponse({ page: "nope", continueCursor: null }, err)
    ).toThrow();
  });
  test("throws on a malformed cursor", () => {
    expect(() =>
      parsePaginatedUsersResponse({ page: [], continueCursor: 5 }, err)
    ).toThrow();
  });
});
