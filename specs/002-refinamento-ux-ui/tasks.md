# Tasks: Refinamento visual e UX — Caderno de percurso

**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md), [data-model.md](data-model.md), [contrato UI](contracts/ui-contract.md), [design system](design-system.md), [testes visuais](visual-tests.md) e [quickstart](quickstart.md).

**Direção**: A, escolhida pelo usuário. **Estado**: tarefas geradas, nenhuma executada por este comando.

**Tests**: explicitamente exigidos pela SPEC-002, incluindo regressão, Playwright e acessibilidade. Escrever testes de comportamento novo antes da implementação e confirmar falha relevante; caracterização de comportamento existente deve passar antes do visual. Não exigir falha artificial de um comportamento já correto.

**Organization**: fases por história, mantendo as quatro P1 antes da P2. Paths relativos à raiz do repositório. Arquivos novos indicados nas tarefas são destinos futuros, não arquivos já criados.

## Format: `[ID] [P?] [Story] Description`

Cada tarefa tem checkbox, ID sequencial e paths. `[P]` permite trabalho simultâneo apenas após seus pré-requisitos e em arquivos distintos; não significa autorização para iniciar agentes. Modificações em `cycle-dashboard.tsx`, manifests, lockfile e CSS global são serializadas. Gates humanos só são concluídos com decisão real registrada.

## Path Conventions

Aplicação: `apps/web/`. Feature: `apps/web/src/features/pdi-cycles/`. Primitivas: `apps/web/src/components/ui/`. E2E: `apps/web/tests/`. Documentos/evidências de aceite: `specs/002-refinamento-ux-ui/validation/`. Referências detalhadas: `specs/002-refinamento-ux-ui/visual-directions/references/`.

## Phase 1: Setup — caracterização e referências

**Purpose**: estabelecer ambiente reproduzível e evidência funcional antes de qualquer refinamento. Não recriar projeto, mudar Next/React, domínio, armazenamento ou OpenAPI.

- [ ] T001 Reconferir inventário e registrar versões, comandos válidos, defeitos anteriores, pesos de build/assets e hashes de domínio/porta/adaptador/OpenAPI em `specs/002-refinamento-ux-ui/validation/initial-state.md`; usar `apps/web/package.json` e `pnpm-lock.yaml` como base, sem alterar funcionalidades (RF-UI-023, RF-UI-024, RF-UI-025).
- [ ] T002 Preparar dependências de desenvolvimento Playwright, axe e renderização de componentes compatíveis com React atual em `apps/web/package.json` e `pnpm-lock.yaml`; configurar lint compatível em `apps/web/eslint.config.mjs` e manter Vitest em `apps/web/vitest.config.ts`; fixar versões sem upgrade de Next/React (RF-UI-026).
- [ ] T003 Configurar projetos chromium-functional, firefox-functional, webkit-functional e chromium-visual em `apps/web/playwright.config.ts` e fixtures em `apps/web/tests/fixtures/pdi-cycles.ts`: origem/storage isolados, chave `evolua:pdi-cycles:v1`, owner `local-user`, datas/IDs/histórico conhecidos, locale pt-BR, fuso America/Sao_Paulo e relógio fixo; não resemear a cada reload (RF-UI-023, RF-UI-029; depende T002).
- [ ] T004 Criar e executar caracterização com adaptador real em `apps/web/tests/functional/cycles-characterization.spec.ts`: redirecionamento, criação, filtros, recarga, histórico, segundo ativo recusado e “Transições únicas: DRAFT→ACTIVE, DRAFT→CANCELLED, ACTIVE→COMPLETED e ACTIVE→CANCELLED.”; preservar testes em `apps/web/src/features/pdi-cycles/tests/domain.test.ts` e registrar resultados em `specs/002-refinamento-ux-ui/validation/characterization.md` (RF-UI-023, RF-UI-026; depende T003).
- [ ] T005 Preparar referências detalhadas A em `specs/002-refinamento-ux-ui/visual-directions/references/` e seu catálogo `specs/002-refinamento-ux-ui/visual-directions/references/manifest.md`: desktop/tablet/mobile, quatro status, formulário, vazio inicial/filtro, erro, foco, pending e disabled; usar design system e conteúdo real, sem modificar aplicação ou promover imagens históricas a baselines (RF-UI-027, RF-UI-029; depende T001).
- [ ] T006 Apresentar o pacote concreto T005 ao responsável pelo produto e registrar versão, data, aprovador e grupos/estados autorizados em `specs/002-refinamento-ux-ui/validation/reference-approvals.md`; escolha A anterior não substitui aprovação detalhada e nenhum estado não aprovado pode entrar no incremento visual (RF-UI-027; depende T004, T005).

