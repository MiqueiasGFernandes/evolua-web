# Feature Specification: Refinamento de Design e Experiência do Usuário — PDI Web

**Feature Branch**: `main` (branch atual; nenhuma branch criada)

**Feature ID**: SPEC-002 · `002-refinamento-ux-ui`

**Created**: 2026-11-06

**Status**: Aprovada para planejamento pelo usuário em 2026-11-06. Direção A — Caderno de percurso selecionada após apresentação das três prévias; referências detalhadas de estados e baselines ainda exigem revisão própria.

**Input**: Evoluir exclusivamente apresentação e experiência da interface existente, com identidade própria, consistência, responsividade e acessibilidade, preservando funcionalidades, regras, contrato e arquitetura. Não implementar nesta etapa.

**Fundamentação**: [SPEC-001](../001-ciclos-pdi/spec.md), [diagnóstico inicial](diagnostico.md) e [observações da navegação](evidence/observations.json). A inspeção e as capturas precederam estes requisitos. As imagens do diagnóstico são evidência histórica, **não referências aprovadas ou baselines de aceitação**.

## User Scenarios & Testing *(mandatory)*

O ator é o profissional que utiliza seus ciclos existentes. Cadastro, lista, filtro e transições estão na mesma superfície. Edição, detalhe, histórico e controles de paginação da SPEC-001 não foram encontrados na interface; a matriz de compatibilidade delimita essas dependências sem incluí-las como funcionalidades novas.

### User Story 1 - Compreender e acompanhar meus ciclos (Priority: P1)

Como profissional, quero reconhecer ciclos, períodos, estados e ações para acompanhar meu desenvolvimento sem interpretar códigos ou disputar atenção com decoração.

**Why this priority**: Leitura e descoberta das ações sustentam os fluxos disponíveis.

**Independent Test**: Consultar lista com quatro estados, identificar um ativo e distinguir suas ações sem cadastrar novos dados.

**Acceptance Scenarios**:

1. **Given** lista com rascunhos, ativos e encerrados, **When** consulto, **Then** cada item apresenta título, período e status em português, com hierarquia uniforme e sem depender apenas de cor.
2. **Given** rascunho ou ativo, **When** examino ações, **Then** iniciar/concluir e cancelar têm rótulos claros e papéis visuais distintos; encerrados não apresentam ações que contrariem sua imutabilidade.
3. **Given** componentes equivalentes em diferentes regiões, **When** comparo tipografia, tamanho, espaçamento e estados, **Then** seguem o mesmo padrão ou variante com finalidade documentada.
4. **Given** filtro selecionado, **When** consulto resultados, **Then** reconheço o critério e consigo voltar a “Todos” pelo controle existente, com a mesma semântica de consulta.

### User Story 2 - Cadastrar e corrigir em qualquer tela (Priority: P1)

Como profissional, quero preencher o formulário no computador, tablet ou celular e entender erros, para criar meu ciclo sem perder o que digitei.

**Why this priority**: O formulário é a entrada do produto e ocupa parte significativa da tela atual.

**Independent Test**: Em cada dimensão obrigatória, enviar datas inválidas, corrigir e criar um ciclo válido.

**Acceptance Scenarios**:

1. **Given** qualquer viewport obrigatória, **When** preencho o cadastro, **Then** rótulos, valores, mensagens e envio permanecem acessíveis sem rolagem horizontal, sobreposição ou corte de controles.
2. **Given** datas iguais ou campo inválido, **When** envio, **Then** a regra existente recusa a operação, a mensagem identifica o problema junto ao campo e se associa a ele para tecnologia assistiva; os demais valores permanecem preenchidos.
3. **Given** dados válidos, **When** envio, **Then** recebo confirmação perceptível e anunciada; o rascunho aparece se compatível com o filtro, e o formulário só é limpo após sucesso.
4. **Given** operação pendente, **When** tento enviar novamente, **Then** vejo processamento e ação temporariamente indisponível, sem novas submissões pela interface.
5. **Given** teclado virtual no celular, **When** acesso datas e envio, **Then** consigo rolar até campo e ação, sem bloqueio de orientação ou zoom.

