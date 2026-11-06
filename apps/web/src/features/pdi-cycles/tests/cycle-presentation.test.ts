import { describe, expect, it } from "vitest";
import { formatCycleDate, formatCyclePeriod } from "../components/cycle-presentation";

describe("apresentação de período", () => {
  it("formata datas de calendário sem deslocar o dia", () => {
    expect(formatCycleDate("2026-01-01")).toContain("01");
    expect(formatCycleDate("2026-12-31")).toContain("31");
    expect(formatCyclePeriod("2026-01-01", "2026-03-31")).toMatch(/01.*—.*31/);
  });
});
