# Tasks: Dashboard Evolua — conclusão após clarificação

**Feature**: `004-dashboard-ux-ui` | **Branch Git**: `main` | **Date**: 2026-11-06.

**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md), [data-model.md](data-model.md), [UI](contracts/ui-contract.md), [revisão manual](contracts/accessibility-review.md), [quickstart.md](quickstart.md).

**Histórico**: T001–T011 concluídas antes da clarificação estão preservadas integralmente em [tasks-before-clarify.md](validation/tasks-before-clarify.md). Os resultados anteriores não comprovam FR-011. A numeração continua em T012; as tarefas não concluídas desta lista permanecem pendentes. Código existente deve ser reutilizado e alterado somente diante de falha reproduzida.

**Tests**: explicitamente exigidos por FR-011/SC-004. Testes de regressão precedem correções; se o comportamento já estiver correto, registrar a verificação sem fabricar falha ou reescrever componentes.

**Paths**: caminhos de código abaixo partem da raiz do repositório; `validation/` nos resultados significa `specs/004-dashboard-ux-ui/validation/`. Dados sintéticos e perfis isolados; nenhuma revisão com leitor de tela pode ser substituída por DOM, axe, screenshot ou resultado presumido.

## Phase 1 — Setup

**Goal**: identificar código e ambiente sem perder trabalho local.

- [x] T012 Conferir estado Git, versões, ferramentas de navegador/leitor disponíveis e hashes contra `specs/004-dashboard-ux-ui/validation/planning-state.json`; registrar revisão e diferenças em `specs/004-dashboard-ux-ui/validation/execution-state.md`, preservando `validation/protected-hashes.json` e a alteração local `info.title: Evolua API` sem restaurar arquivos externos à feature (FR-001, FR-010).
- [x] T013 [P] Criar `specs/004-dashboard-ux-ui/validation/manual-accessibility.md` como registro de execução inicialmente pendente, com campos do contrato e M01–M07; reservar links para resultados por história, sem inventar avaliador, versões, observações ou aprovação (FR-011).

## Phase 2 — Foundational

**Goal**: disponibilizar os mesmos componentes para revisão humana em estados reproduzíveis. Depende de T012–T013; bloqueia as histórias.

- [x] T014 Escrever testes em `apps/web/src/features/pdi-cycles/tests/manual-pdi-cycle-repository.test.ts` para repositório controlado: leitura pendente liberável, falha de leitura, falha de criação preservando entrada, falha de transição sem mutação e reinício isolado por cenário; usar `apps/web/src/features/pdi-cycles/ports/pdi-cycle-repository.ts` como contrato, sem alterar domínio/porta/adaptador (FR-001, FR-007, FR-011).
- [x] T015 Implementar `apps/web/tests/fixtures/manual-pdi-cycle-repository.ts` para satisfazer T014, reutilizando os dados sintéticos de `apps/web/tests/fixtures/pdi-cycles.ts`; preservar restrições: título “mínimo de 3 caracteres após trim; máximo de 120 no valor de entrada”, descrição “opcional, até 2.000 caracteres”, duração “TRIMESTER, SEMESTER, YEAR, CUSTOM”, datas “início/fim obrigatórios e fim posterior ao início”, status “DRAFT, ACTIVE, COMPLETED, CANCELLED”, criação DRAFT, quatro transições e “No máximo um ciclo ACTIVE por proprietário”; valores inválidos existem apenas nos cenários explícitos de erro. Não gravar cenários no armazenamento real do usuário (FR-001, FR-007).
- [x] T016 Criar uma superfície de revisão somente em `apps/web/tests/manual/index.html`, `apps/web/tests/manual/dashboard.tsx`, `apps/web/tests/manual/manual.css` e `apps/web/tests/manual/vite.config.ts`, montando o CycleDashboard real com o repositório de T015, CSS global e os mesmos arquivos de fonte; permitir escolher cenários de teste e liberar operações pendentes fora da região avaliada. Expor execução em `apps/web/package.json` com script `test:manual`, servidor apenas em `127.0.0.1:4174`; usar a versão de Vite já resolvida pelo Vitest no lockfile como dependência direta de desenvolvimento se necessário. Não adicionar rota/controle de teste ao produto nem dependência de produção; manter alias `@` e configuração Tailwind/PostCSS compatíveis (FR-008, FR-009, FR-011).
- [x] T017 Verificar a superfície de T016 com smoke em `apps/web/tests/manual/manual-review.spec.ts` e instruções em `specs/004-dashboard-ux-ui/quickstart.md`: todos os cenários alcançáveis, operação pendente permanece observável até liberação, erro/sucesso reproduzíveis, reset sem vazamento entre cenários e montagem dos componentes reais. Garantir que o smoke só roda com configuração/servidor de testes próprios em `apps/web/tests/manual/playwright.config.ts`, fora dos projetos normais e do bundle de produção; excluir `tests/manual/` dos projetos normais em `apps/web/playwright.config.ts`. Registrar em `validation/execution-state.md` como iniciar o leitor, acessar a superfície e distinguir smoke de revisão humana (FR-007, FR-008, FR-011).

