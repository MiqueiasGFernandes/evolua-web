import { describe, expect, it } from "vitest";
import { canTransition, validateCycleInput } from "../domain";

const valid = {
  title: "Meu desenvolvimento",
  description: null,
  durationType: "CUSTOM" as const,
  startDate: "2026-01-01",
  endDate: "2026-03-31"
};

describe("PDI cycle domain rules", () => {
  it("accepts valid input", () => expect(validateCycleInput(valid)).toEqual([]));
  it("rejects title and description boundaries", () => {
    expect(validateCycleInput({ ...valid, title: "ab" })).toHaveLength(1);
    expect(validateCycleInput({ ...valid, description: "x".repeat(2001) })).toHaveLength(1);
  });
  it("rejects a non-increasing calendar period", () => {
    expect(validateCycleInput({ ...valid, endDate: valid.startDate })).toHaveLength(1);
  });
  it("allows only specified transitions", () => {
    expect(canTransition("DRAFT", "ACTIVE")).toBe(true);
    expect(canTransition("ACTIVE", "COMPLETED")).toBe(true);
    expect(canTransition("COMPLETED", "ACTIVE")).toBe(false);
  });
});
