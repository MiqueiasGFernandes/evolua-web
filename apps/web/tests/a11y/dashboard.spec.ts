import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { mixedCycles, seedCycles } from "../fixtures/pdi-cycles";

test("estados misto, vazio e falha não têm violações automáticas A/AA", async ({ page }) => {
  for (const cycles of [mixedCycles, []]) {
    await seedCycles(page, cycles);
    await expect(page.getByRole("heading", { name: "Meus ciclos", exact: true })).toBeVisible();
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(result.violations).toEqual([]);
  }
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error("Armazenamento indisponível para teste"); };
  });
  await page.reload();
  await expect(page.getByRole("alert").filter({ hasText: "Não foi possível carregar os ciclos" })).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze()).violations).toEqual([]);
});

test("menu móvel tem nome, foco contido e contraste verificável", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seedCycles(page, mixedCycles);
  await page.getByRole("button", { name: "Abrir menu de navegação" }).click();
  const dialog = page.getByRole("dialog", { name: "Menu de navegação" });
  await expect(dialog).toBeVisible();
  for (let index = 0; index < 7; index++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
  expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze()).violations).toEqual([]);
});
