import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { InsightCard as InsightCardType } from "@/data/mockAIInsights";
import {
  AlertTriangle,
  TrendingUp,
  Users,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Clock,
  Target,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";

const categoryConfig = {
  anomaly: {
    icon: AlertTriangle,
    label: "Anomaly Detection",
    gradient: "from-destructive/10 to-destructive/5",
    border: "border-destructive/20",
    iconColor: "text-destructive",
    badgeBg: "bg-destructive/10 text-destructive",
  },
  predictive: {
    icon: TrendingUp,
    label: "Predictive Insight",
    gradient: "from-warning/10 to-warning/5",
    border: "border-warning/20",
    iconColor: "text-warning",
    badgeBg: "bg-warning/10 text-warning",
  },
  vendor: {
    icon: Users,
    label: "Vendor Intelligence",
    gradient: "from-primary/10 to-primary/5",
    border: "border-primary/20",
    iconColor: "text-primary",
    badgeBg: "bg-primary/10 text-primary",
  },
};

const severityConfig = {
  critical: { color: "bg-destructive text-destructive-foreground", label: "Critical" },
  high: { color: "bg-destructive/80 text-destructive-foreground", label: "High" },
  medium: { color: "bg-warning text-warning-foreground", label: "Medium" },
  low: { color: "bg-muted text-muted-foreground", label: "Low" },
};

const confidenceConfig = {
  high: { label: "High Confidence", color: "text-success" },
  medium: { label: "Medium Confidence", color: "text-warning" },
  low: { label: "Low Confidence", color: "text-muted-foreground" },
};

export function InsightCardComponent({ insight }: { insight: InsightCardType }) {
  const [expanded, setExpanded] = useState(false);
  const cat = categoryConfig[insight.category];
  const sev = severityConfig[insight.severity];
  const conf = confidenceConfig[insight.confidence];
  const CatIcon = cat.icon;

  return (
    <Card
      className={`p-0 overflow-hidden bg-gradient-to-br ${cat.gradient} ${cat.border} hover:shadow-lg transition-all cursor-pointer`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className={`rounded-lg p-2 ${cat.badgeBg}`}>
              <CatIcon className={`h-5 w-5 ${cat.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <Badge className={`text-xs ${cat.badgeBg} border-0`}>
                  {cat.label}
                </Badge>
                <Badge className={`text-xs ${sev.color}`}>
                  {sev.label}
                </Badge>
              </div>
              <h3 className="font-semibold text-foreground text-sm leading-tight">
                {insight.title}
              </h3>
            </div>
          </div>
          <button className="shrink-0 p-1 rounded hover:bg-secondary/50">
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Brief summary always visible */}
        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
          {insight.whatHappened}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <span className={`text-xs font-medium ${conf.color}`}>
            ● {conf.label}
          </span>
          <span className="text-xs text-muted-foreground">
            {insight.createdAt}
          </span>
        </div>
      </div>

      {/* Expanded Details - BRD Section 6.4 Structure */}
      {expanded && (
        <div className="border-t border-border/50 p-5 pt-4 space-y-4 bg-card/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* What Happened */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <ShieldAlert className="h-3.5 w-3.5" />
                What Happened
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {insight.whatHappened}
              </p>
            </div>

            {/* Why It Matters */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Target className="h-3.5 w-3.5" />
                Why It Matters
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {insight.whyItMatters}
              </p>
            </div>

            {/* Scope */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Target className="h-3.5 w-3.5" />
                Scope
              </div>
              <p className="text-sm text-foreground">{insight.scope}</p>
            </div>

            {/* Suggested Action */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Lightbulb className="h-3.5 w-3.5" />
                Suggested Action
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {insight.suggestedAction}
              </p>
            </div>
          </div>

          {/* Timeframe & Source */}
          {(insight.timeframe || insight.source) && (
            <div className="flex flex-wrap gap-3 pt-2 border-t border-border/30">
              {insight.timeframe && (
                <div className="flex items-center gap-1.5 text-xs">
                  <Clock className="h-3.5 w-3.5 text-warning" />
                  <span className="font-medium text-warning">{insight.timeframe}</span>
                </div>
              )}
              {insight.source && (
                <div className="flex items-center gap-1.5 text-xs">
                  <Lightbulb className="h-3.5 w-3.5 text-primary" />
                  <span className="text-primary">{insight.source}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
