import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function isValidSessionId(s: unknown): s is string {
  return typeof s === "string" && s.length >= 8 && s.length <= 128;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const body = await req.json();
    const { action, sessionId } = body ?? {};
    if (!isValidSessionId(sessionId)) return json({ error: "Invalid sessionId" }, 400);

    switch (action) {
      case "listConversations": {
        const { pageKey } = body;
        if (typeof pageKey !== "string") return json({ error: "pageKey required" }, 400);
        const { data, error } = await supabase
          .from("chat_conversations")
          .select("*")
          .eq("session_id", sessionId)
          .eq("page_key", pageKey)
          .order("updated_at", { ascending: false });
        if (error) throw error;
        return json({ data });
      }
      case "listMessages": {
        const { conversationId } = body;
        if (typeof conversationId !== "string") return json({ error: "conversationId required" }, 400);
        // Verify ownership
        const { data: conv } = await supabase
          .from("chat_conversations")
          .select("id")
          .eq("id", conversationId)
          .eq("session_id", sessionId)
          .maybeSingle();
        if (!conv) return json({ error: "Not found" }, 404);
        const { data, error } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: true });
        if (error) throw error;
        return json({ data });
      }
      case "createConversation": {
        const { pageKey, title } = body;
        if (typeof pageKey !== "string") return json({ error: "pageKey required" }, 400);
        const safeTitle = typeof title === "string" ? title.slice(0, 200) : null;
        const { data, error } = await supabase
          .from("chat_conversations")
          .insert({ session_id: sessionId, page_key: pageKey, title: safeTitle })
          .select()
          .single();
        if (error) throw error;
        return json({ data });
      }
      case "saveMessage": {
        const { conversationId, role, content } = body;
        if (typeof conversationId !== "string") return json({ error: "conversationId required" }, 400);
        if (role !== "user" && role !== "assistant") return json({ error: "Invalid role" }, 400);
        if (typeof content !== "string") return json({ error: "content required" }, 400);
        const { data: conv } = await supabase
          .from("chat_conversations")
          .select("id")
          .eq("id", conversationId)
          .eq("session_id", sessionId)
          .maybeSingle();
        if (!conv) return json({ error: "Not found" }, 404);
        const { data, error } = await supabase
          .from("chat_messages")
          .insert({ conversation_id: conversationId, role, content: content.slice(0, 50000) })
          .select()
          .single();
        if (error) throw error;
        await supabase
          .from("chat_conversations")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", conversationId);
        return json({ data });
      }
      case "deleteConversation": {
        const { conversationId } = body;
        if (typeof conversationId !== "string") return json({ error: "conversationId required" }, 400);
        const { error } = await supabase
          .from("chat_conversations")
          .delete()
          .eq("id", conversationId)
          .eq("session_id", sessionId);
        if (error) throw error;
        return json({ ok: true });
      }
      default:
        return json({ error: "Unknown action" }, 400);
    }
  } catch (e) {
    console.error("chat-store error", e);
    return json({ error: "Internal error" }, 500);
  }
});
