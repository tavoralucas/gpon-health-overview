// T-013: Status transitions (R1)
// Workflow de status — tabela de transições permitidas

export type StatusTicket = 'novo' | 'atribuido' | 'atendimento' | 'espera' | 'resolvido' | 'fechado' | 'reaberto';

type Transicao = {
  de: StatusTicket;
  para: StatusTicket;
};

const TRANSICOES: Transicao[] = [
  { de: 'novo', para: 'atribuido' },
  { de: 'novo', para: 'atendimento' },
  { de: 'atribuido', para: 'atendimento' },
  { de: 'atendimento', para: 'espera' },
  { de: 'atendimento', para: 'resolvido' },
  { de: 'espera', para: 'atendimento' },
  { de: 'espera', para: 'resolvido' },
  { de: 'resolvido', para: 'fechado' },
  { de: 'resolvido', para: 'reaberto' },
  { de: 'fechado', para: 'reaberto' },
  { de: 'reaberto', para: 'atendimento' },
];

export function validarTransicao(de: StatusTicket, para: StatusTicket): boolean {
  if (de === para) return false;
  return TRANSICOES.some((t) => t.de === de && t.para === para);
}

export function transicoesPermitidas(de: StatusTicket): StatusTicket[] {
  return TRANSICOES
    .filter((t) => t.de === de)
    .map((t) => t.para);
}

export const STATUS_LABELS: Record<StatusTicket, string> = {
  novo: 'Novo',
  atribuido: 'Atribuído',
  atendimento: 'Em atendimento',
  espera: 'Em espera',
  resolvido: 'Resolvido',
  fechado: 'Fechado',
  reaberto: 'Reaberto',
};
