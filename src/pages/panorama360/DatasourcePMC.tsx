import { ArrowLeft, Database, CheckCircle2, Server, Key, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const prerequisites = [
  {
    icon: Server,
    title: "Conta AWS",
    description: "Uma conta ativa na AWS."
  },
  {
    icon: Key,
    title: "Permissões AWS",
    description: "As credenciais IAM configuradas com permissões para acessar métricas do CloudWatch, logs, ou outros serviços que deseja monitorar."
  },
  {
    icon: Shield,
    title: "Acesso ao PMC P360",
    description: "Acesso de administrador ou permissões necessárias para configurar datasources."
  },
  {
    icon: Database,
    title: "AWS CloudWatch Plugin (Opcional)",
    description: "Certifique-se de que o plugin AWS CloudWatch está instalado na sua instância (presente por padrão na maioria das instalações)."
  }
];

const iamPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cloudwatch:Describe*",
        "cloudwatch:GetMetricData",
        "cloudwatch:ListMetrics",
        "cloudwatch:GetMetricStatistics",
        "ec2:DescribeInstances",
        "ec2:DescribeTags",
        "ec2:DescribeRegions",
        "logs:FilterLogEvents",
        "logs:GetLogEvents",
        "logs:DescribeLogGroups",
        "logs:StartQuery",
        "logs:DescribeLogStreams",
        "logs:GetQueryResults"
      ],
      "Resource": "*"
    }
  ]
}`;

export default function DatasourcePMC() {
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
          <Database className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Conectando e configurando Datasource</h1>
          <p className="mt-1 text-muted-foreground">
            Como conectar e configurar fontes de dados no PMC P360.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre o Datasource AWS</h2>
        <p className="text-muted-foreground leading-relaxed">
          Este tópico apresenta o processo de configuração de um datasource no PMC P360, que é a solução de monitoramento, 
          para coletar métricas e logs. O objetivo é guiar o usuário passo a passo, garantindo que os dados sejam integrados 
          e monitorados eficientemente.
        </p>
      </section>

      {/* Pré-requisitos */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Pré-requisitos</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {prerequisites.map(({ icon: Icon, title, description }) => (
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

      {/* Passo 1 */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
            1
          </div>
          <h2 className="text-xl font-semibold text-foreground">Passo 1: Acessando o PMC P360</h2>
        </div>
        <ul className="space-y-3 ml-11">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Acessar o painel de controle do PMC P360 utilizando as suas credenciais.</span>
          </li>
        </ul>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/003_inserir_credenciais.png" alt="Inserir credenciais" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Acessar o painel com credenciais</p>
        </div>
        <ul className="space-y-3 ml-11 mt-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">No painel lateral esquerdo 'Home' clicar no menu de funcionalidades 'Connections' e depois selecionar 'Data sources' (Fontes de dados).</span>
          </li>
        </ul>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/008_home_fontes_dados.png" alt="Home fontes de dados" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Menu Connections {'>'} Data sources</p>
        </div>
      </section>

      {/* Passo 2 */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
            2
          </div>
          <h2 className="text-xl font-semibold text-foreground">Passo 2: Adicionando um Novo Datasource</h2>
        </div>
        <ul className="space-y-3 ml-11">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Clicar no botão 'Add new data source' (Adicionar fonte de dados).</span>
          </li>
        </ul>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/011_adicionar_nova_fonte_dados.png" alt="Adicionar nova fonte dados" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Botão para adicionar nova fonte de dados</p>
        </div>
        <ul className="space-y-3 ml-11 mt-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Na lista de datasources disponíveis, é possível inserir na busca a fonte de dados desejada.</span>
          </li>
        </ul>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/012_filtrar_fonte_dados.png" alt="Filtrar fonte de dados" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Campo de busca para filtrar datasources</p>
        </div>
        <ul className="space-y-3 ml-11 mt-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Neste caso, o usuário deve selecionar Amazon CloudWatch.</span>
          </li>
        </ul>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/013_selecionar_cloudwatch_aws.png" alt="Selecionar CloudWatch AWS" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Selecionar Amazon CloudWatch</p>
        </div>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/014_datasource_aws.png" alt="Datasource AWS" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Tela de configuração do datasource AWS</p>
        </div>
      </section>

      {/* Passo 3 */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
            3
          </div>
          <h2 className="text-xl font-semibold text-foreground">Passo 3: Configuração das Credenciais AWS</h2>
        </div>
        <ul className="space-y-3 ml-11">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Neste ponto do processo, é preciso configurar as credenciais em 'Connection Details' para que o PMC P360 tenha acesso à sua conta AWS.</span>
          </li>
        </ul>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/015_detalhes_conexao.png" alt="Detalhes da conexão" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Configuração dos detalhes de conexão</p>
        </div>
        <ul className="space-y-3 ml-11 mt-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Preencher o campo 'Authentication Provider', selecionar 'Credentials file' ou 'Assume Role'.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Colocar a role criada através do CloudFormation.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed"><strong>Roles da AWS (Recomendado):</strong> Se preferir não utilizar as chaves de acesso diretamente, é possível configurar o PMC P360 para utilizar uma IAM Role com as permissões apropriadas.</span>
          </li>
        </ul>
      </section>

      {/* Passo 4 */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
            4
          </div>
          <h2 className="text-xl font-semibold text-foreground">Passo 4: Testar a conexão</h2>
        </div>
        <ul className="space-y-3 ml-11">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Após preencher todas as configurações, clicar em 'Save & Test' (Salvar e Testar).</span>
          </li>
        </ul>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/016_salvar_testar.png" alt="Salvar e testar" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Botão Save & Test</p>
        </div>
        <ul className="space-y-3 ml-11 mt-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Se as credenciais e permissões estiverem corretas, o PMC P360 exibe uma mensagem indicando que a conexão com o datasource AWS está estabelecida com sucesso.</span>
          </li>
        </ul>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/017_mensagem.png" alt="Mensagem de sucesso" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Mensagem de conexão bem sucedida</p>
        </div>
      </section>

      {/* IAM Policy */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Exemplo de IAM Policy</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Permissões necessárias para o datasource AWS CloudWatch:
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
          <code>{iamPolicy}</code>
        </pre>
      </section>

      {/* Sucesso */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Sucesso</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              Ao finalizar estas etapas, significa que a conta AWS foi integrada ao PMC P360 e o monitoramento das métricas 
              e dos logs foi configurado. Agora, o usuário pode visualizar os dados em tempo real, configurar os painéis 
              personalizados, e definir os alertas que o mantêm informado sobre o status dos seus serviços na AWS.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
