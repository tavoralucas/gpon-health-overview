# Spec: Backoffice de Chamados (gestão de chamados inspirada no GLPI)

**Repositório:** `tavoralucas/gpon-health-overview`
**Branch:** `backoffice-chamados` (base: `main` @ `11e8fb6`)
**Feature issue:** publicação pendente — engineering-manager
**Aprovação de produto:** aprovada (escopo v1 confirmado pelo stakeholder); itens `[OPEN]` aguardam decisão
**Data:** 2026-10-15
**Idioma da interface:** pt-BR (padrão do projeto; `en-US`/`es-ES` seguem a convenção de i18next já existente)

---

## 1. Contexto de negócio

Hoje o projeto **GPON Health Overview** possui uma única rota pública (`/nova-solicitacao`), com fluxo guiado para dois tipos de solicitação:

1. **Problema técnico** — registro de problema com contexto de rede (código da cidade, MAC), descrição e imagem opcional.
2. **Novo acesso** — criação de usuário, individual ou em lote (planilha CSV/Excel).

As solicitações são enviadas via Supabase Edge Function (`enviar-solicitacao`) para um webhook do **n8n**. **Não existe nenhuma central de acompanhamento**: não há como saber quem está tratando, em que estado a solicitação está, nem quanto tempo leva para ser resolvida. O time de operações depende de e-mails e planilhas para gerenciar o backlog.

**Oportunidade:** criar uma seção de **backoffice** de gestão de chamados, inspirada no GLPI, que dê ao time de operações:

- visão consolidada do backlog (dashboard com KPIs);
- listagem e detalhamento de chamados com timeline completa;
- workflow de status e matriz de prioridade (urgência × impacto);
- atribuição a agentes e notificações por e-mail ao solicitante e ao agente.

Todo formulário público já enviado passa a gerar **automaticamente** um chamado no backoffice (via `criar-chamado`), eliminando o retrabalho de reregistro manual.

### Personas

| Persona | Descrição | Necessidades |
| --- | --- | --- |
| **Agente** (suporte/ops GPON) | Trata os chamados no dia a dia | Ver o backlog, atribuir a si, atualizar status, responder, anexar evidências |
| **Admin** (líder de suporte) | Gera o trabalho do time | Visão geral (KPIs), garantir atribuição, gerir perfis de agentes |
| **Solicitante** (colaborador/cliente externo) | Preenche o formulário público | Saber que o pedido foi registrado e ser avisado quando resolvido/reaberto/fechado |

### Objetivos

- 100% das solicitações do formulário público viram chamados rastreáveis (fim do retrabalho).
- Um único lugar para o time operar: criar, atribuir, tratar e encerrar chamados.
- Prioridade objetiva (matriz 3×3), sem "grito mais alto define a fila".
- Solicitante informado por e-mail nos momentos decisivos.

### Métricas de sucesso (KPIs)

| Métrica | Baseline | Meta |
| --- | --- | --- |
| Solicitações do formulário público registradas como chamado | 0% (sem registro central) | 100% |
| Chamados abertos sem agente após 24h de criação | sem medição (baseline no 1º mês) | ≤ 10% |
| Mediana de tempo de criação → resolvido | baseline no 1º mês | −25% em 3 meses |
| Taxa de entrega das notificações por e-mail | — | ≥ 99% |
| Chamados com prioridade inconsistente (manual) | — | 0% (prioridade sempre automática) |

---

## 2. Histórias e critérios de aceitação

Cada história tem uma chave estável (`S-01`…`S-09`). Os ACs são numerados sequencialmente no documento (`AC-01`…`AC-39`) e usam Given/When/Then.

### S-01 — Login e dashboard (Must)

**Como** usuário do backoffice (agente ou admin)
**Quero** fazer login e ver um dashboard com KPIs
**Para que** eu saiba, ao chegar, o quanto há para tratar e onde está o gargalo.

- **AC-01 — Acesso protegido do backoffice**
  - **Given** um navegador sem sessão autenticada
  - **When** acesso qualquer rota do backoffice (ex.: `/chamados`, `/chamados/:id`, `/dashboard`, `/agentes`)
  - **Then** sou redirecionado para `/login`
  - **And** após login com sucesso sou redirecionado de volta à rota original
