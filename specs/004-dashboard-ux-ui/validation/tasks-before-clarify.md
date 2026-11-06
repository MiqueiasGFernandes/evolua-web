# Tasks: Dashboard Evolua

**Input**: spec.md, plan.md, research.md, design-system.md, contracts/ui-contract.md.

## Phase 1 — Setup
- [x] T001 Inspecionar stack, alterações locais, testes e hashes em `validation/initial-state.md` e `validation/protected-hashes.json` (FR-001).
- [x] T002 Capturar desktop/tablet/mobile e classificar achados em `validation/audit.md` (FR-010).

## Phase 2 — Foundation
- [x] T003 Definir foundations e cobertura de componentes em `design-system.md` (FR-003, FR-009).
- [x] T004 Adicionar testes de teclado/menu e acessibilidade em `apps/web/tests/functional/cycle-navigation.spec.ts` e `apps/web/tests/a11y/dashboard.spec.ts` (FR-004–007).

## Phase 3 — US1: Consulta clara (P1, MVP)
**Independent Test**: quatro situações, filtro e transições sem regressão.
- [x] T005 [US1] Consolidar tokens e composição de shell/painéis em `apps/web/src/app/globals.css` e `apps/web/src/components/ui/card.tsx` (FR-002, FR-003, FR-009).
- [x] T006 [US1] Integrar painéis e tipografia em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`, `cycle-table.tsx` e `apps/web/src/app/layout.tsx` (FR-001, FR-006, FR-008).

## Phase 4 — US2: Cadastro consistente (P1)
**Independent Test**: criar/recarregar e conferir formulário/feedback.
- [x] T007 [US2] Padronizar variantes de `apps/web/src/components/ui/button.tsx`, campos, status, estados vazios e feedback em `apps/web/src/app/globals.css` (FR-001, FR-003, FR-007).

## Phase 5 — US3: Navegação responsiva (P1)
**Independent Test**: desktop recolhe; mobile/tablet abre/fecha, Escape, foco e resize.
- [x] T008 [US3] Ajustar seleção/foco/dialog e ícones em `apps/web/src/features/pdi-cycles/components/cycle-navigation.tsx` (FR-004, FR-005).
- [x] T009 [US3] Cobrir seis viewports, títulos longos e capturas candidatas em `apps/web/tests/visual/dashboard-layout.spec.ts` (FR-006, FR-010).

## Phase 6 — Polish
- [x] T010 Executar unitários, E2E nos três engines, axe, lint, tipos e build; comparar hashes em `validation/acceptance.md` (SC-001–005).
- [x] T011 Inspecionar capturas posteriores, registrar comparação e limites em `validation/acceptance.md` (FR-010).

## Dependencies & Execution Order
T001–003 → T004 → T005–007 → T008–009 → T010–011. Testes antecedem produção. US1/US2/US3 são verificáveis isoladamente após foundations; executar sequencialmente porque compartilham CSS. Leituras e verificações independentes podem ocorrer em paralelo, sem delegação de agentes.

## Implementation Strategy
Preservar estado local, evoluir composição existente e validar fluxos antes/depois. Não atualizar baselines nem declarar aprovação humana. Nenhum hook de extensão configurado em `.specify/extensions.yml`.
