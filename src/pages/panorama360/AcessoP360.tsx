import { ArrowLeft, LogIn, Globe, Key, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function AcessoP360() {
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
          <LogIn className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            {t('common.productDoc', { module: t('panorama360.title') })}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Acesso ao P360</h1>
          <p className="mt-1 text-muted-foreground">
            Como acessar e entrar na plataforma Panorama 360.
          </p>
        </div>
      </div>

      {/* Introdução */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-3">Introdução</h2>
        <p className="text-muted-foreground leading-relaxed">
          Considerando que o usuário recebeu as credenciais de acesso ao PMC P360, são fornecidas a seguir as instruções detalhadas sobre o processo de login.
        </p>
      </section>

      {/* Passo 1 */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
            1
          </div>
          <h2 className="text-xl font-semibold text-foreground">Passo 1: Como acessar o PMC P360</h2>
        </div>
        <div className="space-y-4 ml-11">
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">Abrir o Navegador</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Iniciar o navegador da sua escolha (Chrome, Firefox, dentre outros).</p>
          </div>
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">Digitar o URL do PMC P360</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Inserir o endereço do PMC P360 na barra de endereços, que pode ser algo como https://umonitor.embratelcloud.com.br/umonitor ou o URL específico fornecido pelo seu administrador de sistema.</p>
          </div>
        </div>
        {/* Imagem */}
        <div className="mt-6 rounded-lg border border-border overflow-hidden">
          <img 
            src="/images/panorama360/002_acessar_url.png" 
            alt="Acessar URL do PMC P360" 
            className="w-full h-auto"
          />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Tela de acesso ao PMC P360 via navegador</p>
        </div>
      </section>

      {/* Passo 2 */}
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
            2
          </div>
          <h2 className="text-xl font-semibold text-foreground">Passo 2: Como fazer o login</h2>
        </div>
        <div className="space-y-4 ml-11">
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">Tela de login</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Na página de login, inserir as credenciais (nome de usuário e senha). Se esta for a primeira vez que o usuário está acessando a plataforma, as credenciais padrão geralmente são enviadas no seu e-mail de onboard.</p>
          </div>
          <div className="border-l-2 border-primary/20 pl-4">
            <h3 className="font-medium text-foreground mb-1">Clicar em "Log in"</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Após incluir as credenciais, clicar no botão Log in para acessar o painel principal.</p>
          </div>
        </div>
        {/* Imagem */}
        <div className="mt-6 rounded-lg border border-border overflow-hidden">
          <img 
            src="/images/panorama360/003_insert_credenciais.png" 
            alt="Inserir credenciais de login" 
            className="w-full h-auto"
          />
          <p className="text-xs text-muted-foreground text-center py-2 bg-muted/30">Tela de login com campos para inserir credenciais</p>
        </div>
      </section>

      {/* Dica */}
      <section className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Dica</h3>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              Se você não recebeu suas credenciais ou esqueceu sua senha, entre em contato com o administrador do sistema para obter assistência.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
