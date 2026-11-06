export function formatCycleDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
    .format(new Date(year, month - 1, day))
    .replace(" de ", " ")
    .replace(" de ", " ");
}

export function formatCyclePeriod(startDate: string, endDate: string): string {
  return `${formatCycleDate(startDate)} — ${formatCycleDate(endDate)}`;
}
