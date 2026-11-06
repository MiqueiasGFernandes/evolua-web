"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { localStoragePdiCycleRepository } from "../adapters/local-storage-pdi-cycle-repository";
import type { CreateCycleInput, CycleStatus, PdiCycle } from "../domain";
import type { PdiCycleRepository } from "../ports/pdi-cycle-repository";
import { CycleFeedback } from "./cycle-feedback";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRightIcon, PlusIcon } from "@radix-ui/react-icons";
import { CycleFilter } from "./cycle-filter";
import { CycleForm, emptyCycleInput } from "./cycle-form";
import { CycleResults } from "./cycle-results";
import { CycleNavigation, MobileCycleNavigation, navigateToCycleSection } from "./cycle-navigation";

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
    } catch {
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
      setFeedback({ variant: "error", message: cause instanceof Error ? cause.message : "Não foi possível atualizar o ciclo. O status anterior foi mantido." });
    } finally {
      setPendingIds((current) => { const nextSet = new Set(current); nextSet.delete(id); return nextSet; });
    }
  }

  return (
    <div className="pdi-app-shell" id="topo">
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <CycleNavigation />
      <div className="pdi-main">
        <header className="pdi-topbar">
          <div className="pdi-topbar__identity">
            <MobileCycleNavigation />
            <nav className="pdi-breadcrumb" aria-label="Localização atual">
              <span>Evolua</span>
              <ChevronRightIcon aria-hidden="true" />
              <span aria-current="page">Ciclos</span>
            </nav>
          </div>
          <Button type="button" size="compact" onClick={() => navigateToCycleSection("novo-ciclo")}>
            <PlusIcon data-icon="inline-start" aria-hidden="true" /> Novo ciclo
          </Button>
        </header>
        <main id="conteudo" tabIndex={-1} className="pdi-content">
          <div className="pdi-page-heading">
            <h1 className="pdi-title">Ciclos</h1>
            <p className="pdi-intro">Acompanhe seus períodos de desenvolvimento e organize os próximos passos.</p>
          </div>

          {feedback && <div className="feedback-stack"><CycleFeedback variant={feedback.variant}>{feedback.message}</CycleFeedback></div>}

          <div className="pdi-content-grid">
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

            <section id="novo-ciclo" tabIndex={-1} className="pdi-panel pdi-form-panel" aria-labelledby="create-title">
              <Card>
                <CardHeader>
                  <CardTitle id="create-title">Novo ciclo</CardTitle>
                  <CardDescription>Defina um período para o seu próximo passo.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CycleForm value={form} pending={createPending} onChange={setForm} onSubmit={() => void create()} />
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
