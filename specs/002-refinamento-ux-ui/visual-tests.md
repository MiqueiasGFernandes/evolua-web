# Estratégia de validação visual, acessibilidade e regressão

**Estado**: plano; suíte/dependências ainda não instaladas. O diagnóstico anterior executou quatro testes de domínio e um roteiro temporário Playwright. Não existe suíte E2E estabelecida nem baseline aprovado.

## Camadas e ordem

1. **Caracterização funcional antes de alterar aparência**: instalar/configurar testes na implementação, usar adaptador real e contextos isolados; manter quatro testes de domínio. Registrar defeitos preexistentes separadamente, sem aprovar overflow como comportamento desejado.
2. **Referências detalhadas**: direção A já escolhida; preparar desktop/tablet/mobile e estados. Registrar aprovação humana por superfície/estado antes de refiná-los. Imagem gerada não é screenshot de uma implementação.
3. **Incrementos**: executar domínio, testes funcionais, componentes afetados e acessibilidade; produzir capturas candidatas comparáveis. Falhas novas bloqueiam aceite.
4. **Baselines**: somente depois da referência e da comparação renderizada aprovadas. CI jamais atualiza baselines; diferenças ficam disponíveis para revisão.

## Ambientes de teste

| Projeto planejado | Ambiente | Finalidade |
| --- | --- | --- |
| chromium-functional | Chromium/Linux, build de produção sem proxy | Fluxos, armazenamento real, recarga e contratos de UI |
| firefox-functional / webkit-functional | Versões fixadas compatíveis | Smoke dos fluxos, datas nativas, foco e layout crítico |
| chromium-visual | Chromium/Linux canônico, DPR 1 | Capturas determinísticas de estados reais |
| chromium-states | Mesmo browser/SO/fontes, build exclusivo de teste | Pending/disabled/leitura lenta por Promise controlável |
| componente | Vitest + ambiente DOM e ferramenta de renderização adequada | Associação de erro, eventos, estados e Promise controlada sem capturar detalhes internos irrelevantes |

Fixar versão de `@playwright/test`, browsers correspondentes e imagem de CI no mesmo incremento. Não usar `latest` na CI nem supor que o cache 1.57 da auditoria é a versão a instalar. Produção continua sem harness. Browser de emulação não comprova comportamento de aparelho físico.

### Pendência e erro no adaptador local

`page.route` não torna o armazenamento local lento. Prever prop opcional de repositório na porta existente, default atual, e um proxy de módulo apenas no bundle de teste. O proxy pode aguardar uma Promise controlável antes de delegar ao adaptador real; não copia regras, não inventa endpoint e não muda persistência. Usar configuração de build de teste isolada, sem `NEXT_PUBLIC` flag, query param ou rota acessível em produção; confirmar que o bundle normal não contém proxy/controle de teste.

Projetos reais continuam sem proxy; testes de estado não substituem testes de persistência. O harness controla somente resolução/rejeição de operações por teste e é removido com o contexto. Se configuração de bundle se revelar desproporcional, usar captura de componente Playwright para os mesmos componentes, documentando a camada; não implantar infraestrutura pública. Não adicionar atraso real ou bloquear `Storage.getItem` com busy-wait.

## Fixtures e estabilização

