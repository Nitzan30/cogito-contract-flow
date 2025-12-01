import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, TrendingUp, AlertCircle, DollarSign, FileText, Target, TicketIcon, Accessibility } from "lucide-react";

const regions = [
  { code: "IND", name: "India", contracts: 42, value: 43000000, expiring: 4, compliance: 96, fyRemaining: 17420000 },
  { code: "ISR", name: "Israel", contracts: 28, value: 47000000, expiring: 3, compliance: 94, fyRemaining: 18330000 },
  { code: "NA", name: "North America", contracts: 89, value: 35000000, expiring: 7, compliance: 95, fyRemaining: 14000000 },
  { code: "CALA", name: "Central America & Latin America", contracts: 31, value: 10000000, expiring: 2, compliance: 92, fyRemaining: 4000000 },
  { code: "APAC", name: "Asia Pacific", contracts: 35, value: 15000000, expiring: 1, compliance: 97, fyRemaining: 6000000 },
  { code: "EMEA", name: "Europe, Middle East & Africa", contracts: 22, value: 16000000, expiring: 1, compliance: 93, fyRemaining: 6400000 },
];

const insights = [
  {
    title: "High Service Ticket Volume",
    description: "CleanPro Services and FacilityMax showing elevated complaint volumes in ServiceNow. Consider vendor replacement before renewal.",
    icon: TicketIcon,
    priority: "high"
  },
  {
    title: "Accessibility Compliance Gaps",
    description: "3 vendors lack proper disability accommodations, creating legal and reputational risk. Immediate remediation or contract termination recommended.",
    icon: Accessibility,
    priority: "high"
  },
  {
    title: "High Cost, Low Attendance",
    description: "VA and Herndon locations showing significant cost inefficiency with high contract values but minimal utilization. Immediate review recommended.",
    icon: AlertCircle,
    priority: "high"
  },
  {
    title: "Concentration Risk",
    description: "North America represents 34% of total contract value. Consider diversification strategy to mitigate regional dependencies.",
    icon: AlertCircle,
    priority: "high"
  },
  {
    title: "Renewal Opportunity",
    description: "18 contracts expiring across regions in next 30 days. Strategic renegotiation could yield improved terms and cost savings.",
    icon: TrendingUp,
    priority: "medium"
  },
  {
    title: "Compliance Excellence",
    description: "APAC region leads with 97% compliance rate. Best practices should be replicated across other regions.",
    icon: Target,
    priority: "medium"
  },
  {
    title: "Growth Market",
    description: "India and Israel show highest contract growth rate. Consider expanding strategic partnerships in these regions.",
    icon: Globe,
    priority: "low"
  }
];

const costVsAttendance = [
  { location: "VA", contractValue: 850000, attendanceRate: 12, costPerAttendee: 70833 },
  { location: "Herndon", contractValue: 720000, attendanceRate: 8, costPerAttendee: 90000 },
];

const vendorTickets = [
  { 
    vendor: "CleanPro Services", 
    site: "NY - Manhattan Office", 
    contractValue: 450000, 
    tickets: 47, 
    avgResolutionTime: "8.5 days",
    category: "Cleaning Services",
    riskLevel: "high" as const
  },
  { 
    vendor: "FacilityMax", 
    site: "CA - San Francisco HQ", 
    contractValue: 620000, 
    tickets: 38, 
    avgResolutionTime: "6.2 days",
    category: "Facility Management",
    riskLevel: "high" as const
  },
  { 
    vendor: "SecureGuard Inc", 
    site: "TX - Austin Campus", 
    contractValue: 380000, 
    tickets: 29, 
    avgResolutionTime: "5.1 days",
    category: "Security Services",
    riskLevel: "medium" as const
  },
];

const accessibilityRisks = [
  {
    vendor: "CulinaryDelights",
    site: "NY - Manhattan Office",
    contractValue: 580000,
    issue: "No wheelchair-accessible serving areas or disability accommodations in cafeteria layout",
    complianceGap: "ADA Section 508",
    riskLevel: "high" as const
  },
  {
    vendor: "FitnessHub Pro",
    site: "CA - San Francisco HQ",
    contractValue: 420000,
    issue: "Gym equipment lacks accessible options for people with mobility impairments",
    complianceGap: "ADA Title III",
    riskLevel: "high" as const
  },
  {
    vendor: "TechSupport Plus",
    site: "EMEA Region",
    contractValue: 290000,
    issue: "Support portal and documentation not WCAG 2.1 AA compliant for screen readers",
    complianceGap: "WCAG 2.1 AA",
    riskLevel: "medium" as const
  },
];

