import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ExecutiveSummary from "./pages/ExecutiveSummary";
import Contracts from "./pages/Contracts";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";
import Compliance from "./pages/Compliance";
import ProjectPlan from "./pages/ProjectPlan";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import PortfolioRegion from "./pages/PortfolioRegion";
import PortfolioSite from "./pages/PortfolioSite";
import PortfolioSettings from "./pages/PortfolioSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/executive-summary" element={<ExecutiveSummary />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/region/:region" element={<PortfolioRegion />} />
          <Route path="/portfolio/site/:siteId" element={<PortfolioSite />} />
          <Route path="/portfolio/settings" element={<PortfolioSettings />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/project-plan" element={<ProjectPlan />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
