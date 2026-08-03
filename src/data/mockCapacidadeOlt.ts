// Mock data for Capacidade por OLT

export interface KpiCapacidade {
  label: string;
  value: string;
  subtitle: string;
  status: "success" | "warning" | "critical";
}

export interface OltConsolidada {
  nodeOlt: string;
  uf: string;
  cidade: string;
  totalClientes: number;
  mediaRxDown: number;
  mediaQuedasD1: number;
  performanceMedia: number;
  uptimeMedio: number;
  percentClientesCriticos: number;
  classificacao: "saudavel" | "sobrecarregada" | "sinal_degradado" | "instavel";
}

export const kpisCapacidade: KpiCapacidade[] = [
  { label: "Total de OLTs Analisadas", value: "148", subtitle: "OLTs ativas no período selecionado", status: "success" },
  { label: "Média Clientes por OLT", value: "1.246", subtitle: "Clientes conectados por OLT", status: "warning" },
  { label: "Média RX (Down) por OLT", value: "-21,4 dBm", subtitle: "Nível médio de sinal óptico", status: "success" },
  { label: "Média Quedas D-1 por OLT", value: "1,8", subtitle: "Quedas médias por cliente/dia", status: "warning" },
  { label: "Performance Média (% Download)", value: "87,3%", subtitle: "Entrega média sobre contratado", status: "success" },
  { label: "% OLTs com Indicador Crítico", value: "14,2%", subtitle: "OLTs fora dos parâmetros aceitáveis", status: "critical" },
];

export const topOltsClientes = [
  { nodeOlt: "OLT-SP-MOEMA-01", clientes: 1842 },
  { nodeOlt: "OLT-RJ-CENTRO-03", clientes: 1756 },
  { nodeOlt: "OLT-MG-SAVASSI-02", clientes: 1698 },
  { nodeOlt: "OLT-BA-PITUBA-01", clientes: 1621 },
  { nodeOlt: "OLT-SP-PINHEIROS-04", clientes: 1589 },
  { nodeOlt: "OLT-CE-ALDEOTA-01", clientes: 1534 },
  { nodeOlt: "OLT-PR-BATEL-02", clientes: 1478 },
  { nodeOlt: "OLT-RS-MOINHOS-01", clientes: 1423 },
  { nodeOlt: "OLT-PE-BOA-VIAG-03", clientes: 1387 },
  { nodeOlt: "OLT-GO-SETOR-BUE-01", clientes: 1342 },
];

export const rxMedioPorOlt = [
  { nodeOlt: "OLT-BA-PITUBA-01", rxMedio: -25.6 },
  { nodeOlt: "OLT-PE-BOA-VIAG-03", rxMedio: -24.8 },
  { nodeOlt: "OLT-CE-ALDEOTA-01", rxMedio: -24.1 },
  { nodeOlt: "OLT-RJ-CENTRO-03", rxMedio: -23.5 },
  { nodeOlt: "OLT-GO-SETOR-BUE-01", rxMedio: -22.9 },
  { nodeOlt: "OLT-MG-SAVASSI-02", rxMedio: -21.8 },
  { nodeOlt: "OLT-SP-MOEMA-01", rxMedio: -20.4 },
  { nodeOlt: "OLT-PR-BATEL-02", rxMedio: -19.7 },
  { nodeOlt: "OLT-RS-MOINHOS-01", rxMedio: -19.2 },
  { nodeOlt: "OLT-SP-PINHEIROS-04", rxMedio: -18.6 },
];

export const quedasPorOlt = [
  { nodeOlt: "OLT-BA-PITUBA-01", mediaQuedas: 4.2 },
  { nodeOlt: "OLT-PE-BOA-VIAG-03", mediaQuedas: 3.8 },
  { nodeOlt: "OLT-CE-ALDEOTA-01", mediaQuedas: 3.1 },
  { nodeOlt: "OLT-RJ-CENTRO-03", mediaQuedas: 2.6 },
  { nodeOlt: "OLT-GO-SETOR-BUE-01", mediaQuedas: 2.3 },
  { nodeOlt: "OLT-MG-SAVASSI-02", mediaQuedas: 1.9 },
  { nodeOlt: "OLT-SP-MOEMA-01", mediaQuedas: 1.5 },
  { nodeOlt: "OLT-PR-BATEL-02", mediaQuedas: 1.2 },
  { nodeOlt: "OLT-RS-MOINHOS-01", mediaQuedas: 0.9 },
  { nodeOlt: "OLT-SP-PINHEIROS-04", mediaQuedas: 0.7 },
];

