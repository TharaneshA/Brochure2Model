"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, CuboidIcon as Cube, Zap, Eye, Layers } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedGridBackground } from "./animated-grid-background"
import { AnimatedText } from "./animated-text"
import { LandingDemoViewer } from "./landing-demo-viewer"

interface ModernLandingProps {
  onGetStarted: () => void
}

export function ModernLanding({ onGetStarted }: ModernLandingProps) {
  const features = [
    {
      icon: Cube,
      title: "3D Model Upload",
      description: "Support for GLB format with real-time rendering and interactive visualization",
    },
    {
      icon: Zap,
      title: "AI-Powered Analysis",
      description: "Automatically extract features from product brochures using advanced AI",
    },
    {
      icon: Eye,
      title: "Interactive Hotspots",
      description: "Click and explore product features with detailed information overlays",
    },
    {
      icon: Layers,
      title: "Professional Interface",
      description: "Clean, modern design optimized for professional product presentations",
    },
  ]

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden">
      {/* Animated Grid Background */}
      <AnimatedGridBackground />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Cube className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-xl font-['Inter']">Satori XR</span>
            <div className="text-xs text-gray-400 font-['Inter']">Visualizer</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors font-['Inter']">
            Features
          </a>
          <a href="#demo" className="text-gray-300 hover:text-white transition-colors font-['Inter']">
            Demo
          </a>
          <a href="#support" className="text-gray-300 hover:text-white transition-colors font-['Inter']">
            Support
          </a>
        </div>

        <Button onClick={onGetStarted} className="bg-blue-600 hover:bg-blue-700 font-['Inter']">
          Get Started
        </Button>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 text-sm font-medium font-['Inter']">Next-generation 3D visualization</span>
          </div>

          {/* Main Heading with Animated Text */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 font-['Inter']">
            Transform Your
            <br />
            <AnimatedText />
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed font-['Inter']">
            Upload 3D models and product brochures to create interactive hotspot experiences.
            <br />
            Perfect for sales presentations, product demos, and customer engagement.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button onClick={onGetStarted} size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 font-['Inter']">
              Start Visualizing
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 bg-transparent font-['Inter']"
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="font-['Inter']">GLB format support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="font-['Inter']">AI-powered analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="font-['Inter']">Real-time rendering</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Inter']">
            Everything you need for 3D product visualization
          </h2>
          <p className="text-xl text-gray-400 font-['Inter']">
            Professional tools for creating engaging product experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm border-gray-700 hover:bg-gray-800/50 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-4 font-['Inter']">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm font-['Inter']">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Demo Preview with Interactive 3D */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Inter']">See It In Action</h2>
          <p className="text-xl text-gray-400 font-['Inter']">
            Interactive demo showing hotspot visualization on a professional drone model
          </p>
        </div>

        <LandingDemoViewer />

        <p className="text-gray-300 font-['Inter'] text-center mt-6">
          Experience the power of interactive 3D product visualization with AI-generated hotspots
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-gray-800 bg-black w-full">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-gray-400 font-['Inter']">
            Trusted by leading companies for professional product presentations
          </p>
        </div>
      </div>
    </div>
  )
}
