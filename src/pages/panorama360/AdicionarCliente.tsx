import { ArrowLeft, UserPlus, CheckCircle2, Copy, Edit, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function AdicionarCliente() {
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
          <UserPlus className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Adicionando um novo cliente</h1>
          <p className="mt-1 text-muted-foreground">
            Como adicionar clientes na tela geral de monitoramento.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre este guia</h2>
        <p className="text-muted-foreground leading-relaxed">
          Este tópico fornece um guia passo a passo de como adicionar um novo cliente à tela geral de monitoramento no PMC P360. 
          Ao seguir este fluxo, gradativamente o passo a passo mostra como obter o ID da organização do cliente e configurar 
          um box de alerta personalizado para a visualização dos dados.
        </p>
      </section>

      {/* Obtendo o ID da Organização */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Obtendo o ID da Organização (ORG)</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Para configurar o monitoramento de um novo cliente, a primeira etapa é obter o ID da organização (ORG) 
          associada ao cliente. Este ID é utilizado para definir as consultas no box de alerta.
        </p>
        <div className="space-y-3">
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">1. Acessar a Organização</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No menu lateral, selecionar Settings {'>'} Administration {'>'} General {'>'} Organizations.
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/018_home_dashboards_alerts_umonitoralertdashboard.png" alt="Dashboard de alertas" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Dashboard principal de alertas</p>
        </div>
        <div className="space-y-3 mt-4">
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">2. Localizar o ID da ORG</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nesta tela, é possível visualizar uma lista de todas as organizações cadastradas. O ID da ORG é exibido 
              ao lado do nome da organização.
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/019_home_adm_general_organizations.png" alt="Organizations" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Lista de organizações com IDs</p>
        </div>
      </section>

      {/* Duplicando um box de alerta */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Copy className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Duplicando um box de alerta</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Com o ID da organização em mãos, a partir deste momento, é possível duplicar um box de alerta existente 
          e ajustá-lo para monitorar o novo cliente.
        </p>
        <div className="space-y-3">
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">Acessando o Dashboard Inicial</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Retornar à tela Home do PMC P360, onde o dashboard principal de monitoramento está localizado.
            </p>
          </div>
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">Duplicando um Box de Alerta Existente</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No Dashboard, localize um box de alerta que deseja utilizar como base para o novo cliente. 
              Clicar na opção "Duplicate" ao lado do box de alerta para criar uma cópia idêntica.
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border overflow-hidden">
            <img src="/images/panorama360/020_duplicar_box_alerta_existente.png" alt="Duplicar box de alerta" className="w-full h-auto" />
            <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Opção de duplicar box</p>
          </div>
          <div className="rounded-lg border border-border overflow-hidden">
            <img src="/images/panorama360/020_duplicar_box_alerta_existe.png" alt="Duplicar alerta" className="w-full h-auto" />
            <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Clicar em Duplicate</p>
          </div>
        </div>
      </section>

      {/* Editando a Query */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Edit className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Editando a Query do Box de Alerta</h2>
        </div>
        <div className="space-y-3">
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">1. Configurar a Query</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No box duplicado, siga até a configuração da query. Substitua o ID existente na consulta por 
              <code className="bg-muted px-2 py-0.5 rounded mx-1">id=(ID DESEJADO)</code>, onde (ID DESEJADO) é o 
              ID da ORG do novo cliente que obteve anteriormente.
            </p>
          </div>
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">2. Personalizar o Título do Box</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Editar o título do box para refletir o nome do novo cliente ou para fornecer uma descrição adequada à consulta.
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/021_editar_painel_opcoes.png" alt="Editar painel opções" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Editar opções do painel e query</p>
        </div>
      </section>

      {/* Salvando */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Save className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Salvando as Alterações</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Após realizar as edições necessárias, clicar no botão "Save" para garantir que as mudanças sejam 
          aplicadas ao Dashboard.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/022_save_dashboard.png" alt="Salvar dashboard" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Botão Save para salvar as alterações</p>
        </div>
      </section>

      {/* Sucesso */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Pronto!</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              O novo cliente foi adicionado à tela geral de monitoramento. Agora você pode acompanhar os alertas 
              e métricas específicas deste cliente através do box configurado.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
