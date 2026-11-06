# Phase 1 — Guia de validação futura

Este guia descreve execução **após a implementação dos incrementos e da infraestrutura de testes**. Hoje não há configuração Playwright/axe, Tailwind/shadcn ou novos componentes instalada por este plano. Não executar atualização de screenshots com base apenas na prévia gerada.

## Pré-requisitos

- Dependências atuais do workspace instaladas com gerenciador do projeto; Next/React existentes preservados.
- Incremento de validação entregue com `@playwright/test`, axe, configuração, browsers e ambiente canônico fixados; script lint compatível configurado.
- Fontes locais licenciadas e carregadas; tokens da [direção A](design-system.md).
- Referências detalhadas aprovadas para a superfície/estado em revisão; baselines aprovados quando o cenário comparar pixels. Criar um baseline também exige revisão.
- Fixtures sintéticas isoladas e harness de estados somente em bundle de teste, conforme [visual-tests.md](visual-tests.md).

## Comandos existentes de referência

Na raiz do repositório:

```text
pnpm dev
pnpm test
pnpm typecheck
pnpm build
```

Esperado: página atual em `/pdi-cycles`, testes de domínio preservados e verificações técnicas válidas na entrega. O plano não executou esses comandos como prova de uma UI ainda não implementada. O diagnóstico anterior registrou quatro testes passando. `pnpm lint` só deve ser gate após corrigir/configurar sua base atual; não presumir que `next lint` sem configuração esteja válido.

## Comandos propostos após setup de testes

Executar instalação de browsers conforme a versão fixada e os requisitos do ambiente. Não instalar nada nesta fase de planejamento.

```text
pnpm --filter web exec playwright install --with-deps chromium firefox webkit
pnpm --filter web exec playwright test --grep @functional
pnpm --filter web exec playwright test --grep @a11y
pnpm --filter web exec playwright test --grep @visual --project=chromium-visual --update-snapshots=none
pnpm --filter web exec playwright test --project=chromium-states --update-snapshots=none
pnpm --filter web exec playwright show-report
```

Os nomes de projetos/tags são o contrato proposto para a configuração futura; sem os arquivos dessa implementação, os comandos não funcionarão. WebServer de teste deverá iniciar build/servidor apropriado em contextos separados para real/harness. Não reutilizar um servidor com dados do navegador pessoal.

## Roteiros de validação

| Passo | Ação | Resultado esperado |
| --- | --- | --- |
| 1 | Abrir `/` em contexto vazio | Redireciona, formulário completo e vazio inicial distinto de erro |
| 2 | Apenas por teclado, preencher título/período válidos, sem descrição, e criar | Rascunho persistido, confirmação anunciada, formulário limpo após sucesso |
| 3 | Recarregar, iniciar, concluir; repetir com outro ciclo para cancelar | Mesmos dados e transições válidas; encerrados sem ações; histórico existente preservado |
| 4 | Criar dois rascunhos, iniciar um, tentar iniciar outro | Segundo ativo recusado com mensagem contextual; nenhum dado indevido |
| 5 | Filtrar cada estado e criar sob filtro Ativo | Filtro preservado, confirmação clara mesmo quando rascunho não aparece |
| 6 | Datas iguais/invertidas e campos ausentes | Erro associado e foco lógico; valores mantidos |
| 7 | Conteúdo de 120 caracteres sem espaços e lista de 20 itens | Todas as dimensões da matriz sem overflow/corte/sobreposição |
| 8 | Harness com leitura/envio pendentes e falhas | Busy/disabled sem repetição; erro não vira vazio; resultados anunciados corretamente |
| 9 | Axe, teclado, leitor de tela, ampliação e aparelho real | Cumprimento das verificações aplicáveis, com evidências e limites registrados |
| 10 | Comparar candidatos às referências aprovadas | Diferenças revisadas, requisitos rastreados e nenhum baseline alterado sem autorização específica |

## Aprovação e publicação de resultados

Guardar relatório, traces, imagens candidatas e diffs. Registrar resultados de V-01–V-11, SC-001–008 e AE-001–005 com responsável e data. Aprovado significa verificado; indisponível ou não executado continua pendente. Se surgirem bugs anteriores de negócio, registrar fora deste refinamento em vez de alterar regras para fazer o roteiro passar.

Após aprovação do conjunto exato de imagens, usar atualização delimitada compatível com a versão fixada de Playwright e revisar o diff no controle de versão. Não há comando de atualização em lote neste guia; CI permanece em modo sem atualização. Regras completas em [visual-tests.md](visual-tests.md) e [contrato da UI](contracts/ui-contract.md).
