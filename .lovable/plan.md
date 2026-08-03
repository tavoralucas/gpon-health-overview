## Objetivo
Atualizar a página `src/pages/cost-management/HistoricoServicoCostManagement.tsx` para redefinir os conceitos de **Cobranças Diretas** e **Cobranças Indiretas** segundo a nova regra baseada em mapeamento por Tag.

## Nova definição
- **Cobranças Diretas:** cobranças que estão mapeadas em alguma Tag.
- **Cobranças Indiretas:** cobranças que não estão mapeadas em nenhuma Tag.

## Alterações pontuais no arquivo

1. **Seção "Indicadores"** (cards Cobranças Diretas e Indiretas)
   - Card "Cobranças Diretas": substituir a descrição atual ("Custos cobrados diretamente à conta, sem intermediação de repasse de parceiro.") por: *"Cobranças que estão mapeadas em alguma Tag."*
   - Card "Cobranças Indiretas": substituir a descrição atual ("Custos faturados via parceiro/reseller. Modelo predominante no PMC — pode representar 100% do total.") por: *"Cobranças que não estão mapeadas em nenhuma Tag."*

2. **Seção "Gráfico: Histórico de Consumo por Categoria"**
   - Ajustar o item da lista que diz `Sufixo "(Indireto)" nas categorias indica o tipo de cobrança` para refletir que o sufixo indica cobranças não mapeadas em Tag.

3. **Seção "Tabela: Visualização de Dados por Consumo"**
   - Atualizar as descrições curtas dos blocos "Cobranças Diretas" e "Cobranças Indiretas" para reforçar o novo conceito (mapeadas / não mapeadas em Tag), mantendo a estrutura de colunas.

4. **Sem outras mudanças** — manter Visão Geral, Regras de Cálculo, Estados da Interface, imagens e layout intactos. Não alterar outras páginas.

## Validação
- Conferir visualmente a página `/cost-management/historico-servico` após a edição.
