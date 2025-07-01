"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, TrendingUp, TrendingDown } from "lucide-react"
import { RiskGauge } from "./risk-gauge"
import { RiskBadge } from "./risk-badge"

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

interface ComparisonSectionProps {
  companies: CompanyData[]
  onRemoveCompany: (index: number) => void
}

export function ComparisonSection({ companies, onRemoveCompany }: ComparisonSectionProps) {
  if (companies.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Portfolio Comparison</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {companies.map((company, index) => (
          <Card
            key={index}
            className="border-0 shadow-xl relative"
            style={{
              background: "rgba(17, 17, 17, 0.6)",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 0 30px rgba(6, 182, 212, 0.1)",
            }}
          >
            <Button
              onClick={() => onRemoveCompany(index)}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-red-500/20"
            >
              <X className="h-4 w-4" />
            </Button>

            <CardHeader>
              <CardTitle className="text-xl text-white pr-8">{company["Company name"]}</CardTitle>
              <p className="text-gray-400">
                {company["Country"]} • {company["Industry group"]}
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <RiskGauge score={Number.parseFloat(company["Risk rating score"])} />
                  <div>
                    <p className="text-white font-semibold">ESG Score</p>
                    <p className="text-gray-400 text-sm">Risk Rating</p>
                  </div>
                </div>
                <RiskBadge risk={company["Risk rating assessment"]} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Industry Rank</p>
                  <p className="text-white font-mono">
                    {company["Industry group position"]}/{company["Industry group positions total"]}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Global Rank</p>
                  <p className="text-white font-mono">
                    {company["Universe position"]}/{company["Universe positions total"]}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {companies.length >= 2 && (
        <Card
          className="mt-8 border-0"
          style={{
            background: "rgba(17, 17, 17, 0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid transparent",
            backgroundImage:
              "linear-gradient(rgba(17, 17, 17, 0.8), rgba(17, 17, 17, 0.8)), linear-gradient(45deg, #ec4899, #06b6d4, #3b82f6)",
            backgroundOrigin: "border-box",
            backgroundClip: "content-box, border-box",
          }}
        >
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Investment Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {companies.map((company, index) => {
                const score = Number.parseFloat(company["Risk rating score"])
                const isRecommended = score < 25
                return (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                    <div className="flex items-center gap-3">
                      {isRecommended ? (
                        <TrendingUp className="h-5 w-5 text-green-400" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-400" />
                      )}
                      <span className="text-white font-semibold">{company["Company name"]}</span>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${isRecommended ? "text-green-400" : "text-red-400"}`}>
                        {isRecommended ? "BUY" : "HOLD"}
                      </p>
                      <p className="text-gray-400 text-sm">ESG Score: {score}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