**Checkpoint**: caracterização passando e referências dos próximos grupos aprovadas. Preparar tudo que é revisável antes de solicitar a decisão humana; não solicitar novamente aprovação da escolha A.

## Phase 2: Foundational — base de apresentação compartilhada

**Purpose**: infraestrutura mínima reutilizável. Esta fase bloqueia as histórias e só começa após T006 para os grupos autorizados.

- [ ] T007 Introduzir Tailwind 4/PostCSS e configuração shadcn local em `apps/web/package.json`, `pnpm-lock.yaml`, `apps/web/postcss.config.mjs`, `apps/web/components.json`, `apps/web/tsconfig.json` e `apps/web/src/lib/utils.ts`; tokens CSS-first, aliases corretos e apenas dependências necessárias, sem substituir CSS indiscriminadamente (RF-UI-001, RF-UI-025).
- [ ] T008 Obter Newsreader roman 400/500 e Source Sans 3 400/600 como WOFF2 licenciados em `apps/web/src/assets/fonts/`, registrar origem/licenças em `apps/web/src/assets/fonts/LICENSES.md` e conectar via next/font/local em `apps/web/src/app/layout.tsx`, mantendo-o servidor e definindo variáveis de fonte editorial/interface (RF-UI-004; depende T007).
- [ ] T009 Aplicar catálogo de cores, tipografia, espaçamento, bordas, foco sólido 3 px/offset 2 px e elevação zero em `apps/web/src/app/globals.css`, usando `@theme inline`; migrar seletores globais conflitantes sem deixar controles nativos sem estilo utilizável e preservar ampliação do usuário (RF-UI-001, RF-UI-004, RF-UI-005, RF-UI-009, RF-UI-017; depende T008).
- [ ] T010 [P] Adaptar primitive em `apps/web/src/components/ui/button.tsx`: primary, secondary e destructive-outline, estados hover/pressed/disabled/pending, altura mínima 44 px, atributos nativos/refs e foco sem opacity que prejudique contraste (RF-UI-003, RF-UI-009, RF-UI-020; depende T009).
- [ ] T011 [P] Adaptar primitivas em `apps/web/src/components/ui/input.tsx`, `apps/web/src/components/ui/textarea.tsx`, `apps/web/src/components/ui/label.tsx`, `apps/web/src/components/ui/native-select.tsx` e `apps/web/src/components/ui/form-field.tsx`; manter controles nativos, nomes/refs/limites e fonte mínima 16 px, sem defaults `md:text-sm` ou sombras (RF-UI-009, RF-UI-011, RF-UI-020; depende T009).
- [ ] T012 [P] Criar apresentação reutilizável de feedback em `apps/web/src/features/pdi-cycles/components/cycle-feedback.tsx`, com variantes info/success/warning/error e anúncio configurado por urgência; mensagem persistente de região, sem toast como única evidência e sem regra de negócio (RF-UI-009, RF-UI-019; depende T009).
- [ ] T013 Permitir injeção opcional da porta existente com default atual em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`; criar proxy delegante de Promise controlável em `apps/web/tests/harness/controlled-repository.ts`, resolução somente de teste em `apps/web/next.config.ts` e projeto chromium-states em `apps/web/playwright.config.ts`; nenhuma rota, flag pública, atraso de produção ou alteração do adaptador (RF-UI-013, RF-UI-015, RF-UI-025; depende T010–T012).
- [ ] T014 Validar base com caracterização, Vitest, lint, tipos e build; verificar exclusão do harness no bundle normal e registrar resultados/revisão de alterações em `specs/002-refinamento-ux-ui/validation/foundation.md`, sem criar baselines (RF-UI-023, RF-UI-025, RF-UI-026; depende T013).

**Checkpoint**: fundação utilizável e caracterização preservada; nenhuma nova entidade, serviço ou rota. Ações/erros novos são concluídos nas histórias, não presumidos prontos pelas primitives.

## Phase 3: User Story 1 — Compreender e acompanhar meus ciclos (P1, MVP visual)

**Goal**: leitura editorial de título/período/status e ações, filtro e layout responsivo.

**Independent Test**: sem cadastrar, abrir fixture com quatro estados, reconhecer ativo, filtrar e conferir ações; testar títulos longos em toda a matriz. Não depende da entrega da nova UX de formulário.

### Tests for User Story 1

- [ ] T015 [P] [US1] Escrever testes do contrato de lista/filtro em `apps/web/tests/functional/cycle-reading.spec.ts`: status em português, valores persistidos intactos, seleção preservada, rascunho/ativo com ações atuais e encerrados sem ações; sem percentuais inventados (RF-UI-002, RF-UI-003, RF-UI-010).
- [ ] T016 [P] [US1] Escrever testes de layout em `apps/web/tests/visual/cycle-list-layout.spec.ts` para vazio/lista mista/20 itens/título de 120 caracteres sem espaços nas oito dimensões da spec e 600×900/900×900; medir largura ≤ viewport + 1 e verificar cortes/overlap, salvando candidatos fora dos baselines (RF-UI-006, RF-UI-007, RF-UI-008, RF-UI-029).

### Implementation for User Story 1

- [ ] T017 [P] [US1] Implementar mapeamento visual DRAFT/Rascunho, ACTIVE/Ativo, COMPLETED/Concluído e CANCELLED/Cancelado em `apps/web/src/features/pdi-cycles/components/cycle-status.tsx`, com tokens/texto e sem affordance de clique (RF-UI-002, RF-UI-009; após testes T015–T016).
- [ ] T018 [P] [US1] Implementar formatação de períodos calendários pt-BR em `apps/web/src/features/pdi-cycles/components/cycle-presentation.ts`, sem deslocamento de dia por UTC/fuso ou mutação das datas; testar limites de calendário em `apps/web/src/features/pdi-cycles/tests/cycle-presentation.test.ts` (RF-UI-002, RF-UI-011; após testes T015–T016).
- [ ] T019 [US1] Extrair item em `apps/web/src/features/pdi-cycles/components/cycle-item.tsx`, preservando condicionais e callbacks atuais, título completo, status, período e ações com contexto acessível; permitir quebra de linha de texto/ações sem Card ou novo clique de detalhe (RF-UI-002, RF-UI-003, RF-UI-007, RF-UI-009; depende T017, T018).
- [ ] T020 [US1] Extrair filtro nativo em `apps/web/src/features/pdi-cycles/components/cycle-filter.tsx`, com label persistente, Todos/quatro valores existentes e callback controlado, sem novas etapas ou troca silenciosa de seleção (RF-UI-010, RF-UI-011; depende T019).
- [ ] T021 [US1] Integrar item/filtro e layout A em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`: conteúdo máximo 1200 px, proporção desktop 5:7, margens 16/24/32 px e empilhamento tablet/mobile; preservar formulário atual e ordem DOM, sem esconder overflow no body (RF-UI-004, RF-UI-005, RF-UI-006, RF-UI-007, RF-UI-008; depende T020).
- [ ] T022 [US1] Executar T015/T016 e caracterização, comparar candidatos com referências autorizadas e registrar V-01/V-02 e revisão de componentes em `specs/002-refinamento-ux-ui/validation/us1.md`; não aceitar baselines automaticamente (RF-UI-023, RF-UI-026, RF-UI-029; depende T021).

