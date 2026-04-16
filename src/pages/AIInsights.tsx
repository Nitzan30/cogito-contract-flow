import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InsightCardComponent } from "@/components/InsightCard";
import { AIChatbot } from "@/components/AIChatbot";
import { mockInsights, aiDashboardIndicators, InsightCategory } from "@/data/mockAIInsights";
import {
  Brain,
  AlertTriangle,
  TrendingUp,
  Users,
  ShieldCheck,
  Zap,
  Target,
} from "lucide-react";

type FilterCategory = "all" | InsightCategory;

export default function AIInsights() {
  const [filter, setFilter] = useState<FilterCategory>("all");

  const filtered =
    filter === "all"
      ? mockInsights
      : mockInsights.filter((i) => i.category === filter);

  const filters: { key: FilterCategory; label: string; icon: typeof Brain; count: number }[] = [
    { key: "all", label: "All Insights", icon: Brain, count: mockInsights.length },
    { key: "anomaly", label: "Anomalies", icon: AlertTriangle, count: mockInsights.filter((i) => i.category === "anomaly").length },
    { key: "predictive", label: "Predictive", icon: TrendingUp, count: mockInsights.filter((i) => i.category === "predictive").length },
    { key: "vendor", label: "Vendor Intel", icon: Users, count: mockInsights.filter((i) => i.category === "vendor").length },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground">AI Insights</h2>
              <p className="text-muted-foreground">
                Proactive intelligence powered by anomaly detection, predictive analytics & vendor scoring
              </p>
            </div>
          </div>
        </div>

        {/* AI KPI Summary Strip */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {[
            { label: "Anomalies", value: aiDashboardIndicators.anomaliesDetected, icon: AlertTriangle, color: "text-destructive" },
            { label: "Predictions", value: aiDashboardIndicators.predictiveAlerts, icon: TrendingUp, color: "text-warning" },
            { label: "Vendor Flags", value: aiDashboardIndicators.vendorFlags, icon: Users, color: "text-primary" },
            { label: "Critical", value: aiDashboardIndicators.criticalInsights, icon: ShieldCheck, color: "text-destructive" },
            { label: "Confidence", value: `${aiDashboardIndicators.avgConfidence}%`, icon: Target, color: "text-success" },
            { label: "This Week", value: aiDashboardIndicators.insightsThisWeek, icon: Zap, color: "text-primary" },
            { label: "Risk Score", value: aiDashboardIndicators.riskScore, icon: ShieldCheck, color: "text-warning" },
          ].map((kpi) => (
            <Card key={kpi.label} className="p-4 text-center">
              <kpi.icon className={`h-5 w-5 mx-auto mb-1 ${kpi.color}`} />
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </Card>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f.key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              <f.icon className="h-4 w-4" />
              {f.label}
              <Badge
                variant="outline"
                className={`ml-1 text-xs ${
                  filter === f.key
                    ? "border-primary-foreground/30 text-primary-foreground"
                    : ""
                }`}
              >
                {f.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Insight Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((insight) => (
            <InsightCardComponent key={insight.id} insight={insight} />
          ))}
        </div>

        {/* AI Principles Footer */}
        <Card className="p-4 bg-secondary/30 border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            <span>
              <strong>AI Governance:</strong> All insights are advisory only. Explainability over sophistication. Trust over automation.
              AI outputs are traceable and auditable. No autonomous decisions are made.
            </span>
          </div>
        </Card>
      </div>

      {/* Floating Chatbot */}
      <AIChatbot />
    </DashboardLayout>
  );
}
