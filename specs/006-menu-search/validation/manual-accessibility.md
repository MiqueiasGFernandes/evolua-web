# Revisão de acessibilidade

Revisão em 2026-11-08, apoiada por teclado automatizado, axe e inspeção do contrato de UI.

- O campo é `type=search`, nomeado por rótulo associado e tem foco visível no contraste da barra lateral.
- A ausência de resultado tem texto perceptível e região de status polida.
- Desktop mínimo não renderiza o campo; portanto não há parada Tab nem anúncio residual.
- No diálogo móvel, input, links e botões compõem o ciclo Tab/Shift+Tab; fechar devolve foco ao acionador e limpa a busca.
- As verificações de viewport e de texto ampliado não indicaram rolagem horizontal na área coberta.

Movimento reduzido e conteúdos longos continuam cobertos pelas regressões existentes do layout.