- Contexto novo por teste, origem exata da aplicação, chave atual `evolua:pdi-cycles:v1`, owner `local-user`. IDs, períodos, versões e histórico conhecidos; fixture válida tem no máximo um ACTIVE.
- Estado inicial por `storageState`/localStorage isolado antes de navegar. Não resemear em todo reload: isso invalidaria a prova de persistência.
- Fixtures: vazio; um rascunho; quatro estados; 20 ciclos; título de 120 caracteres sem espaços; descrição de 2.000; datas iguais/invertidas; JSON inválido; falha pontual de gravação apenas no teste. Não usar dados pessoais.
- Locale `pt-BR`, timezone `America/Sao_Paulo`, light scheme, DPR 1, viewport explícita. Fixar `Date` com `page.clock.setFixedTime`, preservando timers; valores de IDs também devem ser determinísticos quando aparecem no contrato inspecionado.
- Aguardar hidratação, estado esperado e `document.fonts.ready`, verificando a família efetivamente carregada. Fontes WOFF2 locais, sem fallback silencioso. Não usar `waitForTimeout` ou `networkidle` como prova universal de prontidão.
- Capturas canônicas desativam animações e caret para estabilidade; teste separado comprova movimento reduzido. Foco não é mascarado: em cenário de foco, navegar por teclado e capturar o anel real.
- Captura full-page e captura da viewport quando necessário para demonstrar alcance/foco; full-page isoladamente pode esconder um problema de rolagem/teclado virtual.

