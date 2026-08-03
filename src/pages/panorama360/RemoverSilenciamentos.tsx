import { ArrowLeft, EyeOff, CheckCircle2, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const steps = [
  {
    title: "Passo 1: Acessando a Aba \"Silences\"",
    description: "No menu de Alerting, seguir até a seção Silences para visualizar os alertas silenciados.",
    image: "/images/panorama360/028_visualizar_silence.png"
  },
  {
    title: "Passo 2: Removendo o Silenciamento",
    description: "Encontrar o alerta que deseja reativar. Clicar em 'Unsilence' ao lado do item para remover o silenciamento.",
    image: "/images/panorama360/029_remover_silence.png"
  }
];

export default function RemoverSilenciamentos() {
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
          <EyeOff className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Visualizando e Removendo Silenciamentos</h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie e remova silenciamentos ativos na plataforma.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre o Gerenciamento de Silenciamentos</h2>
        <p className="text-muted-foreground leading-relaxed">
          Para gerenciar os alertas silenciados, siga as etapas abaixo. Você pode visualizar todos os silenciamentos 
          ativos e remover aqueles que não são mais necessários.
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

      {/* Visualização */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Eye className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">O que você verá na lista de Silences</h2>
        </div>
        <div className="space-y-3">
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">Nome do Alerta</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Identificação da regra de alerta que está silenciada.
            </p>
          </div>
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">Período de Silenciamento</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Data/hora de início e fim do silenciamento.
            </p>
          </div>
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">Criador</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Usuário que criou o silenciamento.
            </p>
          </div>
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">Status</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Se o silenciamento está ativo ou expirado.
            </p>
          </div>
        </div>
      </section>

      {/* Ações */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Trash2 className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Ações Disponíveis</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded text-sm font-medium">
              Unsilence
            </span>
            <span className="text-sm text-muted-foreground">Remove o silenciamento imediatamente</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded text-sm font-medium">
              Edit
            </span>
            <span className="text-sm text-muted-foreground">Edita o período ou regras do silenciamento</span>
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
              Silenciamentos expirados são automaticamente removidos da lista ativa. Você pode revisitar a seção 
              Silences a qualquer momento para gerenciar os silenciamentos ativos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
