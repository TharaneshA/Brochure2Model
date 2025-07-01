"use client"

import type React from "react"

import { useState } from "react"
import { Search, Play, ArrowRight, CheckCircle, TrendingUp, Shield, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface ImprovedLandingProps {
  onSearch: (query: string) => void
  onGetStarted: () => void
  onSignIn: () => void
}

export function ImprovedLanding({ onSearch, onGetStarted, onSignIn }: ImprovedLandingProps) {
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

  const features = [
    {
      icon: TrendingUp,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze ESG data across thousands of companies",
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Comprehensive risk evaluation with real-time monitoring",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Access to ESG data from companies worldwide",
    },
  ]

  const stats = [
    { value: "14,689", label: "Companies Analyzed" },
    { value: "99.9%", label: "Data Accuracy" },
    { value: "500K+", label: "Active Users" },
    { value: "$2.8B", label: "Assets Tracked" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className="text-white font-bold text-2xl">GreenVest</span>
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
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={onSignIn} variant="ghost" className="text-gray-300 hover:text-white">
            Sign In
          </Button>
          <Button onClick={onGetStarted} className="bg-green-600 hover:bg-green-700">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Now with AI-powered insights</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              The Future of
              <br />
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                ESG Investing
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Make smarter investment decisions with AI-powered ESG analysis.
              <br />
              Analyze risks, track performance, and build sustainable portfolios.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search any company (e.g., Tesla, Microsoft, Apple)..."
                  className="h-16 pl-6 pr-20 bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-400 text-lg focus:border-green-500/50 focus:ring-green-500/20"
                />
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="absolute right-2 top-2 h-12 px-6 bg-green-600 hover:bg-green-700"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Analyze
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button onClick={onGetStarted} size="lg" className="bg-green-600 hover:bg-green-700 px-8">
                Start Free Analysis
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 px-8">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need for ESG investing</h2>
          <p className="text-xl text-gray-400">
            Comprehensive tools and insights to make informed sustainable investment decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Terminal Preview */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 text-center">
              <span className="text-gray-400 text-sm">GreenVest Terminal</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-green-400">$</span>
              <span className="text-white">greenvest analyze --company "Tesla Inc"</span>
            </div>
            <div className="text-gray-400 space-y-1">
              <div>🔍 Analyzing ESG metrics...</div>
              <div>📊 Processing sustainability data...</div>
              <div>🤖 Running AI risk assessment...</div>
              <div>✅ Analysis complete!</div>
            </div>
            <div className="space-y-2 text-sm border-l-2 border-green-400 pl-4">
              <div className="text-green-400">ESG Score: 89/100 (Excellent)</div>
              <div className="text-blue-400">Environmental: 92/100</div>
              <div className="text-purple-400">Social: 85/100</div>
              <div className="text-yellow-400">Governance: 90/100</div>
              <div className="text-white">Investment Grade: A+</div>
              <div className="text-green-400">Recommendation: BUY</div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-green-400">$</span>
              <span className="text-white animate-pulse">|</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-gray-400">Trusted by over 500,000 investors at leading institutions worldwide</p>
        </div>
      </div>
    </div>
  )
}
