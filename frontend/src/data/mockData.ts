// Mock data for Clinical Trial Dashboard

export interface Study {
  id: string;
  name: string;
  phase: string;
  therapeuticArea: string;
  sponsor: string;
  status: "active" | "completed" | "paused";
  totalSites: number;
  totalPatients: number;
  dqi: number;
  lastUpdated: string;
}

export interface Site {
  id: string;
  studyId: string;
  country: string;
  dqi: number;
  riskLevel: 'high' | 'medium' | 'low';
  patientsEnrolled: number;
  openQueries: number;
  pendingSAEs: number;
  overdueVisits: number;
}

export interface Patient {
  id: string;
  siteId: string;
  dqi: number;
  isClean: boolean;
  missingVisits: number;
  missingPages: number;
  openQueries: number;
  codingStatus: 'complete' | 'pending' | 'incomplete';
  saeStatus: 'none' | 'pending' | 'resolved' | 'overdue';
}

export interface Alert {
  id: string;
  studyId: string;
  priority: 'high' | 'medium' | 'low';
  type: 'site' | 'patient' | 'study';
  entityId: string;
  message: string;
  timestamp: string;
  category: string;
}

export interface DQIBreakdown {
  category: string;
  score: number;
  maxScore: number;
  issues: string[];
}

// Multiple studies
export const studies: Study[] = [
  {
    id: "NOVA-2024-001",
    name: "Phase III Oncology Study",
    phase: "Phase III",
    therapeuticArea: "Oncology",
    sponsor: "Novartis Pharmaceuticals",
    status: "active",
    totalSites: 24,
    totalPatients: 486,
    dqi: 78,
    lastUpdated: "2024-12-27",
  },
  {
    id: "CARD-2024-002",
    name: "Cardiovascular Outcomes Trial",
    phase: "Phase II",
    therapeuticArea: "Cardiovascular",
    sponsor: "Novartis Pharmaceuticals",
    status: "active",
    totalSites: 18,
    totalPatients: 312,
    dqi: 85,
    lastUpdated: "2024-12-26",
  },
  {
    id: "NEUR-2023-015",
    name: "Neurological Disorder Efficacy Study",
    phase: "Phase III",
    therapeuticArea: "Neurology",
    sponsor: "Novartis Pharmaceuticals",
    status: "active",
    totalSites: 32,
    totalPatients: 624,
    dqi: 72,
    lastUpdated: "2024-12-27",
  },
  {
    id: "RESP-2024-008",
    name: "Respiratory Disease Prevention Trial",
    phase: "Phase II",
    therapeuticArea: "Respiratory",
    sponsor: "Novartis Pharmaceuticals",
    status: "paused",
    totalSites: 12,
    totalPatients: 186,
    dqi: 91,
    lastUpdated: "2024-12-20",
  },
  {
    id: "IMMU-2023-022",
    name: "Immunotherapy Combination Study",
    phase: "Phase I",
    therapeuticArea: "Immunology",
    sponsor: "Novartis Pharmaceuticals",
    status: "active",
    totalSites: 8,
    totalPatients: 64,
    dqi: 88,
    lastUpdated: "2024-12-25",
  },
];

export const getStudyInfo = (studyId: string) => {
  const study = studies.find(s => s.id === studyId);
  if (!study) return null;
  
  const studySites = sites.filter(s => s.studyId === studyId);
  const highRiskSites = studySites.filter(s => s.riskLevel === 'high').length;
  const pendingSAEs = studySites.reduce((sum, s) => sum + s.pendingSAEs, 0);
  
  return {
    name: `${study.id}: ${study.name}`,
    sponsor: study.sponsor,
    snapshotDate: study.lastUpdated,
    overallDQI: study.dqi,
    cleanPatientPercentage: study.dqi >= 80 ? 82 : study.dqi >= 70 ? 72 : 65,
    highRiskSites,
    pendingSAEs,
    totalSites: study.totalSites,
    totalPatients: study.totalPatients,
  };
};

