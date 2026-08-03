import {
  FileBarChart,
  Target,
  Filter,
  Table2,
  Download,
  Route,
  AlertTriangle,
} from "lucide-react";
import GponDocPage from "./GponDocPage";
import { useTranslation } from "@/hooks/useTranslation";
import relatoriosTela from "@/assets/relatorios-analiticos-tela.png.asset.json";

export default function RelatoriosGpon() {
  const { t } = useTranslation();

  const relatorioColunas = [
    { title: t('gpon360.reportsColType'), desc: t('gpon360.reportsColTypeDesc') },
    { title: t('gpon360.reportsColDate'), desc: t('gpon360.reportsColDateDesc') },
    { title: t('gpon360.reportsColSize'), desc: t('gpon360.reportsColSizeDesc') },
    { title: t('gpon360.reportsColActions'), desc: t('gpon360.reportsColActionsDesc') },
  ];

  const praticas = [
    t('gpon360.reportsUsage1'),
    t('gpon360.reportsUsage2'),
    t('gpon360.reportsUsage3'),
    t('gpon360.reportsUsage4'),
  ];

  return (
    <GponDocPage
      title={t("gpon360.reports")}
      subtitle={t("gpon360.reportsDescription")}
      icon={FileBarChart}
    >
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t("common.whatIs")}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.reportsWhatIs1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.reportsWhatIs2') }} />
        </div>
        <figure className="mt-6">
          <img
            src={relatoriosTela.url}
            alt={t('gpon360.reportsImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {t('gpon360.reportsImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.reportsHowItWorks')}</h2>
        </div>

        <div className="space-y-6 text-muted-foreground">
          <div>
            <h3 className="font-semibold text-foreground mb-2">{t('gpon360.reportsFilterTitle')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('gpon360.reportsFilterDesc') }} />
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">{t('gpon360.reportsTableTitle')}</h3>
            <p className="mb-4">
              {t('gpon360.reportsTableIntro')}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatorioColunas.map((col) => (
                <div key={col.title} className="p-4 rounded-lg border border-border bg-muted/50">
                  <h4 className="font-semibold text-foreground mb-1">{col.title}</h4>
                  <p className="text-sm text-muted-foreground">{col.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4">
              {t('gpon360.reportsDefaultNote')}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Route className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.reportsUsageTitle')}</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          {t('gpon360.reportsUsageIntro')}
        </p>
        <ul className="mb-4 grid gap-2 sm:grid-cols-2">
          {praticas.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-4 bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="text-sm text-amber-800 dark:text-amber-200" dangerouslySetInnerHTML={{ __html: t('gpon360.reportsWarning') }} />
          </div>
        </div>
      </section>
    </GponDocPage>
  );
}