### User Story 3 - Operar com teclado e tecnologia assistiva (Priority: P1)

Como profissional que utiliza teclado, ampliação ou leitor de tela, quero perceber minha posição e operar todos os controles existentes com autonomia.

**Why this priority**: Acessibilidade é condição de uso e princípio da constituição do projeto.

**Independent Test**: Cadastrar, filtrar, iniciar, concluir e cancelar apenas por teclado; conferir campos, erros e resultados com leitor de tela.

**Acceptance Scenarios**:

1. **Given** página carregada, **When** uso Tab, Shift+Tab, Enter, Espaço e teclas próprias dos seletores, **Then** alcanço e opero todos os controles habilitados em ordem compreensível, sem armadilha de foco.
2. **Given** controle focado, **When** navego ou atualizo resultados, **Then** o foco permanece visível, não inteiramente encoberto e em posição lógica; se seu controle desaparecer, vai para o item atualizado ou região de resultado relacionada.
3. **Given** textos e controles em seus estados aplicáveis, **When** meço contraste, **Then** os pares atendem RF-UI-017.
4. **Given** texto a 200%, zoom a 400% ou espaçamento textual ampliado, **When** percorro a página, **Then** não perco informação ou ações, conforme RF-UI-018.
5. **Given** erro ou alteração de status, **When** uso leitor de tela, **Then** identifico resultado e relação com a operação sem procurar visualmente no topo da página.

### User Story 4 - Entender resultados, falhas e disponibilidade (Priority: P1)

Como profissional, quero distinguir vazio, filtro sem resultados, carregamento e falha, para saber o que aconteceu e qual ação existente posso realizar.

**Why this priority**: Estados ambíguos prejudicam confiança e recuperação.

**Independent Test**: Exercitar primeiro uso, filtro vazio, falha de leitura, erro de datas e tentativa de iniciar segundo ativo.

**Acceptance Scenarios**:

1. **Given** nenhum ciclo e nenhum filtro, **When** consulto, **Then** a mensagem explica a primeira utilização e aponta ao formulário; **Given** filtro vazio, **Then** identifica esse contexto e orienta alterar o seletor existente.
2. **Given** leitura pendente, **When** aguardo, **Then** há indicação visual e anúncio de carregamento, sem vazio prematuro; **Given** falha, **Then** há erro em vez de afirmar inexistência de ciclos.
3. **Given** falha técnica, **When** ocorre, **Then** recebo português compreensível e orientação compatível com ações disponíveis, sem detalhes internos, sucesso falso ou descarte de dados.
4. **Given** ciclo ativo, **When** tento iniciar outro, **Then** a restrição permanece e o motivo aparece junto à operação, sem alterar indevidamente status.
5. **Given** resultado de transição, **When** a lista atualiza, **Then** ele é anunciado e o filtro continua selecionado, sem inferir progresso profissional não medido.

### User Story 5 - Usar uma interface coerente e aprovada (Priority: P2)

Como profissional, quero organização, identidade e maturidade visual consistentes entre regiões, estados e dispositivos.

**Why this priority**: Consolida qualidade percebida sobre fluxos preservados.

**Independent Test**: Comparar referências aprovadas e telas candidatas, com os mesmos dados, em desktop, tablet e mobile.

**Acceptance Scenarios**:

1. **Given** proposta visual, **When** o responsável pelo produto revisa, **Then** avalia AE-001–AE-005 separadamente dos requisitos objetivos e registra decisão e ajustes.
2. **Given** referência ainda não aprovada, **When** se pretende atualizar screenshots, **Then** nenhum baseline é criado ou substituído como aprovado.
3. **Given** diferença visual em um incremento, **When** revisada, **Then** o registro identifica requisito, comparação, viewport e estado; aprovação estética não oculta regressões funcionais ou de acessibilidade.
4. **Given** preferência por movimento reduzido, **When** interajo, **Then** não há movimento dispensável e o feedback continua compreensível.

