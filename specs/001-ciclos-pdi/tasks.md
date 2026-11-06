---
description: "Task list for SPEC-001"
---

# Tasks: Gerenciamento de Ciclos de PDI

**Input**: Design documents from `/specs/001-ciclos-pdi/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/openapi.yaml, quickstart.md

## Phase 1: Setup

- [X] T001 Create pnpm workspace with `apps/web`, `apps/api` and `packages/api-contract` in `pnpm-workspace.yaml`.
- [X] T002 [P] Initialize Next.js App Router TypeScript strict project in `apps/web/package.json` and `apps/web/tsconfig.json`.
- [ ] T003 [P] Initialize Python FastAPI project with independent dependency management in `apps/api/pyproject.toml`.
- [ ] T004 [P] Configure Tailwind, shadcn/ui, ESLint, Prettier, Vitest and Playwright in `apps/web/`.
- [ ] T005 [P] Configure pytest, test markers and shared test settings in `apps/api/pyproject.toml`.
- [ ] T006 [P] Register stable dependency versions and lockfiles for frontend, backend and contract tooling in `apps/web/package.json`, `apps/api/pyproject.toml` and `pnpm-lock.yaml`.

## Phase 2: Foundational

- [ ] T007 Define canonical OpenAPI 3.1 contract, schemas, error Problem Details, security, pagination and operationIds in `packages/api-contract/openapi.yaml`.
- [ ] T008 [P] Add OpenAPI validation and semantic backend-schema comparison scripts in `packages/api-contract/scripts/`.
- [ ] T009 [P] Configure Orval generation for TypeScript types, Fetch client, TanStack Query hooks and MSW handlers in `apps/web/orval.config.ts`.
- [ ] T010 [P] Create shared HTTP client, environment configuration and error normalization in `apps/web/src/lib/api/`.
- [X] T011 [P] Create feature port for cycle operations in `apps/web/src/features/pdi-cycles/ports/pdi-cycle-repository.ts`.
- [X] T012 Implement localStorage adapter behind the port, with test identity isolation and deterministic serialization, in `apps/web/src/features/pdi-cycles/adapters/local-storage-pdi-cycle-repository.ts`.
- [ ] T013 [P] Create FastAPI entrypoint, routing, error handling, structured logging and authentication boundary in `apps/api/src/entrypoints/http/`.
- [ ] T014 [P] Create domain/application/shared module structure in `apps/api/src/modules/pdi_cycles/`.
- [ ] T015 [P] Create PostgreSQL migration configuration and environment settings in `apps/api/`.
- [ ] T016 Configure CI jobs for lint, format, typecheck, unit, integration, contract and E2E checks in `.github/workflows/ci.yml`.

## Phase 3: User Story 1 - Criar ciclo (P1) 🎯 MVP

**Goal**: Criar ciclo próprio válido em DRAFT usando inicialmente o adapter localStorage.

**Independent Test**: Criar ciclo válido e confirmar DRAFT, UUID, proprietário e persistência local.

- [ ] T017 [P] [US1] Write domain tests for title 3–120, description max 2.000, date ordering and initial DRAFT in `apps/api/tests/unit/test_pdi_cycle_creation.py`.
- [ ] T018 [P] [US1] Write frontend schema and adapter tests for valid/invalid creation in `apps/web/src/features/pdi-cycles/tests/create-cycle.test.ts`.
- [ ] T019 [P] [US1] Define PdiCycle and StatusHistory domain entities with UUID, owner, dates, status and version in `apps/api/src/modules/pdi_cycles/domain/entities.py`.
- [ ] T020 [US1] Implement create-cycle use case and repository port in `apps/api/src/modules/pdi_cycles/application/create_cycle.py`.
- [X] T021 [US1] Implement localStorage create operation with atomic serialization in `apps/web/src/features/pdi-cycles/adapters/local-storage-pdi-cycle-repository.ts`.
- [ ] T022 [US1] Implement create form with React Hook Form and Zod in `apps/web/src/features/pdi-cycles/components/create-cycle-form.tsx`.
- [ ] T023 [US1] Connect create form to the feature port and show validation/loading/success/error states in `apps/web/src/features/pdi-cycles/hooks/use-create-pdi-cycle.ts`.
- [ ] T024 [US1] Implement POST endpoint according to `contracts/openapi.yaml` in `apps/api/src/entrypoints/http/pdi_cycles.py`.
- [ ] T025 [US1] Add E2E creation scenario in `apps/web/e2e/integration/create-pdi-cycle.spec.ts`.

## Phase 4: User Story 2 - Consultar ciclos próprios (P1)

**Goal**: Listar, filtrar, paginar e detalhar somente ciclos do proprietário.

**Independent Test**: Consultar ciclos próprios e confirmar filtro, paginação 20/100, vazio e isolamento.

- [ ] T026 [P] [US2] Write repository/use-case tests for owner isolation, status filters and pagination in `apps/api/tests/unit/test_list_pdi_cycles.py`.
- [ ] T027 [P] [US2] Write MSW/component tests for loading, empty, error, filter and pagination states in `apps/web/src/features/pdi-cycles/tests/list-cycles.test.tsx`.
- [ ] T028 [US2] Implement list-cycle use case with owner scope, status filter and page size default 20/max 100 in `apps/api/src/modules/pdi_cycles/application/list_cycles.py`.
- [ ] T029 [US2] Implement get-cycle detail use case including ordered history in `apps/api/src/modules/pdi_cycles/application/get_cycle.py`.
- [X] T030 [US2] Implement localStorage list/detail with owner scope and deterministic pagination in `apps/web/src/features/pdi-cycles/adapters/local-storage-pdi-cycle-repository.ts`.
- [ ] T031 [US2] Build list, filter, pagination and empty/error UI in `apps/web/src/features/pdi-cycles/components/cycle-list.tsx`.
- [ ] T032 [US2] Build cycle detail and status history UI in `apps/web/src/features/pdi-cycles/components/cycle-detail.tsx`.
- [ ] T033 [US2] Add GET list/detail endpoints and contract tests in `apps/api/src/entrypoints/http/pdi_cycles.py` and `apps/api/tests/contract/test_pdi_cycles_contract.py`.
- [ ] T034 [US2] Add E2E list/filter/pagination/detail/isolation scenarios in `apps/web/e2e/integration/list-pdi-cycles.spec.ts`.

## Phase 5: User Story 3 - Editar ciclo aberto (P1)

**Goal**: Editar DRAFT/ACTIVE e rejeitar encerrados e conflitos concorrentes.

**Independent Test**: Editar dados válidos, rejeitar inválidos, encerrados e versão obsoleta.

- [ ] T035 [P] [US3] Write tests for editable states, validation and stale-version conflict in `apps/api/tests/unit/test_update_pdi_cycle.py`.
- [ ] T036 [P] [US3] Write form tests for edit success, server error and conflict reload prompt in `apps/web/src/features/pdi-cycles/tests/edit-cycle.test.tsx`.
- [ ] T037 [US3] Implement update use case with version precondition and immutable terminal-state enforcement in `apps/api/src/modules/pdi_cycles/application/update_cycle.py`.
- [ ] T038 [US3] Implement localStorage optimistic version check and conflict error in `apps/web/src/features/pdi-cycles/adapters/local-storage-pdi-cycle-repository.ts`.
- [ ] T039 [US3] Build edit form and conflict feedback in `apps/web/src/features/pdi-cycles/components/edit-cycle-form.tsx`.
- [ ] T040 [US3] Add PATCH endpoint with 409 Problem Details for stale/conflicting edits in `apps/api/src/entrypoints/http/pdi_cycles.py`.
- [ ] T041 [US3] Add E2E edit and concurrent-conflict scenarios in `apps/web/e2e/integration/edit-pdi-cycle.spec.ts`.

## Phase 6: User Story 4 - Iniciar ciclo (P1)

**Goal**: Ativar DRAFT sem objetivos e garantir no máximo um ACTIVE por proprietário.

**Independent Test**: Ativar ciclo sem objetivos, testar repetição e concorrência.

- [ ] T042 [P] [US4] Write transition and concurrent activation tests in `apps/api/tests/unit/test_activate_pdi_cycle.py`.
- [ ] T043 [P] [US4] Write activation mutation/UI tests in `apps/web/src/features/pdi-cycles/tests/activate-cycle.test.tsx`.
- [ ] T044 [US4] Implement transition policy and transactional activate use case with atomic owner ACTIVE invariant in `apps/api/src/modules/pdi_cycles/application/activate_cycle.py`.
- [X] T045 [US4] Implement localStorage activation with equivalent exclusivity, idempotency and history behavior in `apps/web/src/features/pdi-cycles/adapters/local-storage-pdi-cycle-repository.ts`.
- [ ] T046 [US4] Add activate endpoint and conflict responses in `apps/api/src/entrypoints/http/pdi_cycles.py`.
- [ ] T047 [US4] Add activation action visibility, feedback and E2E concurrency scenario in `apps/web/e2e/integration/activate-pdi-cycle.spec.ts`.

## Phase 7: User Story 5 - Concluir ou cancelar ciclo (P1)

**Goal**: Encerrar ACTIVE por conclusão ou cancelamento, preservando histórico e imutabilidade.

**Independent Test**: Executar ambas as transições, repetir e tentar reativar/editar.

- [ ] T048 [P] [US5] Write completion/cancellation, invalid transition and atomic-history tests in `apps/api/tests/unit/test_close_pdi_cycle.py`.
- [ ] T049 [P] [US5] Write close-action UI tests in `apps/web/src/features/pdi-cycles/tests/close-cycle.test.tsx`.
- [ ] T050 [US5] Implement complete/cancel use cases with transaction and idempotency policy in `apps/api/src/modules/pdi_cycles/application/close_cycle.py`.
- [ ] T051 [US5] Implement localStorage complete/cancel operations with immutable terminal states in `apps/web/src/features/pdi-cycles/adapters/local-storage-pdi-cycle-repository.ts`.
- [ ] T052 [US5] Add complete/cancel endpoints and invalid-transition Problem Details in `apps/api/src/entrypoints/http/pdi_cycles.py`.
- [ ] T053 [US5] Add close actions and E2E completion/cancellation scenarios in `apps/web/e2e/integration/close-pdi-cycle.spec.ts`.

## Phase 8: User Story 6 - Consultar histórico encerrado (P2)

**Goal**: Consultar encerrados e sequência completa de status.

**Independent Test**: Encerrar ciclos e confirmar disponibilidade, ordenação e lista vazia.

- [ ] T054 [P] [US6] Write history persistence and ordered-query tests in `apps/api/tests/integration/test_status_history.py`.
- [ ] T055 [P] [US6] Write history rendering and UTC-to-user-timezone tests in `apps/web/src/features/pdi-cycles/tests/status-history.test.tsx`.
- [ ] T056 [US6] Implement historical query/filter behavior in `apps/api/src/modules/pdi_cycles/application/list_closed_cycles.py`.
- [ ] T057 [US6] Implement closed-cycle history presentation in `apps/web/src/features/pdi-cycles/components/status-history.tsx`.
- [ ] T058 [US6] Implement real HTTP adapter behind the existing port using generated Orval client in `apps/web/src/features/pdi-cycles/adapters/http-pdi-cycle-repository.ts`.
- [ ] T059 [US6] Add environment-based adapter selection, keeping localStorage disabled in production, in `apps/web/src/features/pdi-cycles/ports/create-pdi-cycle-repository.ts`.
- [ ] T060 [US6] Add E2E closed-history and timezone display scenario in `apps/web/e2e/integration/closed-pdi-cycles.spec.ts`.

## Phase 9: Polish & Cross-Cutting

- [ ] T061 [P] Add accessibility keyboard/focus/error announcements for cycle flows in `apps/web/src/features/pdi-cycles/`.
- [ ] T062 [P] Add structured operation logs without sensitive data in `apps/api/src/shared/observability/`.
- [ ] T063 [P] Add backend integration tests for owner isolation and transaction rollback in `apps/api/tests/integration/`.
- [ ] T064 [P] Add CI contract drift check and generated-file verification in `.github/workflows/ci.yml`.
- [ ] T065 Run every quickstart validation scenario and record evidence in `specs/001-ciclos-pdi/quickstart.md`.
- [ ] T066 Review Definition of Done, update affected documentation and record architecture decisions in `docs/adr/`.

## Dependencies & Execution Order

- Setup T001–T006 precedes Foundational T007–T016.
- Foundational blocks all stories.
- US1 is the MVP and precedes the UI integrations of US2–US6, though backend stories can be developed in parallel after shared foundation.
- US2–US5 are P1 and may proceed in parallel after T007–T016 if interfaces are stable.
- US6 depends on history behavior from US4/US5.
- Polish follows the desired story set.

## Parallel Opportunities

- T002–T006 can run in parallel.
- T008–T016 can run in parallel after contract decisions where applicable.
- Within each story, test tasks marked [P] can run in parallel with separate implementation files.
- US2, US3, US4 and US5 can be assigned to separate developers after the foundational phase.
- T061–T064 can run in parallel after story acceptance.

## Implementation Strategy

1. Complete Setup and Foundational.
2. Deliver US1 using localStorage mock as MVP.
3. Validate US1 independently.
4. Add listing/detail, editing, transitions and history incrementally.
5. Introduce the real HTTP adapter behind the same port.
6. Run contract drift, accessibility, concurrency and quickstart checks before completion.

