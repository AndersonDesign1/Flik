import { describe, expect, test } from "bun:test";
import {
  createStoreSchema,
  inviteToRoleSchema,
  updateProfileSchema,
} from "./validation";

describe("inviteToRoleSchema", () => {
  test("lowercases the email", () => {
    const parsed = inviteToRoleSchema.parse({
      email: "Person@Example.COM",
      role: "staff",
    });
    expect(parsed.email).toBe("person@example.com");
  });
  test("rejects an invalid email", () => {
    expect(() =>
      inviteToRoleSchema.parse({ email: "not-an-email", role: "staff" })
    ).toThrow();
  });
  test("rejects a role outside the allowed set", () => {
    expect(() =>
      inviteToRoleSchema.parse({ email: "a@b.com", role: "super_user" })
    ).toThrow();
  });
});

describe("updateProfileSchema", () => {
  test("accepts an empty object (all fields optional)", () => {
    expect(() => updateProfileSchema.parse({})).not.toThrow();
  });
  test("rejects a first name over 100 chars", () => {
    expect(() =>
      updateProfileSchema.parse({ firstName: "a".repeat(101) })
    ).toThrow();
  });
  test("rejects more than 10 offer types", () => {
    expect(() =>
      updateProfileSchema.parse({ offerTypes: new Array(11).fill("x") })
    ).toThrow();
  });
});

describe("createStoreSchema", () => {
  test("requires a name of at least 2 characters", () => {
    expect(() => createStoreSchema.parse({ name: "a" })).toThrow();
    expect(() => createStoreSchema.parse({ name: "Ok" })).not.toThrow();
  });
});