## Phase 3 — US1: Consultar com hierarquia clara (P1, MVP)

**Goal**: consultar ciclos e operar filtro/transições com contexto tabular reconhecível em desktop e celular.

**Independent Test**: quatro situações; título, período, situação e ações identificáveis em desktop e 320/390 px; filtro mantido e quatro transições preservadas. Cenários manuais M02, M03 e M05 aprovados para a revisão avaliada.

- [x] T018 [P] [US1] Reforçar `apps/web/tests/visual/dashboard-layout.spec.ts` e criar `apps/web/tests/a11y/cycle-table-semantics.spec.ts` para conferir explicitamente cada campo/ação dos quatro status em 320/390 px, sem rolagem horizontal, cabeçalhos/células associados, nomes de ações por ciclo e título longo; não considerar apenas scrollWidth da página como prova de visibilidade nem atributos como prova do anúncio real (FR-006, SC-001).
- [x] T019 [US1] Revisar `apps/web/src/features/pdi-cycles/components/cycle-table.tsx`, `cycle-filter.tsx`, `cycle-status.tsx` e `apps/web/src/app/globals.css`; corrigir somente falhas reproduzidas de dados ocultos, associações, foco ou identificação de ações, preservando tabela/caption/cabeçalhos e layout empilhado abaixo de 768 px. Registrar achados e evidência em `specs/004-dashboard-ux-ui/validation/manual/us1.md`; se não houver falha, registrar verificação e preservar implementação (FR-001, FR-006).
- [ ] T020 [US1] Executar M02, M03 e M05 por teclado e com leitor de tela real na página e nos cenários isolados quando necessários; registrar configuração, passos, esperado, observado e resultado em `specs/004-dashboard-ux-ui/validation/manual/us1.md`. Cobrir desktop e empilhamento em 320/390 px, filtro vazio, quatro transições, tentativa de segundo ACTIVE e estados finais sem ações inválidas; retestar achados de T019 e manter pendente qualquer caso não executado (FR-011, SC-002, SC-004).

## Phase 4 — US2: Planejar com componentes consistentes (P1)

**Goal**: preencher, corrigir, salvar e compreender os estados do formulário sem perda de dados.

**Independent Test**: criar rascunho e recarregar; corrigir campos inválidos; observar loading, erro de leitura/gravação e feedback. M04 e M06 aprovados na configuração registrada.

