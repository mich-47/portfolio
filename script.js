/**
 * Portfolio Script
 * 
 * Pure JavaScript—no frameworks. Every feature is intentional and readable.
 * Learn how each function works:
 * 
 * 1. Project Filtering
 * 2. Intersection Observer (fade-in animation)
 * 3. Smooth Scroll (handled by CSS, HTML)
 * 4. Focus Management (keyboard navigation)
 */

// ===== PROJECT FILTERING =====

/**
 * Set up project filtering on button click.
 * When a filter button is clicked, show/hide project cards
 * based on the data-category attribute.
 */
function setupProjectFiltering() {
  // Get all filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      // Update active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide project cards
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        // Show card if it matches the filter, or if "all" is selected
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'block';
          // Trigger fade-in animation
          setTimeout(() => card.classList.add('visible'), 10);
        } else {
          card.style.display = 'none';
          card.classList.remove('visible');
        }
      });
    });
  });
}

// ===== FADE-IN ANIMATION (Intersection Observer) =====

/**
 * Fade in elements when they scroll into view.
 * This is a native API (no library needed).
 * 
 * How it works:
 * - When an element enters the viewport, add a "visible" class
 * - CSS handles the opacity transition
 */
function setupFadeInAnimation() {
  // Only animate project cards
  const elementsToObserve = document.querySelectorAll('.project-card');

  // Intersection Observer configuration
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Start animation before fully in view
  };

  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class when element enters viewport
        entry.target.classList.add('visible');
        // Stop observing once visible (optional, for performance)
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe each element
  elementsToObserve.forEach(element => {
    observer.observe(element);
  });
}

/**
 * CSS for fade-in is in styles.css:
 * 
 * .project-card {
 *   opacity: 0;
 *   transition: opacity 0.5s ease;
 * }
 * 
 * .project-card.visible {
 *   opacity: 1;
 * }
 */

// ===== KEYBOARD NAVIGATION =====

/**
 * Improve keyboard navigation by ensuring all interactive elements
 * are properly focusable and have visible focus indicators.
 * 
 * This ensures accessibility for keyboard-only users.
 */
function setupKeyboardNavigation() {
  // Get all interactive elements
  const interactiveElements = document.querySelectorAll('a, button');

  interactiveElements.forEach(element => {
    // Ensure buttons have type attribute
    if (element.tagName === 'BUTTON' && !element.hasAttribute('type')) {
      element.setAttribute('type', 'button');
    }

    // Add visible focus indicator
    element.addEventListener('focus', () => {
      element.style.outline = `2px solid var(--accent-blue)`;
      element.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', () => {
      element.style.outline = 'none';
    });
  });
}

// ===== INITIALIZE ALL FEATURES =====

/**
 * Run all setup functions when the DOM is ready.
 * This is the "entry point" of the script.
 */
document.addEventListener('DOMContentLoaded', () => {
  setupProjectFiltering();
  setupFadeInAnimation();
  setupKeyboardNavigation();

  console.log('Portfolio script initialized');
});

// ===== NOTES FOR LEARNING =====

/**
 * Why vanilla JS?
 * - You learn how the browser actually works
 * - No magic or framework abstractions
 * - Better performance (no framework overhead)
 * - You own every line of code
 * 
 * Try modifying these functions:
 * 1. Change the fade-in threshold in setupFadeInAnimation()
 * 2. Add a console.log in each filter click to see the filter value
 * 3. Add a new interactive feature (e.g., dark mode toggle)
 * 
 * Debugging tips:
 * - Open Chrome DevTools (F12)
 * - Use console.log() to inspect values
 * - Use the debugger: statement to pause execution
 * - Inspect elements and check applied CSS
 */