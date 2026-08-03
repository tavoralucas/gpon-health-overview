import { ArrowLeft, Download, FileText, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";


export default function ExportarRelatoriosCostManagement() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/cost-management")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('costManagement.title') })}
      </button>

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <Download className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('costManagement.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Exportar Relatórios</h1>
          <p className="mt-1 text-muted-foreground">
            Geração assíncrona de arquivos financeiros com histórico de exportações e notificação por e-mail
          </p>
        </div>
      </div>

      {/* Visão Geral */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t("common.overview")}</h2>
        <p className="text-muted-foreground mb-3">
          O módulo de 'Exportar Relatórios' permite que usuários gerem, de forma assíncrona, arquivos de dados financeiros
          e de consumo de nuvem em diferentes formatos, com base em parâmetros configuráveis por tipo de relatório. Após
          a geração, os arquivos ficam disponíveis para download e um histórico de exportações é mantido para reaproveitamento.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Seção 1 — Gerar novo relatório</h3>
            <p className="text-sm text-muted-foreground">Formulário de configuração dos parâmetros do relatório a ser gerado.</p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Seção 2 — Histórico de exportações</h3>
            <p className="text-sm text-muted-foreground">Tabela com relatórios já exportados, disponíveis para redownload.</p>
          </div>
        </div>
        <div className="mt-6 rounded-lg border border-border overflow-hidden">
          <img
            src={exportarRelatoriosTela}
            alt="Tela de Exportar Relatórios mostrando o formulário Gerar novo relatório e o Histórico de exportações"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Campos Comuns */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Campos Comuns a Todos os Relatórios</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="p-3 rounded-lg border border-border bg-muted/50">
              <p className="font-semibold text-foreground text-sm">Contrato</p>
              <p className="text-xs mt-1">Obrigatório. Pré-selecionado com o contrato do contexto global do header.</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/50">
              <p className="font-semibold text-foreground text-sm">Tipo de relatório</p>
              <p className="text-xs mt-1">Obrigatório. Dispara renderização dinâmica de campos adicionais ao ser selecionado.</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/50">
              <p className="font-semibold text-foreground text-sm">E-mail (opcional)</p>
              <p className="text-xs mt-1">Notificação quando o relatório estiver pronto. Não é obrigatório para exportar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Relatório */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Tipos de Relatório</h2>
        </div>

        <div className="space-y-4">
          {/* Financeiro */}
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3">Financeiro</h3>
            <div className="grid gap-2 md:grid-cols-4 text-sm">
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Tipo de Relatório</p>
                <p className="text-muted-foreground text-xs mt-1">Contrato / Grupo / Usuário</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Mês</p>
                <p className="text-muted-foreground text-xs mt-1">Seletor mês/ano obrigatório</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Tipo de Arquivo</p>
                <p className="text-muted-foreground text-xs mt-1">CSV / PDF</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Granularidade</p>
                <p className="text-muted-foreground text-xs mt-1">Mensal / Diário</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Nomenclatura no histórico: <code className="bg-muted px-1 rounded">Financeiro - [Tipo] - [Formato]</code></p>
          </div>

          {/* Tendência */}
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3">Tendência de Faturamento</h3>
            <div className="grid gap-2 md:grid-cols-3 text-sm">
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Intervalo</p>
                <p className="text-muted-foreground text-xs mt-1">Mensal / Semanal / Diário</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Período</p>
                <p className="text-muted-foreground text-xs mt-1">Adapta formato ao intervalo selecionado</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Tipo</p>
                <p className="text-muted-foreground text-xs mt-1">Recursos / Tag</p>
              </div>
            </div>
          </div>

          {/* Histórico */}
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3">Histórico de Faturamento</h3>
            <div className="grid gap-2 md:grid-cols-2 text-sm">
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Tipo de Relatório</p>
                <p className="text-muted-foreground text-xs mt-1">CSV Resumido / CSV Detalhado</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Mês</p>
                <p className="text-muted-foreground text-xs mt-1">Seletor mês/ano obrigatório</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">O formato está embutido no tipo (CSV Resumido / CSV Detalhado) — não há campo separado de formato.</p>
          </div>

          {/* Conta Master */}
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3">Conta Master</h3>
            <div className="grid gap-2 md:grid-cols-2 text-sm">
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Tipo de Relatório</p>
                <p className="text-muted-foreground text-xs mt-1">Excel Resumido / Excel Detalhado / PDF Resumido</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Mês</p>
                <p className="text-muted-foreground text-xs mt-1">Seletor mês/ano obrigatório</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Único tipo que oferece exportação em Excel (XLSX).</p>
          </div>

          {/* Centro de Custo */}
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3">Centro de Custo</h3>
            <div className="grid gap-2 md:grid-cols-1 text-sm">
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Período / Mês</p>
                <p className="text-muted-foreground text-xs mt-1">Seletor mês/ano obrigatório — único campo específico do tipo.</p>
              </div>
            </div>
          </div>

          {/* Histórico de Serviço */}
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3">Histórico de Serviço</h3>
            <div className="grid gap-2 md:grid-cols-4 text-sm">
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Período</p>
                <p className="text-muted-foreground text-xs mt-1">Seletor mês/ano obrigatório</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Provedores de Conta</p>
                <p className="text-muted-foreground text-xs mt-1">Seleção do account provider (obrigatório)</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Linked Account</p>
                <p className="text-muted-foreground text-xs mt-1">Seletor de linkeds da conta selecionada</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Granularidade</p>
                <p className="text-muted-foreground text-xs mt-1">Mensal / Diário</p>
              </div>
            </div>
          </div>

          {/* Custo Cadenciado */}
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3">Custo Cadenciado</h3>
            <div className="grid gap-2 md:grid-cols-4 text-sm">
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Período</p>
                <p className="text-muted-foreground text-xs mt-1">Seletor mês/ano obrigatório</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Provedores de Conta</p>
                <p className="text-muted-foreground text-xs mt-1">Seleção do account provider (obrigatório)</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Linked Account</p>
                <p className="text-muted-foreground text-xs mt-1">Seletor de linkeds da conta selecionada</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="font-medium">Granularidade</p>
                <p className="text-muted-foreground text-xs mt-1">Mensal / Diário</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Mesma estrutura de filtros do Histórico de Serviço.</p>
          </div>
        </div>
      </section>

      {/* Validações */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Validações do Formulário</h2>
        <p className="text-muted-foreground text-sm mb-3">Mensagens de erro inline (texto vermelho) ao clicar em "Exportar" sem preencher campos obrigatórios:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-semibold text-foreground">Campo</th>
                <th className="text-left py-2 font-semibold text-foreground">Mensagem de Validação</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                ["Tipo de relatório", "Por favor, selecione um tipo de relatório."],
                ["Mês", "Por favor, selecione um mês."],
                ["Tipo de arquivo", "Por favor, selecione um tipo de arquivo."],
                ["Granularidade", "Por favor, selecione a granularidade."],
                ["Intervalo", "Por favor, selecione um intervalo."],
                ["Período", "Por favor, selecione um período."],
                ["Tipo (agrupamento)", "Por favor, selecione um tipo."],
              ].map(([campo, msg]) => (
                <tr key={campo} className="border-b border-border/50">
                  <td className="py-2 pr-4 font-medium">{campo}</td>
                  <td className="py-2 text-red-600 dark:text-red-400">{msg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">O campo E-mail não possui validação obrigatória — é completamente opcional.</p>
      </section>

      {/* Processamento */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Processamento Assíncrono</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p>A geração de relatórios é <strong>assíncrona</strong>: ao submeter o formulário, o sistema enfileira a tarefa e retorna imediatamente.</p>
          <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
            <li>O relatório aparece no histórico assim que a solicitação é recebida</li>
            <li>O arquivo fica disponível quando o processamento é concluído (status <strong>Disponível</strong>)</li>
            <li>O arquivo entregue é <strong>compactado em ZIP</strong>, independente do tipo original</li>
            <li>Notificação por e-mail é disparada no momento em que o status muda para "Disponível"</li>
          </ul>
        </div>
      </section>

      {/* Histórico */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Histórico de Exportações</h2>
        </div>
        <p className="text-muted-foreground text-sm mb-4">Tabela com todos os relatórios gerados pelo usuário no período de retenção configurado.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-semibold text-foreground">Coluna</th>
                <th className="text-left py-2 font-semibold text-foreground">Descrição</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                ["Tipo do Relatório", "Identificador composto: [Módulo] - [Subtipo] - [Formato]"],
                ["Data", "Data e hora da solicitação: DD/MM/AAAA, HH:MM:SS"],
                ["Status", "Disponível (verde) ou status de processamento"],
                ["Formato", "Sempre ZIP"],
                ["Ações", "Botão Download — ativo somente quando status é Disponível"],
              ].map(([col, desc]) => (
                <tr key={col} className="border-b border-border/50">
                  <td className="py-2 pr-4 font-medium">{col}</td>
                  <td className="py-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Botão de atualizar (ícone refresh) permite atualização manual do status sem recarregar a página. Suporta paginação com controles de navegação.
        </p>
      </section>

      {/* Fluxo */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Fluxo de Uso Principal</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside ml-2">
          <li>Acesso à Exportar Relatórios pelo menu lateral de Gestão de Custos.</li>
          <li>Contrato do contexto global já pré-selecionado no formulário.</li>
          <li>Usuário seleciona o tipo de relatório — campos adicionais são renderizados dinamicamente.</li>
          <li>Usuário preenche os campos específicos (Tipo, Mês/Período, Formato, Granularidade).</li>
          <li>(Opcional) Usuário informa e-mail para notificação.</li>
          <li>Usuário clica em "Exportar" — sistema valida; se inválido, exibe erros inline.</li>
          <li>Solicitação enfileirada; novo registro aparece no Histórico de Exportações.</li>
          <li>Após processamento, status muda para "Disponível" e botão "Download" é habilitado.</li>
          <li>(Se e-mail informado) Usuário recebe notificação e retorna para fazer o download.</li>
        </ol>
      </section>
    </div>
  );
}
