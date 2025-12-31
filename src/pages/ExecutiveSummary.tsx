import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { Region } from "@/types/portfolio";

const regions: { code: Region; name: string; contracts: number; value: number; expiring: number; compliance: number; fyRemaining: number }[] = [
  { code: "IND", name: "India", contracts: 42, value: 43000000, expiring: 4, compliance: 96, fyRemaining: 17420000 },
  { code: "ISR", name: "Israel", contracts: 28, value: 47000000, expiring: 3, compliance: 94, fyRemaining: 18330000 },
  { code: "NA", name: "North America", contracts: 89, value: 35000000, expiring: 7, compliance: 95, fyRemaining: 14000000 },
  { code: "CALA", name: "Central America & Latin America", contracts: 31, value: 10000000, expiring: 2, compliance: 92, fyRemaining: 4000000 },
  { code: "APAC", name: "Asia Pacific", contracts: 35, value: 15000000, expiring: 1, compliance: 97, fyRemaining: 6000000 },
  { code: "EMEA", name: "Europe, Middle East & Africa", contracts: 22, value: 16000000, expiring: 1, compliance: 93, fyRemaining: 6400000 },
];

// Hardcoded values as per requirements
const TOTAL_SITES = 94;
const TOTAL_VALUE = 167000000; // $167.0M
const AMOUNT_REALIZED = 101000000; // Example: $101.0M spent
const REMAINING_AMOUNT = TOTAL_VALUE - AMOUNT_REALIZED; // $66.0M remaining

export default function ExecutiveSummary() {
  const navigate = useNavigate();
  
  const wwTotals = {
    contracts: regions.reduce((sum, r) => sum + r.contracts, 0),
    value: regions.reduce((sum, r) => sum + r.value, 0),
    expiring: regions.reduce((sum, r) => sum + r.expiring, 0),
    avgCompliance: Math.round(regions.reduce((sum, r) => sum + r.compliance, 0) / regions.length),
    fyRemaining: regions.reduce((sum, r) => sum + r.fyRemaining, 0)
  };

  const handleRegionClick = (regionCode: Region) => {
    navigate(`/regions?tab=${regionCode}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Executive Dashboard</h2>
          <p className="text-muted-foreground">Global portfolio overview and financial realization</p>
        </div>

        {/* Hero Headlines */}
        <Card className="p-8 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 border-primary/30 shadow-lg">
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                SiteLense360
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

        {/* Top 4 KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Total Sites */}
          <Card className="p-6 bg-gradient-to-br from-secondary/50 to-secondary/20 border-border">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Sites</p>
                <p className="text-4xl font-bold text-foreground">{TOTAL_SITES}</p>
                <p className="text-xs text-muted-foreground">Active sites across 6 regions</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          {/* Card 2: Total Value */}
          <Card className="p-6 bg-gradient-to-br from-secondary/50 to-secondary/20 border-border">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-4xl font-bold text-foreground">
                  ${(TOTAL_VALUE / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-muted-foreground">FY25 Total Budget</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          {/* Card 3: Amount Realized (RED) */}
          <Card className="p-6 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/30">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Amount Realized this FY</p>
                <p className="text-4xl font-bold text-destructive">
                  ${(AMOUNT_REALIZED / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-muted-foreground">
                  {((AMOUNT_REALIZED / TOTAL_VALUE) * 100).toFixed(0)}% of total budget consumed
                </p>
              </div>
              <div className="rounded-lg bg-destructive/10 p-3">
                <TrendingDown className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </Card>

          {/* Card 4: Remaining Amount (GREEN) */}
          <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/30">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Remaining Amount</p>
                <p className="text-4xl font-bold text-success">
                  ${(REMAINING_AMOUNT / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-muted-foreground">
                  {((REMAINING_AMOUNT / TOTAL_VALUE) * 100).toFixed(0)}% available for allocation
                </p>
              </div>
              <div className="rounded-lg bg-success/10 p-3">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </div>
          </Card>
        </div>

        {/* Regional Breakdown - Now Clickable */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-foreground">Regional Breakdown</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {regions.map((region) => (
              <Card 
                key={region.code} 
                className="p-5 hover:shadow-lg transition-all cursor-pointer hover:border-primary/50 hover:scale-[1.02]"
                onClick={() => handleRegionClick(region.code)}
              >
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

                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-primary font-medium">Click to view details →</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
