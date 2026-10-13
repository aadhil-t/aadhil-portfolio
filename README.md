# Aadhil T. — Interactive Frontend Developer Portfolio

A premium dark editorial portfolio starter built with React, Vite, TypeScript, SCSS, GSAP, and Three.js.

## Requirements

- Node.js 20+ recommended
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed in your terminal (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Personalize before publishing

1. Update the email, LinkedIn, and GitHub values near the top of `src/App.tsx`.
2. Edit project descriptions and technology tags in `src/data/projects.ts`.
3. Replace the concept-preview artwork in the Projects section with real screenshots from your work.
4. Add your resume at `public/assets/resume/aadhil-resume.pdf`.
5. Update the experience section in `src/App.tsx` with verified employment information.
6. Add a favicon and update metadata in `index.html`.
7. Verify that every live project URL and social link is correct.

## 3D character

The hero uses procedural Three.js geometry, so the 3D viewer works without a downloaded model. Drag horizontally on the character to rotate it. On touchscreens, drag directly on the character area. The component is in `src/components/Character3D.tsx`.

To use a custom GLB/GLTF character later, load it in that component using `GLTFLoader` and replace the procedural character group. Preserve the existing pointer interaction and cleanup logic.

## Notes

- Project previews are clearly labelled concept placeholders, not screenshots of completed client websites.
- No contact form backend is included. Contact uses a mailto link.
- Personal contact information, project URLs, resume, and employment history must be verified and updated before publishing.
- Run `npm run build` before deployment.
