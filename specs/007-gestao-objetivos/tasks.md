# Tasks: Gestão de Objetivos de Desenvolvimento

**Input**: Artefatos de design em `specs/007-gestao-objetivos/` — [spec](spec.md), [plan](plan.md), [research](research.md), [modelo de dados](data-model.md), [contratos](contracts/) e [guia](quickstart.md).
**Tests**: obrigatórios para regras de domínio e jornadas essenciais pela Constituição; escrever os testes antes da alteração correspondente e observar falha relevante.
**Organização**: tarefas agrupadas por história de usuário. Caminhos são relativos à raiz do repositório.

## Phase 1: Setup

**Objetivo**: registrar a base atual e preparar fixtures sintéticas sem alterar dados reais.

- [ ] T001 Registrar revisão, consumidores de `PdiCycle`, formato local v2 e comandos baseline em `specs/007-gestao-objetivos/validation/baseline.md`.
- [ ] T002 [P] Criar fixtures de ciclos e objetivos quantitativos/qualitativos, estados, prazos e proprietários sintéticos em `apps/web/tests/fixtures/objectives.ts`.
- [ ] T003 [P] Mapear as alterações de schema v1/v2 → v3 e a fronteira `local-user` em `specs/007-gestao-objetivos/validation/compatibility.md`.

---

## Phase 2: Foundational — bloqueia todas as histórias

**Objetivo**: estabelecer o agregado, regras puras, porta e migração preservadora antes das superfícies de objetivos.

- [ ] T004 Criar testes de domínio para `PLANNED`/`IN_PROGRESS`/`COMPLETED`/`CANCELLED`, critérios `NOT_STARTED`/`OBSERVING`/`MET`, prazo inclusivo e estados finais imutáveis em `apps/web/src/features/pdi-cycles/tests/objective-domain.test.ts`.
- [ ] T005 Criar testes de cálculo para `clamp(0, 100, ((current - initial) / (target - initial)) * 100)`, metas crescentes/decrescentes, alvo superado, denominador zero, ausência de valor atual, atraso e resumo de pendentes em `apps/web/src/features/pdi-cycles/tests/objective-progress.test.ts`.
- [ ] T006 Evoluir tipos, validação e funções puras em `apps/web/src/features/pdi-cycles/domain.ts`: `DevelopmentObjective`, mensurações, resumo, atraso e transições; aplicar literalmente `dueDate` inclusivo entre `startDate` e `endDate`, quantitativo com indicador/unidade/valor inicial/alvo finitos e diferentes, e qualitativo com ao menos um critério não vazio.
- [ ] T007 Estender o contrato do agregado para criar/editar objetivo, atualizar resultado e transicionar objetivo com `expectedVersion` em `apps/web/src/features/pdi-cycles/ports/pdi-cycle-repository.ts`.
- [ ] T008 Criar testes de adaptador para decodificação, migração v1/v2 → v3, preservação de ciclos legados, IDs duplicados, conflito de versão e filtro por proprietário local em `apps/web/src/features/pdi-cycles/tests/local-storage-objectives-repository.test.ts`.
- [ ] T009 Implementar envelope v3 preservador e operações de objetivo protegidas por proprietário/versão em `apps/web/src/features/pdi-cycles/adapters/local-storage-pdi-cycle-repository.ts`; não converter textos históricos em objetivos estruturados nem sobrescrever fonte legada divergente.
- [ ] T010 Atualizar rótulos e transições de ciclo, incluindo `PAUSED` e suas permissões, em `apps/web/src/features/pdi-cycles/components/cycle-status.tsx` e `apps/web/src/features/pdi-cycles/domain.ts`.

**Checkpoint**: domínio, persistência e dados sintéticos validam invariantes sem depender da interface.

---

## Phase 3: User Story 1 — Planejar objetivos de um ciclo (Priority: P1) 🎯 MVP

**Goal**: permitir cadastrar objetivos quantitativos e qualitativos em ciclos editáveis, com validação contextual.

**Independent Test**: em um ciclo em rascunho ou ativo, criar um objetivo de cada tipo com prazo válido e encontrá-los no ciclo sem salvar campos do tipo oculto.

### Tests

- [ ] T011 [P] [US1] Criar testes de formulário para título e critério obrigatórios, prazo dentro do ciclo, alternância de tipo e campos condicionais em `apps/web/src/features/pdi-cycles/tests/objective-form.test.tsx`.
- [ ] T012 [P] [US1] Criar cenário Playwright de criação quantitativa e qualitativa no detalhe de ciclo em `apps/web/tests/functional/objective-create.spec.ts`.

### Implementation

