"use client"

import { CuboidIcon as Cube, Zap, Sparkles } from "lucide-react"
import { Drone3DViewer } from "./drone-3d-viewer"

interface ViewerPanelProps {
  isLoading: boolean
  hasModel: boolean
  hotspots: any[]
  onHotspotClick: (id: string) => void
  modelUrl?: string
  focusHotspotId?: string
}

function ImmersiveLoader() {
  return (
    <div className="flex-1 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Pulsing rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 border border-blue-500/20 rounded-full animate-ping" />
        <div
          className="absolute w-48 h-48 border border-purple-500/20 rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute w-64 h-64 border border-cyan-500/20 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Central loading content */}
      <div className="text-center z-10 relative">
        <div className="relative mb-8">
          {/* Rotating 3D cube */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <div className="absolute inset-2 bg-[#0f172a] rounded-lg flex items-center justify-center">
              <Cube className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          {/* Floating icons */}
          <div className="absolute -top-4 -left-4">
            <Sparkles className="h-6 w-6 text-yellow-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
          <div className="absolute -top-4 -right-4">
            <Zap className="h-6 w-6 text-cyan-400 animate-bounce" style={{ animationDelay: "0.8s" }} />
          </div>
        </div>

        {/* Loading text with typewriter effect */}
        <h3 className="text-2xl font-semibold text-white mb-4 font-['Inter']">
          <span className="inline-block animate-pulse">Initializing 3D Engine</span>
        </h3>

        {/* Progress indicators */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-center gap-3 text-blue-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm font-['Inter']">Loading model geometry...</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-purple-400">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
            <span className="text-sm font-['Inter']">Mapping hotspot positions...</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-cyan-400">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            <span className="text-sm font-['Inter']">Optimizing rendering...</span>
          </div>
        </div>

        {/* Loading bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full animate-pulse"
            style={{ width: "70%", animation: "loading 2s ease-in-out infinite" }}
          />
        </div>

        <p className="text-gray-400 font-['Inter'] mt-4 text-sm">Preparing immersive 3D experience...</p>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}

export function ViewerPanel({
  isLoading,
  hasModel,
  hotspots,
  onHotspotClick,
  modelUrl,
  focusHotspotId,
}: ViewerPanelProps) {
  if (isLoading) {
    return <ImmersiveLoader />
  }

  if (!hasModel && !modelUrl) {
    return (
      <div className="flex-1 bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <Cube className="h-24 w-24 text-gray-600 mx-auto" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2 font-['Inter']">Upload a 3D model to begin</h3>
          <p className="text-gray-400 font-['Inter']">Select a .glb file to start visualizing your product</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-[#0f172a]">
      <Drone3DViewer
        hotspots={hotspots}
        onHotspotClick={onHotspotClick}
        modelUrl={modelUrl}
        focusHotspotId={focusHotspotId}
      />
    </div>
  )
}
