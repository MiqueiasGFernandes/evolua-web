# Feature Specification: Gerenciamento de Ciclos de PDI

> Evolução de criação: a [SPEC-005](../005-cadastro-guiado-ciclos/spec.md) substitui, para novos cadastros, título/descrição por objetivos, duração informativa por término automático e formulário permanente/âncora por modal ou página guiada. Demais regras e evidências históricas permanecem.

**Feature Branch**: `001-ciclos-pdi`

**Created**: 2026-11-06

**Status**: Draft

**Input**: Funcionalidade inicial para criar, acompanhar e encerrar ciclos de Planos de Desenvolvimento Individual.

## Clarifications

### Session 2026-11-06

- Q: Qual deve ser o limite padrão e máximo de itens por página na listagem de ciclos? → A: 20 itens padrão e 100 itens máximo.
- Q: Em qual fuso horário o momento das alterações de status deve ser apresentado no histórico? → A: Persistir momentos em UTC no backend e no banco de dados; exibir no fuso horário do usuário.
- Q: Como o sistema deve resolver duas edições simultâneas do mesmo ciclo? → A: Rejeitar a edição conflitante e exigir recarregamento.

## User Scenarios & Testing *(mandatory)*

Todas as histórias pressupõem usuário autenticado e proprietário dos ciclos.

### User Story 1 - Criar ciclo (Priority: P1)

Como profissional, quero criar ciclos trimestrais, semestrais, anuais ou personalizados, com título, descrição e período, para registrar meu intervalo de desenvolvimento.

**Why this priority**: É a entrada mínima do produto.

**Independent Test**: Criar dados válidos e confirmar ciclo DRAFT, identificador e proprietário.

**Pré-condições**: Usuário autenticado.

**Fluxo principal**: informar dados; validar; persistir ciclo DRAFT; retornar ciclo criado.

**Fluxos alternativos**: dados ausentes, texto fora dos limites ou datas inválidas recusam a criação sem persistência parcial.

**Acceptance Scenarios**:
1. **Given** dados válidos, **When** o usuário cria, **Then** o ciclo existe em DRAFT com identificador único.
2. **Given** data final igual ou anterior à inicial, **When** cria, **Then** a operação é recusada.
3. **Given** título menor que 3 ou maior que 120 caracteres, **When** cria, **Then** a operação é recusada.

### User Story 2 - Consultar ciclos próprios (Priority: P1)

Como profissional, quero listar meus ciclos, filtrar por status, paginar e abrir detalhes, para acompanhar estado e histórico.

**Why this priority**: Torna os ciclos encontrados e verificáveis.

**Independent Test**: Listar estados variados, filtrar, paginar e abrir detalhe.

**Pré-condições**: Usuário autenticado.

**Acceptance Scenarios**:
1. **Given** ciclos próprios em DRAFT e ACTIVE, **When** filtra ACTIVE, **Then** recebe somente seus ACTIVE.
2. **Given** nenhum resultado, **When** lista, **Then** recebe lista vazia, não erro.
3. **Given** ciclo de terceiro, **When** tenta acessá-lo, **Then** não recebe dados nem histórico.
4. **Given** mais itens que o limite, **When** pagina, **Then** cada item aparece em apenas uma página.

### User Story 3 - Editar ciclo aberto (Priority: P1)

Como profissional, quero editar ciclos DRAFT e ACTIVE para corrigir ou atualizar seu planejamento.

**Why this priority**: Mantém dados úteis sem alterar ciclos encerrados.

**Independent Test**: Editar ciclos abertos e tentar editar encerrados.

**Acceptance Scenarios**:
1. **Given** ciclo DRAFT ou ACTIVE, **When** salva dados válidos, **Then** dados mudam e status permanece.
2. **Given** período inválido, **When** salva, **Then** nada é alterado.
3. **Given** COMPLETED ou CANCELLED, **When** edita, **Then** operação é recusada.

### User Story 4 - Iniciar ciclo (Priority: P1)

Como profissional, quero iniciar um ciclo DRAFT para indicar execução do plano.

**Why this priority**: É a transição principal para acompanhamento.

**Independent Test**: Ativar DRAFT, inclusive sem objetivos, e testar exclusividade.

**Acceptance Scenarios**:
1. **Given** DRAFT sem objetivos, **When** inicia, **Then** torna-se ACTIVE.
2. **Given** outro ACTIVE do usuário, **When** inicia outro DRAFT, **Then** operação é recusada e nenhum estado muda.
3. **Given** ativações concorrentes, **When** são processadas, **Then** no máximo uma termina ACTIVE.
4. **Given** ciclo já ACTIVE, **When** repete a solicitação, **Then** não duplica transição ou histórico.

