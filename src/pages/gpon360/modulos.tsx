import {
  ScrollText,
} from "lucide-react";
import GponDocPage from "./GponDocPage";
import ClientesGpon from "./ClientesGpon";
import DashboardsGpon from "./DashboardsGpon";
import MonitoramentoSinalGpon from "./MonitoramentoSinalGpon";
import MonitoramentoQuedasGpon from "./MonitoramentoQuedasGpon";
import TrapMassivoGpon from "./TrapMassivoGpon";
import PerformanceGpon from "./PerformanceGpon";
import RelatoriosGpon from "./RelatoriosGpon";
import GestaoParametrosGpon from "./GestaoParametrosGpon";
import AuditoriaGpon from "./AuditoriaGpon";

export { ClientesGpon, DashboardsGpon, MonitoramentoSinalGpon, MonitoramentoQuedasGpon, TrapMassivoGpon, PerformanceGpon, RelatoriosGpon, GestaoParametrosGpon, AuditoriaGpon };

export const AuditoriaGponPlaceholder = () => (
  <GponDocPage title="Auditoria" subtitle="Registro e rastreabilidade das ações realizadas na plataforma." icon={ScrollText} />
);
