export const cycleStatuses = ["DRAFT", "ACTIVE", "COMPLETED", "CANCELLED"] as const;
export const durationTypes = ["TRIMESTER", "SEMESTER", "YEAR", "CUSTOM"] as const;

export type CycleStatus = (typeof cycleStatuses)[number];
export type DurationType = (typeof durationTypes)[number];

export type StatusHistory = {
  id: string;
  fromStatus: CycleStatus | null;
  toStatus: CycleStatus;
  occurredAt: string;
  actorId: string;
};

export type PdiCycle = {
  id: string;
  ownerId: string;
  title: string;
  description: string | null;
  durationType: DurationType;
  startDate: string;
  endDate: string;
  status: CycleStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
  history: StatusHistory[];
};

export type CreateCycleInput = Omit<
  PdiCycle,
  "id" | "ownerId" | "status" | "version" | "createdAt" | "updatedAt" | "history"
>;

export function validateCycleInput(input: CreateCycleInput): string[] {
  const errors: string[] = [];
  if (input.title.trim().length < 3 || input.title.length > 120) {
    errors.push("O título deve possuir entre 3 e 120 caracteres.");
  }
  if ((input.description?.length ?? 0) > 2000) {
    errors.push("A descrição deve possuir no máximo 2.000 caracteres.");
  }
  if (!input.startDate || !input.endDate || input.endDate <= input.startDate) {
    errors.push("A data final deve ser posterior à data inicial.");
  }
  return errors;
}

export function canTransition(from: CycleStatus, to: CycleStatus): boolean {
  return (
    (from === "DRAFT" && (to === "ACTIVE" || to === "CANCELLED")) ||
    (from === "ACTIVE" && (to === "COMPLETED" || to === "CANCELLED"))
  );
}
