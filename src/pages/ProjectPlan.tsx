import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Milestone, 
  ChevronRight, 
  Clock, 
  ShieldAlert,
  Layout,
  Database,
  Server,
  TrendingUp,
  Flag
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";

// --- Project Data ---
const projectDuration = 26; // weeks

const phases = [
  {
    id: 1,
    title: "Phase 1: Initiation & Foundation",
    weeks: [1, 4], // Start week, End week (inclusive)
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-700",
    icon: Flag,
    focus: "Executive Approval & Infrastructure",
    tasks: [
      "Week 1: Executive Approval & Budget",
      "Week 2: Kick-off & Data Definitions",
      "Week 3: Infra Provisioning (Data Lake)",
      "Week 4: Security & Compliance Review"
    ]
  },
  {
    id: 2,
    title: "Phase 2: Data Integration",
    weeks: [5, 10],
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-700",
    icon: Database,
    focus: "Connecting Silos (Finance, HR, Contract)",
    tasks: [
      "Wk 5-6: Finance System Integration",
      "Wk 7-8: ServiceNow & Contract API",
      "Wk 9: HR/Attendance Integration",
      "Wk 10: Data Cleaning & Normalization"
    ]
  },
  {
    id: 3,
    title: "Phase 3: Logic & AI Development",
    weeks: [11, 16],
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50",
    textColor: "text-indigo-700",
    icon: TrendingUp,
    focus: "The 'Brain' (Aggregation & Anomaly AI)",
    tasks: [
      "Wk 11-12: Aggregation Logic (4-Tier)",
      "Wk 13-14: Anomaly Detection Algos",
      "Wk 15: Risk Scoring Models",
      "Wk 16: Backend Testing"
    ]
  },
  {
    id: 4,
    title: "Phase 4: Dashboard & UI",
    weeks: [17, 22],
    color: "bg-amber-500",
    lightColor: "bg-amber-50",
    textColor: "text-amber-700",
    icon: Layout,
    focus: "Command Center Visualization",
    tasks: [
      "Wk 17-18: Executive Dashboard Dev",
      "Wk 19: Regional/Site Views",
      "Wk 20: Actionable Features",
      "Wk 21-22: UAT (Pilot Group)"
    ]
  },
  {
    id: 5,
    title: "Phase 5: Deployment",
    weeks: [23, 26],
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    icon: CheckCircle2,
    focus: "Go-Live & Handover",
    tasks: [
      "Wk 23: Bug Fixes & Tuning",
      "Wk 24: GLOBAL GO-LIVE",
      "Wk 25: Training Sessions",
      "Wk 26: Project Closure & Handoff"
    ]
  }
];

const milestones = [
  { week: 4, label: "Infra Ready" },
  { week: 10, label: "Pipelines Active" },
  { week: 16, label: "Risk Engine Alpha" },
  { week: 22, label: "UAT Complete" },
  { week: 26, label: "System Live" },
];

const team = [
  { role: "Executive Sponsor", count: "1", resp: "Approval & Budget", highlight: false },
  { role: "Project Manager", count: "1", resp: "Timeline & Comms", highlight: false },
  { role: "Data Team (Core)", count: "2-3 FTEs", resp: "AI Logic & Modeling", highlight: true },
  { role: "Integration Specialists", count: "Varies", resp: "System Connectors", highlight: false },
  { role: "IT/Infra Team", count: "Part-time", resp: "Security & Access", highlight: false },
];

const risks = [
  { risk: "Data Quality Issues", impact: "High", mitigation: "Dedicate Wk 10-11 to cleansing. Early validation by Data Team." },
  { risk: "Integration Delays", impact: "Medium", mitigation: "Secure specialists early. Use flat-file fallback if API slow." },
  { risk: "Scope Creep", impact: "Medium", mitigation: "Strict adherence to 'Four-Tier' scope. Push extras to Phase 2." },
];

// --- Sub-components ---