- **AC-02 — Login com credenciais válidas**
  - **Given** um perfil cadastrado (role `agente` ou `admin`) com credenciais válidas
  - **When** envio e-mail e senha corretos em `/login`
  - **Then** a sessão é criada e sou levado ao dashboard (`/dashboard`)
- **AC-03 — Login com credenciais inválidas**
  - **Given** a página `/login`
  - **When** envio e-mail ou senha inválidos
  - **Then** exibo mensagem de erro genérica (sem revelar qual campo está incorreto)
  - **And** nenhuma sessão é criada
- **AC-04 — Usuário sem perfil é bloqueado (RLS)**
  - **Given** um usuário com conta de autenticação no Supabase **sem** registro na tabela `profiles`
  - **When** tento acessar qualquer rota do backoffice
  - **Then** o acesso é negado com mensagem de "acesso não autorizado"
  - **And** nenhum dado do backoffice é exposto (RLS)
- **AC-05 — KPIs de volume (abertos e sem agente)**
  - **Given** um usuário do backoffice autenticado
  - **When** o dashboard é carregado
  - **Then** o KPI "Chamados abertos" exibe a quantidade de chamados em status `novo`, `atribuido`, `atendimento`, `espera` ou `reaberto`
  - **And** o KPI "Sem agente" exibe a quantidade de chamados abertos sem agente atribuído
- **AC-06 — KPIs por status**
  - **Given** o dashboard carregado
  - **When** consulto os cards por status
  - **Then** cada status (`novo`, `atribuido`, `atendimento`, `espera`, `resolvido`, `fechado`, `reaberto`) exibe sua quantidade
  - **And** as quantidades somam o total de chamados do sistema
- **AC-07 — KPIs por prioridade**
  - **Given** o dashboard carregado
  - **When** consulto o card "Abertos por prioridade"
  - **Then** são exibidas as quantidades de chamados abertos por prioridade (`baixa`, `média`, `alta`, `crítica`)
- **AC-08 — KPIs de resolvidos no período (Should)**
  - **Given** o dashboard carregado
  - **When** consulto os KPIs de resolução
  - **Then** "Resolvidos (7d)" exibe o número de chamados que entraram em `resolvido` nos últimos 7 dias
  - **And** "Resolvidos (30d)" exibe o número para os últimos 30 dias

### S-02 — Criação manual de chamado (Must)

**Como** agente
**Quero** criar um chamado manualmente
**Para que** eu registre solicitações que chegam por telefone, presencialmente ou fora do formulário público.

- **AC-09 — Criação com campos obrigatórios**
  - **Given** um agente autenticado no formulário de criação
  - **When** preencho título, tipo, solicitante (nome + e-mail válido), urgência, impacto e descrição (mín. 20 caracteres) e salvo
  - **Then** o chamado é criado com status `novo`, origem `manual` e código sequencial
  - **And** a prioridade é calculada automaticamente pela matriz (regra R2)
  - **And** a timeline registra o evento de criação com autor e data/hora
- **AC-10 — Validação dos campos obrigatórios**
  - **Given** o formulário de criação
  - **When** envio o formulário faltando campo obrigatório (ex.: título vazio, e-mail do solicitante inválido, descrição < 20 caracteres)
  - **Then** exibio erro por campo na tela
  - **And** nenhum chamado é criado
- **AC-11 — Criação com anexo válido**
  - **Given** o formulário de criação
  - **When** adiciono arquivos dentro dos limites (formatos e tamanho da regra R4) e salvo
  - **Then** os arquivos ficam anexados ao chamado e visíveis no detalhe
  - **And** a timeline registra o anexo
- **AC-12 — Anexo inválido é rejeitado**
  - **Given** o formulário de criação (ou detalhe do chamado)
  - **When** adiciono arquivo com formato não permitido ou acima de 10 MB, ou excedo o limite de 5 anexos
  - **Then** exibio mensagem identificando o problema
  - **And** o arquivo não é anexado

### S-03 — Listagem de chamados (Must)

**Como** agente
**Quero** listar chamados com filtros, busca e ordenação
**Para que** eu localize rapidamente o que preciso tratar.

