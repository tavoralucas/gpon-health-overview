// Mock data for Relatório Geoestratégico

export interface KpiGeo {
  label: string;
  value: string;
  subtitle: string;
  status: "success" | "warning" | "critical";
}

export interface DadosUF {
  uf: string;
  totalClientes: number;
  qosMedio: number;
  mediaQuedas: number;
  percentBaixaCobertura: number;
  performanceMedia: number;
  rxMedio: number;
}

export interface DadosTerritorial {
  uf: string;
  cidade: string;
  citycode: string;
  totalClientes: number;
  qosMedio: number;
  mediaQuedas: number;
  percentBaixaCobertura: number;
  performanceMedia: number;
  rxMedio: number;
}

export const kpisGeo: KpiGeo[] = [
  { label: "QoS Médio Nacional", value: "7,8", subtitle: "Média geral de qualidade da rede", status: "success" },
  { label: "Média - Quedas/Cliente", value: "1,9", subtitle: "Quedas D-1 por cliente", status: "warning" },
  { label: "% Clientes Baixa Cobertura", value: "18,4%", subtitle: "Clientes com cobertura insuficiente", status: "warning" },
  { label: "Performance Média", value: "86,2%", subtitle: "Entrega média sobre contratado", status: "success" },
  { label: "UF com Pior QoS", value: "MA", subtitle: "Maranhão – QoS médio 5,8", status: "critical" },
  { label: "Cidade com Mais Quedas", value: "Belém", subtitle: "Média de 4,1 quedas/cliente", status: "critical" },
];

export const dadosUF: DadosUF[] = [
  { uf: "AC", totalClientes: 320, qosMedio: 6.4, mediaQuedas: 2.8, percentBaixaCobertura: 28.1, performanceMedia: 74.2, rxMedio: -23.8 },
  { uf: "AL", totalClientes: 1890, qosMedio: 6.9, mediaQuedas: 2.3, percentBaixaCobertura: 22.4, performanceMedia: 79.1, rxMedio: -22.9 },
  { uf: "AM", totalClientes: 2450, qosMedio: 6.2, mediaQuedas: 3.1, percentBaixaCobertura: 31.2, performanceMedia: 72.8, rxMedio: -24.5 },
  { uf: "AP", totalClientes: 280, qosMedio: 6.0, mediaQuedas: 3.4, percentBaixaCobertura: 33.5, performanceMedia: 70.1, rxMedio: -25.1 },
  { uf: "BA", totalClientes: 8920, qosMedio: 7.1, mediaQuedas: 2.1, percentBaixaCobertura: 19.8, performanceMedia: 81.3, rxMedio: -22.1 },
  { uf: "CE", totalClientes: 6780, qosMedio: 7.0, mediaQuedas: 2.4, percentBaixaCobertura: 21.3, performanceMedia: 80.2, rxMedio: -22.6 },
  { uf: "DF", totalClientes: 4560, qosMedio: 8.4, mediaQuedas: 1.1, percentBaixaCobertura: 9.2, performanceMedia: 92.6, rxMedio: -19.4 },
  { uf: "ES", totalClientes: 3120, qosMedio: 7.8, mediaQuedas: 1.6, percentBaixaCobertura: 14.8, performanceMedia: 87.4, rxMedio: -20.8 },
  { uf: "GO", totalClientes: 4890, qosMedio: 7.5, mediaQuedas: 1.8, percentBaixaCobertura: 16.7, performanceMedia: 85.3, rxMedio: -21.3 },
  { uf: "MA", totalClientes: 3450, qosMedio: 5.8, mediaQuedas: 3.6, percentBaixaCobertura: 36.4, performanceMedia: 68.9, rxMedio: -25.8 },
  { uf: "MG", totalClientes: 14200, qosMedio: 8.1, mediaQuedas: 1.4, percentBaixaCobertura: 11.6, performanceMedia: 89.7, rxMedio: -20.2 },
  { uf: "MS", totalClientes: 2340, qosMedio: 7.3, mediaQuedas: 2.0, percentBaixaCobertura: 18.2, performanceMedia: 83.1, rxMedio: -21.9 },
  { uf: "MT", totalClientes: 2180, qosMedio: 7.0, mediaQuedas: 2.2, percentBaixaCobertura: 20.4, performanceMedia: 81.6, rxMedio: -22.3 },
  { uf: "PA", totalClientes: 4120, qosMedio: 6.1, mediaQuedas: 3.3, percentBaixaCobertura: 32.1, performanceMedia: 71.4, rxMedio: -25.0 },
  { uf: "PB", totalClientes: 2780, qosMedio: 7.2, mediaQuedas: 2.0, percentBaixaCobertura: 18.9, performanceMedia: 82.4, rxMedio: -21.7 },
  { uf: "PE", totalClientes: 6340, qosMedio: 7.0, mediaQuedas: 2.5, percentBaixaCobertura: 22.8, performanceMedia: 79.6, rxMedio: -22.8 },
  { uf: "PI", totalClientes: 1560, qosMedio: 6.5, mediaQuedas: 2.7, percentBaixaCobertura: 26.3, performanceMedia: 75.8, rxMedio: -23.4 },
  { uf: "PR", totalClientes: 9870, qosMedio: 8.5, mediaQuedas: 1.0, percentBaixaCobertura: 8.4, performanceMedia: 93.1, rxMedio: -19.1 },
  { uf: "RJ", totalClientes: 15600, qosMedio: 7.9, mediaQuedas: 1.7, percentBaixaCobertura: 15.2, performanceMedia: 86.8, rxMedio: -20.6 },
  { uf: "RN", totalClientes: 2340, qosMedio: 7.1, mediaQuedas: 2.1, percentBaixaCobertura: 19.6, performanceMedia: 81.7, rxMedio: -22.0 },
  { uf: "RO", totalClientes: 890, qosMedio: 6.6, mediaQuedas: 2.6, percentBaixaCobertura: 25.4, performanceMedia: 76.3, rxMedio: -23.2 },
  { uf: "RR", totalClientes: 210, qosMedio: 5.9, mediaQuedas: 3.5, percentBaixaCobertura: 34.8, performanceMedia: 69.4, rxMedio: -25.4 },
  { uf: "RS", totalClientes: 8450, qosMedio: 8.6, mediaQuedas: 0.9, percentBaixaCobertura: 7.8, performanceMedia: 94.8, rxMedio: -18.9 },
  { uf: "SC", totalClientes: 5670, qosMedio: 8.3, mediaQuedas: 1.2, percentBaixaCobertura: 9.8, performanceMedia: 91.4, rxMedio: -19.6 },
  { uf: "SE", totalClientes: 1450, qosMedio: 7.0, mediaQuedas: 2.2, percentBaixaCobertura: 20.1, performanceMedia: 80.8, rxMedio: -22.4 },
  { uf: "SP", totalClientes: 28900, qosMedio: 8.7, mediaQuedas: 0.8, percentBaixaCobertura: 6.9, performanceMedia: 95.2, rxMedio: -18.4 },
  { uf: "TO", totalClientes: 980, qosMedio: 6.7, mediaQuedas: 2.5, percentBaixaCobertura: 24.6, performanceMedia: 77.2, rxMedio: -23.0 },
];

