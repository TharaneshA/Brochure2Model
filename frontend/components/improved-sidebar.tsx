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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "./theme-provider"
import { cn } from "@/lib/utils"

interface ImprovedSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  onSettingsClick: () => void
  onProfileClick: () => void
  isAuthenticated: boolean
  userEmail?: string
}

export function ImprovedSidebar({
  activeSection,
  onSectionChange,
  onSettingsClick,
  onProfileClick,
  isAuthenticated,
  userEmail,
}: ImprovedSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { theme } = useTheme()

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
        "h-screen border-r transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64",
        theme === "dark" ? "bg-black border-gray-800" : "bg-white border-gray-200",
      )}
    >
      {/* Header */}
      <div
        className={`p-4 border-b flex items-center justify-between ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>GreenVest AI</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={
            theme === "dark"
              ? "text-gray-400 hover:text-white hover:bg-gray-800"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Profile */}
      {isAuthenticated && (
        <div className={`p-4 border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
          <button
            onClick={onProfileClick}
            className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors ${
              theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-green-600 text-white">
                {userEmail?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 text-left">
                <p className={`text-sm font-medium truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {userEmail || "User"}
                </p>
                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Premium Plan</p>
              </div>
            )}
          </button>
        </div>
      )}

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
                  "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg"
                    : theme === "dark"
                      ? "text-gray-400 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Settings */}
      <div className={`p-4 border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
        <button
          onClick={onSettingsClick}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
            theme === "dark"
              ? "text-gray-400 hover:text-white hover:bg-gray-800"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Settings</span>}
        </button>
      </div>
    </div>
  )
}
