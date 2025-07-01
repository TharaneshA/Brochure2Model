"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Star, TrendingUp, TrendingDown, Building, Users, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "./theme-provider"

const companyData = [
  {
    "Company name": "1-800-FLOWERS.COM, Inc.",
    "Industry group": "Retailing",
    Country: "United States of America",
    "Full time employees": "4,000",
    "Risk rating score": "28.9",
    "Risk rating assessment": "Medium Risk",
    "Industry group position": "432",
    "Industry group positions total": "450",
    "Universe position": "9143",
    "Universe positions total": "14689",
    "Company description":
      "1-800-Flowers.com Inc is a provider of gifts designed to help customers express, connect, and celebrate. The company's e-commerce business platform features all brands, including 1-800-Flowers.com, 1-800-Baskets.com, Cheryl's Cookies, Harry and David, PersonalizationMall.com, Shari's Berries, FruitBouquets.com, Moose Munch, The Popcorn Factory, Wolferman's Bakery, Stock Yards, and Simply Chocolate. The company's business segments are; Consumer Floral and Gifts, BloomNet, and Gourmet Foods & Gift Baskets. The maximum revenue for the company is generated from its Gourmet Foods & Gift Baskets segment.",
  },
  {
    "Company name": "1&1 AG",
    "Industry group": "Telecommunication Services",
    Country: "Germany",
    "Full time employees": "3,301",
    "Risk rating score": "27.0",
    "Risk rating assessment": "Medium Risk",
    "Industry group position": "127",
    "Industry group positions total": "201",
    "Universe position": "8130",
    "Universe positions total": "14689",
    "Company description":
      "1&1 AG is a network-independent telecommunications provider in Germany. The company has two business segments which include Access and 1&1 Mobile Network. 1&1's Access segment offers internet access products based on landline and mobile networks. The Group's chargeable mobile Internet and broadband products, including the related applications (such as home networks, online storage, telephony, smart home or IPTV) are grouped together in the Access segment. Majority revenue is from Access Segment.",
  },
  {
    "Company name": "11 Bit Studios SA",
    "Industry group": "Software & Services",
    Country: "Poland",
    "Full time employees": "294",
    "Risk rating score": "16.3",
    "Risk rating assessment": "Low Risk",
    "Industry group position": "125",
    "Industry group positions total": "944",
    "Universe position": "2050",
    "Universe positions total": "14689",
    "Company description":
      "11 bit studios SA is a manufacturer of multi-platform video games in Poland. It develops games for a wide range of devices including personal computers, and tablet computers.",
  },
  {
    "Company name": "10X Genomics, Inc.",
    "Industry group": "Pharmaceuticals",
    Country: "United States of America",
    "Full time employees": "1,306",
    "Risk rating score": "22.5",
    "Risk rating assessment": "Medium Risk",
    "Industry group position": "115",
    "Industry group positions total": "843",
    "Universe position": "5381",
    "Universe positions total": "14689",
    "Company description":
      "10x Genomics Inc is a life science technology company based in the United States. Its solutions include instruments, consumables, and software for analyzing biological systems. The company's integrated solutions include instruments, consumables, and software for analyzing biological systems at a resolution and scale that matches the complexity of biology. Its product offerings include a Chromium platform comprising microfluidic chips and related consumables, Chromium X series, Visium and Xenium platforms, and others, which are predominantly used for the study of biological components. Geographically, the company derives maximum revenue from the United States and the rest from Americas (excluding the United States), Europe, Middle East and Africa, China, and Asia-Pacific (excluding China).",
  },
]

interface CompanyScreenerProps {
  onCompanySelect: (company: any) => void
  onAddToPortfolio: (company: any) => void
}

