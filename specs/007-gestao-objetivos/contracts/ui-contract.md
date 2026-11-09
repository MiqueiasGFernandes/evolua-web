# Contrato de interface — Gestão de Objetivos

## Contexto e entrada

- A seção de objetivos existe somente na visualização de detalhes de um ciclo; a criação parte dessa seção, sem exigir navegação para outro ciclo.
- A seção apresenta resumo (`total`, `concluídos`, `pendentes`), lista ou estado vazio contextualizado.
- Ações são determinadas pelo estado do ciclo e do objetivo; controles bloqueados não devem executar mudanças nem parecer disponíveis.

## Formulário de objetivo

- Campos sempre exibidos: título, descrição opcional, motivação opcional, critério de sucesso, prazo, prioridade e tipo de mensuração.
- `Quantitativo`: indicador, unidade, valor inicial, alvo e valor atual opcional; oculta critérios qualitativos.
- `Qualitativo`: lista de critérios observáveis e resultado descritivo; oculta indicador e valores.
- Trocar o tipo antes de salvar não mistura nem envia campos do tipo oculto.
- Erros são associados ao campo, preservam o conteúdo digitado e movem foco ao primeiro erro após tentativa de envio.

## Lista, detalhe e estados

- Cada item mostra título, descrição resumida quando houver, prioridade, status, prazo, critério de sucesso e rótulo de atraso derivado quando aplicável.
- Quantitativos mostram indicador, valores e progresso somente quando calculável; caso contrário, mostram texto de indisponibilidade.
- Qualitativos mostram critérios e situação sem barra/percentual de progresso.
- O detalhe mostra todos os dados e resultados aplicáveis.
- Sem objetivos, mostrar explicação e ação de criação apenas quando o ciclo permitir planejamento.

## Operações sensíveis e foco

- Conclusão abre confirmação que solicita resultado efetivamente alcançado; somente confirmar aplica a transição.
- Cancelamento exige confirmação e informa que o registro permanecerá no histórico.
- Fechar diálogo/formulário com alterações não salvas pede confirmação de descarte.
- Após criar, editar ou atualizar, anunciar sucesso em região de status e mover foco para o título ou item atualizado; após fechar/cancelar, restaurar foco ao acionador.
- Todos os controles têm nome acessível, foco visível e sequência de Tab lógica; diálogos móveis contêm foco e suportam Escape.

## Responsividade

- Em 320/390/768 px, formulário, lista, detalhe e confirmações não criam rolagem horizontal.
- Ações longas empilham e rótulos de status/prioridade não dependem apenas de cor.
