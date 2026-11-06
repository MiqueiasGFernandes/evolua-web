# Phase 0 — Pesquisa e decisões

**Data**: 2026-11-06. Pesquisa de stack e validação delegada a dois agentes conforme a skill `speckit-plan`; inspeção e consolidação pela sessão principal. Nenhum agente alterou código.

## 1. Base existente e fronteira do refinamento

**Decision**: manter App Router e `CycleDashboard` como ponto de composição, domínio/porta/adaptador atuais e versões existentes. Inspeção atual confirmou o diagnóstico; nenhuma tela nova foi encontrada.

**Rationale**: lockfile registra Next 15.5.29, React/DOM 19.3.1 e TypeScript 5.9.3. Componentes atuais usam estado controlado e armazenamento local. Refino não requer Next 16, backend, migração de formulários ou novo sistema de estado.

**Alternatives considered**: reconstruir aplicação, importar dashboard pronto ou migrar para React Query/React Hook Form porque já são dependências. Rejeitadas por ampliar risco sem resolver um requisito adicional.

## 2. Tailwind e shadcn seletivos

**Decision**: planejar Tailwind 4, integração `@tailwindcss/postcss` e tokens CSS conectados por `@theme inline`. Introduzir somente primitivas úteis de shadcn, mantidas localmente em `apps/web/src/components/ui`. A versão exata das novas dependências e peers será fixada no lockfile no incremento técnico, sem atualizar Next/React em conjunto.

