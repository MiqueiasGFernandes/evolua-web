import { expect, test } from "@playwright/test";
test("modal contains keyboard focus and returns it on pristine close", async ({ page }) => {
 await page.goto("/pdi-cycles"); const trigger = page.getByRole("button", { name: "Novo ciclo", exact: true }); await trigger.click();
 const dialog = page.getByRole("dialog", { name: "Novo ciclo" }); await expect(dialog.getByRole("heading", { name: "Novo ciclo", exact: true })).toBeFocused();
 for (let i=0;i<9;i++) { await page.keyboard.press(i%2 ? "Shift+Tab" : "Tab"); expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true); }
 await page.keyboard.press("Escape"); await expect(dialog).not.toBeVisible(); await expect(trigger).toBeFocused();
});
