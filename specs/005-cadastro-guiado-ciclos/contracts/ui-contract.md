# Contrato de interface — Cadastro guiado

## Entradas e composição — FR-001–004

- `/pdi-cycles`: consulta ocupa área principal sem formulário permanente. Botão “Novo ciclo” abre modal local. Manter consulta/filtro ao fundo; modal não altera URL.
- Menu desktop/móvel: “Novo ciclo” é link para `/pdi-cycles/new`. Página funciona por URL direta e recarga. Menu móvel fecha antes da navegação, sem focar a antiga âncora.
- Um `CycleWizard` controla Período → Objetivos → Revisão em ambos os contextos. Extrair `CycleAppShell` da estrutura existente apenas para evitar duplicação entre rotas. Reutilizar Button/Card/FormField/Input/feedback e tokens existentes. Sem biblioteca nova.

## Etapas — FR-005–012

1. **Período**: início obrigatório, duração inicial Trimestral. Término automático apresentado como saída legível com rótulo e explicação; não campo somente disabled. Em Personalizado, entrada de data com rótulo, orientação e erro associado. Datas sem início não exibem resultado fictício.
2. **Objetivos**: lista de campos textuais rotulados “Objetivo 1”, etc.; adicionar/remover com nomes acessíveis que identificam item. Iniciar com uma linha vazia. Ao adicionar, focar nova linha; remover foca vizinha ou “Adicionar objetivo” se lista vazia. Nunca inventar título/descrição. Sem reordenação por arrastar ou edição posterior de objetivos.
3. **Revisão**: duração, datas efetivas e lista ordenada de objetivos. Controles para voltar/corrigir; somente “Criar ciclo” envia. Enter em etapas anteriores segue a validação/avanço da etapa, sem criar prematuramente.

Exibir etapa atual textual “Etapa N de 3” e lista ordenada com `aria-current="step"`; não usar tabs, pois avanço depende de validação. “Continuar” valida a etapa; erro conserva valores e foca primeiro campo inválido, com aria-invalid/aria-describedby. Mudança bem-sucedida foca heading da etapa. Revisão confirma todos os campos novamente.

## Modal, saída e foco — FR-014–017

Dialog nativo via showModal, nome acessível e foco inicial no título. Fundo inerte, Tab/Shift+Tab contidos, fechamento por botão/Escape e clique de backdrop identificado fora dos limites. Cada caminho usa a mesma função de pedido de saída.

Sem alterações, fecha direto e restaura foco ao botão. Com alterações, manter mesmo dialog e substituir conteúdo por confirmação com “Continuar preenchendo” (foco inicial) e “Descartar”. Continuar restaura etapa/foco; descartar fecha e restaura acionador. Escape na confirmação equivale a continuar. Não empilhar segundo modal. Na página, confirmação inline cobre Cancelar, retorno à consulta e links app-owned oferecidos pelo shell. Fechar navegador/reload/back externo não tem garantia de bloqueio.

Durante gravação, feedback de andamento, ações que alteram/descartam/navegam desabilitadas e guarda síncrona contra repetição; Escape/backdrop não descartam uma operação pendente. Erro de gravação mantém revisão/dados e permite tentar novamente. Texto de erro não expõe objetivos ou conteúdo técnico do armazenamento.

## Sucesso e consulta — FR-013–015/018

Commit bem-sucedido torna o formulário salvo, mesmo se refresh falhar. Nunca reexecutar create como recuperação de refresh. No modal, fechar e atualizar consulta, anunciar confirmação, direcionar foco para resultado/criado ou heading adequado. Se filtro exclui DRAFT, explicar explicitamente, com acesso ao ciclo criado.

Na página, navegar para `/pdi-cycles?created=<id>` e recuperar por get limitado ao proprietário; estado de confirmação é transitório, sem objetivos na URL. Limpar sinalização da URL após consumo. Se não encontrar o ID, exibir resultado neutro sem afirmar criação nova. Não confiar em query como prova de gravação.

Novos ciclos são identificados pelo período e objetivos acessíveis em lista semântica; legados mostram título e texto histórico. Se criado estiver fora dos 20 itens retornados, mostrar resumo acessível do criado recuperado por get; não alterar paginação nem duplicar linha já visível. Falha de leitura posterior informa que gravação concluiu e orienta recuperar consulta.

## Layout e identidade

Manter sidebar grafite, marca verde, Source Sans 3, cores/estados e escala de espaçamento do design system atual. Página de cadastro centralizada com largura legível; modal com largura limitada ao viewport, altura máxima e conteúdo rolável. Ações no fluxo, sem cobrir campos/foco. Sem margens negativas para composição. Etapas, campos e ações empilham em telas pequenas; textos longos quebram. Testar 320/390/768/1024/1440 px, zoom e movimento reduzido.

## Aceitação de acessibilidade

Automatizar teclado, contenção/restauração de foco, nomes/erros, etapas, axe e limites de viewport. Revisão humana real com leitor de tela deve percorrer os dois contextos: anúncio de etapa, término automático, objetivo adicionado/removido, erro, confirmação de descarte, envio e retorno. Registrar data, navegador/versão, leitor/versão, revisor, cenário, resultado e achados. Automação não substitui essa revisão. Evidência da SPEC-004 permanece histórica e não aceita automaticamente a SPEC-005.
