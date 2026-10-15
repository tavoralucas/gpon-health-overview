# Corrigir "Acesso não autorizado" após o login

## Diagnóstico
- O perfil de lucas.tavora@claro.com.br está correto na base: role `admin`, status `active`.
- As regras de acesso da tabela de perfis para admin ("Admin lê todos os perfis" / "Admin atualiza perfis") consultam a própria tabela de perfis dentro da regra. O banco recusa isso com erro de recursão infinita, a leitura do perfil falha por completo (inclusive a do próprio usuário), e a tela mostra "Acesso não autorizado".
- Primeiro passo da implementação: confirmar esse erro numa chamada real com o usuário logado antes de alterar.

## Correção
1. Criar a função `public.is_active_admin(uid)` (security definer, search_path fixo) que verifica se o perfil é admin e ativo sem passar pelas regras de acesso.
2. Recriar as duas políticas de admin da tabela de perfis usando essa função em vez da subconsulta direta. A política "Usuário lê o próprio perfil" fica como está.
3. Conferir se o papel `authenticated` tem permissão de SELECT/UPDATE na tabela de perfis; adicionar GRANT se faltar.
4. Revisar `RequireAuth`, `RequireAdmin` e `BackofficeLayout`: trocar `.single()` por `.maybeSingle()` e registrar o erro no console, para que falhas futuras não pareçam "não autorizado" silenciosamente.

## Verificação
- Entrar no preview como lucas.tavora@claro.com.br e confirmar que o backoffice carrega, incluindo a área de admin (gestão de agentes).
- Rodar os testes existentes.

## Observação
O papel ainda fica na tabela de perfis; mover para uma tabela separada de papéis é mais seguro, mas fica fora deste ajuste.
