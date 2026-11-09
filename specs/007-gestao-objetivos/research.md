# Pesquisa — Gestão de Objetivos

## R1 — Evoluir ciclos por objetivos sem descartar registros existentes

**Decisão**: introduzir objetivos estruturados apenas nos ciclos de variante `OBJECTIVES`, preservando ciclos `LEGACY` e o texto histórico da criação guiada. A persistência evolui do envelope local v2 para v3 de forma preservadora.

**Rationale**: o produto já possui ciclos criados por versões anteriores. Converter textos automaticamente em objetivos completos inventaria critério de sucesso, prazo e mensuração, corrompendo o significado histórico.

**Alternativas consideradas**:

- Converter cada texto antigo em objetivo: rejeitado por produzir dados fictícios.
- Substituir todos os ciclos por um único formato novo: rejeitado por quebrar compatibilidade.

## R2 — Calcular progresso quantitativo por linha de base e alvo

**Decisão**: para valores inicial, atual e alvo válidos, calcular `(atual - inicial) / (alvo - inicial)`, limitar o resultado visual entre 0 e 100 e tratar alvo menor como meta decrescente pela mesma fórmula. Valores inicial e alvo iguais não têm percentual calculável.

**Rationale**: a fórmula mantém a direção correta nos dois sentidos, não dá crédito arbitrário antes da linha de base e lida com superação sem exceder 100%.

**Alternativas consideradas**:

- Usar sempre `atual/alvo`: rejeitado porque ignora a linha de base e falha para metas decrescentes.
- Inferir conclusão ao atingir 100%: rejeitado pois a conclusão exige confirmação explícita.

## R3 — Manter status e atraso como conceitos distintos

**Decisão**: status persistido do objetivo é `PLANNED`, `IN_PROGRESS`, `COMPLETED` ou `CANCELLED`; atraso é valor derivado de prazo vencido com status não terminal.

**Rationale**: atraso muda com a data e desaparece ao encerrar o objetivo, sem apagar a intenção ou criar transições artificiais.

**Alternativas consideradas**:

- Adicionar status `OVERDUE`: rejeitado porque mistura situação temporal com ciclo de vida.
- Marcar concluído automaticamente na data: rejeitado por contradizer a SPEC.

## R4 — Tornar estados finais imutáveis e respeitar pausa do ciclo

**Decisão**: objetivos concluídos/cancelados são somente leitura. Ciclo pausado permite criar e editar planejamento, mas bloqueia atualizar resultados, concluir e cancelar.

**Rationale**: preserva histórico de resultado e aplica as quatro decisões de clarificação sem bloquear ajustes de planejamento durante uma pausa.

**Alternativas consideradas**:

- Permitir reabertura/edição após conclusão: rejeitado porque modifica resultado confirmado.
- Tornar ciclo pausado inteiramente somente leitura: rejeitado pela decisão explícita da clarificação.

## R5 — Representar acompanhamento qualitativo sem percentual

**Decisão**: cada critério observável mantém estado `NOT_STARTED`, `OBSERVING` ou `MET`; o objetivo também aceita resultado descritivo.

**Rationale**: fornece acompanhamento verificável sem converter julgamento qualitativo em percentual artificial.

**Alternativas consideradas**:

- Percentual pela quantidade de critérios atendidos: rejeitado porque a SPEC veda percentuais arbitrários.
- Apenas texto livre: rejeitado porque dificulta reconhecer a situação de cada critério.

## R6 — Manter a fronteira de proprietário local explícita

**Decisão**: continuar filtrando ciclo por `ownerId` no repositório local e não expor operações de objetivo fora do agregado ciclo. Documentar que isso é isolamento de protótipo, não autorização multiusuária.

**Rationale**: mantém a arquitetura atual e evita falsa alegação de segurança sem identidade autenticada.

**Alternativas consideradas**:

- Criar autenticação/servidor nesta feature: rejeitado por ser escopo distinto.
- Ignorar o requisito de proprietário: rejeitado; a fronteira deve continuar expressa e testada.
