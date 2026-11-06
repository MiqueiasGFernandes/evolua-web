import { describe, expect, it } from "vitest";
import { createManualRepository } from "../../../../tests/fixtures/manual-pdi-cycle-repository";

describe("repositório de revisão isolado", () => {
  it("mantém leitura pendente até liberação", async () => {
    const repo = createManualRepository("loading");
    let resolved = false;
    const result = repo.list({}).then((value) => { resolved = true; return value; });
    await Promise.resolve();
    expect(resolved).toBe(false);
    repo.release();
    expect((await result).items.length).toBeGreaterThan(0);
  });
  it("reproduz erros sem mutar dados", async () => {
    await expect(createManualRepository("read-error").list({})).rejects.toThrow();
    const repo = createManualRepository("write-error");
    const before = await repo.list({});
    await expect(repo.transition(before.items[0].id, "COMPLETED")).rejects.toThrow();
    await expect(repo.create({ title: "Plano", description: null, durationType: "CUSTOM", startDate: "2026-01-01", endDate: "2026-04-01" })).rejects.toThrow();
    expect(await repo.list({})).toEqual(before);
  });
  it("isola cenários e rejeita segundo ativo", async () => {
    const repo = createManualRepository("mixed");
    const draft = (await repo.list({ status: "DRAFT" })).items[0];
    await expect(repo.transition(draft.id, "ACTIVE")).rejects.toThrow();
    await repo.transition(draft.id, "CANCELLED");
    expect((await createManualRepository("mixed").list({ status: "DRAFT" })).items).toHaveLength(1);
    expect((await createManualRepository("empty").list({})).items).toEqual([]);
  });
});
