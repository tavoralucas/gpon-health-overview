# Campos obrigatórios + dois novos campos na Nova Solicitação

## Objetivo

Garantir que todos os campos (exceto Imagem) sejam obrigatórios com mensagem de erro em português, e adicionar dois novos campos obrigatórios lado a lado — "Código da Cidade" e "Endereço MAC" — enviados também ao webhook do n8n.

## Estado atual (confirmado)

- Nome, E-mail, Título e Descrição já são obrigatórios no schema Zod, com mensagens em português ("Informe seu nome.", "Informe seu e-mail.", etc.), exibidas abaixo de cada campo.
- Imagem já é opcional.
- **Ajuste fino:** padronizar as mensagens para deixar a obrigatoriedade explícita (ex.: "O campo Nome ou Login é obrigatório.").

## Mudanças

### 1. Schema (`src/components/solicitacao/schema.ts`)
- Adicionar `codigoCidade`: string obrigatória, trim, máx. 50 caracteres — mensagem "O campo Código da Cidade é obrigatório."
- Adicionar `enderecoMac`: string obrigatória com validação de formato MAC (`AA:BB:CC:DD:EE:FF`, aceitando `:` ou `-`) — mensagens "O campo Endereço MAC é obrigatório." e "Informe um endereço MAC válido (ex.: AA:BB:CC:DD:EE:FF)."
- Revisar mensagens dos campos existentes para o padrão "O campo X é obrigatório." (mantendo as regras atuais de mínimo/máximo/e-mail válido).

### 2. Formulário (`src/components/solicitacao/SolicitacaoForm.tsx`)
- Nova linha em grade de 2 colunas (`grid grid-cols-1 sm:grid-cols-2 gap-6`), cada campo ocupando 50% (empilha no celular):
  - **Código da Cidade** — input com placeholder "Ex.: 5100".
  - **Endereço MAC** — input com placeholder "AA:BB:CC:DD:EE:FF".
- Erros exibidos abaixo de cada campo, como nos demais.
- Incluir os novos campos nos valores padrão e no envio.

### 3. Envio (`src/services/solicitacao.ts`)
- Adicionar `codigoCidade` e `enderecoMac` ao payload e ao `FormData` (nomes `codigoCidade` e `enderecoMac`) enviados ao webhook — a edge function já repassa o FormData integralmente, sem alteração necessária no backend.

### 4. Confirmação (`src/components/solicitacao/SolicitacaoConfirmacao.tsx`)
- Exibir Código da Cidade e Endereço MAC no resumo da solicitação enviada.

## Verificação

- Teste no navegador: enviar o formulário vazio deve mostrar mensagem de obrigatoriedade em todos os campos (menos imagem); preencher tudo e enviar confirma o recebimento no n8n.
