# Revisão humana — pendente

Harness validado em 2026-11-08: `pnpm --filter web test:manual:smoke`, exit 0, 3 testes. Consulta/modal e página usam componentes reais e repositório em memória. Falha e pending foram exercitados nos dois contextos; localStorage permaneceu vazio. O smoke não é revisão humana.

Executar `pnpm --filter web test:manual` e abrir http://127.0.0.1:4174 em perfil isolado. Selecionar contexto e cenário na barra de revisão. Em modal pendente, a barra fica inerte: liberar a operação pelo controle de teste via console (`document.querySelectorAll(".manual-tools button")[1].click()`) ou usar o smoke; isso não representa uma ação de usuário do produto.

## Registro a preencher pelo revisor

- Data/revisão Git: pendente (workspace baseado em edec506).
- Revisor, sistema, navegador/versão e leitor de tela/versão: pendentes.
- Modal: entrada/nome/foco, Tab/Shift+Tab, datas e erros, adicionar/remover objetivos, etapas/revisão, Escape/backdrop, continuar/descarte, erro/pending e sucesso: pendentes.
- Página: entrada direta/menu, etapas, saídas por links desktop/móvel, preservação e retorno à consulta: pendentes.
- Consulta: leitura de objetivos e dados históricos, ações/estados: pendentes.
- Layout: 320/390/768/1024/1440, zoom, texto longo e movimento reduzido: revisão humana pendente; capturas e testes automáticos separados.
- Achados, correções e retestes: pendentes.

T042 permanece aberta. Não há revisor humano nem sessão real com leitor de tela observada nesta execução. O contrato UI exige “Revisão humana real com leitor de tela”; axe, screenshots e emulação não satisfazem esse requisito.
