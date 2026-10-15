// T-007: App.tsx — updated with backoffice routes

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import NovaSolicitacao from "./pages/NovaSolicitacao";
import { LoginPage } from "./pages/backoffice/LoginPage";
import { RequireAuth } from "./components/backoffice/RequireAuth";
import { BackofficeLayout } from "./components/backoffice/BackofficeLayout";
import { DashboardPage } from "./pages/backoffice/DashboardPage";
import { ChamadosListPage } from "./pages/backoffice/Chamados/List";
import { ChamadoFormPage } from "./pages/backoffice/Chamados/Form";
import { ChamadoDetailPage } from "./pages/backoffice/Chamados/Detail";
import { AgentesPage } from "./pages/backoffice/Agentes/List";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<AppLayout />}>
            <Route path="/nova-solicitacao" element={<NovaSolicitacao />} />
          </Route>

          {/* Login (outside backoffice layout) */}
          <Route path="/login" element={<LoginPage />} />

          {/* Backoffice routes (protected) */}
          <Route
            path="/backoffice"
            element={
              <RequireAuth>
                <BackofficeLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="chamados" element={<ChamadosListPage />} />
            <Route path="chamados/novo" element={<ChamadoFormPage />} />
            <Route path="chamados/:id" element={<ChamadoDetailPage />} />
            <Route path="agentes" element={<AgentesPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/nova-solicitacao" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
