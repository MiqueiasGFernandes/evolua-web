# Feature Specification: Cadastro guiado de ciclos por objetivos

**Feature Branch**: `main`  
**Created**: 2026-11-08  
**Status**: Especificação validada — pronta para planejamento  
**Input**: Novo ciclo em modal pelo botão ou em página pelo menu; término automático para períodos trimestrais, semestrais e anuais, editável apenas no personalizado; ciclo sem título/descrição, com objetivos; formulário guiado em etapas.

## Clarifications

### Session 2026-11-08

- Q: Como devem funcionar os objetivos? → A: Lista de objetivos textuais, com pelo menos um obrigatório (opção 1A).
- Q: Como calcular o término dos períodos predefinidos? → A: Somar 3, 6 ou 12 meses ao início; quando o dia não existir no mês de destino, usar seu último dia (opção 2A).

## User Scenarios & Testing

Ator: pessoa proprietária dos ciclos. O cadastro deve oferecer o mesmo conteúdo e regras nas duas formas de acesso. Esta feature evolui o comportamento de criação definido na SPEC-001 e a apresentação das SPEC-003/004; regras anteriores conflitantes não devem ser aplicadas ao novo cadastro.

### User Story 1 - Escolher como iniciar o cadastro (Priority: P1)

Como profissional, quero abrir um cadastro rápido pelo botão ou usar uma página dedicada pelo menu, para planejar sem confundir consulta e criação.

**Why this priority**: Define os dois pontos de entrada explicitamente solicitados.

**Independent Test**: Acionar cada entrada e percorrer o mesmo cadastro guiado no contexto correspondente.

**Acceptance Scenarios**:
1. **Given** a consulta de ciclos, **When** aciono o botão “Novo ciclo”, **Then** o formulário abre em modal e a consulta permanece como contexto de fundo.
2. **Given** o menu de navegação, **When** seleciono o link “Novo ciclo”, **Then** acesso uma página dedicada ao cadastro, sem abrir modal.
3. **Given** qualquer um dos dois contextos, **When** inicio o cadastro, **Then** encontro as mesmas etapas, campos, regras e mensagens.
4. **Given** a página dedicada, **When** acesso seu endereço diretamente ou recarrego, **Then** vejo o cadastro; a persistência de preenchimento não concluído após recarga não é exigida.
5. **Given** a consulta de ciclos, **When** não estou criando, **Then** o formulário permanente anterior não ocupa a área de consulta.

### User Story 2 - Definir o período sem calcular datas manualmente (Priority: P1)

Como profissional, quero informar início e duração, para conhecer o término automaticamente nos períodos predefinidos e defini-lo no personalizado.

**Why this priority**: Corrige a diferença entre a duração escolhida e as datas efetivamente informadas.

**Independent Test**: Selecionar cada duração, alterar início e conferir valor final e possibilidade de edição segundo a regra de calendário de FR-009.

**Acceptance Scenarios**:
1. **Given** data inicial válida, **When** escolho Trimestral, Semestral ou Anual, **Then** vejo o término calculado, identificado como automático, sem possibilidade de alterá-lo manualmente.
2. **Given** duração predefinida e data inicial preenchida, **When** altero início ou duração, **Then** o término é recalculado antes de avançar e na revisão final.
3. **Given** duração Personalizado, **When** informo o término, **Then** posso escolhê-lo e avançar somente se for posterior ao início.
4. **Given** período automático, **When** mudo para Personalizado, **Then** posso ajustar o término apresentado; ao voltar a uma duração predefinida, a regra automática volta a governar o término.
5. **Given** início ausente ou inválido, **When** tento avançar, **Then** recebo orientação no campo e não avanço com término inválido.

6. **Given** início em 10/01/2026, **When** escolho Trimestral, Semestral ou Anual, **Then** os términos são, respectivamente, 10/04/2026, 10/07/2026 e 10/01/2027.
7. **Given** início em 31/01/2026 ou 29/02/2024, **When** escolho, respectivamente, Trimestral ou Anual, **Then** os términos são 30/04/2026 e 28/02/2025, sem deslocamento para o mês seguinte.

