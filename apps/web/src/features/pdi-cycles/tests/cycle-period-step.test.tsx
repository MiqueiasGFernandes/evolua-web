import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { CycleWizard } from "../components/cycle-wizard";
import { createManualRepository } from "../../../../tests/fixtures/manual-pdi-cycle-repository";
it("validates missing period and supports automatic/custom switching", async () => {
 render(<CycleWizard repository={createManualRepository("empty")} onCreated={vi.fn()} onCancel={vi.fn()} />);
 await userEvent.click(screen.getByRole("button", { name: "Continuar" })); expect(screen.getByLabelText("Data inicial")).toHaveFocus();
 fireEvent.change(screen.getByLabelText("Data inicial"), { target: { value: "2024-02-29" } });
 fireEvent.change(screen.getByLabelText("Tipo de duração"), { target: { value: "YEAR" } });
 expect(screen.getByLabelText("Data final calculada")).toHaveTextContent("28 fev. 2025");
 expect(screen.queryByLabelText("Data final")).not.toBeInTheDocument();
 fireEvent.change(screen.getByLabelText("Tipo de duração"), { target: { value: "CUSTOM" } });
 expect(screen.getByLabelText("Data final")).toHaveValue("2025-02-28");
 fireEvent.change(screen.getByLabelText("Data final"), { target: { value: "2024-01-01" } });
 await userEvent.click(screen.getByRole("button", { name: "Continuar" })); expect(screen.getByLabelText("Data final")).toHaveAttribute("aria-invalid", "true");
});
