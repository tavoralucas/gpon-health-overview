// Mock data for Performance Contratual (SLA & Entrega)

export interface KpiPerformance {
  label: string;
  value: string;
  subtitle: string;
  status: "success" | "warning" | "critical";
}

export interface EquipamentoFirmware {
  modelo: string;
  versaoSoftware: string;
  totalClientes: number;
  downloadMedio: number;
  uploadMedio: number;
  percentAbaixo80: number;
  percentAbaixo70: number;
}

export interface RegionalData {
  uf: string;
  cidade: string;
  totalClientes: number;
  downloadMedio: number;
  percentAbaixo80: number;
  percentAbaixo70: number;
}

export const kpisPerformance: KpiPerformance[] = [
  { label: "Velocidade Média Entregue", value: "91,3%", subtitle: "Download médio vs contratado", status: "success" },
  { label: "% Clientes < 90%", value: "18,7%", subtitle: "Abaixo de 90% do plano", status: "warning" },
  { label: "% Clientes < 80%", value: "8,4%", subtitle: "Abaixo de 80% do plano", status: "warning" },
  { label: "% Clientes < 70%", value: "3,1%", subtitle: "Abaixo de 70% do plano", status: "critical" },
  { label: "Upload Médio Entregue", value: "88,6%", subtitle: "Upload médio vs contratado", status: "warning" },
  { label: "Clientes Avaliados", value: "241.580", subtitle: "Total no período selecionado", status: "success" },
];

export const distribuicaoPerformance = [
  { faixa: "≥ 100%", quantidade: 72400 },
  { faixa: "90%–99%", quantidade: 96800 },
  { faixa: "80%–89%", quantidade: 42300 },
  { faixa: "70%–79%", quantidade: 18200 },
  { faixa: "< 70%", quantidade: 11880 },
];

export const performancePorModelo = [
  { modelo: "F6600P", percentual: 94.2 },
  { modelo: "F680", percentual: 91.8 },
  { modelo: "HG8245H", percentual: 89.5 },
  { modelo: "AN5506-04", percentual: 87.1 },
  { modelo: "F670L", percentual: 85.3 },
  { modelo: "DM986", percentual: 82.7 },
];

export const performancePorFirmware = [
  { versao: "V9.1.10P4N5", percentual: 93.8 },
  { versao: "V9.1.10P2N3", percentual: 91.2 },
  { versao: "V8.0.10P1N7", percentual: 88.4 },
  { versao: "V7.1.8P2N1", percentual: 84.6 },
  { versao: "V6.0.10P3N2", percentual: 79.3 },
];

export const performancePorRegiao = [
  { regiao: "SP", percentual: 93.1 },
  { regiao: "RJ", percentual: 90.4 },
  { regiao: "MG", percentual: 89.7 },
  { regiao: "PR", percentual: 91.5 },
  { regiao: "BA", percentual: 86.2 },
  { regiao: "RS", percentual: 88.9 },
  { regiao: "PE", percentual: 85.4 },
  { regiao: "CE", percentual: 84.1 },
];

export const equipamentosFirmware: EquipamentoFirmware[] = [
  { modelo: "F6600P", versaoSoftware: "V9.1.10P4N5", totalClientes: 42300, downloadMedio: 94.2, uploadMedio: 91.5, percentAbaixo80: 4.2, percentAbaixo70: 1.1 },
  { modelo: "F680", versaoSoftware: "V9.1.10P2N3", totalClientes: 38100, downloadMedio: 91.8, uploadMedio: 89.3, percentAbaixo80: 6.8, percentAbaixo70: 2.3 },
  { modelo: "HG8245H", versaoSoftware: "V8.0.10P1N7", totalClientes: 35600, downloadMedio: 89.5, uploadMedio: 86.4, percentAbaixo80: 9.1, percentAbaixo70: 3.5 },
  { modelo: "AN5506-04", versaoSoftware: "V7.1.8P2N1", totalClientes: 28400, downloadMedio: 87.1, uploadMedio: 84.2, percentAbaixo80: 12.4, percentAbaixo70: 4.8 },
  { modelo: "F670L", versaoSoftware: "V9.1.10P4N5", totalClientes: 31200, downloadMedio: 85.3, uploadMedio: 82.1, percentAbaixo80: 15.2, percentAbaixo70: 5.6 },
  { modelo: "DM986", versaoSoftware: "V6.0.10P3N2", totalClientes: 22800, downloadMedio: 82.7, uploadMedio: 79.8, percentAbaixo80: 18.9, percentAbaixo70: 7.2 },
  { modelo: "F6600P", versaoSoftware: "V8.0.10P1N7", totalClientes: 19500, downloadMedio: 90.1, uploadMedio: 87.6, percentAbaixo80: 7.3, percentAbaixo70: 2.8 },
  { modelo: "HG8245H", versaoSoftware: "V7.1.8P2N1", totalClientes: 14200, downloadMedio: 84.9, uploadMedio: 81.3, percentAbaixo80: 16.1, percentAbaixo70: 6.4 },
  { modelo: "F680", versaoSoftware: "V6.0.10P3N2", totalClientes: 9480, downloadMedio: 80.5, uploadMedio: 77.2, percentAbaixo80: 22.3, percentAbaixo70: 9.1 },
];

