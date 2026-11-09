# Modelo de dados — Busca nas opções do menu

Não há persistência nem alteração de entidades de negócio. O modelo abaixo descreve apenas estado de interface transitório.

## Opção de navegação

| Campo | Descrição | Regras |
| --- | --- | --- |
| `id` | Identificador estável da opção | Único no menu |
| `label` | Texto apresentado e pesquisável | Preservado sem normalização visual |
| `href` | Destino da navegação | Não é alterado pela busca |
| `icon` | Indicador visual da opção | Não participa da correspondência |

## Estado da busca

| Campo | Descrição | Regras |
| --- | --- | --- |
| `query` | Texto atual digitado | Efêmero; vazio após fechar o diálogo móvel ou recarregar/sair |
| `normalizedQuery` | Forma usada na correspondência | Derivada por trim, minúsculas e remoção de diacríticos; não armazenada separadamente |
| `matches` | Opções cuja forma normalizada contém a consulta | Derivado em cada alteração; vazio gera todas as opções |

## Transições de estado

| Evento | Consulta | Opções exibidas | Observação |
| --- | --- | --- | --- |
| Digitar/colar | Atualizada | Correspondências em tempo real | Não navega nem envia formulário |
| Limpar/espaços | Vazia após normalização | Todas | Remove o estado sem resultados |
| Recolher desktop | Não exposta | Busca não renderizada | Campo não é focalizável nem anunciado |
| Expandir desktop | Disponível | Conforme consulta em memória | Sem alterar links ou estado ativo |
| Fechar diálogo móvel | Limpa | N/A | Próxima abertura começa sem filtro |
| Abrir link correspondente | Sem transformação | Navega normalmente | Mantém regras existentes de fechamento/navegação |
