import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, AlertCircle, CheckCircle } from "lucide-react";

export default function Compliance() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Compliance & Governance</h2>
          <p className="text-muted-foreground">Monitor SLA adherence and regulatory compliance</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-success/10 p-3">
                <ShieldCheck className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Compliance</p>
                <p className="text-2xl font-bold text-foreground">94%</p>
              </div>
            </div>
            <Progress value={94} className="h-2" />
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-success/10 p-3">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">SLA Compliant</p>
                <p className="text-2xl font-bold text-foreground">231</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">out of 247 contracts</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-warning/10 p-3">
                <AlertCircle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Needs Attention</p>
                <p className="text-2xl font-bold text-foreground">16</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">compliance issues</p>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6 text-foreground">Compliance Checks</h3>
          <div className="space-y-4">
            {[
              {
                title: "GDPR Compliance",
                status: "compliant",
                coverage: 98,
                issues: 2,
              },
              {
                title: "SOC 2 Requirements",
                status: "compliant",
                coverage: 95,
                issues: 0,
              },
              {
                title: "SLA Monitoring",
                status: "warning",
                coverage: 92,
                issues: 8,
              },
              {
                title: "Insurance Verification",
                status: "compliant",
                coverage: 100,
                issues: 0,
              },
              {
                title: "Contract Renewals",
                status: "warning",
                coverage: 85,
                issues: 6,
              },
            ].map((check) => (
              <div key={check.title} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-foreground">{check.title}</h4>
                    <Badge
                      variant="outline"
                      className={
                        check.status === "compliant"
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-warning/10 text-warning border-warning/20"
                      }
                    >
                      {check.status === "compliant" ? "Compliant" : "Needs Review"}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-foreground">{check.coverage}%</span>
                    <span className="text-muted-foreground"> coverage</span>
                  </div>
                </div>
                <Progress value={check.coverage} className="h-2 mb-2" />
                {check.issues > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {check.issues} issue{check.issues > 1 ? "s" : ""} requiring attention
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