export const performancePorOlt = [
  { nodeOlt: "OLT-SP-PINHEIROS-04", performance: 96.2 },
  { nodeOlt: "OLT-RS-MOINHOS-01", performance: 94.8 },
  { nodeOlt: "OLT-PR-BATEL-02", performance: 93.1 },
  { nodeOlt: "OLT-SP-MOEMA-01", performance: 91.4 },
  { nodeOlt: "OLT-MG-SAVASSI-02", performance: 88.7 },
  { nodeOlt: "OLT-GO-SETOR-BUE-01", performance: 85.3 },
  { nodeOlt: "OLT-RJ-CENTRO-03", performance: 82.1 },
  { nodeOlt: "OLT-CE-ALDEOTA-01", performance: 78.6 },
  { nodeOlt: "OLT-PE-BOA-VIAG-03", performance: 74.2 },
  { nodeOlt: "OLT-BA-PITUBA-01", performance: 71.8 },
];

export const oltsConsolidadas: OltConsolidada[] = [
  { nodeOlt: "OLT-SP-MOEMA-01", uf: "SP", cidade: "São Paulo", totalClientes: 1842, mediaRxDown: -20.4, mediaQuedasD1: 1.5, performanceMedia: 91.4, uptimeMedio: 98.2, percentClientesCriticos: 8.3, classificacao: "saudavel" },
  { nodeOlt: "OLT-RJ-CENTRO-03", uf: "RJ", cidade: "Rio de Janeiro", totalClientes: 1756, mediaRxDown: -23.5, mediaQuedasD1: 2.6, performanceMedia: 82.1, uptimeMedio: 94.6, percentClientesCriticos: 18.7, classificacao: "instavel" },
  { nodeOlt: "OLT-MG-SAVASSI-02", uf: "MG", cidade: "Belo Horizonte", totalClientes: 1698, mediaRxDown: -21.8, mediaQuedasD1: 1.9, performanceMedia: 88.7, uptimeMedio: 96.8, percentClientesCriticos: 12.4, classificacao: "saudavel" },
  { nodeOlt: "OLT-BA-PITUBA-01", uf: "BA", cidade: "Salvador", totalClientes: 1621, mediaRxDown: -25.6, mediaQuedasD1: 4.2, performanceMedia: 71.8, uptimeMedio: 89.3, percentClientesCriticos: 34.2, classificacao: "sobrecarregada" },
  { nodeOlt: "OLT-SP-PINHEIROS-04", uf: "SP", cidade: "São Paulo", totalClientes: 1589, mediaRxDown: -18.6, mediaQuedasD1: 0.7, performanceMedia: 96.2, uptimeMedio: 99.4, percentClientesCriticos: 4.1, classificacao: "saudavel" },
  { nodeOlt: "OLT-CE-ALDEOTA-01", uf: "CE", cidade: "Fortaleza", totalClientes: 1534, mediaRxDown: -24.1, mediaQuedasD1: 3.1, performanceMedia: 78.6, uptimeMedio: 92.1, percentClientesCriticos: 26.8, classificacao: "sinal_degradado" },
  { nodeOlt: "OLT-PR-BATEL-02", uf: "PR", cidade: "Curitiba", totalClientes: 1478, mediaRxDown: -19.7, mediaQuedasD1: 1.2, performanceMedia: 93.1, uptimeMedio: 97.9, percentClientesCriticos: 6.9, classificacao: "saudavel" },
  { nodeOlt: "OLT-RS-MOINHOS-01", uf: "RS", cidade: "Porto Alegre", totalClientes: 1423, mediaRxDown: -19.2, mediaQuedasD1: 0.9, performanceMedia: 94.8, uptimeMedio: 98.7, percentClientesCriticos: 5.2, classificacao: "saudavel" },
  { nodeOlt: "OLT-PE-BOA-VIAG-03", uf: "PE", cidade: "Recife", totalClientes: 1387, mediaRxDown: -24.8, mediaQuedasD1: 3.8, performanceMedia: 74.2, uptimeMedio: 90.5, percentClientesCriticos: 31.5, classificacao: "sobrecarregada" },
  { nodeOlt: "OLT-GO-SETOR-BUE-01", uf: "GO", cidade: "Goiânia", totalClientes: 1342, mediaRxDown: -22.9, mediaQuedasD1: 2.3, performanceMedia: 85.3, uptimeMedio: 95.4, percentClientesCriticos: 15.8, classificacao: "sinal_degradado" },
  { nodeOlt: "OLT-DF-ASA-SUL-02", uf: "DF", cidade: "Brasília", totalClientes: 1298, mediaRxDown: -20.1, mediaQuedasD1: 1.1, performanceMedia: 92.6, uptimeMedio: 98.1, percentClientesCriticos: 7.4, classificacao: "saudavel" },
  { nodeOlt: "OLT-SC-CENTRO-01", uf: "SC", cidade: "Florianópolis", totalClientes: 1187, mediaRxDown: -21.3, mediaQuedasD1: 1.6, performanceMedia: 89.4, uptimeMedio: 97.2, percentClientesCriticos: 10.9, classificacao: "saudavel" },
  { nodeOlt: "OLT-PA-NAZARE-01", uf: "PA", cidade: "Belém", totalClientes: 1124, mediaRxDown: -25.1, mediaQuedasD1: 3.4, performanceMedia: 76.1, uptimeMedio: 91.2, percentClientesCriticos: 29.3, classificacao: "sobrecarregada" },
  { nodeOlt: "OLT-AM-CENTRO-02", uf: "AM", cidade: "Manaus", totalClientes: 1056, mediaRxDown: -24.5, mediaQuedasD1: 2.9, performanceMedia: 79.8, uptimeMedio: 92.8, percentClientesCriticos: 24.1, classificacao: "instavel" },
  { nodeOlt: "OLT-MA-RENASCEN-01", uf: "MA", cidade: "São Luís", totalClientes: 978, mediaRxDown: -23.8, mediaQuedasD1: 2.5, performanceMedia: 83.4, uptimeMedio: 93.9, percentClientesCriticos: 19.6, classificacao: "sinal_degradado" },
];

