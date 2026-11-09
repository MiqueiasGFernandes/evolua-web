# US4 — Conclusão guiada

2026-11-08, workspace sobre edec506. `pnpm test` inicial: exit 0, incluindo retorno/revisão, pending, write-error/retry e descarte.

`pnpm --filter web exec playwright test tests/functional/cycle-create-flow.spec.ts tests/functional/cycles-characterization.spec.ts tests/a11y/cycle-wizard.spec.ts --project=chromium-functional --workers=1`: execução final exit 0, 12 testes. Criação única pelos dois hosts, recarga, filtro excludente/coleção de 21 registros, ID ausente, falha de refresh após commit, legado/transições, axe, Escape/backdrop e saída pelo menu móvel.

Falhas observadas e corrigidas antes do reteste: seletor ambíguo de objetivo; menu móvel encobrindo confirmação; preenchimento pré-hidratação perdido na página; modal sem centralização por reset CSS. Campos agora aguardam montagem; menu fecha antes de solicitar saída; modal usa margin auto. Nenhuma revisão humana inferida desses testes.
