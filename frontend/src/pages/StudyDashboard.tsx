import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { SiteTable } from "@/components/dashboard/SiteTable";
import { AlertPanel } from "@/components/dashboard/AlertPanel";
import { getStudyInfo, getSitesByStudy, getAlertsByStudy } from "@/data/mockData";
import {
  Activity,
  Users,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

const StudyDashboard = () => {
  const { studyId } = useParams<{ studyId: string }>();
  
  const studyInfo = getStudyInfo(studyId || "");
  const sites = getSitesByStudy(studyId || "");
  const alerts = getAlertsByStudy(studyId || "");

  if (!studyInfo) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <p className="text-muted-foreground">Study not found</p>
          <Link to="/" className="text-primary hover:underline mt-2 inline-block">
            Return to study selection
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  // Sort sites by risk (high first, then by DQI ascending)
  const sortedSites = [...sites].sort((a, b) => {
    const riskOrder = { high: 0, medium: 1, low: 2 };
    if (riskOrder[a.riskLevel] !== riskOrder[b.riskLevel]) {
      return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
    }
    return a.dqi - b.dqi;
  });

  return (
    <DashboardLayout>
      {/* Page Header */}
      <header className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {studyInfo.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {studyInfo.sponsor}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Data Snapshot</p>
              <p className="text-sm font-medium text-foreground">
                {new Date(studyInfo.snapshotDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8 space-y-6">
        {/* KPI Cards */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Study DQI Score"
              value={studyInfo.overallDQI}
              subtitle={`Target: ≥80`}
              icon={<Activity className="w-5 h-5" />}
              variant={studyInfo.overallDQI >= 80 ? "success" : "warning"}
            />
            <KPICard
              title="Clean Patients"
              value={`${studyInfo.cleanPatientPercentage}%`}
              subtitle={`${Math.round(studyInfo.totalPatients * studyInfo.cleanPatientPercentage / 100)} of ${studyInfo.totalPatients}`}
              icon={<Users className="w-5 h-5" />}
              variant={studyInfo.cleanPatientPercentage >= 80 ? "success" : "warning"}
            />
            <KPICard
              title="High-Risk Sites"
              value={studyInfo.highRiskSites}
              subtitle={`of ${studyInfo.totalSites} total sites`}
              icon={<AlertTriangle className="w-5 h-5" />}
              variant={studyInfo.highRiskSites > 2 ? "danger" : "default"}
            />
            <KPICard
              title="Pending SAEs"
              value={studyInfo.pendingSAEs}
              subtitle="Requires immediate attention"
              icon={<ShieldAlert className="w-5 h-5" />}
              variant={studyInfo.pendingSAEs > 5 ? "danger" : studyInfo.pendingSAEs > 0 ? "warning" : "success"}
            />
          </div>
        </section>

        {/* Main Grid - Table and Alerts */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Site Risk Table */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="section-header">Site Risk Overview</h2>
              <p className="text-sm text-muted-foreground">
                Click on a site to view detailed data quality analysis
              </p>
            </div>
            <SiteTable sites={sortedSites} studyId={studyId || ""} />
          </div>

          {/* Alerts Panel */}
          <div className="lg:col-span-1">
            <AlertPanel alerts={alerts} maxItems={6} studyId={studyId || ""} />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default StudyDashboard;
