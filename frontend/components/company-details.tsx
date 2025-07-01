"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, TrendingUp, Building, Users, Globe, DollarSign } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const esgTrendData = [
  { month: "Jan", environmental: 65, social: 70, governance: 75 },
  { month: "Feb", environmental: 68, social: 72, governance: 76 },
  { month: "Mar", environmental: 70, social: 74, governance: 78 },
  { month: "Apr", environmental: 72, social: 75, governance: 79 },
  { month: "May", environmental: 74, social: 77, governance: 80 },
  { month: "Jun", environmental: 76, social: 78, governance: 82 },
]

const investmentData = [
  { month: "Jan", value: 100 },
  { month: "Feb", value: 105 },
  { month: "Mar", value: 98 },
  { month: "Apr", value: 110 },
  { month: "May", value: 115 },
  { month: "Jun", value: 120 },
]

const riskBreakdown = [
  { name: "Environmental", value: 35, color: "#10b981" },
  { name: "Social", value: 30, color: "#3b82f6" },
  { name: "Governance", value: 25, color: "#8b5cf6" },
  { name: "Other", value: 10, color: "#f59e0b" },
]

interface CompanyDetailsProps {
  company: any
  onBack: () => void
}

export function CompanyDetails({ company, onBack }: CompanyDetailsProps) {
  const riskScore = Number.parseFloat(company["Risk rating score"])
  const esgScore = Math.max(0, 100 - riskScore) // Convert risk to ESG score

  const getRiskColor = (risk: string) => {
    if (risk.includes("Low")) return "text-green-400 bg-green-900/20"
    if (risk.includes("Medium")) return "text-yellow-400 bg-yellow-900/20"
    return "text-red-400 bg-red-900/20"
  }

  const getInvestmentGrade = (score: number) => {
    if (score > 80) return { grade: "A+", color: "text-green-400" }
    if (score > 70) return { grade: "A", color: "text-green-400" }
    if (score > 60) return { grade: "B+", color: "text-blue-400" }
    if (score > 50) return { grade: "B", color: "text-yellow-400" }
    return { grade: "C", color: "text-red-400" }
  }

  const investmentGrade = getInvestmentGrade(esgScore)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Screener
        </Button>
      </div>

      {/* Company Header */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <CardTitle className="text-3xl text-white">{company["Company name"]}</CardTitle>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-yellow-400">
                  <Star className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center gap-6 text-gray-400">
                <span className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  {company["Industry group"]}
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {company["Country"]}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {company["Full time employees"]} employees
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white font-mono mb-1">{esgScore.toFixed(1)}</div>
              <div className="text-sm text-gray-400 mb-2">ESG Score</div>
              <Badge className={getRiskColor(company["Risk rating assessment"])}>
                {company["Risk rating assessment"]}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-white mb-2">{company["Industry group position"]}</div>
            <div className="text-sm text-gray-400 mb-1">Industry Rank</div>
            <div className="text-xs text-gray-500">out of {company["Industry group positions total"]}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-white mb-2">{company["Universe position"]}</div>
            <div className="text-sm text-gray-400 mb-1">Global Rank</div>
            <div className="text-xs text-gray-500">out of {company["Universe positions total"]}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <div className={`text-2xl font-bold mb-2 ${investmentGrade.color}`}>{investmentGrade.grade}</div>
            <div className="text-sm text-gray-400 mb-1">Investment Grade</div>
            <div className="text-xs text-gray-500">ESG Rating</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-400 mb-2 flex items-center justify-center gap-1">
              <TrendingUp className="h-5 w-5" />
              BUY
            </div>
            <div className="text-sm text-gray-400 mb-1">Recommendation</div>
            <div className="text-xs text-gray-500">Strong ESG Profile</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ESG Trend Chart */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">ESG Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Investment Performance */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Investment Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={investmentData}>
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
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Breakdown and Investment Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Breakdown */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Risk Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Investment Insights */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Investment Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">ESG Performance</span>
              <span className="text-green-400 font-semibold">Excellent</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Industry Standing</span>
              <span className="text-blue-400 font-semibold">Top Tier</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Risk Level</span>
              <span className="text-yellow-400 font-semibold">Moderate</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Growth Potential</span>
              <span className="text-green-400 font-semibold">High</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Description */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Company Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 leading-relaxed">{company["Company description"]}</p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="bg-green-600 hover:bg-green-700">
          <DollarSign className="h-4 w-4 mr-2" />
          Invest Now
        </Button>
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
          Add to Watchlist
        </Button>
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
          Compare Companies
        </Button>
      </div>
    </div>
  )
}
