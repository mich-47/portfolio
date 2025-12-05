# React Portfolio Breakdown - How Each Section Works

## 1. PROGRESS BAR (Top of page)

```jsx
<div
  className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 z-50"
  style={{ width: `${scrollProgress}%` }}
/>
```

**How it works:**
1. Fixed to top with `fixed top-0 left-0`
2. Width changes based on `scrollProgress` state
3. The useEffect listener updates `scrollProgress` as user scrolls
4. `z-50` keeps it above everything

**Concept:** This demonstrates inline styles + state binding

**Try modifying:**
- Change the colors: `from-purple-600 to-pink-600`
- Change height: `h-1` → `h-2` (thicker)
- Add easing: Add `transition-[width] duration-300` for smooth animation

---

## 2. NAVBAR (Sticky navigation)

```jsx
<nav className="sticky top-0 z-40 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-gray-800 transition-colors">
  {/* Logo */}
  {/* Desktop Navigation */}
  {/* Theme Toggle */}
  {/* Mobile Menu */}
</nav>
```

**Breakdown:**
- `sticky top-0` = sticks to top when scrolling
- `z-40` = below progress bar (`z-50`)
- `dark:bg-slate-950` = dark mode background
- `transition-colors` = smooth color change when toggling

**Logo:** Static text (no interactivity)

**Desktop Navigation:** Hidden on mobile with `hidden md:flex`

**Theme Toggle Button:**
```jsx
<button
  onClick={() => setIsDarkMode(!isDarkMode)}
  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ..."
>
  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
</button>
```
- Toggles `isDarkMode` state
- Icon changes based on current mode
- Lucide icons (lucide-react library)

**Mobile Menu:**
```jsx
{mobileMenuOpen && (
  <div className="md:hidden ...">
    {/* Nav links */}
  </div>
)}
```
- Only shows on mobile (`md:hidden`)
- Controlled by `mobileMenuOpen` state
- Hidden on desktop with media query

---

## 3. HERO SECTION (Big impressive entrance)

```jsx
<section className="min-h-screen flex items-center justify-center ...">
  {/* Background texture */}
  {/* Content */}
  {/* Floating elements */}
</section>
```

**Layout:**
- `min-h-screen` = at least full viewport height
- `flex items-center justify-center` = center everything
- `relative overflow-hidden` = container for absolute positioned elements

**Background Texture:**
```jsx
<div className="absolute inset-0 opacity-5 dark:opacity-10">
  <div style={{ backgroundImage: 'repeating-linear-gradient(...)'}} />
</div>
```
- Uses CSS gradients for a subtle noise texture
- `opacity-5` = barely visible
- Different opacity in dark mode

**Main Content:**
```jsx
<h1 className="text-5xl sm:text-7xl font-bold ...">
  Junior Engineer <br />
  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 ... bg-clip-text text-transparent">
    & Builder
  </span>
</h1>
```
- Responsive text sizing: `text-5xl` on mobile, `text-7xl` on large screens
- `bg-clip-text text-transparent` = gradient text effect
- `<br />` = line break

**Buttons with Scroll Action:**
```jsx
<button onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}>
  View my work
</button>
```
- `scrollIntoView()` smoothly scrolls to the element with `id="work"`
- `behavior: 'smooth'` = animation vs. instant jump

**Floating Elements (Dark Mode Only):**
```jsx
{isDarkMode && (
  <>
    <div className="absolute top-20 right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-float" />
    <div className="..." style={{ animationDelay: '1s' }} />
  </>
)}
```
- Only render when `isDarkMode` is true
- Positioned absolutely within the section
- `blur-3xl` = heavy blur for soft glow effect
- `bg-cyan-500/20` = cyan at 20% opacity
- `animate-float` = custom animation (defined in tailwind.config.js)
- `animationDelay: '1s'` = second element starts animation 1 second later

---

## 4. PROJECTS SECTION (Card grid)

```jsx
<section id="work" className="py-20 bg-gray-50 dark:bg-slate-900 ...">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {[...projects].map((project, idx) => (
      <div key={idx} className="group ...">
        {/* Icon header */}
        {/* Project content */}
        {/* Tags */}
        {/* Learn more link */}
      </div>
    ))}
  </div>
</section>
```

**Grid Layout:**
- `grid-cols-1` = 1 column on mobile
- `md:grid-cols-2` = 2 columns on medium+ screens
- `gap-8` = spacing between items (2rem)

**Card Component Structure:**
```jsx
<div className="group bg-white dark:bg-slate-800 rounded-xl border ... hover:shadow-lg hover:-translate-y-2">
  {/* header with icon */}
  {/* content */}
</div>
```
- `group` = enables group hover effects
- `border-gray-200 dark:border-gray-700` = subtle border, dark mode variation
- `hover:shadow-lg` = shadow on hover
- `hover:-translate-y-2` = lift up 2px on hover

**Icon Display:**
```jsx
const Icon = project.icon; // Get icon component from data
return <Icon size={48} className="..." />
```
- Dynamically renders icon based on project data
- This is advanced: treating components as data

**Tags:**
```jsx
<div className="flex flex-wrap gap-2">
  {project.tags.map((tag, i) => (
    <span key={i} className="px-3 py-1 text-xs font-mono bg-gray-100 dark:bg-slate-700 ...">
      {tag}
    </span>
  ))}
</div>
```
- Inner `.map()` for tags
- `font-mono` = monospace font (gives that "code" feel)
- `text-xs` = extra small text

