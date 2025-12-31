import { ReactNode } from "react";
import { Home, FileText, Bell, BarChart3, Settings, FileCheck, Calendar, MapPin, Users } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { GlobalSearch } from "@/components/GlobalSearch";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navItems = [
    { to: "/executive-summary", icon: Home, label: "Executive Dashboard" },
    { to: "/vendor-intelligence", icon: Users, label: "Vendor Intelligence" },
    { to: "/regions", icon: MapPin, label: "Regions" },
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
        <div className="container flex h-16 items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <FileCheck className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold text-foreground hidden sm:block">SiteLense360</h1>
          </div>
          
          {/* Centered Global Search */}
          <div className="flex-1 flex justify-center px-4">
            <GlobalSearch />
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
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
