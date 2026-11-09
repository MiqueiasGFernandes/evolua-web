# Pesquisa — Busca nas opções do menu

## Decisão: manter uma única fonte das opções navegáveis

**Rationale**: `CycleLinks` já é reutilizado pela barra lateral desktop e pelo diálogo móvel. A lista de opções e o predicado de filtro devem ficar compartilhados para preservar rótulos, destinos, `aria-current` e o callback de navegação nos dois contextos.

**Alternatives considered**:

- Duplicar a busca e a lista por contexto: rejeitado por risco de destinos e acessibilidade divergentes.
- Pesquisar texto de toda a página: rejeitado porque excede o escopo de opções do menu.

## Decisão: normalizar consulta e rótulos localmente

**Rationale**: remover diacríticos Unicode, converter para minúsculas e aplicar `trim` atende buscas como “ciclos”, “CÍCL” e texto com espaços sem modificar o rótulo exibido. O conjunto atual é pequeno e já está no cliente, portanto o filtro síncrono é suficiente para a meta de 200 ms.

**Alternatives considered**:

- Buscar somente por igualdade exata: rejeitado por dificultar encontrar opções.
- Enviar a consulta a um serviço: rejeitado por não haver valor, por ampliar privacidade e por contrariar o escopo.

## Decisão: renderizar condicionalmente a busca no estado mínimo

**Rationale**: quando o menu desktop é recolhido, não renderizar o campo o remove da árvore de acessibilidade e da ordem de foco, cumprindo FR-008 de forma verificável. Ao expandir, o campo volta a ser criado sem mudar os links.

**Alternatives considered**:

- Apenas esconder com CSS: rejeitado porque um controle invisível pode continuar focalizável ou anunciado.
- Exibir um ícone de busca no modo mínimo: rejeitado porque o requisito pede que a barra não seja exibida e adicionaria um fluxo fora de escopo.

## Decisão: expor correspondências mesmo se a seção estiver fechada

**Rationale**: uma consulta não vazia deve temporariamente tornar a lista de correspondências disponível, em vez de retornar resultado oculto dentro de uma seção fechada. Limpar a consulta devolve o controle de abertura ao estado anterior da seção.

**Alternatives considered**:

- Exigir abertura manual da seção: rejeitado pois torna a busca enganosa.
- Alterar permanentemente o estado da seção: rejeitado para não produzir efeito colateral persistente da pesquisa.

## Decisão: adaptar a armadilha de foco no diálogo móvel

**Rationale**: o loop atual considera apenas links e botões. A busca precisa ser incluída na lista de controles focalizáveis para que Tab e Shift+Tab permaneçam dentro do diálogo. O input terá rótulo, foco visível com contraste do menu e uma região de status para informar o resultado, evitando anunciar cada caractere de forma excessiva.

**Alternatives considered**:

- Não incluir o input no loop: rejeitado porque permitiria o foco escapar do diálogo.
- Transformar a busca em combobox: rejeitado porque não há sugestão nem seleção própria; o requisito é somente filtrar links existentes.
