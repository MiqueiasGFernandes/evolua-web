# Research: Dashboard Evolua após clarificação

**Date**: 2026-11-06. Inspeção do código existente e pesquisa delegada somente leitura; fontes primárias consultadas nesta sessão. Nenhuma revisão manual com leitor de tela foi executada.

## R1 — Preservar stack, identidade e componentes

- **Decision**: Source Sans 3 local, verde Evolua, sidebar grafite, tokens semânticos, HTML nativo de tabela/select/dialog, CVA e composição Card existente.
- **Rationale**: a implementação já atende a direção visual textual e oferece os pontos de extensão necessários; a clarificação altera a aceitação, sem exigir outra biblioteca ou arquitetura.
- **Alternatives considered**: substituir fontes, preset, biblioteca de formulário ou tabela; adicionar gráficos/estatísticas. Não há necessidade funcional que justifique essas mudanças.
- **Evidence**: `apps/web/package.json`, globals.css, componentes da feature e [design-system.md](design-system.md). Composição de Card consultada anteriormente na [documentação shadcn](https://ui.shadcn.com/docs/components/radix/card).

## R2 — Empilhar com relações tabulares preservadas

- **Decision**: manter `table`, `caption`, cabeçalhos e células; abaixo de 768 px, preservar a composição empilhada existente. Verificar efetivamente o contexto anunciado de título, período, situação e ações.
- **Rationale**: empilhar é decisão expressa do usuário (FR-006), e a semântica deve continuar compreensível por tecnologia assistiva. A WAI descreve a importância da associação entre cabeçalhos e células. [WAI Tables Tutorial](https://www.w3.org/WAI/tutorials/tables/)
- **Alternatives considered**: rolagem horizontal no celular ou blocos sem relações tabulares. A primeira opção foi preterida na clarificação; a segunda perde contexto de dados. A WCAG permite exceções de reflow para certas tabelas; portanto, não se deve apresentar o empilhamento como obrigação universal da norma. [Understanding Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- **Implementation consequence**: testar 320/390 px e o anúncio real; corrigir estilos/associações somente diante de falha reproduzida. Não adicionar ARIA redundante por especulação.

## R3 — Separar automação, teclado e revisão manual

- **Decision**: três evidências obrigatórias para aceitação: testes automáticos, verificação de teclado e revisão manual real com leitor de tela (FR-011, SC-004).
- **Rationale**: ferramentas isoladas não determinam a acessibilidade de um site; avaliação humana continua necessária. [WAI Evaluating Web Accessibility](https://www.w3.org/WAI/test-evaluate/)
- **Alternatives considered**: aceitar apenas axe/DOM/screenshot, ou chamar testes automatizados de teclado de revisão com leitor de tela. Essas evidências não comprovam o anúncio nem a compreensão real.
- **Validation consequence**: registrar avaliador, versão do código, sistema, navegador/leitor e versões, viewport/dispositivo, passos, observações e resultado. Configurações não avaliadas permanecem limites declarados; nenhum leitor ou sistema operacional específico é imposto como nova exigência do usuário.

## R4 — Avaliar modal e navegação em operação real

- **Decision**: revisar nome do diálogo, foco interno, Tab/Shift+Tab, Escape, fundo indisponível, retorno ao acionador e foco na seção quando há navegação.
- **Rationale**: essas interações tornam o modal operável e preservam o contexto. [WAI APG Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- **Alternatives considered**: validar somente a abertura visual ou substituir o dialog nativo por biblioteca nova. O primeiro método é insuficiente; o segundo só faria sentido se a revisão demonstrasse uma limitação concreta não corrigível na composição atual.

## R5 — Verificar campos e mensagens sem exigir fala idêntica

- **Decision**: revisar identificação de campos, obrigatoriedade, instruções, erros e feedback de cadastro/transição. A fala pode variar entre leitores, desde que a informação e sua relação sejam compreensíveis.
- **Rationale**: usuários precisam perceber os resultados e recuperar-se dos erros. [WAI User Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)
- **Alternatives considered**: exigir uma transcrição literal única ou comprovar mensagens apenas por presença de atributos. Nenhuma dessas alternativas avalia adequadamente o uso real.
- **Validation consequence**: estados de falha/carregamento difíceis de observar precisam de fixture controlada usando a porta existente. A ausência de reprodução não equivale a aprovação; preparar esses cenários pertence à próxima fase de tarefas.

## R6 — Preservar evidência histórica e manter a aceitação atual pendente

- **Decision**: conservar o relatório e as capturas anteriores, identificando a mudança de critério; completar novo registro de revisão manual antes de atualizar o status de aceitação.
- **Rationale**: mantém rastreabilidade sem invalidar resultados automáticos reais nem fabricar avaliação humana.
- **Alternatives considered**: apagar o histórico, reaproveitar screenshots como revisão de leitor ou atualizar baselines automaticamente. Essas alternativas prejudicam a evidência exigida em FR-010/FR-011.

## R7 — Classificar alteração local de metadados sem apagar histórico

- **Decision**: preservar `info.title: Evolua API` no OpenAPI e registrar seu hash atual separado do baseline histórico.
- **Rationale**: a conferência detectou essa alteração local externa ao planejamento; o diff do arquivo contém somente o título, enquanto domínio/porta/adaptador coincidem com os hashes anteriores. O título da Constituição também mudou o nome do produto, sem alteração dos princípios.
- **Alternatives considered**: restaurar arquivos de outro trabalho ou substituir silenciosamente os hashes históricos. Nenhuma das alternativas preserva adequadamente o estado compartilhado e a rastreabilidade.
- **Evidence**: [planning-state.json](validation/planning-state.json); nenhum arquivo de contrato/Constituição foi modificado nesta etapa.

## Research Closure

Decisões técnicas resolvidas com a stack existente. Resultado de avaliação humana e identidade/configuração do futuro avaliador são dados de execução a registrar, não dúvidas de design nem evidência já disponível.
