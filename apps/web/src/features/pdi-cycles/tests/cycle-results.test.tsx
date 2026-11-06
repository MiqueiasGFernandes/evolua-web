import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CycleResults } from "../components/cycle-results";

const props = {
  cycles: [],
  filtered: false,
  pendingIds: new Set<string>(),
  itemRefs: { current: new Map<string, HTMLTableRowElement>() },
  onTransition: () => undefined
};

describe("mensagens de leitura dos ciclos", () => {
  it("anuncia carregamento sem confundir com primeiro uso", () => {
    render(<CycleResults {...props} state="loading" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByText("Seu primeiro ciclo começa aqui")).not.toBeInTheDocument();
  });

  it("distingue primeiro uso de filtro sem resultados", () => {
    const { rerender } = render(<CycleResults {...props} state="ready" />);
    expect(screen.getByRole("heading", { name: "Seu primeiro ciclo começa aqui" })).toBeInTheDocument();
    rerender(<CycleResults {...props} filtered state="ready" />);
    expect(screen.getByRole("heading", { name: "Nenhum ciclo neste status" })).toBeInTheDocument();
  });

  it("anuncia falha com orientação de recuperação", () => {
    render(<CycleResults {...props} state="error" error="Recarregue a página." />);
    expect(screen.getByRole("alert")).toHaveTextContent("Recarregue a página.");
  });
});
