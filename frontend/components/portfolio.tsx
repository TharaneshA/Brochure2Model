"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, Percent, Eye, Trash2, Plus, MoreHorizontal, Star } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

interface PortfolioProps {
  portfolioCompanies: any[]
  onRemoveFromPortfolio: (companyName: string) => void
}

const portfolioPerformance = [
  { month: "Jan", value: 100000 },
  { month: "Feb", value: 105000 },
  { month: "Mar", value: 98000 },
  { month: "Apr", value: 112000 },
  { month: "May", value: 118000 },
  { month: "Jun", value: 125000 },
]

const sectorAllocation = [
  { name: "Technology", value: 35, color: "#3b82f6" },
  { name: "Healthcare", value: 25, color: "#10b981" },
  { name: "Finance", value: 20, color: "#8b5cf6" },
  { name: "Energy", value: 12, color: "#f59e0b" },
  { name: "Other", value: 8, color: "#6b7280" },
]

export function Portfolio({ portfolioCompanies, onRemoveFromPortfolio }: PortfolioProps) {
  const [selectedHolding, setSelectedHolding] = useState<any>(null)

  // Calculate portfolio metrics
  const totalValue = 125000
  const totalReturn = 25000
  const totalReturnPercent = (totalReturn / (totalValue - totalReturn)) * 100
  const dayChange = 1250
  const dayChangePercent = 1.02

  const mockHoldings = portfolioCompanies.map((company, index) => ({
    ...company,
    shares: Math.floor(Math.random() * 100) + 10,
    avgPrice: Math.floor(Math.random() * 100) + 50,
    currentPrice: Math.floor(Math.random() * 120) + 60,
    allocation: Math.floor(Math.random() * 15) + 5,
  }))

  const getReturnColor = (value: number) => {
    return value >= 0 ? "text-green-400" : "text-red-400"
  }

  const getReturnIcon = (value: number) => {
    return value >= 0 ? TrendingUp : TrendingDown
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
          <p className="text-gray-400">Your ESG investment portfolio overview</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Investment
        </Button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Value</p>
                <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-400" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              {React.createElement(getReturnIcon(dayChange), {
                className: `h-4 w-4 ${getReturnColor(dayChange)}`,
              })}
              <span className={`text-sm ${getReturnColor(dayChange)}`}>
                ${Math.abs(dayChange).toLocaleString()} ({dayChangePercent.toFixed(2)}%) today
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Return</p>
                <p className={`text-2xl font-bold ${getReturnColor(totalReturn)}`}>${totalReturn.toLocaleString()}</p>
              </div>
              {React.createElement(getReturnIcon(totalReturn), {
                className: `h-8 w-8 ${getReturnColor(totalReturn)}`,
              })}
            </div>
            <p className={`text-sm ${getReturnColor(totalReturn)} mt-2`}>
              {totalReturnPercent.toFixed(2)}% total return
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Holdings</p>
                <p className="text-2xl font-bold text-white">{mockHoldings.length}</p>
              </div>
              <Percent className="h-8 w-8 text-purple-400" />
            </div>
            <p className="text-sm text-gray-400 mt-2">Active positions</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg ESG Score</p>
                <p className="text-2xl font-bold text-green-400">84.2</p>
              </div>
              <Star className="h-8 w-8 text-green-400" />
            </div>
            <p className="text-sm text-green-400 mt-2">Excellent rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Performance */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Portfolio Performance</CardTitle>
            <p className="text-gray-400 text-sm">6-month performance tracking</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={portfolioPerformance}>
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "Portfolio Value"]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sector Allocation */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Sector Allocation</CardTitle>
            <p className="text-gray-400 text-sm">Portfolio diversification by sector</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sectorAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sectorAllocation.map((entry, index) => (
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
                  formatter={(value) => [`${value}%`, "Allocation"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Current Holdings</CardTitle>
          <p className="text-gray-400 text-sm">Your active investment positions</p>
        </CardHeader>
        <CardContent>
          {mockHoldings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No holdings yet</p>
                <p className="text-sm">Add companies to your portfolio to get started</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Company</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Shares</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Avg Price</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Current Price</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">P&L</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Allocation</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">ESG Score</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockHoldings.map((holding, index) => {
                    const totalCost = holding.shares * holding.avgPrice
                    const currentValue = holding.shares * holding.currentPrice
                    const pnl = currentValue - totalCost
                    const pnlPercent = (pnl / totalCost) * 100
                    const esgScore = Math.max(0, 100 - Number.parseFloat(holding["Risk rating score"]))

                    return (
                      <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-white font-medium">{holding["Company name"]}</p>
                            <p className="text-gray-400 text-sm">{holding["Industry group"]}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-white font-mono">{holding.shares}</td>
                        <td className="py-4 px-4 text-white font-mono">${holding.avgPrice}</td>
                        <td className="py-4 px-4 text-white font-mono">${holding.currentPrice}</td>
                        <td className="py-4 px-4">
                          <div className={`${getReturnColor(pnl)}`}>
                            <p className="font-mono">${Math.abs(pnl).toLocaleString()}</p>
                            <p className="text-sm">({pnlPercent.toFixed(2)}%)</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Progress value={holding.allocation} className="w-16 h-2" />
                            <span className="text-white text-sm">{holding.allocation}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={
                              esgScore > 80
                                ? "bg-green-900/20 text-green-400"
                                : esgScore > 60
                                  ? "bg-yellow-900/20 text-yellow-400"
                                  : "bg-red-900/20 text-red-400"
                            }
                          >
                            {esgScore.toFixed(0)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-800 border-gray-700">
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onRemoveFromPortfolio(holding["Company name"])}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
