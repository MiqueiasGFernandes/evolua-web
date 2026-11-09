import { Button } from "@/components/ui/button";
import { forwardRef } from "react";
import type { CycleStatus, PdiCycle } from "../domain";
import { cycleLabel, formatCyclePeriod } from "./cycle-presentation";
import { CycleStatus as CycleStatusBadge } from "./cycle-status";

type NextStatus = Exclude<CycleStatus, "DRAFT">;

export const CycleItem = forwardRef<HTMLLIElement, {
  cycle: PdiCycle;
  pending?: boolean;
  onTransition: (id: string, next: NextStatus) => void;
}>(({ cycle, pending = false, onTransition }, ref) => {
  const action = (label: string, next: NextStatus, destructive = false) => (
    <Button
      type="button"
      variant={destructive ? "destructive" : "secondary"}
      size="compact"
      disabled={pending}
      pending={pending}
      pendingLabel="Atualizando…"
      aria-label={`${label} ciclo ${cycleLabel(cycle)}`}
      onClick={() => onTransition(cycle.id, next)}
    >
      {label}
    </Button>
  );

  return (
    <li ref={ref} className="cycle-item" tabIndex={-1} data-cycle-id={cycle.id}>
      <div className="cycle-item__header">
        <h3 className="cycle-item__title">{cycleLabel(cycle)}</h3>
        <CycleStatusBadge status={cycle.status} />
      </div>
      {cycle.kind === "OBJECTIVES" && <ul>{cycle.objectives.map((text, index) => <li key={index}>{text}</li>)}</ul>}
      <p className="cycle-item__period">{formatCyclePeriod(cycle.startDate, cycle.endDate)}</p>
      {(cycle.status === "DRAFT" || cycle.status === "ACTIVE") && (
        <div className="cycle-item__actions" aria-label={`Ações de ${cycleLabel(cycle)}`}>
          {cycle.status === "DRAFT" && action("Iniciar", "ACTIVE")}
          {cycle.status === "ACTIVE" && action("Concluir", "COMPLETED")}
          {action("Cancelar", "CANCELLED", true)}
        </div>
      )}
    </li>
  );
});
CycleItem.displayName = "CycleItem";
