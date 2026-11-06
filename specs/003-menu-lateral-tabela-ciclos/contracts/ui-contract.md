# UI contract — navegação e tabela de ciclos

## Menu

- Botão de menu tem nome acessível e comunica estado expandido/recolhido.
- Grupo “Ciclos” contém links âncora “Meus Ciclos” e “Novo Ciclo”.
- Mobile: botão abre painel; Escape, botão fechar e seleção de destino fecham; se fechado sem navegação, foco retorna ao acionador.
- Desktop compacto não oculta nome/estado do destino da tecnologia assistiva.

## Tabela

- `<table>` com `<caption>` acessível (visível ou oculto visualmente), `<thead>`, `<th scope="col">` e linhas `<tr>`.
- Colunas na ordem: Título, Período, Situação, Ações.
- Sem ciclos: estado inicial orienta ao destino “Novo Ciclo”. Filtro vazio identifica filtro e oferece orientação para alterar o seletor.
- Ações reutilizam transições existentes e nomes acessíveis contextualizados pelo título.
- Container tabular anuncia/identifica rolagem horizontal em viewport estreita; a página não ganha rolagem horizontal.

## Compatibilidade

Não há alteração de API, OpenAPI, porta de repositório, formato persistido ou regras do domínio.
