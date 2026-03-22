import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, MeshDistortMaterial, Environment, Stars } from '@react-three/drei'
import * as THREE from 'three'

// Floating diamond ring shape
function Ring({ position, scale, speed, color }) {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3
      meshRef.current.rotation.y += 0.008 * speed
    }
  })
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.15, 32, 100]} />
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  )
}

// Floating sphere with distort
function FloatingSphere({ position, scale, color, speed }) {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed
    }
  })
  return (
    <Float speed={speed * 0.6} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={0.35}
          speed={2}
          metalness={0.8}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}

// Particle petals
function Petals() {
  const count = 120
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  const pointsRef = useRef()
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#f5e89a" transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

// Main animated scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#faf4d3" />
      <pointLight position={[-5, 3, 2]} intensity={1} color="#d4a820" />
      <pointLight position={[5, -3, -2]} intensity={0.8} color="#c47b7b" />

      <Environment preset="sunset" />
      <Stars radius={80} depth={50} count={1500} factor={3} fade speed={0.5} />

      {/* Gold rings */}
      <Ring position={[-3.5, 1.5, -2]}  scale={0.7}  speed={0.8}  color="#d4a820" />
      <Ring position={[3.2, -1, -3]}    scale={0.5}  speed={1.2}  color="#e8c53a" />
      <Ring position={[0, 2.5, -4]}     scale={0.9}  speed={0.6}  color="#b88a16" />
      <Ring position={[-2, -2, -1]}     scale={0.4}  speed={1.5}  color="#d4a820" />

      {/* Distorted spheres */}
      <FloatingSphere position={[4, 2, -5]}   scale={1.2} color="#6b1a3a" speed={1} />
      <FloatingSphere position={[-4, -1, -4]} scale={0.8} color="#8b2252" speed={1.4} />
      <FloatingSphere position={[0, -2.5, -6]} scale={1.5} color="#4a1128" speed={0.7} />

      <Sparkles count={80} scale={12} size={1.5} speed={0.3} color="#faf4d3" />
      <Petals />
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  )
}
