import {
  Activity,
  Target,
  Filter,
  LayoutGrid,
  BarChart3,
  Table2,
  Eye,
  Route,
} from "lucide-react";
import GponDocPage from "./GponDocPage";
import { useTranslation } from "@/hooks/useTranslation";
import monitoramentoQuedasFiltros from "@/assets/monitoramento-quedas-filtros.png.asset.json";
import monitoramentoQuedasKpis from "@/assets/monitoramento-quedas-kpis.png.asset.json";
import monitoramentoQuedasGraficos from "@/assets/monitoramento-quedas-graficos.png.asset.json";
import monitoramentoQuedasTabela from "@/assets/monitoramento-quedas-tabela.png.asset.json";
import monitoramentoQuedasVer from "@/assets/monitoramento-quedas-ver.png.asset.json";

export default function MonitoramentoQuedasGpon() {
  const { t } = useTranslation();

  const filtros = [
    { n: 1, title: t('gpon360.filter1Title'), desc: t('gpon360.filter1Desc') },
    { n: 2, title: t('gpon360.filter2Title'), desc: t('gpon360.filter2Desc') },
    { n: 3, title: t('gpon360.filter3Title'), desc: t('gpon360.filter3Desc') },
    { n: 4, title: t('gpon360.filter4Title'), desc: t('gpon360.filter4Desc') },
    { n: 5, title: t('gpon360.filter5Title'), desc: t('gpon360.filter5Desc') },
  ];

  const kpis = [
    { label: t('gpon360.kpiAffectedClients'), desc: t('gpon360.kpiAffectedClientsDesc') },
    { label: t('gpon360.kpiTotalFalls'), desc: t('gpon360.kpiTotalFallsDesc') },
    { label: t('gpon360.kpiSignalFalls'), desc: t('gpon360.kpiSignalFallsDesc') },
    { label: t('gpon360.kpiPowerFalls'), desc: t('gpon360.kpiPowerFallsDesc') },
    { label: t('gpon360.kpiAffectedCities'), desc: t('gpon360.kpiAffectedCitiesDesc') },
    { label: t('gpon360.kpiAffectedStreets'), desc: t('gpon360.kpiAffectedStreetsDesc') },
  ];

  const graficos = [
    { title: t('gpon360.chart1Title'), desc: t('gpon360.chart1Desc') },
    { title: t('gpon360.chart2Title'), desc: t('gpon360.chart2Desc') },
  ];

  const colunas = [
    t('gpon360.fallsTableCol1'),
    t('gpon360.fallsTableCol2'),
    t('gpon360.fallsTableCol3'),
    t('gpon360.fallsTableCol4'),
    t('gpon360.fallsTableCol5'),
    t('gpon360.fallsTableCol6'),
    t('gpon360.fallsTableCol7'),
    t('gpon360.fallsTableCol8'),
    t('gpon360.fallsTableCol9'),
    t('gpon360.fallsTableCol10'),
  ];

  const recursosTabela = [
    { title: t('gpon360.fallsRes1Title'), desc: t('gpon360.fallsRes1Desc') },
    { title: t('gpon360.fallsRes2Title'), desc: t('gpon360.fallsRes2Desc') },
    { title: t('gpon360.fallsRes3Title'), desc: t('gpon360.fallsRes3Desc') },
    { title: t('gpon360.fallsRes4Title'), desc: t('gpon360.fallsRes4Desc') },
  ];

  return (
    <GponDocPage
      title={t("gpon360.fallMonitoring")}
      subtitle={t("gpon360.fallMonitoringDescription")}
      icon={Activity}
    >
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t("common.overview")}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.fallOverview1') }} />
          <p>{t('gpon360.fallOverview2')}</p>
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.fallOverview3') }} />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.searchFilters')}</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          {t('gpon360.searchFiltersIntro')}
        </p>
        <div className="space-y-3">
          {filtros.map((item) => (
            <div key={item.n} className="p-4 rounded-lg border border-border bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {item.n}
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-200" dangerouslySetInnerHTML={{ __html: t('gpon360.filterWarning') }} />
        </div>
        <figure className="mt-6">
          <img
            src={monitoramentoQuedasFiltros.url}
            alt={t('gpon360.filterImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {t('gpon360.filterImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <LayoutGrid className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.kpiCardsTitle')}</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          {t('gpon360.kpiIntro2')}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-1">{kpi.label}</h3>
              <p className="text-sm text-muted-foreground">{kpi.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
          <p className="text-sm text-foreground">
            <strong>{t('gpon360.kpiPeakTitle')}:</strong> {t('gpon360.kpiPeakDesc')}
          </p>
        </div>
        <figure className="mt-6">
          <img
            src={monitoramentoQuedasKpis.url}
            alt={t('gpon360.kpiImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {t('gpon360.kpiImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.chartsTitle')}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {graficos.map((g) => (
            <div key={g.title} className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-1">{g.title}</h3>
              <p className="text-sm text-muted-foreground">{g.desc}</p>
            </div>
          ))}
        </div>
        <figure className="mt-6">
          <img
            src={monitoramentoQuedasGraficos.url}
            alt={t('gpon360.chartImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {t('gpon360.chartImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Table2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.fallsTableTitle')}</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          {t('gpon360.fallsTableIntro')}
        </p>
        <ul className="mb-6 grid gap-2 sm:grid-cols-2">
          {colunas.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {c}
            </li>
          ))}
        </ul>
        <h3 className="mb-3 font-semibold text-foreground">{t('gpon360.fallsTableResources')}</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {recursosTabela.map((r) => (
            <div key={r.title} className="p-4 rounded-lg border border-border bg-muted/50">
              <h4 className="font-semibold text-foreground mb-1">{r.title}</h4>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
        <figure className="mt-6">
          <img
            src={monitoramentoQuedasTabela.url}
            alt={t('gpon360.fallsTableImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {t('gpon360.fallsTableImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.fallDetailTitle')}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.fallDetailDesc1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.fallDetailDesc2') }} />
        </div>
        <figure className="mt-6">
          <img
            src={monitoramentoQuedasVer.url}
            alt={t('gpon360.fallDetailImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {t('gpon360.fallDetailImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Route className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.fallFlowTitle')}</h2>
        </div>
        <ol className="space-y-3">
          {[
            t('gpon360.fallFluxoStep1'),
            t('gpon360.fallFluxoStep2'),
            t('gpon360.fallFluxoStep3'),
            t('gpon360.fallFluxoStep4'),
            t('gpon360.fallFluxoStep5'),
            t('gpon360.fallFluxoStep6'),
            t('gpon360.fallFluxoStep7'),
          ].map((passo, i) => (
            <li key={passo} className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </div>
              <p className="text-sm text-muted-foreground">{passo}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted-foreground">
          {t('gpon360.fallOutro')}
        </p>
      </section>
    </GponDocPage>
  );
}