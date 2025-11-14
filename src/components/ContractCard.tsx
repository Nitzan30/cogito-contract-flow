import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, AlertTriangle } from "lucide-react";

interface ContractCardProps {
  id: string;
  vendor: string;
  type: string;
  value: number;
  status: "active" | "expiring" | "expired" | "pending";
  renewalDate: string;
  riskLevel?: "low" | "medium" | "high";
}

export const ContractCard = ({ vendor, type, value, status, renewalDate, riskLevel }: ContractCardProps) => {
  const statusConfig = {
    active: { label: "Active", className: "bg-success/10 text-success border-success/20" },
    expiring: { label: "Expiring Soon", className: "bg-warning/10 text-warning border-warning/20" },
    expired: { label: "Expired", className: "bg-destructive/10 text-destructive border-destructive/20" },
    pending: { label: "Pending", className: "bg-muted text-muted-foreground border-border" },
  };

  const riskConfig = {
    low: { className: "bg-success/10 text-success" },
    medium: { className: "bg-warning/10 text-warning" },
    high: { className: "bg-destructive/10 text-destructive" },
  };

  return (
    <Card className="p-5 hover:shadow-lg transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-foreground">{vendor}</h3>
          <p className="text-sm text-muted-foreground">{type}</p>
        </div>
        <Badge variant="outline" className={statusConfig[status].className}>
          {statusConfig[status].label}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="h-4 w-4 text-primary" />
          <span className="text-foreground font-medium">
            ${value.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Renewal: {renewalDate}</span>
        </div>

        {riskLevel && (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <Badge className={riskConfig[riskLevel].className}>
              {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
};
