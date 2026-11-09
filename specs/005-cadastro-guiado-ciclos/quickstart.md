# Guia de validação — SPEC-005

O cadastro guiado está implementado no workspace. Este roteiro descreve sua validação; resultados executados estão em validation/. A revisão humana e a aceitação final permanecem pendentes.

## Preparação

Usar Node/pnpm compatíveis com packageManager do projeto e lockfile existente. Executar na raiz:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Acessar `http://localhost:3000/pdi-cycles`. Manter uma única instância de Next usando apps/web/.next. Antes de build ou de iniciar servidor gerenciado por testes, encerrar a instância manual; não disputar o cache. Usar perfil/contexto isolado com dados sintéticos. Nunca apagar dados do perfil pessoal para testar migração.

## Verificações automáticas

Executar sequencialmente, com servidor manual encerrado para build:

```sh
pnpm test
pnpm lint
pnpm typecheck
pnpm build
pnpm --filter web test:e2e:all --workers=1
pnpm --filter web test:a11y --workers=1
pnpm --filter web test:visual --workers=1
pnpm --filter web test:manual:smoke
```

Playwright gerencia servidor conforme configuração atual; instalar seus navegadores/dependências se ausentes e registrar limitações do ambiente. Não executar runners concorrentes no mesmo cache/porta. Os testes foram adaptados aos dois hosts, aos objetivos e aos registros legados. Consulte validation/automated.md para resultados e limitações.

Snapshots só são evidência de regressão após revisão do baseline novo; não atualizar automaticamente para esconder diferenças. Registrar imagens comparáveis, revisão do código e comandos/resultados. Testes unitários devem incluir os exemplos de calendário de [data-model.md](data-model.md), datas impossíveis e execução com TZ diferente, além das regras de objetivos e de ciclo de vida.

## Cenários ponta a ponta

1. **Entradas (SC-001)**: botão abre modal sobre consulta; fechar sem alterações restaura foco. Menu desktop e móvel abrem página real; abrir URL direta/recarregar funciona. Consulta não contém formulário permanente. Ambos mostram as mesmas três etapas.
2. **Calendário (SC-002/003)**: testar todas as linhas do modelo, alteração de início/duração, alternância para CUSTOM e volta, datas inválidas, término igual/anterior e ano limite. Apenas CUSTOM é editável. Confirmar que adaptador rejeita data automática adulterada, independentemente da UI.
3. **Objetivos (SC-004)**: lista vazia/espaços/item vazio bloqueiam avanço; adicionar/remover mantém foco e ordem; remover último exige objetivo válido. Revisão e reload mostram textos e ordem sem título/descrição do ciclo.
4. **Etapas e envio (SC-005)**: voltar/corrigir preserva tudo; avançar/Enter/cancelar não grava. Durante pending, repetir confirmação não duplica. Write-error mantém dados e permite retry. Falha de consulta após commit mostra aviso de consulta, sem oferecer reenvio da criação.
5. **Resultado (SC-001/005)**: modal fecha após sucesso; página retorna à consulta. Verificar filtro que exclui DRAFT e coleção com 21 ou mais itens: criado continua acessível pelo resumo/get, sem paginação nova. Query forjada com ID ausente não produz afirmação falsa de criação.
6. **Histórico (SC-006)**: carregar fixture v1 com DRAFT/ACTIVE/COMPLETED/CANCELLED; migrar, recarregar e comparar IDs, textos, datas, versão e histórico originais. Nenhum objetivo é gerado. Testar repetição da migração, JSON inválido, falha de quota, versão desconhecida e alteração de v1 após v2; nenhum reset silencioso. Conferir ativo único, transições e imutabilidade nas duas variantes.
7. **Descarte (SC-005/007)**: botão, Escape, backdrop e saídas app-owned da página compartilham política dirty. Continuar mantém etapa e foco; Descartar não cria. Mudança só de etapa não deve tornar formulário dirty. Pending não deve permitir descartar operação em andamento.

## Revisão humana e responsividade (SC-007)

Usar `pnpm --filter web test:manual` para cenários injetados no harness, selecionando Consulta e modal ou Página de cadastro. O repositório em memória não grava no armazenamento pessoal. O smoke cobre ambos os contextos, mas não substitui revisão humana.

Percorrer modal e página com teclado e leitor de tela real: entrada, anúncio/ordem das etapas, datas automáticas, erros, objetivos dinâmicos, revisão, descarte, pending/erro e sucesso. Conferir contenção/restauração de foco e acesso aos objetivos na consulta. Verificar telas 320/390/768/1024/1440, zoom e conteúdo longo, sem ações ou campos encobertos.

Registrar em validation/: data, revisão Git, sistema, navegador/versão, leitor/versão, revisor, cenários observados, resultados e achados/retestes. axe e emulação não equivalem a execução humana com leitor de tela. Cenário não observado fica pendente; aceitação final requer automação e revisão manual concluídas. Ver [contrato UI](contracts/ui-contract.md) e [contrato de compatibilidade](contracts/persistence-and-contracts.md).

## Recuperação preservadora do armazenamento

Feche abas/versões antigas antes de recuperar um conflito. Preserve/exporte separadamente os valores brutos de `evolua:pdi-cycles:v1` e `evolua:pdi-cycles:v2` pelo painel Application/Storage do navegador, antes de qualquer alteração. Não use clear/removeItem como correção. v1 é backup histórico; v2 contém também os cadastros novos. Downgrade para v1 não recupera esses novos registros.

Em erro de leitura/quota, resolva a indisponibilidade sem apagar os valores e repita a consulta. JSON/schema inválido ou divergência da origem requer diagnóstico assistido sobre cópias, sem merge automático. A integração exercita falha/retry e preservação com fixtures sintéticas. Não enviar dados pessoais a logs ou relatórios.

## Limites entregues

Criação por objetivos, atualização de período já existente na porta e leitura/transições de legados. Sem editor pós-criação de objetivos, endpoints HTTP novos, IA ou paginação nova. O contrato HTTP v1 permanece histórico. `local-user` e localStorage limitam o resultado ao protótipo local; nenhuma publicação foi realizada.
