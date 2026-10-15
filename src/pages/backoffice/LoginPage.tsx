// T-006: Login page — email + password form

import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Waypoints } from 'lucide-react';
import { ConnectivityArt, FlowFooter, useBrandFonts } from '@/components/effects/Connectivity';

export function LoginPage() {
  const { t } = useTranslation();
  useBrandFonts();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
      return;
    }

    const redirect = searchParams.get('redirect') || '/backoffice/dashboard';
    navigate(redirect, { replace: true });
  };

  return (
    <div className="solicitation-page flex min-h-screen items-center justify-center px-5">
      <div className="connection-banner"><ConnectivityArt /></div>
      <div className="bo-page-enter relative w-full max-w-md">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 bo-brand-mark is-lg"><Waypoints className="h-6 w-6" /></div>
          <CardTitle className="text-2xl">Backoffice <span className="text-primary">GPON.</span></CardTitle>
          <CardDescription>Faça login para acessar o painel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full min-h-11" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <FlowFooter />
      </div>
    </div>
  );
}
