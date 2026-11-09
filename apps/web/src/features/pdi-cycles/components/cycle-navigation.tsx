"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, Cross2Icon, HamburgerMenuIcon, ListBulletIcon, PlusIcon, ReaderIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CycleSection = "meus-ciclos" | "novo-ciclo";

export function navigateToCycleSection(target: CycleSection) {
  const section = document.getElementById(target);
  if (!section) return;
  window.location.hash = target;
  section.scrollIntoView({ block: "start" });
  section.focus({ preventScroll: true });
}

function CycleLinks({ onNavigate }: { onNavigate?: (target: CycleSection) => void }) {
  const [active, setActive] = useState<CycleSection>("meus-ciclos");

  useEffect(() => { setActive(window.location.pathname.endsWith("/new") ? "novo-ciclo" : "meus-ciclos"); }, []);

  const links = [
    { id: "meus-ciclos", label: "Meus Ciclos", icon: ListBulletIcon },
    { id: "novo-ciclo", label: "Novo Ciclo", icon: PlusIcon }
  ] as const;

  return (
    <nav aria-label="Seções de ciclos" className="cycle-navigation__links">
      {links.map(({ id, label, icon: Icon }) => (
        <a key={id} href={id === "novo-ciclo" ? "/pdi-cycles/new" : "/pdi-cycles#meus-ciclos"} title={label} aria-current={active === id ? "location" : undefined}
          onClick={(event) => {
            if (event.defaultPrevented) return;
            if (onNavigate && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onNavigate(id); }
          }}>
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}

function NavigationBrand({ compact = false, onNavigate }: { compact?: boolean; onNavigate?: () => void }) {
  return (
    <a className="cycle-navigation__brand" href="/pdi-cycles" aria-label="Evolua, início" onClick={(event) => { if (onNavigate) { event.preventDefault(); onNavigate(); } }}>
      <span className="cycle-navigation__brand-mark" aria-hidden="true">e</span>
      {!compact && <span>Evolua <span className="cycle-navigation__brand-detail">PDI</span></span>}
    </a>
  );
}

export function CycleNavigation() {
  const [expanded, setExpanded] = useState(true);
  const [sectionOpen, setSectionOpen] = useState(true);

  return (
    <aside className={cn("cycle-navigation", expanded ? "is-expanded" : "is-collapsed")} aria-label="Navegação principal">
      <div className="cycle-navigation__top">
        <NavigationBrand compact={!expanded} />
        <Button className="cycle-navigation__collapse" type="button" variant="navigation" size="compact"
          aria-label={expanded ? "Recolher menu" : "Expandir menu"} aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}>
          {expanded ? <ChevronLeftIcon aria-hidden="true" /> : <ChevronRightIcon aria-hidden="true" />}
        </Button>
      </div>
      <p className={cn("cycle-navigation__section-label", !expanded && "sr-only")}>Desenvolvimento</p>
      <button type="button" className="cycle-navigation__group" title="Ciclos" aria-label="Ciclos"
        aria-expanded={sectionOpen} aria-controls="desktop-cycle-links" onClick={() => setSectionOpen((value) => !value)}>
        <ReaderIcon aria-hidden="true" />
        <span className="cycle-navigation__group-label">Ciclos</span>
        <ChevronDownIcon aria-hidden="true" className={cn("cycle-navigation__chevron", sectionOpen && "is-open")} />
      </button>
      <div id="desktop-cycle-links" hidden={!sectionOpen}><CycleLinks /></div>
      <div className="cycle-navigation__footer">
        {expanded && <p>Seu percurso, no seu ritmo.</p>}
      </div>
    </aside>
  );
}

export function MobileCycleNavigation({ onNavigate }: { onNavigate?: (href: string) => void }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTarget = useRef<CycleSection | "desktop" | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    function onResize() {
      if (desktop.matches && dialogRef.current?.open) {
        closeTarget.current = "desktop";
        dialogRef.current.close();
      }
    }
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, []);

  function close(target?: CycleSection) {
    closeTarget.current = target ?? null;
    dialogRef.current?.close();
  }

  function afterClose() {
    setOpen(false);
    const target = closeTarget.current;
    closeTarget.current = null;
    if (target === "desktop") document.getElementById("meus-ciclos")?.focus({ preventScroll: true });
    else if (target) {
      triggerRef.current?.focus({ preventScroll: true });
      const href = target === "novo-ciclo" ? "/pdi-cycles/new" : "/pdi-cycles#meus-ciclos";
      if (onNavigate) onNavigate(href);
      else window.location.assign(href);
    }
    else triggerRef.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <Button ref={triggerRef} className="mobile-menu-trigger" type="button" variant="secondary" size="compact"
        aria-label="Abrir menu de navegação" aria-expanded={open} aria-controls="mobile-cycle-navigation"
        onClick={() => { closeTarget.current = null; dialogRef.current?.showModal(); setOpen(true); }}>
        <HamburgerMenuIcon aria-hidden="true" />
      </Button>
      <dialog ref={dialogRef} id="mobile-cycle-navigation" className="cycle-navigation__dialog"
        aria-labelledby="mobile-navigation-title" onClose={afterClose}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not(:disabled)");
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX > bounds.right || event.clientX < bounds.left || event.clientY > bounds.bottom || event.clientY < bounds.top) close();
        }}>
        <h2 id="mobile-navigation-title" className="sr-only">Menu de navegação</h2>
        <div className="cycle-navigation__dialog-top">
          <NavigationBrand onNavigate={() => close("meus-ciclos")} />
          <Button type="button" variant="navigation" size="compact" aria-label="Fechar menu" onClick={() => close()}>
            <Cross2Icon aria-hidden="true" />
          </Button>
        </div>
        <p className="cycle-navigation__section-label">Desenvolvimento</p>
        <div className="cycle-navigation__group cycle-navigation__group--static">
          <ReaderIcon aria-hidden="true" /><span>Ciclos</span>
        </div>
        <CycleLinks onNavigate={close} />
      </dialog>
    </>
  );
}
