import type { MutableRefObject } from "react";
import type { PdiCycle } from "../domain";
import { cycleLabel, formatCyclePeriod } from "./cycle-presentation";
import { CycleStatus } from "./cycle-status";
import { Button } from "@/components/ui/button";

export function CycleTable({ cycles, pendingIds, itemRefs, onTransition, onSelectObjectives }: {
  cycles: PdiCycle[];
  pendingIds: Set<string>;
  itemRefs: MutableRefObject<Map<string, HTMLTableRowElement>>;
  onTransition: (id: string, next: "ACTIVE" | "COMPLETED" | "CANCELLED") => void;
  onSelectObjectives?: (cycle: PdiCycle) => void;
}) {
  return (
    <div className="cycle-table-scroll">
      <table className="cycle-table">
        <caption className="sr-only">Meus ciclos de desenvolvimento</caption>
        <thead><tr><th scope="col">Ciclo e objetivos</th><th scope="col">Período</th><th scope="col">Situação</th><th scope="col">Ações</th></tr></thead>
        <tbody>
          {cycles.map((cycle) => (
            <tr
              key={cycle.id}
              data-cycle-id={cycle.id}
              tabIndex={-1}
              ref={(element) => {
                if (element) itemRefs.current.set(cycle.id, element);
                else itemRefs.current.delete(cycle.id);
              }}
            >
              <th scope="row" className="cycle-table__title">{cycleLabel(cycle)}{cycle.kind === "OBJECTIVES" ? <ul className="cycle-goals">{cycle.objectives.map((text, index) => <li key={index}>{text}</li>)}</ul> : cycle.description && <p className="field-hint">{cycle.description}</p>}</th>
              <td data-label="Período">{formatCyclePeriod(cycle.startDate, cycle.endDate)}</td>
              <td data-label="Situação"><CycleStatus status={cycle.status} /></td>
              <td data-label="Ações" className="cycle-table__actions"><div className="cycle-table__action-group">
                {cycle.kind === "OBJECTIVES" && <Button type="button" variant="secondary" size="compact" onClick={() => onSelectObjectives?.(cycle)}>Objetivos</Button>}
                {cycle.status === "DRAFT" && <><Button type="button" variant="secondary" size="compact" disabled={pendingIds.has(cycle.id)} aria-label={`Iniciar ciclo ${cycleLabel(cycle)}`} onClick={() => onTransition(cycle.id,"ACTIVE")}>Iniciar</Button> <Button type="button" variant="destructive" size="compact" disabled={pendingIds.has(cycle.id)} aria-label={`Cancelar ciclo ${cycleLabel(cycle)}`} onClick={() => onTransition(cycle.id,"CANCELLED")}>Cancelar</Button></>}
                {cycle.status === "ACTIVE" && <><Button type="button" variant="secondary" size="compact" disabled={pendingIds.has(cycle.id)} aria-label={`Concluir ciclo ${cycleLabel(cycle)}`} onClick={() => onTransition(cycle.id,"COMPLETED")}>Concluir</Button> <Button type="button" variant="destructive" size="compact" disabled={pendingIds.has(cycle.id)} aria-label={`Cancelar ciclo ${cycleLabel(cycle)}`} onClick={() => onTransition(cycle.id,"CANCELLED")}>Cancelar</Button></>}
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
