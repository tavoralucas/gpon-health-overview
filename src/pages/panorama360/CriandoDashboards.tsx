import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, PlusSquare, CheckCircle2, Save, Share2, Settings, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";

const useCases = [
  {
    title: "Engenheiro de Operações",
    description: "Responsável por monitorar a performance de uma aplicação web crítica. Um Dashboard no PMC P360 pode ser configurado para mostrar gráficos de uso de CPU, memória, tráfego de rede e latência de resposta em tempo real."
  },
  {
    title: "Equipes de Marketing Digital",
    description: "Podem utilizar dashboards para monitorar o desempenho das campanhas online, visualizando cliques, conversões e outros KPIs em um único lugar. Isso facilita o ajuste de estratégias em tempo real."
  }
];

const steps = [
  {
    title: "Passo 1: Acessando o Menu Dashboards",
    items: [
      "Tudo começa no menu principal do PMC P360. Nele encontra-se a opção 'Dashboards', onde pode visualizar os existentes ou começar a criar um novo.",
      "Navegar até o Menu de Dashboards: No menu lateral, clicar em 'Dashboards'. Esta área serve como um hub para todos os seus dashboards."
    ],
    image: "/images/panorama360/004_home_dashboards.png",
    imageAlt: "Menu Home Dashboards"
  },
  {
    title: "Passo 2: Criando um Novo Dashboard",
    items: [
      "Pressionar o botão 'Novo' e selecione 'Novo Dashboard'. Um dashboard em branco é exibido, pronto para ser preenchido.",
      "No dashboard vazio, clicar em '+ Adicionar visualização'. Esta ação resulta na abertura de uma caixa de diálogo onde o usuário pode começar a configurar o seu primeiro painel."
    ],
    images: [
      { src: "/images/panorama360/005_dashboards_new.png", alt: "Dashboards New" },
      { src: "/images/panorama360/006_new_dashboard.png", alt: "New Dashboard" },
      { src: "/images/panorama360/007_add_visualizar.png", alt: "Adicionar visualização" }
    ]
  },
  {
    title: "Passo 3: Selecionando e Configurando Fontes de Dados",
    items: [
      "Selecionando Fonte de Dados: O usuário tem a opção de selecionar uma fonte de dados existente, utilizar uma das fontes de dados integradas do PMC P360, ou configurar uma nova fonte.",
      "Configurando a Consulta: Após selecionar a fonte de dados, é preciso escrever ou construir uma consulta que informa ao painel quais dados mostrar.",
      "Atualizando para visualizar os Resultados: Clicar no botão 'Atualizar' para que a fonte de dados seja consultada."
    ],
    image: "/images/panorama360/008_home_fontes_dados.png",
    imageAlt: "Home fontes de dados"
  },
  {
    title: "Passo 4: Personalizando a Visualização",
    items: [
      "Selecionando o Tipo de Visualização: O PMC P360 oferece gráficos de linhas, barras, tabelas, medidores e mapas de calor.",
      "Configurando a Aparência: Adicionar título e descrição, configurar mapeamentos de valores e ajustar opções de visualização (cores, legendas, eixos).",
      "Salvar as Configurações: Clicar em 'Salvar dashboard' para manter todas as configurações."
    ],
    images: [
      { src: "/images/panorama360/009_home_dash_personalizar.png", alt: "Home dash personalizar" },
      { src: "/images/panorama360/010_personaliza_tipo_visualizar.png", alt: "Personalizar tipo de visualização" }
    ]
  },
  {
    title: "Passo 5: Adicionando e Organizando mais Painéis",
    items: [
      "Repetir o processo de adicionar e configurar painéis, conforme necessário, para completar seu Dashboard.",
      "Arrastando e Soltando: Reorganizar os painéis arrastando-os para a posição desejada.",
      "Redimensionando: Ajuste o tamanho dos painéis para que todos os dados sejam visíveis."
    ]
  },
  {
    title: "Passo 6: Customizando o Dashboard como um todo",
    items: [
      "Configurações do Dashboard: Clicando no ícone de engrenagem no canto superior direito, é possível modificar o título, descrição e tema do Dashboard.",
      "Configurando Alertas (Opcional): Se deseja ser notificado quando certos valores atingirem um limite, pode configurar alertas."
    ]
  },
  {
    title: "Passo 7: Salvando e Compartilhando o Dashboard",
    items: [
      "Salvando o Dashboard: Clicar no ícone de disquete no canto superior direito para salvar. Escolher um nome descritivo.",
      "Compartilhando o Dashboard: É possível compartilhar um link direto, exportar em formato JSON, ou gerar um link público se permitido."
    ]
  },
  {
    title: "Passo 8: Manutenção e Atualização do Dashboard",
    items: [
      "Atualizando Dados: Regularmente revise as suas consultas e as fontes de dados para certificar que as informações sejam precisas.",
      "Revisando e Ajustando Alertas: Se configurou alertas, revise-os periodicamente para ter certeza que continuam relevantes."
    ]
  }
];

export default function CriandoDashboards() {
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
          <PlusSquare className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Criando e gerenciando Dashboards</h1>
          <p className="mt-1 text-muted-foreground">
            {t('common.usageSteps')}
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Construindo a visão certa</h2>
        <p className="text-muted-foreground leading-relaxed">
          Criar um dashboard no PMC P360 é como projetar o layout de um jornal: ao diagramar um jornal, o editor precisa 
          decidir quais informações são mais importantes e como elas devem ser organizadas para contar uma história clara 
          e eficaz. Este material é um guia com o passo a passo para ajudar o usuário a construir Dashboards que realmente 
          façam a diferença para o seu negócio.
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
                  <LayoutGrid className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
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
          <ul className="space-y-3 ml-11">
            {step.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          {step.image && (
            <div className="mt-4 rounded-lg border border-border overflow-hidden">
              <img src={step.image} alt={step.imageAlt} className="w-full h-auto" />
              <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">{step.imageAlt}</p>
            </div>
          )}
          {step.images && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {step.images.map((img, imgIdx) => (
                <div key={imgIdx} className="rounded-lg border border-border overflow-hidden">
                  <img src={img.src} alt={img.alt} className="w-full h-auto" />
                  <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">{img.alt}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Dica Final */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Dica</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              Um bom Dashboard raramente é composto por apenas um painel. Dependendo da complexidade dos dados a serem 
              monitorados, é possível adicionar vários painéis para capturar diferentes aspectos. Cada painel deve focar 
              em uma métrica ou conjunto de métricas que sejam críticas para o seu monitoramento.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

