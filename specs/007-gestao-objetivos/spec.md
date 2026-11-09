# Feature Specification: Gestão de Objetivos de Desenvolvimento

**Feature Branch**: `007-gestao-objetivos`

**Created**: 2026-11-08

**Status**: Draft

**Input**: User description: "Gestão de objetivos de desenvolvimento associados aos ciclos de PDI."

## Clarifications

### Session 2026-11-08

- Q: Enquanto um ciclo estiver pausado, a pessoa pode editar o planejamento dos objetivos? → A: Permite criar e editar objetivos, mas bloqueia atualizações de progresso, conclusão e cancelamento.
- Q: No resumo do ciclo, quais objetivos devem contar como pendentes? → A: Apenas planejados e em andamento contam como pendentes.
- Q: Como cada critério observável de um objetivo qualitativo deve registrar sua situação? → A: Cada critério pode estar não iniciado, em observação ou atendido.
- Q: Depois de concluído, um objetivo ainda pode ser editado ou reaberto? → A: Fica somente para consulta; não pode editar nem reabrir.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Planejar objetivos de um ciclo (Priority: P1)

Como pessoa usuária, quero criar objetivos claros dentro de um ciclo para definir os resultados que pretendo alcançar e como reconhecer seu sucesso.

**Why this priority**: Sem objetivos, o ciclo não transforma intenção de desenvolvimento em resultados planejados e acompanháveis.

**Independent Test**: Em um ciclo em rascunho ou ativo pertencente à pessoa usuária, criar um objetivo quantitativo e um qualitativo e confirmar que ambos ficam disponíveis na seção de objetivos do ciclo.

**Acceptance Scenarios**:

1. **Given** um ciclo em rascunho ou ativo, **When** a pessoa cria um objetivo com título, critério de sucesso e prazo válido, **Then** o objetivo é associado ao ciclo e aparece na sua lista de objetivos.
2. **Given** a pessoa escolhe mensuração quantitativa, **When** preenche indicador, unidade, valor inicial e valor-alvo válidos, **Then** o objetivo registra esses dados e não mostra campos exclusivos da mensuração qualitativa.
3. **Given** a pessoa escolhe mensuração qualitativa, **When** define critérios observáveis, **Then** o objetivo registra esses critérios e não exige valores numéricos ou indicador.
4. **Given** um prazo anterior ao início ou posterior ao fim do ciclo, **When** a pessoa tenta salvar o objetivo, **Then** recebe uma mensagem contextualizada e o objetivo não é salvo até o prazo ser corrigido.

---

### User Story 2 - Consultar e organizar objetivos do ciclo (Priority: P1)

Como pessoa usuária, quero visualizar os objetivos no contexto do ciclo para entender prioridades, prazos, situação e o que exige atenção.

**Why this priority**: A visualização dá utilidade imediata ao planejamento e permite orientar as próximas decisões do ciclo.

**Independent Test**: Em um ciclo com objetivos em diferentes estados e prazos, abrir seus detalhes e identificar total, concluídos, pendentes, prioridade, prazo, atraso e progresso disponível sem abrir outro ciclo.

**Acceptance Scenarios**:

1. **Given** um ciclo com objetivos, **When** a pessoa abre seus detalhes, **Then** vê uma seção de objetivos com título, resumo da descrição, status, prioridade, prazo, critério de sucesso e ações disponíveis para cada objetivo.
2. **Given** um objetivo quantitativo com dados suficientes, **When** ele é listado ou aberto em detalhe, **Then** a pessoa vê uma representação de progresso e os valores relevantes do indicador.
3. **Given** um objetivo qualitativo, **When** ele é listado ou aberto em detalhe, **Then** a pessoa vê seus critérios observáveis e resultados registrados sem percentual numérico arbitrário.
4. **Given** um objetivo não concluído nem cancelado com prazo vencido, **When** ele é apresentado, **Then** é identificado como atrasado sem alterar seu status registrado.
5. **Given** um ciclo sem objetivos, **When** a pessoa abre seus detalhes, **Then** vê um estado vazio que explica a importância de definir resultados e oferece a ação de criar o primeiro objetivo quando o ciclo permitir edição.

---

### User Story 3 - Acompanhar resultados quantitativos e qualitativos (Priority: P1)

Como pessoa usuária, quero registrar resultados alcançados durante o ciclo para acompanhar o avanço real de cada objetivo.

