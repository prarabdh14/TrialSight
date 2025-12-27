import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Lightbulb } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RiskBadge } from "@/components/dashboard/RiskBadge";
import { Badge } from "@/components/ui/badge";
import { sites, patients, getDQIBreakdown, getAIInsights } from "@/data/mockData";
import { cn } from "@/lib/utils";

const SiteDetail = () => {
  const { studyId, siteId } = useParams<{ studyId: string; siteId: string }>();
  const navigate = useNavigate();
  
  const site = sites.find((s) => s.id === siteId);
  const sitePatients = patients.filter((p) => p.siteId === siteId);
  const dqiBreakdown = getDQIBreakdown(siteId || "");
  const aiInsights = getAIInsights(siteId || "");

  if (!site) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <p className="text-muted-foreground">Site not found</p>
          <Link to={`/study/${studyId}`} className="text-primary hover:underline mt-2 inline-block">
            Return to dashboard
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const getDQIColor = (dqi: number) => {
    if (dqi >= 80) return "text-emerald-600";
    if (dqi >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <header className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <Link
            to={`/study/${studyId}`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Study Overview
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">{site.id}</h1>
                <RiskBadge level={site.riskLevel} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{site.country}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Data Quality Index</p>
              <p className={cn("text-3xl font-semibold", getDQIColor(site.dqi))}>
                {site.dqi}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8 space-y-6">
        {/* DQI Breakdown */}
        <section>
          <h2 className="section-header mb-4">DQI Score Breakdown</h2>
          <div className="bg-card border border-border rounded-md p-5">
            <div className="space-y-4">
              {dqiBreakdown.map((item) => (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {item.category}
                    </span>
                    <span className={cn("text-sm font-semibold", getDQIColor(item.score))}>
                      {item.score}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", getProgressColor(item.score))}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  {item.issues.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {item.issues.map((issue, idx) => (
                        <li key={idx} className="text-sm text-red-600 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-red-600" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Insights */}
        <section>
          <h2 className="section-header mb-4">AI Insights & Recommended Actions</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-5">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="space-y-3">
                {aiInsights.map((insight, idx) => (
                  <p key={idx} className="text-sm text-blue-900">
                    {insight}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Patient List */}
        <section>
          <div className="mb-4">
            <h2 className="section-header">Patient List</h2>
            <p className="text-sm text-muted-foreground">
              {sitePatients.length} patients enrolled at this site
            </p>
          </div>
          <div className="bg-card border border-border rounded-md overflow-hidden">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>DQI Score</th>
                  <th>Status</th>
                  <th>Missing Visits</th>
                  <th>Open Queries</th>
                  <th>SAE Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sitePatients.map((patient) => (
                  <tr
                    key={patient.id}
                    onClick={() => navigate(`/study/${studyId}/patient/${patient.id}`)}
                    className="cursor-pointer"
                  >
                    <td className="font-medium">{patient.id}</td>
                    <td>
                      <span className={cn("font-semibold", getDQIColor(patient.dqi))}>
                        {patient.dqi}
                      </span>
                    </td>
                    <td>
                      <Badge variant={patient.isClean ? "clean" : "notClean"}>
                        {patient.isClean ? "Clean" : "Not Clean"}
                      </Badge>
                    </td>
                    <td>
                      <span className={cn(patient.missingVisits > 0 && "text-red-600 font-medium")}>
                        {patient.missingVisits}
                      </span>
                    </td>
                    <td>
                      <span className={cn(patient.openQueries > 2 && "text-amber-600 font-medium")}>
                        {patient.openQueries}
                      </span>
                    </td>
                    <td>
                      <Badge
                        variant={
                          patient.saeStatus === "overdue"
                            ? "riskHigh"
                            : patient.saeStatus === "pending"
                            ? "pending"
                            : patient.saeStatus === "resolved"
                            ? "clean"
                            : "secondary"
                        }
                      >
                        {patient.saeStatus === "none" ? "None" : patient.saeStatus}
                      </Badge>
                    </td>
                    <td>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default SiteDetail;
