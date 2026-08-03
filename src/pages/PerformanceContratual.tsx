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
import {
  kpisPerformance,
  distribuicaoPerformance,
  performancePorModelo,
  performancePorFirmware,
  performancePorRegiao,
  equipamentosFirmware,
  dadosRegionais,
  insightsPerformance,
  modelosEquipamento,
  versoesSoftware,
  ufsPerformance,
  cidadesPerformance,
  oltsPerformance,
  type EquipamentoFirmware,
  type RegionalData,
} from "@/data/mockPerformanceContratual";

const ITEMS_PER_PAGE = 5;

const statusColors: Record<string, string> = {
  success: "bg-status-success",
  warning: "bg-status-warning",
  critical: "bg-status-critical",
};

type EquipSortKey = keyof EquipamentoFirmware;
type RegionalSortKey = keyof RegionalData;
type SortDir = "asc" | "desc";

const PerformanceContratual = () => {
  const [dataInicial, setDataInicial] = useState<Date>();
  const [dataFinal, setDataFinal] = useState<Date>();
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [nodeOlt, setNodeOlt] = useState("");
  const [modelo, setModelo] = useState("");
  const [versao, setVersao] = useState("");

  // Equip table state
  const [equipSortKey, setEquipSortKey] = useState<EquipSortKey>("downloadMedio");
  const [equipSortDir, setEquipSortDir] = useState<SortDir>("asc");
  const [equipPage, setEquipPage] = useState(1);

  // Regional table state
  const [regSortKey, setRegSortKey] = useState<RegionalSortKey>("downloadMedio");
  const [regSortDir, setRegSortDir] = useState<SortDir>("asc");
  const [regPage, setRegPage] = useState(1);

  const handleEquipSort = (key: EquipSortKey) => {
    if (equipSortKey === key) setEquipSortDir(equipSortDir === "asc" ? "desc" : "asc");
    else { setEquipSortKey(key); setEquipSortDir("desc"); }
  };

  const handleRegSort = (key: RegionalSortKey) => {
    if (regSortKey === key) setRegSortDir(regSortDir === "asc" ? "desc" : "asc");
    else { setRegSortKey(key); setRegSortDir("desc"); }
  };

  const sortedEquip = useMemo(() => {
    return [...equipamentosFirmware].sort((a, b) => {
      const aVal = a[equipSortKey]; const bVal = b[equipSortKey];
      if (typeof aVal === "number" && typeof bVal === "number") return equipSortDir === "asc" ? aVal - bVal : bVal - aVal;
      return equipSortDir === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });
  }, [equipSortKey, equipSortDir]);

  const sortedRegional = useMemo(() => {
    return [...dadosRegionais].sort((a, b) => {
      const aVal = a[regSortKey]; const bVal = b[regSortKey];
      if (typeof aVal === "number" && typeof bVal === "number") return regSortDir === "asc" ? aVal - bVal : bVal - aVal;
      return regSortDir === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });
  }, [regSortKey, regSortDir]);

  const equipTotalPages = Math.ceil(sortedEquip.length / ITEMS_PER_PAGE);
  const pagedEquip = sortedEquip.slice((equipPage - 1) * ITEMS_PER_PAGE, equipPage * ITEMS_PER_PAGE);
  const regTotalPages = Math.ceil(sortedRegional.length / ITEMS_PER_PAGE);
  const pagedRegional = sortedRegional.slice((regPage - 1) * ITEMS_PER_PAGE, regPage * ITEMS_PER_PAGE);

  const handleLimpar = () => {
    setDataInicial(undefined); setDataFinal(undefined);
    setUf(""); setCidade(""); setNodeOlt(""); setModelo(""); setVersao("");
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

  const EquipSortHeader = ({ label, colKey }: { label: string; colKey: EquipSortKey }) => (
    <button onClick={() => handleEquipSort(colKey)} className="flex items-center gap-1 font-medium hover:opacity-80">
      {label}<ArrowUpDown className="h-3 w-3" />
    </button>
  );

  const RegSortHeader = ({ label, colKey }: { label: string; colKey: RegionalSortKey }) => (
    <button onClick={() => handleRegSort(colKey)} className="flex items-center gap-1 font-medium hover:opacity-80">
      {label}<ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Performance</h1>
        <p className="mt-1 text-muted-foreground">Análise de aderência entre plano contratado e velocidade efetivamente entregue.</p>
      </div>

      {/* Filtros */}
      <Card className="mb-8 border border-border/60">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal", !dataInicial && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataInicial ? format(dataInicial, "dd/MM/yyyy") : "Data Inicial"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={dataInicial} onSelect={setDataInicial} className="p-3 pointer-events-auto" />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal", !dataFinal && "text-muted-foreground")}>
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
              <SelectContent>{ufsPerformance.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
            </Select>

            <Select value={cidade} onValueChange={setCidade}>
              <SelectTrigger><SelectValue placeholder="Cidade" /></SelectTrigger>
              <SelectContent>{cidadesPerformance.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>

            <Select value={nodeOlt} onValueChange={setNodeOlt}>
              <SelectTrigger><SelectValue placeholder="Node/OLT" /></SelectTrigger>
              <SelectContent>{oltsPerformance.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>

            <Select value={modelo} onValueChange={setModelo}>
              <SelectTrigger><SelectValue placeholder="Modelo" /></SelectTrigger>
              <SelectContent>{modelosEquipamento.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
            </Select>

            <Select value={versao} onValueChange={setVersao}>
              <SelectTrigger><SelectValue placeholder="Versão SW" /></SelectTrigger>
              <SelectContent>{versoesSoftware.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="mt-4 flex gap-3">
            <Button className="gap-2"><Search className="h-4 w-4" />Buscar</Button>
            <Button variant="outline" onClick={handleLimpar} className="gap-2 border-primary text-primary hover:bg-primary/5"><X className="h-4 w-4" />Limpar</Button>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <Card className="mb-8 border border-border/60">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 divide-x divide-y divide-border/60 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
            {kpisPerformance.map((kpi) => {
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

      {/* Gráficos */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">Distribuição de Performance (% Download)</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ quantidade: { label: "Clientes", color: "hsl(0, 72%, 51%)" } }} className="h-[260px] w-full">
              <BarChart data={distribuicaoPerformance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="faixa" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="quantidade" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">Performance Média por Modelo de Equipamento</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ percentual: { label: "% Download", color: "hsl(210, 70%, 50%)" } }} className="h-[260px] w-full">
              <BarChart data={performancePorModelo}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="modelo" tick={{ fontSize: 10 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="percentual" fill="hsl(210, 70%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">Performance Média por Versão de Software</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ percentual: { label: "% Download", color: "hsl(38, 92%, 50%)" } }} className="h-[300px] w-full">
              <BarChart data={performancePorFirmware} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[70, 100]} tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis dataKey="versao" type="category" tick={{ fontSize: 9 }} width={120} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="percentual" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">Performance Média por UF</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ percentual: { label: "% Download", color: "hsl(142, 71%, 45%)" } }} className="h-[300px] w-full">
              <BarChart data={performancePorRegiao}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="regiao" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="percentual" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela Equipamentos & Firmware */}
      <Card className="mb-8 border border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold">Equipamentos & Firmware</CardTitle>
          <Button variant="outline" size="sm" onClick={() => handleExportCSV(equipamentosFirmware as unknown as Record<string, unknown>[], "equipamentos-firmware.csv")} className="gap-2 border-primary text-primary hover:bg-primary/5">
            <Download className="h-4 w-4" />CSV
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground"><EquipSortHeader label="Modelo" colKey="modelo" /></TableHead>
                  <TableHead className="text-primary-foreground"><EquipSortHeader label="Versão SW" colKey="versaoSoftware" /></TableHead>
                  <TableHead className="text-primary-foreground"><EquipSortHeader label="Total Clientes" colKey="totalClientes" /></TableHead>
                  <TableHead className="text-primary-foreground"><EquipSortHeader label="Download (%)" colKey="downloadMedio" /></TableHead>
                  <TableHead className="text-primary-foreground"><EquipSortHeader label="Upload (%)" colKey="uploadMedio" /></TableHead>
                  <TableHead className="text-primary-foreground"><EquipSortHeader label="% < 80%" colKey="percentAbaixo80" /></TableHead>
                  <TableHead className="text-primary-foreground"><EquipSortHeader label="% < 70%" colKey="percentAbaixo70" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedEquip.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{row.modelo}</TableCell>
                    <TableCell>{row.versaoSoftware}</TableCell>
                    <TableCell>{row.totalClientes.toLocaleString("pt-BR")}</TableCell>
                    <TableCell>{row.downloadMedio}%</TableCell>
                    <TableCell>{row.uploadMedio}%</TableCell>
                    <TableCell>{row.percentAbaixo80}%</TableCell>
                    <TableCell>{row.percentAbaixo70}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Página {equipPage} de {equipTotalPages}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={equipPage === 1} onClick={() => setEquipPage(equipPage - 1)}>Anterior</Button>
              <Button variant="outline" size="sm" disabled={equipPage === equipTotalPages} onClick={() => setEquipPage(equipPage + 1)}>Próxima</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela Regional */}
      <Card className="mb-8 border border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold">Performance Regional</CardTitle>
          <Button variant="outline" size="sm" onClick={() => handleExportCSV(dadosRegionais as unknown as Record<string, unknown>[], "performance-regional.csv")} className="gap-2 border-primary text-primary hover:bg-primary/5">
            <Download className="h-4 w-4" />CSV
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground"><RegSortHeader label="UF" colKey="uf" /></TableHead>
                  <TableHead className="text-primary-foreground"><RegSortHeader label="Cidade" colKey="cidade" /></TableHead>
                  <TableHead className="text-primary-foreground"><RegSortHeader label="Total Clientes" colKey="totalClientes" /></TableHead>
                  <TableHead className="text-primary-foreground"><RegSortHeader label="Download (%)" colKey="downloadMedio" /></TableHead>
                  <TableHead className="text-primary-foreground"><RegSortHeader label="% < 80%" colKey="percentAbaixo80" /></TableHead>
                  <TableHead className="text-primary-foreground"><RegSortHeader label="% < 70%" colKey="percentAbaixo70" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedRegional.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{row.uf}</TableCell>
                    <TableCell>{row.cidade}</TableCell>
                    <TableCell>{row.totalClientes.toLocaleString("pt-BR")}</TableCell>
                    <TableCell>{row.downloadMedio}%</TableCell>
                    <TableCell>{row.percentAbaixo80}%</TableCell>
                    <TableCell>{row.percentAbaixo70}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Página {regPage} de {regTotalPages}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={regPage === 1} onClick={() => setRegPage(regPage - 1)}>Anterior</Button>
              <Button variant="outline" size="sm" disabled={regPage === regTotalPages} onClick={() => setRegPage(regPage + 1)}>Próxima</Button>
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
            {insightsPerformance.map((insight, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground leading-relaxed border-b border-border/40 pb-3 last:border-0 last:pb-0">
                {insight}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceContratual;