**Why this priority**: O valor central da funcionalidade é evidenciar resultado alcançado, e não apenas atividades realizadas.

**Independent Test**: Atualizar o valor atual de metas crescentes e decrescentes e registrar resultados de um objetivo qualitativo, verificando que somente metas quantitativas mostram percentual válido.

**Acceptance Scenarios**:

1. **Given** um objetivo quantitativo de meta crescente com valores válidos, **When** a pessoa atualiza seu valor atual, **Then** o progresso considera a distância entre o valor inicial e o alvo e fica limitado entre 0% e 100%.
2. **Given** um objetivo quantitativo de meta decrescente com valores válidos, **When** a pessoa atualiza seu valor atual, **Then** o progresso aumenta à medida que o valor se aproxima ou supera o alvo na direção de redução.
3. **Given** valores que tornam impossível calcular a evolução, **When** a pessoa consulta o objetivo, **Then** o sistema informa que não há dados suficientes em vez de apresentar cálculo inválido.
4. **Given** um objetivo qualitativo, **When** a pessoa atualiza cada critério como não iniciado, em observação ou atendido e descreve resultados alcançados, **Then** essas informações ficam consultáveis sem percentual de progresso.
5. **Given** uma meta numérica atingida ou superada, **When** a atualização é salva, **Then** o status do objetivo não é alterado automaticamente para concluído.

---

### User Story 4 - Gerenciar o ciclo de vida do objetivo (Priority: P2)

Como pessoa usuária, quero editar, iniciar, concluir ou cancelar objetivos de forma controlada para manter um histórico fiel do meu desenvolvimento.

**Why this priority**: O acompanhamento precisa refletir mudanças reais sem perder o histórico de objetivos encerrados.

**Independent Test**: Em um ciclo ativo, iniciar um objetivo, concluí-lo após confirmação com resultado alcançado e cancelar outro; confirmar que ambos permanecem consultáveis e que os resumos são atualizados.

**Acceptance Scenarios**:

1. **Given** um objetivo planejado de ciclo ativo, **When** a pessoa inicia sua execução, **Then** seu status passa para em andamento.
2. **Given** um objetivo planejado ou em andamento de ciclo editável, **When** a pessoa altera informações permitidas, **Then** a lista e o detalhe mostram os dados atualizados.
3. **Given** um objetivo de ciclo ativo, **When** a pessoa solicita sua conclusão, confirma a ação e registra o resultado efetivamente alcançado, **Then** o objetivo passa para concluído, permanece consultável e não pode ser editado nem reaberto.
4. **Given** um objetivo ainda não encerrado, **When** a pessoa confirma seu cancelamento, **Then** o objetivo passa para cancelado e permanece no histórico, sem ser apagado.
5. **Given** um ciclo pausado, concluído ou cancelado, **When** a pessoa tenta realizar uma ação bloqueada para esse estado, **Then** a alteração é bloqueada e o motivo é informado; em ciclo pausado, criar e editar o planejamento continuam disponíveis, enquanto atualizar progresso, concluir e cancelar ficam bloqueados.

---

### User Story 5 - Consultar resumo de objetivos no ciclo (Priority: P2)

Como pessoa usuária, quero ver um resumo confiável dos objetivos de um ciclo para reconhecer rapidamente seu andamento geral.

**Why this priority**: Um resumo torna o contexto do ciclo útil sem antecipar um dashboard analítico fora de escopo.

**Independent Test**: Com objetivos de estados e prioridades diferentes, verificar no ciclo as contagens total, concluída e pendente e a consistência após uma conclusão ou cancelamento.

**Acceptance Scenarios**:

1. **Given** um ciclo com objetivos, **When** a pessoa consulta seu resumo, **Then** vê quantidade total, quantidade concluída e quantidade pendente consistentes com os objetivos exibidos, considerando pendentes somente os objetivos planejados ou em andamento.
2. **Given** uma alteração de status de objetivo confirmada, **When** a pessoa retorna ao resumo do ciclo, **Then** as contagens refletem a alteração.

### Edge Cases

