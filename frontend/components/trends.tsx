"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Activity, Globe, Zap, Droplets, Recycle } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"

const esgTrendData = [
  { month: "Jan", environmental: 72, social: 68, governance: 75, overall: 71.7 },
  { month: "Feb", environmental: 74, social: 70, governance: 76, overall: 73.3 },
  { month: "Mar", environmental: 76, social: 72, governance: 78, overall: 75.3 },
  { month: "Apr", environmental: 78, social: 74, governance: 79, overall: 77.0 },
  { month: "May", environmental: 80, social: 76, governance: 81, overall: 79.0 },
  { month: "Jun", environmental: 82, social: 78, governance: 83, overall: 81.0 },
]

const sectorTrends = [
  { sector: "Technology", q1: 85, q2: 87, q3: 89, q4: 91 },
  { sector: "Healthcare", q1: 78, q2: 80, q3: 82, q4: 84 },
  { sector: "Finance", q1: 72, q2: 74, q3: 76, q4: 78 },
  { sector: "Energy", q1: 45, q2: 52, q3: 58, q4: 65 },
  { sector: "Consumer", q1: 68, q2: 70, q3: 72, q4: 74 },
]

const marketSentiment = [
  { week: "W1", sentiment: 65, volume: 120 },
  { week: "W2", sentiment: 72, volume: 135 },
  { week: "W3", sentiment: 68, volume: 110 },
  { week: "W4", sentiment: 78, volume: 150 },
  { week: "W5", sentiment: 82, volume: 165 },
  { week: "W6", sentiment: 75, volume: 140 },
]

const emergingThemes = [
  {
    theme: "Carbon Neutrality",
    growth: 45.2,
    companies: 1247,
    icon: Recycle,
    color: "text-green-400",
    bgColor: "bg-green-900/20",
  },
  {
    theme: "Water Sustainability",
    growth: 32.8,
    companies: 892,
    icon: Droplets,
    color: "text-blue-400",
    bgColor: "bg-blue-900/20",
  },
  {
    theme: "Clean Energy",
    growth: 28.5,
    companies: 1456,
    icon: Zap,
    color: "text-yellow-400",
    bgColor: "bg-yellow-900/20",
  },
  {
    theme: "Social Impact",
    growth: 22.1,
    companies: 2103,
    icon: Globe,
    color: "text-purple-400",
    bgColor: "bg-purple-900/20",
  },
]

const trendingCompanies = [
  { name: "Tesla Inc.", change: 15.2, esgScore: 89, reason: "Carbon reduction initiatives" },
  { name: "Microsoft Corp.", change: 12.8, esgScore: 92, reason: "AI for sustainability" },
  { name: "Unilever PLC", change: 10.5, esgScore: 87, reason: "Sustainable packaging" },
  { name: "ASML Holding", change: -8.3, esgScore: 78, reason: "Supply chain concerns" },
  { name: "Nestle SA", change: -5.7, esgScore: 74, reason: "Water usage controversy" },
]

export function Trends() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Market Trends</h1>
        <p className="text-gray-400">ESG market trends, sentiment analysis, and emerging themes</p>
      </div>

      {/* Trending Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">ESG Momentum</p>
                <p className="text-2xl font-bold text-green-400">+12.5%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Market sentiment this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">ESG Funds Flow</p>
                <p className="text-2xl font-bold text-blue-400">$2.8B</p>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Weekly inflows</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">New ESG Ratings</p>
                <p className="text-2xl font-bold text-purple-400">347</p>
              </div>
              <Globe className="h-8 w-8 text-purple-400" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Companies rated this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Score Change</p>
                <p className="text-2xl font-bold text-yellow-400">+3.2</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-400" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Points improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* ESG Trends Chart */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">ESG Score Trends</CardTitle>
          <p className="text-gray-400 text-sm">Market-wide ESG performance over time</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={esgTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line type="monotone" dataKey="environmental" stroke="#10b981" strokeWidth={2} name="Environmental" />
              <Line type="monotone" dataKey="social" stroke="#3b82f6" strokeWidth={2} name="Social" />
              <Line type="monotone" dataKey="governance" stroke="#8b5cf6" strokeWidth={2} name="Governance" />
              <Line type="monotone" dataKey="overall" stroke="#f59e0b" strokeWidth={3} name="Overall" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Emerging Themes */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Emerging ESG Themes</CardTitle>
          <p className="text-gray-400 text-sm">Fastest growing ESG investment themes</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergingThemes.map((theme, index) => {
              const Icon = theme.icon
              return (
                <div key={index} className={`p-4 rounded-lg ${theme.bgColor}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`h-6 w-6 ${theme.color}`} />
                    <h3 className="font-semibold text-white">{theme.theme}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Growth</span>
                      <span className={`font-bold ${theme.color}`}>+{theme.growth}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Companies</span>
                      <span className="text-white font-mono">{theme.companies.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Performance */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Sector ESG Trends</CardTitle>
            <p className="text-gray-400 text-sm">Quarterly ESG score progression by sector</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sectorTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="sector" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="q1" fill="#6b7280" name="Q1" />
                <Bar dataKey="q2" fill="#3b82f6" name="Q2" />
                <Bar dataKey="q3" fill="#10b981" name="Q3" />
                <Bar dataKey="q4" fill="#8b5cf6" name="Q4" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Market Sentiment */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">ESG Market Sentiment</CardTitle>
            <p className="text-gray-400 text-sm">Weekly sentiment and trading volume</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={marketSentiment}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sentiment"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                  name="Sentiment"
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  name="Volume"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trending Companies */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Trending Companies</CardTitle>
          <p className="text-gray-400 text-sm">Companies with significant ESG-related movements</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendingCompanies.map((company, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {company.change > 0 ? (
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-400" />
                    )}
                    <span className={`font-mono text-lg ${company.change > 0 ? "text-green-400" : "text-red-400"}`}>
                      {company.change > 0 ? "+" : ""}
                      {company.change.toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{company.name}</h4>
                    <p className="text-gray-400 text-sm">{company.reason}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    className={
                      company.esgScore > 85
                        ? "bg-green-900/20 text-green-400"
                        : company.esgScore > 75
                          ? "bg-yellow-900/20 text-yellow-400"
                          : "bg-red-900/20 text-red-400"
                    }
                  >
                    ESG: {company.esgScore}
                  </Badge>
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Market Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-green-400 font-medium">ESG Momentum Building</p>
                <p className="text-gray-300 text-sm">ESG funds seeing record inflows with 12.5% weekly growth</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg">
              <Globe className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-blue-400 font-medium">Regulatory Tailwinds</p>
                <p className="text-gray-300 text-sm">New ESG disclosure requirements driving adoption</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg">
              <Zap className="h-5 w-5 text-purple-400 mt-0.5" />
              <div>
                <p className="text-purple-400 font-medium">Tech Leading Change</p>
                <p className="text-gray-300 text-sm">Technology sector showing strongest ESG improvements</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Investment Opportunities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-yellow-900/20 rounded-lg">
              <Recycle className="h-5 w-5 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-yellow-400 font-medium">Carbon Neutral Focus</p>
                <p className="text-gray-300 text-sm">Companies with net-zero commitments outperforming</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg">
              <Droplets className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-blue-400 font-medium">Water Sustainability</p>
                <p className="text-gray-300 text-sm">Emerging theme with 32.8% growth potential</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-green-400 font-medium">Social Impact Investing</p>
                <p className="text-gray-300 text-sm">Growing focus on social outcomes and community impact</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
