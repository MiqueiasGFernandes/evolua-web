import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { CycleDashboard } from "../components/cycle-dashboard";
import { createManualRepository } from "../../../../tests/fixtures/manual-pdi-cycle-repository";
it("opens the shared wizard on demand and restores trigger focus", async () => {
 render(<CycleDashboard repository={createManualRepository("empty")} />);
 await screen.findByRole("heading", { name: "Seu primeiro ciclo começa aqui" });
 expect(screen.queryByLabelText("Data inicial")).not.toBeInTheDocument();
 const trigger = screen.getByRole("button", { name: "Novo ciclo" }); await userEvent.click(trigger);
 expect(screen.getByRole("dialog")).toHaveAccessibleName("Novo ciclo");
 await userEvent.click(screen.getByRole("button", { name: "Cancelar" })); expect(trigger).toHaveFocus();
});
