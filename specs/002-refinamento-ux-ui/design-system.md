# Design system — Caderno de percurso

**Estado**: direção A escolhida pelo usuário; proposta técnica para implementação futura. Este documento traduz a direção em regras verificáveis. Não representa aprovação de todos os estados ou baselines.

## Conceito e princípios

O ciclo é uma unidade de planejamento pessoal: título, período, estado e ação. A interface deve parecer um caderno profissional editado com cuidado, sem imitar papel pautado, planner decorativo ou dashboard de indicadores. O título serifado é o gesto de identidade; estrutura e controles permanecem silenciosos. Alinhamento à esquerda, linhas de leitura entre 45 e 75 caracteres e limite de 80 para textos explicativos. Datas usam algarismos tabulares da fonte de interface; nenhuma fonte monoespaçada adicional.

## Tokens semânticos de cor

Valores opacos sRGB; sem gradientes, filtros de cor ou transparência em textos/foco. Fonte legível de valores: [color-tokens.json](visual-directions/color-tokens.json). Não espalhar hexadecimais em componentes.

| Token | Valor | Papel e correspondência shadcn |
| --- | --- | --- |
| background | `#F6F7F4` | Fundo da página; `--background` |
| surface | `#FFFFFF` | Campos e superfícies necessárias; `--card`/`--popover` se realmente usados |
| surface-subtle | `#EDF1ED` | Hover leve, mensagens neutras; `--muted`/`--accent` |
| foreground | `#252A27` | Texto principal; `--foreground`, textos de superfície |
| muted-foreground | `#5D6761` | Instruções, períodos e textos auxiliares |
| primary | `#31584A` | Criar, iniciar ou concluir no contexto da tarefa; `--primary` |
| primary-foreground | `#FFFFFF` | Texto sobre ação preenchida |
| primary-hover | `#27483D` | Hover da ação preenchida |
| primary-pressed | `#1E392F` | Acionamento da ação preenchida |
| secondary / secondary-foreground | `#EDF1ED` / `#252A27` | Ações neutras quando existirem |
| border-control | `#7B857E` | Limite necessário de inputs/seletores; `--input` |
| border-subtle | `#D9DED8` | Separadores decorativos entre itens; `--border`, nunca única pista de controle |
| focus | `#31584A` | Anel sólido de foco; `--ring` |
| disabled-bg / disabled-fg | `#E7EBE7` / `#626B64` | Indisponibilidade explícita, sem reduzir opacity do componente inteiro |
| active-bg / active-fg | `#E6EEE8` / `#31584A` | “Ativo”, cor acompanhada de texto |
| draft-bg / draft-fg | `#EDF0ED` / `#5D6761` | “Rascunho” |
| completed-bg / completed-fg | `#E9EEEA` / `#39483E` | “Concluído”, sem celebração ou percentual inventado |
| cancelled-bg / cancelled-fg | `#F0EDEA` / `#655D55` | “Cancelado”, registro histórico sem aparentar falha técnica |
| error-bg / error-fg | `#FAEEEB` / `#9C382C` | Erro de entrada/operação; `--destructive` usa error-fg |
| error-border | `#B5483A` | Borda de campo inválido; acompanhada de mensagem |
| warning-bg / warning-fg | `#F5F0E3` / `#72551D` | Restrição ou atualização incompleta, sem confundir com sucesso |

