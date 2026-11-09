# Implementation Plan: Dashboard Evolua

**Branch Git**: `main` | **Feature resolvida pelo Spec Kit**: `004-dashboard-ux-ui`  
**Date**: 2026-11-06 | **Spec**: [spec.md](spec.md)  
**Input**: especificação e duas respostas da sessão de clarificação de 2026-11-06.

## Summary

Preservar a refatoração existente e incorporar as decisões confirmadas: dados de cada ciclo empilhados no celular, com semântica de tabela preservada, e aceitação condicionada a testes automáticos, teclado e revisão manual real com leitor de tela (FR-006, FR-011, SC-001, SC-004).

A implementação e a evidência automática anteriores permanecem como ponto de partida. O trabalho restante deve verificar as relações tabulares no anúncio real, preparar cenários manuais reproduzíveis, registrar resultados e corrigir eventuais falhas. O planejamento não executa nem aprova a revisão manual.

## Technical Context

**Language/Version**: TypeScript 5, React 19, Next.js 15 App Router; versões instaladas/lockfile preservados.

**Primary Dependencies**: Tailwind 4, CVA, componentes locais compatíveis com shadcn new-york/radix e `@radix-ui/react-icons`; nenhuma nova dependência de produção planejada.

**Storage**: localStorage com chave `evolua:pdi-cycles:v1`; domínio, porta, adaptador e OpenAPI existentes preservados.

**Testing**: Vitest 2, Testing Library, Playwright 1.57 e axe 4.11; revisão manual por teclado e leitor de tela com configuração identificada no registro de execução.

**Target Platform**: navegadores desktop/tablet/mobile, locale `pt-BR`, timezone `America/Sao_Paulo`; viewports 320, 390, 768, 1024, 1280 e 1440 px. Emulação de viewport não comprova uso de leitor de tela em dispositivo móvel real.

**Project Type**: frontend modular de uma aplicação Next.js.

**Performance Goals**: manter fontes locais, zero novas consultas de negócio e zero downloads de fontes de CDN. A medição histórica de First Load JS (119 kB) serve para comparação se correções de UI alterarem o bundle, sem inventar novo limite funcional.

**Constraints**: manter regras, valores, histórico, foco e formulário controlado; nenhum gráfico, rota de produto ou controle novo sem função existente; sem correções estruturais por margens negativas/posicionamento absoluto. Dados sintéticos e perfil isolado para validação.

**Scale/Scope**: `/pdi-cycles`, com `/` redirecionando. Consulta atual usa paginação do adaptador (20 por padrão, máximo aceito de 100); a refatoração não adiciona paginação visível nem altera esse contrato.

## Constitution Check

Gate de planejamento verificado antes da pesquisa e novamente após os contratos:

| Princípios | Verificação | Resultado |
| --- | --- | --- |
| I — SDD | FR-006/FR-011 e SC-001/SC-004 vinculados a contratos e roteiro | Passa |
| II–IV — arquitetura e simplicidade | apresentação permanece nos componentes; domínio independente; extração de Card mantida | Passa |
| V — testes | regressões existentes preservadas; automação e revisão manual têm evidências distintas | Passa |
| VI–VII — proteção e integridade | perfil de teste e dados sintéticos; persistência, fronteiras de acesso e histórico não são modificados | Passa |
| VIII–IX — IA e contratos | nenhuma integração de IA/API nova; diferença local de título do OpenAPI identificada e preservada em planning-state.json | Passa |
| X — experiência e acessibilidade | tabela empilhada, teclado, foco e leitor de tela abrangidos pelo novo contrato | Passa no design; aceitação pendente de execução manual |
| XI–XII — operação e governança | comandos existentes, configuração de avaliação registrada e evidência associada à revisão do código | Passa |

Nenhuma exceção arquitetural necessária. A pendência da revisão manual impede concluir a aceitação da feature, mas não impede concluir este planejamento.

## Project Structure

### Documentation (this feature)

