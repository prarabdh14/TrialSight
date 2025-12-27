import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Site } from "@/data/mockData";
import { RiskBadge } from "./RiskBadge";
import { cn } from "@/lib/utils";

interface SiteTableProps {
  sites: Site[];
  studyId: string;
}

export function SiteTable({ sites, studyId }: SiteTableProps) {
  const navigate = useNavigate();

  const getDQIColor = (dqi: number) => {
    if (dqi >= 80) return "text-emerald-600";
    if (dqi >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="bg-card border border-border rounded-md overflow-hidden">
      <table className="data-table">
        <thead>
          <tr>
            <th>Site ID</th>
            <th>Country</th>
            <th>DQI Score</th>
            <th>Risk Level</th>
            <th>Patients</th>
            <th>Open Queries</th>
            <th>Pending SAEs</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr
              key={site.id}
              onClick={() => navigate(`/study/${studyId}/site/${site.id}`)}
              className="cursor-pointer"
            >
              <td className="font-medium">{site.id}</td>
              <td>{site.country}</td>
              <td>
                <span className={cn("font-semibold", getDQIColor(site.dqi))}>
                  {site.dqi}
                </span>
              </td>
              <td>
                <RiskBadge level={site.riskLevel} />
              </td>
              <td>{site.patientsEnrolled}</td>
              <td>
                <span
                  className={cn(
                    site.openQueries > 15
                      ? "text-red-600 font-medium"
                      : "text-foreground"
                  )}
                >
                  {site.openQueries}
                </span>
              </td>
              <td>
                <span
                  className={cn(
                    site.pendingSAEs > 0
                      ? "text-red-600 font-medium"
                      : "text-foreground"
                  )}
                >
                  {site.pendingSAEs}
                </span>
              </td>
              <td>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
