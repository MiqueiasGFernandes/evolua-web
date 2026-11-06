import { expect, test } from "@playwright/test";
import { mixedCycles, seedCycles } from "../fixtures/pdi-cycles";
for (const width of [320, 390, 1280]) {
  test(`campos e ações preservam contexto em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await seedCycles(page, mixedCycles);
    const table = page.getByRole("table");
    await expect(table).toHaveAccessibleName("Meus ciclos de desenvolvimento");
    await expect(table.getByRole("columnheader")).toHaveCount(4);
    for (const cycle of mixedCycles) {
      const row = table.getByRole("row").filter({ has: page.getByRole("rowheader", { name: cycle.title, exact: true }) });
      await expect(row).toBeVisible();
      await expect(row.getByRole("rowheader")).toBeVisible();
      await expect(row.locator('td[data-label="Período"]')).toBeVisible();
      await expect(row.locator('td[data-label="Situação"]')).toBeVisible();
      for (const cell of await row.locator("th, td").all()) {
        if (!(await cell.isVisible())) continue;
        const bounds = await cell.boundingBox();
        expect(bounds!.x).toBeGreaterThanOrEqual(0);
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
      }
      const buttons = row.getByRole("button");
      if (cycle.status === "COMPLETED" || cycle.status === "CANCELLED") await expect(buttons).toHaveCount(0);
      else {
        await expect(buttons).toHaveCount(2);
        for (const button of await buttons.all()) await expect(button).toHaveAccessibleName(new RegExp(cycle.title));
      }
    }
  });
}
