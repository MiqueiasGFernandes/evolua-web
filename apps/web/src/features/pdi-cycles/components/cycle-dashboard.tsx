"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { localStoragePdiCycleRepository } from "../adapters/local-storage-pdi-cycle-repository";
import type { CreateCycleInput, CycleStatus, PdiCycle } from "../domain";
import type { PdiCycleRepository } from "../ports/pdi-cycle-repository";
import { CycleFeedback } from "./cycle-feedback";
import { CycleFilter } from "./cycle-filter";
import { CycleForm, emptyCycleInput } from "./cycle-form";
import { CycleResults } from "./cycle-results";

type Feedback = { variant: "info" | "success" | "warning" | "error"; message: string } | null;
type ReadState = "loading" | "ready" | "error";

export function CycleDashboard({ repository = localStoragePdiCycleRepository }: { repository?: PdiCycleRepository }) {
  const [cycles, setCycles] = useState<PdiCycle[]>([]);
  const [form, setForm] = useState<CreateCycleInput>(emptyCycleInput);
  const [status, setStatus] = useState<CycleStatus | "">("");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [readState, setReadState] = useState<ReadState>("loading");
  const [readError, setReadError] = useState("");
  const [createPending, setCreatePending] = useState(false);
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const requestSequence = useRef(0);
  const resultTitleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

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
    } catch (cause) {
      if (request !== requestSequence.current) return false;
      const message = "Verifique a conexão com o armazenamento do navegador e tente novamente.";
      setReadError(message);
      setReadState("error");
      return false;
    }
  }, [repository, status]);

  useEffect(() => { void refresh(); }, [refresh]);

  async function create() {
    if (createPending) return;
    setCreatePending(true);
    setFeedback(null);
    try {
      await repository.create(form);
      setForm(emptyCycleInput);
      const refreshed = await refresh();
      if (refreshed) {
        setFeedback(status && status !== "DRAFT"
          ? { variant: "success", message: "Ciclo criado como rascunho. Ele não aparece no filtro atual." }
          : { variant: "success", message: "Ciclo criado como rascunho." });
      } else {
        setFeedback({ variant: "warning", message: "O ciclo foi criado, mas a lista não pôde ser atualizada. Recarregue a página antes de tentar novamente." });
      }
    } catch (cause) {
      setFeedback({ variant: "error", message: "Não foi possível salvar o ciclo. Seus dados continuam no formulário; tente novamente." });
    } finally {
      setCreatePending(false);
    }
  }

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
      setFeedback({ variant: "error", message: "Não foi possível atualizar o ciclo. O status anterior foi mantido." });
    } finally {
      setPendingIds((current) => { const nextSet = new Set(current); nextSet.delete(id); return nextSet; });
    }
  }

  return (
    <main className="pdi-shell">
      <header className="pdi-masthead">
        <div>
          <p className="pdi-kicker">Plano de desenvolvimento individual</p>
          <h1 className="pdi-title">Ciclos que dão forma ao seu percurso</h1>
        </div>
        <p className="pdi-intro">Organize períodos de desenvolvimento, acompanhe o que está em movimento e preserve a história de cada etapa.</p>
      </header>

      <div className="pdi-grid">
        <section className="pdi-panel pdi-form-panel" aria-labelledby="create-title">
          <div className="section-heading">
            <p className="section-eyebrow">Próximo passo</p>
            <h2 className="section-title" id="create-title">Novo ciclo</h2>
            <p className="section-description">Defina o período que orientará seu foco de desenvolvimento.</p>
          </div>
          {feedback && <div style={{ marginBottom: 20 }}><CycleFeedback variant={feedback.variant}>{feedback.message}</CycleFeedback></div>}
          <CycleForm value={form} pending={createPending} onChange={setForm} onSubmit={() => void create()} />
        </section>

        <section className="pdi-panel" aria-labelledby="list-title">
          <div className="results-header">
            <div>
              <p className="section-eyebrow">Percurso</p>
              <h2 ref={resultTitleRef} tabIndex={-1} className="section-title" id="list-title">Meus ciclos</h2>
            </div>
            <CycleFilter value={status} onChange={setStatus} />
          </div>
          <CycleResults
            state={readState}
            cycles={cycles}
            filtered={Boolean(status)}
            error={readError}
            pendingIds={pendingIds}
            itemRefs={itemRefs}
            onTransition={(id, next) => void transition(id, next)}
          />
        </section>
      </div>
    </main>
  );
}
