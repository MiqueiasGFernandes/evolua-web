# Implementation Plan: Refinamento visual e UX — Caderno de percurso

**Branch**: `main` (git atual, preservada) | **Date**: 2026-11-06 | **Spec**: [spec.md](spec.md)

**Feature**: `002-refinamento-ux-ui` / SPEC-002

**Input**: Especificação aprovada e solicitação de planejamento com Next.js, Tailwind CSS, shadcn/ui e `frontend-design`.

**Status**: Phase 0 e Phase 1 concluídas no nível de planejamento. Direção **A** selecionada explicitamente pelo usuário após três prévias. Nenhum código de aplicação, dependência ou baseline foi implementado/alterado nesta etapa. Aprovação de referências detalhadas e comparações renderizadas permanece gate da entrega futura.

Nota de setup: `setup_plan.py --json` resolveu corretamente o diretório e retornou `BRANCH: 002-refinamento-ux-ui` como identificador derivado da feature. A verificação direta `git branch --show-current` retorna `main`; este é o branch real reportado. Não houve hook de criação de branch.

## Summary

Refinar incrementalmente a superfície existente `/pdi-cycles`, preservando cadastro, lista, filtro, transições, validações e armazenamento. A direção **Caderno de percurso** usa Newsreader nos títulos, Source Sans 3 na interface, neutros frios, verde discreto e faixas de lista sem cards repetitivos. Desktop alinha formulário e acompanhamento em proporção 5:7; tablet/mobile empilham sem alterar ordem de leitura.

O plano parte de nova inspeção dos componentes/estilos e das capturas do diagnóstico, sem presumir que Tailwind/shadcn já existam. Introduzir essas ferramentas somente na camada de apresentação, com tokens semânticos, primitivas seletivas e estados acessíveis. Domínio, porta, adaptador, contrato OpenAPI e rotas permanecem preservados. Testes funcionais com adaptador real precedem mudanças visuais; referências detalhadas e baselines dependem de aprovação humana específica.

Documentos de decisão: [três direções e escolha](visual-directions/README.md), [design system](design-system.md), [pesquisa](research.md), [validação](visual-tests.md).

## Technical Context

**Language/Version**: TypeScript 5.9.3, React/React DOM 19.3.1 e Next.js 15.5.29 conforme lockfile atual. Manter versões existentes durante o refinamento.

**Primary Dependencies**: Tailwind CSS 4 com `@tailwindcss/postcss`, integração CSS-first e tokens; shadcn/ui apenas para primitivas justificadas. Seleção exata das novas versões/peers e registro no lockfile pertencem ao incremento técnico, antes de seu uso. Não migrar formulário para React Hook Form/Zod nem consultas para React Query só porque já são dependências.

**Storage**: adaptador local existente, chave e formato preservados. Nenhum backend, migração ou nova entidade persistida. Mesma porta `PdiCycleRepository`; seam de teste opcional no controlador, sem nova assinatura de operação.

**Testing**: Vitest existente, futura caracterização E2E Playwright, comparação visual canônica, axe e avaliação manual WCAG 2.2 AA. Quatro testes de domínio passaram no diagnóstico anterior; nenhuma nova suíte foi instalada/executada como resultado deste plano.

**Target Platform**: web desktop/tablet/mobile. Piso de Tailwind 4: Safari 16.4+, Chrome 111+, Firefox 128+. Validar browsers modernos fixados, keyboard/reader e aparelhos reais quando disponíveis. Referências canônicas em Chromium/Linux, não entre diferentes SOs.

**Project Type**: frontend web em monorepo, App Router, layout servidor e controlador cliente existentes. Não criar pacote UI compartilhado para um único consumidor nem alterar arquitetura geral.

**Performance Goals**: nenhuma espera artificial em produção; microinterações decorativas ≤200 ms, preferencialmente 120–180 ms; fontes locais e apenas pesos necessários; feedback persistente durante operações longas. Medir build e peso de assets antes/depois para identificar custo desnecessário, sem inventar métricas de desenvolvimento profissional ou budgets não exigidos pela especificação.