const GanttBar = ({ phase, totalWeeks }: { phase: typeof phases[0], totalWeeks: number }) => {
  const startCol = phase.weeks[0];
  const span = phase.weeks[1] - phase.weeks[0] + 1;
  
  return (
    <div 
      className={`relative h-12 rounded-lg shadow-sm border border-white/20 flex items-center px-3 transition-all hover:scale-[1.01] cursor-default group ${phase.color} text-white`}
      style={{
        gridColumnStart: startCol,
        gridColumnEnd: `span ${span}`,
      }}
    >
      <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
        <phase.icon className="w-4 h-4 shrink-0" />
        <span className="text-sm font-semibold truncate">{phase.title}</span>
      </div>
      
      {/* Tooltip for Phase Details */}
      <div className="absolute top-14 left-0 z-10 hidden group-hover:block w-64 p-4 bg-card text-card-foreground rounded-xl shadow-xl border border-border">
        <h4 className="font-bold text-sm mb-1">{phase.title}</h4>
        <p className="text-xs text-muted-foreground mb-2 font-medium">{phase.focus}</p>
        <ul className="text-xs space-y-1">
          {phase.tasks.map((task, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="mt-0.5 w-1 h-1 rounded-full bg-muted shrink-0" />
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const WeekMarker = ({ num }: { num: string }) => (
  <div className="flex flex-col items-center justify-end h-full pb-2">
    <div className="h-2 w-px bg-border mb-1" />
    <span className="text-[10px] text-muted-foreground font-mono">{num}</span>
  </div>
);

export default function ProjectPlan() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Project Plan: BudgetMaster 360</h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4" />
              6 Month Timeline (26 Weeks)
              <span className="text-muted">|</span>
              <span className="font-medium text-primary">Target Go-Live: Month 6</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              Export Plan
            </Button>
            <Button>
              Share with Stakeholders
            </Button>
          </div>
        </div>

        {/* GANTT CHART SECTION */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Implementation Timeline
              </CardTitle>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Initiation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>Integration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span>AI Logic</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span>UI/Dash</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span>Deploy</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto pb-4">
              <div className="min-w-[1000px]">
                {/* Grid Background */}
                <div className="grid grid-cols-[repeat(26,minmax(0,1fr))] gap-1 mb-2">
                  {Array.from({ length: 26 }).map((_, i) => (
                     <WeekMarker key={i} num={`W${i + 1}`} />
                  ))}
                </div>

                {/* Phases Bars */}
                <div className="grid grid-cols-[repeat(26,minmax(0,1fr))] gap-y-3 gap-x-1 relative z-10">
                  {phases.map((phase) => (
                    <React.Fragment key={phase.id}>
                      {/* Row for the bar */}
                      <div className="col-span-full grid grid-cols-[repeat(26,minmax(0,1fr))] gap-1">
                        <GanttBar phase={phase} totalWeeks={26} />
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                {/* Milestones Markers */}
                <div className="grid grid-cols-[repeat(26,minmax(0,1fr))] gap-1 mt-4 border-t border-border pt-4">
                  {milestones.map((m, i) => (
                    <div 
                      key={i} 
                      className="flex flex-col items-center relative group"
                      style={{ gridColumnStart: m.week, gridColumnEnd: `span 1` }}
                    >
                      <div className="w-3 h-3 bg-foreground rotate-45 mb-2 shadow-sm border border-card" />
                      <div className="absolute top-6 w-24 text-center">
                        <p className="text-[10px] font-bold text-foreground leading-tight">{m.label}</p>
                      </div>
                      {/* Vertical line connector */}
                      <div className="absolute bottom-6 w-px h-48 border-l border-dashed border-border -z-10 opacity-50 pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DETAILS GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Phase Details List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-primary" />
                Phase Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {phases.map((phase) => (
                  <div key={phase.id} className={`p-4 rounded-xl border transition-colors ${phase.lightColor} ${phase.textColor} border-transparent hover:border-current/20`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold flex items-center gap-2">
                        <phase.icon className="w-4 h-4" />
                        {phase.title}
                      </h3>
                      <Badge variant="secondary">Weeks {phase.weeks[0]}-{phase.weeks[1]}</Badge>
                    </div>
                    <p className="text-sm opacity-90 mb-3 font-medium">{phase.focus}</p>
                    <div className="grid grid-cols-1 gap-1">
                      {phase.tasks.map((task, idx) => (
                         <div key={idx} className="flex items-center gap-2 text-sm opacity-80">
                           <ChevronRight className="w-3 h-3" />
                           {task}
                         </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resources & Risks */}
          <div className="space-y-6">
            
            {/* Team Structure */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Resource Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {team.map((member, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${member.highlight ? 'bg-primary/10 border-primary/20' : 'bg-card border-border'}`}>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{member.role}</p>
                        <p className="text-xs text-muted-foreground">{member.resp}</p>
                      </div>
                      <Badge variant={member.highlight ? 'default' : 'secondary'}>{member.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  Risk Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {risks.map((risk, i) => (
                    <div key={i} className="bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200 dark:border-amber-900">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-sm text-amber-900 dark:text-amber-100">{risk.risk}</p>
                        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900 px-1.5 py-0.5 rounded">{risk.impact} Impact</span>
                      </div>
                      <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                        <span className="font-semibold">Mitigation:</span> {risk.mitigation}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
