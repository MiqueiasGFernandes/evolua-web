"use client";
import { useEffect, useRef } from "react";
import { localStoragePdiCycleRepository } from "../adapters/local-storage-pdi-cycle-repository";
import type { PdiCycleRepository } from "../ports/pdi-cycle-repository";
import { CycleAppShell } from "./cycle-app-shell";
import { CycleWizard, type WizardHandle } from "./cycle-wizard";
export function CycleCreatePage({ repository = localStoragePdiCycleRepository, navigate = (href) => window.location.assign(href) }: { repository?: PdiCycleRepository; navigate?: (href: string) => void }) {
 const wizard = useRef<WizardHandle>(null), title = useRef<HTMLHeadingElement>(null);
 useEffect(() => title.current?.focus(), []);
 return <CycleAppShell title="Novo ciclo" onNavigate={(href) => wizard.current?.requestExit(() => navigate(href))}>
  <div className="cycle-create-page"><header className="wizard-header"><p className="wizard-eyebrow">Seu próximo passo</p><h1 ref={title} tabIndex={-1} className="pdi-title">Novo ciclo</h1><p>Defina o período, registre seus objetivos e revise antes de criar.</p></header><div className="wizard-page-card"><CycleWizard ref={wizard} repository={repository} onCancel={() => navigate("/pdi-cycles")} onCreated={(cycle) => navigate(`/pdi-cycles?created=${encodeURIComponent(cycle.id)}`)} /></div></div>
 </CycleAppShell>;
}
