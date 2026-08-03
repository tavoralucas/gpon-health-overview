import { ArrowLeft, GitCompare, CheckCircle2, Cloud, DollarSign, BarChart3, FileSpreadsheet, Server, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const compareTypes = [
  {
    title: "Compare by Billing",
    description: "Análise comparativa por bilhetagem. Necessita que o bilhetador tenha sido executado no container. Suportado para AWS e Azure."
  },
  {
    title: "Compare by Container",
    description: "Permite comparar o container dentro da própria nuvem ou com outras nuvens públicas como IBM, Azure, Google, AWS."
  }
];

const billingSteps = [
  {
    step: 1,
    title: "Clicar em Compare by Billing",
    description: "Checar se a plataforma do uCloud está bilhetada. Ao menos um container deve estar bilhetado e conectado à plataforma."
  },
  {
    step: 2,
    title: "Selecionar a nuvem",
    description: "Selecionar a nuvem contendo todos os seus containers. Clicar em AWS ou AZURE, em seguida clicar em NEXT."
  },
  {
    step: 3,
    title: "Selecionar período de bilhetagem",
    description: "Selecionar o período da bilhetagem que deseja fazer a análise e clicar em NEXT."
  },
  {
    step: 4,
    title: "Selecionar as nuvens para comparar",
    description: "Escolher quais nuvens deseja comparar os valores. Clicar em NEXT."
  },
  {
    step: 5,
    title: "Escolher região das nuvens",
    description: "Informar a região de cada nuvem a ser comparada e clicar em GENERATE."
  },
  {
    step: 6,
    title: "Analisar resultados",
    description: "Visualizar os resultados da comparação em cards e gráficos. Possibilidade de exportar em .csv."
  }
];

const containerSteps = [
  {
    step: 1,
    title: "Clicar em Compare by Container",
    description: "Selecionar a opção de comparação por container."
  },
  {
    step: 2,
    title: "Selecionar o container",
    description: "Na barra lateral, selecionar o container desejado."
  },
  {
    step: 3,
    title: "Escolher a nuvem principal",
    description: "Selecionar a nuvem principal para comparação."
  },
  {
    step: 4,
    title: "Selecionar nuvens para comparar",
    description: "Escolher quais nuvens deseja comparar os valores."
  },
  {
    step: 5,
    title: "Informar região",
    description: "Configurar a região de cada nuvem a ser comparada."
  },
  {
    step: 6,
    title: "Gerar comparativo",
    description: "Clicar em GENERATE para visualizar o resultado da comparação."
  }
];

export default function CompareCloud() {
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
          <GitCompare className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('finops360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Compare Cloud</h1>
          <p className="mt-1 text-muted-foreground">
            Compare preços e configurações entre diferentes provedores de nuvem.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre o Compare Clouds</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Na aplicação do uSavings, a funcionalidade "Compare Clouds" permite realizar análise comparativa 
          <strong> Por Billing</strong> ou <strong>Por Container</strong> dos custos entre a nuvem utilizada 
          e as nuvens escolhidas para comparar.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Para que as unidades se tornem disponíveis é necessário a integração com a plataforma uCloud. 
          As contas precisam estar conectadas e sincronizadas, respeitando as definições de regras de segurança.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/031_submenu_funcionalidades.png" 
            alt="Submenu funcionalidades" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Menu Compare Clouds</p>
        </div>
      </section>

      {/* Tipos de Comparação */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Tipos de Comparação</h2>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          {compareTypes.map(({ title, description }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <GitCompare className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/032_tela_inicial_compare_clouds.png" 
            alt="Tela inicial Compare Clouds" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela inicial com opções de comparação</p>
        </div>
      </section>

      {/* Seleção */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Seleção do Tipo de Comparação</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Ao clicar na barra pretendida ela assume a cor laranja, indicando a seleção. Reforçando, para que as 
          unidades estejam disponíveis, <strong>é imprescindível</strong> integrar com a plataforma do uCloud.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/033_selecao_compare_billing_compare_container.png" 
            alt="Seleção Compare Billing/Container" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Seleção entre Compare by Billing e Compare by Container</p>
        </div>
      </section>

      {/* Compare by Billing */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Comparar por Billing</h2>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 p-4 mb-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
              <strong>Significado do termo 'estar bilhetado':</strong> é a existência da fatura de consumo em 
              determinado período, período mínimo de pelo menos um mês. A análise comparativa por Billing é 
              suportada apenas para as nuvens AWS e AZURE.
            </p>
          </div>
        </div>
        <div className="space-y-4 mb-4">
          {billingSteps.map(({ step, title, description }) => (
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

      {/* Imagens Compare by Billing */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Ilustrações - Compare by Billing</h2>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/034_recorte_compare_billing.png" 
              alt="Compare Billing" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Seleção da nuvem (AWS/AZURE)</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/035_selecao_periodo_bilhetagem_nuvem_comparada.png" 
              alt="Seleção período" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Seleção do período de bilhetagem</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/036_selecionar_nuvens_analise_comparar_valores.png" 
              alt="Selecionar nuvens" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Seleção das nuvens para comparar</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/037_escolher_regiao_nuvem_1.png" 
              alt="Escolher região" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Escolha da região das nuvens</p>
          </div>
        </div>
      </section>

      {/* Resultado Compare by Billing */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Resultado da Comparação por Billing</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Após a configuração, o resultado é apresentado em cards com preços consolidados e representação gráfica 
          comparativa entre as nuvens selecionadas.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/finops360/038_resultado_escolha_regiao.png" 
            alt="Resultado da escolha" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Resultado após escolha das regiões</p>
        </div>
      </section>

      {/* Compare by Container */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Server className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Comparar por Container</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O Compare by Container permite realizar a análise comparativa entre a própria nuvem, assim como comparar 
          com outras nuvens. O usuário pode comparar com as nuvens públicas que não estejam conectadas à plataforma 
          do uCloud, como por exemplo: IBM, AZURE, Google, AWS.
        </p>
        <div className="space-y-4 mb-4">
          {containerSteps.map(({ step, title, description }) => (
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

      {/* Imagens Compare by Container */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Ilustrações - Compare by Container</h2>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/039_selecao_comparativo_container.png" 
              alt="Seleção comparativo container" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Seleção do comparativo por container</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/040_selecionar_container_nuvem_compara.png" 
              alt="Selecionar container nuvem" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Seleção do container e nuvem</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/041_selecionar_container_nuvem.png" 
              alt="Selecionar container" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Configuração do container</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/042_tela_escolha_regiao_cloud.png" 
              alt="Escolha região cloud" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Escolha da região da cloud</p>
          </div>
        </div>
      </section>

      {/* Resultado Compare by Container */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Resultado da Comparação</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O resultado da comparação exibe cards com preços consolidados e representação gráfica comparando os 
          preços entre as diferentes nuvens.
        </p>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/043_comparativo_container_nuvem.png" 
              alt="Comparativo container nuvem" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Comparativo entre containers</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/044_cards_precos_consolidados.png" 
              alt="Cards preços consolidados" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Cards de preços consolidados</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/045_representacao_grafica_preco_nuvem.png" 
              alt="Representação gráfica" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Representação gráfica dos preços</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/046_tela_resultado.png" 
              alt="Tela resultado" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela de resultado final</p>
          </div>
        </div>
      </section>

      {/* Exportação */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Exportação de Relatório</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Os resultados da comparação podem ser exportados em formato .csv para análise detalhada em planilhas.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/047_relatorio_exportado_csv.png" 
            alt="Relatório exportado CSV" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Relatório exportado em formato CSV</p>
        </div>
      </section>

      {/* Dica */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Dica</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              Utilize o Compare Clouds para tomar decisões estratégicas sobre migração entre provedores de nuvem. 
              Compare regularmente os custos para identificar oportunidades de economia em diferentes regiões e provedores.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
