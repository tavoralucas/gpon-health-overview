import {
  Siren,
  Target,
  CalendarRange,
  LayoutGrid,
  Table2,
  Eye,
  Trophy,
  Route,
} from "lucide-react";
import GponDocPage from "./GponDocPage";
import { useTranslation } from "@/hooks/useTranslation";
import trapPeriodoAsset from "@/assets/trap-massivo-periodo-analise.png.asset.json";
import trapDrillDownAsset from "@/assets/trap-massivo-drill-down.png.asset.json";
import trapRankingAsset from "@/assets/trap-massivo-ranking.png.asset.json";

export default function TrapMassivoGpon() {
  const { t } = useTranslation();

  const kpis = [
    { label: t('gpon360.kpiTotalRecords'), desc: t('gpon360.kpiTotalRecordsDesc') },
    { label: t('gpon360.kpiCities'), desc: t('gpon360.kpiCitiesDesc') },
    { label: t('gpon360.kpiQosAvailability'), desc: t('gpon360.kpiQosAvailabilityDesc') },
    { label: t('gpon360.kpiDropEvents'), desc: t('gpon360.kpiDropEventsDesc') },
  ];

  const colunas = [
    t('gpon360.citiesTableCol1'),
    t('gpon360.citiesTableCol2'),
    t('gpon360.citiesTableCol3'),
    t('gpon360.citiesTableCol4'),
  ];

  const recursosTabela = [
    { title: t('gpon360.citiesResource1Title'), desc: t('gpon360.citiesResource1Desc') },
    { title: t('gpon360.citiesResource2Title'), desc: t('gpon360.citiesResource2Desc') },
    { title: t('gpon360.citiesResource3Title'), desc: t('gpon360.citiesResource3Desc') },
    { title: t('gpon360.citiesResource4Title'), desc: t('gpon360.citiesResource4Desc') },
  ];

  const rankings = [
    { title: t('gpon360.ranking1Title'), desc: t('gpon360.ranking1Desc') },
    { title: t('gpon360.ranking2Title'), desc: t('gpon360.ranking2Desc') },
  ];

  return (
    <GponDocPage
      title={t("gpon360.massiveTrap")}
      subtitle={t("gpon360.massiveTrapDescription")}
      icon={Siren}
    >
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t("common.overview")}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.trapOverview1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.trapOverview2') }} />
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.trapOverview3') }} />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <CalendarRange className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.periodFilter')}</h2>
        </div>
        <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('gpon360.trapPeriodDesc') }} />
        <figure className="mt-6 rounded-lg border border-border overflow-hidden bg-muted/30">
          <img
            src={trapPeriodoAsset.url}
            alt={t('gpon360.trapPeriodImageAlt')}
            className="w-full h-auto"
          />
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
        <div className="grid gap-4 sm:grid-cols-2">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-1">{kpi.label}</h3>
              <p className="text-sm text-muted-foreground">{kpi.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Table2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.citiesTable')}</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          {t('gpon360.citiesTableDesc')}
        </p>
        <ul className="mb-6 grid gap-2 sm:grid-cols-2">
          {colunas.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {c}
            </li>
          ))}
        </ul>
        <h3 className="mb-3 font-semibold text-foreground">{t('gpon360.citiesTableResources')}</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {recursosTabela.map((r) => (
            <div key={r.title} className="p-4 rounded-lg border border-border bg-muted/50">
              <h4 className="font-semibold text-foreground mb-1">{r.title}</h4>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.drillDownButton')}</h2>
        </div>
        <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('gpon360.drillDownDesc') }} />
        <figure className="mt-6 rounded-lg border border-border overflow-hidden bg-muted/30">
          <img
            src={trapDrillDownAsset.url}
            alt={t('gpon360.drillDownImageAlt')}
            className="w-full h-auto"
          />
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.rankingPanel')}</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          {t('gpon360.rankingDesc')}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {rankings.map((r) => (
            <div key={r.title} className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-1">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {t('gpon360.rankingOutro')}
        </p>
        <figure className="mt-6 rounded-lg border border-border overflow-hidden bg-muted/30">
          <img
            src={trapRankingAsset.url}
            alt={t('gpon360.rankingImageAlt')}
            className="w-full h-auto"
          />
        </figure>
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
            t('gpon360.fluxoStep7'),
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
          {t('gpon360.trapOutro')}
        </p>
      </section>
    </GponDocPage>
  );
}