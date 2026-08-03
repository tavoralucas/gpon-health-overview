import { useState, useEffect, useCallback } from "react";

export interface Conversation {
  id: string;
  page_key: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id?: string;
  conversation_id?: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

function getSessionId(): string {
  let id = localStorage.getItem("gpon_session_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("gpon_session_id", id);
  }
  return id;
}

async function callChatStore(payload: Record<string, unknown>) {
  const resp = await fetch(`${SUPABASE_URL}/functions/v1/chat-store`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ANON_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  return resp.json();
}

export function useChatSessions(pageKey: string) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const sessionId = getSessionId();

  const loadConversations = useCallback(async () => {
    const { data } = await callChatStore({ action: "listConversations", sessionId, pageKey });
    if (data) setConversations(data as Conversation[]);
  }, [pageKey, sessionId]);

  const loadMessages = useCallback(async (conversationId: string) => {
    const { data } = await callChatStore({ action: "listMessages", sessionId, conversationId });
    if (data) setMessages(data as ChatMessage[]);
  }, [sessionId]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const createConversation = useCallback(async (firstMessage: string): Promise<string | null> => {
    const title = firstMessage.length > 50 ? firstMessage.slice(0, 47) + "..." : firstMessage;
    const { data } = await callChatStore({ action: "createConversation", sessionId, pageKey, title });
    if (!data) return null;
    const conv = data as Conversation;
    setConversations((prev) => [conv, ...prev]);
    setCurrentConversationId(conv.id);
    setMessages([]);
    return conv.id;
  }, [sessionId, pageKey]);

  const openConversation = useCallback(async (conversationId: string) => {
    setCurrentConversationId(conversationId);
    await loadMessages(conversationId);
  }, [loadMessages]);

  const closeConversation = useCallback(() => {
    setCurrentConversationId(null);
    setMessages([]);
    loadConversations();
  }, [loadConversations]);

  const saveMessage = useCallback(async (conversationId: string, role: "user" | "assistant", content: string) => {
    const { data } = await callChatStore({ action: "saveMessage", sessionId, conversationId, role, content });
    return data as ChatMessage | null;
  }, [sessionId]);

  const updateLastAssistantMessage = useCallback((content: string) => {
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.role === "assistant") {
        return prev.map((m, i) => i === prev.length - 1 ? { ...m, content } : m);
      }
      return [...prev, { role: "assistant", content }];
    });
  }, []);

  const deleteConversation = useCallback(async (conversationId: string) => {
    await callChatStore({ action: "deleteConversation", sessionId, conversationId });
    setConversations((prev) => prev.filter((c) => c.id !== conversationId));
    if (currentConversationId === conversationId) {
      setCurrentConversationId(null);
      setMessages([]);
    }
  }, [currentConversationId, sessionId]);

  return {
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
  };
}
