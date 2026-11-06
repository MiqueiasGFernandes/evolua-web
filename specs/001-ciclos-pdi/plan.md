# Implementation Plan: Gerenciamento de Ciclos de PDI

**Branch**: `001-ciclos-pdi` | **Date**: 2026-11-06 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-ciclos-pdi/spec.md`

## Summary

Implementar o gerenciamento de ciclos em monorepositório com `apps/web`, `apps/api` e `packages/api-contract`. O contrato OpenAPI 3.1 será canônico antes dos consumidores/provedores. Na primeira etapa, a fonte de dados do frontend será um adapter mock local persistido em `localStorage`, permitindo validar os fluxos sem depender da API real. Posteriormente, esse adapter será substituído por uma implementação HTTP real através da mesma porta, sem alterar componentes, hooks ou regras de apresentação. O frontend usará arquitetura feature-based, Next.js App Router, TypeScript strict, TanStack Query, React Hook Form, Zod, Orval, MSW, Vitest, Testing Library e Playwright. O backend manterá domínio independente de FastAPI/PostgreSQL, com transações e controle de exclusividade ACTIVE e conflitos de edição.

## Technical Context

**Language/Version**: TypeScript strict/Node.js LTS e Python 3.12+; versões exatas fixadas nos manifests.

**Primary Dependencies**: Next.js, React, Tailwind, shadcn/ui, React Hook Form, Zod, TanStack Query, Fetch, Orval, MSW, Vitest, Testing Library, Playwright, ESLint, Prettier, pnpm, FastAPI, pytest e PostgreSQL.

**Version Policy**: Usar versões estáveis compatíveis no momento da implementação, registradas e fixadas nos manifests e lockfiles. A baseline de compatibilidade é Next.js/React/TypeScript no frontend, Python 3.12+/FastAPI no backend, OpenAPI 3.1, PostgreSQL suportado pelo backend e Node.js LTS; mudanças de major version exigem validação de compatibilidade e ADR quando afetarem arquitetura.

**Storage**: PostgreSQL com migrações versionadas; datas de ciclo sem horário e timestamps em UTC.

**Initial Data Source**: adapter mock local com persistência em `localStorage` no frontend; a persistência é apenas para desenvolvimento/prototipação e não substitui PostgreSQL nem representa armazenamento de produção.

**Testing**: Vitest/Testing Library, pytest, MSW, Playwright e comparação semântica do OpenAPI canônico com o schema do backend.

**Target Platform**: Navegadores modernos, teclado e tecnologias assistivas; API em ambiente Linux do MVP.

**Project Type**: Monorepositório web com frontend, API e contrato compartilhado.

**Performance Goals**: Fluxos principais responsivos em uso normal; metas de p95/capacidade serão definidas com ambiente de referência.

**Constraints**: Paginação padrão 20 e máxima 100; no máximo um ACTIVE por usuário; edições conflitantes rejeitadas; sem exposição de terceiros; autenticação completa fora desta feature.

**Scale/Scope**: Produto individual inicialmente, preparado para múltiplos usuários; volume baixo/moderado, sem microsserviços, mensageria ou cache distribuído.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **SDD**: PASS — design rastreia RF/RB/SC da especificação.
- **Clean Architecture/modularidade**: PASS — monólito modular, domínio isolado e adapters explícitos.
- **DDD**: PASS — ciclo e histórico terão invariantes e transições no domínio/aplicação.
- **Simplicidade**: PASS — sem estado global adicional, microsserviços ou abstrações especulativas.
- **Testes**: PASS — unitário, integração, contrato, concorrência e E2E.
- **Segurança/privacidade**: PASS — identidade na boundary e queries escopadas ao proprietário.
- **Persistência**: PASS — transações, migrações, unicidade e controle de conflito.
- **IA**: PASS — nenhum módulo de IA é necessário.
- **Contratos**: PASS — OpenAPI versionado e comparação semântica.
- **UX/acessibilidade**: PASS — feedback claro e testes de teclado.
- **Operação**: PASS — logs estruturados sem dados sensíveis e baixa complexidade operacional.
- **Governança**: PASS — ADRs para mudanças arquiteturais relevantes.

## Project Structure

### Documentation (this feature)

```text
specs/001-ciclos-pdi/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/openapi.yaml
└── tasks.md                 # criado por $speckit-tasks
```

### Source Code (repository root)

```text
apps/
├── web/
│   ├── src/app/(app)/pdi-cycles/
│   ├── src/features/pdi-cycles/{components,hooks,schemas,utils,tests}/
│   ├── src/components/{ui,layout}/
│   ├── src/lib/{api,query,utils}/
│   ├── src/providers/
│   ├── src/test/{mocks,fixtures,setup.ts}/
│   └── e2e/{fixtures,mocked,integration}/
└── api/
    ├── src/modules/pdi_cycles/{domain,application,adapters}/
    ├── src/shared/{auth,errors,observability}/
    ├── src/entrypoints/http/
    └── tests/{unit,integration,contract}/
