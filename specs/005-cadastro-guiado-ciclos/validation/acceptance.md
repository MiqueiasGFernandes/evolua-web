# Aceitação — estado em 2026-11-08

## Implementação e automação

As tarefas T001–T040 estão marcadas como concluídas. A implementação foi validada por testes unitários, integração, lint, tipos, build, fluxos Chromium/Firefox, axe e smoke; os comandos e limitações estão em [automated.md](automated.md).

Os requisitos funcionais FR-001–020 e critérios SC-001–006 possuem cobertura automatizada e evidências por história em `us1.md` a `us4.md`. Migração versionada, preservação de v1, falhas de armazenamento e variantes legadas são cobertas pela suíte de domínio/integração. Não houve publicação; o escopo continua limitado ao protótipo local com `local-user` e localStorage.

## Pendências que impedem aceite final

1. T041: repetir a matriz E2E após instalar `libavif.so.13` para WebKit e concluir/revisar a suíte visual.
2. T042: executar e registrar revisão humana real com teclado e leitor de tela nos dois contextos. O smoke não a substitui; ver [manual-accessibility.md](manual-accessibility.md).
3. T043/T044: consolidar os retestes acima e só então declarar a Definition of Done satisfeita.

Capturas em `validation/` são evidências de regressão e não aprovação automática de baseline. Portanto, a aceitação final permanece pendente.
