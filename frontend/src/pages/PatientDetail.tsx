import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, Clock } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { patients, sites } from "@/data/mockData";
import { cn } from "@/lib/utils";

const PatientDetail = () => {
  const { studyId, patientId } = useParams<{ studyId: string; patientId: string }>();
  
  const patient = patients.find((p) => p.id === patientId);
  const site = patient ? sites.find((s) => s.id === patient.siteId) : null;

  if (!patient || !site) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <p className="text-muted-foreground">Patient not found</p>
          <Link to={`/study/${studyId}`} className="text-primary hover:underline mt-2 inline-block">
            Return to dashboard
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusIcon = (isGood: boolean) => {
    return isGood ? (
      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-600" />
    );
  };

  const getCodingStatusBadge = () => {
    switch (patient.codingStatus) {
      case "complete":
        return <Badge variant="clean">Complete</Badge>;
      case "pending":
        return <Badge variant="pending">Pending</Badge>;
      case "incomplete":
        return <Badge variant="notClean">Incomplete</Badge>;
    }
  };

  const getSAEStatusBadge = () => {
    switch (patient.saeStatus) {
      case "none":
        return <Badge variant="secondary">None</Badge>;
      case "resolved":
        return <Badge variant="clean">Resolved</Badge>;
      case "pending":
        return <Badge variant="pending">Pending</Badge>;
      case "overdue":
        return <Badge variant="riskHigh">Overdue</Badge>;
    }
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <header className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <Link
            to={`/study/${studyId}/site/${patient.siteId}`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {site.id}
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">{patient.id}</h1>
                <Badge variant={patient.isClean ? "clean" : "notClean"}>
                  {patient.isClean ? "Clean" : "Not Clean"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {site.id} • {site.country}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Patient DQI</p>
              <p className={cn(
                "text-3xl font-semibold",
                patient.dqi >= 80 ? "text-emerald-600" : patient.dqi >= 60 ? "text-amber-600" : "text-red-600"
              )}>
                {patient.dqi}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Missing Visits */}
          <div className="bg-card border border-border rounded-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Missing Visits
              </h3>
              {getStatusIcon(patient.missingVisits === 0)}
            </div>
            <div className={cn(
              "text-4xl font-semibold",
              patient.missingVisits === 0 ? "text-emerald-600" : "text-red-600"
            )}>
              {patient.missingVisits}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {patient.missingVisits === 0 
                ? "All scheduled visits completed" 
                : `${patient.missingVisits} visit(s) need to be scheduled or documented`}
            </p>
          </div>

          {/* Missing Pages */}
          <div className="bg-card border border-border rounded-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Missing Pages
              </h3>
              {getStatusIcon(patient.missingPages === 0)}
            </div>
            <div className={cn(
              "text-4xl font-semibold",
              patient.missingPages === 0 ? "text-emerald-600" : "text-red-600"
            )}>
              {patient.missingPages}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {patient.missingPages === 0 
                ? "All CRF pages complete" 
                : `${patient.missingPages} page(s) require data entry`}
            </p>
          </div>

          {/* Open Queries */}
          <div className="bg-card border border-border rounded-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Open Queries
              </h3>
              {patient.openQueries === 0 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : patient.openQueries <= 2 ? (
                <AlertCircle className="w-4 h-4 text-amber-600" />
              ) : (
                <XCircle className="w-4 h-4 text-red-600" />
              )}
            </div>
            <div className={cn(
              "text-4xl font-semibold",
              patient.openQueries === 0 ? "text-emerald-600" : patient.openQueries <= 2 ? "text-amber-600" : "text-red-600"
            )}>
              {patient.openQueries}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {patient.openQueries === 0 
                ? "No outstanding queries" 
                : `${patient.openQueries} query(ies) awaiting response`}
            </p>
          </div>

          {/* Coding Status */}
          <div className="bg-card border border-border rounded-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Coding Status
              </h3>
              {getStatusIcon(patient.codingStatus === "complete")}
            </div>
            <div className="mb-2">
              {getCodingStatusBadge()}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              MedDRA / WHO Drug Coding
            </p>
            <div className="mt-3 text-sm">
              {patient.codingStatus === "complete" ? (
                <span className="text-emerald-600">All terms coded and verified</span>
              ) : patient.codingStatus === "pending" ? (
                <span className="text-amber-600">Coding in progress</span>
              ) : (
                <span className="text-red-600">Requires medical coder review</span>
              )}
            </div>
          </div>

          {/* SAE Status */}
          <div className="bg-card border border-border rounded-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Safety (SAE) Status
              </h3>
              {patient.saeStatus === "none" || patient.saeStatus === "resolved" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : patient.saeStatus === "pending" ? (
                <Clock className="w-4 h-4 text-amber-600" />
              ) : (
                <XCircle className="w-4 h-4 text-red-600" />
              )}
            </div>
            <div className="mb-2">
              {getSAEStatusBadge()}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Serious Adverse Events
            </p>
            <div className="mt-3 text-sm">
              {patient.saeStatus === "none" ? (
                <span className="text-muted-foreground">No SAEs reported</span>
              ) : patient.saeStatus === "resolved" ? (
                <span className="text-emerald-600">All SAEs resolved and documented</span>
              ) : patient.saeStatus === "pending" ? (
                <span className="text-amber-600">SAE review in progress</span>
              ) : (
                <span className="text-red-600">Overdue SAE requires immediate attention</span>
              )}
            </div>
          </div>

          {/* Overall Status Summary */}
          <div className={cn(
            "border rounded-md p-5",
            patient.isClean 
              ? "bg-emerald-50 border-emerald-200" 
              : "bg-red-50 border-red-200"
          )}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Overall Status
              </h3>
              {patient.isClean ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div className={cn(
              "text-lg font-semibold",
              patient.isClean ? "text-emerald-700" : "text-red-700"
            )}>
              {patient.isClean ? "Patient Record is Clean" : "Patient Record Requires Attention"}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {patient.isClean 
                ? "This patient has no outstanding issues and is ready for database lock." 
                : "This patient has data quality issues that must be resolved before database lock."}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDetail;
