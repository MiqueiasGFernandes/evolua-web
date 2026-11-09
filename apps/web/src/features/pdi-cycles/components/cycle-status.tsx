import type { CycleStatus as Status } from "../domain";

const statusLabels: Record<Status, string> = {
  DRAFT: "Rascunho",
  ACTIVE: "Ativo",
  PAUSED: "Pausado",
  COMPLETED: "Concluído",
  CANCELLED: "Cancelado"
};

export function cycleStatusLabel(status: Status): string {
  return statusLabels[status];
}

export function CycleStatus({ status }: { status: Status }) {
  return <span className={`cycle-status cycle-status--${status.toLowerCase()}`}>{statusLabels[status]}</span>;
}