- [x] T021 [P] [US2] Complementar testes de comportamento em `apps/web/src/features/pdi-cycles/tests/cycle-form.test.tsx` e `apps/web/src/features/pdi-cycles/tests/cycle-results.test.tsx`, usando a fixture controlada para pendência/erro/sucesso e assertivas de labels, instruções, foco e dados preservados. Cobrir título “mínimo de 3 caracteres após trim; máximo de 120 no valor de entrada”, descrição “opcional, até 2.000 caracteres”, duração “TRIMESTER, SEMESTER, YEAR, CUSTOM” e datas “início/fim obrigatórios e fim posterior ao início”; preservar os validadores existentes sem duplicar regras no componente (FR-001, FR-007).
- [x] T022 [US2] Corrigir, quando uma falha for reproduzida, associações de campos/erros e anúncios em `apps/web/src/features/pdi-cycles/components/cycle-form.tsx`, `cycle-results.tsx`, `cycle-feedback.tsx`, `cycle-dashboard.tsx` e `apps/web/src/components/ui/form-field.tsx`; manter valores em falha, controles nativos, fluxo pendente, foco relacionado e todas as validações de T021. Registrar achados ou ausência de correção necessária em `specs/004-dashboard-ux-ui/validation/manual/us2.md` (FR-001, FR-007, FR-009).
- [ ] T023 [US2] Executar M04 e M06 por teclado e leitor de tela real, incluindo estado vazio, filtro sem resultados, loading sustentado pela fixture, erro de leitura, erro de gravação, erro de datas corrigível e sucesso; confirmar persistência de rascunho na página real. Registrar anúncio observado, configuração, evidência e retestes em `specs/004-dashboard-ux-ui/validation/manual/us2.md`, aceitando equivalência de significado sem exigir transcrição literal entre leitores (FR-011, SC-004).

## Phase 5 — US3: Navegar em qualquer largura (P1)

**Goal**: percorrer regiões, destinos e menu sem perda de foco ou bloqueio de conteúdo.

**Independent Test**: M01/M07; menu recolhível a partir de 1024 px, modal abaixo disso, destinos identificados, teclado/leitor operáveis, Escape/fechamento/resize com foco correto.

- [x] T024 [P] [US3] Ampliar `apps/web/tests/functional/cycle-navigation.spec.ts` e `apps/web/tests/a11y/dashboard.spec.ts` para atalho de conteúdo, Tab/Shift+Tab, seleção de destino, fechamento por botão/fundo/Escape, indisponibilidade do fundo durante dialog, retorno de foco ou foco no destino e resize cruzando 1024 px; manter formulário/filtro preenchidos e verificar movimento reduzido e ampliação aplicável (FR-004, FR-005, SC-003).
- [x] T025 [US3] Corrigir somente achados reproduzidos em `apps/web/src/features/pdi-cycles/components/cycle-navigation.tsx`, `cycle-dashboard.tsx` e `apps/web/src/app/globals.css`; preservar dialog nativo, nomes acessíveis, controle desktop, escolha de seção e valores. Registrar reprodução e correção, ou ausência de alteração necessária, em `specs/004-dashboard-ux-ui/validation/manual/us3.md`; coordenar com T019/T022 porque compartilham CSS/dashboard (FR-004, FR-005, FR-009).
- [ ] T026 [US3] Executar M01/M07 por teclado e leitor de tela real em desktop e largura estreita; conferir título do diálogo, fundo indisponível, foco contido em ambas as direções, fechamento/navegação/resize e acesso ao conteúdo. Registrar configuração, viewport/zoom, observações e retestes em `specs/004-dashboard-ux-ui/validation/manual/us3.md`; registrar explicitamente o limite de viewport emulado quando não houver avaliação em dispositivo móvel real (FR-011, SC-003, SC-004).

## Phase 6 — Polish & Cross-Cutting

- [x] T027 Consolidar os resultados de `validation/manual/us1.md`, `us2.md` e `us3.md` em `specs/004-dashboard-ux-ui/validation/manual-accessibility.md`, preenchendo os campos do contrato e a revisão final de código para M01–M07; exigir reteste de cenários afetados por correções posteriores de outra história. Casos pendentes/reprovados permanecem assim até execução/correção real; ausência de leitor ou falha de ambiente não significa aprovação (FR-011).
- [x] T028 Executar sequencialmente os checks de `specs/004-dashboard-ux-ui/quickstart.md` — unitários, lint, build, tipos, E2E Chromium/Firefox/WebKit e visual — sem build concorrente com dev server nem runners disputando artefatos; registrar comandos, versões, contagens reais, resultados e limites em `specs/004-dashboard-ux-ui/validation/acceptance.md`. Validar também o smoke do suporte manual; não reutilizar contagens históricas como execução nova (FR-001, SC-001–SC-004).
- [x] T029 Inspecionar as capturas candidatas geradas nas seis larguras e estados relevantes, conferir tabela/formulário/menu e registrar diferenças em `specs/004-dashboard-ux-ui/validation/acceptance.md`; manter snapshots existentes sem atualização automática e separar revisão com leitor de aprovação humana de eventual baseline visual (FR-010, SC-005).
- [ ] T030 Comparar hashes finais com `specs/004-dashboard-ux-ui/validation/planning-state.json`, classificar diferenças e preservar o baseline histórico em `validation/protected-hashes.json`; atualizar conclusão em `specs/004-dashboard-ux-ui/validation/acceptance.md` e status em `specs/004-dashboard-ux-ui/spec.md` somente se automação, teclado e M01–M07 estiverem aprovados para o código final e sem falha aplicável conhecida. Caso contrário, registrar a pendência verdadeira e manter T030 desmarcada; concluir esta tarefa exige a aceitação comprovada (FR-001, FR-011, SC-004).

