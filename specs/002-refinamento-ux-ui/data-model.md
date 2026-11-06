# Phase 1 — Modelo preservado e estado de apresentação

## Dados de negócio: nenhuma mudança

Fonte canônica: [modelo da SPEC-001](../001-ciclos-pdi/data-model.md), [contrato OpenAPI](../001-ciclos-pdi/contracts/openapi.yaml) e tipos existentes em `apps/web/src/features/pdi-cycles/domain.ts`. Não adicionar entidade persistida, campo, migração ou transformação do armazenamento.

| Entidade existente | Campos/relações preservados | Regra para a apresentação |
| --- | --- | --- |
| PdiCycle | id, ownerId, title, description, durationType, startDate, endDate, status, version, createdAt, updatedAt, history | Título integral, descrição opcional no cadastro, datas calendárias e rótulos de status; não inventar score/progresso. |
| StatusHistory | id, fromStatus, toStatus, occurredAt, actorId; pertence ao ciclo | Preservar exatamente o histórico produzido; nenhuma nova tela para exibi-lo. |
| CreateCycleInput | title, description, durationType, startDate, endDate | Mesma estrutura e validação; descrição vazia continua null. |
| ListCyclesQuery / PagedCycles | status/page/pageSize; items/page/pageSize/total/hasNext | Manter filtro e limites existentes; não criar controles de paginação ausentes. |

Título obrigatório 3–120 caracteres, descrição opcional até 2.000, início/fim presentes e fim posterior ao início. Duração mantém TRIMESTER/SEMESTER/YEAR/CUSTOM, com rótulos atuais em português; o tipo não recalcula datas. Permanecem as regras de proprietário, versão e imutabilidade. Não duplicar validação em um schema novo só para estilizar mensagens.

## Status e transições

| Valor persistido | Texto UI | Variante visual |
| --- | --- | --- |
| DRAFT | Rascunho | draft |
| ACTIVE | Ativo | active |
| COMPLETED | Concluído | completed |
| CANCELLED | Cancelado | cancelled |

Transições únicas: DRAFT→ACTIVE, DRAFT→CANCELLED, ACTIVE→COMPLETED e ACTIVE→CANCELLED. No máximo um ACTIVE por usuário; encerrados sem edição/transição. A UI conserva as condicionais atuais e delega decisão final ao repositório/domínio. Refinamento não amplia garantias de concorrência/autenticação da base atual.

## Estado transitório da interface

Estado de apresentação é local e descartável, não persiste nem entra no OpenAPI. A extração de componentes mantém uma única fonte de verdade para valores e resultados.

| Conceito UI | Conteúdo necessário | Relação/limite |
| --- | --- | --- |
| Estado de leitura | loading, ready ou error; itens da última leitura válida; contexto de filtro | Vazio é derivado de ready + zero itens; falha não é vazio. Conteúdo anterior só aparece com indicação de atualização falha quando aplicável. |
| Estado de envio | idle ou pending; mensagem final | Um formulário, sem disparos repetidos pela UI; limpa somente após sucesso real de create. |
| Operação por ciclo | id, ação pendente, resultado | Não bloquear ciclos não envolvidos; conciliar filtro e resultado. |
| Erro de campo | identificador do campo, mensagem acessível | Derivado das restrições nativas e erros existentes; não cria novas regras/códigos de domínio. |
| Feedback de região | operação, severidade, mensagem, contexto | Distingue gravação falha de gravação sucedida seguida de falha de refresh. |
| Destino de foco | controle anterior, item ou título de resultados relacionado | Atualiza somente quando necessário; não é dado de negócio. |

Leituras atrasadas de um filtro anterior não devem substituir resultados do filtro atual; resolver no estado de apresentação por identificação da leitura, sem adicionar assinatura de cancelamento à porta. Testes controlados verificam esse caso se houver assincronia real na operação.

## Tokens e referências

Cores/tipografia/espaçamento são configuração de apresentação, não entidades do domínio. A seleção A está em [visual-directions/README.md](visual-directions/README.md); valores propostos em [design-system.md](design-system.md). Não persistir preferência de tema, design escolhido ou avaliações estéticas na aplicação.