- [ ] T013 [US1] Criar formulário progressivo de objetivo em `apps/web/src/features/pdi-cycles/components/objective-form.tsx` com campos comuns e variantes quantitativa/qualitativa; mostrar somente os campos pertinentes e focar o primeiro erro.
- [ ] T014 [US1] Integrar criação e edição de planejamento com versão esperada no detalhe de ciclo em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`.
- [ ] T015 [US1] Adicionar estilos de formulário, erros e controles condicionais sem rolagem horizontal em `apps/web/src/app/globals.css`.
- [ ] T016 [US1] Executar T011/T012 e registrar criação, validação de prazo e alternância de mensuração em `specs/007-gestao-objetivos/validation/us1.md`.

**Checkpoint**: objetivos válidos podem ser planejados no próprio ciclo; quantitativo e qualitativo não misturam dados.

---

## Phase 4: User Story 2 — Consultar e organizar objetivos do ciclo (Priority: P1)

**Goal**: apresentar objetivos, detalhe, atraso e estado vazio no contexto do ciclo.

**Independent Test**: com objetivos em estados/prazos diferentes, identificar dados principais, atraso e estado vazio sem abrir outro ciclo.

### Tests

- [ ] T017 [P] [US2] Criar testes de apresentação para prioridade, status, prazo, atraso derivado, texto de progresso indisponível e ausência de percentual qualitativo em `apps/web/src/features/pdi-cycles/tests/objective-presentation.test.tsx`.
- [ ] T018 [P] [US2] Criar cenários de lista, detalhe e estado vazio contextualizado em `apps/web/tests/functional/objective-view.spec.ts`.

### Implementation

- [ ] T019 [US2] Criar lista/resumo de objetivos e estado vazio contextualizado em `apps/web/src/features/pdi-cycles/components/objective-list.tsx`.
- [ ] T020 [US2] Criar detalhe completo com dados de mensuração, critérios e resultado em `apps/web/src/features/pdi-cycles/components/objective-detail.tsx`.
- [ ] T021 [US2] Integrar seção de objetivos e ações permitidas ao ciclo selecionado em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`.
- [ ] T022 [US2] Adicionar estilos de prioridade, atraso, detalhe, vazio e ações empilháveis em `apps/web/src/app/globals.css`.
- [ ] T023 [US2] Executar T017/T018 e registrar lista, atraso e vazio em `specs/007-gestao-objetivos/validation/us2.md`.

**Checkpoint**: consulta de um ciclo revela seus objetivos e o que exige atenção, sem percentual artificial.

---

## Phase 5: User Story 3 — Acompanhar resultados quantitativos e qualitativos (Priority: P1)

**Goal**: registrar resultados reais e expor progresso apenas onde for matematicamente válido.

**Independent Test**: atualizar metas crescente/decrescente e critérios qualitativos, confirmando limite de 0–100, nenhuma conclusão automática e nenhum percentual qualitativo.

### Tests

- [ ] T024 [P] [US3] Estender os limites matemáticos e atualizações de resultado em `apps/web/src/features/pdi-cycles/tests/objective-progress.test.ts` para crescente, decrescente, superação, indisponibilidade e estado qualitativo.
- [ ] T025 [P] [US3] Criar cenário funcional de atualização de valor atual e critérios, sem mudança automática para concluído, em `apps/web/tests/functional/objective-progress.spec.ts`.

### Implementation

- [ ] T026 [US3] Criar controles de atualização de valor atual, critérios e resultado descritivo em `apps/web/src/features/pdi-cycles/components/objective-detail.tsx`.
- [ ] T027 [US3] Integrar atualização de resultados com guardas de ciclo/objetivo e feedback de sucesso/erro em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`.
- [ ] T028 [US3] Criar representação visual acessível de progresso quantitativo e texto de indisponibilidade em `apps/web/src/app/globals.css`.
- [ ] T029 [US3] Executar T024/T025 e registrar cálculos, superação e qualitativo em `specs/007-gestao-objetivos/validation/us3.md`.

**Checkpoint**: progresso representa resultado registrado e não atividade concluída.

---

## Phase 6: User Story 4 — Gerenciar o ciclo de vida do objetivo (Priority: P2)

**Goal**: controlar início, pausa, conclusão e cancelamento, preservando histórico e foco.

**Independent Test**: iniciar, concluir com resultado e cancelar objetivos em ciclo ativo; verificar confirmações, imutabilidade terminal e permissões de ciclo pausado/encerrado.

### Tests

- [ ] T030 [P] [US4] Criar testes de transição e permissão para ciclo rascunho/ativo/pausado/concluído/cancelado e objetivo terminal em `apps/web/src/features/pdi-cycles/tests/objective-lifecycle.test.ts`.
- [ ] T031 [P] [US4] Criar cenários de confirmação, restauração de foco, pausa e consulta histórica em `apps/web/tests/functional/objective-lifecycle.spec.ts`.
- [ ] T032 [P] [US4] Adicionar cobertura axe e teclado das confirmações e controles bloqueados em `apps/web/tests/a11y/objectives.spec.ts`.

### Implementation

- [ ] T033 [US4] Criar diálogo de confirmação de conclusão/cancelamento e descarte de alterações em `apps/web/src/features/pdi-cycles/components/objective-confirmation-dialog.tsx`.
- [ ] T034 [US4] Integrar transições, resultado de conclusão, bloqueios e restauração de foco em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`.
- [ ] T035 [US4] Estilizar confirmações, estados bloqueados e foco visível em `apps/web/src/app/globals.css`.
- [ ] T036 [US4] Executar T030–T032 e registrar ciclo de vida, foco e histórico em `specs/007-gestao-objetivos/validation/us4.md`.

