import { useState, useMemo } from "react";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Relatorio {
  tipo: string;
  data: string;
  dataISO: string;
  tamanho: string;
}

function gerarRelatorios(): Relatorio[] {
  const base = new Date(2026, 1, 18); // 18/02/2026
  const tamanhos = [
    130.52, 131.31, 131.63, 130.73, 130.89, 130.86,
    131.65, 130.27, 131.13, 148.51, 147.93, 149.19,
    149.74, 148.76, 150.10, 149.38, 148.22, 147.65,
    131.02, 130.44, 131.87, 148.93, 149.60, 150.33,
    130.19, 131.40, 149.02, 148.55, 130.68, 131.25,
  ];
  return tamanhos.map((tam, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() - i);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return {
      tipo: "Relatório analítico",
      data: `${day}/${month}/${year}`,
      dataISO: `${year}-${month}-${day}`,
      tamanho: `${tam.toFixed(2)} MB`,
    };
  });
}

const TODOS_RELATORIOS = gerarRelatorios();
const ITEMS_PER_PAGE = 15;

const Analitico = () => {
  const { t } = useTranslation();
  const [periodo, setPeriodo] = useState("");
  const [ate, setAte] = useState("");
  const [filtrado, setFiltrado] = useState<Relatorio[]>(TODOS_RELATORIOS);
  const [page, setPage] = useState(1);

  const handleBuscar = () => {
    let result = [...TODOS_RELATORIOS];
    if (periodo) result = result.filter((r) => r.dataISO >= periodo);
    if (ate) result = result.filter((r) => r.dataISO <= ate);
    setFiltrado(result);
    setPage(1);
  };

  const handleLimpar = () => {
    setPeriodo("");
    setAte("");
    setFiltrado(TODOS_RELATORIOS);
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(filtrado.length / ITEMS_PER_PAGE));
  const paged = filtrado.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const start = filtrado.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(page * ITEMS_PER_PAGE, filtrado.length);

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">{t("analitico.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("analitico.downloadDescription")}</p>
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold">{t("analitico.filterTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <Label className="text-sm">{t("analitico.period")}</Label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <span className="text-sm text-muted-foreground">{t("analitico.until")}</span>
                <input
                  type="date"
                  value={ate}
                  onChange={(e) => setAte(e.target.value)}
                  className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
            <Button
              onClick={handleBuscar}
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t('analitico.search')}
            </Button>
            <Button
              variant="outline"
              onClick={handleLimpar}
              className="rounded-xl border-primary text-primary hover:bg-primary/5"
            >
              {t('analitico.clear')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-center font-bold text-primary-foreground">{t("analitico.reportType")}</TableHead>
                  <TableHead className="text-center font-bold text-primary-foreground">{t("analitico.date")}</TableHead>
                  <TableHead className="text-center font-bold text-primary-foreground">{t("analitico.fileSize")}</TableHead>
                  <TableHead className="text-center font-bold text-primary-foreground">{t("analitico.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                      {t('analitico.noReportsFound')}
                    </TableCell>
                  </TableRow>
                ) : (
                  paged.map((r, i) => (
                    <TableRow key={i} className="border-b border-border/50 hover:bg-muted/30">
                      <TableCell className="text-center text-sm">{r.tipo}</TableCell>
                      <TableCell className="text-center text-sm">{r.data}</TableCell>
                      <TableCell className="text-center text-sm">{r.tamanho}</TableCell>
                      <TableCell className="text-center">
                        <button className="text-sm font-bold text-primary hover:text-primary/80 hover:underline">
                          {t('analitico.download')}
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Paginação */}
          {filtrado.length > 0 && (
            <div className="flex items-center justify-end gap-2 px-6 py-4">
              <span className="mr-4 text-sm text-muted-foreground">
                {t('analitico.showingResults', { start: start, end: end, total: filtrado.length })}
              </span>
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="flex h-8 w-8 items-center justify-center rounded border border-border text-sm text-foreground disabled:opacity-30 hover:bg-muted"
              >
                <ChevronFirst className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="flex h-8 w-8 items-center justify-center rounded border border-border text-sm text-foreground disabled:opacity-30 hover:bg-muted"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded bg-primary text-sm font-bold text-primary-foreground">
                {page}
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded border border-border text-sm text-foreground disabled:opacity-30 hover:bg-muted"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded border border-border text-sm text-foreground disabled:opacity-30 hover:bg-muted"
              >
                <ChevronLast className="h-4 w-4" />
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Analitico;
