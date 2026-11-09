# ADR 0001 — Cadastro por objetivos e compatibilidade

Status: aceito para implementação local da SPEC-005, 2026-11-08.

Decisão: união LEGACY/OBJECTIVES, criação nova sem título/descrição; calendário no domínio; wizard único em dois hosts. Migrar array v1 para envelope v2 com cópia exata da origem, mantendo chave v1 intocada. Validar coleção antes de gravar. Se v1 divergir da origem após migração, interromper sem merge/reset. Cliente antigo não entende v2; downgrade não recupera registros novos. Preservar ambos os valores antes de recuperação assistida.

Rejeitados: sintetizar objetivos dos títulos, recalcular datas históricas, apagar armazenamento ou adicionar backend neste escopo. Atualizar consumidores internos juntos. OpenAPI v1 continua histórico; contrato prospectivo v2 está na SPEC-005. Consequência: armazenamento extra para backup e escritores antigos concorrentes não suportados. local-user não é autenticação real; uso com dados privados multiusuário em produção segue bloqueado até controle real de acesso. Não há publicação nesta feature.
