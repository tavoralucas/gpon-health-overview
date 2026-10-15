// T-004b: RequireAdmin guard component
// Checks if the authenticated user has role === 'admin'.
// If not admin → redirect to /backoffice/dashboard.
// Renders children when OK.

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<{ role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;

      if (!session) {
        setError(true);
        setLoading(false);
        return;
      }

      const { data: userProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle();

      if (!cancelled) {
        setProfile(userProfile);
        setLoading(false);
      }
    }

    check();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (error || !profile || profile.role !== 'admin') {
    return <Navigate to="/backoffice/dashboard" replace />;
  }

  return <>{children}</>;
}
