import { expect, test } from "@playwright/test";
import { mixedCycles, seedCycles } from "../fixtures/pdi-cycles";

test("menu desktop recolhe e âncoras identificam e focam o destino", async ({ page }) => {
  await seedCycles(page, mixedCycles);
  const sidebar = page.getByRole("complementary", { name: "Navegação principal" });
  await sidebar.getByRole("button", { name: "Recolher menu" }).click();
  await expect(sidebar.getByRole("button", { name: "Expandir menu" })).toHaveAttribute("aria-expanded", "false");
  await sidebar.getByRole("link", { name: "Novo Ciclo", exact: true }).click();
  await expect(page.locator("#novo-ciclo")).toBeFocused();
  await expect(sidebar.getByRole("link", { name: "Novo Ciclo", exact: true })).toHaveAttribute("aria-current", "location");
  await expect(page.getByLabel("Filtrar por status")).toHaveValue("");
});

for (const width of [390, 768]) {
  test(`menu em ${width}px restaura foco e navega por teclado`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await seedCycles(page, mixedCycles);
    const trigger = page.getByRole("button", { name: "Abrir menu de navegação" });
    const dialog = page.getByRole("dialog", { name: "Menu de navegação" });
    await trigger.click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await page.keyboard.press("Enter");
    await dialog.getByRole("link", { name: "Novo Ciclo", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(dialog).not.toBeVisible();
    await expect(page.locator("#novo-ciclo")).toBeFocused();
    await page.getByLabel("Título", { exact: true }).fill("Rascunho preservado");
    await trigger.click();
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(dialog).not.toBeVisible();
    await expect(page.getByLabel("Título", { exact: true })).toHaveValue("Rascunho preservado");
    await expect(page.locator("#meus-ciclos")).toBeFocused();
  });
}

test("atalho Novo ciclo leva o foco ao formulário sem limpar valores", async ({ page }) => {
  await seedCycles(page, []);
  await page.getByLabel("Título", { exact: true }).fill("Planejamento em andamento");
  await page.getByRole("button", { name: "Novo ciclo", exact: true }).click();
  await expect(page.locator("#novo-ciclo")).toBeFocused();
  await expect(page.getByLabel("Título", { exact: true })).toHaveValue("Planejamento em andamento");
});

test("atalho, retorno por botão/fundo e foco reverso no modal", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await seedCycles(page, mixedCycles);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Ir para o conteúdo" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#conteudo")).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  const trigger = page.getByRole("button", { name: "Abrir menu de navegação" });
  const dialog = page.getByRole("dialog", { name: "Menu de navegação" });
  await trigger.click();
  await dialog.getByRole("link", { name: "Evolua, início" }).focus();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: "Novo Ciclo", exact: true })).toBeFocused();
  await dialog.getByRole("button", { name: "Fechar menu" }).click();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.mouse.click(380, 400);
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("ampliação de texto mantém acesso ao formulário e às ações", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seedCycles(page, mixedCycles);
  await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);
  await expect(page.getByLabel("Título", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: /Concluir ciclo/ })).toBeVisible();
});
