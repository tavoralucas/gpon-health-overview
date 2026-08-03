import { useLocation } from "react-router-dom";

export interface PageContext {
  title: string;
  description: string;
  data: string;
}

export function usePageContext(): PageContext {
  const location = useLocation();
  const path = location.pathname;

  const contexts: Record<string, PageContext> = {
    "/panorama-360": {
      title: "Panorama 360",
      description: "Portal de documentação do produto Panorama 360 — plataforma de observabilidade e inteligência de dados para redes de telecomunicações.",
      data: `O Panorama 360 é uma plataforma de documentação que reúne informações sobre: Visão Geral, Portas, Circuitos, Excursionamentos e Tarefas. Cada tópico contém documentação técnica e informativa sobre o funcionamento do produto.`,
    },
    "/panorama-360/visao-geral": {
      title: "Panorama 360 — Visão Geral",
      description: "Documentação da Visão Geral do Panorama 360, abordando apresentação, características principais, funcionalidades, benefícios e tópicos abordados.",
      data: `Apresentação: O Panorama 360 é uma plataforma avançada de observabilidade e inteligência de dados, projetada para fornecer uma visão abrangente e em tempo real do desempenho e da saúde das redes de telecomunicações.

Principais Características:
- Monitoramento em Tempo Real: acompanhamento contínuo de todos os elementos da rede
- Análise Preditiva: algoritmos de machine learning para antecipar falhas e degradações
- Visibilidade End-to-End: visão completa desde o núcleo da rede até o cliente final
- Dashboards Personalizáveis: painéis configuráveis por perfil de usuário e necessidade operacional
- Alertas Inteligentes: sistema de notificações baseado em thresholds e anomalias detectadas automaticamente
- Integração com Sistemas Legados: compatível com OSS/BSS e demais ferramentas operacionais existentes

Funcionalidades Adicionais:
- Relatórios Automatizados: geração e distribuição automática de relatórios periódicos
- API RESTful: integração com sistemas externos via API documentada
- Controle de Acesso por Perfil: diferentes níveis de acesso e visualização por função
- Histórico de Dados: armazenamento e consulta de histórico de métricas e eventos
- Exportação de Dados: suporte a exportação em múltiplos formatos (CSV, PDF, Excel)

Benefícios:
- Redução do MTTR (Mean Time To Repair)
- Aumento da disponibilidade e qualidade dos serviços
- Tomada de decisão baseada em dados precisos e atualizados
- Otimização de recursos humanos e técnicos
- Melhoria contínua da experiência do cliente final

Tópicos Abordados na documentação: Introdução e Objetivos do Produto, Arquitetura e Componentes Técnicos, Guia de Configuração e Instalação, Manual de Operação e Uso, Integrações e APIs Disponíveis, Boas Práticas e Casos de Uso, Suporte e Resolução de Problemas.`,
    },
    "/cloud-orchestration": {
      title: "Cloud Orchestration",
      description: "Portal de documentação do produto Cloud Orchestration — solução para orquestração e automação de recursos em ambientes de nuvem.",
      data: `O Cloud Orchestration é um produto de documentação focado em orquestração de recursos de nuvem. Contém documentação técnica sobre seus tópicos disponíveis para consulta dos usuários.`,
    },
    "/cost-management": {
      title: "Cost Management",
      description: "Portal de documentação do produto Cost Management — gerenciamento e otimização de custos em infraestruturas de tecnologia.",
      data: `O Cost Management é um produto de documentação voltado ao gerenciamento de custos de infraestrutura de TI. Contém documentação técnica sobre seus tópicos disponíveis para consulta dos usuários.`,
    },
    "/finops-360": {
      title: "Finops 360",
      description: "Portal de documentação do produto Finops 360 — plataforma de visibilidade financeira e estratégias de economia em ambientes de nuvem e telecom.",
      data: `O Finops 360 é um produto de documentação focado em práticas de FinOps (Financial Operations), com ênfase em savings, otimização de gastos e governança financeira em infraestruturas de tecnologia.`,
    },
    "/mangue": {
      title: "Mangue",
      description: "Portal de documentação do produto Mangue — solução para gestão e automação de redes.",
      data: `O Mangue é um produto de documentação para gestão e automação de redes de telecomunicações. Contém documentação técnica sobre seus tópicos disponíveis para consulta dos usuários.`,
    },
    "/dci": {
      title: "DCI — Data Center Interconnect",
      description: "Portal de documentação do produto DCI (Data Center Interconnect) — solução para interconexão de data centers com alta disponibilidade e performance.",
      data: `O DCI (Data Center Interconnect) é um produto de documentação sobre interconexão de data centers. Os tópicos disponíveis são: Visão Geral, Portas, Circuitos, Excursionamentos e Tarefas. Cada tópico contém documentação técnica e informativa sobre o funcionamento do produto.`,
    },
  };

  return contexts[path] || {
    title: "Portal de Documentação",
    description: "Portal centralizado de documentação dos produtos de telecomunicações.",
    data: "Selecione um produto na navegação lateral para acessar sua documentação técnica.",
  };
}

