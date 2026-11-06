# Tasks: Menu lateral e tabela de ciclos

**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md), [data-model.md](data-model.md), [ui contract](contracts/ui-contract.md), [quickstart](quickstart.md).

**Tests**: Incluídos porque SPEC-003 exige preservação dos fluxos E2E e cenários de responsividade/acessibilidade. Não atualizar snapshots automaticamente.

**Organization**: tarefas ordenadas por setup/fundação/história. `[P]` indica arquivos independentes após dependências.

## Path Conventions

Aplicação em `apps/web/`; feature em `apps/web/src/features/pdi-cycles/`; documentação de evidência em `specs/003-menu-lateral-tabela-ciclos/validation/`.

## Phase 1: Setup

- [ ] T001 Registrar hashes baseline de domínio, porta, adaptador e OpenAPI, versões e resultado atual de build/testes em `specs/003-menu-lateral-tabela-ciclos/validation/initial-state.md`.
- [ ] T002 [P] Confirmar que projetos e fixtures Playwright existentes isolam a origem, preservam armazenamento entre reloads e fixam locale `pt-BR`/`America/Sao_Paulo` em `apps/web/playwright.config.ts` e `apps/web/tests/fixtures/pdi-cycles.ts`.
- [ ] T003 Criar referência proposta para tabela e menu em desktop/tablet/mobile, incluindo quatro situações e estados vazio/erro/foco, em `specs/003-menu-lateral-tabela-ciclos/visual-directions/references/manifest.md`; obter registro humano antes de iniciar alterações visuais.

## Phase 2: Foundational

- [ ] T004 [P] Escrever testes de regressão para navegação por âncora, filtro e ações existentes em `apps/web/tests/functional/cycle-navigation.spec.ts`.
- [ ] T005 [P] Criar testes a11y de semântica de tabela, nomes, teclado e foco móvel em `apps/web/tests/a11y/cycle-navigation-table.spec.ts`.
- [ ] T006 [P] Criar testes de viewport e contenção de overflow da tabela em `apps/web/tests/visual/cycle-table-layout.spec.ts` para 320×568, 390×844, 768×1024, 1024×768, 1280×800 e 1440×1000.
- [ ] T007 Definir IDs estáveis e landmarks para as seções já existentes em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`, sem mudar ordem de negócio, valores ou carregamento (FR-007, FR-011).

## Phase 3: User Story 1 — Consultar ciclos em tabela (P1, MVP)

**Goal**: visualizar a lista atual em linhas/colunas e continuar filtrando e executando as ações existentes.

**Independent Test**: carregar quatro situações, verificar cabeçalhos e células, filtrar, executar as transições permitidas e confirmar encerrados sem ações.

### Tests

- [ ] T008 [P] [US1] Testar cabeçalhos, valores pt-BR, quatro status, ações condicionais e filtro em `apps/web/tests/functional/cycle-table.spec.ts`.
- [ ] T009 [P] [US1] Testar primeiro uso, filtro vazio, carregamento e falha de leitura mantendo estados distintos em `apps/web/tests/functional/cycle-table-states.spec.ts`.

### Implementation

- [ ] T010 [P] [US1] Criar tabela semântica com caption, thead, th scope=col e colunas Título/Período/Situação/Ações em `apps/web/src/features/pdi-cycles/components/cycle-table.tsx`.
- [ ] T011 [US1] Integrar `CycleItem`, `CycleStatus`, `formatCyclePeriod`, filtro e callbacks atuais por linha em `apps/web/src/features/pdi-cycles/components/cycle-table.tsx` e `cycle-results.tsx`; preservar as quatro transições e não incluir descrição/histórico (FR-001, FR-002, FR-008, FR-011).
- [ ] T012 [US1] Aplicar tokens visuais à tabela, cabeçalhos, linhas, hover/foco e região interna de rolagem em `apps/web/src/app/globals.css`, sem overflow horizontal na página (FR-003, FR-010, FR-012).
- [ ] T013 [US1] Executar testes T008/T009, caracterização existente, comparar tabela com referência autorizada e registrar diferenças/candidato sem baseline em `specs/003-menu-lateral-tabela-ciclos/validation/us1.md`.

## Phase 4: User Story 2 — Recolher e expandir a navegação (P1)

**Goal**: abrir/recolher menu em desktop e acessar âncoras existentes.

**Independent Test**: navegar por “Ciclos > Meus Ciclos/Novo Ciclo” via teclado e ponteiro; alternar menu e confirmar foco/estado atual.

- [ ] T014 [P] [US2] Testar grupo “Ciclos”, destinos internos, `aria-expanded`, seleção atual e menu desktop compacto/expandido em `apps/web/tests/functional/cycle-navigation.spec.ts`.
- [ ] T015 [US2] Criar `CycleNavigation` em `apps/web/src/features/pdi-cycles/components/cycle-navigation.tsx` com botão nomeado, grupo Ciclos e links âncora `#meus-ciclos`/`#novo-ciclo`; sem novas rotas (FR-004, FR-005, FR-007).
- [ ] T016 [US2] Integrar menu e seção principal na composição de `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`, mantendo filtro/formulário controlados e dados carregados (FR-003, FR-008, FR-011).
- [ ] T017 [US2] Adicionar variantes expandida/compacta, hierarquia, ícone de menu acessível e foco visível nos tokens existentes de `apps/web/src/app/globals.css` e `apps/web/src/components/ui/button.tsx` (FR-004, FR-005, FR-012).
- [ ] T018 [US2] Executar fluxo de navegação por teclado e registrar resultados/estados em `specs/003-menu-lateral-tabela-ciclos/validation/us2.md`.

