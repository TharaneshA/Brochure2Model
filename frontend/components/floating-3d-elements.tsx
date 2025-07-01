"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Box, Sphere, Torus, Octahedron } from "@react-three/drei"
import type * as THREE from "three"

function FloatingElement({ position, geometry, color, speed = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current && state?.clock) {
      try {
        meshRef.current.rotation.x += 0.01 * speed
        meshRef.current.rotation.y += 0.01 * speed
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2
      } catch (error) {
        // Silently handle any frame errors
      }
    }
  })

  const GeometryComponent = geometry

  return (
    <mesh ref={meshRef} position={position}>
      <GeometryComponent
        args={geometry === Box ? [1, 1, 1] : geometry === Sphere ? [0.5, 16, 16] : [0.6, 0.3, 16, 32]}
      />
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Floating geometric shapes */}
      <FloatingElement position={[-8, 2, -5]} geometry={Box} color="#3b82f6" speed={0.8} />
      <FloatingElement position={[8, -2, -3]} geometry={Sphere} color="#8b5cf6" speed={1.2} />
      <FloatingElement position={[-6, -3, -4]} geometry={Torus} color="#10b981" speed={0.6} />
      <FloatingElement position={[6, 3, -6]} geometry={Octahedron} color="#f59e0b" speed={1.0} />
      <FloatingElement position={[0, 4, -8]} geometry={Box} color="#ef4444" speed={0.9} />
      <FloatingElement position={[-4, 0, -2]} geometry={Sphere} color="#06b6d4" speed={1.1} />
      <FloatingElement position={[4, -4, -7]} geometry={Torus} color="#ec4899" speed={0.7} />
    </>
  )
}

export function Floating3DElements() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
