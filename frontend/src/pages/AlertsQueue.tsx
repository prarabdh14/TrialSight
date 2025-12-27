import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { getAlertsByStudy, sites, patients } from "@/data/mockData";
import { AlertTriangle, AlertCircle, Info, ChevronRight } from "lucide-react";

const AlertsQueue = () => {
  const { studyId } = useParams<{ studyId: string }>();
  const navigate = useNavigate();

  const alerts = getAlertsByStudy(studyId || "");

  // Sort alerts by priority (high first)
  const sortedAlerts = [...alerts].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const getAlertIcon = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "medium":
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getPriorityBadge = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return <Badge variant="priorityHigh">High Priority</Badge>;
      case "medium":
        return <Badge variant="priorityMedium">Medium Priority</Badge>;
      default:
        return <Badge variant="priorityLow">Low Priority</Badge>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAlertClick = (alert: typeof alerts[0]) => {
    if (alert.type === "site") {
      navigate(`/study/${studyId}/site/${alert.entityId}`);
    } else if (alert.type === "patient") {
      navigate(`/study/${studyId}/patient/${alert.entityId}`);
    }
  };

  const getEntityInfo = (alert: typeof alerts[0]) => {
    if (alert.type === "site") {
      const site = sites.find((s) => s.id === alert.entityId);
      return site ? `${site.id} • ${site.country}` : alert.entityId;
    } else if (alert.type === "patient") {
      const patient = patients.find((p) => p.id === alert.entityId);
      if (patient) {
        const site = sites.find((s) => s.id === patient.siteId);
        return site ? `${patient.id} • ${site.country}` : patient.id;
      }
    }
    return alert.entityId;
  };

  const highPriorityCount = alerts.filter((a) => a.priority === "high").length;
  const mediumPriorityCount = alerts.filter((a) => a.priority === "medium").length;

  return (
    <DashboardLayout>
      {/* Page Header */}
      <header className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-xl font-semibold text-foreground">
            Alerts & Action Queue
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Prioritized list of items requiring attention
          </p>
        </div>
      </header>

      {/* Summary Stats */}
      <div className="px-8 py-4 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Total Alerts:</span>
            <span className="text-sm font-semibold text-foreground">{alerts.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-sm text-muted-foreground">High Priority:</span>
            <span className="text-sm font-semibold text-red-600">{highPriorityCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-sm text-muted-foreground">Medium Priority:</span>
            <span className="text-sm font-semibold text-amber-600">{mediumPriorityCount}</span>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="p-8">
        {sortedAlerts.length === 0 ? (
          <div className="bg-card border border-border rounded-md p-8 text-center">
            <p className="text-muted-foreground">No alerts for this study.</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-md overflow-hidden">
            {sortedAlerts.map((alert, index) => (
              <div
                key={alert.id}
                onClick={() => handleAlertClick(alert)}
                className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-secondary/30 transition-colors ${
                  index !== sortedAlerts.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex-shrink-0">
                  {getAlertIcon(alert.priority)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    {getPriorityBadge(alert.priority)}
                    <Badge variant="secondary">{alert.category}</Badge>
                    <Badge variant="outline" className="capitalize">
                      {alert.type}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{getEntityInfo(alert)}</span>
                    <span>•</span>
                    <span>{formatTimestamp(alert.timestamp)}</span>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AlertsQueue;
