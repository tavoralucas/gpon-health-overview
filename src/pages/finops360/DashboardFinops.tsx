import { ArrowLeft, LayoutDashboard, CheckCircle2, TrendingUp, DollarSign, PieChart, BarChart3, Settings, Globe, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const menuIcons = [
  {
    title: "Ícone de Troca de Contrato",
    description: "Permite trocar entre contratos. Um usuário pode fazer parte de mais de um grupo e contrato, podendo selecionar outro contrato com diferentes recursos atrelados."
  },
  {
    title: "Ícone de Configuração de Clouds",
    description: "Permite criar, alterar e gerenciar Clouds. O termo 'Clouds' é empregado para abstrair um agrupamento de Flavors de uma determinada Cloud, tanto reais quanto imaginários."
  },
  {
    title: "Ícone Lista de Troca de Idiomas",
    description: "Permite trocar o idioma da plataforma entre Português, Espanhol e Inglês."
  },
  {
    title: "Ícone Nome do Usuário Logado",
    description: "Apresenta o nome do usuário que está logado na plataforma uSavings."
  },
  {
    title: "Ícone de LogOut",
    description: "Desloga o usuário da plataforma."
  }
];

const dashboardCards = [
  {
    title: "Latest Months",
    icon: TrendingUp,
    description: "Apresenta a bilhetagem ocorrida no período relacionado aos últimos seis (6) meses. Lista todos os valores investidos em determinada conta por período."
  },
  {
    title: "Consolidated Cost",
    icon: DollarSign,
    description: "Exibe sugestões relacionadas ao que a máquina virtual 'VM' selecionada contém. Mostra o Flavor, regiões habilitadas, percentual de economia, diferença de custo, custo corrente e custo otimizado."
  },
  {
    title: "Actual Flavor",
    icon: PieChart,
    description: "Apresenta o Flavor das máquinas selecionadas do container. A exibição das porcentagens utilizadas pelo Flavor é apresentada pelo gráfico de pizza por tipo."
  },
  {
    title: "Suggested Flavors",
    icon: BarChart3,
    description: "Demonstra quanto seria a diferença a partir da sugestão de economia referenciada. A coluna azul representa o gasto atual, a coluna verde sugere a economia possível."
  }
];

export default function DashboardFinops() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/finops-360")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('finops360.title') })}
      </button>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <LayoutDashboard className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('finops360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t("finops360.dashboard")}</h1>
          <p className="mt-1 text-muted-foreground">
            Painel de controle com métricas de custos e oportunidades de otimização.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Painel de Controle (Dashboard)</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A interface inicial do uSavings exibida ao usuário é um painel de controle (Dashboard) que exibe um resumo 
          da atual infraestrutura, endereçável e acessível por meio da plataforma do uCloud. Ao efetuar o acesso à 
          interface do uSavings, o usuário se conecta automaticamente com a sua atual infraestrutura de máquina virtual 'VMs'.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/009_menu_entrada_dashboard.png" 
            alt="Menu de entrada do Dashboard" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Menu de entrada do Dashboard</p>
        </div>
      </section>

      {/* Menu Superior */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Menu Superior</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Antes de adentrar no Dashboard, é relevante entender o impacto de algumas ferramentas existentes no menu superior:
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/finops360/005_recorte_menu_superior.png" 
            alt="Menu superior do uSavings" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Componentes do menu superior</p>
        </div>
        <div className="space-y-3">
          {menuIcons.map(({ title, description }) => (
            <div key={title} className="border-l-2 border-primary/20 pl-4">
              <h3 className="font-medium text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Troca de Contrato */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <RefreshCw className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Troca de Contrato</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O ícone de troca de contrato apresenta todos os contratos nos quais o usuário logado na plataforma uSavings 
          participa. Assim, é permitido ao usuário trocar entre eles livremente. A troca de contrato pode implicar na 
          troca dos recursos que são apresentados ao usuário, pois cada contrato pode ter uma determinada característica.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/006_troca_contrato.png" 
              alt="Troca de contrato" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Seleção de contrato</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/007_configuracoes_clouds.png" 
              alt="Configurações de Clouds" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Configurações de Clouds</p>
          </div>
        </div>
      </section>

      {/* Cards do Dashboard */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Cards do Dashboard</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          O Dashboard exibe dados compostos por segmentações denominadas Cards. Na primeira parte da tela inicial, 
          são espelhados somente os serviços de nuvem que a organização possui na plataforma do uCloud e autoriza a integração.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/finops360/010_tela_inicial_dashboard_funcionalidades.png" 
            alt="Funcionalidades do Dashboard" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela inicial do Dashboard com funcionalidades</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {dashboardCards.map(({ title, icon: Icon, description }) => (
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

      {/* Latest Months */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Latest Months (Últimos Meses)</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O card Latest Months apresenta a bilhetagem ocorrida no período relacionado aos últimos seis (6) meses. 
          O valor é coletado a partir de valores gerados pelo job do uSavings, responsável por sumarizar o Billing 
          da plataforma do uCloud.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/012_latest_months.png" 
              alt="Latest Months" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Card Latest Months</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/013_grafico_investimentos_real_versus_meses.png" 
              alt="Gráfico de investimentos" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Gráfico de custos vs meses</p>
          </div>
        </div>
      </section>

      {/* Consolidated Cost */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Consolidated Cost (Custos Consolidados)</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O card Consolidated Cost exibe sugestões relacionadas ao que a máquina virtual "VM" selecionada contém. 
          Mostra o Flavor e as regiões habilitadas para a máquina. A reunião destas informações permite sugerir 
          melhorias para otimizar o uso. Todos os valores são apresentados em dólar.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O percentual de economia (Saving) representa o percentual que a aplicação uSavings entrega como resultado, 
          baseado na sugestão de mudança de Flavor dentro da própria nuvem.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/014_custos_consolidados.png" 
            alt="Custos Consolidados" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Card de Custos Consolidados com percentual de economia</p>
        </div>
      </section>

      {/* Actual Flavors */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <PieChart className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Actual Flavors</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Este card apresenta o Flavor das máquinas selecionadas do container. A exibição das porcentagens 
          utilizadas pelo Flavor é apresentada pelo gráfico de pizza e sua representatividade ocorre por tipo, 
          no conjunto total da infraestrutura.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Todos os valores são exibidos em dólar, sem tributação de impostos. Os preços têm origem na tabela 
          importada diretamente do provedor de nuvem e inserida no banco de dados desta aplicação. O preço é 
          calculado a partir da quantidade de horas que compõem o mês.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/015_grafico_actual_flavors.png" 
            alt="Gráfico Actual Flavors" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Gráfico de Flavors atuais por tipo</p>
        </div>
      </section>

      {/* Suggested Flavors */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Suggested Flavors</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Este card apresenta um gráfico de colunas que demonstra quanto seria a diferença a partir da sugestão 
          de economia referenciada. A coluna azul representa o gasto atual, a coluna verde sugere a economia que 
          pode ser gerada no caso da aplicação das sugestões de melhoria de consumo dos recursos.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/finops360/016_sugested_flavors.png" 
            alt="Suggested Flavors" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Gráfico de Flavors sugeridos vs atual</p>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Os gráficos e as informações apresentadas são uma análise inicial da economia potencial dos valores que 
          a organização pode se beneficiar ao adotar as recomendações sugeridas pela plataforma uSavings. O resultado 
          desta análise é a sugestão da melhor combinação de CPU e memória (rightsizing).
        </p>
      </section>

      {/* Análise Final */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Análise de Economia</h2>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/017_tela_entrada_dashboard_1.2.png" 
              alt="Dashboard análise 1" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Análise de economia - Visão 1</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/018_tela_entrada_dashboard_2.2.png" 
              alt="Dashboard análise 2" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Análise de economia - Visão 2</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Esta análise inicial é calculada com base no uso, ou seja, na ocupação dos recursos computacionais das 
          máquinas virtuais 'VMs' dentro do período armazenado na base de dados da plataforma uSavings. Os valores 
          apresentados se referem ao período da coleta de dados (o intervalo mínimo inicial é de quinze dias).
        </p>
      </section>

      {/* Dica */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Dica</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              Quanto mais longo for o tempo da coleta de informações, mais confiável é a estimativa da economia calculada. 
              O Dashboard permite a visualização rápida sobre cada uma das nuvens conectadas ao uCloud.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
