import { ArrowLeft, Bell, CheckCircle2, AlertTriangle, Server, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const useCases = [
  {
    title: "Equipe de TI",
    description: "Uma equipe que precisa monitorar a integridade de vários servidores. Um Dashboard pode ser configurado para mostrar o status de cada servidor em tempo real, com painéis individuais para uso de CPU, memória, e tráfego de rede."
  },
  {
    title: "Equipe de Vendas",
    description: "Acompanhar o desempenho dos representantes. Um Dashboard pode incluir painéis para monitorar chamadas feitas, e-mails enviados, negociações em andamento e fechadas, e compará-los com as metas estabelecidas."
  }
];

export default function ConfigurarAlertas() {
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
          <Bell className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Como configurar Alertas</h1>
          <p className="mt-1 text-muted-foreground">
            Guia para configuração de alertas na plataforma.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Nunca perca um Evento Crítico</h2>
        <p className="text-muted-foreground leading-relaxed">
          Os alertas no PMC P360 são uma ferramenta poderosa para garantir que o usuário nunca perca um evento crítico. 
          Eles permitem definir regras específicas que, quando atendidas, acionam uma notificação para alertá-lo sobre 
          um problema potencial antes que ele se torne uma crise.
        </p>
      </section>

      {/* Casos de Uso */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Casos de uso comuns</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {useCases.map(({ title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Como os alertas funcionam</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Configurar alertas é como montar um sistema de segurança para os seus dados. O usuário define os sensores 
          (condições) e o sistema avisa quando algo não está certo.
        </p>
        <div className="space-y-3">
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">Definir Condições</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Você especifica quais métricas monitorar e quais limites devem acionar um alerta.
            </p>
          </div>
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">Configurar Notificações</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Escolha como e onde deseja receber as notificações (e-mail, Telegram, Slack, etc.).
            </p>
          </div>
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">Monitoramento Contínuo</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O sistema monitora constantemente as métricas e dispara alertas quando as condições são atendidas.
            </p>
          </div>
        </div>
      </section>

      {/* Exemplos de Alertas */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Exemplos de Alertas</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
            <Server className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground mb-1">Infraestrutura de TI</h3>
              <p className="text-sm text-muted-foreground">
                Um alerta para avisar sempre que a latência de rede ultrapassar um certo limite, indicando um possível 
                problema de conectividade.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground mb-1">Ambiente de Produção</h3>
              <p className="text-sm text-muted-foreground">
                Um alerta para notificar a equipe se a temperatura de uma máquina exceder um nível seguro, prevenindo 
                falhas de equipamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dica */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Próximo Passo</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              Para ver o passo a passo detalhado de como configurar alertas, consulte a documentação 
              "Procedimentos para configurar Alertas".
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
