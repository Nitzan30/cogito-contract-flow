import { DashboardLayout } from "@/components/DashboardLayout";
import { ContractCard } from "@/components/ContractCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from "lucide-react";

export default function Contracts() {
  const contracts = [
    {
      id: "1",
      vendor: "Acme Corporation",
      type: "Real Estate Lease",
      value: 450000,
      status: "expiring" as const,
      renewalDate: "Jan 30, 2025",
      riskLevel: "high" as const,
    },
    {
      id: "2",
      vendor: "GlobalTech Services",
      type: "IT Support Agreement",
      value: 125000,
      status: "active" as const,
      renewalDate: "Mar 15, 2025",
      riskLevel: "medium" as const,
    },
    {
      id: "3",
      vendor: "MegaSupply Inc",
      type: "Equipment Purchase",
      value: 280000,
      status: "active" as const,
      renewalDate: "Jun 20, 2025",
      riskLevel: "low" as const,
    },
    {
      id: "4",
      vendor: "CloudHost Systems",
      type: "Cloud Infrastructure",
      value: 95000,
      status: "active" as const,
      renewalDate: "Apr 10, 2025",
      riskLevel: "low" as const,
    },
    {
      id: "5",
      vendor: "Office Solutions Ltd",
      type: "Facility Management",
      value: 180000,
      status: "expiring" as const,
      renewalDate: "Feb 5, 2025",
      riskLevel: "medium" as const,
    },
    {
      id: "6",
      vendor: "Legal Partners LLP",
      type: "Legal Services",
      value: 220000,
      status: "active" as const,
      renewalDate: "Dec 1, 2025",
      riskLevel: "low" as const,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Contract Management</h2>
            <p className="text-muted-foreground">AI-extracted contract intelligence and insights</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search contracts by vendor, type, or ID..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Contracts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contracts.map((contract) => (
            <ContractCard key={contract.id} {...contract} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
