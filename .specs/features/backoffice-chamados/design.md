# Technical spec: Backoffice de Chamados (gestão de chamados inspirada no GLPI)

## Technical goal
Add a fully authenticated backoffice section to GPON Health Overview for ticket management (CRUD, status workflow, priority matrix, assignment, timeline, attachments) with two Supabase Edge Functions for n8n integration (`criar-chamado`) and email notifications (`notificar-chamado`). The existing public form (`/nova-solicitacao`) is untouched; public submissions continue to flow through n8n, which now invokes `criar-chamado` to create a ticket automatically.

## Affected components

| Module | Nature of change |
|---|---|
| `src/App.tsx` | Add routes: `/login`, `/backoffice/*` wrapped in `RequireAuth` |
| `src/integrations/supabase/types.ts` | Extend `Database` type with `profiles`, `tickets`, `ticket_followups`, `ticket_attachments` tables |
| `src/lib/prioridade.ts` | **New** — pure priority-matrix function (urgency × impact → priority) |
| `src/components/backoffice/RequireAuth.tsx` | **New** — auth guard component |
| `src/components/backoffice/BackofficeLayout.tsx` | **New** — sidebar + topbar layout |
| `src/pages/backoffice/LoginPage.tsx` | **New** — email + password login |
| `src/pages/backoffice/DashboardPage.tsx` | **New** — KPI cards + Recharts |
| `src/pages/backoffice/Chamados/List.tsx` | **New** — filtered list + pagination |
| `src/pages/backoffice/Chamados/Detail.tsx` | **New** — ticket detail + timeline + actions |
| `src/pages/backoffice/Chamados/Form.tsx` | **New** — manual creation form (reuses Zod + react-hook-form pattern) |
| `src/pages/backoffice/Agentes/List.tsx` | **New** — admin-only agent management |
| `src/services/tickets.ts` | **New** — TanStack Query hooks for tickets |
| `src/services/notificacao.ts` | **New** — trigger notification edge function |
| `src/services/agentes.ts` | **New** — TanStack Query hooks for profiles |
| `src/locales/pt-BR.json` | Add `backoffice` namespace keys |
| `src/locales/en-US.json` | Add `backoffice` namespace keys (stubs) |
| `src/locales/es-ES.json` | Add `backoffice` namespace keys (stubs) |
| `supabase/functions/criar-chamado/index.ts` | **New** Edge Function — n8n integration endpoint |
| `supabase/functions/notificar-chamado/index.ts` | **New** Edge Function — Resend transactional email |
| `supabase/config.toml` | Register `criar-chamado` with `verify_jwt = false`; `notificar-chamado` uses default `verify_jwt = true` (client-side JWT) |
| `README.md` | Document n8n contract for `criar-chamado` |
| Supabase DB (via migration) | Create tables `profiles`, `tickets`, `ticket_followups`, `ticket_attachments`, storage bucket `anexos-chamados`, RLS policies |
| `src/test/backoffice/` | **New** test directory — priority-matrix, auth guard, services |

## Data model / contracts

### SQL tables

#### `profiles`
```sql
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  name          text not null,
  email         text not null,
  role          text not null default 'agente' check (role in ('agente', 'admin')),
  status        text not null default 'pending' check (status in ('pending', 'active', 'disabled')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-create profile on first login from auth.users trigger is NOT used;
-- profiles are created exclusively by admin invitation (AC-29).
```

#### `tickets`
```sql
create table public.tickets (
  id                uuid primary key default gen_random_uuid(),
  numero            text not null unique,  -- CHM-000001
  titulo            text not null,
  descricao         text not null,
  tipo              text not null check (tipo in ('problema_tecnico', 'novo_acesso_individual', 'novo_acesso_lote')),
  origem            text not null check (origem in ('publico', 'manual')),
  solicitante_nome  text not null,
  solicitante_email text not null,
  codigo_cidade     text,
  endereco_mac      text,
  urgencia          text not null check (urgencia in ('baixa', 'media', 'alta')),
  impacto           text not null check (impacto in ('local', 'setor', 'massa')),
  prioridade        text not null check (prioridade in ('baixa', 'media', 'alta', 'critica')),
  status            text not null default 'novo' check (status in ('novo','atribuido','atendimento','espera','resolvido','fechado','reaberto')),
  atribuido_a       uuid references public.profiles(id),
  criado_por        uuid references public.profiles(id),
  resolvido_em      timestamptz,
  fechado_em        timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Index for listing queries
create index idx_tickets_status on public.tickets(status);
create index idx_tickets_prioridade on public.tickets(prioridade);
create index idx_tickets_atribuido_a on public.tickets(atribuido_a);
create index idx_tickets_created_at on public.tickets(created_at desc);
```

