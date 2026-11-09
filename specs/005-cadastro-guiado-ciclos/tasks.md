# Tasks: Cadastro guiado de ciclos por objetivos

**Input**: `specs/005-cadastro-guiado-ciclos/` — [spec](spec.md), [plan](plan.md), [research](research.md), [data-model](data-model.md), [contratos](contracts/ui-contract.md) e [quickstart](quickstart.md).
**Estado**: implementação em andamento; validações e aceitação acompanhadas abaixo. Branch Git observada: main.
**Tests**: incluídos porque SC-001–007 exigem cenários de aceitação, o plano pede testes críticos antes da implementação e a Constituição exige testes de regras/persistência. Escrever testes comportamentais, observar falha relevante antes de implementar e executar novamente depois; preservar cobertura de legados.
**Formato**: `- [ ] Tnnn [P?] [USn?] descrição e caminho`. Caminhos relativos à raiz. [P] permite trabalho simultâneo apenas no grupo e após os pré-requisitos explicitados abaixo; não autoriza executar servidores/checks concorrentes. Não requer delegar agentes.

## Phase 1: Setup

**Objetivo**: registrar ponto de partida e decisões, sem reinstalar stack ou adicionar bibliotecas.

- [X] T001 Registrar branch/revisão, estado de trabalho, comandos baseline pertinentes e inventário de consumidores de título/formulário/âncoras em `specs/005-cadastro-guiado-ciclos/validation/baseline.md`; usar somente dados sintéticos e preservar alterações externas (FR-019).
- [X] T002 [P] Promover decisões R3/R5 a `docs/adr/0001-cycle-objectives-compatibility.md`, documentando união, migração versionada, backup, incompatibilidade com escritor v1 e limite do protótipo local; preservar contrato HTTP v1 histórico, sem implementar backend (FR-019).
- [X] T003 [P] Preparar fixtures v1 históricas e resultados esperados em `apps/web/tests/fixtures/legacy-cycle-data.ts`, com todos os status e períodos predefinidos originalmente informativos, além de descrição nula e texto histórico; não converter texto em objetivos (FR-018/020).

## Phase 2: Foundational — bloqueia todas as histórias

**Objetivo**: introduzir contratos/compatibilidade e estrutura compartilhada sem perder dados nem regras. Durante essa fase, não disponibilizar cadastro novo incompleto para usuários.

