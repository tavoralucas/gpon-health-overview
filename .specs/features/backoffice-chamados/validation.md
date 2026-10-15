# Validation — Backoffice de Chamados

**PR:** #3 (`backoffice-chamados` → `main`, head `e305a0d`, base `11e8fb6`)
**Issue:** #2
**Verifier:** independent fresh-eyes agent (author ≠ verifier)
**Date:** 2026-10-15
**Diff:** 48 files, +6335/−2 (git diff main...backoffice-chamados)

---

## Verdict: **FAIL — Changes Required** ❌

Gates pass (tests + build), but 7 ACs fail outright, 16 are only partially satisfied,
and 2 blocking runtime defects were found by code inspection + mutation sensor:

1. **B1 — Ticket number double prefix (`CHM-CHM-000001`)** — runtime bug on BOTH creation paths.
   `next_chamado_numero()` returns text already prefixed (`'CHM-' || lpad(...)`,
   `supabase/migrations/20261015000001_backoffice_chamados_fix.sql:11`), and the callers
   prefix again: `src/services/tickets.ts:129` and `supabase/functions/criar-chamado/index.ts:103`.
   Breaks R8 / AC-09 / AC-36 / AC-15 searchability / email subjects.
2. **B2 — No server-side enforcement of the status workflow (AC-20) or profile-RLS (AC-04).**
   `validarTransicao` is imported only by tests (grep: no app-code usage);
   `useUpdateTicket` writes any status straight to Supabase, and RLS
   `tickets_update_authenticated` is `auth.role() = 'authenticated'`
   (`20261015000000_backoffice_chamados.sql:108-109`). A direct Supabase update can forge
   `novo → fechado`. The same policy shape (`auth.role() = 'authenticated'`, no profile
   existence check) lets an auth user **without a profile** read every ticket/profile via API
   (AC-04 "nenhum dado do backoffice é exposto (RLS)" unmet).

---

## Gates

| Gate | Result | Evidence |
|---|---|---|
| Test | ✅ | `npx vitest run src/test/backoffice/` → **6 files, 97/97 passed** (1.15s) |
| Build | ✅ | `npm run build` → vite build OK (warnings only: chunk >500kB, stale browserslist) |
| Secrets scan | ✅ | no hardcoded API keys/tokens in `src/`, `supabase/` |
| Public form contract | ✅ | no diff in `NovaSolicitacao.tsx`, `enviar-solicitacao/`, `solicitacao.ts` |

## Discrimination sensor (mutation testing, scratch worktree @ e305a0d)

5 behavior-level faults injected in a throwaway git worktree (discarded after; working tree untouched):

| # | Mutation | Result |
|---|---|---|
| M1 | `prioridade.ts` matrix cell `baixa/local: 'baixa'→'media'` | **KILLED** — `prioridade.test.ts` failed |
| M2 | `transitions.ts` removed `fechado → reaberto` | **KILLED** — `transitions.test.ts`, 3 tests failed |
| M3 | `tickets.ts` numero `padStart(6,'0')→padStart(3,'0')` | **SURVIVED** — no test covers the CHM-NNNNNN format (R8) |
| M4 | `tickets.ts` removed creation timeline insert (AC-09 side effect) | **SURVIVED** — no test asserts timeline events on create |
| M5 | `transitions.ts` same-status `return false→true` | **KILLED** — 3 tests failed |

**3 killed / 2 survived.** Survivors confirm the service-layer tests assert hook *shape*
(`toHaveBeenCalledWith("tickets")`), not behavior (payload contents, side effects).
Structural gap: the 3 edge functions (`criar-chamado`, `notificar-chamado`, `convidar-agente`)
have **zero** automated coverage — AC-36…AC-39 rest on unchecked manual `curl` steps (T-020/T-029).

## AC verification (evidence-or-zero)

Legend: ✅ met · ◐ partial · ❌ not met

