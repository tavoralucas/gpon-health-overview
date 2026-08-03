import { ArrowLeft, Cloud, CheckCircle2, Server, HardDrive, Globe, Database, Plus, Trash2, Upload, Download, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const resources = [
  {
    title: "Virtual Machine",
    icon: Server,
    description: "Criar máquinas virtuais imaginárias com configurações específicas de CPU, memória e sistema operacional."
  },
  {
    title: "Load Balancer",
    icon: Globe,
    description: "Simular balanceadores de carga para distribuição de tráfego entre instâncias."
  },
  {
    title: "Storage",
    icon: HardDrive,
    description: "Criar recursos de armazenamento com diferentes tipos e capacidades."
  },
  {
    title: "IP",
    icon: Globe,
    description: "Simular alocação de endereços IP públicos para suas instâncias."
  },
  {
    title: "Database",
    icon: Database,
    description: "Criar bancos de dados com diferentes engines e configurações de recursos."
  }
];

const createSteps = [
  {
    step: 1,
    title: "Acessar Imaginary Cloud",
    description: "No menu lateral, clicar em 'Imaginary Cloud' para acessar a funcionalidade."
  },
  {
    step: 2,
    title: "Criar ambiente imaginário",
    description: "Clicar em 'Create' para iniciar a criação de um novo ambiente imaginário."
  },
  {
    step: 3,
    title: "Nomear o container",
    description: "Inserir um nome para o container imaginário e configurar as opções desejadas."
  },
  {
    step: 4,
    title: "Adicionar recursos",
    description: "Adicionar os recursos necessários: VMs, Load Balancers, Storage, IPs ou Databases."
  },
  {
    step: 5,
    title: "Configurar cada recurso",
    description: "Para cada recurso, definir as especificações como região, tipo, tamanho e sistema operacional."
  },
  {
    step: 6,
    title: "Visualizar estimativa",
    description: "Verificar a estimativa de custos consolidada para o ambiente imaginário criado."
  }
];

export default function ImaginaryCloud() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/finops-360")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('finops360.title') })}
      </button>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <Cloud className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('finops360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Imaginary Cloud</h1>
          <p className="mt-1 text-muted-foreground">
            Simulação e estimativa de custos em ambientes de nuvem hipotéticos.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre o Imaginary Cloud</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A funcionalidade Imaginary Cloud permite ao uSavings criar manualmente uma lista de máquinas virtuais 'VMs' 
          com configurações específicas (uma configuração privada e/ou 'imaginária'), para o caso do usuário que 
          deseja obter a relação completa das suas máquinas virtuais e prefere conectar-se de forma manual.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          O termo <strong>Clouds</strong> é empregado para abstrair um agrupamento de Flavors de uma determinada Cloud, 
          sendo este agrupamento tanto de Flavors reais quanto imaginários. Esta funcionalidade é ideal para 
          planejamento financeiro e estimativa de custos antes de implementar a infraestrutura real.
        </p>
      </section>

      {/* Menu Imaginary Cloud */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Tela Inicial</h2>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/048_submenu_funcionalidade.png" 
              alt="Submenu funcionalidade" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Menu Imaginary Cloud</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/049_tela_inicial_imaginary_cloud.png" 
              alt="Tela inicial Imaginary Cloud" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela inicial do Imaginary Cloud</p>
          </div>
        </div>
      </section>

      {/* Tipos de Recursos */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Tipos de Recursos</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          O Imaginary Cloud permite criar diferentes tipos de recursos para simular seu ambiente de nuvem:
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map(({ title, icon: Icon, description }) => (
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

      {/* Telas de Recursos */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Telas de Criação de Recursos</h2>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/050_tela_imaginary_vm.png" 
              alt="Imaginary VM" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Virtual Machine</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/051_tela_imaginary_load_balancer.png" 
              alt="Imaginary Load Balancer" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Load Balancer</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/052_tela_imaginary_storage.png" 
              alt="Imaginary Storage" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Storage</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/053_tela_imaginary_ip.png" 
              alt="Imaginary IP" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">IP</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/054_tela_imaginary_database.png" 
              alt="Imaginary Database" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Database</p>
          </div>
        </div>
      </section>

      {/* Passo a Passo */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Passo a Passo - Criação de Ambiente</h2>
        <div className="space-y-4">
          {createSteps.map(({ step, title, description }) => (
            <div key={step} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Containers Imaginários */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Containers</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Na tela inicial do Imaginary Cloud, você pode visualizar, criar e deletar containers imaginários.
        </p>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/055_imaginary_clouds_containers.png" 
              alt="Imaginary Clouds Containers" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de containers imaginários</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/056_criar_ambiente_imaginario.png" 
              alt="Criar ambiente imaginário" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Criação de ambiente imaginário</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/057_tela_deletar_ambiente_imaginario_container.png" 
              alt="Deletar container" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Deletar container imaginário</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/058_criar_container_imaginario.png" 
              alt="Criar container" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Configuração do container</p>
          </div>
        </div>
      </section>

      {/* Criação de Virtual Machine */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Server className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Criar Virtual Machine</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Para criar uma máquina virtual imaginária, configure as seguintes opções:
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Região/Disponibilidade</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Sistema Operacional</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Tipo de instância (Flavor)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground">Quantidade</span>
          </li>
        </ul>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/059_criar_virtual_machine.png" 
            alt="Criar Virtual Machine" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Configuração de Virtual Machine</p>
        </div>
      </section>

      {/* Import/Export CSV */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Upload className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Import/Export CSV</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          É possível importar e exportar configurações de recursos em formato CSV para facilitar a criação 
          em lote de recursos imaginários.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/finops360/060_import_export_csv.png" 
            alt="Import Export CSV" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Importação e exportação de CSV</p>
        </div>
      </section>

      {/* Criação de outros recursos */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Criação de Outros Recursos</h2>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/061_comparativo_criar_load_balancer.png" 
              alt="Criar Load Balancer" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Criação de Load Balancer</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/062_criar_storage_imaginary_cloud.png" 
              alt="Criar Storage" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Configuração de Storage</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/063_criar_storage.png" 
              alt="Criar Storage detalhes" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Detalhes da criação de Storage</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/064_resultado_criacao_storage.png" 
              alt="Resultado criação storage" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Resultado da criação</p>
          </div>
        </div>
      </section>

      {/* IP e Database */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">IP e Database</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/065_criar_ip.png" 
              alt="Criar IP" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Criação de IP</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/066_criar_database_imaginary_cloud.png" 
              alt="Criar Database" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Criação de Database</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/finops360/067_criar_database_imaginary_cloud_2.png" 
              alt="Criar Database 2" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Configuração do Database</p>
          </div>
        </div>
      </section>

      {/* Nota Importante */}
      <section className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">Importante</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
              Os ambientes criados no Imaginary Cloud são apenas para simulação e estimativa de custos. 
              Eles não representam infraestrutura real provisionada nos provedores de nuvem.
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
              Utilize o Imaginary Cloud para planejar novas infraestruturas ou estimar custos de expansão. 
              Compare diferentes configurações antes de implementar a infraestrutura real.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