- [X] T004 Escrever testes críticos em `apps/web/src/features/pdi-cycles/tests/domain.test.ts` para variantes, input novo, updates legados e invariantes; cobrir literalmente “Pelo menos um texto não vazio após trim; ordem preservada”, “título 3–120; descrição até 2000; fim posterior ao início e duração informativa”, “Criação → DRAFT, versão 1 e um evento inicial com proprietário”, “No máximo um ACTIVE por proprietário” e “COMPLETED/CANCELLED imutáveis” (FR-005/006/013/018/020).
- [X] T005 Evoluir `apps/web/src/features/pdi-cycles/domain.ts` e `apps/web/src/features/pdi-cycles/ports/pdi-cycle-repository.ts` para união LEGACY/OBJECTIVES, campos comuns do modelo, `CreateCycleInput` explícito e `UpdateCycleInput` separado; aplicar “Rejeitar campos de título/descrição e valores desconhecidos na fronteira”, “Preservar duplicatas e ordem” e “Não introduzir limite de negócio de quantidade/comprimento sem requisito”; manter status `DRAFT|ACTIVE|COMPLETED|CANCELLED`, duração `TRIMESTER|SEMESTER|YEAR|CUSTOM`, erros por campo/índice, expectedVersion e objetivos não editáveis após criação; regras de calendário serão completadas em T020 (FR-005/006/013/018–020).
- [X] T006 Escrever integração do adaptador em `apps/web/src/features/pdi-cycles/tests/local-storage-pdi-cycle-repository.test.ts`: v1→v2, repetição sem duplicação, cópia exata de texto/datas/IDs/versão/histórico, isolamento por proprietário, falha de leitura/quota/gravação, JSON/registro/schema inválidos e divergência v1 após v2; assegurar ausência de reset e alteração parcial (FR-018–020).
- [X] T007 Implementar codec/migração e operações em `apps/web/src/features/pdi-cycles/adapters/local-storage-pdi-cycle-repository.ts`: v1 intocado, v2 `{schemaVersion: 2, legacySource: string|null, cycles: [...]}`, comparação da origem, gravação após validação completa e erro recuperável sem apagar dados; manter paginação 20 padrão/máximo 100, autorização existente e updates/transições por variante; não recalcular datas legadas (FR-013/018–020).
- [X] T008 Atualizar `apps/web/tests/fixtures/pdi-cycle-data.ts`, `apps/web/tests/fixtures/pdi-cycles.ts` e `apps/web/tests/fixtures/manual-pdi-cycle-repository.ts` aos novos tipos/inputs, mantendo fixtures legadas e cenários mixed/empty/loading/read-error/write-error/pending; repositório manual usa domínio compartilhado e não grava localStorage (FR-014/018–020).
- [X] T009 Ajustar consumidores de união em `apps/web/src/features/pdi-cycles/components/cycle-presentation.ts`, `cycle-table.tsx`, `cycle-item.tsx` e testes em `apps/web/src/features/pdi-cycles/tests/`, discriminando acesso a title e preservando consulta/transições legadas; manter typecheck verificável durante a troca dos tipos, sem inventar título para novos registros; apresentação completa de objetivos será T026 (FR-018/020).
- [X] T010 Criar estrutura compartilhada `apps/web/src/features/pdi-cycles/components/cycle-wizard.tsx` e tipos locais de preenchimento: “step: PERIOD|OBJECTIVES|REVIEW”, início vazio, duração inicial TRIMESTER e uma linha de objetivo vazia com chave estável só de UI; composição de etapas sem chamadas intermediárias ao repositório. Manter entrada antiga compilável até remoção em T016, sem novos cadastros por título (FR-003/004/005/013).

**Checkpoint**: tipos e migração testados, consumidores legados preservados. Os hosts podem ser implementados; ainda não há entrega completa do cadastro.

## Phase 3: US1 — Escolher como iniciar o cadastro (P1)

**Goal**: botão abre modal e menu abre página real, ambos compondo o mesmo wizard.
**Independent Test**: testar abertura/fechamento, menu desktop/móvel, URL direta/reload, etapas compartilhadas e ausência do formulário permanente. A conclusão do cadastro será validada após US2–US4; este incremento verifica entradas, não representa a aceitação integral da feature.

### Tests

- [X] T011 [P] [US1] Escrever cenários de contrato de entradas em `apps/web/tests/functional/cycle-create-entry.spec.ts`: botão→dialog, menu→`/pdi-cycles/new`, URL direta/reload, mesmo wizard e formulário permanente ausente (FR-001–003; SC-001).
- [X] T012 [P] [US1] Escrever teclado/foco da abertura e saída sem alterações em `apps/web/tests/a11y/cycle-create-dialog.spec.ts`, cobrindo nome do modal, fundo inerte, Tab/Shift+Tab contidos e retorno ao botão (FR-001/017; SC-007).

### Implementation