export const sites: Site[] = [
  // NOVA-2024-001 sites
  { id: "SITE-001", studyId: "NOVA-2024-001", country: "United States", dqi: 45, riskLevel: "high", patientsEnrolled: 42, openQueries: 28, pendingSAEs: 3, overdueVisits: 8 },
  { id: "SITE-002", studyId: "NOVA-2024-001", country: "Germany", dqi: 52, riskLevel: "high", patientsEnrolled: 38, openQueries: 22, pendingSAEs: 2, overdueVisits: 12 },
  { id: "SITE-003", studyId: "NOVA-2024-001", country: "United Kingdom", dqi: 88, riskLevel: "low", patientsEnrolled: 35, openQueries: 4, pendingSAEs: 0, overdueVisits: 1 },
  { id: "SITE-004", studyId: "NOVA-2024-001", country: "France", dqi: 65, riskLevel: "medium", patientsEnrolled: 28, openQueries: 14, pendingSAEs: 1, overdueVisits: 5 },
  { id: "SITE-005", studyId: "NOVA-2024-001", country: "Japan", dqi: 91, riskLevel: "low", patientsEnrolled: 45, openQueries: 2, pendingSAEs: 0, overdueVisits: 0 },
  { id: "SITE-006", studyId: "NOVA-2024-001", country: "Canada", dqi: 58, riskLevel: "medium", patientsEnrolled: 22, openQueries: 18, pendingSAEs: 1, overdueVisits: 4 },
  { id: "SITE-007", studyId: "NOVA-2024-001", country: "Australia", dqi: 82, riskLevel: "low", patientsEnrolled: 31, openQueries: 6, pendingSAEs: 0, overdueVisits: 2 },
  { id: "SITE-008", studyId: "NOVA-2024-001", country: "Spain", dqi: 48, riskLevel: "high", patientsEnrolled: 26, openQueries: 25, pendingSAEs: 2, overdueVisits: 9 },
  { id: "SITE-009", studyId: "NOVA-2024-001", country: "Italy", dqi: 71, riskLevel: "medium", patientsEnrolled: 33, openQueries: 11, pendingSAEs: 1, overdueVisits: 3 },
  { id: "SITE-010", studyId: "NOVA-2024-001", country: "Brazil", dqi: 44, riskLevel: "high", patientsEnrolled: 29, openQueries: 31, pendingSAEs: 2, overdueVisits: 11 },
  { id: "SITE-011", studyId: "NOVA-2024-001", country: "South Korea", dqi: 86, riskLevel: "low", patientsEnrolled: 40, openQueries: 5, pendingSAEs: 0, overdueVisits: 1 },
  { id: "SITE-012", studyId: "NOVA-2024-001", country: "Netherlands", dqi: 79, riskLevel: "low", patientsEnrolled: 24, openQueries: 7, pendingSAEs: 0, overdueVisits: 2 },
  // CARD-2024-002 sites
  { id: "SITE-101", studyId: "CARD-2024-002", country: "United States", dqi: 88, riskLevel: "low", patientsEnrolled: 52, openQueries: 5, pendingSAEs: 0, overdueVisits: 1 },
  { id: "SITE-102", studyId: "CARD-2024-002", country: "Germany", dqi: 84, riskLevel: "low", patientsEnrolled: 45, openQueries: 8, pendingSAEs: 0, overdueVisits: 2 },
  { id: "SITE-103", studyId: "CARD-2024-002", country: "France", dqi: 76, riskLevel: "medium", patientsEnrolled: 38, openQueries: 12, pendingSAEs: 1, overdueVisits: 3 },
  // NEUR-2023-015 sites
  { id: "SITE-201", studyId: "NEUR-2023-015", country: "United States", dqi: 62, riskLevel: "medium", patientsEnrolled: 48, openQueries: 18, pendingSAEs: 2, overdueVisits: 6 },
  { id: "SITE-202", studyId: "NEUR-2023-015", country: "Japan", dqi: 45, riskLevel: "high", patientsEnrolled: 55, openQueries: 32, pendingSAEs: 4, overdueVisits: 10 },
  { id: "SITE-203", studyId: "NEUR-2023-015", country: "United Kingdom", dqi: 89, riskLevel: "low", patientsEnrolled: 42, openQueries: 3, pendingSAEs: 0, overdueVisits: 0 },
];

