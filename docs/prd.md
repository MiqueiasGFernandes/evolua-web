# PRD — Evolua | Gestão Inteligente dos Ciclos de Desenvolvimento

**Versão:** 1.0  
**Produto:** Evolua PDI  
**Tipo:** Product Requirements Document  
**Status:** Proposta de evolução funcional  
**Público inicial:** Profissionais gerenciando seu próprio desenvolvimento  
**Estratégia:** MVP individual, com possibilidade futura de colaboração e inteligência artificial

---

## 1. Visão do produto

O Evolua é uma plataforma de desenvolvimento profissional contínuo que transforma objetivos de carreira em ciclos estruturados, mensuráveis e orientados por evidências.

O usuário poderá diagnosticar suas competências, estabelecer objetivos, construir planos de ação, acompanhar a execução, registrar aprendizados e avaliar sua evolução.

A plataforma deve conectar três dimensões fundamentais:

1. **Esforço:** o que o usuário está fazendo para se desenvolver.
2. **Resultado:** quais objetivos e entregas efetivamente alcançou.
3. **Evolução:** quais competências melhoraram e quais evidências sustentam essa conclusão.

O Evolua não deve confundir atividades concluídas com desenvolvimento profissional comprovado.

### 1.1 Proposta de valor

> Transformar intenções de desenvolvimento em progresso visível, mensurável e comprovável.

### 1.2 Objetivos de negócio

- Aumentar a continuidade dos ciclos de desenvolvimento.
- Diminuir o abandono de PDIs.
- Estimular revisões e reflexões periódicas.
- Permitir identificar obstáculos e padrões de evolução.
- Construir um histórico de desenvolvimento que ultrapasse a duração de cada ciclo.
- Criar a base de dados necessária para futuras recomendações personalizadas com IA.

### 1.3 Princípios de produto

- **Simplicidade:** começar um ciclo deve ser fácil.
- **Evolução mensurável:** indicadores precisam possuir definições claras.
- **Evidências:** resultados importantes devem poder ser demonstrados.
- **Autonomia:** o usuário mantém o controle de suas metas e avaliações.
- **Orientação à ação:** dashboards devem ajudar a decidir o próximo passo.
- **Histórico contínuo:** finalizar um ciclo não significa perder seus aprendizados.

---

## 2. Estrutura dos ciclos de desenvolvimento

Um ciclo representa um período planejado de evolução profissional.

Exemplos:

- Ciclo de 30 dias: melhorar comunicação em reuniões.
- Ciclo de 90 dias: desenvolver competências de liderança técnica.
- Ciclo de 180 dias: preparar-se para uma promoção.
- Ciclo de 12 meses: desenvolver competências para uma transição de carreira.

A duração deve ser configurável. O produto pode sugerir 90 dias como padrão inicial, sem impor essa duração.

### 2.1 Etapas do ciclo

| Etapa | Objetivo | Resultado esperado |
|---|---|---|
| 1. Diagnóstico | Entender a situação atual | Linha de base das competências |
| 2. Planejamento | Definir o destino | Metas, indicadores e plano de ação |
| 3. Execução | Desenvolver habilidades | Atividades e entregáveis |
| 4. Acompanhamento | Analisar a trajetória | Check-ins, feedbacks e ajustes |
| 5. Avaliação | Medir resultados | Comparação inicial × final |
| 6. Evolução | Consolidar aprendizados | Histórico e recomendações |

As etapas 3 e 4 acontecem simultaneamente. O acompanhamento não deve ser uma obrigação deixada apenas para o encerramento.

### 2.2 Estados do ciclo

- **Rascunho:** criado, mas ainda não ativado.
- **Ativo:** em execução.
- **Pausado:** interrompido temporariamente.
- **Concluído:** encerrado com avaliação final.
- **Cancelado:** encerrado sem conclusão.

O sistema deve diferenciar o estado do ciclo da sua saúde. Um ciclo pode estar *ativo*, mas *atrasado* ou *em risco*.

### 2.3 Regras de negócio

**RN-001:** Um ciclo pertence a um usuário.

**RN-002:** Um usuário pode possuir um histórico ilimitado de ciclos.

**RN-003:** O sistema deve permitir criar rascunhos sem exigir todas as informações do planejamento.

