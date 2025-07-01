"use client"

import type React from "react"

import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  isLoading: boolean
}

export function SearchBar({ value, onChange, onSearch, isLoading }: SearchBarProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch()
    }
  }

  return (
    <div className="relative flex items-center max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter company name..."
          className="h-14 pl-6 pr-4 bg-transparent border-0 text-white placeholder:text-gray-400 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
          style={{
            background: "rgba(17, 17, 17, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid transparent",
            backgroundImage:
              "linear-gradient(rgba(17, 17, 17, 0.8), rgba(17, 17, 17, 0.8)), linear-gradient(45deg, #ec4899, #06b6d4, #3b82f6)",
            backgroundOrigin: "border-box",
            backgroundClip: "content-box, border-box",
          }}
          disabled={isLoading}
        />
        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-pink-500/20 via-teal-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      <Button
        onClick={onSearch}
        disabled={isLoading}
        className="ml-4 h-14 w-14 bg-transparent border-0 hover:bg-transparent"
        style={{
          background: "rgba(17, 17, 17, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid transparent",
          backgroundImage:
            "linear-gradient(rgba(17, 17, 17, 0.8), rgba(17, 17, 17, 0.8)), linear-gradient(45deg, #ec4899, #06b6d4, #3b82f6)",
          backgroundOrigin: "border-box",
          backgroundClip: "content-box, border-box",
        }}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-white" />
        ) : (
          <Search className="h-5 w-5 text-white" />
        )}
      </Button>
    </div>
  )
}
