import { useState, useMemo } from "react";
import { format } from "date-fns";
import {
  CalendarIcon, Search, X, ArrowUpDown, Lightbulb, Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, ReferenceLine,
} from "recharts";
import {
  kpisPreditivo,
  distribuicaoScore,
  oltsAltoRisco,
  distQueda48h,
  tendenciaRx,
  clientesAltoRisco,
  insightsPreditivo,
  ufsPreditivo,
  cidadesPreditivo,
  oltsPreditivo,
  modelosPreditivo,
  versoesPreditivo,
  type ClienteRisco,
} from "@/data/mockPreditivo";

const ITEMS_PER_PAGE = 8;

const statusColors: Record<string, string> = {
  success: "bg-status-success",
  warning:  "bg-status-warning",
  critical: "bg-status-critical",
};

const classificacaoLabels: Record<string, { label: string; color: string }> = {
  baixo: { label: "Baixo",  color: "bg-status-success  text-white" },
  medio: { label: "Médio",  color: "bg-status-warning  text-white" },
  alto:  { label: "Alto",   color: "bg-status-critical text-white" },
};

type SortKey = keyof ClienteRisco;
type SortDir = "asc" | "desc";

const Preditivo = () => {
  // ── filtros ──────────────────────────────────────────────────────────────
  const [dataInicial, setDataInicial] = useState<Date>();
  const [dataFinal,   setDataFinal]   = useState<Date>();
  const [uf,       setUf]       = useState("");
  const [cidade,   setCidade]   = useState("");
  const [nodeOlt,  setNodeOlt]  = useState("");
  const [modelo,   setModelo]   = useState("");
  const [versao,   setVersao]   = useState("");
  const [scoreMin, setScoreMin] = useState([0]);

  // ── tabela ────────────────────────────────────────────────────────────────
  const [sortKey, setSortKey] = useState<SortKey>("scoreRisco");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page,    setPage]    = useState(1);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const filtered = useMemo(() => {
    return clientesAltoRisco
      .filter((r) => r.scoreRisco >= scoreMin[0])
      .filter((r) => !uf      || r.uf      === uf)
      .filter((r) => !cidade  || r.cidade  === cidade)
      .filter((r) => !nodeOlt || r.nodeOlt === nodeOlt);
  }, [scoreMin, uf, cidade, nodeOlt]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey]; const bVal = b[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number")
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const paged = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleLimpar = () => {
    setDataInicial(undefined); setDataFinal(undefined);
    setUf(""); setCidade(""); setNodeOlt(""); setModelo(""); setVersao("");
    setScoreMin([0]); setPage(1);
  };

  const handleExportCSV = (data: Record<string, unknown>[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(","),
      ...data.map((row) => headers.map((h) => row[h]).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const SortHeader = ({ label, colKey }: { label: string; colKey: SortKey }) => (
    <button
      onClick={() => handleSort(colKey)}
      className="flex items-center gap-1 font-medium hover:opacity-80"
    >
      {label}<ArrowUpDown className="h-3 w-3" />
    </button>
  );

  // ── render ─────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Preditivo</h1>
        <p className="mt-1 text-muted-foreground">
          Modelos de antecipação de falhas e risco técnico na base de clientes.
        </p>
      </div>

      {/* ── Filtros ─────────────────────────────────────────────────────── */}
      <Card className="mb-8 border border-border/60">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Data Inicial */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("justify-start text-left font-normal", !dataInicial && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataInicial ? format(dataInicial, "dd/MM/yyyy") : "Data Inicial"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={dataInicial} onSelect={setDataInicial} className="p-3 pointer-events-auto" />
              </PopoverContent>
            </Popover>
            {/* Data Final */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("justify-start text-left font-normal", !dataFinal && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataFinal ? format(dataFinal, "dd/MM/yyyy") : "Data Final"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={dataFinal} onSelect={setDataFinal} className="p-3 pointer-events-auto" />
              </PopoverContent>
            </Popover>
            <Select value={uf} onValueChange={setUf}>
              <SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger>
              <SelectContent>{ufsPreditivo.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={cidade} onValueChange={setCidade}>
              <SelectTrigger><SelectValue placeholder="Cidade" /></SelectTrigger>
              <SelectContent>{cidadesPreditivo.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={nodeOlt} onValueChange={setNodeOlt}>
              <SelectTrigger><SelectValue placeholder="Node/OLT" /></SelectTrigger>
              <SelectContent>{oltsPreditivo.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={modelo} onValueChange={setModelo}>
              <SelectTrigger><SelectValue placeholder="Modelo Equipamento" /></SelectTrigger>
              <SelectContent>{modelosPreditivo.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={versao} onValueChange={setVersao}>
              <SelectTrigger><SelectValue placeholder="Versão Software" /></SelectTrigger>
              <SelectContent>{versoesPreditivo.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
            </Select>
            {/* Slider Score Risco */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-muted-foreground">
                Score mínimo de risco: <strong>{scoreMin[0]}</strong>
              </span>
              <Slider
                min={0}
                max={100}
                step={1}
                value={scoreMin}
                onValueChange={setScoreMin}
                className="mt-1"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Button className="gap-2" onClick={() => setPage(1)}>
              <Search className="h-4 w-4" />Buscar
            </Button>
            <Button
              variant="outline"
              onClick={handleLimpar}
              className="gap-2 border-primary text-primary hover:bg-primary/5"
            >
              <X className="h-4 w-4" />Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── KPIs ────────────────────────────────────────────────────────── */}
      <Card className="mb-8 border border-border/60">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 divide-x divide-y divide-border/60 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
            {kpisPreditivo.map((kpi) => {
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
                    Mais informações
                  </button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ── Gráficos ────────────────────────────────────────────────────── */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Gráfico 1 – Distribuição Score de Risco */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Distribuição de Score de Risco</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ clientes: { label: "Clientes", color: "hsl(0, 72%, 51%)" } }}
              className="h-[220px] w-full"
            >
              <BarChart data={distribuicaoScore}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="faixa" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="clientes" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico 2 – Top 10 OLTs Alto Risco */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Top 10 OLTs – Maior Concentração de Alto Risco (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ percentAltoRisco: { label: "% Alto Risco", color: "hsl(38, 92%, 50%)" } }}
              className="h-[300px] w-full"
            >
              <BarChart data={oltsAltoRisco} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} domain={[0, 50]} unit="%" />
                <YAxis dataKey="nodeOlt" type="category" tick={{ fontSize: 9 }} width={140} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="percentAltoRisco" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico 3 – Distribuição Probabilidade Queda 48h */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Distribuição de Probabilidade de Queda (48h)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ clientes: { label: "Clientes", color: "hsl(210, 70%, 50%)" } }}
              className="h-[220px] w-full"
            >
              <BarChart data={distQueda48h}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="faixa" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="clientes" fill="hsl(210, 70%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico 4 – Tendência de Degradação RX (previsto 48h) */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Tendência de Degradação RX Médio Previsto (48h)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{ rxPrevisto: { label: "RX Previsto (dBm)", color: "hsl(142, 71%, 45%)" } }}
              className="h-[220px] w-full"
            >
              <LineChart data={tendenciaRx}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="hora" tick={{ fontSize: 10 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} domain={[-26, -20]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ReferenceLine y={-23} stroke="hsl(0, 72%, 51%)" strokeDasharray="4 3" label={{ value: "Limiar -23", fontSize: 10, fill: "hsl(0, 72%, 51%)" }} />
                <Line
                  type="monotone"
                  dataKey="rxPrevisto"
                  stroke="hsl(142, 71%, 45%)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "hsl(142, 71%, 45%)" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* ── Tabela Clientes Alto Risco ───────────────────────────────────── */}
      <Card className="mb-8 border border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold">
            Clientes com Alto Risco
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              (Score ≥ {scoreMin[0]} — {sorted.length} registros)
            </span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExportCSV(clientesAltoRisco as unknown as Record<string, unknown>[], "preditivo-alto-risco.csv")}
            className="gap-2 border-primary text-primary hover:bg-primary/5"
          >
            <Download className="h-4 w-4" />CSV
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground"><SortHeader label="MAC"         colKey="mac" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="Contrato"    colKey="contrato" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="UF"          colKey="uf" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="Cidade"      colKey="cidade" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="Node/OLT"    colKey="nodeOlt" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="Prob. Queda 48h" colKey="probQueda48h" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="Prob. Churn" colKey="probChurnTecnico" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="Prev. RX"    colKey="previsaoRx" /></TableHead>
                  <TableHead className="text-primary-foreground"><SortHeader label="Score"       colKey="scoreRisco" /></TableHead>
                  <TableHead className="text-primary-foreground">Classificação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((row) => {
                  const badge = classificacaoLabels[row.classificacao];
                  return (
                    <TableRow key={row.mac}>
                      <TableCell className="font-mono text-xs">{row.mac}</TableCell>
                      <TableCell className="text-xs">{row.contrato}</TableCell>
                      <TableCell>{row.uf}</TableCell>
                      <TableCell>{row.cidade}</TableCell>
                      <TableCell className="text-xs">{row.nodeOlt}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "font-semibold",
                          row.probQueda48h >= 70 ? "text-destructive" :
                          row.probQueda48h >= 50 ? "text-status-warning" : "text-status-success"
                        )}>
                          {row.probQueda48h}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={cn(
                          "font-semibold",
                          row.probChurnTecnico >= 70 ? "text-destructive" :
                          row.probChurnTecnico >= 50 ? "text-status-warning" : "text-status-success"
                        )}>
                          {row.probChurnTecnico}%
                        </span>
                      </TableCell>
                      <TableCell className={cn("font-medium", row.previsaoRx < -23 ? "text-destructive" : "text-foreground")}>
                        {row.previsaoRx} dBm
                      </TableCell>
                      <TableCell className="font-bold">{row.scoreRisco}</TableCell>
                      <TableCell>
                        <span className={cn("inline-block rounded px-2 py-0.5 text-[11px] font-semibold", badge.color)}>
                          {badge.label}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Página {page} de {totalPages}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1}          onClick={() => setPage(page - 1)}>Anterior</Button>
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Próxima</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Insights ────────────────────────────────────────────────────── */}
      <Card className="border border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-bold">
            <Lightbulb className="h-4 w-4 text-primary" />Insights com AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {insightsPreditivo.map((insight, i) => (
              <li key={i} className="text-sm text-foreground">{insight}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Preditivo;