#### `ticket_followups`
```sql
create table public.ticket_followups (
  id          uuid primary key default gen_random_uuid(),
  ticket_id   uuid not null references public.tickets(id) on delete cascade,
  tipo        text not null check (tipo in ('followup_publico', 'nota_interna', 'status_change', 'assignment', 'system')),
  conteudo    text not null,
  autor       uuid references public.profiles(id),
  created_at  timestamptz not null default now()
);

create index idx_ticket_followups_ticket on public.ticket_followups(ticket_id, created_at);
```

#### `ticket_attachments`
```sql
create table public.ticket_attachments (
  id            uuid primary key default gen_random_uuid(),
  ticket_id     uuid not null references public.tickets(id) on delete cascade,
  storage_path  text not null,
  nome_arquivo  text not null,
  tamanho_bytes integer not null,
  content_type  text not null,
  uploaded_by   uuid references public.profiles(id),
  created_at    timestamptz not null default now()
);

create index idx_ticket_attachments_ticket on public.ticket_attachments(ticket_id);
```

#### Auto-generated sequence for `numero`
A Postgres sequence `seq_chamado_numero` provides the sequential integer; the `numero` column stores `'CHM-' || lpad(nextval('seq_chamado_numero')::text, 6, '0')`.

#### Storage bucket
- Name: `anexos-chamados`
- Public: `false` (private)
- RLS: authenticated users (profiles with role `agente` or `admin`) can read and write

### RLS policies

```sql
-- Profiles: all authenticated can read; only admin can insert/update
create policy "profiles_select_authenticated" on public.profiles
  for select using (auth.role() = 'authenticated');
create policy "profiles_insert_admin" on public.profiles
  for insert with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "profiles_update_admin" on public.profiles
  for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Tickets: authenticated can read all; authenticated can insert; authenticated can update
create policy "tickets_select_authenticated" on public.tickets
  for select using (auth.role() = 'authenticated');
create policy "tickets_insert_authenticated" on public.tickets
  for insert with check (auth.role() = 'authenticated');
create policy "tickets_update_authenticated" on public.tickets
  for update using (auth.role() = 'authenticated');

-- Followups: authenticated can read all; authenticated can insert; no update/delete (immutable timeline)
create policy "followups_select_authenticated" on public.ticket_followups
  for select using (auth.role() = 'authenticated');
create policy "followups_insert_authenticated" on public.ticket_followups
  for insert with check (auth.role() = 'authenticated');

-- Attachments: authenticated can read all; authenticated can insert; no update/delete
create policy "attachments_select_authenticated" on public.ticket_attachments
  for select using (auth.role() = 'authenticated');
create policy "attachments_insert_authenticated" on public.ticket_attachments
  for insert with check (auth.role() = 'authenticated');
```

### Status workflow (R1)

| From | To | Trigger |
|---|---|---|
| `novo` | `atribuido` | Assignment |
| `novo` | `atendimento` | Agent starts work directly |
| `atribuido` | `atendimento` | Start service |
| `atendimento` | `espera` | Waiting for client/third-party |
| `atendimento` | `resolvido` | Resolved → email to requester |
| `espera` | `atendimento` | Resume service |
| `espera` | `resolvido` | Resolved from wait → email |
| `resolvido` | `fechado` | Closed → email to requester |
| `resolvido` | `reaberto` | Reopened → email to requester |
| `fechado` | `reaberto` | Reopened → email to requester |
| `reaberto` | `atendimento` | Must return to service before resolving again |

Assignment/reassignment does NOT change status except `novo` → `atribuido` on first assignment.

### Priority matrix function (R2)

```typescript
// src/lib/prioridade.ts
type Urgencia = 'baixa' | 'media' | 'alta';
type Impacto = 'local' | 'setor' | 'massa';
type Prioridade = 'baixa' | 'media' | 'alta' | 'critica';

const MATRIZ: Record<Urgencia, Record<Impacto, Prioridade>> = {
  baixa: { local: 'baixa', setor: 'media', massa: 'media' },
  media: { local: 'media', setor: 'alta', massa: 'alta' },
  alta:  { local: 'alta', setor: 'critica', massa: 'critica' },
};

export function calcularPrioridade(urgencia: Urgencia, impacto: Impacto): Prioridade {
  return MATRIZ[urgencia][impacto];
}
```

