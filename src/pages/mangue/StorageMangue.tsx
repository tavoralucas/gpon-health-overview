import { ArrowLeft, HardDrive, CheckCircle2, Database, FolderOpen, Key, Info, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const storageTypes = [
  {
    title: "Storage Classes",
    icon: Settings,
    description: "Configuração de classes de armazenamento disponíveis no cluster."
  },
  {
    title: "Persistent Volumes",
    icon: Database,
    description: "Volumes de armazenamento provisionados no cluster."
  },
  {
    title: "Persistent Volume Claims",
    icon: FolderOpen,
    description: "Requisições de armazenamento feitas por pods."
  },
  {
    title: "Secrets",
    icon: Key,
    description: "Armazenamento seguro de dados sensíveis como senhas e tokens."
  }
];

const accessModes = [
  { name: "ReadWriteOnce (RWO)", description: "Pode ser montado como leitura-escrita por um único node" },
  { name: "ReadOnlyMany (ROX)", description: "Pode ser montado como somente leitura por muitos nodes" },
  { name: "ReadWriteMany (RWX)", description: "Pode ser montado como leitura-escrita por muitos nodes" }
];

export default function StorageMangue() {
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
          <HardDrive className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('mangue.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t('mangue.storage')}</h1>
          <p className="mt-1 text-muted-foreground">
            {t('mangue.storage')}
          </p>
        </div>
      </div>

      {/* Tipos de Storage */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Recursos de Armazenamento</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {storageTypes.map(({ title, icon: Icon, description }) => (
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

      {/* Storage Classes */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Storage Classes</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>Storage Classes</strong> definem diferentes classes de armazenamento disponíveis no cluster, 
          cada uma com políticas de provisionamento, tipo de disco e características específicas.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/207_mangue_storageclass.png" 
            alt="Storage Classes" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Storage Classes</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Define o provisioner (AWS EBS, Azure Disk, NFS, etc.)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Configura parâmetros específicos do armazenamento</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Define política de reclaim (Retain, Delete, Recycle)</span>
          </li>
        </ul>
      </section>

      {/* Persistent Volumes */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Persistent Volumes (PV)</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>Persistent Volumes</strong> são recursos de armazenamento no cluster que foram provisionados 
          por um administrador ou dinamicamente usando Storage Classes.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/210_mangue_pv.png" 
            alt="Persistent Volumes" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Persistent Volumes</p>
        </div>
        <h3 className="font-semibold text-foreground mb-3">Modos de Acesso</h3>
        <div className="space-y-2">
          {accessModes.map(({ name, description }) => (
            <div key={name} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
              <div>
                <span className="font-medium text-foreground text-sm">{name}</span>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Persistent Volume Claims */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <FolderOpen className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Persistent Volume Claims (PVC)</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>Persistent Volume Claims</strong> são requisições de armazenamento feitas pelos pods. 
          Funcionam como um pedido de recursos de armazenamento.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/213_mangue_pvc.png" 
            alt="PVC" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Persistent Volume Claims</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Nome:</strong> Identificador do PVC no namespace</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Tamanho:</strong> Quantidade de armazenamento solicitada</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Storage Class:</strong> Classe de armazenamento a ser usada</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Modo de Acesso:</strong> Tipo de acesso ao volume</span>
          </li>
        </ul>
      </section>

      {/* Secrets */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Key className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Secrets</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>Secrets</strong> permitem armazenar e gerenciar informações sensíveis como senhas, 
          tokens OAuth e chaves SSH de forma segura.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/198_mangue_lista_segredos.png" 
            alt="Lista de Secrets" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Secrets</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/193_mangue_criar_edit_secret.png" 
              alt="Criar Secret" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Criar/Editar Secret</p>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <img 
              src="/images/mangue/200_mangue_valores.png" 
              alt="Valores Secret" 
              className="w-full h-auto"
            />
            <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Valores do Secret</p>
          </div>
        </div>
      </section>

      {/* Registry Secrets */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Registry Secrets</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Secrets específicos para autenticação em registries de imagens Docker privados.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/mangue/194_mangue_registry_lista.png" 
            alt="Registry Lista" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Registry Secrets</p>
        </div>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/mangue/197_mangue_criar_editar_secret.png" 
            alt="Criar Registry Secret" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Criar Registry Secret</p>
        </div>
      </section>

      {/* Nota */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Persistência de Dados</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              Aplicações que são executadas em containers guardam seus dados em memória. Caso tenha 
              informações sensíveis para persistir, como volumes de banco de dados, utilize 
              Persistent Volume Claims para garantir que os dados não sejam perdidos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
