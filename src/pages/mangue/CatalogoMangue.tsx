import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, Package, CheckCircle2, Plus, FileCode, Settings, Code, Info, Layers, Server, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const deploySteps = [
  { step: 1, title: "Informações Básicas", description: "Nome, namespace e labels da aplicação" },
  { step: 2, title: "Container", description: "Imagem, portas e variáveis de ambiente" },
  { step: 3, title: "Recursos", description: "Limites de CPU e memória" },
  { step: 4, title: "Volumes", description: "ConfigMaps, Secrets e PVCs" },
  { step: 5, title: "Rede", description: "Services e Ingress" },
  { step: 6, title: "Revisão", description: "Confirmação e deploy" }
];

export default function CatalogoMangue() {
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
          <Package className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('mangue.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Catálogo</h1>
          <p className="mt-1 text-muted-foreground">
            Deploy de novas aplicações e gerenciamento de configurações.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t('common.overview')}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O menu <strong>Catálogo</strong> permite implantar novas aplicações no cluster Kubernetes 
          de forma simples e intuitiva, sem necessidade de conhecimento avançado em YAML ou kubectl.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/mangue/055_mangue_catalogo.png" 
            alt="Menu Catálogo" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela inicial do Catálogo</p>
        </div>
      </section>

      {/* Nova Aplicação */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Nova Aplicação</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O assistente de criação guia você através de todas as etapas necessárias para 
          implantar uma nova aplicação containerizada no cluster.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-6">
          <img 
            src="/images/mangue/056_mangue_catalogo_nova_app.png" 
            alt="Nova Aplicação" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Wizard de nova aplicação</p>
        </div>

        <h3 className="font-semibold text-foreground mb-4">Etapas do Deploy</h3>
        <div className="space-y-3">
          {deploySteps.map(({ step, title, description }) => (
            <div key={step} className="flex items-start gap-4 p-3 bg-muted/30 rounded-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                {step}
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">{title}</h4>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Informações Básicas */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Etapa 1: Informações Básicas</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Defina o nome da aplicação, namespace de destino e labels para identificação.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/057_mangue_catalogo_step1.png" 
            alt="Informações Básicas" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Formulário de informações básicas</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Nome:</strong> Identificador único da aplicação (lowercase, sem espaços)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Namespace:</strong> Espaço lógico de isolamento no cluster</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Labels:</strong> Metadados para organização e seleção</span>
          </li>
        </ul>
      </section>

      {/* Container */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Server className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Etapa 2: Configuração do Container</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Configure a imagem Docker, portas expostas e variáveis de ambiente necessárias.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/058_mangue_catalogo_step2.png" 
            alt="Configuração Container" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Configuração do container</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Imagem:</strong> URL da imagem Docker (ex: nginx:latest)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Portas:</strong> Portas que o container expõe</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Variáveis:</strong> Variáveis de ambiente para configuração</span>
          </li>
        </ul>
      </section>

      {/* Recursos */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Etapa 3: Recursos</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Defina os limites e requisições de CPU e memória para o container.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/059_mangue_catalogo_step3.png" 
            alt="Recursos" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Configuração de recursos</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold text-foreground text-sm mb-2">Requests (Requisição)</h4>
            <p className="text-xs text-muted-foreground">Recursos mínimos garantidos para o container</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold text-foreground text-sm mb-2">Limits (Limites)</h4>
            <p className="text-xs text-muted-foreground">Máximo de recursos que o container pode usar</p>
          </div>
        </div>
      </section>

      {/* Deploy via YAML */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <FileCode className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Deploy via YAML</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Para usuários avançados, é possível fazer deploy diretamente via arquivo YAML, 
          permitindo total controle sobre a configuração do recurso Kubernetes.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/065_mangue_catalogo_yaml.png" 
            alt="Deploy YAML" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Editor YAML</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Suporta todos os tipos de recursos Kubernetes</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Validação de sintaxe em tempo real</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Import de arquivos YAML existentes</span>
          </li>
        </ul>
      </section>

      {/* ConfigMaps */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">ConfigMaps</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>ConfigMaps</strong> permitem separar configurações do código da aplicação, 
          facilitando a portabilidade entre ambientes (dev, staging, produção).
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/070_mangue_catalogo_configmap.png" 
            alt="ConfigMaps" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de ConfigMaps</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/071_mangue_catalogo_configmap_criar.png" 
              alt="Criar ConfigMap" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Criar ConfigMap</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/072_mangue_catalogo_configmap_detalhe.png" 
              alt="Detalhe ConfigMap" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Detalhes do ConfigMap</p>
          </div>
        </div>
      </section>

      {/* VS Code Server */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Code className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">VS Code Server</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A plataforma oferece um <strong>VS Code Server</strong> integrado, permitindo editar 
          arquivos de configuração e código diretamente no navegador, conectado ao cluster.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/075_mangue_vscode_server.png" 
            alt="VS Code Server" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">VS Code Server no navegador</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Edição de YAMLs diretamente no cluster</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Terminal integrado com kubectl</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Extensões do VS Code disponíveis</span>
          </li>
        </ul>
      </section>

      {/* Services */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Exposição da Aplicação</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Configure como sua aplicação será exposta internamente ou externamente através de Services e Ingress.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/078_mangue_catalogo_service.png" 
            alt="Services" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Configuração de Service</p>
        </div>
        <div className="grid gap-3">
          <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <div>
              <span className="font-medium text-foreground text-sm">ClusterIP</span>
              <p className="text-xs text-muted-foreground">Acesso interno no cluster</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <div>
              <span className="font-medium text-foreground text-sm">NodePort</span>
              <p className="text-xs text-muted-foreground">Acesso via porta do node</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <div>
              <span className="font-medium text-foreground text-sm">LoadBalancer</span>
              <p className="text-xs text-muted-foreground">Acesso externo via balanceador</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nota */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Dica</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              Para aplicações stateless simples, utilize o wizard de nova aplicação. Para 
              configurações mais complexas ou recursos específicos (StatefulSets, Jobs, CronJobs), 
              utilize o deploy via YAML.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

