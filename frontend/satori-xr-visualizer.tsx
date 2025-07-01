"use client"

import { useState } from "react"
import { ModernLanding } from "./components/modern-landing"
import { ControlPanel } from "./components/control-panel"
import { ViewerPanel } from "./components/viewer-panel"
import { InfoPanel } from "./components/info-panel"
import { SettingsPanel } from "./components/settings-panel"

interface Hotspot {
  id: string
  title: string
  summary: string
}

const mockHotspots: Hotspot[] = [
  {
    id: "1",
    title: "4K Camera System",
    summary:
      "Professional-grade 4K camera with 3-axis mechanical gimbal stabilization. Features include 20MP stills, 4K/60fps video recording, and advanced image processing algorithms. The camera system provides crystal-clear footage for professional cinematography, surveillance, and inspection applications.",
  },
  {
    id: "2",
    title: "GPS Navigation Module",
    summary:
      "High-precision GPS/GLONASS dual-mode positioning system with RTK support for centimeter-level accuracy. Includes intelligent flight modes such as waypoint navigation, orbit mode, and return-to-home functionality. Perfect for surveying, mapping, and autonomous flight operations.",
  },
  {
    id: "3",
    title: "Intelligent Propulsion",
    summary:
      "Advanced brushless motor system with electronic speed controllers (ESC) providing efficient and quiet operation. Features dynamic balancing, temperature monitoring, and automatic power optimization. Delivers up to 35 minutes of flight time with enhanced stability and responsiveness.",
  },
  {
    id: "4",
    title: "Smart Battery System",
    summary:
      "Intelligent LiPo battery with built-in power management system. Features real-time capacity monitoring, temperature control, and over-discharge protection. Quick-charge capability allows 80% charge in just 45 minutes, with LED indicators showing remaining power levels.",
  },
]

const mockKeySellingPoints = [
  "Premium Materials: Carbon fiber construction",
  "Advanced Technology: AI-powered flight control",
  "Professional Grade: 4K camera system",
  "Extended Flight: 35+ minute battery life",
  "Precision Navigation: GPS/RTK positioning",
  "Weather Resistant: IP43 rated protection",
]

export default function SatoriXRVisualizer() {
  const [currentView, setCurrentView] = useState<"landing" | "app" | "settings">("landing")
  const [isGenerating, setIsGenerating] = useState(false)
  const [hotspots, setHotspots] = useState<Hotspot[]>([])
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null)
  const [modelUrl, setModelUrl] = useState<string | undefined>(undefined)
  const [focusHotspotId, setFocusHotspotId] = useState<string | undefined>(undefined)
  const [keySellingPoints, setKeySellingPoints] = useState<string[]>([])

  const handleGetStarted = () => {
    setCurrentView("app")
  }

  const handleBackToLanding = () => {
    setCurrentView("landing")
    setHotspots([])
    setSelectedHotspot(null)
    setModelUrl(undefined)
    setFocusHotspotId(undefined)
    setKeySellingPoints([])
  }

  const handleOpenSettings = () => {
    setCurrentView("settings")
  }

  const handleBackFromSettings = () => {
    setCurrentView("app")
  }

  const handleModelUpload = (file: File) => {
    // Create object URL for the uploaded GLB file
    const url = URL.createObjectURL(file)
    setModelUrl(url)
  }

  const handleGenerateHotspots = () => {
    setIsGenerating(true)

    // Simulate AI processing time
    setTimeout(() => {
      setHotspots(mockHotspots)
      setKeySellingPoints(mockKeySellingPoints)
      setIsGenerating(false)
    }, 4000)
  }

  const handleHotspotClick = (id: string) => {
    const hotspot = hotspots.find((h) => h.id === id)
    if (hotspot) {
      setSelectedHotspot(hotspot)
    }
  }

  const handleHotspotSelect = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot)
    setFocusHotspotId(hotspot.id)
  }

  if (currentView === "landing") {
    return <ModernLanding onGetStarted={handleGetStarted} />
  }

  if (currentView === "settings") {
    return <SettingsPanel onBack={handleBackFromSettings} />
  }

  return (
    <div className="h-screen bg-[#111827] flex">
      <ControlPanel
        onGenerateHotspots={handleGenerateHotspots}
        onBackToLanding={handleBackToLanding}
        onOpenSettings={handleOpenSettings}
        onModelUpload={handleModelUpload}
        isGenerating={isGenerating}
        keySellingPoints={keySellingPoints}
      />

      <ViewerPanel
        isLoading={isGenerating}
        hasModel={hotspots.length > 0}
        hotspots={hotspots}
        onHotspotClick={handleHotspotClick}
        modelUrl={modelUrl}
        focusHotspotId={focusHotspotId}
      />

      <InfoPanel selectedHotspot={selectedHotspot} hotspots={hotspots} onHotspotSelect={handleHotspotSelect} />
    </div>
  )
}