### Edge Cases

- Título válido de 120 caracteres sem espaços; descrição de 2.000; mensagens longas e traduções. Não alterar limites de entrada para corrigir layout.
- Zero, um e até 20 itens da página atual; filtro vazio; não esconder resultados para limpar a composição.
- Datas iguais, final anterior à inicial, campos ausentes e limites de texto: melhorar feedback sem mudar validade.
- Falha na primeira leitura ou após resultados prévios; não apresentar dados antigos como atualização bem-sucedida.
- Criação sob filtro “Ativo”: confirmar o rascunho mesmo que não apareça, sem mudar o filtro silenciosamente.
- Transição remove item ou controle focado; encaminhar foco para destino relacionado.
- Repetição de envio pendente, navegação até fim da página, troca de orientação durante preenchimento.
- Janela estreita, zoom, texto ampliado, teclado virtual, seletor nativo de data e movimento reduzido.
- Falhas preexistentes e superfícies ausentes são registradas separadamente; não autorizam novas regras ou funcionalidades.

## Requirements *(mandatory)*

### Functional Requirements

RF-UI são requisitos objetivos obrigatórios. A aparência exata será escolhida por aprovação humana, respeitando estes limites. Os cenários V-01–V-11 complementam as histórias e tornam cada grupo verificável.

#### Identidade visual e significado

- **RF-UI-001**: A interface MUST ter catálogo único de papéis para fundo, superfícies, texto, borda, ações, cancelamento, foco, sucesso, aviso e erro, com valores documentados. Todas as ocorrências equivalentes auditadas MUST seguir o catálogo ou ter exceção justificada.
- **RF-UI-002**: Estados MUST aparecer como “Rascunho”, “Ativo”, “Concluído” e “Cancelado”, mantendo correspondência com os valores existentes. Cor MUST ter significado estável e texto complementar. A apresentação MUST NOT inferir percentual de progresso, desempenho ou cumprimento de metas a partir de status ou tempo decorrido.
- **RF-UI-003**: Cada região de tarefa MUST distinguir ação principal, secundária e cancelamento, com rótulos explícitos. Ícones MUST comunicar informação ou ação identificável e ter nome acessível quando forem o único conteúdo do controle.

#### Tipografia e espaçamento

- **RF-UI-004**: A referência MUST definir tamanho, peso e entrelinha para título da página, seção, item, corpo, rótulo e texto auxiliar. A página MUST ter um título principal, hierarquia semântica sem saltos artificiais e aplicação uniforme dos papéis. Corpo e entrada de formulário MUST usar tamanho padrão mínimo de 16 pixels CSS, respeitando ampliação pelo usuário.
- **RF-UI-005**: A referência MUST definir escala finita de espaçamento e regras de margens, áreas internas, campos, ações e seções. Instâncias equivalentes MUST usar o mesmo valor por faixa de largura; separação entre seções MUST superar a de elementos do mesmo grupo. Exceções, inclusive controles nativos, MUST ser registradas.

#### Layout, grid e responsividade

- **RF-UI-006**: O layout MUST definir limites de conteúdo, margens, colunas, alinhamentos e reorganização para celular, tablet e desktop. Matriz obrigatória: 320×568, 360×800, 390×844, 768×1024, 1024×768, 1280×800 e 1440×1000 pixels CSS; também 844×390 em paisagem. Larguras intermediárias MUST permanecer utilizáveis.
- **RF-UI-007**: Formulário, mensagens, filtros e itens MUST permanecer na largura útil, sem rolagem horizontal da página, sobreposição ou perda de informação. Títulos longos MUST quebrar linha. Esconder overflow da página, cortar texto essencial ou reduzir dados aceitos MUST NOT aprovar este requisito. Rolagem interna durante edição, própria do controle, é permitida.
- **RF-UI-008**: Ordem visual e de leitura MUST preservar relações entre título, formulário, filtro, resultados e ações. Campos e botões MUST adaptar disposição à largura, preservando legibilidade e toque. Nova barra lateral ou navegação global MUST NOT ser adicionada apenas por convenção de dashboard.

