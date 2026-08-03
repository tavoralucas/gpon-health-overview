import { ArrowLeft, Sliders, CheckCircle2, Server, TrendingDown, BarChart3, FileSpreadsheet, Activity, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const columns = [
  { name: "Name", description: "Nome do recurso" },
  { name: "Performance", description: "Ícone com símbolo de asterisco (*) para análise de performance" },
  { name: "Flavor", description: "Flavor atual da máquina" },
  { name: "Current Cost", description: "Custo atual da máquina" },
  { name: "Suggested Flavor", description: "Flavor sugerido pela aplicação" },
  { name: "Suggested Pricing", description: "Preço estimado do novo Flavor" }
];

const steps = [
  {
    step: 1,
    title: "Selecionar a nuvem (container)",
    description: "Selecionar a nuvem (container) que deseja analisar."
  },
  {
    step: 2,
    title: "Escolher a região",
    description: "Escolher a região que roda a Virtual Machine selecionada."
  },
  {
    step: 3,
    title: "Visualizar resultados",
    description: "O resultado da seleção é exibido como lista de todas as Virtual Machines com sugestões."
  },
  {
    step: 4,
    title: "Exportar relatório",
    description: "Exportar o relatório para visualização em planilha Excel no formato .csv."
  },
  {
    step: 5,
    title: "Analisar performance",
    description: "Analisar as informações de performance clicando no ícone de asterisco (*) na coluna Performance."
  },
  {
    step: 6,
    title: "Visualizar gráfico de performance",
    description: "O relatório de performance exibe o gráfico com a média do consumo de CPU e memória num período de 15 a 20 dias."
  }
];

export default function RightsizingFinops() {
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
          <Sliders className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('finops360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Rightsizing</h1>
          <p className="mt-1 text-muted-foreground">
            Recomendações inteligentes para ajuste de tamanho de instâncias.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Server className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Virtual Machines</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          No menu Virtual Machines são apresentadas todas as máquinas virtuais da infraestrutura do usuário 
          (ou seja, o inventário de todas as máquinas virtuais 'VMs' das contas pertencentes à organização).
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Esta exibição permite a seleção do container específico para a análise de custos e sugestão de mudança 
          de flavor na mesma cloud das máquinas virtuais listadas. Todas as informações apresentadas podem ser 
          exportadas em relatório formato .csv.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/020_virtual_machines.png" 
            alt="Virtual Machines" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Virtual Machines</p>
        </div>
      </section>

      {/* Menu Virtual Machines */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Menu de Funcionalidades</h2>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/019_submenu_funcionalidades.png" 
              alt="Submenu funcionalidades" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Submenu de funcionalidades</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/021_menu_virtual_machines.png" 
              alt="Menu Virtual Machines" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Menu Virtual Machines</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          É relevante ressaltar que o container apontado deve estar contido no uCloud, ou seja, o container 
          a ser analisado deve estar conectado e sincronizado na plataforma uCloud.
        </p>
      </section>

      {/* Seleção de Container */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <TrendingDown className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Seleção de Container</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Após selecionar o container, as informações são apresentadas em colunas:
        </p>
        <div className="grid gap-3 sm:grid-cols-2 mb-4">
          {columns.map(({ name, description }) => (
            <div key={name} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <code className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium shrink-0">
                {name}
              </code>
              <span className="text-sm text-muted-foreground">{description}</span>
            </div>
          ))}
        </div>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/022_selecionar_container.png" 
            alt="Selecionar Container" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Seleção de container para análise</p>
        </div>
      </section>

      {/* Informações do Container */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Informações do Container</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          As sugestões exibidas (Rightsizing) são baseadas no consumo de CPU das máquinas virtuais, do período 
          que ela foi criada até o presente momento. As métricas são coletadas e o cálculo é baseado nas médias 
          de consumo, logo em seguida, a sugestão é apresentada.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A análise do consumo de memória pode fazer parte do cálculo, caso o provedor ou as instâncias estejam 
          prontas para fornecer as métricas necessárias. Caso a informação não esteja disponível é assumida a 
          memória definida pelo flavor da instância deployada.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/023_informacoes_container.png" 
            alt="Informações do Container" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Informações detalhadas do container</p>
        </div>
      </section>

      {/* Rightsizing - Sugestão de Flavor */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Rightsizing - Sugestão de Mudança de Flavor</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Para receber o resultado de sugestão de mudança de Flavor, o usuário deve selecionar o container desejado. 
          A aplicação uSavings gera a listagem e o comparativo de preços. Basta clicar e aguardar.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/finops360/024_container_selecionado.png" 
            alt="Container selecionado" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Container selecionado para análise</p>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Como resultado, é exibido em blocos as diversas informações, como: o Flavor e o Custo atual, a sugestão 
          de Flavor e o custo estimado deste novo Flavor. Por último, exibe o custo da reserva do Flavor sugerido 
          e estimado para 1 ano.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/025_resultado_estimado_selecao.png" 
            alt="Resultado estimado" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Resultado estimado da seleção</p>
        </div>
      </section>

      {/* Caso de Uso */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Caso de Uso - Passo a Passo</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          As máquinas virtuais listadas são provenientes da plataforma do uCloud, portanto, as nuvens conectadas 
          no uCloud devem conter as máquinas virtuais.
        </p>
        <div className="space-y-4">
          {steps.map(({ step, title, description }) => (
            <div key={step} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Imagens do Caso de Uso */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Ilustrações do Processo</h2>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/026_selecionar_nuvem_vm.png" 
              alt="Selecionar nuvem" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">1º Passo: Selecionar a nuvem</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/027_selecionar_regiao_vm.png" 
              alt="Selecionar região" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">2º Passo: Escolher a região</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/029_coluna_performance.png" 
              alt="Coluna Performance" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">5º Passo: Coluna Performance</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/030_performance_maquinas.png" 
              alt="Performance das máquinas" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">6º Passo: Gráfico de Performance</p>
          </div>
        </div>
      </section>

      {/* Exportação */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Download className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Exportação de Relatório</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Na tela de resultados, no canto superior direito, é permitido exportar a lista de resultado em formato 
          .csv clicando no botão <strong>Export .csv</strong>.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/028_relatorio_exportado_excel.png" 
            alt="Relatório exportado" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Relatório exportado para Excel</p>
        </div>
      </section>

      {/* Performance */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Análise de Performance</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O relatório de performance proporciona a visualização do gráfico com a média do consumo de CPU e da 
          memória da virtual máquina selecionada, num período de aproximadamente 15 a 20 dias.
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Consumo médio de CPU</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Consumo médio de memória</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Período de análise: 15 a 20 dias</span>
          </li>
        </ul>
      </section>

      {/* Dica */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Dica</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              As sugestões de Rightsizing são baseadas no consumo real das máquinas. Quanto mais tempo de coleta 
              de dados, mais precisas serão as recomendações. Analise o relatório de performance antes de aplicar 
              as sugestões.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
