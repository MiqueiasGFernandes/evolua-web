# Contrato de interface — Busca nas opções do menu

## Campo e posição

- No menu desktop expandido, apresentar o campo de busca após a área da marca/controle de recolhimento e antes da primeira seção de navegação.
- No diálogo do menu móvel aberto, apresentar o mesmo campo após a marca e antes das seções/opções.
- O campo é do tipo busca, com nome acessível `Pesquisar no menu` e instrução concisa de que filtra opções de navegação.
- O menu desktop mínimo não renderiza o campo nem elementos de resultado relacionados.

## Filtragem e resultado

- Alterar o texto atualiza imediatamente as opções visíveis. Normalizar consulta e rótulo por `trim`, minúsculas e remoção de acentos antes de comparar por inclusão.
- Consulta vazia ou composta por espaços mostra todas as opções.
- Com consulta não vazia, uma seção que contém correspondências deve exibir suas opções ainda que estivesse fechada; ao limpar, volta a obedecer ao estado de abertura anterior.
- Manter a semântica de links, seus destinos, rótulos, ícones e `aria-current`.
- Sem correspondências, não renderizar links irrelevantes e apresentar uma mensagem textual de ausência de resultados.
- Fornecer região de status acessível que anuncie uma mudança significativa de resultado, incluindo ausência de resultado, sem repetir anúncios a cada caractere quando o resultado equivalente não mudou.

## Teclado, foco e diálogo

- O campo participa da sequência natural de Tab quando visível, tem foco visível com contraste do menu e pode ser limpo por edição normal.
- No diálogo móvel, o algoritmo de contenção de Tab inclui input, links e botões habilitados; Shift+Tab no primeiro volta ao último e Tab no último volta ao primeiro.
- A abertura e o fechamento do diálogo preservam o comportamento existente de foco; fechar limpa a consulta e devolve foco ao acionador.
- Recolher o desktop enquanto o campo tem foco remove o campo de forma segura e deixa um controle de navegação visível focalizável.

## Responsividade e limites

- O campo ocupa a largura disponível sem criar rolagem horizontal em 320, 390, 768 e desktop.
- Reutilizar tokens de cor, espaçamento e controles existentes com variante de contraste apropriada à barra lateral.
- Fora do escopo: busca global, sugestão/autocomplete, atalhos de teclado globais, persistência, telemetria e mudança de permissões/destinos.
