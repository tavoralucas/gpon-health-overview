import { ArrowLeft, Lightbulb, CheckCircle2, Server, AlertTriangle, TrendingDown, Search, Cloud, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const features = [
  {
    title: "Identificação de Recursos Ociosos",
    icon: Search,
    description: "Monitora e identifica recursos computacionais que foram criados mas não estão sendo utilizados."
  },
  {
    title: "Sugestões de Economia",
    icon: TrendingDown,
    description: "Apresenta recomendações para reduzir custos com recursos não utilizados ou subutilizados."
  },
  {
    title: "Análise por Container",
    icon: Server,
    description: "Permite selecionar containers específicos para análise detalhada de recursos ociosos."
  },
  {
    title: "Comparação de Providers",
    icon: Cloud,
    description: "Sugere qual provedor de nuvem oferece o melhor custo-benefício para cada tipo de workload."
  }
];

const steps = [
  {
    step: 1,
    title: "Acessar Container Hint",
    description: "No menu lateral, clicar em 'Container Hint' para acessar a funcionalidade de dicas de container."
  },
  {
    step: 2,
    title: "Selecionar o tipo de nuvem",
    description: "Escolher o tipo de nuvem (AWS, Azure, Google, etc.) que deseja analisar."
  },
  {
    step: 3,
    title: "Selecionar o container",
    description: "Selecionar o container específico para verificação de recursos ociosos."
  },
  {
    step: 4,
    title: "Visualizar recursos não utilizados",
    description: "Analisar a lista de recursos criados que não estão sendo utilizados e as sugestões de economia."
  }
];

const resourceTypes = [
  { name: "Disks não anexados", description: "Discos de armazenamento criados mas não anexados a nenhuma instância" },
  { name: "Snapshots antigos", description: "Snapshots de backup que podem ser removidos após período de retenção" },
  { name: "IPs não associados", description: "Endereços IP públicos alocados mas não associados a instâncias ativas" },
  { name: "Load Balancers vazios", description: "Balanceadores de carga sem instâncias registradas" },
  { name: "Security Groups sem uso", description: "Grupos de segurança não utilizados por nenhuma instância" }
];

export default function ProviderHint() {
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
          <Lightbulb className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('finops360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Provider Hint</h1>
          <p className="mt-1 text-muted-foreground">
            Dicas e sugestões automáticas de provedores com melhor custo-benefício.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre o Container Hint</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A vantagem da implantação do uSavings nas organizações é a possibilidade de receber informação sobre 
          recursos ociosos que foram criados, e até, executados anteriormente, atualmente não utilizados. 
          Informação que pode possibilitar a economia de recursos.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          A funcionalidade <strong>Container Hint</strong> permite identificar e monitorar recursos que estão 
          gerando custos sem estarem em uso efetivo, oferecendo sugestões de ações para redução de custos.
        </p>
      </section>

      {/* Menu Container Hint */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Tela Inicial</h2>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/finops360/068_container_hint.png" 
            alt="Container Hint" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela inicial do Container Hint</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Na tela inicial do Container Hint, você pode selecionar o tipo de nuvem e o container para análise 
          de recursos não utilizados.
        </p>
      </section>

      {/* Funcionalidades */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Funcionalidades</h2>
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

      {/* Passo a Passo */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Passo a Passo</h2>
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

      {/* Seleção de Container */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Server className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Seleção de Tipo de Nuvem</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Na primeira etapa, selecione o tipo de nuvem (provedor) que deseja analisar. Após a seleção, 
          escolha o container específico para verificação de recursos ociosos.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/069_selecao_tipo_nuvem_container.png" 
            alt="Seleção tipo nuvem container" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Seleção do tipo de nuvem e container</p>
        </div>
      </section>

      {/* Recursos Não Utilizados */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <AlertTriangle className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Recursos Não Utilizados</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Após selecionar o container, a plataforma exibe uma lista de recursos que foram criados mas não 
          estão sendo utilizados atualmente. Estes recursos representam custos que podem ser eliminados.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/finops360/070_tela_recursos_nao_utilizados.png" 
            alt="Recursos não utilizados" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de recursos não utilizados</p>
        </div>
      </section>

      {/* Tipos de Recursos */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Tipos de Recursos Monitorados</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          O Container Hint monitora diversos tipos de recursos que podem estar ociosos:
        </p>
        <div className="space-y-3">
          {resourceTypes.map(({ name, description }) => (
            <div key={name} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
              <div>
                <span className="font-medium text-foreground text-sm">{name}</span>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Como Economizar */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <TrendingDown className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Como Economizar Recursos</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Pelo fato da aplicação do uSavings ser uma ferramenta que analisa em tempo real o consumo da 
          infraestrutura dos recursos computacionais nas diferentes nuvens, a aplicação uSavings exibe 
          os recursos ociosos criados.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A ferramenta é relevante para a tomada de decisão nas organizações, pois ao analisar a informação 
          obtida pela aplicação entrega resultados reais. Isto contribui para uma decisão organizacional 
          capaz de gerar economia financeira e otimização dos recursos criados e/ou executados.
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Identificar e remover discos não anexados</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Liberar IPs públicos não utilizados</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Remover snapshots antigos após período de retenção</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Desativar Load Balancers sem instâncias</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Limpar Security Groups não utilizados</span>
          </li>
        </ul>
      </section>

      {/* Nota Importante */}
      <section className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">Atenção</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
              A aplicação uSavings pode referenciar sugestões de redução da configuração – 'rightsizing' de máquinas 
              virtuais, caso tenham sido previamente criadas com 'super configurações' e/ou apresentarem um baixo 
              consumo no histórico de performance. <strong>Direciona</strong> a possibilidade de ampliar a relação 
              custo-consumo, <strong>não a executa</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Dica */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Dica</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              Execute a análise de Container Hint regularmente para identificar recursos ociosos que possam estar 
              gerando custos desnecessários. Mantenha uma rotina de limpeza de recursos não utilizados para 
              otimizar seus gastos com nuvem.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
