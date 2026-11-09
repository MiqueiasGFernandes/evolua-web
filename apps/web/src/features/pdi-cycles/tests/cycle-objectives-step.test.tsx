import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { CycleWizard } from "../components/cycle-wizard";
import { createManualRepository } from "../../../../tests/fixtures/manual-pdi-cycle-repository";
it("rejects blank objectives and focuses new/remnant fields", async () => {
 render(<CycleWizard repository={createManualRepository("empty")} onCreated={vi.fn()} onCancel={vi.fn()} />);
 fireEvent.change(screen.getByLabelText("Data inicial"), { target: { value: "2026-01-01" } });
 await userEvent.click(screen.getByRole("button", { name: "Continuar" }));
 await userEvent.click(screen.getByRole("button", { name: "Continuar" })); expect(screen.getByLabelText("Objetivo 1")).toHaveFocus();
 await userEvent.type(screen.getByLabelText("Objetivo 1"), "Igual");
 await userEvent.click(screen.getByRole("button", { name: "Adicionar objetivo" })); expect(screen.getByLabelText("Objetivo 2")).toHaveFocus();
 await userEvent.type(screen.getByLabelText("Objetivo 2"), "Igual");
 await userEvent.click(screen.getByRole("button", { name: "Remover objetivo 1" })); expect(screen.getByLabelText("Objetivo 1")).toHaveValue("Igual");
 await userEvent.click(screen.getByRole("button", { name: "Remover objetivo 1" })); expect(screen.getByRole("button", { name: "Adicionar objetivo" })).toHaveFocus();
 await userEvent.click(screen.getByRole("button", { name: "Continuar" })); expect(screen.getByText("Informe pelo menos um objetivo.")).toBeVisible();
});
