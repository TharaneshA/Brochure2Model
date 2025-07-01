"use client"

import { useEffect, useRef } from "react"

export function AnimatedGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const gridSize = 50
    const dots: Array<{ x: number; y: number; opacity: number; pulse: number }> = []
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)

    // Create grid dots
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
        const fadeRatio = Math.max(0, 1 - distance / maxDistance)

        dots.push({
          x: x + Math.random() * 10 - 5,
          y: y + Math.random() * 10 - 5,
          opacity: (Math.random() * 0.5 + 0.1) * fadeRatio,
          pulse: Math.random() * Math.PI * 2,
        })
      }
    }

    let animationId: number

    const animate = (time: number) => {
      // Deep black background
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines with circular fade
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
          const fadeRatio = Math.max(0, 1 - distance / maxDistance)
          const opacity = 0.1 * fadeRatio

          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
          ctx.lineWidth = 1

          // Vertical line
          if (x < canvas.width - gridSize) {
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x, Math.min(y + gridSize, canvas.height))
            ctx.stroke()
          }

          // Horizontal line
          if (y < canvas.height - gridSize) {
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(Math.min(x + gridSize, canvas.width), y)
            ctx.stroke()
          }
        }
      }

      // Draw animated dots with circular fade
      dots.forEach((dot, index) => {
        const distance = Math.sqrt((dot.x - centerX) ** 2 + (dot.y - centerY) ** 2)
        const fadeRatio = Math.max(0, 1 - distance / maxDistance)
        const pulseValue = Math.sin(time * 0.002 + dot.pulse) * 0.3 + 0.7
        const opacity = dot.opacity * pulseValue * fadeRatio

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2)
        ctx.fill()

        // Add some moving effect
        dot.x += Math.sin(time * 0.001 + index) * 0.1
        dot.y += Math.cos(time * 0.001 + index) * 0.1
      })

      animationId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}
