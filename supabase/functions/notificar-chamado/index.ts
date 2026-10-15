// T-022: Edge Function notificar-chamado — Resend transactional email
// verify_jwt = true (called from frontend)

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.97.0';
import Resend from 'https://esm.sh/resend@2.0.0';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const RESEND_FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL') || 'noreply@exemplo.com';
const RESEND_FROM_NAME = Deno.env.get('RESEND_FROM_NAME') || 'BEON · Suporte';
const APP_URL = Deno.env.get('APP_URL') || 'http://localhost:8080';

const resend = new Resend(RESEND_API_KEY);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  try {
    const { ticket_id, evento } = await req.json();

    if (!ticket_id || !evento) {
      return new Response(
        JSON.stringify({ error: 'ticket_id e evento são obrigatórios' }),
        { status: 400 }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch ticket with profile info
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', ticket_id)
      .single();

    if (ticketError || !ticket) {
      throw ticketError || new Error('Ticket não encontrado');
    }

    let subject = '';
    let content = '';

    switch (evento) {
      case 'resolvido':
        subject = `[${ticket.numero}] Chamado resolvido`;
        content = `Seu chamado ${ticket.numero} — "${ticket.titulo}" foi resolvido.`;
        break;
      case 'fechado':
        subject = `[${ticket.numero}] Chamado fechado`;
        content = `Seu chamado ${ticket.numero} — "${ticket.titulo}" foi fechado.`;
        break;
      case 'reaberto':
        subject = `[${ticket.numero}] Chamado reaberto`;
        content = `Seu chamado ${ticket.numero} — "${ticket.titulo}" foi reaberto.`;
        break;
      case 'atribuido':
        subject = `[${ticket.numero}] Chamado atribuído a você`;
        content = `O chamado ${ticket.numero} — "${ticket.titulo}" — Prioridade: ${ticket.prioridade}. Acesse: ${APP_URL}/backoffice/chamados/${ticket.id}`;
        break;
      default:
        return new Response(
          JSON.stringify({ error: 'Evento inválido' }),
          { status: 400 }
        );
    }

    // Determine recipient: for 'atribuido', send to assigned agent; otherwise to requester
    let recipientEmail = ticket.solicitante_email;

    if (evento === 'atribuido' && ticket.atribuido_a) {
      const { data: agentProfile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', ticket.atribuido_a)
        .single();
      if (agentProfile?.email) {
        recipientEmail = agentProfile.email;
      }
    }

    try {
      await resend.emails.send({
        from: `${RESEND_FROM_NAME} <${RESEND_FROM_EMAIL}>`,
        to: recipientEmail,
        subject,
        text: content,
      });

      // Log success in timeline
      await supabase
        .from('ticket_followups')
        .insert({
          ticket_id,
          tipo: 'system',
          conteudo: `Notificação enviada: ${subject}`,
        });
    } catch (emailError) {
      console.error('Falha ao enviar e-mail:', emailError);

      // Log failure in timeline (non-blocking - AC-35)
      await supabase
        .from('ticket_followups')
        .insert({
          ticket_id,
          tipo: 'system',
          conteudo: 'Falha ao enviar notificação',
        });
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (err) {
    console.error('Erro na função notificar-chamado:', err);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
});
