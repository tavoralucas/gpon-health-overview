import {
  Gauge,
  Target,
  Filter,
  LayoutGrid,
  BarChart3,
  Table2,
  MapPin,
  Route,
} from "lucide-react";
import GponDocPage from "./GponDocPage";
import { useTranslation } from "@/hooks/useTranslation";
import performanceFiltrosKpis from "@/assets/performance-filtros-kpis.png.asset.json";
import performanceKpisCards from "@/assets/performance-kpis-cards.png.asset.json";
import performanceGraficosAnalise from "@/assets/performance-graficos-analise.png.asset.json";
import performanceTabelaEquipamentosFirmware from "@/assets/performance-tabela-equipamentos-firmware.png.asset.json";
import performanceTabelaRegional from "@/assets/performance-tabela-regional.png.asset.json";

export default function PerformanceGpon() {
  const { t } = useTranslation();

  const filtros = [
    { n: 1, title: t('gpon360.perfFilter1Title'), desc: t('gpon360.perfFilter1Desc') },
    { n: 2, title: t('gpon360.perfFilter2Title'), desc: t('gpon360.perfFilter2Desc') },
    { n: 3, title: t('gpon360.perfFilter3Title'), desc: t('gpon360.perfFilter3Desc') },
    { n: 4, title: t('gpon360.perfFilter4Title'), desc: t('gpon360.perfFilter4Desc') },
    { n: 5, title: t('gpon360.perfFilter5Title'), desc: t('gpon360.perfFilter5Desc') },
    { n: 6, title: t('gpon360.perfFilter6Title'), desc: t('gpon360.perfFilter6Desc') },
  ];

  const kpis = [
    { label: t('gpon360.perfKpiAvgSpeed'), desc: t('gpon360.perfKpiAvgSpeedDesc') },
    { label: t('gpon360.perfKpiBelowThresholds'), desc: t('gpon360.perfKpiBelowThresholdsDesc') },
    { label: t('gpon360.perfKpiDirectlyEvaluated'), desc: t('gpon360.perfKpiDirectlyEvaluatedDesc') },
  ];

  const graficos = [
    { title: t('gpon360.perfChart1Title'), desc: t('gpon360.perfChart1Desc') },
    { title: t('gpon360.perfChart2Title'), desc: t('gpon360.perfChart2Desc') },
    { title: t('gpon360.perfChart3Title'), desc: t('gpon360.perfChart3Desc') },
    { title: t('gpon360.perfChart4Title'), desc: t('gpon360.perfChart4Desc') },
  ];

  const colunasEquipamentos = [
    t('gpon360.perfEquipTableCol1'),
    t('gpon360.perfEquipTableCol2'),
    t('gpon360.perfEquipTableCol3'),
    t('gpon360.perfEquipTableCol4'),
    t('gpon360.perfEquipTableCol5'),
    t('gpon360.perfEquipTableCol6'),
  ];

  const colunasRegional = [
    t('gpon360.perfRegionalCol1'),
    t('gpon360.perfRegionalCol2'),
    t('gpon360.perfRegionalCol3'),
    t('gpon360.perfRegionalCol4'),
    t('gpon360.perfRegionalCol5'),
    t('gpon360.perfRegionalCol6'),
  ];

  return (
    <GponDocPage
      title={t("gpon360.performance")}
      subtitle={t("gpon360.performanceDescription")}
      icon={Gauge}
    >
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t("common.whatIs")}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.perfWhatIs') }} />
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.perfWhatIs2') }} />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.perfSearchTitle')}</h2>
        </div>
        <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t('gpon360.perfSearchIntro') }} />
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
          <p className="text-sm text-amber-800 dark:text-amber-200" dangerouslySetInnerHTML={{ __html: t('gpon360.perfFilterWarning') }} />
        </div>
        <figure className="mt-6">
          <img
            src={performanceFiltrosKpis.url}
            alt={t('gpon360.perfFilterImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {t('gpon360.perfFilterImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <LayoutGrid className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.perfKpiCardsTitle')}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-1">{kpi.label}</h3>
              <p className="text-sm text-muted-foreground">{kpi.desc}</p>
            </div>
          ))}
        </div>
        <figure className="mt-6">
          <img
            src={performanceKpisCards.url}
            alt={t('gpon360.perfKpiImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {t('gpon360.perfKpiImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.perfChartsTitle')}</h2>
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
            src={performanceGraficosAnalise.url}
            alt={t('gpon360.perfChartImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {t('gpon360.perfChartImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Table2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.perfEquipTableTitle')}</h2>
        </div>
        <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t('gpon360.perfEquipTableIntro') }} />
        <ul className="mb-4 grid gap-2 sm:grid-cols-2">
          {colunasEquipamentos.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {c}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('gpon360.perfEquipTableSortNote') }} />
        <figure className="mt-6">
          <img
            src={performanceTabelaEquipamentosFirmware.url}
            alt={t('gpon360.perfEquipImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {t('gpon360.perfEquipImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.perfRegionalTableTitle')}</h2>
        </div>
        <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t('gpon360.perfRegionalTableIntro') }} />
        <ul className="mb-4 grid gap-2 sm:grid-cols-2">
          {colunasRegional.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {c}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('gpon360.perfRegionalSortNote') }} />
        <figure className="mt-6">
          <img
            src={performanceTabelaRegional.url}
            alt={t('gpon360.perfRegionalImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {t('gpon360.perfRegionalImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Route className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.perfFlowTitle')}</h2>
        </div>
        <ol className="space-y-3">
          {[
            t('gpon360.perfFluxoStep1'),
            t('gpon360.perfFluxoStep2'),
            t('gpon360.perfFluxoStep3'),
            t('gpon360.perfFluxoStep4'),
            t('gpon360.perfFluxoStep5'),
            t('gpon360.perfFluxoStep6'),
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
          {t('gpon360.perfOutro')}
        </p>
      </section>
    </GponDocPage>
  );
}