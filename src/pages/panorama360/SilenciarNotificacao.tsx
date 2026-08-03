import { ArrowLeft, BellOff, CheckCircle2, Calendar, Clock, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const steps = [
  {
    title: "Passo 1: Acessando o menu de Alertas",
    description: "No menu principal do PMC P360, clicar em 'Alerting' para acessar a seção de alertas.",
    image: "/images/panorama360/023_acesso_menu_alerta.png"
  },
  {
    title: "Passo 2: Expandindo as Regras de Alerta",
    description: "Na seção Alerting, localizar a lista de Rules e expandir a regra de alerta desejada.",
    image: "/images/panorama360/024_alerta_regras.png"
  },
  {
    title: "Passo 3: Selecionando a opção \"Silence Notifications\"",
    description: "Ao lado da regra expandida, clicar em 'More' para visualizar opções adicionais. Selecione 'Silence Notifications' para iniciar o processo de silenciamento.",
    image: "/images/panorama360/025_notificar_silence.png"
  },
  {
    title: "Passo 4: Configurando o Período de Silenciamento",
    description: "Definir o período de silenciamento usando o menu de calendário ou inserir o tempo manualmente. Utilizar o formato de horas (h) ou dias (d), como 2h ou 15d.",
    image: "/images/panorama360/026_editar_silence.png"
  },
  {
    title: "Passo 5: Salvando o Silenciamento",
    description: "Após definir o tempo, clicar em 'Save Silence' para confirmar.",
    image: "/images/panorama360/027_salvar_silence.png"
  }
];

export default function SilenciarNotificacao() {
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
          <BellOff className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Silenciando uma notificação de alerta</h1>
          <p className="mt-1 text-muted-foreground">
            Como silenciar notificações de alerta temporariamente.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre o Silenciamento</h2>
        <p className="text-muted-foreground leading-relaxed">
          Esta documentação discorre acerca do painel de configuração de agendamento de manutenção de ativos. 
          O silenciamento permite pausar temporariamente as notificações de alertas específicos durante períodos 
          de manutenção programada ou para evitar alertas repetitivos durante investigações.
        </p>
      </section>

      {/* Steps */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Passo a Passo</h2>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.description}</p>
                  {step.image && (
                    <div className="border border-border rounded-lg overflow-hidden">
                      <img src={step.image} alt={step.title} className="w-full h-auto" />
                      <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">{step.title}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Formato de Tempo */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Formato de Tempo</h2>
        </div>
        <p className="text-muted-foreground mb-4 text-sm">
          Ao definir o período de silenciamento, você pode usar os seguintes formatos:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <code className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">2h</code>
            <span className="text-sm text-muted-foreground">2 horas</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <code className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">15d</code>
            <span className="text-sm text-muted-foreground">15 dias</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <code className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">30m</code>
            <span className="text-sm text-muted-foreground">30 minutos</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <code className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">1w</code>
            <span className="text-sm text-muted-foreground">1 semana</span>
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
              Você pode visualizar e remover silenciamentos ativos a qualquer momento na seção "Silences" do menu 
              de Alerting. Consulte a documentação "Visualizando e Removendo Silenciamentos" para mais detalhes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