- **AC-13 — Listagem padrão com paginação**
  - **Given** um agente autenticado
  - **When** acesso `/chamados`
  - **Then** a listagem exibe os chamados ordenados por data de criação (mais recente primeiro)
  - **And** 20 itens por página com controles de paginação
  - **And** cada linha exibe: código, título, tipo, solicitante, prioridade, status, agente, origem e data de criação
- **AC-14 — Filtros combináveis**
  - **Given** a listagem de chamados
  - **When** aplico filtros por status, prioridade, tipo, origem (`público`/`manual`) e período de criação
  - **Then** apenas os chamados que atendem **todos** os filtros aplicados são exibidos
  - **And** o controle "limpar filtros" restaura a listagem completa
- **AC-15 — Busca por solicitante e texto livre**
  - **Given** a listagem de chamados
  - **When** filtro por solicitante (nome ou e-mail) ou uso a busca em texto livre
  - **Then** a busca em texto livre casa com código, título, descrição, nome do solicitante e e-mail do solicitante
  - **And** apenas os chamados correspondentes são exibidos
- **AC-16 — Ordenação (Should)**
  - **Given** a listagem de chamados
  - **When** mudo a ordenação para prioridade, status ou data de criação (asc/desc)
  - **Then** a listagem é reordenada
  - **And** para prioridade, a ordem é `crítica > alta > média > baixa`

### S-04 — Detalhe do chamado (Must)

**Como** agente
**Quero** ver o detalhe completo de um chamado
**Para que** eu tenha todo o contexto (dados do solicitante, rede, anexos e histórico) antes de agir.

- **AC-17 — Detalhe exibe todos os campos e contexto**
  - **Given** um chamado existente
  - **When** abro o detalhe (`/chamados/:id`)
  - **Then** são exibidos: código, título, tipo, status, prioridade, urgência, impacto, origem, solicitante (nome + e-mail), descrição, agente atribuído, criado em e atualizado em
  - **And** o contexto de rede (código da cidade, endereço MAC) quando capturado
  - **And** os dados do novo usuário quando o tipo for `novo_acesso` (nome, login, e-mail, cargo/papel, área)
  - **And** todos os anexos, com download
- **AC-18 — Timeline completa**
  - **Given** um chamado com eventos (criação, mudanças de status, atribuições, follow-ups, notas internas, anexos, notificações)
  - **When** abro o detalhe
  - **Then** a timeline lista todos os eventos em ordem cronológica com autor (ou "Sistema" para automáticos) e data/hora
  - **And** a timeline é o registro oficial do atendimento do chamado

### S-05 — Atualização do chamado: status, atribuição, follow-up e anexo (Must)

**Como** agente
**Quero** atualizar o chamado (status, responsável, follow-up, nota interna, anexo)
**Para que** o chamado avance no atendimento com histórico auditável.

- **AC-19 — Transição de status permitida**
  - **Given** um chamado em status `novo`
  - **When** mudo o status para `atendimento`
  - **Then** a mudança é aceita
  - **And** a timeline registra "novo → atendimento" com autor e data/hora
- **AC-20 — Transição de status proibida é bloqueada**
  - **Given** um chamado em status `novo`
  - **When** tento mudar o status para um destino não permitido (ex.: `fechado`), por UI ou por API
  - **Then** a UI só apresenta as transições permitidas pela regra R1
  - **And** a tentativa via API é rejeitada com erro e o status permanece inalterado
- **AC-21 — Atribuição inicial**
  - **Given** um chamado em status `novo` sem agente
  - **When** atribuo um agente
  - **Then** o status muda para `atribuido`
  - **And** a timeline registra a atribuição
  - **And** o agente atribuído recebe e-mail com código, título, prioridade e link para o chamado
- **AC-22 — Reatribuição preserva o status**
  - **Given** um chamado já atribuído em status `atendimento` (ou outro status aberto)
  - **When** mudo o agente atribuído
  - **Then** o status do chamado **não** muda
  - **And** a timeline registra a reatribuição (agente antigo → novo)
  - **And** o novo agente recebe o e-mail de atribuição
