# Modelo de dados — Gestão de Objetivos

## Agregado ciclo

`PdiCycle` continua sendo o agregado proprietário. Um ciclo `OBJECTIVES` possui uma coleção ordenada de `DevelopmentObjective`; um ciclo `LEGACY` não recebe objetivos estruturados nesta entrega.

| Campo | Regra |
| --- | --- |
| `id`, `ownerId`, `startDate`, `endDate`, `status`, `version` | Campos existentes preservados. Todas as operações confirmam proprietário e versão. |
| `objectives` | Coleção de zero ou mais objetivos estruturados no ciclo `OBJECTIVES`. |
| `objectiveSummary` | Valor derivado: total, concluídos e pendentes. Pendentes são apenas planejados/em andamento. |

O estado do ciclo deve incluir `PAUSED` para atender a SPEC-007, preservando as transições e histórico existentes; a transição permitida deve ser explicitada no domínio antes da implementação.

## Objetivo de desenvolvimento

| Campo | Regras |
| --- | --- |
| `id` | Identificador estável, único dentro do ciclo. |
| `title` | Obrigatório, texto não vazio após trim. |
| `description`, `motivation` | Opcionais. |
| `successCriterion` | Obrigatório, texto não vazio após trim. |
| `dueDate` | Obrigatório e inclusivo entre `startDate` e `endDate` do ciclo. |
| `priority` | `LOW`, `MEDIUM` ou `HIGH`; valor inicial `MEDIUM`. |
| `status` | `PLANNED`, `IN_PROGRESS`, `COMPLETED` ou `CANCELLED`. Estados finais são imutáveis. |
| `measurementType` | `QUANTITATIVE` ou `QUALITATIVE`. |
| `createdAt`, `updatedAt`, `completedAt` | Rastreabilidade; `completedAt` somente na conclusão. |
| `completionResult` | Resultado efetivamente alcançado informado na confirmação de conclusão. |

## Mensuração quantitativa

| Campo | Regra |
| --- | --- |
| `indicatorName`, `unit` | Obrigatórios e não vazios. |
| `initialValue`, `targetValue` | Números finitos, diferentes entre si. Definem a direção: alvo maior é crescente; menor é decrescente. |
| `currentValue` | Número finito opcional; sem ele, progresso é indisponível. |
| `progressPercent` | Derivado, nunca persistido; limitado de 0 a 100. |

## Mensuração qualitativa

| Campo | Regra |
| --- | --- |
| `criteria` | Lista de um ou mais critérios observáveis não vazios. |
| `criterion.status` | `NOT_STARTED`, `OBSERVING` ou `MET`. |
| `resultDescription` | Registro descritivo opcional, editável enquanto o objetivo não estiver encerrado e o ciclo permitir. |

## Valores derivados

| Valor | Definição |
| --- | --- |
| `isOverdue` | `dueDate` anterior à data corrente e status diferente de `COMPLETED`/`CANCELLED`. |
| `progressPercent` | `clamp(0, 100, ((current - initial) / (target - initial)) * 100)` quando todos os valores existem e o denominador não é zero. |
| `summary.total` | Todos os objetivos do ciclo. |
| `summary.completed` | Objetivos com status `COMPLETED`. |
| `summary.pending` | Objetivos `PLANNED` ou `IN_PROGRESS`. |

## Transições e permissões

| Contexto | Ações permitidas |
| --- | --- |
| Ciclo rascunho | Criar e editar planejamento. |
| Ciclo ativo | Criar/editar, iniciar, atualizar resultados, concluir e cancelar objetivos não terminais. |
| Ciclo pausado | Criar e editar planejamento; bloquear resultados, conclusão e cancelamento. |
| Ciclo concluído/cancelado | Somente consulta. |
| Objetivo planejado | Editar e iniciar; cancelar quando o ciclo permitir. |
| Objetivo em andamento | Editar, atualizar resultado, concluir ou cancelar quando o ciclo permitir. |
| Objetivo concluído/cancelado | Somente consulta. |

## Persistência e compatibilidade

O envelope local v3 deve manter a fonte/migração v1 e a coleção de ciclos existente. A leitura de v2 deve produzir ciclos válidos antes da escrita v3. Textos de `objectives` v2 permanecem o planejamento histórico do ciclo e não são transformados em objetivos estruturados sem dados obrigatórios. Falha de decodificação, IDs duplicados, dono divergente ou versão concorrente devem falhar sem sobrescrever armazenamento válido.
