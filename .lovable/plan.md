# Adaptar envios ao workflow do n8n

O workflow lê o campo `tipo` (não `tipoSolicitacao`) e sempre exige `nome`, `email`, `titulo` e `texto` (mín. 20 caracteres). Para `problema_tecnico` ainda exige Código da Cidade e MAC. Hoje o fluxo Novo acesso envia outros nomes de campo e seria rejeitado com HTTP 400.

## Mudanças no app

1. **Campo de tipo**: enviar `tipo` (`problema_tecnico` / `novo_acesso`) em todos os envios, mantendo `tipoSolicitacao` por compatibilidade.
2. **Novo acesso individual**: adicionar o campo obrigatório **E-mail do solicitante** (o workflow exige e-mail de quem pede). Envio mapeado:
   - `nome` = Nome do solicitante, `email` = E-mail do solicitante
   - `titulo` = "Novo acesso - {Nome do novo usuário}"
   - `texto` = bloco com Nome, Login, E-mail, Cargo/Papel e Área do novo usuário
   - campos originais (`nomeUsuario`, `loginUsuario`, etc.) continuam sendo enviados.
3. **Novo acesso em lote**: `nome`/`email` do solicitante, `titulo` = "Novo acesso em lote - {nome do arquivo}", `texto` = resumo com nome do arquivo e quantidade de usuários (linhas) da planilha; arquivo continua em `arquivo` (não em `imagem`, pois o Telegram enviaria como foto e falharia).
4. **Erros do n8n**: quando o webhook responde 400, mostrar no toast as mensagens de `validacao.erros` em vez de "HTTP 400".
5. Testes: mapeamento do payload de Novo acesso (individual e lote) e novo campo obrigatório.

## Ajustes necessários no n8n (fora do app)

- **Código da Cidade e MAC**: o nó "Normalizar e Validar" ainda os exige em `problema_tecnico`; como no app eles são opcionais, trocar para validar só quando preenchidos.
- **Thread do Novo acesso**: está `99999` (placeholder) — trocar pelo ID real do tópico no Telegram.
- **Arquivo do lote**: o workflow só trata `imagem`. Para o arquivo chegar ao Telegram, adicionar um "Tem arquivo?" + nó Telegram "Send Document" com binário `arquivo`. Eu passo o trecho exato para colar.

## Detalhes técnicos

- `src/services/solicitacao.ts`: `enviarSolicitacao` e `enviarNovoAcesso` adicionam `tipo`, `nome`, `email`, `titulo`, `texto`; `invocar` extrai `details` da Edge Function e formata `validacao.erros`.
- `src/components/solicitacao/novo-acesso-schema.ts`: `emailSolicitante` em `novoAcessoSchema`.
- `NovoAcessoForm.tsx`: novo input e contagem de linhas do arquivo para o resumo.
- Edge Function inalterada (já repassa o multipart e o corpo de erro).
