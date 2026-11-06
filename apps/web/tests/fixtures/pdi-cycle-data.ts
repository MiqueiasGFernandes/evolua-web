import type { CycleStatus, PdiCycle } from "../../src/features/pdi-cycles/domain";

export const STORAGE_KEY = "evolua:pdi-cycles:v1";
export const OWNER_ID = "local-user";
export const FIXED_NOW = "2026-11-06T12:00:00.000Z";

export function cycleFixture(status: CycleStatus, index = 1, overrides: Partial<PdiCycle> = {}): PdiCycle {
  const id = `cycle-${status.toLowerCase()}-${index}`;
  return {
    id,
    ownerId: OWNER_ID,
    title: `${status === "ACTIVE" ? "Comunicação e liderança" : "Ciclo"} ${index}`,
    description: null,
    durationType: "CUSTOM",
    startDate: `2026-0${Math.min(index, 9)}-01`,
    endDate: `2026-${String(Math.min(index + 2, 12)).padStart(2, "0")}-28`,
    status,
    version: 1,
    createdAt: FIXED_NOW,
    updatedAt: FIXED_NOW,
    history: [{ id: `history-${id}`, fromStatus: null, toStatus: "DRAFT", occurredAt: FIXED_NOW, actorId: OWNER_ID }],
    ...overrides
  };
}

export const mixedCycles = [
  cycleFixture("ACTIVE", 1),
  cycleFixture("DRAFT", 2, { title: "Fortalecer repertório técnico" }),
  cycleFixture("COMPLETED", 3, { title: "Mentoria e colaboração" }),
  cycleFixture("CANCELLED", 4, { title: "Especialização anterior" })
];

