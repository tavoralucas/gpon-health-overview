# Validações de E-mail, Código da Cidade e Máscara MAC + Dropzone maior

## Objetivo

Reforçar validações no formulário de Nova Solicitação: e-mail só com formato válido, Código da Cidade numérico com no máximo 3 dígitos, Endereço MAC com máscara automática, e área de upload de imagem maior.

## Estado atual (confirmado)

- E-mail já valida formato com Zod (`.email()`), mas o campo aceita digitar qualquer texto e o erro só aparece ao sair do campo (modo `onBlur`).
- `codigoCidade` aceita qualquer texto até 50 caracteres.
- `enderecoMac` valida o formato MAC via regex, mas sem máscara — o usuário digita tudo manualmente.
- O dropzone de imagem é compacto (`py-3`).

## Mudanças

### 1. Schema (`src/components/solicitacao/schema.ts`)
- **Código da Cidade**: regex `^\d{1,3}$` — somente números, 1 a 3 dígitos (aceita "038"). Mensagens: "O campo Código da Cidade é obrigatório." e "Informe apenas números (máx. 3 dígitos, ex.: 038)."

### 2. Formulário (`src/components/solicitacao/SolicitacaoForm.tsx`)
- **E-mail**: validação ao digitar (`mode: "onChange"` ou `reValidateMode`) para que o erro de formato apareça assim que o usuário digita um valor inválido; o envio já é bloqueado pelo Zod enquanto o e-mail não for válido (com `@` e formato correto).
- **Código da Cidade**: `inputMode="numeric"`, `maxLength={3}` e filtro que remove caracteres não numéricos ao digitar.
- **Endereço MAC**: máscara automática — ao digitar, caracteres não-hexadecimais são removidos, letras convertidas para maiúsculas e `:` inserido a cada 2 caracteres (ex.: digitar `aabbccddeeff` vira `AA:BB:CC:DD:EE:FF`), com `maxLength={17}`.
- **Espaçamento**: se o formulário ficar mais alto, compensar levemente para manter sem scroll.

### 3. Dropzone (`src/components/solicitacao/ImageDropzone.tsx`)
- Aumentar a área vazia do dropzone (mais padding vertical, ex. `py-6`, ícone e textos um pouco maiores) para ocupar melhor o espaço inferior do card.

## Verificação

- Teste no navegador: digitar e-mail sem `@` mostra erro; campo de cidade rejeita letras e limita a 3 dígitos; digitar MAC formata automaticamente; dropzone visivelmente maior; formulário segue sem scroll em 1366×768.