- Um objetivo não pode ser criado sem título ou critério de sucesso.
- O prazo deve ser uma data dentro do período inclusivo do ciclo; ciclos sem período definido não aceitam objetivos com prazo até que o período seja informado.
- Para mensuração quantitativa, indicador, unidade, valor inicial e valor-alvo são obrigatórios; valor inicial e alvo devem ser diferentes para haver percentual calculável.
- A direção da meta é inferida pela relação entre valor inicial e alvo: alvo maior representa meta crescente; alvo menor, decrescente.
- Valores atuais além do alvo podem indicar meta superada, mas o progresso visual permanece em 100% e o status não muda automaticamente.
- Quando o valor atual ainda não foi registrado, o objetivo quantitativo informa que o progresso não está disponível.
- Um objetivo vencido é atrasado somente se não estiver concluído nem cancelado; essa identificação desaparece quando o status passa a concluído ou cancelado.
- Objetivos cancelados e concluídos permanecem acessíveis para consulta, inclusive após o ciclo encerrar.
- Objetivos concluídos ou cancelados são estados finais: ficam somente para consulta e não podem ser editados, reabertos ou ter o resultado alterado.
- Uma pessoa não pode visualizar, criar, editar ou atualizar objetivos de ciclos que não lhe pertencem.
- Cancelamento, conclusão e descarte de alterações não salvas exigem confirmação quando puderem resultar em perda de contexto ou em mudança de estado.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE permitir criar múltiplos objetivos dentro de um ciclo que pertença à pessoa usuária.
- **FR-002**: Todo objetivo DEVE exigir título e critério de sucesso; descrição e motivação são opcionais.
- **FR-003**: Cada objetivo DEVE possuir prazo previsto, prioridade baixa/média/alta, status planejado/em andamento/concluído/cancelado e tipo de mensuração quantitativa ou qualitativa.
- **FR-004**: O prazo previsto DEVE estar dentro do intervalo de datas do ciclo.
- **FR-005**: Objetivos quantitativos DEVEM exigir nome do indicador, unidade, valor inicial e valor-alvo, além de permitir registrar valor atual.
- **FR-006**: Objetivos qualitativos DEVEM permitir critérios observáveis, cada qual com situação não iniciado/em observação/atendido, e o registro de resultados alcançados, sem exigir indicador ou valores numéricos.
- **FR-007**: O formulário DEVE exibir somente campos pertinentes ao tipo de mensuração escolhido e apresentar erros junto aos campos inválidos.
- **FR-008**: O detalhe de um ciclo DEVE listar seus objetivos e, para cada um, mostrar título, descrição resumida quando disponível, status, prioridade, prazo, critério de sucesso, estado de atraso e ações permitidas.
- **FR-009**: O detalhe completo de um objetivo DEVE apresentar todos os dados de planejamento, mensuração, critérios observáveis e resultados registrados aplicáveis ao seu tipo.
- **FR-010**: Para objetivos quantitativos com valor atual e valores inicial/alvo diferentes, o sistema DEVE calcular o progresso pela distância percorrida da linha de base ao alvo, para metas crescentes ou decrescentes, e limitar sua apresentação entre 0% e 100%.
- **FR-011**: Quando não houver dados válidos para calcular progresso quantitativo, o sistema DEVE informar indisponibilidade em vez de mostrar percentual, divisão por zero ou resultado matematicamente inválido.
- **FR-012**: Atingir ou superar o valor-alvo não DEVE concluir automaticamente um objetivo.
- **FR-013**: O sistema DEVE permitir iniciar a execução, editar informações permitidas e atualizar resultados de objetivos não encerrados, além de concluir mediante confirmação e cancelar mediante confirmação.
- **FR-014**: A conclusão DEVE permitir registrar o resultado efetivamente alcançado antes da confirmação final.
- **FR-015**: Objetivos concluídos e cancelados DEVEM permanecer consultáveis no histórico do ciclo como estados finais, sem edição, reabertura ou alteração do resultado confirmado.
- **FR-016**: O sistema DEVE identificar como atrasado todo objetivo com prazo vencido cujo status não seja concluído nem cancelado, sem criar status adicional.
- **FR-017**: Ciclos em rascunho DEVEM permitir planejamento e edição; ciclos ativos DEVEM permitir planejamento, acompanhamento e conclusão; ciclos pausados DEVEM permitir criar e editar objetivos, mas bloquear atualizações de progresso, conclusão e cancelamento; ciclos concluídos ou cancelados DEVEM permitir apenas consulta.
- **FR-018**: O detalhe de cada ciclo DEVE apresentar um resumo com total de objetivos, objetivos concluídos e objetivos pendentes; pendentes são somente os objetivos planejados ou em andamento.
- **FR-019**: Ciclos sem objetivos DEVEM apresentar um estado vazio contextualizado e uma ação de criação quando o ciclo estiver editável.
- **FR-020**: O sistema DEVE impedir acesso e alteração de objetivos de ciclos de outras pessoas usuárias.
- **FR-021**: A interface DEVE ser responsiva, navegável por teclado, acessível e coerente com os padrões visuais e de feedback já existentes no Evolua.
- **FR-022**: Os dados de objetivos DEVEM permitir identificar posteriormente quantidade por ciclo, distribuição por prioridade e status, atrasos, taxa de conclusão, proximidade de vencimento, progresso quantitativo e conclusão antes ou após o prazo, sem exigir dashboard nesta entrega.
- **FR-023**: O progresso do objetivo DEVE representar resultados registrados no próprio objetivo e permanecer independente de futuras atividades, competências, check-ins, evidências ou avaliações.

