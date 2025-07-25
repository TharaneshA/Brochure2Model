"use client"

import { useRef, Suspense, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Box, Sphere, Cylinder, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Eye,
  Target,
  Grid3X3,
  Camera,
  Play,
  Pause,
  Ruler,
  Sun,
  Lightbulb,
  Zap,
} from "lucide-react"
import { HotspotOverlay } from "./hotspot-overlay"
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF } from '@react-three/drei'
import { API_BASE_URL } from '@/services/api';

// Pulsating hotspot marker component
function HotspotMarker({
  position,
  hotspotId,
  onClick,
  onHover,
  onHoverEnd,
  hotspot,
}: {
  position: [number, number, number]
  hotspotId: string
  onClick: (id: string, position: THREE.Vector3, hotspot: any) => void
  onHover: (hotspot: any, position: THREE.Vector3) => void
  onHoverEnd: () => void
  hotspot: any
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current && state?.clock) {
      try {
        // Pulsating animation
        const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 1
        meshRef.current.scale.setScalar(pulse * (isHovered ? 1.5 : 1))
      } catch (error) {
        // Handle frame errors silently
      }
    }
  })

  const handleClick = () => {
    if (position) {
      onClick(hotspotId, new THREE.Vector3(...position), hotspot)
    } else {
      console.error(
        "HotspotMarker: handleClick received undefined or null position",
        position
      )
    }
  }

  const handlePointerOver = () => {
    setIsHovered(true)
    if (position) {
      onHover(hotspot, new THREE.Vector3(...position))
    } else {
      console.error(
        "HotspotMarker: handlePointerOver received undefined or null position",
        position
      )
    }
  }

  const handlePointerOut = () => {
    setIsHovered(false)
    onHoverEnd()
  }

  return (
    <group position={position}>
      <mesh ref={meshRef} onClick={handleClick} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        <Sphere args={[0.1]}>
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={isHovered ? 1.0 : 0.5}
            transparent
            opacity={0.9}
          />
        </Sphere>
        {/* Outer glow ring */}
        <Sphere args={[0.15]}>
          <meshStandardMaterial
            color="#3b82f6"
            transparent
            opacity={isHovered ? 0.3 : 0.1}
            emissive="#3b82f6"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </mesh>

      {/* Simple tooltip that follows the hotspot - just title */}
      {isHovered && (
        <Html position={[0, 0.3, 0]} center occlude={false} style={{ pointerEvents: "none" }} scale={1.5}>
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
              <h4 className="text-white font-medium text-sm font-['Inter']">{hotspot.title}</h4>
          </div>
        </Html>
      )}
    </group>
  )
}

