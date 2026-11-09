import { expect, test } from "@playwright/test";
import { fillPlanning } from "../fixtures/wizard";
test("cenários isolados, pendência controlada e componentes reais", async ({ page }) => {
  await page.goto("/");
  const scenario = page.getByLabel("Cenário de teste");
  await expect(page.getByRole("table")).toBeVisible();
  await page.screenshot({ path: "../../specs/005-cadastro-guiado-ciclos/validation/manual-surface.png", fullPage: true });
  await scenario.selectOption("loading");
  await expect(page.getByText("Carregando seus ciclos")).toBeVisible();
  await page.getByRole("button", { name: "Liberar operação pendente" }).click();
  await expect(page.getByRole("table")).toBeVisible();
  await scenario.selectOption("read-error");
  await expect(page.getByRole("heading", { name: "Não foi possível carregar os ciclos" })).toBeVisible();
  await scenario.selectOption("write-error");
  await page.getByRole("button", { name: /Concluir ciclo/ }).click();
  await expect(page.getByRole("alert")).toContainText("Falha de gravação");
  await scenario.selectOption("pending");
  await page.getByRole("button", { name: /Concluir ciclo/ }).click();
  await expect(page.getByRole("button", { name: /Concluir ciclo/ })).toBeDisabled();
  await page.getByRole("button", { name: "Liberar operação pendente" }).click();
  await expect(page.getByText("Ciclo concluído com sucesso.")).toBeVisible();
  await page.getByRole("button", { name: "Reiniciar cenário" }).click();
  await expect(page.getByRole("button", { name: /Concluir ciclo/ })).toBeEnabled();
  await scenario.selectOption("mixed");
  await page.getByLabel("Contexto de revisão").selectOption("page");
  await page.getByLabel("Data inicial").fill("2026-01-01");
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByLabel("Objetivo 1", { exact: true }).fill("Objetivo na página isolada");
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await page.getByRole("button", { name: "Criar ciclo", exact: true }).click();
  await expect(page.getByLabel("Contexto de revisão")).toHaveValue("consultation");
  await expect(page.getByRole("table").getByText("Objetivo na página isolada", { exact: true })).toBeVisible();
  await scenario.selectOption("empty");
  await expect(page.getByRole("heading", { name: "Seu primeiro ciclo começa aqui" })).toBeVisible();
});

for (const surface of ["consultation", "page"]) {
 test(`creation error and pending are controlled in ${surface}`, async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Cenário de teste").selectOption("write-error");
  await page.getByLabel("Contexto de revisão").selectOption(surface);
  if (surface === "consultation") await page.getByRole("button", { name: "Novo ciclo", exact: true }).click();
  await fillPlanning(page);
  await page.getByRole("button", { name: "Criar ciclo", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("Seus dados continuam");
  await expect(page.getByText("Desenvolver liderança", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Cancelar", exact: true }).click();
  await page.getByRole("button", { name: "Descartar", exact: true }).click();
  await page.getByLabel("Cenário de teste").selectOption("pending");
  await page.getByLabel("Contexto de revisão").selectOption(surface);
  if (surface === "consultation") await page.getByRole("button", { name: "Novo ciclo", exact: true }).click();
  await fillPlanning(page);
  await page.getByRole("button", { name: "Criar ciclo", exact: true }).click();
  await expect(page.getByRole("button", { name: "Cancelar", exact: true })).toBeDisabled();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Descartar", exact: true })).toHaveCount(0);
  // The review toolbar belongs to the inert background while a modal is open.
  // Trigger its test-only release programmatically when the modal is open.
  await page.getByRole("button", { name: "Liberar operação pendente", includeHidden: true }).evaluate((button: HTMLButtonElement) => button.click());
  await expect(page.getByRole("table").getByText("Desenvolver liderança", { exact: true })).toHaveCount(1);
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
 });
}
