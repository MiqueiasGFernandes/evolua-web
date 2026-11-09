import { describe, expect, it } from "vitest";
import { filterCycleNavigationOptions, normalizeMenuSearch } from "../components/cycle-navigation";

describe("busca nas opções de navegação", () => {
  it("normaliza espaços, maiúsculas e diacríticos", () => {
    expect(normalizeMenuSearch("  CÍCLos  ")).toBe("ciclos");
  });

  it("preserva todas as opções para consulta vazia e filtra por trecho", () => {
    expect(filterCycleNavigationOptions(" ")).toHaveLength(2);
    expect(filterCycleNavigationOptions("novo").map((option) => option.label)).toEqual(["Novo Ciclo"]);
    expect(filterCycleNavigationOptions("CÍCL")).toHaveLength(2);
  });
});
