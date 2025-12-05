import React from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from './store';
import { Hexagon } from './Hexagon';

/**
 * HIVE COMPONENT
 * 
 * Main scene: Black void with 6 hexagons arranged in honeycomb pattern.
 * Handles camera animation when entering/exiting cells.
 */

function HiveContent() {
  const { camera } = useThree();
  const { activeCell } = usePortfolioStore();

  // Hexagon positions arranged in honeycomb pattern
  const hexPositions = [
    [0, 1.75, 0],     // Cell 0: Top
    [1.5, 0.875, 0],  // Cell 1: Top-right
    [1.5, -0.875, 0], // Cell 2: Bottom-right
    [0, -1.75, 0],    // Cell 3: Bottom
    [-1.5, -0.875, 0],// Cell 4: Bottom-left
    [-1.5, 0.875, 0], // Cell 5: Top-left
  ];

  // Animate camera with smooth lerp in useFrame
  useFrame(() => {
    let targetPos;
    let lookAtTarget;

    if (activeCell === null) {
      // Hive overview: camera back, looking at center
      targetPos = new THREE.Vector3(0, 0, 10);
      lookAtTarget = new THREE.Vector3(0, 0, 0);
    } else {
      // Zoomed into hexagon: camera in front, looking at that hexagon's center
      const hexPos = hexPositions[activeCell];
      targetPos = new THREE.Vector3(
        hexPos[0],
        hexPos[1],
        hexPos[2] + 2  // 2 units in front of hexagon
      );
      lookAtTarget = new THREE.Vector3(
        hexPos[0],
        hexPos[1],
        hexPos[2]      // Look directly at hexagon center
      );
    }

    camera.position.lerp(targetPos, 0.1);
    camera.lookAt(lookAtTarget);
  });

  return (
    <>
      {/* Lower ambient for more dramatic lighting */}
      <ambientLight intensity={0.3} />

      {/* Point light 1: Magenta from top-right-front */}
      <pointLight
        position={[8, 6, 8]}
        intensity={1.2}
        color="#ff0080"
        distance={50}
        decay={2}
      />

      {/* Point light 2: Cyan from top-left-front */}
      <pointLight
        position={[-8, 6, 8]}
        intensity={1.2}
        color="#00d9ff"
        distance={50}
        decay={2}
      />

      {/* Point light 3: Green from bottom-back */}
      <pointLight
        position={[0, -6, -5]}
        intensity={0.8}
        color="#00ff00"
        distance={40}
        decay={2}
      />

      {/* Point light 4: Blue from back for rim lighting */}
      <pointLight
        position={[0, 0, -10]}
        intensity={0.6}
        color="#0055ff"
        distance={30}
        decay={2}
      />

      {/* Render all 6 hexagons in honeycomb arrangement */}
      {hexPositions.map((pos, idx) => (
        <Hexagon key={idx} cellIndex={idx} position={pos} />
      ))}
    </>
  );
}

/**
 * SCENE COMPONENT
 * 
 * Wraps the Three.js Canvas and HiveContent.
 * Provides full scene setup with camera, renderer, lighting.
 */

export function Scene() {
  return (
    <Canvas
      style={{ width: '100%', height: '100vh' }}
      gl={{ antialias: true, alpha: true }}
      performance={{ min: 0.5 }}
    >
      {/* Black background */}
      <color attach="background" args={['#000000']} />

      {/* Camera: starts at [0, 0, 10] looking at origin */}
      <PerspectiveCamera
        position={[0, 0, 10]}
        fov={65}
        near={0.1}
        far={1000}
        makeDefault
      />

      {/* Scene content */}
      <HiveContent />
    </Canvas>
  );
}
