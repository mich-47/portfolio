# Portfolio Project Context - Full Brief

## User Profile
**Name:** Michael Urquhart  
**Location:** Developer with diverse interests and skills  
**Current Date:** November 28, 2025

### Interests & Disciplines (All Equally Important)
- **Ecology & Conservation:** Understanding natural systems, environmental impact
- **Coding & Software Engineering:** React, Node.js, full-stack development
- **Engineering & Fabrication:** CNC machining, 3D printing, metalwork, woodwork
- **Science:** Physics (primary), biology, chemistry - first-principles thinking
- **Gaming & Interactive Design:** Game development, game mechanics, interactive experiences
- **Filmmaking & VFX:** Enjoys creating visual content, film production, effects
- **Hands-On Tinkering:** Electronics, Arduino, Raspberry Pi, maker projects

**Key Trait:** Jack-of-all-trades who sees everything as interconnected systems. Views engineering, ecology, and code through lens of systems thinking.

---

## Current Situation

### Existing Portfolio
- Vanilla HTML/CSS/JavaScript single-page portfolio at root of e:\DEV\portfolio
- Files: `index.html`, `church.html`, `creative.html`, `script.js`, `styles.css`
- Has images folder and LICENSE/README
- **Status:** Currently running but will be superseded

### New React Portfolio (Active Development)
- **Location:** `e:\DEV\portfolio\portfolio-react/`
- **Tech Stack:**
  - React 18 with Vite (not Create React App)
  - Tailwind CSS v3 (confirmed working, v4 was incompatible)
  - lucide-react icons
  - PostCSS + Autoprefixer
  - Node v22.12.0, npm 10.9.0

- **Current Status:**
  - Fully functional dev server running on `http://localhost:5173`
  - Complete App.jsx (450+ lines with comments)
  - All dependencies installed and working
  - Dark/light mode toggle implemented
  - Scroll progress bar, mobile-responsive navbar, hero section, projects grid, skills bento layout, about, contact sections

- **Documentation Created:**
  - `REACT_LEARNING_GUIDE.md` - Explains every React concept (hooks, state, useEffect, conditional rendering, .map(), Tailwind utilities) + 9 progressive learning assignments
  - `COMPONENTS_BREAKDOWN.md` - Section-by-section breakdown of entire App.jsx with modification suggestions

---

## Design Philosophy & Goals

### Core Principle: "Systems Thinker"
Portfolio should communicate that Michael sees interconnected systems across all disciplines - from code architecture to ecosystems to mechanical engineering.

### Primary Constraint: Dual-Path Accessibility
**Must support two completely different experiences:**

1. **Quick Tour Path** (2-3 minutes)
   - For hiring managers, recruiters, time-constrained professionals
   - Clean, traditional, professional
   - Essential info only
   - Corporate aesthetic with technical focus
   - Direct CTAs (email, GitHub, live demos)

2. **Immersive Experience Path** (10-15 minutes, optional)
   - For collaborators, fellow creatives, curious explorers
   - Artistic, cinematic, experimental
   - Shows filmmaking/VFX interest
   - Demonstrates thinking and process
   - Atmospheric, paced, beautiful

**Both paths show identical information, just packaged differently.**
- Landing page offers both choices upfront
- ESC key always available to toggle paths
- No feeling of wasting anyone's time
- Shows mature design thinking

---

## New Portfolio Architecture: "Gallery of Rooms"

### Core Concept
User enters a gallery/corridor with **six ornate doors**, each leading to a fully immersive room themed around a discipline/interest. Each room contains all projects, skills, and context related to that area.

### The Six Rooms

#### 1. 🌲 **The Living Lab** (Ecology & Conservation)
- **Environment:** Ancient library meets botanical garden, natural light, terrariums
- **Aesthetic:** Organic shapes, carved wood, vines, earthy colors (greens, browns, warm amber)
- **Sound:** Forest ambience (birds, wind, water)
- **Animation:** Slow, breathing, organic
- **Content:** Ecology knowledge, conservation projects, ecosystem simulations, data visualizations
- **Interaction:** Interactive terrariums, ecosystem simulations, knowledge modules

#### 2. 💻 **The Code Studio** (Software Engineering)
- **Environment:** Hacker's dream space, floating monitors, holographic displays, neon
- **Aesthetic:** Sleek, geometric, neon lights (cyan, purple), circuit patterns, dark grays
- **Sound:** Ambient electronic, subtle keyboard clicks, system beeps
- **Animation:** Fast, energetic, compilation effects, code particles
- **Content:** GitHub stats (real API), projects as running applications, tech stack as modules, architecture diagrams
- **Interaction:** Click projects to compile/display details, click languages to see projects using them

