import { ArrowLeft, Globe, CheckCircle2, Settings, BarChart3, Cpu, HardDrive, Info, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const features = [
  {
    title: "Orquestração de Containers",
    icon: Settings,
    description: "Permite a orquestração, a implantação e a operacionalização de containers dentro de um ou mais clusters."
  },
  {
    title: "Multicloud Híbrido",
    icon: Globe,
    description: "Opera em modelo multicloud híbrido, permitindo total controle, suporte para backup, replicação e migração."
  },
  {
    title: "Monitoramento de Custos",
    icon: BarChart3,
    description: "Acompanhe a evolução do custo da infraestrutura computacional que suporta suas aplicações."
  },
  {
    title: "Métricas em Tempo Real",
    icon: Cpu,
    description: "Visualize o uso de CPU em MiliCores e memória em MegaBytes de cada recurso Kubernetes."
  }
];

const menuItems = [
  { name: "Workloads", description: "Deployments, Daemonsets, Horizontal Autoscaler, StatefulSets e Updates" },
  { name: "Catálogo", description: "Criação de aplicações via formulários ou YAML" },
  { name: "ConfigMap", description: "Conjunto de pares chave-valor para armazenamento de configurações" },
  { name: "Cluster Events", description: "Eventos do cluster Kubernetes" },
  { name: "CronJobs", description: "Tarefas agendadas automaticamente" },
  { name: "Jobs", description: "Execução de tarefas únicas" },
  { name: "Faturamento", description: "Custos e consumo de recursos" },
  { name: "Recomendações", description: "Sugestões de otimização" },
  { name: "Permissões", description: "Controle de acesso" },
  { name: "Integrações", description: "Conexões com sistemas externos" }
];

export default function VisaoGeralMangue() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/mangue")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('mangue.title') })}
      </button>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <Globe className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('mangue.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t("common.overview")}</h1>
          <p className="mt-1 text-muted-foreground">
            Plataforma de gestão de ambientes de múltiplos orquestradores de container.
          </p>
        </div>
      </div>

      {/* Logo e Apresentação */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-600 shrink-0">
            <Leaf className="h-10 w-10 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Mangue.io</h2>
            <p className="text-sm text-muted-foreground">Soluções em tecnologia da informação que viabilizam implementar uma arquitetura computacional escalável, sólida e confiável em nuvem híbrida.</p>
          </div>
        </div>
      </section>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Introdução</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O Mangue.io é uma plataforma de gestão de ambientes de múltiplos orquestradores de container, que permite 
          a orquestração, a implantação (localização e agendamento) e a operacionalização (execução) de containers 
          de aplicações dentro de um ou mais <strong>clusters</strong> computacionais (público ou privado) ou entre eles.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A plataforma opera em um modelo de <strong>multicloud híbrido</strong> e, dessa forma, permite às organizações 
          total controle, suporte para a sustentação de cópias de segurança (backup), replicação e migração de ambientes.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Centrado em uma abordagem ágil, segura e produtiva de entrega contínua de aplicações direcionadas à implantação, 
          aos testes e às atualizações com <strong>downtime zero</strong> e <strong>rollback</strong> de deployments.
        </p>
      </section>

      {/* Funcionalidades Principais */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Funcionalidades Principais</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map(({ title, icon: Icon, description }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Acesso à Plataforma */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Acesso à Plataforma</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O acesso à plataforma é feito através de um site, o usuário deve utilizar um navegador de Internet. 
          Após inserir o endereço da URL/link ele visualiza a tela inicial de apresentação.
        </p>
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <p className="text-sm font-mono text-muted-foreground">
            https://&lt;mangueserver_IP_Address&gt;:80<br/>
            https://mangue_Server_Name.com/
          </p>
        </div>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/001_mangue_login.png" 
            alt="Tela de login do Mangue" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela de login do Mangue.io</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          As credenciais para o login e senha são as mesmas da plataforma uCloud, com a qual a plataforma do 
          Mangue.io está integrada. Todo usuário provisionado no uCloud pode, automaticamente, usar suas 
          credenciais para ter acesso ao Mangue.io.
        </p>
      </section>

      {/* Tela Inicial */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Tela Inicial</h2>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/002_mangue_tela_inicial.png" 
            alt="Tela inicial do Mangue" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela inicial após login</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Após entrar com as credenciais válidas, esta tela é apresentada caso exista um cluster associado 
          ao contrato do usuário no Mangue.io.
        </p>
      </section>

      {/* Configurações de Navegação */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Configurações de Navegação</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          No canto superior direito da plataforma existe um menu de configuração identificado por uma engrenagem. 
          Nele o usuário tem a opção de selecionar qual <strong>contrato</strong>, <strong>cluster</strong> e/ou 
          em qual <strong>namespace</strong> (áreas de trabalho) deseja ter acesso.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/003_mangue_aba_selecao.png" 
            alt="Aba de seleção" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Menu de seleção de contrato, cluster e namespace</p>
        </div>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Ao selecionar um contrato, as opções de clusters são atualizadas</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Os contratos listados são apenas os que já possuem algum cluster integrado</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Ao clicar em qualquer campo, as informações da tela mudam automaticamente</span>
          </li>
        </ul>
      </section>

      {/* Preço Mensal do Cluster */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Gráfico do Preço Mensal do Cluster</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Este gráfico de barras apresenta a evolução do custo referente ao uso da infraestrutura computacional 
          que suporta e executa as aplicações.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/004_mangue_preco_mensal_cluster.png" 
            alt="Preço mensal do cluster" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Gráfico de evolução do custo do cluster</p>
        </div>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">No eixo vertical: valor em moeda</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">No eixo horizontal: consumo dia a dia</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Intervalos: últimos 7 dias, 30 dias, mês corrente, mês anterior ou personalizado</span>
          </li>
        </ul>
      </section>

      {/* Cálculo do Valor */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Cálculo do Valor do Consumo</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Os valores são calculados com base no valor/hora de vCPU e Memória RAM armazenado na base de dados do Mangue.io.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/005.1_mangue_formula.png" 
            alt="Fórmula de cálculo" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Visualização do preço do contrato</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>A plataforma armazena o consumo de recursos (CPU e Memória) das aplicações a cada minuto</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Ao término de uma hora (60 min), armazena o valor total do consumo</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Ao final de cada dia (24 horas), armazena o valor referente ao consumo diário</span>
          </li>
        </ul>
      </section>

      {/* Uso de CPU e Memória */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Cpu className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Gráficos de Uso de CPU e Memória</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          É possível visualizar o uso de CPU, em MiliCores, de cada recurso Kubernetes. O usuário deve 
          especificar o namespace e os recursos que deseja visualizar, e clicar no ícone de busca.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/006_mangue_uso_total_cpu.png" 
              alt="Uso total de CPU" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Gráfico de uso de CPU</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/007_mangue_uso_total_memoria.png" 
              alt="Uso total de memória" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Gráfico de uso de memória</p>
          </div>
        </div>
      </section>

      {/* Menu do Usuário */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Menu do Usuário</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A barra de menu do usuário fica localizada à esquerda da tela e é apresentada no modo expandido.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/008_mangue_menu_usuario_expandido.png" 
            alt="Menu do usuário expandido" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Menu lateral do Mangue.io</p>
        </div>
        <div className="space-y-2">
          {menuItems.map(({ name, description }) => (
            <div key={name} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
              <div>
                <span className="font-medium text-foreground text-sm">{name}</span>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nota Importante */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Integração com uCloud</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              A plataforma do Mangue.io suporta a implantação e operacionalização de aplicações baseadas em 
              imagens a partir de um serviço de registro. Permite também a criação de serviços para as 
              aplicações (internos ou externos ao cluster).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