export const insightsCapacidade = [
  "🔴 OLT-BA-PITUBA-01 possui 1.621 clientes e performance média de 71,8% — classificada como sobrecarregada.",
  "⚠️ OLT-CE-ALDEOTA-01 apresenta RX médio de -24,1 dBm, abaixo do padrão aceitável de -23 dBm.",
  "📊 Região Nordeste concentra 42% das OLTs classificadas como sobrecarregadas ou com sinal degradado.",
  "📉 OLT-PE-BOA-VIAG-03 registra 3,8 quedas/cliente/dia — 2x acima da média geral.",
  "✅ OLTs em SP, PR e RS apresentam os melhores indicadores de performance e estabilidade.",
];

export const ufsCapacidade = ["SP", "RJ", "MG", "BA", "PR", "RS", "PE", "CE", "GO", "DF", "SC", "PA", "AM", "MA"];
export const cidadesCapacidade = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador", "Curitiba", "Porto Alegre", "Recife", "Fortaleza", "Goiânia", "Brasília", "Florianópolis", "Belém", "Manaus", "São Luís"];
export const oltsCapacidade = ["OLT-SP-MOEMA-01", "OLT-RJ-CENTRO-03", "OLT-MG-SAVASSI-02", "OLT-BA-PITUBA-01", "OLT-SP-PINHEIROS-04", "OLT-CE-ALDEOTA-01", "OLT-PR-BATEL-02", "OLT-RS-MOINHOS-01", "OLT-PE-BOA-VIAG-03", "OLT-GO-SETOR-BUE-01"];
export const modelosCapacidade = ["ZTE F670L", "Huawei HG8245Q2", "Nokia G-2425G-A", "Fiberhome AN5506-04-F2", "TP-Link XC220-G3v"];
