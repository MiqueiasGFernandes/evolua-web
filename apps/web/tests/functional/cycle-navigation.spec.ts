import { expect, test } from "@playwright/test";
import { mixedCycles, seedCycles } from "../fixtures/pdi-cycles";
test("menu desktop recolhe e abre página dedicada", async ({ page }) => {
 await seedCycles(page, mixedCycles);
 const sidebar = page.getByRole("complementary", { name: "Navegação principal" });
 await sidebar.getByRole("button", { name: "Recolher menu" }).click();
 await expect(sidebar.getByRole("button", { name: "Expandir menu" })).toHaveAttribute("aria-expanded", "false");
 await sidebar.getByRole("link", { name: "Novo Ciclo", exact: true }).click();
 await expect(page).toHaveURL(/\/pdi-cycles\/new$/); await expect(page.getByRole("heading", { name: "Novo ciclo", exact: true })).toBeFocused();
});
test("busca do menu filtra em tempo real e mantém navegação", async ({ page }) => {
 await seedCycles(page, mixedCycles);
 const sidebar = page.getByRole("complementary", { name: "Navegação principal" });
 const search = sidebar.getByRole("searchbox", { name: "Pesquisar no menu" });
 await search.fill("  CÍCL ");
 await expect(sidebar.getByRole("link", { name: "Meus Ciclos", exact: true })).toBeVisible();
 await expect(sidebar.getByRole("link", { name: "Novo Ciclo", exact: true })).toBeVisible();
 await sidebar.getByRole("button", { name: "Ciclos" }).click();
 await search.fill("novo");
 await expect(sidebar.getByRole("link", { name: "Meus Ciclos", exact: true })).toHaveCount(0);
 await sidebar.getByRole("link", { name: "Novo Ciclo", exact: true }).click();
 await expect(page).toHaveURL(/\/pdi-cycles\/new$/);
});
test("busca vazia restaura opções e ausência de resultado é informada", async ({ page }) => {
 await seedCycles(page, mixedCycles);
 const sidebar = page.getByRole("complementary", { name: "Navegação principal" });
 const search = sidebar.getByRole("searchbox", { name: "Pesquisar no menu" });
 await search.fill("inexistente");
 await expect(sidebar.locator(".cycle-navigation__no-results")).toBeVisible();
 await expect(sidebar.getByRole("link")).toHaveCount(1);
 await search.fill("   ");
 await expect(sidebar.getByRole("link", { name: "Meus Ciclos", exact: true })).toBeVisible();
 await expect(sidebar.getByRole("link", { name: "Novo Ciclo", exact: true })).toBeVisible();
});
test("busca não existe no menu desktop mínimo", async ({ page }) => {
 await seedCycles(page, mixedCycles);
 const sidebar = page.getByRole("complementary", { name: "Navegação principal" });
 await sidebar.getByRole("button", { name: "Recolher menu" }).click();
 await expect(sidebar.getByRole("searchbox", { name: "Pesquisar no menu" })).toHaveCount(0);
 await sidebar.getByRole("button", { name: "Expandir menu" }).click();
 await expect(sidebar.getByRole("searchbox", { name: "Pesquisar no menu" })).toBeVisible();
});
test("busca móvel filtra e é limpa ao fechar o diálogo", async ({ page }) => {
 await page.setViewportSize({ width: 390, height: 844 });
 await seedCycles(page, mixedCycles);
 await page.getByRole("button", { name: "Abrir menu de navegação" }).click();
 const dialog = page.getByRole("dialog", { name: "Menu de navegação" });
 const search = dialog.getByRole("searchbox", { name: "Pesquisar no menu" });
 await search.fill("novo");
 await expect(dialog.getByRole("link", { name: "Meus Ciclos", exact: true })).toHaveCount(0);
 await expect(dialog.getByRole("link", { name: "Novo Ciclo", exact: true })).toBeVisible();
 await dialog.getByRole("button", { name: "Fechar menu" }).click();
 await page.getByRole("button", { name: "Abrir menu de navegação" }).click();
 await expect(dialog.getByRole("searchbox", { name: "Pesquisar no menu" })).toHaveValue("");
});
for (const width of [390, 768]) test(`menu ${width} restaura foco e navega por teclado`, async ({ page }) => {
 await page.setViewportSize({ width, height: 844 }); await seedCycles(page, mixedCycles);
 const trigger = page.getByRole("button", { name: "Abrir menu de navegação" }), dialog = page.getByRole("dialog", { name: "Menu de navegação" });
 await trigger.click(); await page.keyboard.press("Escape"); await expect(trigger).toBeFocused();
 await trigger.click(); await dialog.getByRole("link", { name: "Novo Ciclo", exact: true }).focus(); await page.keyboard.press("Enter");
 await expect(page).toHaveURL(/\/new$/); await expect(page.getByLabel("Data inicial")).toBeVisible();
});
test("skip link e foco reverso no menu", async ({ page }) => {
 await page.emulateMedia({ reducedMotion: "reduce" }); await seedCycles(page, mixedCycles);
 await page.keyboard.press("Tab"); await expect(page.getByRole("link", { name: "Ir para o conteúdo" })).toBeFocused();
 await page.keyboard.press("Enter"); await expect(page.locator("#conteudo")).toBeFocused();
 await page.setViewportSize({ width: 390, height: 844 }); const trigger = page.getByRole("button", { name: "Abrir menu de navegação" });
 await trigger.click(); const dialog = page.getByRole("dialog", { name: "Menu de navegação" });
 await dialog.getByRole("link", { name: "Evolua, início" }).focus(); await page.keyboard.press("Shift+Tab");
 await expect(dialog.getByRole("link", { name: "Novo Ciclo", exact: true })).toBeFocused();
 await dialog.getByRole("button", { name: "Fechar menu" }).click(); await expect(trigger).toBeFocused();
 await trigger.click(); await page.mouse.click(380,400); await expect(dialog).not.toBeVisible();
});
test("texto ampliado mantém ações e cadastro acessíveis", async ({ page }) => {
 await page.setViewportSize({ width: 390, height: 844 }); await seedCycles(page, mixedCycles);
 await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
 expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);
 await expect(page.getByRole("button", { name: /Concluir ciclo/ })).toBeVisible();
 await page.getByRole("button", { name: "Novo ciclo", exact: true }).click(); await expect(page.getByLabel("Data inicial")).toBeVisible();
});
