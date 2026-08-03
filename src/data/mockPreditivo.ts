// Mock data for Relatório Preditivo

export interface KpiPreditivo {
  label: string;
  value: string;
  subtitle: string;
  status: "success" | "warning" | "critical";
}

export interface ClienteRisco {
  mac: string;
  contrato: string;
  uf: string;
  cidade: string;
  nodeOlt: string;
  probQueda48h: number;     // %
  probChurnTecnico: number; // %
  previsaoRx: number;       // dBm previsto
  scoreRisco: number;       // 0-100
  classificacao: "baixo" | "medio" | "alto";
}

export interface DistribuicaoScore {
  faixa: string;
  clientes: number;
}

export interface OltRisco {
  nodeOlt: string;
  percentAltoRisco: number;
}

export interface DistQueda {
  faixa: string;
  clientes: number;
}

export interface TendenciaRx {
  hora: string;
  rxPrevisto: number;
}

// ------- KPIs -------
export const kpisPreditivo: KpiPreditivo[] = [
  { label: "% Alta Prob. Queda (48h)", value: "12,4%", subtitle: "Clientes com prob. ≥ 70% de queda", status: "critical" },
  { label: "% Alto Risco Churn Técnico", value: "8,7%", subtitle: "Clientes com score churn ≥ 70", status: "critical" },
  { label: "% Risco Degradação RX", value: "15,2%", subtitle: "Clientes com RX previsto < -23 dBm", status: "warning" },
  { label: "Score Médio de Risco", value: "38,4", subtitle: "Score consolidado (0–100)", status: "warning" },
  { label: "Total Monitorados", value: "142.380", subtitle: "Clientes com score calculado", status: "success" },
  { label: "OLT Maior Concentração", value: "OLT-MA-SLS", subtitle: "42% dos clientes em alto risco", status: "critical" },
];

// ------- Gráfico 1 – Distribuição Score de Risco -------
export const distribuicaoScore: DistribuicaoScore[] = [
  { faixa: "0–40 (Baixo)", clientes: 98400 },
  { faixa: "41–70 (Médio)", clientes: 32800 },
  { faixa: "71–100 (Alto)", clientes: 11180 },
];

// ------- Gráfico 2 – Top 10 OLTs com maior concentração de alto risco -------
export const oltsAltoRisco: OltRisco[] = [
  { nodeOlt: "OLT-MA-SLS-01", percentAltoRisco: 42.1 },
  { nodeOlt: "OLT-PA-BLM-03", percentAltoRisco: 38.4 },
  { nodeOlt: "OLT-AM-MNS-02", percentAltoRisco: 35.2 },
  { nodeOlt: "OLT-RR-BVS-01", percentAltoRisco: 33.8 },
  { nodeOlt: "OLT-AP-MCP-01", percentAltoRisco: 30.6 },
  { nodeOlt: "OLT-AC-RBR-01", percentAltoRisco: 28.9 },
  { nodeOlt: "OLT-PI-TRS-02", percentAltoRisco: 26.4 },
  { nodeOlt: "OLT-CE-FOR-04", percentAltoRisco: 23.1 },
  { nodeOlt: "OLT-BA-SSA-05", percentAltoRisco: 20.8 },
  { nodeOlt: "OLT-PE-REC-03", percentAltoRisco: 18.5 },
];

// ------- Gráfico 3 – Distribuição Probabilidade de Queda 48h -------
export const distQueda48h: DistQueda[] = [
  { faixa: "< 20%", clientes: 86000 },
  { faixa: "20–40%", clientes: 29200 },
  { faixa: "40–60%", clientes: 14800 },
  { faixa: "60–80%", clientes: 8700 },
  { faixa: "> 80%", clientes: 3680 },
];

// ------- Gráfico 4 – Tendência RX Médio Previsto (próximas 48h) -------
export const tendenciaRx: TendenciaRx[] = [
  { hora: "Agora", rxPrevisto: -21.4 },
  { hora: "+4h",   rxPrevisto: -21.8 },
  { hora: "+8h",   rxPrevisto: -22.1 },
  { hora: "+12h",  rxPrevisto: -22.5 },
  { hora: "+16h",  rxPrevisto: -22.9 },
  { hora: "+20h",  rxPrevisto: -23.2 },
  { hora: "+24h",  rxPrevisto: -23.6 },
  { hora: "+28h",  rxPrevisto: -23.8 },
  { hora: "+32h",  rxPrevisto: -24.1 },
  { hora: "+36h",  rxPrevisto: -24.3 },
  { hora: "+40h",  rxPrevisto: -24.5 },
  { hora: "+44h",  rxPrevisto: -24.7 },
  { hora: "+48h",  rxPrevisto: -24.9 },
];

