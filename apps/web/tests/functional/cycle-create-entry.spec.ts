import { expect, test } from "@playwright/test";
test("button opens modal; menu and direct URL open page", async ({ page }) => {
 await page.goto("/pdi-cycles"); await expect(page.getByLabel("Data inicial")).toHaveCount(0);
 await page.getByRole("button", { name: "Novo ciclo", exact: true }).click(); await expect(page.getByRole("dialog", { name: "Novo ciclo" })).toBeVisible();
 await page.getByRole("button", { name: "Cancelar", exact: true }).click();
 await page.getByRole("complementary").getByRole("link", { name: "Novo Ciclo", exact: true }).click();
 await expect(page).toHaveURL(/\/new$/); await expect(page.getByRole("dialog")).toHaveCount(0); await page.reload();
 await expect(page.getByLabel("Data inicial")).toBeVisible(); await expect(page.getByText("Etapa 1 de 3")).toBeVisible();
});
