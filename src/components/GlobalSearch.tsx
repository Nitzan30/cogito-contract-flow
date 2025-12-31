import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Building2, User, X, DollarSign, FileText, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockSites } from "@/data/mockPortfolioData";
import { Region, Site } from "@/types/portfolio";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface SearchResult {
  type: "region" | "site" | "manager" | "city" | "status" | "building" | "comment";
  label: string;
  sublabel?: string;
  matchedIn?: string;
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

// Deep search function that indexes all fields of a site
function deepSearchSite(site: Site, query: string): { matched: boolean; matchedFields: string[] } {
  const lowerQuery = query.toLowerCase();
  const matchedFields: string[] = [];

  // Check all string and number fields
  const fieldsToCheck: { key: keyof Site; label: string }[] = [
    { key: 'siteName', label: 'Site Name' },
    { key: 'address', label: 'Address' },
    { key: 'city', label: 'City' },
    { key: 'country', label: 'Country' },
    { key: 'region', label: 'Region' },
    { key: 'siteType', label: 'Site Type' },
    { key: 'status', label: 'Status' },
    { key: 'buildingCode', label: 'Building Code' },
    { key: 'buildingTypeName', label: 'Building Type' },
    { key: 'unit', label: 'Unit' },
    { key: 'generalManager', label: 'General Manager' },
    { key: 'siteLeadership', label: 'Site Leadership' },
    { key: 'adminOwnerName', label: 'Admin Owner' },
    { key: 'adminOwnerEmail', label: 'Admin Email' },
    { key: 'businessUnit', label: 'Business Unit' },
    { key: 'regulation', label: 'Regulation' },
    { key: 'commentsLog', label: 'Comments' },
    { key: 'statusSummary', label: 'Status Summary' },
    { key: 'planonBuildingStatus', label: 'Planon Status' },
  ];

  for (const field of fieldsToCheck) {
    const value = site[field.key];
    if (value && String(value).toLowerCase().includes(lowerQuery)) {
      matchedFields.push(field.label);
    }
  }

  // Check numeric fields with formatting
  const numericFields: { key: keyof Site; label: string }[] = [
    { key: 'totalCost', label: 'Total Cost' },
    { key: 'fy25Actual', label: 'FY25 Budget' },
    { key: 'fy26Projection', label: 'FY26 Projection' },
    { key: 'potentialSavings', label: 'Potential Savings' },
    { key: 'headcount', label: 'Headcount' },
    { key: 'occupancyPercent', label: 'Occupancy' },
    { key: 'attendancePercent', label: 'Attendance' },
  ];

  for (const field of numericFields) {
    const value = site[field.key];
    if (value !== undefined && String(value).includes(query)) {
      matchedFields.push(field.label);
    }
  }

  return { matched: matchedFields.length > 0, matchedFields };
}

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedSite, setSelectedSite] = useState<typeof mockSites[0] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];
    const addedSiteIds = new Set<string>();

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
          matchedIn: "Region Name",
          region: region.code,
        });
      }
    });

    // Deep search all sites
    mockSites.forEach((site) => {
      if (addedSiteIds.has(site.id)) return;

      const { matched, matchedFields } = deepSearchSite(site, query);
      
      if (matched) {
        addedSiteIds.add(site.id);
        searchResults.push({
          type: "site",
          label: site.siteName,
          sublabel: `${site.city}, ${site.country}`,
          matchedIn: matchedFields.slice(0, 2).join(", "),
          region: site.region,
          siteId: site.id,
        });
      }
    });

    // Search managers separately for manager-specific results
    const managers = new Map<string, { name: string; email: string; region: Region; siteName: string }>();
    mockSites.forEach((site) => {
      if (
        site.adminOwnerName.toLowerCase().includes(lowerQuery) ||
        site.adminOwnerEmail.toLowerCase().includes(lowerQuery) ||
        site.generalManager.toLowerCase().includes(lowerQuery) ||
        site.siteLeadership.toLowerCase().includes(lowerQuery)
      ) {
        const key = `${site.adminOwnerEmail}-${site.generalManager}`;
        if (!managers.has(key)) {
          managers.set(key, {
            name: site.adminOwnerName || site.generalManager,
            email: site.adminOwnerEmail,
            region: site.region,
            siteName: site.siteName,
          });
        }
      }
    });
    
    managers.forEach((manager) => {
      searchResults.push({
        type: "manager",
        label: manager.name,
        sublabel: manager.siteName,
        matchedIn: "Manager",
        region: manager.region,
      });
    });

    // Search cities/countries
    const locations = new Map<string, { region: Region; siteName: string }>();
    mockSites.forEach((site) => {
      if (site.country.toLowerCase().includes(lowerQuery) || site.city.toLowerCase().includes(lowerQuery)) {
        const key = `${site.city}-${site.country}`;
        if (!locations.has(key)) {
          locations.set(key, { region: site.region, siteName: site.siteName });
        }
      }
    });
    
    locations.forEach((data, location) => {
      searchResults.push({
        type: "city",
        label: location,
        sublabel: data.region,
        matchedIn: "Location",
        region: data.region,
      });
    });

    // Remove duplicates and limit results
    const uniqueResults = searchResults.filter((result, index, self) => 
      index === self.findIndex(r => r.label === result.label && r.type === result.type)
    );

    setResults(uniqueResults.slice(0, 15));
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === "site" && result.siteId) {
      const site = mockSites.find((s) => s.id === result.siteId);
      if (site) {
        setSelectedSite(site);
        setIsOpen(false);
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
        return <Building2 className="h-4 w-4 text-blue-500" />;
      case "manager":
        return <User className="h-4 w-4 text-purple-500" />;
      case "city":
        return <MapPin className="h-4 w-4 text-emerald-500" />;
      case "status":
        return <Info className="h-4 w-4 text-amber-500" />;
      case "building":
        return <Building2 className="h-4 w-4 text-muted-foreground" />;
      case "comment":
        return <FileText className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Search className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTypeLabel = (type: SearchResult["type"]) => {
    switch (type) {
      case "region": return "Regions";
      case "site": return "Sites";
      case "manager": return "Managers";
      case "city": return "Locations";
      default: return type;
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <>
      <div ref={containerRef} className="relative flex-1 max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search sites, regions, managers, budgets, comments..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-11 pr-10 h-11 bg-secondary/50 border-border focus:bg-background text-base"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Results dropdown */}
        {isOpen && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 max-h-[420px] overflow-y-auto">
            {/* Group by type */}
            {["region", "site", "manager", "city"].map((type) => {
              const typeResults = results.filter((r) => r.type === type);
              if (typeResults.length === 0) return null;

              return (
                <div key={type}>
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/50 sticky top-0">
                    {getTypeLabel(type as SearchResult["type"])}
                  </div>
                  {typeResults.map((result, idx) => (
                    <button
                      key={`${type}-${idx}`}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary/70 text-left transition-colors border-b border-border/50 last:border-b-0"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="shrink-0 p-1.5 rounded-lg bg-secondary">
                        {getIcon(result.type)}
                      </div>
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
                      {result.matchedIn && (
                        <Badge variant="outline" className="text-[10px] px-2 py-0.5 shrink-0 bg-muted/50">
                          Found in: {result.matchedIn}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* No results state */}
        {isOpen && query.length >= 2 && results.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 p-6 text-center">
            <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
            <p className="text-xs text-muted-foreground mt-1">Try searching for sites, managers, or locations</p>
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
              <div className="flex items-center gap-2 flex-wrap">
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
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{selectedSite.city}, {selectedSite.country}</p>
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
                  <p className="text-muted-foreground">General Manager</p>
                  <p className="font-medium">{selectedSite.generalManager}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Business Unit</p>
                  <p className="font-medium">{selectedSite.businessUnit}</p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <button
                  onClick={() => {
                    navigate(`/regions?tab=${selectedSite.region}`);
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