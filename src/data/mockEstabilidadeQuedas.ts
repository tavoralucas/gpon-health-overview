// Mock data for Estabilidade e Quedas

export interface KpiEstabilidade {
  label: string;
  value: string;
  subtitle: string;
  status: "success" | "warning" | "critical";
}

export interface OltQueda {
  nodeOlt: string;
  totalClientes: number;
  mediaQuedasD1: number;
  percentClientes3Quedas: number;
  uptimeMedio: string;
  rxMedio: number;
  percentResetLocal: number;
}

export interface ClienteQuedaRecorrente {
  mac: string;
  contrato: string;
  uf: string;
  cidade: string;
  nodeOlt: string;
  quedasD1: number;
  motivoPrincipal: string;
  rxDown: number;
  uptime: string;
}

export const kpisEstabilidade: KpiEstabilidade[] = [
  { label: "Média Quedas D-1 / Cliente", value: "1,3", subtitle: "Quedas por cliente no último dia", status: "warning" },
  { label: "Média Quedas D-1 / OLT", value: "312", subtitle: "Média de eventos por OLT", status: "warning" },
  { label: "Uptime Médio da Rede", value: "18h 42m", subtitle: "Tempo médio sem reinício", status: "success" },
  { label: "% Clientes ≥ 3 Quedas", value: "6,8%", subtitle: "Clientes com instabilidade alta", status: "critical" },
  { label: "% Reset Local", value: "34,2%", subtitle: "Quedas por reset do equipamento", status: "warning" },
  { label: "% RX < -23 dBm", value: "11,4%", subtitle: "Clientes com sinal crítico", status: "critical" },
];

export const top10OltsQuedas = [
  { olt: "OLT-SP-MOEMA-01", mediaQuedas: 5.8 },
  { olt: "OLT-RJ-CENTRO-03", mediaQuedas: 5.2 },
  { olt: "OLT-MG-SAVASSI-02", mediaQuedas: 4.9 },
  { olt: "OLT-BA-PITUBA-01", mediaQuedas: 4.1 },
  { olt: "OLT-SP-PINHEIROS-04", mediaQuedas: 3.8 },
  { olt: "OLT-PE-BOA-VIAGEM-03", mediaQuedas: 3.5 },
  { olt: "OLT-CE-ALDEOTA-02", mediaQuedas: 3.2 },
  { olt: "OLT-PR-BATEL-02", mediaQuedas: 2.9 },
  { olt: "OLT-RS-MOINHOS-01", mediaQuedas: 2.7 },
  { olt: "OLT-GO-SETOR-BUENO-01", mediaQuedas: 2.4 },
];

export const distribuicaoMotivo = [
  { motivo: "Reset Local", percentual: 34.2 },
  { motivo: "Sinal", percentual: 28.5 },
  { motivo: "Energia", percentual: 22.1 },
  { motivo: "Outros", percentual: 15.2 },
];

export const quedasPorCidade = [
  { cidade: "São Paulo", mediaQuedas: 1.8 },
  { cidade: "Rio de Janeiro", mediaQuedas: 1.6 },
  { cidade: "Salvador", mediaQuedas: 1.5 },
  { cidade: "Recife", mediaQuedas: 1.4 },
  { cidade: "Fortaleza", mediaQuedas: 1.3 },
  { cidade: "Belo Horizonte", mediaQuedas: 1.2 },
  { cidade: "Curitiba", mediaQuedas: 1.0 },
  { cidade: "Porto Alegre", mediaQuedas: 0.9 },
];

export const correlacaoRxQuedas = [
  { faixaRx: "< -25 dBm", mediaQuedas: 4.8, totalClientes: 4200 },
  { faixaRx: "-25 a -23", mediaQuedas: 3.1, totalClientes: 12800 },
  { faixaRx: "-23 a -20", mediaQuedas: 1.4, totalClientes: 58400 },
  { faixaRx: "-20 a -17", mediaQuedas: 0.8, totalClientes: 98300 },
  { faixaRx: "-17 a -14", mediaQuedas: 0.5, totalClientes: 52100 },
  { faixaRx: "> -14 dBm", mediaQuedas: 0.3, totalClientes: 22931 },
];

