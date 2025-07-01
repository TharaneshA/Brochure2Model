"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Zap, Shield, Battery, Camera, Navigation } from 'lucide-react'
import { Drone3DViewer } from "./drone-3d-viewer"

const demoHotspots = [
  {
    id: "camera",
    title: "4K Camera System",
    description: "Professional grade 4K camera with 3-axis gimbal stabilization for smooth footage",
    features: ["4K Ultra HD Recording", "3-axis Gimbal", "60fps Video", "HDR Support"],
    specs: {
      resolution: "4096 x 2160",
      frameRate: "60fps",
      stabilization: "3-axis mechanical",
      storage: "64GB internal",
    },
    category: "Camera",
    icon: Camera,
  },
  {
    id: "gps",
    title: "GPS Navigation",
    description: "Dual GPS system with return-to-home functionality and precise positioning",
    features: ["Dual GPS/GLONASS", "Return to Home", "Waypoint Navigation", "Geofencing"],
    specs: {
      accuracy: "±1.5m",
      satellites: "GPS + GLONASS",
      modes: "P-GPS, ATTI",
      range: "7km",
    },
    category: "Navigation",
    icon: Navigation,
  },
  {
    id: "propeller",
    title: "Smart Propulsion",
    description: "Intelligent propeller system with automatic speed adjustment and safety features",
    features: ["Auto Speed Control", "Obstacle Avoidance", "Emergency Stop", "Quiet Operation"],
    specs: {
      motors: "Brushless DC",
      propellers: "Quick-release",
      thrust: "2.4kg total",
      noise: "<65dB",
    },
    category: "Propulsion",
    icon: Zap,
  },
  {
    id: "battery",
    title: "Smart Battery",
    description: "Intelligent battery management with 30-minute flight time and fast charging",
    features: ["30min Flight Time", "Fast Charging", "Battery Health Monitor", "Low Voltage Protection"],
    specs: {
      capacity: "3830mAh",
      voltage: "15.4V",
      chargingTime: "65min",
      cycles: "500+",
    },
    category: "Power",
    icon: Battery,
  },
]

export function LandingDemoViewer() {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null)
  const [focusHotspotId, setFocusHotspotId] = useState<string | undefined>(undefined)

  const handleHotspotClick = (id: string) => {
    setSelectedHotspot(selectedHotspot === id ? null : id)
  }

  const handleFeatureClick = (id: string) => {
    setSelectedHotspot(id)
    setFocusHotspotId(id)
  }

  const selectedHotspotData = demoHotspots.find((h) => h.id === selectedHotspot)

  return (
    <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
      {/* Mock Interface Header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-gray-400 text-sm font-['Inter']">Satori XR Visualizer - Interactive Demo</span>
        </div>
      </div>

      {/* Main Demo Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-[600px]">
        {/* Left Panel - 3D Viewer */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border-r border-gray-700">
          <Drone3DViewer 
            hotspots={demoHotspots} 
            onHotspotClick={handleHotspotClick}
            focusHotspotId={focusHotspotId}
          />
          
          {/* Demo Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">
              <Eye className="h-3 w-3 mr-1" />
              Interactive Demo
            </Badge>
          </div>
        </div>

        {/* Right Panel - Feature List */}
        <div className="bg-gray-900/50 p-6 overflow-y-auto">
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2 font-['Inter']">Product Features</h3>
              <p className="text-gray-400 text-sm font-['Inter']">
                Click on features below or hotspots on the model to explore
              </p>
            </div>

            {demoHotspots.map((hotspot) => {
              const Icon = hotspot.icon
              const isSelected = selectedHotspot === hotspot.id

              return (
                <Card
                  key={hotspot.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "bg-blue-600/20 border-blue-500/50 shadow-lg shadow-blue-500/20"
                      : "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 hover:border-gray-600"
                  }`}
                  onClick={() => handleFeatureClick(hotspot.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected ? "bg-blue-600" : "bg-gray-700"
                        }`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-white text-sm font-['Inter']">{hotspot.title}</h4>
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                            {hotspot.category}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-xs font-['Inter'] leading-relaxed">
                          {hotspot.description}
                        </p>
                        
                        {isSelected && (
                          <div className="mt-3 space-y-2">
                            <div className="flex flex-wrap gap-1">
                              {hotspot.features.map((feature, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="text-xs bg-blue-600/20 text-blue-400 border-blue-500/30"
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mt-3">
                              {Object.entries(hotspot.specs).map(([key, value]) => (
                                <div key={key} className="text-xs">
                                  <span className="text-gray-500 capitalize">{key}:</span>
                                  <span className="text-gray-300 ml-1">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Demo Instructions */}
          <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
            <h4 className="text-sm font-medium text-white mb-2 font-['Inter']">How to Use</h4>
            <ul className="text-xs text-gray-400 space-y-1 font-['Inter']">
              <li>• Click hotspots on the 3D model to explore features</li>
              <li>• Click feature cards to focus camera on components</li>
              <li>• Use mouse to rotate, zoom, and pan the 3D view</li>
              <li>• Try the view controls for different perspectives</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
