import { forwardRef } from "react";
import type { PdiCycle } from "../domain";
import { CycleTable } from "./cycle-table";

type ResultsState = "loading" | "ready" | "error";

export const CycleResults = forwardRef<HTMLDivElement, {
  state: ResultsState;
  cycles: PdiCycle[];
  filtered: boolean;
  error?: string;
  pendingIds: Set<string>;
  itemRefs: React.MutableRefObject<Map<string, HTMLTableRowElement>>;
  onTransition: (id: string, next: "ACTIVE" | "COMPLETED" | "CANCELLED") => void;
  onSelectObjectives?: (cycle: PdiCycle) => void;
}>(({ state, cycles, filtered, error, pendingIds, itemRefs, onTransition, onSelectObjectives }, ref) => {
  if (state === "loading" && cycles.length === 0) {
    return <div ref={ref} className="cycle-state" role="status" aria-live="polite" aria-busy="true"><h3>Carregando seus ciclos</h3><p>Organizando o percurso mais recente…</p></div>;
  }
  if (state === "error" && cycles.length === 0) {
    return <div ref={ref} className="cycle-state cycle-state--error" role="alert"><h3>Não foi possível carregar os ciclos</h3><p>{error || "Verifique o armazenamento do navegador e recarregue a página para tentar novamente."}</p></div>;
  }
  if (state === "ready" && cycles.length === 0) {
    return filtered
      ? <div ref={ref} className="cycle-state"><h3>Nenhum ciclo neste status</h3><p>Escolha outro status para continuar consultando seu percurso.</p></div>
      : <div ref={ref} className="cycle-state"><h3>Seu primeiro ciclo começa aqui</h3><p>Registre um período de desenvolvimento para acompanhar o que está em movimento.</p></div>;
  }
  return (
    <div ref={ref} aria-busy={state === "loading" || undefined}>
      {state === "error" && <div className="cycle-feedback cycle-feedback--warning" role="alert">Os dados anteriores continuam visíveis, mas podem estar desatualizados. Recarregue a página para tentar novamente.</div>}
      <CycleTable cycles={cycles} pendingIds={pendingIds} itemRefs={itemRefs} onTransition={onTransition} onSelectObjectives={onSelectObjectives} />
    </div>
  );
});
CycleResults.displayName = "CycleResults";
