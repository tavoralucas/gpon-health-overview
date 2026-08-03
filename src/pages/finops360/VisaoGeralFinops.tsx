import { ArrowLeft, PieChart, CheckCircle2, Target, TrendingDown, Server, Clock, DollarSign, Globe, Key, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const features = [
  {
    title: "Rightsizing",
    icon: TrendingDown,
    description: "Sugestão da melhor combinação de CPU e memória, com o objetivo de minimizar os custos e maximizar o desempenho. A ferramenta coleta métricas de desempenho para determinar o consumo médio e máximo de recursos."
  },
  {
    title: "Custos Comparativos",
    icon: DollarSign,
    description: "Apresenta ao usuário a relação atual das suas máquinas virtuais 'VMs' e uma sugestão do que seria a 'melhor configuração' em cada provedor de nuvem."
  },
  {
    title: "Monitoramento de Recursos Ociosos",
    icon: Server,
    description: "Permite checar se os recursos estão em uso. É possível monitorar os recursos criados e não utilizados."
  },
  {
    title: "Instâncias Reservadas",
    icon: Clock,
    description: "Mostra ao cliente-usuário que no caso da alteração de uma máquina on-demand para uma máquina reservada, o quanto é possível economizar em relação à atual máquina."
  }
];

const benefits = [
  "Análise em tempo real do consumo da infraestrutura dos recursos computacionais",
  "Recomendações de modificações para máxima economia financeira",
  "Otimização dos recursos criados e/ou executados",
  "Integração completa com a plataforma uCloud",
  "Suporte aos principais provedores: AWS, Azure, Google, IBM e VMWare"
];

export default function VisaoGeralFinops() {
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
          <PieChart className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('finops360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t("common.overview")}</h1>
          <p className="mt-1 text-muted-foreground">
            Introdução ao uSavings e visão consolidada das funcionalidades de economia em nuvem.
          </p>
        </div>
      </div>

      {/* Logo Section */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <img 
            src="/images/finops360/uSavings_media_sfundo.png" 
            alt="uSavings Logo" 
            className="h-24 w-auto"
          />
          <p className="text-center text-muted-foreground leading-relaxed max-w-2xl">
            Soluções em tecnologia da informação que viabilizam implementar uma arquitetura computacional escalável, 
            sólida e confiável em nuvem híbrida.
          </p>
        </div>
      </section>

      {/* O que é uSavings */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">{t('common.whatIs')}</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O uSavings é uma ferramenta que analisa em tempo real o consumo da infraestrutura dos recursos computacionais 
          (das máquinas virtuais, abreviado como VMs) nas diferentes nuvens. É por meio desta análise que a aplicação 
          recomenda modificações.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          No caso de a organização acolher ou apoiar esta sugestão, tal decisão pode permitir gerar o máximo de economia 
          financeira e otimização dos recursos criados e/ou executados. A aplicação uSavings é um <strong>"cost advisor"</strong>, 
          ou seja, um consultor de custos que permite aconselhar o usuário como reduzir os custos da sua infraestrutura, 
          bilhetada pela Plataforma uCloud, nos diversos provedores de serviços de nuvem - AWS, Azure, Google, IBM e VMWare.
        </p>
      </section>

      {/* Como funciona */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Como funciona?</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A plataforma do uSavings além de obter dados das diversas nuvens, extrai a informação dos dados históricos 
          da própria Virtual Machine (máquina virtual) e da bilhetagem de cada provedor de nuvem pública – a coleta 
          destes dados é iniciada com a integração à Plataforma do uCloud.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A aplicação apresenta um painel consolidado e sugestões dos gastos do cliente em cada provedor de nuvem, 
          entregando assim, informações precisas para a melhor tomada de decisão sobre os custos alocados dos 
          recursos de infraestrutura da organização.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/001_organogram_functioning_usavings.png" 
            alt="Organograma de funcionamento do uSavings" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Organograma de funcionamento do uSavings</p>
        </div>
      </section>

      {/* Flavor e Billing */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Como as sugestões são geradas?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Existem duas maneiras para recomendar as melhorias para uma determinada Virtual Machine:
        </p>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-2">Por Flavor</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O uSavings checa o Flavor alocado na máquina e sugere uma possibilidade de melhoria relacionada ao 
              custo benefício. A aplicação publica os resultados em diversos formatos (gráficos ou porcentagem) 
              e mostra qual é a melhor cloud a ser utilizada para economizar recursos. Este parâmetro, por dedução, 
              entende que a máquina fica ligada o tempo todo.
            </p>
          </div>
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-2">Por Billing</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A bilhetagem do banco de dados do uCloud suporta diversas nuvens. Na regra de negócio do uSavings, 
              só é possível fazer uma sugestão assertiva com o billing para a AWS e AZURE.
            </p>
          </div>
        </div>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/002_recorte_organograma.png" 
            alt="Recorte do organograma - Flavor e Billing" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Flavor e Billing no processo de recomendação</p>
        </div>
      </section>

      {/* Otimizações Recomendadas */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Otimizações Recomendadas</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          As quatro otimizações a seguir podem ser propostas com base nas análises do uSavings:
        </p>
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

      {/* Benefícios */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t('common.benefits')}</h2>
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
              <span className="text-sm text-muted-foreground leading-relaxed">{benefit}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Acesso à Plataforma */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Key className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Como acessar a plataforma uSavings</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O acesso à plataforma uSavings é realizado pela web, podendo ser utilizado qualquer um dos navegadores: 
          <strong> Firefox</strong>, <strong>Google Chrome</strong> ou <strong>Microsoft Edge</strong>, em diversos 
          sistemas operacionais, a exemplo do Microsoft Windows 10 ou 11.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Para o acesso inicial é necessário solicitar as credenciais ao administrador. Ao receber o link com o 
          endereço e as credenciais de acesso, o usuário deve utilizar seu navegador de preferência para acessar 
          a web e conectar-se. Outra forma de acesso à plataforma do uSavings é direto da plataforma do uCloud, 
          pelo seu menu lateral esquerdo.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/003_tela_acesso_inicial.png" 
              alt="Tela de acesso inicial" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela de acesso inicial</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/004_tela_problema_acesso.png" 
              alt="Tela de problema de acesso" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Mensagem de erro de credenciais</p>
          </div>
        </div>
      </section>

      {/* Nota Importante */}
      <section className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">Importante</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
              Todas as opções de alternativas de configuração de hardware são informadas como <strong>sugestões</strong>, 
              pois fica a critério do usuário efetuar a troca (reconfiguração) do hardware do recurso computacional 
              (flavor) no melhor momento para o seu ambiente. A organização munida das informações, entregues pela 
              aplicação uSavings, deve entrar em contato com o provedor do serviço de nuvem sobre 'rightsizing'.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