```text
specs/004-dashboard-ux-ui/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── design-system.md
├── quickstart.md
├── contracts/
│   ├── ui-contract.md
│   └── accessibility-review.md
├── tasks.md                    # histórico; atualizar na fase speckit-tasks
└── validation/
    ├── acceptance.md           # evidência histórica + status após clarificação
    ├── protected-hashes.json
    ├── planning-state.json     # comparação com baseline e diferença local observada
    └── before-*.png / after-*.png
```

### Source Code (repository root)

```text
apps/web/
├── src/app/{globals.css,layout.tsx,pdi-cycles/page.tsx}
├── src/components/ui/          # Button, Card e campos existentes
├── src/features/pdi-cycles/
│   ├── domain.ts
│   ├── ports/
│   ├── adapters/
│   ├── components/             # dashboard, navegação, tabela, formulário e feedback
│   └── tests/
└── tests/{fixtures,functional,a11y,visual}/
```

**Structure Decision**: manter o módulo existente, componentes HTML nativos e os tokens em globals.css. Corrigir apresentação/semântica apenas quando uma falha reproduzida justificar a mudança. Cenários artificiais de erro/carregamento devem usar a porta de repositório já injetável em fixtures isoladas de teste, fora das rotas e do bundle de produção; sem controles de teste no produto.

## Phase 0 — Research

[research.md](research.md) consolida a inspeção do código, a pesquisa delegada e fontes primárias W3C/WAI. Decisões: preservar a stack e identidade, manter tabela semântica ao empilhar, avaliar anúncios reais, registrar configuração de tecnologia assistiva e separar evidência histórica de aceitação atual. Nenhuma dúvida bloqueante permanece.

## Phase 1 — Design & Contracts

- [data-model.md](data-model.md): dados existentes, invariantes, estados de UI e formato documental da evidência manual; sem entidade persistida nova.
- [ui-contract.md](contracts/ui-contract.md): comportamento responsivo, navegação/foco, formulário, feedback e preservação de contratos.
- [accessibility-review.md](contracts/accessibility-review.md): cenários, resultados exigidos, campos do registro e regra de aceitação.
- [quickstart.md](quickstart.md): preparação, comandos e roteiro executável; sem alegar revisão humana já realizada.

## Validation Strategy & Acceptance

1. Preservar os resultados históricos (8 unitários e 34 verificações de navegador); repetir os checks afetados quando houver mudança, sem tratá-los como prova de revisão manual.
2. Conferir os quatro dados/ações por ciclo em 320 e 390 px, sem rolagem horizontal; verificar tabela e relações entre cabeçalhos/células no leitor de tela.
3. Executar navegação, filtro, cadastro, transições e feedback por teclado e com leitor de tela, incluindo o menu móvel. Registrar configuração e limitações de cobertura.
4. Preparar estados transitórios e falhas controladas em fixtures de teste quando não forem reproduzíveis de maneira estável no fluxo natural. Estado não observado permanece pendente.
5. Registrar achados, corrigir falhas, reexecutar os cenários afetados e comparar os hashes com o estado documentado em `validation/planning-state.json`, mantendo o baseline histórico em `validation/protected-hashes.json`. Classificar diferenças locais sem reverter mudanças externas a esta feature.
6. Concluir aceitação somente com evidência automática válida, teclado e revisão manual completos, sem falha aplicável conhecida de acessibilidade nem impedimentos aos fluxos essenciais. Aprovação de um baseline visual continua separada e explícita.

## Estado local observado

Domínio, porta e adaptador coincidem com os três hashes históricos. O OpenAPI tem uma diferença local em `info.title` (“Evolua API” → “Evolua API”); o diff não mostra alteração de endpoints ou schemas. A mudança foi preservada e os dois hashes registrados em [planning-state.json](validation/planning-state.json). A Constituição também recebeu apenas a atualização local do nome do produto no título; seus princípios permanecem iguais. Nenhum desses arquivos foi editado pelo planejamento.

## Handoff to Tasks

Próxima fase: `$speckit-tasks`, preservando a rastreabilidade do trabalho anterior e incluindo preparação dos cenários manuais, execução/registro da revisão e tratamento de achados. O `tasks.md` atual registra a implementação anterior à clarificação e ainda não representa o atendimento de FR-011. Este comando termina após Phase 1; nenhuma tarefa de implementação foi executada ou marcada como concluída nesta atualização.
