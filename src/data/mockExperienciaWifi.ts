// Mock data for Experiência Wi-Fi

export interface KpiWifi {
  label: string;
  value: string;
  subtitle: string;
  status: "success" | "warning" | "critical";
}

export interface ModeloEquipamento {
  modelo: string;
  totalClientes: number;
  qosWifiMedio: number;
  mediaSinal24g: number;
  mediaSinal5g: number;
  mediaDevices: number;
  percentBaixaCobertura: number;
}

export interface AnaliseRegional {
  uf: string;
  cidade: string;
  totalClientes: number;
  qosWifiMedio: number;
  percentBaixaCobertura: number;
  mediaDevicesDistantes: number;
}

export const kpisWifi: KpiWifi[] = [
  { label: "QoS Wi-Fi Médio", value: "7,4", subtitle: "Score médio de qualidade Wi-Fi", status: "warning" },
  { label: "% Baixa Cobertura", value: "18,3%", subtitle: "Clientes com cobertura insuficiente", status: "critical" },
  { label: "Média Sinal 2.4GHz", value: "-58 dBm", subtitle: "Nível médio do sinal 2.4GHz", status: "success" },
  { label: "Média Sinal 5GHz", value: "-62 dBm", subtitle: "Nível médio do sinal 5GHz", status: "success" },
  { label: "Média Devices Conectados", value: "6,2", subtitle: "Dispositivos por cliente", status: "warning" },
  { label: "% Devices Distantes", value: "22,7%", subtitle: "Devices com sinal fraco", status: "critical" },
];

export const distribuicaoQos = [
  { faixa: "≥ 9", percentual: 28.4 },
  { faixa: "7–8.9", percentual: 35.2 },
  { faixa: "5–6.9", percentual: 24.1 },
  { faixa: "< 5", percentual: 12.3 },
];

export const distribuicaoSinal = [
  { faixa: "< -80 dBm", sinal24g: 8.2, sinal5g: 14.5 },
  { faixa: "-80 a -70", sinal24g: 18.4, sinal5g: 24.3 },
  { faixa: "-70 a -60", sinal24g: 32.1, sinal5g: 28.7 },
  { faixa: "-60 a -50", sinal24g: 26.8, sinal5g: 21.2 },
  { faixa: "> -50 dBm", sinal24g: 14.5, sinal5g: 11.3 },
];

export const devicesConectadosFaixa = [
  { faixa: "0–3", percentual: 22.1 },
  { faixa: "4–7", percentual: 38.5 },
  { faixa: "8–12", percentual: 27.8 },
  { faixa: "> 12", percentual: 11.6 },
];

export const devicesDistantesBanda = [
  { banda: "2.4GHz", percentual: 19.3 },
  { banda: "5GHz", percentual: 26.1 },
];

export const modelosEquipamento: ModeloEquipamento[] = [
  { modelo: "ZTE F670L", totalClientes: 42500, qosWifiMedio: 8.1, mediaSinal24g: -55, mediaSinal5g: -59, mediaDevices: 5.4, percentBaixaCobertura: 12.3 },
  { modelo: "Huawei HG8245Q2", totalClientes: 38200, qosWifiMedio: 7.8, mediaSinal24g: -57, mediaSinal5g: -61, mediaDevices: 6.1, percentBaixaCobertura: 15.8 },
  { modelo: "Nokia G-2425G-A", totalClientes: 31400, qosWifiMedio: 7.2, mediaSinal24g: -59, mediaSinal5g: -64, mediaDevices: 6.8, percentBaixaCobertura: 19.4 },
  { modelo: "Fiberhome AN5506-04-F2", totalClientes: 25800, qosWifiMedio: 6.9, mediaSinal24g: -61, mediaSinal5g: -66, mediaDevices: 7.2, percentBaixaCobertura: 22.1 },
  { modelo: "TP-Link XC220-G3v", totalClientes: 18600, qosWifiMedio: 6.5, mediaSinal24g: -63, mediaSinal5g: -68, mediaDevices: 5.8, percentBaixaCobertura: 25.7 },
  { modelo: "Intelbras W5-1200G", totalClientes: 15200, qosWifiMedio: 6.2, mediaSinal24g: -65, mediaSinal5g: -70, mediaDevices: 6.5, percentBaixaCobertura: 28.3 },
  { modelo: "Datacom DM985-424", totalClientes: 12900, qosWifiMedio: 7.5, mediaSinal24g: -56, mediaSinal5g: -60, mediaDevices: 5.9, percentBaixaCobertura: 14.2 },
  { modelo: "ZTE F6600", totalClientes: 9800, qosWifiMedio: 8.4, mediaSinal24g: -53, mediaSinal5g: -57, mediaDevices: 6.3, percentBaixaCobertura: 10.5 },
  { modelo: "Huawei EG8145V5", totalClientes: 8400, qosWifiMedio: 7.0, mediaSinal24g: -60, mediaSinal5g: -65, mediaDevices: 7.0, percentBaixaCobertura: 20.8 },
  { modelo: "Nokia G-2425G-B", totalClientes: 7100, qosWifiMedio: 7.3, mediaSinal24g: -58, mediaSinal5g: -63, mediaDevices: 6.0, percentBaixaCobertura: 17.6 },
];

