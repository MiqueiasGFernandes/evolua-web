import { describe, expect, it } from "vitest";
import { canTransition, validateCycleInput, validateLegacyInput } from "../domain";
const valid = { objectives: ["Meu desenvolvimento"], durationType: "CUSTOM" as const, startDate: "2026-01-01", endDate: "2026-03-31" };
describe("PDI cycle domain rules", () => {
  it("accepts goals and rejects blank lists/items and unknown fields", () => {
    expect(validateCycleInput(valid)).toEqual([]);
    for (const objectives of [[], [" "], ["ok", ""]]) expect(validateCycleInput({ ...valid, objectives }).length).toBeGreaterThan(0);
    expect(validateCycleInput({ ...valid, title: "inventado" } as typeof valid).length).toBeGreaterThan(0);
    expect(validateCycleInput({ ...valid, objectives: ["igual", "igual"] })).toEqual([]);
  });
  it("preserves legacy boundaries and informational duration", () => {
    const old = { title: "abc", description: null, durationType: "YEAR" as const, startDate: "2026-01-01", endDate: "2026-02-01" };
    expect(validateLegacyInput(old)).toEqual([]);
    expect(validateLegacyInput({ ...old, title: "ab" })).toHaveLength(1);
    expect(validateLegacyInput({ ...old, description: "x".repeat(2001) })).toHaveLength(1);
  });
  it("rejects non-increasing/invalid dates", () => {
    expect(validateCycleInput({ ...valid, endDate: valid.startDate }).length).toBeGreaterThan(0);
    expect(validateCycleInput({ ...valid, startDate: "2026-02-30" }).length).toBeGreaterThan(0);
  });
  it("allows only specified transitions", () => {
    expect(canTransition("DRAFT", "ACTIVE")).toBe(true);
    expect(canTransition("ACTIVE", "COMPLETED")).toBe(true);
    expect(canTransition("COMPLETED", "ACTIVE")).toBe(false);
    expect(canTransition("CANCELLED", "ACTIVE")).toBe(false);
  });
});
