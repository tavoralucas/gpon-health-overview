// T-004: RequireAuth guard component
// Checks Supabase session + profile record.
// If no session → redirect to /login with ?redirect= param.
// If session but no profile or profile status ≠ active → show "Acesso não autorizado".
// Renders children when OK.

import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  role: string;
  status: string;
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [session, setSession] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (cancelled) return;

      if (!currentSession) {
        setSession(null);
        setLoading(false);
        return;
      }

      setSession(currentSession);

      const { data: userProfile } = await supabase
        .from('profiles')
        .select('id, role, status')
        .eq('id', currentSession.user.id)
        .single();

      if (!cancelled) {
        setProfile(userProfile);
        setLoading(false);
      }
    }

    check();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      check();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!session) {
    const redirect = location.pathname + location.search;
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`} replace />;
  }

  if (!profile || profile.status !== 'active') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Acesso não autorizado</h1>
          <p className="mt-2 text-muted-foreground">
            Você não tem permissão para acessar o backoffice.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
