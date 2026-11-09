# Tasks: Busca nas opções do menu

**Input**: Documentos de design de `specs/006-menu-search/` — [spec](spec.md), [plan](plan.md), [research](research.md), [modelo de dados](data-model.md), [contrato de UI](contracts/ui-contract.md) e [quickstart](quickstart.md).
**Tests**: obrigatórios pela especificação e pela Constituição; escrever o teste, observar a falha relevante e executá-lo novamente após a implementação.
**Formato**: `- [ ] Tnnn [P?] [USn?] descrição e caminho`. Caminhos relativos à raiz. `[P]` só permite execução simultânea em arquivos distintos e após pré-requisitos explícitos.

## Phase 1: Setup

**Objetivo**: registrar o comportamento atual sem alterar a navegação existente.

- [X] T001 Registrar comandos de baseline, revisão, comportamento atual de recolhimento/navegação e consumidores de `CycleNavigation` em `specs/006-menu-search/validation/baseline.md`; usar somente dados sintéticos e preservar alterações externas.

## Phase 2: Foundational — bloqueia todas as histórias

**Objetivo**: estabelecer a fonte única das opções e o contrato de filtro efêmero, sem criar busca global, persistência ou destinos novos.

- [X] T002 Criar testes unitários de normalização e filtro em `apps/web/src/features/pdi-cycles/tests/cycle-navigation.test.tsx`, cobrindo literalmente trim, minúsculas, remoção de diacríticos, inclusão por trecho e consulta vazia retornando todas as opções (FR-003–005/011).
- [X] T003 Implementar em `apps/web/src/features/pdi-cycles/components/cycle-navigation.tsx` a lista tipada única de opções, a normalização derivada e o filtro local que preserva `id`, `label`, `href`, ícone e estado ativo; não persistir ou enviar a consulta (FR-003–005/007/011).

**Checkpoint**: a lógica de consulta é determinística, testada e reutilizável por desktop e móvel.

## Phase 3: US1 — Encontrar uma opção pelo menu expandido (P1) 🎯 MVP

**Goal**: permitir que a pessoa filtre e abra opções existentes sem recarregar a página.

**Independent Test**: no menu expandido, digitar partes de `Novo Ciclo` e `Meus Ciclos`, inclusive com acentos/caso/espaços, deve exibir somente as correspondências e manter a navegação funcional.

### Tests

- [X] T004 [P] [US1] Estender os cenários de filtro em tempo real, consulta vazia, acento/caso/espaços, seção fechada com correspondência e navegação por resultado em `apps/web/tests/functional/cycle-navigation.spec.ts` (FR-003–005/007; SC-001/002/005).
- [X] T005 [P] [US1] Adicionar cobertura de nome acessível, foco visível e axe para o campo de busca no menu expandido em `apps/web/tests/a11y/dashboard.spec.ts` (FR-001/002/010; SC-003).

### Implementation

- [X] T006 [US1] Integrar estado local de consulta e campo `type="search"` nomeado `Pesquisar no menu` logo abaixo da marca em `apps/web/src/features/pdi-cycles/components/cycle-navigation.tsx`; aplicar o filtro compartilhado aos links e tornar correspondências acessíveis quando a seção estiver fechada, restaurando o estado normal ao limpar (FR-001–005/007/011).
- [X] T007 [US1] Criar estilos responsivos e de alto contraste do campo/resultado na barra lateral em `apps/web/src/app/globals.css`, reutilizando tokens existentes e sem rolagem horizontal (FR-001/010; SC-002/003).
- [X] T008 [US1] Executar os testes T002/T004/T005 e registrar filtro, seção fechada, navegação e foco em `specs/006-menu-search/validation/us1.md` (SC-001–003/005).

**Checkpoint**: US1 funciona e pode ser demonstrada somente com a barra lateral expandida.

## Phase 4: US2 — Entender quando não há resultado (P2)

**Goal**: tornar a ausência de correspondências clara e recuperável sem esconder a causa.

**Independent Test**: uma consulta inexistente informa ausência de resultados; apagar o conteúdo restaura todas as opções e o estado ativo permanece correto.

### Tests

- [X] T009 [US2] Adicionar cenários de ausência de resultado, anúncio acessível e restauração por limpeza em `apps/web/tests/functional/cycle-navigation.spec.ts` (FR-005/006/010; SC-001/003).

### Implementation

- [X] T010 [US2] Renderizar mensagem textual de ausência de resultados e região de status que comunique mudanças significativas sem anunciar repetidamente resultado equivalente em `apps/web/src/features/pdi-cycles/components/cycle-navigation.tsx` (FR-006/010).
- [X] T011 [US2] Estilizar o estado sem resultados para barra lateral e diálogo móvel em `apps/web/src/app/globals.css`, preservando contraste, quebra de texto e foco (FR-006/010).
- [X] T012 [US2] Executar T009 e regressões de T004/T005, registrando o cenário de ausência e limpeza em `specs/006-menu-search/validation/us2.md` (SC-001/003/005).

**Checkpoint**: US1 e US2 podem ser validadas sem usar o modo mínimo.

## Phase 5: US3 — Usar o menu mínimo sem busca visível (P2)

**Goal**: preservar o menu compacto e tornar a busca acessível no painel móvel aberto sem quebrar a contenção de foco.

