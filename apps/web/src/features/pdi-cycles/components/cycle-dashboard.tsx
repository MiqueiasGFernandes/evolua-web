"use client";

import { useEffect, useState } from "react";
import type { CreateCycleInput, CycleStatus, PdiCycle } from "../domain";
import { localStoragePdiCycleRepository } from "../adapters/local-storage-pdi-cycle-repository";

const empty: CreateCycleInput = { title: "", description: null, durationType: "CUSTOM", startDate: "", endDate: "" };

export function CycleDashboard() {
  const [cycles, setCycles] = useState<PdiCycle[]>([]);
  const [form, setForm] = useState<CreateCycleInput>(empty);
  const [status, setStatus] = useState<CycleStatus | "">("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try { setCycles((await localStoragePdiCycleRepository.list({ status: status || undefined })).items); setError(""); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Não foi possível carregar os ciclos."); }
    finally { setLoading(false); }
  }

  useEffect(() => { void refresh(); }, [status]);

  async function create(event: React.FormEvent) {
    event.preventDefault();
    try { await localStoragePdiCycleRepository.create(form); setForm(empty); await refresh(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Não foi possível criar o ciclo."); }
  }

  async function transition(id: string, next: Exclude<CycleStatus, "DRAFT">) {
    try { await localStoragePdiCycleRepository.transition(id, next); await refresh(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Transição não realizada."); }
  }

  return <main style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem", fontFamily: "sans-serif" }}>
    <h1>Ciclos de PDI</h1>
    <p>Planeje e acompanhe seus ciclos de desenvolvimento.</p>
    {error && <p role="alert" style={{ color: "#b42318" }}>{error}</p>}
    <section aria-labelledby="create-title">
      <h2 id="create-title">Novo ciclo</h2>
      <form onSubmit={create} style={{ display: "grid", gap: "0.75rem", maxWidth: 520 }}>
        <label>Título<input required minLength={3} maxLength={120} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
        <label>Descrição<textarea maxLength={2000} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value || null })} /></label>
        <label>Tipo<select value={form.durationType} onChange={(e) => setForm({ ...form, durationType: e.target.value as CreateCycleInput["durationType"] })}><option value="TRIMESTER">Trimestral</option><option value="SEMESTER">Semestral</option><option value="YEAR">Anual</option><option value="CUSTOM">Personalizado</option></select></label>
        <label>Data inicial<input required type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></label>
        <label>Data final<input required type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} /></label>
        <button type="submit">Criar ciclo</button>
      </form>
    </section>
    <section aria-labelledby="list-title" style={{ marginTop: "2rem" }}>
      <h2 id="list-title">Meus ciclos</h2>
      <label>Filtrar por status<select value={status} onChange={(e) => setStatus(e.target.value as CycleStatus | "")}><option value="">Todos</option><option value="DRAFT">DRAFT</option><option value="ACTIVE">ACTIVE</option><option value="COMPLETED">COMPLETED</option><option value="CANCELLED">CANCELLED</option></select></label>
      {loading ? <p role="status">Carregando ciclos…</p> : cycles.length === 0 ? <p>Nenhum ciclo encontrado.</p> : <ul>{cycles.map((cycle) => <li key={cycle.id} style={{ margin: "1rem 0" }}><strong>{cycle.title}</strong> — {cycle.status}<br />{cycle.startDate} a {cycle.endDate}<div>{cycle.status === "DRAFT" && <><button onClick={() => void transition(cycle.id, "ACTIVE")}>Iniciar</button><button onClick={() => void transition(cycle.id, "CANCELLED")}>Cancelar</button></>}{cycle.status === "ACTIVE" && <><button onClick={() => void transition(cycle.id, "COMPLETED")}>Concluir</button><button onClick={() => void transition(cycle.id, "CANCELLED")}>Cancelar</button></>}</div></li>)}</ul>}
    </section>
  </main>;
}
