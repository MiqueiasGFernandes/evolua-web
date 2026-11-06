# Quickstart — validação

Na raiz do repositório:

```bash
pnpm --filter web typecheck
pnpm --filter web lint
pnpm --filter web test
pnpm --filter web exec playwright test --project=chromium-functional
pnpm --filter web exec playwright test --project=firefox-functional --project=webkit-functional
pnpm --filter web exec playwright test tests/a11y --project=chromium-functional
pnpm --filter web exec playwright test tests/visual --project=chromium-visual --update-snapshots=none
```

Verificar com dados sintéticos: quatro status, sem ciclos, filtro sem resultado, título longo, cadastro e quatro transições. Em 1440×1000, 768×1024 e 390×844, usar âncoras, recolher/abrir menu e confirmar leitura de cabeçalhos. Em mobile, confirmar que overflow da tabela não aumenta `document.documentElement.scrollWidth`. Baselines não são atualizados durante comparação; revisão humana precede qualquer mudança.
