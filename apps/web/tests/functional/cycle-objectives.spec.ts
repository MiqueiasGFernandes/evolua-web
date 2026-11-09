import { expect, test } from "@playwright/test";
import { cycleFixture, seedCycles } from "../fixtures/pdi-cycles";
test("new/legacy content survives migration and reload", async ({ page }) => {
 await seedCycles(page, [cycleFixture("COMPLETED", 1, { description: "Histórico original" })]);
 await page.evaluate(() => {
  const key = "evolua:pdi-cycles:v2", state = JSON.parse(localStorage.getItem(key)!);
  const base = { ...state.cycles[0] }; delete base.title; delete base.description;
  state.cycles.push({ ...base, id: "goals-fixture", kind: "OBJECTIVES", durationType: "CUSTOM", objectives: ["Primeiro", "Segundo"] }); localStorage.setItem(key, JSON.stringify(state));
 });
 await page.reload(); await expect(page.getByText("Histórico original", { exact: true })).toBeVisible();
 await expect(page.getByRole("list").filter({ hasText: "Primeiro" }).getByRole("listitem")).toHaveText(["Primeiro", "Segundo"]);
});
