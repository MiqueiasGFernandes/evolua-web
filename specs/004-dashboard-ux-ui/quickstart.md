# Quickstart: validação do dashboard após clarificação

**Estado**: guia de execução. A revisão manual com leitor de tela é obrigatória e ainda está pendente. Ver [contrato de revisão](contracts/accessibility-review.md) e [contrato de UI](contracts/ui-contract.md).

## Pré-requisitos

- Dependências instaladas com `pnpm install` na raiz e versões do projeto preservadas.
- Navegadores/dependências de sistema compatíveis com Playwright 1.57; navegadores podem ser preparados com `pnpm --filter web exec playwright install`.
- Perfil de navegador isolado e dados sintéticos; leitor de tela disponível para a execução manual, com navegador e versões registrados.

## Verificação automática

Executar na raiz do repositório, em sequência:

```bash
pnpm test
pnpm lint
pnpm build
pnpm typecheck
pnpm --filter web test:e2e:all --workers=2
pnpm --filter web test:visual --workers=1
```

Antes de `pnpm build`, encerrar os servidores de desenvolvimento/teste desta execução. Build e dev server compartilham `.next`; não executá-los simultaneamente. Os testes Playwright iniciam seu servidor quando necessário; executar um runner por vez para preservar os artefatos.

Resultados esperados: unitários, lint, build, tipos e E2E aprovados; axe sem violações dos critérios aplicáveis nos estados avaliados; seis larguras sem overflow da página. Em 320/390 px, confirmar explicitamente os quatro dados/ações na apresentação empilhada, sem depender de rolagem horizontal. Capturas não são baselines aprovados nem comprovam o anúncio pelo leitor de tela.

O relatório [acceptance.md](validation/acceptance.md) contém resultados históricos reais (8 unitários e 34 verificações de navegador), obtidos antes do novo critério manual. Estes comandos não foram reexecutados por este planejamento documental.

## Preparar a execução manual

1. Iniciar `pnpm dev` e abrir http://localhost:3000/pdi-cycles no perfil de teste. Registrar a configuração exigida no contrato antes de iniciar o roteiro.
2. Em perfil inicialmente vazio, verificar primeiro uso; escolher um status sem resultados e voltar a “Todos”.
3. Criar dados sintéticos pelos controles existentes. Para obter as quatro situações sem violar a exclusividade de ACTIVE: criar/iniciar/concluir um ciclo; criar/cancelar outro; criar/iniciar o terceiro; criar o quarto e mantê-lo como rascunho.
4. Preparar cenários independentes para as quatro transições e tentativa de segundo ACTIVE, preservando as invariantes descritas em [data-model.md](data-model.md).
5. Para falhas e loading não reproduzíveis de maneira estável, preparar fixture isolada usando a injeção existente de PdiCycleRepository em CycleDashboard. A preparação integra a próxima fase de tarefas: mesmo componente e semântica, fora do produto, sem nova rota funcional nem atrasos em produção. Não marcar M06 como aprovado antes de observar os estados reais com o leitor.

## Executar teclado e leitor de tela

Seguir M01–M07 em [accessibility-review.md](contracts/accessibility-review.md), registrando esperado e observado por cenário. Usar comandos de leitura de tabela, títulos e regiões disponíveis no leitor utilizado, além de Tab/Shift+Tab/Enter/Escape para controles.

- Ler cada ciclo e identificar período, situação e ações, em desktop e layout empilhado. Conferir cabeçalhos associados e ações com o nome do ciclo.
- Usar navegação, filtro, formulário e transições. Conferir instruções, obrigatoriedade, erros, sucesso e persistência.
- Abrir/fechar o menu móvel e redimensionar; conferir nome do diálogo, foco contido, fundo indisponível e destino de foco após fechar/navegar.
- Conferir ampliação e movimento reduzido nos fluxos, sem perder acesso a dados ou ações.

Aceitar anúncios equivalentes em significado; não exigir fala literal igual entre leitores. Registrar limitações de dispositivo real quando a revisão utilizar somente viewport emulado.

## Registrar, corrigir e concluir

Criar `validation/manual-accessibility.md` seguindo os campos do contrato. Cada cenário começa pendente e só muda após execução real. Registrar falha de ambiente como pendência; registrar falha do produto com reprodução, corrigir e retestar os fluxos afetados.

Comparar domínio/porta/adaptador/OpenAPI com o estado registrado em `validation/planning-state.json` se houver correção de código; manter `validation/protected-hashes.json` como baseline histórico. A diferença local de título do OpenAPI está classificada no registro e deve ser preservada. Atualizar a conclusão de aceitação apenas depois de satisfazer FR-011/SC-004; revisão visual/baselines permanecem sujeitas à aprovação específica definida em FR-010.

## Ambiente da execução automática anterior

O host Ubuntu 22.04 tinha WebKit instalado, mas faltavam `libavif13` e suas dependências `libgav1-0`/`libyuv0`. Pacotes oficiais foram extraídos em `/tmp/evolua-webkit-libs` e vinculados ao diretório `sys/lib` do cache do Playwright; não houve instalação global nem alteração de executáveis. Foi usado `LD_LIBRARY_PATH=/tmp/evolua-webkit-libs/extracted/usr/lib/x86_64-linux-gnu` para a validação anterior.

Esses caminhos e vínculos eram temporários e não são pré-requisitos reproduzíveis garantidos para uma nova sessão. Em cada host, preparar as dependências oficiais compatíveis antes de executar WebKit. A dependência de sistema do runner não pertence ao bundle da aplicação.

## Suporte isolado implementado

Executar `pnpm --filter web test:manual` e abrir http://127.0.0.1:4174. A faixa inicial controla os cenários: quatro situações, primeiro uso, leitura pendente, falha de leitura, falha de gravação e operação pendente. “Liberar operação pendente” conclui uma espera controlada; “Reiniciar cenário” cria um repositório novo em memória. Esses controles ficam fora do componente avaliado e não existem na aplicação de produção.

Executar `pnpm --filter web test:manual:smoke` para conferir a preparação automática. Esse smoke não representa a execução de M01–M07 por uma pessoa com leitor de tela. Para revisão: iniciar o Orca no ambiente gráfico disponível ao avaliador, acessar os fluxos com os comandos do leitor e registrar observações reais em `validation/manual-accessibility.md` e nos arquivos por história.
