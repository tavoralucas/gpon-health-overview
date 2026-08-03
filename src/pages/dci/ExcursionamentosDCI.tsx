import { ArrowLeft, ArrowRightLeft, CheckCircle2, Info, Plus, Calendar, Gauge, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const excursionamentoStatus = [
  { status: "Ativado", color: "bg-green-500", description: "Excursionamento ativo e em execução" },
  { status: "Agendado", color: "bg-blue-500", description: "Agendado para execução futura" },
  { status: "Pendente", color: "bg-yellow-500", description: "Aguardando aprovação ou ativação" },
  { status: "Finalizado", color: "bg-gray-500", description: "Excursionamento concluído" },
  { status: "Interrompido", color: "bg-red-500", description: "Excursionamento foi interrompido" }
];

export default function ExcursionamentosDCI() {
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
          <ArrowRightLeft className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('dci.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t('dci.excursions')}</h1>
          <p className="mt-1 text-muted-foreground">
            Gerenciamento de excursionamentos de tráfego entre datacenters.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Submenu Excursionamentos</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Este submenu possibilita a visualização dos <strong>Excursionamentos</strong>: finalizados, 
          interrompidos, pendentes, agendados ou ativados do usuário.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Nele é possível verificar além dos status do excursionamento, a <strong>quantidade de banda</strong> a 
          ser expandida no circuito e a banda base do mesmo, tendo-se as datas de começo e finalização 
          estimadas e as datas em que o excursionamento realmente aconteceu ou finalizou.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/dci/013_menu_excursionamentos.png" 
            alt="Menu Excursionamentos" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Excursionamentos</p>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Funcionalidades</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <RefreshCw className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground text-sm">Refresh</span>
              <p className="text-xs text-muted-foreground">Atualiza a página com os dados mais recentes</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <Plus className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground text-sm">+ Criar Excursionamento</span>
              <p className="text-xs text-muted-foreground">Abre o modal para criar novo excursionamento</p>
            </div>
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Status dos Excursionamentos</h2>
        <div className="space-y-3">
          {excursionamentoStatus.map(({ status, color, description }) => (
            <div key={status} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <span className={`h-3 w-3 rounded-full ${color}`}></span>
              <div>
                <span className="font-medium text-foreground text-sm">{status}</span>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Criar Excursionamento */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Criar Excursionamento</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Para agendar um excursionamento é necessário clicar no botão "+ Criar Excursionamento" 
          e preencher os campos no modal apresentado.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/dci/013_submenu_criar_excursionamento_circuito.png" 
            alt="Criar Excursionamento - Circuito" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Modal de criação - Seleção do Circuito</p>
        </div>

        <h3 className="font-semibold text-foreground mb-3">Campos do Formulário</h3>
        <ul className="space-y-2 text-sm text-muted-foreground mb-6">
          <li className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Data de início:</strong> Data pretendida para o início do excursionamento</span>
          </li>
          <li className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Data final e horário:</strong> Data desejada para o término</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Circuito:</strong> Circuito sobre o qual o excursionamento será executado</span>
          </li>
        </ul>
      </section>

      {/* Seleção de Banda */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Gauge className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Seleção de Banda</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Após selecionar o circuito, é exibido ao usuário a <strong>capacidade base</strong> do circuito 
          selecionado, além da <strong>capacidade máxima possível</strong> para aquele circuito.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/dci/013_submenu_criar_excursionamento_banda.png" 
            alt="Criar Excursionamento - Banda" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Modal de criação - Seleção de Banda</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Capacidade Base:</strong> Banda atual do circuito</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Capacidade Máxima:</strong> Limite máximo de expansão possível</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Banda:</strong> Banda estimada para o excursionamento</span>
          </li>
        </ul>
      </section>

      {/* Fluxo */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Fluxo de Criação</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
              1
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Definir período</h3>
              <p className="text-sm text-muted-foreground">Selecione as datas de início e término do excursionamento</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
              2
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Selecionar circuito</h3>
              <p className="text-sm text-muted-foreground">Escolha o circuito sobre o qual o excursionamento será executado</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
              3
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Definir banda</h3>
              <p className="text-sm text-muted-foreground">Selecione a banda desejada dentro dos limites disponíveis</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
              4
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Confirmar criação</h3>
              <p className="text-sm text-muted-foreground">Clique em "Criar excursionamento" para finalizar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nota */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Cancelamento</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              O botão "Cancelar" pode ser acionado a qualquer momento, no caso da desistência da 
              criação. Após criado o excursionamento, a operação está completa e pode ser visualizado 
              no submenu "Excursionamento" com todas as suas informações, juntamente com a opção 
              de cancelar tal excursionamento.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
