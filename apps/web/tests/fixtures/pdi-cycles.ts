import { expect, type Page } from "@playwright/test";
import type { PdiCycle } from "../../src/features/pdi-cycles/domain";
import { STORAGE_KEY } from "./pdi-cycle-data";
export * from "./pdi-cycle-data";

export async function seedCycles(page: Page, cycles: PdiCycle[]): Promise<void> {
  if (!page.url().startsWith("http")) await page.goto("/pdi-cycles");
  await page.evaluate(([key, value]) => { localStorage.removeItem("evolua:pdi-cycles:v2"); if (value.some((cycle) => cycle.kind === "OBJECTIVES")) { localStorage.removeItem(key); localStorage.setItem("evolua:pdi-cycles:v2", JSON.stringify({ schemaVersion: 2, legacySource: null, cycles: value })); } else localStorage.setItem(key, JSON.stringify(value)); }, [STORAGE_KEY, cycles] as const);
  await page.reload();
  if (cycles.length > 0) await expect(page.getByRole("table")).toBeVisible();
  else await expect(page.getByRole("heading", { name: "Seu primeiro ciclo começa aqui" })).toBeVisible();
}

export async function readCycles(page: Page): Promise<PdiCycle[]> {
  return page.evaluate((key) => (localStorage.getItem("evolua:pdi-cycles:v2") ? JSON.parse(localStorage.getItem("evolua:pdi-cycles:v2")!).cycles : JSON.parse(localStorage.getItem(key) ?? "[]")) as PdiCycle[], STORAGE_KEY);
}