**Checkpoint**: US1 testável com fixtures e formulário existente preservado. Este é o MVP de demonstração visual; não é aceite completo da SPEC-002 ou autorização de publicação.

## Phase 4: User Story 2 — Cadastrar e corrigir em qualquer tela (P1)

**Goal**: cadastro responsivo, erros associados, valores preservados, pendência e confirmação.

**Independent Test**: em contexto vazio, enviar datas inválidas, corrigir, criar e recarregar; repetir mobile e sob filtro Ativo. Não depende dos vazios/falhas refinados da US4.

### Tests for User Story 2

- [ ] T023 [P] [US2] Escrever testes de contrato de formulário em `apps/web/tests/functional/cycle-form.spec.ts`, citando “Título obrigatório 3–120 caracteres, descrição opcional até 2.000, início/fim presentes e fim posterior ao início.” e “descrição vazia continua null.”; conferir required/minLength/maxLength/type, quatro opções e CUSTOM inicial, sem duplicar validador de domínio (RF-UI-011, RF-UI-012, RF-UI-023).
- [ ] T024 [P] [US2] Escrever testes de interação com Promise controlada em `apps/web/src/features/pdi-cycles/tests/cycle-form-interaction.test.tsx`: envio repetido bloqueado, disabled real, dados mantidos em falha, limpeza só após create, sucesso sob filtro incompatível e create sucedido/refresh falho sem sugerir novo envio (RF-UI-012, RF-UI-013, RF-UI-019).
- [ ] T025 [P] [US2] Escrever testes responsivos em `apps/web/tests/visual/cycle-form-layout.spec.ts`: formulário preenchido/inválido em toda a matriz V-02, fonte 16 px e ações 44×44 em mobile; não confundir emulação com teclado virtual real (RF-UI-006, RF-UI-007, RF-UI-011, RF-UI-020).

