import { ArrowLeft, Tag, CheckCircle2, Edit, Save, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const steps = [
  {
    title: "Passo 1: Acessando a Regra de Alerta",
    items: [
      "Navegar até o menu Alerting no PMC P360 e encontre a regra de alerta onde deseja adicionar a label.",
      "Clicar na regra para expandir e visualizar as opções de configuração."
    ],
    image: "/images/panorama360/035_alerting_alert_rules.png"
  },
  {
    title: "Passo 2: Editando o Alerta para Adicionar uma Nova Label",
    items: [
      "Na regra expandida, clicar no botão 'Edit' para acessar as configurações detalhadas do alerta."
    ],
    image: "/images/panorama360/036_label_edit.png"
  },
  {
    title: "Passo 3: Adicionando a Label",
    items: [
      "Dentro da configuração da regra, localize a seção Labels.",
      "Clicar para adicionar uma nova tag.",
      "As labels funcionam no formato de pares de chave/valor (key/value)."
    ],
    images: [
      { src: "/images/panorama360/037_add_label.png", alt: "Adicionando label" },
      { src: "/images/panorama360/038_label_criada.png", alt: "Label criada" }
    ]
  },
  {
    title: "Passo 4: Salvando e Aplicando Configurações",
    items: [
      "Após adicionar e configurar a label, clicar no botão 'Save' para salvar as mudanças na regra de alerta."
    ],
    image: "/images/panorama360/039_label.png"
  },
  {
    title: "Passo 5: Visualizando e Gerenciando Labels em Alertas Ativos",
    items: [
      "Para visualizar a label aplicada em alertas ativos, retornar no menu principal do Alerting.",
      "As labels estão visíveis junto aos alertas, fato que facilita a identificação e o gerenciamento."
    ],
    images: [
      { src: "/images/panorama360/040_visualizar_label.png", alt: "Visualização de labels" },
      { src: "/images/panorama360/041_alert_silence.png", alt: "Silenciamento por labels" }
    ]
  }
];

const labelExamples = [
  { key: "server", value: "prod", description: "Identifica alertas de servidores de produção" },
  { key: "team", value: "backend", description: "Identifica alertas da equipe de backend" },
  { key: "type", value: "cpu", description: "Categoriza alertas por tipo de métrica" },
  { key: "priority", value: "high", description: "Define a prioridade do alerta" }
];

export default function TagsLabels() {
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
          <Tag className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Adicionando uma nova tag de label</h1>
          <p className="mt-1 text-muted-foreground">
            Como criar e aplicar tags de label nos alertas.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre Labels</h2>
        <p className="text-muted-foreground leading-relaxed">
          Este documento explica como adicionar uma nova tag de label aos alertas configurados no PMC P360. Labels 
          permitem identificar e gerenciar alertas de maneira mais precisa, facilitando buscas, silenciamento e roteamento.
        </p>
      </section>

      {/* Steps */}
      {steps.map((step, index) => (
        <section key={index} className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
              {index + 1}
            </div>
            <h2 className="text-lg font-semibold text-foreground">{step.title}</h2>
          </div>
          <ul className="space-y-3 ml-11 mb-4">
            {step.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          {step.image && (
            <div className="border border-border rounded-lg overflow-hidden ml-11">
              <img src={step.image} alt={step.title} className="w-full h-auto" />
              <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">{step.title}</p>
            </div>
          )}
          {step.images && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
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

      {/* Exemplos de Labels */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Exemplos de Labels</h2>
        </div>
        <p className="text-muted-foreground mb-4 text-sm">
          Labels funcionam no formato de pares chave/valor. Aqui estão alguns exemplos comuns:
        </p>
        <div className="space-y-3">
          {labelExamples.map(({ key, value, description }) => (
            <div key={key} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <code className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium shrink-0">
                {key}={value}
              </code>
              <span className="text-sm text-muted-foreground">{description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Uso Avançado */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Exemplo de Uso Avançado: Silenciamento por Labels</h2>
        <p className="text-muted-foreground leading-relaxed">
          O usuário pode utilizar labels específicas para silenciar alertas de uma categoria específica. Basta navegar 
          até a seção Alerting {'>'} Silences, criar uma regra de silenciamento e definir a label desejada. Todos os alertas 
          com esse label serão silenciados automaticamente.
        </p>
      </section>

      {/* Dica */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Dica</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              Use labels consistentes em toda a sua organização para facilitar o gerenciamento e a busca de alertas. 
              Defina uma convenção de nomenclatura e documente-a para sua equipe.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