## Phase 5: User Story 3 — Usar menu e tabela em telas estreitas (P1)

**Goal**: painel móvel operável e tabela/formulário utilizáveis sem overflow de página.

**Independent Test**: 390×844 e 768×1024; abrir menu, escapar/fechar/seguir âncora, conferir foco restaurado, rolar tabela sem rolar página horizontalmente e usar formulário.

- [ ] T019 [P] [US3] Testar painel móvel, Escape, botão fechar, navegação por âncora e retorno de foco em `apps/web/tests/functional/cycle-navigation.spec.ts`.
- [ ] T020 [P] [US3] Testar tabela, formulário e menu nos breakpoints e em títulos longos, garantindo `scrollWidth` de página ≤ viewport + 1 e overflow tabular localizado em `apps/web/tests/visual/cycle-table-layout.spec.ts`.
- [ ] T021 [US3] Implementar menu overlay móvel, início fechado, botão de fechar, Escape, clique em destino e ciclo de foco em `apps/web/src/features/pdi-cycles/components/cycle-navigation.tsx` (FR-006, FR-012).
- [ ] T022 [US3] Implementar breakpoints e `overflow-x:auto` apenas no contêiner da tabela em `apps/web/src/app/globals.css`; preservar conteúdo/cabeçalhos e ações em mobile (FR-003, FR-010, FR-012).
- [ ] T023 [US3] Executar E2E Chromium e smoke Firefox/WebKit, axe, viewport e navegação por teclado; registrar evidência e limitações em `specs/003-menu-lateral-tabela-ciclos/validation/us3.md`.

## Phase 6: Polish & Cross-Cutting

- [ ] T024 [P] Gerar candidatos de referência e diffs em 1440×1000, 768×1024 e 390×844, estados vazio/misto/filtro/erro/foco, em `specs/003-menu-lateral-tabela-ciclos/validation/visual-review.md`; não chamar imagens de baseline aprovado sem revisão humana (FR-014).
- [ ] T025 Registrar revisão humana por imagem/viewport/estado e somente então atualizar snapshots explicitamente aprovados em `apps/web/tests/visual/__screenshots__/`; manter CI em `--update-snapshots=none` (FR-014).
- [ ] T026 Recalcular hashes de domínio/porta/adaptador/OpenAPI, executar typecheck/lint/Vitest/build e resumir critérios FR-001–FR-014 e SC-001–SC-006 em `specs/003-menu-lateral-tabela-ciclos/validation/acceptance.md`.

## Dependencies & Execution Order

Setup T001–T003 → Foundation T004–T007 → US1 T008–T013 → US2 T014–T018 → US3 T019–T023 → Polish T024–T026. T004–T006 e testes de cada história podem rodar em paralelo quando editarem arquivos distintos. T015–T017 e T021–T022 são sequenciais por compartilharem controlador/CSS conforme dependências explícitas. MVP é US1; a aprovação visual e a operação responsiva completa dependem das histórias seguintes.

## Format validation

Todas as tarefas usam checkbox, ID sequencial, marcador `[P]` quando paralelo, rótulo `[USn]` nas fases de história e caminho de arquivo.
