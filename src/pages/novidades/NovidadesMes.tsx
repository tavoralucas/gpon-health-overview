import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getNovidadesPorSlug } from "@/data/novidades";
import { useTranslation } from "@/hooks/useTranslation";

export default function NovidadesMes() {
  const { t } = useTranslation();
  const { slug = "" } = useParams();
  const mes = getNovidadesPorSlug(slug);

  if (!mes) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/novidades">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.previous')}
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Mês não encontrado</h1>
      </div>
    );
  }

  const formatarData = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(t('common.language') === 'en-US' ? 'en-US' : t('common.language') === 'es-ES' ? 'es-ES' : 'pt-BR', {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/novidades">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('novidades.readMore')}
        </Link>
      </Button>

      <header className="mb-10">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          <span>{t('novidades.title')}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {mes.mes} de {mes.ano}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t('novidades.description')}
        </p>
      </header>

      {mes.itens.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-card py-16 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Calendar className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mb-1 text-lg font-semibold text-foreground">
            {t('common.loading')}
          </h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Nenhuma novidade registrada ainda neste mês. Aguarde os próximos lançamentos.
          </p>
        </div>
      ) : (
        <ol className="relative space-y-8 border-l-2 border-border pl-8">
          {mes.itens.map((item) => (
            <li key={item.id} className="relative">
              <span className="absolute -left-[37px] flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
              <div className="rounded-lg border bg-card p-5 shadow-sm">
                <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {formatarData(item.data)}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  {item.titulo}
                </h3>
                <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {item.descricao.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {item.beneficios && item.beneficios.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-semibold text-foreground">
                      {t('novidades.benefits')}
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {item.beneficios.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.imagem && (
                  <img
                    src={item.imagem}
                    alt={item.imagemAlt ?? item.titulo}
                    loading="lazy"
                    className="mt-4 h-auto w-full rounded-md border"
                  />
                )}
                {item.link && (
                  <div className="mt-4">
                    <Link
                      to={item.link.href}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {item.link.label} →
                    </Link>
                  </div>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
