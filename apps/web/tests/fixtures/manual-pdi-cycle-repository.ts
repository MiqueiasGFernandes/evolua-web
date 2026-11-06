import { canTransition, validateCycleInput, type PdiCycle } from "../../src/features/pdi-cycles/domain";
import type { PdiCycleRepository } from "../../src/features/pdi-cycles/ports/pdi-cycle-repository";
import { mixedCycles, OWNER_ID, FIXED_NOW } from "./pdi-cycle-data";

export type ManualScenario = "mixed" | "empty" | "loading" | "read-error" | "write-error" | "pending";
export function createManualRepository(scenario: ManualScenario): PdiCycleRepository & { release: () => void } {
  let cycles: PdiCycle[] = structuredClone(scenario === "empty" ? [] : mixedCycles);
  let release = () => {};
  const gate = new Promise<void>((resolve) => { release = resolve; });
  let sequence = 0;
  async function beforeWrite() {
    if (scenario === "pending") await gate;
    if (scenario === "write-error") throw new Error("Falha de gravação simulada para revisão.");
  }
  function find(id: string) {
    const cycle = cycles.find((item) => item.id === id);
    if (!cycle) throw new Error("Ciclo não encontrado.");
    return cycle;
  }
  function validate(input: Parameters<PdiCycleRepository["create"]>[0]) {
    const errors = validateCycleInput(input);
    if (errors.length) throw new Error(errors.join(" "));
  }
  return {
    release,
    async list({ status, page = 1, pageSize = 20 }) {
      if (scenario === "loading") await gate;
      if (scenario === "read-error") throw new Error("Falha de leitura simulada.");
      if (page < 1 || pageSize < 1 || pageSize > 100) throw new Error("Parâmetros de paginação inválidos.");
      const filtered = cycles.filter((item) => !status || item.status === status);
      return structuredClone({ items: filtered.slice((page - 1) * pageSize, page * pageSize), page, pageSize, total: filtered.length, hasNext: page * pageSize < filtered.length });
    },
    async get(id) { return structuredClone(cycles.find((item) => item.id === id) ?? null); },
    async create(input) {
      await beforeWrite(); validate(input);
      const id = `manual-${++sequence}`;
      const cycle: PdiCycle = { ...input, id, ownerId: OWNER_ID, status: "DRAFT", version: 1, createdAt: FIXED_NOW, updatedAt: FIXED_NOW, history: [{ id: `history-${id}`, fromStatus: null, toStatus: "DRAFT", actorId: OWNER_ID, occurredAt: FIXED_NOW }] };
      cycles.push(cycle); return structuredClone(cycle);
    },
    async update(id, input, expectedVersion) {
      await beforeWrite(); const current = find(id);
      if (current.status === "COMPLETED" || current.status === "CANCELLED") throw new Error("Ciclos encerrados são imutáveis.");
      if (current.version !== expectedVersion) throw new Error("O ciclo foi alterado. Recarregue antes de tentar novamente.");
      const updated = { ...current, ...input, version: current.version + 1, updatedAt: FIXED_NOW };
      validate(updated); cycles = cycles.map((item) => item.id === id ? updated : item);
      return structuredClone(updated);
    },
    async transition(id, status) {
      await beforeWrite(); const current = find(id);
      if (!canTransition(current.status, status)) throw new Error("Transição de status inválida.");
      if (status === "ACTIVE" && cycles.some((item) => item.status === "ACTIVE")) throw new Error("Já existe um ciclo ACTIVE.");
      const updated = { ...current, status, version: current.version + 1, updatedAt: FIXED_NOW, history: [...current.history, { id: `history-${++sequence}`, fromStatus: current.status, toStatus: status, actorId: OWNER_ID, occurredAt: FIXED_NOW }] };
      cycles = cycles.map((item) => item.id === id ? updated : item);
      return structuredClone(updated);
    }
  };
}
