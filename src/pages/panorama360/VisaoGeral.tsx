import { ArrowLeft, Globe, CheckCircle2, Zap, Eye, Bell, BarChart3, Lock, FileText, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const features = [
  {
    icon: Zap,
    title: "Monitoramento em Tempo Real",
    description:
      "Obtenha insights imediatos sobre o estado operacional dos seus sistemas e aplicativos, permitindo a detecção proativa de problemas e a tomada de ações rápidas.",
  },
  {
    icon: Eye,
    title: "Visibilidade Abrangente",
    description:
      "O Panorama 360 oferece uma visão holística de toda a sua infraestrutura, desde servidores e bancos de dados até serviços na nuvem, proporcionando uma compreensão detalhada do ambiente.",
  },
  {
    icon: Bell,
    title: "Alertas Inteligentes",
    description:
      "Configure alertas personalizados com base em métricas específicas para ser notificado instantaneamente sobre eventos críticos, permitindo a resolução rápida de problemas antes que impactem os usuários.",
  },
  {
    icon: BarChart3,
    title: "Rastreamento de Desempenho",
    description:
      "Analise o desempenho de aplicativos detalhadamente, identificando gargalos e otimizando recursos para proporcionar a melhor experiência do usuário.",
  },
];

const additionalFeatures = [
  {
    icon: Globe,
    title: "Integração Flexível",
    description:
      "Integre facilmente o Panorama 360 com suas ferramentas e plataformas favoritas, proporcionando uma experiência de monitoramento unificada e interoperável.",
  },
  {
    icon: BarChart3,
    title: "Visualizações Personalizadas",
    description:
      "Crie dashboards personalizados para atender às necessidades específicas da sua equipe, proporcionando uma interface intuitiva para análises rápidas e eficientes.",
  },
  {
    icon: Lock,
    title: "Segurança dos Dados",
    description:
      "Mantenha a segurança dos dados com recursos avançados de criptografia e autenticação, garantindo que informações sensíveis estejam protegidas contra ameaças cibernéticas.",
  },
  {
    icon: FileText,
    title: "Logs e Rastreamento",
    description:
      "Agregue logs e rastreamento de maneira centralizada para simplificar a solução de problemas e melhorar a resolução rápida de incidentes.",
  },
  {
    icon: Shield,
    title: "Segurança Avançada",
    description:
      "Garanta a conformidade e a proteção dos seus sistemas com recursos avançados de monitoramento de segurança.",
  },
];

const benefits = [
  "Aumento da Eficiência Operacional: Identifique e resolva problemas rapidamente, minimizando o tempo de inatividade e otimizando a eficiência operacional.",
  "Melhoria da Experiência do Usuário: Garanta uma experiência do usuário consistente ao monitorar e otimizar o desempenho de aplicativos e serviços críticos.",
  "Informações para Tomada de Decisão: Baseie suas decisões em dados confiáveis, obtendo uma compreensão profunda do ambiente de TI.",
];

const topics = [
  "Acessar e fazer login no Panorama 360",
  "Autenticar com o Google Cloud",
  "Dashboards e Painéis: como criar e gerenciar",
  "Conectar e configurar datasources",
  "Criação e Manutenção de Dashboards",
  "Adicionar novo cliente na tela de monitoramento",
  "Configuração de Alertas e notificações",
  "Silenciar e gerenciar silenciamentos de alertas",
  "Configuração de consultas e condições de alertas",
  "Explorando e analisando os Logs",
  "Instalação e configuração do Agente",
];

export default function VisaoGeral() {
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
          <Globe className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t('panorama360.overviewTitle')}</h1>
          <p className="mt-1 text-muted-foreground">
            {t('panorama360.overviewSubtitle')}
          </p>
        </div>
      </div>

      {/* Apresentação */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">{t('panorama360.presentation')}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Bem-vindo ao módulo <strong className="text-foreground">Panorama 360</strong> — uma poderosa ferramenta de monitoramento desenvolvida pela Ustore.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          O Panorama 360 é uma solução abrangente de observabilidade e monitoramento projetada para atender às demandas crescentes de ambientes complexos e dinâmicos. Desenvolvido para proporcionar visibilidade total sobre sistemas, aplicativos e infraestrutura, é um produto ideal para garantir o desempenho, a confiabilidade e a eficiência das suas operações.
        </p>
      </section>

      {/* Principais características */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">{t('panorama360.mainFeatures')}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Funcionalidades adicionais */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">{t('panorama360.additionalFeatures')}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {additionalFeatures.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* O Panorama 360 */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">{t('panorama360.aboutTitle')}</h2>
        <div className="space-y-3 text-muted-foreground leading-relaxed">
          <p>
            O Panorama 360 é a solução ideal para os clientes que buscam uma ferramenta de monitoramento e observabilidade que ofereça uma visão abrangente e em tempo real do desempenho, saúde e disponibilidade das suas aplicações e infraestrutura.
          </p>
          <p>
            A plataforma é capaz de auxiliar a prever e prevenir os problemas antes que eles afetem os usuários finais, fornecendo insights detalhados sobre a complexidade dos seus sistemas para facilitar a otimização de recursos e a tomada de decisões informadas. Ela objetiva ser uma ferramenta intuitiva e flexível, integrando-se perfeitamente com as diversas plataformas.
          </p>
          <p>
            Facilitando a colaboração entre equipes de desenvolvimento, operações e negócios, com recursos da análise avançada, alertas inteligentes e relatórios personalizáveis. O Panorama 360 visa ajudar a manter a excelência operacional, melhorar a eficiência e garantir a melhor experiência ao usuário, fortalecendo assim a continuidade e o sucesso dos negócios.
          </p>
          <p>
            Este documento é projetado para guiar usuários de perfil tipo <strong className="text-foreground">Administrador</strong> e <strong className="text-foreground">Editor</strong> através das principais funcionalidades do Panorama 360.
          </p>
        </div>
      </section>

      {/* Benefícios */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t('common.benefits')}</h2>
        <ul className="space-y-3">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Tópicos abordados */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t('panorama360.docTopics')}</h2>
        <ul className="space-y-2">
          {topics.map((topic, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary shrink-0">
                {i + 1}
              </span>
              <p className="text-sm text-muted-foreground">{topic}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Transforme Seus Dados */}
      <section className="rounded-xl border border-primary/20 bg-primary/5 p-6">
        <h2 className="text-xl font-semibold text-foreground mb-3">{t('panorama360.transformTitle')}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Este guia fornece uma visão abrangente que auxilia a maximizar o potencial desta plataforma em suas operações diárias. Descubra o poder do uMonitor, a solução de monitoramento e visualização de dados que revolucionará a forma como sua equipe trabalha.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { n: "1", title: "Visibilidade Completa", desc: "Acesse informações em tempo real e obtenha insights valiosos para tomada de decisões mais rápidas e precisas." },
            { n: "2", title: "Personalização Avançada", desc: "Crie dashboards personalizados que atendem às necessidades específicas do seu negócio." },
            { n: "3", title: "Colaboração Facilitada", desc: "Compartilhe dados e insights com sua equipe para promover uma cultura de dados integrada." },
          ].map(({ n, title, desc }) => (
            <div key={n} className="rounded-lg bg-card border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {n}
                </span>
                <h3 className="font-semibold text-foreground text-sm">{title}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
