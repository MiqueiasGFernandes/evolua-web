# Contrato de persistência — Objetivos no ciclo

## Operações da porta

As operações continuam centradas no ciclo, que preserva propriedade, versão e histórico.

| Operação | Entrada | Resultado / falhas |
| --- | --- | --- |
| Criar objetivo | `cycleId`, dados completos de planejamento, `expectedVersion` | Retorna ciclo atualizado; falha para dono incorreto, ciclo encerrado, prazo inválido ou conflito de versão. |
| Editar objetivo | `cycleId`, `objectiveId`, alterações permitidas, `expectedVersion` | Retorna ciclo atualizado; falha para objetivo terminal, ação bloqueada pelo ciclo ou tipo de mensuração inconsistente. |
| Atualizar resultado | `cycleId`, `objectiveId`, valor atual ou critérios/resultados, `expectedVersion` | Retorna ciclo atualizado; bloqueada em ciclo pausado ou encerrado. |
| Transicionar objetivo | `cycleId`, `objectiveId`, destino e, na conclusão, resultado, `expectedVersion` | Exige transição válida e confirmação na interface; estados finais não aceitam nova transição. |
| Consultar ciclo | `cycleId` | Retorna somente ciclo do proprietário local ou ausência. |

## Envelope local v3

```text
{ schemaVersion: 3, legacySource: string | null, cycles: PdiCycle[] }
```

- A leitura aceita envelopes v1 e v2 existentes e converte em memória antes de gravar o formato v3.
- A migração preserva registros e backup/fonte legada; nunca apaga chave anterior durante a atualização.
- Gravações validam todo o envelope e só ocorrem após validação de domínio e versão esperada.
- Um cliente antigo que modifique a fonte v1/v2 após a migração deve ser detectado como divergência, sem sobrescrever o estado.

## Limite de autorização

O contrato filtra `ownerId` pelo usuário local configurado. Isso impede operações por IDs de outro dono nas fixtures e no adaptador, mas não é uma autorização segura em ambiente multiusuário sem identidade de servidor.
