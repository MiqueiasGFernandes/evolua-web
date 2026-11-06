# Research — menu lateral e tabela

## Navegação interna

**Decision**: representar “Ciclos” como grupo expandível com âncoras para `#meus-ciclos` e `#novo-ciclo`; menu desktop alterna largura expandida/compacta; em viewport móvel inicia fechado em painel temporário.

**Rationale**: esses são os dois destinos existentes confirmados pelo usuário. Âncoras preservam a rota e evitam criar funcionalidades. Estado apenas em memória evita persistência de preferência não solicitada.

**Alternatives**: novas rotas foram rejeitadas por extrapolar o escopo; sidebar fixa foi rejeitada por reduzir espaço de tabela; esconder menu em mobile foi rejeitado por perder acesso aos atalhos.

## Apresentação tabular

**Decision**: usar tabela HTML semântica com cabeçalhos para título, período, situação e ações; reutilizar componentes de status, datas e ações da feature. Usar uma região com overflow horizontal próprio quando as colunas não couberem.

**Rationale**: conteúdo é repetitivo e comparável por linha/coluna; marcação nativa preserva associação de cabeçalhos e navegação assistiva. Rolagem localizada mantém todos os dados e evita overflow de página.

**Alternatives**: tabela de terceiros, grid com papéis ARIA manuais e conversão para cards no mobile foram rejeitados por adicionar dependência/complexidade e enfraquecer consistência sem necessidade demonstrada.

## Testes

**Decision**: Playwright para âncoras, alternância de menu, tabela, ações, viewports e rolagem; axe para violações/incomplete; teste funcional existente continua como caracterização. Capturas candidatas são separadas de baselines e requerem aprovação humana.

**Rationale**: validar semântica e resultados junto da apresentação, mantendo histórico atual de snapshots intocado até revisão.
