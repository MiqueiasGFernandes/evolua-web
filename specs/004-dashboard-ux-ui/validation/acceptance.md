# Validação e revisão visual

## Status após a clarificação de 2026-11-06

**Aceitação global pendente.** O usuário tornou a revisão manual com leitor de tela obrigatória em FR-011/SC-004. Os resultados abaixo preservam a execução automática anterior; declarações históricas de revisão “complementar” não atendem ao novo critério de aceitação. Nenhuma revisão manual foi executada ou aprovada nesta atualização de planejamento. Seguir o [contrato de revisão](../contracts/accessibility-review.md) e o [quickstart atualizado](../quickstart.md).

## Implementação após clarificação — 2026-11-06

**Aceitação global: pendente da revisão real com leitor de tela.**

- 14/14 testes unitários aprovados, incluindo fixture isolada, campos/limites, preservação de valores, pendência e correção de datas/foco.
- Chromium 14/14 e Firefox 14/14 aprovados na rodada ampliada; WebKit 14/14 aprovado em execução isolada com um worker e timeout de 90 s após timeout durante axe em host sobrecarregado. Assertivas não foram relaxadas.
- Layout/capturas: 7/7 aprovados em runner separado. Total de cenários de navegador únicos aprovados: 49 (42 funcionais/a11y + 7 visuais).
- Smoke da superfície manual: 1/1 aprovado; [captura inspecionada](manual-surface.png). Essa execução prepara os cenários e não é revisão humana.
- Lint, TypeScript, build e git diff --check aprovados. Bundle de produção mantém First Load JS de 119 kB. Nenhuma alteração necessária na UI de produção nesta execução; trabalho local de marca preservado.
- Domínio, porta, adaptador e OpenAPI coincidem com os hashes de planning-state.json. O baseline anterior permanece intacto.
- Capturas de 320, 390, 768, 1024, 1280 e 1440 px inspecionadas: dados, ações e formulário sem cortes estruturais; nenhum baseline aprovado sobrescrito.
- Preparação: `pnpm --filter web test:manual`, http://127.0.0.1:4174. Repositório em memória com estados mixed/empty/loading/read-error/write-error/pending, reinício e liberação controlada; código somente em tests, sem dependência nova de produção.
- Orca 42.0 instalado, mas controle interativo sem apps/browser e erro “browser access host is unavailable”. M01–M07 não foram operados com leitor de tela; resultados manuais permanecem pendentes no [registro](manual-accessibility.md).
- T020, T023, T026 e T030 permanecem desmarcadas. A ausência de execução não foi convertida em aprovação.

## Escopo
Refatoração da tela de ciclos sobre alterações locais preexistentes. Direção visual extraída do texto do usuário; a imagem mencionada não veio anexada.

## Comportamento e arquitetura
Domínio, porta de repositório, adaptador localStorage e contrato OpenAPI conferidos pelos hashes em [protected-hashes.json](protected-hashes.json): idênticos ao estado inicial. Cadastro, filtro, validações, exclusividade de ciclo ativo e quatro transições existentes preservados.

## Verificações estáticas
- Vitest: 8 testes aprovados (5 existentes + 3 para mensagens de leitura).
- ESLint: aprovado sem warnings.
- TypeScript: aprovado após build.
- Build Next.js de produção: aprovado, página estática, First Load JS de 119 kB.
- `git diff --check`: aprovado.

A primeira tentativa de executar build junto com testes compartilhou a saída `.next` e foi interrompida. A validação final usa build concluído e servidor de produção, com um único runner Playwright; resultados interrompidos não são usados como aceitação.

## Limites
Axe e testes de teclado não certificam conformidade integral de acessibilidade. Leitor de tela e dispositivos físicos precisam de revisão complementar. Nenhum snapshot aprovado foi alterado. Capturas são candidatos para revisão humana.

## Auditoria visual e fluxo
1. **Consulta — boa**: [antes desktop](before-1440.png); painéis e hierarquia agora distinguem navegação, tabela e cadastro.
2. **Tablet — boa**: [antes tablet](before-768.png); largura de conteúdo recuperada com navegação sobreposta abaixo de 1024 px.
3. **Celular — boa**: [antes celular](before-390.png); linhas preservam título, período, situação e ações, com formulário em uma coluna e alvos de toque de 44 px.
4. **Estados — distinguíveis**: vazio, filtro sem resultados, falha e menu possuem capturas próprias.

