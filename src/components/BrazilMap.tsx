import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import type { DadosUF } from "@/data/mockGeoEstrategico";

const GEO_URL = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

type MetricKey = "qosMedio" | "mediaQuedas" | "percentBaixaCobertura" | "performanceMedia";

interface BrazilMapProps {
  dados: DadosUF[];
  metrica: MetricKey;
  onClickUF?: (uf: string) => void;
  selectedUF?: string;
}

// Map GeoJSON sigla to our UF codes
const siglaMap: Record<string, string> = {
  "AC": "AC", "AL": "AL", "AM": "AM", "AP": "AP", "BA": "BA",
  "CE": "CE", "DF": "DF", "ES": "ES", "GO": "GO", "MA": "MA",
  "MG": "MG", "MS": "MS", "MT": "MT", "PA": "PA", "PB": "PB",
  "PE": "PE", "PI": "PI", "PR": "PR", "RJ": "RJ", "RN": "RN",
  "RO": "RO", "RR": "RR", "RS": "RS", "SC": "SC", "SE": "SE",
  "SP": "SP", "TO": "TO",
};

function getColor(metrica: MetricKey, valor: number): string {
  switch (metrica) {
    case "qosMedio":
      if (valor >= 8) return "hsl(142, 71%, 45%)";
      if (valor >= 7) return "hsl(38, 92%, 50%)";
      return "hsl(0, 72%, 51%)";
    case "mediaQuedas":
      if (valor <= 1.5) return "hsl(142, 71%, 45%)";
      if (valor <= 2.5) return "hsl(38, 92%, 50%)";
      return "hsl(0, 72%, 51%)";
    case "percentBaixaCobertura":
      if (valor <= 12) return "hsl(142, 71%, 45%)";
      if (valor <= 22) return "hsl(38, 92%, 50%)";
      return "hsl(0, 72%, 51%)";
    case "performanceMedia":
      if (valor >= 90) return "hsl(142, 71%, 45%)";
      if (valor >= 80) return "hsl(38, 92%, 50%)";
      return "hsl(0, 72%, 51%)";
    default:
      return "hsl(var(--muted))";
  }
}

interface TooltipData {
  uf: string;
  x: number;
  y: number;
  data: DadosUF;
}

export default function BrazilMap({ dados, metrica, onClickUF, selectedUF }: BrazilMapProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const dataMap = new Map(dados.map((d) => [d.uf, d]));

  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 850,
          center: [-54, -15],
        }}
        width={800}
        height={600}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup zoom={1} minZoom={1} maxZoom={4}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const sigla: string = geo.properties?.sigla || geo.properties?.UF_05 || geo.properties?.codigo_ibg?.toString().slice(0, 2) || "";
                const uf = siglaMap[sigla] || sigla;
                const d = dataMap.get(uf);
                const valor = d ? d[metrica] : 0;
                const fill = d ? getColor(metrica, valor) : "hsl(var(--muted))";
                const isSelected = selectedUF === uf;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="hsl(var(--background))"
                    strokeWidth={isSelected ? 2 : 0.8}
                    style={{
                      default: { outline: "none", opacity: isSelected ? 1 : 0.88 },
                      hover: { outline: "none", opacity: 1, cursor: "pointer" },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={(e) => {
                      if (d) {
                        setTooltip({ uf, x: e.clientX, y: e.clientY, data: d });
                      }
                    }}
                    onMouseMove={(e) => {
                      if (d) {
                        setTooltip((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    onClick={() => uf && onClickUF?.(uf)}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Floating tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-[9999] rounded-lg border border-border/60 bg-card p-3 text-xs shadow-lg"
          style={{
            left: tooltip.x + 14,
            top: tooltip.y - 100,
          }}
        >
          <p className="mb-1.5 font-bold text-foreground text-sm">{tooltip.uf}</p>
          <div className="space-y-0.5 text-muted-foreground">
            <p>Clientes: <span className="font-medium text-foreground">{tooltip.data.totalClientes.toLocaleString("pt-BR")}</span></p>
            <p>QoS Médio: <span className="font-medium text-foreground">{tooltip.data.qosMedio}</span></p>
            <p>Média Quedas: <span className="font-medium text-foreground">{tooltip.data.mediaQuedas}</span></p>
            <p>% Baixa Cobertura: <span className="font-medium text-foreground">{tooltip.data.percentBaixaCobertura}%</span></p>
            <p>Performance: <span className="font-medium text-foreground">{tooltip.data.performanceMedia}%</span></p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-2 flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: "hsl(142, 71%, 45%)" }} />
          Bom
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: "hsl(38, 92%, 50%)" }} />
          Atenção
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: "hsl(0, 72%, 51%)" }} />
          Crítico
        </div>
        <div className="flex items-center gap-1.5 ml-4 text-muted-foreground/70 italic">
          Scroll para zoom · Arraste para mover
        </div>
      </div>
    </div>
  );
}
