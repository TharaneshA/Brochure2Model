"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, Target, AlertCircle, Download } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
} from "recharts"

const performanceData = [
  { month: "Jan", portfolio: 100, benchmark: 100, esgFactor: 102 },
  { month: "Feb", portfolio: 105, benchmark: 103, esgFactor: 108 },
  { month: "Mar", portfolio: 98, benchmark: 101, esgFactor: 104 },
  { month: "Apr", portfolio: 112, benchmark: 106, esgFactor: 115 },
  { month: "May", portfolio: 118, benchmark: 109, esgFactor: 122 },
  { month: "Jun", portfolio: 125, benchmark: 112, esgFactor: 128 },
]

const riskReturnData = [
  { risk: 12, return: 8.5, name: "Conservative ESG" },
  { risk: 18, return: 12.2, name: "Balanced ESG" },
  { risk: 25, return: 15.8, name: "Growth ESG" },
  { risk: 32, return: 18.5, name: "Aggressive ESG" },
  { risk: 22, return: 14.1, name: "Your Portfolio" },
]

const sectorAllocation = [
  { sector: "Technology", allocation: 35, performance: 18.5 },
  { sector: "Healthcare", allocation: 25, performance: 12.3 },
  { sector: "Finance", allocation: 20, performance: 8.7 },
  { sector: "Energy", allocation: 10, performance: 22.1 },
  { sector: "Consumer", allocation: 10, performance: 6.4 },
]

const correlationData = [
  { metric: "ESG Score", correlation: 0.78, significance: "High" },
  { metric: "Carbon Intensity", correlation: -0.65, significance: "High" },
  { metric: "Board Diversity", correlation: 0.42, significance: "Medium" },
  { metric: "Employee Satisfaction", correlation: 0.58, significance: "High" },
  { metric: "Governance Rating", correlation: 0.71, significance: "High" },
]

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">Advanced portfolio analysis and insights</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Return</p>
                <p className="text-2xl font-bold text-green-400">+25.3%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
            <p className="text-xs text-gray-500 mt-2">vs benchmark +12.1%</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Sharpe Ratio</p>
                <p className="text-2xl font-bold text-blue-400">1.84</p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Risk-adjusted return</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Max Drawdown</p>
                <p className="text-2xl font-bold text-red-400">-8.2%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-400" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Peak to trough</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">ESG Alpha</p>
                <p className="text-2xl font-bold text-purple-400">+4.8%</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-400" />
            </div>
            <p className="text-xs text-gray-500 mt-2">ESG-driven outperformance</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Performance Analysis</CardTitle>
          <p className="text-gray-400 text-sm">Portfolio vs benchmark vs ESG factor performance</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={performanceData}>
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
              <Line type="monotone" dataKey="portfolio" stroke="#10b981" strokeWidth={3} name="Your Portfolio" />
              <Line type="monotone" dataKey="benchmark" stroke="#6b7280" strokeWidth={2} name="Benchmark" />
              <Line type="monotone" dataKey="esgFactor" stroke="#8b5cf6" strokeWidth={2} name="ESG Factor" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk-Return Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Risk-Return Profile</CardTitle>
            <p className="text-gray-400 text-sm">Portfolio positioning vs ESG strategies</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={riskReturnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="risk" stroke="#9ca3af" name="Risk %" />
                <YAxis dataKey="return" stroke="#9ca3af" name="Return %" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value, name) => [
                    `${value}${name === "risk" ? "%" : "%"}`,
                    name === "risk" ? "Risk" : "Return",
                  ]}
                />
                <Scatter dataKey="return" fill="#10b981" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Sector Performance</CardTitle>
            <p className="text-gray-400 text-sm">Allocation vs performance by sector</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sectorAllocation}>
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
                <Bar dataKey="allocation" fill="#3b82f6" name="Allocation %" />
                <Bar dataKey="performance" fill="#10b981" name="Performance %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ESG Correlation Analysis */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">ESG Factor Correlation</CardTitle>
          <p className="text-gray-400 text-sm">Correlation between ESG metrics and portfolio performance</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {correlationData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-white font-medium">{item.metric}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    className={
                      item.significance === "High"
                        ? "bg-green-900/20 text-green-400"
                        : "bg-yellow-900/20 text-yellow-400"
                    }
                  >
                    {item.significance}
                  </Badge>
                  <span className={`font-mono text-lg ${item.correlation > 0 ? "text-green-400" : "text-red-400"}`}>
                    {item.correlation > 0 ? "+" : ""}
                    {item.correlation.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Key Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-green-400 font-medium">Strong ESG Alpha</p>
                <p className="text-gray-300 text-sm">Your ESG-focused strategy is generating 4.8% alpha</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg">
              <Target className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-blue-400 font-medium">Optimal Risk-Return</p>
                <p className="text-gray-300 text-sm">Portfolio positioned well on the efficient frontier</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-purple-400 mt-0.5" />
              <div>
                <p className="text-purple-400 font-medium">ESG Premium</p>
                <p className="text-gray-300 text-sm">High ESG scores correlate with better returns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-yellow-900/20 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-yellow-400 font-medium">Rebalance Technology</p>
                <p className="text-gray-300 text-sm">Consider reducing tech allocation from 35% to 30%</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-green-400 font-medium">Increase ESG Leaders</p>
                <p className="text-gray-300 text-sm">Add more companies with ESG scores above 80</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg">
              <Target className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-blue-400 font-medium">Diversify Geography</p>
                <p className="text-gray-300 text-sm">Consider adding European ESG leaders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
