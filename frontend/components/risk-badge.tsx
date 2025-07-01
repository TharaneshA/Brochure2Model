"use client"

interface RiskBadgeProps {
  risk: string
}

export function RiskBadge({ risk }: RiskBadgeProps) {
  const getRiskColor = (riskLevel: string) => {
    const level = riskLevel.toLowerCase()
    if (level.includes("low")) return "from-green-500 to-emerald-500"
    if (level.includes("medium")) return "from-yellow-500 to-orange-500"
    if (level.includes("high")) return "from-red-500 to-pink-500"
    return "from-gray-500 to-gray-600"
  }

  return (
    <div
      className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${getRiskColor(risk)} text-white font-semibold text-sm shadow-lg`}
    >
      {risk}
    </div>
  )
}
