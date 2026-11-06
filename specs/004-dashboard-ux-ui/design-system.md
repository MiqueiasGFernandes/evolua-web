# Design system Evolua

## Foundations
Cores semânticas centralizadas em globals.css: página #F8F9FB, superfície branca, sidebar #202124, texto #24262B/#626975, borda #E5E7EB, controles com borda contrastante, ação verde Evolua #31584A. Status mantêm rótulos textuais e cores suaves; vermelho é reservado a falha/cancelamento.

Source Sans 3 local: título 28/36 semibold, seção 20/28 semibold, card/corpo 14–16, metadados 12–14. Escala de espaço 4/8/12/16/24/32/48. Raio de controle 8px e painel 12px. Bordas 1px, sem sombra de painel. Controles 44px, ações tabulares 36px em desktop e 44px em toque.

Breakpoints: 480px datas em uma coluna; 768px tabela empilhada; 1024px navegação persistente; 1280px consulta e cadastro lado a lado. CSS usa valores literais apenas nos media queries porque variáveis customizadas não são suportadas ali.

Estados: hover neutro, pressed, disabled, invalid, pending, foco 3px; foco claro na sidebar grafite; reduced-motion respeitado.

## Componentes e reuso
| Papel | Implementação |
| --- | --- |
| AppShell/Sidebar/Header | CycleDashboard / CycleNavigation / pdi-topbar |
| PageHeader/PageContainer/SectionHeader | composição existente + classes semânticas |
| Card | UI Card/Header/Title/Description/Content, compartilhado por lista/formulário |
| Button/Input/Select | controles locais CVA e nativos preservados |
| Dialog | dialog nativo no menu móvel |
| Table/DataTable | CycleTable, sem estado de ordenação/paginação inventado |
| Badge | CycleStatus, quatro variantes semânticas |
| EmptyState/LoadingState | CycleResults |
| Toast/Feedback | CycleFeedback inline, com role status/alert |
| StatCard/Tabs | padrões reservados para necessidade funcional futura; sem componentes ociosos |

Não adicionar componentes genéricos, gráficos, ícones decorativos, abas ou indicadores sem uso. Preservar labels, validações e feedback do produto.
