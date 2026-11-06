# Data Model: Gerenciamento de Ciclos de PDI

## PdiCycle
- **id**: UUID, identificador único.
- **owner_id**: identidade do usuário proprietário, obrigatória.
- **title**: texto obrigatório, 3–120 caracteres.
- **description**: texto opcional, máximo 2.000 caracteres.
- **duration_type**: TRIMESTER, SEMESTER, YEAR ou CUSTOM.
- **start_date/end_date**: datas de calendário; end_date posterior a start_date.
- **status**: DRAFT, ACTIVE, COMPLETED ou CANCELLED; inicia em DRAFT.
- **version**: marcador de concorrência para rejeitar edição obsoleta.
- **created_at/updated_at**: timestamps de auditoria em UTC.

## StatusHistory
- **id**: UUID.
- **cycle_id**: referência ao ciclo.
- **from_status**: estado anterior; nulo somente na criação.
- **to_status**: estado posterior.
- **occurred_at**: timestamp UTC.
- **actor_id**: usuário autenticado que provocou a mudança.
- Registro é imutável e criado na mesma transação da alteração.

## Relationships and invariants
- Um usuário possui zero ou muitos ciclos; cada ciclo possui exatamente um proprietário.
- Um ciclo possui zero ou muitos registros históricos ordenáveis por occurred_at/id.
- Somente os quatro caminhos DRAFT→ACTIVE, DRAFT→CANCELLED, ACTIVE→COMPLETED e ACTIVE→CANCELLED são válidos.
- No máximo um ciclo ACTIVE por owner_id.
- COMPLETED e CANCELLED são imutáveis.
- Objetivos e outros módulos futuros referenciarão PdiCycle, mas não são parte deste modelo.

