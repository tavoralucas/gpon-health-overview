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
import { useTranslation } from "@/hooks/useTranslation";
import {
  kpisWifi,
  distribuicaoQos,
  distribuicaoSinal,
  devicesConectadosFaixa,
  devicesDistantesBanda,
  modelosEquipamento,
  analiseRegional,
  insightsWifi,
  ufsWifi,
  cidadesWifi,
  oltsWifi,
  modelosWifi,
  protocolosWifi,
  type ModeloEquipamento,
  type AnaliseRegional,
} from "@/data/mockExperienciaWifi";

const ITEMS_PER_PAGE = 5;

const statusColors: Record<string, string> = {
  success: "bg-status-success",
  warning: "bg-status-warning",
  critical: "bg-status-critical",
};

type ModeloSortKey = keyof ModeloEquipamento;
type RegionalSortKey = keyof AnaliseRegional;
type SortDir = "asc" | "desc";

const ExperienciaWifi = () => {
  const [dataInicial, setDataInicial] = useState<Date>();
  const { t } = useTranslation();
  const [dataFinal, setDataFinal] = useState<Date>();
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [nodeOlt, setNodeOlt] = useState("");
  const [modelo, setModelo] = useState("");
  const [protocolo, setProtocolo] = useState("");

  const [modSortKey, setModSortKey] = useState<ModeloSortKey>("qosWifiMedio");
  const [modSortDir, setModSortDir] = useState<SortDir>("desc");
  const [modPage, setModPage] = useState(1);

  const [regSortKey, setRegSortKey] = useState<RegionalSortKey>("totalClientes");
  const [regSortDir, setRegSortDir] = useState<SortDir>("desc");
  const [regPage, setRegPage] = useState(1);

  const handleModSort = (key: ModeloSortKey) => {
    if (modSortKey === key) setModSortDir(modSortDir === "asc" ? "desc" : "asc");
    else { setModSortKey(key); setModSortDir("desc"); }
  };
  const handleRegSort = (key: RegionalSortKey) => {
    if (regSortKey === key) setRegSortDir(regSortDir === "asc" ? "desc" : "asc");
    else { setRegSortKey(key); setRegSortDir("desc"); }
  };

  const sortedModelos = useMemo(() => {
    return [...modelosEquipamento].sort((a, b) => {
      const aVal = a[modSortKey]; const bVal = b[modSortKey];
      if (typeof aVal === "number" && typeof bVal === "number") return modSortDir === "asc" ? aVal - bVal : bVal - aVal;
      return modSortDir === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });
  }, [modSortKey, modSortDir]);

  const sortedRegional = useMemo(() => {
    return [...analiseRegional].sort((a, b) => {
      const aVal = a[regSortKey]; const bVal = b[regSortKey];
      if (typeof aVal === "number" && typeof bVal === "number") return regSortDir === "asc" ? aVal - bVal : bVal - aVal;
      return regSortDir === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });
  }, [regSortKey, regSortDir]);

  const modTotalPages = Math.ceil(sortedModelos.length / ITEMS_PER_PAGE);
  const pagedModelos = sortedModelos.slice((modPage - 1) * ITEMS_PER_PAGE, modPage * ITEMS_PER_PAGE);
  const regTotalPages = Math.ceil(sortedRegional.length / ITEMS_PER_PAGE);
  const pagedRegional = sortedRegional.slice((regPage - 1) * ITEMS_PER_PAGE, regPage * ITEMS_PER_PAGE);

  const handleLimpar = () => {
    setDataInicial(undefined); setDataFinal(undefined);
    setUf(""); setCidade(""); setNodeOlt(""); setModelo(""); setProtocolo("");
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

  const ModSortHeader = ({ label, colKey }: { label: string; colKey: ModeloSortKey }) => (
    <button onClick={() => handleModSort(colKey)} className="flex items-center gap-1 font-medium hover:opacity-80">
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
        <h1 className="text-3xl font-bold text-foreground">{t('pages.experienciaWifi')}</h1>
        <p className="mt-1 text-muted-foreground">{t('experienciaWifi.subtitle')}</p>
      </div>

      {/* Filtros */}
      <Card className="mb-8 border border-border/60">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal", !dataInicial && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />{dataInicial ? format(dataInicial, "dd/MM/yyyy") : t('experienciaWifi.startDate')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={dataInicial} onSelect={setDataInicial} className="p-3 pointer-events-auto" /></PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal", !dataFinal && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />{dataFinal ? format(dataFinal, "dd/MM/yyyy") : t('experienciaWifi.endDate')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={dataFinal} onSelect={setDataFinal} className="p-3 pointer-events-auto" /></PopoverContent>
            </Popover>
            <Select value={uf} onValueChange={setUf}><SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger><SelectContent>{ufsWifi.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent></Select>
            <Select value={cidade} onValueChange={setCidade}><SelectTrigger><SelectValue placeholder="Cidade" /></SelectTrigger><SelectContent>{cidadesWifi.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
            <Select value={nodeOlt} onValueChange={setNodeOlt}><SelectTrigger><SelectValue placeholder="Node/OLT" /></SelectTrigger><SelectContent>{oltsWifi.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Select value={modelo} onValueChange={setModelo}><SelectTrigger className="w-52"><SelectValue placeholder={t('experienciaWifi.equipmentModel')} /></SelectTrigger><SelectContent>{modelosWifi.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select>
            <Select value={protocolo} onValueChange={setProtocolo}><SelectTrigger className="w-40"><SelectValue placeholder={t('experienciaWifi.protocol')} /></SelectTrigger><SelectContent>{protocolosWifi.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select>
            <Button className="gap-2"><Search className="h-4 w-4" />{t('experienciaWifi.search')}</Button>
            <Button variant="outline" onClick={handleLimpar} className="gap-2 border-primary text-primary hover:bg-primary/5"><X className="h-4 w-4" />{t('experienciaWifi.clear')}</Button>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <Card className="mb-8 border border-border/60">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 divide-x divide-y divide-border/60 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
            {kpisWifi.map((kpi) => {
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
                    {t('experienciaWifi.moreInfo')}
                  </button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Distribuição QoS */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">{t('experienciaWifi.chartQosDistribution')}</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ percentual: { label: "% Clientes", color: "hsl(0, 72%, 51%)" } }} className="h-[300px] w-full">
              <BarChart data={distribuicaoQos}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="faixa" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="percentual" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Distribuição Sinal */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">{t('experienciaWifi.chartSignalDistribution')}</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ sinal24g: { label: "2.4GHz", color: "hsl(210, 70%, 50%)" }, sinal5g: { label: "5GHz", color: "hsl(38, 92%, 50%)" } }} className="h-[300px] w-full">
              <BarChart data={distribuicaoSinal}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="faixa" tick={{ fontSize: 10 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sinal24g" fill="hsl(210, 70%, 50%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sinal5g" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Devices Conectados por Faixa */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">{t('experienciaWifi.chartDevicesByBand')}</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ percentual: { label: "% Clientes", color: "hsl(142, 71%, 45%)" } }} className="h-[260px] w-full">
              <BarChart data={devicesConectadosFaixa}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="faixa" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="percentual" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Devices Distantes por Banda */}
        <Card className="border border-border/60">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">{t('experienciaWifi.chartDistantDevices')}</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ percentual: { label: "% Distantes", color: "hsl(270, 60%, 55%)" } }} className="h-[260px] w-full">
              <BarChart data={devicesDistantesBanda}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="banda" tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <YAxis tick={{ fontSize: 11 }} axisLine={{ stroke: "hsl(var(--border))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="percentual" fill="hsl(270, 60%, 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela Modelos */}
      <Card className="mb-8 border border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold">{t('experienciaWifi.tableModelTitle')}</CardTitle>
          <Button variant="outline" size="sm" onClick={() => handleExportCSV(modelosEquipamento as unknown as Record<string, unknown>[], "modelos-wifi.csv")} className="gap-2 border-primary text-primary hover:bg-primary/5"><Download className="h-4 w-4" />{t('experienciaWifi.csv')}</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground"><ModSortHeader label="Modelo" colKey="modelo" /></TableHead>
                  <TableHead className="text-primary-foreground"><ModSortHeader label="Total Clientes" colKey="totalClientes" /></TableHead>
                  <TableHead className="text-primary-foreground"><ModSortHeader label="QoS Wi-Fi" colKey="qosWifiMedio" /></TableHead>
                  <TableHead className="text-primary-foreground"><ModSortHeader label="Sinal 2.4G" colKey="mediaSinal24g" /></TableHead>
                  <TableHead className="text-primary-foreground"><ModSortHeader label="Sinal 5G" colKey="mediaSinal5g" /></TableHead>
                  <TableHead className="text-primary-foreground"><ModSortHeader label="Média Devices" colKey="mediaDevices" /></TableHead>
                  <TableHead className="text-primary-foreground"><ModSortHeader label="% Baixa Cobertura" colKey="percentBaixaCobertura" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedModelos.map((row) => (
                  <TableRow key={row.modelo}>
                    <TableCell className="font-medium">{row.modelo}</TableCell>
                    <TableCell>{row.totalClientes.toLocaleString("pt-BR")}</TableCell>
                    <TableCell>{row.qosWifiMedio}</TableCell>
                    <TableCell>{row.mediaSinal24g} dBm</TableCell>
                    <TableCell>{row.mediaSinal5g} dBm</TableCell>
                    <TableCell>{row.mediaDevices}</TableCell>
                    <TableCell>{row.percentBaixaCobertura}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{t('experienciaWifi.pageInfo', { page: modPage, total: modTotalPages })}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={modPage === 1} onClick={() => setModPage(modPage - 1)}>{t('experienciaWifi.previous')}</Button>
              <Button variant="outline" size="sm" disabled={modPage === modTotalPages} onClick={() => setModPage(modPage + 1)}>{t('experienciaWifi.next')}</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela Regional */}
      <Card className="mb-8 border border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold">{t('experienciaWifi.tableRegionalTitle')}</CardTitle>
          <Button variant="outline" size="sm" onClick={() => handleExportCSV(analiseRegional as unknown as Record<string, unknown>[], "analise-regional-wifi.csv")} className="gap-2 border-primary text-primary hover:bg-primary/5"><Download className="h-4 w-4" />{t('experienciaWifi.csv')}</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground"><RegSortHeader label="UF" colKey="uf" /></TableHead>
                  <TableHead className="text-primary-foreground"><RegSortHeader label="Cidade" colKey="cidade" /></TableHead>
                  <TableHead className="text-primary-foreground"><RegSortHeader label="Total Clientes" colKey="totalClientes" /></TableHead>
                  <TableHead className="text-primary-foreground"><RegSortHeader label="QoS Wi-Fi" colKey="qosWifiMedio" /></TableHead>
                  <TableHead className="text-primary-foreground"><RegSortHeader label="% Baixa Cobertura" colKey="percentBaixaCobertura" /></TableHead>
                  <TableHead className="text-primary-foreground"><RegSortHeader label="Devices Distantes" colKey="mediaDevicesDistantes" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedRegional.map((row) => (
                  <TableRow key={`${row.uf}-${row.cidade}`}>
                    <TableCell className="font-medium">{row.uf}</TableCell>
                    <TableCell>{row.cidade}</TableCell>
                    <TableCell>{row.totalClientes.toLocaleString("pt-BR")}</TableCell>
                    <TableCell>{row.qosWifiMedio}</TableCell>
                    <TableCell>{row.percentBaixaCobertura}%</TableCell>
                    <TableCell>{row.mediaDevicesDistantes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{t('experienciaWifi.pageInfo', { page: regPage, total: regTotalPages })}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={regPage === 1} onClick={() => setRegPage(regPage - 1)}>{t('experienciaWifi.previous')}</Button>
              <Button variant="outline" size="sm" disabled={regPage === regTotalPages} onClick={() => setRegPage(regPage + 1)}>{t('experienciaWifi.next')}</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="border border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-bold">
            <Lightbulb className="h-4 w-4 text-primary" />{t('experienciaWifi.insightsTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {insightsWifi.map((insight, i) => (
              <li key={i} className="text-sm text-foreground">{insight}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperienciaWifi;
