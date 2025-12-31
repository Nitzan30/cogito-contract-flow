import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Building2,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  AlertTriangle,
  TrendingDown,
  Briefcase,
  FileText,
  BarChart3,
  Shield,
} from "lucide-react";
import { mockSites } from "@/data/mockPortfolioData";

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const isContractEndingSoon = (dateString: string) => {
  const endDate = new Date(dateString);
  const today = new Date();
  const diffDays = Math.ceil(
    (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffDays <= 90 && diffDays > 0;
};

export default function SiteDetails() {
  const { siteId } = useParams<{ siteId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const returnTab = searchParams.get("from");

  const site = mockSites.find((s) => s.id === siteId);

  if (!site) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <Building2 className="w-16 h-16 text-muted-foreground" />
          <h1 className="text-2xl font-bold text-foreground">Site Not Found</h1>
          <p className="text-muted-foreground">
            The site you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/regions")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Regions
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "Under Review":
        return "bg-amber-500/10 text-amber-700 border-amber-200";
      case "Approved to Close":
        return "bg-red-500/10 text-red-700 border-red-200";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const contractEndingSoon = isContractEndingSoon(site.contractEndDate);

  const handleBack = () => {
    if (returnTab) {
      navigate(`/regions?tab=${returnTab}`);
    } else {
      navigate("/regions");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumbs & Back Button */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Regions
          </Button>
          <nav className="text-sm text-muted-foreground">
            <span>Regions</span>
            <span className="mx-2">/</span>
            <span>{site.region}</span>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{site.siteName}</span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-foreground">
                  {site.siteName}
                </h1>
                <Badge className={`${getStatusColor(site.status)} border text-sm`}>
                  {site.status}
                </Badge>
                {site.isSmallSiteCandidate && (
                  <Badge variant="destructive" className="text-sm">
                    <TrendingDown className="w-3.5 h-3.5 mr-1" />
                    Small Site Candidate
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-lg">
                  {site.city}, {site.country}
                </span>
                <span className="mx-2">•</span>
                <span>{site.siteType}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Annual Cost</p>
                  <p className="text-xl font-bold text-foreground">
                    {formatCurrency(site.fy25Actual)}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Headcount</p>
                  <p className="text-xl font-bold text-foreground">
                    {site.headcount}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Occupancy</p>
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-xl font-bold ${
                        site.occupancyPercent < 40
                          ? "text-amber-600"
                          : "text-foreground"
                      }`}
                    >
                      {site.occupancyPercent}%
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Contract End</p>
                  <p
                    className={`text-lg font-bold ${
                      contractEndingSoon ? "text-destructive" : "text-foreground"
                    }`}
                  >
                    {new Date(site.contractEndDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Detail Cards Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Card 1: General Info */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="w-5 h-5 text-primary" />
                General Info & Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Building Code
                  </p>
                  <p className="font-medium text-foreground">
                    {site.buildingCode}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Building Type
                  </p>
                  <p className="font-medium text-foreground">
                    {site.buildingTypeName}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Unit
                  </p>
                  <p className="font-medium text-foreground">{site.unit}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Business Unit
                  </p>
                  <p className="font-medium text-foreground">
                    {site.businessUnit}
                  </p>
                </div>
              </div>
              <div className="border-t pt-4 space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    General Manager
                  </p>
                  <p className="font-medium text-foreground">
                    {site.generalManager}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Site Leadership
                  </p>
                  <p className="font-medium text-foreground">
                    {site.siteLeadership}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Admin Contact
                  </p>
                  <p className="font-medium text-foreground">
                    {site.adminOwnerName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {site.adminOwnerEmail}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Financial Performance */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="w-5 h-5 text-primary" />
                Financial Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    FY25 Actual
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    {formatCurrency(site.fy25Actual)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    FY26 AOP (Plan)
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    {formatCurrency(site.fy26Projection)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Cost per Seat
                  </p>
                  <p className="font-medium text-foreground">
                    {formatCurrency(site.costPerSeat)}/mo
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Cost per Employee
                  </p>
                  <p className="font-medium text-foreground">
                    {formatCurrency(site.costPerEmployee)}/mo
                  </p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Potential Savings
                  </p>
                  <p className="font-medium text-green-600">
                    {formatCurrency(site.potentialSavings)}
                  </p>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                  Cost Breakdown
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Real Estate</span>
                    <span className="font-medium">
                      {formatCurrency(site.realEstateAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Facility Management
                    </span>
                    <span className="font-medium">
                      {formatCurrency(site.facilityManagementAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Meals</span>
                    <span className="font-medium">
                      {formatCurrency(site.mealsAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transportation</span>
                    <span className="font-medium">
                      {formatCurrency(site.transportationAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Depreciation</span>
                    <span className="font-medium">
                      {formatCurrency(site.depreciationAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">EHS</span>
                    <span className="font-medium">
                      {formatCurrency(site.ehsCost)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Occupancy Metrics */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5 text-primary" />
                Space & Utilization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Capacity
                  </p>
                  <p className="font-medium text-foreground">{site.capacity}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Employees
                  </p>
                  <p className="font-medium text-foreground">{site.headcount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Workstations
                  </p>
                  <p className="font-medium text-foreground">
                    {site.workstations}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Rentable Area
                  </p>
                  <p className="font-medium text-foreground">
                    {site.rentableArea.toLocaleString()} sqm
                  </p>
                </div>
              </div>
              <div className="border-t pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Occupancy Rate</span>
                    <span
                      className={`font-medium ${
                        site.occupancyPercent < 40
                          ? "text-amber-600"
                          : "text-foreground"
                      }`}
                    >
                      {site.occupancyPercent}%
                    </span>
                  </div>
                  <Progress
                    value={site.occupancyPercent}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Monthly Avg. Attendance
                    </span>
                    <span className="font-medium text-foreground">
                      {site.attendancePercent}%
                    </span>
                  </div>
                  <Progress value={site.attendancePercent} className="h-2" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Planon Building Status
                  </p>
                  <p className="font-medium text-foreground">
                    {site.planonBuildingStatus}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Contract & Legal */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5 text-primary" />
                Contract & Legal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contractEndingSoon && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <div>
                    <p className="font-medium text-destructive text-sm">
                      Contract Ending Soon
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Less than 90 days remaining
                    </p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Contract Start
                  </p>
                  <p className="font-medium text-foreground">
                    {formatDate(site.contractStartDate)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Contract End
                  </p>
                  <p
                    className={`font-medium ${
                      contractEndingSoon ? "text-destructive" : "text-foreground"
                    }`}
                  >
                    {formatDate(site.contractEndDate)}
                  </p>
                </div>
                {site.notificationDate && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Notification Date
                    </p>
                    <p className="font-medium text-foreground">
                      {formatDate(site.notificationDate)}
                    </p>
                  </div>
                )}
                {site.regulation && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Regulation
                    </p>
                    <p className="font-medium text-foreground">
                      {site.regulation}
                    </p>
                  </div>
                )}
              </div>
              {(site.commentsLog || site.statusSummary) && (
                <div className="border-t pt-4 space-y-3">
                  {site.statusSummary && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Status Summary
                      </p>
                      <p className="text-sm text-foreground">
                        {site.statusSummary}
                      </p>
                    </div>
                  )}
                  {site.commentsLog && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Comments Log
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {site.commentsLog}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Small Site Program Section (if applicable) */}
        {site.isSmallSiteCandidate && (
          <Card className="border-warning/30 bg-warning/5">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-warning" />
                Small Site Program
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Program Status
                  </p>
                  <Badge variant="outline" className="text-sm">
                    {site.programStatus}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Decision
                  </p>
                  <Badge
                    variant={
                      site.programDecision === "Recommend Closure"
                        ? "destructive"
                        : "secondary"
                    }
                    className="text-sm"
                  >
                    {site.programDecision}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Potential Savings
                  </p>
                  <p className="font-bold text-green-600">
                    {formatCurrency(site.potentialSavings)}
                  </p>
                </div>
              </div>
              {(site.regulatoryNotes ||
                site.legalNotes ||
                site.adminSecurityNotes ||
                site.decisionComments) && (
                <div className="grid md:grid-cols-2 gap-4 mt-6 pt-4 border-t">
                  {site.regulatoryNotes && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Regulatory Notes
                      </p>
                      <p className="text-sm text-foreground">
                        {site.regulatoryNotes}
                      </p>
                    </div>
                  )}
                  {site.legalNotes && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Legal Notes
                      </p>
                      <p className="text-sm text-foreground">{site.legalNotes}</p>
                    </div>
                  )}
                  {site.adminSecurityNotes && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Admin/Security Notes
                      </p>
                      <p className="text-sm text-foreground">
                        {site.adminSecurityNotes}
                      </p>
                    </div>
                  )}
                  {site.decisionComments && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        Decision Comments
                      </p>
                      <p className="text-sm text-foreground">
                        {site.decisionComments}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
