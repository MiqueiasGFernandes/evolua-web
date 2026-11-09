"use client";
import type { ReactNode } from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { CycleNavigation, MobileCycleNavigation } from "./cycle-navigation";
export function CycleAppShell({ children, title = "Ciclos", action, onNavigate }: { children: ReactNode; title?: string; action?: ReactNode; onNavigate?: (href: string) => void }) {
 return <div className="pdi-app-shell" id="topo" onClickCapture={(e) => {
  if (!onNavigate || e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
  const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
  if (anchor?.closest("#mobile-cycle-navigation")) return;
  const href = anchor?.getAttribute("href");
  if (href?.startsWith("/pdi-cycles")) { e.preventDefault(); onNavigate(href); }
 }}>
  <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
  <CycleNavigation />
  <div className="pdi-main"><header className="pdi-topbar"><div className="pdi-topbar__identity"><MobileCycleNavigation onNavigate={onNavigate} /><nav className="pdi-breadcrumb" aria-label="Localização atual"><span>Evolua</span><ChevronRightIcon aria-hidden="true" /><span aria-current="page">{title}</span></nav></div>{action}</header><main id="conteudo" tabIndex={-1} className="pdi-content">{children}</main></div>
 </div>;
}
