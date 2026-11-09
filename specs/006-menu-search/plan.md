# Implementation Plan: Busca nas opções do menu

**Branch**: `006-menu-search` | **Date**: 2026-11-08 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/006-menu-search/spec.md`

## Summary

Adicionar uma pesquisa temporária que filtra durante a digitação as opções de navegação existentes. A busca aparece abaixo da marca somente no menu expandido e no painel móvel aberto; não cria destinos, não persiste o termo e não muda URLs. A lista de opções e a normalização da consulta serão compartilhadas entre barra lateral e painel móvel, preservando links, estado ativo e ações existentes.

## Technical Context

**Language/Version**: TypeScript 5, React 19 e Next.js 15

**Primary Dependencies**: React, Next.js, Radix UI Icons; componentes internos Button/Input; `cn`

**Storage**: N/A — consulta efêmera em memória do componente, sem URL, perfil ou localStorage

**Testing**: Vitest + Testing Library; Playwright funcional, acessibilidade/axe e visual

**Target Platform**: Navegadores desktop e móveis suportados pela aplicação web

**Project Type**: Aplicação web monolítica de frontend

**Performance Goals**: Atualizar os resultados em até 200 ms após cada entrada; filtrar localmente o pequeno conjunto de opções já renderizadas

**Constraints**: Sem dependência nova, rede, persistência, destino novo ou mudança de rota; pesquisa inacessível no modo mínimo; foco e anúncio acessíveis; preservar navegação atual

**Scale/Scope**: Uma navegação de ciclos, inicialmente duas opções; desenho deve acompanhar futuras opções da mesma lista sem duplicar dados

## Constitution Check

**Antes da pesquisa — PASSA**

- SDD: a especificação contém cenários, requisitos e métricas rastreáveis.
- Arquitetura/simplicidade: alteração restrita ao componente de navegação e estilos/testes já existentes; não introduz serviço, API ou armazenamento.
- Qualidade e testes: o plano inclui testes de normalização, fluxos, regressão, teclado, axe e viewport.
- Privacidade: a consulta não sai do navegador e não é persistida.
- Acessibilidade: campo nomeado, resultado anunciado, foco visível, armadilha de foco móvel corrigida e ausência da busca no menu mínimo são requisitos explícitos.

**Após o design — PASSA**

Os artefatos de design mantêm a consulta como estado transitório, preservam os contratos de links e definem validação acessível. Não há violação que exija justificativa de complexidade.

## Project Structure

### Documentation (this feature)

```text
specs/006-menu-search/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/ui-contract.md
└── tasks.md             # criado por speckit-tasks
```

### Source Code (repository root)

```text
apps/web/
├── src/
│   ├── app/globals.css
│   ├── components/ui/input.tsx
│   └── features/pdi-cycles/components/cycle-navigation.tsx
└── tests/
    ├── functional/cycle-navigation.spec.ts
    ├── a11y/dashboard.spec.ts
    └── visual/dashboard-layout.spec.ts
```

**Structure Decision**: A feature belongs to the existing PDI cycles navigation. It reuses its UI primitives and adds no backend or new module boundary.

## Complexity Tracking

Nenhuma violação de constituição ou complexidade adicional a justificar.
