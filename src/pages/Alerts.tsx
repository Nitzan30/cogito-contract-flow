import { DashboardLayout } from "@/components/DashboardLayout";
import { AlertItem } from "@/components/AlertItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Alerts & Notifications</h2>
          <p className="text-muted-foreground">AI-powered monitoring and automated alerts</p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Alerts</TabsTrigger>
            <TabsTrigger value="attendance">Low Attendance</TabsTrigger>
            <TabsTrigger value="renewals">Renewals</TabsTrigger>
            <TabsTrigger value="penalties">Penalties</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {alerts.all.map((alert) => (
              <AlertItem key={alert.id} {...alert} />
            ))}
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card className="p-4 bg-destructive/5 border-destructive/20 mb-4">
              <p className="text-sm text-foreground font-medium">
                🤖 Automated Alert: Contracts flagged when attendance drops below 20% threshold for 3 consecutive months
              </p>
            </Card>
            {alerts.lowAttendance.map((alert) => (
              <AlertItem key={alert.id} {...alert} />
            ))}
          </TabsContent>

          <TabsContent value="renewals">
            <Card className="p-8 text-center text-muted-foreground">
              <p>Renewal alerts will appear here</p>
            </Card>
          </TabsContent>

          <TabsContent value="penalties">
            <Card className="p-8 text-center text-muted-foreground">
              <p>Penalty risk alerts will appear here</p>
            </Card>
          </TabsContent>

          <TabsContent value="compliance">
            <Card className="p-8 text-center text-muted-foreground">
              <p>Compliance alerts will appear here</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