#### Componentes reutilizáveis e navegação

- **RF-UI-009**: Campos, seletores, áreas de texto, botões, indicadores de status, itens e mensagens MUST ter padrões documentados para estados aplicáveis: padrão, sobrevoo, pressionado, foco, inválido, indisponível e processamento. Mesmo papel/estado MUST ter mesma apresentação; variantes MUST ter finalidade explícita.
- **RF-UI-010**: Entrada, localização dos ciclos e filtro existentes MUST continuar disponíveis. A apresentação MUST NOT adicionar etapas obrigatórias para criar, filtrar ou executar transição. O filtro atual MUST permanecer visível e selecionado após operações.

#### Formulários e feedback

- **RF-UI-011**: Campos MUST ter rótulo persistente, nome acessível, indicação de obrigatoriedade/opcionalidade e instruções de formato/limites quando necessárias, sem depender só de placeholder. Datas MUST ser compreensíveis em pt-BR, sem alterar valores calendários. Campos e seletores nativos MUST permanecer operáveis em mobile.
- **RF-UI-012**: Erros MUST identificar problema e correção possível, aparecer junto ao campo e se associar a ele para leitura assistiva. Após envio inválido, o primeiro campo inválido ou resumo navegável MUST receber foco. Valores válidos MUST permanecer; cor sozinha MUST NOT indicar erro. Falha geral MUST ficar junto à região afetada.
- **RF-UI-013**: Cadastro e transições MUST apresentar resultado textual perceptível e anunciado sem deslocamento arbitrário de foco. Durante pendência, a ação MUST indicar processamento e impedir novas ativações pela interface, recuperando o estado adequado ao terminar. Isso MUST NOT alterar validação, idempotência ou concorrência do domínio.

#### Vazio, carregamento e erro

- **RF-UI-014**: Vazio inicial MUST explicar inexistência de ciclos e orientar ao cadastro; vazio de filtro MUST identificar contexto e orientar alterar o seletor. Vazio, erro e carregamento MUST ser coerentes, sem afirmar “nenhum ciclo” quando leitura falhou ou está pendente.
- **RF-UI-015**: Carregamento MUST ter texto e anúncio acessível; se durar mais de um segundo, a indicação MUST permanecer perceptível durante espera, sem atraso artificial para exibir animação. A região MUST reservar espaço para não deslocar o controle em uso. Erro técnico MUST virar orientação compreensível em português, sem detalhes internos, sucesso falso ou descarte de dados.

#### Acessibilidade WCAG 2.2 AA

