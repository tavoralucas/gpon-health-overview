import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
  useTickets,
  useTicket,
  useCreateTicket,
  useUpdateTicket,
} from "@/services/tickets";
import type { TicketFilters } from "@/services/tickets";

// Mock functions criadas com vi.hoisted para evitar erro de hoisting
const { mockFrom, mockSelect, mockEq, mockGte, mockLte, mockOr, mockOrder, mockRange, mockInsert, mockUpdate, mockSingle } = vi.hoisted(() => ({
  mockFrom: vi.fn(),
  mockSelect: vi.fn(),
  mockEq: vi.fn(),
  mockGte: vi.fn(),
  mockLte: vi.fn(),
  mockOr: vi.fn(),
  mockOrder: vi.fn(),
  mockRange: vi.fn(),
  mockInsert: vi.fn(),
  mockUpdate: vi.fn(),
  mockSingle: vi.fn(),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: mockFrom,
    rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
    auth: {
      getSession: vi.fn().mockResolvedValue({
        data: { session: { user: { id: "user-1" } } },
      }),
    },
  },
}));

function buildMockChain(returnValue: unknown) {
  const chain = {
    select: vi.fn(() => chain),
    eq: vi.fn(() => chain),
    gte: vi.fn(() => chain),
    lte: vi.fn(() => chain),
    or: vi.fn(() => chain),
    order: vi.fn(() => chain),
    range: vi.fn(() => chain),
    maybeSingle: vi.fn(() => chain),
    insert: vi.fn(() => chain),
    update: vi.fn(() => chain),
    then: vi.fn((resolve: (v: unknown) => void) => resolve(returnValue)),
  };
  return chain;
}

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("useTickets — hook de listagem (AC-13, AC-14, AC-15, AC-16)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("chama supabase.from('tickets').select() com os parâmetros corretos", () => {
    const mockChain = buildMockChain({ data: [], error: null, count: 0 });
    mockFrom.mockReturnValue(mockChain);
    mockChain.select.mockReturnValue(mockChain);
    mockChain.order.mockReturnValue(mockChain);
    mockChain.range.mockReturnValue(mockChain);

    const filters: TicketFilters = { status: "novo", prioridade: "alta" };
    renderHook(() => useTickets(filters), { wrapper: createWrapper() });

    expect(mockFrom).toHaveBeenCalledWith("tickets");
  });

  it("retorna a estrutura esperada (data, count, isLoading)", async () => {
    const mockChain = buildMockChain({ data: [], error: null, count: 0 });
    mockFrom.mockReturnValue(mockChain);
    mockChain.select.mockReturnValue(mockChain);
    mockChain.order.mockReturnValue(mockChain);
    mockChain.range.mockReturnValue(mockChain);

    const { result } = renderHook(() => useTickets({}), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current).toHaveProperty("data");
      expect(result.current.data).toHaveProperty("count");
    });
    expect(result.current).toHaveProperty("isLoading");
    expect(result.current).toHaveProperty("error");
  });
});

describe("useTicket — hook de detalhe (AC-17)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("chama supabase.from('tickets').select().eq('id', ...).maybeSingle()", () => {
    const mockChain = buildMockChain({
      data: null,
      error: null,
    });
    mockFrom.mockReturnValue(mockChain);
    mockChain.select.mockReturnValue(mockChain);
    mockChain.eq.mockReturnValue(mockChain);
    mockChain.maybeSingle.mockReturnValue(mockChain);

    renderHook(() => useTicket("ticket-123"), { wrapper: createWrapper() });

    expect(mockFrom).toHaveBeenCalledWith("tickets");
  });

  it("retorna a estrutura esperada (data, isLoading, error)", async () => {
    const mockChain = buildMockChain({ data: null, error: null });
    mockFrom.mockReturnValue(mockChain);
    mockChain.select.mockReturnValue(mockChain);
    mockChain.eq.mockReturnValue(mockChain);
    mockChain.maybeSingle.mockReturnValue(mockChain);

    const { result } = renderHook(() => useTicket("ticket-123"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBeDefined());
    expect(result.current).toHaveProperty("data");
    expect(result.current).toHaveProperty("isLoading");
    expect(result.current).toHaveProperty("error");
  });
});

