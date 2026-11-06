# Contrato de interface — SPEC-002

Este contrato descreve comportamento visível e interfaces de apresentação. Não cria endpoints nem substitui o [OpenAPI da SPEC-001](../../001-ciclos-pdi/contracts/openapi.yaml).

## Superfície e navegação

- `/` continua redirecionando para `/pdi-cycles`.
- A mesma página expõe título principal, seção “Novo ciclo” e seção “Meus ciclos”. Ordem DOM e foco: cadastro, filtro, resultados/ações.
- Não adicionar rota de detalhe/edição, sidebar, abas, paginação, calendário customizado ou modal de cadastro.
- Identidade textual Evolua pode aparecer como assinatura discreta, sem inventar destino de navegação, menu ou logo gráfico obrigatório.

## Formulário

| Campo / ação | Nome visível e contrato | Semântica preservada |
| --- | --- | --- |
| title | Título, obrigatório | Texto, mínimo 3/máximo 120; valor controlado |
| description | Descrição, opcional | Texto até 2.000; vazio → null |
| durationType | Tipo de período, obrigatório | Select nativo com quatro opções existentes; CUSTOM é o estado inicial atual |
| startDate | Data inicial, obrigatório | Date nativo, valor calendárico |
| endDate | Data final, obrigatório | Date nativo, posterior ao início |
| submit | Criar ciclo | Mesmo create; sem etapas adicionais |

ID estável do campo liga label, instrução e mensagem. Erro marca `aria-invalid` e associação por `aria-describedby`. Preservar required/minLength/maxLength/type e funcionamento dos controles nativos ao encapsular primitives. Planejar tratamento de `invalid` para que validação nativa e mensagem da UI não produzam anúncios duplicados; não remover restrições para escapar de testes.

Durante envio: pending na ação, disabled real, nome acessível descreve processamento. Falha preserva valores; sucesso limpa formulário e confirma rascunho. Se create funcionar e list falhar, mostrar ambos os resultados corretamente, sem sugerir criação novamente como se não houvesse persistência.

## Filtro, itens e ações

Filtro mantém Todos, DRAFT, ACTIVE, COMPLETED, CANCELLED internamente; textos traduzidos conforme [data-model.md](../data-model.md). Seleção não muda silenciosamente após operação.

| Estado | Ações visíveis | Resultado |
| --- | --- | --- |
| DRAFT | Iniciar, Cancelar | ACTIVE ou CANCELLED pelo fluxo existente |
| ACTIVE | Concluir, Cancelar | COMPLETED ou CANCELLED pelo fluxo existente |
| COMPLETED/CANCELLED | Nenhuma ação mutável | Consulta preservada |

Cada item mantém título completo, status e período. Botões repetidos recebem contexto acessível pelo item/título associado sem mudar o nome visível de sua ação. Item não inteiro clicável. Datas da lista formatadas em pt-BR sem conversão indevida de calendário por timezone.

## Resultados e foco

| Resultado | Contrato |
| --- | --- |
| loading | Texto de carregamento, região busy e anúncio; não afirmar vazio |
| ready + zero, sem filtro | Vazio inicial com orientação ao formulário existente |
| ready + zero, com filtro | Vazio contextual orientando alterar filtro |
| read error | Erro compreensível, sem detalhe interno nem “nenhum ciclo”; orientação de recarga |
| operation success | Confirmação contextual anunciada por status/polite |
| operation error | Mensagem contextual por alert quando urgente; nenhum sucesso falso |
| invalid submit | Foco no primeiro campo inválido ou resumo navegável, valores preservados |
| controle removido por transição | Foco no item atualizado; se item sai do filtro, título da região de resultados |

O foco não deve ser reiniciado no topo em toda leitura. Anúncio e foco são mecanismos diferentes; feedback não precisa roubar foco para ser lido.

## Fronteiras entre componentes planejados

| Unidade | Recebe | Comunica | Não pode assumir |
| --- | --- | --- | --- |
| CycleDashboard | Porta existente com default para adaptador atual | Orquestra leitura/cadastro/transição e estado UI | Nova regra de transição/persistência |
| CycleForm | Valores/erros/pending e callbacks existentes | Mudança de campo e submit | Recalcular período por duração, mudar contrato |
| CycleFilter | Filtro atual e callback | Nova seleção | Alterar dados persistidos |
| CycleItem / CycleStatus | Ciclo atual, pending/feedback e callbacks | Intenção de transição | Tratar status como percentual de progresso |
| CycleFeedback / CycleResults | Estado textual/semântico e conteúdo | Anúncio/resultado renderizado | Sucesso quando houve falha |
| Primitive UI | Props nativas, refs, tokens e variantes | Evento nativo | Regra de domínio ou acesso ao storage |

A prop opcional de repositório é um seam para testar pendência na porta já existente; assinatura da porta não muda. O proxy de teste não entra no bundle de produção. Mudanças de decomposição devem manter o entrypoint e contratos externos existentes.

## Compatibilidade e aceitação

RF-UI-001–029 continuam obrigatórios. [Design system](../design-system.md) define aparência planejada; [estratégia de validação](../visual-tests.md) define prova. Referência escolhida A não autoriza atualizar baseline sem comparação renderizada e aprovação. Nenhuma mudança é feita nesta etapa de planejamento.