### Implementation for User Story 2

- [ ] T026 [US2] Extrair formulário controlado em `apps/web/src/features/pdi-cycles/components/cycle-form.tsx`, mantendo “Duração mantém TRIMESTER/SEMESTER/YEAR/CUSTOM” e “o tipo não recalcula datas.”; ordem título/descrição/tipo/início/fim, textarea ≥96 px, dates nativos e empilhados em mobile, par apenas com largura interna ≥480 px (RF-UI-008, RF-UI-009, RF-UI-011; depende T023–T025).
- [ ] T027 [US2] Associar instruções/erros e estado inválido aos campos em `apps/web/src/features/pdi-cycles/components/cycle-form.tsx`, usando restrições nativas/erros existentes, `aria-describedby` e `aria-invalid`, com foco no primeiro inválido e sem anúncio duplicado ou schema de regras novo (RF-UI-012, RF-UI-016, RF-UI-019; depende T026).
- [ ] T028 [US2] Integrar formulário e estado pending de cadastro em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`, preservando valores e chamadas atuais; separar sucesso de create do resultado de refresh e conservar filtro/descrição null (RF-UI-010, RF-UI-012, RF-UI-013, RF-UI-023; depende T027).
- [ ] T029 [US2] Conectar confirmação e erro de cadastro ao feedback em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`, incluindo explicação de rascunho fora do filtro, sem foco arbitrário ou nova ação de negócio (RF-UI-013, RF-UI-019; depende T028).
- [ ] T030 [US2] Executar testes T023–T025 mais caracterização e registrar V-03 automatizado, contratos/limites e capturas candidatas em `specs/002-refinamento-ux-ui/validation/us2.md`; problemas de teclado virtual físico ficam explicitamente para T057 (RF-UI-023, RF-UI-026; depende T029).
- [ ] T031 [US2] Revisar diffs de formulário e sua API de apresentação frente a `specs/002-refinamento-ux-ui/contracts/ui-contract.md`, registrando preservação de atributos, limites e handlers em `specs/002-refinamento-ux-ui/validation/us2.md`; corrigir desvios somente na apresentação antes de concluir a história (RF-UI-025; depende T030).

**Checkpoint**: cadastro/recuperação testáveis isoladamente, sem novos campos ou regras. Verificação mobile real é gate final, não presumida por viewport.

## Phase 5: User Story 3 — Teclado e tecnologia assistiva (P1)

**Goal**: operar fluxos completos, perceber foco e compreender campos/resultados com ampliação/leitor de tela.

**Independent Test**: fixtures independentes permitem criar, filtrar, iniciar, concluir e cancelar só por teclado; verificar anúncios e destino após controle desaparecer. A US4 posteriormente detalha contextos de vazio/erro sem substituir estes contratos.

### Tests for User Story 3

- [ ] T032 [P] [US3] Escrever testes de teclado em `apps/web/tests/a11y/cycle-keyboard.spec.ts`, incluindo sequência nativa de datas, Tab/Shift+Tab/Enter/Espaço, botões repetidos contextualizados e transição que remove controle/item do filtro (RF-UI-016, RF-UI-019).
- [ ] T033 [P] [US3] Escrever inspeção axe e estados em `apps/web/tests/a11y/cycle-accessibility.spec.ts`, incluindo tags A/AA suportadas/WCAG 2.2, análise de incomplete, nomes/erros/busy/disabled e contraste renderizado; não declarar AA só por resultado automatizado (RF-UI-017, RF-UI-019, RF-UI-020, RF-UI-021).

### Implementation for User Story 3

