# Implementation Plan: Cadastro guiado de ciclos por objetivos

**Branch Git**: `main` | **Feature resolvida pelo Spec Kit**: `005-cadastro-guiado-ciclos`  
**Date**: 2026-11-08 | **Spec**: [spec.md](spec.md)

**Input**: SPEC-005 validada, respostas 1A e 2A. O setup retornou BRANCH=005-cadastro-guiado-ciclos como identificador resolvido; não criou nem trocou a branch Git main.

## Summary

Substituir o formulário permanente por wizard compartilhado Período → Objetivos → Revisão, aberto em modal pelo botão e em `/pdi-cycles/new` pelo menu. Novos ciclos têm lista obrigatória de objetivos e não título/descrição. O domínio calcula término por soma de 3/6/12 meses com ajuste de fim de mês; somente Personalizado aceita escolha manual. Preservar registros históricos, regras de ciclo de vida e identidade visual existente.

A evolução altera domínio, porta e persistência, além de UI. Usar união de registros históricos/por objetivos e migração local v2 preservadora. O plano não implementa código nem declara aceitação concluída.

## Technical Context

**Language/Version**: TypeScript 5, React 19, Next.js 15 App Router; preservar lockfile e versões existentes.

**Primary Dependencies**: Tailwind 4, CVA, componentes locais, ícones Radix; fontes Source Sans 3 locais. Usar estado React e dialog nativo já presente. Nenhuma nova dependência de produção planejada.

**Storage**: adaptador localStorage atual, proprietário local-user; migração v1 array → envelope v2 com variantes LEGACY/OBJECTIVES e backup v1 intacto. Não existe backend HTTP em execução neste repositório.

**Testing**: Vitest 2/Testing Library, Playwright 1.57, axe 4.11 e harness manual Vite existente. Testes de calendário, migração e regras de negócio antes das alterações correspondentes; contratos e fluxos essenciais com dados sintéticos.

**Target Platform**: navegadores desktop/mobile, pt-BR; Chromium/Firefox/WebKit. Viewports 320, 390, 768, 1024 e 1440; datas independentes de fuso. Leitor de tela real e teclado na aceitação.

**Project Type**: aplicação frontend modular Next.js, sem novo serviço.

**Performance Goals**: cálculo local imediato; zero consultas externas para calcular datas, zero fontes CDN e nenhuma escrita de negócio intermediária. Comparar bundle ao baseline histórico de 119 kB First Load JS e investigar crescimento causado pela feature, sem converter baseline em SLA não aprovado.

**Constraints**: não converter textos antigos em objetivos, não recalcular períodos históricos, não limpar armazenamento, não introduzir metas SMART/progresso/IA, paginação nova ou edição posterior de objetivos. Múltiplas versões escrevendo em paralelo não são suportadas; detectar divergência conforme contrato.

**Scale/Scope**: consulta `/pdi-cycles`, nova página `/pdi-cycles/new`, modal na consulta, domínio/porta/adaptadores e consumidores afetados. Manter limite existente de 20 itens por consulta; exibir o criado por ID quando necessário.

## Constitution Check

Gate verificado antes da pesquisa e novamente depois do modelo/contratos. Não há dúvida técnica bloqueante.

| Princípios | Verificação de design | Resultado antes/depois |
| --- | --- | --- |
| I — SDD | SPEC-005 e decisões confirmadas precedem implementação; matriz FR→artefato→validação abaixo | Passa / Passa |
| II–IV — arquitetura, domínio, simplicidade | calendário/validação puros, porta independente, um wizard e shells finos, sem bibliotecas novas | Passa / Passa |
| V — testes | regras, persistência/migração, contratos e fluxos de ambos os contextos cobertos no roteiro | Passa / Passa no design; execução pendente |
| VI — privacidade | dados sintéticos na validação; nenhuma nova transmissão; fronteira local-user explicitada abaixo | Planejamento local permitido; produção privada bloqueada |
| VII — integridade | migração versionada preservadora, validação antes da escrita, histórico e version preservados | Passa / Passa no design |
| VIII–IX — IA e contratos | sem IA; contrato v1 histórico preservado, evolução v2 explícita e consumidores internos migrados juntos | Passa / Passa |
| X — UX/acessibilidade | fluxo único, erros/foco/descarte e revisão real com leitor de tela contratados | Passa no design; aceitação pendente |
| XI–XII — operação/governança | comandos existentes, evidência reproduzível e decisão de compatibilidade registrada em research R3/R5 | Passa / Passa |

**Limitação preexistente de segurança**: localStorage com local-user não atende autenticação/autorização multiusuário para dados privados. Este plano é limitado ao protótipo local e não concede exceção para publicação privada/produção. Gate de liberação multiusuário permanece bloqueado até existir controle real de identidade/acesso. Não afirmar conformidade completa do produto a partir deste planejamento. Não ampliar a feature com backend de autenticação.

Não há violação arquitetural nova que exija exceção para o trabalho local especificado. As decisões R1–R6 são registros de decisão desta feature; promover R3/R5 ao registro permanente de ADR do projeto na implementação, sem alterar a decisão silenciosamente.

