import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { fillPlanning } from "../fixtures/wizard";
for (const context of ["modal", "page"]) test(`wizard focus, dirty guard and axe in ${context}`, async ({ page }) => {
 await page.goto(context === "page" ? "/pdi-cycles/new" : "/pdi-cycles");
 if (context === "modal") await page.getByRole("button", { name: "Novo ciclo", exact: true }).click();
 await page.getByRole("button", { name: "Continuar", exact: true }).click(); await expect(page.getByLabel("Data inicial")).toBeFocused();
 await fillPlanning(page); await expect(page.getByRole("heading", { name: "Revisão", exact: true })).toBeFocused();
 expect((await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa","wcag22aa"]).analyze()).violations).toEqual([]);
 await page.getByRole("button", { name: "Cancelar", exact: true }).click(); await expect(page.getByRole("button", { name: "Continuar preenchendo" })).toBeFocused();
 await page.keyboard.press("Escape"); await expect(page.getByText("Etapa 3 de 3")).toBeVisible();
 await page.getByRole("button", { name: "Cancelar", exact: true }).click(); await page.getByRole("button", { name: "Descartar", exact: true }).click();
 if (context === "modal") await expect(page.getByRole("button", { name: "Novo ciclo", exact: true })).toBeFocused(); else await expect(page).toHaveURL(/\/pdi-cycles$/);
});

test("mobile app navigation closes menu before dirty confirmation", async ({ page }) => {
 await page.setViewportSize({ width: 390, height: 844 });
 await page.goto("/pdi-cycles/new");
 await page.getByLabel("Data inicial").fill("2026-01-31");
 await page.getByRole("button", { name: "Abrir menu de navegação" }).click();
 await page.getByRole("dialog", { name: "Menu de navegação" }).getByRole("link", { name: "Meus Ciclos", exact: true }).click();
 await expect(page.getByRole("dialog", { name: "Menu de navegação" })).toBeHidden();
 await expect(page.getByRole("button", { name: "Continuar preenchendo" })).toBeFocused();
 await page.getByRole("button", { name: "Continuar preenchendo" }).click();
 await expect(page.getByLabel("Data inicial")).toHaveValue("2026-01-31");
});

test("Escape and backdrop keep dirty modal values until explicit discard", async ({ page }) => {
 await page.goto("/pdi-cycles");
 await page.getByRole("button", { name: "Novo ciclo", exact: true }).click();
 await page.getByLabel("Data inicial").fill("2026-01-31");
 await page.keyboard.press("Escape");
 await expect(page.getByRole("button", { name: "Continuar preenchendo" })).toBeFocused();
 await page.keyboard.press("Escape");
 await expect(page.getByLabel("Data inicial")).toHaveValue("2026-01-31");
 await page.mouse.click(2, 2);
 await expect(page.getByRole("button", { name: "Continuar preenchendo" })).toBeFocused();
 await page.getByRole("button", { name: "Descartar", exact: true }).click();
 await expect(page.getByRole("dialog", { name: "Novo ciclo" })).toBeHidden();
});