**Constraints**: sem código nesta fase; contrato OpenAPI/regras/limites/transições imutáveis; acessibilidade A/AA aplicável; corpo/campos ≥16 px; ações mobile ≥44×44; ausência de overflow/corte; referências aprovadas antes de alterações do grupo e baselines somente após comparação aprovada.

**Scale/Scope**: uma superfície atual, cinco campos, quatro estados e quatro transições permitidas; página atual de até 20 resultados. Matriz de oito viewports da SPEC-002 e duas intermediárias. Nenhuma tela nova de edição/detalhe/histórico/paginação/autenticação.

## Constitution Check

Gates avaliados antes da pesquisa e novamente após o design. “Conforme” significa que o plano respeita o princípio; não atesta implementação ou conformidade global do MVP preexistente.

| Princípio | Antes | Após Phase 1 / evidência |
| --- | --- | --- |
| I — SDD | Conforme: usuário declarou SPEC-002 aprovada | Conforme: requisitos rastreados, direção A escolhida; gates de referências/entrega definidos |
| II — Arquitetura | Conforme: análise das fronteiras existentes | Conforme: mudanças na apresentação; porta/adaptador/domínio mantidos; seam de teste usa porta existente |
| III — DDD | Conforme: linguagem de ciclos/status preservada | Conforme: apenas tradução visual; [modelo](data-model.md) mantém invariantes |
| IV — Qualidade/simplicidade | Conforme: reutilização prioritária | Conforme: sem pacote UI novo, componentes só por responsabilidade/repetição; lacuna de lint registrada |
| V — Confiabilidade | Conforme: suíte atual identificada, E2E ausente | Conforme: E2E real antes do visual, estados controlados separados, testes relevantes como gate |
| VI — Segurança/privacidade | Conforme no escopo: não ampliar acesso atual | Conforme: dados sintéticos/contextos isolados, erros sem detalhes; proxy excluído de produção; autenticação preexistente fora do escopo |
| VII — Integridade | Conforme: não mudar armazenamento/regras | Conforme: recarga e histórico verificados nos cenários, nenhuma migração |
| VIII — IA | Conforme: produto não depende de IA | Conforme: imagens geradas são documentos de planejamento, não nova função ou asset obrigatório do produto |
| IX — Contratos | Conforme: OpenAPI congelado | Conforme: [contrato UI](contracts/ui-contract.md) sem novos endpoints ou campos |
| X — UX/acessibilidade | Conforme: requisitos verificáveis | Conforme: tokens/estados, AA completo aplicável, sem progresso fictício |
| XI — Operação | Conforme: infraestrutura atual suficiente | Conforme: nenhum serviço/cache; testes reproduzíveis, artefatos de falha preservados |
| XII — Evolução | Conforme: incremental | Conforme: decisões/alternativas em research, substituições justificadas e incrementos reversíveis |

Nenhuma violação nova ou exceção constitucional é proposta. Lacunas funcionais/segurança da base anterior não serão disfarçadas nem resolvidas por este escopo. Se uma implementação exigir alteração de domínio/contrato/arquitetura, deverá sair deste plano e ser reavaliada.

## Project Structure

### Documentation (this feature)

```text
specs/002-refinamento-ux-ui/
├── spec.md
├── plan.md
├── research.md
├── design-system.md
├── data-model.md
├── visual-tests.md
├── quickstart.md
├── contracts/ui-contract.md
├── visual-directions/
│   ├── README.md
│   ├── a-caderno-percurso.png
│   ├── b-indice-ciclos.png
│   ├── c-margem-futuro.png
│   ├── prompts.json
│   ├── color-tokens.json
│   └── contrast-report.json
├── diagnostico.md
├── evidence/                       # Evidência histórica preservada
└── checklists/requirements.md
```

`tasks.md` pertence à fase posterior `$speckit-tasks` e não é criado neste comando.

### Source Code (repository root)

Árvore atual e localizações **futuras propostas**, sem arquivos novos de código nesta etapa:

