"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ExternalLink } from "lucide-react"

interface Hotspot {
  id: string
  title: string
  summary: string
}

interface HotspotOverlayProps {
  hotspot: Hotspot
  position: { x: number; y: number }
  onClose: () => void
}

export function HotspotOverlay({ hotspot, position, onClose }: HotspotOverlayProps) {
  return (
    <div
      className="absolute z-50 w-80 pointer-events-auto"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -100%)",
      }}
    >
      <Card className="bg-gray-900/95 backdrop-blur-sm border-gray-700 shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-white font-['Inter']">{hotspot.title}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 h-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed font-['Inter'] mb-4">{hotspot.summary}</p>
          <div className="flex gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-['Inter']">
              <ExternalLink className="h-3 w-3 mr-1" />
              Learn More
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 font-['Inter'] bg-transparent"
            >
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Arrow pointing to hotspot */}
      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-700"></div>
      </div>
    </div>
  )
}
