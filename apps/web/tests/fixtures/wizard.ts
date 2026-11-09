import type { Page } from "@playwright/test";
export async function fillPlanning(page: Page, text = "Desenvolver liderança") {
 await page.getByLabel("Data inicial").fill("2026-01-31");
 await page.getByRole("button", { name: "Continuar", exact: true }).click();
 await page.getByLabel("Objetivo 1", { exact: true }).fill(text);
 await page.getByRole("button", { name: "Continuar", exact: true }).click();
}
