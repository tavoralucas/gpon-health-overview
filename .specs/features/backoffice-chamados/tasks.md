# Tasks — Backoffice de Chamados

> **Feature issue:** https://github.com/tavoralucas/gpon-health-overview/issues/2
> **Branch:** `backoffice-chamados` (base: `main` @ `11e8fb6`)

---

## Phase 1 — Fundação (infraestrutura, auth, layout)

### T-001 — Migration: criar tabelas `profiles`, `tickets`, `ticket_followups`, `ticket_attachments`
- **Depends on:** —
- **Files:** `supabase/migrations/YYYYMMDDHHMMSS_backoffice_chamados.sql`
- **AC covered:** AC-04, AC-05, AC-06, AC-07, AC-09, AC-13, AC-17, AC-18, AC-19, AC-20, AC-21, AC-22, AC-23, AC-24, AC-25, AC-26, AC-27, AC-28, AC-29, AC-36
- **Verification:** SQL migration runs without error against local Supabase. `tickets.numero` unique constraint exists. All `check` constraints on enums are present. Sequence `seq_chamado_numero` exists.

### T-002 — Migration: RLS policies e Storage bucket
- **Depends on:** T-001
- **Files:** `supabase/migrations/YYYYMMDDHHMMSS_backoffice_chamados.sql` (append)
- **AC covered:** AC-04, AC-28
- **Verification:** RLS policies applied. Authenticated user with profile can read/write; unauthenticated gets empty set. Bucket `anexos-chamados` exists and is private.

### T-003 — Extend `Database` type in types.ts
- **Depends on:** T-001
- **Files:** `src/integrations/supabase/types.ts`
- **AC covered:** (infra)
- **Verification:** TypeScript compiles without errors. `Tables<'profiles'>`, `Tables<'tickets'>`, `Tables<'ticket_followups'>`, `Tables<'ticket_attachments'>` resolve to correct row types.

### T-004 — Create `RequireAuth` guard component
- **Depends on:** T-003
- **Files:** `src/components/backoffice/RequireAuth.tsx`
- **AC covered:** AC-01, AC-04
- **Verification:** Unauthenticated user is redirected to `/login?redirect=<original>`. Authenticated user without profile sees "Acesso não autorizado". Authenticated user with valid profile renders children.

### T-005 — Create `BackofficeLayout` with sidebar and topbar
- **Depends on:** T-004
- **Files:** `src/components/backoffice/BackofficeLayout.tsx`
- **AC covered:** AC-02 (dashboard navigation)
- **Verification:** Layout renders sidebar with navigation items (Dashboard, Chamados, Novo Chamado). Sidebar shows "Agentes" only for admin profiles. Topbar shows user name and logout button. Logout clears session and redirects to `/login`.

### T-006 — Create `LoginPage`
- **Depends on:** T-005
- **Files:** `src/pages/backoffice/LoginPage.tsx`
- **AC covered:** AC-01, AC-02, AC-03
- **Verification:** Login with valid credentials creates session and redirects to `/backoffice/dashboard` (or to `redirect` param). Login with invalid credentials shows generic error. Login page is accessible without auth.

### T-007 — Update `App.tsx` router with backoffice routes
- **Depends on:** T-006
- **Files:** `src/App.tsx`
- **AC covered:** AC-01, AC-02
- **Verification:** `/login` renders login page. `/backoffice/dashboard`, `/backoffice/chamados`, `/backoffice/chamados/novo`, `/backoffice/chamados/:id`, `/backoffice/agentes` all render within BackofficeLayout and RequireAuth. Unauthenticated access to any backoffice route redirects to `/login`.

---

## Phase 2 — Base de chamados (CRUD base)

### T-008 — Create priority matrix pure function
- **Depends on:** —
- **Files:** `src/lib/prioridade.ts`, `src/test/backoffice/prioridade.test.ts`
- **AC covered:** AC-26, AC-27
- **Verification:** All 9 matrix combinations return correct priority. Test file passes: `npx vitest run src/test/backoffice/prioridade.test.ts`.