export const oltsCriticasQuedas: OltQueda[] = [
  { nodeOlt: "OLT-SP-MOEMA-01", totalClientes: 3420, mediaQuedasD1: 5.8, percentClientes3Quedas: 18.2, uptimeMedio: "8h 12m", rxMedio: -24.1, percentResetLocal: 42.1 },
  { nodeOlt: "OLT-RJ-CENTRO-03", totalClientes: 2890, mediaQuedasD1: 5.2, percentClientes3Quedas: 15.8, uptimeMedio: "10h 35m", rxMedio: -23.5, percentResetLocal: 38.4 },
  { nodeOlt: "OLT-MG-SAVASSI-02", totalClientes: 1540, mediaQuedasD1: 4.9, percentClientes3Quedas: 14.3, uptimeMedio: "9h 48m", rxMedio: -24.8, percentResetLocal: 31.2 },
  { nodeOlt: "OLT-BA-PITUBA-01", totalClientes: 1820, mediaQuedasD1: 4.1, percentClientes3Quedas: 12.1, uptimeMedio: "12h 20m", rxMedio: -23.2, percentResetLocal: 35.8 },
  { nodeOlt: "OLT-SP-PINHEIROS-04", totalClientes: 4100, mediaQuedasD1: 3.8, percentClientes3Quedas: 10.4, uptimeMedio: "14h 05m", rxMedio: -22.9, percentResetLocal: 29.3 },
  { nodeOlt: "OLT-PE-BOA-VIAGEM-03", totalClientes: 2340, mediaQuedasD1: 3.5, percentClientes3Quedas: 9.2, uptimeMedio: "15h 30m", rxMedio: -22.5, percentResetLocal: 33.1 },
  { nodeOlt: "OLT-CE-ALDEOTA-02", totalClientes: 1980, mediaQuedasD1: 3.2, percentClientes3Quedas: 8.1, uptimeMedio: "16h 45m", rxMedio: -21.4, percentResetLocal: 27.6 },
  { nodeOlt: "OLT-PR-BATEL-02", totalClientes: 2210, mediaQuedasD1: 2.9, percentClientes3Quedas: 7.3, uptimeMedio: "18h 10m", rxMedio: -22.1, percentResetLocal: 24.8 },
  { nodeOlt: "OLT-RS-MOINHOS-01", totalClientes: 1650, mediaQuedasD1: 2.7, percentClientes3Quedas: 6.5, uptimeMedio: "19h 22m", rxMedio: -21.8, percentResetLocal: 22.3 },
  { nodeOlt: "OLT-GO-SETOR-BUENO-01", totalClientes: 1120, mediaQuedasD1: 2.4, percentClientes3Quedas: 5.8, uptimeMedio: "20h 50m", rxMedio: -20.9, percentResetLocal: 19.7 },
  { nodeOlt: "OLT-DF-ASA-NORTE-01", totalClientes: 2560, mediaQuedasD1: 2.1, percentClientes3Quedas: 4.2, uptimeMedio: "22h 15m", rxMedio: -20.3, percentResetLocal: 16.4 },
  { nodeOlt: "OLT-SC-CENTRO-02", totalClientes: 890, mediaQuedasD1: 1.8, percentClientes3Quedas: 3.1, uptimeMedio: "23h 40m", rxMedio: -19.8, percentResetLocal: 12.9 },
];

