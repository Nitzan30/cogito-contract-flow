import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  MapPin, 
  ArrowRight, 
  ArrowLeft,
  Building,
  Users,
  DollarSign,
  AlertTriangle,
  TrendingDown,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import { mockSites, getSitesByRegion } from "@/data/mockPortfolioData";
import { Region, Site } from "@/types/portfolio";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return `$${(value / 1000).toFixed(0)}K`;
};

const getStatusBadge = (status: Site['status']) => {
  const variants: Record<Site['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ReactNode }> = {
    'Active': { variant: 'default', icon: <CheckCircle className="w-3 h-3" /> },
    'Under Review': { variant: 'secondary', icon: <Clock className="w-3 h-3" /> },
    'Approved to Close': { variant: 'destructive', icon: <XCircle className="w-3 h-3" /> },
    'Keep & Reduce': { variant: 'outline', icon: <TrendingDown className="w-3 h-3" /> },
    'Closed': { variant: 'secondary', icon: <XCircle className="w-3 h-3" /> },
  };
  const config = variants[status];
  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      {config.icon}
      {status}
    </Badge>
  );
};

const getProgramStatusBadge = (status: Site['programStatus']) => {
  if (status === 'Not Evaluated') return null;
  const colors: Record<Site['programStatus'], string> = {
    'Not Evaluated': '',
    'Under Review': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    'Check – Regulatory': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    'Check – Legal': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    'Check – Admin/Security': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    'Recommend Closure': 'bg-red-500/10 text-red-600 border-red-500/20',
    'Retain & Optimize': 'bg-green-500/10 text-green-600 border-green-500/20',
  };
  return <Badge className={colors[status]}>{status}</Badge>;
};

export default function PortfolioRegion() {
  const { region } = useParams<{ region: string }>();
  const navigate = useNavigate();

  const validRegion = region as Region;
  const sites = getSitesByRegion(mockSites, validRegion);

  const totalBudget = sites.reduce((sum, site) => sum + site.totalCost, 0);
  const avgOccupancy = sites.length > 0 ? sites.reduce((sum, site) => sum + site.occupancyPercent, 0) / sites.length : 0;
  const avgAttendance = sites.length > 0 ? sites.reduce((sum, site) => sum + site.attendancePercent, 0) / sites.length : 0;
  const smallSiteCandidates = sites.filter(s => s.isSmallSiteCandidate).length;
  const totalHeadcount = sites.reduce((sum, site) => sum + site.headcount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button 
            onClick={() => navigate('/portfolio')}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <Globe className="w-4 h-4" />
            Global
          </button>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-primary font-semibold flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {validRegion}
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{validRegion} Region</h1>
            <p className="text-muted-foreground">L4 Site Entities in {validRegion}</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/portfolio')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Global
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Total Budget</p>
                <p className="text-xl font-bold">{formatCurrency(totalBudget)}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Sites</p>
                <p className="text-xl font-bold">{sites.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Headcount</p>
                <p className="text-xl font-bold">{totalHeadcount.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <TrendingDown className={`w-5 h-5 ${avgOccupancy < 40 ? 'text-warning' : 'text-success'}`} />
              <div>
                <p className="text-xs text-muted-foreground">Avg Occupancy</p>
                <p className="text-xl font-bold">{avgOccupancy.toFixed(0)}%</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-warning/5 border-warning/20">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <div>
                <p className="text-xs text-muted-foreground">Small Site Candidates</p>
                <p className="text-xl font-bold">{smallSiteCandidates}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Sites Table */}
        <Card>
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Sites in {validRegion}</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Site Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">SQM</TableHead>
                  <TableHead className="text-right">Headcount</TableHead>
                  <TableHead className="text-right">Attendance</TableHead>
                  <TableHead className="text-right">Occupancy</TableHead>
                  <TableHead className="text-right">Total Cost</TableHead>
                  <TableHead>Program Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sites.map((site) => (
                  <TableRow key={site.id} className={site.isSmallSiteCandidate ? 'bg-warning/5' : ''}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {site.isSmallSiteCandidate && (
                          <AlertTriangle className="w-4 h-4 text-warning" />
                        )}
                        <div>
                          <p className="font-medium">{site.siteName}</p>
                          <p className="text-xs text-muted-foreground">{site.country}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{site.siteType}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(site.status)}</TableCell>
                    <TableCell className="text-right">
                      <span className={site.sqm <= 50 ? 'text-warning font-medium' : ''}>
                        {site.sqm.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{site.headcount}</TableCell>
                    <TableCell className="text-right">
                      <span className={site.attendancePercent < 20 ? 'text-destructive font-medium' : ''}>
                        {site.attendancePercent}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={site.occupancyPercent < 40 ? 'text-warning font-medium' : ''}>
                        {site.occupancyPercent}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(site.totalCost)}
                    </TableCell>
                    <TableCell>
                      {getProgramStatusBadge(site.programStatus)}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/portfolio/site/${site.id}`)}
                      >
                        View <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