### Edge Function: `criar-chamado`

- **Auth**: shared secret via env var `CRIAR_CHAMADO_SECRET`, passed as header `x-api-key` (or `Authorization: Bearer <secret>`)
- **verify_jwt**: `false`
- **Idempotency**: `chave_idempotencia` in body (UUID string); if same key exists (tickets table has a unique constraint on a hash or dedicated `chave_idempotencia` column), return existing ticket with 200
- **Payload** (JSON):

| Field | Type | Required | Notes |
|---|---|---|---|
| `tipo` | string | Yes | `problema_tecnico`, `novo_acesso_individual`, `novo_acesso_lote` |
| `solicitante.nome` | string | Yes | 1–100 |
| `solicitante.email` | string | Yes | Valid email, max 255 |
| `titulo` | string | Yes | 1–150 |
| `descricao` | string | Yes | 20–5000 |
| `cidade` | string | No | Numeric, max 3 digits |
| `mac` | string | No | MAC format |
| `novo_acesso` | object | No | `{ nome, login, email, cargo, area }` |
| `anexos` | string[] | No | References to uploaded files |
| `chave_idempotencia` | string | Yes | Unique submission UUID |

- **Default urgency/impact**: `media` / `local` → priority `media` (OPEN-5 decision).
- **Responses**: `201` (created), `200` (idempotent hit), `400` (validation), `401` (invalid/missing secret)

### Edge Function: `notificar-chamado`

- **Auth**: called from client-side (authenticated user) via `supabase.functions.invoke`, so `verify_jwt = true` (or relay through client). Alternative: callable from client with JWT verification, sends via Resend.
- Actually, since this is invoked from the frontend after a status change, we use `verify_jwt = true` so it runs as the authenticated user.
- **Payload**: `{ ticket_id, evento }` where `evento` is one of `resolvido`, `fechado`, `reaberto`, `atribuido`.
- The function reads ticket + requester data from DB, constructs email, sends via Resend JS SDK (Deno module), writes followup `system` event on success/failure.
- **Non-blocking**: the frontend fires and forgets; the status change is already committed.
- **Env vars**: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_FROM_NAME`, `APP_URL` (for ticket links).

### Frontend routes

```typescript
<Routes>
  {/* Public */}
  <Route element={<AppLayout />}>
    <Route path="/nova-solicitacao" element={<NovaSolicitacao />} />
  </Route>

  {/* Backoffice */}
  <Route path="/login" element={<LoginPage />} />
  <Route path="/backoffice" element={<RequireAuth><BackofficeLayout /></RequireAuth>}>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<DashboardPage />} />
    <Route path="chamados" element={<ChamadosListPage />} />
    <Route path="chamados/novo" element={<ChamadoFormPage />} />
    <Route path="chamados/:id" element={<ChamadoDetailPage />} />
    <Route path="agentes" element={<RequireAdmin><AgentesPage /></RequireAdmin>} />
  </Route>

  <Route path="*" element={<Navigate to="/nova-solicitacao" replace />} />
</Routes>
```

### Component responsibilities

| Component | Responsibility |
|---|---|
| `RequireAuth` | Checks Supabase session + profile record. If no session → redirect to `/login` with `?redirect=` param. If session but no profile or profile status ≠ `active` → show "Acesso não autorizado". Renders `<Outlet />` when OK. |
| `RequireAdmin` | Checks profile.role === 'admin'. If not → redirect to `/backoffice/dashboard` |
| `BackofficeLayout` | Sidebar (Dashboard, Chamados, Novo Chamado, Agentes if admin) + topbar (user name, logout). Uses `<Outlet />` for page content. |
| `LoginPage` | Email + password form, error display, redirect on success |
| `DashboardPage` | KPI cards via TanStack Query (sum counts), mini Recharts components |
| `ChamadosListPage` | TanStack Query with filters, search, pagination, sorting |
| `ChamadoDetailPage` | Ticket data panel + timeline (followups) + action buttons (status transition, assignment, follow-up, note, attachment) |
| `ChamadoFormPage` | Create form with Zod schema validation, attachment dropzone |
| `AgentesPage` | List agents, invite form, role toggle, disable toggle |

### Service hooks pattern

```typescript
// src/services/tickets.ts
export function useTickets(filters: TicketFilters) { /* useQuery */ }
export function useTicket(id: string) { /* useQuery */ }
export function useCreateTicket() { /* useMutation + invalidate */ }
export function useUpdateTicket() { /* useMutation + invalidate */ }
export function useCreateFollowup() { /* useMutation + invalidate ticket */ }
export function useUploadAttachment() { /* useMutation + invalidate */ }

