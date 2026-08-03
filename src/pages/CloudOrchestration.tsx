import {
  Cloud,
  LayoutDashboard,
  ShieldCheck,
  Settings,
  Lock,
  Monitor,
  GitBranch,
  Layers,
  ScaleIcon,
  Database,
  Building2,
  ClipboardList,
  Lightbulb,
  PlugZap,
  Server,
  Network,
  HardDrive,
  FileStack,
  Cpu,
  Workflow,
  CheckSquare,
  BarChart3,
  Palette,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const docTopics = [
  { title: "Dashboard", icon: LayoutDashboard, description: "Visão geral centralizada do ambiente com métricas e status em tempo real." },
  { title: "Administração", icon: ShieldCheck, description: "Gerenciamento de usuários, permissões e controles administrativos da plataforma." },
  { title: "Configuração", icon: Settings, description: "Configurações gerais da plataforma e ajustes de comportamento do ambiente." },
  { title: "Segurança", icon: Lock, description: "Políticas de segurança, controle de acesso e proteção dos recursos em nuvem." },
  { title: "Máquinas Virtuais", icon: Monitor, description: "Criação, gerenciamento e monitoramento de máquinas virtuais no ambiente." },
  { title: "Orquestrador", icon: GitBranch, description: "Orquestração e automação de workloads e serviços na infraestrutura." },
  { title: "Clusters", icon: Layers, description: "Gerenciamento de clusters de alta disponibilidade e distribuição de recursos." },
  { title: "Scaling Groups", icon: ScaleIcon, description: "Configuração de grupos de escalonamento automático conforme demanda." },
  { title: "Banco de Dados", icon: Database, description: "Provisionamento e administração de instâncias de banco de dados gerenciados." },
  { title: "Virtual Datacenters", icon: Building2, description: "Criação e gerenciamento de datacenters virtuais isolados e seguros." },
  
  { title: "Ordem de Serviço", icon: ClipboardList, description: "Acompanhamento e gestão de ordens de serviço e tickets de suporte." },
  { title: "Recomendações", icon: Lightbulb, description: "Sugestões inteligentes para otimização de recursos, custos e performance." },
  { title: "Account Providers", icon: PlugZap, description: "Integração e gestão de provedores de conta e credenciais externas." },
  { title: "Hosts", icon: Server, description: "Monitoramento e administração de hosts físicos da infraestrutura." },
  { title: "Rede", icon: Network, description: "Configuração de redes virtuais, VLANs, firewalls e conectividade." },
  { title: "Storages", icon: HardDrive, description: "Gerenciamento de volumes de armazenamento, pools e políticas de storage." },
  { title: "Templates", icon: FileStack, description: "Criação e gerenciamento de templates de máquinas virtuais e ambientes." },
  { title: "Flavors", icon: Cpu, description: "Definição de perfis de hardware (CPU, memória, disco) para instâncias." },
  { title: "Workflows", icon: Workflow, description: "Automação de processos e fluxos de trabalho na orquestração de recursos." },
  { title: "Tarefas", icon: CheckSquare, description: "Monitoramento e acompanhamento de tarefas agendadas e em execução." },
  { title: "Inventário de Recursos", icon: BarChart3, description: "Visão consolidada de todos os recursos provisionados no ambiente." },
  { title: "Cores e Personalização", icon: Palette, description: "Customização visual da plataforma com temas, cores e identidade visual." },
];

export default function CloudOrchestration() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Cloud className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("cloudOrchestration.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("cloudOrchestration.subtitle")}</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {docTopics.map(({ title, icon: Icon, description }) => (
          <div
            key={title}
            className="rounded-lg border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
