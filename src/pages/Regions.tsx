import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Building2,
  Users,
  DollarSign,
  TrendingDown,
  AlertTriangle,
  Shield,
  Zap,
  Leaf,
  ChevronDown,
  ChevronRight,
  MapPin,
  Calendar,
} from "lucide-react";
import { mockSites, calculateGlobalSummary } from "@/data/mockPortfolioData";
import { Region, Domain, Site } from "@/types/portfolio";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SiteExpandedDetails } from "@/components/SiteExpandedDetails";

const regionTabs: { code: Region; name: string }[] = [
  { code: "NA", name: "NA" },
  { code: "CALA", name: "CALA" },
  { code: "ISR", name: "Israel" },
  { code: "EMEA", name: "EMEA" },
  { code: "APAC", name: "APAC" },
  { code: "IND", name: "INDIA" },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  return `$${(value / 1000).toFixed(0)}K`;
};

const isContractEndingSoon = (dateString: string) => {
  const endDate = new Date(dateString);
  const today = new Date();
  const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 90 && diffDays > 0;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });
};

function getDomainStats(sites: Site[], domain: Domain) {
  const domainSites = sites.filter((site) => {
    if (domain === "REFM") return site.isREFM;
    if (domain === "TIR") return site.isTIR;
    if (domain === "Physical Security") return site.isPhysicalSecurity;
    if (domain === "EHS Facility") return site.isEHS;
    return false;
  });

  return {
    siteCount: domainSites.length,
    totalBudget: domainSites.reduce((sum, s) => sum + s.totalCost, 0),
    avgOccupancy:
      domainSites.length > 0
        ? domainSites.reduce((sum, s) => sum + s.occupancyPercent, 0) / domainSites.length
        : 0,
    smallSiteCandidates: domainSites.filter((s) => s.isSmallSiteCandidate).length,
  };
}

const domainConfig: { domain: Domain; icon: typeof Building2; color: string }[] = [
  { domain: "REFM", icon: Building2, color: "text-primary" },
  { domain: "TIR", icon: Zap, color: "text-amber-500" },
  { domain: "Physical Security", icon: Shield, color: "text-blue-500" },
  { domain: "EHS Facility", icon: Leaf, color: "text-green-500" },
];

