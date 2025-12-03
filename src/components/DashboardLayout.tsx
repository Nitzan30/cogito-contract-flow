import { ReactNode } from "react";
import { Home, FileText, Bell, BarChart3, Settings, FileCheck, Globe, Calendar, Building2 } from "lucide-react";
import { NavLink } from "@/components/NavLink";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navItems = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/executive-summary", icon: Globe, label: "Executive Summary" },
    { to: "/portfolio", icon: Building2, label: "Portfolio" },
    { to: "/contracts", icon: FileText, label: "Contracts" },
    { to: "/alerts", icon: Bell, label: "Alerts" },
    { to: "/analytics", icon: BarChart3, label: "Analytics" },
    { to: "/compliance", icon: FileCheck, label: "Compliance" },
    { to: "/project-plan", icon: Calendar, label: "Project Plan" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold text-foreground">BudgetMaster 360 AGENT</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-lg p-2 hover:bg-secondary">
              <Bell className="h-5 w-5" />
            </button>
            <button className="rounded-lg p-2 hover:bg-secondary">
              <Settings className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container flex gap-6 py-6">
        {/* Sidebar Navigation */}
        <aside className="w-56 shrink-0">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeClassName="bg-secondary text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};
