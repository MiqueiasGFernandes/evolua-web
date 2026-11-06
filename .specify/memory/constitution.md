<!--
Sync Impact Report
- Version change: template/unratified -> 1.0.0
- Modified principles: none; all principles established for the initial constitution
- Added sections: all core principles, technology preferences, Definition of Done, governance
- Removed sections: scaffold placeholders and examples
- Follow-up TODOs: none
-->

# Evolua PDI Engineering Constitution

## Core Principles

### I. Spec-Driven Development (SDD)

Toda funcionalidade MUST partir de especificação funcional aprovada antes da implementação. A especificação MUST conter requisitos testáveis, regras de negócio, critérios de aceitação e cenários de teste. O planejamento técnico MUST derivar dos requisitos. Cada tarefa MUST ser rastreável a um requisito, e mudanças relevantes de comportamento MUST atualizar a especificação. Ambiguidades MUST ser resolvidas antes da implementação.

### II. Clean Architecture e Modularidade

A arquitetura inicial MUST ser um monólito modular, evitando microsserviços prematuros. O código MUST seguir separação de responsabilidades, alta coesão, baixo acoplamento e SOLID. Módulos MUST ser orientados às capacidades do negócio. Regras de negócio MUST permanecer independentes de frameworks, HTTP, persistência e provedores externos. Dependências MUST apontar para o domínio. Abstrações MUST existir somente quando houver necessidade concreta de isolamento ou substituição.

### III. Domain-Driven Design Pragmático

Especificações, código e testes MUST usar linguagem ubíqua consistente. Entidades, objetos de valor, invariantes e regras MUST ser modelados explicitamente quando representarem conceitos do domínio. Limites de módulo MUST ser claros. Agregados e eventos de domínio SHOULD ser usados quando houver justificativa funcional. Controllers MUST NOT concentrar regras de negócio. Padrões de DDD MUST NOT ser aplicados indiscriminadamente.

### IV. Qualidade e Simplicidade

O código MUST ser legível, testável, coeso e manutenível. DRY, KISS e YAGNI MUST orientar decisões, sem abstrações prematuras. Nomes MUST ser expressivos; composição SHOULD prevalecer sobre herança quando apropriado. Funções extensas, responsabilidades misturadas e dependências circulares MUST ser evitadas. Funcionalidades fora da especificação MUST NOT ser adicionadas. Lint, formatação e análise de tipos MUST passar quando aplicáveis. Comentários MUST explicar decisões não evidentes, não repetir o código.

### V. Testes Automatizados e Confiabilidade

Regras críticas MUST possuir testes unitários. Persistência e integrações MUST possuir testes de integração. Fluxos essenciais SHOULD possuir testes ponta a ponta quando justificável. Testes MUST cobrir sucessos, falhas, limites e concorrência relevante; MUST ser determinísticos e independentes. Dependências externas MUST ser isoladas em testes unitários. Nenhuma funcionalidade será concluída sem testes que validem seus critérios de aceitação. Cobertura MUST priorizar comportamento e risco, sem meta artificial de 100%.

### VI. Segurança e Privacidade por Padrão

A aplicação MUST aplicar Secure by Design e Privacy by Design. Dados privados MUST exigir autenticação e autorização adequadas, com isolamento entre usuários. Entradas MUST ser validadas nas fronteiras. Segredos MUST NOT ser armazenados no código. Dados sensíveis MUST NOT aparecer em logs ou erros. O tratamento de dados MUST observar minimização, finalidade, retenção, exclusão e exportação aplicáveis à LGPD. Integrações externas MUST receber somente dados necessários. Proteções contra riscos relevantes do OWASP MUST ser consideradas.

### VII. Persistência e Integridade

Relacionamentos e invariantes MUST ser preservados. Operações que exigem consistência MUST usar transações. Mudanças de persistência MUST usar migrações versionadas. Operações concorrentes relevantes MUST ter comportamento definido e testado. Histórico MUST ser preservado quando necessário para rastreabilidade. Políticas de exclusão, retenção e auditoria MUST ser explícitas. Dados derivados SHOULD ser calculados em vez de persistidos quando isso for confiável e eficiente.

### VIII. Preparação para Inteligência Artificial

