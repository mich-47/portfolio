import React from 'react';
import { usePortfolioStore } from './store';

/**
 * CONTENT OVERLAY COMPONENT
 * 
 * Pure DOM overlay (not 3D projected) that appears on top of the canvas.
 * Only visible when activeCell is not null.
 * 
 * Displays:
 * - Project/discipline information
 * - Back button to return to hive
 * - Room-specific content
 */

export function ContentOverlay() {
  const { activeCell, closeCell, cells } = usePortfolioStore();

  // Don't render if viewing hive (no cell selected)
  if (activeCell === null) return null;

  const cell = cells[activeCell];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        pointerEvents: 'all',
      }}
      onClick={closeCell}
    >
      {/* Content panel */}
      <div
        style={{
          backgroundColor: 'rgba(10, 10, 10, 0.95)',
          border: `2px solid ${cell.color}`,
          borderRadius: '12px',
          padding: '40px',
          maxWidth: '600px',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: `0 0 30px ${cell.color}66, inset 0 0 30px ${cell.color}33`,
          pointerEvents: 'auto',
          zIndex: 1001,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '40px', marginRight: '12px' }}>
            {cell.icon}
          </span>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: cell.color,
              margin: '0 0 8px 0',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            {cell.name}
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#888',
              margin: '0',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {cell.description}
          </p>
        </div>

        {/* Content based on cell */}
        <div
          style={{
            fontSize: '14px',
            color: '#ccc',
            lineHeight: '1.6',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '24px',
          }}
        >
          {/* Placeholder content - customize per discipline */}
          {activeCell === 0 && (
            <>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>
                Featured Projects
              </h3>
              <ul>
                <li>React Portfolio with Three.js integration</li>
                <li>Full-stack web applications</li>
                <li>Performance-optimized systems</li>
              </ul>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>
                Skills
              </h3>
              <p>
                React • Node.js • TypeScript • Tailwind • Three.js • WebGL
              </p>
            </>
          )}

          {activeCell === 1 && (
            <>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>
                Focus Areas
              </h3>
              <ul>
                <li>Environmental data visualization</li>
                <li>Ecosystem simulation and modeling</li>
                <li>Conservation technology</li>
              </ul>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>
                Projects
              </h3>
              <p>Coming soon...</p>
            </>
          )}

          {activeCell === 2 && (
            <>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>
                Equipment & Expertise
              </h3>
              <ul>
                <li>CNC Machining & Design</li>
                <li>3D Printing & CAD</li>
                <li>Electronics & IoT</li>
                <li>Woodworking & Metalwork</li>
              </ul>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>
                Process
              </h3>
              <p>From concept to physical prototype...</p>
            </>
          )}

          {activeCell === 3 && (
            <>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>
                Specializations
              </h3>
              <ul>
                <li>Physics Simulations</li>
                <li>Computational Modeling</li>
                <li>Data Analysis</li>
                <li>First-Principles Problem Solving</li>
              </ul>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>
                Tools
              </h3>
              <p>Python • MATLAB • WebGL • Three.js</p>
            </>
          )}

          {activeCell === 4 && (
            <>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>
                Interests
              </h3>
              <ul>
                <li>Game Mechanics Design</li>
                <li>Interactive Experiences</li>
                <li>Game Engine Development</li>
                <li>Performance Optimization</li>
              </ul>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>
                Platforms
              </h3>
              <p>Unity • Custom engines • Web-based games</p>
            </>
          )}

          {activeCell === 5 && (
            <>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>
                Creative Focus
              </h3>
              <ul>
                <li>Cinematography & Directing</li>
                <li>VFX & Motion Graphics</li>
                <li>Color Grading & Composition</li>
                <li>Storytelling Through Video</li>
              </ul>
              <h3 style={{ color: '#fff', marginTop: '16px' }}>
                Tools
              </h3>
              <p>
                DaVinci Resolve • Blender • Premiere • After Effects
              </p>
            </>
          )}
        </div>

        {/* Back button */}
        <button
          onClick={closeCell}
          style={{
            backgroundColor: `${cell.color}22`,
            color: cell.color,
            border: `1px solid ${cell.color}`,
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'Inter, sans-serif',
            marginTop: '12px',
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
          ← Back to Hive
        </button>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
