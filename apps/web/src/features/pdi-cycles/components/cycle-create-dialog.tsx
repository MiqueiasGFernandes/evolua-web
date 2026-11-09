"use client";
import { useEffect, useRef } from "react";
import type { PdiCycle } from "../domain";
import type { PdiCycleRepository } from "../ports/pdi-cycle-repository";
import { CycleWizard, type WizardHandle } from "./cycle-wizard";
export function CycleCreateDialog({ repository, onClose, onCreated, restoreFocus }: { repository: PdiCycleRepository; onClose: () => void; onCreated: (cycle: PdiCycle) => void; restoreFocus: () => void }) {
 const dialog = useRef<HTMLDialogElement>(null), wizard = useRef<WizardHandle>(null), title = useRef<HTMLHeadingElement>(null);
 useEffect(() => { const element = dialog.current; element?.showModal(); title.current?.focus(); return () => { element?.close(); restoreFocus(); }; }, [restoreFocus]);
 return <dialog ref={dialog} className="cycle-create-dialog" aria-labelledby="create-title" onCancel={(e) => { e.preventDefault(); wizard.current?.requestExit(); }} onClick={(e) => {
  if (e.target !== e.currentTarget) return;
  const b = e.currentTarget.getBoundingClientRect();
  if (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom) wizard.current?.requestExit();
 }} onKeyDown={(e) => {
  if (e.key !== "Tab") return;
  const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href]')).filter((item) => item.getClientRects().length);
  const first = items[0], last = items.at(-1);
  if (e.shiftKey && (document.activeElement === first || document.activeElement === title.current)) { e.preventDefault(); last?.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
 }}><header className="wizard-header"><p className="wizard-eyebrow">Seu próximo passo</p><h1 ref={title} tabIndex={-1} id="create-title">Novo ciclo</h1><p>Defina o período, registre seus objetivos e revise antes de criar.</p></header><CycleWizard ref={wizard} repository={repository} onCancel={onClose} onCreated={onCreated} /></dialog>;
}
