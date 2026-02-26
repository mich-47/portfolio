# 🏗️ Portfolio Architecture Overview

This document provides a concise technical breakdown of the portfolio's architecture, designed to help you reverse-engineer the codebase and understand how modern React applications are structured.

## 1. Technical Stack

*   **Core**: React 18 & TypeScript
*   **Build Tool**: Vite (Lightning-fast HMR and optimized builds)
*   **Styling**: Tailwind CSS (Utility-first CSS framework)
*   **UI Components**: Custom components inspired by `shadcn-ui`, using Radix UI primitives for accessibility.
*   **Animations**: Framer Motion (Declarative animations) & CSS Keyframes.
*   **3D Graphics**: Three.js & React Three Fiber (`@react-three/fiber`, `@react-three/drei`).
*   **Data Fetching**: Native `fetch` API via custom React Hooks.

## 2. Directory Structure & Data Flow

```text
src/
├── components/          # React components
│   ├── sections/        # Major page sections (Hero, About, Projects, etc.)
│   ├── ui/              # Reusable UI elements (GlassCard, TiltCard, CodeMockup)
│   ├── GitHubStats.tsx  # Live data component
│   └── SatelliteTracker.tsx # 3D background component
├── data/
│   └── portfolioData.ts # 📍 SINGLE SOURCE OF TRUTH
├── hooks/
│   └── useGitHubStats.ts # Custom hook for API data fetching
├── pages/
│   └── Index.tsx        # Main entry point laying out sections sequentially
├── index.css            # Global CSS variables (Glassmorphism design system)
└── tailwind.config.ts   # Tailwind configuration & custom animations
```

### The "Single Source of Truth" Pattern
The entire portfolio is data-driven. `src/data/portfolioData.ts` holds all text, skills, and project configurations. 
*   **Why?** It separates *content* from *presentation*. If you need to add a project, you update the array in `portfolioData.ts` and the UI automatically maps over it to render a new card. You don't need to touch JSX.

## 3. Key Architectural Concepts to Learn

### A. The "Glassmorphism" Design System (`index.css` & `GlassCard.tsx`)
The aesthetic is achieved using CSS variables defined in `@layer base` within `index.css`. 
*   `GlassCard.tsx` uses `backdrop-filter: blur()` combined with semi-transparent backgrounds (`rgba` or `hsl` with opacity) to create the frosted glass effect.
*   The `cn()` utility (`/lib/utils.ts`) merges Tailwind classes safely, preventing style conflicts.

### B. 3D Transforms & Interaction (`TiltCard.tsx`)
The `TiltCard` component demonstrates how to map 2D mouse coordinates to 3D CSS transforms (`rotateX`, `rotateY`, `perspective`).
*   **React Context**: It uses `useRef` to get the DOM node's dimensions bounding box.
*   **Math**: It normalizes mouse X/Y relative to the element center (-1 to 1) and multiplies by a maximum tilt angle.

### C. WebGL Integration (`SatelliteTracker.tsx`)
This file bridges standard React DOM with Three.js via `react-three-fiber`.
*   `<Canvas>` creates the WebGL context.
*   Standard React components inside the canvas (like `<mesh>`, `<sphereGeometry>`) map directly to Three.js primitives.
*   `useFrame` hooks into the browser's render loop (60fps) to calculate satellite positions based on TLE data via `satellite.js`.

### D. Custom Hooks & API Integration (`useGitHubStats.ts`)
Instead of putting `fetch` calls directly inside components, the logic is extracted into a custom hook.
*   **State Management**: It manages `isLoading`, `error`, and `data` states internally.
*   **Cleanup**: It uses an `AbortController` in the `useEffect` cleanup function to cancel pending network requests if the component unmounts prematurely, preventing memory leaks and state updates on unmounted components.

### E. Code Mockups vs. Images (`CodeMockup.tsx`)
To maintain an "expert engineer" vibe, `CodeMockup.tsx` uses a simple regex-based syntax highlighter to dynamically render text as code instead of static images. This approach keeps the bundle light while looking sharp and authentic.

## 4. How to Reverse Engineer This Further

1.  **Start at `Index.tsx`**: Follow the rendering tree downwards. See how sections are stacked.
2.  **Break a Component**: Go into `ProjectsSection.tsx`, remove a Framer Motion `<motion.div>` wrapper, and see how the entrance animation disappears. 
3.  **Trace Data**: Follow `projectsData` from `portfolioData.ts` into `ProjectsSection.tsx` and watch how the `.map()` function generates the UI.
4.  **Experiment with CSS**: Open `index.css` and change the `--primary` HSL value to see the entire site's accent color adapt instantly.
