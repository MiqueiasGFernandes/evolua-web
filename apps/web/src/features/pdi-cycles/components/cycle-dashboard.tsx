"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { localStoragePdiCycleRepository } from "../adapters/local-storage-pdi-cycle-repository";
import type { CycleStatus, PdiCycle } from "../domain";
import type { PdiCycleRepository } from "../ports/pdi-cycle-repository";
import { CycleFeedback } from "./cycle-feedback";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { CycleFilter } from "./cycle-filter";
import { CycleCreateDialog } from "./cycle-create-dialog";
import { CycleAppShell } from "./cycle-app-shell";
import { cycleLabel } from "./cycle-presentation";
import { CycleResults } from "./cycle-results";


type Feedback = { variant: "info" | "success" | "warning" | "error"; message: string } | null;
type ReadState = "loading" | "ready" | "error";

export function CycleDashboard({ repository = localStoragePdiCycleRepository }: { repository?: PdiCycleRepository }) {
  const [cycles, setCycles] = useState<PdiCycle[]>([]);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState<PdiCycle | null>(null);
  const [status, setStatus] = useState<CycleStatus | "">("");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [readState, setReadState] = useState<ReadState>("loading");
  const [readError, setReadError] = useState("");

  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const requestSequence = useRef(0);
  const resultTitleRef = useRef<HTMLHeadingElement>(null);
  const createTrigger = useRef<HTMLButtonElement>(null);
  const restoreCreateFocus = useCallback(() => createTrigger.current?.focus(), []);
  const itemRefs = useRef<Map<string, HTMLTableRowElement>>(new Map());

  const refresh = useCallback(async (): Promise<boolean> => {
    const request = ++requestSequence.current;
    setReadState("loading");
    try {
      const result = await repository.list({ status: status || undefined });
      if (request !== requestSequence.current) return false;
      setCycles(result.items);
      setReadError("");
      setReadState("ready");
      return true;
    } catch {
      if (request !== requestSequence.current) return false;
      const message = "Não foi possível ler os dados do navegador. Preserve o armazenamento antes de tentar recuperá-lo.";
      setReadError(message);
      setReadState("error");
      return false;
    }
  }, [repository, status]);

  useEffect(() => { void refresh(); }, [refresh]);

  async function afterCreated(cycle: PdiCycle) {
    setCreating(false); setCreated(cycle);
    const refreshed = await refresh();
    setFeedback(!refreshed ? { variant: "warning", message: "O ciclo foi criado, mas a lista não pôde ser atualizada. Recarregue a consulta; não é necessário criar novamente." }
      : { variant: "success", message: status && status !== "DRAFT" ? "Ciclo criado como rascunho. Ele não aparece no filtro atual." : "Ciclo criado como rascunho." });
    requestAnimationFrame(() => (itemRefs.current.get(cycle.id) ?? resultTitleRef.current)?.focus());
  }
  useEffect(() => {
    const url = new URL(window.location.href), id = url.searchParams.get("created");
    if (!id) return;
    url.searchParams.delete("created"); window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    void repository.get(id).then((cycle) => {
      if (cycle) { setCreated(cycle); setFeedback({ variant: "success", message: "Ciclo salvo como rascunho. Consulte seu planejamento abaixo." }); }
      else setFeedback({ variant: "info", message: "O ciclo solicitado não foi encontrado nesta consulta." });
    }).catch(() => setFeedback({ variant: "warning", message: "Não foi possível recuperar o ciclo salvo. Preserve seus dados e recarregue a consulta." }));
  }, [repository]);

  async function transition(id: string, next: Exclude<CycleStatus, "DRAFT">) {
    if (pendingIds.has(id)) return;
    setPendingIds((current) => new Set(current).add(id));
    setFeedback(null);
    try {
      const updated = await repository.transition(id, next);
      const refreshed = await refresh();
      if (refreshed) {
        const labels: Record<Exclude<CycleStatus, "DRAFT">, string> = { ACTIVE: "iniciado", COMPLETED: "concluído", CANCELLED: "cancelado" };
        setFeedback({ variant: "success", message: `Ciclo ${labels[next]} com sucesso.` });
        requestAnimationFrame(() => (itemRefs.current.get(updated.id) ?? resultTitleRef.current)?.focus());
      } else {
        setFeedback({ variant: "warning", message: "A alteração foi salva, mas a lista não pôde ser atualizada." });
      }
    } catch (cause) {
      setFeedback({ variant: "error", message: cause instanceof Error ? cause.message : "Não foi possível atualizar o ciclo. O status anterior foi mantido." });
    } finally {
      setPendingIds((current) => { const nextSet = new Set(current); nextSet.delete(id); return nextSet; });
    }
  }

  return (
    <CycleAppShell action={<Button ref={createTrigger} type="button" size="compact" onClick={() => setCreating(true)}><PlusIcon data-icon="inline-start" aria-hidden="true" /> Novo ciclo</Button>}>
          <div className="pdi-page-heading">
            <h1 className="pdi-title">Ciclos</h1>
            <p className="pdi-intro">Acompanhe seus períodos de desenvolvimento e organize os próximos passos.</p>
          </div>

          {feedback && <div className="feedback-stack"><CycleFeedback variant={feedback.variant}>{feedback.message}</CycleFeedback></div>}

          {created && !cycles.some((cycle) => cycle.id === created.id) && <section className="created-cycle-summary" aria-label="Ciclo salvo"><h2>{cycleLabel(created)}</h2>{created.kind === "OBJECTIVES" && <ul>{created.objectives.map((text, index) => <li key={index}>{text}</li>)}</ul>}</section>}
          <div className="pdi-consultation-grid">
            <section id="meus-ciclos" tabIndex={-1} className="pdi-panel pdi-cycles-panel" aria-labelledby="list-title">
              <Card>
                <CardHeader className="results-header">
                  <div>
                    <CardTitle ref={resultTitleRef} tabIndex={-1} id="list-title">Meus ciclos</CardTitle>
                    <CardDescription>Seus períodos de desenvolvimento.</CardDescription>
                  </div>
                  <CycleFilter value={status} onChange={setStatus} />
                </CardHeader>
                <CardContent>
                  <CycleResults
                    state={readState}
                    cycles={cycles}
                    filtered={Boolean(status)}
                    error={readError}
                    pendingIds={pendingIds}
                    itemRefs={itemRefs}
                    onTransition={(id, next) => void transition(id, next)}
                  />
                </CardContent>
              </Card>
            </section>

          </div>
          {creating && <CycleCreateDialog restoreFocus={restoreCreateFocus} repository={repository} onClose={() => setCreating(false)} onCreated={(cycle) => void afterCreated(cycle)} />}
    </CycleAppShell>
  );
}
