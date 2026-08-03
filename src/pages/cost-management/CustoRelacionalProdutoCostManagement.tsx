import { ArrowLeft, Network, Filter, Search, Lightbulb, ListChecks } from "lucide-react";
import { useNavigate } from "react-router-dom";
import custoRelacionalImg from "@/assets/custo-relacional-produto.png.asset.json";
import custoRelacionalResultadoImg from "@/assets/custo-relacional-resultado.png.asset.json";
import { useTranslation } from "@/hooks/useTranslation";

export default function CustoRelacionalProdutoCostManagement() {
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
          <Network className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('costManagement.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Custo Relacional de Produto</h1>
          <p className="mt-1 text-muted-foreground">
            Módulo: Gestão de Custos · Menu lateral &gt; Custo Relacional de Produto
          </p>
        </div>
      </div>

      {/* O que é */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t('common.whatIs')}</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            O <strong>Custo Relacional de Produto</strong> é uma funcionalidade de relatório que permite
            visualizar e detalhar os gastos de recursos e sub-recursos consumidos na nuvem, organizados por
            produto e família de produto. Com ela, é possível entender exatamente onde o dinheiro está sendo
            gasto dentro de um contrato, cruzando informações de contrato, provider de nuvem, produto e contas
            vinculadas (Linkeds).
          </p>
          <p>
            A funcionalidade é especialmente útil para times de FinOps, gestores de contratos e responsáveis
            por rateio de custos, pois permite granularidade na análise dos gastos, facilitando a identificação
            de consumo por serviço, sub-serviço e período.
          </p>
        </div>
        <img
          src={custoRelacionalImg.url}
          alt="Tela do Custo Relacional de Produto com os passos 1 e 2"
          loading="lazy"
          className="mt-6 w-full rounded-md border border-border"
        />
      </section>

      {/* Como funciona */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-2">Como funciona</h2>
        <p className="text-muted-foreground mb-6">
          O uso da funcionalidade é dividido em dois passos sequenciais, representados visualmente por etapas
          numeradas na interface.
        </p>

        {/* Passo 1 */}
        <div className="rounded-lg border border-border bg-muted/30 p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              1
            </div>
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              Selecione os parâmetros do contrato e o período desejado
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Nesta primeira etapa, você define o escopo geral da consulta. Todos os campos devem ser preenchidos
            antes de avançar.
          </p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Intervalo</strong> — Define a granularidade temporal do relatório.
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                <li><strong>Mensal:</strong> agrupa os dados mês a mês. Ideal para análises de tendência.</li>
                <li><strong>Semanal:</strong> agrupa os dados por semana. Útil para variações de curto prazo.</li>
                <li><strong>Diário:</strong> exibe os dados dia a dia, com maior nível operacional.</li>
              </ul>
            </li>
            <li>
              <strong className="text-foreground">Período</strong> — Define o intervalo de datas a ser consultado.
              Ao clicar no campo, um seletor de meses é exibido, permitindo escolher o mês e ano desejados.
            </li>
            <li>
              <strong className="text-foreground">Lista de contratos</strong> — Selecione o contrato a analisar.
              O sistema carrega automaticamente o contrato associado ao perfil logado, mas é possível alterá-lo
              pelo dropdown caso o usuário tenha acesso a múltiplos contratos.
            </li>
            <li>
              <strong className="text-foreground">Account Provider</strong> — Selecione o provedor de nuvem
              vinculado ao contrato (ex.: AWS, Azure, GCP).
            </li>
          </ul>
          <div className="mt-4 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-200">
            Após preencher todos os campos, clique em <strong>Prosseguir</strong> para liberar o Passo 2. O botão{" "}
            <strong>Limpar</strong> redefine todos os campos desta etapa.
          </div>
        </div>

        {/* Passo 2 */}
        <div className="rounded-lg border border-border bg-muted/30 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              2
            </div>
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" />
              Selecione os filtros para exibir os dados
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Com o contexto do contrato definido, esta etapa permite refinar a consulta aplicando filtros
            específicos de produto e conta.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Linkeds</strong> — Filtra os dados por contas vinculadas
              (sub-contas associadas ao contrato). Permite segmentar o custo por unidade de negócio, projeto ou
              ambiente (ex.: produção, homologação).
            </li>
            <li>
              <strong className="text-foreground">Produto</strong> — Seleciona o serviço de nuvem que deseja
              analisar (ex.: EC2, S3, RDS na AWS).
            </li>
            <li>
              <strong className="text-foreground">Família de produto</strong> — Agrupa produtos por categoria,
              permitindo uma visão consolidada de um conjunto de serviços relacionados.
            </li>
          </ul>
          <div className="mt-4 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-200">
            Após definir os filtros, clique em <strong>Pesquisar</strong> para gerar o relatório. O botão{" "}
            <strong>Limpar</strong> redefine os filtros desta etapa sem alterar os parâmetros do Passo 1.
          </div>
        </div>

        <img
          src={custoRelacionalResultadoImg.url}
          alt="Resultado do relatório com gráfico de custo por linked e tabela de produtos"
          loading="lazy"
          className="mt-6 w-full rounded-md border border-border"
        />
      </section>

      {/* Fluxo resumido */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ListChecks className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Fluxo resumido de uso</h2>
        </div>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-2">
          <li>Acesse <strong>Gestão de Custos &gt; Custo Relacional de Produto</strong> no menu lateral.</li>
          <li>No Passo 1, selecione <strong>Intervalo</strong>, <strong>Período</strong>, <strong>Contrato</strong> e <strong>Account Provider</strong>.</li>
          <li>Clique em <strong>Prosseguir</strong> para avançar.</li>
          <li>No Passo 2, aplique os filtros de <strong>Linkeds</strong>, <strong>Produto</strong> e/ou <strong>Família de produto</strong>.</li>
          <li>Clique em <strong>Pesquisar</strong> para gerar o relatório detalhado de custos.</li>
        </ol>
      </section>

      {/* Casos de uso */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Casos de uso típicos</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Rateio de custos por área</h3>
            <p className="text-sm text-muted-foreground">
              Use o filtro de Linkeds para identificar o consumo de cada conta/projeto e distribuir os custos
              internamente.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Análise de um serviço específico</h3>
            <p className="text-sm text-muted-foreground">
              Filtre por Produto para entender quanto está sendo gasto em um recurso específico da nuvem.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Visão consolidada por categoria</h3>
            <p className="text-sm text-muted-foreground">
              Use Família de produto para agrupar serviços correlatos e ter uma visão macro dos gastos.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">Comparação de períodos</h3>
            <p className="text-sm text-muted-foreground">
              Altere o Intervalo para Mensal ou Semanal e compare períodos distintos para identificar
              variações de consumo.
            </p>
          </div>
        </div>
      </section>

      {/* Dica */}
      <section className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 dark:text-amber-100">
            <strong>Dica:</strong> Se o botão "Prosseguir" do Passo 1 estiver desabilitado, verifique se todos
            os campos obrigatórios foram preenchidos: Intervalo, Período, Lista de contratos e Account Provider.
          </p>
        </div>
      </section>
    </div>
  );
}
