# Research: Gerenciamento de Ciclos de PDI

## Decision: OpenAPI 3.1 como contrato canônico
**Rationale**: Permite geração de tipos/clientes, documentação e validação entre frontend e backend. O schema exportado pelo backend será comparado semanticamente em CI.
**Alternatives considered**: contrato implícito gerado apenas pelo FastAPI (rejeitado por permitir divergência silenciosa); tipos manuais (rejeitados por duplicação).

## Decision: Monólito modular com Ports & Adapters
**Rationale**: Mantém baixo custo operacional e separa domínio de framework, persistência e HTTP.
**Alternatives considered**: microsserviços (prematuros); acesso direto do controller ao banco (viola separação e dificulta testes).

## Decision: TanStack Query + Orval no frontend
**Rationale**: Centraliza estado remoto e deriva tipos/hooks do contrato.
**Alternatives considered**: estado global manual (desnecessário); clientes HTTP e tipos manuais (risco de divergência).

## Decision: Controle transacional de estado e versão de edição
**Rationale**: Exclusividade de ACTIVE, histórico consistente e rejeição de edições concorrentes exigem uma decisão atômica.
**Alternatives considered**: última escrita vence (perda silenciosa); merge automático (ambíguo para regras de negócio).

## Decision: UTC para eventos e fuso do usuário na apresentação
**Rationale**: Preserva ordenação e comparação entre ambientes sem perder contexto local.
**Alternatives considered**: UTC exibido sempre (menos amigável); fuso fixo da aplicação (incorreto para usuários distribuídos).

## Decision: Autenticação como boundary, fora da feature
**Rationale**: A especificação exige usuário autenticado, mas exclui implementação completa de autenticação.
**Alternatives considered**: identidade enviada pelo cliente (insegura); mock em produção (proibido).

