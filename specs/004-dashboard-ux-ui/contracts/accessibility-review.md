# Contrato de revisão de acessibilidade

**Origem**: FR-011, SC-004 e User Story 3, cenário 5.  
**Estado deste documento**: definição do roteiro e do registro; revisão manual ainda não executada.

## Condições de execução

Usar dados sintéticos em perfil isolado e identificar a revisão exata do código. Cobrir a apresentação desktop e a apresentação empilhada com leitor de tela ativo; conferir também o menu que aparece em largura estreita. Registrar o alcance real da configuração: viewport emulado não equivale à avaliação de tecnologia assistiva de um telefone.

O usuário não estabeleceu uma combinação obrigatória de leitor/sistema. O avaliador deve registrar a combinação efetivamente utilizada, suas versões e eventuais configurações não avaliadas. A identificação do avaliador será preenchida na execução, sem atribuição presumida.

## Registro obrigatório

| Campo | Conteúdo exigido |
| --- | --- |
| Data e responsável | data/hora e pessoa que executou a avaliação |
| Revisão | commit e alterações locais relevantes, ou identificação equivalente do código avaliado |
| Ambiente | SO/versão, navegador/versão, leitor/versão e configurações relevantes |
| Apresentação | dispositivo, viewport, zoom e modo de navegação |
| Cenário | ID da matriz abaixo, dados usados e passos realmente executados |
| Observado | comportamento/anúncio percebido, incluindo falhas; não preencher apenas com “igual ao esperado” |
| Resultado | pendente, aprovado ou reprovado |
| Achados e reteste | reprodução, impacto, correção/revisão e resultado do reteste quando aplicável |
| Limites | cenários/configurações não avaliados e motivo |

O registro de execução deverá ser salvo em `validation/manual-accessibility.md`, com links relativos para evidências. Este contrato não serve como evidência de execução.

## Cenários obrigatórios

| ID | Fluxo e preparação | Resultado esperado |
| --- | --- | --- |
| M01 | Percorrer página por landmarks/títulos e Tab/Shift+Tab; usar “Ir para o conteúdo” | Regiões identificáveis, ordem lógica, foco visível e conteúdo alcançável |
| M02 | Consultar quatro situações em desktop e empilhadas em 320/390 px, incluindo título longo | Título, período, situação e ações reconhecíveis; dados ligados aos respectivos cabeçalhos/ciclo; sem perda de valores ou rolagem horizontal no celular |
| M03 | Selecionar status, consultar resultado e filtro sem correspondência | Nome/valor do filtro compreensíveis; seleção mantida e resultado/estado vazio identificável |
| M04 | Cadastrar ciclo válido; tentar campos inválidos e corrigir; recarregar | Labels/instruções/obrigatoriedade percebidos, erros localizáveis, sucesso anunciado e rascunho persistente |
| M05 | Executar as quatro transições permitidas em dados separados e tentar segundo ACTIVE | Ações identificam o ciclo; resultado/impedimento percebido; foco preservado ou levado ao destino relacionado; estado final sem ação inválida |
| M06 | Primeiro uso, loading, falha de leitura/gravação e feedback de sucesso/erro | Condições distinguíveis; informação dinâmica percebida e recuperação compreensível; valores mantidos quando aplicável |
| M07 | Abrir menu móvel; percorrer em ambas as direções; fechar por Escape/botão/destino; redimensionar | Diálogo nomeado, foco interno, fundo indisponível, fechamento correto; retorno ao acionador ou foco na seção ao navegar; resize não bloqueia conteúdo |

Para M02, registrar separadamente o resultado desktop e o empilhado. Para M06, estados breves ou falhas precisam de fixture controlada que use o mesmo componente e contrato de repositório. Fixture é suporte de teste; automação ou screenshot do estado não substitui a leitura manual real. Cenário não reproduzido permanece pendente até ser preparado e executado.

## Regra de aceitação

1. Testes automáticos relevantes e verificação por teclado têm evidência válida para o código avaliado.
2. Todos os cenários M01–M07 foram executados com leitor de tela e têm resultado aprovado, com cobertura e configuração registradas.
3. Falhas aplicáveis de acessibilidade, especialmente impedimentos de execução/compreensão de ações essenciais, foram corrigidas e retestadas. Nenhum cenário reprovado ou pendente pode ser convertido em aprovação por ausência de ferramenta/dispositivo.
4. Falhas de ambiente são registradas como pendência de execução, sem presumir falha do produto ou sucesso do cenário.
5. Mudanças posteriores que afetem semântica, foco, campos ou mensagens exigem reteste dos cenários correspondentes.

Os resultados anteriores de axe/teclado continuam evidência automática histórica. A aceitação global permanece pendente até este contrato ser satisfeito. O roteiro não constitui certificação universal de conformidade nem aprovação de baseline visual.