#### 3. ⚙️ **The Workshop** (Engineering & Making)
- **Environment:** Maker's workshop, workbenches, tools on walls, CAD models displayed
- **Aesthetic:** Industrial, metal/wood textures, blueprints, mechanical precision (grays, copper, browns)
- **Sound:** Workshop ambience, distant machinery, creative quiet
- **Animation:** Mechanical, gears turning, objects rotating for inspection
- **Content:** CNC projects (3D CAD viewer), 3D printing projects (layer-by-layer animation), electronics projects, design sketches
- **Interaction:** Rotate 3D models, inspect cross-sections, view CAD files, before/after photo galleries

#### 4. 🔬 **The Lab** (Science - Physics/Biology/Chemistry)
- **Environment:** Clean, precise, academic lab, equipment, whiteboards
- **Aesthetic:** Scientific (periodic table colors, element highlights), mathematical precision, controlled
- **Sound:** Experimental beeps, subtle electronic tones
- **Animation:** Precise, mathematical, simulations running
- **Content:** Physics simulations (running live 3D), data analysis visualizations, equations on whiteboards, scientific papers/articles
- **Interaction:** Play/pause simulations, adjust parameters, full-screen modes, watch systems evolve

#### 5. 🎮 **The Arcade** (Gaming & Interactive Design)
- **Environment:** Retro arcade meets modern VR, neon signs, pixel art mixed with 3D, glitch effects
- **Aesthetic:** Neon pink/cyan/purple, high saturation, arcade vibes, retro-modern fusion
- **Sound:** Chiptune remixes, 8-bit sounds, modern electronic
- **Animation:** Energetic, playful, glitch effects, pixel transitions
- **Content:** Games built/game demos, game mechanics explanations, game dev concepts, pixel art gallery
- **Interaction:** Playable game demos or videos, interactive learning modules, leaderboards if applicable

#### 6. 🎬 **The Studio** (Filmmaking & VFX)
- **Environment:** Film production studio, lighting rigs, edit bays, mood boards, storyboards
- **Aesthetic:** Cinematic, film strip edges, light rays, dramatic lighting, warm color grading (deep shadows)
- **Sound:** Film score, ambient studio sounds, subtle
- **Animation:** Smooth, filmic, slow reveals, dramatic lighting changes
- **Content:** Video reels, storyboards, color palettes, behind-the-scenes process media, short films/VFX demos
- **Interaction:** Play videos, expand storyboards, hover for dramatic lighting changes

### Gallery Entry
- Dark, atmospheric corridor/main space
- Six uniquely designed doors lining walls
- Each door hints at what's inside (visual teaser)
- Hover door → glows and shows hint
- Click door → smooth transition into room
- **ESC key option:** Jump to Quick Summary (traditional view)

### Room Navigation
- Each room has exit door back to gallery
- Optional: Rooms can be connected by hallways (explore in sequence)
- All rooms accessible from gallery

### Quick Summary Mode (ESC/Exit)
- Traditional single-page portfolio view
- All rooms' content summarized
- Same information, cleaner presentation
- Hiring-manager friendly
- Option to return to gallery

---

## Technical Implementation Plan

### Phase 1 (This Week)
- Create gallery environment (Three.js background scene or elaborate CSS/Tailwind)
- Design all six door graphics (could be AI-generated, commissioned, or hand-drawn)
- Implement door interactions and smooth transitions
- Add ESC toggle to Quick Summary

### Phase 2 (Weeks 2-3)
- Build 2-3 most important rooms fully
- Recommendation: Start with Code Room (most straightforward) + one artistic room (FilmStudio or Workshop)
- Implement room navigation, exit doors, interactions
- Add sound system (ambient audio per room)

### Phase 3 (Weeks 4+)
- Complete remaining rooms incrementally
- Each room built independently
- Gather/create content as building (films, screenshots, 3D models)

### Phase 4 (Ongoing)
- Record/film process videos
- Create animations (procedural, not bloated)
- Polish interactions and micro-details
- Deploy and iterate

---

## Technology Stack (To Add to Existing)

```json
{
  "three": "^r128",                    // 3D environments and effects
  "react-three-fiber": "^8",           // React bindings for Three.js
  "drei": "^9",                        // Three.js utilities
  "framer-motion": "^10",              // Smooth animations and transitions
  "zustand": "^4",                     // State management (simpler than Redux)
  "Howler": "^2.2",                    // Spatial audio and sound management
  "lottie-react": "^2",                // Complex animations (JSON-based)
  "react-intersection-observer": "^9"  // Trigger animations on scroll
}
```

