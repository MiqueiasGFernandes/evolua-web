import { expect, test } from "@playwright/test";
import { cycleFixture, readCycles, seedCycles } from "../fixtures/pdi-cycles";

test("redireciona a raiz e cria um rascunho persistente", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/pdi-cycles$/);
  await page.getByLabel("Título").fill("Plano de evolução");
  await page.getByLabel("Data inicial").fill("2026-01-01");
  await page.getByLabel("Data final").fill("2026-04-01");
  await page.getByRole("button", { name: "Criar ciclo" }).click();
  await expect(page.getByText("Plano de evolução", { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText("Plano de evolução", { exact: true })).toBeVisible();
  const [cycle] = await readCycles(page);
  expect(cycle.status).toBe("DRAFT");
  expect(cycle.description).toBeNull();
  expect(cycle.history).toHaveLength(1);
});

test("preserva filtro e executa as quatro transições permitidas", async ({ page }) => {
  const cases = [
    { from: "DRAFT", action: "Iniciar", to: "ACTIVE" },
    { from: "DRAFT", action: "Cancelar", to: "CANCELLED" },
    { from: "ACTIVE", action: "Concluir", to: "COMPLETED" },
    { from: "ACTIVE", action: "Cancelar", to: "CANCELLED" }
  ] as const;

  for (const [index, item] of cases.entries()) {
    await seedCycles(page, [cycleFixture(item.from, index + 1)]);
    await page.getByLabel("Filtrar por status").selectOption(item.from);
    await page.getByRole("button", { name: new RegExp(item.action) }).click();
    await expect(page.getByLabel("Filtrar por status")).toHaveValue(item.from);
    const [cycle] = await readCycles(page);
    expect(cycle.status).toBe(item.to);
    expect(cycle.history.at(-1)?.toStatus).toBe(item.to);
  }
});

test("recusa um segundo ciclo ativo sem alterar os dados", async ({ page }) => {
  await seedCycles(page, [cycleFixture("ACTIVE", 1), cycleFixture("DRAFT", 2)]);
  await page.getByRole("button", { name: /Iniciar/ }).click();
  await expect(page.getByText("Já existe um ciclo ACTIVE.", { exact: true })).toBeVisible();
  const cycles = await readCycles(page);
  expect(cycles.map(({ status }) => status)).toEqual(["ACTIVE", "DRAFT"]);
});
