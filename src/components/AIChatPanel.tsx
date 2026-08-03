import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Loader2, Sparkles, ArrowLeft, Trash2, Plus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageContext } from "@/hooks/usePageContext";
import { useChatSessions } from "@/hooks/useChatSessions";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

async function streamChat(
  messages: Message[],
  pageContext: ReturnType<typeof usePageContext>,
  onDelta: (text: string) => void,
  onDone: () => void,
  onError: (msg: string) => void
) {
  const resp = await fetch(`${SUPABASE_URL}/functions/v1/gpon-ai-chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages, pageContext }),
  });

  if (!resp.ok || !resp.body) {
    const data = await resp.json().catch(() => ({}));
    onError(data.error || "Erro ao conectar com a IA.");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") { streamDone = true; break; }
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  onDone();
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

export function AIChatPanel() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea whenever input changes
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [input]);
  const pageContext = usePageContext();
  const { toast } = useToast();
  const location = useLocation();
  const pageKey = location.pathname;

  const {
    conversations,
    currentConversationId,
    messages,
    setMessages,
    loading,
    setLoading,
    createConversation,
    openConversation,
    closeConversation,
    saveMessage,
    updateLastAssistantMessage,
    deleteConversation,
  } = useChatSessions(pageKey);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && currentConversationId) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, currentConversationId]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setLoading(true);

    // Create conversation if needed
    let convId = currentConversationId;
    if (!convId) {
      convId = await createConversation(text);
      if (!convId) {
        setLoading(false);
        toast({ title: "Erro ao criar conversa.", variant: "destructive" });
        return;
      }
    }

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    await saveMessage(convId, "user", text);

    const allMessages = [...messages, userMsg];
    let assistantSoFar = "";

    try {
      await streamChat(
        allMessages,
        pageContext,
        (chunk) => {
          assistantSoFar += chunk;
          updateLastAssistantMessage(assistantSoFar);
        },
        async () => {
          setLoading(false);
          if (convId && assistantSoFar) {
            await saveMessage(convId, "assistant", assistantSoFar);
          }
        },
        (errMsg) => {
          setLoading(false);
          toast({ title: errMsg, variant: "destructive" });
        }
      );
    } catch {
      setLoading(false);
      toast({ title: "Erro ao conectar com a IA.", variant: "destructive" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const startNewConversation = () => {
    closeConversation();
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const quickSuggestions = [
    "Do que se trata este produto?",
    "Quais são as principais funcionalidades?",
    "Quais são os benefícios deste produto?",
  ];

  return (
    <>
      {/* Floating Button — hidden temporarily */}
      {false && (
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none",
          open && "hidden"
        )}
        aria-label="Abrir chat com IA"
      >
        <Sparkles className="h-7 w-7 text-white" />
      </button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-[380px] flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 shrink-0">
          <div className="flex items-center gap-2">
            {currentConversationId && (
              <button
                onClick={closeConversation}
                className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white mr-1"
                title="Voltar para conversas"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Insights com AI</p>
              <p className="text-[11px] text-white/70">{pageContext.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {currentConversationId && (
              <button
                onClick={startNewConversation}
                className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
                title="Nova conversa"
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* CONVERSATION LIST VIEW */}
        {!currentConversationId && (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
              {/* Welcome + Quick Start */}
              <div className="flex flex-col items-center gap-3 pt-4 pb-4 text-center border-b border-border">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  Olá! Sou seu assistente de documentação.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Analisando a documentação de <span className="font-medium text-primary">{pageContext.title}</span>. Comece uma nova conversa ou continue uma anterior.
                </p>
                <div className="w-full space-y-2 mt-1">
                  {quickSuggestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput(q);
                        setTimeout(() => {
                          inputRef.current?.focus();
                        }, 50);
                      }}
                      className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2 text-left text-xs text-foreground hover:bg-muted transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Past Conversations */}
              {conversations.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2 mt-2">
                    Conversas anteriores
                  </p>
                  <div className="space-y-1">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className="group flex items-center gap-2 rounded-lg border border-border bg-muted/20 px-3 py-2.5 hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => openConversation(conv.id)}
                      >
                        <MessageSquare className="h-4 w-4 text-primary shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">
                            {conv.title || "Conversa sem título"}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {formatDate(conv.updated_at)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteConversation(conv.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 rounded p-1 text-muted-foreground hover:text-destructive transition-all"
                          title="Excluir conversa"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input (new conversation) */}
            <div className="border-t border-border bg-card px-4 py-3 shrink-0">
              <div className="flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Inicie uma nova conversa..."
                  rows={1}
                  className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  style={{ maxHeight: "120px", overflowY: "auto" }}
                  disabled={loading}
                />
                <Button
                  size="icon"
                  onClick={send}
                  disabled={!input.trim() || loading}
                  className="h-8 w-8 shrink-0 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
                Enter para enviar · Shift+Enter para quebrar linha
              </p>
            </div>
          </div>
        )}

        {/* CHAT VIEW */}
        {currentConversationId && (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col gap-1",
                    msg.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                        <Bot className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-[10px] font-medium text-muted-foreground">Assistente</span>
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                      msg.role === "user"
                        ? "rounded-tr-sm bg-primary text-primary-foreground"
                        : "rounded-tl-sm bg-muted text-foreground"
                    )}
                  >
                    {msg.content || (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span className="text-xs">Analisando...</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {loading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex items-start gap-1.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border bg-card px-4 py-3 shrink-0">
              <div className="flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Pergunte sobre esta página..."
                  rows={1}
                  className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  style={{ maxHeight: "120px", overflowY: "auto" }}
                  disabled={loading}
                />
                <Button
                  size="icon"
                  onClick={send}
                  disabled={!input.trim() || loading}
                  className="h-8 w-8 shrink-0 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
                Enter para enviar · Shift+Enter para quebrar linha
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