**Independent Test**: recolher o desktop remove o campo da árvore de foco; no menu móvel aberto, Tab/Shift+Tab atravessam o campo, links e botões sem escapar, e fechar limpa a consulta.

### Tests

- [X] T013 [P] [US3] Estender `apps/web/tests/functional/cycle-navigation.spec.ts` para verificar ausência real de textbox e de parada Tab no desktop mínimo, reabertura e preservação dos links (FR-008/009; SC-004/005).
- [X] T014 [P] [US3] Estender `apps/web/tests/a11y/dashboard.spec.ts` para verificar input no diálogo móvel, ciclo Tab/Shift+Tab, limpeza ao fechar e axe (FR-002/008–010; SC-003/004).
- [X] T015 [P] [US3] Adicionar estados de menu expandido, mínimo e diálogo móvel com busca em `apps/web/tests/visual/dashboard-layout.spec.ts` para 320/390/768/1024/1440 px sem atualizar snapshots automaticamente (FR-001/008/010; SC-004/005).

### Implementation

- [X] T016 [US3] Renderizar condicionalmente a busca desktop somente quando `expanded`, garantindo remoção da árvore acessível ao recolher e retorno seguro ao expandir em `apps/web/src/features/pdi-cycles/components/cycle-navigation.tsx` (FR-008/009).
- [X] T017 [US3] Integrar a busca compartilhada no diálogo de navegação móvel, limpar consulta no fechamento e incluir `input` no algoritmo de contenção de Tab em `apps/web/src/features/pdi-cycles/components/cycle-navigation.tsx` (FR-001–005/008–010).
- [X] T018 [US3] Ajustar estilos de dimensão, empilhamento e foco do diálogo móvel e do menu mínimo em `apps/web/src/app/globals.css` (FR-008–010; SC-003/004).
- [X] T019 [US3] Executar T013–T015 e regressões T004/T005/T009, registrando foco, recolhimento, viewport e limpeza em `specs/006-menu-search/validation/us3.md` (SC-003–005).

**Checkpoint**: as três histórias são funcionais nos dois contextos de navegação.

## Phase 6: Polish & Cross-Cutting Concerns

**Objetivo**: validar a Definition of Done e manter documentos e evidências coerentes.

- [X] T020 [P] Revisar `specs/006-menu-search/quickstart.md` contra a implementação e anexar comandos, revisão, resultados e limitações em `specs/006-menu-search/validation/automated.md`; executar unitário, lint, tipos, build, E2E Chromium, axe e visual sequencialmente (SC-001–005).
- [X] T021 Conferir acessibilidade manual por teclado nos menus desktop/móvel, contraste, zoom, texto longo e movimento reduzido; registrar cenários/resultados em `specs/006-menu-search/validation/manual-accessibility.md` (FR-001–010; SC-003/004).
- [X] T022 Consolidar rastreabilidade de FR-001–011 e SC-001–005, resultados/retestes e estado da aceitação em `specs/006-menu-search/validation/acceptance.md`; atualizar `specs/006-menu-search/tasks.md`, `spec.md` e `plan.md` somente após os checks satisfeitos.

## Dependencies & Execution Order

### Phase dependencies

- **Phase 1**: começa imediatamente.
- **Phase 2**: depende de T001 e bloqueia as histórias; T003 depende de T002.
- **US1**: testes T004/T005 dependem de T003; T006 depende desses testes; T007 depende de T006; T008 depende de T006/T007.
- **US2**: começa após T008 para reutilizar a busca entregue; T010 depende de T009; T011 depende de T010; T012 depende de T009–T011.
- **US3**: começa após T012; T016/T017 dependem de T013/T014; T018 depende de T016/T017; T019 depende de T013–T018.
- **Polish**: T020 e T021 dependem de T019; T022 depende de T020/T021.

### User story completion order

`US1 (P1) → US2 (P2) → US3 (P2) → Polish`.

US1 é o MVP. US2 adiciona recuperação explícita para buscas sem resultado. US3 completa a compatibilidade entre o menu mínimo e o diálogo móvel.

### Parallel opportunities

- Em US1, T004 e T005 podem ser feitos em paralelo, pois alteram arquivos diferentes.
- Em US3, T013, T014 e T015 podem ser feitos em paralelo, pois alteram arquivos diferentes.
- T020 e T021 podem ocorrer em paralelo após as automações e superfícies estarem estáveis; não executar runners que usem a mesma porta/cache simultaneamente.

## Parallel example: User Story 3

```text
T013: verificar desktop mínimo em apps/web/tests/functional/cycle-navigation.spec.ts
T014: verificar foco/axe móvel em apps/web/tests/a11y/dashboard.spec.ts
T015: verificar viewports em apps/web/tests/visual/dashboard-layout.spec.ts
```

## Implementation Strategy

### MVP first

1. Completar T001–T003 para estabelecer filtro compartilhado e determinístico.
2. Completar T004–T008 para entregar busca no menu desktop expandido.
3. Validar o cenário independente de US1 antes de iniciar feedback de ausência ou modo mínimo.

### Incremental delivery

1. US1 entrega a busca de opções existentes.
2. US2 acrescenta mensagem e recuperação para ausência de resultado.
3. US3 assegura o comportamento compacto e a acessibilidade móvel.
4. Polish consolida a validação completa sem ampliar o escopo.
