import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  DollarSign,
  TrendingDown,
  AlertTriangle,
  ArrowRight,
  Shield,
  Zap,
  Leaf,
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

  const handleSiteClick = (siteId: string) => {
    navigate(`/portfolio/site/${siteId}`);
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

                {/* Sites Table */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Sites</h2>
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Site Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Cost</TableHead>
                          <TableHead className="text-right">Headcount</TableHead>
                          <TableHead className="text-right">Occupancy</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sites.map((site) => (
                          <TableRow
                            key={site.id}
                            className="cursor-pointer hover:bg-secondary/50"
                            onClick={() => handleSiteClick(site.id)}
                          >
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{site.siteName}</span>
                                {site.isSmallSiteCandidate && (
                                  <Badge variant="destructive" className="text-xs">
                                    <TrendingDown className="w-3 h-3 mr-1" />
                                    Candidate
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{site.country}</p>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{site.siteType}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  site.status === "Active"
                                    ? "default"
                                    : site.status === "Under Review"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {site.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {formatCurrency(site.totalCost)}
                            </TableCell>
                            <TableCell className="text-right">{site.headcount}</TableCell>
                            <TableCell className="text-right">
                              <span
                                className={
                                  site.occupancyPercent < 40 ? "text-warning font-medium" : ""
                                }
                              >
                                {site.occupancyPercent}%
                              </span>
                            </TableCell>
                            <TableCell>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
