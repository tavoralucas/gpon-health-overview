import {
  SlidersHorizontal,
  Target,
  BookOpen,
  Eye,
  Pencil,
  AlertCircle,
  Wifi,
  Radio,
  Activity,
  Gauge,
  Network,
} from "lucide-react";
import GponDocPage from "./GponDocPage";
import { useTranslation } from "@/hooks/useTranslation";
import gestaoParametrosDisponiveis from "@/assets/gestao-parametros-disponiveis.png.asset.json";
import gestaoParametrosEditar from "@/assets/gestao-parametros-editar-qos-wifi.png.asset.json";

export default function GestaoParametrosGpon() {
  const { t } = useTranslation();

  const categorias = [
    {
      icon: Wifi,
      title: t('gpon360.paramCat1Title'),
      params: t('gpon360.paramCat1Params').split(', '),
    },
    {
      icon: Radio,
      title: t('gpon360.paramCat2Title'),
      params: t('gpon360.paramCat2Params').split(', '),
    },
    {
      icon: Activity,
      title: t('gpon360.paramCat3Title'),
      params: t('gpon360.paramCat3Params').split(', '),
    },
    {
      icon: Gauge,
      title: t('gpon360.paramCat4Title'),
      params: t('gpon360.paramCat4Params').split(', '),
    },
    {
      icon: Network,
      title: t('gpon360.paramCat5Title'),
      params: t('gpon360.paramCat5Params').split(', '),
    },
  ];

  const faixas = [
    { label: t('gpon360.paramGood'), cor: "verde", desc: t('gpon360.paramGoodDesc') },
    { label: t('gpon360.paramRegular'), cor: "amarelo", desc: t('gpon360.paramRegularDesc') },
    { label: t('gpon360.paramBad'), cor: "vermelho", desc: t('gpon360.paramBadDesc') },
  ];

  const fluxoConsulta = [
    t('gpon360.paramViewStep1'),
    t('gpon360.paramViewStep2'),
    t('gpon360.paramViewStep3'),
    t('gpon360.paramViewStep4'),
  ];

  const fluxoEdicao = [
    t('gpon360.paramEditStep1'),
    t('gpon360.paramEditStep2'),
    t('gpon360.paramEditStep3'),
    t('gpon360.paramEditStep4'),
    t('gpon360.paramEditStep5'),
  ];

  return (
    <GponDocPage
      title={t("gpon360.parameterManagement")}
      subtitle={t("gpon360.parameterManagementDescription")}
      icon={SlidersHorizontal}
    >
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t("common.whatIs")}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.paramWhatIs') }} />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.paramPurposeTitle')}</h2>
        </div>
        <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('gpon360.paramPurposeDesc') }} />
        <figure className="mt-6">
          <img
            src={gestaoParametrosDisponiveis.url}
            alt={t('gpon360.paramPurposeImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {t('gpon360.paramPurposeImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.paramScreenTitle')}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.paramScreenDesc1') }} />
          <p>{t('gpon360.paramScreenDesc2')}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 mt-4">
          {categorias.map((cat) => (
            <div key={cat.title} className="p-4 rounded-lg border border-border bg-muted/50">
              <div className="flex items-center gap-2 mb-3">
                <cat.icon className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">{cat.title}</h3>
              </div>
              <ul className="space-y-1">
                {cat.params.map((param) => (
                  <li key={param} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {param}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.paramViewTitle')}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.paramViewIntro') }} />
          <div className="grid gap-3 sm:grid-cols-3">
            {faixas.map((f) => (
              <div key={f.label} className="p-4 rounded-lg border border-border bg-muted/50">
                <h3 className="font-semibold text-foreground mb-1">{f.label}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
          <p>{t('gpon360.paramViewDesc')}</p>
        </div>
        <ol className="mt-4 space-y-2">
          {fluxoConsulta.map((passo, i) => (
            <li key={passo} className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </div>
              <p className="text-sm text-muted-foreground">{passo}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Pencil className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.paramEditTitle')}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.paramEditDesc1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.paramEditDesc2') }} />
        </div>
        <ol className="mt-4 space-y-2">
          {fluxoEdicao.map((passo, i) => (
            <li key={passo} className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </div>
              <p className="text-sm text-muted-foreground">{passo}</p>
            </li>
          ))}
        </ol>
        <figure className="mt-6">
          <img
            src={gestaoParametrosEditar.url}
            alt={t('gpon360.paramEditImageAlt')}
            className="w-full rounded-lg border border-border"
          />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            {t('gpon360.paramEditImageCaption')}
          </figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.paramWhyTitle')}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p>{t('gpon360.paramWhyDesc')}</p>
        </div>
      </section>
    </GponDocPage>
  );
}