**RN-004:** Para ativar um ciclo, devem existir pelo menos um objetivo, um período definido e um critério de sucesso.

**RN-005:** Um ciclo pode possuir múltiplos objetivos, competências e ações.

**RN-006:** A pausa de um ciclo deve preservar o histórico e registrar as datas de interrupção.

**RN-007:** A conclusão deve solicitar uma avaliação final, permitindo reconhecer objetivos parcialmente atingidos.

**RN-008:** Alterações relevantes em objetivos, indicadores e prazos devem preservar o histórico anterior.

**RN-009:** Ciclos concluídos devem continuar acessíveis para consulta e comparação.

**RN-010:** Os dados de um ciclo poderão servir como referência para outro, mas não devem ser alterados retroativamente.

---

## 3. Modelo funcional de um ciclo

Cada ciclo será organizado em seis componentes.

| Componente | Informações essenciais |
|---|---|
| Objetivos | Resultado desejado, prazo, prioridade e critérios de sucesso |
| Competências | Nível inicial, nível desejado e indicadores observáveis |
| Plano de ação | Atividades, marcos, categoria 70-20-10 e responsáveis |
| Check-ins | Progresso, dificuldades, aprendizados e próximos passos |
| Evidências | Arquivos, links, registros e comprovações |
| Avaliação | Resultados, evolução de competências e lições aprendidas |

### 3.1 Objetivos de desenvolvimento

Objetivos descrevem o que se pretende alcançar.

Cada objetivo deverá possuir:

- Título e descrição.
- Motivação: por que ele é importante.
- Prazo previsto.
- Prioridade.
- Critério mensurável de sucesso.
- Indicador e valor de referência, quando aplicável.
- Valor-alvo.
- Status.
- Competências relacionadas.
- Ações vinculadas.

Exemplo:

**Objetivo:** Melhorar a capacidade de conduzir decisões técnicas.

**Critério de sucesso:** Conduzir três discussões de arquitetura, produzir dois documentos de decisão e registrar feedback sobre a clareza das decisões.

Esse objetivo oferece medidas mais úteis do que simplesmente "melhorar liderança".

### 3.2 Competências

Competências representam habilidades a desenvolver.

Podem ser agrupadas em categorias:

- Técnicas.
- Comportamentais.
- Liderança.
- Comunicação.
- Visão de negócio.
- Gestão e organização.

Cada competência possuirá uma escala descritiva de 1 a 5:

| Nível | Descrição |
|---|---|
| 1 — Inicial | Conhece conceitos, mas depende de orientação |
| 2 — Básico | Executa atividades simples com suporte |
| 3 — Autônomo | Aplica a competência de maneira independente |
| 4 — Avançado | Resolve problemas complexos e orienta outras pessoas |
| 5 — Referência | Atua como referência e multiplica conhecimento |

O usuário deverá registrar uma avaliação inicial e outra no encerramento, podendo realizar avaliações intermediárias.

**Regra essencial:** a mudança do nível de competência não deve ocorrer automaticamente porque atividades foram concluídas. A conclusão das ações é um sinal de esforço, não uma certificação de habilidade.

### 3.3 Plano de desenvolvimento 70-20-10

O sistema deve permitir classificar as ações de desenvolvimento:

**70% — Experiência prática:** aplicar conhecimentos em situações reais, projetos e desafios.

**20% — Aprendizado social:** mentorias, feedbacks, observação de profissionais e comunidades.

**10% — Aprendizado formal:** cursos, leituras, treinamentos e certificações.

Esses percentuais são referências orientativas, não quotas obrigatórias nem garantia de aprendizagem.

Cada ação poderá conter:

- Título.
- Descrição.
- Categoria 70-20-10.
- Competência e objetivo vinculados.
- Data de início e prazo.
- Prioridade.
- Status: pendente, em andamento, bloqueada, concluída ou cancelada.
- Marco associado, quando houver.
- Notas e links.
- Evidências.
- Resultado observado.

### 3.4 Marcos de desenvolvimento

Marcos indicam conquistas intermediárias.

Exemplo de ciclo de 90 dias:

- Dia 15: realizar diagnóstico.
- Dia 30: concluir primeira experiência prática.
- Dia 60: apresentar uma entrega.
- Dia 75: solicitar feedback.
- Dia 90: realizar avaliação final.

