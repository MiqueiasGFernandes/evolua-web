import { expect, test } from "@playwright/test";
import { mixedCycles, seedCycles } from "../fixtures/pdi-cycles";

const evidence = "../../specs/004-dashboard-ux-ui/validation";

for (const width of [320, 390, 768, 1024, 1280, 1440]) {
  test(`conteúdo e ações permanecem contidos em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 1024 });
    await seedCycles(page, mixedCycles);
    await expect(page.getByRole("table")).toBeVisible();
    const trigger = page.getByRole("button", { name: "Abrir menu de navegação" });
    if (width < 1024) await expect(trigger).toBeVisible();
    else await expect(trigger).toBeHidden();
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("columnheader", { name: "Título" })).toBeAttached();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
    await page.screenshot({ path: `${evidence}/after-${width}.png`, fullPage: true });

    await seedCycles(page, [{ ...mixedCycles[0], title: "Desenvolvimento".repeat(20) }]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
    const action = page.getByRole("button", { name: /Concluir ciclo/ });
    await action.scrollIntoViewIfNeeded();
    const bounds = await action.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
  });
}

test("registra estados vazio, filtro e menu para revisão", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await seedCycles(page, []);
  await expect(page.getByRole("heading", { name: "Seu primeiro ciclo começa aqui" })).toBeVisible();
  await page.screenshot({ path: `${evidence}/after-empty.png`, fullPage: true });
  await page.getByLabel("Filtrar por status").selectOption("ACTIVE");
  await expect(page.getByRole("heading", { name: "Nenhum ciclo neste status" })).toBeVisible();
  await page.screenshot({ path: `${evidence}/after-filter-empty.png`, fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Abrir menu de navegação" }).click();
  await expect(page.getByRole("dialog", { name: "Menu de navegação" })).toBeVisible();
  await page.screenshot({ path: `${evidence}/after-mobile-menu.png` });
  await page.keyboard.press("Escape");
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error("Falha de armazenamento para teste"); };
  });
  await page.reload();
  await expect(page.getByRole("heading", { name: "Não foi possível carregar os ciclos" })).toBeVisible();
  await page.screenshot({ path: `${evidence}/after-error.png`, fullPage: true });
});