- [X] T013 [US1] Extrair shell mínimo em `apps/web/src/features/pdi-cycles/components/cycle-app-shell.tsx`, compondo sidebar/header/main existentes e pontos de navegação/saída para hosts, sem duplicar estrutura ou alterar identidade visual (FR-002/003/017).
- [X] T014 [US1] Criar host `apps/web/src/features/pdi-cycles/components/cycle-create-dialog.tsx` com dialog nativo showModal, título/foco inicial, fechamento centralizado, backdrop e restauração do acionador; receber estado dirty/pending do wizard para integração de T033, sem segundo dialog (FR-001/017).
- [X] T015 [US1] Criar `apps/web/src/app/pdi-cycles/new/page.tsx` e `apps/web/src/features/pdi-cycles/components/cycle-create-page.tsx`, usando shell e wizard compartilhados, com heading próprio, URL direta e reload sem persistência de preenchimento incompleto (FR-002/003).
- [X] T016 [US1] Integrar botão/modal em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`, remover formulário permanente e fluxo de criação antigo; substituir links #novo-ciclo por rota real em `apps/web/src/features/pdi-cycles/components/cycle-navigation.tsx`, fechando menu móvel antes de navegar e removendo foco na âncora inexistente (FR-001–003).
- [X] T017 [US1] Adaptar `apps/web/tests/functional/cycle-navigation.spec.ts` e executar T011/T012 com os dois hosts, registrando entradas, foco e recarga em `specs/005-cadastro-guiado-ciclos/validation/us1.md`; sem alegar conclusão do cadastro antes de US4 (SC-001/007).

## Phase 4: US2 — Definir o período sem cálculo manual (P1)

**Goal**: término automático consistente, escolhido manualmente apenas em Personalizado.
**Independent Test**: renderizar etapa isolada e nos dois hosts; conferir exemplos, alternâncias, erro e revisão sem depender de objetivo real salvo.

### Tests

- [X] T018 [P] [US2] Escrever `apps/web/src/features/pdi-cycles/tests/cycle-calendar.test.ts` para soma direta 3/6/12 meses, fim de mês/bissexto/ano e todos os exemplos de data-model.md; cobrir literalmente “Datas devem ser datas reais, de quatro dígitos de ano, com fim posterior ao início” e “Falta de início ou resultado fora de 0001–9999 impede avançar”; executar casos com fuso distinto e término adulterado na fronteira (FR-007–010; SC-002/003).
- [X] T019 [P] [US2] Escrever `apps/web/src/features/pdi-cycles/tests/cycle-period-step.test.tsx` para término automático legível/não editável, CUSTOM editável, alteração de início/duração, ausência/invalidade, alternância e erro associado/foco (FR-007–011; SC-002/003).

### Implementation

- [X] T020 [US2] Implementar calendário puro em `apps/web/src/features/pdi-cycles/domain.ts`, validando datas reais sem horário e soma a partir do início original, com clamp e limite 0001–9999; exigir correspondência entre término informado e derivado para novos ciclos automáticos na criação/update e no adaptador `apps/web/src/features/pdi-cycles/adapters/local-storage-pdi-cycle-repository.ts`; não aplicar cálculo retroativo ao legado (FR-008–010/018).
- [X] T021 [US2] Criar `apps/web/src/features/pdi-cycles/components/cycle-period-step.tsx` e integrar no wizard: início obrigatório, quatro durações, término automático como saída identificada e entrada só em CUSTOM; aplicar “Ao trocar automático → CUSTOM, usar o término calculado como valor inicial editável; ao retornar ao automático, recalcular, sem restaurar término manual antigo” (FR-007–011).
- [X] T022 [US2] Integrar cenários de datas nos dois hosts em `apps/web/tests/functional/cycle-period.spec.ts`, executar T018/T019 e registrar resultados/limites em `specs/005-cadastro-guiado-ciclos/validation/us2.md`, incluindo 31/01→30/04 e 29/02/2024→28/02/2025 (SC-002/003).

## Phase 5: US3 — Planejar por objetivos (P1)

**Goal**: lista textual obrigatória substitui título/descrição e convive com ciclos históricos.
**Independent Test**: validar lista isoladamente, persistir entrada válida por repositório, recarregar e consultar dados novos/legados sem exigir o fluxo completo de US4.

### Tests

- [X] T023 [P] [US3] Escrever `apps/web/src/features/pdi-cycles/tests/cycle-objectives-step.test.tsx` cobrindo lista vazia/espaços/item vazio, adicionar/remover último, foco e ordem, ausência de título/descrição, duplicatas válidas e texto longo; cada item deve ser não vazio após trim, sem remoção silenciosa de itens inválidos (FR-005/006/011; SC-004/007).
- [X] T024 [P] [US3] Escrever contrato de persistência/consulta em `apps/web/tests/functional/cycle-objectives.spec.ts` com fixtures via porta/localStorage isolado: objetivos preservados após reload, novos identificados por período e textos legados intactos, sem objetivos sintetizados; não depender de create pela UI até T034 (FR-018/019; SC-004/006).

### Implementation

- [X] T025 [US3] Criar `apps/web/src/features/pdi-cycles/components/cycle-objectives-step.tsx` e integrar no wizard, com lista de campos rotulados, adicionar/remover identificando item, foco na linha nova/vizinha/botão e erros indexados; aplicar “Chaves não são persistidas” e preservar valores/ordem ao voltar (FR-005/006/011/017).
- [X] T026 [US3] Completar apresentação em `apps/web/src/features/pdi-cycles/components/cycle-presentation.ts`, `cycle-table.tsx` e `cycle-item.tsx`: novo ciclo identificado por período com objetivos acessíveis em lista semântica; legado mantém acesso ao título/descrição históricos; renderizar texto sem HTML interpretado e preservar nomes acessíveis de ações (FR-018/020).
- [X] T027 [US3] Executar T023/T024 e regressões de apresentação/ciclo de vida em `apps/web/src/features/pdi-cycles/tests/cycle-presentation.test.ts` e `domain.test.ts`; registrar consulta e recarga em `specs/005-cadastro-guiado-ciclos/validation/us3.md`, incluindo encerrados sem objetivos (SC-004/006).

## Phase 6: US4 — Concluir planejamento guiado (P1)

**Goal**: revisar/corrigir, criar exatamente um Rascunho, tratar erro e permitir descarte consciente nos dois contextos.
**Independent Test**: executar fluxo completo modal e página com repositório controlado, verificando ausência de escrita parcial, preservação em erros, duplicação bloqueada e resultado acessível.

### Tests

- [X] T028 [P] [US4] Escrever `apps/web/src/features/pdi-cycles/tests/cycle-wizard.test.tsx` para etapas, retorno/correção/Enter, validação final, nenhuma criação intermediária, pending/clique repetido, falha/retry e dirty; “Dirty compara valores editáveis à abertura, sem contar apenas troca de etapa/foco” (FR-004/011–014/016).
- [X] T029 [P] [US4] Escrever `apps/web/tests/functional/cycle-create-flow.spec.ts` para concluir pelos dois hosts, filtro excludente, coleção >20, falha de refresh após commit sem repetir create e `?created=` inexistente; associar retornos ao registro recuperado por get autorizado (FR-013–015; SC-001/004/005).
- [X] T030 [P] [US4] Escrever `apps/web/tests/a11y/cycle-wizard.spec.ts` para foco/erros/mudança de etapa/objetivos dinâmicos e descarte por botão/Escape/backdrop/links app-owned; conferir continuar/restaurar e bloqueio de saída durante pending (FR-016/017; SC-007).

### Implementation

- [X] T031 [US4] Completar `apps/web/src/features/pdi-cycles/components/cycle-wizard.tsx` com progressão “Período → Objetivos → Revisão”, lista de etapas/aria-current, validação por etapa e total no final, foco em primeiro inválido/heading e retorno preservado; criar revisão com datas efetivas e lista de objetivos, sem tabs nem envio por Enter prematuro (FR-004/011/012/017).
- [X] T032 [US4] Implementar envio em `apps/web/src/features/pdi-cycles/components/cycle-wizard.tsx`: guarda síncrona além de pending, criação única pelo repositório, feedback acessível, bloquear alterações/saída enquanto pendente, preservar revisão/dados na falha e limpar dirty após commit; nenhuma criação parcial nem retry automático (FR-013/014/016).
- [X] T033 [US4] Integrar confirmação dirty nos hosts `apps/web/src/features/pdi-cycles/components/cycle-create-dialog.tsx`, `cycle-create-page.tsx` e saídas em `cycle-app-shell.tsx`: mesmo dialog ou confirmação inline, “Continuar preenchendo” com foco inicial, descarte explícito, Escape da confirmação continua e restaura foco/etapa; sem garantia para fechamento externo do navegador (FR-016/017).
- [X] T034 [US4] Implementar sucesso em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx` e `cycle-create-page.tsx`: fechar modal/retornar da página, distinguir commit de refresh, confirmar filtro excludente, consumir ID via get e limpar sinalização da URL; se criado fora da primeira página mostrar resumo acessível, sem duplicar linha ou adicionar paginação (FR-015/018).
- [X] T035 [US4] Completar estilos do wizard/hosts em `apps/web/src/app/globals.css`, usando tokens existentes, largura legível, altura rolável, ações no fluxo e empilhamento; validar 320/390/768/1024/1440, zoom, texto longo e movimento reduzido, sem margens negativas estruturais (FR-017; SC-007).
- [X] T036 [US4] Executar T028–T030 e regressões do fluxo em `apps/web/tests/functional/cycles-characterization.spec.ts`, adaptando assertions de criação sem apagar cobertura de legados; registrar pending/write-error, retry, descarte e sucesso em `specs/005-cadastro-guiado-ciclos/validation/us4.md` (SC-001/004–007).

