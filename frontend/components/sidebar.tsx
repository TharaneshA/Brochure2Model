"use client"

import { useState } from "react"
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Briefcase,
  Search,
  Home,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "screener", label: "Screener", icon: Search },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "esg-metrics", label: "ESG Metrics", icon: PieChart },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
    { id: "trends", label: "Trends", icon: TrendingUp },
  ]

  return (
    <div
      className={cn(
        "h-screen bg-[#1a1f2e] border-r border-gray-800 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-semibold">GreenVest AI</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                  isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-gray-800">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
          <Settings className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </div>
    </div>
  )
}
