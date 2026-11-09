import { z } from "zod";
import { canTransition, cycleStatuses, durationTypes, isCalendarDate, updatedCycle, validateCycleInput, validateLegacyInput, type PdiCycle } from "../domain";
import type { PdiCycleRepository } from "../ports/pdi-cycle-repository";
const v1 = "evolua:pdi-cycles:v1", v2 = "evolua:pdi-cycles:v2", ownerId = "local-user";
const date = z.string().refine(isCalendarDate);
const record = z.object({ id: z.string().min(1), ownerId: z.string().min(1), durationType: z.enum(durationTypes), startDate: date, endDate: date, status: z.enum(cycleStatuses), version: z.number().int().min(1), createdAt: z.string().datetime(), updatedAt: z.string().datetime(), history: z.array(z.object({ id: z.string().min(1), fromStatus: z.enum(cycleStatuses).nullable(), toStatus: z.enum(cycleStatuses), occurredAt: z.string().datetime(), actorId: z.string().min(1) })).min(1) }).passthrough();
type Envelope = { schemaVersion: 2; legacySource: string | null; cycles: PdiCycle[] };
function decode(value: unknown, legacy: boolean): PdiCycle[] {
  if (!Array.isArray(value)) throw new Error("Armazenamento inválido. Preserve os dados antes da recuperação.");
  const cycles = value.map((raw) => {
    const base = record.parse(raw);
    const kind = legacy ? "LEGACY" : base.kind;
    if (kind !== "LEGACY" && kind !== "OBJECTIVES") throw new Error("Formato de ciclo desconhecido.");
    const result = { ...base, kind } as PdiCycle;
    if (kind === "LEGACY") {
      z.object({ title: z.string(), description: z.string().nullable() }).parse(base);
      if (validateLegacyInput(result as Extract<PdiCycle, { kind: "LEGACY" }>).length || "objectives" in base) throw new Error("Registro histórico inválido.");
    } else {
      const fields = z.object({ objectives: z.array(z.string()) }).parse(base);
      if (validateCycleInput({ ...fields, startDate: base.startDate, endDate: base.endDate, durationType: base.durationType }).length || "title" in base || "description" in base) throw new Error("Registro por objetivos inválido.");
    }
    return result;
  });
  if (new Set(cycles.map(({ id }) => id)).size !== cycles.length) throw new Error("Identificadores duplicados no armazenamento.");
  return cycles;
}
function write(state: Envelope) { window.localStorage.setItem(v2, JSON.stringify(state)); }
function read(): Envelope {
  const source = window.localStorage.getItem(v1);
  const raw = window.localStorage.getItem(v2);
  if (raw !== null) {
    const parsed = z.object({ schemaVersion: z.literal(2), legacySource: z.string().nullable(), cycles: z.unknown() }).parse(JSON.parse(raw));
    if (source !== parsed.legacySource) throw new Error("Uma versão anterior alterou os dados. Feche as versões antigas e preserve ambos os armazenamentos antes da recuperação.");
    return { ...parsed, cycles: decode(parsed.cycles, false) };
  }
  const state: Envelope = { schemaVersion: 2, legacySource: source, cycles: decode(source === null ? [] : JSON.parse(source), true) };
  write(state); return state;
}
function find(state: Envelope, id: string): number {
  const index = state.cycles.findIndex((cycle) => cycle.id === id && cycle.ownerId === ownerId);
  if (index < 0) throw new Error("Ciclo não encontrado."); return index;
}
export const localStoragePdiCycleRepository: PdiCycleRepository = {
  async create(input) {
    const errors = validateCycleInput(input); if (errors.length) throw new Error(errors.join(" "));
    const state = read(), now = new Date().toISOString(), id = crypto.randomUUID();
    const cycle: PdiCycle = { ...input, objectives: input.objectives.map((text) => text.trim()), kind: "OBJECTIVES", id, ownerId, status: "DRAFT", version: 1, createdAt: now, updatedAt: now, history: [{ id: crypto.randomUUID(), fromStatus: null, toStatus: "DRAFT", occurredAt: now, actorId: ownerId }] };
    write({ ...state, cycles: [...state.cycles, cycle] }); return cycle;
  },
  async list({ status, page = 1, pageSize = 20 } = {}) {
    if (!Number.isInteger(page) || !Number.isInteger(pageSize) || page < 1 || pageSize < 1 || pageSize > 100 || (status && !cycleStatuses.includes(status))) throw new Error("Parâmetros de paginação inválidos.");
    const filtered = read().cycles.filter((cycle) => cycle.ownerId === ownerId && (!status || cycle.status === status));
    return { items: filtered.slice((page - 1) * pageSize, page * pageSize), page, pageSize, total: filtered.length, hasNext: page * pageSize < filtered.length };
  },
  async get(id) { return read().cycles.find((cycle) => cycle.id === id && cycle.ownerId === ownerId) ?? null; },
  async update(id, input, expectedVersion) {
    const state = read(), index = find(state, id);
    const next = updatedCycle(state.cycles[index], input, expectedVersion);
    state.cycles[index] = next; write(state); return next;
  },
  async transition(id, status) {
    const state = read(), index = find(state, id), current = state.cycles[index];
    if (!canTransition(current.status, status)) throw new Error("Transição de status inválida.");
    if (status === "ACTIVE" && state.cycles.some((cycle) => cycle.ownerId === ownerId && cycle.status === "ACTIVE")) throw new Error("Já existe um ciclo ACTIVE.");
    const now = new Date().toISOString();
    const next = { ...current, status, version: current.version + 1, updatedAt: now, history: [...current.history, { id: crypto.randomUUID(), fromStatus: current.status, toStatus: status, occurredAt: now, actorId: ownerId }] };
    state.cycles[index] = next; write(state); return next;
  }
};
