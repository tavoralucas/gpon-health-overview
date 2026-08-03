import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, ScrollText, CheckCircle2, Search, Filter, Download, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "Passo 1: Acessando a Interface de Logs",
    icon: Search,
    items: [
      "Navegar até o menu principal no PMC P360 e selecionar a opção 'Explore'.",
      "No menu suspenso, escolher a fonte de dados Loki para começar a visualizar os logs.",
      "Selecionar a aba Logs e escolher o serviço específico que deseja monitorar.",
      "Adicionar filtros rápidos utilizando as tags INFO, ERROR, ou outros que julgar necessários."
    ],
    image: "/images/panorama360/030_home_logs.png"
  },
  {
    title: "Passo 2: Configurando a Consulta de Logs",
    icon: Filter,
    items: [
      "Na área de query, inserir a consulta para filtrar os logs desejados.",
      "O usuário pode digitar consultas básicas ou utilizar filtros avançados para buscar logs específicos.",
      "Exemplo de consulta: {service_name=\"empresa1.org\"}",
      "Utilizar opções como 'time' para incluir data/hora, 'unique labels' para registros únicos, 'prettify JSON' para melhorar a legibilidade."
    ],
    images: [
      { src: "/images/panorama360/031_configura_consulta_logs.png", alt: "Configuração de consulta de logs" },
      { src: "/images/panorama360/032_filtros_config_avancada_logs.png", alt: "Filtros e configuração avançada" }
    ]
  },
  {
    title: "Passo 3: Aplicando Filtros de Tempo",
    icon: Clock,
    items: [
      "Utilizar o seletor de tempo para definir o intervalo desejado, como 'Last 1 hour' ou 'Last 24 hours'.",
      "Ajuste a intensidade da amostragem e o formato de exibição para melhor visualização dos dados."
    ],
    image: "/images/panorama360/034_time_range.png"
  },
  {
    title: "Passo 4: Analisando e Exportando Logs",
    icon: Download,
    items: [
      "Após configurar a consulta, é possível visualizar os logs diretamente na plataforma PMC P360.",
      "Utilizar a barra de rolagem para navegar pelos resultados.",
      "Para exportar os logs, clicar em 'Export' e selecionar o formato desejado: txt, json, ou csv."
    ],
    image: "/images/panorama360/033_analisa_exporta_logs.png"
  }
];

const displayOptions = [
  { option: "time", description: "Incluir ou ocultar a data e hora dos logs" },
  { option: "unique labels", description: "Mostrar apenas registros únicos" },
  { option: "prettify JSON", description: "Melhorar a legibilidade do conteúdo JSON" },
  { option: "newest first", description: "Ordenar logs do mais recente ao mais antigo" },
  { option: "oldest first", description: "Ordenar logs do mais antigo ao mais recente" }
];

const exportFormats = [
  { format: "TXT", description: "Texto simples, ideal para leitura manual" },
  { format: "JSON", description: "Formato estruturado, ideal para processamento" },
  { format: "CSV", description: "Planilha, ideal para análise em Excel/Google Sheets" }
];

export default function ExplorandoLogs() {
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
          <ScrollText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Explorando e analisando os Logs</h1>
          <p className="mt-1 text-muted-foreground">
            Como explorar e analisar logs da plataforma.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre a Análise de Logs</h2>
        <p className="text-muted-foreground leading-relaxed">
          Este guia descreve o processo para acessar e visualizar logs no PMC P360 utilizando Loki, permitindo 
          monitorar e diagnosticar atividades de forma eficaz. Siga o passo a passo para explorar e filtrar logs 
          diretamente na interface do PMC P360.
        </p>
      </section>

      {/* Steps */}
      {steps.map((step, index) => (
        <section key={index} className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <step.icon className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">{step.title}</h2>
          </div>
          <ul className="space-y-3 ml-13 mb-4">
            {step.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          {step.image && (
            <div className="border border-border rounded-lg overflow-hidden">
              <img src={step.image} alt={step.title} className="w-full h-auto" />
              <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">{step.title}</p>
            </div>
          )}
          {step.images && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step.images.map((img, imgIndex) => (
                <div key={imgIndex} className="border border-border rounded-lg overflow-hidden">
                  <img src={img.src} alt={img.alt} className="w-full h-auto" />
                  <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">{img.alt}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Opções de Exibição */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Opções de Exibição</h2>
        <div className="space-y-3">
          {displayOptions.map(({ option, description }) => (
            <div key={option} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <code className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium shrink-0">
                {option}
              </code>
              <span className="text-sm text-muted-foreground">{description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Formatos de Exportação */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Formatos de Exportação</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {exportFormats.map(({ format, description }) => (
            <div
              key={format}
              className="p-4 bg-muted/50 rounded-lg text-center"
            >
              <span className="block text-lg font-bold text-primary mb-1">{format}</span>
              <span className="text-sm text-muted-foreground">{description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Time Range */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Utilizando Filtros de Time Range</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          O filtro de Time Range pode ser usado para definir intervalos de tempo específicos e visualizar como os 
          logs variam ao longo de um período específico, o que é útil para correlacionar eventos e identificar tendências.
        </p>
      </section>

      {/* Dica */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Dica</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              Use filtros como INFO e ERROR para categorizar rapidamente os logs. Combine múltiplos filtros para 
              análises mais específicas e exporte os resultados para documentação ou análise posterior.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

