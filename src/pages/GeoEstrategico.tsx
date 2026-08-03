import { useState, useMemo } from "react";
import { format } from "date-fns";
import { CalendarIcon, Search, X, ArrowUpDown, Lightbulb, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import BrazilMap from "@/components/BrazilMap";
import { useTranslation } from "@/hooks/useTranslation";
import {
  kpisGeo,
  dadosUF,
  qosPorUf,
  quedasPorCidade,
  baixaCoberturaPorRegiao,
  performancePorCitycode,
  tabelaTerritorial,
  insightsGeo,
  ufsGeo,
  cidadesGeo,
  citycodesGeo,
  oltsGeo,
  modelosGeo,
  type DadosTerritorial,
} from "@/data/mockGeoEstrategico";

const ITEMS_PER_PAGE = 5;

const statusColors: Record<string, string> = {
  success: "bg-status-success",
  warning: "bg-status-warning",
  critical: "bg-status-critical",
};

type SortKey = keyof DadosTerritorial;
type SortDir = "asc" | "desc";
type MetricKey = "qosMedio" | "mediaQuedas" | "percentBaixaCobertura" | "performanceMedia";

const metricOptions: { value: MetricKey; label: string }[] = [
  { value: "qosMedio", label: "QoS Médio" },
  { value: "mediaQuedas", label: "Média de Quedas" },
  { value: "percentBaixaCobertura", label: "% Baixa Cobertura" },
  { value: "performanceMedia", label: "Performance Média (%)" },
];

const GeoEstrategico = () => {
  const [dataInicial, setDataInicial] = useState<Date>();
  const { t } = useTranslation();
  const [dataFinal, setDataFinal] = useState<Date>();
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [citycode, setCitycode] = useState("");
  const [nodeOlt, setNodeOlt] = useState("");
  const [modelo, setModelo] = useState("");

  const [mapMetric, setMapMetric] = useState<MetricKey>("qosMedio");
  const [selectedUF, setSelectedUF] = useState<string>("");

  const [sortKey, setSortKey] = useState<SortKey>("totalClientes");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const filteredData = useMemo(() => {
    let data = [...tabelaTerritorial];
    if (selectedUF) data = data.filter((d) => d.uf === selectedUF);
    return data;
  }, [selectedUF]);

  const sorted = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey]; const bVal = b[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      return sortDir === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const paged = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleLimpar = () => {
    setDataInicial(undefined); setDataFinal(undefined);
    setUf(""); setCidade(""); setCitycode(""); setNodeOlt(""); setModelo("");
    setSelectedUF("");
  };

  const handleClickUF = (clickedUf: string) => {
    setSelectedUF(selectedUF === clickedUf ? "" : clickedUf);
    setPage(1);
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

  const SortHeader = ({ label, colKey }: { label: string; colKey: SortKey }) => (
    <button onClick={() => handleSort(colKey)} className="flex items-center gap-1 font-medium hover:opacity-80">
      {label}<ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{t('pages.geoEstrategico')}</h1>
        <p className="mt-1 text-muted-foreground">{t('geoEstrategico.subtitle')}</p>
      </div>

      {/* Filtros */}
      <Card className="mb-8 border border-border/60">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal", !dataInicial && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />{dataInicial ? format(dataInicial, "dd/MM/yyyy") : t('geoEstrategico.startDate')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={dataInicial} onSelect={setDataInicial} className="p-3 pointer-events-auto" /></PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal", !dataFinal && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />{dataFinal ? format(dataFinal, "dd/MM/yyyy") : t('geoEstrategico.endDate')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={dataFinal} onSelect={setDataFinal} className="p-3 pointer-events-auto" /></PopoverContent>
            </Popover>
            <Select value={uf} onValueChange={setUf}><SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger><SelectContent>{ufsGeo.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent></Select>
            <Select value={cidade} onValueChange={setCidade}><SelectTrigger><SelectValue placeholder="Cidade" /></SelectTrigger><SelectContent>{cidadesGeo.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
            <Select value={citycode} onValueChange={setCitycode}><SelectTrigger><SelectValue placeholder={t('geoEstrategico.citycode')} /></SelectTrigger><SelectContent>{citycodesGeo.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
            <Select value={nodeOlt} onValueChange={setNodeOlt}><SelectTrigger><SelectValue placeholder={t('geoEstrategico.nodeOlt')} /></SelectTrigger><SelectContent>{oltsGeo.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Select value={modelo} onValueChange={setModelo}><SelectTrigger className="w-52"><SelectValue placeholder={t('geoEstrategico.equipmentModel')} /></SelectTrigger><SelectContent>{modelosGeo.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select>
            <Button className="gap-2"><Search className="h-4 w-4" />{t('geoEstrategico.search')}</Button>
            <Button variant="outline" onClick={handleLimpar} className="gap-2 border-primary text-primary hover:bg-primary/5"><X className="h-4 w-4" />{t('geoEstrategico.clear')}</Button>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <Card className="mb-8 border border-border/60">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 divide-x divide-y divide-border/60 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
            {kpisGeo.map((kpi) => {
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
                    {t('geoEstrategico.moreInfo')}
                  </button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Mapa do Brasil */}
      <Card className="mb-8 border border-border/60">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-bold">{t('geoEstrategico.mapTitle')}</CardTitle>
          <Select value={mapMetric} onValueChange={(v) => setMapMetric(v as MetricKey)}>
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {metricOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {selectedUF && (
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{t('geoEstrategico.filteringBy')} <strong className="text-foreground">{selectedUF}</strong></span>
              <Button variant="outline" size="sm" onClick={() => { setSelectedUF(""); setPage(1); }} className="h-6 px-2 text-xs border-primary text-primary">{t('geoEstrategico.clear')}</Button>
            </div>
          )}
          <BrazilMap
            dados={dadosUF}
            metrica={mapMetric}
            selectedUF={selectedUF}
            onClickUF={handleClickUF}
          />
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* QoS Médio por UF */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">{t('geoEstrategico.chartQosUf')}</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ qosMedio: { label: "QoS Médio", color: "hsl(0, 72%, 51%)" } }} className="h-[300px] w-full">
              <BarChart data={qosPorUf} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} domain={[0, 10]} />
                <YAxis dataKey="uf" type="category" tick={{ fontSize: 11 }} width={40} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="qosMedio" fill="hsl(0, 72%, 51%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Quedas por Cidade */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">{t('geoEstrategico.chartQuedasCidade')}</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ mediaQuedas: { label: "Média Quedas", color: "hsl(38, 92%, 50%)" } }} className="h-[300px] w-full">
              <BarChart data={quedasPorCidade} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis dataKey="cidade" type="category" tick={{ fontSize: 9 }} width={100} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="mediaQuedas" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Baixa Cobertura por Região */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">{t('geoEstrategico.chartBaixaCobertura')}</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ percentual: { label: "% Baixa Cobertura", color: "hsl(210, 70%, 50%)" } }} className="h-[260px] w-full">
              <BarChart data={baixaCoberturaPorRegiao}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="regiao" tick={{ fontSize: 10 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="percentual" fill="hsl(210, 70%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Performance por Citycode */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">{t('geoEstrategico.chartPerformance')}</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ performance: { label: "Performance %", color: "hsl(142, 71%, 45%)" } }} className="h-[260px] w-full">
              <BarChart data={performancePorCitycode} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} domain={[60, 100]} />
                <YAxis dataKey="citycode" type="category" tick={{ fontSize: 8 }} width={100} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="performance" fill="hsl(142, 71%, 45%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela Territorial */}
      <Card className="mb-8 border border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold">{t('geoEstrategico.tableTitle')}{selectedUF ? ` — ${selectedUF}` : ""}</CardTitle>
          <Button variant="outline" size="sm" onClick={() => handleExportCSV(filteredData as unknown as Record<string, unknown>[], "geo-estrategico.csv")} className="gap-2 border-primary text-primary hover:bg-primary/5"><Download className="h-4 w-4" />{t('geoEstrategico.csv')}</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground"><SortHeader label="UF" colKey="uf" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="Cidade" colKey="cidade" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="Citycode" colKey="citycode" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="Clientes" colKey="totalClientes" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="QoS Médio" colKey="qosMedio" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="Média Quedas" colKey="mediaQuedas" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="% Baixa Cob." colKey="percentBaixaCobertura" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="Perf. %" colKey="performanceMedia" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="RX Médio" colKey="rxMedio" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((row) => (
                  <TableRow key={row.citycode}>
                    <TableCell className="font-medium">{row.uf}</TableCell>
                    <TableCell>{row.cidade}</TableCell>
                    <TableCell>{row.citycode}</TableCell>
                    <TableCell>{row.totalClientes.toLocaleString("pt-BR")}</TableCell>
                    <TableCell>{row.qosMedio}</TableCell>
                    <TableCell>{row.mediaQuedas}</TableCell>
                    <TableCell>{row.percentBaixaCobertura}%</TableCell>
                    <TableCell>{row.performanceMedia}%</TableCell>
                    <TableCell>{row.rxMedio} dBm</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{t('geoEstrategico.pageInfo', { page, total: totalPages })}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>{t('geoEstrategico.previous')}</Button>
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>{t('geoEstrategico.next')}</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="border border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-bold">
            <Lightbulb className="h-4 w-4 text-primary" />{t('geoEstrategico.insightsTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {insightsGeo.map((insight, i) => (
              <li key={i} className="text-sm text-foreground">{insight}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeoEstrategico;
