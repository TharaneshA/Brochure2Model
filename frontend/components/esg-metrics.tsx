"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Leaf, Users, Building, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts"

const esgScores = [
  { category: "Environmental", score: 85, color: "#10b981", icon: Leaf },
  { category: "Social", score: 78, color: "#3b82f6", icon: Users },
  { category: "Governance", score: 92, color: "#8b5cf6", icon: Building },
]

const industryComparison = [
  { industry: "Technology", environmental: 82, social: 75, governance: 88 },
  { industry: "Healthcare", environmental: 78, social: 85, governance: 82 },
  { industry: "Finance", environmental: 65, social: 70, governance: 95 },
  { industry: "Energy", environmental: 45, social: 60, governance: 75 },
  { industry: "Retail", environmental: 70, social: 80, governance: 78 },
]

const esgTrends = [
  { month: "Jan", environmental: 75, social: 70, governance: 85 },
  { month: "Feb", environmental: 78, social: 72, governance: 87 },
  { month: "Mar", environmental: 80, social: 74, governance: 88 },
  { month: "Apr", environmental: 82, social: 76, governance: 90 },
  { month: "May", environmental: 84, social: 77, governance: 91 },
  { month: "Jun", environmental: 85, social: 78, governance: 92 },
]

const riskFactors = [
  { factor: "Carbon Emissions", level: "High", trend: "improving", value: 75 },
  { factor: "Water Usage", level: "Medium", trend: "stable", value: 60 },
  { factor: "Waste Management", level: "Low", trend: "improving", value: 85 },
  { factor: "Employee Satisfaction", level: "High", trend: "declining", value: 45 },
  { factor: "Board Diversity", level: "Medium", trend: "improving", value: 70 },
  { factor: "Data Privacy", level: "Low", trend: "stable", value: 90 },
]

export function ESGMetrics() {
  const overallScore = Math.round((85 + 78 + 92) / 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">ESG Metrics</h1>
        <p className="text-gray-400">Comprehensive Environmental, Social, and Governance analysis</p>
      </div>

      {/* Overall Score */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Overall ESG Score</h2>
              <p className="text-gray-400">Portfolio weighted average</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-green-400 mb-2">{overallScore}</div>
              <Badge className="bg-green-900/20 text-green-400">Excellent</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ESG Category Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {esgScores.map((category) => {
          const Icon = category.icon
          return (
            <Card key={category.category} className="bg-gray-900/50 border-gray-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon className="h-5 w-5" style={{ color: category.color }} />
                    {category.category}
                  </CardTitle>
                  <div className="text-2xl font-bold text-white">{category.score}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={category.score} className="h-2" />
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">+5.2% from last quarter</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Comparison */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Industry Comparison</CardTitle>
            <p className="text-gray-400 text-sm">How your portfolio compares across industries</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={industryComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="industry" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="environmental" fill="#10b981" name="Environmental" />
                <Bar dataKey="social" fill="#3b82f6" name="Social" />
                <Bar dataKey="governance" fill="#8b5cf6" name="Governance" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ESG Trends */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">ESG Performance Trends</CardTitle>
            <p className="text-gray-400 text-sm">6-month performance tracking</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={esgTrends}>
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
      </div>

      {/* Risk Factors */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Risk Factors Analysis</CardTitle>
          <p className="text-gray-400 text-sm">Key ESG risk factors and their current status</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {riskFactors.map((factor, index) => (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">{factor.factor}</h4>
                  <div className="flex items-center gap-2">
                    {factor.trend === "improving" ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : factor.trend === "declining" ? (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    )}
                    <Badge
                      className={
                        factor.level === "Low"
                          ? "bg-green-900/20 text-green-400"
                          : factor.level === "Medium"
                            ? "bg-yellow-900/20 text-yellow-400"
                            : "bg-red-900/20 text-red-400"
                      }
                    >
                      {factor.level}
                    </Badge>
                  </div>
                </div>
                <Progress value={factor.value} className="h-2" />
                <p className="text-xs text-gray-400 mt-2 capitalize">{factor.trend} trend</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Key Strengths</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-sm">Strong governance practices across portfolio</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-sm">Above-average environmental performance</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-sm">Consistent improvement in ESG metrics</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-900/20 rounded-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-400 text-sm">Employee satisfaction needs attention</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-900/20 rounded-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-400 text-sm">Carbon emissions reduction targets</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-900/20 rounded-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-400 text-sm">Supply chain transparency improvements</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
