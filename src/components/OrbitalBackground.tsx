import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate random points in a sphere
function generateSpherePoints(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random());
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

// Generate points along orbital rings
function generateOrbitalPoints(count: number, radius: number, variation: number = 0.1): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const r = radius + (Math.random() - 0.5) * variation * radius;
    
    positions[i * 3] = r * Math.cos(angle);
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 2] = r * Math.sin(angle);
  }
  return positions;
}

// Starfield component - background stars
function Starfield({ count = 5000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => generateSpherePoints(count, 50), [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
      ref.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#F4F4F5"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

// Orbital ring of particles
function OrbitalRing({ 
  radius, 
  count = 100, 
  speed = 1, 
  color = "#3B82F6",
  size = 0.05,
  tilt = 0
}: { 
  radius: number; 
  count?: number; 
  speed?: number; 
  color?: string;
  size?: number;
  tilt?: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => generateOrbitalPoints(count, radius), [count, radius]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.1;
    }
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
    </group>
  );
}

// Central glowing core
function GlowingCore() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshBasicMaterial color="#3B82F6" transparent opacity={0.6} />
    </mesh>
  );
}

// Satellite particles that orbit
function Satellites({ count = 20, orbitRadius = 4 }: { count?: number; orbitRadius?: number }) {
  const ref = useRef<THREE.Group>(null);
  
  const satellites = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: orbitRadius + (Math.random() - 0.5) * 2,
      speed: 0.2 + Math.random() * 0.3,
      yOffset: (Math.random() - 0.5) * 2,
      size: 0.02 + Math.random() * 0.03,
    }));
  }, [count, orbitRadius]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        const sat = satellites[i];
        const angle = sat.angle + state.clock.elapsedTime * sat.speed;
        child.position.x = sat.radius * Math.cos(angle);
        child.position.z = sat.radius * Math.sin(angle);
        child.position.y = sat.yOffset + Math.sin(state.clock.elapsedTime + i) * 0.5;
      });
    }
  });

  return (
    <group ref={ref}>
      {satellites.map((sat, i) => (
        <mesh key={i}>
          <sphereGeometry args={[sat.size, 8, 8]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Mouse-responsive camera movement
function CameraController() {
  useFrame((state) => {
    const { mouse } = state;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.x * 2, 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouse.y * 1, 0.02);
    state.camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Main scene composition
function OrbitalScene() {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.1} />
      
      {/* Background starfield */}
      <Starfield count={3000} />
      
      {/* Central core */}
      <GlowingCore />
      
      {/* Multiple orbital rings at different angles */}
      <OrbitalRing radius={3} count={80} speed={1} color="#3B82F6" size={0.04} tilt={0.2} />
      <OrbitalRing radius={4.5} count={100} speed={0.7} color="#60A5FA" size={0.03} tilt={-0.3} />
      <OrbitalRing radius={6} count={120} speed={0.5} color="#93C5FD" size={0.025} tilt={0.1} />
      
      {/* Orbiting satellites */}
      <Satellites count={15} orbitRadius={5} />
    </>
  );
}

export function OrbitalBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={['#030305']} />
        <fog attach="fog" args={['#030305', 15, 50]} />
        <OrbitalScene />
      </Canvas>
    </div>
  );
}

export default OrbitalBackground;
