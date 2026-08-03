import { useState, useMemo } from "react";
import { format } from "date-fns";
import { CalendarIcon, Search, X, ArrowUpDown, Lightbulb, Download } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ScatterChart, Scatter, ZAxis } from "recharts";
import {
  kpisEstabilidade,
  top10OltsQuedas,
  distribuicaoMotivo,
  quedasPorCidade,
  correlacaoRxQuedas,
  oltsCriticasQuedas,
  clientesQuedasRecorrentes,
  insightsEstabilidade,
  motivosQueda,
  ufsEstabilidade,
  cidadesEstabilidade,
  oltsEstabilidade,
  type OltQueda,
  type ClienteQuedaRecorrente,
} from "@/data/mockEstabilidadeQuedas";

const ITEMS_PER_PAGE = 5;

const statusColors: Record<string, string> = {
  success: "bg-status-success",
  warning: "bg-status-warning",
  critical: "bg-status-critical",
};

type OltSortKey = keyof OltQueda;
type ClienteSortKey = keyof ClienteQuedaRecorrente;
type SortDir = "asc" | "desc";

const EstabilidadeQuedas = () => {
  const { t } = useTranslation();
  const [dataInicial, setDataInicial] = useState<Date>();
  const [dataFinal, setDataFinal] = useState<Date>();
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [nodeOlt, setNodeOlt] = useState("");
  const [motivo, setMotivo] = useState("");

  const [oltSortKey, setOltSortKey] = useState<OltSortKey>("mediaQuedasD1");
  const [oltSortDir, setOltSortDir] = useState<SortDir>("desc");
  const [oltPage, setOltPage] = useState(1);

  const [cliSortKey, setCliSortKey] = useState<ClienteSortKey>("quedasD1");
  const [cliSortDir, setCliSortDir] = useState<SortDir>("desc");
  const [cliPage, setCliPage] = useState(1);

  const handleOltSort = (key: OltSortKey) => {
    if (oltSortKey === key) setOltSortDir(oltSortDir === "asc" ? "desc" : "asc");
    else { setOltSortKey(key); setOltSortDir("desc"); }
  };
  const handleCliSort = (key: ClienteSortKey) => {
    if (cliSortKey === key) setCliSortDir(cliSortDir === "asc" ? "desc" : "asc");
    else { setCliSortKey(key); setCliSortDir("desc"); }
  };

  const sortedOlts = useMemo(() => {
    return [...oltsCriticasQuedas].sort((a, b) => {
      const aVal = a[oltSortKey]; const bVal = b[oltSortKey];
      if (typeof aVal === "number" && typeof bVal === "number") return oltSortDir === "asc" ? aVal - bVal : bVal - aVal;
      return oltSortDir === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });
  }, [oltSortKey, oltSortDir]);

  const sortedClientes = useMemo(() => {
    return [...clientesQuedasRecorrentes].sort((a, b) => {
      const aVal = a[cliSortKey]; const bVal = b[cliSortKey];
      if (typeof aVal === "number" && typeof bVal === "number") return cliSortDir === "asc" ? aVal - bVal : bVal - aVal;
      return cliSortDir === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });
  }, [cliSortKey, cliSortDir]);

  const oltTotalPages = Math.ceil(sortedOlts.length / ITEMS_PER_PAGE);
  const pagedOlts = sortedOlts.slice((oltPage - 1) * ITEMS_PER_PAGE, oltPage * ITEMS_PER_PAGE);
  const cliTotalPages = Math.ceil(sortedClientes.length / ITEMS_PER_PAGE);
  const pagedClientes = sortedClientes.slice((cliPage - 1) * ITEMS_PER_PAGE, cliPage * ITEMS_PER_PAGE);

  const handleLimpar = () => {
    setDataInicial(undefined); setDataFinal(undefined);
    setUf(""); setCidade(""); setNodeOlt(""); setMotivo("");
  };

  const handleExportCSV = (data: Record<string, unknown>[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const csv = [headers.join(","), ...data.map(row => headers.map(h => row[h]).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const OltSortHeader = ({ label, colKey }: { label: string; colKey: OltSortKey }) => (
    <button onClick={() => handleOltSort(colKey)} className="flex items-center gap-1 font-medium hover:opacity-80">
      {label}<ArrowUpDown className="h-3 w-3" />
    </button>
  );

  const CliSortHeader = ({ label, colKey }: { label: string; colKey: ClienteSortKey }) => (
    <button onClick={() => handleCliSort(colKey)} className="flex items-center gap-1 font-medium hover:opacity-80">
      {label}<ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{t("estabilidadeQuedas.title")}</h1>
        <p className="mt-1 text-muted-foreground">{t('estabilidadeQuedas.subtitle')}</p>
      </div>

      {/* Filtros */}
      <Card className="mb-8 border border-border/60">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal", !dataInicial && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />{dataInicial ? format(dataInicial, "dd/MM/yyyy") : "{t('estabilidadeQuedas.startDate')}"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={dataInicial} onSelect={setDataInicial} className="p-3 pointer-events-auto" /></PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal", !dataFinal && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />{dataFinal ? format(dataFinal, "dd/MM/yyyy") : "{t('estabilidadeQuedas.endDate')}"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={dataFinal} onSelect={setDataFinal} className="p-3 pointer-events-auto" /></PopoverContent>
            </Popover>
            <Select value={uf} onValueChange={setUf}><SelectTrigger><SelectValue placeholder={t("estabilidadeQuedas.uf")} /></SelectTrigger><SelectContent>{ufsEstabilidade.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent></Select>
            <Select value={cidade} onValueChange={setCidade}><SelectTrigger><SelectValue placeholder={t("estabilidadeQuedas.city")} /></SelectTrigger><SelectContent>{cidadesEstabilidade.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
            <Select value={nodeOlt} onValueChange={setNodeOlt}><SelectTrigger><SelectValue placeholder={t("estabilidadeQuedas.nodeOlt")} /></SelectTrigger><SelectContent>{oltsEstabilidade.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Select value={motivo} onValueChange={setMotivo}><SelectTrigger className="w-48"><SelectValue placeholder={t("estabilidadeQuedas.fallReason")} /></SelectTrigger><SelectContent>{motivosQueda.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select>
            <Button className="gap-2"><Search className="h-4 w-4" />{t('estabilidadeQuedas.search')}</Button>
            <Button variant="outline" onClick={handleLimpar} className="gap-2 border-primary text-primary hover:bg-primary/5"><X className="h-4 w-4" />{t('estabilidadeQuedas.clear')}</Button>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <Card className="mb-8 border border-border/60">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 divide-x divide-y divide-border/60 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
            {kpisEstabilidade.map((kpi) => {
              const valueColor =
                kpi.status === "success" ? "text-[hsl(142,60%,28%)]" :
                kpi.status === "warning" ? "text-[hsl(40,55%,35%)]" :
                "text-[hsl(0,65%,35%)]";
              const linkColor =
                kpi.status === "success" ? "text-[hsl(142,60%,28%)] hover:text-[hsl(142,60%,22%)]" :
                kpi.status === "warning" ? "text-[hsl(40,55%,35%)] hover:text-[hsl(40,55%,28%)]" :
                "text-[hsl(0,65%,35%)] hover:text-[hsl(0,65%,28%)]";
              return (
                <div key={kpi.label} className="flex flex-col gap-2 p-5">
                  <p className="text-foreground font-medium leading-tight text-xs">{kpi.label}</p>
                  <p className={cn("font-bold leading-none tracking-tight text-2xl", valueColor)}>{kpi.value}</p>
                  <button className={cn("text-sm font-medium underline underline-offset-2 text-left w-fit", linkColor)}>
                    {t('estabilidadeQuedas.moreInfo')}
                  </button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top 10 OLTs Quedas */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">{t('estabilidadeQuedas.top10Olts')}</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ mediaQuedas: { label: "Média Quedas", color: "hsl(0, 72%, 51%)" } }} className="h-[300px] w-full">
              <BarChart data={top10OltsQuedas} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis dataKey="olt" type="category" tick={{ fontSize: 9 }} width={140} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="mediaQuedas" fill="hsl(0, 72%, 51%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Motivo */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">{t('estabilidadeQuedas.distributionByReason')}</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ percentual: { label: "% Participação", color: "hsl(210, 70%, 50%)" } }} className="h-[300px] w-full">
              <BarChart data={distribuicaoMotivo}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="motivo" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="percentual" fill="hsl(210, 70%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Quedas por Cidade */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">{t('estabilidadeQuedas.averageFallsByCity')}</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ mediaQuedas: { label: "Média Quedas", color: "hsl(38, 92%, 50%)" } }} className="h-[260px] w-full">
              <BarChart data={quedasPorCidade}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="cidade" tick={{ fontSize: 10 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="mediaQuedas" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Correlação RX vs Quedas */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">Correlação RX vs Quedas</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ mediaQuedas: { label: "Média Quedas", color: "hsl(142, 71%, 45%)" } }} className="h-[260px] w-full">
              <BarChart data={correlacaoRxQuedas}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="faixaRx" tick={{ fontSize: 10 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="mediaQuedas" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela OLTs Críticas */}
      <Card className="mb-8 border border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold">{t('estabilidadeQuedas.criticalOlts')}</CardTitle>
          <Button variant="outline" size="sm" onClick={() => handleExportCSV(oltsCriticasQuedas as unknown as Record<string, unknown>[], "olts-criticas-quedas.csv")} className="gap-2 border-primary text-primary hover:bg-primary/5"><Download className="h-4 w-4" />CSV</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground"><OltSortHeader label="Node/OLT" colKey="nodeOlt" /></TableHead>
                  <TableHead className="text-primary-foreground"><OltSortHeader label="Total Clientes" colKey="totalClientes" /></TableHead>
                  <TableHead className="text-primary-foreground"><OltSortHeader label="Média Quedas D-1" colKey="mediaQuedasD1" /></TableHead>
                  <TableHead className="text-primary-foreground"><OltSortHeader label="% ≥ 3 Quedas" colKey="percentClientes3Quedas" /></TableHead>
                  <TableHead className="text-primary-foreground"><OltSortHeader label="Uptime Médio" colKey="uptimeMedio" /></TableHead>
                  <TableHead className="text-primary-foreground"><OltSortHeader label="RX Médio" colKey="rxMedio" /></TableHead>
                  <TableHead className="text-primary-foreground"><OltSortHeader label="% Reset Local" colKey="percentResetLocal" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedOlts.map((row) => (
                  <TableRow key={row.nodeOlt}>
                    <TableCell className="font-medium">{row.nodeOlt}</TableCell>
                    <TableCell>{row.totalClientes.toLocaleString("pt-BR")}</TableCell>
                    <TableCell>{row.mediaQuedasD1}</TableCell>
                    <TableCell>{row.percentClientes3Quedas}%</TableCell>
                    <TableCell>{row.uptimeMedio}</TableCell>
                    <TableCell>{row.rxMedio} dBm</TableCell>
                    <TableCell>{row.percentResetLocal}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{t('estabilidadeQuedas.pageOf', { page: oltPage, total: oltTotalPages })}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={oltPage === 1} onClick={() => setOltPage(oltPage - 1)}>Anterior</Button>
              <Button variant="outline" size="sm" disabled={oltPage === oltTotalPages} onClick={() => setOltPage(oltPage + 1)}>Próxima</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela Clientes Recorrentes */}
      <Card className="mb-8 border border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold">{t('estabilidadeQuedas.recurringFallsClients')}</CardTitle>
          <Button variant="outline" size="sm" onClick={() => handleExportCSV(clientesQuedasRecorrentes as unknown as Record<string, unknown>[], "clientes-quedas-recorrentes.csv")} className="gap-2 border-primary text-primary hover:bg-primary/5"><Download className="h-4 w-4" />CSV</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground"><CliSortHeader label="MAC" colKey="mac" /></TableHead>
                  <TableHead className="text-primary-foreground"><CliSortHeader label="Contrato" colKey="contrato" /></TableHead>
                  <TableHead className="text-primary-foreground"><CliSortHeader label="UF" colKey="uf" /></TableHead>
                  <TableHead className="text-primary-foreground"><CliSortHeader label="Cidade" colKey="cidade" /></TableHead>
                  <TableHead className="text-primary-foreground"><CliSortHeader label="Node/OLT" colKey="nodeOlt" /></TableHead>
                  <TableHead className="text-primary-foreground"><CliSortHeader label="Quedas D-1" colKey="quedasD1" /></TableHead>
                  <TableHead className="text-primary-foreground"><CliSortHeader label="Motivo" colKey="motivoPrincipal" /></TableHead>
                  <TableHead className="text-primary-foreground"><CliSortHeader label="RX" colKey="rxDown" /></TableHead>
                  <TableHead className="text-primary-foreground"><CliSortHeader label="Uptime" colKey="uptime" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedClientes.map((row) => (
                  <TableRow key={row.mac}>
                    <TableCell className="font-mono text-xs">{row.mac}</TableCell>
                    <TableCell>{row.contrato}</TableCell>
                    <TableCell>{row.uf}</TableCell>
                    <TableCell>{row.cidade}</TableCell>
                    <TableCell>{row.nodeOlt}</TableCell>
                    <TableCell className="font-medium">{row.quedasD1}</TableCell>
                    <TableCell>{row.motivoPrincipal}</TableCell>
                    <TableCell>{row.rxDown} dBm</TableCell>
                    <TableCell>{row.uptime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{t('estabilidadeQuedas.pageOf', { page: cliPage, total: cliTotalPages })}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={cliPage === 1} onClick={() => setCliPage(cliPage - 1)}>Anterior</Button>
              <Button variant="outline" size="sm" disabled={cliPage === cliTotalPages} onClick={() => setCliPage(cliPage + 1)}>Próxima</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="border border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-bold">
            <Lightbulb className="h-5 w-5 text-primary" />{t('estabilidadeQuedas.insightsWithAI')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {insightsEstabilidade.map((insight, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground leading-relaxed border-b border-border/40 pb-3 last:border-0 last:pb-0">{insight}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstabilidadeQuedas;
