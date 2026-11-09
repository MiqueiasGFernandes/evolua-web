# Verificações automatizadas — execução de 2026-11-08

Base de revisão: `edec506483c14f9bf0ea2f2383831fce745afee3` (workspace com alterações da SPEC-005 ainda não commitadas). As verificações foram executadas sequencialmente e com dados sintéticos.

| Verificação | Comando | Resultado |
| --- | --- | --- |
| Unitário e integração | `pnpm test` | ✓ 33 testes, 10 arquivos |
| Lint | `pnpm lint` | ✓ exit 0 |
| Tipos | `pnpm typecheck` | ✓ exit 0 |
| Build | `pnpm build` | ✓ exit 0; Next.js 15.5.29, 6 páginas estáticas geradas |
| Fluxos Chromium | Playwright isolado em `127.0.0.1:3100`, 1 worker | ✓ entradas, período (modal/página), objetivos e 5 cenários de criação |
| Fluxo Firefox | mesmo runner, 1 worker | ✓ cenário de entrada/modal/rota direta |
| Axe e teclado Chromium | Playwright isolado, 1 worker | ✓ 5 cenários de dialog/wizard, incluindo axe |
| Smoke manual | `pnpm --filter web test:manual:smoke` | ✓ 3 cenários |

## Limitações e pendências

- A primeira tentativa contra `127.0.0.1:3000` encontrou uma instância Next preexistente que respondia 404 para `/pdi-cycles/new`. A validação foi repetida com uma instância isolada em `:3100`; os cenários listados acima passaram.
- O WebKit não iniciou: `MiniBrowser` não encontrou `libavif.so.13` (exit 127). Instalar a dependência de sistema e repetir `pnpm --filter web test:e2e:all --workers=1`.
- A suíte visual completa foi iniciada com snapshots existentes e os quatro primeiros cenários (modal/página em 320 e 390 px) passaram. Ela não foi concluída nesta sessão; repetir `pnpm --filter web test:visual --workers=1` e revisar os baselines sem atualizá-los automaticamente.
- Por essas duas pendências, T041 permanece aberta. Não houve alteração automática de snapshots nem publicação.
