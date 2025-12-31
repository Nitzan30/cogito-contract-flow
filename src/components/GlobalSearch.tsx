import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Building2, User, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockSites } from "@/data/mockPortfolioData";
import { Region } from "@/types/portfolio";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface SearchResult {
  type: "region" | "site" | "manager" | "city";
  label: string;
  sublabel?: string;
  region?: Region;
  siteId?: string;
}

const regions: { code: Region; name: string }[] = [
  { code: "NA", name: "North America" },
  { code: "CALA", name: "Central America & Latin America" },
  { code: "ISR", name: "Israel" },
  { code: "EMEA", name: "Europe, Middle East & Africa" },
  { code: "APAC", name: "Asia Pacific" },
  { code: "IND", name: "India" },
];

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedSite, setSelectedSite] = useState<typeof mockSites[0] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search regions
    regions.forEach((region) => {
      if (
        region.code.toLowerCase().includes(lowerQuery) ||
        region.name.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          type: "region",
          label: region.name,
          sublabel: region.code,
          region: region.code,
        });
      }
    });

    // Search sites
    mockSites.forEach((site) => {
      if (
        site.siteName.toLowerCase().includes(lowerQuery) ||
        site.id.toLowerCase().includes(lowerQuery) ||
        site.address.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          type: "site",
          label: site.siteName,
          sublabel: `${site.region} • ${site.country}`,
          region: site.region,
          siteId: site.id,
        });
      }
    });

    // Search managers
    const managers = new Map<string, { name: string; email: string; region: Region }>();
    mockSites.forEach((site) => {
      if (
        site.adminOwnerName.toLowerCase().includes(lowerQuery) ||
        site.adminOwnerEmail.toLowerCase().includes(lowerQuery)
      ) {
        if (!managers.has(site.adminOwnerEmail)) {
          managers.set(site.adminOwnerEmail, {
            name: site.adminOwnerName,
            email: site.adminOwnerEmail,
            region: site.region,
          });
        }
      }
    });
    managers.forEach((manager) => {
      searchResults.push({
        type: "manager",
        label: manager.name,
        sublabel: manager.email,
        region: manager.region,
      });
    });

    // Search cities/countries
    const locations = new Map<string, Region>();
    mockSites.forEach((site) => {
      if (site.country.toLowerCase().includes(lowerQuery)) {
        if (!locations.has(site.country)) {
          locations.set(site.country, site.region);
        }
      }
    });
    locations.forEach((region, location) => {
      searchResults.push({
        type: "city",
        label: location,
        sublabel: region,
        region: region,
      });
    });

    setResults(searchResults.slice(0, 10));
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === "site" && result.siteId) {
      const site = mockSites.find((s) => s.id === result.siteId);
      if (site) {
        setSelectedSite(site);
      }
    } else if (result.region) {
      navigate(`/regions?tab=${result.region}`);
      setQuery("");
      setIsOpen(false);
    }
  };

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "region":
        return <MapPin className="h-4 w-4 text-primary" />;
      case "site":
        return <Building2 className="h-4 w-4 text-muted-foreground" />;
      case "manager":
        return <User className="h-4 w-4 text-muted-foreground" />;
      case "city":
        return <MapPin className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <>
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search sites, regions, managers..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-9 pr-8 bg-secondary/50 border-border focus:bg-background"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Results dropdown */}
        {isOpen && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
            {/* Group by type */}
            {["region", "site", "manager", "city"].map((type) => {
              const typeResults = results.filter((r) => r.type === type);
              if (typeResults.length === 0) return null;

              return (
                <div key={type}>
                  <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase bg-secondary/50">
                    {type === "city" ? "Locations" : `${type}s`}
                  </div>
                  {typeResults.map((result, idx) => (
                    <button
                      key={`${type}-${idx}`}
                      className="w-full px-3 py-2 flex items-center gap-3 hover:bg-secondary text-left"
                      onClick={() => handleResultClick(result)}
                    >
                      {getIcon(result.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {result.label}
                        </p>
                        {result.sublabel && (
                          <p className="text-xs text-muted-foreground truncate">
                            {result.sublabel}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Site Details Modal */}
      <Dialog open={!!selectedSite} onOpenChange={() => setSelectedSite(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {selectedSite?.siteName}
            </DialogTitle>
          </DialogHeader>
          {selectedSite && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{selectedSite.region}</Badge>
                <Badge variant={selectedSite.status === "Active" ? "default" : "secondary"}>
                  {selectedSite.status}
                </Badge>
                {selectedSite.isSmallSiteCandidate && (
                  <Badge variant="destructive">Small Site Candidate</Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Address</p>
                  <p className="font-medium">{selectedSite.address}, {selectedSite.country}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Site Type</p>
                  <p className="font-medium">{selectedSite.siteType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Cost</p>
                  <p className="font-medium">{formatCurrency(selectedSite.totalCost)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Headcount</p>
                  <p className="font-medium">{selectedSite.headcount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Occupancy</p>
                  <p className="font-medium">{selectedSite.occupancyPercent}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Attendance</p>
                  <p className="font-medium">{selectedSite.attendancePercent}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Admin Owner</p>
                  <p className="font-medium">{selectedSite.adminOwnerName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Business Unit</p>
                  <p className="font-medium">{selectedSite.businessUnit}</p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <button
                  onClick={() => {
                    navigate(`/portfolio/region/${selectedSite.region}`);
                    setSelectedSite(null);
                    setQuery("");
                    setIsOpen(false);
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  View all sites in {selectedSite.region} →
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
