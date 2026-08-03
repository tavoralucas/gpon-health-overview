import { ArrowLeft, SlidersHorizontal, CheckCircle2, Database, Calculator, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const components = [
  {
    icon: Database,
    title: "Consultas (Queries)",
    description: "Query A/B/C - Representam a base da configuração de alertas no PMC P360. Cada query coleta dados específicos de uma fonte e serve como entrada para expressões e condições de alerta."
  },
  {
    icon: Calculator,
    title: "Expressões (Reduce)",
    description: "Aplicam operações sobre os dados retornados pelas consultas, permitindo manipular, agregar ou calcular novos valores."
  },
  {
    icon: AlertTriangle,
    title: "Condições de Alerta (Alert Condition)",
    description: "Define o momento em que o alerta deve ser acionado, baseada nos valores obtidos por meio das expressões."
  }
];

const reduceFunctions = [
  { name: "Last", description: "Retorna o último valor da série" },
  { name: "Min", description: "Retorna o valor mínimo da série" },
  { name: "Max", description: "Retorna o valor máximo da série" },
  { name: "Mean", description: "Calcula a média dos valores" },
  { name: "Median", description: "Retorna o valor mediano" },
  { name: "Sum", description: "Soma todos os valores da série" },
  { name: "Count", description: "Conta o número de pontos" }
];

const conditionOperators = [
  { operator: "IS ABOVE", description: "Alerta se o valor estiver acima do limite especificado" },
  { operator: "IS BELOW", description: "Alerta se o valor estiver abaixo do limite" },
  { operator: "IS EQUAL TO", description: "Alerta se o valor for igual ao limite" }
];

const exampleSteps = [
  {
    step: "Query A",
    title: "Configuração da Consulta",
    items: [
      "Fonte de dados: CloudWatch",
      "Namespace: EC2",
      "MetricName: CPUUtilization",
      "Statistic: Average (média)",
      "Dimensions: InstanceId = * (todas as instâncias)"
    ]
  },
  {
    step: "Expressão B",
    title: "Função de Redução (Reduce)",
    items: [
      "Input: A (série temporal com dados de CPU)",
      "Function: Last (pega o valor mais recente)",
      "Mode: Strict (exige valores válidos)"
    ]
  },
  {
    step: "Expressão C",
    title: "Condição de Alerta (Threshold)",
    items: [
      "Input: B (valor único reduzido)",
      "Condição: IS ABOVE",
      "Threshold: 80 (dispara se CPU > 80%)"
    ]
  }
];

export default function ConsultasCondicoes() {
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
          <SlidersHorizontal className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Configurando consultas e condições de alertas</h1>
          <p className="mt-1 text-muted-foreground">
            Defina consultas e condições para disparo de alertas.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre Consultas e Condições</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Ao configurar alertas no PMC P360, são utilizadas as Consultas (Queries) e as Expressões para definir as 
          condições que determinam quando um alerta será acionado. Esse processo envolve três componentes principais.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img src="/images/panorama360/053_configura_consul_alerta.png" alt="Configuração de consultas e alertas" className="w-full h-auto" />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Painel de configuração de consultas e alertas</p>
        </div>
      </section>

      {/* Componentes */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Componentes Principais</h2>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
          {components.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Funções de Redução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Funções de Redução (Reduce)</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Transforma uma série temporal em um único valor, simplificando os dados para uma única métrica:
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {reduceFunctions.map(({ name, description }) => (
            <div key={name} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <code className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium shrink-0 min-w-[70px]">
                {name}
              </code>
              <span className="text-sm text-muted-foreground">{description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Operadores de Condição */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Operadores de Condição</h2>
        <div className="space-y-3">
          {conditionOperators.map(({ operator, description }) => (
            <div key={operator} className="flex items-start gap-3 border-l-2 border-primary/20 pl-4">
              <code className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium shrink-0">
                {operator}
              </code>
              <span className="text-sm text-muted-foreground">{description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Exemplo Prático */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Exemplo Prático: Monitoramento de CPU EC2</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Este caso de uso apresenta a configuração para monitorar o uso de CPU das instâncias EC2 no CloudWatch:
        </p>
        <div className="space-y-4">
          {exampleSteps.map(({ step, title, items }, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-bold">
                  {step}
                </span>
                <h3 className="font-semibold text-foreground">{title}</h3>
              </div>
              <ul className="space-y-2 ml-4">
                {items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Resultado */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Resultado da Configuração</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A Query A coleta o uso de CPU de todas as instâncias EC2. A Expressão B reduz os dados ao valor de CPU 
          mais recente. A Expressão C verifica se esse valor está acima de 80%, e se sim, o alerta é acionado.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img src="/images/panorama360/054_resultado_apos_configurar.png" alt="Resultado após configuração" className="w-full h-auto" />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Visualização do resultado após configuração</p>
        </div>
      </section>

      {/* Dica Final */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Configuração Completa!</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              Com essa configuração, você receberá alertas sempre que o uso de CPU de qualquer instância EC2 ultrapassar 80%.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
