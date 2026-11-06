import type { CreateCycleInput, CycleStatus, PdiCycle, StatusHistory } from "../domain";
import { canTransition, validateCycleInput } from "../domain";
import type { ListCyclesQuery, PagedCycles, PdiCycleRepository } from "../ports/pdi-cycle-repository";

const storageKey = "evolua:pdi-cycles:v1";
const ownerId = "local-user";

function uuid(): string {
  return crypto.randomUUID();
}

function read(): PdiCycle[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(storageKey);
  return raw ? (JSON.parse(raw) as PdiCycle[]) : [];
}

function write(cycles: PdiCycle[]): void {
  window.localStorage.setItem(storageKey, JSON.stringify(cycles));
}

function assertValid(input: CreateCycleInput): void {
  const errors = validateCycleInput(input);
  if (errors.length > 0) throw new Error(errors.join(" "));
}

export const localStoragePdiCycleRepository: PdiCycleRepository = {
  async create(input) {
    assertValid(input);
    const now = new Date().toISOString();
    const history: StatusHistory = { id: uuid(), fromStatus: null, toStatus: "DRAFT", occurredAt: now, actorId: ownerId };
    const cycle: PdiCycle = { ...input, id: uuid(), ownerId, status: "DRAFT", version: 1, createdAt: now, updatedAt: now, history: [history] };
    write([...read(), cycle]);
    return cycle;
  },
  async list({ status, page = 1, pageSize = 20 }: ListCyclesQuery = {}) {
    if (page < 1 || pageSize < 1 || pageSize > 100) throw new Error("Parâmetros de paginação inválidos.");
    const filtered = read().filter((cycle) => cycle.ownerId === ownerId && (!status || cycle.status === status));
    const items = filtered.slice((page - 1) * pageSize, page * pageSize);
    return { items, page, pageSize, total: filtered.length, hasNext: page * pageSize < filtered.length } satisfies PagedCycles;
  },
  async get(id) { return read().find((cycle) => cycle.id === id && cycle.ownerId === ownerId) ?? null; },
  async update(id, input, expectedVersion) {
    const cycles = read();
    const index = cycles.findIndex((cycle) => cycle.id === id && cycle.ownerId === ownerId);
    if (index < 0) throw new Error("Ciclo não encontrado.");
    const current = cycles[index];
    if (current.status === "COMPLETED" || current.status === "CANCELLED") throw new Error("Ciclos encerrados são imutáveis.");
    if (current.version !== expectedVersion) throw new Error("O ciclo foi alterado. Recarregue antes de tentar novamente.");
    const next = { ...current, ...input, version: current.version + 1, updatedAt: new Date().toISOString() };
    assertValid({ title: next.title, description: next.description, durationType: next.durationType, startDate: next.startDate, endDate: next.endDate });
    cycles[index] = next;
    write(cycles);
    return next;
  },
  async transition(id, status) {
    const cycles = read();
    const index = cycles.findIndex((cycle) => cycle.id === id && cycle.ownerId === ownerId);
    if (index < 0) throw new Error("Ciclo não encontrado.");
    const current = cycles[index];
    if (!canTransition(current.status, status)) throw new Error("Transição de status inválida.");
    if (status === "ACTIVE" && cycles.some((cycle) => cycle.ownerId === ownerId && cycle.status === "ACTIVE")) throw new Error("Já existe um ciclo ACTIVE.");
    const now = new Date().toISOString();
    const history = { id: uuid(), fromStatus: current.status, toStatus: status, occurredAt: now, actorId: ownerId } satisfies StatusHistory;
    const next = { ...current, status, version: current.version + 1, updatedAt: now, history: [...current.history, history] };
    cycles[index] = next;
    write(cycles);
    return next;
  }
};
