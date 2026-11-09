import type { PdiCycle } from "../domain";
export function formatCycleDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const instant = new Date(0);
  instant.setUTCFullYear(year, month - 1, day);
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })
    .format(instant)
    .replace(" de ", " ")
    .replace(" de ", " ");
}

export function formatCyclePeriod(startDate: string, endDate: string): string {
  return `${formatCycleDate(startDate)} — ${formatCycleDate(endDate)}`;
}

export function cycleLabel(cycle: PdiCycle): string { return cycle.kind === "LEGACY" ? cycle.title : formatCyclePeriod(cycle.startDate, cycle.endDate); }
