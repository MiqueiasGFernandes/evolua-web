import type { CreateCycleInput, UpdateCycleInput, CycleStatus, CreateObjectiveInput, DevelopmentObjective, ObjectiveStatus, PdiCycle } from "../domain";

export type ListCyclesQuery = { status?: CycleStatus; page?: number; pageSize?: number };
export type PagedCycles = { items: PdiCycle[]; page: number; pageSize: number; total: number; hasNext: boolean };

export interface PdiCycleRepository {
  create(input: CreateCycleInput): Promise<PdiCycle>;
  list(query: ListCyclesQuery): Promise<PagedCycles>;
  get(id: string): Promise<PdiCycle | null>;
  update(id: string, input: UpdateCycleInput, expectedVersion: number): Promise<PdiCycle>;
  transition(id: string, status: Exclude<CycleStatus, "DRAFT">): Promise<PdiCycle>;
  createObjective(cycleId: string, input: CreateObjectiveInput, expectedVersion: number): Promise<PdiCycle>;
  updateObjective(cycleId: string, objectiveId: string, input: Partial<CreateObjectiveInput>, expectedVersion: number): Promise<PdiCycle>;
  updateObjectiveResult(cycleId: string, objectiveId: string, input: Partial<Pick<DevelopmentObjective, "measurement">>, expectedVersion: number): Promise<PdiCycle>;
  transitionObjective(cycleId: string, objectiveId: string, status: ObjectiveStatus, expectedVersion: number, completionResult?: string): Promise<PdiCycle>;
}
