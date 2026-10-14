# Nova solicitação: experiência digital em etapas

## Direção visual
- Fundo branco `#ffffff`, superfícies leves `#f4f4f5`, texto grafite `#27272a` e destaques vermelhos `#dc2626`.
- Space Grotesk nos títulos e DM Sans nos textos e campos.
- Uma coluna central, sem logo, barra superior ou menu lateral. Substituir o painel atual por uma composição aberta, com divisórias discretas e cantos de até 8 px nos controles.
- Manter “Nova solicitação” como título principal, com progresso claro e nomes curtos para cada etapa.

## Fluxo guiado
1. **Tipo:** escolher Problema técnico ou Novo acesso. Novo acesso permite escolher cadastro individual ou em lote.
2. **Seus dados:** nome/login e e-mail no problema técnico; nome e e-mail do solicitante no novo acesso.
3. **Detalhes:**
   - Problema técnico: título, descrição, código da cidade e MAC opcionais, imagem opcional.
   - Novo acesso individual: nome, login, e-mail, cargo/papel e área do usuário.
   - Novo acesso em lote: arquivo CSV ou Excel, mantendo as validações atuais.
4. **Revisão:** mostrar todos os dados e o anexo escolhido antes do envio, permitindo voltar para corrigir.
5. **Confirmação:** após sucesso, mostrar resumo e data, com opção de iniciar outra solicitação.

Os botões “Voltar” e “Continuar” preservam os dados entre etapas. Validar os campos da etapa antes de avançar, com mensagens em português e foco no primeiro erro. O envio acontece somente na revisão; durante o envio, bloquear ações que possam gerar duplicidade. Em caso de erro, manter todos os dados para tentar novamente.

## Conectividade e movimento
- Criar uma composição vetorial discreta de linhas de circuito e pontos interligados, com pequenos sinais vermelhos percorrendo os caminhos, sem competir com a leitura dos campos.
- Animar a linha de progresso ao avançar e usar transições curtas de entrada e saída entre etapas.
- Dar resposta visual à seleção do tipo, à escolha do arquivo e à confirmação do envio.
- Não simular conexão ativa, prazo de envio ou porcentagem de upload que o sistema não informa.
- Reduzir ou desativar movimentos conforme a preferência de acessibilidade do dispositivo; evitar efeitos piscantes e animações pesadas.

## Celular e computador
- No celular, usar largura disponível, campos empilhados, controles com área de toque confortável e indicador compacto de etapa.
- Permitir rolagem natural nas etapas mais longas; posicionar as ações sem cobrir campos ou mensagens quando o teclado estiver aberto.
- No computador, manter o formulário centralizado e distribuir campos relacionados em duas colunas quando houver espaço. Fazer as etapas caberem confortavelmente na tela, com rolagem apenas quando necessária.
- Garantir que nomes de arquivo, e-mails, rótulos e resumo quebrem linha sem criar rolagem horizontal.

## Preservar
- Manter os campos, máscaras, limites, obrigatoriedades e formatos de arquivo existentes.
- Não alterar o endereço do webhook, o formato dos dados enviados ou o workflow do n8n.
- Não adicionar autenticação, novas páginas ou armazenamento permanente de rascunhos.

## Detalhes técnicos
- Compartilhar a estrutura de etapas, progresso e ações entre os dois formulários, mantendo as validações existentes em React Hook Form e Zod.
- Manter o estado dos campos e arquivos durante a navegação interna, sem recriar o formulário a cada etapa.
- Definir cores e movimento no sistema de estilos e utilizar os controles existentes do projeto.
- Registrar a estrutura compartilhada no documento de arquitetura e as preferências visuais na memória do projeto durante a implementação.

## Verificação
- Executar os testes existentes de validação e dados enviados; acrescentar testes para avanço condicionado à validação e preservação dos valores entre etapas.
- Conferir no navegador os três caminhos: problema técnico, acesso individual e acesso em lote, incluindo revisão, volta para edição e tratamento de erro.
- Validar em celulares de 360 e 390 px e computadores de 1366 × 768 e 1920 × 1080, incluindo foco, rolagem, anexos e redução de movimento.
- Verificar o envio real ao n8n com dados de teste identificados e confirmar o retorno na tela; qualquer rejeição do workflow será relatada sem mudar suas regras nesta repaginada.