export type InsightSeverity = "critical" | "high" | "medium" | "low";
export type InsightConfidence = "high" | "medium" | "low";
export type InsightCategory = "anomaly" | "predictive" | "vendor";

export interface InsightCard {
  id: string;
  category: InsightCategory;
  title: string;
  whatHappened: string;
  whyItMatters: string;
  scope: string;
  suggestedAction: string;
  severity: InsightSeverity;
  confidence: InsightConfidence;
  timeframe?: string;
  source?: string;
  createdAt: string;
}

export const mockInsights: InsightCard[] = [
  // Anomaly Detection
  {
    id: "ai-001",
    category: "anomaly",
    title: "Unusual Spend Spike – Facility Management (India)",
    whatHappened: "Facility management costs at Bangalore Campus increased 34% month-over-month, exceeding the peer-site baseline by 2.1 standard deviations.",
    whyItMatters: "If unchecked, this trend could add ~$420K to FY25 actuals. The spike correlates with a new FM vendor onboarded in Q3.",
    scope: "Site: Bangalore Campus · Domain: Facility Management",
    suggestedAction: "Review the new FM vendor invoice breakdown and compare rates against the previous provider. Consider requesting a cost reconciliation report.",
    severity: "high",
    confidence: "high",
    createdAt: "2026-01-14",
  },
  {
    id: "ai-002",
    category: "anomaly",
    title: "Attendance Drop Below Threshold – Tel Aviv HQ",
    whatHappened: "Average daily attendance at Tel Aviv HQ dropped to 47% over the past 30 days, down from a 12-month average of 68%.",
    whyItMatters: "Low attendance impacts cost-per-seat metrics and may indicate underutilization. Current monthly cost per seat is $1,840—41% above the regional average.",
    scope: "Site: Tel Aviv HQ · Domain: Real Estate",
    suggestedAction: "Coordinate with HR to assess if this is seasonal or structural. Evaluate space consolidation options for Q2.",
    severity: "medium",
    confidence: "high",
    createdAt: "2026-01-13",
  },
  {
    id: "ai-003",
    category: "anomaly",
    title: "Duplicate Invoice Pattern – CALA Region",
    whatHappened: "3 invoices from vendor 'ServiClean LATAM' show identical amounts ($12,340) across different site codes within a 7-day window.",
    whyItMatters: "This pattern is consistent with duplicate billing. Potential financial exposure: $24,680.",
    scope: "Region: CALA · Vendor: ServiClean LATAM",
    suggestedAction: "Flag invoices for AP review. Cross-reference with Ariba PO records and request vendor clarification.",
    severity: "critical",
    confidence: "medium",
    createdAt: "2026-01-15",
  },
  {
    id: "ai-004",
    category: "anomaly",
    title: "EHS Incident Rate Increase – North America",
    whatHappened: "EHS incident reports across NA sites increased 28% in the last quarter compared to the same period last year.",
    whyItMatters: "Rising incident rates pose compliance and safety risks. Two sites are approaching regulatory audit thresholds.",
    scope: "Region: North America · Domain: EHS",
    suggestedAction: "Initiate a targeted safety review at the top 3 incident-reporting sites. Update training protocols.",
    severity: "high",
    confidence: "medium",
    createdAt: "2026-01-12",
  },

  // Predictive Insights
  {
    id: "ai-005",
    category: "predictive",
    title: "Budget Overrun Risk – EMEA Region by Q3",
    whatHappened: "Based on current burn rate trends, EMEA regional spend is projected to exceed FY25 budget allocation by 8.2% ($1.31M) by end of Q3.",
    whyItMatters: "Early intervention could prevent a formal budget revision request. The primary driver is transportation cost escalation (+18% YoY).",
    scope: "Region: EMEA · Domain: Transportation",
    suggestedAction: "Review transportation contracts for renegotiation opportunities. Consider route optimization or provider consolidation.",
    severity: "high",
    confidence: "high",
    timeframe: "Action needed within 45 days to avoid impact",
    createdAt: "2026-01-14",
  },
  {
    id: "ai-006",
    category: "predictive",
    title: "Lease Expiration Cluster – 7 Sites in 90 Days",
    whatHappened: "7 site leases across 3 regions are expiring within the next 90 days. 4 of these have no renewal action logged in Planon.",
    whyItMatters: "Unaddressed expirations risk service disruption and may force unfavorable renewal terms under time pressure.",
    scope: "Global · Domain: Real Estate",
    suggestedAction: "Prioritize renewal discussions for the 4 sites without action. Engage procurement for competitive benchmarking.",
    severity: "critical",
    confidence: "high",
    timeframe: "Immediate – 90-day window closing",
    createdAt: "2026-01-15",
  },
  {
    id: "ai-007",
    category: "predictive",
    title: "Meals Cost Trending Upward – India Region",
    whatHappened: "Per-employee meal costs in India have increased 12% over 6 months, tracking above inflation (7.4%).",
    whyItMatters: "At current trajectory, FY25 meals budget for India will overrun by ~$180K. This is driven by headcount growth without contract renegotiation.",
    scope: "Region: India · Domain: Meals",
    suggestedAction: "Negotiate volume-based pricing with current meal providers. Explore alternative catering partnerships.",
    severity: "medium",
    confidence: "medium",
    timeframe: "Recommended action within 30 days",
    createdAt: "2026-01-13",
  },

  // Vendor Intelligence
  {
    id: "ai-008",
    category: "vendor",
    title: "Vendor Concentration Risk – JLL (Facility Management)",
    whatHappened: "JLL now manages 62% of all FM contracts globally (up from 48% last year). Single-vendor dependency across 28 sites.",
    whyItMatters: "High vendor concentration creates operational risk. Any service disruption would impact the majority of the portfolio simultaneously.",
    scope: "Global · Vendor: JLL · Domain: Facility Management",
    suggestedAction: "Develop a vendor diversification roadmap. Identify 2-3 alternative FM providers for strategic sites. Consider a pilot program.",
    severity: "high",
    confidence: "high",
    createdAt: "2026-01-14",
  },
  {
    id: "ai-009",
    category: "vendor",
    title: "Cost Inconsistency – Sodexo Across Regions",
    whatHappened: "Sodexo's per-meal pricing varies by 43% across comparable sites ($4.20 in India vs. $6.00 in CALA for similar service level).",
    whyItMatters: "Price inconsistency suggests potential for contract harmonization savings estimated at $95K annually.",
    scope: "Global · Vendor: Sodexo · Domain: Meals",
    suggestedAction: "Initiate a global contract review with Sodexo. Use the lowest-cost site as a benchmark for renegotiation.",
    severity: "medium",
    confidence: "high",
    source: "Market alternative: Compass Group offers competitive rates in CALA region.",
    createdAt: "2026-01-12",
  },
  {
    id: "ai-010",
    category: "vendor",
    title: "Vendor SLA Non-Compliance – SecureGuard (APAC)",
    whatHappened: "SecureGuard has missed SLA response time targets in 5 of the last 8 months across APAC physical security contracts.",
    whyItMatters: "Continued non-compliance poses security risk and contractual penalty exposure. Two sites reported delayed incident response.",
    scope: "Region: APAC · Vendor: SecureGuard · Domain: Physical Security",
    suggestedAction: "Issue formal SLA breach notification. Evaluate contract penalty clauses and begin market assessment for backup providers.",
    severity: "high",
    confidence: "high",
    source: "Market alternative: Securitas and G4S both operate in the APAC region.",
    createdAt: "2026-01-15",
  },
];

export const aiDashboardIndicators = {
  anomaliesDetected: 4,
  predictiveAlerts: 3,
  vendorFlags: 3,
  criticalInsights: 2,
  avgConfidence: 82,
  insightsThisWeek: 6,
  riskScore: 72,
};