Fontes: [clock](https://playwright.dev/docs/clock), [APIs do browser](https://playwright.dev/docs/mock-browser-apis), [fontes carregadas](https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts).

## Matriz funcional com adaptador real

| Grupo | Casos e resultado |
| --- | --- |
| Entrada/cadastro | Redirecionamento `/`; campos/opções; criar válido, inclusive sem descrição; rascunho persistido e recarga com mesmos dados |
| Validação | Título ausente/curto, limites 3/120; descrição 2.000; datas ausentes/iguais/invertidas. Restrições nativas impedem excesso na UI; teste de domínio preservado cobre inválido que não é alcançável pelo controle. Não adulterar produção para forçar entrada. |
| Transições | DRAFT→ACTIVE, DRAFT→CANCELLED, ACTIVE→COMPLETED, ACTIVE→CANCELLED; exatamente a alteração/histórico esperados; encerrados sem ações mutáveis |
| Recusas | Segundo ACTIVE recusado; gravação falha não produz sucesso; dados e histórico não alterados indevidamente |
| Filtro | Todos/quatro estados; filtro vazio; seleção mantida após operação; rascunho criado sob ACTIVE confirma criação sem mudar filtro |
| Recuperação | Valores mantidos após erro, sem JSON interno; erro de leitura não vira vazio; separar create bem-sucedido de refresh falho |

Não adicionar edição, detalhe, autenticação ou paginação só para completar testes da SPEC-001. Não declarar garantias de concorrência/backend ausentes. Seletores por papel/nome e contexto do item, não pela posição CSS ou texto de status inglês.

## Matriz visual e responsiva

Dimensões obrigatórias: 320×568, 360×800, 390×844, 768×1024, 1024×768, 1280×800, 1440×1000 e 844×390; intermediárias 600×900 e 900×900. Usar toda a matriz para V-02: vazio, lista mista, título sem espaços, erro de formulário e cadastro preenchido; incluir 20 itens para exercitar altura. O mesmo teste deve verificar largura rolável ≤ viewport + 1 pixel e inspecionar sobreposição/corte de regiões críticas. Só medir largura não basta.

| Família de screenshots | Cobertura adicional |
| --- | --- |
| Página | Vazio inicial, filtro vazio, lista mista com quatro estados, 20 itens, conteúdo longo, erro de leitura, formulário válido/inválido |
| Interação | Foco em campo, filtro e botão; hover/pressed em ponteiro; inválido; sucesso e ação indisponível durante pending |
| Estados controlados | Leitura pendente, gravação pendente, falha pontual de gravação, create sucedido/refresh falho; ao menos desktop 1440, tablet 768 e mobile 390 |
| Movimento | Antes/depois de ação, normal/reduced motion; nenhum deslocamento de controle ou transição decorativa acima de 200 ms |

Botão pressionado pode ser capturado durante pointer-down com liberação garantida pelo teste; foco é exercitado também por teclado. Não produzir estado fake por CSS que a aplicação nunca renderiza. Popup nativo de data do SO pode não ser capturado pela página; esse ponto permanece no roteiro manual.

## Aprovação e tolerância de screenshots

- Diretório futuro proposto: `apps/web/tests/visual/__screenshots__/`; nomes incluem superfície, estado, viewport, projeto e versão da referência. Estrutura definida pela configuração, sem espalhar referências nas evidências históricas.
- Começar com `maxDiffPixels: 0` e limiar de diferença de cor explicitado em 0,2 no ambiente fixado. Isso não significa igualdade matemática de cada canal; significa nenhum pixel acima do limiar. Não adicionar `maxDiffPixelRatio` permissivo global.
- Ajustar tolerância apenas diante de falso positivo reproduzível e aprovado; registrar região, motivo e efeito. Não mascarar texto, foco, campos ou desalinhamento. Valores dinâmicos devem ser estabilizados preferencialmente, não escondidos.
- `toHaveScreenshot` aguarda estabilidade de capturas, mas o teste também deve conhecer seu estado esperado. [Comparações](https://playwright.dev/docs/test-snapshots), [opções](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1).
- Registro de aprovação por baseline: referência visual/versionamento, requisito RF-UI, estado, viewport, ambiente, antes/candidato/diff, justificativa, aprovador e data. A escolha A é registrada, mas não preenche esses campos por antecipação.
- CI usa `--update-snapshots=none`, falha com diff inesperado e conserva actual/expected/diff, trace e relatório. Após aprovação, atualizar apenas arquivo/teste/projeto autorizado, em mudança revisável. Nunca rodar atualização em lote como correção de regressão. [CLI](https://playwright.dev/docs/test-cli).

## Acessibilidade automatizada e manual

axe nos estados relevantes e tags A/AA suportadas, incluindo WCAG 2.2; analisar `violations` e `incomplete`, com exceções justificadas por critério. Conferir rótulos, relação erro/campo, semântica de disabled/busy/live e contraste renderizado. Zero violações detectadas não equivale a AA. [Playwright acessibilidade](https://playwright.dev/docs/accessibility-testing).

| Verificação manual | Critério de aceite |
| --- | --- |
| Teclado completo | Criar/filtrar/iniciar/concluir/cancelar sem mouse; ordem lógica, saída dos controles, foco visível e destino após remoção |
| Leitor de tela | NVDA/Firefox ou VoiceOver/Safari, versão registrada; nomes, instruções, mensagens e atualizações compreensíveis sem anúncio duplicado |
| Ampliação | Texto 200%; zoom real 400% em janela de 1280; espaçamento conforme RF-UI-018; sem perda ou rolagem em duas direções |
| Contraste/cores | 4,5:1 texto comum, 3:1 texto grande e informação de controle aplicável; status/erro/foco sem depender apenas de cor |
| Alvos | Mínimo AA 24×24 ou exceção registrada; ações mobile 44×44 como requisito adicional |
| Mobile real | Android Chrome e iOS Safari, quando disponíveis: teclado virtual, datas, rotação, rolagem até envio. Indisponibilidade do dispositivo fica pendente, não marcada como aprovada. |
| Movimento | Preferência reduzida conserva feedback sem animação dispensável; desabilitar animação na captura não prova esse critério |
| Todos os critérios A/AA | Relatório por critério aplicável/não aplicável, evidência, resultado e responsável; nenhuma lacuna silenciosa |

DPR não simula zoom real. Completar com exercício de cinco participantes da SC-006 e revisão humana AE-001–005; testes de pixels não medem clareza percebida. [Avaliação WAI](https://www.w3.org/WAI/test-evaluate/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## Gates de entrega

Código sem alterações de domínio/OpenAPI; testes antigos e novos relevantes aprovados; nenhuma regressão funcional nova; nenhum overflow/corte aceito; zero violação conhecida A/AA aplicável; referências/comparações aprovadas; baselines atualizados somente no escopo autorizado; critérios SC-001–008 documentados. Testes que ainda não existem não são considerados executados.
