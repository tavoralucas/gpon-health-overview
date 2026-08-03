import { useState } from "react";
import claroLogo from "@/assets/claro-cloud-logo.png.asset.json";
import { Outlet, useLocation } from "react-router-dom";
import { AIChatPanel } from "@/components/AIChatPanel";
import DocPager from "@/components/DocPager";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  Globe,
  Cloud,
  TrendingDown,
  PieChart,
  Leaf,
  Network,
  BookOpen,
  Radar } from
"lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const menuItems: MenuItem[] = [
// { title: "Panorama 360", url: "/panorama-360", icon: Globe },
// { title: "Cloud Orchestration", url: "/cloud-orchestration", icon: Cloud },
{ title: "Cost Management", url: "/cost-management", icon: TrendingDown },
// { title: "Finops 360", url: "/finops-360", icon: PieChart },
// { title: "Mangue", url: "/mangue", icon: Leaf },
// { title: "DCI", url: "/dci", icon: Network },
{ title: "Incognito - GPON 360", url: "/gpon-360", icon: Radar },

];


export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-card px-4 shadow-sm">
        {/* Left: Logo + hamburger */}
        <div className="flex items-center gap-3">
          <img src={claroLogo.url} alt="Claro Cloud" className="h-9 w-auto" />
        </div>

        {/* Right: Documentação badge + Language Switcher */}
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <BookOpen className="h-4 w-4" />
            {t('common.documentation')}
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "sticky top-14 h-[calc(100vh-3.5rem)] shrink-0 border-r bg-card transition-all duration-200 overflow-y-auto",
            sidebarOpen ? "w-56" : "w-0 overflow-hidden border-r-0"
          )}>

          <div className="px-3 pb-2 pt-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              {t('sidebar.documentation')}
            </p>
          </div>

          <nav className="flex flex-col gap-0.5 px-2">
            {menuItems.map((item) =>
            <NavLink
              key={item.url}
              to={item.url}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              activeClassName="bg-primary text-primary-foreground hover:bg-primary/90">

                <item.icon className="h-[18px] w-[18px] shrink-0" />
                <span>{item.title}</span>
              </NavLink>
            )}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-background">
          <Outlet />
          <DocPager />
        </main>
      </div>

      {/* AI Chat Panel - available on all pages */}
      <AIChatPanel />
    </div>);

}