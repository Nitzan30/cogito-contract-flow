import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, CheckCircle } from "lucide-react";

interface AlertItemProps {
  title: string;
  description: string;
  type: "renewal" | "penalty" | "compliance" | "success";
  priority: "high" | "medium" | "low";
  timestamp: string;
}

export const AlertItem = ({ title, description, type, priority, timestamp }: AlertItemProps) => {
  const typeConfig = {
    renewal: { icon: Clock, color: "text-warning" },
    penalty: { icon: AlertCircle, color: "text-destructive" },
    compliance: { icon: AlertCircle, color: "text-warning" },
    success: { icon: CheckCircle, color: "text-success" },
  };

  const priorityConfig = {
    high: "bg-destructive/10 text-destructive border-destructive/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-muted text-muted-foreground border-border",
  };

  const Icon = typeConfig[type].icon;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className={`rounded-lg p-2 h-fit ${typeConfig[type].color} bg-opacity-10`}>
          <Icon className={`h-5 w-5 ${typeConfig[type].color}`} />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-foreground">{title}</h4>
            <Badge variant="outline" className={priorityConfig[priority]}>
              {priority}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
      </div>
    </Card>
  );
};
