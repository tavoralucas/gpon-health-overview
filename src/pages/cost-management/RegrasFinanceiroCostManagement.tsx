import { ArrowLeft, Settings, DollarSign, Calendar, Tag, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function RegrasFinanceiroCostManagement() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/cost-management")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('costManagement.title') })}
      </button>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <TrendingDown className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('costManagement.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Regras do Financeiro</h1>
          <p className="mt-1 text-muted-foreground">
            Configuração e gestão de regras financeiras
          </p>
        </div>
      </div>

      {/* Acessando Regras do Financeiro */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4">Acessando Regras do Financeiro</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Para acessar o card de Regras do Financeiro é necessário clicar no menu <strong>Administração</strong> disposto do lado esquerdo da tela. 
            A opção <strong>Contratos</strong> deve ser selecionada.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_regra_fatura/002_primeiros_passos.png" 
              alt="Primeiros passos" 
              className="rounded-lg border border-border max-w-2xl"
            />
          </div>

          <p>
            Na listagem constam informações dos nomes dos contratos, os administradores, o número de CPF/CNPJ, o estado do contrato 
            (ativo ou inativo), e uma coluna de ações que possibilita clonar às informações do contrato selecionado.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_regra_fatura/004_regras_do_financeiro.png" 
              alt="Regras do financeiro" 
              className="rounded-lg border border-border max-w-2xl"
            />
          </div>
        </div>
      </section>

      {/* Card Regras do Financeiro */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Card Regras do Financeiro
        </h2>
        
        <p className="text-muted-foreground">
          No card constam os seguintes itens:
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold mb-2">Moeda</h3>
            <p className="text-sm text-muted-foreground">
              Opções disponíveis: BRL, USD, MXN, EUR, COP
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold mb-2">Formatação da Data</h3>
            <p className="text-sm text-muted-foreground">
              MM/DD/YYYY, DD/MM/YYYY ou YYYY/MM/DD
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold mb-2">Casas Decimais</h3>
            <p className="text-sm text-muted-foreground">
              Define o tamanho de casas decimais nos relatórios
            </p>
          </div>

          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold mb-2">Dia da Fatura</h3>
            <p className="text-sm text-muted-foreground">
              Determina o dia de fechamento da fatura
            </p>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mt-4">
          <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Para Clientes GOV e ETICE</h3>
          <p className="text-amber-800 dark:text-amber-200">
            Além dos itens descritos acima, a plataforma também apresenta o item <strong>Perfil de tagueamento</strong>. 
            Exclusiva para USN, essa funcionalidade permite ao usuário selecionar um Tag Profile.
          </p>
        </div>
      </section>

      {/* Regras de Faturamento */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Regra de Faturamento
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Esta feature está relacionada às informações presentes nos relatórios de <em>Billing</em>, destacando o valor do uso 
            gerado pelas nuvens e a(s) regra(s) de faturamento criadas no portal uCloud.
          </p>

          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200">
              Nesse processo de bilhetagem, a plataforma toma como base de referência o valor consumido pelo usuário na nuvem e 
              a regra de faturamento definida. <strong>Não há um limite máximo</strong> para a quantidade das regras de faturamento que 
              podem ser criadas em um contrato.
            </p>
          </div>

          <h3 className="font-semibold text-foreground mt-4">Operações disponíveis:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Adicionar nova(s) regra(s) de Faturamento</li>
            <li>Visualizar as configurações e detalhamento da(s) regra(s) de faturamento já criada(s)</li>
            <li>Excluir a(s) regras(s) de Faturamento criada(s)</li>
            <li>Atualizar a listagem de regras de Faturamento</li>
          </ul>
        </div>
      </section>

      {/* Criando Regra de Faturamento */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground">Criando Regra de Faturamento</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Para cadastrar uma nova regra de faturamento, basta clicar no botão <code className="px-2 py-1 bg-muted rounded">+Adicionar</code> e 
            preencher os campos de configuração do modal "Criar regra de faturamento":
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_regra_fatura/006_criar_regra_faturamento.png" 
              alt="Criar regra de faturamento" 
              className="rounded-lg border border-border max-w-2xl"
            />
          </div>

          <h3 className="font-semibold text-foreground mt-4">Campos do modal:</h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-muted rounded-lg">
              <strong>1. Selecione o início de vigência:</strong> Define a data em que a regra criada passa a ser válida
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <strong>2. Configuração de regras:</strong> Divididas em 4 tipos:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Regras de faturamento gerais</li>
                <li>Regras de faturamento de marketplace</li>
                <li>Regras de faturamento de suporte</li>
                <li>Regras de faturamento por tag</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_regra_fatura/007_Taxa_e_cotação.png" 
              alt="Taxa e cotação" 
              className="rounded-lg border border-border max-w-2xl"
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200">
              Por padrão, todas vêm preenchidas com os campos de taxa de faturamento e cotação do dólar com o numeral 1. 
              Caso o usuário deseje alterar esse valor, basta preencher o campo com o número pretendido.
            </p>
          </div>
        </div>
      </section>

      {/* Regras de Faturamento por Tag */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          Regras de Faturamento por Tag
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            No campo "Regras de faturamento por tag" a plataforma exibe um modal que possibilita ao usuário incluir TAGs às regras 
            de faturamento criadas, cadastrando taxas financeiras fixas por Tag.
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-yellow-800 dark:text-yellow-200">
              Caso não exista nenhuma Tag cadastrada com valor específico, a plataforma utiliza o valor do histórico de 
              faturamento normal, atrelado ao contrato.
            </p>
          </div>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_regra_fatura/009_regra_faturamento_tag.png" 
              alt="Regra faturamento tag" 
              className="rounded-lg border border-border max-w-2xl"
            />
          </div>

          <h3 className="font-semibold text-foreground mt-4">Campos para adicionar Tag:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Nome:</strong> Preenchido com o nome da TAG</li>
            <li><strong>Valor:</strong> Preenchido com a chave/valor da TAG a ser adicionada</li>
            <li><strong>Custo:</strong> Preenchido com o custo a ser inserido sobre a TAG (padrão: 1,0)</li>
          </ul>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_regra_fatura/012_conclusão_criação.png" 
              alt="Conclusão criação" 
              className="rounded-lg border border-border max-w-2xl"
            />
          </div>

          <p>
            Concluído o preenchimento de todas as informações, deve-se clicar no botão <code className="px-2 py-1 bg-muted rounded">Criar</code>.
          </p>
        </div>
      </section>

      {/* Visualização e Ações */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground">Atualização da Listagem</h2>
        
        <div className="space-y-4 text-muted-foreground">
          <p>
            Encerrado o processo de criação, pode-se clicar no botão <code className="px-2 py-1 bg-muted rounded">Atualizar</code> localizado 
            no modal "Regras do financeiro", essa operação possibilita a renovação da listagem das regras de faturamento criadas para o contrato.
          </p>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_regra_fatura/015_atualizar_listagem.png" 
              alt="Atualizar listagem" 
              className="rounded-lg border border-border max-w-2xl"
            />
          </div>

          <p>
            No modal existem as colunas alusivas ao nome do usuário responsável pela criação da regra de faturamento, a data de criação, 
            o início de vigência e uma coluna de ações com dois botões:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Detalhes</h3>
              <p className="text-sm text-muted-foreground">
                Apresenta todos os dados e valores da regra de faturamento selecionada
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold mb-2">Exclusão</h3>
              <p className="text-sm text-muted-foreground">
                Permite deletar uma das regras de faturamento criadas
              </p>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <img 
              src="/images/cost-management/fig_regra_fatura/016_detalhes_regras.png" 
              alt="Detalhes regras" 
              className="rounded-lg border border-border max-w-2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