export const clientesQuedasRecorrentes: ClienteQuedaRecorrente[] = [
  { mac: "68:9E:29:BD:13:47", contrato: "137427992", uf: "SP", cidade: "São Paulo", nodeOlt: "OLT-SP-MOEMA-01", quedasD1: 8, motivoPrincipal: "Reset Local", rxDown: -24.5, uptime: "2h 15m" },
  { mac: "A4:3E:51:C2:8A:12", contrato: "142835671", uf: "RJ", cidade: "Rio de Janeiro", nodeOlt: "OLT-RJ-CENTRO-03", quedasD1: 7, motivoPrincipal: "Sinal", rxDown: -25.1, uptime: "3h 40m" },
  { mac: "B8:27:EB:4F:D1:9C", contrato: "138294105", uf: "MG", cidade: "Belo Horizonte", nodeOlt: "OLT-MG-SAVASSI-02", quedasD1: 6, motivoPrincipal: "Reset Local", rxDown: -24.8, uptime: "4h 10m" },
  { mac: "DC:A6:32:1B:E7:3F", contrato: "145672389", uf: "SP", cidade: "São Paulo", nodeOlt: "OLT-SP-MOEMA-01", quedasD1: 6, motivoPrincipal: "Energia", rxDown: -23.2, uptime: "5h 22m" },
  { mac: "E8:48:B8:9A:C5:21", contrato: "139481726", uf: "BA", cidade: "Salvador", nodeOlt: "OLT-BA-PITUBA-01", quedasD1: 5, motivoPrincipal: "Reset Local", rxDown: -23.8, uptime: "6h 05m" },
  { mac: "F0:18:98:D2:7E:4B", contrato: "141293854", uf: "SP", cidade: "São Paulo", nodeOlt: "OLT-SP-PINHEIROS-04", quedasD1: 5, motivoPrincipal: "Sinal", rxDown: -24.2, uptime: "7h 30m" },
  { mac: "1C:6F:65:A8:B3:D0", contrato: "136718493", uf: "PE", cidade: "Recife", nodeOlt: "OLT-PE-BOA-VIAGEM-03", quedasD1: 4, motivoPrincipal: "Reset Local", rxDown: -22.9, uptime: "8h 45m" },
  { mac: "30:AE:A4:5C:92:1F", contrato: "143856712", uf: "RJ", cidade: "Rio de Janeiro", nodeOlt: "OLT-RJ-CENTRO-03", quedasD1: 4, motivoPrincipal: "Energia", rxDown: -23.5, uptime: "9h 12m" },
  { mac: "44:D9:E7:F1:6B:83", contrato: "140527631", uf: "CE", cidade: "Fortaleza", nodeOlt: "OLT-CE-ALDEOTA-02", quedasD1: 4, motivoPrincipal: "Reset Local", rxDown: -21.8, uptime: "10h 30m" },
  { mac: "58:CB:52:A3:D4:7E", contrato: "144219385", uf: "PR", cidade: "Curitiba", nodeOlt: "OLT-PR-BATEL-02", quedasD1: 3, motivoPrincipal: "Sinal", rxDown: -22.4, uptime: "12h 18m" },
  { mac: "6C:72:20:B9:E8:5A", contrato: "137894562", uf: "MG", cidade: "Belo Horizonte", nodeOlt: "OLT-MG-SAVASSI-02", quedasD1: 3, motivoPrincipal: "Reset Local", rxDown: -24.1, uptime: "11h 05m" },
  { mac: "80:1F:02:C7:A6:9D", contrato: "141673928", uf: "RS", cidade: "Porto Alegre", nodeOlt: "OLT-RS-MOINHOS-01", quedasD1: 3, motivoPrincipal: "Outros", rxDown: -21.2, uptime: "14h 40m" },
];

export const insightsEstabilidade = [
  "⚠️ OLT-SP-MOEMA-01 apresenta média de 5,8 quedas por cliente, com 42,1% de resets locais.",
  "🔴 11,4% dos clientes possuem RX abaixo de -23 dBm, correlacionados com alta instabilidade.",
  "📉 Salvador (BA) concentra 28% dos resets locais entre as capitais monitoradas.",
  "⚠️ 62% dos clientes com RX < -25 dBm apresentam 3 ou mais quedas diárias.",
  "✅ OLTs do Sul (PR, RS, SC) mantêm média abaixo de 2,0 quedas/cliente, indicando boa estabilidade.",
];

export const motivosQueda = ["Reset Local", "Sinal", "Energia", "Outros"];
export const ufsEstabilidade = ["SP", "RJ", "MG", "BA", "PR", "RS", "PE", "CE", "GO", "DF", "SC"];
export const cidadesEstabilidade = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador", "Curitiba", "Porto Alegre", "Recife", "Fortaleza", "Goiânia", "Brasília", "Florianópolis"];
export const oltsEstabilidade = ["OLT-SP-MOEMA-01", "OLT-RJ-CENTRO-03", "OLT-MG-SAVASSI-02", "OLT-BA-PITUBA-01", "OLT-SP-PINHEIROS-04"];
