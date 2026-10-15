// T-008: Priority matrix pure function (R2)
// Matriz GLPI 3×3 — urgência × impacto → prioridade

export type Urgencia = 'baixa' | 'media' | 'alta';
export type Impacto = 'local' | 'setor' | 'massa';
export type Prioridade = 'baixa' | 'media' | 'alta' | 'critica';

export type TipoChamado = 'problema_tecnico' | 'novo_acesso_individual' | 'novo_acesso_lote';

const MATRIZ: Record<Urgencia, Record<Impacto, Prioridade>> = {
  baixa: { local: 'baixa', setor: 'media', massa: 'media' },
  media: { local: 'media', setor: 'alta', massa: 'alta' },
  alta:  { local: 'alta', setor: 'critica', massa: 'critica' },
};

export function calcularPrioridade(urgencia: Urgencia, impacto: Impacto): Prioridade {
  if (!MATRIZ[urgencia]) {
    throw new Error(`Urgência inválida: ${urgencia}`);
  }
  if (!MATRIZ[urgencia][impacto]) {
    throw new Error(`Impacto inválido: ${impacto}`);
  }
  return MATRIZ[urgencia][impacto];
}
