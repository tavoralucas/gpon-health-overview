import { useState } from "react";
import { Search, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const BRASIL_UFS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA",
  "MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN",
  "RS","RO","RR","SC","SP","SE","TO"
];

// Generate daily data from 20/01/26 to 18/02/26
function generateDates() {
  const dates: string[] = [];
  const start = new Date(2026, 0, 20);
  const end = new Date(2026, 1, 18);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(2);
    dates.push(`${day}/${month}/${year}`);
  }
  return dates;
}

function generateRxData(seed: number) {
  const dates = generateDates();
  return dates.map((data, i) => ({
    data,
    valor: parseFloat((-31.5 + Math.sin((i + seed) * 0.4) * 0.8 + (Math.random() - 0.5) * 0.4).toFixed(1)),
  }));
}

function generateTxData(seed: number) {
  const dates = generateDates();
  return dates.map((data, i) => ({
    data,
    valor: parseFloat((-12.5 + Math.sin((i + seed) * 0.35) * 0.9 + (Math.random() - 0.5) * 0.4).toFixed(1)),
  }));
}

const chartConfigRx = { valor: { label: "RX (dBm)", color: "hsl(var(--foreground))" } };
const chartConfigTx = { valor: { label: "TX (dBm)", color: "hsl(var(--foreground))" } };

const Diagnostico = () => {
  const { t } = useTranslation();
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [resultado, setResultado] = useState<{ uf: string; rxData: ReturnType<typeof generateRxData>; txData: ReturnType<typeof generateTxData> } | null>(null);

  const ufValida = BRASIL_UFS.includes(estado.toUpperCase().trim());
  const canSearch = ufValida;

  const handleBuscar = () => {
    if (!canSearch) return;
    const seed = estado.charCodeAt(0) + (estado.charCodeAt(1) || 0);
    setResultado({
      uf: estado.toUpperCase().trim(),
      rxData: generateRxData(seed),
      txData: generateTxData(seed + 5),
    });
  };

  const handleLimpar = () => {
    setEstado("");
    setCidade("");
    setResultado(null);
  };

  // Show only every 3rd label to avoid crowding
  const tickFormatter = (_: unknown, index: number) => {
    if (index % 3 === 0) return resultado?.rxData[index]?.data ?? "";
    return "";
  };

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8">
      <h1 className="mb-6 text-3xl font-bold text-foreground">{t("diagnostico.title")}</h1>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold">{t("diagnostico.filters")}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {t('diagnostico.filterDescription')}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Estado */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-foreground">{t("diagnostico.selectState")}</Label>
              <div className="relative">
                <Input
                  placeholder={t("diagnostico.enterUf")}
                  value={estado}
                  onChange={(e) => {
                    setEstado(e.target.value.toUpperCase().slice(0, 2));
                    setResultado(null);
                  }}
                  maxLength={2}
                  className="uppercase"
                />
                {estado && (
                  <button
                    onClick={() => { setEstado(""); setResultado(null); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {estado && !ufValida && (
                <p className="text-xs text-destructive">{t('diagnostico.invalidUf')}</p>
              )}
            </div>

            {/* Cidade */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-foreground">{t("diagnostico.selectCity")}</Label>
              <Input
                placeholder={t("diagnostico.enterCity")}
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <Button
              onClick={handleBuscar}
              disabled={!canSearch}
              className={
                canSearch
                  ? "rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                  : "rounded-xl bg-primary/30 text-primary-foreground cursor-not-allowed"
              }
            >
              <Search className="mr-2 h-4 w-4" />
              {t('diagnostico.search')}
            </Button>
            <Button
              variant="outline"
              onClick={handleLimpar}
              className="rounded-xl border-primary text-primary hover:bg-primary/5"
            >
              {t('diagnostico.clear')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultado */}
      {resultado && (
        <Card>
          <CardContent className="px-6 py-6">
            <h2 className="mb-6 text-xl font-bold text-foreground">{t("diagnostico.diagnosticAccess")}</h2>

            {/* Nível RX */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-bold text-foreground">{t('diagnostico.rxLevel')}</p>
              <ChartContainer config={chartConfigRx} className="h-[220px] w-full">
                <LineChart data={resultado.rxData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="data"
                    tick={{ fontSize: 9 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickFormatter={(val, idx) => (idx % 3 === 0 ? val : "")}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    domain={["auto", "auto"]}
                    tickFormatter={(v) => v.toFixed(1)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="valor"
                    stroke="hsl(var(--foreground))"
                    strokeWidth={1.5}
                    dot={{ r: 3, fill: "hsl(var(--foreground))" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>

            {/* Nível TX */}
            <div>
              <p className="mb-3 text-sm font-bold text-foreground">{t('diagnostico.txLevel')}</p>
              <ChartContainer config={chartConfigTx} className="h-[220px] w-full">
                <LineChart data={resultado.txData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="data"
                    tick={{ fontSize: 9 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickFormatter={(val, idx) => (idx % 3 === 0 ? val : "")}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    domain={["auto", "auto"]}
                    tickFormatter={(v) => v.toFixed(1)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="valor"
                    stroke="hsl(var(--foreground))"
                    strokeWidth={1.5}
                    dot={{ r: 3, fill: "hsl(var(--foreground))" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Diagnostico;
