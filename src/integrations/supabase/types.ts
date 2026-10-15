// T-005: Types for backoffice tables
// Extends the Database type with profiles, tickets, ticket_followups, ticket_attachments

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      chat_conversations: {
        Row: {
          created_at: string | null
          id: string
          page_key: string
          session_id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          page_key: string
          session_id: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          page_key?: string
          session_id?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          role: 'agente' | 'admin'
          status: 'pending' | 'active' | 'disabled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          role?: 'agente' | 'admin'
          status?: 'pending' | 'active' | 'disabled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'agente' | 'admin'
          status?: 'pending' | 'active' | 'disabled'
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          id: string
          numero: string
          titulo: string
          descricao: string
          tipo: 'problema_tecnico' | 'novo_acesso_individual' | 'novo_acesso_lote'
          origem: 'publico' | 'manual'
          solicitante_nome: string
          solicitante_email: string
          codigo_cidade: string | null
          endereco_mac: string | null
          urgencia: 'baixa' | 'media' | 'alta'
          impacto: 'local' | 'setor' | 'massa'
          prioridade: 'baixa' | 'media' | 'alta' | 'critica'
          status: 'novo' | 'atribuido' | 'atendimento' | 'espera' | 'resolvido' | 'fechado' | 'reaberto'
          atribuido_a: string | null
          criado_por: string | null
          chave_idempotencia: string | null
          resolvido_em: string | null
          fechado_em: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          numero: string
          titulo: string
          descricao: string
          tipo: 'problema_tecnico' | 'novo_acesso_individual' | 'novo_acesso_lote'
          origem: 'publico' | 'manual'
          solicitante_nome: string
          solicitante_email: string
          codigo_cidade?: string | null
          endereco_mac?: string | null
          urgencia: 'baixa' | 'media' | 'alta'
          impacto: 'local' | 'setor' | 'massa'
          prioridade: 'baixa' | 'media' | 'alta' | 'critica'
          status?: 'novo' | 'atribuido' | 'atendimento' | 'espera' | 'resolvido' | 'fechado' | 'reaberto'
          atribuido_a?: string | null
          criado_por?: string | null
          chave_idempotencia?: string | null
          resolvido_em?: string | null
          fechado_em?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          numero?: string
          titulo?: string
          descricao?: string
          tipo?: 'problema_tecnico' | 'novo_acesso_individual' | 'novo_acesso_lote'
          origem?: 'publico' | 'manual'
          solicitante_nome?: string
          solicitante_email?: string
          codigo_cidade?: string | null
          endereco_mac?: string | null
          urgencia?: 'baixa' | 'media' | 'alta'
          impacto?: 'local' | 'setor' | 'massa'
          prioridade?: 'baixa' | 'media' | 'alta' | 'critica'
          status?: 'novo' | 'atribuido' | 'atendimento' | 'espera' | 'resolvido' | 'fechado' | 'reaberto'
          atribuido_a?: string | null
          criado_por?: string | null
          chave_idempotencia?: string | null
          resolvido_em?: string | null
          fechado_em?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_atribuido_a_fkey"
            columns: ["atribuido_a"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_criado_por_fkey"
            columns: ["criado_por"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_followups: {
        Row: {
          id: string
          ticket_id: string
          tipo: 'followup_publico' | 'nota_interna' | 'status_change' | 'assignment' | 'system'
          conteudo: string
          autor: string | null
          created_at: string
        }
        Insert: {
          id?: string
          ticket_id: string
          tipo: 'followup_publico' | 'nota_interna' | 'status_change' | 'assignment' | 'system'
          conteudo: string
          autor?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          ticket_id?: string
          tipo?: 'followup_publico' | 'nota_interna' | 'status_change' | 'assignment' | 'system'
          conteudo?: string
          autor?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_followups_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_attachments: {
        Row: {
          id: string
          ticket_id: string
          storage_path: string
          nome_arquivo: string
          tamanho_bytes: number
          content_type: string
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          ticket_id: string
          storage_path: string
          nome_arquivo: string
          tamanho_bytes: number
          content_type: string
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          ticket_id?: string
          storage_path?: string
          nome_arquivo?: string
          tamanho_bytes?: number
          content_type?: string
          uploaded_by?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_attachments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