## Dependencies & Execution Order

- Setup: T012 e T013 independentes; ambas antes da foundation.
- Foundation: T014 → T015 → T016 → T017. T014–T017 dependem do setup.
- US1: T017 → T018 → T019 → T020.
- US2: T017 → T021 → T022 → T023.
- US3: T017 → T024 → T025 → T026.
- Conclusão: T020 + T023 + T026 → T027 → T028 → T029 → T030.
- As histórias não dependem funcionalmente umas das outras após a foundation. Alterações em globals.css/dashboard e sessões de revisão compartilhadas devem ser sequenciais. Se uma revisão encontrar falha após a correção inicial da história, voltar à tarefa de correção e repetir testes/revisão afetados antes de concluir.

## Parallel Opportunities

`[P]` indica trabalho independente, não autorização para iniciar agentes automaticamente.

- Setup: T013 pode preparar o registro pendente enquanto T012 verifica o ambiente, sem preencher informações ainda desconhecidas.
- US1: T018 pode ocorrer em paralelo com T021/T024 após T017; são arquivos de teste distintos.
- US2: T021 pode ocorrer em paralelo com T018/T024; executar runners de navegador em sequência para não disputar artefatos.
- US3: T024 pode ocorrer em paralelo com T018/T021; T025 aguarda liberação dos arquivos compartilhados por T019/T022.
- Registros de revisão por história são separados; a consolidação T027 ocorre somente depois dos resultados e retestes.

## Implementation Strategy

MVP incremental: setup/foundation + US1 (consulta, empilhamento, filtro e transições com M02/M03/M05). Esse incremento é demonstrável e verificável isoladamente; a aceitação da feature completa exige também US2, US3 e a fase final.

Preservar T001–T011 no arquivo histórico. Escrever proteção comportamental antes de cada correção nova; reutilizar a implementação que já passa. Não introduzir entidades persistidas, migrações, endpoints, paginação visível, autenticação nova ou componentes sem consumidor. O suporte manual é exclusivo de testes e reutiliza os componentes reais. Cada tarefa de revisão pode ser concluída como execução registrada mesmo quando encontra falha, mas a aceitação só conclui após as correções e retestes exigidos em T027–T030.

## Rastreabilidade

| Requisito/critério | Tarefas restantes |
| --- | --- |
| FR-001, SC-002 | T012, T014–T015, T019–T023, T028, T030 |
| FR-002–003, FR-009 | T016, T019, T022, T025, T029; implementação histórica preservada |
| FR-004–005, SC-003 | T024–T026 |
| FR-006, SC-001 | T018–T020, T028–T029 |
| FR-007 | T014–T017, T021–T023 |
| FR-008 | T016–T017; suporte fora do produto |
| FR-010, SC-005 | T012–T013, T029–T030 |
| FR-011, SC-004 | T013–T017, T020, T023, T026–T028, T030 |

## Format Validation

19 tarefas (T012–T030): 15 concluídas e 4 pendentes, com IDs únicos, sequenciais, checkbox, caminhos explícitos e rótulo de história nas fases US1/US2/US3. Quatro oportunidades `[P]`. Implementação e verificações automáticas registradas em validation/acceptance.md; revisão real com leitor de tela não executada. Nenhum hook before_tasks/after_tasks configurado: `.specify/extensions.yml` ausente na conferência final.
