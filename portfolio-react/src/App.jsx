/**
 * INFINITE HIVE - Portfolio Application
 * 
 * React Three Fiber based immersive portfolio experience.
 * 
 * ARCHITECTURE:
 * - Scene: Three.js canvas with honeycomb of hexagons
 * - Store (Zustand): Manages activeCell state
 * - ContentOverlay: DOM rendered in 3D space showing cell details
 * - Hexagon: Individual interactive 3D objects
 * 
 * INTERACTION:
 * - Hover hexagon: Scale 1.1x
 * - Click hexagon: Camera zooms into cell, overlay appears
 * - ESC or click back: Return to hive view
 * 
 * LEARNING CONCEPTS:
 * - React Three Fiber: Declarative 3D in React
 * - Zustand: Lightweight state management (simpler than Redux)
 * - react-spring: Smooth camera animations
 * - @react-three/drei: Utility components (Camera, Html)
 */

import { useEffect } from 'react';
import { Scene } from './Scene';
import { ContentOverlay } from './ContentOverlay';
import { usePortfolioStore } from './store';
import './App.css';

export default function App() {
  const activeCell = usePortfolioStore((state) => state.activeCell);
  const closeCell = usePortfolioStore((state) => state.closeCell);

  // ESC key closes current cell
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeCell !== null) {
        closeCell();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCell, closeCell]);

  return (
    <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
      {/* Three.js Canvas with Scene */}
      <Scene />

      {/* Content overlay - rendered above canvas, not in 3D space */}
      <ContentOverlay />

      {/* Subtle HUD overlay - instruction text at top */}
      {activeCell === null && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            pointerEvents: 'none',
            opacity: 0.7,
            transition: 'opacity 0.3s ease',
          }}
        >
          <p
            style={{
              color: '#00d9ff',
              fontFamily: 'Space Grotesk, monospace',
              fontSize: '14px',
              margin: 0,
              textAlign: 'center',
              textShadow: '0 0 10px rgba(0, 217, 255, 0.3)',
            }}
          >
            click • hover • explore
          </p>
        </div>
      )}

      {/* ESC hint when inside a cell */}
      {activeCell !== null && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          <p
            style={{
              color: '#888',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              margin: 0,
              textAlign: 'right',
            }}
          >
            press ESC to return
          </p>
        </div>
      )}
    </div>
  );
}