| AC | Status | Evidence (file:line) | Notes |
|---|---|---|---|
| AC-01 | ✅ | `RequireAuth.tsx:66-69`; `LoginPage.tsx:38-39`; `auth.test.tsx:100-124` | redirect + `?redirect=` + back-nav, tested |
| AC-02 | ✅ | `LoginPage.tsx:26-39`; `App.tsx:35,47` | valid creds → `/backoffice/dashboard` |
| AC-03 | ✅ | `LoginPage.tsx:33-35` | generic "Credenciais inválidas", no field disclosure |
| AC-04 | ❌ | UI: `RequireAuth.tsx:71-82` + `auth.test.tsx:131-150` (✅) | **RLS gap:** policies check only `auth.role()='authenticated'` (`...000000.sql:88-123`); auth user without profile reads all tickets/profiles via API |
| AC-05 | ✅ | `DashboardPage.tsx:12-33` | 5 open statuses; `sem agente` = open + `atribuido_a IS NULL` |
| AC-06 | ✅ | `DashboardPage.tsx:35-49` | all 7 statuses counted |
| AC-07 | ✅ | `DashboardPage.tsx:51-66` | open × 4 priorities |
| AC-08 | ◐ | `DashboardPage.tsx:68-94` (Should) | uses `updated_at` proxy; `resolvido_em`/`fechado_em` never written (dead columns) |
| AC-09 | ◐ | `Form.tsx:71-90`; `tickets.ts:105-172` | status `novo`, origem `manual`, priority computed, timeline event ✅ — but **numero = `CHM-CHM-xxxxxx`** (B1) |
| AC-10 | ✅ | `schema.ts:17-35`; `chamado-schema.test.ts:20-138`; per-field `FormMessage` in `Form.tsx` | all R3 bounds tested |
| AC-11 | ❌ | `Form.tsx` (no dropzone at all) | creation form has **no attachment UI**; `anexos` in schema is dead; `useCreateTicket` has no attachment path |
| AC-12 | ◐ | `AttachmentDropzone.tsx:34-45` | format/size rejected w/ message in UI; **count limit (5) enforced nowhere**; no API/RLS/storage-level rejection (storage policies commented out, `...000000.sql:125-134`) |
| AC-13 | ◐ | `List.tsx:273-298, 246-263` | 20/page, newest first, all columns — but "Agente" column renders **raw UUID** (`List.tsx:260`) |
| AC-14 | ❌ | `List.tsx:118-213` | status/prioridade/tipo/origem + limpar ✅; **no período (creation-date-range) filter** — required by the AC |
| AC-15 | ✅ | `tickets.ts:69-73` | free text `ilike` over numero, titulo, descricao, solicitante nome+email |
| AC-16 | ❌ | `List.tsx` (no sort control) (Should) | no sort UI at all; no `crítica>alta>média>baixa` ordering defined |
| AC-17 | ◐ | `Detail.tsx:84-147`; `AttachmentList.tsx:60-71` | most fields + network context + signed-URL downloads; **"agente atribuído" not displayed**; novo_acesso data not persisted (no columns) so cannot display |
| AC-18 | ✅ | `Timeline.tsx:46-79`; `tickets.ts:282-297` | chronological asc, author or "Sistema", timestamp |
| AC-19 | ◐ | `StatusTransition.tsx:20-38`; `tickets.ts:213-222` | transition + timeline event ✅; event text "Status alterado para X" lacks "de" (spec: "novo → atendimento") — spec-precision gap |
| AC-20 | ❌ | UI: `StatusTransition.tsx:40-65` (✅) | **API clause unmet:** no server-side validation; RLS permits any status write by any authed user (B2). `validarTransicao` unused in app code |
| AC-21 | ✅ | `AgentAssignment.tsx:40-47`; `tickets.ts:224-238`; `notificar-chamado/index.ts:61-64` | novo→atribuido, timeline event, agent email w/ code+title+priority+link |
| AC-22 | ◐ | `AgentAssignment.tsx:31-47`; `tickets.ts:235` | status preserved, email to new agent ✅; timeline "Atribuído a X" lacks old agent ("antigo → novo") |
| AC-23 | ◐ | `FollowUpForm.tsx:22,31-34` | timeline ✅; "incluído como conteúdo destinado ao solicitante (na v1, via e-mails)" — emails carry no follow-up content |
| AC-24 | ✅ | `FollowUpForm.tsx:22`; `Timeline.tsx:62-64` | internal-only event, "Interno" badge; never in emails (emails contain no followup content) |
| AC-25 | ◐ | `tickets.ts:299-352`; `AttachmentDropzone.tsx` | upload + record + timeline event ✅; format/size UI rejection ✅; count limit unenforced |
| AC-26 | ✅ | `tickets.ts:121`; `schema.ts:35` (strict); `chamado-schema.test.ts:229-237` | computed at creation; no manual priority field |
| AC-27 | ❌ | `tickets.ts:197-198` | service recalculates only if both fields passed, but **no UI anywhere edits urgência/impacto** post-creation, and no timeline event is written for the change (spec requires both) |
| AC-28 | ◐ | UI: `App.tsx:51` + `RequireAdmin.tsx:48-49`; RLS insert/update admin-only (`...000000.sql:91-99`) | **`convidar-agente` edge function has no role/profile check** — any authenticated user (even profile-less) can invoke it and create auth users + profiles via service role |
| AC-29 | ❌ | `convidar-agente/index.ts:27-55` | pending profile ✅ — but **no invite email is sent**, no set-password link, no activation flow; invitee gets a random temp password they can't know and cannot log in. Activation exists only as manual admin toggle |
| AC-30 | ◐ | `agentes.ts:51-74`; `Agentes/List.tsx:58-64` | role change immediate ✅; **no audit log exists** (no table, no event written) — spec references artifact absent from design → route to PO/tech-lead |
| AC-31 | ◐ | `RequireAuth.tsx:71`; `Agentes/List.tsx:66-73` (Should) | disabled → "Acesso não autorizado" (session still created at auth layer); tickets preserved ✅; agent shown as raw UUID, not "desativado" |
| AC-32 | ◐ | `StatusTransition.tsx:30-32`; `notificar-chamado/index.ts:49-52` | email on resolvido w/ code+title ✅; "mensagem de resolução (quando houver)" has no capture mechanism (no UI field, no column) |
| AC-33 | ✅ | `notificar-chamado/index.ts:53-55` | code + title, pt-BR |
| AC-34 | ◐ | `notificar-chamado/index.ts:57-59` | code+title ✅; "motivo (quando houver)" has no capture mechanism |
| AC-35 | ✅ | `notificacao.ts:12-24`; `notificar-chamado/index.ts:102-113` | fire-and-forget; failure → timeline "Falha ao enviar notificação"; status commit independent |
| AC-36 | ◐ | `criar-chamado/index.ts:100-142` | novo/publico + título/desc/solicitante/cidade/mac + defaults media/local ✅ — but **`novo_acesso` parsed and discarded**, **`anexos` never attached**, `arquivo_lote` absent from contract; numero B1 bug |
| AC-37 | ✅ | `criar-chamado/index.ts:60-66`; `config.toml:6-7` | missing/invalid `x-api-key` → 401; `verify_jwt=false` |
| AC-38 | ◐ | `criar-chamado/index.ts:84-98`; `...000000.sql:37` | unique `chave_idempotencia` + 200 w/ existing data ✅ — but edge schema makes the key **optional** (`index.ts:33`) vs R7/README "obrigatório" (frontend schema `criar-chamado-payload.ts:27` requires it but is unused at runtime); key-less calls get no dedup protection |
| AC-39 | ✅ | no diff in public flow; `criar-chamado/index.ts:153-158` (500 → n8n retry) | n8n-side retry config is an external ops dependency (documented in README) |

