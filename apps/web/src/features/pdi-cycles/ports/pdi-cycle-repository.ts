import type { CreateCycleInput, CycleStatus, PdiCycle } from "../domain";

export type ListCyclesQuery = { status?: CycleStatus; page?: number; pageSize?: number };
export type PagedCycles = { items: PdiCycle[]; page: number; pageSize: number; total: number; hasNext: boolean };

export interface PdiCycleRepository {
  create(input: CreateCycleInput): Promise<PdiCycle>;
  list(query: ListCyclesQuery): Promise<PagedCycles>;
  get(id: string): Promise<PdiCycle | null>;
  update(id: string, input: Partial<CreateCycleInput>, expectedVersion: number): Promise<PdiCycle>;
  transition(id: string, status: Exclude<CycleStatus, "DRAFT">): Promise<PdiCycle>;
}
