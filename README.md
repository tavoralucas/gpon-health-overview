# Central de Solicitações GPON

Aplicação web de atendimento digital para a equipe de operações GPON da BEON. Permite a solicitação de **novos acessos** (individual ou em lote) e o registro de **problemas técnicos** em um fluxo guiado, com envio direto para o workflow n8n.

## Visão geral

A aplicação possui uma única rota pública: `/nova-solicitacao` (todas as demais URLs redirecionam para ela). O colaborador escolhe o tipo de solicitação e preenche o formulário em um fluxo guiado de 4 etapas:

**Tipo → Seus dados → Detalhes → Revisão**

Os tipos de solicitação são:

1. **Novo acesso** — criação de usuário, individual ou em lote (planilha).
2. **Problema técnico** — registro de um problema com contexto de rede (código da cidade, MAC), descrição e imagem opcional.

## Como funciona o envio

```
Frontend (React + Zod)
   └─ FormData validado
        └─ Supabase Edge Function `enviar-solicitacao` (proxy de CORS)
             └─ Webhook n8n (POST com o FormData)
```

- [src/services/solicitacao.ts](src/services/solicitacao.ts) monta o `FormData` e invoca a Edge Function via `supabase.functions.invoke`.
- [supabase/functions/enviar-solicitacao/index.ts](supabase/functions/enviar-solicitacao/index.ts) (Deno) recebe o `FormData` e o repassa por `POST` ao webhook n8n. Em falha upstream, retorna HTTP 502 com a mensagem de erro do workflow, exibida ao usuário.
- A URL do webhook é definida em [src/config/webhook.ts](src/config/webhook.ts), com o padrão `https://n8n.beon.digital/webhook/nova-solicitacao`.

## Tipos de solicitação e validações

As validações ficam nos schemas Zod ([src/components/solicitacao/schema.ts](src/components/solicitacao/schema.ts) e [src/components/solicitacao/novo-acesso-schema.ts](src/components/solicitacao/novo-acesso-schema.ts)) e são aplicadas com React Hook Form + `@hookform/resolvers`.

### 1. Novo acesso

**Cadastro individual** — dados do solicitante + dados do novo usuário:

| Campo | Obrigatório | Regras |
| --- | --- | --- |
| Nome do solicitante | Sim | até 100 caracteres |
| E-mail do solicitante | Sim | e-mail válido, até 255 caracteres |
| Nome do novo usuário | Sim | até 100 caracteres |
| Login | Sim | até 60 caracteres |
| E-mail do novo usuário | Sim | e-mail válido, até 255 caracteres |
| Cargo/Papel | Sim | até 100 caracteres |
| Área | Sim | até 100 caracteres |

**Cadastro em lote** — dados do solicitante + arquivo:

- Arquivo **CSV ou Excel** com no máximo **5 MB**.
- Cabeçalhos obrigatórios na primeira linha: `Login, Colaborador, Email, Cargo, Operação`.

### 2. Problema técnico

| Campo | Obrigatório | Regras |
| --- | --- | --- |
| Nome ou Login | Sim | até 100 caracteres |
| E-mail | Sim | e-mail válido, até 255 caracteres |
| Código da cidade | Não | apenas números, no máximo 3 dígitos (ex.: `038`) |
| Endereço MAC | Não | formato `AA:BB:CC:DD:EE:FF` |
| Título | Sim | até 150 caracteres |
| Descrição | Sim | mínimo 20 e máximo 5000 caracteres |
| Imagem | Não | JPG, JPEG, PNG, GIF ou WEBP; no máximo 10 MB |

## Estrutura do projeto

Arquivos principais:

- [src/App.tsx](src/App.tsx) — roteamento: rota única `/nova-solicitacao` + redirecionamento.
- [src/pages/NovaSolicitacao.tsx](src/pages/NovaSolicitacao.tsx) — página principal: seletor de tipo → formulário → confirmação.
- [src/components/solicitacao/GuidedFlow.tsx](src/components/solicitacao/GuidedFlow.tsx) — primitivas do fluxo guiado: `FlowProgress`, `FlowActions`, `FlowHeading`, `ReviewFields`, `FlowFooter` e `ConnectivityArt` (arte de conexão em SVG com animação CSS e suporte a `prefers-reduced-motion`).
- [src/components/solicitacao/SolicitacaoForm.tsx](src/components/solicitacao/SolicitacaoForm.tsx) — formulário do problema técnico.
- [src/components/solicitacao/NovoAcessoForm.tsx](src/components/solicitacao/NovoAcessoForm.tsx) — formulário de novo acesso (individual e em lote).
- [src/components/solicitacao/schema.ts](src/components/solicitacao/schema.ts) — schema Zod do problema técnico.
- [src/components/solicitacao/novo-acesso-schema.ts](src/components/solicitacao/novo-acesso-schema.ts) — schema Zod do novo acesso + validação dos cabeçalhos do arquivo de lote.
- [src/services/solicitacao.ts](src/services/solicitacao.ts) — serviço de API que invoca a Edge Function.
- [src/config/webhook.ts](src/config/webhook.ts) — configuração da URL do webhook n8n.
- [supabase/functions/enviar-solicitacao/index.ts](supabase/functions/enviar-solicitacao/index.ts) — Edge Function (Deno) que faz o proxy de CORS para o n8n.
- [src/test/](src/test/) — testes (Vitest + Testing Library).

## Pré-requisitos

