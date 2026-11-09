# Implementation Plan: Gestão de Objetivos de Desenvolvimento

**Branch**: `007-gestao-objetivos` | **Date**: 2026-11-08 | **Spec**: [spec.md](spec.md)

**Input**: Especificação funcional da gestão de objetivos dentro dos ciclos de PDI.

## Summary

Adicionar objetivos estruturados aos ciclos existentes: planejamento quantitativo ou qualitativo, consulta no detalhe do ciclo, acompanhamento de resultados, transições explícitas e resumo derivado. A solução evolui o módulo `pdi-cycles` já existente, seu domínio e persistência local versionada; hosts de tela permanecem finos e os cálculos/guardas ficam em funções puras. Não haverá serviço, dashboard analítico ou dependência nova.

## Technical Context

**Language/Version**: TypeScript 5, React 19 e Next.js 15 App Router.

**Primary Dependencies**: React, Zod, componentes UI locais, Radix Icons, Vitest, Testing Library, Playwright e axe; nenhuma dependência de produção nova.

**Storage**: adaptador localStorage existente, evoluído de envelope v2 de ciclos para envelope v3 que inclui objetivos estruturados e preserva dados v1/v2.

**Testing**: Vitest 2/Testing Library para domínio, adaptador e componentes; Playwright Chromium/Firefox/WebKit, axe e testes visuais responsivos para fluxos de usuário.

**Target Platform**: navegadores desktop e móveis em pt-BR; viewports 320, 390, 768, 1024 e 1440 px.

**Project Type**: aplicação web frontend modular, sem backend HTTP neste repositório.

**Performance Goals**: cálculos de progresso, atraso e resumo imediatos na interação; nenhuma consulta externa para listar ou atualizar objetivos.

**Constraints**: preservar ciclos e dados históricos; objetivos pertencem ao ciclo; sem percentual qualitativo, conclusão automática ou divisão por zero; UI acessível; sem dashboard, IA, evidência, ação 70-20-10 ou integração externa.

**Scale/Scope**: módulo de ciclos, armazenamento local, dashboard/listagem e superfícies de criação/detalhe; múltiplos objetivos por ciclo e limites de paginação já existentes preservados.

## Constitution Check

*Gate verificado antes da pesquisa e após o design.*

| Princípio | Verificação | Resultado |
| --- | --- | --- |
| I — SDD | SPEC-007, quatro esclarecimentos e critérios rastreáveis precedem o design. | Passa / Passa |
| II–IV — arquitetura e simplicidade | Domínio puro, porta independente, adaptador local e componentes no módulo existente; sem abstração genérica ou serviço novo. | Passa / Passa |
| V — testes | Plano exige testes de regra, migração, componente, E2E, teclado, axe e viewport. | Passa no design; execução pendente |
| VI — segurança e privacidade | Nenhuma transmissão nova; o repositório aplica dono local. A limitação multiusuário do localStorage permanece explícita. | Passa para protótipo local; produção privada bloqueada |
| VII — integridade | Migração v3 preservadora, validação antes da escrita, estados finais imutáveis e versões otimistas. | Passa / Passa |
| VIII–IX — IA e contratos | Sem IA ou API externa; contrato de UI e persistência internos documentados. | Passa / Passa |
| X — UX e acessibilidade | Formulários progressivos, confirmações, estados vazios, foco, teclado e responsividade contratados. | Passa no design; aceitação pendente |
| XI–XII — operação e evolução | Comandos reproduzíveis, compatibilidade documentada e sem infraestrutura adicional. | Passa / Passa |

**Limitação de segurança preexistente**: `localStorage` com `local-user` não implementa autenticação/autorização real entre pessoas. O adaptador deve continuar filtrando por proprietário local e os testes devem caracterizar a fronteira, mas a exigência de produção multiusuária da FR-020 só será satisfeita quando o produto possuir identidade e autorização reais. Esta feature não cria um backend apenas para encobrir essa limitação.

## Project Structure

### Documentation (this feature)

```text
specs/007-gestao-objetivos/
├── plan.md              # This file ($speckit-plan command output)
├── research.md          # Phase 0 output ($speckit-plan command)
├── data-model.md        # Phase 1 output ($speckit-plan command)
├── quickstart.md        # Phase 1 output ($speckit-plan command)
├── contracts/           # Phase 1 output ($speckit-plan command)
└── tasks.md             # Phase 2 output ($speckit-tasks command - NOT created by $speckit-plan)
```

### Source Code (repository root)
```text
apps/web/
├── src/
│   ├── app/globals.css
│   ├── features/pdi-cycles/
│   │   ├── domain.ts
│   │   ├── ports/pdi-cycle-repository.ts
│   │   ├── adapters/local-storage-pdi-cycle-repository.ts
│   │   ├── components/
│   │   │   ├── cycle-dashboard.tsx
│   │   │   ├── cycle-table.tsx
│   │   │   ├── objective-form.tsx
│   │   │   ├── objective-list.tsx
│   │   │   ├── objective-detail.tsx
│   │   │   └── objective-confirmation-dialog.tsx
│   │   └── tests/
│   └── components/ui/
└── tests/{fixtures,functional,a11y,visual}/
```

**Structure Decision**: manter o módulo de ciclos e suas dependências existentes. `domain.ts` concentra tipos, validação, cálculo de progresso/atraso/resumo e transições puras; a porta expressa operações do agregado ciclo; o adaptador decodifica/migra/grava; componentes apresentam e orquestram estado de interação. A criação de novos componentes é limitada às superfícies de objetivo, sem motor genérico de formulário.

## Phase 0 — Research

[research.md](research.md) consolida decisões sobre evolução do agregado, migração, cálculo quantitativo, estados, autorização local e acessibilidade. Não restam pontos técnicos em aberto para a implementação.

## Phase 1 — Design & Contracts

- [data-model.md](data-model.md): entidades, validações, transições e valores derivados.
- [ui-contract.md](contracts/ui-contract.md): superfícies, campos condicionais, estados, foco e comportamento responsivo.
- [persistence-contract.md](contracts/persistence-contract.md): contrato da porta e evolução v2 → v3 do armazenamento local.
- [quickstart.md](quickstart.md): roteiro de validação end-to-end e comandos existentes.

## Rastreabilidade e estratégia de validação

| Requisitos | Design principal | Validação exigida |
| --- | --- | --- |
| FR-001–007 | Objetivo estruturado e formulário condicional | Unitário de validação + componente/E2E quantitativo e qualitativo |
| FR-008–009/018–019 | Seção e resumo no detalhe do ciclo | E2E lista, detalhe, vazio, resumo e ações permitidas |
| FR-010–012/016 | Funções puras de progresso e atraso | Testes de crescente, decrescente, alvo superado, indisponível e data limite |
| FR-013–017 | Máquina de estados e confirmações | Unitário das transições + E2E início, pausa, conclusão e cancelamento |
| FR-020 | Filtro de proprietário no contrato/adaptador | Testes do adaptador e registro explícito da limitação local |
| FR-021 | Contrato de UI e estilos existentes | Teclado, foco, axe e viewports 320–1440 |
| FR-022–023 | Valores derivados e dados independentes | Testes de resumo e ausência de vínculo com atividades futuras |

## Handoff to Tasks

Planejamento concluído até Phase 1. Próximo comando: `$speckit-tasks`. Nenhum código de produto foi implementado por este plano; a aceitação depende da execução da matriz de testes e da revisão manual de acessibilidade.