Marcos são diferentes das ações: uma conquista intermediária pode depender da conclusão de várias atividades.

---

## 4. Dashboard inicial — Visão geral do Evolua

A página inicial deverá funcionar como uma central de desenvolvimento, e não apenas como uma listagem de ciclos.

### 4.1 Objetivo da experiência

O usuário deve conseguir responder em poucos segundos:

1. O que está acontecendo com meus ciclos?
2. Estou avançando conforme o planejado?
3. O que exige minha atenção?
4. Quais competências estão evoluindo?
5. Qual é minha próxima ação?

### 4.2 Indicadores principais

| Indicador | Significado | Prioridade |
|---|---|---|
| Ciclos ativos | Quantidade de ciclos em execução | MVP |
| Progresso das ações | Percentual de atividades concluídas | MVP |
| Progresso dos objetivos | Resultado medido em relação às metas | MVP |
| Ações atrasadas | Atividades com prazo vencido | MVP |
| Próximos marcos | Entregas importantes previstas | MVP |
| Frequência de check-ins | Regularidade dos acompanhamentos | MVP |
| Evolução de competências | Comparação entre avaliações | V2 |
| Ciclos concluídos | Histórico de desenvolvimento | MVP |
| Distribuição 70-20-10 | Composição do esforço de aprendizado | V2 |
| Tendência de evolução | Comparação longitudinal entre ciclos | V2 |

### 4.3 Estrutura recomendada do dashboard

**Bloco A — Resumo executivo**

Quatro indicadores em cards:

- Ciclos ativos.
- Progresso de execução.
- Ações atrasadas.
- Próximo marco.

No lugar de vários números decorativos, cada indicador deve permitir navegar até sua origem.

**Bloco B — Ciclos em andamento**

Cards contendo:

- Nome do ciclo.
- Período.
- Objetivo principal.
- Status e situação.
- Progresso das ações.
- Progresso dos resultados, quando mensurável.
- Próximo compromisso.
- Atalho para detalhes.

**Bloco C — Evolução de competências**

Gráfico comparativo mostrando o nível inicial, atual e desejado de cada competência.

**Bloco D — Insights e alertas**

Exibir no máximo três recomendações prioritárias, explicando o motivo de cada uma.

**Bloco E — Próximas ações**

Lista objetiva das atividades que devem receber atenção.

**Bloco F — Histórico e tendências**

Gráfico de evolução por período, com filtro por competência, ciclo e intervalo de datas.

### 4.4 Estados de interface

**Sem ciclos:** apresentar uma introdução aos benefícios do PDI e o CTA "Criar meu primeiro ciclo".

**Com ciclos em rascunho:** destacar a possibilidade de continuar o planejamento.

**Com ciclo ativo:** priorizar progresso, alertas e próxima ação.

**Sem ciclos ativos, mas com histórico:** apresentar resultados anteriores e convite para iniciar outro ciclo.

**Sem dados de avaliação:** exibir um estado informativo, nunca um resultado fictício.

---

## 5. Dashboard individual de cada ciclo

Ao acessar um ciclo, o usuário deverá encontrar uma página específica de acompanhamento.

### 5.1 Organização de navegação

Abas recomendadas:

1. **Visão geral:** resumo, indicadores e próximos passos.
2. **Objetivos:** metas e resultados esperados.
3. **Plano de ação:** tarefas, marcos e cronograma.
4. **Competências:** avaliações e evolução.
5. **Check-ins:** acompanhamento periódico.
6. **Evidências:** registros e materiais anexados.
7. **Avaliação:** resultados finais e histórico de alterações.

Em telas menores, a navegação deverá ser adaptada sem exibir todas as opções simultaneamente.

### 5.2 Indicadores específicos do ciclo

- Percentual do tempo transcorrido.
- Percentual de ações concluídas.
- Progresso de cada objetivo.
- Quantidade de marcos atingidos.
- Quantidade de ações atrasadas ou bloqueadas.
- Data do último check-in.
- Quantidade de evidências registradas.
- Situação dos resultados pretendidos.
- Evolução de competências avaliadas.

### 5.3 Visualização de cronograma

O cronograma deverá apresentar:

- Início e fim do ciclo.
- Atividades e seus prazos.
- Marcos de desenvolvimento.
- Avaliações programadas.
- Check-ins realizados e previstos.