### T-009 — Create tickets service hooks (TanStack Query)
- **Depends on:** T-003, T-008
- **Files:** `src/services/tickets.ts`, `src/test/backoffice/tickets.test.ts`
- **AC covered:** AC-13, AC-14, AC-15, AC-16, AC-17
- **Verification:** Hooks call correct Supabase endpoints. `useTickets` passes filter params. `useTicket` fetches by id. `useCreateTicket` inserts ticket with auto-calculated priority (via `calcularPrioridade`). `useUpdateTicket` updates allowed fields.

### T-010 — Create chamados list page with filters and pagination
- **Depends on:** T-009, T-007
- **Files:** `src/pages/backoffice/Chamados/List.tsx`
- **AC covered:** AC-13, AC-14, AC-15, AC-16
- **Verification:** List renders 20 items per page with pagination controls. Filters by status, priority, type, origin, and date range work. Search by text (code, title, description, requester name/email) works. "Limpar filtros" resets to unfiltered list. Sorting by priority, status, creation date works. Each row shows code, title, type, requester, priority (with badge), status, agent, origin, creation date.

### T-011 — Create chamado form page (manual creation)
- **Depends on:** T-009, T-008, T-007
- **Files:** `src/pages/backoffice/Chamados/Form.tsx`, `src/components/backoffice/ChamadoFormFields.tsx`
- **AC covered:** AC-09, AC-10, AC-11, AC-12
- **Verification:** Form with title, type, requester name/email, urgency, impact, description (min 20 chars). Type-specific fields appear dynamically (city code + MAC for problema_tecnico; user fields for novo_acesso_individual; file upload for novo_acesso_lote). Validation shows per-field errors. Priority is NOT editable (read-only display from matrix). Attachment dropzone accepts valid files and rejects invalid (format, size >10MB, >5 files). Successful creation redirects to new ticket detail.

### T-012 — Create chamado detail page (read-only)
- **Depends on:** T-009, T-007
- **Files:** `src/pages/backoffice/Chamados/Detail.tsx`
- **AC covered:** AC-17, AC-18
- **Verification:** Detail shows: code, title, type, status (badge), priority (badge), urgency, impact, origin, requester (name + email), description, assigned agent, created_at, updated_at. Network context (city code, MAC) when available. New user data when tipo is `novo_acesso_*`. Attachment list with download links. Timeline placeholder (no actions yet; just creation event).

---

## Phase 3 — Gestão (status workflow, timeline, attachments)

### T-013 — Create status workflow UI and mutation logic
- **Depends on:** T-012
- **Files:** `src/services/tickets.ts` (extend), `src/components/backoffice/StatusTransition.tsx`
- **AC covered:** AC-19, AC-20, AC-21, AC-22
- **Verification:** Status transition buttons show only allowed transitions (per R1). `novo` → `atribuido` changes status on assignment. `novo` → `resolvido` is blocked. Transition creates followup event type `status_change` in timeline. Invalid transitions are invisible in UI.

### T-014 — Create agent assignment UI
- **Depends on:** T-013
- **Files:** `src/services/agentes.ts`, `src/components/backoffice/AgentAssignment.tsx`
- **AC covered:** AC-21, AC-22
- **Verification:** Assignment dropdown lists active agents. Assigning in `novo` changes status to `atribuido`. Reassigning in `atendimento` preserves status. Timeline registers assignment/reattribution.

### T-015 — Create follow-up and internal note creation
- **Depends on:** T-012
- **Files:** `src/components/backoffice/FollowUpForm.tsx`, `src/services/tickets.ts` (extend)
- **AC covered:** AC-23, AC-24
- **Verification:** Follow-up form with toggle "Público" / "Nota interna". Publico creates `followup_publico` event. Interna creates `nota_interna` event. Both appear in timeline with author and timestamp.

