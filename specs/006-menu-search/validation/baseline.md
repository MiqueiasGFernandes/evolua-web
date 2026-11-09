# Baseline — 2026-11-08

- Revisão observada: `edec506483c14f9bf0ea2f2383831fce745afee3`; a árvore de trabalho contém os documentos ainda não rastreados da SPEC-006.
- `CycleNavigation` fornece a barra lateral desktop expansível/recolhível; `MobileCycleNavigation` abre um diálogo nativo em viewports menores que 1024 px.
- As opções de ciclos existentes são “Meus Ciclos” e “Novo Ciclo”, hoje definidas dentro de `CycleLinks` e reutilizadas pelos dois contextos.
- A barra lateral recolhida mantém ícones/links e oculta seus rótulos visualmente. Não existe campo de busca no desktop nem no diálogo móvel.
- Consumidores e regressões atuais: `cycle-navigation.spec.ts`, `dashboard.spec.ts`, `dashboard-layout.spec.ts`, `cycle-create-entry.spec.ts` e `cycle-wizard.spec.ts`.
- Baseline de validação: `pnpm test`, `pnpm lint` e `pnpm typecheck` haviam passado antes do início da SPEC-006; usar somente fixtures sintéticas nos testes subsequentes.
