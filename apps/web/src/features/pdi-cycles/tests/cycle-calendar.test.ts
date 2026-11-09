import { expect, it } from "vitest";
import { calculateEndDate, isCalendarDate, validateCycleInput } from "../domain";
it.each([
  ["2026-01-10", "TRIMESTER", "2026-04-10"], ["2026-01-31", "TRIMESTER", "2026-04-30"],
  ["2024-02-29", "YEAR", "2025-02-28"], ["2023-08-31", "SEMESTER", "2024-02-29"],
  ["2026-11-30", "TRIMESTER", "2027-02-28"], ["0001-01-01", "YEAR", "0002-01-01"]
] as const)("calendar %s %s", (start, duration, end) => expect(calculateEndDate(start, duration)).toBe(end));
it("rejects invalid/unrepresentable dates and tampered automatic ends", () => {
  expect(isCalendarDate("2026-02-30")).toBe(false);
  expect(isCalendarDate("0000-01-01")).toBe(false);
  expect(calculateEndDate("9999-12-01", "YEAR")).toBe("");
  expect(calculateEndDate("", "YEAR")).toBe("");
  expect(validateCycleInput({ objectives: ["x"], startDate: "2026-01-01", endDate: "2026-04-02", durationType: "TRIMESTER" }).length).toBeGreaterThan(0);
});