export default function ExecutiveSummary() {
  const wwTotals = {
    contracts: regions.reduce((sum, r) => sum + r.contracts, 0),
    value: regions.reduce((sum, r) => sum + r.value, 0),
    expiring: regions.reduce((sum, r) => sum + r.expiring, 0),
    avgCompliance: Math.round(regions.reduce((sum, r) => sum + r.compliance, 0) / regions.length),
    fyRemaining: regions.reduce((sum, r) => sum + r.fyRemaining, 0)
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Executive Summary</h2>
          <p className="text-muted-foreground">Global contract portfolio overview and strategic insights</p>
        </div>

        {/* Hero Headlines */}
        <Card className="p-8 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 border-primary/30 shadow-lg">
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                BudgetMaster 360
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-primary">
                Four-Tier Financial Command System
              </p>
              <p className="text-lg text-muted-foreground">
                Managing budget with Real-Time Accountability
              </p>
            </div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                From Tracking to Mastery
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Transform budget management from reactive reporting to proactive financial command
              </p>
              <p className="text-lg md:text-xl font-semibold text-primary">
                Every dollar. Every vendor. Every location. Under control.
              </p>
            </div>
          </div>
        </Card>

        {/* Worldwide Totals */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-primary/20 p-3">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Worldwide Totals</h3>
              <p className="text-sm text-muted-foreground">Consolidated across all regions</p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Total Contracts</span>
              </div>
              <p className="text-4xl font-bold text-foreground">{wwTotals.contracts}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm font-medium">Total Value</span>
              </div>
              <p className="text-4xl font-bold text-foreground">
                ${(wwTotals.value / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm font-medium">Amount Left This FY</span>
              </div>
              <p className="text-4xl font-bold text-primary">
                ${(wwTotals.fyRemaining / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-muted-foreground">
                {((wwTotals.fyRemaining / wwTotals.value) * 100).toFixed(0)}% of total value
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Expiring Soon</span>
              </div>
              <p className="text-4xl font-bold text-warning">{wwTotals.expiring}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target className="h-4 w-4" />
                <span className="text-sm font-medium">Avg Compliance</span>
              </div>
              <p className="text-4xl font-bold text-success">{wwTotals.avgCompliance}%</p>
            </div>
          </div>
        </Card>

        {/* Regional Breakdown */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-foreground">Regional Breakdown</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {regions.map((region) => (
              <Card key={region.code} className="p-5 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="font-mono text-xs">
                          {region.code}
                        </Badge>
                        {region.expiring > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {region.expiring} expiring
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-foreground">{region.name}</h4>
                    </div>
                    <div className={`rounded-full w-10 h-10 flex items-center justify-center ${
                      region.compliance >= 95 ? 'bg-success/10' : 
                      region.compliance >= 90 ? 'bg-warning/10' : 'bg-destructive/10'
                    }`}>
                      <span className={`text-sm font-bold ${
                        region.compliance >= 95 ? 'text-success' : 
                        region.compliance >= 90 ? 'text-warning' : 'text-destructive'
                      }`}>
                        {region.compliance}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Contracts</p>
                      <p className="text-xl font-bold text-foreground">{region.contracts}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total Value</p>
                      <p className="text-xl font-bold text-foreground">
                        ${(region.value / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Amount Left This FY</p>
                      <p className="text-lg font-bold text-primary">
                        ${(region.fyRemaining / 1000000).toFixed(2)}M
                      </p>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">% of WW Portfolio</span>
                      <span className="font-semibold text-foreground">
                        {((region.value / wwTotals.value) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Vendor Service Quality - Ticket Volume KPI */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-foreground">Vendor Service Quality</h3>
          <p className="text-sm text-muted-foreground mb-4">ServiceNow ticket volume analysis - High ticket counts indicate service dissatisfaction</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vendorTickets.map((vendor, index) => (
              <Card key={index} className={`p-5 ${vendor.riskLevel === 'high' ? 'border-destructive/50 bg-destructive/5' : 'border-warning/50 bg-warning/5'}`}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-base mb-1">{vendor.vendor}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{vendor.site}</p>
                      <Badge variant={vendor.riskLevel === 'high' ? 'destructive' : 'default'} className="text-xs">
                        {vendor.tickets} Open Tickets
                      </Badge>
                    </div>
                    <div className={`rounded-lg p-3 ${vendor.riskLevel === 'high' ? 'bg-destructive/10' : 'bg-warning/10'}`}>
                      <TicketIcon className={`h-6 w-6 ${vendor.riskLevel === 'high' ? 'text-destructive' : 'text-warning'}`} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Contract Value</p>
                      <p className="text-base font-bold text-foreground">
                        ${(vendor.contractValue / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Avg Resolution</p>
                      <p className="text-base font-bold text-foreground">{vendor.avgResolutionTime}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Category</p>
                    <p className="text-xs font-medium text-foreground">{vendor.category}</p>
                  </div>

                  <div className="pt-2 border-t border-destructive/20 bg-destructive/5 -mx-5 -mb-5 px-5 py-3 rounded-b-lg">
                    <p className="text-xs text-muted-foreground">
                      ⚠️ High dissatisfaction risk - Consider non-renewal or mid-year termination
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Accessibility Compliance KPI */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-foreground">Accessibility Compliance Risk</h3>
          <p className="text-sm text-muted-foreground mb-4">Vendors lacking disability accommodations represent legal and reputational risk</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accessibilityRisks.map((risk, index) => (
              <Card key={index} className={`p-5 ${risk.riskLevel === 'high' ? 'border-destructive/50 bg-destructive/5' : 'border-warning/50 bg-warning/5'}`}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-base mb-1">{risk.vendor}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{risk.site}</p>
                      <Badge variant={risk.riskLevel === 'high' ? 'destructive' : 'default'} className="text-xs">
                        Non-Compliant
                      </Badge>
                    </div>
                    <div className={`rounded-lg p-3 ${risk.riskLevel === 'high' ? 'bg-destructive/10' : 'bg-warning/10'}`}>
                      <Accessibility className={`h-6 w-6 ${risk.riskLevel === 'high' ? 'text-destructive' : 'text-warning'}`} />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Contract Value</p>
                    <p className="text-base font-bold text-foreground">
                      ${(risk.contractValue / 1000).toFixed(0)}K
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Compliance Gap</p>
                    <p className="text-xs font-semibold text-destructive mb-2">{risk.complianceGap}</p>
                    <p className="text-xs text-foreground leading-relaxed">{risk.issue}</p>
                  </div>

                  <div className="pt-2 border-t border-destructive/20 bg-destructive/5 -mx-5 -mb-5 px-5 py-3 rounded-b-lg">
                    <p className="text-xs text-muted-foreground">
                      🚨 Legal exposure - Require immediate remediation or terminate contract
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Cost vs Attendance KPI */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-foreground">Cost Efficiency Analysis</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {costVsAttendance.map((location, index) => (
              <Card key={index} className="p-5 border-destructive/50 bg-destructive/5">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground text-lg mb-1">{location.location}</h4>
                      <Badge variant="destructive" className="text-xs">High Cost, Low Attendance</Badge>
                    </div>
                    <div className="rounded-lg bg-destructive/10 p-3">
                      <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Contract Value</p>
                      <p className="text-lg font-bold text-foreground">
                        ${(location.contractValue / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Attendance</p>
                      <p className="text-lg font-bold text-destructive">{location.attendanceRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Cost/Attendee</p>
                      <p className="text-lg font-bold text-foreground">
                        ${(location.costPerAttendee / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-destructive/20">
                    <p className="text-xs text-muted-foreground">
                      ⚠️ Potential annual savings: ${((location.contractValue * 0.6) / 1000).toFixed(0)}K through renegotiation or termination
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Strategic Insights */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-foreground">Strategic Insights</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              const priorityColors = {
                high: "border-destructive/50 bg-destructive/5",
                medium: "border-warning/50 bg-warning/5",
                low: "border-primary/50 bg-primary/5"
              };
              const badgeColors = {
                high: "destructive",
                medium: "default",
                low: "secondary"
              } as const;

              return (
                <Card key={index} className={`p-5 ${priorityColors[insight.priority as keyof typeof priorityColors]}`}>
                  <div className="flex gap-4">
                    <div className="rounded-lg bg-background p-3 h-fit">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-foreground">{insight.title}</h4>
                        <Badge variant={badgeColors[insight.priority as keyof typeof badgeColors]} className="text-xs shrink-0">
                          {insight.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