O MVP pode começar com uma timeline vertical; o Gantt completo fica para uma versão posterior.

### 5.4 Quatro dimensões de acompanhamento

O Evolua deve representar o progresso por dimensões distintas:

| Dimensão | Pergunta respondida |
|---|---|
| Execução | O usuário está cumprindo o plano? |
| Resultados | As metas estão sendo alcançadas? |
| Aprendizagem | As competências evoluíram? |
| Consistência | O acompanhamento é regular? |

**Não criar um único percentual de evolução que misture essas quatro dimensões indiscriminadamente.**

---

## 6. Motor de insights

O motor de insights transforma informações registradas em orientações práticas.

Inicialmente, ele deverá funcionar com regras determinísticas, sem depender de inteligência artificial generativa.

### 6.1 Categorias

**Alertas:** problemas que exigem atenção.

**Oportunidades:** ações que podem melhorar o desenvolvimento.

**Conquistas:** resultados positivos identificados.

**Reflexões:** perguntas para estimular autoconhecimento e aprendizado.

### 6.2 Catálogo inicial de insights

| ID | Condição identificada | Insight apresentado |
|---|---|---|
| INS-001 | Ação vencida e incompleta | "Você tem atividades atrasadas neste ciclo." |
| INS-002 | Ausência de check-in por mais de 14 dias | "Seu acompanhamento está desatualizado. Que tal registrar um check-in?" |
| INS-003 | Mais de 60% do período transcorrido e menos de 30% da meta atingida | "Seu resultado está abaixo do ritmo esperado. Revise o plano." |
| INS-004 | Atividade concluída sem evidência vinculada | "Registre o que essa atividade produziu para fortalecer seu histórico." |
| INS-005 | Competência sem reavaliação recente | "Uma nova avaliação ajudará a identificar se houve evolução." |
| INS-006 | Várias ações bloqueadas | "Há impedimentos recorrentes. Considere revisar as próximas atividades." |
| INS-007 | Objetivo atingido antecipadamente | "Você alcançou uma meta antes do prazo. Considere consolidar os aprendizados." |
| INS-008 | Concentração das ações em aprendizagem formal | "Seu plano possui muitas ações teóricas. Considere uma aplicação prática." |
| INS-009 | Atividade constantemente reprogramada | "Esta atividade mudou de prazo várias vezes. Vale revisar sua viabilidade." |
| INS-010 | Ciclo próximo do encerramento | "Seu ciclo está terminando. Prepare a avaliação final." |

### 6.3 Anatomia de um insight

Todo insight deve apresentar:

- Título.
- Descrição contextualizada.
- Indicador ou ocorrência que o originou.
- Prioridade: informativa, atenção ou crítica.
- Data de detecção.
- Ação recomendada.
- Link para a funcionalidade relacionada.
- Opção de dispensar, quando aplicável.

Exemplo:

**Insight:** Seu objetivo pode estar em risco.

**Motivo:** 70% do período transcorreu, mas apenas 35% do resultado esperado foi alcançado.

**Ação recomendada:** Revisar as ações restantes ou ajustar o planejamento.

### 6.4 Regras de qualidade

- Não inventar conclusões sem dados.
- Evitar recomendações repetitivas.
- Priorizar problemas relevantes.
- Explicar por que o insight apareceu.
- Permitir visualizar os dados utilizados.
- Não tratar falta de registros como comprovação de falta de aprendizagem.
- Atualizar ou remover insights quando sua condição deixar de existir.

---

## 7. Check-ins e acompanhamento contínuo

O check-in representa um momento de reflexão estruturada.

### 7.1 Cadência

O usuário poderá selecionar uma periodicidade:

- Semanal.
- Quinzenal.
- Mensal.
- Personalizada.

A frequência semanal poderá ser sugerida, mas não imposta.

### 7.2 Formulário de check-in

Cada check-in deverá registrar:

**Progresso:** O que avancei desde a última revisão?

**Conquistas:** Quais resultados obtive?

**Dificuldades:** O que está impedindo minha evolução?

**Aprendizados:** O que aprendi e como apliquei?

**Próximos passos:** O que priorizarei até a próxima revisão?

**Percepção pessoal:** Como avalio meu progresso neste momento?