### Existing (Don't Change)
- React 18, Vite, Tailwind v3, PostCSS, lucide-react already working

---

## Content Requirements

### Projects to Showcase (Interdisciplinary)
Each project should span multiple disciplines, showing systems thinking:

**Example projects (user should provide actual ones):**
- Greenhouse Monitor (electronics + code + science + ecology)
- Game Physics Engine (gaming + code + physics)
- CNC Path Optimizer (engineering + code + physics)
- Environmental Data Visualizer (ecology + code + data science)
- IoT Sensor Dashboard (making + code + engineering)

### Filming/VFX Content Needed
- Video clips of yourself working (workshop, coding, making)
- Screen recordings (code editing, CAD software, game dev)
- Close-ups of physical projects (Arduino, CNC pieces, 3D prints)
- Timelapse of making/manufacturing
- Nature footage (conservation interest)
- Process documentation (sketch → CAD → physical)

### Can be Generated
- Procedural animations (particles, simulations, geometric transforms)
- AI-generated visuals (Runway, Synthesia, Midjourney if needed)
- Data visualizations (D3.js, Plotly integrated)
- Simulations (Three.js, Canvas)

---

## Design Principles

### Visual Consistency Across Rooms
- Each room unique aesthetic tied to discipline
- But all connected through:
  - Consistent UI patterns (exit doors, title treatments)
  - Interconnected navigation
  - Unified color language (accents, highlights)
  - Cohesive typography (mix of serif + mono)

### Interaction Philosophy
- Every interaction meaningful (not gratuitous)
- Smooth, paced, never jarring
- Respect viewer's time and attention
- Optional immersion (can skip details)
- Accessibility always maintained (keyboard nav, alt text, captions)

### Performance Considerations
- Lazy-load room content (don't load all on entry)
- Optimize 3D scenes (limit poly counts, use instancing)
- Compress videos/media aggressively
- Progressive enhancement (works without JavaScript, degrades gracefully)
- Test on low-end devices

---

## Success Metrics

A good portfolio accomplishes:
1. ✅ **Answers "can you execute?"** - Does it work? Fast? Accessible?
2. ✅ **Answers "can you think?"** - Are decisions intentional? Explained?
3. ✅ **Answers "can you communicate?"** - Is narrative clear? Can you explain choices?
4. ✅ **Answers "would I work with you?"** - Is there personality? Thoughtfulness?

This portfolio should nail all four while being uniquely memorable.

---

## Key Decisions Made

- **Dual-path approach:** Essential to not alienate hiring managers while enabling creativity
- **Six-room structure:** Honors all disciplines equally, prevents single-interest bias
- **No component library:** Custom design to avoid generic feel
- **Immersive-first mindset:** Quick Summary is fallback, not primary (signals confidence in immersion)
- **Systems thinking theme:** Differentiates as "someone who understands interconnected systems"
- **Vite + React + Tailwind:** Proven stack that works, modern defaults

---

## File Structure (Current)

```
e:\DEV\portfolio/
├── index.html (old vanilla portfolio)
├── church.html
├── creative.html
├── script.js
├── styles.css
├── REFACTOR_GUIDE.md (old vanilla refactor guide)
├── README.md
├── images/
├── portfolio-react/
│   ├── package.json (React + dependencies)
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── REACT_LEARNING_GUIDE.md
│   ├── COMPONENTS_BREAKDOWN.md
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx (main component - will be refactored)
│   │   ├── App.css (empty, Tailwind handles)
│   │   ├── index.css (Tailwind entry point)
│   │   └── assets/
│   └── public/
```

---

## Next Steps

1. **Clarify project list** - What actual projects does Michael have to showcase?
2. **Gather media** - Start filming/recording process and projects
3. **Build gallery entry** - Create door designs and gallery environment
4. **Start with one room** - Build Code Room or Film Studio fully as proof of concept
5. **Expand incrementally** - Build other rooms as content becomes available
6. **Refine and deploy** - Polish details, test across devices, launch

---

## Questions to Ask User

1. What are your 3-5 best projects that span multiple disciplines?
2. Do you have video/footage of your work process?
3. Should rooms be interconnected or accessed via gallery only?
4. Do you want sound/ambient audio or prefer silent?
5. Any specific color palettes you're drawn to?
6. Should there be a way to see all projects at once, or only within their rooms?
7. Is there a narrative/story arc connecting the disciplines?
8. How much time are you willing to invest in this (hours/weeks)?

---

**This context should give any AI assistant enough background to continue the project effectively without starting from scratch.**
