import { ArrowLeft, Network, CheckCircle2, Info, LogIn, Settings, Bell, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const menuItems = [
  { icon: User, title: "Nome", description: "Exibe o nome do usuário logado e seu endereço de e-mail." },
  { icon: Settings, title: "Configuração de conta", description: "Acesso aos detalhes da conta, alteração de e-mail, telefone e gerenciamento de usuários." },
  { icon: Info, title: "Manual de funcionalidades", description: "Direciona ao documento de manual armazenado no ambiente de documentação." },
  { icon: LogOut, title: "Logout", description: "Sair ou deslogar da aplicação." }
];

export default function VisaoGeralDCI() {
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
          <Network className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('dci.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t("common.overview")}</h1>
          <p className="mt-1 text-muted-foreground">
            Introdução ao Data Center Interconnect e acesso à plataforma.
          </p>
        </div>
      </div>

      {/* Logo */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex justify-center mb-6">
          <img 
            src="/images/dci/014_dci_logomarca.png" 
            alt="Logo DCI" 
            className="h-24"
          />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-4 text-center">Data Center Interconnect</h2>
        <p className="text-muted-foreground leading-relaxed text-center">
          Soluções em tecnologia da informação que viabilizam implementar uma arquitetura 
          computacional escalável, sólida e confiável em nuvem híbrida.
        </p>
      </section>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Introdução</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Este documento consiste em um manual com a descrição breve das principais funcionalidades 
          contidas no produto <strong>Data Center Interconnect - DCI</strong> da plataforma uCloud.
        </p>
      </section>

      {/* Apresentação */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Apresentação</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>Data Center Interconnect - DCI</strong> é uma solução de conectividade cuja rede é 
          definida por software (SDN - Software Defined Network).
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A rede definida por software é uma arquitetura que permite um gerenciamento e controle mais 
          eficiente dos recursos de rede, ela delimita o plano de controle do plano de dados.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Em termos descomplicados, comunicação entre datacenters significa que as funções de controle 
          e dados da rede estão separadas, o que permite maior <strong>flexibilidade e automação</strong> no 
          gerenciamento de rede.
        </p>
      </section>

      {/* Como logar */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <LogIn className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Como logar no DCI</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Para ter acesso à plataforma é necessário ter realizado uma "Primeira compra" no Painel do Cliente. 
          Após essa compra o usuário recebe as suas credenciais de acesso, enviadas diretamente ao seu 
          e-mail registrado.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/dci/001_log_in.png" 
            alt="Tela de Login" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela de Login do DCI</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Preencha o campo <strong>login</strong> com suas credenciais</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Preencha o campo <strong>senha</strong> recebida do administrador</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>Clique no botão <strong>Entrar</strong></span>
          </li>
        </ul>
      </section>

      {/* Menu Superior */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Menu Superior Direito</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Após o login, é importante entender o impacto de algumas ferramentas existentes no menu 
          superior direito, exibido em todas as telas disponíveis ao usuário.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-6">
          <img 
            src="/images/dci/002_nome_config_manual_logout.png" 
            alt="Menu Superior" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Menu superior direito do DCI</p>
        </div>

        <div className="space-y-4">
          {menuItems.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-foreground text-sm">{title}</span>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ícone de Notificação */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Ícone de Notificação</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Este ícone é um ponto relevante para a visualização de todas as atividades que são realizadas 
          no portal. Através deste é possível observar as ações mais recentes, refletidas em forma de 
          notificação na tela "Tarefas".
        </p>
      </section>

      {/* Nota */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Importante</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              Para a completa visualização dos serviços do DCI existem menus na lateral esquerda da 
              plataforma, onde é possível encontrar informações valiosas sobre Administração, DCI 
              (Portas, Circuitos, Excursionamentos) e Tarefas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