O sistema poderá permitir notas, links e evidências vinculadas ao check-in.

### 7.3 Histórico

Os check-ins devem formar uma linha do tempo pesquisável, ajudando a identificar:

- Dificuldades recorrentes.
- Mudanças de prioridade.
- Evolução da autopercepção.
- Momentos de maior produtividade.
- Aprendizados importantes.
- Decisões que alteraram o desenvolvimento.

### 7.4 Check-ins inteligentes — V2

O sistema poderá sugerir perguntas contextuais, como:

"Você concluiu a atividade de apresentação técnica. Quais feedbacks recebeu e o que pretende melhorar?"

Essas perguntas deverão partir de acontecimentos reais registrados no ciclo.

---

## 8. Evidências e anexos de desenvolvimento

Este módulo é essencial para diferenciar o Evolua de um gerenciador tradicional de tarefas.

Uma evidência representa um registro que ajuda a demonstrar execução, aprendizagem ou resultado.

### 8.1 Tipos de evidência

| Tipo | Exemplos |
|---|---|
| Documento | PDF, relatório, apresentação |
| Imagem | Screenshot, registro visual |
| Link | Artigo, portfólio, Pull Request |
| Certificação | Certificado de treinamento |
| Entregável técnico | ADR, diagrama, projeto, repositório |
| Feedback | Comentário ou avaliação recebida |
| Reflexão | Registro textual de aprendizado |
| Resultado | Indicador, métrica ou comparação mensurável |

### 8.2 Metadados

Cada evidência terá:

- Identificador.
- Título.
- Descrição.
- Tipo.
- Data de realização.
- Data de registro.
- Origem ou autoria, quando relevante.
- Arquivo ou URL.
- Competências relacionadas.
- Objetivos relacionados.
- Ações ou check-ins vinculados.

Uma evidência poderá estar vinculada a mais de um componente do ciclo, sem necessidade de duplicar o arquivo.

### 8.3 Experiência de anexação

O usuário deve conseguir adicionar uma evidência diretamente:

- Na conclusão de uma atividade.
- Durante um check-in.
- Ao atualizar uma competência.
- Ao registrar um resultado.
- Durante a avaliação final.

Não será obrigatório acessar uma tela separada de evidências para registrar uma conquista.

### 8.4 Biblioteca de evidências

Uma biblioteca permitirá:

- Consultar anexos de todos os ciclos.
- Filtrar por competência.
- Filtrar por tipo.
- Pesquisar títulos e descrições.
- Visualizar a origem da evidência.
- Reutilizar registros em avaliações futuras, respeitando seu contexto histórico.

### 8.5 Regras

- Anexos devem respeitar os limites de tamanho e formatos permitidos.
- Links externos devem ser validados sem executar conteúdo remoto.
- Arquivos devem passar por validações de segurança.
- O usuário deverá poder excluir anexos, mediante as políticas de retenção.
- Evidências privadas não poderão ser acessadas por outros usuários.
- O sistema não deverá atribuir automaticamente qualidade ou autenticidade a uma evidência apenas por sua existência.

---

## 9. Mensuração da evolução

### 9.1 Progresso das ações

O percentual de execução será:

**Progresso de execução = ações concluídas ÷ ações válidas × 100**

Ações canceladas serão excluídas do cálculo. No futuro, ações poderão utilizar pesos explícitos.

### 9.2 Progresso dos objetivos

Para metas quantitativas, o resultado poderá ser calculado a partir de:

- Valor inicial.
- Valor atual.
- Valor-alvo.
- Direção da melhoria: aumentar ou diminuir.

**Progresso da meta = avanço realizado ÷ avanço necessário × 100**

O valor exibido deverá ser limitado ao intervalo de 0% a 100%. Metas sem diferença entre linha de base e alvo exigirão uma regra específica.

Metas qualitativas deverão ser avaliadas com critérios observáveis e confirmação do usuário, sem fabricar precisão numérica.

### 9.3 Evolução de competências

Para competências avaliadas na mesma escala:

**Variação = nível atual − nível inicial**

Exemplo:

Comunicação técnica: 2 → 4, variação de +2 níveis.

Esse indicador representa uma mudança de avaliação, não uma medida objetiva universal da habilidade.

### 9.4 Regularidade

