import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Float, 
  MeshDistortMaterial, 
  Sphere, 
  MeshWobbleMaterial, 
  Torus, 
  Stars, 
  PerspectiveCamera,
  Float as FloatDrei
} from '@react-three/drei'
import * as THREE from 'three'

const Shape = ({ position, color, type = 'sphere', ...props }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(time / 2) * 0.2
    meshRef.current.rotation.y = Math.cos(time / 2) * 0.2
  })

  return (
    <FloatDrei speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh position={position} ref={meshRef} {...props}>
        {type === 'sphere' && <sphereGeometry args={[1, 64, 64]} />}
        {type === 'torus' && <torusGeometry args={[0.7, 0.2, 16, 100]} />}
        {type === 'cube' && <boxGeometry args={[1, 1, 1]} />}
        
        {type === 'sphere' ? (
          <MeshDistortMaterial color={color} speed={2} distort={0.4} radius={1} />
        ) : (
          <MeshWobbleMaterial color={color} speed={1} factor={0.6} />
        )}
      </mesh>
    </FloatDrei>
  )
}

const SceneContent = () => {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      const { x, y } = state.mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.1, 0.1)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.1, 0.1)
    }
  })

  return (
    <group ref={groupRef}>
      <Shape position={[3, 1, -2]} color="#00f2ff" type="sphere" scale={1.2} />
      <Shape position={[-4, 2, -3]} color="#505050" type="torus" rotation={[0.5, 0.5, 0]} />
      <Shape position={[0, -2, -1]} color="#303030" type="cube" scale={0.8} />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
         <mesh position={[-2, -3, 0]}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#ffffff" wireframe />
         </mesh>
      </Float>
    </group>
  )
}

const Experience = () => {
  return (
    <div className="canvas-container">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#00f2ff" />
        <pointLight position={[10, -10, 10]} intensity={1.5} color="#ffffff" />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>

        <fog attach="fog" args={['#050505', 5, 20]} />
      </Canvas>
    </div>
  )
}

export default Experience
