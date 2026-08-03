# Nova Solicitação — tela única integrada ao n8n

Página independente em `/nova-solicitacao` (sem header/sidebar), fundo branco, card centralizado de até 700px em cinza muito claro, cantos arredondados, sombra suave e animação de entrada. Usa os mesmos componentes shadcn/ui e tokens do portal.

## Conteúdo da tela

- Título "Nova Solicitação" e subtítulo "Preencha os campos abaixo para enviar sua solicitação."
- Campos: Nome (obrigatório), Área (select obrigatório: Comercial, Produto, Tecnologia, Financeiro, Marketing, Operações, RH, Outro), Título (obrigatório), Descrição (textarea, mínimo 20 caracteres), Imagem (opcional).
- Upload de imagem com drag-and-drop, preview, botão de remover, exibição de nome, tipo e tamanho do arquivo. Aceita jpg, jpeg, png, gif e webp, limite de 10 MB, com aviso antes do envio quando o arquivo for grande (acima de 5 MB).
- Validação com mensagens abaixo de cada campo; envio bloqueado enquanto houver erro.
- Botão grande "Enviar Solicitação" que, ao enviar, fica desabilitado, mostra spinner e o texto "Enviando...".

## Comportamento

- Sucesso (HTTP 200): toast verde "Solicitação enviada com sucesso.", formulário limpo e preview removido.
- Erro: toast vermelho, mantendo todos os dados preenchidos.

## Detalhes técnicos

- `src/services/solicitacao.ts`: única camada de comunicação com o webhook. Monta `FormData` com os campos `nome`, `area`, `titulo`, `texto`, `imagem`, faz `POST` sem definir `Content-Type` manualmente e trata respostas não-200 como erro.
- URL do webhook via `import.meta.env.VITE_N8N_WEBHOOK_URL`, com fallback para `https://n8n.usto.re/webhook/solicitacao-lovable` num módulo de configuração (`src/config/webhook.ts`), já que o `.env` do projeto é gerenciado automaticamente.
- Formulário com React Hook Form + Zod (`zodResolver`), schema em arquivo próprio.
- Componentes: `src/pages/NovaSolicitacao.tsx` (tela), `src/components/solicitacao/SolicitacaoForm.tsx` (formulário) e `src/components/solicitacao/ImageDropzone.tsx` (upload com drag-and-drop).
- Rota adicionada em `src/App.tsx` fora do `AppLayout`.
- Toasts via sonner (já montado no App); ícones Lucide; animações com as utilidades existentes (`animate-fade-in`, `animate-scale-in`).

## Correções prévias (erros de build já existentes)

Antes da nova tela, corrigir erros de TypeScript que já estão no projeto e impedem o build:

- `src/pages/ClienteDetalhe.tsx`: `useTranslation` é importado mas `t` nunca é obtido — adicionar `const { t } = useTranslation();` no componente.
- `src/pages/cost-management/ConsolidadoFaturamentoCostManagement.tsx` e `ExportarRelatoriosCostManagement.tsx`: referências a imagens (`consolidadoFaturamentoTela`, `exportarRelatoriosTela`) sem import — restaurar os imports dos assets correspondentes ou remover as referências.