### User Story 3 - Planejar o ciclo por objetivos (Priority: P1)

Como profissional, quero registrar objetivos em lugar de título e descrição do ciclo, para concentrar o planejamento no que desejo desenvolver.

**Why this priority**: Altera o conteúdo central do cadastro e a identificação do ciclo na consulta.

**Independent Test**: Preencher objetivos conforme FR-006, concluir e reencontrar o ciclo sem fornecer título ou descrição.

**Acceptance Scenarios**:
1. **Given** um novo cadastro, **When** acesso a etapa de objetivos, **Then** não encontro campos de título ou descrição do ciclo.
2. **Given** uma lista com pelo menos um objetivo textual não vazio, **When** avanço e retorno, **Then** o conteúdo é preservado e aparece na revisão final.
3. **Given** ciclo criado no novo fluxo, **When** o consulto após recarregar, **Then** recupero seus objetivos e período sem precisar de título/descrição próprios do ciclo.
4. **Given** ciclos anteriores com título/descrição e sem objetivos, **When** consulto ou executo ações já permitidas, **Then** continuam acessíveis, com histórico e informações anteriores preservados e sem objetivos inventados automaticamente.

5. **Given** a etapa Objetivos sem itens ou com itens compostos apenas por espaços, **When** tento continuar, **Then** não avanço e recebo orientação para informar pelo menos um objetivo válido; cada item presente deve conter texto não vazio.
6. **Given** mais de um objetivo informado, **When** adiciono ou removo itens e concluo, **Then** a revisão e a consulta preservam os textos e sua ordem; remover o último item impede avançar até informar um objetivo válido.

### User Story 4 - Concluir um planejamento guiado (Priority: P1)

Como profissional, quero avançar por etapas claras e revisar o planejamento, para salvar somente quando estiver pronto.

**Why this priority**: Concretiza o formulário multi-step solicitado e evita criação parcial.

**Independent Test**: Percorrer Período → Objetivos → Revisão em modal e página, voltar sem perder valores, corrigir erro e concluir uma única vez.

**Acceptance Scenarios**:
1. **Given** qualquer entrada de cadastro, **When** inicio, **Then** vejo a etapa atual, a sequência Período → Objetivos → Revisão e os controles aplicáveis para avançar ou voltar.
2. **Given** dados inválidos na etapa atual, **When** aciono “Continuar”, **Then** permaneço nela, com erro associado ao campo e foco adequado.
3. **Given** a revisão, **When** retorno a uma etapa para corrigir, **Then** os demais dados continuam preenchidos e o resumo reflete as mudanças.
4. **Given** planejamento válido, **When** confirmo “Criar ciclo”, **Then** é criado exatamente um ciclo em Rascunho, com período e objetivos, e recebo confirmação e acesso à consulta atualizada.
5. **Given** falha ao salvar, **When** a operação termina, **Then** permaneço com o planejamento preenchido, recebo erro compreensível e posso tentar novamente sem criação parcial.
6. **Given** preenchimento com alterações, **When** tento fechar o modal ou sair pelo cancelamento/retorno oferecido no fluxo, **Then** posso continuar preenchendo ou confirmar o descarte; confirmar não cria ciclo.

### Edge Cases

- Início em fim de mês ou 29 de fevereiro; períodos cruzando ano e diferença entre data de calendário e mudança de horário local.
- Alternar duração predefinida/personalizada, voltar etapas e corrigir início depois de já preencher objetivos.
- Objetivo composto somente por espaços, conteúdo longo sem perda de acesso às ações, inclusão/remoção do último item e preservação da ordem de apresentação.
- Repetir clique de confirmação, falha de gravação e nova tentativa; nenhuma criação parcial ou duplicação pelo envio repetido enquanto pendente.
- Fechar modal por Escape, botão ou fundo enquanto há alterações; a política de descarte é a mesma para todos os fechamentos oferecidos.
- Tela estreita, ampliação, teclado e leitor de tela; modal, rodapé de ações e mensagens não podem impedir acesso aos campos.
- Acesso direto à página dedicada, retorno à consulta e recarga antes da conclusão.
- Convivência entre ciclos anteriores e novos, inclusive ciclos encerrados imutáveis e registros sem objetivos.