### User Story 5 - Concluir ou cancelar ciclo (Priority: P1)

Como profissional, quero concluir ou cancelar ciclo ACTIVE, para registrar encerramento.

**Why this priority**: Completa o ciclo de vida essencial.

**Independent Test**: Executar ambas as transições e verificar histórico e imutabilidade.

**Acceptance Scenarios**:
1. **Given** ACTIVE, **When** conclui, **Then** passa a COMPLETED e registra histórico.
2. **Given** ACTIVE, **When** cancela, **Then** passa a CANCELLED e registra histórico.
3. **Given** DRAFT, **When** conclui, **Then** transição é recusada.
4. **Given** encerrado, **When** reativa ou edita, **Then** operação é recusada.
5. **Given** falha ao salvar status ou histórico, **When** termina, **Then** não há sucesso parcial.

### User Story 6 - Consultar histórico encerrado (Priority: P2)

Como profissional, quero consultar ciclos COMPLETED/CANCELLED e sua sequência de status.

**Why this priority**: Preserva memória do desenvolvimento.

**Independent Test**: Encerrar ciclo e verificar detalhe e listagem histórica.

**Acceptance Scenarios**:
1. **Given** ciclos encerrados, **When** consulta, **Then** permanecem disponíveis.
2. **Given** DRAFT→ACTIVE→COMPLETED, **When** vê detalhes, **Then** a sequência está completa e ordenada.
3. **Given** nenhum encerrado, **When** consulta, **Then** recebe lista vazia.

### Edge Cases

- Somente DRAFT→ACTIVE, DRAFT→CANCELLED, ACTIVE→COMPLETED e ACTIVE→CANCELLED são válidas.
- Datas são calendárias, sem horário; final deve ser posterior à inicial.
- Título: 3–120 caracteres; descrição: até 2.000; campos obrigatórios ausentes recusam operação.
- Concorrência de ativação preserva no máximo um ACTIVE; repetições não duplicam histórico.
- Terceiros não veem dados em listagem, filtro, detalhe ou histórico.
- Falhas preservam consistência entre status e histórico.
- Edições concorrentes conflitantes são recusadas; a edição rejeitada não sobrescreve dados e exige recarregamento.
- Ciclos encerrados não são excluídos fisicamente.

## Requirements *(mandatory)*

### Functional Requirements

- **RF-001**: Permitir criar ciclo próprio com título, descrição opcional, duração, datas e status inicial DRAFT. **Regras**: RB-001–RB-004. **Aceitação**: dados inválidos não persistem. **Prioridade**: P1.
- **RF-002**: Gerar identificador único e associar proprietário. **Regras**: RB-004. **Aceitação**: identificador não se repete. **Prioridade**: P1.
- **RF-003**: Listar ciclos próprios com filtro por status e paginação, inclusive vazio. A paginação MUST usar 20 itens por padrão e aceitar no máximo 100 itens por página. **Regras**: RB-004, RB-010. **Aceitação**: terceiros nunca aparecem e limites inválidos são recusados. **Prioridade**: P1.
- **RF-004**: Exibir detalhe e histórico do ciclo próprio. **Regras**: RB-004, RB-008. **Aceitação**: sequência corresponde ao ciclo. **Prioridade**: P1.
- **RF-005**: Editar título, descrição, duração e datas de DRAFT/ACTIVE. Edições concorrentes conflitantes MUST ser rejeitadas e exigir recarregamento. **Regras**: RB-005, RB-011. **Aceitação**: estado permanece; inválidos ou conflitantes não alteram nem sobrescrevem dados. **Prioridade**: P1.
- **RF-006**: Executar DRAFT→ACTIVE sem exigir objetivos. **Regras**: RB-006, RB-007. **Aceitação**: muda estado e registra histórico. **Prioridade**: P1.
- **RF-007**: Executar DRAFT→CANCELLED, ACTIVE→COMPLETED e ACTIVE→CANCELLED. **Regras**: RB-006, RB-008. **Aceitação**: muda estado e registra histórico. **Prioridade**: P1.
- **RF-008**: Recusar transições inválidas, reativação e edição de encerrados. **Regras**: RB-005, RB-006, RB-009. **Aceitação**: dados permanecem inalterados. **Prioridade**: P1.
- **RF-009**: Garantir no máximo um ACTIVE por usuário sob concorrência. **Regra**: RB-007. **Aceitação**: após concorrência há zero ou um ACTIVE. **Prioridade**: P1.
- **RF-010**: Manter encerrados consultáveis e sem exclusão física. **Regras**: RB-009, RB-010. **Aceitação**: histórico continua acessível. **Prioridade**: P1.
- **RF-011**: Persistir histórico para criação e toda alteração de status aceita, com ciclo, estados e momento em UTC; a interface MUST exibir o momento no fuso do usuário. **Regra**: RB-008. **Aceitação**: sem divergência após falha e com conversão consistente para exibição. **Prioridade**: P1.
- **RF-012**: Validar campos, limites, datas, filtros e paginação antes de persistir. **Regras**: RB-002, RB-003. **Aceitação**: erro compreensível e sem parcial. **Prioridade**: P1.
- **RF-013**: Proteger privacidade e permitir os fluxos principais por teclado e tecnologia assistiva. **Regras**: RB-004. **Aceitação**: sem vazamento e com erros comunicados. **Prioridade**: P1.