## Phase 7: Polish & Cross-Cutting Concerns

**Objetivo**: documentação coerente e evidências automáticas/manuais completas. Nenhuma tarefa de aceitação pode ser concluída por evidência histórica da SPEC-004.

- [X] T037 [P] Adaptar `apps/web/tests/manual/dashboard.tsx`, `manual-review.spec.ts` e fixtures necessárias para exercitar modal e página com repositório isolado e cenários controlados; executar smoke e preparar roteiro em `specs/005-cadastro-guiado-ciclos/validation/manual-accessibility.md`, inicialmente pendente (FR-014/017; SC-007).
- [X] T038 [P] Atualizar referências de comportamento vigente em `specs/001-ciclos-pdi/spec.md`, `specs/003-menu-lateral-tabela-ciclos/spec.md`, e `specs/004-dashboard-ux-ui/spec.md`, apontando substituições da SPEC-005; preservar histórico/OpenAPI v1 e alinhar `specs/005-cadastro-guiado-ciclos/contracts/persistence-and-contracts.md` ao contrato efetivamente entregue (FR-019).
- [X] T039 [P] Atualizar testes de viewport/axe/visual em `apps/web/tests/a11y/dashboard.spec.ts`, `cycle-table-semantics.spec.ts` e `apps/web/tests/visual/dashboard-layout.spec.ts` para modal/página/consulta com variantes mistas, sem perda de campos/ações; produzir capturas para revisão sem aprovar automaticamente novos baselines (FR-017/018; SC-007).
- [X] T040 Consolidar instruções reais, recuperação preservadora de armazenamento e comandos em `specs/005-cadastro-guiado-ciclos/quickstart.md`, conferindo decisões do ADR e nenhum requisito extra; confirmar ausência de editor de objetivos pós-criação, novos endpoints, IA ou paginação fora do escopo (FR-019/020).
- [ ] T041 Executar verificações automáticas de quickstart sequencialmente (unitário/integração, lint, tipos, build, E2E Chromium/Firefox/WebKit, axe, visual e smoke), com uma instância Next e workers controlados; registrar comandos/exit codes/revisão/bundle/limitações em `specs/005-cadastro-guiado-ciclos/validation/automated.md`, corrigindo falhas e repetindo checks afetados antes de concluir (SC-001–007).
- [ ] T042 Executar revisão humana real dos dois contextos por teclado/leitor de tela e registrar configuração/revisor/cenários/resultados em `specs/005-cadastro-guiado-ciclos/validation/manual-accessibility.md`; corrigir achados e retestar, mantendo pendente se ambiente/revisor não permitirem observação real, conforme contrato UI e SC-007.
- [ ] T043 Consolidar evidências e revisão de baselines em `specs/005-cadastro-guiado-ciclos/validation/acceptance.md`, rastreando FR-001–020 e SC-001–007, migração/backup, revisão manual e limitações do protótipo; anexar correções/retestes quando T041/T042 encontrarem falhas, sem transformar capturas em aprovação automática.
- [ ] T044 Conferir Definition of Done e atualizar estado final de `specs/005-cadastro-guiado-ciclos/tasks.md`, `spec.md` e `plan.md` somente após T041/T042/T043 satisfeitos; se houver pendência manual, manter aceitação e T044 abertos, reportando implementação/automação separadamente. Não publicar produção privada com autenticação local-user (Constituição I/V/VI/X/XII).

