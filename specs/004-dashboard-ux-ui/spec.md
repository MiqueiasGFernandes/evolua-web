# Feature Specification: Refatoração do dashboard Evolua

> Evolução de criação: a [SPEC-005](../005-cadastro-guiado-ciclos/spec.md) substitui, para novos cadastros, título/descrição por objetivos, duração informativa por término automático e formulário permanente/âncora por modal ou página guiada. Demais regras e evidências históricas permanecem.

**Feature Branch**: `main`  
**Created**: 2026-11-06  
**Status**: Implementado e validado automaticamente; aceitação pendente da revisão manual com leitor de tela  
**Input**: Refatorar UX/UI segundo a direção de dashboard descrita no prompt, preservando funcionalidades e arquitetura.

## Clarifications

### Session 2026-11-06

- Q: Como os ciclos devem ser apresentados no celular quando todas as colunas não couberem na tela? → A: Empilhar os dados de cada ciclo, mantendo título, período, situação e ações visíveis e preservando a semântica da tabela.

- Q: A revisão manual com leitor de tela deve ser obrigatória para aceitar esta refatoração? → A: Exigir testes automáticos, navegação por teclado e revisão manual com leitor de tela.

## User Scenarios & Testing

### User Story 1 - Consultar com hierarquia clara (Priority: P1)
Como profissional, quero distinguir navegação, contexto, resultados e cadastro para acompanhar meus ciclos.
**Why this priority**: A consulta é a atividade central da única tela existente.
**Independent Test**: Consultar quatro situações e filtrar os ciclos.
**Acceptance Scenarios**:
1. **Given** ciclos existentes, **When** abro a página, **Then** vejo navegação grafite, cabeçalho claro e painéis separados para consulta e cadastro, com título, período, situação e ações legíveis.
2. **Given** filtro selecionado, **When** executo uma transição, **Then** seleção, dados, histórico e restrições anteriores são preservados.

### User Story 2 - Planejar com componentes consistentes (Priority: P1)
Como profissional, quero preencher um formulário com campos, mensagens e ações consistentes.
**Why this priority**: O cadastro precisa continuar simples e confiável.
**Independent Test**: Criar rascunho, recarregar e conferir valores.
**Acceptance Scenarios**:
1. **Given** formulário válido, **When** cadastro, **Then** o ciclo persiste como rascunho com os mesmos campos e validações existentes.
2. **Given** carregamento, falha ou ausência de resultados, **When** consulto a página, **Then** cada condição possui mensagem distinguível.

### User Story 3 - Navegar em qualquer largura (Priority: P1)
Como usuário de teclado ou dispositivo móvel, quero acessar destinos e dados sem cortes ou perda de foco.
**Why this priority**: O layout compartilhado afeta toda a aplicação.
**Independent Test**: Testar menu, âncoras e cadastro em celular, tablet e desktop.
**Acceptance Scenarios**:
1. **Given** largura inferior a 1024 px, **When** abro o menu, **Then** vejo painel temporário que fecha por Escape, botão, fundo ou destino.
2. **Given** menu aberto, **When** sigo um destino, **Then** o foco vai à seção; se fecho sem navegar, retorna ao acionador.
3. **Given** largura a partir de 1024 px, **When** recolho a sidebar, **Then** conteúdo amplia e destinos continuam nomeados e selecionados.
4. **Given** um celular cuja largura não comporte todas as colunas, **When** consulto os ciclos, **Then** os dados de cada ciclo são empilhados, com título, período, situação e ações visíveis, sem exigir rolagem horizontal para consultá-los.

5. **Given** uso de leitor de tela, **When** percorro navegação, consulta, filtro e cadastro, **Then** identifico controles e dados, executo as ações permitidas e recebo os anúncios de carregamento, erro e sucesso.

### Edge Cases
- Redimensionar com menu aberto; foco permanece em elemento visível.
- Título longo sem espaços e ações de dois botões em linha estreita.
- Primeiro uso, filtro sem resultados, carregamento e erro de armazenamento.
- Preferência de movimento reduzido, ampliação e navegação só por teclado.

