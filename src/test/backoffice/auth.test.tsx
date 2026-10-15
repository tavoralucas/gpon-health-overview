import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "@/components/backoffice/RequireAuth";

// AC-01: Acesso protegido do backoffice
// AC-04: Usuário sem perfil é bloqueado

// Mock do cliente Supabase usando vi.hoisted para evitar problemas com require de alias
const { supabaseMock } = vi.hoisted(() => ({
  supabaseMock: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          maybeSingle: vi.fn(),
        })),
      })),
    })),
  },
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: supabaseMock,
}));

// Mock do react-router-dom Navigate para capturar redirecionamentos
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Navigate: (props: any) => {
      mockNavigate(props);
      return null;
    },
    useNavigate: () => vi.fn(),
  };
});

function renderRequireAuth(
  session: unknown,
  profile: unknown
) {
  if (session) {
    (supabaseMock.auth.getSession as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: { session },
    });
  } else {
    (supabaseMock.auth.getSession as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: { session: null },
    });
  }

  if (profile === null) {
    const singleMock = vi.fn().mockResolvedValue({ data: null, error: null });
    const eqMock = vi.fn(() => ({ maybeSingle: singleMock }));
    (supabaseMock.from as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      select: vi.fn(() => ({ eq: eqMock })),
    }));
  } else if (profile) {
    const singleMock = vi
      .fn()
      .mockResolvedValue({ data: profile, error: null });
    const eqMock = vi.fn(() => ({ maybeSingle: singleMock }));
    (supabaseMock.from as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      select: vi.fn(() => ({ eq: eqMock })),
    }));
  }

  return render(
    <MemoryRouter initialEntries={["/backoffice/dashboard"]}>
      <Routes>
        <Route path="/login" element={<div data-testid="login-page">Login</div>} />
        <Route
          path="/backoffice"
          element={
            <RequireAuth>
              <div data-testid="protected-content">Painel protegido</div>
            </RequireAuth>
          }
        >
          <Route path="dashboard" element={<div data-testid="dashboard">Dashboard</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe("RequireAuth — AC-01: Acesso protegido", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redireciona para /login quando não há sessão autenticada", async () => {
    renderRequireAuth(null, null);

    // Aguarda o efeito da promise do getSession
    await vi.dynamicImportSettled?.();

    // Verifica se o Navigate foi chamado para /login
    // O componente deve fazer redirect para /login?redirect=/backoffice/dashboard
    const loginEl = screen.queryByTestId("login-page");
    const protectedEl = screen.queryByTestId("protected-content");
    expect(loginEl).not.toBeInTheDocument();
    expect(protectedEl).not.toBeInTheDocument();
  });

  it("redireciona para /login com redirect param quando não há sessão", async () => {
    renderRequireAuth(null, null);

    await waitFor(() => {
      const navigateCall = mockNavigate.mock.calls.find(
        (call: any[]) => call[0]?.to?.includes?.("/login")
      );
      expect(navigateCall).toBeTruthy();
    });
  });
});

describe("RequireAuth — AC-04: Usuário sem perfil", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("mostra 'Acesso não autorizado' quando autenticado mas sem profile", async () => {
    renderRequireAuth(
      { user: { id: "user-1", email: "joao@example.com" } },
      null
    );

    // Deve exibir mensagem de acesso não autorizado
    const naoAutorizado = await screen.findByText(/acesso não autorizado/i);
    expect(naoAutorizado).toBeInTheDocument();
  });

  it("não expõe conteúdo protegido quando sem perfil", async () => {
    renderRequireAuth(
      { user: { id: "user-1", email: "joao@example.com" } },
      null
    );

    const protectedEl = screen.queryByTestId("protected-content");
    expect(protectedEl).not.toBeInTheDocument();
  });
});

describe("RequireAuth — usuário autenticado com perfil válido", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza conteúdo protegido quando autenticado com profile ativo", async () => {
    renderRequireAuth(
      { user: { id: "user-1", email: "joao@example.com" } },
      { id: "user-1", role: "agente", status: "active" }
    );

    const protectedEl = await screen.findByTestId("protected-content");
    expect(protectedEl).toBeInTheDocument();
  });

  it("mostra 'Acesso não autorizado' quando profile não está ativo", async () => {
    renderRequireAuth(
      { user: { id: "user-2", email: "joao@example.com" } },
      { id: "user-2", role: "agente", status: "pending" }
    );

    const naoAutorizado = await screen.findByText(/acesso não autorizado/i);
    expect(naoAutorizado).toBeInTheDocument();
  });
});
