"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, CuboidIcon as Cube, Loader2, ArrowLeft, Settings } from "lucide-react"
import { ProgressBadges } from "./progress-badges"

interface ControlPanelProps {
  onGenerateHotspots: (modelFile: File, pdfFile: File) => void
  onBackToLanding: () => void
  onOpenSettings: () => void
  onModelUpload: (file: File) => void
  onPdfUpload?: (file: File) => void
  isGenerating: boolean
  keySellingPoints: string[]
}

export function ControlPanel({
  onGenerateHotspots,
  onBackToLanding,
  onOpenSettings,
  onModelUpload,
  onPdfUpload,
  isGenerating,
  keySellingPoints,
}: ControlPanelProps) {
  const [modelFile, setModelFile] = useState<File | null>(null)
  const [pdfFile, setPdfFile] = useState<File | null>(null)

  const canGenerate = modelFile && pdfFile && !isGenerating

  const handleModelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.name.endsWith(".glb")) {
      setModelFile(file)
      onModelUpload(file)
    }
  }

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
      if (onPdfUpload) {
        onPdfUpload(file)
      }
    }
  }

  return (
    <div className="w-[300px] bg-[#111827] border-r border-gray-800 flex flex-col h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToLanding}
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenSettings}
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-2"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 font-['Inter']">Satori XR</h1>
          <h2 className="text-sm text-gray-400 font-['Inter']">Visualizer</h2>
        </div>

        {/* Upload Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 font-['Inter']">3D Model</label>
            <div className="relative">
              <input
                type="file"
                accept=".glb"
                onChange={handleModelUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isGenerating}
              />
              <Button
                variant="outline"
                className={`w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 font-['Inter'] ${
                  modelFile ? "border-blue-500 bg-blue-500/10" : ""
                }`}
                disabled={isGenerating}
              >
                <Cube className="h-4 w-4 mr-2" />
                {modelFile ? modelFile.name : "Upload 3D Model (.glb)"}
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 font-['Inter']">Product Brochure</label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isGenerating}
              />
              <Button
                variant="outline"
                className={`w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 font-['Inter'] ${
                  pdfFile ? "border-blue-500 bg-blue-500/10" : ""
                }`}
                disabled={isGenerating}
              >
                <FileText className="h-4 w-4 mr-2" />
                {pdfFile ? pdfFile.name : "Upload Brochure (.pdf)"}
              </Button>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div>
          <Button
            onClick={() => {
              if (modelFile && pdfFile) {
                onGenerateHotspots(modelFile, pdfFile)
              }
            }}
            disabled={!canGenerate}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 font-['Inter']"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Hotspots"
            )}
          </Button>
          <ProgressBadges isGenerating={isGenerating} />
        </div>

        {/* Key Selling Points */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3 font-['Inter']">Key Selling Points</h3>
          <div className="space-y-2">
            {(keySellingPoints || []).length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500">
                  <p className="text-sm font-['Inter']">Generate hotspots to see key selling points</p>
                </div>
              </div>
            ) : (
              keySellingPoints.map((point, index) => (
                <div key={index} className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="text-green-400 text-xs font-medium font-['Inter']">✓ {point.split(":")[0]}</div>
                  <div className="text-gray-300 text-xs font-['Inter']">{point.split(":")[1] || point}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
