# Modelo de dados — SPEC-005

## Agregado Ciclo

Campos comuns preservados: `id`, `ownerId`, `durationType` (`TRIMESTER|SEMESTER|YEAR|CUSTOM`), `startDate`, `endDate` (ISO YYYY-MM-DD), `status`, `version`, `createdAt`, `updatedAt`, `history`. Datas de período não têm horário; timestamps de auditoria continuam instantes ISO. `version` continua controle de concorrência do registro, não versão de schema.

União discriminada planejada:

| Variante | Conteúdo específico | Regra |
| --- | --- | --- |
| `LEGACY` | `title: string`, `description: string|null`; sem objetivos | Manter regras históricas e valores originais |
| `OBJECTIVES` | `objectives: string[]`; sem título/descrição | Pelo menos um texto não vazio após trim; ordem preservada |

A leitura v1 adiciona o discriminante em memória, sem alterar texto, período, status ou histórico armazenados. Não preencher objetivos com título/descrição. A identificação visual de novos ciclos usa o período; legados continuam mostrando título e acesso aos textos históricos. Textos são renderizados como texto, sem HTML interpretado.

## Entradas e validação

- `CreateCycleInput`: `durationType`, `startDate`, `endDate` efetivo, `objectives`. Não derivar o tipo por Omit da entidade inteira. Rejeitar campos de título/descrição e valores desconhecidos na fronteira.
- Objetivos são trimados na criação; rejeitar lista vazia e cada item vazio, sem filtrar itens silenciosamente. Preservar duplicatas e ordem: não foi solicitada regra de unicidade. Não introduzir limite de negócio de quantidade/comprimento sem requisito.
- Datas devem ser datas reais, de quatro dígitos de ano, com fim posterior ao início. Em períodos predefinidos calcular a partir do início e exigir que o término fornecido corresponda ao derivado; em CUSTOM usar término manual. Não aplicar isso retroativamente ao legado.
- `UpdateCycleInput` separado: união por variante. Legados mantêm atualização de título/descrição/período com regras históricas (título 3–120; descrição até 2000; fim posterior ao início e duração informativa). Novos registros permitem somente ajustes de período já abrangidos pela porta, mantendo objetivos existentes; edição de objetivos após criação não é adicionada. Sempre validar o registro resultante e `expectedVersion`.
- Validação produz erros identificáveis por campo e por índice de objetivo, com mensagem utilizável na apresentação; o domínio não depende de React/DOM.

## Calendário

Somar diretamente 3, 6 ou 12 meses ao mês/ano do início, mantendo dia quando possível; se inexistente usar último dia do destino. Não somar sequencialmente meses a resultados já truncados. Ao trocar duração, recalcular a partir do início original. Falta de início ou resultado fora de 0001–9999 impede avançar.

| Início | Duração | Término |
| --- | --- | --- |
| 2026-01-10 | TRIMESTER | 2026-04-10 |
| 2026-01-31 | TRIMESTER | 2026-04-30 |
| 2024-02-29 | YEAR | 2025-02-28 |
| 2023-08-31 | SEMESTER | 2024-02-29 |
| 2026-11-30 | TRIMESTER | 2027-02-28 |

## Ciclo de vida preservado

Criação → DRAFT, versão 1 e um evento inicial com proprietário. DRAFT → ACTIVE ou CANCELLED; ACTIVE → COMPLETED ou CANCELLED. No máximo um ACTIVE por proprietário. COMPLETED/CANCELLED imutáveis. Transições de legados não revalidam objetivos nem recalculam datas. A atualização mantém verificação de versão e autorização por proprietário existentes.

## Estado transitório do wizard

`step: PERIOD|OBJECTIVES|REVIEW`, início vazio, duração inicial TRIMESTER, término manual/derivado, linhas de objetivo com chave estável apenas de UI, erros, dirty, envio e confirmação de descarte. Iniciar com uma linha vazia; ela não é um objetivo válido nem alteração do usuário. Chaves não são persistidas.

Avançar valida somente a etapa; confirmar revalida tudo. Voltar preserva valores. Ao trocar automático → CUSTOM, usar o término calculado como valor inicial editável; ao retornar ao automático, recalcular, sem restaurar término manual antigo. Dirty compara valores editáveis à abertura, sem contar apenas troca de etapa/foco. Depois de salvar, limpar dirty antes da saída. Nenhuma etapa grava estado no repositório; recarga não restaura rascunho incompleto.

Persistência e fronteiras estão em [contrato de compatibilidade](contracts/persistence-and-contracts.md).