- **RF-UI-016**: Todas as funções disponíveis MUST ser operáveis por teclado em ordem lógica, sem depender de hover, gestos complexos ou armadilhas. Foco MUST ser visível e não inteiramente encoberto por conteúdo da aplicação. Se atualização remover o controle, MUST ir a destino relacionado. Diálogo, somente se justificado no fluxo existente, MUST permitir saída e devolver foco.
- **RF-UI-017**: Texto comum MUST ter contraste mínimo 4,5:1; texto grande, 3:1 (mínimo de 24 pixels CSS regular ou aproximadamente 18,67 em negrito). Informação visual necessária para identificar controles e estados personalizados MUST ter 3:1 contra cores adjacentes. Exceções normativas, como controles inativos/aparência nativa não modificada, MUST ser registradas, preservando clareza de indisponibilidade. Fontes: [contraste textual](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [contraste não textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
- **RF-UI-018**: A interface MUST suportar texto a 200%, reflow equivalente a 320 pixels CSS com zoom real de 400% a partir de 1280 pixels e ajustes textuais: entrelinha 1,5 vezes, parágrafos 2 vezes, letras 0,12 vezes e palavras 0,16 vezes o tamanho da fonte. Não pode perder conteúdo ou ações nem exigir rolagem em duas direções nesses fluxos. Fonte: [reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).
- **RF-UI-019**: Nomes, funções, estados, rótulos, cabeçalhos, relações de campos e resultados MUST ser compreensíveis por tecnologia assistiva. Erros urgentes MUST ser anunciados sem exigir foco; sucesso e carregamento MUST ser anunciados sem interrupções repetitivas. A ordem de leitura MUST preservar significado.
- **RF-UI-020**: Alvos personalizados MUST ter pelo menos 24×24 pixels CSS ou exceção documentada do critério 2.5.8. Como requisito adicional do produto, criar/iniciar/concluir/cancelar MUST ter área de toque mínima 44×44 em mobile. Indisponibilidade MUST diferir do habilitado e ser comunicada semanticamente, sem parecer erro. Fonte: [alvos de ponteiro](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- **RF-UI-021**: A entrega MUST atender todos os critérios A e AA aplicáveis da [WCAG 2.2](https://www.w3.org/TR/WCAG22/), além destes exemplos. A avaliação MUST combinar inspeção automatizada, teclado, ampliação e leitor de tela; registrar não aplicáveis com justificativa; e MUST NOT declarar conformidade apenas por screenshots ou ausência de alertas automatizados.

#### Microinterações

- **RF-UI-022**: Microinterações, se presentes, MUST reforçar foco, acionamento ou mudança de estado sem bloquear ação ou mover controle durante uso. Transições decorativas MUST durar no máximo 200 ms, sem movimento contínuo, e ser removidas com movimento reduzido. Estado final e texto MUST permanecer compreensíveis sem animação.

#### Compatibilidade e evolução incremental

- **RF-UI-023**: Cada incremento MUST preservar resultados existentes de cadastro, consulta, filtro, transições e validações, incluindo ciclos e histórico produzido. A revisão MUST comparar antes/depois com os mesmos dados e verificar que rótulos novos não mudam valores ou regras.
- **RF-UI-024**: A linguagem visual MUST cobrir as superfícies existentes da SPEC-001 e registrar aplicabilidade às ausentes. Este refinamento MUST NOT criar edição, detalhe, histórico, paginação ou autenticação ausentes. Quando entregues em trabalho próprio, seus padrões visuais MUST preservar o comportamento aprovado.
- **RF-UI-025**: Mudanças MUST reutilizar o que funciona e justificar substituição de componente por problema concreto de usabilidade, acessibilidade ou manutenção vinculado a este escopo. Reconstrução integral, troca de arquitetura, alteração de contrato ou regra MUST NOT integrar o refinamento.
- **RF-UI-026**: Cada incremento MUST executar testes existentes e cenários E2E aplicáveis. Nenhum teste de negócio pode ser removido/afrouxado para acomodar visual. Como não há suíte E2E identificada, o planejamento MUST prever cobertura dos fluxos existentes antes do primeiro incremento visual; ausência de suíte MUST NOT ser relatada como “sem regressões E2E”.

#### Referências e avaliação visual

- **RF-UI-027**: Antes da alteração visual de cada grupo de superfícies, MUST existir referência revisável com hierarquia, papéis, componentes e exemplos desktop/tablet/mobile, vazio, erro e foco. Responsável pelo produto MUST registrar decisão, versão, data e superfícies. Aprovação estética MUST NOT dispensar requisitos objetivos.
- **RF-UI-028**: Baselines MUST ser criados/atualizados somente após aprovação humana da referência e da comparação com resultado candidato. O registro MUST identificar imagem anterior/nova quando houver, motivo, viewport, estado, versão e aprovador. Diferenças não aprovadas MUST continuar visíveis; atualização automática em lote para eliminar falhas MUST NOT ser aceita.
- **RF-UI-029**: Comparações MUST usar dados sintéticos determinísticos, idioma, fuso, navegador, fontes, viewport e estado iguais, após estabilização. Conteúdo variável e tolerâncias MUST ser identificados previamente e MUST NOT mascarar cortes, desalinhamento, contraste, foco ou controles ausentes. Capturas do diagnóstico MUST continuar identificadas como históricas.

### Matriz de verificação objetiva

Complementa as histórias; cada resultado futuro deverá identificar aprovação/reprovação, evidência e defeito associado. Não é um checklist de execução.

| Cenário | Requisitos | Procedimento e resultado esperado |
| --- | --- | --- |
| V-01 — sistema visual | RF-UI-001–005, 009 | Comparar todos os papéis com referência aprovada: nenhuma divergência sem justificativa, hierarquia coerente e distinção entre ação principal/cancelamento. |
| V-02 — layout | RF-UI-006–008 | Em cada dimensão obrigatória, verificar vazio, lista mista, título de 120 caracteres sem espaços, erro e formulário preenchido. Largura rolável não supera viewport, admitindo 1 pixel de arredondamento; nada cortado ou sobreposto. Repetir em 600 e 900 pixels. |
| V-03 — formulário mobile | RF-UI-007, 011–013, 020 | Criar/corrigir datas em retrato/paisagem com teclado virtual: campos/envio alcançáveis, valores preservados após erro, botões com área mínima. Emulação desktop sozinha não comprova teclado virtual. |
| V-04 — teclado e leitura | RF-UI-010, 012–013, 016, 019 | Criar, filtrar, iniciar, concluir e cancelar só por teclado; conferir nomes, foco e mensagens com ao menos um leitor de tela/navegador compatíveis, registrando versões. Nenhuma tarefa depende de mouse. |
| V-05 — contraste/estados | RF-UI-009, 017, 020 | Medir cores reais de textos e informação necessária de controles/estados padrão, foco, sobrevoo, pressionado e inválido; registrar valores/exceções. Exercitar indisponível durante operação pendente e conferir aparência/semântica. |
| V-06 — ampliação | RF-UI-018 | Aplicar 200% de texto, zoom real 400% na janela de 1280 pixels e ajustes textuais especificados; percorrer conteúdo sem perda, corte ou rolagem em duas direções. |
| V-07 — resultados | RF-UI-002, 013–015, 019 | Preparar zero ciclos, filtro vazio, leitura lenta, falha de leitura/gravação e segundo ativo. Mensagens distintas, valores preservados, anúncio correto e nenhuma recusa apresentada como sucesso. |
| V-08 — movimento | RF-UI-022 | Comparar preferência normal/reduzida: feedback permanece, movimento dispensável desaparece, duração respeita limite e nada impede ação. |
| V-09 — preservação | RF-UI-023–026 | Executar cadastro válido/inválido, filtro dos quatro estados, quatro transições permitidas e bloqueios aplicáveis; conferir mesmos valores, permanência após recarga e histórico sem alterações indevidas. Separar falhas anteriores de regressões novas. |
| V-10 — aprovação | RF-UI-027–029 | Revisar referências/comparações por superfície e estado; nenhum baseline aceito sem aprovação registrada. Recapturar estado instável ou configuração divergente. |
| V-11 — conformidade | RF-UI-021 | Avaliar todos os critérios A/AA aplicáveis, incluindo sequência, orientação, cor, hover/foco quando houver, identificação de erros e nome/função/valor. Registrar resultados manuais/automatizados e não aplicáveis justificados. |

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das combinações de dimensões/estados de V-02 sem overflow horizontal, corte de informação essencial ou sobreposição, incluindo título no limite sem espaços.
- **SC-002**: 100% dos componentes auditados com papel/estado equivalentes correspondem ao catálogo aprovado ou exceção explícita; nenhuma divergência fica sem tratamento.
- **SC-003**: 100% das tarefas disponíveis de cadastro, filtro, início, conclusão e cancelamento concluíveis por teclado, com foco perceptível e anúncios compreensíveis.
- **SC-004**: 100% dos contrastes aplicáveis atendem os limites e não restam violações conhecidas de critérios WCAG 2.2 A/AA aplicáveis após avaliação registrada.
- **SC-005**: 100% dos cenários de regressão acordados mantêm resultado, com zero regressões novas de comportamento, perda de dados ou transição indevida.
- **SC-006**: Pelo menos 4 de 5 participantes representativos criam um ciclo e o encontram pelo filtro em até 2 minutos sem ajuda. Pelo menos dois realizam o exercício em celular. Dados/roteiro iguais para todos e dificuldades registradas por tarefa.
- **SC-007**: 100% das superfícies refinadas têm referências/comparações aprovadas antes da aceitação de seus baselines; nenhuma diferença não analisada ou alteração de referência sem responsável.
- **SC-008**: O responsável pelo produto atribui pelo menos 4/5 a cada dimensão AE-001–AE-005, justifica e aprova o conjunto em desktop/tablet/mobile. Aprovação subjetiva não compensa falhas em SC-001–SC-005.

## Assumptions

- A base é a aplicação existente e a SPEC-001; divergências anteriores não autorizam concluir funcionalidades neste refinamento.
- Idioma de referência pt-BR; tradução de apresentação não modifica status, datas, duração ou contrato. Usuário e forma de acesso existentes permanecem.
- Não foi fornecido manual de marca. A direção A — Caderno de percurso foi selecionada explicitamente pelo usuário após as três prévias. O design system do plano detalha a proposta para essa direção; referências de estados e valores finais devem ser revisados conforme RF-UI-027 antes da alteração visual do grupo correspondente. A escolha de A não aprova implicitamente baselines.
- A matriz de dimensões valida resultados; não impõe breakpoints ou marcas de aparelho. A experiência funciona entre amostras.
- O tema claro atual é a base. Tema escuro, troca de tema, novas preferências, painéis ou métricas não são presumidos.
- Screenshots com dados sintéticos/contexto isolado não demonstram conformidade de acessibilidade, teclado virtual ou cobertura de regressão E2E.
- Responsável pelo produto é o aprovador humano da direção/referências; sua identidade será registrada na aprovação. Este documento não concede aprovação implícita.

## Constraints and Compatibility

### Limites obrigatórios

- Não alterar [contrato OpenAPI](../001-ciclos-pdi/contracts/openapi.yaml), campos, estados ou erros contratuais. Melhorar texto de apresentação não altera o contrato.
- Não modificar regras, autorização, persistência, limites, transições ou imutabilidade; preservar datas, ciclos e histórico.
- Não adicionar módulos, autenticação, exportação, compartilhamento, integrações, métricas de desenvolvimento ou outras funcionalidades.
- Não alterar arquitetura geral nem reescrever componentes funcionais sem justificativa vinculada a RF-UI.
- Não implementar, instalar dependências no projeto ou atualizar baselines nesta etapa. Entregáveis limitados a especificação, diagnóstico, evidências e validação documental.
- Foco, anúncio, estados de apresentação e prevenção de acionamento repetido refinam a interação; não autorizam novos casos de uso de negócio.

### Matriz de compatibilidade com a SPEC-001

| Fluxo de origem | Situação inspecionada | Preservação e limite |
| --- | --- | --- |
| US1 / RF-001–002, RF-012: criar | Formulário existente | Mesmos campos, opções, limites, período válido e criação em rascunho; melhorar organização/feedback. |
| US2 / RF-003: listar e filtrar | Lista e filtro existentes | Mesmos resultados e consulta de encerrados; melhorar leitura/vazio/erro. |
| US2 / RF-003: paginar | Consulta tem limites; controles visíveis ausentes | Registrar lacuna da SPEC-001; não criar paginação nem mudar limites. Aplicar padrão se a entrega funcional existir. |
| US2, US6 / RF-004, RF-010–011: detalhe/histórico | Encerrados na lista; detalhe/histórico não expostos | Preservar consulta e dados atuais; superfícies ausentes dependem de entrega própria, sem nova tela aqui. |
| US3 / RF-005: editar | Operação não exposta | Não introduzir edição; compartilhar padrões de formulário quando entregue por trabalho próprio. |
| US4 / RF-006, RF-009: iniciar | Ação e bloqueio de segundo ativo existentes | Mesma regra e resultado; feedback contextual compreensível. |
| US5 / RF-007–008: concluir/cancelar | Ações existentes conforme estado | Mesmas transições; encerrados continuam sem ações mutáveis. |
| RF-013: privacidade/acessibilidade | Rótulos, seções e foco existentes; sem autenticação completa | Preservar limites de acesso; melhorar acessibilidade sem criar autenticação ou alegar isolamento não demonstrado. |

Consistência entre todas as telas da SPEC-001 é princípio de compatibilidade. A aceitação deste incremento cobre 100% das superfícies existentes; as ausentes permanecem dependências explícitas, sem alegar refinamento já feito. Reconferir inventário no planejamento, pois a base pode evoluir.

### Evolução incremental

Planejar incrementos revisáveis: aprovar direção/padrões; aplicar hierarquia, espaçamento e layout; refinar formulário, filtro e itens; completar estados, acessibilidade e microinterações; verificar regressão e referências. Cada incremento deve ter comparação anterior/posterior, requisitos rastreados e aceitação própria. Não autoriza implementação nesta etapa.

## Preferências estéticas e aprovação humana

AE orienta julgamento humano e **não é demonstrável apenas por testes automatizados**. A direção A — Caderno de percurso já foi selecionada pelo usuário; sua proposta detalhada está no [design system](design-system.md) e a comparação das alternativas está no [registro da decisão visual](visual-directions/README.md). Essa escolha orienta as referências detalhadas, cuja revisão e aprovação permanecem exigidas por RF-UI-027; a aceitação de baselines continua sujeita a RF-UI-028.

| Critério | Direção pretendida | Evidência para julgamento |
| --- | --- | --- |
| **AE-001 — identidade** | Profissionalismo, maturidade e identidade própria no contexto de desenvolvimento individual. | Comparar composição e papéis de marca nas três classes de tela e justificar nota. |
| **AE-002 — clareza** | Organização e hierarquia para encontrar título, período, estado e ação. | Revisar lista curta/preenchida e explicar prioridade da informação. |
| **AE-003 — sobriedade** | Sofisticação com poucos elementos; superfícies, sombras e ícones com propósito. | Rejeitar gradientes roxos/azuis indiscriminados, cards repetitivos excessivamente arredondados, sombras exageradas e decoração sem função. |
| **AE-004 — continuidade** | Desenvolvimento contínuo expresso por organização/linguagem, sem gamificação ou métricas inventadas. | Avaliar relação entre rascunhos, ativos e encerrados sem inferência de desempenho. |
| **AE-005 — coerência** | Unidade entre regiões, estados e dispositivos; composição intencional em vez de dashboard administrativo genérico. | Comparar desktop/tablet/mobile, incluindo foco/erro/vazio, identificando adaptações que preservam identidade. |

Escala: 1 = não atende; 2 = atende parcialmente com mudanças amplas; 3 = atende parcialmente com ajustes identificados; 4 = atende com ressalvas menores registradas; 5 = atende plenamente. Registrar notas, justificativas e pendências; ressalvas não podem contrariar requisitos obrigatórios. Não há proibição absoluta de uma cor/formato isolado: avaliar significado e uso no conjunto.

Referências futuras devem cobrir página com formulário/lista, quatro estados dos ciclos, padrões interativos, vazio inicial, filtro vazio, carregamento e falha. Identificá-las como propostas até aprovação. Atualizações de baseline exigem RF-UI-028, inclusive na criação inicial, pois não há baseline visual identificado.

## Evidências e fontes

- [Diagnóstico inicial](diagnostico.md) e [registro da navegação](evidence/observations.json): fontes do estado atual; dados sintéticos e limites explícitos.
- [SPEC-001](../001-ciclos-pdi/spec.md) e [constituição](../../.specify/memory/constitution.md): regras e governança preservadas.
- [WCAG 2.2 — W3C](https://www.w3.org/TR/WCAG22/): norma A/AA. [Foco não encoberto](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) e demais fontes nos requisitos orientam verificação; não substituem avaliação completa.
