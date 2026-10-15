# Backoffice com a mesma linguagem digital da Nova solicitação

## Objetivo
Levar a identidade da tela de Nova solicitação para todo o backoffice: login, painel, lista de chamados, detalhe, novo chamado e agentes. A ideia é uma navegação fluida, com efeitos de conectividade discretos, que não atrapalhem o trabalho diário.

## Direção visual (a mesma de hoje)
- Branco e vermelho (#ffffff, superfícies #f4f4f5, texto #27272a, destaque #dc2626), títulos em Space Grotesk e textos em DM Sans, cantos de até 8px.
- Usar os mesmos tokens de cor e animações que já existem. Nenhuma cor fixa nas telas.

## O que muda em cada área
1. **Login**: o mesmo fundo de circuito animado da Nova solicitação, cartão central com o selo de conexão e o rodapé "BEON - GPON / OPERAÇÕES".
2. **Estrutura (menu lateral + barra superior)**:
   - Menu com um indicador vermelho animado que desliza até o item ativo e ícones de linha.
   - Barra superior fina com uma linha de circuito animada passando por baixo, título da página atual e avatar com um ponto de status "online".
   - No celular, o menu vira uma gaveta e a barra fica compacta.
3. **Transições entre páginas**: cada página entra com um deslize curto e esmaecido. Os cartões e linhas de tabela aparecem em cascata, um pouco depois do outro.
4. **Painel**: cartões de indicadores com contorno de circuito, número com contagem animada até o valor e um traço vermelho que corre no topo do cartão ao passar o mouse.
5. **Lista de chamados**:
   - Filtros num bloco no mesmo estilo da Nova solicitação.
   - Linhas com destaque suave ao passar o mouse e etiquetas de status/prioridade padronizadas (vermelho só para alta e crítica).
   - Carregamento com esqueletos animados no lugar do texto "Carregando...".
6. **Detalhe do chamado**: a linha do tempo de acompanhamentos vira um "trilho de conexão", com nós e um sinal vermelho percorrendo a linha. Atribuição, status e anexos ficam em cartões no mesmo padrão.
7. **Novo chamado e Agentes**: os mesmos campos, botões (mínimo de 44px de altura), foco vermelho e estilo dos formulários da Nova solicitação.
8. **Estados vazios e de erro**: uma ilustração de circuito pequena com mensagem curta, inclusive na tela "Acesso não autorizado".

## Regras
- Com a opção "reduzir movimento" do sistema ativa, as animações são desligadas.
- Nada pisca, e os efeitos não simulam progresso nem dados falsos.
- Fica fora deste ajuste qualquer mudança de dados, permissões, filtros, campos ou regras dos chamados. A tela de Nova solicitação não muda.
- Adaptado para celular (360/390px) e desktop (1366×768 e 1920×1080).

## Verificação
- Percorrer todas as telas logado como admin, no celular e no desktop, e tirar fotos de cada uma.
- Conferir que os filtros, a criação de chamado e a mudança de status continuam funcionando.
- Rodar os testes existentes.

## Detalhes técnicos
- Extrair `ConnectivityArt` e o rodapé de `GuidedFlow.tsx` para um módulo compartilhado de efeitos, reaproveitado pelo backoffice.
- Novas classes no `index.css` (`bo-page-enter`, `bo-stagger`, `bo-nav-indicator`, `bo-kpi`, `bo-timeline`), todas dentro da regra existente de prefers-reduced-motion.
- Carregar as fontes também no `BackofficeLayout` e no `LoginPage`. Criar um componente `Skeleton` para os carregamentos e um `CountUp` simples sem bibliotecas novas.
- Registrar em `AGENTS.md` que o backoffice usa os mesmos efeitos compartilhados.
