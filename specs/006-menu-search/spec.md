# Feature Specification: Busca nas opções do menu

**Feature Branch**: `main`

**Created**: 2026-11-08

**Status**: Implemented

**Input**: User description: "Adicione uma barra de pesquisa real-time no menu burguer um pouco abaixo do Logo que permite pesquisar opções disponíveis no Menu. Quando o menu burguer for colapsado para o modo minimo, a barra de pesquisa não deve ser exibida"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Encontrar uma opção pelo menu expandido (Priority: P1)

Como pessoa usuária, quero pesquisar as opções disponíveis no menu expandido para localizar rapidamente o destino desejado sem percorrer visualmente toda a navegação.

**Why this priority**: Encontrar e acessar uma opção é o valor central da funcionalidade.

**Independent Test**: Com o menu expandido, digitar parte do nome de uma opção e confirmar que somente as opções correspondentes permanecem visíveis e podem ser abertas.

**Acceptance Scenarios**:

1. **Given** o menu está expandido, **When** a pessoa digita parte do nome de uma opção, **Then** a lista é filtrada durante a digitação, sem exigir confirmação adicional.
2. **Given** uma busca que corresponde a uma opção, **When** a pessoa seleciona essa opção, **Then** ela navega para o mesmo destino e com o mesmo comportamento da opção sem busca.
3. **Given** o campo de busca contém apenas espaços ou está vazio, **When** a filtragem é aplicada, **Then** todas as opções disponíveis voltam a ser exibidas.

---

### User Story 2 - Entender quando não há resultado (Priority: P2)

Como pessoa usuária, quero receber um retorno claro quando não houver opção correspondente para que eu possa alterar ou limpar a busca.

**Why this priority**: Evita que uma lista vazia pareça ser erro ou perda de opções de navegação.

**Independent Test**: Pesquisar um termo sem correspondência e verificar a mensagem de ausência de resultados; limpar o campo deve restaurar a lista.

**Acceptance Scenarios**:

1. **Given** o menu está expandido, **When** a busca não encontra nenhuma opção, **Then** o menu informa que não há resultados para a pesquisa atual.
2. **Given** não há resultados, **When** a pessoa limpa a busca, **Then** todas as opções disponíveis são exibidas novamente.

---

### User Story 3 - Usar o menu mínimo sem busca visível (Priority: P2)

Como pessoa usuária, quero que o menu em modo mínimo continue compacto e não apresente uma barra de busca sem contexto.

**Why this priority**: Preserva a finalidade do modo mínimo e evita controles inacessíveis ou visualmente ambíguos.

**Independent Test**: Alternar o menu entre expandido e mínimo e verificar que o campo existe somente no estado expandido, sem impedir o uso das opções disponíveis no modo mínimo.

**Acceptance Scenarios**:

1. **Given** o menu está expandido, **When** a pessoa o recolhe para o modo mínimo, **Then** a barra de busca deixa de ser exibida e não permanece acessível por teclado.
2. **Given** o menu está no modo mínimo, **When** a pessoa o expande novamente, **Then** a barra de busca reaparece abaixo da marca e a navegação continua disponível.

### Edge Cases

- A busca deve ignorar diferenças de maiúsculas/minúsculas, acentos e espaços no início/fim do termo.
- Opções com rótulos semelhantes devem permanecer visíveis quando cada uma corresponder ao termo.
- Se uma seção do menu estiver fechada e contiver uma opção correspondente, a opção correspondente deve poder ser encontrada sem exigir que a pessoa adivinhe qual seção abrir.
- A busca não deve alterar a opção atualmente ativa nem o destino de links não correspondentes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE apresentar um campo de busca imediatamente abaixo da marca do menu quando o menu estiver expandido.
- **FR-002**: O campo DEVE ter rótulo acessível que descreva que a pesquisa filtra opções de navegação.
- **FR-003**: O sistema DEVE filtrar em tempo real as opções navegáveis disponíveis conforme o texto é digitado, sem botão de envio ou recarga da página.
- **FR-004**: A correspondência DEVE considerar o texto do rótulo da opção, ignorar maiúsculas/minúsculas, acentos e espaços excedentes nas extremidades.
- **FR-005**: Uma busca vazia ou composta somente por espaços DEVE exibir todas as opções disponíveis do menu.
- **FR-006**: Quando nenhuma opção corresponder, o sistema DEVE mostrar uma mensagem clara de ausência de resultados e não apresentar opções irrelevantes.
- **FR-007**: As opções filtradas DEVE preservar nome acessível, estado ativo e comportamento de navegação existentes.
- **FR-008**: Ao recolher o menu para o modo mínimo, o sistema NÃO DEVE exibir, focar nem expor a barra de busca a tecnologias assistivas.
- **FR-009**: Ao expandir novamente o menu, o sistema DEVE restaurar a disponibilidade da barra de busca sem prejudicar as opções de navegação.
- **FR-010**: O campo de busca e o estado sem resultados DEVEM ser utilizáveis por teclado, ter foco visível e comunicar seu propósito e resultado a tecnologias assistivas.
- **FR-011**: A funcionalidade DEVE pesquisar somente as opções já disponibilizadas no menu; não deve criar destinos, pesquisar conteúdo da página nem enviar o termo para fora da sessão de navegação.

### Key Entities

- **Consulta do menu**: Texto temporário fornecido pela pessoa usuária para restringir as opções visíveis; não é salvo como dado do perfil.
- **Opção de navegação**: Destino disponível no menu, com rótulo, estado ativo e ação de navegação preservados durante a filtragem.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em testes de navegação, 100% das opções que correspondem a um termo são exibidas após cada alteração do texto, e nenhuma opção não correspondente é exibida.
- **SC-002**: Em condições usuais de uso, a lista refletirá uma alteração da busca em até 200 ms após cada tecla.
- **SC-003**: Pessoas que usam apenas teclado conseguem focar a busca, identificar o estado sem resultados, limpar a consulta e abrir uma opção correspondente sem usar ponteiro.
- **SC-004**: Em todos os testes de alternância para o modo mínimo, a barra de busca não é visível nem alcançável pela ordem de foco.
- **SC-005**: Os fluxos atuais de abertura, recolhimento e navegação do menu continuam aprovados pelos testes de regressão.

## Assumptions

- A busca cobre os rótulos das opções que já fazem parte do menu no contexto aberto; não é uma busca global do produto.
- "Menu burguer" refere-se ao painel de navegação que contém a marca e pode alternar entre os estados expandido e mínimo; a experiência móvel deve manter a mesma capacidade de encontrar as opções quando esse painel estiver aberto.
- O termo de busca é efêmero: é limpo ao fechar o painel móvel ou ao sair/recarregar a página e não é incluído na URL.
- Não há requisitos de permissão novos: somente opções que já seriam visíveis à pessoa usuária podem participar do resultado.
