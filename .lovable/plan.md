# Etapa de tipo de solicitação + fluxo Novo Acesso

Adicionar uma etapa inicial em `/nova-solicitacao` onde o usuário escolhe entre **Novo acesso** e **Problema técnico**. A escolha define qual formulário aparece. O visual segue o padrão atual (fundo branco, card centralizado, shadcn/ui).

## Fluxo

```text
[Nova Solicitação]
      |
  Escolha do tipo
   /          \
Novo acesso   Problema técnico
   |               |
Form de usuário  Form atual (inalterado)
(individual ou
upload em lote)
```

## Etapa 1 — Seleção do tipo

- Tela inicial com dois cards clicáveis lado a lado (empilham no mobile): **Novo acesso** e **Problema técnico**, cada um com ícone Lucide e descrição curta.
- Após a escolha, o formulário correspondente aparece com animação de entrada; um link/botão "Voltar" permite trocar o tipo.

## Fluxo Problema técnico

- Exibe o formulário atual (`SolicitacaoForm`) sem nenhuma alteração de campos, validações ou envio.

## Fluxo Novo acesso

Duas abas no mesmo card: **Cadastro individual** e **Cadastro em lote**, com textos deixando claro que o formulário é para um único usuário e o upload para múltiplos usuários.

### Cadastro individual (todos obrigatórios, mensagens em PT-BR)

- Nome do solicitante
- Nome do novo usuário
- Login do novo usuário
- E-mail do novo usuário (validação de e-mail)
- Cargo/Papel
- Área

### Cadastro em lote

- Upload de arquivo `.csv` com validação client-side dos cabeçalhos obrigatórios, exatamente: `Login`, `Colaborador`, `Email`, `Cargo`, `Operação`.
- Se algum cabeçalho estiver ausente ou diferente, exibir mensagem indicando os ajustes necessários e bloquear o envio.
- Dropzone no mesmo estilo do de imagem, com nome/tamanho do arquivo e botão de remover.

## Envio ao webhook

- Mesmo endpoint (`https://n8n.beon.digital/webhook/nova-solicitacao`) via Edge Function existente.
- Novo campo `tipoSolicitacao` (`problema_tecnico` ou `novo_acesso`) em todos os envios.
- Individual: campos `nomeSolicitante`, `nomeUsuario`, `loginUsuario`, `emailUsuario`, `cargo`, `area`.
- Lote: campo `arquivo` (o CSV) + `nomeSolicitante` e `emailSolicitante` para identificação.
- Sucesso: tela de confirmação com resumo (mesmo padrão atual); erro: toast vermelho mantendo os dados.

## Detalhes técnicos

- `src/pages/NovaSolicitacao.tsx`: gerencia a etapa (seleção → formulário) com estado local.
- Novos componentes em `src/components/solicitacao/`: `TipoSolicitacaoSelector.tsx`, `NovoAcessoForm.tsx`, `ArquivoLoteDropzone.tsx` e schema Zod `novo-acesso-schema.ts`.
- `src/services/solicitacao.ts`: nova função `enviarNovoAcesso` (individual e lote) montando `FormData`; `enviarSolicitacao` passa a incluir `tipoSolicitacao`.
- Validação do CSV: leitura da primeira linha via `File.text()`, comparação exata dos 5 cabeçalhos (trim, case-sensitive conforme especificado).
- Testes Vitest: schema do novo acesso (obrigatórios, e-mail) e validação de cabeçalhos do CSV (correto, faltando coluna, cabeçalho divergente).
- Verificação no navegador: seleção dos dois fluxos, erros de obrigatoriedade, rejeição de CSV inválido e envio completo.