export const getSitesByStudy = (studyId: string) => {
  return sites.filter(s => s.studyId === studyId);
};

export const patients: Patient[] = [
  { id: "PAT-001-001", siteId: "SITE-001", dqi: 42, isClean: false, missingVisits: 3, missingPages: 5, openQueries: 4, codingStatus: "incomplete", saeStatus: "overdue" },
  { id: "PAT-001-002", siteId: "SITE-001", dqi: 55, isClean: false, missingVisits: 2, missingPages: 3, openQueries: 2, codingStatus: "pending", saeStatus: "pending" },
  { id: "PAT-001-003", siteId: "SITE-001", dqi: 38, isClean: false, missingVisits: 4, missingPages: 7, openQueries: 5, codingStatus: "incomplete", saeStatus: "overdue" },
  { id: "PAT-001-004", siteId: "SITE-001", dqi: 91, isClean: true, missingVisits: 0, missingPages: 0, openQueries: 0, codingStatus: "complete", saeStatus: "none" },
  { id: "PAT-001-005", siteId: "SITE-001", dqi: 62, isClean: false, missingVisits: 1, missingPages: 2, openQueries: 3, codingStatus: "pending", saeStatus: "resolved" },
  { id: "PAT-002-001", siteId: "SITE-002", dqi: 48, isClean: false, missingVisits: 2, missingPages: 4, openQueries: 3, codingStatus: "incomplete", saeStatus: "pending" },
  { id: "PAT-002-002", siteId: "SITE-002", dqi: 85, isClean: true, missingVisits: 0, missingPages: 1, openQueries: 1, codingStatus: "complete", saeStatus: "none" },
  { id: "PAT-002-003", siteId: "SITE-002", dqi: 52, isClean: false, missingVisits: 3, missingPages: 5, openQueries: 4, codingStatus: "pending", saeStatus: "overdue" },
  { id: "PAT-003-001", siteId: "SITE-003", dqi: 94, isClean: true, missingVisits: 0, missingPages: 0, openQueries: 0, codingStatus: "complete", saeStatus: "none" },
  { id: "PAT-003-002", siteId: "SITE-003", dqi: 88, isClean: true, missingVisits: 0, missingPages: 0, openQueries: 1, codingStatus: "complete", saeStatus: "resolved" },
  { id: "PAT-004-001", siteId: "SITE-004", dqi: 68, isClean: false, missingVisits: 1, missingPages: 2, openQueries: 2, codingStatus: "pending", saeStatus: "pending" },
  { id: "PAT-005-001", siteId: "SITE-005", dqi: 96, isClean: true, missingVisits: 0, missingPages: 0, openQueries: 0, codingStatus: "complete", saeStatus: "none" },
];

