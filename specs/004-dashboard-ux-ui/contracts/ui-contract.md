# UI Contract: Dashboard Evolua

**Requirements**: FR-001–FR-011; SC-001–SC-005. Atualizado após as duas clarificações de 2026-11-06.

## Identidade e navegação

- IDs preservados: topo, conteudo, meus-ciclos, novo-ciclo, list-title, create-title, cycle-title, cycle-description, cycle-duration, cycle-start, cycle-end, cycle-filter.
- Landmarks e títulos identificam navegação, conteúdo, consulta e cadastro; o atalho inicial permite ir ao conteúdo por teclado.
- Links internos indicam a seção selecionada com `aria-current="location"`.
- CTA “Novo ciclo” e links internos movem rolagem/foco ao destino sem limpar formulário nem filtro.
- Recolhimento mantém controles nomeados e foco visível; não cria rotas novas.

## Menu e breakpoints

- A partir de 1024 px: sidebar permanente, expandida (232 px) ou compacta (72 px).
- Abaixo de 1024 px: acionador móvel e dialog temporário inicialmente fechado; sidebar permanente oculta.
- Dialog nomeado, foco inicial interno, Tab/Shift+Tab contidos, Escape/botão/fundo fecham e devolvem foco ao acionador. Seleção de destino fecha e foca a seção.
- Ao redimensionar para desktop com dialog aberto, o dialog fecha, o conteúdo deixa de estar bloqueado e o foco permanece em elemento visível relacionado.
- O conteúdo de fundo fica indisponível para interação enquanto o modal está ativo.

## Consulta e tabela empilhada

- Tabela nativa com caption e cabeçalhos associados a título, período, situação e ações.
- Cada ciclo é apresentado uma vez, com dados originais, datas pt-BR e situação textual; ações identificam o ciclo a que pertencem.
- Abaixo de 768 px, a composição empilha os dados de cada linha. Em 320/390 px, todos os campos/ações ficam acessíveis sem rolagem horizontal.
- Cabeçalhos disponíveis à tecnologia assistiva e associação entre valores/cabeçalhos devem sobreviver à mudança de layout. CSS visual e texto gerado não são prova suficiente desse resultado.
- Títulos longos quebram sem esconder situação, período ou ações. Estados finais não oferecem transições inválidas.
- Filtro permanece identificado e selecionado após operações. Mudança de resultados e estado sem correspondências são compreensíveis.

## Formulário e operações

- Labels, instruções e condição opcional/obrigatória identificáveis; validações existentes preservadas conforme [data-model.md](../data-model.md).
- Campos operáveis por teclado/leitor; foco e mensagem permitem localizar/corrigir erro.
- Criação pendente e ações indisponíveis comunicadas; valores preservados em falha de gravação.
- Sucesso de criação, transição e impedimento de segundo ciclo ativo são perceptíveis; nenhuma nova regra de negócio.

## Estados e anúncios

- `loading`, primeiro uso, filtro sem resultados, erro de leitura e feedback de operação permanecem distintos.
- Anúncios de status/erro devem informar resultado sem mover o foco arbitrariamente; quando uma operação remove a linha focada, foco segue ao destino relacionado.
- Validar o resultado real com leitor de tela, sem exigir fala literal idêntica entre tecnologias.
- Estados transitórios/falhas podem ser preparados em fixture isolada de teste usando a porta de repositório existente; não adicionar novos controles, atrasos ou rotas de teste ao produto.

## Preservação e aceitação

- Domínio, porta, adaptador e contratos existentes não devem ser alterados por esta refatoração. Comparar hashes com o [estado deste planejamento](../validation/planning-state.json) e preservar o baseline histórico. A diferença local de `info.title` do OpenAPI (“Evolua PDI API” → “Evolua API”) está registrada; não atribuí-la à refatoração nem revertê-la.
- Aprovação automática, revisão de teclado e avaliação manual com leitor são evidências obrigatórias e distintas: [contrato de revisão](accessibility-review.md).
- Capturas são candidatos de revisão visual; baseline somente após aprovação humana específica, independente da execução deste plano.