**Aderência aos check-ins = check-ins realizados no prazo ÷ check-ins previstos × 100**

Pausas registradas devem ser consideradas, evitando penalizar períodos em que o ciclo esteve formalmente interrompido.

### 9.5 Saúde do ciclo

A saúde será uma classificação orientativa:

- Em dia.
- Atenção.
- Em risco.
- Dados insuficientes.

Ela poderá considerar atrasos, progresso medido, bloqueios e ausência de acompanhamentos.

**Importante:** a saúde não é um julgamento sobre a capacidade profissional do usuário.

### 9.6 Indicadores históricos

Em versões posteriores:

- Taxa de conclusão dos ciclos.
- Cumprimento de metas.
- Evolução acumulada por competência.
- Quantidade de evidências associadas a resultados.
- Frequência de replanejamentos.
- Tendência de consistência.
- Resultados mantidos entre ciclos.

Comparações só deverão utilizar ciclos e competências com dados equivalentes.

---

## 10. Avaliação e encerramento

O encerramento deverá ser uma experiência própria, e não apenas uma alteração de status.

### 10.1 Avaliação final

O sistema apresentará:

- Objetivos propostos.
- Resultados alcançados.
- Competências inicialmente avaliadas.
- Nova avaliação das competências.
- Atividades concluídas e pendentes.
- Evidências vinculadas.
- Marcos atingidos.
- Histórico de check-ins.

### 10.2 Reflexão final

O usuário responderá:

- Qual foi minha maior conquista?
- O que realmente evoluiu?
- Quais desafios persistiram?
- O que não funcionou no planejamento?
- Quais aprendizados pretendo manter?
- O que devo desenvolver no próximo ciclo?

### 10.3 Relatório de desenvolvimento

Após a conclusão, o Evolua poderá gerar um relatório com:

- Informações gerais.
- Objetivos e resultados.
- Evolução de competências.
- Principais evidências.
- Indicadores de execução.
- Lições aprendidas.
- Recomendações para continuidade.

A exportação em PDF será uma funcionalidade posterior ao fluxo básico de encerramento.

### 10.4 Continuidade

O usuário poderá:

- Arquivar o ciclo.
- Criar um novo ciclo em branco.
- Criar um ciclo usando o anterior como referência.
- Transportar objetivos pendentes, mediante seleção explícita.
- Manter competências relevantes no histórico de desenvolvimento.

O novo ciclo terá indicadores e prazos próprios, preservando a rastreabilidade do anterior.

---

## 11. Histórico de competências entre ciclos

As competências deverão existir também no perfil de desenvolvimento do usuário, independentemente dos ciclos específicos.

Isso permitirá que o Evolua represente uma jornada contínua.

Exemplo:

| Ciclo | Comunicação | Liderança | Arquitetura |
|---|---|---|---|
| Ciclo 1 | 2 | 2 | 3 |
| Ciclo 2 | 3 | 2 | 4 |
| Ciclo 3 | 4 | 3 | 4 |

O sistema deverá registrar a data e o contexto de cada avaliação.

Um histórico não deve simplesmente somar os níveis obtidos; deve representar como a avaliação de cada competência mudou ao longo do tempo.

---

## 12. Arquitetura de informações e navegação

### Navegação principal sugerida

**Início**
- Dashboard geral.
- Insights.
- Próximas ações.

**Desenvolvimento**
- Meus ciclos.
- Objetivos.
- Plano de ação.
- Check-ins.

**Minha evolução**
- Competências.
- Histórico.
- Evidências.
- Relatórios.

**Configurações**
- Perfil.
- Preferências.
- Notificações.
- Privacidade.

### Hierarquia de navegação

A página **Meus Ciclos** será o ponto de consulta e gerenciamento de ciclos.

A criação deverá ocorrer em uma experiência separada, por página ou drawer, sem misturar o formulário de criação com a listagem.

A página de detalhes do ciclo será o centro operacional do desenvolvimento.

---

## 13. Entidades conceituais

O domínio deverá prever os seguintes agregados e registros:

