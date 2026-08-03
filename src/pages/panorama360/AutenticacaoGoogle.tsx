import { ArrowLeft, Cloud, Shield, CheckCircle2, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const securityOptions = [
  {
    title: "Validate Hosted Domain",
    description: "Garante que apenas usuários de domínios específicos possam autenticar, validando o domínio do e-mail do usuário."
  },
  {
    title: "Allowed Groups",
    description: "Restringe o acesso a membros de grupos específicos definidos no provedor de identidade. Apenas usuários pertencentes a esses grupos podem fazer login."
  },
  {
    title: "Use PKCE",
    description: "Adiciona segurança ao uso do OAuth2, prevenindo ataques de interceptação durante a autenticação."
  },
  {
    title: "TLS Skip Verify",
    description: "Ignora a verificação de certificados SSL/TLS, aceitando qualquer certificado apresentado pelo servidor. Esta opção deve ser usada apenas para testes, pois pode ser vulnerável a ataques."
  }
];

export default function AutenticacaoGoogle() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/panorama-360")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backTo', { module: t('panorama360.title') })}
      </button>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <Cloud className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Autenticando com o Google Cloud</h1>
          <p className="mt-1 text-muted-foreground">
            Guia de autenticação e integração com o Google Cloud.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Sobre a Autenticação</h2>
        <p className="text-muted-foreground leading-relaxed">
          Neste tópico segue a descrição e passo a passo completos para autenticação com o Google Cloud, 
          todas as indicações de como configurar a obtenção de credenciais no Google Cloud. Em seguida, 
          o ajuste a ser realizado no PMC P360 e as recomendações de segurança e opções adicionais.
        </p>
      </section>

      {/* Passo 1 */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
            1
          </div>
          <h2 className="text-xl font-semibold text-foreground">Passo 1: Obtenção das credenciais no Google Cloud</h2>
        </div>
        <ul className="space-y-3 ml-11">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Acessar o Google Cloud Console (https://console.developers.google.com/apis/credentials).</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Clicar em "Criar credenciais" e selecionar a opção "Aplicativo da Web".</span>
          </li>
        </ul>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border overflow-hidden">
            <img src="/images/panorama360/044_print1_gmail.png" alt="Criar credenciais" className="w-full h-auto" />
            <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Criar credenciais no Google Cloud</p>
          </div>
          <div className="rounded-lg border border-border overflow-hidden">
            <img src="/images/panorama360/045_print2_gmail.png" alt="Aplicativo da Web" className="w-full h-auto" />
            <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Selecionar Aplicativo da Web</p>
          </div>
        </div>
        <ul className="space-y-3 ml-11 mt-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Escolher um nome para o cliente OAuth (este nome serve apenas para identificação no console do Google).</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Adicionar as URLs do PMC P360 na lista de cabeçalhos autorizados.</span>
          </li>
        </ul>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/046_print3_gmail.png" alt="URLs de redirecionamento" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Configurar URLs de redirecionamento autorizadas</p>
        </div>
        <ul className="space-y-3 ml-11 mt-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Clicar em "Salvar".</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Copiar o ID do Cliente e a Chave Secreta do Cliente.</span>
          </li>
        </ul>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/047_print4_gmail.png" alt="ID do Cliente e Chave Secreta" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">ID do Cliente e Chave Secreta gerados</p>
        </div>
      </section>

      {/* Passo 2 */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
            2
          </div>
          <h2 className="text-xl font-semibold text-foreground">Passo 2: Configurando no PMC P360</h2>
        </div>
        <ul className="space-y-3 ml-11">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Ao acessar o PMC P360 seguir para a aba Administração depois selecionar Autenticação (é necessário ter os privilégios do administrador).</span>
          </li>
        </ul>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/048_print5_umonitor.png" alt="Autenticação no PMC P360" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Acessar configurações de Autenticação</p>
        </div>
        <ul className="space-y-3 ml-11 mt-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Escolher uma das opções disponíveis (todas usam o protocolo OAuth). Este exemplo descreve a utilização do Google.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Configurar os campos: Client ID (colar o ID do Cliente copiado) e Client Secret (colar a Chave Secreta).</span>
          </li>
        </ul>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/049_print6_umonitor.png" alt="Configurar campos OAuth" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Campos de configuração Client ID e Client Secret</p>
        </div>
      </section>

      {/* Passo 3 */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
            3
          </div>
          <h2 className="text-xl font-semibold text-foreground">Passo 3: Configurações de Segurança</h2>
        </div>
        <ul className="space-y-3 ml-11">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">É recomendado desabilitar a opção "Allow sign up". Por questões de segurança, este procedimento deve ser realizado.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Com essa opção desativada, apenas usuários existentes no PMC P360 podem realizar o login via OAuth.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span className="text-sm text-muted-foreground leading-relaxed">Após as configurações, clicar em "Salvar".</span>
          </li>
        </ul>
        <div className="mt-4 rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/050_print7_save.png" alt="Salvar configurações" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Salvar configurações de segurança</p>
        </div>
      </section>

      {/* Opções Adicionais de Segurança */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Opções Adicionais de Segurança</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {securityOptions.map(({ title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resultado Final */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Resultado Final</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Finalizado este procedimento, é possível visualizar a opção de "Sign in with Google" na página de login do PMC P360.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <img src="/images/panorama360/051_print8_login.png" alt="Sign in with Google" className="w-full h-auto" />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Opção de login com Google disponível</p>
        </div>
      </section>

      {/* Aviso */}
      <section className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">Importante</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
              Certifique-se de salvar todas as configurações antes de sair da página.
              A recomendação de segurança é sempre desabilitar a opção "Allow sign up".
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
