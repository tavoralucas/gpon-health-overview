import { ArrowLeft, DollarSign, Filter, FileText, BarChart3, Users, User, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import financeiroPasso1 from "@/assets/financeiro-passo1.png.asset.json";
import financeiroPasso2 from "@/assets/financeiro-passo2.png.asset.json";
import financeiroPasso4 from "@/assets/financeiro-passo4.png.asset.json";
import financeiroPasso5 from "@/assets/financeiro-passo5.png.asset.json";
import { useTranslation } from "@/hooks/useTranslation";

export default function FinanceiroCostManagement() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          <DollarSign className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('costManagement.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
          <p className="mt-1 text-muted-foreground">
            Visão consolidada e detalhada de faturamento por contrato, grupo e usuário
          </p>
        </div>
      </div>

      {/* Visão Geral */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">{t('common.overview')}</h2>
        <p className="text-muted-foreground">
          O módulo <strong>Financeiro</strong> está localizado no menu lateral esquerdo, dentro da seção
          <strong> Gestão de Custos</strong>. Ele centraliza todas as informações de faturamento do contrato
          selecionado, permitindo que o usuário visualize o consumo total, os grupos associados, os usuários
          responsáveis e o detalhamento de cada item cobrado — incluindo créditos, impostos e tags.
        </p>
      </section>

      {/* Como acessar */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Como acessar</h2>
        <p className="text-muted-foreground">
          No menu lateral esquerdo, clique em <strong>Financeiro</strong> (identificado pelo ícone de cifrão).
          A página principal será carregada com o título <em>"Financeiro – Aqui você verá as informações de
          faturamento do contrato selecionado"</em>.
        </p>
      </section>

      {/* Passo 1 */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Passo 1 — Selecionando o contrato e o período</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Ao entrar no módulo, você verá o painel <strong>"Selecione um contrato para iniciar"</strong>. Ele
          possui dois campos obrigatórios:
        </p>
        <div className="grid gap-3 md:grid-cols-2 text-sm">
          <div className="p-3 rounded-lg border border-border bg-muted/50">
            <p className="font-semibold text-foreground mb-1">Selecione um contrato</p>
            <p className="text-muted-foreground">Use o menu suspenso para escolher o contrato desejado. Os contratos disponíveis são listados pelo identificador.</p>
          </div>
          <div className="p-3 rounded-lg border border-border bg-muted/50">
            <p className="font-semibold text-foreground mb-1">Período</p>
            <p className="text-muted-foreground">Selecione o mês/ano de referência no formato <code className="bg-muted px-1 rounded text-xs">MM/AAAA</code> (ex.: <code className="bg-muted px-1 rounded text-xs">05/2026</code>). Você pode digitar ou usar o ícone de calendário.</p>
          </div>
        </div>
        <p className="text-muted-foreground mt-4 text-sm">
          Após preencher os dois campos, clique no botão <strong>Buscar</strong> (vermelho). O sistema carregará
          as informações de faturamento referentes ao contrato e período informados.
        </p>
        <img
          src={financeiroPasso1.url}
          alt="Tela inicial do módulo Financeiro com seleção de contrato e período"
          loading="lazy"
          className="mt-6 w-full rounded-md border border-border"
        />
      </section>

      {/* Passo 2 */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Passo 2 — Visualizando a Fatura do Contrato</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Após a busca, o módulo exibe um painel dividido em três blocos principais:
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Fatura do contrato</h3>
            <p className="text-sm text-muted-foreground mb-3">Resumo financeiro consolidado do contrato, com os seguintes valores:</p>
            <ul className="grid gap-2 md:grid-cols-2 text-sm text-muted-foreground">
              {[
                ["Consumo total", "valor total faturado no período"],
                ["Consumo", "custo de uso dos serviços em nuvem"],
                ["Custo de produto", "custo referente a produtos específicos contratados"],
                ["Custo de marketplace", "custo de serviços adquiridos via marketplace"],
                ["Custo de suporte", "custo do plano de suporte contratado"],
                ["Cotação do dólar", "taxa de câmbio utilizada para conversão em BRL"],
                ["Cotação do marketplace", "taxa de câmbio aplicada aos itens de marketplace"],
                ["Período", "intervalo de datas (início ao fim do mês) coberto pela fatura"],
              ].map(([c, d]) => (
                <li key={c}><strong className="text-foreground">{c}</strong> — {d}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Grupos</h3>
            <p className="text-sm text-muted-foreground">
              Lista os grupos vinculados ao contrato com o valor de consumo de cada um. Cada grupo é um link
              clicável para acesso ao nível de detalhe. Use os botões <strong>Anterior</strong> e <strong>Próximo</strong> para
              navegar entre grupos quando houver mais de um.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Consumo por grupo</h3>
            <p className="text-sm text-muted-foreground">
              Gráfico de rosca (donut) que representa visualmente a distribuição percentual do consumo entre os
              grupos do contrato. A legenda ao lado identifica cada grupo pela cor correspondente.
            </p>
          </div>
        </div>
        <img
          src={financeiroPasso2.url}
          alt="Painel da Fatura do contrato com Grupos e gráfico de Consumo por grupo"
          loading="lazy"
          className="mt-6 w-full rounded-md border border-border"
        />
      </section>

      {/* Passo 3 */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Passo 3 — Consumo de Recursos durante o Mês</h2>
        </div>
        <p className="text-muted-foreground">
          Logo abaixo do painel de fatura, o módulo exibe um <strong>gráfico de barras</strong> intitulado
          <em> "Consumo de recursos durante o mês"</em>. Esse gráfico apresenta a evolução mensal do consumo na
          moeda do contrato ao longo dos últimos meses, com cada barra representando um período e cada cor
          representando um grupo diferente. Permite identificar tendências de crescimento ou redução no consumo
          ao longo do tempo.
        </p>
      </section>

      {/* Passo 4 */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Passo 4 — Acessando os Detalhes por Grupo</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Ao clicar no nome de um grupo (link sublinhado na seção "Grupos"), o sistema navega para a página de
          detalhes daquele grupo. Essa página apresenta:
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><strong className="text-foreground">Fatura do contrato (nível do grupo):</strong> consumo total, cotações e período referentes apenas àquele grupo.</li>
          <li><strong className="text-foreground">Grupos (sub-grupos):</strong> lista os grupos ou sub-contas vinculados, com navegação por paginação.</li>
          <li><strong className="text-foreground">Consumo por grupo:</strong> gráfico de rosca com a distribuição visual por sub-grupo.</li>
          <li><strong className="text-foreground">Consumo de recursos durante o mês:</strong> gráfico de barras com a evolução histórica do consumo daquele grupo.</li>
          <li><strong className="text-foreground">Distribuição de recursos durante o mês:</strong> gráfico de barras segmentado em três colunas — <em>Consumo</em>, <em>Imposto</em> e <em>Crédito</em> — permitindo entender a composição do custo total.</li>
          <li><strong className="text-foreground">Tabela de Logins/Usuários:</strong> exibida na parte inferior, com as colunas <em>Login</em> (identificador do usuário ou conta conectora) e <em>Valor</em> (custo associado no período). Cada login é clicável e a tabela possui paginação (ex.: "Mostrando 1 - 4 de 4 resultados").</li>
        </ul>
        <img
          src={financeiroPasso4.url}
          alt="Gráficos de consumo e distribuição do mês e tabela de logins/usuários do grupo"
          loading="lazy"
          className="mt-6 w-full rounded-md border border-border"
        />
      </section>

      {/* Passo 5 */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Passo 5 — Detalhes por Usuário/Login</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Ao clicar em um login na tabela, o sistema navega para a página de fatura do usuário. Essa página
          apresenta:
        </p>

        <div className="p-4 rounded-lg border border-border bg-muted/50 mb-4">
          <h3 className="font-semibold text-foreground mb-2">Fatura do usuário</h3>
          <p className="text-sm text-muted-foreground mb-3">Resumo financeiro do usuário/conta no período:</p>
          <ul className="grid gap-2 md:grid-cols-2 text-sm text-muted-foreground">
            {[
              ["Consumo total", "valor faturado para o usuário"],
              ["Créditos", "descontos ou créditos aplicados (valor negativo)"],
              ["Impostos", "tributos aplicados sobre o consumo"],
              ["Consumo", "custo direto de uso"],
              ["Custo de produto", "custo de produtos específicos"],
              ["Cotação do dólar / marketplace / Período", "informações de referência"],
            ].map(([c, d]) => (
              <li key={c}><strong className="text-foreground">{c}</strong> — {d}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-lg border border-border bg-muted/50 mb-4">
          <h3 className="font-semibold text-foreground mb-2">Recursos consumidos</h3>
          <p className="text-sm text-muted-foreground">
            Gráfico de barras com a evolução histórica de consumo daquele usuário nos últimos meses.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800 text-sm mb-4">
          <p className="text-blue-800 dark:text-blue-200">
            <strong>Dica:</strong> o ícone de filtro no canto superior direito da página serve para
            carregar/atualizar os dados financeiros do usuário selecionado. Clique nele se os valores
            aparecerem como "Não disponível".
          </p>
        </div>

        <p className="text-muted-foreground mb-3 text-sm">
          Abaixo do painel principal, há quatro cartões de detalhamento:
        </p>
        <div className="grid gap-3 md:grid-cols-2 text-sm">
          {[
            ["Itens bilhetados", "Valor total de itens cobrados. O botão + Detalhes abre a listagem com: Nome do Produto, Detalhe, Quantidade, Data Início/Fim e Custo."],
            ["Créditos", "Valor total de créditos aplicados. O botão + Detalhes abre a listagem com: Nome do Produto, Data Início/Fim e Custo."],
            ["Impostos", "Valor total de tributos. O botão + Detalhes abre a listagem com: Nome do Produto, Data Início/Fim e Custo."],
            ["Tags", "Visualiza o custo distribuído por tags atribuídas aos recursos. O botão + Detalhes abre a página 'Itens por Tag' com: Tag, Custo e Ações."],
          ].map(([c, d]) => (
            <div key={c} className="p-3 rounded-lg border border-border bg-muted/50">
              <p className="font-semibold text-foreground mb-1">{c}</p>
              <p className="text-muted-foreground text-xs">{d}</p>
            </div>
          ))}
        </div>
        <img
          src={financeiroPasso5.url}
          alt="Tela de Fatura do usuário com gráfico de Recursos consumidos e cartões Itens bilhetados, Créditos, Impostos e Tags"
          loading="lazy"
          className="mt-6 w-full rounded-md border border-border"
        />
      </section>

      {/* Navegação e Ações Gerais */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Navegação e Ações Gerais</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><strong className="text-foreground">Voltar:</strong> em qualquer nível, o ícone de seta (←) no topo retorna ao nível anterior da hierarquia (contrato → grupo → usuário → detalhe).</li>
          <li><strong className="text-foreground">Ordenação de tabelas:</strong> as colunas permitem ordenação clicando no cabeçalho. O ícone ⬆⬇ indica coluna ordenável; ⬇ indica ordenação ativa.</li>
          <li><strong className="text-foreground">Paginação:</strong> todas as tabelas possuem controles de primeira página («), página anterior (‹), página seguinte (›) e última página (»).</li>
          <li><strong className="text-foreground">Seção Produtos:</strong> na tela principal do contrato, há uma seção expansível <em>Produtos</em>. O ícone <strong>+</strong> ao lado do título expande a seção para visualizar os produtos associados ao contrato.</li>
        </ul>
      </section>

      {/* Hierarquia */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Hierarquia de Navegação</h2>
        </div>
        <p className="text-muted-foreground mb-3 text-sm">A estrutura do módulo Financeiro segue a seguinte hierarquia:</p>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li><strong className="text-foreground">Financeiro (contrato)</strong> → selecione contrato + período → visualiza fatura consolidada, grupos e gráficos.</li>
          <li><strong className="text-foreground">Grupo</strong> → clique no grupo → visualiza consumo, distribuição por categorias e lista de logins.</li>
          <li><strong className="text-foreground">Usuário/Login</strong> → clique no login → visualiza fatura do usuário e os quatro cartões de detalhe.</li>
          <li><strong className="text-foreground">Itens detalhados</strong> → clique em "+ Detalhes" de qualquer cartão → abre listagem específica de itens bilhetados, créditos, impostos ou tags.</li>
        </ol>
      </section>
    </div>
  );
}
