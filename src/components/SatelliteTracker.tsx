import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Stars, Billboard, Line } from '@react-three/drei';
import * as THREE from 'three';
import * as satellite from 'satellite.js';

/**
 * CONFIGURATION
 */
const EARTH_RADIUS_KM = 6371;
const EARTH_VISUAL_RADIUS = 5; // The size of the earth mesh in 3D units
const SCALE_FACTOR = EARTH_VISUAL_RADIUS / EARTH_RADIUS_KM;
const TIME_MULTIPLIER = 180; // Speed up time for testing (180x = 90min orbit becomes 30s)

// TLE Data (Ideally fetched from Celestrak)
const SATELLITES = [
  {
    id: 'iss',
    name: 'ISS',
    color: '#00ff00',
    // TLEs change over time. These are snapshots.
    tle1: '1 25544U 98067A   24026.54166667  .00016717  00000+0  30706-3 0  9999',
    tle2: '2 25544  51.6423 321.7561 0005436 150.3256 345.5488 15.49692482436440',
  },
  {
    id: 'hubble',
    name: 'Hubble',
    color: '#ffaa00',
    tle1: '1 20580U 90037B   24026.19539656  .00000523  00000+0  26388-4 0  9996',
    tle2: '2 20580  28.4691 166.7237 0002517 259.6053 234.3312 15.09270726359508',
  },
  {
    id: 'starlink',
    name: 'Starlink-1007',
    color: '#00dfff',
    tle1: '1 44713U 19074A   24026.41666667  .00008542  00000+0  63255-3 0  9991',
    tle2: '2 44713  53.0543 235.1587 0001391  94.6190 265.5037 15.06395359230554',
  },
];

/**
 * HELPER: Convert Satellite Position (ECI) to Three.js Vector
 * Satellite.js uses Z-up (Z is North). Three.js is Y-up.
 * We map: x -> x, y -> z, z -> y
 */
const getPositionFromTLE = (tle1: string, tle2: string, date: Date) => {
  const satrec = satellite.twoline2satrec(tle1, tle2);
  const positionAndVelocity = satellite.propagate(satrec, date);
  
  if (!positionAndVelocity.position || positionAndVelocity.position === true) {
    return null;
  }

  const p = positionAndVelocity.position as satellite.EciVec3<number>;
  
  // Convert km to visual units and swap axes for Three.js (Y-up)
  return new THREE.Vector3(
    p.x * SCALE_FACTOR,
    p.z * SCALE_FACTOR, // Sat Z (North) becomes Three Y (Up)
    -p.y * SCALE_FACTOR // Sat Y becomes Three Z (Depth)
  );
};

// --- COMPONENTS ---

// Fresnel Atmosphere Shader for realistic atmospheric glow
const atmosphereShaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    glowColor: { value: new THREE.Color(0x4db2ff) },
  },
  vertexShader: `
    varying vec3 vertexNormal;
    void main() {
      vertexNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 glowColor;
    varying vec3 vertexNormal;
    void main() {
      float intensity = pow(0.7 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      gl_FragColor = vec4(glowColor, 1.0) * intensity * 0.5;
    }
  `,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  transparent: true,
});

function Earth() {
  const earthRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Load realistic textures from Three.js repository
  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';
    
    const colorMap = loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'
    );
    const specularMap = loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'
    );
    const normalMap = loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'
    );
    const cloudMap = loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
    );

    return { colorMap, specularMap, normalMap, cloudMap };
  }, []);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0005;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0007;
    }
  });

  return (
    <group ref={earthRef}>
      {/* Earth Surface - Photorealistic */}
      <mesh>
        <sphereGeometry args={[5, 256, 256]} />
        <meshPhongMaterial 
          map={textures.colorMap}
          specularMap={textures.specularMap}
          normalMap={textures.normalMap}
          specular={new THREE.Color(0x111111)}
          shininess={5}
          normalScale={new THREE.Vector2(0.5, 0.5)}
        />
      </mesh>

      {/* Cloud Layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[5.01, 128, 128]} />
        <meshStandardMaterial 
          map={textures.cloudMap}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      {/* Atmospheric Glow with Fresnel Effect */}
      <mesh>
        <sphereGeometry args={[5.15, 128, 128]} />
        <primitive object={atmosphereShaderMaterial} />
      </mesh>
    </group>
  );
}

function SatelliteInstance({ data }: { data: typeof SATELLITES[0] }) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);

  // Calculate initial orbit path once
  const initialOrbitPath = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const baseDate = new Date();
    
    // Orbit period is roughly 90-100 mins. We sample 100 points.
    for (let i = 0; i < 100; i++) {
      // FIX: Do NOT use TIME_MULTIPLIER here. 
      // We want the static shape of the orbit, so we sample every 1 minute.
      const futureDate = new Date(baseDate.getTime() + (i * 60000));
      const futurePos = getPositionFromTLE(data.tle1, data.tle2, futureDate);
      if (futurePos) points.push(futurePos);
    }
    return points;
  }, [data.tle1, data.tle2]);

  // Update satellite position every frame
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const now = new Date();
    // We KEEP the multiplier here so the ball moves fast
    const acceleratedDate = new Date(now.getTime() + (clock.getElapsedTime() * 1000 * (TIME_MULTIPLIER - 1)));
    const pos = getPositionFromTLE(data.tle1, data.tle2, acceleratedDate);
    
    if (pos) {
      meshRef.current.position.copy(pos);
    }
  });

  return (
    <>
      {/* The Actual Orbital Path Line */}
      {/* NOTE: We check points.length > 0 to prevent render errors if TLE fails. 
         We also convert Vector3[] to the specific format Line accepts if needed, 
         though Drei's Line component handles Vector3 arrays well in recent versions.
      */}
      {initialOrbitPath.length > 0 && (
        <Line 
          points={initialOrbitPath}
          color={data.color} 
          opacity={0.5} // Increased slightly for visibility
          transparent 
          lineWidth={2} // Increased slightly for visibility
        />
      )}

      {/* The Satellite Mesh */}
      <group ref={meshRef}>
        <mesh 
          onPointerOver={() => setHover(true)} 
          onPointerOut={() => setHover(false)}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color={hovered ? 'white' : data.color} />
        </mesh>
        
        {/* Label (Billboard ensures it always faces camera) */}
        <Billboard position={[0, 0.4, 0]}>
            <Text
                fontSize={0.25}
                color={data.color}
                anchorX="center"
                anchorY="bottom"
                outlineWidth={0.02}
                outlineColor="#000000"
            >
                {data.name}
            </Text>
            {/* Altitude info on hover */}
            {hovered && (
                 <Text position={[0, -0.5, 0]} fontSize={0.15} color={data.color}>
                    Hovering
                 </Text>
            )}
        </Billboard>
      </group>
    </>
  );
}

export function SatelliteTracker() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      <Canvas camera={{ position: [0, 8, 15], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#030305']} />
        
        {/* SUN LIGHTING - High contrast space lighting */}
        <directionalLight 
          position={[50, 20, 30]} 
          intensity={2.5}
          castShadow 
        />

        {/* DARK SIDE AMBIENT - Cool blue for realistic night side */}
        <ambientLight intensity={0.1} color="#4da6ff" />
        
        {/* Controls - disabled for portfolio background */}
        <OrbitControls 
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
        />
        
        {/* Environment */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
        
        {/* Scene Content */}
        <Earth />
        
        {SATELLITES.map((sat) => (
          <SatelliteInstance key={sat.id} data={sat} />
        ))}
        
      </Canvas>
    </div>
  );
}

export default SatelliteTracker;