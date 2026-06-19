import { describe, expect, test } from "bun:test";
import { canManageUsers, getRoleLevel, normalizeRole } from "./roles";

describe("normalizeRole", () => {
  test("maps legacy admin to staff", () => {
    expect(normalizeRole("admin")).toBe("staff");
  });
  test("passes through staff and super_admin", () => {
    expect(normalizeRole("staff")).toBe("staff");
    expect(normalizeRole("super_admin")).toBe("super_admin");
  });
  test("defaults unknown / null / undefined to user", () => {
    expect(normalizeRole(undefined)).toBe("user");
    expect(normalizeRole(null)).toBe("user");
    expect(normalizeRole("")).toBe("user");
    expect(normalizeRole("root")).toBe("user");
  });
});

describe("getRoleLevel", () => {
  test("orders user < staff < super_admin", () => {
    expect(getRoleLevel("user")).toBeLessThan(getRoleLevel("staff"));
    expect(getRoleLevel("staff")).toBeLessThan(getRoleLevel("super_admin"));
  });
  test("treats legacy admin at staff level", () => {
    expect(getRoleLevel("admin")).toBe(getRoleLevel("staff"));
  });
});

describe("canManageUsers", () => {
  test("true for staff and super_admin only", () => {
    expect(canManageUsers("staff")).toBe(true);
    expect(canManageUsers("super_admin")).toBe(true);
    expect(canManageUsers("admin")).toBe(true); // legacy → staff
    expect(canManageUsers("user")).toBe(false);
    expect(canManageUsers(undefined)).toBe(false);
  });
});