**Rationale**: atende à escolha explícita do usuário e preserva propriedade dos componentes. Não há Tailwind, PostCSS, aliases ou `components.json` na árvore atual. Deve-se preparar configuração local, aliases e paths corretos; no Tailwind 4 não copiar configuração v3 indiscriminadamente. A CLI shadcn não pode substituir CSS sem revisão do diff. [Tailwind com Next](https://tailwindcss.com/docs/installation/framework-guides/nextjs), [tokens](https://tailwindcss.com/docs/theme), [components.json](https://ui.shadcn.com/docs/components-json), [shadcn Tailwind 4](https://ui.shadcn.com/docs/tailwind-v4).

**Alternatives considered**: CSS puro exige menos setup, mas não atende a stack solicitada. Importar pacote inteiro, estilos de exemplos, Card/Sidebar/Chart e calendário customizado é desnecessário.

**Compatibility**: piso documentado do Tailwind 4: Safari 16.4+, Chrome 111+, Firefox 128+. Este plano adota esse piso; testes executam versões fixadas modernas. Legado obrigatório exigiria nova decisão, não upgrade silencioso. [Compatibilidade](https://tailwindcss.com/docs/upgrade-guide).

## 3. Cascata, Preflight e preservação de controles

**Decision**: migrar estilos globais e inline em incrementos, mantendo atributos, handlers e ordem DOM. Tokens primeiro; neutralização dos seletores globais conflitantes junto da adoção de primitives, verificando todos os controles após Preflight.

**Rationale**: regras atuais adicionam margin/padding a todos os campos/botões. A combinação com resets e defaults de shadcn poderia alterar layout/foco sem intenção. Inputs não podem herdar fonte menor que 16 pixels, ações precisam de 44 pixels mobile e foco deve substituir qualquer `outline-none`. [Preflight](https://tailwindcss.com/docs/preflight).

**Alternatives considered**: stylesheet adicional com overrides de especificidade crescente ou excluir resets sem revisar dependências. Preferir uma origem de estilos e migrar o pequeno conjunto existente conscientemente.

## 4. Direção e fontes

**Decision**: A — Caderno de percurso, selecionada pelo usuário após três prévias. Newsreader roman para títulos, Source Sans 3 para interface, com WOFF2 locais e apenas pesos 400/500 e 400/600 necessários. Conferir licença e caracteres ao obter assets; registrar origem/licença no repositório durante implementação.

**Rationale**: gesto editorial concentrado na tipografia, neutros frios e verde semântico, sem decoração de produtividade. `next/font/local` mantém assets sob controle e screenshots reproduzíveis; root layout permanece servidor. [Decisão visual](visual-directions/README.md), [API de fontes Next 15](https://github.com/vercel/next.js/blob/v15.5.28/docs/01-app/03-api-reference/02-components/font.mdx).

**Alternatives considered**: B tem menor custo de fonte e caráter mais técnico; C é mais acolhedora, mas aumenta altura antes da consulta. CDN de fontes em runtime foi rejeitada por variabilidade. `next/font/google` é alternativa válida, mas obtenção local reduz dependência do build em rede. Não baixar assets nesta fase.

## 5. Semântica e controles nativos

**Decision**: manter select e `input[type=date]` nativos, com estilo e composição acessível; traduzir somente rótulos de status e formatação de datas da lista.

**Rationale**: preservar teclado/datepicker existentes evita nova complexidade. Valor de date continua calendário `yyyy-mm-dd`; apresentação local não pode passar por conversão que desloque um dia via UTC/fuso. [Native Select](https://ui.shadcn.com/docs/components/native-select), [date input](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date).

**Alternatives considered**: DatePicker, Select customizado e novas etapas de formulário. Nenhum problema observado os justifica. Datas nativas podem variar entre browsers e popup do SO não é completamente verificável por screenshot da página.

## 6. Testes antes da mudança visual

**Decision**: estabelecer caracterização funcional E2E com adaptador real antes do primeiro incremento visual. Manter os quatro testes de domínio atuais. Instalar/configurar Playwright e axe apenas na implementação.

**Rationale**: não há suíte E2E encontrada. O roteiro temporário anterior é evidência, não proteção contínua. Fixture isolada e explícita de localStorage fornece dados reais de teste e persistência após recarga. Não resetar storage incondicionalmente em cada navegação. [Isolamento](https://playwright.dev/docs/browser-contexts), [mock de APIs do browser](https://playwright.dev/docs/mock-browser-apis).

**Alternatives considered**: declarar zero regressões E2E sem suíte, testar só snapshots ou substituir testes funcionais por mocks de sucesso. Rejeitadas.

## 7. Estados pendentes sem uma API fictícia

**Decision**: prever seam mínimo na porta existente: permitir repositório injetável no controlador com default atual, mantendo chamadas e comportamento de produção. Testes de componente usam Promise controlável; para screenshots Playwright de pending, empregar build exclusivamente de teste com proxy do mesmo adaptador na resolução de módulo. A mesma implementação visual é exercitada, sem nova rota, query string ou flag pública.

**Rationale**: operações do adaptador atual são síncronas internamente, embora retornem Promise. `page.route`/throttling não produz demora real. O proxy delega para o adaptador real após liberação, sem copiar regras. Justificativa de alteração: RF-UI-013/015/025 e verificação determinística de pending/foco.

**Alternatives considered**: busy-wait no storage, atraso artificial na aplicação, nova API ou test endpoint público. Rejeitadas por distorcer o produto. Se configuração do bundle de teste se tornar desproporcional, capturar pending com testes de componente Playwright, registrando claramente a camada; não criar infraestrutura pública.

## 8. Comparação visual e aprovação

**Decision**: Chromium/Linux como ambiente canônico, browser/container/Playwright com versões fixadas juntas; referências humanas, evidência atual e baselines são artefatos distintos. Aguardar estado, hidratação e fontes carregadas; usar `toHaveScreenshot` com configuração explícita. [Comparação visual](https://playwright.dev/docs/test-snapshots), [opções](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1).

**Rationale**: ambiente, fontes e native controls mudam pixels. Não escolher versões por cache da auditoria nem comparar sistemas operacionais diferentes com uma mesma baseline.

**Alternatives considered**: tolerância percentual global permissiva, ocultar foco, mascarar textos longos e atualizar tudo após falha. Rejeitadas. Detalhes em [visual-tests.md](visual-tests.md).

## 9. Acessibilidade e qualidade de projeto

**Decision**: axe por estado, teclado completo, leitor de tela, zoom real, espaçamento e mobile real. Zero violações automatizadas não equivale a AA. Validar também `incomplete` e critérios manuais. [Playwright a11y](https://playwright.dev/docs/accessibility-testing), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [avaliação WAI](https://www.w3.org/WAI/test-evaluate/).

**Rationale**: contraste da paleta calculado não cobre renderização, anúncios, foco ou teclado virtual. Semântica do componente pronto não garante a composição acessível.

**Alternatives considered**: selo AA por screenshot, emulação de DPR como zoom ou somente axe. Rejeitadas.

**Lacuna de qualidade atual**: script `lint` usa `next lint`, sem configuração/dependência ESLint identificada. Planejar comando ESLint compatível com Next 15 e configuração mínima antes do gate de qualidade, sem alegar lint aprovado agora. Não atualizar framework para resolver essa lacuna.

## Resultado da pesquisa

Não restam dúvidas técnicas sem decisão no plano. A escolha estética A foi recebida e registrada. Permanecem gates de entrega: aprovação de referências detalhadas, comparação renderizada e baselines, que têm momento e responsável definidos; não são ambiguidades técnicas abertas.
