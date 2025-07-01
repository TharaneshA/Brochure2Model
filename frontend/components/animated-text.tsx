"use client"

import { useState, useEffect } from "react"

const words = ["Demos", "Presentations", "Experiences", "Showcases", "Visualizations"]

export function AnimatedText() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        setIsVisible(true)
      }, 300)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="text-blue-400">
      Product{" "}
      <span
        className={`inline-block transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        {words[currentWordIndex]}
      </span>
    </span>
  )
}