// src/services/agentes.ts
export function useAgentes() { /* useQuery */ }
export function useInviteAgente() { /* useMutation */ }
export function useUpdateAgente() { /* useMutation */ }

// src/services/notificacao.ts
export function useNotificarChamado() { /* useMutation - fires edge function, no invalidation */ }
```

## Architecture decision

- **Chosen option:** Feature-first folder organization within `src/pages/backoffice/` and `src/services/`, reusing existing shadcn/ui components and patterns.
- **Alternatives:** Module-based (all backoffice files in flat folders) — rejected for better scalability as the backoffice grows.
- **Tradeoffs:**
  - Pros: Clean separation between public and backoffice code; easy to add new backoffice screens; existing patterns (Zod, react-hook-form, TanStack Query) are reused.
  - Cons: Slightly more imports; duplicated layout structure vs. one flat folder.
- **Linked AC(s):** All ACs across S-01 through S-09.

### Key decisions table

| Decision | Choice | Rationale |
|---|---|---|
| Auth guard | Component (`RequireAuth`) instead of route loader | Reuses existing React context; works with TanStack Query and Supabase client pattern |
| Priority matrix | Pure function in `src/lib/` | Testable, no dependencies, reused client-side and edge function |
| Idempotency | `chave_idempotencia` column with unique constraint | Simplest Supabase-compatible approach; no external cache needed |
| Attachment storage | Supabase Storage (bucket `anexos-chamados`) | Already available in project; RLS reuses same auth model |
| Email notifications | Edge Function `notificar-chamado` called from client | Keeps notification async without background workers; Resend Deno SDK |
| Profile bootstrap | Admin creates first profile via SQL console (OPEN-4) | No auto-signup flow; controlled invitation only |
| Sequence for ticket number | Postgres sequence `seq_chamado_numero` | Atomic, gapless-enough for `CHM-NNNNNN` format |

## Non-functional requirements

- **Performance:** Ticket list loads ≤2s (p99) for 10k tickets; pagination at 20 items/page; indexes on status, priority, created_at, assigned agent.
- **Security:**
  - RLS is the primary data access boundary (no service_role key on frontend).
  - `criar-chamado` uses shared secret, not JWT.
  - No secrets in frontend code (env vars only).
  - bucket `anexos-chamados` is private; signed URLs or RLS-based download.
- **Observability:**
  - Edge Functions log errors to Supabase logs.
  - Timeline records every status change, assignment, follow-up, notification attempt.
  - `notificar-chamado` writes followup `system` event on both success and failure.
- **Accessibility:** shadcn/ui components already provide a11y foundations; form inputs use labels, error messages via react-hook-form `FormMessage`.
- **i18n:** pt-BR as default; en-US and es-ES get backoffice keys (stubs initially, full translations later). Existing i18next setup reused.

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Duplicate tickets from n8n retry | Idempotency key (`chave_idempotencia`) with unique constraint (AC-38) |
| Notification email failure | Non-blocking fire-and-forget; failure logged in timeline; status change never rolled back (AC-35) |
| Storage bucket growth | 10 MB/file, 5 files/ticket limits (R4); retention review post-v1 |
| RLS misconfiguration exposes data | All backoffice tables have explicit RLS policies; no public access |
| First admin bootstrap | Manual SQL insert documented in README; single operation |
| Profile table drift from auth.users | `on delete cascade` handles auth user deletion; profiles are invitation-only |

## Contract summary: `criar-chamado` (for n8n integration)

Documented in README update (not duplicated here). Key points:
- Endpoint: `POST {{SUPABASE_URL}}/functions/v1/criar-chamado`
- Header: `x-api-key: <CRIAR_CHAMADO_SECRET>`
- Content-Type: `application/json`
- Idempotency: `chave_idempotencia` in body (UUID)
- Responses: 201 created, 200 duplicate, 400 validation, 401 unauthorized

---

*Tech lead: Time spent: 45min*
