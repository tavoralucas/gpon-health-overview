import { ArrowLeft, Settings, CheckCircle2, AlertTriangle, Bell, Mail, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const steps = [
  {
    title: "Passo 1: Acessando o Painel de Configurações",
    items: [
      {
        subtitle: "Abrindo Configurações do Painel",
        description: "No painel específico que deseja monitorar, clicar no ícone de engrenagem ou selecione a opção 'Editar' para abrir as configurações do painel."
      },
      {
        subtitle: "Acessando a aba de Alertas",
        description: "Navegar até a aba ou seção 'Alert' (Alerta) dentro das configurações do painel. Neste local, o usuário inicia a configuração das suas regras de alerta."
      }
    ]
  },
  {
    title: "Passo 2: Criando uma Regra de Alerta",
    items: [
      {
        subtitle: "Adicionando Nova Regra de Alerta",
        description: "Clicar no botão 'Create Alert' (Criar Alerta) ou 'Add Alert' (Adicionar Alerta) para começar a configurar uma nova regra de alerta."
      },
      {
        subtitle: "Nome do Alerta",
        description: "Inserir um nome descritivo que reflita o propósito do alerta, como 'Alerta de Uso de CPU Alto'."
      },
      {
        subtitle: "Tipo de Alerta",
        description: "Escolher entre diferentes tipos de condições, como valor absoluto (ex: CPU > 85%) ou uma condição mais complexa baseada em várias métricas."
      },
      {
        subtitle: "Configuração da Consulta",
        description: "Selecionar a consulta que será monitorada e definir o dado específico que acionará o alerta."
      },
      {
        subtitle: "Threshold (Limite)",
        description: "Determinar o limite que deve ser atingido para acionar o alerta, por exemplo, 'se a CPU > 85%'."
      }
    ]
  },
  {
    title: "Passo 3: Configurando Ações e Notificações",
    items: [
      {
        subtitle: "Notificações",
        description: "Escolher os canais pelos quais deseja receber notificações, como e-mail, mensagens em aplicativos de comunicação ou integrações com sistemas de monitoramento externos."
      },
      {
        subtitle: "Destinatários",
        description: "Selecionar os destinatários que devem ser notificados quando o alerta for acionado. Isso pode incluir indivíduos específicos ou grupos de resposta."
      },
      {
        subtitle: "Mensagem de Alerta",
        description: "Personalizar a mensagem a ser enviada. Incluir os detalhes como o nome do painel, a condição que disparou o alerta e outras informações relevantes para facilitar a ação rápida."
      }
    ]
  },
  {
    title: "Passo 4: Salvando e Monitorando",
    items: [
      {
        subtitle: "Salvando o Alerta",
        description: "Clicar no botão 'Save' (Salvar) para certificar que a configuração do alerta seja mantida."
      },
      {
        subtitle: "Monitorando Alertas Ativos",
        description: "Acessar a seção 'Alerting' (Alertas) no menu lateral para visualizar todos os alertas ativos e suas condições atuais. Isso permite a rápida visualização de quais alertas estão próximos de serem disparados ou já foram acionados."
      }
    ]
  }
];

const maintenance = [
  {
    title: "Revisando e Ajustando",
    description: "Periodicamente, revise as regras de alerta para garantir que elas ainda são apropriadas e precisas. Ajuste os limiares e notificações conforme necessário, especialmente se as condições monitoradas mudarem."
  },
  {
    title: "Testando Alertas",
    description: "Para certificar que os alertas funcionem corretamente, é possível realizar testes simulando condições que deveriam acioná-los. Verifique se as notificações são enviadas corretamente e se as ações esperadas ocorrem."
  }
];

export default function ProcedimentosAlertas() {
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
          <Settings className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Procedimentos para configurar Alertas</h1>
          <p className="mt-1 text-muted-foreground">
            Procedimentos detalhados para configuração de alertas.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre este guia</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Configurar alertas é como montar um sistema de segurança para os seus dados. O usuário define os sensores 
          (condições) e o sistema avisa quando algo não está certo. Siga os passos abaixo para configurar alertas 
          de forma eficiente.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img src="/images/panorama360/042_joao_alerta.png" alt="Exemplo de configuração de alerta" className="w-full h-auto" />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Exemplo de configuração de alerta</p>
        </div>
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
          <div className="space-y-4 ml-11">
            {step.items.map((item, itemIndex) => (
              <div key={itemIndex} className="border-l-2 border-primary/20 pl-4">
                <h3 className="font-medium text-foreground mb-1">{item.subtitle}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Manutenção */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Manutenção e Testes</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Para ter certeza que seus alertas continuem relevantes e funcionais, é importante revisá-los e testá-los periodicamente.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          {maintenance.map(({ title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
        <div className="border border-border rounded-lg overflow-hidden">
          <img src="/images/panorama360/043_joao_alertas.png" alt="Visualização de alertas configurados" className="w-full h-auto" />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Visualização de alertas configurados</p>
        </div>
      </section>

      {/* Dica */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Pronto!</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              Com os alertas configurados, você será notificado automaticamente quando as condições definidas forem 
              atendidas, permitindo uma resposta rápida a eventos críticos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
