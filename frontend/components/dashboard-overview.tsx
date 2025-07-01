"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Leaf, Building, Users } from "lucide-react"
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

const investmentData = [
  { month: "Jan", value: 2500 },
  { month: "Feb", value: 2800 },
  { month: "Mar", value: 4500 },
  { month: "Apr", value: 4200 },
  { month: "May", value: 4800 },
  { month: "Jun", value: 4600 },
  { month: "Jul", value: 4900 },
]

const esgData = [
  { name: "Environmental", value: 35, color: "#10b981" },
  { name: "Social", value: 30, color: "#3b82f6" },
  { name: "Governance", value: 25, color: "#8b5cf6" },
  { name: "Other", value: 10, color: "#f59e0b" },
]

const recentProjects = [
  { name: "Solar Farm Project", type: "Renewable Energy", esgScore: 92, investment: "$12.5M", status: "Active" },
  { name: "Green Building Initiative", type: "Real Estate", esgScore: 88, investment: "$8.2M", status: "Active" },
  { name: "Clean Water Program", type: "Infrastructure", esgScore: 95, investment: "$15.8M", status: "Pending" },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your ESG investment portfolio</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Projects</CardTitle>
            <Building className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">127</div>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Average ESG Score</CardTitle>
            <Leaf className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">82.4</div>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +4.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Investment</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$324.2M</div>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Carbon Offset</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1.2M tons</div>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investment Overview Chart */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Investment Overview</CardTitle>
            <p className="text-sm text-gray-400">$10000</p>
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
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ESG Metrics Pie Chart */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">ESG Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={esgData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {esgData.map((entry, index) => (
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
      </div>

      {/* Recent Projects Table */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Project Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">ESG Score</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Investment</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((project, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-3 px-4 text-white font-medium">{project.name}</td>
                    <td className="py-3 px-4 text-gray-300">{project.type}</td>
                    <td className="py-3 px-4 text-green-400 font-mono">{project.esgScore}</td>
                    <td className="py-3 px-4 text-white font-mono">{project.investment}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === "Active" ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
