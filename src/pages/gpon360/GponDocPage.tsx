import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Radar } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface GponDocPageProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  children?: React.ReactNode;
}

export default function GponDocPage({ title, subtitle, icon: Icon = Radar, children }: GponDocPageProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/gpon-360")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('gpon360.backToGpon')}
      </button>

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('gpon360.documentationLabel')}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="mt-1 text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {children ?? (
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-2">{t('gpon360.overviewTitle')}</h2>
          <p className="text-muted-foreground">
            {t('gpon360.overviewDesc')}
          </p>
        </section>
      )}
    </div>
  );
}
