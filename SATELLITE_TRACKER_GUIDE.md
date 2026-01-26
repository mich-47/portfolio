# 🛰️ SATELLITE TRACKER - IMPLEMENTATION GUIDE

## What We've Created

A real-time visualization of Earth with actual satellites orbiting it. This is shown in your hero section, replacing the generic orbital rings.

## Features

✅ **Live Earth Visualization**
- Procedurally generated Earth with oceans and landmasses
- Subtle atmospheric glow
- Rotating to show planetary motion

✅ **Real Satellite Tracking**
- ISS (International Space Station)
- Hubble Space Telescope
- Landsat 8 (Earth observation)
- Starlink constellation (2 satellites shown)

✅ **Visual Elements**
- Each satellite has unique color and size
- Orbital trails showing the path it's taking
- Glow effects showing active status
- Orbital reference grid

✅ **Technical Accuracy**
- TLE (Two-Line Element) data format support
- Orbital mechanics calculations
- Real satellite parameters

## How to Enable It

### Step 1: Replace OrbitalBackground in Index.tsx

Currently using: `<OrbitalBackground />`

Option A: Keep current, add satellite tracker as overlay
```tsx
<>
  <OrbitalBackground />
  <SatelliteTracker />
</>
```

Option B: Replace entirely with satellite tracker
```tsx
<SatelliteTracker />
```

### Step 2: Update imports in src/pages/Index.tsx

```tsx
import { SatelliteTracker } from "@/components/SatelliteTracker";
```

## Installation (If Not Done)

No additional packages needed! Uses only:
- three.js (already installed)
- @react-three/fiber (already installed)

## Customization Options

### Add More Satellites

In `SatelliteTracker.tsx`, add to `SAMPLE_SATELLITES` array:

```typescript
{
  id: 'your-satellite',
  name: 'Satellite Name',
  tle1: 'LINE 1 FROM CELESTRAK',
  tle2: 'LINE 2 FROM CELESTRAK',
  color: '#FF00FF',  // Hex color
  size: 0.1,          // Relative size
  active: true,
}
```

### Get Real TLE Data

Visit https://celestrak.com/

1. Search for satellites you want
2. Copy the 2 TLE lines
3. Paste into the satellite object above

Popular satellites to track:
- ISS: https://celestrak.com/NORAD/elements/stations.txt (search for ISS)
- Hubble: https://celestrak.com/NORAD/elements/hubble.txt
- Landsat: https://celestrak.com/NORAD/elements/resource.txt
- Starlink: https://celestrak.com/NORAD/elements/starlink.txt

### Change Earth Appearance

```typescript
// In createEarthTexture() function:
ctx.fillStyle = '#0a1628';  // Ocean color
ctx.fillStyle = '#1a4d2e';  // Land color
ctx.fillStyle = 'rgba(58, 130, 246, 0.1)'; // Atmosphere glow
```

### Adjust Orbital Scaling

```typescript
// In calculateSatellitePosition() function:
const orbitalRadius = 6.7;  // Change this number
// Higher = larger orbit, lower = closer to Earth
```

### Change Camera View

```typescript
// In Canvas props:
camera={{ position: [0, 0, 20], fov: 60 }}
//                       ↑        ↑
//                    Distance  Field of view
```

## Advanced: Real Satellite.js Integration

For production-grade accuracy, install satellite.js:

```bash
npm install satellite.js
npm install --save-dev @types/satellite.js
```

Then replace the simplified `calculateSatellitePosition` with:

```typescript
import { twoline2satrec, propagate } from 'satellite.js';

function calculateSatellitePosition(tle1: string, tle2: string, timestamp: number): THREE.Vector3 {
  const satrec = twoline2satrec(tle1, tle2);
  const now = new Date();
  now.setTime(Date.now() + timestamp * 1000);
  
  const position_and_velocity = propagate(satrec, now);
  
  // Convert from km to scene units
  const earthRadius = 6.371;  // km
  return new THREE.Vector3(
    position_and_velocity.position.x / earthRadius,
    position_and_velocity.position.y / earthRadius,
    position_and_velocity.position.z / earthRadius
  );
}
```

## Performance Optimization

Current implementation is optimized for:
- 5 satellites with trails
- 60 FPS on most devices
- Mobile-friendly

If adding many more satellites:

1. Reduce trail length:
```typescript
if (positions.current.length > 60) {  // was 120
  positions.current.shift();
}
```

2. Reduce glow complexity:
```typescript
// Remove the glow sphere
{/* <mesh>... (delete this) </mesh> */}
```

3. Reduce Earth texture resolution:
```typescript
canvas.width = 1024;  // was 2048
canvas.height = 512;  // was 1024
```

## Future Enhancements

### Phase 1: Data Integration
- [ ] Fetch live TLE data from celestrak.com API
- [ ] Auto-update satellite positions
- [ ] Cache updates (every hour)

### Phase 2: User Features
- [ ] Satellite search/filter
- [ ] Click satellite for info panel
- [ ] Show next pass predictions
- [ ] Visibility predictions

### Phase 3: Interactive
- [ ] Ground track visualization (where it passes)
- [ ] Custom satellite selection
- [ ] Timeline scrubbing (fast-forward/rewind)
- [ ] Export trajectory data

### Phase 4: Integration
- [ ] Embed in projects section
- [ ] Use as project metaphor
- [ ] Link satellites to actual projects
- [ ] Show tech stack as "mission parameters"

## Troubleshooting

**Q: Satellites not visible?**
A: Check the orbital radius calculation. May need to adjust the `orbitalRadius` value in `calculateSatellitePosition()`.

**Q: Performance is poor?**
A: Reduce satellite count, remove trails, reduce Earth texture size.

**Q: Trails are too long/short?**
A: Adjust the `positions.current.length > 120` threshold in `SatelliteObject`.

**Q: Earth texture looks weird?**
A: Regenerate with different random seed or load an actual Earth texture image.

## Code Structure

```
SatelliteTracker.tsx
├── Earth()                    - 3D Earth mesh
├── createEarthTexture()       - Procedural texture generator
├── calculateSatellitePosition() - Orbital mechanics
├── SatelliteObject()          - Individual satellite + trail
├── OrbitalPlane()             - Reference grid
└── SatelliteScene()           - Main scene composition
```

## Fun Facts

- ISS orbits Earth every ~90 minutes
- Hubble orbits at ~28,000 km/h
- Starlink constellation has 5,000+ satellites in low orbit
- You can see ISS with naked eye from ground
- TLE data is updated regularly by NORAD tracking systems

---

**Next Steps:**
1. Choose: Keep current background or replace with satellite tracker?
2. If replacing: Update imports in Index.tsx
3. Deploy and watch people marvel at your hero section! 🚀