```text
apps/web/
├── package.json                         # Existente; dependências mudam só na implementação
├── next.config.ts                       # Existente
├── tsconfig.json                        # Existente; aliases locais futuros
├── postcss.config.mjs                   # Futuro: Tailwind 4
├── components.json                      # Futuro: shadcn seletivo
├── playwright.config.ts                 # Futuro: projetos reais/visuais/estados
├── src/
│   ├── app/
│   │   ├── globals.css                   # Existente; tokens e base visual futura
│   │   ├── layout.tsx                   # Existente; fontes locais futuras
│   │   ├── page.tsx                     # Preservar redirecionamento
│   │   └── pdi-cycles/page.tsx           # Preservar rota/entrypoint
│   ├── components/ui/                   # Futuro: primitives locais necessárias
│   ├── lib/                             # Futuro: utilitário de classes se necessário
│   └── features/pdi-cycles/
│       ├── domain.ts                    # Preservado
│       ├── ports/pdi-cycle-repository.ts # Preservado
│       ├── adapters/                    # Preservado
│       ├── components/
│       │   ├── cycle-dashboard.tsx      # Composição existente
│       │   └── ...                      # Extrações futuras justificadas no design system
│       └── tests/                       # Manter testes atuais; interação futura relevante
└── tests/                               # Futuro: funcional/a11y/visual/fixtures/harness
```

**Structure Decision**: manter a organização orientada à feature; primitives genéricas locais em `components/ui`, elementos de ciclo junto da feature e testes sem rotas públicas adicionais. Fontes locais podem ficar em pasta de assets da aplicação, com licença; não criar pacote independente de branding. Não converter layout inteiro em Client Component para carregar fontes ou tema.

## Phase 0 — Research concluída

- Inspeção atual de rota, controlador, layout, estilos, porta e manifest/lockfile, comparada ao [diagnóstico](diagnostico.md).
- Duas pesquisas somente leitura conforme workflow: stack incremental e validação; fontes primárias e decisões consolidadas em [research.md](research.md).
- Três propostas com paleta, tipografia, wireframe e trade-offs; prévias geradas e apresentadas antes da decisão.
- Usuário escolheu A; segunda passagem crítica removeu peso excessivo, medidas implícitas e dependência da imagem para regras de layout.
- Não restam `NEEDS CLARIFICATION` técnicos. Aprovações futuras têm gate próprio e não foram consideradas concedidas pela escolha de direção.

## Phase 1 — Design e contratos concluídos

- [Design system](design-system.md): tokens semânticos, pares de contraste, fontes, escala tipográfica, grid, espaçamento, bordas, estados, componentes/variantes, formulário, navegação, feedback e representação honesta de progresso.
- [Data model](data-model.md): nenhuma entidade nova; estado de apresentação separado do domínio e mapeamento dos quatro status.
- [UI contract](contracts/ui-contract.md): contratos visíveis/semânticos e fronteiras de componentes; OpenAPI intocado.
- [Visual tests](visual-tests.md): E2E real, estados controlados, screenshots, revisão de baselines, axe e verificações manuais.
- [Quickstart](quickstart.md): comandos atuais e propostos identificados por estágio, roteiros e resultados esperados; nenhum teste ficticiamente executado.

## Incrementos planejados e rastreabilidade

Estes grupos orientam tarefas futuras; não são uma implementação nem uma geração antecipada de `tasks.md`.