## Dependencies & Execution Order

### Ordem de fases e dependências explícitas

Todos os IDs nesta seção referem-se às tarefas acima; dependências são transitivas. “Teste antes” significa escrever e observar a falha esperada, depois executar novamente na implementação. A conclusão da história exige seus testes passando.

| Tarefa/grupo | Pré-requisitos |
| --- | --- |
| T001 | Nenhum |
| T002, T003 | T001; independentes entre si |
| T004 → T005 → T006 → T007 → T008 → T009 → T010 | Setup concluído; sequência indicada |
| T011, T012 | T010; independentes entre si |
| T013 → T014 → T015 → T016 → T017 | T011/T012 escritos; sequência indicada |
| T018, T019 | T017; independentes entre si |
| T020 → T021 → T022 | T018/T019 escritos; sequência indicada |
| T023, T024 | T022; independentes entre si |
| T025 → T026 → T027 | T023/T024 escritos; sequência indicada |
| T028, T029, T030 | T027; independentes entre si |
| T031 → T032 → T033 → T034 → T035 → T036 | T028/T029/T030 escritos; sequência indicada |
| T037, T038, T039 | T036; independentes entre si, arquivos distintos |
| T040 | T037/T038/T039 |
| T041 | T040 |
| T042 | T040; pode ocorrer independentemente da consolidação automática, sem disputar servidor/perfil de T041 |
| T043 | T041 e T042 concluídos, incluindo correções e retestes |
| T044 | T043 |