- [ ] T034 [US3] Ajustar relações semânticas e nomes contextuais de ações em `apps/web/src/features/pdi-cycles/components/cycle-item.tsx`, preservando rótulos visíveis, lista nativa e ausência de ações em encerrados (RF-UI-016, RF-UI-019; depende T032, T033).
- [ ] T035 [US3] Implementar foco após transição em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`: item atualizado se presente ou título da região de resultados se sair do filtro; anunciar resultado básico da transição pelo feedback existente sem focar o topo em cada refresh (RF-UI-013, RF-UI-016, RF-UI-019; depende T034).
- [ ] T036 [US3] Verificar/corrigir contrastes e foco nos estados das primitives em `apps/web/src/components/ui/button.tsx`, `apps/web/src/components/ui/input.tsx` e `apps/web/src/app/globals.css`; preservar foco imediato, offset claro e 24×24 AA/44×44 ações mobile, registrando pares reais/exceções em `specs/002-refinamento-ux-ui/validation/contrast.md` (RF-UI-017, RF-UI-020; depende T035).
- [ ] T037 [US3] Corrigir reflow/espaçamento textual em `apps/web/src/app/globals.css` e `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`; conferir 200% texto, zoom real 400% a partir de 1280 e entrelinha 1,5/parágrafos 2/letras 0,12/palavras 0,16 vezes a fonte, sem cortes ou scroll em duas direções (RF-UI-018; depende T036).
- [ ] T038 [US3] Executar teclado/axe e revisão com leitor de tela compatível, registrando browser, versão, anúncios e destinos de foco em `specs/002-refinamento-ux-ui/validation/us3.md`; corrigir falhas atuais da história sem esperar US4; teste manual indisponível fica pendente (RF-UI-016, RF-UI-019, RF-UI-021; depende T037).
- [ ] T039 [US3] Registrar avaliação por critério A/AA aplicável e não aplicável em `specs/002-refinamento-ux-ui/validation/wcag-22-aa.md`, incluindo V-04/V-05/V-06/V-11 e evidências de ampliação reais; nenhum critério não verificado é marcado aprovado (RF-UI-021; depende T038).

**Checkpoint**: fluxos atuais operáveis com teclado e sem falhas conhecidas da avaliação feita; US4 deve preservar foco e semântica. Relatório manual pode exigir recursos humanos antes do aceite completo.

## Phase 6: User Story 4 — Resultados, falhas e disponibilidade (P1)

**Goal**: estados de consulta e de transição coerentes, contextualizados e recuperáveis.

**Independent Test**: cada fixture inicia seu cenário: primeiro uso, filtro vazio, leitura pendente, storage inválido, gravação recusada, segundo ativo e refresh falho. Adaptador real continua sendo usado para provar persistência.

### Tests for User Story 4

- [ ] T040 [P] [US4] Escrever testes de consulta/recuperação em `apps/web/tests/functional/cycle-results.spec.ts`: vazio inicial versus filtro vazio, falha de leitura sem falso vazio, JSON interno ausente e filtro preservado (RF-UI-014, RF-UI-015).
- [ ] T041 [P] [US4] Escrever testes de estados controlados em `apps/web/tests/states/cycle-pending.spec.ts`, cobrindo leitura/envio/transição pendentes, bloqueio de repetição, erro de gravação e resposta de filtro antigo ignorada; screenshots candidatos em 1440/768/390 sem nova API ou atraso de produção (RF-UI-013, RF-UI-015, RF-UI-029).

### Implementation for User Story 4

- [ ] T042 [US4] Criar `apps/web/src/features/pdi-cycles/components/cycle-results.tsx` para loading/ready/error e vazios derivados de ready + zero itens, com mensagens e orientações do design system, sem mostrar ausência de dados quando leitura falha (RF-UI-014, RF-UI-015; depende T040, T041).
- [ ] T043 [US4] Separar estado de leitura, cadastro e operação por ciclo em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx`, mantendo filtro, dados anteriores sinalizados e ignorando resposta obsoleta sem mudar assinatura da porta; reutilizar estado de cadastro US2 e foco US3 (RF-UI-010, RF-UI-013, RF-UI-014, RF-UI-015; depende T042).
- [ ] T044 [US4] Contextualizar erros existentes e pendência de transição em `apps/web/src/features/pdi-cycles/components/cycle-dashboard.tsx` e `apps/web/src/features/pdi-cycles/components/cycle-item.tsx`: segundo ativo, falha técnica, sucesso por ação, disabled apenas das ações envolvidas; sem alterar “No máximo um ACTIVE por usuário; encerrados sem edição/transição.” (RF-UI-013, RF-UI-015, RF-UI-019, RF-UI-023; depende T043).
- [ ] T045 [US4] Ajustar reserva de espaço e anúncio durante carregamento em `apps/web/src/features/pdi-cycles/components/cycle-results.tsx`; duração superior a um segundo mantém feedback perceptível, sem timers que atrasem operações reais ou mensagens contraditórias (RF-UI-015, RF-UI-019; depende T044).
- [ ] T046 [US4] Executar testes T040/T041 e repetir teclado/axe nas novas variantes, registrando V-07, histórico/dados preservados, exclusão de harness da produção e resultados em `specs/002-refinamento-ux-ui/validation/us4.md` (RF-UI-021, RF-UI-023, RF-UI-026; depende T045).
- [ ] T047 [US4] Revisar mensagens e contratos de transição/consulta em `specs/002-refinamento-ux-ui/contracts/ui-contract.md`, registrando correspondência com comportamento entregue em `specs/002-refinamento-ux-ui/validation/us4.md`; manter progresso limitado a estado/período e registrar bugs de negócio preexistentes fora deste escopo (RF-UI-002, RF-UI-024, RF-UI-025; depende T046).

