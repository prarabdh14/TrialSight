import { useNavigate } from "react-router-dom";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { Alert } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AlertPanelProps {
  alerts: Alert[];
  maxItems?: number;
  studyId: string;
}

export function AlertPanel({ alerts, maxItems = 5, studyId }: AlertPanelProps) {
  const navigate = useNavigate();
  const displayAlerts = alerts.slice(0, maxItems);

  const getAlertIcon = (priority: Alert["priority"]) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "medium":
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getAlertClass = (priority: Alert["priority"]) => {
    switch (priority) {
      case "high":
        return "alert-critical";
      case "medium":
        return "alert-warning";
      default:
        return "alert-info";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const handleAlertClick = (alert: Alert) => {
    if (alert.type === "site") {
      navigate(`/study/${studyId}/site/${alert.entityId}`);
    }
  };

  return (
    <div className="bg-card border border-border rounded-md p-4">
      <h3 className="section-header">Critical Alerts</h3>
      <div className="space-y-3">
        {displayAlerts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No alerts for this study.</p>
        ) : (
          displayAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => handleAlertClick(alert)}
              className={cn("alert-item cursor-pointer", getAlertClass(alert.priority))}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getAlertIcon(alert.priority)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{alert.message}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="secondary" className="text-xs">
                    {alert.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {alert.entityId}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    • {formatTimestamp(alert.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
