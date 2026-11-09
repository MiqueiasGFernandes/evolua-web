# Guia de validação — Gestão de Objetivos

## Preparação

Na raiz do repositório:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Use dados sintéticos e um perfil de navegador isolado. Consulte [data-model.md](data-model.md), [ui-contract.md](contracts/ui-contract.md) e [persistence-contract.md](contracts/persistence-contract.md) para regras completas.

## Cenários essenciais

1. Em ciclo rascunho ou ativo, criar objetivo quantitativo com prazo dentro do ciclo, indicador, unidade, linha de base e alvo; confirmar presença na lista e no resumo.
2. Criar objetivo qualitativo com dois critérios; atualizar um para em observação e outro para atendido; confirmar ausência de percentual numérico.
3. Atualizar meta crescente e decrescente, incluindo meta superada; conferir progresso de 0–100 sem concluir automaticamente.
4. Tentar salvar prazo fora do ciclo, linha de base igual ao alvo e campos obrigatórios vazios; conferir erro contextual e ausência de gravação.
5. Marcar um objetivo vencido não terminal; conferir rótulo de atraso. Concluir/cancelar e confirmar remoção apenas do rótulo de atraso, não do histórico.
6. Em ciclo pausado, criar/editar planejamento e tentar atualizar resultado, concluir ou cancelar; confirmar as permissões definidas. Em ciclo encerrado, confirmar somente consulta.
7. Concluir objetivo com resultado efetivamente alcançado e cancelar outro, aceitando confirmações; conferir resumo com cancelado fora de pendentes.
8. Testar Tab, Shift+Tab, Escape, nomes acessíveis, foco restaurado e viewports de 320 a 1440 px.

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

Os testes devem cobrir regra de progresso, estados/guardas, migração v1/v2/v3, isolamento por proprietário local, formulário condicional, confirmação, erro, vazio, teclado, axe e responsividade. A limitação de segurança multiusuária deve permanecer documentada e não ser declarada resolvida por testes locais.
