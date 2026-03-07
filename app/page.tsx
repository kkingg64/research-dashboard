"use client";

import { useState, useEffect } from "react";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area
} from "recharts";

// ============================================
// COO Research Data (Static JSON)
// ============================================
const researchData = {
  kpis: {
    totalProjects: 13,
    totalStars: 283000,
    weeklyGrowth: 12500,
    topCategory: "Multi-Agent Frameworks",
    lastUpdated: "2026-03-07 16:00 UTC"
  },
  trending: [
    { name: "LangChain", stars: 100000, growth: 5200, category: "LLM Framework" },
    { name: "AutoGen", stars: 35000, growth: 3800, category: "Multi-Agent" },
    { name: "CrewAI", stars: 30000, growth: 4100, category: "Multi-Agent" },
    { name: "E2B", stars: 30000, growth: 2900, category: "Infrastructure" },
    { name: "Claude Code", stars: 25000, growth: 2200, category: "Coding Agent" },
    { name: "CopilotKit", stars: 20000, growth: 1800, category: "Frontend" },
    { name: "MCP", stars: 15000, growth: 4500, category: "Protocol" },
    { name: "ActivePieces", stars: 15000, growth: 1600, category: "Workflow" },
    { name: "CUA", stars: 10000, growth: 1200, category: "Computer-Use" },
    { name: "OpenSandbox", stars: 5000, growth: 800, category: "Sandbox" },
  ],
  marketTrends: [
    { month: "Jan", agents: 4200, frameworks: 1800, infrastructure: 900 },
    { month: "Feb", agents: 5100, frameworks: 2200, infrastructure: 1200 },
    { month: "Mar", agents: 6400, frameworks: 2800, infrastructure: 1600 },
  ],
  opportunities: [
    { 
      id: 1, 
      name: "MCP Ecosystem", 
      roi: "⭐⭐⭐", 
      risk: "Low",
      action: "Build MCP connectors for internal tools",
      timeline: "Short-term"
    },
    { 
      id: 2, 
      name: "CrewAI Enterprise", 
      roi: "⭐⭐⭐", 
      risk: "Medium",
      action: "Develop vertical-specific Crew templates",
      timeline: "Medium-term"
    },
    { 
      id: 3, 
      name: "AutoGen + MCP", 
      roi: "⭐⭐", 
      risk: "Low",
      action: "Create AutoGen MCP integration templates",
      timeline: "Short-term"
    },
    { 
      id: 4, 
      name: "Computer-Use Agents", 
      roi: "⭐⭐", 
      risk: "High",
      action: "Pilot CUA for QA automation",
      timeline: "Long-term"
    },
  ],
  competitors: [
    { name: "AgentOps", score: 85, features: 90, community: 75, docs: 80 },
    { name: "TruLens", score: 78, features: 70, community: 65, docs: 85 },
    { name: "MLflow", score: 92, features: 95, community: 90, docs: 88 },
    { name: "Braintrust", score: 70, features: 65, community: 60, docs: 75 },
    { name: "Genie", score: 65, features: 55, community: 45, docs: 60 },
  ],
  researchSummary: {
    focus: "AI Agent Tools & Frameworks",
    hotness: 5,
    keyInsight: "MCP becoming de-facto standard - 400+ MCP servers available",
    topRecommendation: "Build MCP connectors before competition",
  }
};

// Theme
const theme = {
  primary: "#1E3A5F",
  secondary: "#2DD4BF",
  accent: "#F59E0B",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  text: "#1F2937",
  textSecondary: "#6B7280",
};

const COLORS = ['#1E3A5F', '#2DD4BF', '#F59E0B', '#10B981', '#EF4444'];

