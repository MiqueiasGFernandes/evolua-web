# US2 — Calendário

2026-11-08, workspace sobre edec506. `pnpm test`: exit 0, inclui calendário (7 casos) e etapa de período. `TZ=Pacific/Honolulu pnpm --filter web exec vitest run src/features/pdi-cycles/tests/cycle-calendar.test.ts`: exit 0, 7 casos.

`pnpm --filter web exec playwright test tests/functional/cycle-period.spec.ts --project=chromium-functional --workers=1`: exit 0, 2 testes, modal e página. Confirmados 31/01/2026 → 30/04/2026, 29/02/2024 → 28/02/2025, transferência para Personalizado e rejeição de término igual ao início. Unitários cobrem datas impossíveis, ano 0001, overflow após 9999 e término automático adulterado.
