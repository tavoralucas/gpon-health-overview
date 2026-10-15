// T-024a: Edge Function convidar-agente — invite agent via Admin API
// verify_jwt = true (called from frontend by authenticated admin)

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.97.0';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: 'name e email são obrigatórios' }),
        { status: 400 }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 1. Create auth user with a temporary password
    const tempPassword = crypto.randomUUID().slice(0, 16);
    const { data: authUser, error: createError } = await supabase.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { name },
    });

    if (createError || !authUser.user) {
      console.error('Erro ao criar usuário auth:', createError);
      return new Response(
        JSON.stringify({ error: 'Falha ao criar usuário: ' + (createError?.message || 'erro desconhecido') }),
        { status: 500 }
      );
    }

    // 2. Insert profile with the real auth user id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authUser.user.id,
        name,
        email,
        role: 'agente',
        status: 'pending',
      })
      .select()
      .single();

    if (profileError) {
      console.error('Erro ao criar profile:', profileError);
      // Clean up auth user if profile insert fails
      await supabase.auth.admin.deleteUser(authUser.user.id);
      return new Response(
        JSON.stringify({ error: 'Falha ao criar perfil: ' + profileError.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: profile }),
      { status: 201 }
    );
  } catch (err) {
    console.error('Erro na função convidar-agente:', err);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
});