export const qosPorUf = dadosUF
  .sort((a, b) => a.qosMedio - b.qosMedio)
  .slice(0, 10)
  .map((d) => ({ uf: d.uf, qosMedio: d.qosMedio }));

export const quedasPorCidade = [
  { cidade: "Belém", mediaQuedas: 4.1 },
  { cidade: "São Luís", mediaQuedas: 3.8 },
  { cidade: "Manaus", mediaQuedas: 3.5 },
  { cidade: "Macapá", mediaQuedas: 3.3 },
  { cidade: "Boa Vista", mediaQuedas: 3.2 },
  { cidade: "Teresina", mediaQuedas: 2.9 },
  { cidade: "Rio Branco", mediaQuedas: 2.8 },
  { cidade: "Recife", mediaQuedas: 2.6 },
  { cidade: "Fortaleza", mediaQuedas: 2.5 },
  { cidade: "Palmas", mediaQuedas: 2.4 },
];

export const baixaCoberturaPorRegiao = [
  { regiao: "Norte", percentual: 30.8 },
  { regiao: "Nordeste", percentual: 22.1 },
  { regiao: "Centro-Oeste", percentual: 17.4 },
  { regiao: "Sudeste", percentual: 11.2 },
  { regiao: "Sul", percentual: 8.7 },
];

export const performancePorCitycode = [
  { citycode: "CTC-SP-001", performance: 95.8 },
  { citycode: "CTC-RS-003", performance: 94.2 },
  { citycode: "CTC-PR-002", performance: 93.6 },
  { citycode: "CTC-SC-001", performance: 91.8 },
  { citycode: "CTC-DF-001", performance: 92.1 },
  { citycode: "CTC-MG-004", performance: 89.4 },
  { citycode: "CTC-RJ-002", performance: 86.3 },
  { citycode: "CTC-GO-001", performance: 84.7 },
  { citycode: "CTC-BA-003", performance: 80.9 },
  { citycode: "CTC-CE-002", performance: 79.1 },
  { citycode: "CTC-PE-001", performance: 78.4 },
  { citycode: "CTC-PA-001", performance: 71.2 },
  { citycode: "CTC-MA-002", performance: 68.4 },
  { citycode: "CTC-AM-001", performance: 72.6 },
];

