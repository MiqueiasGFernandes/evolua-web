# Revisão manual de acessibilidade

Status: pendente de execução real com leitor de tela. Avaliador, leitor/versão, SO, navegador/versão, configuração e observações serão registrados na execução.

| Cenário | Resultado | Evidência |
| --- | --- | --- |
| M01 | pendente | execução manual não realizada |
| M02 | pendente | execução manual não realizada |
| M03 | pendente | execução manual não realizada |
| M04 | pendente | execução manual não realizada |
| M05 | pendente | execução manual não realizada |
| M06 | pendente | execução manual não realizada |
| M07 | pendente | execução manual não realizada |

## Ambiente e limite observado

Orca 42.0 instalado; speech-dispatcher detectado. A ferramenta de interação não disponibiliza apps ou navegador e retorna “The browser access host is unavailable”. Não foi possível realizar a operação real do leitor nesta sessão. Avaliador e observações manuais não foram preenchidos.

Resultados por história: [US1](manual/us1.md), [US2](manual/us2.md), [US3](manual/us3.md). Todos os cenários M01–M07 continuam pendentes.

## Preparação disponível

`pnpm --filter web test:manual` inicia http://127.0.0.1:4174 com os componentes reais e dados em memória. A pessoa revisora deve usar o leitor de tela, executar o contrato e registrar configuração, passos, esperado e observado. A execução do smoke é evidência de preparação, não revisão humana.
