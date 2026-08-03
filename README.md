# Documentacao - Ustore

## Contexto do projeto

Aplicacao web de documentacao para os produtos da Ustore (Panorama 360, Cloud Orchestration, Cost Management, Finops 360, Mangue e DCI). O foco e centralizar conteudo tecnico e manuais em uma interface unica, com navegacao lateral por produto e paginas detalhadas por topico.

Recursos principais:

- Navegacao por produto e por topico
- Paginas de documentacao com layout unificado
- Assistente de chat com contexto da pagina

## Estrutura principal

- src/App.tsx: rotas e composicao geral
- src/components/AppLayout.tsx: layout base, sidebar e header
- src/pages: paginas por produto e topicos
- src/components/AIChatPanel.tsx: painel de chat com IA
- src/hooks/usePageContext.ts: contexto por rota para o chat

## Estrutura de rotas e paginas principais

As rotas sao definidas em [src/App.tsx](src/App.tsx). O layout base (sidebar, header e area de conteudo) fica em [src/components/AppLayout.tsx](src/components/AppLayout.tsx).

Rotas de nivel principal:

- /: panorama inicial e cards de topicos
- /panorama-360
- /cloud-orchestration
- /cost-management
- /finops-360
- /mangue
- /dci

Paginas principais por produto:

- Panorama 360: [src/pages/Panorama360.tsx](src/pages/Panorama360.tsx) e paginas em [src/pages/panorama360](src/pages/panorama360)
- Finops 360: [src/pages/Finops360.tsx](src/pages/Finops360.tsx) e paginas em [src/pages/finops360](src/pages/finops360)
- Mangue: [src/pages/Mangue.tsx](src/pages/Mangue.tsx) e paginas em [src/pages/mangue](src/pages/mangue)
- DCI: [src/pages/DCI.tsx](src/pages/DCI.tsx) e paginas em [src/pages/dci](src/pages/dci)
- Cost Management: [src/pages/CostManagement.tsx](src/pages/CostManagement.tsx) e paginas em [src/pages/cost-management](src/pages/cost-management)

## Requisitos

- Node.js 18+ (recomendado via nvm)
- npm

## Como rodar localmente

```sh
npm i
npm run dev
```

O Vite exibira a URL local no terminal.

## Variaveis de ambiente

Crie um arquivo .env com:

```sh
VITE_SUPABASE_URL="https://<seu-projeto>.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="<sua-chave-publica>"
```

Essas variaveis sao usadas pelo chat e pela camada de persistencia no Supabase.

## Tecnologias

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn-ui
- Supabase
