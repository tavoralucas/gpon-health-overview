import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, RefreshCw, Zap, Radio, Settings, Server, CheckCircle2, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Notificações de mudanças no painel",
    description: "No momento que ocorre uma mudança no layout do painel, ela é refletida automaticamente em outros dispositivos conectados ao P360 Live."
  },
  {
    title: "Transmissão de dados de plugins",
    description: "Plugins de fonte de dados no backend podem transmitir atualizações para os painéis da interface."
  },
  {
    title: "Transmissão de dados de sensores e Telegraf",
    description: "Um novo endpoint de API (/api/live/push/:streamId) aceita dados de métricas no formato InfluxDB enviados pelo Telegraf, transformando-os em quadros de dados do PMC P360 e publicando-os nos canais."
  }
];

const channelStructure = [
  {
    term: "Escopo",
    description: "Ele determina o propósito do canal no P360. Por exemplo: para canais de plugins de fonte de dados, utiliza-se o escopo 'ds'."
  },
  {
    term: "Namespace",
    description: "Pode representar o nome de um recurso ou característica em tempo real, como 'painel'."
  },
  {
    term: "Caminho",
    description: "Identifica um recurso específico, como o ID de um painel. O caminho pode conter os caracteres especiais '/' barra, '.' ponto e '=' igual."
  }
];

const configSteps = [
  {
    title: "Aumentando o número máximo de conexões",
    code: "[live]\nmax_connections = 500 # Ajuste conforme necessário",
    description: "No arquivo p360.ini ajuste o número máximo de conexões."
  },
  {
    title: "Configuração de streaming com Telegraf",
    code: null,
    description: "Para enviar os dados de métricas via Telegraf, deve-se utilizar o endpoint de API (/api/live/push/:streamId). Em seguida, configurar o Telegraf para enviar dados no formato Influx para esse endpoint."
  },
  {
    title: "Ajustes para alto tráfego",
    code: "ulimit -n 10000 # Ajuste de acordo com o número de conexões\nsysctl -w net.ipv4.ip_local_port_range=\"1024 65535\"",
    description: "Manter as conexões WebSocket persistentes pode consumir os recursos do sistema. Aumente o limite de descritores de arquivo e a faixa de portas efêmeras."
  },
  {
    title: "Configuração de alta disponibilidade (HA) com Redis",
    code: "[live]\nha_engine = redis\nha_engine_address = 127.0.0.1:6379",
    description: "Para o balanceamento de carga em várias instâncias do PMC P360, configurar o Redis para compartilhar o estado do P360 Live entre as instâncias."
  }
];

export default function RefreshAutomatico() {
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
          <RefreshCw className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Dados em tempo real: Refresh automático</h1>
          <p className="mt-1 text-muted-foreground">
            Configuração de atualização automática de dados em tempo real.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre o Refresh Automático</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Todos os dashboards do PMC P360 possuem o recurso "refresh automático", este apresenta os dados logo que eles são 
          disponibilizados pelos coletores/plugins. Esse recurso permite ao usuário a possibilidade de acompanhar e acessar 
          os dados mais recentes. Por exemplo: acessar os LOGs disponibilizados pelo sistema operacional.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Esse recurso é limitado à origem dos dados para coleta, por exemplo: os coletores de nuvem têm uma taxa de 
          atualização com variação entre 5 a 15 minutos. O procedimento para ativar o realtime refresh dos dashboards 
          é clicar no botão "Refresh Dashboard" que está localizado do lado direito superior da tela.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/052_refresh_automatico.png" alt="Refresh automático" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Botão de Refresh Dashboard no canto superior direito</p>
        </div>
      </section>

      {/* P360 Live */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">P360 Live</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O P360 Live é um mecanismo de mensagens em tempo real, introduzido na versão 8.0 do PMC P360. Ao utilizar o P360 Live, 
          o usuário pode enviar dados de eventos para a interface, assim que um evento ocorrer, eliminando a necessidade de 
          recarregar a página ou fazer "polling" constante.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          O P360 Live permite transmitir dados de sensores da Internet das Coisas (IoT) ou qualquer outro dado em tempo real 
          para os painéis.
        </p>
      </section>

      {/* Aviso */}
      <section className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">Importante</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
              Tempo real refere-se a uma "quase" baixa latência. Por conta das latências de rede, ciclos de "garbage collection", 
              entre outros, o atraso na entrega de uma mensagem pode chegar a centenas de milissegundos ou mais.
            </p>
          </div>
        </div>
      </section>

      {/* Conceitos */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Conceitos</h2>
        <p className="text-muted-foreground leading-relaxed">
          O P360 Live envia dados para os seus usuários clientes através de uma conexão WebSocket persistente. A interface do 
          PMC P360 se inscreve em canais para receber dados publicados, nesses canais, utiliza a mecânica PUB/SUB. Todas as 
          inscrições em uma página são multiplexadas dentro de uma única conexão WebSocket. Por padrão, o P360 Live suporta 
          até 100 conexões simultâneas.
        </p>
      </section>

      {/* Funcionalidades */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Funcionalidades do P360 Live</h2>
        <div className="space-y-4">
          {features.map(({ title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Estrutura do Canal */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Estrutura do Canal P360 Live</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O P360 Live funciona como um servidor PUB/SUB, no qual os usuários clientes se inscrevem em canais para receber 
          atualizações em tempo real. Um canal no P360 é identificado por uma string composta de três partes, separadas por barras (/).
        </p>
        <div className="space-y-3">
          {channelStructure.map(({ term, description }) => (
            <div key={term} className="border-l-2 border-primary/20 pl-4">
              <h3 className="font-medium text-foreground mb-1">{term}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium text-foreground mb-1">Exemplo de Canal:</p>
          <code className="text-sm text-primary">ds/&lt;UID_FONTE_DADOS&gt;/&lt;CAMINHO_PERSONALIZADO&gt;</code>
        </div>
      </section>

      {/* Configuração */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Configurando o P360 Live</h2>
        <p className="text-muted-foreground mb-4">
          O P360 Live está ativado por padrão e permite até 100 conexões WebSocket simultâneas. Se precisar aumentar esse limite, 
          siga os passos abaixo:
        </p>
        <div className="space-y-4">
          {configSteps.map((step, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.description}</p>
              {step.code && (
                <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs">
                  <code>{step.code}</code>
                </pre>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Formato dos Dados */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Formato dos Dados</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              Todos os dados transmitidos pelos canais do P360 Live devem ser codificados em JSON. Após seguir os passos 
              para essa configuração, o P360 Live está preparado para transmitir as notificações de mudanças em painéis, 
              dados em tempo real via Telegraf ou plugins, e muito mais.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