**Totals: 16 ✅ · 16 ◐ · 7 ❌**

## Spec-precision gaps (route to product-owner / tech-lead)

1. **AC-19/AC-22 event text** — spec asks "novo → atendimento" / "agente antigo → novo"; implementation writes one-sided text. Decide: spec text or code text.
2. **AC-30 "log de auditoria de perfis"** — no audit concept in the design data model; the AC references a non-existent artifact.
3. **AC-08** — "entraram em resolvido nos últimos 7 dias" needs `resolvido_em` to be written on transition (column exists, never populated); current `updated_at` proxy drifts on post-resolution edits.
4. **AC-23** — v1 emails carry no follow-up content at all; decide whether "conteúdo destinado ao solicitante" applies in v1.
5. **AC-36/AC-17/R3 novo_acesso fields** — design data model has no columns (or JSON field) for `nome/login/email/cargo/area`; spec requires capture + display.
6. **AC-31** — "não consegue mais fazer login" vs "blocked after login" (session created, access denied).
7. **R7 `arquivo_lote`** — listed in spec payload table, absent from both edge schema and README.

## Issue checklist reconciliation (29 tasks)

**All 29 checkboxes are still unchecked on GitHub issue #2** — nobody has marked them;
the PR checklist is self-attested. Code-evidence status:

- ✅ done: T-001, T-003, T-004, T-005, T-006, T-007, T-008, T-013*, T-014, T-015, T-016, T-021, T-023, T-025, T-026, T-027 (*UI half only)
- ◐ partial: T-002 (bucket + storage policies commented out — manual step), T-009 (hooks untested at behavior level), T-010 (no period filter, no sort UI, agent UUID), T-011 (no attachments, no lote card, novo_usuario dropped), T-012 (no agent display, no novo-acesso data), T-017 (count limit), T-018 (no Recharts; 7d/30d proxy), T-019 (signed URLs OK, bucket/policies absent from migration), T-020 (B1 bug, optional idempotency key, novo_acesso/anexos dropped), T-022 (resolução/motivo missing, no caller role check), T-024 (invite/activation, audit log), T-028 (97 tests but shape-only service tests; edge functions untested)
- ❌ not done: T-029 (manual E2E — no evidence)

## Ranked gaps (fix tasks for implementer)

1. **B1** numero double prefix — fix one of the two prefixing sides (recommend: function returns the bare sequence; or callers stop re-prefixing). Affects AC-09/15/36 + R8.
2. **B2/AC-20** enforce R1 server-side — DB trigger or move status writes through an edge function; also add profile-existence checks to SELECT/UPDATE policies (AC-04).
3. **AC-29** invite flow — send invite email (Resend) + activation (set password / flip `pending→active`).
4. **AC-36/AC-17** persist `novo_acesso` (columns or JSONB) and attach `anexos`; display both in detail.
5. **AC-11** attachment dropzone on the creation form; **R4** count limit (5) enforcement (UI + API).
6. **AC-14** período de criação filter; **AC-16** sort UI incl. priority ordering.
7. **AC-27** edit urgência/impacto in detail + timeline event; **AC-32/34** capture mensagem de resolução / motivo.
8. **AC-28/AC-30** role check inside `convidar-agente`; profile audit log (spec decision needed).
9. Storage bucket + policies in a migration; list "Agente" by name (join profiles).
10. Issue #2 checkboxes + T-029 manual E2E evidence.

---

*Verifier time spent: ~1.5h. Working tree untouched (mutations run in discarded git worktree at `e305a0d`).*