### T-016 — Create timeline component
- **Depends on:** T-013, T-014, T-015
- **Files:** `src/components/backoffice/Timeline.tsx`
- **AC covered:** AC-18, AC-23, AC-24
- **Verification:** Timeline lists all events (creation, status_change, assignment, followup_publico, nota_interna, system) in chronological order. Each event shows icon, type label, author (or "Sistema"), timestamp. `nota_interna` is visually distinct.

### T-017 — Create attachment upload and display (requires bucket)
- **Depends on:** T-002, T-012
- **Files:** `src/components/backoffice/AttachmentDropzone.tsx`, `src/services/tickets.ts` (extend), `src/components/backoffice/AttachmentList.tsx`
- **AC covered:** AC-11, AC-12, AC-25
- **Verification:** Dropzone validates format (JPG, PNG, GIF, WEBP, PDF, CSV, XLS, XLSX), size (≤10MB), count (≤5 files total). Upload creates attachment record + storage file. List shows filename, size, download link. Timeline registers attachment event. Invalid files show error message.

---

## Phase 4 — Dashboard

### T-018 — Create dashboard KPIs and charts
- **Depends on:** T-009, T-007
- **Files:** `src/pages/backoffice/DashboardPage.tsx`, `src/components/backoffice/KpiCard.tsx`
- **AC covered:** AC-05, AC-06, AC-07, AC-08
- **Verification:** Dashboard shows: "Chamados abertos" count (novo + atribuido + atendimento + espera + reaberto). "Sem agente" count (open without assigned). Status breakdown cards (each status count). "Abertos por prioridade" counts. "Resolvidos (7d)" and "Resolvidos (30d)" counts. Mini Recharts charts render. All data from TanStack Query.

---

## Phase 5 — Anexos (consolidated)

> Most attachment work is in T-011 (form) and T-017 (detail). This phase covers bucket setup and any remaining edge cases.

### T-019 — Storage bucket RLS and signed URLs
- **Depends on:** T-002
- **Files:** `src/lib/storage.ts`, `src/services/tickets.ts` (extend with signed URL helper)
- **AC covered:** AC-25
- **Verification:** Files are stored in private bucket. Download uses signed URLs (or RLS-authenticated direct download). Non-authenticated requests to bucket are rejected.

---

## Phase 6 — Edge Function `criar-chamado` (n8n integration)

### T-020 — Create Edge Function `criar-chamado`
- **Depends on:** T-001, T-002
- **Files:** `supabase/functions/criar-chamado/index.ts`, `supabase/config.toml`
- **AC covered:** AC-36, AC-37, AC-38, AC-39
- **Verification:**
  - `curl` with valid secret + valid payload → 201 + `{ codigo, status, prioridade }`
  - `curl` with same `chave_idempotencia` → 200 + existing ticket data
  - `curl` without secret → 401
  - `curl` with invalid fields → 400
  - Ticket is created with status `novo`, origem `publico`, prioridade from matrix (media/media×local→media by default)
  - First followup event `system` is created for the ticket
  - `supabase functions serve` loads without error

### T-021 — Register `criar-chamado` in config.toml
- **Depends on:** T-020
- **Files:** `supabase/config.toml`
- **AC covered:** AC-37
- **Verification:** Config entry has `verify_jwt = false`. Deploy succeeds.

---

## Phase 7 — Edge Function `notificar-chamado` (email)

### T-022 — Create Edge Function `notificar-chamado`
- **Depends on:** T-001
- **Files:** `supabase/functions/notificar-chamado/index.ts`, `supabase/config.toml`
- **AC covered:** AC-32, AC-33, AC-34, AC-35
- **Verification:**
  - Function sends email via Resend for events `resolvido`, `fechado`, `reaberto`, `atribuido`.
  - Email contains code, title, resolution message (for resolvido), reason (for reaberto), link (for atribuido).
  - On Resend failure, followup `system` event is created with "falha ao enviar notificação".
  - Function returns success immediately (non-blocking from caller perspective).
  - `supabase functions serve` loads without error.

