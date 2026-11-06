# Implementation Plan: Menu lateral e tabela de ciclos

**Branch**: `main` | **Date**: 2026-11-06 | **Spec**: [spec.md](spec.md)

## Summary

Reorganizar a página existente em menu lateral responsivo e tabela semântica. O grupo “Ciclos” navega às âncoras “Meus Ciclos” e “Novo Ciclo”. Desktop alterna menu expandido/compacto; mobile usa painel temporário. Reutilizar os componentes e operações existentes.

## Technical Context

**Language/Version**: TypeScript 5.9.3, React 19.3.1, Next.js 15.5.29.  
**Primary Dependencies**: Tailwind 4.1.17, primitives locais shadcn/ui, Playwright 1.57, axe-core Playwright 4.11, Vitest 2.1.9.  
**Storage**: localStorage existente via `PdiCycleRepository`; sem migração.  
**Testing**: Vitest; Playwright Chromium/Firefox/WebKit, testes visuais sem atualização automática e axe.  
**Target Platform**: Next.js App Router, pt-BR, desktop/tablet/mobile.  
**Project Type**: frontend web monorepo (`apps/web`).  
**Performance Goals**: até 20 linhas na página atual; alternar menu sem refetch e sem alterar filtro.  
**Constraints**: preservar domínio, porta, adaptador, contrato OpenAPI, armazenamento, validações e transições. Menu só usa âncoras existentes. Capturas candidatas e baseline aprovado são estágios separados.  
**Scale/Scope**: rota `/pdi-cycles`, 2 âncoras, tabela com 4 colunas; sem novas telas ou operações.

## Constitution Check

I SDD: requisitos testáveis definidos. II arquitetura: só apresentação, mesma feature. III domínio: invariantes existentes mantidos. IV simplicidade: sem biblioteca de tabela. V testes: E2E/a11y preservam fluxos. VI privacidade: somente fixtures sintéticas. VII integridade: formato e histórico não mudam. VIII IA: não aplicável. IX contratos: OpenAPI intocado. X UX: teclado, foco, reflow e semântica verificados. XI operação: sem infraestrutura nova. XII evolução: mudança incremental. **Gate: aprovado sem exceções.**

## Project Structure

```text
apps/web/src/app/globals.css
apps/web/src/features/pdi-cycles/components/
  cycle-dashboard.tsx       # composição e estado transitório
  cycle-navigation.tsx      # novo menu e âncoras
  cycle-table.tsx           # nova tabela semântica
  cycle-results.tsx         # loading/empty/error/tabela
  cycle-item.tsx            # conteúdo/ações reaproveitadas
  cycle-filter.tsx           # seletor existente
  cycle-form.tsx             # seção de cadastro existente
apps/web/tests/functional/
apps/web/tests/visual/
apps/web/tests/a11y/
specs/003-menu-lateral-tabela-ciclos/validation/
```

**Structure Decision**: manter App Router e componentes da feature. Menu guarda estado apenas em memória. Tabela HTML nativa evita dependência e mantém associação de cabeçalhos.

## Design decisions

Pesquisa em [research.md](research.md); estado transitório em [data-model.md](data-model.md); contrato em [contracts/ui-contract.md](contracts/ui-contract.md); execução em [quickstart.md](quickstart.md).

- Desktop: expandido/compacto. Mobile: painel fechado inicialmente, overlay ao abrir, Escape/fechar/seleção encerram, retorno de foco ao acionador quando fechamento sem navegação.
- Âncoras nomeadas preservam a mesma rota e dados do formulário.
- Tabela ordena colunas Título/Período/Situação/Ações; container contém overflow horizontal.
- Não exibir descrição ou histórico que a lista atual não exibe.
- Baseline só muda após avaliação humana registrada; CI usa `--update-snapshots=none`.

## Delivery

Setup e testes de caracterização → US1 tabela → US2 menu → US3 responsividade integrada → polish de acessibilidade, browsers, referências e documentação. US1 é MVP funcional independente; aceite completo requer as três histórias.
