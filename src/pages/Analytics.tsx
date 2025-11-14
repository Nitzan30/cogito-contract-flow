import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BarChart3, PieChart, TrendingUp } from "lucide-react";

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Analytics & Reporting</h2>
          <p className="text-muted-foreground">Data-driven insights for contract performance</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Contract Value by Category</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Real Estate</span>
                  <span className="text-sm font-semibold text-foreground">$4.2M (34%)</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-1 w-[34%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">IT Services</span>
                  <span className="text-sm font-semibold text-foreground">$3.8M (31%)</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-2 w-[31%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Equipment</span>
                  <span className="text-sm font-semibold text-foreground">$2.6M (21%)</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-3 w-[21%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Other</span>
                  <span className="text-sm font-semibold text-foreground">$1.8M (14%)</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-chart-4 w-[14%]"></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <PieChart className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Contract Status Distribution</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-success"></div>
                  <span className="text-sm text-muted-foreground">Active</span>
                </div>
                <span className="text-sm font-semibold text-foreground">215 (87%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-warning"></div>
                  <span className="text-sm text-muted-foreground">Expiring Soon</span>
                </div>
                <span className="text-sm font-semibold text-foreground">18 (7%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-destructive"></div>
                  <span className="text-sm text-muted-foreground">Expired</span>
                </div>
                <span className="text-sm font-semibold text-foreground">8 (3%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-muted"></div>
                  <span className="text-sm text-muted-foreground">Pending</span>
                </div>
                <span className="text-sm font-semibold text-foreground">6 (3%)</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Top Vendors by Spend</h3>
            </div>
            <div className="space-y-4">
              {[
                { name: "Acme Corporation", amount: 1250000, contracts: 8 },
                { name: "GlobalTech Services", amount: 980000, contracts: 12 },
                { name: "MegaSupply Inc", amount: 850000, contracts: 6 },
                { name: "CloudHost Systems", amount: 720000, contracts: 4 },
                { name: "Office Solutions Ltd", amount: 620000, contracts: 15 },
              ].map((vendor, index) => (
                <div key={vendor.name} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{vendor.name}</p>
                    <p className="text-sm text-muted-foreground">{vendor.contracts} contracts</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${(vendor.amount / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
