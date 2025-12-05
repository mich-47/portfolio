import React, { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from './store';

/**
 * CELL ROOM COMPONENT
 * 
 * Renders the interior of a cell as a 3D room.
 * Creates an immersive environment when zoomed into a hexagon.
 * 
 * Features:
 * - 6 wall planes forming a hexagonal room
 * - Colored ambient lighting matching cell theme
 * - Floating UI panels with project content
 * - Back button to exit the room
 */

export function CellRoom() {
  const { activeCell, closeCell, cells } = usePortfolioStore();
  const groupRef = useRef(null);

  // Don't render if not in a cell
  if (activeCell === null) return null;

  const cell = cells[activeCell];
  const roomRadius = 8;
  const roomHeight = 6;

  // Create 6 hexagonal walls
  const walls = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3; // 60 degrees between each wall
    const x = Math.cos(angle) * roomRadius;
    const z = Math.sin(angle) * roomRadius;
    const rotY = angle + Math.PI / 2;

    walls.push({
      position: [x, 0, z],
      rotation: [0, rotY, 0],
      index: i,
    });
  }

  return (
    <group ref={groupRef}>
      {/* Ambient light with cell color */}
      <ambientLight intensity={0.6} color={cell.color} />

      {/* Rim lights for depth */}
      <pointLight
        position={[0, roomHeight / 2, 0]}
        intensity={0.8}
        color={cell.rimLight}
        distance={50}
      />

      {/* Hexagonal room walls */}
      {walls.map((wall) => (
        <mesh
          key={`wall-${wall.index}`}
          position={wall.position}
          rotation={[0, wall.rotation[1], 0]}
        >
          <planeGeometry args={[roomRadius * 1.5, roomHeight]} />
          <meshStandardMaterial
            color={cell.color}
            emissive={cell.color}
            emissiveIntensity={0.2}
            metalness={0.5}
            roughness={0.4}
            side={THREE.DoubleSide}
            wireframe={false}
          />
        </mesh>
      ))}

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -roomHeight / 2 - 0.5, 0]}>
        <circleGeometry args={[roomRadius * 2, 6]} />
        <meshStandardMaterial
          color={`${cell.color}44`}
          emissive={cell.color}
          emissiveIntensity={0.1}
          metalness={0.7}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, roomHeight / 2 + 0.5, 0]}>
        <circleGeometry args={[roomRadius * 2, 6]} />
        <meshStandardMaterial
          color={`${cell.color}22`}
          emissive={cell.color}
          emissiveIntensity={0.15}
          metalness={0.3}
          roughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Content panel - floating in front of camera */}
      <Html
        position={[0, 0, -4]}
        scale={1}
        distanceFactor={1}
      >
        <div
          style={{
            backgroundColor: 'rgba(10, 10, 10, 0.9)',
            border: `2px solid ${cell.color}`,
            borderRadius: '8px',
            padding: '30px',
            width: '400px',
            maxHeight: '70vh',
            overflowY: 'auto',
            boxShadow: `0 0 30px ${cell.color}88, inset 0 0 20px ${cell.color}44`,
            color: '#ccc',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <h2 style={{ color: cell.color, margin: '0 0 12px 0', fontSize: '24px' }}>
            {cell.icon} {cell.name}
          </h2>
          <p style={{ color: '#999', fontSize: '12px', margin: '0 0 16px 0' }}>
            {cell.description}
          </p>

          {/* Dynamic content per cell */}
          {activeCell === 0 && (
            <>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>Featured Projects</h3>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>React Portfolio with Three.js</li>
                <li>Full-stack applications</li>
                <li>Performance optimization</li>
              </ul>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>Skills</h3>
              <p style={{ fontSize: '13px' }}>React • Node.js • TypeScript • Three.js • WebGL</p>
            </>
          )}

          {activeCell === 1 && (
            <>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>Focus Areas</h3>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>Environmental visualization</li>
                <li>Ecosystem modeling</li>
                <li>Conservation tech</li>
              </ul>
            </>
          )}

          {activeCell === 2 && (
            <>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>Equipment</h3>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>CNC Machining</li>
                <li>3D Printing & CAD</li>
                <li>Electronics & IoT</li>
              </ul>
            </>
          )}

          {activeCell === 3 && (
            <>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>Specializations</h3>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>Physics Simulations</li>
                <li>Computational Modeling</li>
                <li>Data Analysis</li>
              </ul>
            </>
          )}

          {activeCell === 4 && (
            <>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>Interests</h3>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>Game Mechanics Design</li>
                <li>Interactive Experiences</li>
                <li>Engine Development</li>
              </ul>
            </>
          )}

          {activeCell === 5 && (
            <>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>Creative Focus</h3>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>Cinematography & VFX</li>
                <li>Motion Graphics</li>
                <li>Color Grading</li>
              </ul>
            </>
          )}

          <button
            onClick={closeCell}
            style={{
              backgroundColor: `${cell.color}22`,
              color: cell.color,
              border: `1px solid ${cell.color}`,
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginTop: '16px',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = cell.color;
              e.target.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = `${cell.color}22`;
              e.target.style.color = cell.color;
            }}
          >
            ← Exit Room
          </button>
        </div>
      </Html>
    </group>
  );
}