**Checkpoint**: falha, vazio e loading distinguíveis e acessíveis; operação recusada nunca parece sucesso; nenhum domínio reimplementado no proxy/UI.

## Phase 7: User Story 5 — Interface coerente e aprovada (P2)

**Goal**: consistência final, microinterações discretas e baselines revisados. Aprovações prévias T006 são pré-requisito compartilhado; esta história faz o aceite do resultado renderizado.

**Independent Test**: comparar candidatos contra referências aprovadas em três classes de dispositivo e estados, avaliar AE-001–005 e movimento reduzido. Não requer cadastrar dados pessoais.

### Tests for User Story 5

- [ ] T048 [P] [US5] Escrever comparações canônicas em `apps/web/tests/visual/cycle-reference.spec.ts`: estado/viewport/versão identificados, fontes prontas, maxDiffPixels 0/threshold 0,2, foco não mascarado e nenhuma atualização automática de baseline (RF-UI-028, RF-UI-029).
- [ ] T049 [P] [US5] Escrever testes de movimento em `apps/web/tests/a11y/cycle-motion.spec.ts`: preferência normal/reduzida, feedback sem animação e nenhum movimento de controle ou transição decorativa acima de 200 ms; desativar animação para screenshot não conta como prova deste comportamento (RF-UI-022).

### Implementation for User Story 5

- [ ] T050 [US5] Aplicar somente microinterações úteis de cor 120 ms/feedback até 180 ms, máximo 200 ms, em `apps/web/src/app/globals.css` e `apps/web/src/components/ui/button.tsx`; remover movimento dispensável com prefers-reduced-motion e manter foco instantâneo (RF-UI-022; depende T048, T049).
- [ ] T051 [US5] Produzir candidatos/diffs e catálogo de cobertura em `specs/002-refinamento-ux-ui/validation/visual-review.md` e `specs/002-refinamento-ux-ui/validation/candidates/`; comparar todos os papéis/variantes com catálogo A e corrigir desvios nos componentes afetados, sem inventar cards/ícones/indicadores (RF-UI-001, RF-UI-009, RF-UI-029; depende T050).
- [ ] T052 [US5] Apresentar comparações concretas ao responsável e registrar AE-001–AE-005 com notas ≥4/5, justificativas, versão, data e aprovação por imagem em `specs/002-refinamento-ux-ui/validation/baseline-approvals.md`; referência não aprovada ou nota insuficiente exige revisão, sem aprovação inferida da escolha A (RF-UI-027, RF-UI-028; SC-007, SC-008; depende T051).
- [ ] T053 [US5] Criar/atualizar somente os baselines autorizados em `apps/web/tests/visual/__screenshots__/`, vinculando cada arquivo ao registro T052, e executar comparações sem update; conservar diferenças rejeitadas e evidências históricas (RF-UI-028, RF-UI-029; depende T052).

**Checkpoint**: direção A refletida nos componentes e referências detalhadas; baselines aceitos somente após comparação. T048 pode falhar por baseline ausente até T053; isso não autoriza autoaceite.

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: provar aceite completo e manter rastreabilidade, sem novas funcionalidades ou publicação automática.

