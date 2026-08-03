import { ArrowLeft, Users, CheckCircle2, Info, UserCog, UsersRound, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const adminSubmenus = [
  {
    title: "Usuários",
    icon: UserCog,
    description: "Gerenciamento de usuários com acesso à plataforma DCI."
  },
  {
    title: "Grupos",
    icon: UsersRound,
    description: "Organização de usuários em grupos com permissões específicas."
  },
  {
    title: "Contratos",
    icon: FileText,
    description: "Visualização e gerenciamento dos contratos ativos."
  }
];

export default function AdministracaoDCI() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/dci")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('dci.title') })}
      </button>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('dci.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t('dci.administration')}</h1>
          <p className="mt-1 text-muted-foreground">
            {t('dci.administration')}
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Menu Administração</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Para a completa visualização dos serviços do DCI existem alguns menus na lateral esquerda 
          da plataforma. Ao acessar o menu de <strong>Administração</strong> é possível operacionalizar 
          os submenus apresentados abaixo.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/dci/003_menu_admin.png" 
            alt="Menu Administração" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Menu Administração do DCI</p>
        </div>
      </section>

      {/* Submenus */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Submenus Disponíveis</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {adminSubmenus.map(({ title, icon: Icon, description }) => (
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

      {/* Usuários */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <UserCog className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Usuários</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O submenu <strong>Usuários</strong> permite gerenciar todos os usuários que possuem acesso 
          à plataforma DCI. Através desta tela é possível:
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Visualizar a lista de usuários cadastrados</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Criar novos usuários com diferentes níveis de permissão</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Editar informações de usuários existentes</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Desativar ou remover usuários da plataforma</span>
          </li>
        </ul>
      </section>

      {/* Grupos */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <UsersRound className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Grupos</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O submenu <strong>Grupos</strong> permite organizar os usuários em grupos com permissões 
          e acessos específicos. Esta funcionalidade facilita a gestão de permissões em larga escala.
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Criar grupos de usuários com permissões específicas</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Associar múltiplos usuários a um grupo</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Definir políticas de acesso por grupo</span>
          </li>
        </ul>
      </section>

      {/* Contratos */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Contratos</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O submenu <strong>Contratos</strong> permite visualizar e gerenciar os contratos ativos 
          na plataforma DCI.
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Visualizar detalhes dos contratos ativos</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Acompanhar status e validade dos contratos</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Gerenciar usuários vinculados a cada contrato</span>
          </li>
        </ul>
      </section>

      {/* Nota */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Configuração de Conta</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              O botão "Configuração de conta" no menu superior direito também direciona ao menu 
              Administração, possibilitando acesso rápido aos detalhes da conta criada.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
