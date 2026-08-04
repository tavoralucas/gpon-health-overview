const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const WEBHOOK_URL =
  Deno.env.get("N8N_WEBHOOK_URL") ??
  "https://n8n.usto.re/webhook/solicitacao-lovable";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();

    const upstream = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: formData,
    });

    const text = await upstream.text();
    console.log("n8n response", upstream.status, text.slice(0, 500));

    if (upstream.status !== 200) {
      return new Response(
        JSON.stringify({
          error: `O webhook retornou HTTP ${upstream.status}.`,
          details: text.slice(0, 500),
        }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ ok: true, response: text.slice(0, 500) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao encaminhar solicitação", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
