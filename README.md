Portfolio — Michael Urquhart
===========================

This repository hosts a small multi-page portfolio and project collection for Michael Urquhart.

Quick preview
-------------
To preview locally (any OS with Python):

```powershell
# from repository root
python -m http.server 8000
# then open http://localhost:8000/dev.html
```

Quick wins applied
-----------------
- Added Open Graph and Twitter meta tags to `dev.html` for better link previews.
- Added an accessible "Skip to main content" link for keyboard users.
- Improved hero copy and primary CTA in `dev.html` to be recruiter-focused.
- Added a `resume.html` placeholder and header Resume link; place `resume.pdf` in the repo root to enable downloads.
- Made external links use `rel="noopener noreferrer"` for security.

Recommended next steps
----------------------
- Convert project cards to a data-driven `data/projects.json` and render at runtime.
- Create per-project case study pages or modal templates and add screenshots / GIFs.
- Set up a Tailwind build process and GitHub Actions for Lighthouse and accessibility checks.

If you want, I can implement the JSON-driven projects and case-study modal next.

