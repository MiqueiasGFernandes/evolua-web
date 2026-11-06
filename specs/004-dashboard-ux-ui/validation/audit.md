# Auditoria anterior à alteração de produção

Capturas de 2026-11-06 pelo runner Playwright com dados sintéticos. [Desktop](before-1440.png), [tablet](before-768.png), [mobile](before-390.png).

Fluxo: 1. abrir ciclos mistos; 2. comparar consulta e cadastro; 3. verificar navegação e adaptação em tablet/mobile.

| Achado | Evidência | Impacto visual / uso / abrangência | Ação |
| --- | --- | --- | --- |
| Sidebar e header se confundem com fundo | Desktop | alto / médio / shell | grafite e header branco |
| Títulos serifados e grande peso editorial | Desktop/mobile | alto / médio / global | Source Sans 3, escala única |
| Consulta e cadastro sem superfície própria; divisor longo | Desktop | alto / médio / tela | painéis Card independentes |
| Títulos e ações disputam largura | Desktop | médio / alto / tabela | grid mais largo, ações flex, quebra controlada |
| Tablet mostra sidebar compacta em vez do overlay especificado | tablet + CSS 767px | médio / alto / navegação | breakpoint 1024px |
| Destino não tem aria-current e atalhos só rolam | inspeção DOM/código | médio / alto / teclado | seleção e foco no destino |
| Fechamento móvel retorna sempre ao trigger, inclusive ao navegar | inspeção código | baixo / alto / teclado | distinguir navegação/fechamento e resize |

Pontos preserváveis: formulário rotulado, datas validadas, status textuais, tabela com caption/scope, feedback de leitura, menu nativo e regras isoladas. Reutilizar em vez de reescrever.

Limites: screenshots não comprovam uso de leitor de tela; essa etapa será complementada com axe e testes de foco/teclado. Referência visual do prompt não veio anexada; análise parte da direção textual e do produto real.