function SiteRow({ site }: { site: Site }) {
  const [isOpen, setIsOpen] = useState(false);
  const contractEndingSoon = isContractEndingSoon(site.contractEndDate);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "Under Review":
        return "bg-amber-500/10 text-amber-700 border-amber-200";
      case "Approved to Close":
        return "bg-red-500/10 text-red-700 border-red-200";
      default:
        return "";
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <TableRow className="hover:bg-secondary/30 transition-colors">
        <TableCell className="w-[200px]">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{site.siteName}</span>
            {site.isSmallSiteCandidate && (
              <Badge variant="destructive" className="text-xs py-0">
                <TrendingDown className="w-3 h-3 mr-1" />
                SSP
              </Badge>
            )}
          </div>
        </TableCell>
        <TableCell className="w-[180px]">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="text-sm truncate">{site.city}, {site.country}</span>
          </div>
        </TableCell>
        <TableCell className="w-[120px]">
          <Badge className={`${getStatusColor(site.status)} border`}>
            {site.status}
          </Badge>
        </TableCell>
        <TableCell className="w-[150px]">
          <div className="flex items-center gap-2">
            <Progress value={site.occupancyPercent} className="h-2 flex-1 max-w-[80px]" />
            <span className={`text-sm font-medium min-w-[40px] text-right ${
              site.occupancyPercent < 40 ? 'text-amber-600' : 'text-foreground'
            }`}>
              {site.occupancyPercent}%
            </span>
          </div>
        </TableCell>
        <TableCell className="w-[120px] text-right">
          <span className="font-medium text-foreground">{formatCurrency(site.fy25Actual)}</span>
        </TableCell>
        <TableCell className="w-[130px]">
          <div className="flex items-center gap-1">
            {contractEndingSoon && (
              <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0" />
            )}
            <span className={`text-sm ${contractEndingSoon ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
              {formatDate(site.contractEndDate)}
            </span>
          </div>
        </TableCell>
        <TableCell className="w-[60px] text-center">
          <CollapsibleTrigger asChild>
            <button className="p-1.5 hover:bg-secondary rounded-md transition-colors">
              {isOpen ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </CollapsibleTrigger>
        </TableCell>
      </TableRow>
      <CollapsibleContent asChild>
        <tr>
          <td colSpan={7} className="p-0 border-b">
            <SiteExpandedDetails site={site} />
          </td>
        </tr>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function Regions() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTab = searchParams.get("tab") as Region | null;
  const [activeTab, setActiveTab] = useState<Region>(initialTab || "NA");

  useEffect(() => {
    const tabParam = searchParams.get("tab") as Region | null;
    if (tabParam && regionTabs.some((r) => r.code === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const globalSummary = calculateGlobalSummary(mockSites);

  const getRegionSites = (region: Region) => mockSites.filter((s) => s.region === region);

  const getRegionStats = (region: Region) => {
    const sites = getRegionSites(region);
    return {
      totalBudget: sites.reduce((sum, s) => sum + s.totalCost, 0),
      siteCount: sites.length,
      headcount: sites.reduce((sum, s) => sum + s.headcount, 0),
      avgOccupancy:
        sites.length > 0
          ? sites.reduce((sum, s) => sum + s.occupancyPercent, 0) / sites.length
          : 0,
      avgAttendance:
        sites.length > 0
          ? sites.reduce((sum, s) => sum + s.attendancePercent, 0) / sites.length
          : 0,
      smallSiteCandidates: sites.filter((s) => s.isSmallSiteCandidate).length,
    };
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Regions</h1>
          <p className="text-muted-foreground">
            Regional overview with domain breakdown and site details
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Region)}>
          <TabsList className="grid grid-cols-6 w-full max-w-2xl">
            {regionTabs.map((region) => (
              <TabsTrigger key={region.code} value={region.code} className="text-sm">
                {region.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {regionTabs.map((region) => {
            const stats = getRegionStats(region.code);
            const sites = getRegionSites(region.code);

            return (
              <TabsContent key={region.code} value={region.code} className="space-y-6 mt-6">
                {/* Region Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/20 p-2.5">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Budget</p>
                        <p className="text-2xl font-bold text-foreground">
                          {formatCurrency(stats.totalBudget)}
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-secondary p-2.5">
                        <Building2 className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Sites</p>
                        <p className="text-2xl font-bold text-foreground">{stats.siteCount}</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-secondary p-2.5">
                        <Users className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Occupancy</p>
                        <p className="text-2xl font-bold text-foreground">
                          {stats.avgOccupancy.toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </Card>
                  {stats.smallSiteCandidates > 0 && (
                    <Card className="p-5 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-warning/20 p-2.5">
                          <AlertTriangle className="w-5 h-5 text-warning" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Small Site Candidates</p>
                          <p className="text-2xl font-bold text-foreground">
                            {stats.smallSiteCandidates}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>

                {/* Domain Breakdown for this Region */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Domain Breakdown</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {domainConfig.map(({ domain, icon: Icon, color }) => {
                      const domainStats = getDomainStats(sites, domain);
                      if (domainStats.siteCount === 0) return null;

                      return (
                        <Card key={domain} className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-4 h-4 ${color}`} />
                              <h3 className="font-medium text-foreground text-sm">{domain}</h3>
                            </div>
                            {domainStats.smallSiteCandidates > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {domainStats.smallSiteCandidates}
                              </Badge>
                            )}
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Sites</span>
                              <span className="font-medium">{domainStats.siteCount}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Budget</span>
                              <span className="font-medium">
                                {formatCurrency(domainStats.totalBudget)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Occupancy</span>
                              <span
                                className={`font-medium ${
                                  domainStats.avgOccupancy < 40 ? "text-warning" : ""
                                }`}
                              >
                                {domainStats.avgOccupancy.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Sites Table with Progressive Disclosure */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Sites</h2>
                  <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table className="table-fixed w-full min-w-[960px]">
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="w-[200px]">Site Name</TableHead>
                            <TableHead className="w-[180px]">Location</TableHead>
                            <TableHead className="w-[120px]">Status</TableHead>
                            <TableHead className="w-[150px]">Occupancy</TableHead>
                            <TableHead className="w-[120px] text-right">Annual Cost</TableHead>
                            <TableHead className="w-[130px]">Contract End</TableHead>
                            <TableHead className="w-[60px] text-center">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sites.map((site) => (
                            <SiteRow key={site.id} site={site} />
                          ))}
                          {sites.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                No sites found in this region
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}