packages/api-contract/
├── openapi.yaml
├── schemas/
└── scripts/
```

**Structure Decision**: O frontend separa componentes genéricos de `features/pdi-cycles`; o backend separa domínio, casos de uso e adapters; o contrato é independente dos modelos internos. Arquivos Orval gerados não serão editados manualmente.

### Data source migration strategy

- Definir uma porta de ciclos com operações de criação, listagem, detalhe, edição e transições de status.
- Implementar primeiro um adapter mock local que armazena dados serializados em `localStorage`, com isolamento por identidade de teste e comportamento determinístico para os cenários da especificação.
- Manter a porta independente de `localStorage`, TanStack Query, Fetch e detalhes de UI.
- Implementar depois um adapter HTTP real baseado no cliente Fetch e nos artefatos Orval, consumindo a API definida em `contracts/openapi.yaml`.
- Selecionar o adapter por configuração de ambiente explícita; o adapter mock MUST NOT ser habilitado em produção.
- Os testes de domínio e componentes MUST poder usar o mock sem depender da API; testes de contrato e integração MUST validar o adapter HTTP quando ele existir.
- O mock MUST respeitar as mesmas regras observáveis da especificação, incluindo paginação, histórico, exclusividade de ACTIVE, idempotência e rejeição de edições conflitantes.

## Implementation Design

### Contract-first

1. Definir/revisar `packages/api-contract/openapi.yaml`.
2. Validar OpenAPI 3.1, schemas e exemplos.
3. Gerar tipos, funções, hooks TanStack Query e handlers MSW com Orval.
4. Implementar o backend conforme o contrato.
5. Comparar semanticamente o OpenAPI exportado pelo backend com o contrato canônico.
6. Integrar o frontend pelo cliente Fetch centralizado e artefatos gerados.

### API surface

Documentar POST/GET `/api/v1/pdi-cycles`, GET/PATCH `/api/v1/pdi-cycles/{id}` e actions `activate`, `complete`, `cancel`. Cada operação terá operationId estável, tags, autenticação, Problem Details RFC 9457 e exemplos. UUID identifica ciclos; datas usam `date`; histórico usa `date-time` em UTC.

### Concurrency and integrity

Ativação e encerramento serão transacionais. A exclusividade ACTIVE será garantida no domínio e na persistência. Edição usará versão/condição de atualização; versão desatualizada será rejeitada sem sobrescrita. Repetição segura de actions não criará histórico duplicado.

### Frontend behavior

O módulo terá lista paginada, filtro, loading/empty/error, formulário, detalhe, histórico e ações condicionadas ao status. Zod/RHF cuidarão da experiência de entrada; o backend continuará autoridade. TanStack Query cuidará de cache, invalidação e mutations. Timestamps serão exibidos no fuso do usuário e datas de ciclo sem horário.

### Authentication boundary

Autenticação não será implementada nesta feature. Um adapter fornecerá identidade autenticada ao caso de uso; o proprietário nunca virá arbitrariamente do payload. Testes usarão identidade explícita de teste, nunca habilitada em produção.

## Complexity Tracking

Não há violações da Constituição. Contrato compartilhado, geração de cliente, controle de concorrência e comparação de schemas são necessários para cumprir o escopo e reduzir divergência entre frontend e backend.

