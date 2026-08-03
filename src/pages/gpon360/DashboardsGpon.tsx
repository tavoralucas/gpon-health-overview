import {
  LayoutDashboard,
  Search,
  Router,
  Gauge,
  Activity,
  Wifi,
  Network,
} from "lucide-react";
import dashboardPesquisarCliente from "@/assets/dashboard-pesquisar-cliente.png.asset.json";
import dashboardInfoModem from "@/assets/dashboard-info-modem.png.asset.json";
import dashboardQos from "@/assets/dashboard-qos.png.asset.json";
import dashboardTesteVelocidade from "@/assets/dashboard-teste-velocidade.png.asset.json";
import dashboardWifi from "@/assets/dashboard-wifi.png.asset.json";
import dashboardEquipamentosTopologia from "@/assets/dashboard-equipamentos-topologia.png.asset.json";
import GponDocPage from "./GponDocPage";
import { useTranslation } from "@/hooks/useTranslation";

export default function DashboardsGpon() {
  const { t } = useTranslation();
  return (
    <GponDocPage
      title={t("gpon360.dashboards")}
      subtitle={t("gpon360.dashboardsDescription")}
      icon={LayoutDashboard}
    >
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Search className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.howSearchWorks')}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.searchDashboardDesc1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.searchDashboardDesc2') }} />
        </div>
        <figure className="mt-6 rounded-lg border border-border overflow-hidden">
          <img
            src={dashboardPesquisarCliente.url}
            alt={t('gpon360.searchDashboardImageAlt')}
            className="w-full"
          />
          <figcaption className="text-xs text-muted-foreground px-4 py-2 bg-muted/50">
            {t('gpon360.searchDashboardImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Router className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.modemInfo')}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p>{t('gpon360.modemInfoDesc')}</p>
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200" dangerouslySetInnerHTML={{ __html: t('gpon360.dashboardTip') }} />
          </div>
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.dashboardEventHistory') }} />
        </div>
        <figure className="mt-6 rounded-lg border border-border overflow-hidden">
          <img
            src={dashboardInfoModem.url}
            alt={t('gpon360.modemInfoImageAlt')}
            className="w-full"
          />
          <figcaption className="text-xs text-muted-foreground px-4 py-2 bg-muted/50">
            {t('gpon360.modemInfoImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.qosIndicators')}</h2>
        </div>
        <div className="space-y-4 text-muted-foreground">
          <p>
            {t('gpon360.qosHistoryNote')}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: t('gpon360.qosGeneral'), desc: t('gpon360.qosGeneralDesc') },
              { label: t('gpon360.qosWifi'), desc: t('gpon360.qosWifiDesc') },
              { label: t('gpon360.qosAccess'), desc: t('gpon360.qosAccessDesc') },
              { label: t('gpon360.qosAvailability'), desc: t('gpon360.qosAvailabilityDesc') },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-lg border border-border bg-muted/50">
                <h3 className="font-semibold text-foreground text-sm mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <figure className="mt-6 rounded-lg border border-border overflow-hidden">
          <img
            src={dashboardQos.url}
            alt={t('gpon360.qosImageAlt')}
            className="w-full"
          />
          <figcaption className="text-xs text-muted-foreground px-4 py-2 bg-muted/50">
            {t('gpon360.qosImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Gauge className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.speedTest')}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.speedTestIntro') }} />
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.speedTestSpeeds') }} />
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200" dangerouslySetInnerHTML={{ __html: t('gpon360.speedTestWarning') }} />
          </div>
        </div>
        <figure className="mt-6 rounded-lg border border-border overflow-hidden">
          <img
            src={dashboardTesteVelocidade.url}
            alt={t('gpon360.speedTestImageAlt')}
            className="w-full"
          />
          <figcaption className="text-xs text-muted-foreground px-4 py-2 bg-muted/50">
            {t('gpon360.speedTestImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Wifi className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.wifiNetworks')}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p>{t('gpon360.wifiNetworksDesc')}</p>
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.wifiEditDesc') }} />
        </div>
        <figure className="mt-6 rounded-lg border border-border overflow-hidden">
          <img
            src={dashboardWifi.url}
            alt={t('gpon360.wifiImageAlt')}
            className="w-full"
          />
          <figcaption className="text-xs text-muted-foreground px-4 py-2 bg-muted/50">
            {t('gpon360.wifiImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Network className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.connectedDevices')}</h2>
        </div>
        <div className="space-y-4 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.connectedDevicesIntro') }} />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                n: 1,
                title: t('gpon360.connectedDevices1Title'),
                desc: t('gpon360.connectedDevices1Desc'),
              },
              {
                n: 2,
                title: t('gpon360.connectedDevices2Title'),
                desc: t('gpon360.connectedDevices2Desc'),
              },
              {
                n: 3,
                title: t('gpon360.connectedDevices3Title'),
                desc: t('gpon360.connectedDevices3Desc'),
              },
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
        </div>
        <figure className="mt-6 rounded-lg border border-border overflow-hidden">
          <img
            src={dashboardEquipamentosTopologia.url}
            alt={t('gpon360.equipamentosImageAlt')}
            className="w-full"
          />
          <figcaption className="text-xs text-muted-foreground px-4 py-2 bg-muted/50">
            {t('gpon360.equipamentosImageCaption')}
          </figcaption>
        </figure>
      </section>
    </GponDocPage>
  );
}