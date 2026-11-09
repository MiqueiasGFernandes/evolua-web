import { expect, test } from "@playwright/test";
for (const context of ["modal", "page"]) test(`dates in ${context}`, async ({ page }) => {
 await page.goto(context === "page" ? "/pdi-cycles/new" : "/pdi-cycles");
 if (context === "modal") await page.getByRole("button", { name: "Novo ciclo", exact: true }).click();
 await page.getByLabel("Data inicial").fill("2026-01-31"); await expect(page.getByLabel("Data final calculada")).toContainText("30 abr");
 await page.getByLabel("Tipo de duração").selectOption("YEAR"); await page.getByLabel("Data inicial").fill("2024-02-29"); await expect(page.getByLabel("Data final calculada")).toContainText("28 fev");
 await page.getByLabel("Tipo de duração").selectOption("CUSTOM"); await expect(page.getByLabel("Data final", { exact: true })).toHaveValue("2025-02-28");
 await page.getByLabel("Data final", { exact: true }).fill("2024-02-29"); await page.getByRole("button", { name: "Continuar", exact: true }).click(); await expect(page.getByLabel("Data final", { exact: true })).toHaveAttribute("aria-invalid","true");
});
