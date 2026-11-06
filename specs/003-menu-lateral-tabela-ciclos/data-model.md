# Data model — menu lateral e tabela

Não há alteração ao modelo de domínio nem aos dados persistidos.

## Ciclo de PDI (existente)

A tabela lê `id`, `title`, `startDate`, `endDate` e `status` do ciclo existente; controles condicionais usam `status` e o mesmo callback atual para transição. Descrição e histórico não passam a ser exibidos por esta especificação.

## Estado de navegação (temporário)

- `desktop`: expandido ou compacto.
- `mobile`: fechado ou aberto.
- Grupo “Ciclos”: expandido/colapsado para expor “Meus Ciclos” e “Novo Ciclo”.
- Destino corrente: âncora de seção; não é persistido no ciclo nem em localStorage.

Estado do menu não altera filtro, formulário, ciclos ou histórico.
