# Contrato de persistência e compatibilidade

## Repositório local

Manter porta `PdiCycleRepository`, com `create`, `list`, `get`, `update`, `transition`; tipos de criação e atualização passam a ser distintos. `list/get` retornam união LEGACY/OBJECTIVES. `list` mantém filtros, ordem, paginação (20 padrão, máximo 100) e metadados. `get/update/transition` continuam limitados ao proprietário. Atualizar todos os consumidores e fixtures na mesma implementação; TypeScript deve impedir uso de `cycle.title` sem discriminação.

`create` aceita somente cadastro por objetivos, valida antes de escrever, atribui identidade/proprietário/histórico e retorna o registro persistido. Erro antes/durante escrita não altera a coleção anterior. Os adaptadores real e manual devem compartilhar as regras de domínio. Não introduzir escrita de legados no novo fluxo.

## Migração local versionada

- Origem: array atual em `evolua:pdi-cycles:v1`. Destino: `evolua:pdi-cycles:v2`, envelope `{schemaVersion: 2, legacySource: string|null, cycles: [...]}`. `legacySource` é a cópia exata do conteúdo v1 lido, não log/telemetria. Dados privados permanecem no armazenamento local.
- Sem v2, ler/validar v1 como array de registros históricos. Preservar campos, IDs, ordem, versão, datas e histórico; acrescentar somente `kind: LEGACY` no destino. Sem v1, usar coleção vazia e `legacySource: null`.
- Criar v2 com uma única operação setItem, após validar toda a coleção. Manter v1 intocado como backup. Migração idempotente: havendo v2 válido, usar v2, nunca importar v1 novamente. Migração não cria evento de negócio nem incrementa version de ciclos.
- Se JSON, envelope ou registro for inválido, interromper sem apagar/substituir dados. Não ignorar registros inválidos silenciosamente. Erro de quota/leitura/gravação preserva v1 e v2 anteriores. Testar retorno após falha e nova execução.
- Antes de operações, comparar v1 atual a `legacySource`. Se outro cliente antigo alterou v1, interromper com orientação de fechar versões antigas e resolver o conflito com backup; não sobrescrever, mesclar automaticamente ou repetir migração. Abas com formatos antigos e novos escrevendo simultaneamente não são suportadas. Não prometer lock distribuído ou resolução entre abas neste escopo.
- Rollback de código antigo só lê o backup v1 e não vê ciclos novos. Portanto não recomendar downgrade após escrita v2: preservar/exportar ambos os valores antes de recuperação assistida. Nunca chamar isso de rollback sem perda para v2.

## Contrato HTTP e consumidores

O OpenAPI em `specs/001-ciclos-pdi/contracts/openapi.yaml` descreve v1; não há backend implementado nesta aplicação. Preservar esse contrato histórico. Esta feature documenta uma evolução incompatível v2, sem criar endpoints no planejamento ou exigir backend na implementação local.

| Interface futura v2 | Evolução de contrato |
| --- | --- |
| POST `/api/v2/pdi-cycles` | `duration_type`, `start_date`, `end_date`, `objectives: string[]`; sem title/description. Pelo menos um objetivo, todos não vazios; fim validado segundo calendário |
| GET coleção/detalhe | União discriminada `kind=LEGACY|OBJECTIVES`; campos comuns iguais aos v1, LEGACY mantém title/description, OBJECTIVES expõe objectives |
| PATCH ciclo aberto | Atualização de período; título/descrição só para LEGACY; sem edição de objetivos nesta feature; expectedVersion obrigatório na porta, futura API deve documentar concorrência |
| Operações de status | Mesmas transições, exclusividade de ativo e histórico, sem exigir objetivos em LEGACY |

Nomes HTTP usam snake_case; domínio/porta usam camelCase. Identidade/autorização e respostas de erro devem seguir o contrato de uma futura implementação HTTP, sem copiar `local-user` para um servidor. Versão HTTP v1 não é sobrescrita com schema v2. Clientes v1 continuam sujeitos ao contrato v1; não se promete que entendam registros v2. Consumidores internos do frontend são migrados juntos; nenhum consumidor externo em execução foi identificado.

## Critérios de compatibilidade

1. Fixture v1 com ciclos em todos os estados mantém conteúdo exato após leitura/migração/reload.
2. Transições permitidas em legados continuam válidas; encerrados não são alterados.
3. Novos registros sem título/descrição persistem objetivos e aparecem em list/get após recarga.
4. Data automática adulterada, objetivos vazios e update de encerrado não gravam.
5. Migração repetida não duplica; falha/corrupção/divergência de v1 não apaga backup nem registros v2.
6. Recuperação é documentada e exercitada apenas com dados sintéticos; nunca limpar localStorage do usuário para corrigir schema.
