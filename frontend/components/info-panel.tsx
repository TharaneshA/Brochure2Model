"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Info } from "lucide-react"

interface Hotspot {
  id: string
  title: string
  summary: string
}

interface InfoPanelProps {
  selectedHotspot: Hotspot | null
  hotspots: Hotspot[]
  onHotspotSelect: (hotspot: Hotspot) => void
}

export function InfoPanel({ selectedHotspot, hotspots, onHotspotSelect }: InfoPanelProps) {
  return (
    <div className="w-[350px] bg-[#111827] border-l border-gray-800 flex flex-col h-screen">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 font-['Inter']">Hotspots</h3>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {hotspots.length === 0 ? (
          <div className="text-center py-12">
            <Info className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No hotspots generated</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Upload a 3D model and brochure, then generate hotspots to see them here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {hotspots.map((hotspot) => (
              <Card
                key={hotspot.id}
                className={`cursor-pointer transition-all duration-200 border-l-4 ${
                  selectedHotspot?.id === hotspot.id
                    ? "border-l-blue-500 bg-blue-500/10 border-blue-500/30"
                    : "border-l-transparent bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-l-blue-500"
                }`}
                onClick={() => onHotspotSelect(hotspot)}
              >
                <CardContent className="p-4">
                  <h4 className="text-white font-medium text-sm font-['Inter'] mb-2">{hotspot.title}</h4>
                  <p className="text-gray-400 text-xs font-['Inter'] line-clamp-3">{hotspot.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedHotspot && (
        <div className="border-t border-gray-800 p-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <h2 className="text-lg font-bold text-white mb-3 font-['Inter']">{selectedHotspot.title}</h2>
              <div className="prose prose-invert prose-sm">
                <p className="text-gray-300 leading-relaxed text-sm font-['Inter']">{selectedHotspot.summary}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
