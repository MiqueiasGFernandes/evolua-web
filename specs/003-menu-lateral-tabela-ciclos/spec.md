# Feature Specification: Menu lateral e tabela de ciclos

**Feature Branch**: `main`  
**Created**: 2026-11-06  
**Status**: Draft  
**Input**: User description: "$speckit-specify Gostaria que a página de ciclos de PDI possuísse um Menu burguer lateral collapsável e responsivo. E ao lado dele ocupando a maior parte do grid quero que os dados de \"Meus Ciclos\" sejam exibidos de maneira tabular"

## Clarifications

### Session 2026-11-06

- Q: Quais destinos devem aparecer no menu lateral da página atual? → A: Dentro do grupo “Ciclos”, incluir atalhos “Meus Ciclos” e “Novo Ciclo”, ambos apontando para as seções existentes na própria página.

- Q: Em quais larguras o menu deve funcionar como painel sobreposto, aberto pelo botão de menu? → A: Abaixo de 1024 px, painel sobreposto; a partir de 1024 px, menu lateral expandido ou compacto.

## User Scenarios & Testing

Nesta especificação, “telas estreitas” são larguras abaixo de 1024 px CSS e “telas largas” são larguras a partir de 1024 px CSS.

O ator é a pessoa que já utiliza a página de ciclos de PDI. Esta evolução reorganiza a página existente em uma navegação lateral recolhível e uma área principal de consulta tabular. Cadastro, filtro, leitura dos ciclos e transições continuam disponíveis nos mesmos fluxos.

### User Story 1 - Consultar ciclos em tabela (Priority: P1)

Como profissional, quero ver meus ciclos em linhas e colunas ao lado da navegação, para comparar rapidamente título, período, situação e ações disponíveis.

**Why this priority**: A tabela é a principal mudança solicitada e deve dar mais espaço à consulta dos ciclos.

**Independent Test**: Abrir a página com ciclos de diferentes situações, ler os dados por coluna e executar as ações já existentes.

**Acceptance Scenarios**:

1. **Given** ciclos existentes, **When** consulto “Meus Ciclos”, **Then** cada ciclo ocupa uma linha e apresenta título, período, situação em português e ações permitidas.
2. **Given** ciclos encerrados, **When** consulto a tabela, **Then** as linhas não oferecem ações incompatíveis com seu estado final.
3. **Given** um filtro de situação selecionado, **When** os resultados são exibidos, **Then** o filtro permanece visível e as linhas correspondem ao estado escolhido.
4. **Given** uma tabela sem resultados, **When** consulto a região, **Then** recebo o estado vazio apropriado para primeiro uso ou filtro sem correspondência.

### User Story 2 - Recolher e expandir a navegação (Priority: P1)

Como profissional, quero recolher ou expandir o menu lateral por um controle de menu, para ajustar o espaço entre navegação e conteúdo sem perder o contexto.

**Why this priority**: A navegação recolhível permite que a tabela use a maior parte da área disponível em telas maiores.

**Independent Test**: Alternar o menu aberto e recolhido, verificar o nome acessível do controle e confirmar que a tabela se ajusta sem perder dados ou operações.

**Acceptance Scenarios**:

1. **Given** a página em tela larga, **When** aciono o controle de menu, **Then** a navegação recolhe e a área de ciclos amplia; ao acioná-lo novamente, a navegação retorna.
2. **Given** a navegação recolhida, **When** identifico a opção atual, **Then** seu destino e estado ativo continuam compreensíveis e acessíveis.
3. **Given** qualquer estado do menu, **When** navego por teclado, **Then** aciono o controle, percorro os destinos disponíveis e percebo foco e estado expandido/recolhido.
4. **Given** o grupo “Ciclos” no menu, **When** seleciono “Meus Ciclos” ou “Novo Ciclo”, **Then** chego à respectiva seção existente da página e o destino selecionado fica identificado.

### User Story 3 - Usar menu e tabela em telas estreitas (Priority: P1)

Como profissional em celular ou tablet, quero acessar o menu e consultar a tabela sem perder controles nem conteúdo essencial.

**Why this priority**: A página deve permanecer utilizável em dispositivos móveis e a nova composição altera a distribuição de largura.

**Independent Test**: Usar a página em larguras de celular, tablet e desktop, abrir/fechar menu e percorrer linhas, filtro e formulário.

**Acceptance Scenarios**:

1. **Given** tela estreita, **When** aciono o menu, **Then** a navegação abre como painel lateral sobreposto com fechamento compreensível e retorno ao conteúdo.
2. **Given** tabela em tela estreita, **When** consulto seus dados, **Then** nenhum conteúdo essencial fica cortado; eventual rolagem horizontal fica contida na região tabular e não na página inteira.
3. **Given** formulário e operações existentes, **When** uso a página em celular, **Then** consigo alcançar campos, filtro, ações e mensagens sem sobreposição ou perda de valores.

### Edge Cases

