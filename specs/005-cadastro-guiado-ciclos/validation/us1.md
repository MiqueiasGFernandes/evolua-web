# US1 — Entradas

2026-11-08, workspace sobre edec506. `pnpm --filter web exec playwright test tests/functional/cycle-create-entry.spec.ts tests/functional/cycle-navigation.spec.ts tests/a11y/cycle-create-dialog.spec.ts --project=chromium-functional --workers=1`: exit 0, 7 testes. Modal, contenção/retorno de foco, menu desktop/móvel, página direta/recarga, skip link e texto ampliado verificados. A conclusão do cadastro é validada em US4.