- [ ] T054 Configurar execução reproduzível em `.github/workflows/web-quality.yml` e `apps/web/playwright.config.ts`, adaptando eventual workflow existente: versões exatas, projetos reais/visuais/estados isolados, CI com --update-snapshots=none e artefatos actual/expected/diff/trace/report em falhas; evitar duplicar pipeline (RF-UI-026, RF-UI-029; depende T053).
- [ ] T055 [P] Executar matriz visual completa das oito dimensões e intermediárias 600/900, estados/20 itens/limites, mais smoke Firefox/WebKit, e registrar V-01/V-02/V-09/V-10 em `specs/002-refinamento-ux-ui/validation/responsive-regression.md`; nenhum corte/overflow ocultado ou tolerância ampliada sem justificativa aprovada (RF-UI-006, RF-UI-007, RF-UI-023, RF-UI-029; depende T054).
- [ ] T056 [P] Reavaliar todos os critérios A/AA aplicáveis após US4/US5 e completar `specs/002-refinamento-ux-ui/validation/wcag-22-aa.md` com contraste real, teclado, leitor, 200% texto, zoom real 400%, espaçamento e movimento; tratar incomplete e pendências sem alegar conformidade automática (RF-UI-016–RF-UI-022; depende T054).
- [ ] T057 [P] Validar teclado virtual, dates nativos, rotação e alcance do envio em Android Chrome/iOS Safari e registrar dispositivos/versões e V-03 em `specs/002-refinamento-ux-ui/validation/mobile-real.md`; aparelho indisponível mantém o aceite pendente, não é substituído silenciosamente por emulação (RF-UI-011, RF-UI-020; depende T054).
- [ ] T058 [P] Realizar exercício com cinco participantes representativos, pelo menos dois em celular, em `specs/002-refinamento-ux-ui/validation/usability.md`; roteiro/dados iguais, pelo menos 4/5 criam e encontram por filtro em até 2 minutos sem ajuda; registrar tempos/dificuldades sem dados pessoais desnecessários (SC-006; depende T054).
- [ ] T059 Atualizar comandos efetivamente entregues e limites em `specs/002-refinamento-ux-ui/quickstart.md` e consolidar relatório em `specs/002-refinamento-ux-ui/validation/acceptance.md`: lint/tipos/build/testes, V-01–V-11, SC-001–SC-008, hashes/diffs de domínio/porta/adaptador/OpenAPI preservados e pesos de assets comparados; corrigir somente regressões deste escopo e repetir checks afetados (RF-UI-023–RF-UI-029; depende T055–T058).
- [ ] T060 Revisar conclusão em `specs/002-refinamento-ux-ui/tasks.md` e registrar aceite final no `specs/002-refinamento-ux-ui/validation/acceptance.md` somente com evidências, referências/baselines aprovados e nenhuma violação conhecida aplicável ou pendência obrigatória; não marcar testes não executados como concluídos nem publicar/mesclar automaticamente (SC-001–SC-008; depende T059).

## Dependencies & Execution Order

### Phase Dependencies

Setup T001–T006 → Foundation T007–T014 → US1 T015–T022 → US2 T023–T031 → US3 T032–T039 → US4 T040–T047 → US5 T048–T053 → Polish T054–T060.

Fases por história preservam prioridade e evitam colisão no controlador. Independência significa que cada história tem fixtures/critério próprios e entrega valor sobre os pré-requisitos concluídos; não significa reimplementar um formulário/repositório por história. US3 completa foco/anúncios dos fluxos disponíveis antes da US4; US4 detalha estados sem quebrar esse contrato. Nenhuma história depende de tarefa de implementação de fase futura para seu checkpoint, exceto gates de aceite global explicitamente reservados ao polish.

### Grafo de dependências

```text
T001 ──────────────> T005 ─┐
T002 -> T003 -> T004 ──────┴-> T006 (referências aprovadas)
   -> T007 -> T008 -> T009 -> [T010 | T011 | T012]
   -> T013 -> T014
   -> US1: [T015 | T016] -> [T017 | T018] -> T019 -> T020 -> T021 -> T022
   -> US2: [T023 | T024 | T025] -> T026 -> T027 -> T028 -> T029 -> T030 -> T031
   -> US3: [T032 | T033] -> T034 -> T035 -> T036 -> T037 -> T038 -> T039
   -> US4: [T040 | T041] -> T042 -> T043 -> T044 -> T045 -> T046 -> T047
   -> US5: [T048 | T049] -> T050 -> T051 -> T052 (aprovação) -> T053
   -> T054 -> [T055 | T056 | T057 | T058] -> T059 -> T060
```

