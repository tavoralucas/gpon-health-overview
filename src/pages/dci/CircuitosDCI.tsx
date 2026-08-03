import { ArrowLeft, GitBranch, CheckCircle2, Info, Settings, History, ArrowRightLeft, RefreshCw, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const circuitColumns = [
  { name: "Designação", description: "Identificador único do circuito" },
  { name: "Tipo", description: "Tipo de circuito configurado" },
  { name: "Banda Base", description: "Capacidade base de banda" },
  { name: "Banda Atual", description: "Capacidade atual utilizada" },
  { name: "Port - Vlan ID (Origem)", description: "Porta e VLAN de origem" },
  { name: "Port - Vlan ID (Destino)", description: "Porta e VLAN de destino" },
  { name: "Status", description: "Estado atual do circuito" },
  { name: "Golden Jumper", description: "Status da conexão física" }
];

const cardGeralInfo = [
  "Usuário", "Nome da empresa", "CPF/CNPJ", "Designação",
  "Data da criação", "Data da ativação", "Porta origem", "Porta destino"
];

export default function CircuitosDCI() {
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
          <GitBranch className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('dci.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t('dci.circuits')}</h1>
          <p className="mt-1 text-muted-foreground">
            Gerenciamento de circuitos de interconexão entre data centers.
          </p>
        </div>
      </div>

      {/* Submenu Circuitos */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Submenu Circuitos</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Esta tela permite visualizar a lista de Circuitos, possibilitando observar as ações 
          a serem tomadas com cada item.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-6">
          <img 
            src="/images/dci/007_menu_circuitos.png" 
            alt="Submenu Circuitos" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Circuitos</p>
        </div>

        <h3 className="font-semibold text-foreground mb-3">Funcionalidades</h3>
        <div className="grid gap-3 mb-6">
          <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground text-sm">Incluir recursos desabilitados</span>
              <p className="text-xs text-muted-foreground">Visualiza os recursos que estão desabilitados</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
            <Search className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground text-sm">Procurar</span>
              <p className="text-xs text-muted-foreground">Campo de busca para encontrar circuitos específicos</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
            <RefreshCw className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground text-sm">Refresh</span>
              <p className="text-xs text-muted-foreground">Atualiza a página após modificação</p>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-foreground mb-3">Colunas de Informação</h3>
        <div className="grid gap-2 md:grid-cols-2">
          {circuitColumns.map(({ name, description }) => (
            <div key={name} className="flex items-start gap-2 p-2 bg-muted/20 rounded">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-medium text-foreground">{name}</span>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detalhes do Circuito */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Detalhes do Circuito</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Ao clicar em cada circuito individualmente, é possível visualizar detalhes das informações, 
          iniciando pelo botão "Voltar" e cards com informações específicas.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/dci/008_menu_circuito_spo.png" 
            alt="Detalhes do Circuito" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela de detalhes do circuito</p>
        </div>
      </section>

      {/* Card Geral */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Card Geral</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Este card apresenta as principais informações do circuito, incluindo as portas 
          que se ligam através dele.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/dci/008_a_menu_circuito_card_geral.png" 
            alt="Card Geral do Circuito" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Card Geral do Circuito</p>
        </div>
        <h3 className="font-semibold text-foreground mb-3">Elementos</h3>
        <div className="grid gap-2 md:grid-cols-2">
          {cardGeralInfo.map((item) => (
            <div key={item} className="flex items-center gap-2 p-2 bg-muted/20 rounded">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Card Configurações */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Card Configurações</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O card Configurações disponibiliza informações sobre o status, tipo, banda e VLANs do circuito.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/dci/008_b_menu_circuito_card_configurações.png" 
            alt="Card Configurações" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Card Configurações</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Status:</strong> "Ativado" com botão para Bloquear</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Tipo:</strong> Com botão "Alterar tipo"</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Banda Atual:</strong> Capacidade de banda em uso</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Vlan porta origem/destino:</strong> Com botão "Alterar vlans"</span>
          </li>
        </ul>
      </section>

      {/* Card Excursionamentos */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <ArrowRightLeft className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Card Excursionamentos</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Permite visualizar e criar excursionamentos associados ao circuito selecionado.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/dci/008_c_menu_circuito_card_excursionamentos.png" 
            alt="Card Excursionamentos" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Card Excursionamentos</p>
        </div>
        <h3 className="font-semibold text-foreground mb-3">Colunas do Card</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Banda:</strong> Capacidade de banda do excursionamento</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Data de início/final estimada:</strong> Período planejado</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Data de início/final:</strong> Período real executado</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Status:</strong> Estado do excursionamento</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Ação:</strong> Opções disponíveis para o excursionamento</span>
          </li>
        </ul>
      </section>

      {/* Card Histórico */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <History className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Card Histórico</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Apresenta o histórico de ações realizadas no circuito.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/dci/009_circuito_card_histórico.png" 
            alt="Card Histórico" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Card Histórico</p>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Operação:</strong> Tipo de operação realizada</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Autor:</strong> Usuário que executou a ação</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Data e Hora:</strong> Momento da execução</span>
          </li>
        </ul>
      </section>

      {/* Nota */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Importante</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              Os circuitos são a conexão entre duas portas. Através deles é possível criar 
              excursionamentos para expansão temporária de banda entre datacenters.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
