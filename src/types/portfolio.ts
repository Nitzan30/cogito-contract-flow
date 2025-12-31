// Domain types
export type Domain = 'REFM' | 'TIR' | 'Physical Security' | 'EHS Facility' | 'Others';
export type Region = 'NA' | 'CALA' | 'APAC' | 'IND' | 'ISR' | 'EMEA';
export type SiteType = 'Amdocs Site' | 'FSO' | 'VO' | 'Customer Site' | 'Parking';
export type SiteStatus = 'Active' | 'Under Review' | 'Approved to Close' | 'Keep & Reduce' | 'Closed';
export type ProgramStatus = 'Not Evaluated' | 'Under Review' | 'Check – Regulatory' | 'Check – Legal' | 'Check – Admin/Security' | 'Recommend Closure' | 'Retain & Optimize';
export type ProgramDecision = 'Pending' | 'Recommend Closure' | 'Retain & Optimize';

// Site Entity - L4
export interface Site {
  id: string;
  siteName: string;
  address: string;
  city: string;
  country: string;
  region: Region;
  siteType: SiteType;
  status: SiteStatus;
  sqm: number;
  adminOwnerName: string;
  adminOwnerEmail: string;
  
  // General Info & Management
  buildingCode: string;
  buildingTypeName: string;
  unit: string; // GO or BU
  generalManager: string;
  siteLeadership: string;
  
  // Operational metrics
  headcount: number;
  workstations: number;
  capacity: number;
  attendancePercent: number;
  occupancyPercent: number;
  businessUnit: string;
  utilizationRate: number;
  rentableArea: number;
  planonBuildingStatus: string;
  
  // Financials
  realEstateAmount: number;
  facilityManagementAmount: number;
  mealsAmount: number;
  transportationAmount: number;
  depreciationAmount: number;
  ehsCost: number;
  totalCost: number;
  costPerEmployee: number;
  costPerSeat: number;
  fy25Actual: number;
  fy26Projection: number;
  potentialSavings: number;
  
  // Contract & Legal
  contractStartDate: string;
  contractEndDate: string;
  notificationDate?: string;
  regulation?: string;
  commentsLog?: string;
  statusSummary?: string;
  
  // Domain tags
  isREFM: boolean;
  isTIR: boolean;
  isEHS: boolean;
  isPhysicalSecurity: boolean;
  isOther: boolean;
  
  // TIR specific
  itNetworkStatus?: string;
  criticalInfrastructureFlag?: boolean;
  resilienceInvestments?: number;
  outagesCount?: number;
  uptimePercent?: number;
  disasterRecoveryPlanFlag?: boolean;
  commentsIT?: string;
  
  // Physical Security specific
  securitySystemType?: string;
  securityLevel?: string;
  incidentLogsSummary?: string;
  securityUpgradeCost?: number;
  securityComplianceStatus?: string;
  commentsSecurity?: string;
  
  // EHS specific
  ehsComplianceStatus?: string;
  incidentReportsCount?: number;
  regulatoryComments?: string;
  lastAuditDate?: string;
  commentsEHS?: string;
  
  // Small Site Program
  isSmallSiteCandidate: boolean;
  programStatus: ProgramStatus;
  programDecision: ProgramDecision;
  regulatoryNotes?: string;
  legalNotes?: string;
  adminSecurityNotes?: string;
  decisionComments?: string;
  
  // Flags
  isNegativeCostAnomaly: boolean;
  isHighCost: boolean;
  isLowUtilization: boolean;
}

// Aggregation types
export interface DomainSummary {
  domain: Domain;
  totalBudget: number;
  siteCount: number;
  avgOccupancy: number;
  avgAttendance: number;
  smallSiteCandidates: number;
}

export interface RegionSummary {
  region: Region;
  totalBudget: number;
  siteCount: number;
  avgOccupancy: number;
  avgAttendance: number;
  smallSiteCandidates: number;
  domains: Domain[];
}

export interface GlobalSummary {
  totalBudget: number;
  totalSites: number;
  avgOccupancy: number;
  avgAttendance: number;
  smallSiteCandidates: number;
  domainBreakdown: DomainSummary[];
  regionBreakdown: RegionSummary[];
}

// Settings
export interface SmallSiteProgramSettings {
  sqmThreshold: number;
  budgetThreshold: number;
  attendanceThreshold: number;
  consecutiveMonthsThreshold: number;
}