Dentro de cada fase sem dependência mais específica, seguir IDs. Grupos entre colchetes operam em arquivos separados e podem ser paralelos depois do pré-requisito comum; demais tarefas aguardam integração. Nenhuma atualização de CSS global/controlador/lockfile corre em paralelo com outra alteração do mesmo arquivo.

### Parallel Examples por história

| História | Oportunidade após pré-requisito | Integração serial |
| --- | --- | --- |
| US1 | T015 e T016 após fundação; T017 e T018 após testes | T019–T022 integram status/datas/item/filtro no controlador |
| US2 | T023, T024 e T025 após US1 | T026–T031 alteram formulário/controlador e validam |
| US3 | T032 e T033 após US2 | T034–T039 corrigem foco/semântica e verificam manualmente |
| US4 | T040 e T041 após US3 | T042–T047 integram resultados/pendência e revalidam |
| US5 | T048 e T049 após US4 | T050–T053 refinam, apresentam e aceitam baselines |

Também há paralelismo entre T010/T011/T012 e entre T055/T056/T057/T058. São 20 tarefas marcadas `[P]`, condicionadas aos pré-requisitos; esta marcação não determina uso de subagentes.

## Implementation Strategy

### MVP First

Concluir setup, fundação e US1 para uma demonstração do refinamento de leitura/lista/filtro, preservando os fluxos atuais. Validar o checkpoint US1 sem declarar toda a especificação concluída. Se o propósito for entrega completa, continuar US2–US5 e polish; acessibilidade obrigatória e aprovações não são opcionais do MVP publicado.

### Incremental Delivery

Cada história adiciona valor sobre a mesma tela e mantém caracterização real passando. Escrever testes específicos antes do novo comportamento; executar testes antigos e novos relevantes após integrar. Casos funcionais já existentes não devem falhar artificialmente. Manter referências autorizadas por grupo e comparar candidatos em cada checkpoint. Se uma referência não cobrir a mudança, preparar a revisão concreta e registrar autorização no T006 antes de implementá-la.

Ao descobrir problema preexistente de negócio, registrar separadamente, sem alterar contrato/domínio para concluir este refinamento. Reversão é por mudança de apresentação e referências associadas, sem migração de dados. Não introduzir edição, detalhe, histórico visível, paginação, autenticação, métricas de progresso ou nova navegação.

## Rastreabilidade e contagem

| Grupo | Tarefas | Quantidade | Critério independente / evidência |
| --- | --- | --- | --- |
| Setup | T001–T006 | 6 | Caracterização real e referências concretas aprovadas |
| Foundation | T007–T014 | 8 | Stack visual mínima com comportamento preservado |
| US1, P1 | T015–T022 | 8 | Ler/filtrar quatro estados e títulos longos; V-01/V-02 |
| US2, P1 | T023–T031 | 9 | Corrigir/criar sem perder dados, pendência e recarga; V-03 |
| US3, P1 | T032–T039 | 8 | Fluxos só por teclado, anúncios e ampliação; V-04/V-05/V-06/V-11 |
| US4, P1 | T040–T047 | 8 | Vazio/filtro/loading/erro/transição coerentes; V-07 |
| US5, P2 | T048–T053 | 6 | Referências, movimento e comparação aprovada; V-08/V-10 |
| Polish | T054–T060 | 7 | Evidências globais SC-001–SC-008 |
| **Total** | **T001–T060** | **60** | Todos os 29 RF-UI contemplados |

RF-UI-001–005: T007–T012/T017–T022/T051. RF-UI-006–011: T011/T015–T026/T055/T057. RF-UI-012–015: T023–T029/T035/T040–T046. RF-UI-016–021: T027/T032–T039/T046/T056–T057. RF-UI-022: T049–T050/T056. RF-UI-023–026: T001–T004/T013–T014 e checkpoints/regressão final. RF-UI-027–029: T005–T006/T048/T051–T055. O contexto de cada história complementa estas associações.

## Notes

Geração baseada no template ativo de tasks. Nenhuma tarefa marcada concluída; não houve implementação, instalação de dependências, mudança de baseline, commit ou publicação nesta execução. Verificar hooks antes/depois conforme a skill; `.specify/extensions.yml` não estava presente na geração.