| Entidade | Responsabilidade |
|---|---|
| DevelopmentCycle | Período, status e dados gerais |
| DevelopmentGoal | Objetivos e resultados pretendidos |
| Competency | Catálogo de habilidades |
| CompetencyAssessment | Avaliações e histórico de níveis |
| DevelopmentAction | Ações planejadas |
| DevelopmentMilestone | Conquistas intermediárias |
| DevelopmentCheckin | Registros periódicos |
| DevelopmentEvidence | Arquivos, links e materiais |
| EvidenceAssociation | Vínculos com objetivos, ações e avaliações |
| DevelopmentReview | Encerramento e avaliação final |
| DevelopmentInsight | Recomendações e alertas gerados |
| CycleHistory | Histórico de alterações relevantes |

A definição de persistência, serviços, endpoints e infraestrutura deverá ocorrer na etapa técnica de planejamento, e não ser imposta pelo PRD.

O modelo deve preservar a separação entre dados de ações, indicadores de resultados e avaliações de competências.

---

## 14. Requisitos não funcionais

### Segurança e privacidade

- Isolamento dos dados por usuário.
- Autorização em todas as operações.
- Tratamento seguro dos anexos.
- Proteção de dados pessoais conforme LGPD.
- Controle sobre exclusão e exportação de dados.
- Proteção de informações inseridas em notas e evidências.
- Registro de alterações relevantes.

### Usabilidade

- Interface responsiva.
- Navegação consistente.
- Estados vazios informativos.
- Feedback claro nas ações.
- Formulários com validação contextual.
- Acessibilidade orientada às WCAG 2.2 AA.
- Indicadores compreensíveis sem depender apenas de cores.

### Confiabilidade dos dados

- Métricas com regras documentadas.
- Atualizações consistentes após alterações.
- Preservação das datas e estados anteriores.
- Tratamento de metas sem dados suficientes.
- Nenhuma inferência apresentada como fato comprovado.

### Performance

O dashboard deverá priorizar o carregamento das informações essenciais, permitindo carregar gráficos e dados históricos progressivamente.

---

## 15. Métricas de sucesso do produto

As seguintes metas são hipóteses iniciais para acompanhamento, não resultados já validados.

| Métrica de produto | Meta inicial sugerida |
|---|---|
| Ativação | 60% dos usuários cadastrados ativam um ciclo |
| Planejamento | 70% dos ciclos ativados possuem ações definidas |
| Engajamento | 50% dos usuários com ciclo ativo realizam check-ins |
| Evidências | 40% dos ciclos ativos possuem ao menos uma evidência |
| Retenção | Acompanhar retorno em 30 dias e definir meta após linha de base |
| Conclusão | Acompanhar percentual de ciclos encerrados com avaliação |
| Continuidade | Medir usuários que iniciam outro ciclo após concluir um |

Essas métricas deverão ser segmentadas pelo tempo de vida do ciclo para evitar interpretações equivocadas.

### Eventos de telemetria

- `cycle_created`
- `cycle_activated`
- `goal_created`
- `action_completed`
- `checkin_created`
- `evidence_added`
- `competency_assessed`
- `insight_opened`
- `insight_action_clicked`
- `cycle_completed`
- `new_cycle_started_from_previous`

Registrar eventos com identificadores e metadados mínimos, evitando enviar conteúdo privado de notas e evidências para ferramentas analíticas.

---

## 16. Priorização do desenvolvimento

A implementação deverá ser dividida em especificações funcionais independentes, respeitando suas dependências.

| SPEC | Domínio | Prioridade |
|---|---|---|
| SPEC-001 | Gerenciamento de ciclos | P0 — Em andamento |
| SPEC-002 | Objetivos de desenvolvimento | P0 |
| SPEC-003 | Competências e avaliações | P0 |
| SPEC-004 | Planos de ação e marcos | P0 |
| SPEC-005 | Check-ins e acompanhamento | P0 |
| SPEC-006 | Evidências e anexos | P0 |
| SPEC-007 | Dashboard inicial e indicadores | P0 |
| SPEC-008 | Avaliação e encerramento | P0 |
| SPEC-009 | Insights baseados em regras | P1 |
| SPEC-010 | Histórico e comparações | P1 |
| SPEC-011 | Notificações e lembretes | P1 |
| SPEC-012 | Relatórios e exportação | P2 |
| SPEC-013 | Recomendações com IA | P2 |
| SPEC-014 | Compartilhamento e colaboração | Futuro |