- **AC-23 — Follow-up público**
  - **Given** um chamado em qualquer status aberto
  - **When** adiciono um follow-up marcado como "público"
  - **Then** ele aparece na timeline visível para todos os usuários do backoffice
  - **And** ele é incluído como conteúdo destinado ao solicitante (na v1, via e-mails de notificação; em versão futura, portal do solicitante)
- **AC-24 — Nota interna**
  - **Given** um chamado aberto
  - **When** adiciono uma "nota interna"
  - **Then** ela aparece na timeline apenas para usuários do backoffice (agente/admin)
  - **And** nunca é incluída em nenhum e-mail enviado ao solicitante
- **AC-25 — Anexar arquivo ao chamado existente**
  - **Given** o detalhe de um chamado
  - **When** adiciono arquivo dentro dos limites (regra R4)
  - **Then** o arquivo é anexado e a timeline registra o evento
  - **And** arquivo fora dos limites é rejeitado com mensagem (reuso da regra R4)

### S-06 — Prioridade automática pela matriz 3×3 (Must)

**Como** agente
**Quero** que a prioridade seja calculada automaticamente de urgência × impacto
**Para que** a prioridade seja objetiva e consistente, sem julgamento individual.

- **AC-26 — Prioridade calculada na criação**
  - **Given** a criação de um chamado com urgência `alta` e impacto `setor`
  - **When** o chamado é criado
  - **Then** a prioridade é `alta`, conforme a matriz (regra R2)
  - **And** não existe campo para definir prioridade manualmente
- **AC-27 — Prioridade recalculada ao alterar urgência/impacto**
  - **Given** um chamado com urgência `baixa` e impacto `local` (prioridade `baixa`)
  - **When** mudo o impacto para `massa`
  - **Then** a prioridade passa a `média` imediatamente, conforme a matriz
  - **And** a timeline registra a alteração de urgência/impacto e o novo valor de prioridade

### S-07 — Gestão de perfis de agentes (Must)

**Como** admin
**Quero** gerenciar os perfis dos agentes (convidar, mudar role)
**Para que** eu controle quem acessa o backoffice e com quais permissões.

- **AC-28 — Acesso restrito ao admin**
  - **Given** um usuário com role `agente`
  - **When** tento acessar a gestão de perfis (`/agentes`) ou tentar criar/alterar perfis por API
  - **Then** o acesso é negado (UI indisponível e API rejeita)
- **AC-29 — Convite de agente**
  - **Given** um admin na gestão de perfis
  - **When** envio convite para um e-mail
  - **Then** o convidado recebe e-mail com link para concluir o cadastro (definir senha)
  - **And** um perfil em status `pendente` é criado (sem acesso ao sistema)
  - **And** ao concluir o cadastro, o perfil fica `ativo` com role `agente` e o convidado consegue fazer login
- **AC-30 — Mudança de role**
  - **Given** um admin
  - **When** altero a role de um perfil (`agente` → `admin` ou `admin` → `agente`)
  - **Then** a mudança vale imediatamente (próxima ação do usuário)
  - **And** a mudança fica registrada em log de auditoria de perfis
- **AC-31 — Desativar agente (Should)**
  - **Given** um admin
  - **When** desativo o perfil de um agente
  - **Then** o agente não consegue mais fazer login
  - **And** os chamados atribuídos a ele são preservados (agente exibido como "desativado")

### S-08 — Notificações por e-mail ao solicitante (Must)

**Como** solicitante
**Quero** receber e-mail quando meu chamado for resolvido, fechado ou reaberto
**Para que** eu saiba o andamento sem precisar cobrar o suporte.

- **AC-32 — E-mail em "resolvido"**
  - **Given** um chamado com solicitante de e-mail válido
  - **When** o status muda para `resolvido`
  - **Then** o solicitante recebe e-mail (pt-BR, via Resend) com código do chamado, título e a mensagem de resolução (quando houver)
- **AC-33 — E-mail em "fechado"**
  - **Given** um chamado em status `resolvido`
  - **When** o status muda para `fechado`
  - **Then** o solicitante recebe e-mail informando que o chamado foi fechado (código + título)
- **AC-34 — E-mail em "reaberto"**
  - **Given** um chamado em status `resolvido` ou `fechado`
  - **When** o status muda para `reaberto`
  - **Then** o solicitante recebe e-mail informando que o chamado foi reaberto (código + título + motivo, quando houver)