// ------- Tabela – Clientes Alto Risco (score ≥ 71) -------
export const clientesAltoRisco: ClienteRisco[] = [
  { mac: "A4:B1:C2:D3:E4:01", contrato: "CTR-2024-00142", uf: "MA", cidade: "São Luís",  nodeOlt: "OLT-MA-SLS-01", probQueda48h: 87, probChurnTecnico: 74, previsaoRx: -25.8, scoreRisco: 92, classificacao: "alto" },
  { mac: "B5:C2:D3:E4:F5:02", contrato: "CTR-2024-00289", uf: "PA", cidade: "Belém",     nodeOlt: "OLT-PA-BLM-03", probQueda48h: 83, probChurnTecnico: 68, previsaoRx: -25.2, scoreRisco: 88, classificacao: "alto" },
  { mac: "C6:D3:E4:F5:A6:03", contrato: "CTR-2024-00431", uf: "AM", cidade: "Manaus",    nodeOlt: "OLT-AM-MNS-02", probQueda48h: 79, probChurnTecnico: 71, previsaoRx: -24.7, scoreRisco: 85, classificacao: "alto" },
  { mac: "D7:E4:F5:A6:B7:04", contrato: "CTR-2024-00588", uf: "RR", cidade: "Boa Vista", nodeOlt: "OLT-RR-BVS-01", probQueda48h: 76, probChurnTecnico: 65, previsaoRx: -24.3, scoreRisco: 82, classificacao: "alto" },
  { mac: "E8:F5:A6:B7:C8:05", contrato: "CTR-2024-00712", uf: "AP", cidade: "Macapá",    nodeOlt: "OLT-AP-MCP-01", probQueda48h: 74, probChurnTecnico: 63, previsaoRx: -24.0, scoreRisco: 80, classificacao: "alto" },
  { mac: "F9:A6:B7:C8:D9:06", contrato: "CTR-2024-00834", uf: "AC", cidade: "Rio Branco", nodeOlt: "OLT-AC-RBR-01", probQueda48h: 72, probChurnTecnico: 60, previsaoRx: -23.8, scoreRisco: 78, classificacao: "alto" },
  { mac: "A1:B7:C8:D9:E0:07", contrato: "CTR-2024-00951", uf: "PI", cidade: "Teresina",  nodeOlt: "OLT-PI-TRS-02", probQueda48h: 71, probChurnTecnico: 58, previsaoRx: -23.6, scoreRisco: 76, classificacao: "alto" },
  { mac: "B2:C8:D9:E0:F1:08", contrato: "CTR-2024-01083", uf: "CE", cidade: "Fortaleza", nodeOlt: "OLT-CE-FOR-04", probQueda48h: 68, probChurnTecnico: 55, previsaoRx: -23.3, scoreRisco: 73, classificacao: "alto" },
  { mac: "C3:D9:E0:F1:A2:09", contrato: "CTR-2024-01210", uf: "BA", cidade: "Salvador",  nodeOlt: "OLT-BA-SSA-05", probQueda48h: 65, probChurnTecnico: 52, previsaoRx: -23.1, scoreRisco: 72, classificacao: "alto" },
  { mac: "D4:E0:F1:A2:B3:10", contrato: "CTR-2024-01345", uf: "PE", cidade: "Recife",    nodeOlt: "OLT-PE-REC-03", probQueda48h: 63, probChurnTecnico: 50, previsaoRx: -22.9, scoreRisco: 71, classificacao: "alto" },
  { mac: "E5:F1:A2:B3:C4:11", contrato: "CTR-2024-01489", uf: "MA", cidade: "São Luís",  nodeOlt: "OLT-MA-SLS-01", probQueda48h: 81, probChurnTecnico: 66, previsaoRx: -25.5, scoreRisco: 86, classificacao: "alto" },
  { mac: "F6:A2:B3:C4:D5:12", contrato: "CTR-2024-01623", uf: "PA", cidade: "Santarém",  nodeOlt: "OLT-PA-BLM-03", probQueda48h: 77, probChurnTecnico: 62, previsaoRx: -24.6, scoreRisco: 81, classificacao: "alto" },
  { mac: "A7:B3:C4:D5:E6:13", contrato: "CTR-2024-01780", uf: "AM", cidade: "Manaus",    nodeOlt: "OLT-AM-MNS-02", probQueda48h: 73, probChurnTecnico: 59, previsaoRx: -23.9, scoreRisco: 77, classificacao: "alto" },
  { mac: "B8:C4:D5:E6:F7:14", contrato: "CTR-2024-01912", uf: "RR", cidade: "Boa Vista", nodeOlt: "OLT-RR-BVS-01", probQueda48h: 70, probChurnTecnico: 57, previsaoRx: -23.7, scoreRisco: 75, classificacao: "alto" },
  { mac: "C9:D5:E6:F7:A8:15", contrato: "CTR-2024-02048", uf: "MA", cidade: "Imperatriz", nodeOlt: "OLT-MA-SLS-01", probQueda48h: 85, probChurnTecnico: 72, previsaoRx: -25.6, scoreRisco: 90, classificacao: "alto" },
];

export const insightsPreditivo: string[] = [
  "🔴 OLT-MA-SLS-01 concentra 42% dos clientes com alto risco de queda nas próximas 48h — intervenção preventiva recomendada.",
  "⚠️ Clientes com RX < -23 dBm apresentam probabilidade 2,5× maior de instabilidade nos próximos 2 dias.",
  "📉 Tendência de degradação do RX médio previsto aponta para -24,9 dBm em 48h, cruzando o limiar crítico em ~20h.",
  "🔴 Região Norte (MA, PA, AM, RR, AP) concentra 68% dos clientes classificados com alto risco consolidado.",
  "✅ Base Sul (SP, RS, PR, SC) mantém score médio de risco abaixo de 22, dentro dos parâmetros aceitáveis.",
];

export const ufsPreditivo = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"];
export const cidadesPreditivo = ["Belém","Boa Vista","Fortaleza","Imperatriz","Macapá","Manaus","Recife","Rio Branco","Salvador","Santarém","São Luís","Teresina"];
export const oltsPreditivo = ["OLT-MA-SLS-01","OLT-PA-BLM-03","OLT-AM-MNS-02","OLT-RR-BVS-01","OLT-AP-MCP-01","OLT-AC-RBR-01","OLT-PI-TRS-02","OLT-CE-FOR-04","OLT-BA-SSA-05","OLT-PE-REC-03"];
export const modelosPreditivo = ["ZTE F670L","Huawei HG8245Q2","Nokia G-2425G-A","Fiberhome AN5506-04-F2"];
export const versoesPreditivo = ["V1.0.10P6T1","V3.2.1","V2.1.5","V4.0.3","V1.8.2"];