O produto MUST funcionar integralmente sem IA. Capacidades de IA MUST ser opcionais, isoladas por interfaces e independentes de SDKs de LLM no domínio. Recomendações MUST ser sugestões e MUST NOT alterar dados de negócio sem autorização. Resultados de IA SHOULD preservar contexto, origem, versão e feedback quando aplicável. Dados enviados a provedores MUST seguir minimização e privacidade. Embeddings, RAG, agentes e bancos vetoriais MUST ser introduzidos somente por necessidade funcional. Integrações SHOULD produzir resultados estruturados e validáveis.

### IX. APIs e Contratos

APIs MUST ser consistentes, previsíveis e documentadas. Contratos MUST ser independentes das entidades internas. Entradas MUST ser validadas e erros MUST seguir tratamento padronizado. Nomenclatura, paginação, idempotência e versionamento MUST seguir convenções consistentes. Mudanças incompatíveis MUST ter estratégia de migração. Contratos MUST ser documentados para clientes.

### X. Experiência e Acessibilidade

Interfaces MUST ser simples, responsivas e acessíveis, com componentes reutilizáveis e padrões consistentes. Ações, erros e carregamentos MUST fornecer feedback claro. Fluxos de registro e progresso SHOULD minimizar passos. Recomendações aplicáveis da WCAG 2.2 AA MUST ser atendidas. Métricas MUST ter significado compreensível. Indicadores visuais MUST NOT induzir conclusões incorretas sobre desenvolvimento profissional.

### XI. Observabilidade e Operação

Logs MUST ser estruturados e conter contexto suficiente para diagnóstico sem dados sensíveis. Métricas e tracing SHOULD ser usados quando a complexidade justificar. Configurações MUST ser separadas por ambiente. Build, testes e deploy MUST ser reproduzíveis. O MVP MUST preferir infraestrutura simples e econômica. Mensageria, caches distribuídos e processamento assíncrono MUST NOT ser introduzidos sem necessidade real demonstrada.

### XII. Evolução e Governança Arquitetural

Decisões arquiteturais relevantes MUST ser registradas em ADRs. Mudanças MUST justificar trade-offs de complexidade, custo, desempenho e manutenção. Tecnologias MUST NOT ser introduzidas apenas por popularidade. A evolução SHOULD ser incremental e compatível com funcionalidades existentes. Exceções MUST ser justificadas, documentadas e limitadas.

## Technology Preferences

As preferências iniciais são Next.js, React e TypeScript no frontend; Python e FastAPI no backend; PostgreSQL para persistência; pytest para testes; monólito modular com Clean Architecture pragmática; e infraestrutura simples e econômica. Essas preferências SHOULD orientar o planejamento, mas não são restrições imutáveis. Mudanças MUST ser justificadas em ADR.

## Definition of Done

Uma funcionalidade MUST atender todos os itens seguintes antes de ser considerada concluída:

- Requisitos e critérios de aceitação implementados e satisfeitos.
- Regras críticas cobertas por testes automatizados relevantes.
- Testes relevantes, lint, formatação e análise de tipos passando quando aplicáveis.
- Nenhuma violação conhecida de segurança ou isolamento de dados.
- Código conforme arquitetura e padrões de qualidade.
- Contratos e documentação afetados atualizados.
- ADRs relevantes registrados.
- Nenhuma funcionalidade extra introduzida sem aprovação.

## Governance

Esta Constituição MUST prevalecer sobre decisões locais que a contradigam. Toda especificação, plano, implementação e revisão MUST verificar conformidade com ela. Alterações MUST conter justificativa explícita, impacto e, quando necessário, plano de migração.

A Constituição usa Semantic Versioning:

- MAJOR: remoção ou redefinição incompatível de princípio.
- MINOR: novo princípio ou expansão material de orientação.
- PATCH: correção, esclarecimento ou melhoria semântica não incompatível.

Exceções temporárias MUST registrar princípio afetado, justificativa, impacto, responsável e prazo ou condição de resolução. Revisões de código MUST verificar SDD, segurança, testes, integridade, acessibilidade e Definition of Done. A Constituição MUST ser revisada quando decisões arquiteturais ou requisitos regulatórios relevantes mudarem.

**Version**: 1.0.0 | **Ratified**: 2026-11-06 | **Last Amended**: 2026-11-06

