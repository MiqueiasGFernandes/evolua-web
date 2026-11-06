# Estado inicial — 2026-11-06

## Ambiente e comandos

- Node.js `24.21.0`; pnpm `12.10.1`.
- Next.js `15.5.29`; React/React DOM `19.3.1`; TypeScript `5.9.3`; Vitest `2.1.9`.
- Comandos anteriores: `dev`, `build`, `lint`, `typecheck`, `test`. O script anterior `next lint` não tinha configuração compatível; esta SPEC substitui-o por ESLint flat config.
- Build anterior em `apps/web/.next`: 92.073.904 bytes, apenas como referência local não canônica.

## Defeitos visuais anteriores confirmados

- Status e datas eram expostos em códigos técnicos/ISO.
- Estados de primeiro uso, filtro vazio e falha de leitura não eram diferenciados.
- Erro era global e não associado ao campo/operação.
- Título válido de 120 caracteres sem espaços gerava overflow horizontal.
- Controles tinham alvos abaixo da meta de 44 px e o layout não possuía hierarquia editorial.

## Integridade antes da apresentação

| Artefato | SHA-256 |
|---|---|
| `domain.ts` | `afc58e723ee764c2265a992c9953d57ac266f19afb57e5985be1327c64a75b55` |
| `pdi-cycle-repository.ts` | `78c0908fc4ce95b8c6047646dd5caeb98df71b61acdf0dacf6407c019dac5228` |
| `local-storage-pdi-cycle-repository.ts` | `fd1be5943b6dfaba62fe39e016a3fac8d7978aa5a5c630b424de911a3612d22a` |
| `specs/001-ciclos-pdi/contracts/openapi.yaml` | `ff10a3f330d7f5f3a9326f526bb7966285369d492ccb3f0edf5211a3ee21d023` |

Nenhum desses arquivos faz parte da implementação visual planejada.
