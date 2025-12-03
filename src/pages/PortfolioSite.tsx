import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  MapPin, 
  ArrowRight, 
  ArrowLeft,
  Building,
  Users,
  DollarSign,
  AlertTriangle,
  Shield,
  Wifi,
  HardHat,
  Mail,
  User,
  MapPinned,
  Ruler,
  Clock,
  FileText
} from "lucide-react";
import { mockSites } from "@/data/mockPortfolioData";

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  return `$${(value / 1000).toFixed(0)}K`;
};

export default function PortfolioSite() {
  const { siteId } = useParams<{ siteId: string }>();
  const navigate = useNavigate();

  const site = mockSites.find(s => s.id === siteId);

  if (!site) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <AlertTriangle className="w-12 h-12 text-warning mb-4" />
          <h2 className="text-xl font-semibold">Site not found</h2>
          <Button onClick={() => navigate('/portfolio')} className="mt-4">
            Back to Portfolio
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <button 
            onClick={() => navigate('/portfolio')}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <Globe className="w-4 h-4" />
            Global
          </button>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
          <button 
            onClick={() => navigate(`/portfolio/region/${site.region}`)}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <MapPin className="w-4 h-4" />
            {site.region}
          </button>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-primary font-semibold flex items-center gap-1">
            <Building className="w-4 h-4" />
            {site.siteName}
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">{site.siteName}</h1>
              {site.isSmallSiteCandidate && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Small Site Candidate
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{site.address}, {site.country}</p>
          </div>
          <Button variant="outline" onClick={() => navigate(`/portfolio/region/${site.region}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {site.region}
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Total Cost</p>
                <p className="text-xl font-bold">{formatCurrency(site.totalCost)}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Headcount</p>
                <p className="text-xl font-bold">{site.headcount}</p>
              </div>
            </div>
          </Card>
          <Card className={`p-4 ${site.attendancePercent < 20 ? 'bg-destructive/5 border-destructive/20' : ''}`}>
            <div className="flex items-center gap-3">
              <Clock className={`w-5 h-5 ${site.attendancePercent < 20 ? 'text-destructive' : 'text-foreground'}`} />
              <div>
                <p className="text-xs text-muted-foreground">Attendance</p>
                <p className="text-xl font-bold">{site.attendancePercent}%</p>
              </div>
            </div>
          </Card>
          <Card className={`p-4 ${site.occupancyPercent < 40 ? 'bg-warning/5 border-warning/20' : ''}`}>
            <div className="flex items-center gap-3">
              <Ruler className={`w-5 h-5 ${site.occupancyPercent < 40 ? 'text-warning' : 'text-foreground'}`} />
              <div>
                <p className="text-xs text-muted-foreground">Occupancy</p>
                <p className="text-xl font-bold">{site.occupancyPercent}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="domains">Domain Details</TabsTrigger>
            {site.isSmallSiteCandidate && (
              <TabsTrigger value="program">Small Site Program</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Site Identity */}
              <Card className="p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Site Identity
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Site ID</span>
                    <span className="font-medium">{site.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <Badge variant="outline">{site.siteType}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge>{site.status}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SQM</span>
                    <span className={`font-medium ${site.sqm <= 50 ? 'text-warning' : ''}`}>{site.sqm.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region</span>
                    <span className="font-medium">{site.region}</span>
                  </div>
                </div>
              </Card>

              {/* Admin Contact */}
              <Card className="p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Admin Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{site.adminOwnerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-primary">{site.adminOwnerEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinned className="w-4 h-4 text-muted-foreground" />
                    <span>{site.address}</span>
                  </div>
                </div>
              </Card>

              {/* Operational Metrics */}
              <Card className="p-5 md:col-span-2">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Operational Metrics
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Workstations</p>
                    <p className="text-2xl font-bold">{site.workstations}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Business Unit</p>
                    <p className="text-lg font-medium">{site.businessUnit}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Utilization Rate</p>
                    <p className={`text-2xl font-bold ${site.utilizationRate < 40 ? 'text-warning' : 'text-success'}`}>
                      {site.utilizationRate}%
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financials" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Cost Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Real Estate</span>
                    <span className="font-medium">{formatCurrency(site.realEstateAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Facility Management</span>
                    <span className="font-medium">{formatCurrency(site.facilityManagementAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Meals</span>
                    <span className="font-medium">{formatCurrency(site.mealsAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transportation</span>
                    <span className="font-medium">{formatCurrency(site.transportationAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Depreciation</span>
                    <span className="font-medium">{formatCurrency(site.depreciationAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">EHS</span>
                    <span className="font-medium">{formatCurrency(site.ehsCost)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3 mt-3">
                    <span className="font-semibold">Total Cost</span>
                    <span className="font-bold text-primary">{formatCurrency(site.totalCost)}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Financial Summary
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Cost Per Employee</p>
                    <p className="text-2xl font-bold">${site.costPerEmployee.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">FY25 Actual</span>
                    <span className="font-medium">{formatCurrency(site.fy25Actual)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">FY26 Projection</span>
                    <span className="font-medium">{formatCurrency(site.fy26Projection)}</span>
                  </div>
                  {site.potentialSavings > 0 && (
                    <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                      <p className="text-sm text-muted-foreground">Potential Savings</p>
                      <p className="text-2xl font-bold text-success">{formatCurrency(site.potentialSavings)}</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="domains" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* TIR */}
              {site.isTIR && (
                <Card className="p-5">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Wifi className="w-4 h-4" />
                    TIR (IT Infrastructure)
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Network Status</span>
                      <Badge variant={site.itNetworkStatus === 'Operational' ? 'default' : 'destructive'}>
                        {site.itNetworkStatus || 'Unknown'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Critical Infrastructure</span>
                      <span>{site.criticalInfrastructureFlag ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Uptime</span>
                      <span className="font-medium">{site.uptimePercent || 'N/A'}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">DR Plan</span>
                      <span>{site.disasterRecoveryPlanFlag ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </Card>
              )}

              {/* Physical Security */}
              {site.isPhysicalSecurity && (
                <Card className="p-5">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Physical Security
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Security Level</span>
                      <Badge variant={site.securityLevel === 'Critical' ? 'destructive' : 'secondary'}>
                        {site.securityLevel || 'Unknown'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Compliance Status</span>
                      <span>{site.securityComplianceStatus || 'N/A'}</span>
                    </div>
                  </div>
                </Card>
              )}

              {/* EHS */}
              {site.isEHS && (
                <Card className="p-5">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <HardHat className="w-4 h-4" />
                    EHS (Environment, Health & Safety)
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Compliance Status</span>
                      <Badge variant={site.ehsComplianceStatus === 'Compliant' ? 'default' : 'destructive'}>
                        {site.ehsComplianceStatus || 'Unknown'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">EHS Cost</span>
                      <span className="font-medium">{formatCurrency(site.ehsCost)}</span>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>

          {site.isSmallSiteCandidate && (
            <TabsContent value="program" className="space-y-4">
              <Card className="p-5 bg-warning/5 border-warning/20">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  Small Site Program Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">Program Status:</span>
                    <Badge className="text-base px-3 py-1">{site.programStatus}</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">Decision:</span>
                    <Badge variant={site.programDecision === 'Recommend Closure' ? 'destructive' : site.programDecision === 'Retain & Optimize' ? 'default' : 'secondary'}>
                      {site.programDecision}
                    </Badge>
                  </div>
                  
                  {site.regulatoryNotes && (
                    <div className="p-3 bg-background rounded-lg">
                      <p className="text-sm font-medium mb-1">Regulatory Notes</p>
                      <p className="text-sm text-muted-foreground">{site.regulatoryNotes}</p>
                    </div>
                  )}
                  
                  {site.legalNotes && (
                    <div className="p-3 bg-background rounded-lg">
                      <p className="text-sm font-medium mb-1">Legal Notes</p>
                      <p className="text-sm text-muted-foreground">{site.legalNotes}</p>
                    </div>
                  )}
                  
                  {site.adminSecurityNotes && (
                    <div className="p-3 bg-background rounded-lg">
                      <p className="text-sm font-medium mb-1">Admin/Security Notes</p>
                      <p className="text-sm text-muted-foreground">{site.adminSecurityNotes}</p>
                    </div>
                  )}
                  
                  {site.decisionComments && (
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-sm font-medium mb-1">Decision Comments</p>
                      <p className="text-sm">{site.decisionComments}</p>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
