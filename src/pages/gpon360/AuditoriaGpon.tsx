import {
  SlidersHorizontal,
  Target,
  ScrollText,
  ShieldCheck,
  History,
  Filter,
  Table2,
  Download,
  UserSearch,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import GponDocPage from "./GponDocPage";
import { useTranslation } from "@/hooks/useTranslation";
import auditoriaFiltrosImg from "@/assets/auditoria-filtros.png.asset.json";
import auditoriaTabelaResultadosImg from "@/assets/auditoria-tabela-resultados.png.asset.json";



export default function AuditoriaGpon() {
  const { t } = useTranslation();

  const operacoesExemplo = [
    t('gpon360.auditOp1'),
    t('gpon360.auditOp2'),
    t('gpon360.auditOp3'),
    t('gpon360.auditOp4'),
  ];

  const colunasTabela = [
    { title: t('gpon360.auditColUser'), desc: t('gpon360.auditColUserDesc') },
    { title: t('gpon360.auditColEmail'), desc: t('gpon360.auditColEmailDesc') },
    { title: t('gpon360.auditColOperation'), desc: t('gpon360.auditColOperationDesc') },
    { title: t('gpon360.auditColDate'), desc: t('gpon360.auditColDateDesc') },
  ];

  const passoAPasso = [
    t('gpon360.auditStep1'),
    t('gpon360.auditStep2'),
    t('gpon360.auditStep3'),
    t('gpon360.auditStep4'),
    t('gpon360.auditStep5'),
  ];

  return (
    <GponDocPage
      title={t("gpon360.audit")}
      subtitle={t("gpon360.auditDescription")}
      icon={ScrollText}
    >
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t("common.whatIs")}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.auditWhatIs') }} />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.auditPurposeTitle')}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.auditPurposeDesc') }} />
          <ul className="list-disc space-y-1 pl-5">
            <li>{t('gpon360.auditPurposeQ1')}</li>
            <li>{t('gpon360.auditPurposeQ2')}</li>
            <li>{t('gpon360.auditPurposeQ3')}</li>
          </ul>
          <p>{t('gpon360.auditPurposeOutro')}</p>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <History className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.auditScreenTitle')}</h2>
        </div>
        <div className="space-y-6 text-muted-foreground">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-foreground">{t('gpon360.auditFilterTitle')}</h3>
            </div>
            <p dangerouslySetInnerHTML={{ __html: t('gpon360.auditFilterDesc') }} />
            <p className="mt-2" dangerouslySetInnerHTML={{ __html: t('gpon360.auditFilterImportant') }} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Table2 className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-foreground">{t('gpon360.auditTableTitle')}</h3>
            </div>
            <p>
              {t('gpon360.auditTableDesc')}{" "}
              {operacoesExemplo.map((op, i) => (
                <span key={op}>
                  <em>{op}</em>
                  {i < operacoesExemplo.length - 1 ? ", " : ""}
                </span>
              ))}
              {t('gpon360.auditTableDescEnd')}
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {colunasTabela.map((col) => (
                <div key={col.title} className="rounded-lg border border-border bg-background p-4">
                  <h4 className="mb-1 font-semibold text-foreground">{col.title}</h4>
                  <p className="text-sm text-muted-foreground">{col.desc}</p>
                </div>
              ))}
            </div>

            <figure className="mt-6 overflow-hidden rounded-lg border border-border">
              <img
                src={auditoriaFiltrosImg.url}
                alt={t('gpon360.auditFilterImageAlt')}
                className="w-full"
                loading="lazy"
              />
              <figcaption className="border-t border-border bg-background px-4 py-2 text-center text-sm text-muted-foreground">
                {t('gpon360.auditFilterImageCaption')}
              </figcaption>
            </figure>

          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Download className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.auditResourcesTitle')}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.auditResources1') }} />
          <p>{t('gpon360.auditResources2')}</p>

          <figure className="mt-6 overflow-hidden rounded-lg border border-border">
            <img
              src={auditoriaTabelaResultadosImg.url}
              alt={t('gpon360.auditResourceImageAlt')}
              className="w-full"
              loading="lazy"
            />
            <figcaption className="border-t border-border bg-background px-4 py-2 text-center text-sm text-muted-foreground">
              {t('gpon360.auditResourceImageCaption')}
            </figcaption>
          </figure>

        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <UserSearch className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.auditHowToTitle')}</h2>
        </div>
        <ol className="space-y-2 text-muted-foreground">
          {passoAPasso.map((passo, i) => (
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
          <AlertCircle className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.auditInferredTitle')}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p>{t('gpon360.auditInferredDesc')}</p>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">{t('gpon360.auditTipTitle')}</h2>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p dangerouslySetInnerHTML={{ __html: t('gpon360.auditTipDesc') }} />
        </div>
      </section>
    </GponDocPage>
  );
}