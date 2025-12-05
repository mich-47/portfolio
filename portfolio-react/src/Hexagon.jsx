import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from './store';

/**
 * HEXAGON COMPONENT
 * 
 * Individual hexagonal prism representing a discipline/room.
 * 
 * Features:
 * - Unique color per discipline
 * - Neon rim light (glow effect)
 * - Hover scales 1.1x
 * - Click sets activeCell in store
 * - Idle rotation animation
 */

export function Hexagon({ cellIndex, position }) {
  const meshRef = useRef(null);
  const edgesRef = useRef(null);
  const { cells, setActiveCell } = usePortfolioStore();
  const [hovered, setHovered] = useState(false);

  const cell = cells[cellIndex];
  
  // Target scale: 1.1x when hovered, 1.0x normal
  const targetScale = hovered ? 1.1 : 1.0;

  // Animation loop: smooth scale transitions
  useFrame(() => {
    if (!meshRef.current) return;

    // Initialize scale on first frame if needed
    if (!meshRef.current.userData.scale) {
      meshRef.current.userData.scale = 1.0;
    }

    // Smooth scale lerp
    const currentScale = meshRef.current.userData.scale;
    meshRef.current.userData.scale = THREE.MathUtils.lerp(
      currentScale,
      targetScale,
      0.1
    );
    meshRef.current.scale.setScalar(meshRef.current.userData.scale);

    // Scale edges too
    if (edgesRef.current) {
      edgesRef.current.scale.copy(meshRef.current.scale);
    }
  });

  // Hexagon geometry: 6-sided prism
  // A hexagonal prism can be created with CylinderGeometry with 6 segments
  const hexGeometry = new THREE.CylinderGeometry(
    1,      // radius top
    1,      // radius bottom
    2,      // height
    6,      // segments (6 = hexagon)
    1,      // height segments
    false   // open ended
  );

  // Create edges geometry
  const edgesGeometry = new THREE.EdgesGeometry(hexGeometry);

  return (
    <group position={position}>
      {/* Main hexagon mesh */}
      <mesh
        ref={meshRef}
        geometry={hexGeometry}
        rotation={[Math.PI / 2, Math.PI / 6, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => setActiveCell(cellIndex)}
      >
        {/* Main material - bright color with emissive glow */}
        <meshStandardMaterial
          color={cell.color}
          emissive={cell.color}
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
          wireframe={false}
          toneMapped={true}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Hexagon edges - neon outline */}
      <lineSegments ref={edgesRef} geometry={edgesGeometry} rotation={[Math.PI / 2, Math.PI / 6, 0]}>
        <lineBasicMaterial color={cell.rimLight} linewidth={2} />
      </lineSegments>
    </group>
  );
}