// Scale indicator component
function ScaleIndicator({ zoom }: { zoom: number }) {
  const scale = Math.max(0.1, 1 / zoom)

  return (
    <group position={[-3, -2, 0]}>
      {/* Scale bar */}
      <Box args={[scale, 0.02, 0.02]} position={[scale / 1, 0, 0]}>
        <meshBasicMaterial color="#ffffff" />
      </Box>
      {/* Scale markers */}
      <Box args={[0.02, 0.1, 0.02]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#ffffff" />
      </Box>
      <Box args={[0.02, 0.1, 0.02]} position={[scale, 0, 0]}>
        <meshBasicMaterial color="#ffffff" />
      </Box>
      {/* Scale text */}
      <Html position={[scale / 2, -0.2, 0]} center>
        <div className="text-white text-xs bg-black/50 px-2 py-1 rounded">{(scale * 100).toFixed(0)}cm</div>
      </Html>
    </group>
  )
}

// Component to load uploaded GLB model
function UploadedModel({
  modelUrl,
  hotspots,
  onHotspotClick,
  onHotspotHover,
  onHotspotHoverEnd,
  autoRotate,
  ambientIntensity,
  directionalIntensity,
  pointIntensity,
}: {
  modelUrl: string
  hotspots: any[]
  onHotspotClick: (id: string, position: THREE.Vector3, hotspot: any) => void
  onHotspotHover: (hotspot: any, position: THREE.Vector3) => void
  onHotspotHoverEnd: () => void
  autoRotate: boolean
  ambientIntensity: number
  directionalIntensity: number
  pointIntensity: number
}) {
  const [scene, setScene] = useState<THREE.Group | null>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [modelBounds, setModelBounds] = useState<THREE.Box3 | null>(null)
  const { camera } = useThree()
  const [hoveredHotspot, setHoveredHotspot] = useState<any>(null)
  const [clickedHotspot, setClickedHotspot] = useState<any>(null)
  const [hotspotScreenPosition, setHotspotScreenPosition] = useState<{ x: number; y: number } | null>(null)
  const [hotspotPositions, setHotspotPositions] = useState<{
    id: string
    position: THREE.Vector3
    hotspot: any
  }[]>([])

  // Function to send log messages to the backend
  const sendLogToBackend = async (level: string, content: string) => {
    try {
      await fetch(`${API_BASE_URL}/log-frontend-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level, content }),
      });
    } catch (error) {
      console.error("Failed to send log to backend:", error);
    }
  };

  // Function to find mesh position by name
    const { scene: gltfScene, nodes } = useGLTF(modelUrl) // Call useGLTF once at the top level

  // Function to find mesh position by name
  const findMeshPosition = (partName: string, currentScene: THREE.Group | null): THREE.Vector3 | null => {
    sendLogToBackend("info", `findMeshPosition called for partName: '${partName}' with currentScene: ${currentScene ? 'available' : 'null'}`);
    if (!partName || !currentScene) {
      sendLogToBackend("warn", `findMeshPosition: partName or currentScene is undefined. partName: ${partName}`);
      return null;
    }

    let foundObject: THREE.Object3D | undefined;

    // Try exact match first (case-sensitive)
    foundObject = currentScene.getObjectByName(partName);
    if (foundObject) {
      const worldPos = new THREE.Vector3();
       if (foundObject instanceof THREE.Mesh) {
         foundObject.geometry.computeBoundingBox();
         foundObject.geometry.boundingBox?.getCenter(worldPos);
         foundObject.localToWorld(worldPos);
       } else {
         foundObject.getWorldPosition(worldPos);
       }
       sendLogToBackend("info", `Exact match found for partName: '${partName}'. Object type: ${foundObject.type}. Coordinates: x=${worldPos.x.toFixed(2)}, y=${worldPos.y.toFixed(2)}, z=${worldPos.z.toFixed(2)}`);
       return worldPos;
    }

    // If not found, try case-insensitive exact match by traversing
    currentScene.traverse((object) => {
      if (object.name.toLowerCase() === partName.toLowerCase()) {
        foundObject = object;
        return; // Stop traversal
      }
    });
    if (foundObject) {
      const worldPos = new THREE.Vector3();
       if (foundObject instanceof THREE.Mesh) {
         foundObject.geometry.computeBoundingBox();
         foundObject.geometry.boundingBox?.getCenter(worldPos);
         foundObject.localToWorld(worldPos);
       } else {
         foundObject.getWorldPosition(worldPos);
       }
       sendLogToBackend("info", `Case-insensitive exact match found for partName: '${partName}' with object name '${foundObject.name}'. Object type: ${foundObject.type}. Coordinates: x=${worldPos.x.toFixed(2)}, y=${worldPos.y.toFixed(2)}, z=${worldPos.z.toFixed(2)}`);
       return worldPos;
    }

    // If still not found, try partial matching with segments of the partName
    const partNameSegments = partName.split(/[_:\s-]/).filter(s => s.length > 2);
    let bestMatch: THREE.Object3D | undefined;
    let maxMatches = 0;

    currentScene.traverse((object) => {
      let currentMatches = 0;
      for (const segment of partNameSegments) {
        if (object.name.toLowerCase().includes(segment.toLowerCase())) {
          currentMatches++;
        }
      }
      if (currentMatches > maxMatches) {
        maxMatches = currentMatches;
        bestMatch = object;
      }
    });
    foundObject = bestMatch;
    if (foundObject) {
      const worldPos = new THREE.Vector3();
       if (foundObject instanceof THREE.Mesh) {
         foundObject.geometry.computeBoundingBox();
         foundObject.geometry.boundingBox?.getCenter(worldPos);
         foundObject.localToWorld(worldPos);
       } else {
         foundObject.getWorldPosition(worldPos);
       }
       sendLogToBackend("info", `Partial match found for partName: '${partName}' with object name '${foundObject.name}'. Object type: ${foundObject.type}. Coordinates: x=${worldPos.x.toFixed(2)}, y=${worldPos.y.toFixed(2)}, z=${worldPos.z.toFixed(2)}`);
       return worldPos;
    }

    sendLogToBackend("warn", `Mesh with part name '${partName}' not found in the scene.`);
    return null;
  };

  // Load GLTF model
  useEffect(() => {
    if (!modelUrl) return

    const loader = new GLTFLoader()
    loader.load(
      modelUrl,
      (gltf) => {
        const loadedScene = gltf.scene

        // Calculate model bounds
        const box = new THREE.Box3().setFromObject(loadedScene)
        setModelBounds(box)

        // Center the model
        const center = box.getCenter(new THREE.Vector3())
        loadedScene.position.sub(center)

        // Scale the model to fit in viewport
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 3 / maxDim // Scale to fit in 3 unit cube
        loadedScene.scale.setScalar(scale)

        setScene(loadedScene)


        },
        undefined,
      (error) => {
        sendLogToBackend("error", `An error occurred loading the GLTF model: ${error}`);
      }
    )
  }, [modelUrl])

  // Calculate hotspot positions when scene or hotspots change
  useEffect(() => {
    if (scene && modelBounds && hotspots.length > 0) {
      const newHotspotPositions = hotspots
        .map((hotspot) => {
          const position = findMeshPosition(hotspot.matched_part_name, scene)
          if (position) {
            return { id: hotspot.id, position, hotspot }
          } else {
            sendLogToBackend("warn", `Could not find mesh for hotspot '${hotspot.feature_title}' with part name '${hotspot.matched_part_name}'. Falling back to generated position.`);
            // Fallback to a generated position if mesh not found
            const size = modelBounds.getSize(new THREE.Vector3())
            const center = new THREE.Vector3(0, 0, 0) // Model is centered at origin
            const scale = 3 / Math.max(size.x, size.y, size.z)
            const scaledSize = size.clone().multiplyScalar(scale)

            const fallbackPositions: [number, number, number][] = [
              [center.x, center.y + scaledSize.y * 0.4, center.z + scaledSize.z * 0.3], // Top front
              [center.x - scaledSize.x * 0.4, center.y, center.z], // Left side
              [center.x + scaledSize.x * 0.4, center.y, center.z], // Right side
              [center.x, center.y - scaledSize.y * 0.4, center.z], // Bottom
            ]
            const fallbackPosition = fallbackPositions[hotspots.indexOf(hotspot) % fallbackPositions.length]
            return { id: hotspot.id, position: new THREE.Vector3(...fallbackPosition), hotspot }
          }
        })
        .filter(Boolean) as {
          id: string
          position: THREE.Vector3
          hotspot: any
        }[]
      setHotspotPositions(newHotspotPositions)
    }
  }, [scene, modelBounds, hotspots])

  useFrame(() => {
    if (groupRef.current && autoRotate) {
      try {
        groupRef.current.rotation.y += 0.005
      } catch (error) {
        // Handle frame errors silently
      }
    }

    if (hoveredHotspot && hoveredHotspot.position && hotspotScreenPosition) {
      const vector = new THREE.Vector3(...(hoveredHotspot.position as [number, number, number]))
      vector.project(camera)
      const x = (vector.x * 0.5 + 0.5) * window.innerWidth
      const y = (-vector.y * 0.5 + 0.5) * window.innerHeight
      setHotspotScreenPosition({ x, y })
    }
  })

  const handleHotspotClick = (id: string, position: THREE.Vector3, hotspot: any) => {
    
    // Ensure hotspot has required properties for HotspotOverlay
    const formattedHotspot = {
      ...hotspot,
      feature_title: hotspot.title || "",
      feature_description: hotspot.summary || ""
    };
    
    // Clear any existing clicked hotspot before setting new one
    setClickedHotspot(null);

    // Only set clickedHotspot if there's content to display
    if (formattedHotspot.feature_title || formattedHotspot.feature_description) {
      setClickedHotspot(formattedHotspot)
      const vector = position.clone().project(camera)
      const x = (vector.x * 0.5 + 0.5) * window.innerWidth
      const y = (-vector.y * 0.5 + 0.5) * window.innerHeight
      setHotspotScreenPosition({ x, y })
    }
    onHotspotClick(id, position, hotspot)
  }

  const handleHotspotHover = (hotspot: any, position: THREE.Vector3) => {
    setHoveredHotspot(hotspot)
    setClickedHotspot(null) // Clear clicked hotspot on hover
    const vector = position.clone().project(camera)
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth
    const y = (-vector.y * 0.5 + 0.5) * window.innerHeight
    setHotspotScreenPosition({ x, y })
    onHotspotHover(hotspot, position)
  }

  const handleHotspotHoverEnd = () => {
    setHoveredHotspot(null)
    onHotspotHoverEnd()
  }

  const handleOverlayClose = () => {
    setClickedHotspot(null)
    setHotspotScreenPosition(null)
  }

  return (
    <group ref={groupRef}>
      {scene && <primitive object={scene} />}
      {/* Hotspot markers */}
      {hotspotPositions.map((hotspotPos) => (
        <HotspotMarker
          key={hotspotPos.id}
          position={[hotspotPos.position.x, hotspotPos.position.y, hotspotPos.position.z]}
          hotspotId={hotspotPos.id}
          onClick={handleHotspotClick}
          onHover={handleHotspotHover}
          onHoverEnd={handleHotspotHoverEnd}
          hotspot={hotspotPos.hotspot}
        />
      ))}
      {clickedHotspot && hotspotScreenPosition && (
        <Html position={[0, 0, 0]} fullscreen>
          <HotspotOverlay
            hotspot={clickedHotspot}
            position={hotspotScreenPosition}
            onClose={handleOverlayClose}
          />
        </Html>
      )}
    </group>
  )
}

// Simple drone model made of basic shapes (fallback)
function DroneModel({
  hotspots,
  onHotspotClick,
  onHotspotHover,
  onHotspotHoverEnd,
  autoRotate,
}: {
  hotspots: any[]
  onHotspotClick: (id: string, position: THREE.Vector3, hotspot: any) => void
  onHotspotHover: (hotspot: any, position: THREE.Vector3) => void
  onHotspotHoverEnd: () => void
  autoRotate: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const [hoveredHotspot, setHoveredHotspot] = useState<any>(null)
  const [clickedHotspot, setClickedHotspot] = useState<any>(null)
  const [hotspotScreenPosition, setHotspotScreenPosition] = useState<{ x: number; y: number } | null>(null)

  useFrame(() => {
    if (groupRef.current && autoRotate) {
      try {
        groupRef.current.rotation.y += 0.005
      } catch (error) {
        // Handle frame errors silently
      }
    }

    if (hoveredHotspot && hoveredHotspot.position && hotspotScreenPosition) {
      const vector = new THREE.Vector3(...(hoveredHotspot.position as [number, number, number]))
      vector.project(camera)
      const x = (vector.x * 0.5 + 0.5) * window.innerWidth
      const y = (-vector.y * 0.5 + 0.5) * window.innerHeight
      setHotspotScreenPosition({ x, y })
    }
  })

  const handleHotspotClick = (id: string, position: THREE.Vector3, hotspot: any) => {
    // Clear any existing clicked hotspot before setting new one
    setClickedHotspot(null);

    // Only set clickedHotspot if there's content to display
    if (hotspot.title || hotspot.summary) {
      setClickedHotspot(hotspot)
      const vector = position.clone().project(camera)
      const x = (vector.x * 0.5 + 0.5) * window.innerWidth
      const y = (-vector.y * 0.5 + 0.5) * window.innerHeight
      setHotspotScreenPosition({ x, y })
    }
    onHotspotClick(id, position, hotspot)
  }

  const handleHotspotHover = (hotspot: any, position: THREE.Vector3) => {
    setHoveredHotspot(hotspot)
    const vector = position.clone().project(camera)
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth
    const y = (-vector.y * 0.5 + 0.5) * window.innerHeight
    setHotspotScreenPosition({ x, y })
    onHotspotHover(hotspot, position)
  }

  const handleHotspotHoverEnd = () => {
    setHoveredHotspot(null)
    onHotspotHoverEnd()
  }

  const handleOverlayClose = () => {
    setClickedHotspot(null)
    setHotspotScreenPosition(null)
  }

  return (
    <group ref={groupRef}>
      {/* Main body */}
      <Box args={[2, 0.3, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2d3748" />
      </Box>

      {/* Arms */}
      <Cylinder args={[0.05, 0.05, 3]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#4a5568" />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 3]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#4a5568" />
      </Cylinder>

      {/* Propellers */}
      {[
        [1.4, 0.2, 1.4],
        [-1.4, 0.2, 1.4],
        [1.4, 0.2, -1.4],
        [-1.4, 0.2, -1.4],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <Cylinder args={[0.4, 0.4, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#1a202c" transparent opacity={0.7} />
          </Cylinder>
        </group>
      ))}

      {/* Camera gimbal */}
      <Sphere args={[0.3]} position={[0, -0.4, 0.5]}>
        <meshStandardMaterial color="#e53e3e" />
      </Sphere>

      {/* Hotspot markers */}
      {hotspots.map((hotspot, i) => {
        const positions: [number, number, number][] = [
          [0, -0.4, 0.5], // Camera
          [0, 0.3, 0], // GPS
          [1.4, 0.2, 1.4], // Propeller
          [-0.8, 0, 0], // Battery
        ]
        const position = positions[i] || [0, 0, 0]
        return (
          <HotspotMarker
            key={hotspot.id}
            position={position as [number, number, number]}
            hotspotId={hotspot.id}
            onClick={handleHotspotClick}
            onHover={handleHotspotHover}
            onHoverEnd={handleHotspotHoverEnd}
            hotspot={hotspot}
          />
        )
      })}
      {clickedHotspot && hotspotScreenPosition && (
        <Html position={[0, 0, 0]} fullscreen>
          <HotspotOverlay
            hotspot={clickedHotspot}
            position={hotspotScreenPosition}
            onClose={handleOverlayClose}
          />
        </Html>
      )}
    </group>
  )
}

// Axis helper component
function AxisHelper({ visible }: { visible: boolean }) {
  if (!visible) return null

  return (
    <group>
      {/* X axis - Red */}
      <Cylinder args={[0.02, 0.02, 2]} position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshBasicMaterial color="#ff0000" />
      </Cylinder>
      {/* Y axis - Green */}
      <Cylinder args={[0.02, 0.02, 2]} position={[0, 1, 0]}>
        <meshBasicMaterial color="#00ff00" />
      </Cylinder>
      {/* Z axis - Blue */}
      <Cylinder args={[0.02, 0.02, 2]} position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#0000ff" />
      </Cylinder>
    </group>
  )
}

// Camera animation component
function CameraAnimator({
  targetPosition,
  targetLookAt,
  duration = 1000,
  onComplete,
}: {
  targetPosition?: THREE.Vector3
  targetLookAt?: THREE.Vector3
  duration?: number
  onComplete?: () => void
}) {
  const { camera } = useThree()
  const startTime = useRef<number>(0)
  const startPosition = useRef<THREE.Vector3>(new THREE.Vector3())
  const startLookAt = useRef<THREE.Vector3>(new THREE.Vector3())
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (targetPosition) {
      startTime.current = Date.now()
      startPosition.current.copy(camera.position)
      startLookAt.current.copy(camera.position).add(camera.getWorldDirection(new THREE.Vector3()))
      setIsAnimating(true)
    }
  }, [targetPosition, camera])

  useFrame(() => {
    if (isAnimating && targetPosition) {
      const elapsed = Date.now() - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic

      camera.position.lerpVectors(startPosition.current, targetPosition, easeProgress)

      if (targetLookAt) {
        const currentLookAt = new THREE.Vector3().lerpVectors(startLookAt.current, targetLookAt, easeProgress)
        camera.lookAt(currentLookAt)
      }

      if (progress >= 1) {
        setIsAnimating(false)
        onComplete?.()
      }
    }
  })

  return null
}

function Scene({
  hotspots,
  onHotspotClick,
  onHotspotHover,
  onHotspotHoverEnd,
  modelUrl,
  showAxis,
  showScale,
  autoRotate,
  ambientIntensity,
  directionalIntensity,
  pointIntensity,
}: {
  hotspots: any[]
  onHotspotClick: (id: string, position: THREE.Vector3) => void
  onHotspotHover: (id: string, position: THREE.Vector3) => void
  onHotspotHoverEnd: () => void
  modelUrl?: string
  showAxis: boolean
  showScale: boolean
  autoRotate: boolean
  ambientIntensity: number
  directionalIntensity: number
  pointIntensity: number
}) {
  const { camera } = useThree()
  const [zoom, setZoom] = useState(1)

  useFrame(() => {
    setZoom(camera.zoom || 1)
  })

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight position={[10, 10, 5]} intensity={directionalIntensity} />
      <pointLight position={[-10, -10, -5]} intensity={pointIntensity} />

      {modelUrl ? (
        <UploadedModel
          modelUrl={modelUrl}
          hotspots={hotspots}
          onHotspotClick={onHotspotClick}
          onHotspotHover={onHotspotHover}
          onHotspotHoverEnd={onHotspotHoverEnd}
          autoRotate={autoRotate} ambientIntensity={0} directionalIntensity={0} pointIntensity={0}        />
      ) : (
        <DroneModel
          hotspots={hotspots}
          onHotspotClick={onHotspotClick}
          onHotspotHover={onHotspotHover}
          onHotspotHoverEnd={onHotspotHoverEnd}
          autoRotate={autoRotate}
        />
      )}

      <AxisHelper visible={showAxis} />
      {showScale && <ScaleIndicator zoom={zoom} />}
    </>
  )
}

interface Drone3DViewerProps {
  hotspots: any[]
  onHotspotClick: (id: string) => void
  modelUrl?: string
  focusHotspotId?: string
}

export function Drone3DViewer({ hotspots, onHotspotClick, modelUrl, focusHotspotId }: Drone3DViewerProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<{ hotspot: any; position: { x: number; y: number } } | null>(
    null,
  )
  const [showAxis, setShowAxis] = useState(false)
  const [showScale, setShowScale] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [showLightingControls, setShowLightingControls] = useState(false)
  const [ambientIntensity, setAmbientIntensity] = useState(0.6)
  const [directionalIntensity, setDirectionalIntensity] = useState(1)
  const [pointIntensity, setPointIntensity] = useState(0.5)
  const [cameraTarget, setCameraTarget] = useState<{ position: THREE.Vector3; lookAt: THREE.Vector3 } | null>(null)

  const controlsRef = useRef<any>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Focus on hotspot when focusHotspotId changes
  useEffect(() => {
    if (focusHotspotId && controlsRef.current) {
      const hotspot = hotspots.find((h) => h.id === focusHotspotId)
      if (hotspot) {
        // Get hotspot position based on model type
        const targetPosition = new THREE.Vector3(0, 0, 0)

        if (modelUrl) {
          // For uploaded models, use generated positions
          const positions = [
            [0, 1.2, 0.9], // Top front
            [-1.2, 0, 0], // Left side
            [1.2, 0, 0], // Right side
            [0, -1.2, 0], // Bottom
          ]
          const index = hotspots.findIndex((h) => h.id === focusHotspotId)
          const pos = positions[index] || [0, 0, 0]
          targetPosition.set(pos[0], pos[1], pos[2])
        } else {
          // For drone model, use predefined positions
          const positions = [
            [0, -0.4, 0.5], // Camera
            [0, 0.3, 0], // GPS
            [1.4, 0.2, 1.4], // Propeller
            [-0.8, 0, 0], // Battery
          ]
          const index = hotspots.findIndex((h) => h.id === focusHotspotId)
          const pos = positions[index] || [0, 0, 0]
          targetPosition.set(pos[0], pos[1], pos[2])
        }

        // Calculate camera position to look at hotspot
        const cameraPos = targetPosition.clone().add(new THREE.Vector3(2, 1, 2))

        setCameraTarget({
          position: cameraPos,
          lookAt: targetPosition,
        })
      }
    }
  }, [focusHotspotId, hotspots, modelUrl])

  const handleHotspotClick = (id: string, position: THREE.Vector3) => {
    const hotspot = hotspots.find((h) => h.id === id)
    if (hotspot) {
      setSelectedHotspot({ hotspot, position: { x: 400, y: 300 } })
      onHotspotClick(id)
    }
  }

  const handleHotspotHover = (id: string, position: THREE.Vector3) => {
    // Hover is now handled within the 3D scene using Html component
  }

  const handleHotspotHoverEnd = () => {
    // Hover end is now handled within the 3D scene
  }

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  const handleZoomIn = () => {
    if (controlsRef.current) {
      const controls = controlsRef.current
      const camera = controls.object
      const direction = new THREE.Vector3()
      camera.getWorldDirection(direction)
      camera.position.add(direction.multiplyScalar(0.5))
      controls.update()
    }
  }

  const handleZoomOut = () => {
    if (controlsRef.current) {
      const controls = controlsRef.current
      const camera = controls.object
      const direction = new THREE.Vector3()
      camera.getWorldDirection(direction)
      camera.position.add(direction.multiplyScalar(-0.5))
      controls.update()
    }
  }

  const handleFrontView = () => {
    setCameraTarget({
      position: new THREE.Vector3(0, 0, 5),
      lookAt: new THREE.Vector3(0, 0, 0),
    })
  }

  const handleTopView = () => {
    setCameraTarget({
      position: new THREE.Vector3(0, 5, 0),
      lookAt: new THREE.Vector3(0, 0, 0),
    })
  }

  const handleScreenshot = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const link = document.createElement("a")
      link.download = "satori-xr-screenshot.png"
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800">
      <Canvas ref={canvasRef} camera={{ position: [5, 3, 5], fov: 50 }} gl={{ preserveDrawingBuffer: true }}>
        <Suspense fallback={null}>
          <Scene
            hotspots={hotspots}
            onHotspotClick={handleHotspotClick}
            onHotspotHover={handleHotspotHover}
            onHotspotHoverEnd={handleHotspotHoverEnd}
            modelUrl={modelUrl}
            showAxis={showAxis}
            showScale={showScale}
            autoRotate={autoRotate}
            ambientIntensity={ambientIntensity}
            directionalIntensity={directionalIntensity}
            pointIntensity={pointIntensity}
          />
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={0.1}
            maxDistance={100}
            autoRotate={false}
          />
          {cameraTarget && (
            <CameraAnimator
              targetPosition={cameraTarget.position}
              targetLookAt={cameraTarget.lookAt}
              onComplete={() => setCameraTarget(null)}
            />
          )}
        </Suspense>
      </Canvas>

      {/* Selected Hotspot Overlay */}
      {selectedHotspot && (
        <HotspotOverlay
          hotspot={selectedHotspot.hotspot}
          position={selectedHotspot.position}
          onClose={() => setSelectedHotspot(null)}
        />
      )}

      {/* Main Controls Toolbar */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          size="sm"
          variant="outline"
          className="bg-black/50 border-gray-600 text-white hover:bg-black/70 backdrop-blur-sm"
          onClick={handleReset}
          title="Reset View"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-black/50 border-gray-600 text-white hover:bg-black/70 backdrop-blur-sm"
          onClick={handleZoomIn}
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-black/50 border-gray-600 text-white hover:bg-black/70 backdrop-blur-sm"
          onClick={handleZoomOut}
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className={`border-gray-600 text-white hover:bg-black/70 backdrop-blur-sm ${
            autoRotate ? "bg-blue-600/50" : "bg-black/50"
          }`}
          onClick={() => setAutoRotate(!autoRotate)}
          title="Toggle Auto Rotation"
        >
          {autoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className={`border-gray-600 text-white hover:bg-black/70 backdrop-blur-sm ${
            showAxis ? "bg-blue-600/50" : "bg-black/50"
          }`}
          onClick={() => setShowAxis(!showAxis)}
          title="Toggle Axis"
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className={`border-gray-600 text-white hover:bg-black/70 backdrop-blur-sm ${
            showScale ? "bg-blue-600/50" : "bg-black/50"
          }`}
          onClick={() => setShowScale(!showScale)}
          title="Toggle Scale"
        >
          <Ruler className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-black/50 border-gray-600 text-white hover:bg-black/70 backdrop-blur-sm"
          onClick={handleScreenshot}
          title="Take Screenshot"
        >
          <Camera className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className={`border-gray-600 text-white hover:bg-black/70 backdrop-blur-sm ${
            showLightingControls ? "bg-blue-600/50" : "bg-black/50"
          }`}
          onClick={() => setShowLightingControls(!showLightingControls)}
          title="Lighting Controls"
        >
          <Sun className="h-4 w-4" />
        </Button>
      </div>

      {/* Lighting Controls Panel */}
      {showLightingControls && (
        <div className="absolute top-4 right-20 bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg p-4 w-64">
          <h4 className="text-white font-medium mb-3 font-['Inter']">Lighting Controls</h4>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sun className="h-4 w-4 text-yellow-400" />
                <span className="text-white text-sm">Ambient Light</span>
              </div>
              <Slider
                value={[ambientIntensity]}
                onValueChange={(value) => setAmbientIntensity(value[0])}
                max={2}
                min={0}
                step={0.1}
                className="w-full"
              />
              <span className="text-gray-400 text-xs">{ambientIntensity.toFixed(1)}</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-blue-400" />
                <span className="text-white text-sm">Directional Light</span>
              </div>
              <Slider
                value={[directionalIntensity]}
                onValueChange={(value) => setDirectionalIntensity(value[0])}
                max={3}
                min={0}
                step={0.1}
                className="w-full"
              />
              <span className="text-gray-400 text-xs">{directionalIntensity.toFixed(1)}</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-purple-400" />
                <span className="text-white text-sm">Point Light</span>
              </div>
              <Slider
                value={[pointIntensity]}
                onValueChange={(value) => setPointIntensity(value[0])}
                max={2}
                min={0}
                step={0.1}
                className="w-full"
              />
              <span className="text-gray-400 text-xs">{pointIntensity.toFixed(1)}</span>
            </div>
          </div>
        </div>
      )}

      {/* View Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="bg-black/50 border-gray-600 text-white hover:bg-black/70 backdrop-blur-sm"
          onClick={handleFrontView}
          title="Front View"
        >
          <Eye className="h-4 w-4 mr-1" />
          Front
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-black/50 border-gray-600 text-white hover:bg-black/70 backdrop-blur-sm"
          onClick={handleTopView}
          title="Top View"
        >
          <Target className="h-4 w-4 mr-1" />
          Top
        </Button>
      </div>

      {/* Hotspot Legend */}
      {hotspots.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-gray-600">
          <h4 className="text-white text-sm font-medium mb-2 font-['Inter']">Interactive Hotspots</h4>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="font-['Inter']">Hover and click blue markers to explore</span>
          </div>
        </div>
      )}
    </div>
  )
}
