// T-005: BackofficeLayout with sidebar and topbar

import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { useTranslation } from 'react-i18next';

interface Profile {
  name: string;
  email: string;
  role: string;
}

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/backoffice/dashboard', icon: '📊' },
  { label: 'Chamados', path: '/backoffice/chamados', icon: '📋' },
  { label: 'Novo Chamado', path: '/backoffice/chamados/novo', icon: '➕' },
];

export function BackofficeLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      const { data } = await supabase
        .from('profiles')
        .select('name, email, role')
        .eq('id', session.user.id)
        .single();
      setProfile(data);
      setLoading(false);
    }
    loadProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const navItems = [...NAV_ITEMS];
  if (profile?.role === 'admin') {
    navItems.push({ label: 'Agentes', path: '/backoffice/agentes', icon: '👥' });
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Backoffice</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.path)}
                      isActive={location.pathname === item.path}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between border-b px-6 py-3">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Backoffice de Chamados</h1>
          </div>
          <div className="flex items-center gap-4">
            {profile && (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {profile.name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{profile.name}</span>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
