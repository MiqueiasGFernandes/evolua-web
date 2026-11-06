import { forwardRef } from "react";
import type { PdiCycle } from "../domain";
import { CycleItem } from "./cycle-item";

type ResultsState = "loading" | "ready" | "error";

export const CycleResults = forwardRef<HTMLDivElement, {
  state: ResultsState;
  cycles: PdiCycle[];
  filtered: boolean;
  error?: string;
  pendingIds: Set<string>;
  itemRefs: React.MutableRefObject<Map<string, HTMLLIElement>>;
  onTransition: (id: string, next: "ACTIVE" | "COMPLETED" | "CANCELLED") => void;
}>(({ state, cycles, filtered, error, pendingIds, itemRefs, onTransition }, ref) => {
  if (state === "loading" && cycles.length === 0) {
    return <div ref={ref} className="cycle-state" role="status" aria-live="polite" aria-busy="true"><h3>Carregando seus ciclos</h3><p>Organizando o percurso mais recente…</p></div>;
  }
  if (state === "error" && cycles.length === 0) {
    return <div ref={ref} className="cycle-state cycle-state--error" role="alert"><h3>Não foi possível carregar os ciclos</h3><p>Verifique o armazenamento do navegador e recarregue a página para tentar novamente.</p></div>;
  }
  if (state === "ready" && cycles.length === 0) {
    return filtered
      ? <div ref={ref} className="cycle-state"><h3>Nenhum ciclo neste status</h3><p>Escolha outro status para continuar consultando seu percurso.</p></div>
      : <div ref={ref} className="cycle-state"><h3>Seu primeiro ciclo começa aqui</h3><p>Registre um período de desenvolvimento para acompanhar o que está em movimento.</p></div>;
  }
  return (
    <div ref={ref} aria-busy={state === "loading" || undefined}>
      {state === "error" && <div className="cycle-feedback cycle-feedback--warning" role="alert">Os dados anteriores continuam visíveis, mas podem estar desatualizados. Recarregue a página para tentar novamente.</div>}
      <ul className="cycle-list">
        {cycles.map((cycle) => (
          <CycleItem
            key={cycle.id}
            ref={(node) => { if (node) itemRefs.current.set(cycle.id, node); else itemRefs.current.delete(cycle.id); }}
            cycle={cycle}
            pending={pendingIds.has(cycle.id)}
            onTransition={onTransition}
          />
        ))}
      </ul>
    </div>
  );
});
CycleResults.displayName = "CycleResults";
