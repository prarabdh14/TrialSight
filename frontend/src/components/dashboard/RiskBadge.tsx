import { Badge } from "@/components/ui/badge";

interface RiskBadgeProps {
  level: "high" | "medium" | "low";
}

export function RiskBadge({ level }: RiskBadgeProps) {
  const variants = {
    high: "riskHigh" as const,
    medium: "riskMedium" as const,
    low: "riskLow" as const,
  };

  const labels = {
    high: "High Risk",
    medium: "Medium Risk",
    low: "Low Risk",
  };

  return <Badge variant={variants[level]}>{labels[level]}</Badge>;
}
