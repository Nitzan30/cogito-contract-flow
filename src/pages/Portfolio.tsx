import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Building2, 
  MapPin, 
  ArrowRight, 
  TrendingDown,
  Users,
  DollarSign,
  AlertTriangle
} from "lucide-react";
import { mockSites, calculateGlobalSummary } from "@/data/mockPortfolioData";
import { Domain, Region } from "@/types/portfolio";
import { useNavigate } from "react-router-dom";

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return `$${(value / 1000).toFixed(0)}K`;
};

export default function Portfolio() {
  const navigate = useNavigate();
  const [viewLevel, setViewLevel] = useState<'global' | 'domain' | 'region'>('global');
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const globalSummary = calculateGlobalSummary(mockSites);

  const handleDomainClick = (domain: Domain) => {
    setSelectedDomain(domain);
    setViewLevel('domain');
  };

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region);
    navigate(`/portfolio/region/${region}`);
  };

  const handleBackToGlobal = () => {
    setViewLevel('global');
    setSelectedDomain(null);
    setSelectedRegion(null);
  };

  const filteredRegions = selectedDomain 
    ? globalSummary.regionBreakdown.filter(r => r.domains.includes(selectedDomain))
    : globalSummary.regionBreakdown;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button 
            onClick={handleBackToGlobal}
            className={`flex items-center gap-1 ${viewLevel === 'global' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Globe className="w-4 h-4" />
            Global
          </button>
          {selectedDomain && (
            <>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-primary font-semibold">{selectedDomain}</span>
            </>
          )}
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {viewLevel === 'global' ? 'Global Portfolio Overview' : `${selectedDomain} Domain`}
            </h1>
            <p className="text-muted-foreground">
              {viewLevel === 'global' 
                ? 'L1 → L2 → L3 → L4 Hierarchy Navigation' 
                : `Viewing ${selectedDomain} across all regions`}
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/portfolio/settings')}>
            Program Settings
          </Button>
        </div>

        {/* Global Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/20 p-2.5">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(globalSummary.totalBudget)}</p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary p-2.5">
                <Building2 className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sites</p>
                <p className="text-2xl font-bold text-foreground">{globalSummary.totalSites}</p>
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
                <p className="text-2xl font-bold text-foreground">{globalSummary.avgOccupancy.toFixed(0)}%</p>
              </div>
            </div>
          </Card>
          <Card className="p-5 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/20 p-2.5">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Small Site Candidates</p>
                <p className="text-2xl font-bold text-foreground">{globalSummary.smallSiteCandidates}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* L2: Domains */}
        {viewLevel === 'global' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              L2: Domains
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {globalSummary.domainBreakdown.filter(d => d.siteCount > 0).map((domain) => (
                <Card 
                  key={domain.domain} 
                  className="p-5 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => handleDomainClick(domain.domain)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{domain.domain}</h3>
                      <p className="text-sm text-muted-foreground">{domain.siteCount} sites</p>
                    </div>
                    <Badge variant={domain.smallSiteCandidates > 0 ? "destructive" : "secondary"}>
                      {domain.smallSiteCandidates} candidates
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Budget</span>
                      <span className="font-medium">{formatCurrency(domain.totalBudget)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg Occupancy</span>
                      <span className="font-medium">{domain.avgOccupancy.toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg Attendance</span>
                      <span className="font-medium">{domain.avgAttendance.toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t flex items-center justify-end text-sm text-primary">
                    View Regions <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* L3: Regions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            L3: Regions {selectedDomain && `(${selectedDomain})`}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRegions.filter(r => r.siteCount > 0).map((region) => (
              <Card 
                key={region.region} 
                className="p-5 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => handleRegionClick(region.region)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{region.region}</h3>
                    <p className="text-sm text-muted-foreground">{region.siteCount} sites</p>
                  </div>
                  {region.smallSiteCandidates > 0 && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      {region.smallSiteCandidates}
                    </Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-medium">{formatCurrency(region.totalBudget)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg Occupancy</span>
                    <span className={`font-medium ${region.avgOccupancy < 40 ? 'text-warning' : ''}`}>
                      {region.avgOccupancy.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg Attendance</span>
                    <span className={`font-medium ${region.avgAttendance < 30 ? 'text-destructive' : ''}`}>
                      {region.avgAttendance.toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {region.domains.slice(0, 3).map(d => (
                    <Badge key={d} variant="outline" className="text-xs">{d}</Badge>
                  ))}
                  {region.domains.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{region.domains.length - 3}</Badge>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t flex items-center justify-end text-sm text-primary">
                  View Sites <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
