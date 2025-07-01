"use client"

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-teal-500/10 to-blue-500/10 animate-pulse" />
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-teal-500/20 rounded-full blur-3xl animate-bounce"
        style={{ animationDuration: "6s" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-pink-500/20 rounded-full blur-3xl animate-bounce"
        style={{ animationDuration: "8s", animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-teal-500/15 to-blue-500/15 rounded-full blur-2xl animate-pulse"
        style={{ animationDuration: "4s" }}
      />
    </div>
  )
}