---

## 5. SKILLS SECTION (Bento Grid)

```jsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-max">
  <div className="md:col-span-2 md:row-span-2 ...">
    {/* Large card - Languages */}
  </div>
  <div className="...">
    {/* Small card - Hardware */}
  </div>
  {/* etc */}
</div>
```

**Bento Grid Concepts:**
- `grid-cols-1 md:grid-cols-4` = 1 column mobile, 4 columns desktop
- `md:col-span-2` = takes up 2 columns
- `md:row-span-2` = takes up 2 rows
- `auto-rows-max` = rows size to content
- Result: Asymmetrical, visually interesting layout

**Card Styling:**
```jsx
<div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 ...">
```
- Each skill card has a unique gradient
- Languages: blue → cyan
- Hardware: amber → orange
- Tools: purple → pink
- Concepts: green → emerald

**List Rendering:**
```jsx
{['Python', 'C++', 'JavaScript', 'SQL', 'HTML/CSS'].map((lang) => (
  <div key={lang} className="flex items-center gap-3">
    <div className="w-2 h-2 bg-cyan-600 dark:bg-cyan-400 rounded-full" />
    <span className="text-gray-700 dark:text-gray-300 font-mono">{lang}</span>
  </div>
))}
```
- Inline `.map()` for simple lists
- Dot bullet point with `w-2 h-2 rounded-full`
- `font-mono` for consistency with code aesthetic

---

## 6. ABOUT SECTION (Story/Bio)

```jsx
<section id="about" className="py-20 bg-gray-50 dark:bg-slate-900 ...">
  <h2 className="text-4xl sm:text-5xl font-bold font-display ...">About Me</h2>
  <div className="space-y-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
    <p>My name is Michael, and I'm an engineer...</p>
    <p>This inspired me to take...</p>
    <p>This portfolio is the logbook...</p>
  </div>
</section>
```

**Layout:**
- `space-y-6` = vertical spacing between children (1.5rem)
- `text-lg` = larger, readable text
- `leading-relaxed` = generous line height (1.75)
- `text-gray-600 dark:text-gray-400` = readable gray with dark mode support

**Purpose:**
- This section is mostly static—no interactivity
- Demonstrates how to style long-form content
- Shows the power of Tailwind for responsive typography

---

## 7. CONTACT SECTION (CTA)

```jsx
<section id="contact" className="py-20 bg-white dark:bg-slate-950 ...">
  <h2>Let's Work Together</h2>
  <a href="mailto:michael@urquhart.cc" className="inline-flex items-center ... group">
    <Mail size={24} />
    Say Hello
    <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
  </a>
  {/* Social Links */}
</section>
```

**Main CTA Button:**
- `inline-flex` = flex but inline (doesn't take full width)
- `items-center` = vertically center icon and text
- `group` = parent for group hover effects
- `group-hover:translate-x-2` = arrow moves right on hover

**Social Links:**
```jsx
<a href="https://github.com/mich-47" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg ...">
  <Github size={24} />
</a>
```
- `target="_blank"` = opens in new tab
- `rel="noopener noreferrer"` = security best practice
- Icon-only buttons with padding (`p-3`)

---

## 8. FOOTER

```jsx
<footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-500 py-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <p>&copy; 2025 Michael Urquhart. Built with intention and code.</p>
  </div>
</footer>
```

**Simplicity:**
- Dark color (`bg-gray-900`)
- Even darker in dark mode (`dark:bg-black`)
- Centered container matching max-width of other sections
- Responsive padding with Tailwind media queries

---

## CSS Features Explained

### Tailwind Utilities Used

| Utility | Effect |
|---------|--------|
| `fixed` | Position: fixed |
| `sticky` | Position: sticky |
| `absolute` | Position: absolute |
| `grid` | Display: grid |
| `flex` | Display: flex |
| `items-center` | Align items vertically |
| `justify-center` | Align items horizontally |
| `gap-4` | Space between flex/grid items |
| `hover:shadow-lg` | Shadow on hover |
| `hover:-translate-y-2` | Move up 2px on hover |
| `transition-all` | Animate property changes |
| `duration-300` | Animation lasts 300ms |
| `dark:` | Apply styles in dark mode |
| `md:` | Apply styles on medium+ screens |

### Custom Animations

```javascript
// In tailwind.config.js
animation: {
  'float': 'float 3s ease-in-out infinite',
},
keyframes: {
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
  },
}
```

Then use: `className="animate-float"`

---

## Modify It!

**Try these changes:**

1. **Change hero gradient colors:**
   ```jsx
   from-purple-600 to-pink-600  // Instead of from-blue-600 to-cyan-600
   ```

2. **Make cards rotate on hover:**
   ```jsx
   hover:rotate-3 hover:scale-105  // Add to card className
   ```

3. **Add more sections:**
   - Duplicate a section
   - Change the `id` attribute
   - Update navbar links

4. **Add a new skill card:**
   - Add another `<div>` in skills section
   - Use a different gradient
   - Add skills

5. **Change fonts:**
   - Modify `tailwind.config.js` fontFamily
   - Use different Google Fonts
   - Update className to use new font

---

**Everything here can be modified. Break it. Fix it. Learn it.**