### Business Rules

- **RB-001**: Estado inicial é DRAFT.
- **RB-002**: Título obrigatório de 3 a 120 caracteres; descrição opcional até 2.000.
- **RB-003**: Data final posterior à inicial; datas sem horário.
- **RB-004**: Ciclo pertence a um usuário; somente proprietário consulta/modifica.
- **RB-005**: DRAFT e ACTIVE editáveis; COMPLETED e CANCELLED imutáveis.
- **RB-006**: Únicas transições: DRAFT→ACTIVE, DRAFT→CANCELLED, ACTIVE→COMPLETED, ACTIVE→CANCELLED.
- **RB-007**: Vários ciclos por usuário, no máximo um ACTIVE; objetivos não são pré-requisito.
- **RB-008**: Alteração de status aceita gera histórico persistente e consistente.
- **RB-009**: Encerrados não reativam nem são excluídos fisicamente.
- **RB-010**: Encerrados permanecem consultáveis.
- **RB-011**: Repetições e concorrência não duplicam transições.

### Key Entities

- **Ciclo de PDI**: identificador, proprietário, título, descrição, duração, datas e status.
- **Status**: DRAFT, ACTIVE, COMPLETED, CANCELLED.
- **Histórico de status**: ciclo, estado anterior, posterior e momento; entrada inicial representa DRAFT.
- **Usuário proprietário**: identidade autenticada ligada a zero ou muitos ciclos.

Referências conceituais devem permitir futuros objetivos, competências, ações, check-ins, evidências, avaliações, métricas e IA, sem implementar esses módulos agora.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das transições permitidas em testes produzem estado esperado e exatamente um histórico.
- **SC-002**: 100% dos testes concorrentes preservam no máximo um ACTIVE por usuário.
- **SC-003**: 95% dos usuários de teste criam e localizam ciclo válido em até 2 minutos sem ajuda.
- **SC-004**: 100% dos encerrados permanecem consultáveis e 100% das edições são recusadas.
- **SC-005**: 100% dos testes de isolamento impedem acesso de terceiros.
- **SC-006**: 100% das entradas inválidas cobertas são rejeitadas sem persistência parcial.
- **SC-007**: 95% dos usuários de teste filtram, paginam e abrem detalhes sem suporte.
- **SC-008**: 100% dos fluxos principais são operáveis por teclado e comunicam erros a tecnologia assistiva.

## Assumptions

- Usuário autenticado existe como pré-condição; autenticação completa está fora do escopo.
- Tipo de duração é informativo; datas explícitas governam validade.
- A paginação usa 20 itens por padrão e permite no máximo 100 itens por página.
- Momentos de histórico são persistidos em UTC e exibidos no fuso horário do usuário, mantendo ordenação pelo instante real.
- Objetivos podem inexistir e nunca bloqueiam ativação.

## Constraints and Scope Boundaries

Incluídos: ciclo de vida, cadastro, edição de abertos, listagem, filtros, paginação, detalhe, encerramento, histórico, privacidade, integridade e acessibilidade.

Excluídos: objetivos SMART, competências, atividades, check-ins, dashboard, integrações, IA, recomendações, autenticação completa e compartilhamento.

Não são definidos frameworks, linguagens, infraestrutura, persistência física, endpoints ou contratos.

## Open Product Decisions

- Textos finais de erros, sem revelar ciclos de terceiros.

