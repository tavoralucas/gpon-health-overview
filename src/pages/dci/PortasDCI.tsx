import { ArrowLeft, PlugZap, CheckCircle2, Info, Download, RefreshCw, Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const portColumns = [
  { name: "Designação", description: "Identificador único da porta" },
  { name: "Status", description: "Estado atual da porta (Ativo/Inativo)" },
  { name: "Banda", description: "Capacidade de banda da porta" },
  { name: "Tipo", description: "Tipo de porta (física/lógica)" },
  { name: "Datacenter", description: "Localização do datacenter" },
  { name: "Golden Jumper", description: "Status da conexão física" }
];

const cardGeralInfo = [
  "Usuário", "Nome da empresa", "CPF/CNPJ", "Designação", "Banda", "Roteador",
  "Roteador porta", "Posição do DGO", "Status", "Datacenter", "Cidade",
  "Tipo de porta", "Data de criação", "Data de alocação"
];

export default function PortasDCI() {
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
          <PlugZap className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('dci.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t('dci.ports')}</h1>
          <p className="mt-1 text-muted-foreground">
            {t('dci.ports')}
          </p>
        </div>
      </div>

      {/* Menu DCI */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Menu DCI</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O menu DCI contém três submenus que possibilitam visualizar: <strong>Portas</strong>, 
          <strong> Circuitos</strong> e <strong>Excursionamentos</strong>.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/dci/004_menu_dci.png" 
            alt="Menu DCI" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Menu DCI</p>
        </div>
      </section>

      {/* Submenu Portas */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Submenu Portas</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Este submenu possibilita visualizar os recursos de portas. As portas ligam-se por intermédio 
          dos Circuitos, elas podem ou não ter circuitos. Todas as portas estão dentro do Datacenter.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Ao comprar a porta, o cliente recebe a <strong>LOA (Carta de Autorização)</strong>, 
          necessária para o fluxo do processo.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-6">
          <img 
            src="/images/dci/005_menu_portas.png" 
            alt="Submenu Portas" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Lista de Portas</p>
        </div>

        <h3 className="font-semibold text-foreground mb-3">Funcionalidades</h3>
        <div className="grid gap-3 mb-6">
          <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
            <Eye className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground text-sm">Incluir recursos desabilitados</span>
              <p className="text-xs text-muted-foreground">Visualiza os recursos que estão desabilitados</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
            <Search className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-foreground text-sm">Procurar</span>
              <p className="text-xs text-muted-foreground">Campo de busca para encontrar portas específicas</p>
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
          {portColumns.map(({ name, description }) => (
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

      {/* Detalhes da Porta */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Detalhes da Porta</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Ao selecionar uma porta, é possível visualizar os detalhes de forma completa. 
          O cabeçalho apresenta opções como: <strong>Voltar</strong>, <strong>Baixar LOA</strong>, 
          <strong> Reenviar LOA</strong> e <strong>Confirmado</strong>.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <img 
            src="/images/dci/006_menu_porta_spo.png" 
            alt="Detalhes da Porta" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Tela de detalhes da porta</p>
        </div>
      </section>

      {/* Card Geral */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Card Geral</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Este card apresenta as principais informações da porta selecionada, incluindo 
          data de criação e alocação.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/dci/006_a_portas_card_geral.png" 
            alt="Card Geral" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Card Geral da Porta</p>
        </div>
        <h3 className="font-semibold text-foreground mb-3">Elementos do Card Geral</h3>
        <div className="grid gap-2 md:grid-cols-2">
          {cardGeralInfo.map((item) => (
            <div key={item} className="flex items-center gap-2 p-2 bg-muted/20 rounded">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Card Vlans */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Card Vlans</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O card Vlans exibe informações sobre as VLANs associadas à porta, com opção de 
          atualização via botão Refresh.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <img 
            src="/images/dci/006_b_portas_card_vlans.png" 
            alt="Card Vlans" 
            className="w-full h-auto"
          />
          <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">Card Vlans</p>
        </div>
        <h3 className="font-semibold text-foreground mb-3">Informações do Card Vlans</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Vlans em Uso:</strong> Quantidade de VLANs ativas</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Circuitos:</strong> Circuitos associados às VLANs</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Banda:</strong> Capacidade de banda utilizada</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span><strong>Banda Base:</strong> Capacidade de banda base</span>
          </li>
        </ul>
      </section>

      {/* Nota LOA */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-6">
        <div className="flex items-start gap-3">
          <Download className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">LOA - Carta de Autorização</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              A LOA (Letter of Authorization) é o documento necessário para autorizar a conexão 
              física da porta no datacenter. Utilize os botões "Baixar LOA" e "Reenviar LOA" 
              para gerenciar este documento.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