## Requirements

### Functional Requirements

- **FR-001**: O botão “Novo ciclo” da consulta deve abrir o cadastro em modal, mantendo a consulta como contexto de fundo.
- **FR-002**: O link “Novo ciclo” do menu deve abrir uma página dedicada ao cadastro, acessível diretamente; o fluxo não deve continuar funcionando apenas como âncora para formulário embutido.
- **FR-003**: Modal e página devem oferecer as mesmas etapas, validações, conteúdos e resultado de criação; a consulta não deve manter o formulário permanente anterior.
- **FR-004**: O cadastro deve seguir Período → Objetivos → Revisão, identificar a etapa atual e permitir voltar sem perder os dados já informados. Somente a confirmação final cria o ciclo.
- **FR-005**: Novos ciclos não devem exigir nem solicitar título ou descrição próprios; o conteúdo de planejamento solicitado deve ser “Objetivos”.
- **FR-006**: Objetivos devem ser uma lista de textos, com pelo menos um item obrigatório. O usuário deve poder adicionar e remover itens; cada item presente deve conter texto não vazio após desconsiderar espaços nas extremidades. A lista vazia ou com item vazio deve impedir o avanço e a criação, com orientação contextual. A ordem dos itens deve ser preservada na revisão, na gravação e na consulta.
- **FR-007**: A etapa Período deve permitir selecionar data inicial e uma das opções Trimestral, Semestral, Anual ou Personalizado.
- **FR-008**: Para durações predefinidas, o término deve ser calculado e apresentado automaticamente, ser consultável e não editável manualmente; mudar início ou duração deve recalculá-lo.
- **FR-009**: Trimestral, Semestral e Anual devem calcular o término somando, respectivamente, 3, 6 e 12 meses de calendário à data inicial, mantendo o mesmo dia. Se esse dia não existir no mês de destino, usar o último dia desse mês. O cálculo deve sempre partir da data inicial selecionada. Exemplos: 10/01/2026 → 10/04/2026 no Trimestral; 31/01/2026 → 30/04/2026 no Trimestral; 29/02/2024 → 28/02/2025 no Anual.
- **FR-010**: Somente em Personalizado o término deve poder ser escolhido manualmente; início e término são datas de calendário e término deve ser posterior ao início. A revisão deve exibir as datas efetivas que serão salvas.
- **FR-011**: Cada etapa deve validar suas entradas antes de permitir avanço, indicar erros no contexto e manter o preenchimento ao corrigir ou retornar.
- **FR-012**: A revisão deve apresentar período, duração e objetivos e permitir retornar às etapas correspondentes para correção antes do envio.
- **FR-013**: Confirmar deve criar um único ciclo em Rascunho, associado ao proprietário e com registro inicial de histórico; etapas intermediárias não devem criar ciclos incompletos nem alterar ciclos existentes.
- **FR-014**: Durante o envio, a interface deve comunicar andamento e impedir submissões simultâneas; falha deve preservar o preenchimento, informar recuperação e não apresentar sucesso parcial.
- **FR-015**: Concluir no modal deve fechá-lo e disponibilizar o ciclo na consulta atualizada; concluir na página deve levar à consulta. Filtro que não mostre o novo Rascunho deve ser explicitamente indicado na confirmação.
- **FR-016**: Fechar/cancelar com alterações não salvas deve oferecer continuar ou descartar. Sem alterações, a saída deve ser direta. Fechar modal sem criar deve devolver foco ao acionador.
- **FR-017**: A página, as etapas e o modal devem ser operáveis por teclado e tecnologia assistiva, com nomes, foco, ordem de leitura, erros e mudanças de etapa perceptíveis, atendendo aos critérios WCAG 2.2 AA aplicáveis.
- **FR-018**: Ciclos anteriores devem manter identificadores, proprietário, período, situação, histórico e conteúdo de título/descrição já armazenado; não devem receber objetivos sintetizados a partir desses textos nem ser descartados para atender ao novo modelo. Novos registros devem ser identificáveis na consulta pelo período, com objetivos acessíveis, sem um título próprio obrigatório.
- **FR-019**: A substituição de título/descrição e o novo cálculo de datas devem ter estratégia de compatibilidade documentada antes da implementação; preservar dados e consumidores existentes e atualizar requisitos/contratos afetados de forma rastreável.
- **FR-020**: Exclusividade de ciclo ativo, transições permitidas e imutabilidade de encerrados permanecem vigentes; esta mudança de cadastro não deve impor objetivos retroativamente para operar ciclos anteriores.