## Project Structure

### Documentation (this feature)

```text
specs/005-cadastro-guiado-ciclos/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── checklists/requirements.md
└── contracts/
    ├── ui-contract.md
    └── persistence-and-contracts.md
```

`tasks.md` será gerado somente por speckit-tasks. Evidências futuras devem ficar em validation/ com revisão identificada, sem marcar documentação de planejamento como prova de execução.

### Source Code (repository root)

Estrutura proposta; arquivos novos ainda não implementados:

```text
apps/web/
├── src/app/pdi-cycles/
│   ├── page.tsx
│   └── new/page.tsx                    # nova página
├── src/app/globals.css                 # tokens preservados; estilos de etapas/modal
├── src/components/ui/                  # controles existentes
├── src/features/pdi-cycles/
│   ├── domain.ts                       # variantes, entradas, validação e calendário
│   ├── ports/pdi-cycle-repository.ts
│   ├── adapters/local-storage-pdi-cycle-repository.ts
│   ├── components/
│   │   ├── cycle-app-shell.tsx          # extração mínima para as duas rotas
│   │   ├── cycle-wizard.tsx             # fluxo compartilhado
│   │   ├── cycle-create-dialog.tsx      # contexto modal
│   │   ├── cycle-create-page.tsx        # contexto página
│   │   └── cycle-*.tsx                  # dashboard/nav/tabela/apresentação afetados
│   └── tests/                          # calendário, domínio, migração, wizard
└── tests/{fixtures,functional,a11y,visual,manual}/
```

**Structure Decision**: manter o módulo existente e direção de dependências. Hosts cuidam de abertura/navegação/sucesso; wizard cuida de etapas/estado; domínio de validação/cálculo; adaptador de decodificação/migração/gravação. Não criar motor genérico de formulários. Extrair função de calendário ou codec para arquivo local ao módulo somente se a legibilidade justificar.

## Phase 0 — Research

[research.md](research.md) resolve seis decisões: composição e rotas, calendário, modelo/migração, acessibilidade, contratos/limites e consistência do resultado. Inspeção local e pesquisa delegada de fontes WAI sustentam o design. Nenhum NEEDS CLARIFICATION restante no planejamento.

## Phase 1 — Design & Contracts

- [data-model.md](data-model.md): entidades, união discriminada, entradas separadas, calendário, transições e estado transitório.
- [ui-contract.md](contracts/ui-contract.md): entradas, etapas, foco, descarte, sucesso e layout responsivo.
- [persistence-and-contracts.md](contracts/persistence-and-contracts.md): versão local, migração, falhas, incompatibilidade com clientes antigos e evolução HTTP futura.
- [quickstart.md](quickstart.md): comandos e cenários que devem demonstrar os resultados.

## Rastreabilidade e estratégia de validação

| Requisitos | Design principal | Validação exigida |
| --- | --- | --- |
| FR-001–003 | Dois hosts e rota real; sem formulário permanente | E2E botão/menu desktop/móvel, URL direta e reload |
| FR-004/011/012 | Wizard compartilhado, validação por etapa e revisão | Componente + E2E ida/volta/correção/Enter |
| FR-005/006 | Novo input por objetivos, lista ordenada | Unitário de vazios/trim e integração de persistência/recarga |
| FR-007–010 | Calendário puro e término automático/custom | Unitários de todos os períodos, bordas, fuso, adulteração; UI |
| FR-013/014 | Commit único e guarda de envio síncrona | Integração + fixture pending/write-error, repetição e retry |
| FR-015 | Sucesso distinguido de refresh; get por ID | E2E filtro excludente, mais de 20 registros e falha pós-commit |
| FR-016/017 | Dialog, confirmação e foco | Teclado/axe + revisão real com leitor de tela nos dois contextos |
| FR-018/019 | União e migração versionada | Integração v1/v2, falha/quota/corrupção/divergência e dados intactos |
| FR-020 | Ciclo de vida preservado | Regressão de ativo único, transições e encerrados, ambas variantes |

Sequência para tarefas: caracterizar legados e escrever testes críticos → domínio/calendário → persistência/compatibilidade e fixtures → wizard e hosts/navegação → apresentação/sucesso → regressões, evidência automática e revisão manual. Revisão manual pode ser preparada em paralelo aos checks automáticos, mas aceitação final depende de ambos. Não marcar testes ou revisão como feitos antes da execução.

A implementação deve atualizar a leitura vigente das SPEC-001/003/004 com referência à SPEC-005 onde houver conflito de criação/apresentação; preservar seu conteúdo histórico e evidências. Atualizar fixtures/harness e assertions que dependem de título, formulário embutido e âncoras. Não substituir todas as expectativas antigas sem preservar cobertura de legados.

## Handoff to Tasks

Planejamento concluído até Phase 1; próximo comando: `$speckit-tasks`. Nenhum código de produto modificado e nenhuma tarefa de implementação executada. Aceitação futura exige SC-001–007, verificações automáticas pertinentes e revisão humana registrada; pendências manuais da SPEC-004 não são automaticamente resolvidas por este plano.
