"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { calculateEndDate, cycleInputErrors, objectiveErrors, periodErrors, type CreateCycleInput, type InputErrors, type PdiCycle } from "../domain";
import type { PdiCycleRepository } from "../ports/pdi-cycle-repository";
import { CycleFeedback } from "./cycle-feedback";
import { CyclePeriodStep, durationLabels } from "./cycle-period-step";
import { CycleObjectivesStep, type ObjectiveRow } from "./cycle-objectives-step";
import { formatCyclePeriod } from "./cycle-presentation";
export type WizardHandle = { requestExit: (action?: () => void) => void };
const initial: CreateCycleInput = { durationType: "TRIMESTER", startDate: "", endDate: "", objectives: [""] };
const steps = ["Período", "Objetivos", "Revisão"];
export const CycleWizard = forwardRef<WizardHandle, { repository: PdiCycleRepository; onCreated: (cycle: PdiCycle) => void; onCancel: () => void }>(function CycleWizard({ repository, onCreated, onCancel }, ref) {
 const [ready, setReady] = useState(false);
 useEffect(() => setReady(true), []);
 const [value, setValue] = useState<CreateCycleInput>(initial);
 const [rows, setRows] = useState<ObjectiveRow[]>([{ id: 0, text: "" }]);
 const [step, setStep] = useState(0), [errors, setErrors] = useState<InputErrors>({});
 const [pending, setPending] = useState(false), [error, setError] = useState("");
 const [confirming, setConfirming] = useState(false);
 const busy = useRef(false), saved = useRef(false);
 const root = useRef<HTMLDivElement>(null), heading = useRef<HTMLHeadingElement>(null), continueRef = useRef<HTMLButtonElement>(null);
 const exitAction = useRef(onCancel), returnFocus = useRef<HTMLElement | null>(null);
 const dirty = JSON.stringify(value) !== JSON.stringify(initial);
 function requestExit(action = onCancel) {
  if (busy.current) return;
  if (saved.current || !dirty) { action(); return; }
  exitAction.current = action;
  returnFocus.current = document.activeElement as HTMLElement;
  setConfirming(true);
 }
 useImperativeHandle(ref, () => ({ requestExit }));
 useEffect(() => { if (confirming) continueRef.current?.focus(); else heading.current?.focus(); }, [step, confirming]);
 function continueEditing() { setConfirming(false); setTimeout(() => returnFocus.current?.focus(), 0); }
 function change(next: CreateCycleInput) {
  const endDate = next.durationType === "CUSTOM" ? next.endDate : calculateEndDate(next.startDate, next.durationType);
  setValue({ ...next, endDate }); setErrors({}); setError("");
 }
 function showErrors(next: InputErrors) {
  setErrors(next);
  setTimeout(() => {
   const invalid = root.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
   (invalid ?? root.current?.querySelector<HTMLElement>("[data-add-objective]") ?? heading.current)?.focus();
  }, 0);
 }
 async function submit() {
  if (busy.current || saved.current) return;
  const validation = step === 0 ? periodErrors(value) : step === 1 ? objectiveErrors(value.objectives) : cycleInputErrors(value);
  if (Object.keys(validation).length) { showErrors(validation); return; }
  if (step < 2) { setStep(step + 1); setErrors({}); return; }
  busy.current = true; setPending(true); setError("");
  let created: PdiCycle;
  try { created = await repository.create(value); }
  catch { setError("Não foi possível salvar o ciclo. Seus dados continuam no formulário; tente novamente."); busy.current = false; setPending(false); return; }
  saved.current = true; busy.current = false; setPending(false);
  // The commit succeeded. Presentation failures must never offer another create.
  onCreated(created);
 }
 return <div ref={root} className="cycle-wizard" onKeyDown={(e) => { if (e.key === "Escape" && confirming) { e.preventDefault(); e.stopPropagation(); continueEditing(); } }}>
  {confirming && <section aria-labelledby="discard-title" className="wizard-discard"><h2 id="discard-title">Descartar este planejamento?</h2><p>Você tem alterações não salvas. Ao descartar, elas serão perdidas.</p><div className="form-actions"><Button ref={continueRef} type="button" onClick={continueEditing}>Continuar preenchendo</Button><Button type="button" variant="destructive" onClick={() => exitAction.current()}>Descartar</Button></div></section>}
  <form hidden={confirming} noValidate onSubmit={(e) => { e.preventDefault(); void submit(); }} aria-busy={pending || undefined}>
   <nav aria-label="Etapas do cadastro"><ol className="wizard-steps">{steps.map((text, index) => <li key={text} aria-current={step === index ? "step" : undefined}><span aria-hidden="true">{index + 1}</span>{text}</li>)}</ol></nav>
   <div className="wizard-stage-heading"><p className="field-hint">Etapa {step + 1} de 3</p><h2 ref={heading} tabIndex={-1}>{steps[step]}</h2></div>
   {error && <CycleFeedback variant="error">{error}</CycleFeedback>}
   <fieldset disabled={pending || !ready} className="wizard-fields">
    {step === 0 && <CyclePeriodStep value={value} errors={errors} onChange={change} />}
    {step === 1 && <CycleObjectivesStep rows={rows} errors={errors} onChange={(next) => { setRows(next); change({ ...value, objectives: next.map((row) => row.text) }); }} />}
    {step === 2 && <div className="wizard-review"><dl><dt>Duração</dt><dd>{durationLabels[value.durationType]}</dd><dt>Período</dt><dd>{formatCyclePeriod(value.startDate, value.endDate)}</dd></dl><h3>Objetivos</h3><ol>{value.objectives.map((text, index) => <li key={index}>{text.trim()}</li>)}</ol><p className="field-hint">O ciclo será criado como rascunho.</p><Button variant="secondary" type="button" onClick={() => setStep(0)}>Corrigir período</Button></div>}
    <div className="wizard-actions"><Button type="button" variant="secondary" onClick={() => requestExit()}>Cancelar</Button><div className="form-actions">{step > 0 && <Button type="button" variant="secondary" onClick={() => { setErrors({}); setStep(step - 1); }}>Voltar</Button>}<Button type="submit" pending={pending} pendingLabel="Criando ciclo…">{step < 2 ? "Continuar" : "Criar ciclo"}</Button></div></div>
   </fieldset>
  </form>
 </div>;
});
