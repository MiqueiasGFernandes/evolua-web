"use client";
import { Button } from "@/components/ui/button";
import { isObjectiveOverdue, objectiveProgress, objectiveSummary, type DevelopmentObjective, type PdiCycle } from "../domain";
import { ObjectiveForm } from "./objective-form";

const labels = { PLANNED: "Planejado", IN_PROGRESS: "Em andamento", COMPLETED: "Concluído", CANCELLED: "Cancelado" };
export function ObjectiveList({ cycle, creating, onCreate, onStart, onComplete, onCancel, onCloseForm, onOpenForm }: { cycle: PdiCycle; creating: boolean; onCreate: React.ComponentProps<typeof ObjectiveForm>["onSave"]; onStart: (objective: DevelopmentObjective) => void; onComplete: (objective: DevelopmentObjective) => void; onCancel: (objective: DevelopmentObjective) => void; onCloseForm: () => void; onOpenForm: () => void }) {
  if (cycle.kind !== "OBJECTIVES") return null; const objectives = cycle.developmentObjectives ?? [], summary = objectiveSummary(cycle), editable = ["DRAFT", "ACTIVE", "PAUSED"].includes(cycle.status);
  return <section className="objective-list" aria-labelledby="objectives-title"><header><h2 id="objectives-title">Objetivos</h2><p>{summary.total} total · {summary.completed} concluídos · {summary.pending} pendentes</p></header>
    {creating && <ObjectiveForm cycle={cycle} onSave={onCreate} onCancel={onCloseForm} />}
    {!objectives.length && !creating && <div className="cycle-state"><h3>Defina os resultados deste ciclo</h3><p>Objetivos claros mostram o que você quer alcançar e como reconhecer o sucesso.</p>{editable && <Button type="button" onClick={onOpenForm}>Criar objetivo</Button>}</div>}
    {!creating && objectives.length > 0 && editable && <Button type="button" variant="secondary" onClick={onOpenForm}>Novo objetivo</Button>}
    <ul>{objectives.map((objective) => { const progress = objectiveProgress(objective), terminal = ["COMPLETED", "CANCELLED"].includes(objective.status); return <li key={objective.id} className="objective-card"><h3>{objective.title}</h3><p>{labels[objective.status]} · {objective.priority} · prazo {objective.dueDate}{isObjectiveOverdue(objective) && <strong> · Atrasado</strong>}</p><p>{objective.successCriterion}</p>{objective.measurement.type === "QUANTITATIVE" ? <p>{objective.measurement.indicatorName}: {progress === null ? "Progresso indisponível" : `${Math.round(progress)}%`}</p> : <ul>{objective.measurement.criteria.map((criterion) => <li key={criterion.id}>{criterion.text}: {criterion.status}</li>)}</ul>}{!terminal && cycle.status === "ACTIVE" && <p>{objective.status === "PLANNED" && <Button type="button" size="compact" onClick={() => onStart(objective)}>Iniciar</Button>} {objective.status === "IN_PROGRESS" && <Button type="button" size="compact" onClick={() => onComplete(objective)}>Concluir</Button>} <Button type="button" size="compact" variant="destructive" onClick={() => onCancel(objective)}>Cancelar</Button></p>}</li>; })}</ul>
  </section>;
}