- **AC-35 — Falha de envio não bloqueia o atendimento**
  - **Given** uma mudança de status que dispara notificação
  - **When** o provedor de e-mail falha
  - **Then** a mudança de status é gravada normalmente
  - **And** a timeline registra "falha ao enviar notificação" para o evento correspondente

### S-09 — (Sistema) Formulário público gera chamado automaticamente (Must)

**Quando** o formulário público é submetido, **o workflow n8n** invoca a Edge Function `criar-chamado` **e o chamado** aparece no backoffice.

- **AC-36 — Submissão cria chamado**
  - **Given** uma submissão válida do formulário público (qualquer tipo)
  - **When** o workflow n8n invoca `criar-chamado` com o segredo compartilhado
  - **Then** um chamado é criado com status `novo`, origem `público` e todos os campos do formulário capturados: título, descrição, solicitante (nome + e-mail), contexto de rede (cidade, MAC), dados do novo usuário (quando aplicável) e imagem/planilha como anexo
  - **And** a prioridade usa urgência/impacto padrão definidos na regra R7
- **AC-37 — Autenticação por segredo compartilhado**
  - **Given** uma chamada à Edge Function `criar-chamado`
  - **When** o segredo compartilhado está ausente ou inválido
  - **Then** a chamada é rejeitada (401)
  - **And** nenhum chamado é criado
- **AC-38 — Idempotência contra duplicatas**
  - **Given** uma submissão com chave de idempotência única
  - **When** `criar-chamado` é chamado duas vezes com a mesma chave (ex.: retry do n8n)
  - **Then** apenas um chamado é criado
  - **And** a segunda chamada retorna os dados do chamado já criado
- **AC-39 — Falha da integração não quebra o formulário público**
  - **Given** uma submissão válida do formulário público
  - **When** `criar-chamado` falha temporariamente (indisponível/erro)
  - **Then** o usuário público continua vendo a confirmação de envio normal
  - **And** o n8n repete a tentativa (retry) até o chamado ser criado; falhas são logadas para a equipe de operações

---

## 3. Regras de negócio

### R1. Workflow de status

Identificadores de status (dados): `novo`, `atribuido`, `atendimento`, `espera`, `resolvido`, `fechado`, `reaberto`.
Rótulos de exibição: Novo, Atribuído, Em atendimento, Em espera, Resolvido, Fechado, Reaberto.

Transições permitidas:

| De | Para | Gatilho / observação |
| --- | --- | --- |
| `novo` | `atribuido` | Atribuição de agente |
| `novo` | `atendimento` | Agente inicia o atendimento diretamente |
| `atribuido` | `atendimento` | Início do atendimento |
| `atendimento` | `espera` | Aguardando cliente ou terceiro |
| `atendimento` | `resolvido` | Atendimento concluído → e-mail ao solicitante (AC-32) |
| `espera` | `atendimento` | Retomada do atendimento |
| `espera` | `resolvido` | Resolução sem retorno ao atendimento → e-mail (AC-32) |
| `resolvido` | `fechado` | Encerramento → e-mail ao solicitante (AC-33) |
| `resolvido` | `reaberto` | Problema persistiu/retornou → e-mail ao solicitante (AC-34) |
| `fechado` | `reaberto` | Problema persistiu/retornou → e-mail ao solicitante (AC-34) |
| `reaberto` | `atendimento` | Retomada obrigatória antes de resolver novamente |

Regras complementares:

- Qualquer transição fora da tabela é **rejeitada** pela API e não aparece na UI (AC-20).
- Atribuição/reatribuição **não** altera o status, exceto a inicial: `novo` + atribuição → `atribuido` (AC-21, AC-22).
- Em `resolvido`, o agente pode opcionalmente preencher **mensagem de resolução** (obrigatória? Não — opcional, mas incluída no e-mail quando presente).
- Em `reaberto`, o agente pode opcionalmente preencher **motivo da reabertura** (incluído no e-mail quando presente).
- Fechamento automático de chamados resolvidos após N dias **não** existe na v1 (ver `[OPEN-4]`).
- Cada evento (criação, transição, atribuição, follow-up, nota, anexo, notificação) é imutável na timeline — não existe edição de eventos.