- Node.js 18+
- npm

## Como rodar localmente

```sh
npm install
npm run dev
```

O Vite exibirá a URL local no terminal.

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Sim | URL do projeto no Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Sim | Chave pública (publishable/anon) do Supabase |
| `VITE_SUPABASE_PROJECT_ID` | Não | ID do projeto Supabase (declarada no `.env`; não referenciada diretamente no código-fonte) |
| `VITE_N8N_WEBHOOK_URL` | Não | URL do webhook n8n usada no frontend. Padrão: `https://n8n.beon.digital/webhook/nova-solicitacao` |

A Edge Function `enviar-solicitacao` usa a variável de ambiente **no servidor Supabase**:

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `N8N_WEBHOOK_URL` | Não | URL do webhook n8n destino. Padrão: `https://n8n.beon.digital/webhook/nova-solicitacao` |

## Scripts

| Script | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento do Vite |
| `npm run build` | Build de produção |
| `npm run build:dev` | Build em modo de desenvolvimento |
| `npm run lint` | ESLint |
| `npm run preview` | Pré-visualização do build |
| `npm test` | Roda os testes (Vitest) |
| `npm run test:watch` | Vitest em modo watch |

## Testes

Os testes ficam em [src/test/](src/test/) e usam **Vitest** + **Testing Library** (ambiente jsdom). Incluem coberturas dos schemas de validação, do payload do novo acesso e das primitivas do fluxo guiado.

## Tecnologias

- [Vite](https://vitejs.dev/) 5 + React 18 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 3 + [shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (`@hookform/resolvers`)
- [React Router](https://reactrouter.com/) 6
- [TanStack Query](https://tanstack.com/query)
- [i18next](https://www.i18next.com/) + react-i18next — interface em **pt-BR** (padrão), com locales `en-US` e `es-ES` em [src/locales/](src/locales/)
- [Supabase](https://supabase.com/) SDK + Edge Functions (Deno)
- [Vitest](https://vitest.dev/) + Testing Library
- Lucide icons, Recharts, Sonner (toasts), date-fns, embla-carousel, next-themes

## Backoffice de Chamados

O backoffice oferece gestão de chamados (tickets) inspirada no GLPI: dashboard com KPIs, listagem com filtros, detalhe com timeline, workflow de status, atribuição a agentes, anexos e notificações por e-mail.

### Rotas do backoffice

| Rota | Descrição | Autenticação |
|---|---|---|
| `/login` | Login com e-mail + senha | Público |
| `/backoffice/dashboard` | Dashboard com KPIs | Requer autenticação + perfil ativo |
| `/backoffice/chamados` | Listagem de chamados com filtros | Requer autenticação |
| `/backoffice/chamados/novo` | Criação manual de chamado | Requer autenticação |
| `/backoffice/chamados/:id` | Detalhe do chamado | Requer autenticação |
| `/backoffice/agentes` | Gestão de agentes (admin) | Requer role `admin` |

### Contrato n8n → `criar-chamado`

A Edge Function `criar-chamado` (verify_jwt=false) é invocada pelo workflow n8n para criar chamados automaticamente a partir do formulário público.

**Endpoint:** `POST {{SUPABASE_URL}}/functions/v1/criar-chamado`

**Autenticação:** Header `x-api-key: <CRIAR_CHAMADO_SECRET>`

**Payload (JSON):**

| Campo | Obrigatório | Descrição |
|---|---|---|
| `tipo` | Sim | `problema_tecnico`, `novo_acesso_individual`, `novo_acesso_lote` |
| `solicitante.nome` | Sim | 1–100 caracteres |
| `solicitante.email` | Sim | E-mail válido, máx. 255 |
| `titulo` | Sim | 1–150 caracteres |
| `descricao` | Sim | 20–5000 caracteres |
| `cidade` | Não | Numérico, máx. 3 dígitos |
| `mac` | Não | Formato MAC (`AA:BB:CC:DD:EE:FF`) |
| `novo_acesso` | Não | Objeto com `{ nome, login, email, cargo, area }` |
| `anexos` | Não | Array de referências a arquivos |
| `chave_idempotencia` | Sim | UUID único da submissão (idempotência) |

**Respostas:**
- `201` — Chamado criado (`{ codigo, status, prioridade }`)
- `200` — Chave de idempotência já processada (retorna chamado existente)
- `400` — Campos obrigatórios faltando/ inválidos
- `401` — Segredo ausente ou inválido

**Valores padrão para chamados públicos:** urgência `media`, impacto `local` → prioridade `media`.

### Primeiro admin (bootstrap)

Conecte-se ao SQL Editor do Supabase e execute:

```sql
-- 1. Criar um auth user manualmente no Supabase Authentication
-- 2. Inserir o perfil admin:
insert into public.profiles (id, name, email, role, status)
values ('<auth-user-id>', 'Admin', '<admin-email>', 'admin', 'active');
```

### Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `CRIAR_CHAMADO_SECRET` | Sim | Segredo compartilhado para autenticação da Edge Function `criar-chamado` |
| `RESEND_API_KEY` | Sim | Chave de API do Resend para envio de e-mails |
| `RESEND_FROM_EMAIL` | Sim | E-mail remetente (domínio verificado no Resend) |
| `RESEND_FROM_NAME` | Sim | Nome do remetente (ex: "BEON · Suporte") |
| `APP_URL` | Sim | URL base da aplicação para links nos e-mails |
