
# Orbital Command - Personal Portfolio (Frontend)

## Overview
A premium SpaceX/Starlink-inspired portfolio with immersive WebGL orbital simulation, frost-glass UI, and silky-smooth interactions. All content will use editable static data for easy future CMS integration.

---

## Phase 1: Foundation & Design System

### Core Setup
- Configure custom color palette (Deep Space Black #030305, Starlight White #F4F4F5, Electric Blue #3B82F6)
- Integrate Google Fonts: Space Grotesk (headers) and Inter (body)
- Set up CSS custom properties for consistent theming

### Frosted Glass Components
- Reusable "glass card" component with backdrop blur (20px) and thin semi-transparent borders
- Glass-styled buttons with magnetic hover effects
- Glass navigation elements

---

## Phase 2: Three.js Orbital Simulation Background

### Interactive Starfield
- Full-screen canvas behind all content
- Animated star particles creating depth
- Orbital paths with satellites/particles rotating around central points
- Glowing particle trails following movement
- Subtle parallax responding to mouse position
- Performance-optimized for smooth 60fps

---

## Phase 3: Single-Page Sections

### Hero Section
- Bold animated headline with name/title using Space Grotesk
- Animated tagline with typing or stagger effect
- CTA buttons with magnetic pull + data-loading bar hover effects
- Animated scroll indicator

### About Section
- Professional bio in glass-card layout
- Key metrics display (years experience, projects, technologies)
- Profile image with glassmorphism frame

### Projects Section
- Featured projects grid with glass cards
- Hover effects revealing tech stack and links
- Static project data (easily swappable for CMS later)

### Skills Section
- Visual skill categories with technology icons
- Animated reveals on scroll
- Orbital-themed or progress-bar style display

### Contact Section
- Contact form with glass styling (frontend validation only)
- Social media links with hover animations
- Location/availability display

---

## Phase 4: Interactions & Polish

### Magnetic Buttons
- Cursor proximity detection for magnetic pull effect
- Electric blue data-loading progress bar on hover
- Subtle glow states

### Lenis Smooth Scroll
- Weightless scrolling experience
- Smooth anchor navigation between sections

### Scroll Animations
- Section fade-in/slide-up on scroll entry
- Staggered element animations
- Parallax depth between layers

### Navigation
- Fixed glass navbar with section links
- Active section highlighting on scroll
- Mobile-responsive hamburger menu

---

## Technical Stack
- React 18 + TypeScript
- Three.js via React Three Fiber for WebGL
- Lenis for smooth scrolling
- Tailwind CSS for styling
- Fully responsive (mobile to desktop)
