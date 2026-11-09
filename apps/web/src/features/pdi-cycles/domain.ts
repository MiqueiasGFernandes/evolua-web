export const cycleStatuses = ["DRAFT", "ACTIVE", "COMPLETED", "CANCELLED"] as const;
export const durationTypes = ["TRIMESTER", "SEMESTER", "YEAR", "CUSTOM"] as const;
export type CycleStatus = (typeof cycleStatuses)[number];
export type DurationType = (typeof durationTypes)[number];
export type StatusHistory = { id: string; fromStatus: CycleStatus | null; toStatus: CycleStatus; occurredAt: string; actorId: string };
type CycleBase = { id: string; ownerId: string; durationType: DurationType; startDate: string; endDate: string; status: CycleStatus; version: number; createdAt: string; updatedAt: string; history: StatusHistory[] };
export type LegacyPdiCycle = CycleBase & { kind: "LEGACY"; title: string; description: string | null };
export type ObjectivesPdiCycle = CycleBase & { kind: "OBJECTIVES"; objectives: string[] };
export type PdiCycle = LegacyPdiCycle | ObjectivesPdiCycle;
export type CreateCycleInput = { objectives: string[]; durationType: DurationType; startDate: string; endDate: string };
export type UpdateCycleInput = Partial<Pick<CreateCycleInput, "durationType" | "startDate" | "endDate">> & { title?: string; description?: string | null };
export type InputErrors = Record<string, string>;

export function isCalendarDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;
  return day <= daysInMonth(year, month);
}
function daysInMonth(year: number, month: number): number {
  return [31, year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}
export function calculateEndDate(start: string, duration: DurationType): string {
  if (!isCalendarDate(start) || duration === "CUSTOM" || !durationTypes.includes(duration)) return "";
  const [year, month, day] = start.split("-").map(Number);
  const offset = { TRIMESTER: 3, SEMESTER: 6, YEAR: 12 }[duration];
  const total = year * 12 + month - 1 + offset;
  const targetYear = Math.floor(total / 12), targetMonth = total % 12 + 1;
  if (targetYear > 9999) return "";
  return `${String(targetYear).padStart(4, "0")}-${String(targetMonth).padStart(2, "0")}-${String(Math.min(day, daysInMonth(targetYear, targetMonth))).padStart(2, "0")}`;
}
export function periodErrors(input: { startDate: string; endDate: string; durationType: DurationType }, automatic = true): InputErrors {
  const errors: InputErrors = {};
  if (!durationTypes.includes(input.durationType)) errors.durationType = "Selecione uma duração válida.";
  if (!isCalendarDate(input.startDate)) errors.startDate = "Informe uma data inicial válida.";
  if (!isCalendarDate(input.endDate) || (isCalendarDate(input.startDate) && input.endDate <= input.startDate)) errors.endDate = "A data final deve ser posterior à data inicial.";
  if (automatic && input.durationType !== "CUSTOM" && isCalendarDate(input.startDate) && (!calculateEndDate(input.startDate, input.durationType) || input.endDate !== calculateEndDate(input.startDate, input.durationType))) errors.endDate = "O término deve corresponder ao período calculado; verifique o início e a duração.";
  return errors;
}
export function objectiveErrors(objectives: unknown): InputErrors {
  if (!Array.isArray(objectives) || !objectives.length) return { objectives: "Informe pelo menos um objetivo." };
  return Object.fromEntries(objectives.flatMap((text, index) => typeof text === "string" && text.trim() ? [] : [[`objectives.${index}`, "Informe um objetivo não vazio."]]));
}
export function cycleInputErrors(input: CreateCycleInput): InputErrors {
  if (!input || typeof input !== "object") return { form: "Planejamento inválido." };
  const errors = { ...periodErrors(input), ...objectiveErrors(input.objectives) };
  if (Object.keys(input).some((key) => !["objectives", "durationType", "startDate", "endDate"].includes(key))) errors.form = "O cadastro aceita somente período e objetivos.";
  return errors;
}
export function validateCycleInput(input: CreateCycleInput): string[] { return Object.values(cycleInputErrors(input)); }
export function validateLegacyInput(input: { title: string; description: string | null; durationType: DurationType; startDate: string; endDate: string }): string[] {
  const errors = Object.values(periodErrors(input, false));
  if (typeof input.title !== "string" || input.title.trim().length < 3 || input.title.length > 120) errors.push("O título deve possuir entre 3 e 120 caracteres.");
  if (input.description !== null && (typeof input.description !== "string" || input.description.length > 2000)) errors.push("A descrição deve possuir no máximo 2.000 caracteres.");
  return errors;
}
export function updatedCycle(current: PdiCycle, input: UpdateCycleInput, expectedVersion: number): PdiCycle {
  if (["COMPLETED", "CANCELLED"].includes(current.status)) throw new Error("Ciclos encerrados são imutáveis.");
  if (current.version !== expectedVersion) throw new Error("O ciclo foi alterado. Recarregue antes de tentar novamente.");
  const allowed = current.kind === "LEGACY" ? ["title", "description", "durationType", "startDate", "endDate"] : ["durationType", "startDate", "endDate"];
  if (Object.keys(input).some((key) => !allowed.includes(key))) throw new Error("Alteração não permitida para este ciclo.");
  const next = { ...current, ...input } as PdiCycle;
  const errors = next.kind === "LEGACY" ? validateLegacyInput(next) : validateCycleInput({ objectives: next.objectives, startDate: next.startDate, endDate: next.endDate, durationType: next.durationType });
  if (errors.length) throw new Error(errors.join(" "));
  return { ...next, version: current.version + 1, updatedAt: new Date().toISOString() };
}
export function canTransition(from: CycleStatus, to: CycleStatus): boolean {
  return (from === "DRAFT" && (to === "ACTIVE" || to === "CANCELLED")) || (from === "ACTIVE" && (to === "COMPLETED" || to === "CANCELLED"));
}