| Incremento | Mudança planejada / reutilização | Requisitos / achados | Gate de saída |
| --- | --- | --- | --- |
| I0 — caracterização e referências | Preservar testes de domínio, estabelecer E2E real, registrar versões/browser, detalhar referências A por estado e revisar antes de mudar aparência | RF-UI-023–029; D-01–D-12 como diagnóstico | Fluxos atuais caracterizados; falhas anteriores separadas; referências do próximo grupo aprovadas |
| I1 — base visual | Adicionar Tailwind/shadcn seletivo, fontes e tokens; migrar seletores globais conflitantes e foco; manter root layout servidor | RF-UI-001–005, 009, 017, 020, 025; D-07–D-09/D-12 | Cores/fontes/controles conferidos; sem regressão pela cascata/Preflight; build/tipos/lint/testes relevantes passam |
| I2 — layout e leitura | Migrar inline layout para tokens/utilities; preservar DOM/handlers; extrair formulário/item/status por responsabilidade; quebrar títulos, traduzir rótulos e formatar períodos | RF-UI-002, 006–011, 018, 024; D-01/D-02/D-08/D-10 | Matriz de larguras sem overflow/corte; status e ações coerentes; mesmos fluxos |
| I3 — estados e interação acessível | Mensagens de campo/região, foco após resultado, pending/disabled na porta atual, vazio/erro distintos, microinterações discretas | RF-UI-012–016, 019–022; D-03–D-06/D-11 | Testes com operação real e Promise controlada; teclado/leitura assistiva; sem alteração de regras |
| I4 — aceite e regressão | Verificar browsers/mobile real, acessibilidade ampla, cinco participantes, revisão AE e comparação final | RF-UI-021, 023, 026–029; SC-001–008 | Critérios cumpridos com evidência; baselines somente do conjunto aprovado; nenhuma diferença não analisada |

Cada incremento revisa o diff de dependências, fontes, componentes e capturas; não mesclar upgrade de framework ou correção de negócio. Para reversão, reverter a alteração de apresentação e referências associadas sem migração de dados. Novos bugs de domínio descobertos são registrados em trabalho próprio.

## Estratégia de testes e evidências

O contrato completo está em [visual-tests.md](visual-tests.md). A sequência obrigatória é caracterização funcional antes do visual, referências por estado aprovadas, testes relevantes a cada incremento, candidatos/diffs revisados, baselines aceitos por registro. CI permanece sem atualização de snapshots. [Playwright comparação visual](https://playwright.dev/docs/test-snapshots).

Não basta verificar pixels: combinar invariantes de domínio/dados, largura/overlap, semântica, keyboard, axe, leitor de tela, texto 200%, zoom real 400%, espaçamento e teclado virtual. Paleta calculada com 19 pares aprovados em [contrast-report.json](visual-directions/contrast-report.json), sem atribuir isso à aplicação ainda não renderizada. [Playwright acessibilidade](https://playwright.dev/docs/accessibility-testing).

## Riscos e contenções

| Risco | Contenção |
| --- | --- |
| Reset/global style conflita com primitive | Migração no grupo afetado, inspeção de todos os controles e revisão de diff do gerador |
| Fonte de mockup não coincide com família real | Assets locais/versões/licença; aguardar fonte efetiva; referência detalhada e comparação após renderizar |
| Duas colunas comprimem ações | `min-width: 0`, títulos com quebra, ações na linha seguinte e recolhimento em tablet |
| Pending não reproduzível via rede | Proxy só de teste na porta existente; manter E2E real separado |
| Estado persiste incorretamente após filtro/refresh | Casos explícitos de filtro preservado, create sucedido/refresh falho e resposta antiga ignorada na apresentação |
| Automação mascara acesso real | Leitor de tela, zoom e aparelhos reais; indisponível permanece pendência de aceite |
| Baseline esconde regressão | Atualização delimitada após aprovação com antes/candidato/diff; CI sem update |
| Trabalho funcional ausente invade escopo | Matriz da SPEC-002 e inventário reconferidos; sem novas telas/casos de uso |
| Script lint atual não serve como gate | Configurar ESLint compatível no incremento técnico e verificar comando antes de declarar sucesso |

## Complexity Tracking

Sem violações constitucionais a justificar. O único ajuste estrutural planejado além de componentes visuais é o seam opcional na porta já existente para testar pendência, justificado por RF-UI-013/015/025. Não cria serviço, nova camada de negócio ou persistência. Recusar pacote UI compartilhado, nova biblioteca de estado e calendário customizado mantém a complexidade proporcional à tela atual.

## Encerramento do planejamento

Feature ativa mantida em `.specify/feature.json`; git real `main`. `.specify/extensions.yml` ausente nas verificações anterior e posterior: nenhum hook de planning registrado. Phase 1 encerrada com artefatos revisáveis. Próximo comando possível: `$speckit-tasks`, preservando os gates de referências e aceite antes dos incrementos correspondentes.