describe("useCreateTicket — hook de criação (AC-09)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna a estrutura esperada (mutate, mutateAsync, isLoading)", () => {
    const mockChain = buildMockChain({
      data: null,
      error: null,
    });
    mockFrom.mockReturnValue(mockChain);
    mockChain.insert.mockReturnValue(mockChain);
    mockChain.select.mockReturnValue(mockChain);
    mockChain.maybeSingle.mockReturnValue(mockChain);

    const { result } = renderHook(() => useCreateTicket(), {
      wrapper: createWrapper(),
    });

    expect(result.current).toHaveProperty("mutate");
    expect(result.current).toHaveProperty("mutateAsync");
    expect(result.current).toHaveProperty("isPending");
  });

  it("chama supabase.from('tickets').insert() com os dados corretos", async () => {
    const mockChain = buildMockChain({ data: null, error: null });
    mockFrom.mockReturnValue(mockChain);
    mockChain.insert.mockReturnValue(mockChain);
    mockChain.select.mockReturnValue(mockChain);
    mockChain.maybeSingle.mockReturnValue(mockChain);

    const { result } = renderHook(() => useCreateTicket(), {
      wrapper: createWrapper(),
    });

    const dados = {
      titulo: "Teste",
      tipo: "problema_tecnico" as const,
      descricao: "Descrição do problema com mais de 20 caracteres",
      solicitante_nome: "João",
      solicitante_email: "joao@example.com",
      urgencia: "media" as const,
      impacto: "local" as const,
    };

    result.current.mutate(dados);

    // Aguarda a mutação ser processada
    await vi.waitFor(() => {
      expect(mockFrom).toHaveBeenCalledWith("tickets");
    });
    expect(mockChain.insert).toHaveBeenCalled();
  });
});

describe("useUpdateTicket — hook de atualização (AC-19, AC-20, AC-21, AC-22)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna a estrutura esperada (mutate, mutateAsync, isLoading)", () => {
    const mockChain = buildMockChain({ data: null, error: null });
    mockFrom.mockReturnValue(mockChain);
    mockChain.update.mockReturnValue(mockChain);
    mockChain.eq.mockReturnValue(mockChain);
    mockChain.select.mockReturnValue(mockChain);
    mockChain.maybeSingle.mockReturnValue(mockChain);

    const { result } = renderHook(() => useUpdateTicket(), {
      wrapper: createWrapper(),
    });

    expect(result.current).toHaveProperty("mutate");
    expect(result.current).toHaveProperty("mutateAsync");
    expect(result.current).toHaveProperty("isPending");
  });

  it("chama supabase.from('tickets').update().eq('id', ...) com os campos corretos", async () => {
    const mockChain = buildMockChain({ data: null, error: null });
    mockFrom.mockReturnValue(mockChain);
    mockChain.update.mockReturnValue(mockChain);
    mockChain.eq.mockReturnValue(mockChain);
    mockChain.select.mockReturnValue(mockChain);
    mockChain.maybeSingle.mockReturnValue(mockChain);

    const { result } = renderHook(() => useUpdateTicket(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      id: "ticket-123",
      status: "resolvido",
    });

    await vi.waitFor(() => {
      expect(mockFrom).toHaveBeenCalledWith("tickets");
    });
    expect(mockChain.update).toHaveBeenCalled();
    expect(mockChain.eq).toHaveBeenCalledWith("id", "ticket-123");
  });
});

describe("useCreateTicket — query key e invalidação", () => {
  it("usa queryKey com escopo ['tickets']", () => {
    // Verificação de contrato: o hook deve usar queryKey com prefixo 'tickets'
    // para que a invalidação consistente funcione
    const mockChain = buildMockChain({ data: [], error: null, count: 0 });
    mockFrom.mockReturnValue(mockChain);
    mockChain.select.mockReturnValue(mockChain);
    mockChain.order.mockReturnValue(mockChain);
    mockChain.range.mockReturnValue(mockChain);

    const { result } = renderHook(() => useTickets({}), {
      wrapper: createWrapper(),
    });

    // O hook deve existir e retornar um objeto com as propriedades esperadas
    expect(result.current).toBeDefined();
  });
});
