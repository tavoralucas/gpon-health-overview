import { Users, Search, Table } from "lucide-react";
import clientesFiltros from "@/assets/clientes-filtros.png.asset.json";
import clientesTabelaResultados from "@/assets/clientes-tabela-resultados.png.asset.json";
import { useTranslation } from "@/hooks/useTranslation";
import GponDocPage from "./GponDocPage";

export default function ClientesGpon() {
  const { t } = useTranslation();
  return (
    <GponDocPage
      title={t('gpon360.clients')}
      subtitle={t('gpon360.clientsDescription')}
      icon={Users}
    >
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t('gpon360.whatIs')}</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            {t('gpon360.clientsIntro')}
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Search className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.howSearchWorks')}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p>
            {t('gpon360.clientsFilterDesc')}
          </p>
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>{t('gpon360.clientsSearchRule')}</strong>
            </p>
          </div>
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.clientsSearchButtonsDesc') }} />
          <img
            src={clientesFiltros.url}
            alt={t('gpon360.filterImageAlt')}
            className="w-full border border-border mt-3"
            style={{ borderRadius: "8px" }}
          />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Table className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.resultsTable')}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
                  <p>
                    {t('gpon360.clientsTableDesc')}
                  </p>
                  <p>
                    {t('gpon360.clientsTablePaginationDesc')}
                  </p>
          <img
            src={clientesTabelaResultados.url}
            alt={t('gpon360.resultsImageAlt')}
            className="w-full border border-border mt-3"
            style={{ borderRadius: "8px" }}
          />
        </div>
      </section>


      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">{t('gpon360.usageFlowSummary')}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                1
              </div>
              <h3 className="font-semibold text-foreground">{t('gpon360.step1Title')}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('gpon360.step1Desc')}
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                2
              </div>
              <h3 className="font-semibold text-foreground">{t('gpon360.step2Title')}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('gpon360.step2Desc')}
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                3
              </div>
              <h3 className="font-semibold text-foreground">{t('gpon360.step3Title')}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('gpon360.step3Desc')}
            </p>
          </div>
        </div>
      </section>
    </GponDocPage>
  );
}
