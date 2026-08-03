import { useState, useMemo } from "react";
import { format } from "date-fns";
import { CalendarIcon, Search, X, ArrowUpDown, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent } from
"@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer } from
"recharts";
import {
  kpis,
  rxDistribuicao,
  qosDistribuicao,
  top10OltsQuedas,
  performanceMedia,
  oltsCriticas,
  insights,
  ufs,
  cidades,
  olts,
  type OltCritica } from
"@/data/mockSaudeGeral";

const ITEMS_PER_PAGE = 5;

type SortKey = keyof OltCritica;
type SortDir = "asc" | "desc";

const statusColors: Record<string, string> = {
  success: "bg-status-success",
  warning: "bg-status-warning",
  critical: "bg-status-critical"
};

const SaudeGeral = () => {
  const [dataInicial, setDataInicial] = useState<Date>();
  const [dataFinal, setDataFinal] = useState<Date>();
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [nodeOlt, setNodeOlt] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("mediaQuedasD1");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sortedOlts = useMemo(() => {
    return [...oltsCriticas].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDir === "asc" ?
      String(aVal).localeCompare(String(bVal)) :
      String(bVal).localeCompare(String(aVal));
    });
  }, [sortKey, sortDir]);

  const totalPages = Math.ceil(sortedOlts.length / ITEMS_PER_PAGE);
  const pagedOlts = sortedOlts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleLimpar = () => {
    setDataInicial(undefined);
    setDataFinal(undefined);
    setUf("");
    setCidade("");
    setNodeOlt("");
  };

  const chartConfigRx = {
    quantidade: { label: "Quantidade", color: "hsl(0, 72%, 51%)" }
  };
  const chartConfigQos = {
    quantidade: { label: "Quantidade", color: "hsl(210, 70%, 50%)" }
  };
  const chartConfigQuedas = {
    mediaQuedas: { label: "Média Quedas", color: "hsl(0, 72%, 51%)" }
  };
  const chartConfigPerf = {
    percentual: { label: "% Entregue", color: "hsl(142, 71%, 45%)" }
  };

  const SortHeader = ({ label, colKey }: {label: string;colKey: SortKey;}) =>
  <button
    onClick={() => handleSort(colKey)}
    className="flex items-center gap-1 font-medium hover:opacity-80">

      {label}
      <ArrowUpDown className="h-3 w-3" />
    </button>;


  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Saúde Geral</h1>
          <p className="mt-1 text-muted-foreground">
            Visão consolidada da qualidade e estabilidade da rede GPON
          </p>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {/* Data Inicial */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                  variant="outline"
                  className={cn("justify-start text-left font-normal", !dataInicial && "text-muted-foreground")}>

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
                  className={cn("justify-start text-left font-normal", !dataFinal && "text-muted-foreground")}>

                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataFinal ? format(dataFinal, "dd/MM/yyyy") : "Data Final"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={dataFinal} onSelect={setDataFinal} className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>

              {/* UF */}
              <Select value={uf} onValueChange={setUf}>
                <SelectTrigger>
                  <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                  {ufs.map((u) =>
                <SelectItem key={u} value={u}>{u}</SelectItem>
                )}
                </SelectContent>
              </Select>

              {/* Cidade */}
              <Select value={cidade} onValueChange={setCidade}>
                <SelectTrigger>
                  <SelectValue placeholder="Cidade" />
                </SelectTrigger>
                <SelectContent>
                  {cidades.map((c) =>
                <SelectItem key={c} value={c}>{c}</SelectItem>
                )}
                </SelectContent>
              </Select>

              {/* Node/OLT */}
              <Select value={nodeOlt} onValueChange={setNodeOlt}>
                <SelectTrigger>
                  <SelectValue placeholder="Node/OLT" />
                </SelectTrigger>
                <SelectContent>
                  {olts.map((o) =>
                <SelectItem key={o} value={o}>{o}</SelectItem>
                )}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex gap-3">
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                Buscar
              </Button>
              <Button variant="outline" onClick={handleLimpar} className="gap-2 border-primary text-primary hover:bg-primary/5">
                <X className="h-4 w-4" />
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* KPIs */}
        <Card className="mb-8 border border-border/60">
          <CardContent className="p-0">
            <div className="grid grid-cols-2 divide-x divide-y divide-border/60 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
              {kpis.map((kpi) => {
              const valueColor =
              kpi.status === "success" ?
              "text-[hsl(142,60%,28%)]" :
              kpi.status === "warning" ?
              "text-[hsl(40,55%,35%)]" :
              "text-[hsl(0,65%,35%)]";
              const linkColor =
              kpi.status === "success" ?
              "text-[hsl(142,60%,28%)] hover:text-[hsl(142,60%,22%)]" :
              kpi.status === "warning" ?
              "text-[hsl(40,55%,35%)] hover:text-[hsl(40,55%,28%)]" :
              "text-[hsl(0,65%,35%)] hover:text-[hsl(0,65%,28%)]";
              return (
                <div key={kpi.label} className="flex flex-col gap-2 p-5">
                    <p className="text-foreground font-medium leading-tight text-xs">{kpi.label}</p>
                    <p className={cn("font-bold leading-none tracking-tight text-2xl", valueColor)}>
                      {kpi.value}
                    </p>
                    <button
                    className={cn("text-sm font-medium underline underline-offset-2 text-left w-fit", linkColor)}>

                      Mais informações
                    </button>
                  </div>);

            })}
            </div>
          </CardContent>
        </Card>

        {/* Gráficos */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* RX Distribution */}
          <Card className="border border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">Distribuição de RX (Down) por Faixa</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigRx} className="h-[260px] w-full">
                <BarChart data={rxDistribuicao}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="faixa" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="quantidade" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* QoS Distribution */}
          <Card className="border border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">Distribuição de QoS Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigQos} className="h-[260px] w-full">
                <BarChart data={qosDistribuicao}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="faixa" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="quantidade" fill="hsl(210, 70%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top 10 OLTs Quedas */}
          <Card className="border border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">Top 10 OLTs com Maior Taxa de Quedas</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigQuedas} className="h-[300px] w-full">
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

          {/* Performance */}
          <Card className="border border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">Performance Média (% Download Entregue)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigPerf} className="h-[300px] w-full">
                <LineChart data={performanceMedia}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                  <YAxis domain={[80, 100]} tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="percentual" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={{ r: 5, fill: "hsl(142, 71%, 45%)" }} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tabela OLTs Críticas */}
        <Card className="mb-8 border border-border/60">
          <CardHeader>
            <CardTitle className="text-base">OLTs Críticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    <TableHead className="text-primary-foreground"><SortHeader label="Node/OLT" colKey="nodeOlt" /></TableHead>
                    <TableHead className="text-primary-foreground"><SortHeader label="Total Clientes" colKey="totalClientes" /></TableHead>
                    <TableHead className="text-primary-foreground"><SortHeader label="RX Médio" colKey="rxMedio" /></TableHead>
                    <TableHead className="text-primary-foreground"><SortHeader label="QoS Médio" colKey="qosMedio" /></TableHead>
                    <TableHead className="text-primary-foreground"><SortHeader label="Média Quedas D-1" colKey="mediaQuedasD1" /></TableHead>
                    <TableHead className="text-primary-foreground"><SortHeader label="% Críticos" colKey="percentCriticos" /></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagedOlts.map((olt) =>
                <TableRow key={olt.nodeOlt}>
                      <TableCell className="font-medium">{olt.nodeOlt}</TableCell>
                      <TableCell>{olt.totalClientes.toLocaleString("pt-BR")}</TableCell>
                      <TableCell>{olt.rxMedio} dBm</TableCell>
                      <TableCell>{olt.qosMedio}</TableCell>
                      <TableCell>{olt.mediaQuedasD1}</TableCell>
                      <TableCell>{olt.percentCriticos}%</TableCell>
                    </TableRow>
                )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Página {page} de {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}>

                  Anterior
                </Button>
                <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}>

                  Próxima
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="border border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-bold">
              <Lightbulb className="h-5 w-5 text-primary" />
              Insights com AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {insights.map((insight, i) =>
            <li key={i} className="flex items-start gap-2 text-sm text-foreground leading-relaxed border-b border-border/40 pb-3 last:border-0 last:pb-0">
                  {insight}
                </li>
            )}
            </ul>
          </CardContent>
        </Card>
    </div>);

};

export default SaudeGeral;