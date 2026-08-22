# Vinayak Tripathi — Portfolio

A single-page portfolio built around a real-time WebGL meadow: noise-displaced
fuzzy hills, glossy candy spheres, drifting clouds and a smiling sun, all
generated procedurally at runtime. There are **no image or texture assets** in
the 3D scene — every surface is a hand-written GLSL shader.

Live sections: Home · Journey · Arsenal · Adventures · Playworld · Contact.

## Stack

| Concern      | Choice                                             |
| ------------ | -------------------------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack), React 19       |
| Language     | TypeScript (strict)                                |
| Styling      | Tailwind CSS v4 (`@theme` tokens in `globals.css`) |
| 3D           | three.js + React Three Fiber + drei                |
| Animation    | `motion` (Framer Motion successor)                 |
| Fonts        | Archivo Black + Poppins via `next/font`            |

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build
```

The page is fully static (`○ (Static) prerendered as static content`), so it
deploys to Vercel, Netlify, GitHub Pages or any static host without a server.

## Editing your content

**Everything you'd want to change lives in [`lib/data.ts`](lib/data.ts).** It is
the single source of truth for the whole page — no copy is hard-coded into
components. Update that one file and every section, the nav, the footer and the
page metadata follow.

- `profile` — name, logo, headline, role, location, tagline, links, avatar
- `profile.email` — **currently empty.** Set it to your real address and the
  "Email me" button plus the copy-to-clipboard control appear in the Contact
  section automatically. Leave it blank and they stay hidden.
- `sections`, `navLeft`, `navRight` — nav labels and ordering
- `about`, `timeline` — the Journey section
- `skillGroups` — the Arsenal section (`icon` is one of `ai | web | data | systems`)
- `projects` — the Adventures grid. `featured: true` makes a card span two
  columns and become the Showreel modal's subject. `accent` is one of
  `pink | lime | sky | violet | amber`.
- `achievements`, `stats` — the Playworld section
- `contact` — the Contact heading and lead

## Layout

```
app/
  layout.tsx      fonts, metadata, viewport
  page.tsx        section order + skip link
  globals.css     Tailwind theme tokens, utility classes, keyframes
components/
  Nav.tsx         sticky pills + mobile sheet, tracks the active section
  Hero.tsx        arched label, headline, CTAs, scroll cue
  ShowreelCard.tsx  featured-project thumbnail and its portalled dialog
  SectionRail.tsx   the dot rail on the right at lg+
  SectionShell.tsx  shared eyebrow/title/lead frame for every section
  Reveal.tsx        scroll-triggered fade-and-rise wrapper
  sections/         Journey, Arsenal, Adventures, Playworld, Contact
  hero-scene/       the WebGL meadow (see below)
hooks/
  useActiveSection.ts  IntersectionObserver, exactly one section active
lib/
  data.ts         all content
  terrain.ts      simplex noise, seeded RNG, heightAt()
```

## The 3D scene

`components/hero-scene/` renders the meadow. Each piece is its own
`ShaderMaterial`:

- **`Hills.tsx`** — a large plane displaced on the CPU by layered simplex noise,
  shaded with a lime/grass/forest ramp plus a fuzzy grass sheen and distance fog.
- **`terrain.ts`** — `heightAt(x, z)` is the single source of truth for the
  terrain surface, so props can be placed to rest exactly on the ground.
- **`CandySpheres.tsx`** — 26 spheres nestled into the meadow via `heightAt`,
  5 drifting in the sky, plus the oversized `HeroBlob` the sun sits in front of.
- **`Clouds.tsx`** — clustered puff spheres with pink undersides. Kept behind
  the sun's depth so nothing ever paints over it, and wrapped horizontally so
  they never run out.
- **`Sky.tsx`**, **`Sun.tsx`** — gradient dome and the smiling sun.
- **`HeroScene.tsx`** — the `<Canvas>`, plus `CameraRig`: damped idle drift,
  mouse parallax and a slow pull-back as the hero scrolls away. The fov and the
  sun's height both widen/lift on narrow viewports so the composition survives
  a portrait crop.

### Performance and accessibility

- `frameloop` flips to `"demand"` whenever the hero leaves the viewport, so the
  GPU idles while you read the rest of the page.
- `prefers-reduced-motion: reduce` holds the scene on a single composed frame
  and disables the CSS animations.
- A CSS gradient paints underneath the canvas, so there is never a flash of
  empty space before WebGL initialises.
- Skip link, focus-visible rings, `aria-current` on the active nav pill, focus
  moved into and restored out of the Showreel dialog, Escape and
  backdrop-click to close.

## Checks

```bash
npm run lint
```

`npm run build` type-checks as part of the build — `tsc --noEmit` on its own
will fail on `LayoutProps`, which Next generates into `.next/types` during a
build or dev run.

## Design reference

`_design-reference/` holds the frame-by-frame stills the visual direction came
from. It is not imported by any code and can be deleted before deploying.
