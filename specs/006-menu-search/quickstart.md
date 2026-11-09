# Guia de validação — Busca nas opções do menu

## Preparação

Na raiz do projeto, instalar dependências conforme o lockfile e usar um perfil de navegador isolado:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Acessar `http://localhost:3000/pdi-cycles`. Não executar múltiplas instâncias de desenvolvimento contra a mesma porta/cache.

## Cenários manuais

1. Com a barra lateral expandida, verificar que `Pesquisar no menu` fica abaixo da marca; pesquisar `novo`, `CÍCL` e uma consulta com espaços. Conferir que os links correspondentes mantêm destino e estado ativo.
2. Pesquisar texto sem resultado, confirmar mensagem clara e limpar o campo para restaurar a lista completa.
3. Fechar a seção de ciclos e pesquisar uma opção dela; confirmar que a correspondência fica acessível. Limpar a busca e confirmar a restauração do estado da seção.
4. Recolher a barra lateral: confirmar que o campo não existe, não recebe Tab e não é anunciado. Expandir novamente e confirmar retorno do campo e das opções.
5. Em 390 e 768 px, abrir o menu móvel, testar Tab/Shift+Tab passando pelo campo, links e botões sem escapar do diálogo; fechar e reabrir para confirmar que a busca foi limpa.
6. Validar zoom, 320/390/768/1024/1440 px e texto longo, sem rolagem horizontal nem perda do foco visível.

## Verificações automatizadas

```sh
pnpm test
pnpm lint
pnpm typecheck
pnpm build
pnpm --filter web test:e2e --workers=1
pnpm --filter web test:a11y --workers=1
pnpm --filter web test:visual --workers=1
```

Os testes devem cobrir normalização por acentos/caso/espaços, consulta vazia, ausência de resultado, seção fechada, links/estado ativo, desktop mínimo, diálogo móvel e axe. Consulte o [contrato de UI](contracts/ui-contract.md) e o [modelo de dados](data-model.md) para os resultados esperados.