**Checkpoint**: transições são explícitas, confirmadas e respeitam ciclo/estado final.

---

## Phase 7: User Story 5 — Consultar resumo de objetivos no ciclo (Priority: P2)

**Goal**: expor contagens derivadas confiáveis sem construir dashboard analítico.

**Independent Test**: criar, concluir e cancelar objetivos e confirmar total, concluídos e pendentes, sem contar cancelados como pendentes.

### Tests

- [ ] T037 [P] [US5] Criar testes de resumo para total, concluídos, planejados/em andamento e cancelados em `apps/web/src/features/pdi-cycles/tests/objective-summary.test.ts`.
- [ ] T038 [P] [US5] Criar cenário de atualização do resumo após criar, concluir e cancelar em `apps/web/tests/functional/objective-summary.spec.ts`.

### Implementation

- [ ] T039 [US5] Implementar apresentação do resumo derivado no cabeçalho da seção em `apps/web/src/features/pdi-cycles/components/objective-list.tsx`.
- [ ] T040 [US5] Integrar atualização otimista/recarga do resumo após operações de objetivo em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`.
- [ ] T041 [US5] Executar T037/T038 e registrar consistência do resumo em `specs/007-gestao-objetivos/validation/us5.md`.

**Checkpoint**: o ciclo informa total, concluídos e pendentes de modo consistente.

---

## Phase 8: Polish & cross-cutting concerns

**Objetivo**: concluir a Definition of Done, compatibilidade e evidências de aceite.

- [ ] T042 [P] Revisar fixtures e regressões de ciclo existente para `PAUSED`, v3 e objetivos estruturados em `apps/web/tests/fixtures/pdi-cycles.ts` e `apps/web/tests/functional/cycles-characterization.spec.ts`.
- [ ] T043 [P] Adicionar estados de objetivo e confirmações em 320/390/768/1024/1440 px sem atualizar snapshots automaticamente em `apps/web/tests/visual/dashboard-layout.spec.ts`.
- [ ] T044 Executar unitários, lint, tipos, build, E2E Chromium, axe e visual sequencialmente; registrar comandos/resultados/limitações em `specs/007-gestao-objetivos/validation/automated.md`.
- [ ] T045 Conferir manualmente teclado, leitor de tela, contraste, zoom, texto longo e movimento reduzido; registrar também a limitação multiusuária local em `specs/007-gestao-objetivos/validation/manual-accessibility.md`.
- [ ] T046 Consolidar rastreabilidade FR-001–023 e SC-001–008, migração, resultados e aceite em `specs/007-gestao-objetivos/validation/acceptance.md`; atualizar `spec.md`, `plan.md` e `tasks.md` somente após os checks satisfeitos.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup**: começa imediatamente.
- **Foundational**: depende de T001–T003 e bloqueia todas as histórias.
- **US1–US3 (P1)**: começam após a fundação; executar sequencialmente porque compartilham domínio e detalhe do ciclo.
- **US4 e US5 (P2)**: começam após US3; US5 pode avançar em paralelo ao CSS/axe de US4 quando não editar os mesmos arquivos.
- **Polish**: depende de US1–US5.

### User Story Completion Order

`US1 → US2 → US3 → US4 → US5`.

US1 entrega planejamento; US2 torna os objetivos consultáveis; US3 entrega acompanhamento real; US4 protege o ciclo de vida; US5 consolida indicadores derivados.

### Parallel Opportunities

- T002 e T003 podem ocorrer em paralelo.
- T004/T005 e T008 podem ser escritos em paralelo antes das implementações correspondentes.
- Em cada história, tarefas de teste marcadas `[P]` alteram arquivos distintos.
- T042 e T043 podem ocorrer em paralelo após as histórias, sem executar runners na mesma porta/cache simultaneamente.

## Parallel Example: User Story 4

```text
T030: regras de ciclo de vida em tests/objective-lifecycle.test.ts
T031: fluxos de confirmação/foco em tests/functional/objective-lifecycle.spec.ts
T032: teclado e axe em tests/a11y/objectives.spec.ts
```

## Implementation Strategy

### MVP first

1. Completar T001–T010 para regras, compatibilidade e persistência.
2. Completar T011–T016 para planejamento quantitativo e qualitativo no ciclo.
3. Validar US1 independentemente antes de abrir a apresentação e acompanhamento.

### Incremental delivery

1. US1 entrega cadastro de objetivos.
2. US2 entrega consulta, detalhe e atraso.
3. US3 entrega progresso baseado em resultado.
4. US4 acrescenta transições e histórico controlado.
5. US5 acrescenta o resumo necessário para dashboards futuros.

### Format validation

Todas as tarefas usam checkbox, identificador sequencial, rótulo de história quando aplicável e caminho explícito.
