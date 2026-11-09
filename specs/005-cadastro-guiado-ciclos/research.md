# Pesquisa — Cadastro guiado de ciclos

Data: 2026-11-08. Base: SPEC-005, respostas 1A/2A, inspeção do domínio, porta, adaptador, dashboard, navegação, pacote e testes atuais. Pesquisa de acessibilidade delegada ao agente `pesquisa_cadastro`, somente leitura. Nenhuma dúvida técnica bloqueante permanece.

## R1 — Composição e navegação

**Decision**: manter Next.js App Router/React/TypeScript e componentes locais. Criar `/pdi-cycles/new` como página real e abrir o mesmo wizard no modal local da consulta pelo botão. Extrair apenas o shell compartilhado necessário às duas rotas. Não usar interceptação de rotas para o modal.

**Rationale**: entradas diferentes com conteúdo idêntico; estado e regras ficam no wizard, contextos cuidam de navegação, foco e sucesso. O menu atual aponta para `#novo-ciclo` e precisa mudar. Fechar o menu móvel antes da navegação.

**Alternatives considered**: duplicar formulários provocaria divergência; rotas interceptadas adicionariam complexidade sem requisito de URL para o modal; manter formulário embutido viola FR-001–003.

## R2 — Datas e validação

**Decision**: função pura de calendário no domínio, sem biblioteca nova. Validar data ISO real, somar 3/6/12 meses a partir do início e limitar o dia ao último do mês de destino; nunca somar dias ou milissegundos. Componentes UTC, com verificação de ida e volta, evitam dependência de fuso e normalização silenciosa de datas inválidas. Aceitar anos de quatro dígitos 0001–9999; se o resultado sair do intervalo representável, informar erro de período. O adaptador valida/recalcula o término automático antes de gravar.

**Rationale**: decisão 2A e proteção contra datas adulteradas fora do formulário. Valores são datas sem horário; não converter para meia-noite local. Não confiar só em comparação lexical ou Date.parse.

**Alternatives considered**: dias fixos, fim de trimestre civil e soma repetida mês a mês contrariam a regra confirmada. Biblioteca de datas é desnecessária para essa operação restrita.

## R3 — Modelo e compatibilidade

**Decision**: distinguir registros `LEGACY` e `OBJECTIVES`; novos cadastros recebem objetivos e não recebem título/descrição. Leitura e transições suportam ambos. Separar validação de criação nova da validação de atualização legada. Introduzir envelope local versionado v2 e migração preservadora, conforme contrato de persistência.

**Rationale**: o domínio atual torna título obrigatório, o adaptador interpreta JSON por cast e `update` reaplica a validação de criação. Simplesmente tornar título opcional pode apagar a distinção de regras e impor datas/objetivos retroativos. Objetivos são apenas lista textual ordenada; não precisam de entidade, IDs ou tabela próprios.

**Alternatives considered**: converter títulos em objetivos, apagar v1 ou recalcular períodos históricos viola FR-018/020. Continuar escrevendo formatos mistos sem versão impede validar migrações. IDs em objetivos só seriam necessários com edição independente, fora do escopo.

## R4 — Acessibilidade e descarte

**Decision**: reutilizar o padrão nativo `<dialog>.showModal()` já usado no menu; um diálogo de criação, nomeado, com foco no título inicial e no título de cada etapa. Sequência em lista ordenada e `aria-current="step"`. Erros associados aos campos e foco no primeiro inválido. Confirmação de descarte substitui temporariamente o conteúdo no mesmo diálogo; na página, confirmação inline. Continuar restaura etapa e foco. Leitor de tela real é condição de aceitação separada de axe.

**Rationale**: aplicar orientação WAI a formulários em etapas e modais, sem diálogos sobrepostos. Término automático será saída textual identificada; somente Personalizado renderiza entrada editável. Navegação e layout usam tokens existentes.

**Alternatives considered**: formulário duplicado, indicador só por cor, campo automático apenas desabilitado e modal de confirmação aninhado tornam orientação/foco mais difíceis. A confirmação no mesmo diálogo é uma decisão deste projeto, não exigência literal da WAI.

Fontes primárias consultadas pela pesquisa delegada:
- [WAI — Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).
- [WAI — Multi-page Forms](https://www.w3.org/WAI/tutorials/forms/multi-page/).
- [WAI — User Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/).

## R5 — Contratos e limites operacionais

**Decision**: manter o OpenAPI v1 como contrato histórico; descrever evolução v2 nesta feature sem implementar backend. Atualizar atomicamente tipos, adaptadores, fixtures e consumidores internos na implementação. Preservar leitura e operações em legados; formato novo exige cliente atualizado. Nada de emular título a partir dos objetivos.

**Rationale**: não existe servidor HTTP neste repositório. `ownerId=local-user` e localStorage são limitações do protótipo existente, não autenticação multiusuário. O plano não apresenta o protótipo como pronto para dados privados em produção. Aceitação desta feature é local com dados sintéticos; liberação multiusuário permanece bloqueada até autenticação/autorização reais.

**Alternatives considered**: introduzir backend, autenticação ou manter escrita por clientes antigos em paralelo amplia o escopo. Silenciar a limitação de segurança daria conformidade falsa à Constituição.

## R6 — Consistência de envio e resultado

**Decision**: validar todo o planejamento antes da criação; bloqueio síncrono de envio via ref além do estado visual, uma escrita por criação, nenhuma escrita intermediária. Depois de salvar, falha ao atualizar lista é aviso de consulta, não falha de criação. Nunca repetir create automaticamente. Na página, retornar com ID criado e recuperar via get; não transportar objetivos na URL. Mostrar resumo do criado se não estiver na primeira página, preservando paginação existente.

**Rationale**: o adaptador devolve apenas 20 itens e a UI ignora paginação; o ciclo recém-criado pode não aparecer. Isso precisa ser tratado para FR-015 sem adicionar paginação. O bloqueio exigido cobre envios simultâneos no mesmo formulário, não deduplicação distribuída ou entre abas.

**Alternatives considered**: repetir gravação após falha de refresh pode duplicar; refazer paginação e ordenação amplia escopo; toast sem acesso ao registro não satisfaz o resultado de criação.
