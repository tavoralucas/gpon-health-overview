// Mock data for Saúde Geral da Rede dashboard

export interface KpiData {
  label: string;
  value: string;
  subtitle: string;
  status: "success" | "warning" | "critical";
}

export interface OltCritica {
  nodeOlt: string;
  totalClientes: number;
  rxMedio: number;
  qosMedio: number;
  mediaQuedasD1: number;
  percentCriticos: number;
}

export const kpis: KpiData[] = [
  { label: "Clientes Monitorados", value: "248.731", subtitle: "Clientes ativos na rede", status: "success" },
  { label: "% QoS Geral < 7", value: "12,4%", subtitle: "Clientes com baixa qualidade", status: "warning" },
  { label: "% QoS Disponib. = 0", value: "3,8%", subtitle: "Clientes sem disponibilidade", status: "critical" },
  { label: "% Velocidade < 80%", value: "8,2%", subtitle: "Abaixo de 80% da velocidade contratada", status: "warning" },
  { label: "Média RX (Down)", value: "-19,7 dBm", subtitle: "Potência óptica média da rede", status: "success" },
  { label: "Média Quedas D-1", value: "1,3", subtitle: "Quedas por cliente no último dia", status: "warning" },
];

export const rxDistribuicao = [
  { faixa: "< -25 dBm", quantidade: 4200 },
  { faixa: "-25 a -23", quantidade: 12800 },
  { faixa: "-23 a -20", quantidade: 58400 },
  { faixa: "-20 a -17", quantidade: 98300 },
  { faixa: "-17 a -14", quantidade: 52100 },
  { faixa: "> -14 dBm", quantidade: 22931 },
];

export const qosDistribuicao = [
  { faixa: "0", quantidade: 9452 },
  { faixa: "1-3", quantidade: 7120 },
  { faixa: "4-6", quantidade: 14300 },
  { faixa: "7-8", quantidade: 89200 },
  { faixa: "9", quantidade: 72400 },
  { faixa: "10", quantidade: 56259 },
];

export const top10OltsQuedas = [
  { olt: "OLT-SP-MOEMA-01", mediaQuedas: 5.8 },
  { olt: "OLT-RJ-CENTRO-03", mediaQuedas: 5.2 },
  { olt: "OLT-MG-SAVASSI-02", mediaQuedas: 4.9 },
  { olt: "OLT-SP-PINHEIROS-04", mediaQuedas: 4.5 },
  { olt: "OLT-BA-PITUBA-01", mediaQuedas: 4.1 },
  { olt: "OLT-PR-BATEL-02", mediaQuedas: 3.8 },
  { olt: "OLT-RS-MOINHOS-01", mediaQuedas: 3.5 },
  { olt: "OLT-PE-BOA-VIAGEM-03", mediaQuedas: 3.2 },
  { olt: "OLT-CE-ALDEOTA-02", mediaQuedas: 2.9 },
  { olt: "OLT-GO-SETOR-BUENO-01", mediaQuedas: 2.7 },
];

export const performanceMedia = [
  { mes: "Set", percentual: 91 },
  { mes: "Out", percentual: 89 },
  { mes: "Nov", percentual: 87 },
  { mes: "Dez", percentual: 85 },
  { mes: "Jan", percentual: 88 },
  { mes: "Fev", percentual: 92 },
];

export const oltsCriticas: OltCritica[] = [
  { nodeOlt: "OLT-SP-MOEMA-01", totalClientes: 3420, rxMedio: -24.1, qosMedio: 5.2, mediaQuedasD1: 5.8, percentCriticos: 38 },
  { nodeOlt: "OLT-RJ-CENTRO-03", totalClientes: 2890, rxMedio: -23.5, qosMedio: 5.8, mediaQuedasD1: 5.2, percentCriticos: 32 },
  { nodeOlt: "OLT-MG-SAVASSI-02", totalClientes: 1540, rxMedio: -24.8, qosMedio: 4.9, mediaQuedasD1: 4.9, percentCriticos: 41 },
  { nodeOlt: "OLT-SP-PINHEIROS-04", totalClientes: 4100, rxMedio: -22.9, qosMedio: 6.1, mediaQuedasD1: 4.5, percentCriticos: 28 },
  { nodeOlt: "OLT-BA-PITUBA-01", totalClientes: 1820, rxMedio: -23.2, qosMedio: 5.5, mediaQuedasD1: 4.1, percentCriticos: 35 },
  { nodeOlt: "OLT-PR-BATEL-02", totalClientes: 2210, rxMedio: -22.1, qosMedio: 6.4, mediaQuedasD1: 3.8, percentCriticos: 24 },
  { nodeOlt: "OLT-RS-MOINHOS-01", totalClientes: 1650, rxMedio: -21.8, qosMedio: 6.7, mediaQuedasD1: 3.5, percentCriticos: 22 },
  { nodeOlt: "OLT-PE-BOA-VIAGEM-03", totalClientes: 2340, rxMedio: -22.5, qosMedio: 6.0, mediaQuedasD1: 3.2, percentCriticos: 27 },
  { nodeOlt: "OLT-CE-ALDEOTA-02", totalClientes: 1980, rxMedio: -21.4, qosMedio: 6.9, mediaQuedasD1: 2.9, percentCriticos: 19 },
  { nodeOlt: "OLT-GO-SETOR-BUENO-01", totalClientes: 1120, rxMedio: -20.9, qosMedio: 7.1, mediaQuedasD1: 2.7, percentCriticos: 15 },
  { nodeOlt: "OLT-DF-ASA-NORTE-01", totalClientes: 2560, rxMedio: -20.3, qosMedio: 7.4, mediaQuedasD1: 2.4, percentCriticos: 12 },
  { nodeOlt: "OLT-SC-CENTRO-02", totalClientes: 890, rxMedio: -19.8, qosMedio: 7.8, mediaQuedasD1: 2.1, percentCriticos: 10 },
];

export const insights = [
  "⚠️ OLT-MG-SAVASSI-02 apresenta RX médio de -24.8 dBm, abaixo do limiar aceitável de -23 dBm.",
  "🔴 3,8% dos clientes (9.452) possuem QoS Disponibilidade = 0, concentrados em SP e RJ.",
  "📉 A performance de download caiu para 85% em dezembro, recuperando para 92% em fevereiro.",
  "⚠️ OLT-SP-MOEMA-01 lidera em quedas com média de 5,8 por cliente no D-1.",
  "✅ 51,8% dos clientes apresentam QoS Geral ≥ 9, indicando boa qualidade geral da rede.",
];

export const ufs = ["SP", "RJ", "MG", "BA", "PR", "RS", "PE", "CE", "GO", "DF", "SC"];
export const cidades = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador", "Curitiba", "Porto Alegre", "Recife", "Fortaleza", "Goiânia", "Brasília", "Florianópolis"];
export const olts = ["OLT-SP-MOEMA-01", "OLT-RJ-CENTRO-03", "OLT-MG-SAVASSI-02", "OLT-SP-PINHEIROS-04", "OLT-BA-PITUBA-01"];
