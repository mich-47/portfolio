# Portfolio Refactor Guide: From Vibe-Coded to Intentional

## What We Did

You asked to strip out all the AI-generated "vibe-coded" stuff and rebuild from the ground up. Here's what changed:

### Removed (The "Vibe")
- **Tailwind CSS CDN**: No utility classes. You control styling via CSS rules.
- **Alpine.js**: Replaced with vanilla JavaScript. No reactive framework magic.
- **Inline styles**: All styling moved to `styles.css`.
- **Decorative HTML classes**: Removed `x-data`, `x-show`, `:class` bindings—they're cryptic without understanding the library.

### Added (The Learning)
- **Semantic HTML**: Clean, readable structure. No framework attributes polluting your markup.
- **Intentional CSS**: Every CSS rule has a purpose. Color system via CSS variables. Responsive design explained with comments.
- **Vanilla JavaScript**: 70 lines of pure JS. You understand every line. No framework abstraction.
- **Documentation**: Each file has comments explaining design decisions and how to modify.

---

## File Breakdown

### `index.html` (Clean Structure)
- Only semantic HTML: header, nav, main, sections, footer, article elements for projects.
- No frameworks, no inline styles.
- Linked to `styles.css` and `script.js`.
- **For you**: Read it top-to-bottom. It's the structure of your site.

### `styles.css` (Design System)
Organized in sections:
1. **CSS Variables**: Color palette, spacing system defined once at `:root`.
2. **Typography**: h1-h6, p, a, lists defined in one place.
3. **Layout**: Main containers, section padding.
4. **Components**: Header, nav, buttons, cards, skills grid, etc.
5. **Responsive**: Mobile-first breakpoints at the bottom.

**Why this structure?**
- Change a color? Edit `:root` and it updates everywhere.
- Adjust spacing? One variable, not 50 individual rules.
- Add a new breakpoint? Add one `@media` query.

**For you**: Open `styles.css`. Try changing a color variable. Watch the whole site update. That's the power of intentional CSS.

### `script.js` (Vanilla JavaScript)
Three main functions:

#### 1. `setupProjectFiltering()`
- Listens for clicks on `.filter-btn` buttons.
- Reads the `data-filter` attribute.
- Shows/hides `.project-card` elements based on their `data-category`.
- Updates which button is `.active`.

**How it works:**
```javascript
// Get the filter value from the button (e.g., "all", "swe", "electronics")
const filterValue = btn.getAttribute('data-filter');

// Show cards that match the filter or show all
if (filterValue === 'all' || cardCategory === filterValue) {
  card.style.display = 'block';
}
```

**For you**: Click a filter button. Open DevTools. Watch the cards show/hide. Try adding a new filter.

#### 2. `setupFadeInAnimation()`
- Uses **Intersection Observer** (native browser API).
- When a `.project-card` scrolls into view, it gets the `.visible` class.
- CSS transitions the opacity (no JS animation).

**Why Intersection Observer?**
- Native browser API—no library needed.
- Efficient: doesn't run on every scroll frame.
- You learn how the browser detects when elements enter the viewport.

**For you**: Scroll down to the projects section. Watch them fade in. Change the `threshold` value in `setupFadeInAnimation()` to trigger earlier/later.

#### 3. `setupKeyboardNavigation()`
- Adds visible focus indicators on all buttons and links.
- Ensures keyboard-only users can navigate your site.
- Essential for accessibility (a11y).

**For you**: Press Tab to navigate. See the blue outline appear on each element. That's accessibility in action.

---

## Learning Assignments

### Easy (30 mins)
1. **Change a color**: Open `styles.css`, find `:root`, change `--accent-blue: #58a6ff` to a new hex color. Reload the page.
2. **Adjust spacing**: Find `--spacing-lg: 2rem;` and change it to `3rem`. Watch all large gaps resize.
3. **Add a console message**: In `script.js`, add `console.log('A project was filtered');` inside the filter button click handler. Open DevTools Console and click a filter button.

### Medium (1 hour)
1. **Add a new color variable**: Create `--accent-pink: #ff0080;` in `:root`. Use it on hover for project cards.
2. **Create a new breakpoint**: Add a `@media (min-width: 1500px)` query in `styles.css` that makes the projects grid 4 columns wide on ultra-wide screens.
3. **Modify the fade-in**: Change `threshold: 0.1` to `0.5` in `setupFadeInAnimation()`. Now cards only fade in when 50% visible.

### Hard (2 hours)
1. **Add a dark mode toggle**: Create a button that toggles `data-theme="dark"` on the `<html>` element. Use CSS to apply different colors based on it. (Hint: `html[data-theme="dark"] { --bg-dark: #000; }`)
2. **Add a smooth scroll polyfill**: Right now smooth scrolling is handled by `scroll-behavior: smooth` in CSS. Try disabling it and implementing it in JavaScript using `window.scrollTo({ top, behavior: 'smooth' })`.
3. **Build a project detail page**: Create `project-detail.html`. Add a link from each project card to its detail page. Build out full case study content.

---

## How to Continue Learning

### Mindset
- **Don't memorize**. Understand. Read the code, run it, modify it, break it, fix it.
- **Console is your friend**. Use `console.log()` and `console.table()` to inspect what's happening.
- **DevTools are powerful**. Press F12. Inspect elements. Change CSS live. Debug JavaScript.

### Next Steps
1. **Build something with this structure**: A different project, a new site, a tool. Use this template.
2. **Learn one thing deeply**: Pick a feature (e.g., Intersection Observer, CSS Grid) and build something with it.
3. **Read other people's code**: Find open-source projects. Read how they organize CSS, HTML, JS.
4. **Ship it**: Deploy this site to GitHub Pages or Netlify. See it live. Share it.

---

## File Checklist

- [ ] Read `index.html` top-to-bottom.
- [ ] Open `styles.css` and understand the structure (variables, typography, layout, components, responsive).
- [ ] Read `script.js` line-by-line. Understand what each function does.
- [ ] Open DevTools (F12). Inspect an element. Change some CSS. See the change live.
- [ ] Click a filter button. Watch projects filter. Open console. See what's logged.
- [ ] Press Tab. See focus indicators. Navigate the site with keyboard only.
- [ ] Resize the browser window. Watch the responsive layout adapt.

---

## Questions to Ask Yourself

- **HTML**: What does `data-category="electronics"` do? Why not just use a class?
- **CSS**: Why use CSS variables instead of hardcoding colors? What breaks if I need to support a new color?
- **JavaScript**: What happens if I remove `setupKeyboardNavigation()`? Why is that a problem?
- **Responsive**: Why mobile-first? What's the advantage of designing for small screens first?

---

## No More Vibe Coding

You now have:
- ✅ Code you understand line-by-line.
- ✅ No "magic" framework abstraction.
- ✅ Intentional design decisions documented in comments.
- ✅ A foundation to build and learn from.

Go build something. Break things. Learn.
