import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Panorama360 from "./pages/Panorama360";
import VisaoGeral from "./pages/panorama360/VisaoGeral";
import AcessoP360 from "./pages/panorama360/AcessoP360";
import AutenticacaoGoogle from "./pages/panorama360/AutenticacaoGoogle";
import DashboardsPaineis from "./pages/panorama360/DashboardsPaineis";
import DatasourcePMC from "./pages/panorama360/DatasourcePMC";
import RefreshAutomatico from "./pages/panorama360/RefreshAutomatico";
import CriandoDashboards from "./pages/panorama360/CriandoDashboards";
import AdicionarCliente from "./pages/panorama360/AdicionarCliente";
import IntegracaoTelegram from "./pages/panorama360/IntegracaoTelegram";
import ConfigurarAlertas from "./pages/panorama360/ConfigurarAlertas";
import ProcedimentosAlertas from "./pages/panorama360/ProcedimentosAlertas";
import SilenciarNotificacao from "./pages/panorama360/SilenciarNotificacao";
import RemoverSilenciamentos from "./pages/panorama360/RemoverSilenciamentos";
import TagsLabels from "./pages/panorama360/TagsLabels";
import ConsultasCondicoes from "./pages/panorama360/ConsultasCondicoes";
import ExplorandoLogs from "./pages/panorama360/ExplorandoLogs";
import InstalandoAgente from "./pages/panorama360/InstalandoAgente";
import CloudOrchestration from "./pages/CloudOrchestration";
import CostManagement from "./pages/CostManagement";
import Finops360 from "./pages/Finops360";
import VisaoGeralFinops from "./pages/finops360/VisaoGeralFinops";
import DashboardFinops from "./pages/finops360/DashboardFinops";
import RightsizingFinops from "./pages/finops360/RightsizingFinops";
import CompareCloud from "./pages/finops360/CompareCloud";
import ImaginaryCloud from "./pages/finops360/ImaginaryCloud";
import ProviderHint from "./pages/finops360/ProviderHint";
import Mangue from "./pages/Mangue";
import VisaoGeralMangue from "./pages/mangue/VisaoGeralMangue";
import WorkloadsMangue from "./pages/mangue/WorkloadsMangue";
import CatalogoMangue from "./pages/mangue/CatalogoMangue";
import FaturamentoMangue from "./pages/mangue/FaturamentoMangue";
import RecomendacoesMangue from "./pages/mangue/RecomendacoesMangue";
import PermissoesIntegracoes from "./pages/mangue/PermissoesIntegracoes";
import NodesNamespaces from "./pages/mangue/NodesNamespaces";
import MigracaoClusterMangue from "./pages/mangue/MigracaoClusterMangue";
import StorageMangue from "./pages/mangue/StorageMangue";
import TarefasMangue from "./pages/mangue/TarefasMangue";
import ClustersMangue from "./pages/mangue/ClustersMangue";
import DCI from "./pages/DCI";
import VisaoGeralDCI from "./pages/dci/VisaoGeralDCI";
import AdministracaoDCI from "./pages/dci/AdministracaoDCI";
import PortasDCI from "./pages/dci/PortasDCI";
import CircuitosDCI from "./pages/dci/CircuitosDCI";
import ExcursionamentosDCI from "./pages/dci/ExcursionamentosDCI";
import TarefasDCI from "./pages/dci/TarefasDCI";
import VisaoGeralCostManagement from "./pages/cost-management/VisaoGeralCostManagement";
import HistoricoServicoCostManagement from "./pages/cost-management/HistoricoServicoCostManagement";
import TendenciaFaturamentoCostManagement from "./pages/cost-management/TendenciaFaturamentoCostManagement";
import ExportarRelatoriosCostManagement from "./pages/cost-management/ExportarRelatoriosCostManagement";
import ConsolidadoFaturamentoCostManagement from "./pages/cost-management/ConsolidadoFaturamentoCostManagement";
import CustoBudgetCostManagement from "./pages/cost-management/CustoBudgetCostManagement";
import ContaMasterCostManagement from "./pages/cost-management/ContaMasterCostManagement";
import FinanceiroCostManagement from "./pages/cost-management/FinanceiroCostManagement";
import CustoRelacionalProdutoCostManagement from "./pages/cost-management/CustoRelacionalProdutoCostManagement";
import Gpon360 from "./pages/Gpon360";
import {
  ClientesGpon,
  DashboardsGpon,
  MonitoramentoSinalGpon,
  TrapMassivoGpon,
  MonitoramentoQuedasGpon,
  PerformanceGpon,
  RelatoriosGpon,
  GestaoParametrosGpon,
  AuditoriaGpon,
} from "./pages/gpon360/modulos";
import Novidades from "./pages/Novidades";
import NovidadesMes from "./pages/novidades/NovidadesMes";
import NotFound from "./pages/NotFound";
import NovaSolicitacao from "./pages/NovaSolicitacao";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<CostManagement />} />
            <Route path="/panorama-360" element={<Panorama360 />} />
            <Route path="/panorama-360/visao-geral" element={<VisaoGeral />} />
            <Route path="/panorama-360/acesso" element={<AcessoP360 />} />
            <Route path="/panorama-360/autenticacao-google" element={<AutenticacaoGoogle />} />
            <Route path="/panorama-360/dashboards-paineis" element={<DashboardsPaineis />} />
            <Route path="/panorama-360/datasource" element={<DatasourcePMC />} />
            <Route path="/panorama-360/refresh-automatico" element={<RefreshAutomatico />} />
            <Route path="/panorama-360/criando-dashboards" element={<CriandoDashboards />} />
            <Route path="/panorama-360/adicionar-cliente" element={<AdicionarCliente />} />
            <Route path="/panorama-360/integracao-telegram" element={<IntegracaoTelegram />} />
            <Route path="/panorama-360/configurar-alertas" element={<ConfigurarAlertas />} />
            <Route path="/panorama-360/procedimentos-alertas" element={<ProcedimentosAlertas />} />
            <Route path="/panorama-360/silenciar-notificacao" element={<SilenciarNotificacao />} />
            <Route path="/panorama-360/remover-silenciamentos" element={<RemoverSilenciamentos />} />
            <Route path="/panorama-360/tags-labels" element={<TagsLabels />} />
            <Route path="/panorama-360/consultas-condicoes" element={<ConsultasCondicoes />} />
            <Route path="/panorama-360/explorando-logs" element={<ExplorandoLogs />} />
            <Route path="/panorama-360/instalando-agente" element={<InstalandoAgente />} />
            <Route path="/cloud-orchestration" element={<CloudOrchestration />} />
            <Route path="/cost-management" element={<CostManagement />} />
            <Route path="/finops-360" element={<Finops360 />} />
            <Route path="/finops-360/visao-geral" element={<VisaoGeralFinops />} />
            <Route path="/finops-360/dashboard" element={<DashboardFinops />} />
            <Route path="/finops-360/rightsizing" element={<RightsizingFinops />} />
            <Route path="/finops-360/compare-cloud" element={<CompareCloud />} />
            <Route path="/finops-360/imaginary-cloud" element={<ImaginaryCloud />} />
            <Route path="/finops-360/provider-hint" element={<ProviderHint />} />
            <Route path="/mangue" element={<Mangue />} />
            <Route path="/mangue/visao-geral" element={<VisaoGeralMangue />} />
            <Route path="/mangue/workloads" element={<WorkloadsMangue />} />
            <Route path="/mangue/catalogo" element={<CatalogoMangue />} />
            <Route path="/mangue/faturamento" element={<FaturamentoMangue />} />
            <Route path="/mangue/recomendacoes" element={<RecomendacoesMangue />} />
            <Route path="/mangue/permissoes-integracoes" element={<PermissoesIntegracoes />} />
            <Route path="/mangue/nodes-namespaces" element={<NodesNamespaces />} />
            <Route path="/mangue/migracao-cluster" element={<MigracaoClusterMangue />} />
            <Route path="/mangue/storage" element={<StorageMangue />} />
            <Route path="/mangue/tarefas" element={<TarefasMangue />} />
            <Route path="/mangue/clusters" element={<ClustersMangue />} />
            <Route path="/dci" element={<DCI />} />
            <Route path="/dci/visao-geral" element={<VisaoGeralDCI />} />
            <Route path="/dci/administracao" element={<AdministracaoDCI />} />
            <Route path="/dci/portas" element={<PortasDCI />} />
            <Route path="/dci/circuitos" element={<CircuitosDCI />} />
            <Route path="/dci/excursionamentos" element={<ExcursionamentosDCI />} />
            <Route path="/dci/tarefas" element={<TarefasDCI />} />
            <Route path="/cost-management/visao-geral" element={<VisaoGeralCostManagement />} />
            <Route path="/cost-management/historico-servico" element={<HistoricoServicoCostManagement />} />
            <Route path="/cost-management/tendencia-faturamento" element={<TendenciaFaturamentoCostManagement />} />
            <Route path="/cost-management/exportar-relatorios" element={<ExportarRelatoriosCostManagement />} />
            <Route path="/cost-management/consolidado-faturamento" element={<ConsolidadoFaturamentoCostManagement />} />
            <Route path="/cost-management/custo-budget" element={<CustoBudgetCostManagement />} />
            <Route path="/cost-management/conta-master" element={<ContaMasterCostManagement />} />
            <Route path="/cost-management/financeiro" element={<FinanceiroCostManagement />} />
            <Route path="/cost-management/custo-relacional-produto" element={<CustoRelacionalProdutoCostManagement />} />
            <Route path="/gpon-360" element={<Gpon360 />} />
            <Route path="/gpon-360/clientes" element={<ClientesGpon />} />
            <Route path="/gpon-360/dashboards" element={<DashboardsGpon />} />
            <Route path="/gpon-360/monitoramento-sinal" element={<MonitoramentoSinalGpon />} />
            <Route path="/gpon-360/trap-massivo" element={<TrapMassivoGpon />} />
            <Route path="/gpon-360/monitoramento-quedas" element={<MonitoramentoQuedasGpon />} />
            <Route path="/gpon-360/performance" element={<PerformanceGpon />} />
            <Route path="/gpon-360/relatorios" element={<RelatoriosGpon />} />
            <Route path="/gpon-360/gestao-parametros" element={<GestaoParametrosGpon />} />
            <Route path="/gpon-360/auditoria" element={<AuditoriaGpon />} />
            <Route path="/novidades" element={<Novidades />} />
            <Route path="/novidades/:slug" element={<NovidadesMes />} />
          </Route>
          <Route path="/nova-solicitacao" element={<NovaSolicitacao />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
