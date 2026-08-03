import { ArrowLeft, DollarSign, Building2, Landmark, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function VisaoGeralCostManagement() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/cost-management")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('costManagement.title') })}
      </button>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <TrendingDown className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('costManagement.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{t("costManagement.overview")}</h1>
          <p className="mt-1 text-muted-foreground">
            {t('costManagement.overviewDescription')}
          </p>
        </div>
      </div>

      {/* Logo e Apresentação */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-emerald-600 shrink-0">
            <DollarSign className="h-10 w-10 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{t("costManagement.finance")}</h2>
            <p className="text-sm text-muted-foreground">
              {t('costManagement.financeDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t("costManagement.financeIntro")}</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            No início deste manual estão descritos os cinco pontos de atuação da plataforma uCloud: 
            governança financeira, faturamento dos serviços, monitoração da infraestrutura, inventário e operação da infraestrutura.
          </p>

          <p>
            Esta seção é dedicada ao tema &quot;Financeiro&quot;. É importante ressaltar que a plataforma <strong>não cria ou gera valores de recursos computacionais</strong> - estes valores são gerados nos provedores de nuvem pública.
          </p>

          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">{t("common.howToUse")}</h3>
            <p className="text-blue-800 dark:text-blue-200">
              A plataforma uCloud extrai do arquivo de <strong>billing</strong> o faturamento dos provedores de nuvem pública, 
              fazendo o download dos valores gerados pelo uso dos recursos computacionais. Em seguida, adiciona estas informações 
              em suas bases de dados internas e, posteriormente, aplica os custos calculados e convertidos para moeda corrente no Brasil.
            </p>
          </div>

          <p>
            Através do menu Financeiro, o usuário pode ter acesso a diversas formas de visualização sobre a evolução dos custos 
            referentes ao consumo dos recursos computacionais de serviços de nuvem pública.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-200">
              A plataforma uCloud possui uma interface de visualização destes custos de forma pronta e finalizada. 
              É desnecessário ao usuário criar ou personalizar qualquer uma das visualizações existentes, salvo algumas exceções 
              que o relatório permite personalizar o período e informações detalhadas sobre recursos tagueados.
            </p>
          </div>
        </div>
      </section>

      {/* Perfis de Usuários */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t("costManagement.userProfiles")}</h2>
        
        <p className="text-muted-foreground">
          O menu Financeiro é visualizado por qualquer perfil de usuário. A seguir são apresentados os tipos de perfil:
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">{t("costManagement.normalUser")}</h3>
            <p className="text-sm text-muted-foreground">
              Este perfil visualiza o consumo próprio e o do seu contrato.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">{t("costManagement.contractAdmin")}</h3>
            <p className="text-sm text-muted-foreground">
              Visualiza as informações de todos os grupos e usuários vinculados ao contrato.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-2">{t("costManagement.groupAdmin")}</h3>
            <p className="text-sm text-muted-foreground">
              Visualiza as informações do(s) grupo(s) aos quais está vinculado e de todos os usuários vinculados ao grupo.
            </p>
          </div>
        </div>
      </section>

      {/* Empresas Privadas */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t("costManagement.privateCompanies")}</h2>
        </div>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Para o ambiente corporativo, a plataforma uCloud efetua o download das linhas do arquivo de billing (também conhecido como bucket) 
            do provedor de serviço de nuvem. Este arquivo é um arquivo texto ASCII com dados separados por vírgula (arquivo formato .csv).
          </p>

          <p>
            A plataforma uCloud sincroniza o conteúdo deste arquivo em suas bases de dados internas e calcula a conversão dos valores 
            referentes ao período, utilizando-os de acordo com o informado nos seguintes campos do Contrato:
          </p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Taxa de faturamento</li>
            <li>Moeda</li>
            <li>Tipo de cotação (fixa/variável)</li>
            <li>Dia de cotação da moeda (válido para cotação variável - obtém o valor da PTAX do Banco Central do Brasil)</li>
          </ul>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg mt-4">
            <h3 className="font-semibold mb-2">{t("costManagement.conversionFormulas")}</h3>
            <div className="space-y-2 text-sm font-mono">
              <p><strong>Cotação Fixa:</strong></p>
              <p className="text-xs">Valor R$ = Valor US$ Total × Valor [Fixo] Dólar × Taxa de Faturamento</p>
              
              <p className="mt-3"><strong>Cotação Variável:</strong></p>
              <p className="text-xs">Valor R$ = Valor US$ Total × Valor [Dia] PTAX × Taxa de Faturamento</p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">{t("costManagement.important")}</h3>
            <p className="text-blue-800 dark:text-blue-200">
              Para provedores que armazenam valores em Reais, o usuário Administrador do Contrato deve alterar o campo 
              valor da <strong>Moeda</strong> para 1,00 e <strong>Tipo de Cotação</strong> FIXA.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800 mt-4">
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">{t("costManagement.warning")}</h3>
            <p className="text-red-800 dark:text-red-200">
              O valor referente às taxas de impostos para emissão de nota fiscal no território brasileiro não é apresentado 
              por nenhum provedor e, também, não é calculado pela plataforma uCloud. Os valores de taxas e impostos são 
              calculados pelo emissor do documento final da Nota Fiscal.
            </p>
          </div>
        </div>
      </section>

      {/* Empresas Públicas (USN) */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Landmark className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t("costManagement.publicCompanies")}</h2>
        </div>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Devido à constante variação do valor da taxa de câmbio (Dólar ↔ Real), o Governo Federal brasileiro criou uma 
            formatação inteligente e facilitada para controlar seus limites orçamentários para computação em nuvem pública, 
            de forma a nunca descumprir os limites da Lei de Diretrizes Orçamentárias (LDO).
          </p>

          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">{t("costManagement.usnUnit")}</h3>
            <p className="text-green-800 dark:text-green-200">
              É um modelo de precificação dos serviços de nuvem, designada às entidades e órgãos integrantes da esfera 
              governamental brasileira. Visa estabelecer-se como método previsível, linear e flexível para obtenção de uma 
              quantidade específica cobrada pelos serviços de computação em nuvem.
            </p>
          </div>

          <p>
            Esta abordagem única permite a qualquer órgão de Governo Brasileiro (Federal, Estadual ou Municipal) consumir recursos 
            de computação em nuvem pública permitindo que o valor dos serviços em USN seja calculado utilizando o preço em dólar 
            comercial do dia do pregão, fixo ao longo do contrato.
          </p>

          <h3 className="font-semibold text-foreground mt-4">{t("costManagement.usnCalculation")}</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>É aplicada a somatória da quantidade usada do recurso pelo preço definido</li>
            <li>No caso das máquinas virtuais, o preço é multiplicado pela quantidade de CPU ou pela quantidade de memória em GB</li>
            <li>O que define se este cálculo será por CPU ou por memória é a tag aplicada aos recursos</li>
            <li>No caso de inexistência da tag do tipo USN no recurso, o cálculo não é feito</li>
          </ul>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg mt-4">
            <h3 className="font-semibold mb-2">{t("costManagement.usnConversionFormulas")}</h3>
            <div className="space-y-2 text-sm font-mono">
              <p><strong>Cotação Fixa:</strong></p>
              <p className="text-xs">Valor R$ = Valor Recurso USN/h × Somatória Mensal USN × Valor US$ [Fixa] × Taxa de Faturamento</p>
              
              <p className="mt-3"><strong>Cotação Variável:</strong></p>
              <p className="text-xs">Valor R$ = Valor Recurso USN/h × Somatória Mensal USN × Valor US$ [Dia] PTAX × Taxa de Faturamento</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ambiente Corporativo */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t("costManagement.corporateEnvironment")}</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            O <strong>Contrato</strong> é o ponto principal onde a organização usuária da plataforma uCloud estabelece a forma como 
            gerencia os aspectos comerciais, os limites financeiros (ou dos recursos computacionais), define os valores para recursos 
            computacionais de forma individualizada e vincula os grupos e os usuários.
          </p>

          <p>
            No contrato se estabelece:
          </p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Forma da conversão da moeda estrangeira para a moeda local</li>
            <li>Se o valor de conversão é fixo ou variável</li>
            <li>As taxas de impostos aplicadas aos custos do contrato</li>
            <li>Regras de faturamento personalizadas</li>
            <li>Moeda de apresentação dos relatórios financeiros</li>
          </ul>

          <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 mt-4">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">{t("costManagement.importantNote")}</h3>
            <p className="text-purple-800 dark:text-purple-200">
              Todas as telas dos relatórios apresentados neste documento mostram os valores sendo convertidos para Real (R$), 
              conforme configurado no Contrato.
            </p>
          </div>
        </div>
      </section>

      {/* Tipos de Painéis */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t("costManagement.financialPanels")}</h2>
        
        <p className="text-muted-foreground">
          A plataforma uCloud apresenta relatórios com base em dois conceitos financeiros diferentes:
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-2">{t("costManagement.consumptionPanels")}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Referem-se aos valores acumulados dos recursos computacionais consumidos/utilizados no <strong>mês corrente</strong> até 
              o dia corrente ou até o último período de processamento dos valores pelo provedor.
            </p>
            <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800 text-xs">
              <p className="text-amber-800 dark:text-amber-200">
                <strong>{t("costManagement.processingWindow")}:</strong> O termo "janela" se refere ao período que o provedor efetua a gravação dos 
                valores dos recursos computacionais no arquivo de Bucket. O tempo médio desta janela está por volta de doze (12) horas.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-2">{t("costManagement.invoicePanels")}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Apresentam o valor total de consumo dos recursos computacionais do provedor de serviço de nuvem (público/privado) 
              apenas do período ao <strong>mês anterior</strong> do mês corrente.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800 text-xs">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>{t("costManagement.example")}:</strong> Um contrato com data de faturamento no dia 8. A fatura do mês de agosto é no dia 08 e 
                refere-se aos valores consumidos durante todo o mês anterior (08 de julho até 07 de agosto).
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
          <p className="text-blue-800 dark:text-blue-200">
            A plataforma uCloud estabelece o período do <strong>mês do faturamento</strong> com a informação do campo 
            "Dia da Fatura" na seção Regras de Faturamento do Contrato.
          </p>
        </div>
      </section>
    </div>
  );
}