### R2. Matriz de prioridade (GLPI 3×3)

Prioridade é **sempre derivada** de urgência × impacto; não há edição manual.

| Urgência \ Impacto | `local` (1 usuário/elemento) | `setor` (equipe/grupo) | `massa` (grande volume de usuários) |
| --- | --- | --- | --- |
| **`baixa`** | `baixa` | `média` | `média` |
| **`média`** | `média` | `alta` | `alta` |
| **`alta`** | `alta` | `crítica` | `crítica` |

- Alterar urgência ou impacto recalcula a prioridade imediatamente (AC-27).
- Rótulos de exibição: Urgência — Baixa/Média/Alta; Impacto — Local/Setor/Massa; Prioridade — Baixa/Média/Alta/Crítica.

### R3. Campos por tipo de chamado

Campos **comuns a todos os tipos**:

| Campo | Obrigatório | Regra |
| --- | --- | --- |
| Título | Sim | 1–150 caracteres |
| Tipo | Sim | `problema_tecnico`, `novo_acesso_individual`, `novo_acesso_lote` |
| Solicitante — nome | Sim | 1–100 caracteres |
| Solicitante — e-mail | Sim | e-mail válido, máx. 255 |
| Urgência | Sim | `baixa` \| `média` \| `alta` |
| Impacto | Sim | `local` \| `setor` \| `massa` |
| Descrição | Sim | 20–5000 caracteres |
| Anexos | Não | conforme R4 |

Campos **específicos por tipo**:

| Tipo | Campos específicos | Obrigatório |
| --- | --- | --- |
| `problema_tecnico` | Código da cidade (numérico, máx. 3 dígitos); Endereço MAC (`AA:BB:CC:DD:EE:FF`) | Não |
| `novo_acesso_individual` | Novo usuário: nome, login, e-mail, cargo/papel, área | Opcionais na criação manual; **obrigatórios** quando capturados do formulário público |
| `novo_acesso_lote` | Arquivo de lote (CSV/Excel, cabeçalhos `Login, Colaborador, Email, Cargo, Operação`, máx. 5 MB) | Opcional na criação manual; obrigatório quando capturado do formulário público |

> Na criação **manual**, os campos específicos do tipo são opcionais (o agente pode registrar por telefone sem todos os dados). Quando o chamado é criado **pelo formulário público**, todos os campos preenchidos no formulário são capturados (AC-36).

### R4. Anexos

- Formatos aceitos: JPG, JPEG, PNG, GIF, WEBP, PDF, CSV, XLS, XLSX.
- Tamanho máximo por arquivo: **10 MB** (alinha com a imagem do formulário público).
- Máximo de anexos por chamado: **5**.
- Armazenados no **Supabase Storage**; bucket privado — download somente para usuários autenticados do backoffice (RLS).
- Arquivo inválido (formato/tamanho/quantidade) é rejeitado na UI e na API, com mensagem (AC-12, AC-25).
- A imagem enviada no formulário público é capturada como anexo do chamado criado (AC-36).

### R5. Permissões (roles e RLS)

| Ação | Agente | Admin |
| --- | --- | --- |
| Ver dashboard, listagem e detalhe de chamados | Sim | Sim |
| Criar chamado manual | Sim | Sim |
| Atualizar status (transições R1), atribuir/reatribuir | Sim | Sim |
| Follow-up, nota interna, anexar arquivo | Sim | Sim |
| Gerir perfis (convite, role, desativar) | **Não** | Sim |

- Autenticação: Supabase Auth (e-mail + senha); rota de login em `/login`.
- Autorização: tabela `profiles` com `role` em {`agente`, `admin`}; **RLS** garante que (a) sem perfil → zero acesso a dados do backoffice (AC-04), (b) `agente` não altera perfis (AC-28), (c) o agente lê seus próprios dados de perfil.
- Bootstrap do primeiro admin: ver `[OPEN-4]`.

### R6. Notificações por e-mail

- Provedor: **Resend**; todos os e-mails em **pt-BR**.
- Gatilhos e destinatários:

