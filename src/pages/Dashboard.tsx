import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { ContractCard } from "@/components/ContractCard";
import { AlertItem } from "@/components/AlertItem";
import { FileText, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Contract Intelligence Dashboard</h2>
          <p className="text-muted-foreground">Real-time insights powered by AI</p>
        </div>

        {/* Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Active Contracts"
            value="247"
            change="+12% from last month"
            changeType="positive"
            icon={FileText}
          />
          <MetricCard
            title="Total Contract Value"
            value="$166M"
            change="+8.2% from last quarter"
            changeType="positive"
            icon={DollarSign}
          />
          <MetricCard
            title="Expiring Soon"
            value="18"
            change="Next 30 days"
            changeType="neutral"
            icon={AlertTriangle}
          />
          <MetricCard
            title="Compliance Rate"
            value="94%"
            change="+3% improvement"
            changeType="positive"
            icon={TrendingUp}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Alerts */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Recent Alerts</h3>
            <div className="space-y-3">
              <AlertItem
                title="Contract Renewal Due"
                description="Acme Corp real estate lease expires in 15 days"
                type="renewal"
                priority="high"
                timestamp="2 hours ago"
              />
              <AlertItem
                title="Penalty Risk Detected"
                description="GlobalTech Services SLA breach detected - review required"
                type="penalty"
                priority="high"
                timestamp="5 hours ago"
              />
              <AlertItem
                title="Compliance Check Required"
                description="3 contracts missing updated compliance fields"
                type="compliance"
                priority="medium"
                timestamp="1 day ago"
              />
            </div>
          </Card>

          {/* Critical Contracts */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Contracts Requiring Attention</h3>
            <div className="space-y-3">
              <ContractCard
                id="1"
                vendor="Acme Corporation"
                type="Real Estate Lease"
                value={450000}
                status="expiring"
                renewalDate="Jan 30, 2025"
                riskLevel="high"
              />
              <ContractCard
                id="2"
                vendor="GlobalTech Services"
                type="IT Support Agreement"
                value={125000}
                status="active"
                renewalDate="Mar 15, 2025"
                riskLevel="medium"
              />
            </div>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">AI-Powered Insights</h3>
              <p className="text-muted-foreground">
                Based on contract analysis, we've identified potential cost savings of <span className="font-semibold text-success">$340K</span> through 
                contract consolidation with 3 vendors. Additionally, <span className="font-semibold text-warning">5 contracts</span> have renewal 
                dates within penalty periods that could be renegotiated for better terms.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
