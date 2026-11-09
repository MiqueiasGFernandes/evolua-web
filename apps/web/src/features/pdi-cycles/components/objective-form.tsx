"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CreateObjectiveInput, ObjectivePriority, PdiCycle } from "../domain";

export function ObjectiveForm({ cycle, onSave, onCancel }: { cycle: PdiCycle; onSave: (input: CreateObjectiveInput) => Promise<void>; onCancel: () => void }) {
  const [type, setType] = useState<"QUANTITATIVE" | "QUALITATIVE">("QUANTITATIVE"); const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget); const base = { title: String(data.get("title") ?? ""), description: String(data.get("description") ?? "") || undefined, motivation: String(data.get("motivation") ?? "") || undefined, successCriterion: String(data.get("successCriterion") ?? ""), dueDate: String(data.get("dueDate") ?? ""), priority: String(data.get("priority") ?? "MEDIUM") as ObjectivePriority };
    const input: CreateObjectiveInput = type === "QUANTITATIVE" ? { ...base, measurement: { type, indicatorName: String(data.get("indicatorName") ?? ""), unit: String(data.get("unit") ?? ""), initialValue: Number(data.get("initialValue")), targetValue: Number(data.get("targetValue")), ...(data.get("currentValue") ? { currentValue: Number(data.get("currentValue")) } : {}) } } : { ...base, measurement: { type, criteria: String(data.get("criteria") ?? "").split("\n").map((text, index) => ({ id: `criterion-${index}`, text, status: "NOT_STARTED" as const })), resultDescription: String(data.get("resultDescription") ?? "") || undefined } };
    try { setError(""); await onSave(input); event.currentTarget.reset(); } catch (cause) { setError(cause instanceof Error ? cause.message : "Não foi possível salvar o objetivo."); }
  }
  return <form className="objective-form" onSubmit={submit} noValidate>
    <h3>Novo objetivo</h3>{error && <p role="alert" className="field-error">{error}</p>}
    <label>Título<Input name="title" required /></label><label>Critério de sucesso<Textarea name="successCriterion" required /></label>
    <label>Prazo<Input name="dueDate" type="date" min={cycle.startDate} max={cycle.endDate} required /></label><label>Prioridade<select name="priority" defaultValue="MEDIUM"><option value="LOW">Baixa</option><option value="MEDIUM">Média</option><option value="HIGH">Alta</option></select></label>
    <label>Tipo de mensuração<select value={type} onChange={(event) => setType(event.target.value as typeof type)}><option value="QUANTITATIVE">Quantitativo</option><option value="QUALITATIVE">Qualitativo</option></select></label>
    <label>Descrição (opcional)<Textarea name="description" /></label><label>Motivação (opcional)<Textarea name="motivation" /></label>
    {type === "QUANTITATIVE" ? <div className="objective-form__measurement"><label>Indicador<Input name="indicatorName" required /></label><label>Unidade<Input name="unit" required /></label><label>Valor inicial<Input name="initialValue" type="number" step="any" required /></label><label>Valor-alvo<Input name="targetValue" type="number" step="any" required /></label><label>Valor atual (opcional)<Input name="currentValue" type="number" step="any" /></label></div> : <div className="objective-form__measurement"><label>Critérios observáveis (um por linha)<Textarea name="criteria" required /></label><label>Resultados alcançados (opcional)<Textarea name="resultDescription" /></label></div>}
    <div className="objective-form__actions"><Button type="submit">Salvar objetivo</Button><Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button></div>
  </form>;
}