```text
Setup → Fundação → US1 (entradas) → US2 (período) → US3 (objetivos)
                                                     ↓
US4 (fluxo completo) → T037/T038/T039 → T040 → T041 automático ─┐
                                            └→ T042 manual ──┴→ T043 → T044
```

As histórias compartilham wizard/domínio e têm a mesma prioridade P1; a ordem reduz conflito nos mesmos arquivos. Os testes independentes permitem verificar cada comportamento, mas US1 isolada não entrega cadastro completo. Não prometer paralelismo entre histórias que modificam os mesmos arquivos.

### Exemplos de paralelismo por história

- **US1**: após T010, escrever T011 (entradas) e T012 (foco) simultaneamente em arquivos distintos; integrar hosts depois.
- **US2**: após T017, escrever T018 (calendário) e T019 (etapa) simultaneamente; T020/T021 são sequenciais porque usam o mesmo contrato.
- **US3**: após T022, escrever T023 (lista/foco) e T024 (persistência/consulta) simultaneamente; implementar T025/T026 depois.
- **US4**: após T027, escrever T028 (wizard), T029 (fluxo) e T030 (acessibilidade) simultaneamente; T031–T036 continuam sequenciais.
- **Transversal**: T002/T003 e, posteriormente, T037/T038/T039 têm arquivos distintos. T041/T042 podem ser agendados separadamente, mas não devem usar o mesmo servidor ou perfil simultaneamente.

## Implementation Strategy

1. Concluir setup e base preservadora, com testes de domínio/migração antes de alterar persistência.
2. Validar US1 como primeiro incremento de navegação em ambiente de desenvolvimento; não publicar hosts com etapas incompletas.
3. Entregar US2 e US3 como comportamentos testáveis, integrando o wizard sem duplicar regras.
4. Concluir US4 para obter o **MVP funcional mínimo: US1 + US2 + US3 + US4**, pois os requisitos obrigatórios de criação dependem das quatro histórias.
5. Consolidar checks automáticos e revisão humana como ramos independentes de evidência; ambos bloqueiam aceitação final. Não declarar tarefas manuais feitas por automação.

## Resumo de cobertura

44 tarefas: setup 3, fundação 7, US1 7, US2 5, US3 5, US4 9 e transversal 8. Existem 14 tarefas [P] em seis grupos seguros, condicionados à tabela de dependências. Todos os 20 requisitos e sete critérios estão vinculados a tarefas e validação. O trabalho termina na geração deste arquivo; nenhuma implementação foi executada por speckit-tasks.
