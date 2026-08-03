import { ArrowLeft, MessageCircle, CheckCircle2, Bot, Hash, Settings, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const steps = [
  {
    title: "Passo 1: Como criar um Bot no Telegram",
    icon: Bot,
    items: [
      "Abrir o Telegram. Nele, procurar por @BotFather no campo de busca.",
      "O usuário precisa iniciar uma conversa com o BotFather clicando em /start.",
      "Enviar o comando /newbot para criar um novo bot.",
      "Seguir as instruções do BotFather: Criar um nome para seu bot (ex.: 'P360 Alert Bot') e escolher um nome de usuário para o bot, que deve terminar com o termo Bot (ex.: @P360AlertBot).",
      "Após a criação, o BotFather fornece um Token de API (ex.: 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11).",
      "Copiar e armazenar este token em um local seguro, pois ele é necessário para configurar a integração."
    ],
    images: [
      { src: "/images/panorama360/055_botFatherFirst.png", alt: "Primeira interação com BotFather" },
      { src: "/images/panorama360/056_botFatherSlash.png", alt: "Comandos do BotFather" }
    ]
  },
  {
    title: "Passo 2: Obtendo o Chat ID ou Group ID",
    icon: Hash,
    items: [
      "Para que o bot envie mensagens, o usuário precisa do Chat ID (para mensagens privadas) ou Group ID (para grupos ou canais).",
      "Iniciar uma conversa com o bot criado (ex.: @P360AlertBot)."
    ],
    preImage: { src: "/images/panorama360/057_idBOT.png", alt: "Iniciando conversa com o bot" },
    subSections: [
      {
        subtitle: "Para Chat Privado:",
        items: [
          "Enviar o comando /start para ativar o bot.",
          "Abrir outra conversa no Telegram com @myidbot e enviar o comando /getid.",
          "O bot retorna seu Chat ID (ex.: 123456789). Anotar este ID."
        ],
        image: { src: "/images/panorama360/058_pegandoID.png", alt: "Obtendo Chat ID" }
      },
      {
        subtitle: "Para Grupo ou Canal:",
        items: [
          "Adicionar o bot criado ao grupo ou canal desejado.",
          "Incluir também o @myidbot ao mesmo grupo.",
          "No grupo, enviar o comando /getgroupid@myidbot. O bot retorna o Group ID (ex.: -123456789).",
          "Enviar /start@SeuBotNome (ex.: /start@P360AlertBot) no grupo para ativar o bot."
        ],
        image: { src: "/images/panorama360/059_pegandoGroupID.png", alt: "Obtendo Group ID" }
      }
    ]
  },
  {
    title: "Passo 3: Configurando o Contact Point no PMC P360",
    icon: Settings,
    items: [
      "Acessar o PMC P360, fazer o login com uma conta administrativa.",
      "No menu lateral, clicar em Alerting > Contact Points.",
      "Clicar em 'New contact point'."
    ],
    preImage: { src: "/images/panorama360/060_contactPoint.png", alt: "Menu Contact Points" },
    configItems: [
      "Configurar os campos: Name (nomear o contact point), Integration (selecionar Telegram), Bot API Token (inserir o token do bot) e Chat ID (inserir o Chat ID ou Group ID)."
    ],
    configImage: { src: "/images/panorama360/061_umonitorconfig.png", alt: "Configuração do Contact Point" },
    finalItems: [
      "Clicar em 'Test' para enviar uma mensagem de teste ao Telegram.",
      "Verificar se a mensagem aparece no chat ou grupo configurado.",
      "Clicar em 'Save contact point' para salvar."
    ],
    finalImage: { src: "/images/panorama360/062_testeFinal.png", alt: "Teste bem sucedido" }
  }
];

const optionalParams = [
  {
    param: "parse_mode",
    description: "Definir formatação (Markdown/HTML) para as mensagens"
  },
  {
    param: "disable_notification",
    description: "Silenciar os alertas para não gerar notificações sonoras"
  },
  {
    param: "reply_markup",
    description: "Adicionar botões interativos às mensagens"
  }
];

export default function IntegracaoTelegram() {
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
          <MessageCircle className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Integração com Telegram</h1>
          <p className="mt-1 text-muted-foreground">
            Configure alertas via Telegram para seu ambiente.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre a Integração</h2>
        <p className="text-muted-foreground leading-relaxed">
          Para enviar mensagens do PMC P360 ao Telegram, primeiro o usuário deve criar um bot utilizando a ferramenta 
          BotFather. Este guia mostra o passo a passo completo para configurar a integração e começar a receber 
          notificações de alertas diretamente no Telegram.
        </p>
      </section>

      {/* Steps */}
      {steps.map((step, index) => (
        <section key={index} className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <step.icon className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">{step.title}</h2>
          </div>
          <ul className="space-y-3 mb-4">
            {step.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          {step.images && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {step.images.map((img, imgIndex) => (
                <div key={imgIndex} className="border border-border rounded-lg overflow-hidden">
                  <img src={img.src} alt={img.alt} className="w-full h-auto" />
                  <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">{img.alt}</p>
                </div>
              ))}
            </div>
          )}
          {step.preImage && (
            <div className="border border-border rounded-lg overflow-hidden mb-4">
              <img src={step.preImage.src} alt={step.preImage.alt} className="w-full h-auto" />
              <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">{step.preImage.alt}</p>
            </div>
          )}
          {step.subSections && step.subSections.map((sub, subIndex) => (
            <div key={subIndex} className="mt-4 ml-6 border-l-2 border-primary/20 pl-4">
              <h3 className="font-medium text-foreground mb-2">{sub.subtitle}</h3>
              <ul className="space-y-2">
                {sub.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <span className="text-primary text-sm">•</span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              {sub.image && (
                <div className="border border-border rounded-lg overflow-hidden mt-3">
                  <img src={sub.image.src} alt={sub.image.alt} className="w-full h-auto" />
                  <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">{sub.image.alt}</p>
                </div>
              )}
            </div>
          ))}
          {step.configItems && (
            <ul className="space-y-3 mb-4">
              {step.configItems.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
          {step.configImage && (
            <div className="border border-border rounded-lg overflow-hidden mb-4">
              <img src={step.configImage.src} alt={step.configImage.alt} className="w-full h-auto" />
              <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">{step.configImage.alt}</p>
            </div>
          )}
          {step.finalItems && (
            <ul className="space-y-3 mb-4">
              {step.finalItems.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
          {step.finalImage && (
            <div className="border border-border rounded-lg overflow-hidden">
              <img src={step.finalImage.src} alt={step.finalImage.alt} className="w-full h-auto" />
              <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">{step.finalImage.alt}</p>
            </div>
          )}
        </section>
      ))}

      {/* Parâmetros Opcionais */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Send className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Parâmetros Opcionais</h2>
        </div>
        <p className="text-muted-foreground mb-4 text-sm">
          O usuário pode usar parâmetros opcionais para personalizar as mensagens:
        </p>
        <div className="space-y-3">
          {optionalParams.map(({ param, description }) => (
            <div key={param} className="flex items-start gap-3 border-l-2 border-primary/20 pl-4">
              <code className="bg-muted px-2 py-0.5 rounded text-sm text-primary shrink-0">{param}</code>
              <span className="text-sm text-muted-foreground">{description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sucesso */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Integração Completa!</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              Após configurar o Contact Point, você começará a receber notificações de alertas do PMC P360 
              diretamente no seu Telegram, seja em chat privado ou em grupos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