- Menu recolhido quando a página é aberta em viewport estreita; a navegação móvel começa fechada.
- Redimensionamento entre breakpoint móvel e desktop com menu aberto; o estado resultante permanece previsível e o foco não se perde.
- Título longo sem espaços, descrição longa, nome de situação e ações competem por largura na linha.
- Tabela vazia, filtro sem resultados, carregamento e erro de leitura mantêm mensagens distinguíveis.
- Transição remove ou atualiza linha que continha o foco; foco segue para destino relacionado.
- Usuário opera menu e tabela sem mouse, com leitor de tela e ampliação.

## Requirements

### Functional Requirements

- **FR-001**: A página MUST apresentar “Meus Ciclos” em estrutura tabular com cabeçalhos acessíveis para título, período, situação e ações.
- **FR-002**: Cada ciclo MUST ocupar uma linha, preservando valores, status em português, datas e ações permitidas pelo comportamento atual.
- **FR-003**: A área tabular MUST ocupar a maior parte do grid disponível ao lado da navegação em telas largas; em telas estreitas, o conteúdo MUST usar a largura disponível sem sidebar permanente.
- **FR-004**: A navegação MUST possuir controle de menu com estado expandido/recolhido perceptível, nome acessível e operação por teclado.
- **FR-005**: Em telas largas (a partir de 1024 px CSS), o menu MUST poder recolher para liberar espaço horizontal e expandir para exibir os destinos disponíveis.
- **FR-006**: Em telas estreitas (abaixo de 1024 px CSS), o menu MUST abrir como painel lateral sobreposto e MUST poder fechar por controle visível, tecla Escape e seleção de destino; o foco MUST retornar ao controle que o abriu quando o painel fechar sem navegação.
- **FR-007**: A navegação MUST conter o grupo “Ciclos” com os atalhos “Meus Ciclos” e “Novo Ciclo”, que levam às respectivas seções existentes da página; MUST NOT criar rotas ou funcionalidades novas.
- **FR-008**: O filtro existente MUST permanecer disponível, selecionado e associado aos resultados tabulares após operações.
- **FR-009**: Estados vazio, filtro sem resultados, carregamento e falha MUST permanecer distintos na área de resultados.
- **FR-010**: Em larguras insuficientes, a rolagem horizontal da tabela MUST ficar contida em sua região, sem causar overflow horizontal na página e sem remover dados essenciais.
- **FR-011**: Cadastro e transições existentes MUST continuar acessíveis e preservar limites, validações, armazenamento, valores e histórico.
- **FR-012**: A composição MUST manter contraste, foco visível, nomes de controles, cabeçalhos semânticos, suporte a ampliação e alvos de toque conforme os critérios WCAG 2.2 AA aplicáveis.
- **FR-013**: As mudanças MUST preservar contrato OpenAPI, regras de negócio, formato persistido e arquitetura geral do frontend.
- **FR-014**: A referência visual da tabela e dos estados do menu MUST ser aprovada antes da aceitação de screenshots; baselines MUST ser alterados somente após aprovação humana da comparação candidata.

### Key Entities

- **Ciclo de PDI**: registro existente com título, período, situação e histórico; a tabela apresenta seus dados sem alterar o modelo.
- **Estado de navegação**: estado transitório da interface que indica se o menu lateral está expandido, recolhido ou aberto como painel móvel; não constitui dado de negócio.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Em todas as dimensões obrigatórias, não há overflow horizontal da página, sobreposição ou perda de conteúdo essencial; se necessária, a rolagem da tabela permanece contida.
- **SC-002**: Usuários identificam os cabeçalhos da tabela e localizam situação e ações de um ciclo sem depender apenas de cor ou posição visual.
- **SC-003**: Todas as funções do menu, filtro, cadastro e ações tabulares podem ser operadas por teclado com foco visível e ordem lógica.
- **SC-004**: A navegação móvel abre e fecha sem armadilha de foco, com retorno de foco adequado quando fechada sem troca de destino.
- **SC-005**: Fluxos anteriores de cadastro, filtro, consulta e transições mantêm resultados e persistência, sem regressões novas nos testes E2E.
- **SC-006**: Cada estado aprovado do menu e tabela tem comparação visual registrada em desktop, tablet e mobile antes de qualquer atualização de baseline.

## Assumptions

- O menu contém o grupo “Ciclos” com os atalhos “Meus Ciclos” e “Novo Ciclo”, que navegam às seções existentes da página; não se presume criação de novas rotas ou seções funcionais.
- A partir de 1024 px CSS, o controle de menu permite alternar a navegação entre expandida e compacta; abaixo de 1024 px CSS, começa fechada e funciona como painel lateral temporário.
- A tabela inclui as colunas título, período, situação e ações, pois representam dados e controles já existentes na lista.
- Em telas cuja largura não comporta todas as colunas, a tabela pode rolar horizontalmente dentro de sua própria região.
- A tabela substitui apenas a apresentação da lista de ciclos. A posição visual do formulário pode ser ajustada no planejamento, preservando ordem de leitura e fluxo de cadastro existente.
- A identidade visual aprovada para SPEC-002 continua sendo referência, salvo decisão humana posterior que aprove uma atualização estética específica.
