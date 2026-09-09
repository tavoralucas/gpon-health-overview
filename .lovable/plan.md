# Ajustar formulário para ocupar 100% da tela sem scroll

## Objetivo
Fazer a página `/nova-solicitacao` ocupar a altura total da viewport em telas de computador, eliminando o scroll vertical atual através de um layout mais compacto.

## Alterações propostas

### 1. Layout principal sem scroll
- Em `src/components/AppLayout.tsx`, trocar `overflow-auto` por `overflow-hidden` no `<main>` para que a página não scrolla por padrão.
- Em `src/pages/NovaSolicitacao.tsx`:
  - Usar `h-screen` em vez de `min-h-screen`.
  - Reduzir o padding externo (`py-10 sm:py-16` para `py-4` ou `py-6`).
  - Fazer o container interno ocupar a altura total disponível com `h-full`.

### 2. Compactação do card
- Reduzir o padding do card (`p-6 sm:p-10` para `p-4 sm:p-6`).
- Reduzir a margem inferior do cabeçalho (`mb-8` para `mb-4` ou `mb-5`).
- Manter o título e subtítulo, mas com espaçamento mais enxuto.

### 3. Compactação do formulário
- Em `src/components/solicitacao/SolicitacaoForm.tsx`:
  - Reduzir o espaçamento entre campos (`space-y-6` para `space-y-3` ou `space-y-4`).
  - Reduzir a altura da textarea (`rows={6}` para `rows={3}` ou `rows={4}`).
  - Reduzir a altura dos inputs e do botão, se necessário.
  - Manter os campos lado a lado em telas maiores.

### 4. Comportamento responsivo
- Em telas de computador (a partir de `sm` ou `md`), o formulário deve caber sem scroll.
- Em telas muito pequenas (altura insuficiente), manter scroll como fallback para não quebrar a usabilidade.

### 5. Validação
- Verificar visualmente no preview que o formulário cabe na tela sem scroll em dimensões desktop comuns (ex.: 1366x768, 1920x1080).
- Confirmar que o envio, validação e tela de confirmação continuam funcionando.

## Arquivos envolvidos
- `src/components/AppLayout.tsx`
- `src/pages/NovaSolicitacao.tsx`
- `src/components/solicitacao/SolicitacaoForm.tsx`