export const tabelaTerritorial: DadosTerritorial[] = [
  { uf: "SP", cidade: "São Paulo", citycode: "CTC-SP-001", totalClientes: 18200, qosMedio: 8.9, mediaQuedas: 0.7, percentBaixaCobertura: 5.8, performanceMedia: 95.8, rxMedio: -18.1 },
  { uf: "SP", cidade: "Campinas", citycode: "CTC-SP-004", totalClientes: 4500, qosMedio: 8.4, mediaQuedas: 1.0, percentBaixaCobertura: 8.2, performanceMedia: 93.1, rxMedio: -19.2 },
  { uf: "RJ", cidade: "Rio de Janeiro", citycode: "CTC-RJ-002", totalClientes: 12800, qosMedio: 7.8, mediaQuedas: 1.8, percentBaixaCobertura: 15.6, performanceMedia: 86.3, rxMedio: -20.8 },
  { uf: "MG", cidade: "Belo Horizonte", citycode: "CTC-MG-004", totalClientes: 8900, qosMedio: 8.2, mediaQuedas: 1.3, percentBaixaCobertura: 10.4, performanceMedia: 89.4, rxMedio: -20.0 },
  { uf: "RS", cidade: "Porto Alegre", citycode: "CTC-RS-003", totalClientes: 5200, qosMedio: 8.7, mediaQuedas: 0.8, percentBaixaCobertura: 7.2, performanceMedia: 94.2, rxMedio: -18.7 },
  { uf: "PR", cidade: "Curitiba", citycode: "CTC-PR-002", totalClientes: 6100, qosMedio: 8.6, mediaQuedas: 0.9, percentBaixaCobertura: 7.8, performanceMedia: 93.6, rxMedio: -19.0 },
  { uf: "BA", cidade: "Salvador", citycode: "CTC-BA-003", totalClientes: 5400, qosMedio: 7.0, mediaQuedas: 2.2, percentBaixaCobertura: 20.4, performanceMedia: 80.9, rxMedio: -22.3 },
  { uf: "CE", cidade: "Fortaleza", citycode: "CTC-CE-002", totalClientes: 4200, qosMedio: 6.9, mediaQuedas: 2.5, percentBaixaCobertura: 21.8, performanceMedia: 79.1, rxMedio: -22.7 },
  { uf: "PE", cidade: "Recife", citycode: "CTC-PE-001", totalClientes: 3800, qosMedio: 6.8, mediaQuedas: 2.6, percentBaixaCobertura: 23.4, performanceMedia: 78.4, rxMedio: -23.0 },
  { uf: "PA", cidade: "Belém", citycode: "CTC-PA-001", totalClientes: 3100, qosMedio: 6.0, mediaQuedas: 3.4, percentBaixaCobertura: 33.2, performanceMedia: 71.2, rxMedio: -25.2 },
  { uf: "MA", cidade: "São Luís", citycode: "CTC-MA-002", totalClientes: 2400, qosMedio: 5.7, mediaQuedas: 3.7, percentBaixaCobertura: 37.1, performanceMedia: 68.4, rxMedio: -25.9 },
  { uf: "AM", cidade: "Manaus", citycode: "CTC-AM-001", totalClientes: 1800, qosMedio: 6.1, mediaQuedas: 3.2, percentBaixaCobertura: 32.4, performanceMedia: 72.6, rxMedio: -24.6 },
  { uf: "DF", cidade: "Brasília", citycode: "CTC-DF-001", totalClientes: 4560, qosMedio: 8.4, mediaQuedas: 1.1, percentBaixaCobertura: 9.2, performanceMedia: 92.1, rxMedio: -19.4 },
  { uf: "GO", cidade: "Goiânia", citycode: "CTC-GO-001", totalClientes: 3200, qosMedio: 7.4, mediaQuedas: 1.9, percentBaixaCobertura: 17.1, performanceMedia: 84.7, rxMedio: -21.5 },
  { uf: "SC", cidade: "Florianópolis", citycode: "CTC-SC-001", totalClientes: 3400, qosMedio: 8.3, mediaQuedas: 1.1, percentBaixaCobertura: 9.4, performanceMedia: 91.8, rxMedio: -19.5 },
];

export const insightsGeo = [
  "🔴 Maranhão apresenta QoS médio de 5,8, o pior entre todas as UFs analisadas.",
  "⚠️ Belém concentra média de 4,1 quedas/cliente — 2x acima da média nacional.",
  "📊 Região Norte apresenta 30,8% de clientes com baixa cobertura, contra 8,7% do Sul.",
  "📉 Citycode CTC-MA-002 (São Luís) registra performance média de 68,4% — abaixo do limiar aceitável.",
  "✅ SP, RS e PR mantêm QoS acima de 8,5 e performance superior a 93%.",
];

export const ufsGeo = [...new Set(dadosUF.map((d) => d.uf))].sort();
export const cidadesGeo = [...new Set(tabelaTerritorial.map((d) => d.cidade))].sort();
export const citycodesGeo = [...new Set(tabelaTerritorial.map((d) => d.citycode))].sort();
export const oltsGeo = ["OLT-SP-MOEMA-01", "OLT-RJ-CENTRO-03", "OLT-MG-SAVASSI-02", "OLT-BA-PITUBA-01", "OLT-CE-ALDEOTA-01", "OLT-PR-BATEL-02", "OLT-RS-MOINHOS-01", "OLT-PE-BOA-VIAG-03"];
export const modelosGeo = ["ZTE F670L", "Huawei HG8245Q2", "Nokia G-2425G-A", "Fiberhome AN5506-04-F2"];
