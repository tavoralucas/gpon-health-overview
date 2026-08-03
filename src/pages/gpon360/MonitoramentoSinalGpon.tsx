import {
  SignalHigh,
  Target,
  LayoutGrid,
  CalendarRange,
  MapPin,
  Trophy,
  LineChart,
  Route,
} from "lucide-react";
import GponDocPage from "./GponDocPage";
import { useTranslation } from "@/hooks/useTranslation";
import monitoramentoSinalObjetivo from "@/assets/monitoramento-sinal-objetivo.png.asset.json";
import monitoramentoSinalCidadesGpon from "@/assets/monitoramento-sinal-cidades-gpon.png.asset.json";
import monitoramentoSinalRanking from "@/assets/monitoramento-sinal-ranking.png.asset.json";


export default function MonitoramentoSinalGpon() {
  const { t } = useTranslation();

  const kpis = [
    { label: t('gpon360.kpiTotalClients'), desc: t('gpon360.kpiTotalClientsDesc') },
    { label: t('gpon360.kpiOkRange'), desc: t('gpon360.kpiOkRangeDesc') },
    { label: t('gpon360.kpiWarningRange'), desc: t('gpon360.kpiWarningRangeDesc') },
    { label: t('gpon360.kpiCriticalRange'), desc: t('gpon360.kpiCriticalRangeDesc') },
    { label: t('gpon360.kpiCitiesCount'), desc: t('gpon360.kpiCitiesCountDesc') },
  ];

  return (
    <GponDocPage
      title={t("gpon360.signalMonitoring")}
      subtitle={t("gpon360.signalMonitoringDescription")}
      icon={SignalHigh}
    >
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t("common.overview")}</h2>
        </div>
        <p className="text-muted-foreground">
          {t('gpon360.signalMonitoringOverview')}
        </p>
        <figure className="mt-6">
          <img
            src={monitoramentoSinalObjetivo.url}
            alt={t('gpon360.signalOverviewImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {t('gpon360.signalOverviewImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <LayoutGrid className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.kpiCards')}</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          {t('gpon360.kpiIntro')}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-1">{kpi.label}</h3>
              <p className="text-sm text-muted-foreground">{kpi.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {t('gpon360.kpiAutoUpdate')}
        </p>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <CalendarRange className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.periodFilter')}</h2>
        </div>
        <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('gpon360.periodFilterDesc') }} />
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.citiesGpon')}</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          {t('gpon360.citiesGponIntro')}
        </p>
        <div className="space-y-3">
          {[
            { n: 1, title: t('gpon360.citiesItem1Title'), desc: t('gpon360.citiesItem1Desc') },
            { n: 2, title: t('gpon360.citiesItem2Title'), desc: t('gpon360.citiesItem2Desc') },
            { n: 3, title: t('gpon360.citiesItem3Title'), desc: t('gpon360.citiesItem3Desc') },
            { n: 4, title: t('gpon360.citiesItem4Title'), desc: t('gpon360.citiesItem4Desc') },
            { n: 5, title: t('gpon360.citiesItem5Title'), desc: t('gpon360.citiesItem5Desc') },
          ].map((item) => (
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

        <h3 className="mt-6 mb-2 font-semibold text-foreground">{t('gpon360.citiesDeepNavTitle')}</h3>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.citiesDeepNavDesc1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.citiesDeepNavDesc2') }} />
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200" dangerouslySetInnerHTML={{ __html: t('gpon360.citiesDeepNavTip') }} />
          </div>
        </div>
        <figure className="mt-6">
          <img
            src={monitoramentoSinalCidadesGpon.url}
            alt={t('gpon360.citiesImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {t('gpon360.citiesImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.rankingBlock')}</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          {t('gpon360.rankingIntro')}
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: t('gpon360.rankingCriticos'), desc: t('gpon360.rankingCriticosDesc') },
            { title: t('gpon360.rankingAtencao'), desc: t('gpon360.rankingAtencaoDesc') },
            { title: t('gpon360.rankingMedia'), desc: t('gpon360.rankingMediaDesc') },
          ].map((aba) => (
            <div key={aba.title} className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-1">{aba.title}</h3>
              <p className="text-sm text-muted-foreground">{aba.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('gpon360.rankingClickNote') }} />
        <figure className="mt-6">
          <img
            src={monitoramentoSinalRanking.url}
            alt={t('gpon360.rankingImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {t('gpon360.rankingImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <LineChart className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.rxTxGraphs')}</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          {t('gpon360.rxTxGraphsIntro')}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-1">{t('gpon360.rxGraphTitle')}</h3>
            <p className="text-sm text-muted-foreground">{t('gpon360.rxGraphDesc')}</p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-1">{t('gpon360.txGraphTitle')}</h3>
            <p className="text-sm text-muted-foreground">{t('gpon360.txGraphDesc')}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {t('gpon360.rxTxGraphsOutro')}
        </p>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Route className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.usageFlowSummary')}</h2>
        </div>
        <ol className="space-y-3">
          {[
            t('gpon360.fluxoStep1'),
            t('gpon360.fluxoStep2'),
            t('gpon360.fluxoStep3'),
            t('gpon360.fluxoStep4'),
            t('gpon360.fluxoStep5'),
            t('gpon360.fluxoStep6'),
          ].map((passo, i) => (
            <li key={passo} className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </div>
              <p className="text-sm text-muted-foreground">{passo}</p>
            </li>
          ))}
        </ol>
      </section>
    </GponDocPage>
  );
}