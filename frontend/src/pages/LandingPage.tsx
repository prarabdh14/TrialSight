import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { studies } from "@/data/mockData";
import { 
  FileText, 
  ChevronRight, 
  Activity, 
  Building2, 
  Users,
  Beaker,
  Heart,
  Brain,
  Wind,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const therapeuticIcons: Record<string, React.ReactNode> = {
  Oncology: <Beaker className="w-5 h-5" />,
  Cardiovascular: <Heart className="w-5 h-5" />,
  Neurology: <Brain className="w-5 h-5" />,
  Respiratory: <Wind className="w-5 h-5" />,
  Immunology: <Shield className="w-5 h-5" />,
};

const LandingPage = () => {
  const navigate = useNavigate();

  const activeStudies = studies.filter(s => s.status === "active");
  const pausedStudies = studies.filter(s => s.status === "paused");

  const getDQIColor = (dqi: number) => {
    if (dqi >= 80) return "text-emerald-600";
    if (dqi >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="clean">Active</Badge>;
      case "paused":
        return <Badge variant="pending">Paused</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">ClinicalDQI</h1>
                <p className="text-sm text-muted-foreground">Data Quality Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-foreground">JD</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Jane Doe</p>
                <p className="text-xs text-muted-foreground">Clinical Data Manager</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold text-foreground">Welcome back, Jane</h2>
          <p className="text-muted-foreground mt-2">
            Select a study to view its data quality dashboard and operational metrics.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-card border border-border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">{activeStudies.length}</p>
                  <p className="text-sm text-muted-foreground">Active Studies</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {studies.reduce((sum, s) => sum + s.totalSites, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Sites</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {studies.reduce((sum, s) => sum + s.totalPatients, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Study List */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Active Studies */}
        <section className="mb-8">
          <h3 className="section-header mb-4">Active Studies</h3>
          <div className="grid gap-4">
            {activeStudies.map((study) => (
              <div
                key={study.id}
                onClick={() => navigate(`/study/${study.id}`)}
                className="bg-card border border-border rounded-md p-5 cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary rounded-md text-muted-foreground">
                      {therapeuticIcons[study.therapeuticArea] || <Beaker className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{study.id}</h4>
                        {getStatusBadge(study.status)}
                        <Badge variant="secondary">{study.phase}</Badge>
                      </div>
                      <p className="text-sm text-foreground">{study.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {study.therapeuticArea} • {study.sponsor}
                      </p>
                      <div className="flex items-center gap-6 mt-3 text-sm">
                        <span className="text-muted-foreground">
                          <span className="font-medium text-foreground">{study.totalSites}</span> Sites
                        </span>
                        <span className="text-muted-foreground">
                          <span className="font-medium text-foreground">{study.totalPatients}</span> Patients
                        </span>
                        <span className="text-muted-foreground">
                          Updated{" "}
                          {new Date(study.lastUpdated).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">DQI Score</p>
                      <p className={cn("text-2xl font-semibold", getDQIColor(study.dqi))}>
                        {study.dqi}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Paused Studies */}
        {pausedStudies.length > 0 && (
          <section>
            <h3 className="section-header mb-4">Paused Studies</h3>
            <div className="grid gap-4">
              {pausedStudies.map((study) => (
                <div
                  key={study.id}
                  onClick={() => navigate(`/study/${study.id}`)}
                  className="bg-card border border-border rounded-md p-5 cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all opacity-75"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-secondary rounded-md text-muted-foreground">
                        {therapeuticIcons[study.therapeuticArea] || <Beaker className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{study.id}</h4>
                          {getStatusBadge(study.status)}
                          <Badge variant="secondary">{study.phase}</Badge>
                        </div>
                        <p className="text-sm text-foreground">{study.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {study.therapeuticArea} • {study.sponsor}
                        </p>
                        <div className="flex items-center gap-6 mt-3 text-sm">
                          <span className="text-muted-foreground">
                            <span className="font-medium text-foreground">{study.totalSites}</span> Sites
                          </span>
                          <span className="text-muted-foreground">
                            <span className="font-medium text-foreground">{study.totalPatients}</span> Patients
                          </span>
                          <span className="text-muted-foreground">
                            Last updated{" "}
                            {new Date(study.lastUpdated).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">DQI Score</p>
                        <p className={cn("text-2xl font-semibold", getDQIColor(study.dqi))}>
                          {study.dqi}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-sm text-muted-foreground text-center">
            ClinicalDQI Data Quality Platform • Novartis Pharmaceuticals
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