export const dadosRegionais: RegionalData[] = [
  { uf: "SP", cidade: "São Paulo", totalClientes: 48200, downloadMedio: 93.1, percentAbaixo80: 5.2, percentAbaixo70: 1.8 },
  { uf: "SP", cidade: "Campinas", totalClientes: 12400, downloadMedio: 91.4, percentAbaixo80: 6.9, percentAbaixo70: 2.4 },
  { uf: "RJ", cidade: "Rio de Janeiro", totalClientes: 35800, downloadMedio: 90.4, percentAbaixo80: 7.8, percentAbaixo70: 2.9 },
  { uf: "MG", cidade: "Belo Horizonte", totalClientes: 22100, downloadMedio: 89.7, percentAbaixo80: 9.3, percentAbaixo70: 3.6 },
  { uf: "PR", cidade: "Curitiba", totalClientes: 18500, downloadMedio: 91.5, percentAbaixo80: 6.4, percentAbaixo70: 2.1 },
  { uf: "BA", cidade: "Salvador", totalClientes: 15300, downloadMedio: 86.2, percentAbaixo80: 13.8, percentAbaixo70: 5.4 },
  { uf: "RS", cidade: "Porto Alegre", totalClientes: 14200, downloadMedio: 88.9, percentAbaixo80: 10.1, percentAbaixo70: 3.8 },
  { uf: "PE", cidade: "Recife", totalClientes: 11800, downloadMedio: 85.4, percentAbaixo80: 15.2, percentAbaixo70: 6.1 },
  { uf: "CE", cidade: "Fortaleza", totalClientes: 10200, downloadMedio: 84.1, percentAbaixo80: 17.4, percentAbaixo70: 7.3 },
  { uf: "GO", cidade: "Goiânia", totalClientes: 8900, downloadMedio: 87.6, percentAbaixo80: 11.5, percentAbaixo70: 4.2 },
  { uf: "DF", cidade: "Brasília", totalClientes: 12300, downloadMedio: 92.3, percentAbaixo80: 5.8, percentAbaixo70: 1.9 },
  { uf: "SC", cidade: "Florianópolis", totalClientes: 7600, downloadMedio: 90.8, percentAbaixo80: 7.1, percentAbaixo70: 2.5 },
];

export const insightsPerformance = [
  "⚠️ Modelo DM986 apresenta média de entrega de 82,7%, abaixo do SLA ideal de 90%.",
  "🔴 Firmware V6.0.10P3N2 está associado a 22,3% dos clientes abaixo de 80% no modelo F680.",
  "📉 Fortaleza (CE) concentra o maior percentual de performance abaixo de 70% (7,3%).",
  "⚠️ Modelo F670L com firmware V9.1.10P4N5 apresenta 15,2% dos clientes abaixo de 80%.",
  "✅ São Paulo e Brasília mantêm performance acima de 92%, dentro do SLA contratual.",
];

export const modelosEquipamento = ["F6600P", "F680", "HG8245H", "AN5506-04", "F670L", "DM986"];
export const versoesSoftware = ["V9.1.10P4N5", "V9.1.10P2N3", "V8.0.10P1N7", "V7.1.8P2N1", "V6.0.10P3N2"];
export const ufsPerformance = ["SP", "RJ", "MG", "BA", "PR", "RS", "PE", "CE", "GO", "DF", "SC"];
export const cidadesPerformance = ["São Paulo", "Campinas", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Salvador", "Porto Alegre", "Recife", "Fortaleza", "Goiânia", "Brasília", "Florianópolis"];
export const oltsPerformance = ["OLT-SP-MOEMA-01", "OLT-RJ-CENTRO-03", "OLT-MG-SAVASSI-02", "OLT-SP-PINHEIROS-04", "OLT-BA-PITUBA-01"];
