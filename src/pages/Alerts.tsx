import { DashboardLayout } from "@/components/DashboardLayout";
import { AlertItem } from "@/components/AlertItem";
import { ContractCard } from "@/components/ContractCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, FileText, Clock, CheckCircle2 } from "lucide-react";

export default function Alerts() {
  const alerts = {
    all: [
      {
        id: "1",
        title: "🚨 Critical: Low Attendance Alert - VA",
        description: "VA office showing 12% attendance for 3 consecutive months (Aug-Oct 2024). Contract value: $850K. Immediate action required.",
        type: "penalty" as const,
        priority: "high" as const,
        timestamp: "1 hour ago",
      },
      {
        id: "2",
        title: "🚨 Critical: Low Attendance Alert - Herndon",
        description: "Herndon location at 8% attendance for 3 consecutive months (Aug-Oct 2024). Contract value: $720K. Review recommended.",
        type: "penalty" as const,
        priority: "high" as const,
        timestamp: "1 hour ago",
      },
      {
        id: "3",
        title: "⚠️ Low Attendance Warning - APAC Singapore",
        description: "Singapore office dropped to 18% attendance for 3 months. Contract value: $420K. Consider renegotiation.",
        type: "penalty" as const,
        priority: "high" as const,
        timestamp: "2 hours ago",
      },
      {
        id: "4",
        title: "Contract Renewal Due",
        description: "Acme Corp real estate lease expires in 15 days. Auto-renewal clause present.",
        type: "renewal" as const,
        priority: "high" as const,
        timestamp: "3 hours ago",
      },
      {
        id: "5",
        title: "Penalty Risk Detected",
        description: "GlobalTech Services SLA breach detected - 3 incidents in last month exceed threshold",
        type: "penalty" as const,
        priority: "high" as const,
        timestamp: "5 hours ago",
      },
      {
        id: "6",
        title: "Compliance Check Required",
        description: "3 contracts missing updated GDPR compliance fields",
        type: "compliance" as const,
        priority: "medium" as const,
        timestamp: "1 day ago",
      },
      {
        id: "7",
        title: "Auto-Renewal Notification",
        description: "MegaSupply Inc contract will auto-renew in 45 days unless notice given",
        type: "renewal" as const,
        priority: "medium" as const,
        timestamp: "2 days ago",
      },
      {
        id: "8",
        title: "Document Update Completed",
        description: "Successfully processed and extracted data from 12 new contracts",
        type: "success" as const,
        priority: "low" as const,
        timestamp: "3 days ago",
      },
    ],
    lowAttendance: [
      {
        id: "1",
        title: "🚨 Critical: Low Attendance Alert - VA",
        description: "VA office showing 12% attendance for 3 consecutive months (Aug-Oct 2024). Contract value: $850K. Immediate action required.",
        type: "penalty" as const,
        priority: "high" as const,
        timestamp: "1 hour ago",
      },
      {
        id: "2",
        title: "🚨 Critical: Low Attendance Alert - Herndon",
        description: "Herndon location at 8% attendance for 3 consecutive months (Aug-Oct 2024). Contract value: $720K. Review recommended.",
        type: "penalty" as const,
        priority: "high" as const,
        timestamp: "1 hour ago",
      },
      {
        id: "3",
        title: "⚠️ Low Attendance Warning - APAC Singapore",
        description: "Singapore office dropped to 18% attendance for 3 months. Contract value: $420K. Consider renegotiation.",
        type: "penalty" as const,
        priority: "high" as const,
        timestamp: "2 hours ago",
      },
    ],
  };

  const contractsRequiringAttention = [
    {
      id: "c1",
      vendor: "Acme Properties",
      type: "Real Estate Lease",
      value: 2500000,
      renewalDate: "Jan 15, 2025",
      status: "expiring" as const,
      riskLevel: "high" as const,
    },
    {
      id: "c2",
      vendor: "GlobalTech Inc",
      type: "Services SLA",
      value: 1800000,
      renewalDate: "Feb 28, 2025",
      status: "pending" as const,
      riskLevel: "medium" as const,
    },
    {
      id: "c3",
      vendor: "MegaSupply Co",
      type: "Vendor Agreement",
      value: 950000,
      renewalDate: "Feb 14, 2025",
      status: "active" as const,
      riskLevel: "low" as const,
    },
    {
      id: "c4",
      vendor: "TechPartners Ltd",
      type: "Software License",
      value: 420000,
      renewalDate: "Mar 31, 2025",
      status: "pending" as const,
      riskLevel: "medium" as const,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Alerts & Notifications</h2>
          <p className="text-muted-foreground">AI-powered monitoring, automated alerts, and contract watchlist</p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-4 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">5</p>
                <p className="text-xs text-muted-foreground">Critical Alerts</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-xs text-muted-foreground">Contracts Expiring</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-xs text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Resolved Today</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Two-Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: Alerts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Recent Alerts
              </h3>
              <Badge variant="destructive">{alerts.all.filter(a => a.priority === 'high').length} Urgent</Badge>
            </div>
            
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="renewals">Renewals</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {alerts.all.map((alert) => (
                  <AlertItem key={alert.id} {...alert} />
                ))}
              </TabsContent>

              <TabsContent value="attendance" className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                <Card className="p-3 bg-destructive/5 border-destructive/20">
                  <p className="text-xs text-foreground">
                    🤖 Automated: Flagged when attendance drops below 20% for 3 consecutive months
                  </p>
                </Card>
                {alerts.lowAttendance.map((alert) => (
                  <AlertItem key={alert.id} {...alert} />
                ))}
              </TabsContent>

              <TabsContent value="renewals" className="space-y-3">
                <Card className="p-8 text-center text-muted-foreground">
                  <p>Renewal alerts will appear here</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Contracts Requiring Attention */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Contracts Requiring Attention
              </h3>
              <Badge variant="outline">{contractsRequiringAttention.length} Items</Badge>
            </div>
            
            <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
              {contractsRequiringAttention.map((contract) => (
                <ContractCard key={contract.id} {...contract} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}