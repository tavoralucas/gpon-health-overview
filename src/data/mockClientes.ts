export interface Cliente {
  contrato: number;
  operadora: number;
  mac: string;
  status: "Ativo" | "Inativo";
  modeloTerminal: string;
  download: number;
  upload: number;
  noOlt: string;
  cep: number;
  cidade: string;
  estado: string;
  endereco: string;
}

export const clientes: Cliente[] = [
  { contrato: 137427992, operadora: 833, mac: "68:9E:29:BD:13:47", status: "Ativo", modeloTerminal: "TERMINAL GPON ONT WIFI6 F6600P-NACIONAL", download: 350, upload: 175, noOlt: "MUPAB", cep: 9370090, cidade: "MAUA", estado: "SP", endereco: "R VITORIO VENETO" },
  { contrato: 333389563, operadora: 687, mac: "E4:66:AB:59:0E:BA", status: "Ativo", modeloTerminal: "TERMINAL GPON ONT WIFI F689", download: 600, upload: 300, noOlt: "GPONA01", cep: 95055041, cidade: "CAXIAS DO SUL", estado: "RS", endereco: "R ME BARBARA" },
  { contrato: 333471421, operadora: 687, mac: "08:C7:F5:23:51:2E", status: "Ativo", modeloTerminal: "TERMINAL GPON ONT WIFI TCG2232", download: 500, upload: 250, noOlt: "GPONA01", cep: 95045299, cidade: "CAXIAS DO SUL", estado: "RS", endereco: "R GIOVANI MOSCHEN" },
  { contrato: 1206238, operadora: 455, mac: "84:3C:99:35:F8:5B", status: "Ativo", modeloTerminal: "TERMINAL GPON ONT WIFI6 F6600P-NACIONAL", download: 500, upload: 250, noOlt: "JQC0010307", cep: 38444298, cidade: "ARAGUARI", estado: "MG", endereco: "R COROMANDEL" },
  { contrato: 141167028, operadora: 230, mac: "F4:E8:4F:84:FC:3E", status: "Ativo", modeloTerminal: "TERMINAL GPON ONT WIFI6 F6600P-NACIONAL", download: 600, upload: 300, noOlt: "RVE10", cep: 41950350, cidade: "SALVADOR", estado: "BA", endereco: "R ALMIRANTE BARROSO" },
  { contrato: 1073384, operadora: 994, mac: "D4:92:5E:05:CF:42", status: "Ativo", modeloTerminal: "TERMINAL GPON ONT WIFI TCG2232", download: 500, upload: 250, noOlt: "NBA0040405", cep: 76913674, cidade: "JI-PARANA", estado: "RO", endereco: "R XAPURI" },
  { contrato: 1113911, operadora: 320, mac: "D4:92:5E:A6:7B:1D", status: "Ativo", modeloTerminal: "TERMINAL GPON ONT WIFI TCG2232", download: 500, upload: 250, noOlt: "CTR040305", cep: 28942404, cidade: "SAO PEDRO DA ALDEIA", estado: "RJ", endereco: "R DAS ORQUIDEAS" },
  { contrato: 1204561, operadora: 455, mac: "84:3C:99:35:FD:2F", status: "Ativo", modeloTerminal: "TERMINAL GPON ONT WIFI6 F6600P-NACIONAL", download: 350, upload: 175, noOlt: "CJA0200304", cep: 38440326, cidade: "ARAGUARI", estado: "MG", endereco: "R JARDIM BOTANICO" },
  { contrato: 1089358, operadora: 741, mac: "3C:F9:F0:A6:9C:06", status: "Ativo", modeloTerminal: "TERMINAL GPON ONT WIFI6 F6600P-NACIONAL", download: 1000, upload: 500, noOlt: "SRA0220408", cep: 36400193, cidade: "CONSELHEIRO LAFAIETE", estado: "MG", endereco: "R RUTH DE SOUZA" },
  { contrato: 15656432, operadora: 194, mac: "C4:EB:FF:89:7E:F4", status: "Ativo", modeloTerminal: "TERMINAL GPON ONT WIFI6 F6600P-NACIONAL", download: 350, upload: 175, noOlt: "GPONA03", cep: 66030290, cidade: "BELEM", estado: "PA", endereco: "PSG JACOB" },
  { contrato: 22345678, operadora: 512, mac: "AA:BB:CC:DD:EE:FF", status: "Inativo", modeloTerminal: "TERMINAL GPON ONT WIFI TCG2232", download: 300, upload: 150, noOlt: "SPO0010101", cep: 1310100, cidade: "SAO PAULO", estado: "SP", endereco: "AV PAULISTA" },
  { contrato: 33456789, operadora: 610, mac: "11:22:33:44:55:66", status: "Ativo", modeloTerminal: "TERMINAL GPON ONT WIFI F689", download: 600, upload: 300, noOlt: "RJO0020202", cep: 20040020, cidade: "RIO DE JANEIRO", estado: "RJ", endereco: "AV RIO BRANCO" },
  { contrato: 44567890, operadora: 321, mac: "77:88:99:AA:BB:CC", status: "Ativo", modeloTerminal: "TERMINAL GPON ONT WIFI6 F6600P-NACIONAL", download: 500, upload: 250, noOlt: "BHO0030303", cep: 30140110, cidade: "BELO HORIZONTE", estado: "MG", endereco: "AV AFONSO PENA" },
  { contrato: 55678901, operadora: 876, mac: "DD:EE:FF:00:11:22", status: "Inativo", modeloTerminal: "TERMINAL GPON ONT WIFI TCG2232", download: 350, upload: 175, noOlt: "CWB0040404", cep: 80010010, cidade: "CURITIBA", estado: "PR", endereco: "R XV DE NOVEMBRO" },
  { contrato: 66789012, operadora: 432, mac: "33:44:55:66:77:88", status: "Ativo", modeloTerminal: "TERMINAL GPON ONT WIFI6 F6600P-NACIONAL", download: 1000, upload: 500, noOlt: "POA0050505", cep: 90010150, cidade: "PORTO ALEGRE", estado: "RS", endereco: "R DOS ANDRADAS" },
];

export const totalItens = 4281820;
export const totalPaginas = 428182;
