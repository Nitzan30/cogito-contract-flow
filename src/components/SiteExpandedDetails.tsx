import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  DollarSign, 
  Users, 
  FileText, 
  AlertTriangle,
  Calendar
} from "lucide-react";
import { Site } from "@/types/portfolio";

interface SiteExpandedDetailsProps {
  site: Site;
}

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const isContractEndingSoon = (dateString: string) => {
  const endDate = new Date(dateString);
  const today = new Date();
  const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 90 && diffDays > 0;
};

export function SiteExpandedDetails({ site }: SiteExpandedDetailsProps) {
  const contractEndingSoon = isContractEndingSoon(site.contractEndDate);

  const costBreakdown = [
    { label: 'Real Estate', value: site.realEstateAmount },
    { label: 'Facility Mgmt', value: site.facilityManagementAmount },
    { label: 'Meals', value: site.mealsAmount },
    { label: 'Transportation', value: site.transportationAmount },
    { label: 'Depreciation', value: site.depreciationAmount },
    { label: 'EHS', value: site.ehsCost },
  ];

  const totalCostBreakdown = costBreakdown.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-8 bg-gradient-to-br from-muted/40 to-muted/20 w-full">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {/* Group A: General Info & Management */}
        <Card className="p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 rounded-lg bg-primary/10">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Site Details</h3>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Building Code</span>
              <span className="font-medium text-foreground">{site.buildingCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Building Type</span>
              <span className="font-medium text-foreground">{site.buildingTypeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unit</span>
              <Badge variant="outline" className="text-xs">{site.unit}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GM</span>
              <span className="font-medium text-foreground truncate max-w-[120px]">{site.generalManager}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Site Leadership</span>
              <span className="font-medium text-foreground truncate max-w-[120px]">{site.siteLeadership}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Admin</span>
              <span className="font-medium text-foreground truncate max-w-[120px]">{site.adminOwnerName}</span>
            </div>
          </div>
        </Card>

        {/* Group B: Financial Performance */}
        <Card className="p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Costs & Budget</h3>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">FY26 AOP</span>
              <span className="font-medium text-foreground">{formatCurrency(site.fy26Projection)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Potential Savings</span>
              <span className={`font-medium ${site.potentialSavings > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                {formatCurrency(site.potentialSavings)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cost/Seat (Monthly)</span>
              <span className="font-medium text-foreground">${Math.round(site.costPerSeat / 12).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cost/Employee (Monthly)</span>
              <span className="font-medium text-foreground">${Math.round(site.costPerEmployee / 12).toLocaleString()}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Cost Breakdown</p>
              <div className="space-y-1.5">
                {costBreakdown.map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span>{formatCurrency(item.value)}</span>
                      </div>
                      <Progress 
                        value={totalCostBreakdown > 0 ? (item.value / totalCostBreakdown) * 100 : 0} 
                        className="h-1" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Group C: Space & Utilization */}
        <Card className="p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Occupancy Metrics</h3>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Capacity</span>
              <span className="font-medium text-foreground">{site.capacity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground"># Employees</span>
              <span className="font-medium text-foreground">{site.headcount}</span>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-muted-foreground">Occupancy</span>
                <span className={`font-medium ${site.occupancyPercent < 40 ? 'text-amber-600' : 'text-foreground'}`}>
                  {site.occupancyPercent}%
                </span>
              </div>
              <Progress value={site.occupancyPercent} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-muted-foreground">Avg Attendance</span>
                <span className={`font-medium ${site.attendancePercent < 30 ? 'text-amber-600' : 'text-foreground'}`}>
                  {site.attendancePercent}%
                </span>
              </div>
              <Progress value={site.attendancePercent} className="h-2" />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rentable Area</span>
              <span className="font-medium text-foreground">{site.rentableArea.toLocaleString()} sqm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Planon Status</span>
              <Badge variant={site.planonBuildingStatus === 'Operational' ? 'default' : 'secondary'} className="text-xs">
                {site.planonBuildingStatus}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Group D: Contract & Risk */}
        <Card className="p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Legal & Action Items</h3>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contract Start</span>
              <span className="font-medium text-foreground">{formatDate(site.contractStartDate)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Contract End</span>
              <span className={`font-medium ${contractEndingSoon ? 'text-destructive' : 'text-foreground'}`}>
                {formatDate(site.contractEndDate)}
              </span>
            </div>
            {site.notificationDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Notification Date</span>
                <span className="font-medium text-foreground">{formatDate(site.notificationDate)}</span>
              </div>
            )}
            
            {contractEndingSoon && (
              <div className="flex items-center gap-2 p-2 rounded-md bg-destructive/10 border border-destructive/20">
                <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
                <span className="text-xs text-destructive font-medium">Contract ending within 90 days</span>
              </div>
            )}

            {site.regulation && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Regulation</span>
                <span className="font-medium text-foreground truncate max-w-[120px]">{site.regulation}</span>
              </div>
            )}

            {(site.commentsLog || site.statusSummary) && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Notes</p>
                <p className="text-xs text-foreground">{site.statusSummary || site.commentsLog}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}