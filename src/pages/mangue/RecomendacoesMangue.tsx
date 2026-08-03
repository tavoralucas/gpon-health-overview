import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, Lightbulb, CheckCircle2, Bell, Webhook, TrendingDown, Scale, AlertTriangle, Info, Settings, Play, Pause, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const recommendationTypes = [
  {
    title: "Alertas",
    icon: Bell,
    description: "Configuração de alertas para notificações sobre eventos e métricas do cluster."
  },
  {
    title: "Webhooks",
    icon: Webhook,
    description: "Integração com sistemas externos através de webhooks para eventos do cluster."
  },
  {
    title: "Recomendações de Recursos",
    icon: TrendingDown,
    description: "Sugestões para otimização de CPU e memória dos deployments."
  },
  {
    title: "Escalonamento",
    icon: Scale,
    description: "Recomendações para ajuste de réplicas e recursos dos containers."
  }
];

const alertActions = [
  { name: "Escalonar Aplicação", description: "Aumentar ou diminuir o número de réplicas" },
  { name: "Alterar Request e Limit", description: "Modificar recursos de CPU e memória" },
  { name: "Parar Aplicação", description: "Interromper a execução do deployment" }
];

export default function RecomendacoesMangue() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/mangue")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('mangue.title') })}
      </button>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <Lightbulb className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('mangue.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Recomendações</h1>
          <p className="mt-1 text-muted-foreground">
            Alertas, webhooks e sugestões de otimização de recursos.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre Recomendações</h2>
        <p className="text-muted-foreground leading-relaxed">
          O menu <strong>Recomendações</strong> do Mangue.io oferece funcionalidades para configuração 
          de alertas, webhooks e visualização de sugestões de otimização de recursos baseadas no consumo 
          real dos deployments.
        </p>
      </section>

      {/* Tipos de Recomendações */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Funcionalidades</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {recommendationTypes.map(({ title, icon: Icon, description }) => (
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

      {/* Alertas */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Alertas</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Configure alertas para monitorar eventos e métricas do cluster, recebendo notificações quando 
          determinados limites são atingidos.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/096_mangue_alertas_webhooks.png" 
            alt="Alertas e Webhooks" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela de Alertas e Webhooks</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/097_mangue_alert.png" 
              alt="Criar Alerta" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Criação de Alerta</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/100_mangue_alerta_detalhes.png" 
              alt="Detalhes Alerta" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Detalhes do Alerta</p>
          </div>
        </div>
      </section>

      {/* Ações de Alerta */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Ações de Alerta</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Os alertas podem disparar ações automáticas quando condições específicas são atingidas:
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/103_mangue_escalonamento_aplicacao.png" 
              alt="Escalonamento" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Escalonar Aplicação</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/104_mangue_alterar_request_limit.png" 
              alt="Request Limit" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Alterar Request/Limit</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/105_mangue_parar_aplicacao.png" 
              alt="Parar Aplicação" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Parar Aplicação</p>
          </div>
        </div>
        <div className="space-y-2 mt-4">
          {alertActions.map(({ name, description }) => (
            <div key={name} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Settings className="h-4 w-4 text-primary shrink-0 mt-1" />
              <div>
                <span className="font-medium text-foreground text-sm">{name}</span>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Webhooks */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Webhook className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Webhooks</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Integre o Mangue.io com sistemas externos configurando webhooks que são acionados 
          quando eventos específicos ocorrem no cluster.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/106_mangue_webhooks.png" 
            alt="Webhooks" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Webhooks</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/109_mangue_editar_webhook.png" 
              alt="Editar Webhook" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Editar Webhook</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/101_mangue_alerta_webhook.png" 
              alt="Alerta Webhook" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Associar Alerta a Webhook</p>
          </div>
        </div>
      </section>

      {/* Recomendações de Recursos */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <TrendingDown className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Recomendações de Recursos</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A plataforma analisa o consumo real de CPU e memória dos deployments e sugere ajustes 
          para otimizar a alocação de recursos, reduzindo custos e melhorando a performance.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/110_mangue_recomendacoes.png" 
            alt="Recomendações" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Recomendações</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Análise do consumo histórico de CPU e memória</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Sugestões de ajuste de request e limit</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Identificação de recursos subutilizados</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Economia potencial calculada</span>
          </li>
        </ul>
      </section>

      {/* Descartar e Histórico */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Gerenciamento de Recomendações</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/111_mangue_descartar_recomendacao.png" 
              alt="Descartar Recomendação" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Descartar Recomendação</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/112_mangue_historico_recomendacao.png" 
              alt="Histórico Recomendação" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Histórico de Recomendações</p>
          </div>
        </div>
      </section>

      {/* Nota */}
      <section className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">Atenção</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
              As recomendações são sugestões baseadas no consumo histórico. Avalie cuidadosamente antes de 
              aplicar mudanças em ambientes de produção. Recomenda-se testar em ambientes de desenvolvimento 
              primeiro.
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
              Configure alertas para ser notificado quando o consumo de recursos exceder determinados limites. 
              Isso permite ação proativa antes que problemas de performance ocorram.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