export const alerts: Alert[] = [
  { id: "ALT-001", studyId: "NOVA-2024-001", priority: "high", type: "site", entityId: "SITE-001", message: "3 unresolved SAE reviews pending >7 days", timestamp: "2024-12-27T08:30:00Z", category: "Safety" },
  { id: "ALT-002", studyId: "NOVA-2024-001", priority: "high", type: "site", entityId: "SITE-010", message: "Query backlog increased by 40% in past 2 weeks", timestamp: "2024-12-27T07:15:00Z", category: "Data Quality" },
  { id: "ALT-003", studyId: "NOVA-2024-001", priority: "high", type: "site", entityId: "SITE-002", message: "12 overdue visits detected - immediate attention required", timestamp: "2024-12-26T16:45:00Z", category: "Compliance" },
  { id: "ALT-004", studyId: "NOVA-2024-001", priority: "medium", type: "patient", entityId: "PAT-001-001", message: "Patient has 3 consecutive missed visits", timestamp: "2024-12-26T14:20:00Z", category: "Compliance" },
  { id: "ALT-005", studyId: "NOVA-2024-001", priority: "medium", type: "site", entityId: "SITE-008", message: "MedDRA coding incomplete for 8 patients", timestamp: "2024-12-26T11:00:00Z", category: "Coding" },
  { id: "ALT-006", studyId: "NOVA-2024-001", priority: "high", type: "study", entityId: "STUDY", message: "Overall DQI dropped below 80% threshold", timestamp: "2024-12-25T09:30:00Z", category: "Data Quality" },
  { id: "ALT-007", studyId: "NOVA-2024-001", priority: "medium", type: "site", entityId: "SITE-004", message: "Principal Investigator signature pending for 5 patients", timestamp: "2024-12-25T08:00:00Z", category: "Verification" },
  { id: "ALT-008", studyId: "NOVA-2024-001", priority: "low", type: "site", entityId: "SITE-009", message: "Minor protocol deviation reported - documentation pending", timestamp: "2024-12-24T15:30:00Z", category: "Compliance" },
  { id: "ALT-009", studyId: "NEUR-2023-015", priority: "high", type: "site", entityId: "SITE-202", message: "4 SAE reviews overdue - critical attention needed", timestamp: "2024-12-27T09:00:00Z", category: "Safety" },
  { id: "ALT-010", studyId: "CARD-2024-002", priority: "medium", type: "site", entityId: "SITE-103", message: "Query response time exceeding SLA", timestamp: "2024-12-26T10:00:00Z", category: "Data Quality" },
];

export const getAlertsByStudy = (studyId: string) => {
  return alerts.filter(a => a.studyId === studyId);
};

export const getDQIBreakdown = (siteId: string): DQIBreakdown[] => {
  const site = sites.find(s => s.id === siteId);
  if (!site) return [];
  
  const baseScore = site.dqi;
  return [
    { 
      category: "Safety & SAE Issues", 
      score: Math.max(0, baseScore - 10 + Math.floor(Math.random() * 20)), 
      maxScore: 100,
      issues: site.pendingSAEs > 0 ? [`${site.pendingSAEs} pending SAE reviews`] : []
    },
    { 
      category: "Visit Compliance", 
      score: Math.max(0, baseScore - 5 + Math.floor(Math.random() * 15)), 
      maxScore: 100,
      issues: site.overdueVisits > 0 ? [`${site.overdueVisits} overdue visits`] : []
    },
    { 
      category: "Query & Data Completeness", 
      score: Math.max(0, baseScore + Math.floor(Math.random() * 10)), 
      maxScore: 100,
      issues: site.openQueries > 10 ? [`${site.openQueries} open queries require attention`] : []
    },
    { 
      category: "Coding & Regulatory Readiness", 
      score: Math.max(0, baseScore - 8 + Math.floor(Math.random() * 18)), 
      maxScore: 100,
      issues: baseScore < 60 ? ["MedDRA coding incomplete"] : []
    },
    { 
      category: "Verification & Signatures", 
      score: Math.max(0, baseScore - 3 + Math.floor(Math.random() * 12)), 
      maxScore: 100,
      issues: baseScore < 70 ? ["PI signatures pending"] : []
    },
  ];
};

export const getAIInsights = (siteId: string): string[] => {
  const site = sites.find(s => s.id === siteId);
  if (!site) return [];
  
  const insights: string[] = [];
  
  if (site.riskLevel === 'high') {
    insights.push(`This site is classified as HIGH RISK with a DQI score of ${site.dqi}. Immediate CRA intervention is recommended.`);
  }
  
  if (site.pendingSAEs > 0) {
    insights.push(`${site.pendingSAEs} SAE reviews are pending. Safety data must be prioritized for regulatory compliance.`);
  }
  
  if (site.overdueVisits > 5) {
    insights.push(`${site.overdueVisits} patient visits are overdue by more than 30 days. Schedule site contact to address scheduling issues.`);
  }
  
  if (site.openQueries > 15) {
    insights.push(`Query backlog of ${site.openQueries} items is above threshold. Consider targeted data cleaning session.`);
  }
  
  if (insights.length === 0) {
    insights.push(`Site performance is within acceptable parameters. Continue routine monitoring.`);
  }
  
  return insights;
};
