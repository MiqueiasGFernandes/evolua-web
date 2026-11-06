# Data Model: refatoração e evidência de acessibilidade

A fonte de verdade dos dados de negócio continua sendo `apps/web/src/features/pdi-cycles/domain.ts`, a porta de repositório e o adaptador existentes. Nenhuma migração ou alteração de serialização é planejada.

## PdiCycle (existente)

| Campo | Forma existente | Regra preservada |
| --- | --- | --- |
| id / ownerId | string | identidade e vínculo com proprietário; consulta filtra o proprietário existente |
| title | string | mínimo de 3 caracteres após trim; máximo de 120 no valor de entrada |
| description | string ou null | opcional, até 2.000 caracteres |
| durationType | TRIMESTER, SEMESTER, YEAR, CUSTOM | opções existentes do formulário |
| startDate / endDate | string de data | campos date da UI; início/fim obrigatórios e fim posterior ao início |
| status | DRAFT, ACTIVE, COMPLETED, CANCELLED | criação em DRAFT; somente transições autorizadas |
| version | number | incremento em alteração; edição obsoleta rejeitada pelo contrato existente |
| createdAt / updatedAt | string | timestamps existentes |
| history | StatusHistory[] | histórico preservado; novo registro em criação/transição |

## StatusHistory (existente)

Campos: `id`, `fromStatus` (null na criação), `toStatus`, `occurredAt`, `actorId`. Pertence ao ciclo em `history`; esta refatoração não cria edição ou exclusão de registros.

### Invariantes e transições

- DRAFT → ACTIVE ou CANCELLED.
- ACTIVE → COMPLETED ou CANCELLED.
- COMPLETED/CANCELLED são estados finais, sem ações de transição na tabela.
- No máximo um ciclo ACTIVE por proprietário, conforme o adaptador atual.
- Valor, ordem e formato persistidos mantidos; chave `evolua:pdi-cycles:v1`.
- Consulta mantém os limites existentes: página inicial 1, tamanho padrão 20, intervalo aceito de tamanho 1–100.

## Estado de apresentação (transitório)

- Destino ativo: `meus-ciclos` ou `novo-ciclo`.
- Menu: expandido/compacto em desktop; dialog aberto/fechado abaixo de 1024 px.
- Grupo de navegação aberto/fechado; filtro vazio ou um CycleStatus.
- Formulário CreateCycleInput, erros de validação, criação pendente e conjunto de transições pendentes.
- Leitura `loading`/`ready`/`error`; feedback `info`/`success`/`warning`/`error`.
- Empilhamento da tabela é apresentação responsiva, sem duplicação de ciclos ou transformação do modelo de negócio.

## Registro de revisão de acessibilidade (documental)

Artefato de validação em Markdown; não é entidade da aplicação, tabela de banco nem valor em localStorage.

- Identificação: data, avaliador, revisão/commit ou descrição inequívoca do estado local, feature.
- Configuração: sistema e versão, navegador e versão, leitor de tela e versão, dispositivo/viewport, zoom e modo de navegação.
- Evidência por cenário: identificador do cenário, passos, resultado esperado, observado, estado e referências a achados/evidências.
- Estado: `pendente`, `aprovado` ou `reprovado`.
- Achado: reprodução, fluxo/critério afetado, impacto sobre execução/compreensão, correção e reteste associados à revisão do código.

O registro começa pendente; apenas execução real permite aprovar/reprovar. Correção posterior exige reteste; mudança material de código pode tornar uma aprovação anterior insuficiente. O contrato completo está em [accessibility-review.md](contracts/accessibility-review.md).