export function CompanyScreener({ onCompanySelect, onAddToPortfolio }: CompanyScreenerProps) {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCompanies, setFilteredCompanies] = useState(companyData)
  const [starredCompanies, setStarredCompanies] = useState<string[]>([])

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredCompanies(companyData)
      return
    }

    const filtered = companyData.filter(
      (company) =>
        company["Company name"].toLowerCase().includes(searchQuery.toLowerCase()) ||
        company["Industry group"].toLowerCase().includes(searchQuery.toLowerCase()) ||
        company["Country"].toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredCompanies(filtered)
  }

  const toggleStar = (companyName: string) => {
    setStarredCompanies((prev) =>
      prev.includes(companyName) ? prev.filter((name) => name !== companyName) : [...prev, companyName],
    )
  }

  const getRiskColor = (risk: string) => {
    if (risk.includes("Low")) return "text-green-400 bg-green-900/20"
    if (risk.includes("Medium")) return "text-yellow-400 bg-yellow-900/20"
    return "text-red-400 bg-red-900/20"
  }

  const getInvestmentRecommendation = (score: string) => {
    const numScore = Number.parseFloat(score)
    if (numScore < 20) return { text: "BUY", color: "text-green-400", icon: TrendingUp }
    if (numScore < 30) return { text: "HOLD", color: "text-yellow-400", icon: TrendingUp }
    return { text: "SELL", color: "text-red-400", icon: TrendingDown }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Company Screener
        </h1>
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
          Search and analyze companies based on ESG criteria
        </p>
      </div>

      {/* Search Bar */}
      <Card className={theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companies, industries, or countries..."
                className={
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                }
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid gap-6">
        {filteredCompanies.map((company, index) => {
          const recommendation = getInvestmentRecommendation(company["Risk rating score"])
          const RecommendationIcon = recommendation.icon
          const isStarred = starredCompanies.includes(company["Company name"])

          return (
            <Card
              key={index}
              className={`${theme === "dark" ? "bg-gray-900/50 border-gray-800 hover:border-gray-700" : "bg-white border-gray-200 hover:border-gray-300"} transition-colors`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className={`text-xl ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {company["Company name"]}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleStar(company["Company name"])}
                        className={
                          theme === "dark"
                            ? "text-gray-400 hover:text-yellow-400"
                            : "text-gray-600 hover:text-yellow-500"
                        }
                      >
                        <Star className={`h-4 w-4 ${isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                      </Button>
                    </div>
                    <div
                      className={`flex items-center gap-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                      <span className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {company["Industry group"]}
                      </span>
                      <span>{company["Country"]}</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {company["Full time employees"]} employees
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div
                        className={`text-2xl font-bold font-mono ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        {company["Risk rating score"]}
                      </div>
                      <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>ESG Score</div>
                    </div>
                    <Badge className={getRiskColor(company["Risk rating assessment"])}>
                      {company["Risk rating assessment"]}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`rounded-lg p-4 ${theme === "dark" ? "bg-gray-800/50" : "bg-gray-50"}`}>
                    <div className={`text-sm mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      Industry Rank
                    </div>
                    <div className={`text-lg font-mono ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {company["Industry group position"]} / {company["Industry group positions total"]}
                    </div>
                  </div>
                  <div className={`rounded-lg p-4 ${theme === "dark" ? "bg-gray-800/50" : "bg-gray-50"}`}>
                    <div className={`text-sm mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      Global Rank
                    </div>
                    <div className={`text-lg font-mono ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {company["Universe position"]} / {company["Universe positions total"]}
                    </div>
                  </div>
                  <div className={`rounded-lg p-4 ${theme === "dark" ? "bg-gray-800/50" : "bg-gray-50"}`}>
                    <div className={`text-sm mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      Investment Rec.
                    </div>
                    <div className={`text-lg font-semibold flex items-center gap-2 ${recommendation.color}`}>
                      <RecommendationIcon className="h-4 w-4" />
                      {recommendation.text}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {company["Company description"].substring(0, 200)}...
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button onClick={() => onCompanySelect(company)} className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                  <Button
                    onClick={() => onAddToPortfolio(company)}
                    variant="outline"
                    className={`${theme === "dark" ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Portfolio
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredCompanies.length === 0 && (
        <Card className={theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}>
          <CardContent className="p-12 text-center">
            <div className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No companies found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
