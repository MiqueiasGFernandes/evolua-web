import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { CycleDashboard } from "../components/cycle-dashboard";
import { createManualRepository } from "../../../../tests/fixtures/manual-pdi-cycle-repository";

beforeEach(() => vi.stubGlobal("matchMedia", (media: string) => ({ media, matches: false, onchange: null, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => true })));
afterEach(() => vi.unstubAllGlobals());
it("expõe limites e preserva formulário em falha de gravação", async () => {
  const user = userEvent.setup();
  render(<CycleDashboard repository={createManualRepository("write-error")} />);
  await screen.findByRole("table");
  const title = screen.getByLabelText("Título");
  expect(title).toHaveAttribute("minlength", "3");
  expect(title).toHaveAttribute("maxlength", "120");
  expect(screen.getByLabelText("Descrição")).toHaveAttribute("maxlength", "2000");
  expect(screen.getByLabelText("Descrição")).not.toBeRequired();
  expect(Array.from(screen.getByLabelText("Tipo de duração").querySelectorAll("option")).map((option) => option.value)).toEqual(["TRIMESTER", "SEMESTER", "YEAR", "CUSTOM"]);
  await user.type(title, "Planejamento preservado");
  await user.type(screen.getByLabelText("Data inicial"), "2026-01-01");
  await user.type(screen.getByLabelText("Data final"), "2026-04-01");
  await user.click(screen.getByRole("button", { name: "Criar ciclo" }));
  await screen.findByRole("alert");
  expect(title).toHaveValue("Planejamento preservado");
});
it("comunica criação pendente e sucesso após liberação", async () => {
  const repo = createManualRepository("pending");
  const user = userEvent.setup();
  render(<CycleDashboard repository={repo} />);
  await screen.findByRole("table");
  await user.type(screen.getByLabelText("Título"), "Novo planejamento");
  await user.type(screen.getByLabelText("Data inicial"), "2026-01-01");
  await user.type(screen.getByLabelText("Data final"), "2026-04-01");
  await user.click(screen.getByRole("button", { name: "Criar ciclo" }));
  expect(screen.getByRole("button", { name: "Criando ciclo…" })).toBeDisabled();
  repo.release();
  await waitFor(() => expect(screen.getByLabelText("Título")).toHaveValue(""));
  expect(screen.getByRole("status")).toHaveTextContent("Ciclo criado como rascunho.");
});

it("associa erro de datas ao campo, foca e permite corrigir", async () => {
  const user = userEvent.setup();
  render(<CycleDashboard repository={createManualRepository("empty")} />);
  await screen.findByRole("heading", { name: "Seu primeiro ciclo começa aqui" });
  await user.type(screen.getByLabelText("Título"), "Plano corrigível");
  const start = screen.getByLabelText("Data inicial");
  const end = screen.getByLabelText("Data final");
  fireEvent.change(start, { target: { value: "2026-04-01" } });
  fireEvent.change(end, { target: { value: "2026-01-01" } });
  fireEvent.submit(screen.getByRole("button", { name: "Criar ciclo" }).closest("form")!);
  expect(end).toHaveFocus();
  expect(end).toHaveAttribute("aria-invalid", "true");
  expect(end).toHaveAccessibleDescription("A data final deve ser posterior à data inicial.");
  fireEvent.change(end, { target: { value: "2026-07-01" } });
  await user.click(screen.getByRole("button", { name: "Criar ciclo" }));
  await screen.findByText("Ciclo criado como rascunho.");
});
