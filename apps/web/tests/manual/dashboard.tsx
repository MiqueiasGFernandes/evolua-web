import { useState } from "react";
import { createRoot } from "react-dom/client";
import { CycleCreatePage } from "../../src/features/pdi-cycles/components/cycle-create-page";
import { CycleDashboard } from "../../src/features/pdi-cycles/components/cycle-dashboard";
import { createManualRepository, type ManualScenario } from "../fixtures/manual-pdi-cycle-repository";
import "../../src/app/globals.css";
import "./manual.css";

const scenarios: { value: ManualScenario; label: string }[] = [
  { value: "mixed", label: "Quatro situações" }, { value: "empty", label: "Primeiro uso" },
  { value: "loading", label: "Leitura pendente" }, { value: "read-error", label: "Falha de leitura" },
  { value: "write-error", label: "Falha de gravação" }, { value: "pending", label: "Operação pendente" }
];
function Review() {
  const [surface, setSurface] = useState("consultation");
  const [scenario, setScenario] = useState<ManualScenario>("mixed");
  const [session, setSession] = useState(() => ({ repository: createManualRepository("mixed"), key: 0 }));
  function reset(value: ManualScenario) {
    setScenario(value);
    setSession((current) => ({ repository: createManualRepository(value), key: current.key + 1 }));
  }
  return <>
    <section aria-label="Ferramentas de revisão — fora da interface avaliada" className="manual-tools">
      <label htmlFor="manual-surface">Contexto de revisão</label><select id="manual-surface" value={surface} onChange={(e) => setSurface(e.target.value)}><option value="consultation">Consulta e modal</option><option value="page">Página de cadastro</option></select>
      <label htmlFor="manual-scenario">Cenário de teste</label>
      <select id="manual-scenario" value={scenario} onChange={(event) => reset(event.target.value as ManualScenario)}>
        {scenarios.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
      </select>
      <button type="button" onClick={() => reset(scenario)}>Reiniciar cenário</button>
      <button type="button" onClick={session.repository.release}>Liberar operação pendente</button>
      <p>Dados sintéticos em memória. Revisão com leitor de tela exige execução real e registro.</p>
    </section>
    {surface === "page" ? <CycleCreatePage key={session.key} repository={session.repository} navigate={() => setSurface("consultation")} /> : <CycleDashboard key={session.key} repository={session.repository} />}
  </>;
}
createRoot(document.getElementById("root")!).render(<Review />);
