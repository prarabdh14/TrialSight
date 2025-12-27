import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "warning" | "success" | "danger";
}

export function KPICard({
  title,
  value,
  subtitle,
  icon,
  variant = "default",
}: KPICardProps) {
  return (
    <div className="kpi-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p
            className={cn(
              "text-3xl font-semibold mt-2",
              variant === "warning" && "text-amber-600",
              variant === "danger" && "text-red-600",
              variant === "success" && "text-emerald-600",
              variant === "default" && "text-foreground"
            )}
          >
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "p-2 rounded-md",
              variant === "warning" && "bg-amber-100 text-amber-600",
              variant === "danger" && "bg-red-100 text-red-600",
              variant === "success" && "bg-emerald-100 text-emerald-600",
              variant === "default" && "bg-secondary text-muted-foreground"
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