P0 representa o núcleo funcional do produto, não necessariamente uma única entrega. Cada especificação deverá passar por definição, planejamento e implementação próprios.

### Fora do escopo do MVP

- Gestão de equipes e colaboradores.
- Avaliação obrigatória por gestores.
- Rankings de desempenho entre pessoas.
- Integrações com sistemas corporativos de RH.
- Gamificação avançada.
- Recomendações geradas por LLM.
- Diagnóstico automático de personalidade.
- Planejamento de carreira baseado em dados externos.

---

## 17. Critérios de aceite de alto nível

**CA-001 — Criação de ciclo:** o usuário pode criar e consultar um rascunho com nome e datas válidas.

**CA-002 — Ativação:** um ciclo só é ativado quando possui as informações mínimas de planejamento.

**CA-003 — Objetivos:** o usuário pode cadastrar metas com critérios claros de sucesso.

**CA-004 — Ações:** concluir uma atividade atualiza o progresso de execução, mas não altera automaticamente o nível de competência.

**CA-005 — Check-ins:** registros preservam conteúdo, autoria e data.

**CA-006 — Evidências:** arquivos e links podem ser relacionados a ações, objetivos, avaliações ou check-ins.

**CA-007 — Indicadores:** mudanças relevantes refletem nos dashboards sem gerar métricas contraditórias.

**CA-008 — Insights:** cada recomendação é justificável por uma condição identificável nos dados.

**CA-009 — Avaliação:** o encerramento permite comparar resultados inicialmente esperados com resultados observados.

**CA-010 — Histórico:** os ciclos concluídos permanecem consultáveis e suas avaliações continuam vinculadas às competências.

**CA-011 — Privacidade:** usuários não acessam ciclos, anexos ou avaliações pertencentes a terceiros.

**CA-012 — Dados insuficientes:** o sistema informa quando uma avaliação não pode ser calculada, sem substituir dados ausentes por zero.

---

## 18. Evolução futura: inteligência artificial

A inteligência artificial deverá ampliar o acompanhamento, sem substituir os dados estruturados do produto.

### Assistente de planejamento

Ajudar a transformar objetivos genéricos em metas e ações mensuráveis.

### Assistente de check-ins

Sugerir perguntas a partir de atividades, dificuldades e resultados anteriores.

### Análise de padrões

Identificar obstáculos recorrentes, mudanças de ritmo e tipos de ação associados aos melhores resultados registrados pelo próprio usuário.

### Recomendações de desenvolvimento

Sugerir atividades para competências prioritárias com base no histórico e nos objetivos definidos.

### Relatório narrativo

Resumir evidências e aprendizados em uma narrativa de evolução profissional.

A IA deverá distinguir observações, inferências e recomendações, oferecer explicações, permitir correção pelo usuário e respeitar controles de privacidade.

**Não utilizar IA para determinar unilateralmente o nível de competência, certificar entregas ou tomar decisões sobre a carreira do usuário.**

---

## 19. Questões de produto para validação

Antes de expandir o MVP, validar com usuários reais:

1. O usuário prefere iniciar com um objetivo ou com um diagnóstico de competências?
2. Qual é o menor esforço aceitável para um check-in semanal?
3. Quais gráficos realmente ajudam a decidir a próxima ação?
4. As evidências melhoram a percepção de evolução ou geram excesso de preenchimento?
5. O acompanhamento por competências traz mais valor do que apenas metas e tarefas?
6. O usuário entende a diferença entre progresso de execução e progresso de resultados?
7. Quais tipos de insights provocam ações úteis em vez de serem ignorados?

---

## 20. Definição de sucesso do MVP

O MVP será considerado funcional quando um usuário conseguir realizar, de ponta a ponta, a seguinte jornada:

**Criar um ciclo → definir objetivos → avaliar competências → planejar ações → executar atividades → registrar check-ins e evidências → acompanhar indicadores → avaliar resultados → encerrar e consultar seu histórico.**

O objetivo não é construir o maior número de funcionalidades, mas entregar um processo de desenvolvimento completo e utilizável.

O Evolua deverá tornar o progresso profissional visível sem transformar o autodesenvolvimento em burocracia.

**Princípio central:** registrar atividades é útil; compreender o aprendizado e demonstrar evolução é o verdadeiro valor do produto.
