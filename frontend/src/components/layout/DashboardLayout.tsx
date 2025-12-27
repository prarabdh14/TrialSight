import { ReactNode } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  LayoutDashboard,
  AlertTriangle,
  FileText,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const { studyId } = useParams<{ studyId: string }>();

  const navigation = [
    { name: "All Studies", href: "/", icon: Home },
    { name: "Study Overview", href: `/study/${studyId}`, icon: LayoutDashboard },
    { name: "Alerts Queue", href: `/study/${studyId}/alerts`, icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-primary rounded-md flex items-center justify-center">
              <FileText className="w-4 h-4 text-sidebar-primary-foreground" />
            </div>
            <div>
              <span className="text-sm font-semibold text-sidebar-foreground">
                ClinicalDQI
              </span>
              <span className="block text-xs text-sidebar-foreground/60">
                Data Quality Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-sidebar-foreground">
                JD
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-sidebar-foreground">
                Jane Doe
              </span>
              <span className="block text-xs text-sidebar-foreground/60">
                Clinical Data Manager
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
