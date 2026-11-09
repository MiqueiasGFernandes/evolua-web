# Baseline SPEC-005

Revisão inicial: edec506483c14f9bf0ea2f2383831fce745afee3, branch main. Trabalho prévio: diretório SPEC-005 não rastreado, preservado. `pnpm test`: exit 0, 14 testes em 5 arquivos.

Consumidores: domínio exige título; adaptador v1 revalida criação em update; CycleForm embutido no dashboard; navegação ancora #novo-ciclo; tabela/item e fixtures acessam title; harness e E2E usam formulário antigo. Compatibilidade será explícita, com fixtures históricas e backup v1. Nenhum dado pessoal será usado nos testes.

Ignore files: gitignore já cobre Node/Next/env/test-results; adicionar *.log; projeto privado, sem publicação npm, Docker, Terraform, Helm ou Prettier configurados. ESLint flat config cobre gerados Next/testes; adicionar dist/build/min.js.
