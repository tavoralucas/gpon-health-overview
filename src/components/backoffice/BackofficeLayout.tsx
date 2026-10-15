// Backoffice shell: sidebar + topbar sharing the Nova solicitação connectivity language

import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListChecks, PlusCircle, Users, LogOut, Waypoints } from 'lucide-react';
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
  SidebarHeader,
} from '@/components/ui/sidebar';
import { LoadingRows, useBrandFonts } from '@/components/effects/Connectivity';

interface Profile {
  name: string;
  email: string;
  role: string;
}

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/backoffice/dashboard', icon: LayoutDashboard },
  { label: 'Chamados', path: '/backoffice/chamados', icon: ListChecks },
  { label: 'Novo chamado', path: '/backoffice/chamados/novo', icon: PlusCircle },
];

function pageTitle(path: string) {
  if (path.endsWith('/chamados/novo')) return 'Novo chamado';
  if (path.includes('/chamados/')) return 'Detalhe do chamado';
  if (path.endsWith('/chamados')) return 'Chamados';
  if (path.endsWith('/agentes')) return 'Agentes';
  return 'Dashboard';
}

export function BackofficeLayout() {
  useBrandFonts();
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
        .maybeSingle();
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
    navItems.push({ label: 'Agentes', path: '/backoffice/agentes', icon: Users });
  }

  if (loading) {
    return <div className="mx-auto max-w-3xl pt-24"><LoadingRows rows={4} /></div>;
  }

  return (
    <SidebarProvider>
      <Sidebar className="bo-sidebar">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-3">
            <span className="bo-brand-mark"><Waypoints className="h-4 w-4" /></span>
            <span className="font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Backoffice <span className="text-primary">GPON.</span>
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegação</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => {
                  const active = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        onClick={() => navigate(item.path)}
                        isActive={active}
                        className={`bo-nav-item ${active ? 'is-active' : ''}`}
                      >
                        <span className="bo-nav-indicator" aria-hidden="true" />
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="bo-shell">
        <header className="bo-topbar">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger />
            <h1 className="truncate text-base font-semibold sm:text-lg">{pageTitle(location.pathname)}</h1>
          </div>
          <div className="flex items-center gap-3">
            {profile && (
              <div className="flex items-center gap-2">
                <span className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{profile.name?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                  <span className="bo-online-dot" aria-label="Online" />
                </span>
                <span className="hidden text-sm font-medium sm:inline">{profile.name}</span>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 sm:mr-1" /><span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
          <span className="bo-topbar-signal" aria-hidden="true" />
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <div key={location.pathname} className="bo-page-enter">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