| Evento | Destinatário | Conteúdo |
| --- | --- | --- |
| Status → `resolvido` | Solicitante | Código, título, mensagem de resolução (quando houver) |
| Status → `fechado` | Solicitante | Código, título, aviso de encerramento |
| Status → `reaberto` | Solicitante | Código, título, motivo da reabertura (quando houver) |
| Atribuição / reatribuição | Agente atribuído | Código, título, prioridade, link para o chamado |

- E-mail do solicitante inválido/inexistente: a notificação é **pulada** e a timeline registra a falha — a mudança de status nunca é bloqueada (AC-35).
- Follow-ups **públicos** fazem parte do conteúdo destinado ao solicitante; notas **internas** nunca saem para o solicitante (AC-23, AC-24).
- Remetente (From) do e-mail: ver `[OPEN-1]`.

### R7. Integração formulário público → `criar-chamado` (contrato)

Fluxo: `frontend público → enviar-solicitacao (proxy CORS) → webhook n8n → Edge Function criar-chamado`. As alterações no n8n (chamar `criar-chamado`) são responsabilidade da **equipe de operações**; o contrato abaixo deve ser documentado no código e na entrega.

- **Autenticação:** chamada só autenticada por **segredo compartilhado** (header), definido como variável de ambiente da Edge Function e no n8n. Ausente/inválido → `401`, nada é criado (AC-37).
- **Payload (JSON):**

| Campo | Obrigatório | Descrição |
| --- | --- | --- |
| `tipo` | Sim | `problema_tecnico` \| `novo_acesso_individual` \| `novo_acesso_lote` |
| `solicitante.nome` | Sim | 1–100 |
| `solicitante.email` | Sim | válido |
| `titulo` | Sim | 1–150 |
| `descricao` | Sim | 20–5000 |
| `cidade` | Não | numérico, máx. 3 dígitos |
| `mac` | Não | formato MAC |
| `novo_acesso` | Não (se tipo `novo_acesso_*`) | { `nome`, `login`, `email`, `cargo`, `area` } |
| `arquivo_lote` | Não (se tipo `novo_acesso_lote`) | referência ao arquivo da submissão |
| `anexos` | Não | referência(s) à(s) imagem(ns)/arquivo(s) da submissão |
| `chave_idempotencia` | Sim | identificador único da submissão |

- **Respostas:** `201` com `{ codigo, status, prioridade }` (criado); `200` com os dados do existente quando a chave de idempotência já foi atendida (AC-38); `400` quando campos obrigatórios faltam/estão inválidos (o n8n pode corrigir/encaminhar); `401` sem segredo válido.
- **Valores padrão do chamado criado:** status `novo`, origem `público`, urgência/impacto padrão definidos em `[OPEN-5]`.
- **Disponibilidade:** falhas devem ser tratadas com retry no n8n; o fluxo público nunca é dependente de `criar-chamado` para confirmar ao usuário (AC-39).
- **Fora do contrato:** qualquer outra integração de terceiros é non-goal (ver §5).

### R8. Identificação do chamado

- Código sequencial global, exibido como `CHM-000001` (zero-padded, 6 dígitos).
- O código aparece na listagem, no detalhe, nos e-mails e é buscável no texto livre (AC-15).

---

## 4. Fora de escopo (non-goals) — v1

- Gerenciamento de **SLA** (prazos, escalonamento por tempo, alertas de breach).
- Gestão de **ativos/contratos/estoque** (CMDB, inventário de equipamentos).
- **Base de conhecimento** (FAQ, soluções catalogadas).
- Notificações por **Telegram/WhatsApp** (apenas e-mail na v1).
- **App mobile** (o backoffice é web, desktop-first).
- **API pública para integrações de terceiros** — a única integração é o contrato n8n (`criar-chamado`).
- **Portal do solicitante** (área logada para o solicitante ver/responder chamados) — na v1 o solicitante só interage via e-mail; follow-ups "públicos" ficam disponíveis para o portal futuro.
- Reabertura por ação do solicitante (na v1, reabertura é feita por agente/admin).
- Multi-empresa/multi-tenant.

## 5. Perguntas em aberto

