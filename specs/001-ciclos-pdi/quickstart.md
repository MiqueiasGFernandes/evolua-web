# Quickstart: Validação de Ciclos de PDI

## Pré-requisitos
- Node.js LTS, pnpm e Python 3.12+.
- PostgreSQL disponível para testes de integração.
- Identidade de teste habilitada somente no ambiente de teste.

## Validação do contrato
1. Validar `contracts/openapi.yaml` como OpenAPI 3.1.
2. Gerar artefatos Orval e confirmar que arquivos gerados não foram editados manualmente.
3. Exportar o schema do backend e executar comparação semântica com o contrato canônico.

## Validação frontend
- Executar lint, Prettier, typecheck e Vitest.
- Executar testes MSW para criação, listagem, detalhe, edição e actions.
- Executar Playwright para criar ciclo, filtrar/paginar, editar DRAFT/ACTIVE, ativar, concluir/cancelar e consultar histórico.
- Confirmar estados vazio, erro, carregamento, teclado e anúncio de validações.

## Validação backend
- Unitários: limites, datas, estados e transições.
- Integração: persistência, histórico atômico, autorização e isolamento.
- Concorrência: duas ativações do mesmo usuário e duas edições com versão obsoleta.
- Confirmar que DRAFT→ACTIVE não exige objetivos e que encerrados não podem ser modificados.

## Resultado esperado
Todos os critérios SC-001 a SC-008 devem ser demonstráveis pelos testes correspondentes. Falhas de contrato, isolamento, concorrência ou consistência entre status e histórico bloqueiam a entrega.

