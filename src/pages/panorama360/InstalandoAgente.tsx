import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, Download, CheckCircle2, Terminal, Server, Settings, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const systemRequirements = [
  { os: "Linux", requirement: "Kernel 2.6.32 ou posterior", architectures: "AMD64, ARM64" },
  { os: "Windows", requirement: "Server 2016+ ou Windows 10+", architectures: "AMD64" },
  { os: "Mac OS", requirement: "macOS 10.13 ou posterior", architectures: "AMD64 (Intel), ARM64 (Apple Silicon)" },
  { os: "FreeBSD", requirement: "FreeBSD 10 ou posterior", architectures: "AMD64" }
];

const debianSteps = [
  {
    title: "Configurar repositório",
    code: `sudo mkdir -p /etc/apt/keyrings/
wget -q -O - https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com/ stable main" | sudo tee /etc/apt/sources.list.d/grafana.list`
  },
  {
    title: "Atualizar repositórios",
    code: "sudo apt-get update"
  },
  {
    title: "Instalar o Agente PMC P360",
    code: "sudo apt-get install grafana-agent"
  }
];

const rhelSteps = [
  {
    title: "Importar a chave GPG",
    code: `wget -q -O gpg.key https://rpm.grafana.com/gpg.key
sudo rpm --import gpg.key`
  },
  {
    title: "Criar arquivo de repositório",
    code: `# Criar /etc/yum.repos.d/grafana.repo com:
[grafana]
name=grafana
baseurl=https://rpm.grafana.com
repo_gpgcheck=1
enabled=1
gpgcheck=1
gpgkey=https://rpm.grafana.com/gpg.key`
  },
  {
    title: "Instalar o Agente PMC P360",
    code: "sudo dnf install grafana-agent"
  }
];

const configVariables = [
  { variable: "$VM_NAME", description: "Nome da máquina virtual ou do host onde o agente está sendo executado. Usada como rótulo para identificar métricas e logs." },
  { variable: "$TENANT", description: "Identificador do tenant ou organização no PMC P360. Usado para separar dados entre diferentes clientes ou grupos." },
  { variable: "SENHABANCO", description: "Senha do usuário do banco de dados MySQL que será monitorado pelo mysqld_exporter." }
];

const serviceCommands = [
  { action: "Recarregar daemon", command: "sudo systemctl daemon-reload" },
  { action: "Iniciar o agente", command: "sudo systemctl start grafana-agent" },
  { action: "Verificar status", command: "sudo systemctl status grafana-agent" },
  { action: "Habilitar na inicialização", command: "sudo systemctl enable grafana-agent.service" },
  { action: "Visualizar logs", command: "sudo journalctl -u grafana-agent" }
];

export default function InstalandoAgente() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/panorama-360")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('panorama360.title') })}
      </button>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <Download className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Instalando e configurando o Agente</h1>
          <p className="mt-1 text-muted-foreground">
            Guia de instalação e configuração do agente de monitoramento.
          </p>
        </div>
      </div>

      {/* Requisitos do Sistema */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Requisitos do Sistema</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-semibold text-foreground">Sistema Operacional</th>
                <th className="text-left py-2 font-semibold text-foreground">Versão Mínima</th>
                <th className="text-left py-2 font-semibold text-foreground">Arquiteturas</th>
              </tr>
            </thead>
            <tbody>
              {systemRequirements.map(({ os, requirement, architectures }) => (
                <tr key={os} className="border-b border-border/50">
                  <td className="py-2 font-medium text-foreground">{os}</td>
                  <td className="py-2 text-muted-foreground">{requirement}</td>
                  <td className="py-2 text-muted-foreground">{architectures}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Instalação Debian/Ubuntu */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Terminal className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Instalação no Debian ou Ubuntu</h2>
        </div>
        <div className="space-y-4">
          {debianSteps.map((step, index) => (
            <div key={index}>
              <h3 className="font-medium text-foreground mb-2">{index + 1}. {step.title}</h3>
              <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs">
                <code>{step.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* Instalação RHEL/Fedora */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Server className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Instalação no RHEL ou Fedora</h2>
        </div>
        <div className="space-y-4">
          {rhelSteps.map((step, index) => (
            <div key={index}>
              <h3 className="font-medium text-foreground mb-2">{index + 1}. {step.title}</h3>
              <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs">
                <code>{step.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* Variáveis de Configuração */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Variáveis de Configuração</h2>
        </div>
        <p className="text-muted-foreground mb-4 text-sm">
          As seguintes variáveis devem ser definidas no arquivo de configuração:
        </p>
        <div className="space-y-3">
          {configVariables.map(({ variable, description }) => (
            <div key={variable} className="flex items-start gap-3 border-l-2 border-primary/20 pl-4">
              <code className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium shrink-0">
                {variable}
              </code>
              <span className="text-sm text-muted-foreground">{description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Comandos de Serviço */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Play className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Comandos de Serviço</h2>
        </div>
        <div className="space-y-3">
          {serviceCommands.map(({ action, command }) => (
            <div key={action} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-foreground font-medium">{action}</span>
              <code className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                {command}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* Arquivo de Configuração */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Arquivo de Configuração</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          O arquivo de configuração padrão está localizado em <code className="bg-muted px-2 py-0.5 rounded">/etc/grafana-agent.yaml</code>. 
          Edite-o com seu editor preferido:
        </p>
        <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs">
          <code>nano /etc/grafana-agent.yaml</code>
        </pre>
      </section>

      {/* Windows */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Instalação no Windows</h2>
        <div className="space-y-3">
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">1. Criar pastas necessárias</h3>
            <p className="text-sm text-muted-foreground">
              O disco C deve conter as pastas: <code className="bg-muted px-1 rounded">Grafana Agent</code> e <code className="bg-muted px-1 rounded">bookmark</code>
            </p>
          </div>
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">2. Criar arquivo de configuração</h3>
            <p className="text-sm text-muted-foreground">
              Criar o arquivo <code className="bg-muted px-1 rounded">config-agent.yaml</code> em <code className="bg-muted px-1 rounded">C:\Program Files\</code>
            </p>
          </div>
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">3. Baixar e instalar o agente</h3>
            <p className="text-sm text-muted-foreground">
              Baixar o instalador de: <code className="bg-muted px-1 rounded text-xs">https://github.com/grafana/agent/releases</code>
            </p>
          </div>
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">4. Verificar métricas</h3>
            <p className="text-sm text-muted-foreground">
              Acessar <code className="bg-muted px-1 rounded">http://127.0.0.1:12345/metrics</code> para verificar se as métricas estão sendo expostas.
            </p>
          </div>
        </div>
      </section>

      {/* Dica */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Importante</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              Após a instalação, é necessário alterar o usuário que inicializa o Agente PMC P360 para 'root'. 
              Aguarde alguns minutos após a inicialização para começar a visualizar as informações nos dashboards.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

