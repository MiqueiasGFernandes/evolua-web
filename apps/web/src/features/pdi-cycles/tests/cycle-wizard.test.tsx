import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { CycleWizard } from "../components/cycle-wizard";
import { createManualRepository } from "../../../../tests/fixtures/manual-pdi-cycle-repository";
export async function fillWizard() {
 fireEvent.change(screen.getByLabelText("Data inicial"), { target: { value: "2026-01-31" } });
 await userEvent.click(screen.getByRole("button", { name: "Continuar" }));
 await userEvent.type(screen.getByLabelText("Objetivo 1"), "Aprender a liderar");
 await userEvent.click(screen.getByRole("button", { name: "Continuar" }));
}
it("preserves values through review/back, only creates on final confirmation", async () => {
 const repo = createManualRepository("empty"), create = vi.spyOn(repo, "create"), done = vi.fn();
 render(<CycleWizard repository={repo} onCreated={done} onCancel={vi.fn()} />);
 expect(screen.queryByLabelText("Título")).not.toBeInTheDocument();
 await fillWizard(); expect(create).not.toHaveBeenCalled();
 expect(screen.getByText(/30 abr/)).toBeVisible();
 await userEvent.click(screen.getByRole("button", { name: "Voltar" }));
 expect(screen.getByLabelText("Objetivo 1")).toHaveValue("Aprender a liderar");
 await userEvent.click(screen.getByRole("button", { name: "Continuar" }));
 await userEvent.click(screen.getByRole("button", { name: "Criar ciclo" }));
 expect(create).toHaveBeenCalledTimes(1); expect(done).toHaveBeenCalledTimes(1);
});
it("retains review on write error and supports retry", async () => {
 const repo = createManualRepository("empty"), create = vi.spyOn(repo, "create").mockRejectedValueOnce(new Error("failure"));
 render(<CycleWizard repository={repo} onCreated={vi.fn()} onCancel={vi.fn()} />); await fillWizard();
 await userEvent.click(screen.getByRole("button", { name: "Criar ciclo" }));
 expect(await screen.findByRole("alert")).toHaveTextContent("Seus dados continuam");
 expect(screen.getByText("Aprender a liderar")).toBeVisible();
 await userEvent.click(screen.getByRole("button", { name: "Criar ciclo" })); expect(create).toHaveBeenCalledTimes(2);
});
it("blocks repeated submission and exit while pending", async () => {
 const repo = createManualRepository("pending"), create = vi.spyOn(repo, "create"), cancel = vi.fn();
 render(<CycleWizard repository={repo} onCreated={vi.fn()} onCancel={cancel} />); await fillWizard();
 const form = screen.getByRole("button", { name: "Criar ciclo" }).closest("form")!;
 fireEvent.submit(form); fireEvent.submit(form); expect(create).toHaveBeenCalledTimes(1);
 expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled(); expect(cancel).not.toHaveBeenCalled(); await act(async () => repo.release());
});
it("requires explicit dirty discard and continues without losing input", async () => {
 const cancel = vi.fn(); render(<CycleWizard repository={createManualRepository("empty")} onCreated={vi.fn()} onCancel={cancel} />);
 fireEvent.change(screen.getByLabelText("Data inicial"), { target: { value: "2026-01-01" } });
 await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));
 expect(screen.getByRole("button", { name: "Continuar preenchendo" })).toHaveFocus();
 await userEvent.click(screen.getByRole("button", { name: "Continuar preenchendo" }));
 expect(screen.getByLabelText("Data inicial")).toHaveValue("2026-01-01");
 await userEvent.click(screen.getByRole("button", { name: "Cancelar" })); await userEvent.click(screen.getByRole("button", { name: "Descartar" })); expect(cancel).toHaveBeenCalledOnce();
});

it("restoring editable values to their opening state clears dirty", async () => {
 const cancel = vi.fn();
 render(<CycleWizard repository={createManualRepository("empty")} onCreated={vi.fn()} onCancel={cancel} />);
 fireEvent.change(screen.getByLabelText("Data inicial"), { target: { value: "2026-01-01" } });
 fireEvent.change(screen.getByLabelText("Data inicial"), { target: { value: "" } });
 await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));
 expect(cancel).toHaveBeenCalledOnce();
 expect(screen.queryByRole("button", { name: "Descartar" })).not.toBeInTheDocument();
});
