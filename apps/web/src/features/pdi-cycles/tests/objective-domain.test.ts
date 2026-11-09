import { describe, expect, it } from "vitest";
import { objectiveInputErrors, objectiveTransition, type CreateObjectiveInput, type PdiCycle } from "../domain";

const cycle = { id: "cycle", ownerId: "local-user", kind: "OBJECTIVES", objectives: [], durationType: "CUSTOM", startDate: "2026-01-01", endDate: "2026-03-31", status: "ACTIVE", version: 1, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z", history: [] } as unknown as PdiCycle;
const input: CreateObjectiveInput = { title: "Melhorar clareza", successCriterion: "Receber feedback positivo", dueDate: "2026-03-31", priority: "MEDIUM", measurement: { type: "QUANTITATIVE", indicatorName: "Feedback", unit: "pontos", initialValue: 1, targetValue: 5 } };
describe("objetivos de desenvolvimento", () => {
  it("valida prazo e mensuração quantitativa", () => { expect(objectiveInputErrors(input, cycle)).toEqual({}); expect(objectiveInputErrors({ ...input, dueDate: "2025-12-31" }, cycle).dueDate).toBeTruthy(); expect(objectiveInputErrors({ ...input, measurement: { type: "QUANTITATIVE", indicatorName: "Feedback", unit: "pontos", initialValue: 1, targetValue: 1 } }, cycle).targetValue).toBeTruthy(); });
  it("exige resultado e mantém encerrados imutáveis", () => { const objective = { ...input, id: "objective", status: "IN_PROGRESS" as const, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" }; expect(() => objectiveTransition(objective, "COMPLETED")).toThrow("resultado"); const completed = objectiveTransition(objective, "COMPLETED", "Meta atingida"); expect(() => objectiveTransition(completed, "IN_PROGRESS")).toThrow("imutáveis"); });
});
