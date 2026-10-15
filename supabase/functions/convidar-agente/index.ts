// T-024a: Edge Function convidar-agente — invite agent via Admin API
// verify_jwt = true (called from frontend by authenticated admin)
// Uses supabase.auth.admin.inviteUserByEmail() which sends the invite email automatically

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.97.0';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const APP_URL = Deno.env.get('APP_URL') || 'http://localhost:8080';

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

    // 1. Invite user via Supabase Admin API — sends invite email automatically
    const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(
      email,
      {
        data: { name },
        redirect_to: `${APP_URL}/backoffice/login`,
      }
    );

    if (inviteError || !inviteData.user) {
      console.error('Erro ao convidar usuário:', inviteError);
      return new Response(
        JSON.stringify({ error: 'Falha ao convidar usuário: ' + (inviteError?.message || 'erro desconhecido') }),
        { status: 500 }
      );
    }

    // 2. Insert profile with the real auth user id (status pending — activated on first login)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: inviteData.user.id,
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
      await supabase.auth.admin.deleteUser(inviteData.user.id);
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
