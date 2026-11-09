import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { localStoragePdiCycleRepository as repo } from "../adapters/local-storage-pdi-cycle-repository";
import { legacyCycles } from "../../../../tests/fixtures/legacy-cycle-data";
const v1 = "evolua:pdi-cycles:v1", v2 = "evolua:pdi-cycles:v2";
const input = { objectives: [" a ", "b"], durationType: "CUSTOM" as const, startDate: "2026-01-01", endDate: "2026-02-01" };
beforeEach(() => localStorage.clear()); afterEach(() => vi.restoreAllMocks());
it("migrates once without changing old data or the backup", async () => {
  const raw = JSON.stringify(legacyCycles); localStorage.setItem(v1, raw);
  const first = await repo.list({}); await repo.list({});
  expect(first.items.map((cycle) => { const copy = { ...cycle }; Reflect.deleteProperty(copy, "kind"); return copy; })).toEqual(legacyCycles.map((cycle) => { const copy = { ...cycle }; Reflect.deleteProperty(copy, "kind"); return copy; }));
  expect(localStorage.getItem(v1)).toBe(raw);
  expect(JSON.parse(localStorage.getItem(v2)!).cycles).toHaveLength(4);
});
it("persists trimmed ordered goals, ownership/history, rejects invalid and immutable updates", async () => {
  const cycle = await repo.create(input);
  expect(cycle).toMatchObject({ kind: "OBJECTIVES", objectives: ["a", "b"], status: "DRAFT", version: 1, ownerId: "local-user" });
  expect(cycle.history).toHaveLength(1); expect(cycle).not.toHaveProperty("title");
  expect(await repo.get(cycle.id)).toEqual(cycle);
  await expect(repo.update(cycle.id, { objectives: ["mutated"] } as never, 1)).rejects.toThrow();
  await repo.transition(cycle.id, "CANCELLED");
  await expect(repo.update(cycle.id, {}, 2)).rejects.toThrow();
  await expect(repo.create({ ...input, objectives: [""] })).rejects.toThrow();
});
it("preserves version checks and one active across variants", async () => {
 localStorage.setItem(v1, JSON.stringify(legacyCycles));
 const draft = (await repo.list({ status: "DRAFT" })).items[0];
 await expect(repo.transition(draft.id, "ACTIVE")).rejects.toThrow();
 await expect(repo.update(draft.id, { title: "Alterado" }, 99)).rejects.toThrow();
 await repo.update(draft.id, { title: "Alterado" }, draft.version);
 expect((await repo.get(draft.id))?.endDate).toBe(draft.endDate);
});
it("fails safely for malformed data, unknown versions and v1 divergence", async () => {
 localStorage.setItem(v1, "broken"); await expect(repo.list({})).rejects.toThrow(); expect(localStorage.getItem(v2)).toBeNull();
 localStorage.setItem(v1, JSON.stringify([{ nope: true }])); await expect(repo.list({})).rejects.toThrow();
 localStorage.removeItem(v1); localStorage.setItem(v2, JSON.stringify({ schemaVersion: 8, cycles: [] })); await expect(repo.list({})).rejects.toThrow();
 localStorage.removeItem(v2); await repo.list({}); localStorage.setItem(v1, "[]");
 await expect(repo.create(input)).rejects.toThrow(); expect(JSON.parse(localStorage.getItem(v2)!).cycles).toEqual([]);
});
it("does not mutate either key on quota/write failure and can retry", async () => {
 const raw = JSON.stringify(legacyCycles); localStorage.setItem(v1, raw);
 const spy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("quota"); });
 await expect(repo.list({})).rejects.toThrow(); expect(localStorage.getItem(v1)).toBe(raw); expect(localStorage.getItem(v2)).toBeNull();
 spy.mockRestore(); await repo.list({}); const before = localStorage.getItem(v2);
 vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("quota"); });
 await expect(repo.create(input)).rejects.toThrow(); expect(localStorage.getItem(v2)).toBe(before);
});

it("isolates foreign owners for reads, updates and transitions", async () => {
 const foreign = { ...legacyCycles[0], ownerId: "other-owner" };
 localStorage.setItem(v1, JSON.stringify([foreign]));
 expect((await repo.list({})).items).toEqual([]);
 expect(await repo.get(foreign.id)).toBeNull();
 const before = localStorage.getItem(v2);
 await expect(repo.update(foreign.id, { title: "Changed" }, foreign.version)).rejects.toThrow();
 await expect(repo.transition(foreign.id, "CANCELLED")).rejects.toThrow();
 expect(localStorage.getItem(v2)).toBe(before);
});

it("preserves storage through read failures and malformed v2 records", async () => {
 await repo.create(input);
 const before = localStorage.getItem(v2);
 const read = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("read failure"); });
 await expect(repo.create(input)).rejects.toThrow();
 read.mockRestore();
 expect(localStorage.getItem(v2)).toBe(before);
 const corrupt = JSON.parse(before!);
 corrupt.cycles[0].objectives = [""];
 const raw = JSON.stringify(corrupt);
 localStorage.setItem(v2, raw);
 await expect(repo.list({})).rejects.toThrow();
 expect(localStorage.getItem(v2)).toBe(raw);
});