## Requirements
### Functional Requirements
- **FR-001**: Manter todos os campos, filtros, ações, limites, datas, status, histórico e persistência existentes.
- **FR-002**: Aplicar sidebar grafite de aproximadamente 232 px, cabeçalho claro de 64 px e conteúdo em painéis brancos, com bordas discretas e cantos de 8–12 px.
- **FR-003**: Preservar o verde da identidade Evolua, com escala sans-serif e padrões únicos de cores, espaços, bordas e estados de interação.
- **FR-004**: Navegação deve indicar destino selecionado, ter operação por teclado e oferecer acesso direto ao conteúdo.
- **FR-005**: Abaixo de 1024 px, menu sobreposto; a partir de 1024 px, sidebar recolhível. Redimensionamento não pode deixar conteúdo bloqueado.
- **FR-006**: Resultados devem manter tabela semântica e cabeçalhos associados. Em celulares cuja largura não comporte todas as colunas, os dados de cada ciclo devem ser empilhados, mantendo título, período, situação e ações visíveis, sem exigir rolagem horizontal para consultá-los e sem overflow de página.
- **FR-007**: Estado vazio, leitura pendente, falha e feedback de operação devem continuar distintos, nomeados e acessíveis.
- **FR-008**: Não adicionar gráficos, rotas, métricas de negócio ou controles sem função existente.
- **FR-009**: Reutilizar controles e componentes existentes, extraindo apenas padrões compartilhados de uso concreto.
- **FR-010**: Registrar auditoria anterior, decisões, requisitos, tarefas e evidências finais. Screenshots são candidatos de revisão, não baselines aprovados.
- **FR-011**: A aceitação exige testes automáticos de acessibilidade, verificação de navegação por teclado e revisão manual com leitor de tela. A revisão manual deve cobrir navegação, consulta, filtro, cadastro e feedback, com registro do leitor de tela, navegador e resultados; falhas que impeçam executar ações essenciais ou compreender seus resultados devem ser corrigidas antes da aceitação.

### Key Entities
- **Ciclo de PDI**: entidade existente, sem mudança de dados ou regras.
- **Estado de navegação**: destino ativo e expansão transitórios, sem persistência de negócio.

## Success Criteria
### Measurable Outcomes
- **SC-001**: Sem overflow horizontal de página em 320, 390, 768, 1024, 1280 e 1440 px. Em 320 e 390 px, título, período, situação e ações de cada ciclo ficam visíveis na apresentação empilhada, sem exigir rolagem horizontal.
- **SC-002**: Cadastro persistente, filtro e quatro transições permitidas continuam aprovados nos testes existentes.
- **SC-003**: Menu e âncoras funcionam por teclado, com retorno de foco e estado selecionado verificáveis.
- **SC-004**: Nenhuma violação automática dos critérios WCAG 2.2 A/AA aplicáveis detectada nos estados vazio, misto, erro e menu móvel, com verificação por teclado e revisão manual com leitor de tela concluídas e registradas nos fluxos definidos em FR-011. Todos os fluxos essenciais devem ser executáveis e seus resultados compreensíveis nessa revisão; testes automáticos isolados não concluem a aceitação.
- **SC-005**: Evidências anteriores e posteriores de desktop, tablet e celular ficam disponíveis para revisão humana, sem sobrescrever snapshots aprovados.

## Assumptions
- O prompt chegou sem anexo visual e truncado no princípio de consistência; o texto recebido é a direção autorizada.
- A tela `/pdi-cycles` é o escopo; `/` apenas redireciona. Não há outras páginas funcionais.
- O pedido atual autoriza atualizar a estética da SPEC-002 e preservar o trabalho local da SPEC-003.
- Preservar Source Sans 3 local e o verde existente atende à identidade; a lavanda é apenas sugestão do prompt.
