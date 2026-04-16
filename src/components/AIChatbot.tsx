import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Bot, User, X, Minimize2, Maximize2 } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const MOCK_RESPONSES: Record<string, string> = {
  budget: "Based on current data, the global FY25 budget stands at **$167.0M** with **$101.0M realized** (60.5%). The remaining **$66.0M** is allocated across 6 regions. EMEA shows the highest overrun risk at 8.2% projected overspend by Q3, primarily driven by transportation cost increases.",
  anomaly: "I've detected **4 active anomalies** this week:\n\n1. 🔴 **Duplicate invoices** in CALA ($24.7K exposure)\n2. 🟠 **FM cost spike** in Bangalore (+34% MoM)\n3. 🟡 **Attendance drop** at Tel Aviv HQ (47% vs 68% avg)\n4. 🟠 **EHS incidents up** 28% in North America\n\nThe duplicate invoice pattern is the most urgent—recommend immediate AP review.",
  vendor: "**Top vendor risks:**\n\n• **JLL** – 62% FM contract concentration (up from 48%). Diversification recommended.\n• **Sodexo** – 43% price variance across regions. Harmonization could save ~$95K/yr.\n• **SecureGuard** – SLA breaches in 5 of 8 months (APAC). Consider issuing formal notice.\n\nWould you like me to drill into any specific vendor?",
  lease: "**7 leases expiring within 90 days:**\n\n4 of these have **no renewal action** logged in Planon. This is flagged as a **Critical** predictive insight. Immediate action recommended to avoid unfavorable renewal terms.\n\nAffected regions: India (2), NA (3), EMEA (2).",
  cost: "Current cost breakdown per employee (global average):\n\n• Real Estate: **$680/mo**\n• Facility Management: **$320/mo**\n• Meals: **$180/mo**\n• Transportation: **$140/mo**\n\nIndia shows the best cost efficiency at **$420/mo total**, while Israel averages **$1,840/mo** — driven primarily by real estate costs.",
  india: "**India Region Summary:**\n\n• 42 active contracts, $43M total value\n• 96% compliance score\n• FY remaining: $17.42M\n• Key risk: Meals cost trending 12% above inflation\n• FM cost spike at Bangalore Campus (+34%)\n\nOverall, India is performing well but needs attention on meals and the Bangalore FM anomaly.",
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(MOCK_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return "I can help you with insights on **budget**, **anomalies**, **vendors**, **leases**, **costs**, and **regional analysis** (e.g., India, EMEA). What would you like to explore?\n\n💡 *Try asking: \"What are the current anomalies?\" or \"Show vendor risks\"*";
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "👋 Hi! I'm your **OpsLens360 AI Assistant**. I can help you explore operational insights, budget analysis, vendor risks, and anomalies across your portfolio.\n\nTry asking me about budgets, anomalies, vendors, or specific regions!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getMockResponse(input);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-4 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <Card className={`fixed z-50 shadow-2xl border-primary/20 flex flex-col transition-all ${
      isMinimized 
        ? "bottom-6 right-6 w-80 h-14" 
        : "bottom-6 right-6 w-96 h-[540px]"
    }`}>
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/20 p-1.5">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">AI Assistant</p>
            <p className="text-xs text-muted-foreground">SiteLense360</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 rounded hover:bg-secondary">
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-secondary">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="shrink-0 rounded-full bg-primary/10 p-1.5 h-7 w-7 flex items-center justify-center mt-0.5">
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-3 py-2 text-sm max-w-[80%] whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {msg.content.split(/(\*\*.*?\*\*)/).map((part, j) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={j}>{part.slice(2, -2)}</strong>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="shrink-0 rounded-full bg-primary p-1.5 h-7 w-7 flex items-center justify-center mt-0.5">
                    <User className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 items-center">
                <div className="shrink-0 rounded-full bg-primary/10 p-1.5 h-7 w-7 flex items-center justify-center">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="bg-secondary rounded-lg px-3 py-2 text-sm text-muted-foreground">
                  <span className="animate-pulse">Analyzing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about budgets, anomalies, vendors..."
                className="flex-1 text-sm"
              />
              <Button type="submit" size="sm" disabled={!input.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </>
      )}
    </Card>
  );
}
