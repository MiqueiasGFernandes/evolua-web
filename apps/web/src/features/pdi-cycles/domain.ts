export const cycleStatuses = ["DRAFT", "ACTIVE", "PAUSED", "COMPLETED", "CANCELLED"] as const;
export const durationTypes = ["TRIMESTER", "SEMESTER", "YEAR", "CUSTOM"] as const;
export const objectiveStatuses = ["PLANNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;
export const objectivePriorities = ["LOW", "MEDIUM", "HIGH"] as const;
export const criterionStatuses = ["NOT_STARTED", "OBSERVING", "MET"] as const;
export type CycleStatus = (typeof cycleStatuses)[number];
export type DurationType = (typeof durationTypes)[number];
export type ObjectiveStatus = (typeof objectiveStatuses)[number];
export type ObjectivePriority = (typeof objectivePriorities)[number];
export type CriterionStatus = (typeof criterionStatuses)[number];
export type QuantitativeMeasurement = { type: "QUANTITATIVE"; indicatorName: string; unit: string; initialValue: number; targetValue: number; currentValue?: number };
export type QualitativeMeasurement = { type: "QUALITATIVE"; criteria: { id: string; text: string; status: CriterionStatus }[]; resultDescription?: string };
export type DevelopmentObjective = { id: string; title: string; description?: string; motivation?: string; successCriterion: string; dueDate: string; priority: ObjectivePriority; status: ObjectiveStatus; measurement: QuantitativeMeasurement | QualitativeMeasurement; completionResult?: string; completedAt?: string; createdAt: string; updatedAt: string };
export type CreateObjectiveInput = Omit<DevelopmentObjective, "id" | "createdAt" | "updatedAt" | "status" | "completedAt" | "completionResult"> & { status?: ObjectiveStatus };
export type ObjectiveSummary = { total: number; completed: number; pending: number };
export type StatusHistory = { id: string; fromStatus: CycleStatus | null; toStatus: CycleStatus; occurredAt: string; actorId: string };
type CycleBase = { id: string; ownerId: string; durationType: DurationType; startDate: string; endDate: string; status: CycleStatus; version: number; createdAt: string; updatedAt: string; history: StatusHistory[] };
export type LegacyPdiCycle = CycleBase & { kind: "LEGACY"; title: string; description: string | null };
export type ObjectivesPdiCycle = CycleBase & { kind: "OBJECTIVES"; objectives: string[]; developmentObjectives?: DevelopmentObjective[] };
export type PdiCycle = LegacyPdiCycle | ObjectivesPdiCycle;
export type CreateCycleInput = { objectives: string[]; durationType: DurationType; startDate: string; endDate: string };
export type UpdateCycleInput = Partial<Pick<CreateCycleInput, "durationType" | "startDate" | "endDate">> & { title?: string; description?: string | null };
export type InputErrors = Record<string, string>;

export function objectiveInputErrors(input: Omit<CreateObjectiveInput, "status">, cycle: Pick<PdiCycle, "startDate" | "endDate">): InputErrors {
  const errors: InputErrors = {};
  if (!input || !input.title?.trim()) errors.title = "Informe um título.";
  if (!input?.successCriterion?.trim()) errors.successCriterion = "Informe o critério de sucesso.";
  if (!isCalendarDate(input?.dueDate) || input.dueDate < cycle.startDate || input.dueDate > cycle.endDate) errors.dueDate = "O prazo deve estar dentro do período do ciclo.";
  if (!objectivePriorities.includes(input?.priority)) errors.priority = "Selecione uma prioridade válida.";
  if (!input?.measurement || (input.measurement.type !== "QUANTITATIVE" && input.measurement.type !== "QUALITATIVE")) errors.measurement = "Selecione uma mensuração válida.";
  else if (input.measurement.type === "QUANTITATIVE") {
    const m = input.measurement;
    if (!m.indicatorName.trim()) errors.indicatorName = "Informe o indicador.";
    if (!m.unit.trim()) errors.unit = "Informe a unidade.";
    if (!Number.isFinite(m.initialValue)) errors.initialValue = "Informe um valor inicial válido.";
    if (!Number.isFinite(m.targetValue) || m.targetValue === m.initialValue) errors.targetValue = "O valor-alvo deve ser válido e diferente do inicial.";
    if (m.currentValue !== undefined && !Number.isFinite(m.currentValue)) errors.currentValue = "Informe um valor atual válido.";
  } else if (!mCriteria(input.measurement.criteria)) errors.criteria = "Informe ao menos um critério observável.";
  return errors;
}
function mCriteria(criteria: QualitativeMeasurement["criteria"]) { return Array.isArray(criteria) && criteria.length > 0 && criteria.every((criterion) => criterion.text.trim() && criterionStatuses.includes(criterion.status)); }
export function objectiveProgress(objective: DevelopmentObjective): number | null {
  if (objective.measurement.type !== "QUANTITATIVE") return null;
  const { initialValue, targetValue, currentValue } = objective.measurement;
  if (currentValue === undefined || !Number.isFinite(currentValue) || targetValue === initialValue) return null;
  return Math.max(0, Math.min(100, ((currentValue - initialValue) / (targetValue - initialValue)) * 100));
}
export function isObjectiveOverdue(objective: DevelopmentObjective, today = new Date().toISOString().slice(0, 10)) { return objective.dueDate < today && !["COMPLETED", "CANCELLED"].includes(objective.status); }
export function objectiveSummary(cycle: PdiCycle): ObjectiveSummary { const items = cycle.kind === "OBJECTIVES" ? cycle.developmentObjectives ?? [] : []; return { total: items.length, completed: items.filter((item) => item.status === "COMPLETED").length, pending: items.filter((item) => ["PLANNED", "IN_PROGRESS"].includes(item.status)).length }; }
export function objectiveActionAllowed(cycle: PdiCycle, objective: DevelopmentObjective | undefined, action: "create" | "edit" | "progress" | "transition") {
  if (["COMPLETED", "CANCELLED"].includes(cycle.status) || (objective && ["COMPLETED", "CANCELLED"].includes(objective.status))) return false;
  if (action === "create" || action === "edit") return ["DRAFT", "ACTIVE", "PAUSED"].includes(cycle.status);
  return cycle.status === "ACTIVE";
}
export function objectiveTransition(objective: DevelopmentObjective, next: ObjectiveStatus, completionResult?: string): DevelopmentObjective {
  if (["COMPLETED", "CANCELLED"].includes(objective.status)) throw new Error("Objetivos encerrados são imutáveis.");
  if (!((objective.status === "PLANNED" && ["IN_PROGRESS", "CANCELLED"].includes(next)) || (objective.status === "IN_PROGRESS" && ["COMPLETED", "CANCELLED"].includes(next)))) throw new Error("Transição de objetivo inválida.");
  if (next === "COMPLETED" && !completionResult?.trim()) throw new Error("Informe o resultado alcançado para concluir.");
  const now = new Date().toISOString(); return { ...objective, status: next, completionResult: next === "COMPLETED" ? completionResult!.trim() : objective.completionResult, completedAt: next === "COMPLETED" ? now : undefined, updatedAt: now };
}

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
  return (from === "DRAFT" && (to === "ACTIVE" || to === "CANCELLED")) || (from === "ACTIVE" && (to === "PAUSED" || to === "COMPLETED" || to === "CANCELLED")) || (from === "PAUSED" && (to === "ACTIVE" || to === "CANCELLED"));
}
