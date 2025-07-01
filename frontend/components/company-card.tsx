"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { RiskGauge } from "./risk-gauge"
import { RiskBadge } from "./risk-badge"
import { Star, TrendingUp, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CompanyData {
  "Company name": string
  "Industry group": string
  Country: string
  "Risk rating score": string
  "Risk rating assessment": string
  "Industry group position": string
  "Industry group positions total": string
  "Universe position": string
  "Universe positions total": string
  "Company description": string
}

interface CompanyCardProps {
  data: CompanyData
  isStarred?: boolean
  onStar?: () => void
  onCompare?: () => void
}

export function CompanyCard({ data, isStarred = false, onStar, onCompare }: CompanyCardProps) {
  const riskScore = Number.parseFloat(data["Risk rating score"])

  return (
    <Card
      className="w-full border-0 shadow-2xl"
      style={{
        background: "rgba(17, 17, 17, 0.8)",
        backdropFilter: "blur(20px)",
        border: "1px solid transparent",
        backgroundImage:
          "linear-gradient(rgba(17, 17, 17, 0.8), rgba(17, 17, 17, 0.8)), linear-gradient(45deg, #ec4899, #06b6d4, #3b82f6)",
        backgroundOrigin: "border-box",
        backgroundClip: "content-box, border-box",
        boxShadow: "0 0 50px rgba(236, 72, 153, 0.1)",
      }}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{data["Company name"]}</h2>
            <p className="text-gray-400 text-lg">
              {data["Country"]} • {data["Industry group"]}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={onStar} variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Star className={`h-6 w-6 ${isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
            </Button>
            <Button onClick={onCompare} variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <BarChart3 className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ESG Risk Score */}
          <div className="flex flex-col items-center p-6 rounded-lg bg-white/5 border border-white/10">
            <RiskGauge score={riskScore} />
            <h3 className="text-white font-semibold mt-4 mb-1">ESG Risk Score</h3>
            <p className="text-gray-400 text-sm text-center">Lower scores indicate better ESG performance</p>
          </div>

          {/* Risk Level */}
          <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-white/5 border border-white/10">
            <RiskBadge risk={data["Risk rating assessment"]} />
            <h3 className="text-white font-semibold mt-4 mb-1">Risk Level</h3>
            <p className="text-gray-400 text-sm text-center">Overall ESG risk assessment</p>
          </div>

          {/* Industry Rank */}
          <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-white/5 border border-white/10">
            <div className="text-center">
              <span className="text-3xl font-bold font-mono text-white">{data["Industry group position"]}</span>
              <span className="text-xl text-gray-400 font-mono">/{data["Industry group positions total"]}</span>
            </div>
            <h3 className="text-white font-semibold mt-4 mb-1">Industry Rank</h3>
            <p className="text-gray-400 text-sm text-center">Position within {data["Industry group"]}</p>
          </div>

          {/* Global Rank */}
          <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-white/5 border border-white/10">
            <div className="text-center">
              <span className="text-3xl font-bold font-mono text-white">{data["Universe position"]}</span>
              <span className="text-xl text-gray-400 font-mono">/{data["Universe positions total"]}</span>
            </div>
            <h3 className="text-white font-semibold mt-4 mb-1">Global Rank</h3>
            <p className="text-gray-400 text-sm text-center">Position among all companies</p>
          </div>
        </div>

        {/* Investment Insights */}
        <div className="p-6 rounded-lg bg-gradient-to-r from-pink-500/10 via-teal-500/10 to-blue-500/10 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-teal-400" />
            <h3 className="text-white font-semibold">Investment Insights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400 mb-1">ESG Performance</p>
              <p className="text-white font-mono">
                {riskScore < 20 ? "Excellent" : riskScore < 30 ? "Good" : riskScore < 40 ? "Average" : "Below Average"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Industry Standing</p>
              <p className="text-white font-mono">
                {Number.parseInt(data["Industry group position"]) /
                  Number.parseInt(data["Industry group positions total"]) <
                0.3
                  ? "Top Tier"
                  : "Mid Tier"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Investment Grade</p>
              <p className="text-white font-mono">
                {data["Risk rating assessment"].includes("Low")
                  ? "A+"
                  : data["Risk rating assessment"].includes("Medium")
                    ? "B+"
                    : "C+"}
              </p>
            </div>
          </div>
        </div>

        {/* Company Description */}
        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <h3 className="text-white font-semibold mb-3">Company Overview</h3>
          <p className="text-gray-300 leading-relaxed">{data["Company description"]}</p>
        </div>
      </CardContent>
    </Card>
  )
}