- **[OPEN-1]** Remetente dos e-mails de notificação — endereço e nome (sugestão: `no-reply@beon.digital` — "BEON · Suporte"). Confirmar domínio verificado no Resend.
- **[OPEN-2]** Visibilidade dos agentes: todos os agentes veem **todos** os chamados, ou apenas os atribuídos a eles? (Proposta v1: todos veem todos, com filtro opcional "somente os meus".)
- **[OPEN-3]** Chamados "novo acesso em lote" vindos do formulário público: gerar **um** chamado com a planilha como anexo, ou **um chamado por linha** da planilha? (Proposta v1: um chamado com a planilha anexada.)
- **[OPEN-4]** Bootstrap do primeiro admin (inserção manual via SQL no Supabase) e fechamento automático de chamados `resolvido` após N dias sem reabertura (ex.: 7 dias) — incluir ou não na v1?
- **[OPEN-5]** Urgência/impacto padrão dos chamados criados pelo formulário público (o formulário público não coleta esses campos). Sugestão: urgência `média` + impacto `local` → prioridade `média`.
- **[OPEN-6]** O convite de agente (AC-29) deve suportar envio em massa (múltiplos e-mails de uma vez)? (Proposta v1: convite individual.)

## 6. Premissas e dependências

- **Premissa:** o webhook n8n `nova-solicitacao` já recebe todas as submissões do formulário público em produção.
- **Premissa:** o projeto Supabase existente (Auth + Postgres + Storage + Edge Functions) hospedar backoffice, perfis, chamados e bucket de anexos.
- **Premissa:** conta **Resend** disponível com domínio verificado para envio transacional.
- **Dependência:** equipe de operações para ajustar o workflow n8n a invocar `criar-chamado` (contrato R7).
- **Dependência:** segredo compartilhado n8n ↔ `criar-chamado` e chave de API do Resend como variáveis de ambiente das Edge Functions (nunca no frontend).
- **Dependência:** o formulário público **não** muda de contrato (Zod/payload) — a criação do chamado é aditiva, via n8n.

## 7. Prioridade (MoSCoW)

| Item | MoSCoW | Justificativa |
| --- | --- | --- |
| S-01 Login + dashboard (AC-01…AC-07) | Must | Acesso e visão do backlog são o coração do backoffice |
| S-01 AC-08 (KPIs 7d/30d) | Should | Valor bom para gestão; pode virar follow-up rápido se o escopo apertar |
| S-02 Criação manual (AC-09…AC-12) | Must | Canais fora do formulário (telefone/presencial) precisam de registro |
| S-03 Listagem (AC-13…AC-15) | Must | Utilidade diária do agente |
| S-03 AC-16 (ordenação extra) | Should | Conveniência; ordenação por criação já cobre o fluxo principal |
| S-04 Detalhe + timeline (AC-17…AC-18) | Must | Sem contexto não há atendimento |
| S-05 Atualizações (AC-19…AC-25) | Must | Core do workflow de atendimento |
| S-06 Matriz de prioridade (AC-26…AC-27) | Must | Diferencial do modelo GLPI aprovado |
| S-07 Gestão de perfis (AC-28…AC-30) | Must | Sem isso não há controle de acesso operacional |
| S-07 AC-31 (desativar agente) | Should | Importante, mas não bloqueia a operação inicial |
| S-08 Notificações ao solicitante (AC-32…AC-35) | Must | Compromisso com o solicitante, aprovado no escopo |
| S-09 Integração n8n → `criar-chamado` (AC-36…AC-39) | Must | Elimina o retrabalho central que motiva o projeto |

## 8. Riscos

| Risco | Mitigação |
| --- | --- |
| Duplicatas de chamado por retry do n8n | Chave de idempotência (R7, AC-38) |
| Perda de chamados se `criar-chamado` cair | Retry no n8n + log de falhas (AC-39) |
| E-mails caírem em spam | Remetente com domínio verificado + SPF/DKIM no Resend (`[OPEN-1]`) |
| Crescimento do bucket de anexos | Limites de tamanho/quantidade (R4) + revisão de retenção pós-v1 |

---

*História de referência para publicação no issue: "Backoffice de gestão de chamados com dashboard, workflow de status e notificações por e-mail".*