### T-023 — Create notification service hook (frontend)
- **Depends on:** T-022
- **Files:** `src/services/notificacao.ts`
- **AC covered:** AC-32, AC-33, AC-34, AC-35
- **Verification:** Call `useNotificarChamado` mutation triggers edge function after status change. Failure does not block UI (fire-and-forget). Timeline is refreshed to show notification attempt.

---

## Phase 8 — Polimento (i18n, README, tests)

### T-024 — Agent management page (admin only)
- **Depends on:** T-007, T-003
- **Files:** `src/pages/backoffice/Agentes/List.tsx`, `src/services/agentes.ts`
- **AC covered:** AC-28, AC-29, AC-30, AC-31
- **Verification:** Only admin users can access `/backoffice/agentes`. Agent users are redirected. List shows all profiles with name, email, role, status. Invite form creates profile with status `pending`. Role toggle changes role immediately. Disable toggle sets status to `disabled`. All changes are reflected in list without refresh.

### T-025 — Add `backoffice` i18n keys to pt-BR.json
- **Depends on:** T-007 (content depends on UI strings)
- **Files:** `src/locales/pt-BR.json`
- **AC covered:** (i18n)
- **Verification:** All backoffice UI strings are in `backoffice` namespace: sidebar labels, status labels, priority labels, KPI labels, form labels, action buttons, error messages, email template strings.

### T-026 — Add `backoffice` i18n stubs to en-US.json and es-ES.json
- **Depends on:** T-025
- **Files:** `src/locales/en-US.json`, `src/locales/es-ES.json`
- **AC covered:** (i18n)
- **Verification:** Both files have `backoffice` namespace keys mirroring pt-BR structure (English/Spanish stubs). Fallback to pt-BR works for missing translations.

### T-027 — Update README with n8n contract and setup instructions
- **Depends on:** T-020, T-022
- **Files:** `README.md`
- **AC covered:** AC-36, AC-37, AC-38, AC-39 (documentation)
- **Verification:** README documents: `criar-chamado` endpoint URL, auth header, payload schema, idempotency, response codes, default values for public submissions, env vars needed, first admin bootstrap SQL.

### T-028 — Integration tests for backoffice flows
- **Depends on:** T-007, T-010, T-011, T-012, T-013, T-014, T-015, T-016, T-017, T-018, T-019, T-024
- **Files:** `src/test/backoffice/`
- **AC covered:** AC-01 through AC-35 (comprehensive)
- **Verification:** `npx vitest run src/test/backoffice/` passes. Tests cover: auth guard behavior, login flow (mock), priority matrix (all 9 combos), ticket CRUD hooks, status transitions (allowed + forbidden), assignment logic, followup creation, KPI query shape, agent CRUD.

### T-029 — End-to-end: validate full status workflow from UI
- **Depends on:** T-007, T-010, T-011, T-012, T-013, T-014, T-015, T-016, T-017
- **Files:** (manual verification)
- **AC covered:** AC-19, AC-20, AC-21, AC-22, AC-23, AC-24, AC-25
- **Verification:** Manual flow: create ticket → assign → start service → add followup → add internal note → resolve → close → reopen → return to service. Each step verifies status, timeline events, and authorization. No invalid transitions are possible.

---

## Task dependency graph

```
T-001 ──► T-002 ──► T-003 ──► T-004 ──► T-005 ──► T-006 ──► T-007
                                  │
                                  └──────► T-008 ──► T-009 ──► T-010
                                                      │
                                                      ├──► T-011
                                                      └──► T-012 ──► T-013 ──► T-015
                                                                  │              │
                                                                  └──► T-014     │
                                                                                 └──► T-016
                                                      T-017 ◄── T-002
                                                      T-018 ◄── T-009, T-007
T-002 ──► T-019
T-001 ──► T-020 ──► T-021
T-001 ──► T-022 ──► T-023
T-007, T-003 ──► T-024
T-025 ──► T-026
T-020, T-022 ──► T-027
(all) ──► T-028
T-029 (manual)
```

---

*Tech lead: Time spent: 45min*
