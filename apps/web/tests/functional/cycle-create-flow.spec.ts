import { expect, test } from "@playwright/test";
import { cycleFixture, readCycles, seedCycles } from "../fixtures/pdi-cycles";
import { fillPlanning } from "../fixtures/wizard";
for (const context of ["modal", "page"]) test(`creates one draft from ${context}`, async ({ page }) => {
 await page.goto(context === "page" ? "/pdi-cycles/new" : "/pdi-cycles");
 if (context === "modal") await page.getByRole("button", { name: "Novo ciclo", exact: true }).click();
 await fillPlanning(page); await page.getByRole("button", { name: "Criar ciclo", exact: true }).click();
 await expect(page.getByText("Desenvolver liderança", { exact: true })).toBeVisible(); await page.reload();
 const cycles = await readCycles(page); expect(cycles).toHaveLength(1); expect(cycles[0]).toMatchObject({ status: "DRAFT", kind: "OBJECTIVES", objectives: ["Desenvolver liderança"], endDate: "2026-04-30" }); expect(cycles[0]).not.toHaveProperty("title");
});
test("keeps created cycle accessible outside first 20 and excluding filter", async ({ page }) => {
 await seedCycles(page, Array.from({length:21},(_,i)=>cycleFixture("COMPLETED",i+1)));
 await page.getByLabel("Filtrar por status").selectOption("COMPLETED"); await page.getByRole("button", { name: "Novo ciclo", exact: true }).click();
 await fillPlanning(page); await page.getByRole("button", { name: "Criar ciclo", exact: true }).click();
 await expect(page.getByText(/Ele não aparece no filtro atual/)).toBeVisible(); await expect(page.getByRole("region", { name: "Ciclo salvo" }).getByText("Desenvolver liderança")).toBeVisible();
 expect(await readCycles(page)).toHaveLength(22);
});
test("missing created ID produces neutral feedback", async ({ page }) => {
 await page.goto("/pdi-cycles?created=missing"); await expect(page.getByText(/não foi encontrado nesta consulta/)).toBeVisible(); await expect(page).toHaveURL(/\/pdi-cycles$/);
});

test("refresh failure after commit never offers a second create", async ({ page }) => {
 await page.goto("/pdi-cycles");
 await page.getByRole("button", { name: "Novo ciclo", exact: true }).click();
 await fillPlanning(page);
 await page.evaluate(() => {
  const write = Storage.prototype.setItem;
  const read = Storage.prototype.getItem;
  Storage.prototype.setItem = function(key, value) {
   write.call(this, key, value);
   if (key === "evolua:pdi-cycles:v2" && JSON.parse(value).cycles.length) {
    Storage.prototype.getItem = function(name) {
     if (name === key) throw new Error("Synthetic refresh failure");
     return read.call(this, name);
    };
   }
  };
 });
 await page.getByRole("button", { name: "Criar ciclo", exact: true }).click();
 await expect(page.getByText(/O ciclo foi criado, mas a lista/)).toBeVisible();
 await expect(page.getByRole("dialog")).toHaveCount(0);
 await expect(page.getByRole("region", { name: "Ciclo salvo" })).toContainText("Desenvolver liderança");
 await page.reload();
 expect(await readCycles(page)).toHaveLength(1);
});