export const analiseRegional: AnaliseRegional[] = [
  { uf: "SP", cidade: "São Paulo", totalClientes: 48500, qosWifiMedio: 7.6, percentBaixaCobertura: 16.4, mediaDevicesDistantes: 1.8 },
  { uf: "RJ", cidade: "Rio de Janeiro", totalClientes: 32100, qosWifiMedio: 7.2, percentBaixaCobertura: 19.8, mediaDevicesDistantes: 2.1 },
  { uf: "MG", cidade: "Belo Horizonte", totalClientes: 21400, qosWifiMedio: 7.4, percentBaixaCobertura: 17.2, mediaDevicesDistantes: 1.9 },
  { uf: "BA", cidade: "Salvador", totalClientes: 18900, qosWifiMedio: 6.8, percentBaixaCobertura: 24.1, mediaDevicesDistantes: 2.4 },
  { uf: "PR", cidade: "Curitiba", totalClientes: 15200, qosWifiMedio: 7.9, percentBaixaCobertura: 13.5, mediaDevicesDistantes: 1.5 },
  { uf: "RS", cidade: "Porto Alegre", totalClientes: 13800, qosWifiMedio: 7.7, percentBaixaCobertura: 14.8, mediaDevicesDistantes: 1.6 },
  { uf: "PE", cidade: "Recife", totalClientes: 12400, qosWifiMedio: 6.9, percentBaixaCobertura: 23.2, mediaDevicesDistantes: 2.3 },
  { uf: "CE", cidade: "Fortaleza", totalClientes: 11200, qosWifiMedio: 7.0, percentBaixaCobertura: 21.5, mediaDevicesDistantes: 2.2 },
  { uf: "GO", cidade: "Goiânia", totalClientes: 8900, qosWifiMedio: 7.3, percentBaixaCobertura: 18.1, mediaDevicesDistantes: 1.9 },
  { uf: "DF", cidade: "Brasília", totalClientes: 7600, qosWifiMedio: 7.5, percentBaixaCobertura: 15.9, mediaDevicesDistantes: 1.7 },
];

export const insightsWifi = [
  "⚠️ Modelo Intelbras W5-1200G apresenta QoS Wi-Fi médio de 6,2 — menor entre todos os modelos.",
  "🔴 Salvador (BA) possui 24,1% dos clientes com baixa cobertura — pior índice regional.",
  "📉 Clientes com mais de 12 devices apresentam queda média de 1,8 pontos no QoS Wi-Fi.",
  "📡 Banda 5GHz apresenta 26,1% de devices distantes, contra 19,3% na 2.4GHz.",
  "✅ ZTE F6600 lidera com QoS 8,4 e apenas 10,5% de baixa cobertura.",
];

export const ufsWifi = ["SP", "RJ", "MG", "BA", "PR", "RS", "PE", "CE", "GO", "DF", "SC"];
export const cidadesWifi = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador", "Curitiba", "Porto Alegre", "Recife", "Fortaleza", "Goiânia", "Brasília"];
export const oltsWifi = ["OLT-SP-MOEMA-01", "OLT-RJ-CENTRO-03", "OLT-MG-SAVASSI-02", "OLT-BA-PITUBA-01", "OLT-SP-PINHEIROS-04"];
export const modelosWifi = ["ZTE F670L", "Huawei HG8245Q2", "Nokia G-2425G-A", "Fiberhome AN5506-04-F2", "TP-Link XC220-G3v", "Intelbras W5-1200G"];
export const protocolosWifi = ["2.4G", "5G", "ax", "ac", "n"];