const KPICard = ({ label, value, change, icon, delay = 0 }: { label: string; value: string | number; change?: string; icon: string; delay?: number }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), delay * 80);
    return () => clearTimeout(timer);
  }, [delay]);
  
  const isPositive = change && !change.includes("-");
  
  return (
    <div 
      style={{ 
        background: "linear-gradient(135deg, #1E3A5F 0%, #2DD4BF 100%)",
        borderRadius: "12px",
        padding: "20px",
        color: "white",
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated ? "scale(1)" : "scale(0.95)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: "12px", opacity: 0.8, marginBottom: "4px" }}>{label}</p>
          <p style={{ fontSize: "28px", fontWeight: "700" }}>{value}</p>
          {change && (
            <p style={{ fontSize: "12px", marginTop: "4px", color: isPositive ? "#86EFAC" : "#FCA5A5" }}>
              {isPositive ? "↑" : "↓"} {change}
            </p>
          )}
        </div>
        <span style={{ fontSize: "24px" }}>{icon}</span>
      </div>
    </div>
  );
};

const Card = ({ children, delay = 0, title }: { children: React.ReactNode; delay?: number; title?: string }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), delay * 100);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      style={{ 
        background: theme.card,
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        border: "1px solid #E5E7EB",
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.4s ease",
      }}
    >
      {title && (
        <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: theme.primary }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default function ResearchDashboard() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  const { kpis, trending, marketTrends, opportunities, competitors, researchSummary } = researchData;

  // Process category data for pie chart
  const categoryData = trending.reduce((acc: { category: string; value: number }[], item) => {
    const existing = acc.find(a => a.category === item.category);
    if (existing) {
      existing.value += item.stars;
    } else {
      acc.push({ category: item.category, value: item.stars });
    }
    return acc;
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, fontFamily: "Inter, system-ui, sans-serif" }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <header style={{ 
        background: "white",
        borderBottom: "1px solid #E5E7EB",
        padding: "16px 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ 
              width: "40px", 
              height: "40px", 
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, 
              borderRadius: "8px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
            }}>
              M
            </div>
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: "bold", color: theme.text }}>
                Research Dashboard
              </h1>
              <p style={{ fontSize: "12px", color: theme.textSecondary }}>
                COO Market Intelligence
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "12px", color: theme.textSecondary }}>
              Last updated: {kpis.lastUpdated}
            </span>
            <button style={{
              background: theme.primary,
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "pointer",
            }}>
              ↻ Refresh
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px" }}>
        
        {/* KPI Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <KPICard label="Total Projects" value={kpis.totalProjects} change="+3" icon="📊" delay={0} />
          <KPICard label="Total Stars" value={`${(kpis.totalStars / 1000).toFixed(0)}k`} change="+12.5k" icon="⭐" delay={1} />
          <KPICard label="Weekly Growth" value={`+${kpis.weeklyGrowth.toLocaleString()}`} change="+8%" icon="📈" delay={2} />
          <KPICard label="Top Category" value={kpis.topCategory} icon="🏆" delay={3} />
        </div>

        {/* Main Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginBottom: "24px" }}>
          
          {/* Trending Chart */}
          <Card title="📈 GitHub Stars Trending (Top 10)" delay={4}>
            <div style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trending.slice(0, 8)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                  />
                  <Bar dataKey="stars" fill={theme.primary} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Research Summary */}
          <Card title="🔬 Research Summary" delay={5}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ 
                background: `linear-gradient(135deg, ${theme.primary}10, ${theme.secondary}10)`, 
                padding: "16px", 
                borderRadius: "8px",
                border: `1px solid ${theme.primary}20`
              }}>
                <p style={{ fontSize: "12px", color: theme.textSecondary, marginBottom: "4px" }}>Current Focus</p>
                <p style={{ fontSize: "16px", fontWeight: "600", color: theme.primary }}>{researchSummary.focus}</p>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <p style={{ fontSize: "14px", color: theme.textSecondary }}>Hotness Score:</p>
                <div style={{ display: "flex" }}>
                  {[1,2,3,4,5].map(i => (
                    <span key={i} style={{ fontSize: "16px", color: i <= researchSummary.hotness ? theme.danger : "#E5E7EB" }}>
                      {i <= researchSummary.hotness ? "🔥" : "❄️"}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ fontSize: "12px", color: theme.textSecondary, marginBottom: "4px" }}>Key Insight</p>
                <p style={{ fontSize: "14px", color: theme.text }}>{researchSummary.keyInsight}</p>
              </div>

              <div style={{ 
                background: theme.success + "10", 
                padding: "12px", 
                borderRadius: "8px",
                borderLeft: `4px solid ${theme.success}`
              }}>
                <p style={{ fontSize: "12px", color: theme.textSecondary, marginBottom: "4px" }}>Top Recommendation</p>
                <p style={{ fontSize: "14px", fontWeight: "500", color: theme.success }}>{researchSummary.topRecommendation}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Second Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
          
          {/* Market Trends */}
          <Card title="📊 Market Growth Trends" delay={6}>
            <div style={{ height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="agents" stackId="1" stroke={theme.primary} fill={theme.primary} fillOpacity={0.6} />
                  <Area type="monotone" dataKey="frameworks" stackId="2" stroke={theme.secondary} fill={theme.secondary} fillOpacity={0.6} />
                  <Area type="monotone" dataKey="infrastructure" stackId="3" stroke={theme.accent} fill={theme.accent} fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Business Opportunities */}
          <Card title="💰 Business Opportunities" delay={7}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "250px", overflowY: "auto" }}>
              {opportunities.map((opp) => (
                <div key={opp.id} style={{ 
                  padding: "12px", 
                  background: "#F9FAFB", 
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <span style={{ fontWeight: "600", fontSize: "14px", color: theme.text }}>{opp.name}</span>
                    <span style={{ fontSize: "12px", color: theme.accent }}>{opp.roi}</span>
                  </div>
                  <p style={{ fontSize: "12px", color: theme.textSecondary, marginBottom: "4px" }}>{opp.action}</p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ 
                      fontSize: "10px", 
                      padding: "2px 8px", 
                      borderRadius: "4px", 
                      background: opp.risk === "Low" ? theme.success + "20" : opp.risk === "Medium" ? theme.warning + "20" : theme.danger + "20",
                      color: opp.risk === "Low" ? theme.success : opp.risk === "Medium" ? theme.warning : theme.danger,
                    }}>
                      {opp.risk} Risk
                    </span>
                    <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "4px", background: "#E5E7EB", color: theme.textSecondary }}>
                      {opp.timeline}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Third Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          
          {/* Competitor Analysis */}
          <Card title="🏢 Competitor Analysis" delay={8}>
            <div style={{ height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={competitors}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar name="Score" dataKey="score" stroke={theme.primary} fill={theme.primary} fillOpacity={0.3} />
                  <Radar name="Features" dataKey="features" stroke={theme.secondary} fill={theme.secondary} fillOpacity={0.3} />
                  <Radar name="Community" dataKey="community" stroke={theme.accent} fill={theme.accent} fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Category Distribution */}
          <Card title="🥧 Category Distribution" delay={9}>
            <div style={{ height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

      </main>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "24px", color: theme.textSecondary, fontSize: "12px" }}>
        <p>MADHORSE Ltd. Research Dashboard | Data Source: COO Market Research | © 2026</p>
      </footer>
    </div>
  );
}