A revisão encontrou e corrigiu prioridade CSS que tornava o acionador móvel visível em desktop. O teste de layout passou a verificar explicitamente sua visibilidade em cada breakpoint.

## Requisitos e rastreabilidade
- FR-001 / SC-002: caracterização de cadastro, filtro, transições e exclusividade; hashes protegidos.
- FR-002–003 / FR-009: tokens em globals.css, Source Sans 3 local, Card composto e controles reaproveitados; [design-system.md](../design-system.md).
- FR-004–005 / SC-003: testes de âncoras, seleção, foco, Escape e resize.
- FR-006 / SC-001: contenção da página e de ações em 320/390/768/1024/1280/1440 px, incluindo títulos longos.
- FR-007 / SC-004: testes de mensagens e axe em misto, vazio, falha e menu.
- FR-008: nenhuma rota, métrica ou gráfico adicional.
- FR-010 / SC-005: [auditoria inicial](audit.md), capturas antes/depois e tarefas rastreáveis; sem novos baselines.

## Capturas posteriores
- [Desktop 1440](after-1440.png), [desktop 1280](after-1280.png), [desktop 1024](after-1024.png). Sidebar permanente, CTA visível e tabela/cadastro sem cortes; a partir de 1280 px ficam lado a lado.
- [Tablet 768](after-768.png). Header de 64 px, menu temporário e painéis empilhados.
- [Celular 390](after-390.png), [celular 320](after-320.png). Linhas com rótulos, ações alcançáveis, datas em uma coluna.
- [Primeiro uso](after-empty.png), [filtro sem resultados](after-filter-empty.png), [falha](after-error.png), [menu](after-mobile-menu.png).

Capturas inspecionadas no estado final; nenhuma sobreposição estrutural ou corte de dados essenciais identificado. A imagem do menu deve representar somente o viewport porque o backdrop nativo cobre a área visível, não o restante do documento em captura full-page.

O WebKit revelou uma corrida de hidratação no teste de cadastro: o primeiro preenchimento podia ocorrer antes da inicialização React e ser limpo. O teste agora espera o estado de primeiro uso renderizado após a leitura inicial antes de preencher. Não foram removidas nem relaxadas as verificações de criação e persistência.

A mesma espera de inicialização foi adicionada à fixture compartilhada `seedCycles`: depois do reload, ela aguarda a tabela ou o estado vazio correspondente aos dados semeados. Isso garante que ações de formulário/filtro não ocorram antes da hidratação em engines mais lentos.

## Arquivos e decisões finais
- Apresentação: `globals.css`, `layout.tsx`, Button e novo Card; CycleDashboard, CycleNavigation e CycleTable evoluem a composição local existente.
- Ícones: pacote Radix, compatível com o preset shadcn detectado; sem desenhos SVG manuais novos.
- Testes: navegação, axe, seis viewports e mensagens; alias `@` adicionado ao Vitest para permitir testar componentes reais.
- Trade-off: manter controles nativos e feedback inline evita introduzir dependências de tabela, formulários, toast ou gráficos sem necessidade.
- Preservação: nenhuma regra, migração, rota, chave de armazenamento ou API nova. Alterações locais anteriores foram mantidas.

## Resultado final
- **34/34 aprovados** no runner único: Chromium (9), Firefox (9), WebKit (9) e layout/capturas Chromium (7), em 1,8 min.
- Comando: `LD_LIBRARY_PATH=/tmp/evolua-webkit-libs/extracted/usr/lib/x86_64-linux-gnu pnpm --filter web exec playwright test --project=chromium-functional --project=firefox-functional --project=webkit-functional --project=chromium-visual --workers=2 --max-failures=1`.
- **8/8 unitários aprovados** com `pnpm test`.
- `pnpm lint`, `pnpm typecheck`, `pnpm build` e `git diff --check`: aprovados.
- Axe sem violações nos estados avaliados nos três engines; seis larguras sem overflow de página, inclusive títulos longos e ações.
- Hashes protegidos idênticos; todas as tarefas T001–T011 concluídas.
- Não há pendência de implementação conhecida. Revisão com leitor de tela/dispositivo físico e aprovação humana de eventual baseline permanecem etapas manuais complementares.
