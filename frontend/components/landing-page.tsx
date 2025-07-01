"use client"

import type React from "react"

import { useState } from "react"
import { Search, Play, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LandingPageProps {
  onSearch: (query: string) => void
  onGetStarted: () => void
}

export function LandingPage({ onSearch, onGetStarted }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <span className="text-white font-semibold text-xl">GreenVest</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#analytics" className="text-gray-300 hover:text-white transition-colors">
            Analytics
          </a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#about" className="text-gray-300 hover:text-white transition-colors">
            About
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            Contact sales
          </Button>
          <Button onClick={onGetStarted} className="bg-white text-black hover:bg-gray-200">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                The Intelligent
                <br />
                <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  ESG Investment
                </span>
                <br />
                Platform
              </h1>

              <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                GreenVest is the smartest way to analyze ESG risks and opportunities with AI-powered insights—from
                company screening to portfolio optimization. The best overall ESG investment platform.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-4 max-w-lg">
              <div className="relative flex-1">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search companies..."
                  className="h-12 pl-4 pr-12 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-green-500"
                />
                <Button
                  onClick={handleSearch}
                  size="icon"
                  className="absolute right-1 top-1 h-10 w-10 bg-green-600 hover:bg-green-700"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={onGetStarted} size="lg" className="bg-white text-black hover:bg-gray-200">
                <Download className="h-4 w-4 mr-2" />
                Start Analysis
              </Button>
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                <Play className="h-4 w-4 mr-2" />
                Watch Demo
              </Button>
            </div>

            <div className="text-sm text-gray-400">$ npm install @greenvest/analyzer</div>
          </div>

          {/* Right Side - Terminal Mockup */}
          <div className="relative">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700 shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-gray-400 text-sm">~/Projects/esg-analysis</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-4 font-mono text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">$</span>
                  <span className="text-white">greenvest analyze --company "Tesla"</span>
                </div>
                <div className="text-gray-400">
                  <div>🔍 Analyzing ESG metrics...</div>
                  <div>📊 Processing sustainability data...</div>
                  <div>✅ Analysis complete!</div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="text-green-400">ESG Score: 85/100 (Excellent)</div>
                  <div className="text-blue-400">Environmental: 92/100</div>
                  <div className="text-purple-400">Social: 78/100</div>
                  <div className="text-yellow-400">Governance: 85/100</div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-green-400">$</span>
                  <span className="text-white animate-pulse">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 text-center py-12 border-t border-gray-800">
        <p className="text-gray-400">Trusted by over half a million investors at leading companies</p>
      </div>
    </div>
  )
}