### Key Entities *(include if feature involves data)*

- **Objetivo de desenvolvimento**: Resultado esperado associado obrigatoriamente a um ciclo, com título, descrição opcional, motivação, critério de sucesso, prazo, prioridade, status, tipo de mensuração e histórico de resultado.
- **Mensuração quantitativa**: Forma de acompanhar objetivo por indicador, unidade, valor inicial, alvo e atual; sua direção pode ser crescente ou decrescente conforme linha de base e alvo.
- **Mensuração qualitativa**: Forma de acompanhar objetivo por critérios observáveis com situação não iniciado/em observação/atendido e resultados descritivos, sem percentual numérico arbitrário.
- **Resultado do objetivo**: Atualização registrada pela pessoa usuária sobre valor atual ou situação qualitativa; a confirmação de conclusão registra o resultado efetivamente alcançado.
- **Resumo do ciclo**: Visão derivada dos objetivos do ciclo com contagens totais, concluídas e pendentes, sendo pendentes os objetivos planejados ou em andamento.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Uma pessoa usuária consegue criar um objetivo quantitativo ou qualitativo válido e encontrá-lo no ciclo correspondente em até 3 minutos, sem navegação fora do ciclo.
- **SC-002**: Em testes de regras de negócio, 100% dos objetivos salvos possuem título, critério de sucesso e prazo dentro do intervalo do ciclo, e 100% dos quantitativos possuem os campos obrigatórios válidos.
- **SC-003**: Em testes com metas crescentes, decrescentes, superadas e sem dados suficientes, 100% dos percentuais apresentados ficam entre 0% e 100%, e objetivos qualitativos nunca recebem percentual automático.
- **SC-004**: Em testes de estado, 100% dos objetivos vencidos não concluídos nem cancelados são identificados como atrasados, sem alterar seu status persistido.
- **SC-005**: Em testes de ciclo de vida, 100% das conclusões e cancelamentos exigem confirmação, preservam a consulta histórica e não são disparados automaticamente por atualização de progresso.
- **SC-006**: Em testes de permissões, uma pessoa não consegue consultar nem modificar objetivos associados a ciclos de outra pessoa.
- **SC-007**: Em desktop e telas móveis representativas, todas as ações disponíveis para o estado do ciclo podem ser alcançadas por teclado e exibem feedback, erro ou confirmação compreensíveis.
- **SC-008**: Em testes de resumo, as contagens total, concluída e pendente do ciclo permanecem consistentes após criar, concluir ou cancelar objetivos, sem incluir cancelados como pendentes.

## Assumptions

- A gestão inicial é individual: cada pessoa acessa somente os próprios ciclos por meio das regras de acesso já existentes no Evolua.
- O ciclo já possui datas inicial e final quando objetivos com prazo são planejados; caso ainda não possua, o produto orienta a definir o período antes de salvar o objetivo.
- Prioridade média é o valor inicial sugerido para reduzir decisão obrigatória, sem impedir sua alteração.
- Todo objetivo inicia como planejado; a execução é iniciada explicitamente pela pessoa usuária.
- O primeiro registro de valor atual é opcional para um objetivo quantitativo; até ele existir, não há progresso percentual a exibir.
- O prazo de um objetivo é comparado à data corrente do contexto da pessoa usuária para determinar atraso.
- Esta entrega não inclui competências, atividades, check-ins, anexos, evidências, avaliações por gestores, dashboards analíticos completos, IA, gamificação ou integrações externas.
