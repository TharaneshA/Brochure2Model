"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Loader2 } from "lucide-react"

interface ProgressBadgesProps {
  isGenerating: boolean
}

const steps = [
  { id: 1, label: "Analyzing PDF", duration: 1000 },
  { id: 2, label: "Extracting Features", duration: 1500 },
  { id: 3, label: "Mapping 3D Points", duration: 1000 },
  { id: 4, label: "Generating Hotspots", duration: 500 },
]

export function ProgressBadges({ isGenerating }: ProgressBadgesProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    if (!isGenerating) {
      setCurrentStep(0)
      setCompletedSteps([])
      return
    }

    let totalTime = 0
    steps.forEach((step, index) => {
      totalTime += step.duration
      setTimeout(() => {
        setCurrentStep(index + 1)
        setCompletedSteps((prev) => [...prev, step.id])
      }, totalTime)
    })
  }, [isGenerating])

  if (!isGenerating && completedSteps.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {steps.map((step) => {
        const isCompleted = completedSteps.includes(step.id)
        const isCurrent = currentStep === step.id && isGenerating
        const isPending = step.id > currentStep

        return (
          <Badge
            key={step.id}
            variant="outline"
            className={`text-xs transition-all duration-300 ${
              isCompleted
                ? "bg-green-500/20 border-green-500 text-green-400"
                : isCurrent
                  ? "bg-blue-500/20 border-blue-500 text-blue-400 animate-pulse"
                  : isPending
                    ? "bg-gray-800 border-gray-700 text-gray-500"
                    : "bg-gray-800 border-gray-700 text-gray-400"
            }`}
          >
            {isCompleted ? (
              <CheckCircle className="h-3 w-3 mr-1" />
            ) : isCurrent ? (
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            ) : null}
            {step.label}
          </Badge>
        )
      })}
    </div>
  )
}