Na integração Tailwind 4, variáveis semânticas CSS são a fonte única e alimentam utilities por `@theme inline`. Não usar um segundo conjunto divergente no tema shadcn. Tema escuro e tokens de gráficos não serão adicionados sem necessidade de produto. Base: [Tailwind theme](https://tailwindcss.com/docs/theme), [shadcn theming](https://ui.shadcn.com/docs/theming).

### Contraste calculado, antes da renderização

O [relatório](visual-directions/contrast-report.json) calcula luminância relativa sRGB e compara valores sem arredondamento. Todos os 19 pares planejados passaram seus limites. Isso verifica a paleta, não conformidade da aplicação renderizada.

| Par | Razão aproximada |
| --- | --- |
| Principal sobre fundo / branco | 13,57:1 / 14,59:1 |
| Auxiliar sobre fundo / branco | 5,46:1 / 5,87:1 |
| Branco sobre primary | 8,00:1 |
| Borda de controle sobre branco / fundo | 3,82:1 / 3,55:1 |
| Foco sobre branco / fundo | 8,00:1 / 7,44:1 |
| Indisponível: texto sobre fundo | 4,58:1, exigência adicional do produto |
| Status ativo / rascunho / concluído / cancelado | 6,76:1 / 5,11:1 / 8,24:1 / 5,54:1 |
| Erro / aviso sobre seus fundos | 6,13:1 / 6,09:1 |

Manter fundo branco reservado entre botão verde e anel verde para distinguir foco. Separadores claros não identificam campos e não precisam substituir a borda control. Reavaliar pares reais, espessura, estados e qualquer combinação nova após implementação.

## Escala tipográfica

Newsreader roman variável 400/500 para títulos; Source Sans 3 400/600 para interface, obtidas como WOFF2 locais com licença e caracteres pt-BR conferidos. Apenas duas famílias. Usar `next/font/local` no layout servidor, CSS variables, `display: swap` e fallbacks serif/sans planejados; medir screenshots só após fonte efetiva carregada. Não forçar itálico, caixa alta ou destacar uma palavra do título. [Next 15 — fontes](https://github.com/vercel/next.js/blob/v15.5.28/docs/01-app/03-api-reference/02-components/font.mdx).

| Papel | Família/peso | Desktop | Mobile | Uso |
| --- | --- | --- | --- | --- |
| Título de página | Newsreader 400 | 44/48 px | 32/36 px | Um h1 “Ciclos de PDI” |
| Título de seção | Newsreader 500 | 28/34 px | 26/32 px | h2 “Novo ciclo”, “Meus ciclos” |
| Título de item | Source Sans 3 600 | 20/26 px | 18/24 px | Título integral, pode quebrar linhas |
| Corpo | Source Sans 3 400 | 16/24 px | 16/24 px | Introdução, conteúdo, feedback principal |
| Rótulo / ação | Source Sans 3 600 | 16/22 px | 16/22 px | Labels e botões |
| Campo | Source Sans 3 400 | 16/24 px | 16/24 px | Nunca herdar `md:text-sm` do exemplo de primitive |
| Auxiliar / badge | Source Sans 3 400/600 | 14/20 px | 14/20 px | Apenas metadados/instruções curtas; erros principais continuam 16 |

Valores convertidos em rem a partir do padrão de 16, sem fixar tamanho raiz contra preferências do usuário. Tracking de título entre -0,02em e 0; textos de interface em 0. Introdução e mensagens com largura máxima de 65ch; títulos de ciclo não são truncados.

## Espaçamento, grid e layouts responsivos

Escala: 0, 4, 8, 12, 16, 24, 32, 48 e 64 pixels, expressos em rem. Bordas e anel de foco têm medidas próprias; não são espaçamento de conteúdo.

| Relação | Valor |
| --- | --- |
| Rótulo–campo / campo–instrução | 8 / 8 px |
| Campos de um formulário | 16 px |
| Ações entre si | 8 px; quebra de linha permitida |
| Padding de campo | 12 px horizontal; altura mínima 44 px |
| Padding de item | 24 px vertical; 16 em mobile |
| Título de seção–conteúdo | 24 px |
| Entre regiões empilhadas | 48 px, sempre maior que o gap de campos |
| Header–regiões | 48 px desktop; 32 mobile |

| Faixa | Margens e largura | Grid / comportamento |
| --- | --- | --- |
| 320–767 | 16 px laterais, conteúdo fluido | Uma coluna; ordem DOM: header, formulário completo, filtro/lista. Datas empilhadas. Botões de item podem dividir duas colunas se cabem; caso contrário empilham, sempre 44 px. |
| 768–1023 | 24 px laterais | Grid de referência de 8 colunas, regiões ocupam todas; formulário até 600 px, sem alinhar filtro por largura acidental de campos. Sem sidebar. |
| 1024–1279 | 32 px laterais | Duas regiões com proporção 5:7, gap 32 px; formulário primeiro no DOM/esquerda. Sem sticky que oculte foco. |
| ≥1280 | Container máximo 1200 px, centralizado, mínimo 32 px laterais | Grid 12 colunas, 5 para cadastro e 7 para acompanhamento; gap 48 px. Formulário até 480 px sem ultrapassar sua coluna. |

O container tem largura mínima entre o limite e viewport menos margens. Colunas têm mínimo zero para permitir quebra. Usar `min-width: 0` nas células necessárias e quebra de palavras longas na apresentação; nunca `overflow-x: hidden` no body para esconder defeito. Ítem é lista semântica com organização interna, sem nova tabela ou ação de abrir detalhe.

Datas podem formar par somente quando a região de campos tiver pelo menos 480 pixels, com ordem inicial/final. O grid usa ordem linha a linha compatível com DOM; não usar CSS order para fazer teclado seguir outra sequência. Título, status, período e ações podem ocupar linhas próprias no item; a largura do maior texto determina reorganização, não redução de fonte.

Verificar exatamente a matriz da SPEC-002, mais 600 e 900 pixels intermediários. Alto zoom deve naturalmente recolher as colunas. Nenhum conteúdo fica inacessível por altura fixa. Não usar masonry, animação de entrada ou carrossel.

## Bordas, elevação e estados

- Radius: 0 para separadores/estrutura, 4 px para campos, botões, badges e mensagens. Sem pills. Região da página não vira um grande card.
- Borda: 1 px sólido; controle usa border-control e separação usa border-subtle. Inválido usa error-border com texto explicativo.
- Elevação: zero nas regiões, itens e campos. Token reservado de elevação flutuante só será definido se surgir overlay justificado; não instalar popover nesta entrega.
- Foco: outline sólido 3 px com offset 2 px e espaço externo preservado; sobre ação preenchida, afastamento revela fundo claro. Imediato, sem animação.
- Hover: fundo discreto para secundário/cancelamento; primary-hover para ação preenchida. Item sem ação própria não recebe affordance de clique integral.
- Pressionado: primary-pressed; nenhuma redução por scale ou deslocamento.
- Desabilitado: fundo/texto específicos, atributo `disabled` real e mensagem “Criando ciclo…”/“Iniciando…” conforme ação; não desabilitar região inteira por uma única transição.
- Inválido: `aria-invalid`, instrução associada e mensagem junto ao campo. Cor não é o único sinal.
- Movimento: somente mudanças de cor de 120 ms e feedback de estado até 180 ms quando útil. Sem movimento contínuo. `prefers-reduced-motion` remove transições dispensáveis. O limite absoluto é 200 ms.

## Componentes e variantes

Componentes são planejados, não implementados. Reutilizar formulário controlado e handlers atuais; extrair apenas responsabilidades úteis e repetidas. Primitivas shadcn são código local adaptado aos tokens, não uma estética pronta.

| Componente | Base/reutilização | Variantes e limites |
| --- | --- | --- |
| Button | Primitive shadcn, handlers atuais | primary: criar/iniciar/concluir; secondary: ação neutra se existir; destructive-outline: cancelar com texto error-fg, borda error-border e fundo branco; pending e disabled com semântica. Altura 44, sem ícone obrigatório. |
| FormField | Composição fina de label, input e mensagem | required/optional, invalid, disabled. Mantém `id`, `name`, `ref`, limites, required, tipo e callbacks. |
| Input / Textarea | shadcn seletivo, valor controlado atual | texto/data; textarea mínimo 96 px, redimensionável verticalmente. Fonte mínima 16; sem sombra padrão. |
| NativeSelect | Manter `<select>`; primitive apenas se conservar nativo | Tipo e filtro. Mesmo conjunto de opções/valores; não criar combobox ou dropdown complexo. |
| CycleStatus | Badge shadcn adaptado | draft/active/completed/cancelled, todos com rótulo e fundo textual correspondente. Não clicável. |
| CycleItem | Mesmo ciclo/lista e condicionais atuais | Rascunho e ativo com ações existentes; encerrados sem ações. Título integral, período pt-BR e status. Sem Card repetitivo ou clique no item. |
| CycleForm | Seção atual extraída por responsabilidade | Sem migrar estado para outra biblioteca só por estilo; cinco campos e mesmo envio. |
| CycleFilter | Label/select atuais | Todos/quatro estados; seleção preservada. |
| CycleFeedback | Alert/estrutura semântica adaptada | info/success/warning/error; papel anunciado depende de urgência, não só da cor. Persistente na região, sem toast como único feedback. |
| CycleResults | Lista atual | loading/empty/filter-empty/error/ready. Erro nunca aparece como vazio bem-sucedido. |

Primitivas não serão importadas se não trouxerem benefício frente ao elemento atual. Não adicionar Card, Sidebar, Chart, Calendar, Progress, Dialog ou pacote de UI inteiro nesta fase. [shadcn componentes](https://ui.shadcn.com/docs/components), [Native Select](https://ui.shadcn.com/docs/components/native-select).

## Formulários, navegação e feedback

Formulário aberto na página, sem modal nem etapas adicionais. Ordem: título, descrição opcional, tipo, início e fim. Manter campos obrigatórios e restrições nativas; vincular mensagens personalizadas via `aria-describedby` e erros de domínio existentes. O tratamento nativo de `invalid` precisa apontar o primeiro campo e sua mensagem sem duplicar duas locuções de erro. Não reescrever validador nem transformar exceções de domínio em novos contratos.

Não adicionar barra global, abas ou paginação inexistente. `/` continua levando a `/pdi-cycles`. Se as superfícies funcionais ausentes forem entregues separadamente, compartilhar padrões; não construir rotas antecipadas.

| Contexto | Texto de referência / comportamento |
| --- | --- |
| Vazio inicial | “Você ainda não criou um ciclo. Use o formulário Novo ciclo para planejar seu período de desenvolvimento.” |
| Filtro vazio | “Nenhum ciclo ativo neste filtro. Altere o status para consultar outros ciclos.” Adaptar ao rótulo selecionado. |
| Leitura | “Carregando ciclos…”; região busy e anúncio de status |
| Sucesso cadastro | “Ciclo criado como rascunho.” Sob filtro incompatível, explicar que ele pode ser encontrado em Rascunho/Todos sem trocar seleção. |
| Sucesso transição | “Ciclo iniciado.”, “Ciclo concluído.”, “Ciclo cancelado.” |
| Datas | “A data final deve ser posterior à data inicial.” Associada à data final e relação com inicial. |
| Segundo ativo | “Já existe um ciclo ativo. Conclua ou cancele o ciclo atual antes de iniciar outro.” Junto à ação recusada. |
| Falha técnica | “Não foi possível carregar os ciclos. Recarregue a página para tentar novamente.” Sem mensagem interna/JSON. |
| Gravação falhou | “Não foi possível salvar o ciclo. Seus dados continuam no formulário.” Apenas se de fato preservados. |
| Criação sucedeu e atualização da lista falhou | Confirmar criação e explicar falha de atualização separadamente; não sugerir novo envio que duplicaria o ciclo. |

Sucesso usa região `status`/live polite; erro relevante usa `alert` sem transferir foco arbitrariamente. Envio inválido direciona ao primeiro campo inválido ou resumo navegável. Se uma transição retirar o botão/ítem, foco segue para o título do item atualizado ou título da região de resultados quando o filtro o remover. Não focar sempre o topo da página.

## Visualização de progresso profissional

Neste escopo, apresentar **estado do ciclo e período planejado**. “Ativo” indica execução declarada; “Concluído” indica encerramento, sem provar metas atingidas. Datas são calendário, não porcentagem de desenvolvimento. Não introduzir barras, anéis, pontuação, sequência de dias, comparações ou contadores como novas funcionalidades.

Histórico temporal só é exibido se sua superfície funcional for entregue em trabalho próprio. Nesse caso, eventos correspondem a transições reais, com rótulo, data no fuso do usuário e ordem por instante; nunca uma trilha decorativa com etapas inventadas. Gráficos futuros exigirão especificação própria com origem, unidade, denominador, período e alternativa textual; dado ausente não vira zero. Não adotar novos componentes Progress/Chart neste refinamento.
