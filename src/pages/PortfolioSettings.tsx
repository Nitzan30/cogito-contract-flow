import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { 
  Settings, 
  Save,
  RotateCcw,
  AlertTriangle,
  Ruler,
  DollarSign,
  Users,
  Clock
} from "lucide-react";
import { defaultSettings, SmallSiteProgramSettings } from "@/data/mockPortfolioData";

export default function PortfolioSettings() {
  const [settings, setSettings] = useState<SmallSiteProgramSettings>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field: keyof SmallSiteProgramSettings, value: string) => {
    const numValue = parseFloat(value) || 0;
    setSettings(prev => ({ ...prev, [field]: numValue }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // In a real app, this would persist to backend/localStorage
    toast({
      title: "Settings Saved",
      description: "Small Site Program thresholds have been updated.",
    });
    setHasChanges(false);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setHasChanges(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Settings className="w-8 h-8" />
            Small Site Program Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure thresholds for identifying small site candidates
          </p>
        </div>

        {/* Thresholds Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Candidate Identification Thresholds
          </h2>
          
          <div className="space-y-6">
            {/* SQM Threshold */}
            <div className="space-y-2">
              <Label htmlFor="sqmThreshold" className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-muted-foreground" />
                SQM Threshold
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="sqmThreshold"
                  type="number"
                  value={settings.sqmThreshold}
                  onChange={(e) => handleChange('sqmThreshold', e.target.value)}
                  className="max-w-[200px]"
                />
                <span className="text-sm text-muted-foreground">
                  Sites ≤ {settings.sqmThreshold} SQM are flagged
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Default: 50 SQM
              </p>
            </div>

            {/* Budget Threshold */}
            <div className="space-y-2">
              <Label htmlFor="budgetThreshold" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                Budget Threshold
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="budgetThreshold"
                  type="number"
                  value={settings.budgetThreshold}
                  onChange={(e) => handleChange('budgetThreshold', e.target.value)}
                  className="max-w-[200px]"
                />
                <span className="text-sm text-muted-foreground">
                  Sites ≤ ${(settings.budgetThreshold / 1000000).toFixed(1)}M are flagged
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Default: $6,000,000
              </p>
            </div>

            {/* Attendance Threshold */}
            <div className="space-y-2">
              <Label htmlFor="attendanceThreshold" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                Attendance Threshold (%)
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="attendanceThreshold"
                  type="number"
                  value={settings.attendanceThreshold}
                  onChange={(e) => handleChange('attendanceThreshold', e.target.value)}
                  className="max-w-[200px]"
                />
                <span className="text-sm text-muted-foreground">
                  Sites below {settings.attendanceThreshold}% attendance trigger alerts
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Default: 20%
              </p>
            </div>

            {/* Consecutive Months */}
            <div className="space-y-2">
              <Label htmlFor="consecutiveMonths" className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                Consecutive Months Threshold
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="consecutiveMonths"
                  type="number"
                  value={settings.consecutiveMonthsThreshold}
                  onChange={(e) => handleChange('consecutiveMonthsThreshold', e.target.value)}
                  className="max-w-[200px]"
                />
                <span className="text-sm text-muted-foreground">
                  Low attendance must persist for {settings.consecutiveMonthsThreshold} months
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Default: 3 months
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t">
            <Button onClick={handleSave} disabled={!hasChanges}>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-5 bg-muted/50">
          <h3 className="font-semibold mb-2">How Site Candidates are Identified</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>Base Trigger:</strong> SQM ≤ threshold OR Total Budget ≤ threshold</li>
            <li>• <strong>EHS Trigger:</strong> Recent or open compliance issues</li>
            <li>• <strong>Security Trigger:</strong> Outdated or insufficient security systems</li>
            <li>• <strong>TIR Trigger:</strong> Critical infrastructure gaps or missing resilience</li>
            <li>• <strong>Attendance Trigger:</strong> Below threshold for consecutive months</li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