### Key Entities

- **Ciclo de desenvolvimento**: planejamento de um proprietário, com identificador, período, tipo de duração, situação, objetivos conforme FR-006 e histórico; novos cadastros sem título/descrição próprios.
- **Objetivos do ciclo**: lista ordenada de textos que expressam o desenvolvimento pretendido, com pelo menos um item não vazio e sem itens vazios, conforme FR-006. Não inclui neste escopo metas SMART estruturadas, atividades, check-ins ou cálculo de progresso.
- **Período do ciclo**: início e término de calendário; término derivado para duração predefinida, escolhido pelo usuário somente em Personalizado, conforme FR-009/FR-010.
- **Preenchimento em andamento**: valores e etapa atual ainda não confirmados; não equivalem a ciclo criado.
- **Ciclo anterior**: registro criado sob as regras anteriores, com informações históricas preservadas e sem obrigação de conversão automática de texto em objetivos.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Nos dois pontos de entrada, 100% dos cenários verificam o contexto correto (botão → modal; menu → página) e a mesma sequência de três etapas.
- **SC-002**: Em 100% dos cenários de duração predefinida, o término corresponde à regra de FR-009, inclusive fim de mês/ano e ano bissexto, e nenhuma alteração manual do término é aceita.
- **SC-003**: Em Personalizado, 100% dos términos iguais ou anteriores ao início são recusados com orientação; períodos válidos podem ser revisados e confirmados.
- **SC-004**: Em todos os novos cadastros de aceitação, nenhum título/descrição do ciclo é solicitado; a lista contém pelo menos um objetivo não vazio, rejeita itens vazios e preserva textos e ordem após conclusão e recarga.
- **SC-005**: Em 100% dos cenários de voltar/corrigir etapas e falha de envio, o preenchimento é preservado; somente confirmar com sucesso cria um ciclo, sem criação por avanços, cancelamento ou envio simultâneo repetido.
- **SC-006**: Todos os ciclos anteriores usados nos testes permanecem consultáveis com seus dados/histórico preservados e sem mudança de situação; todos os fluxos de ciclo de vida existentes continuam atendidos.
- **SC-007**: Os fluxos essenciais nos dois contextos podem ser concluídos por teclado e compreendidos com leitor de tela, com revisão registrada; não há perda de campos/ações em 320, 390, 768, 1024 e 1440 px.

## Assumptions

- A expressão “um término não deve possuir título ou descrição” foi interpretada como “um ciclo não deve possuir título ou descrição”, pois a mudança de conteúdo foi descrita no contexto do cadastro do ciclo.
- O refinamento multi-step será um fluxo de três etapas: Período, Objetivos e Revisão. Regras de validação e criação valem igualmente em modal e página.
- A nova experiência adota Trimestral como seleção inicial; o usuário pode alterá-la antes de confirmar. O início deve ser informado para permitir o cálculo do término.
- Valores são mantidos ao voltar entre etapas enquanto o cadastro estiver aberto; restaurar preenchimento após recarga ou entre sessões não integra este escopo.
- A política de continuar/descartar cobre os fechamentos e saídas oferecidos pela interface; não se promete impedir fechamento do navegador ou perda por encerramento externo.
- A identificação por período substitui a dependência de título nos registros novos; objetivos ficam acessíveis na consulta. Textos anteriores permanecem preservados como informação histórica.
- Esta especificação substitui, para novos cadastros, a obrigatoriedade de título/descrição e a duração apenas informativa da SPEC-001, além da apresentação permanente/por âncora das SPEC-003/004. As demais regras continuam aplicáveis.
- Paginação, busca, edição completa de objetivos após criação, métricas de progresso, IA e reabertura de ciclos encerrados ficam fora do escopo.
