# Children's Park Kurnool

A premium, cinematic landing page for Children's Park in Kurnool, India — a single-page marketing site with SaaS-level polish (Apple / Stripe / Linear / Framer-inspired), built to showcase the park's attractions, ticket pricing, and family-friendly experience.

**Tagline:** *Where Every Smile Becomes An Adventure*

## Tech Stack

- **[Next.js 15](https://nextjs.org/)** — App Router, dynamic imports for below-the-fold sections
- **TypeScript** — strict typing across components, hooks, and content
- **Tailwind CSS 3** — utility-first styling with a custom design-token theme (see [Design System](#design-system))
- **Framer Motion** — in-view reveals, stagger choreography, magnetic buttons
- **GSAP + ScrollTrigger** — cinematic scroll effects (pinned horizontal timeline, scroll-scrubbed rail fill/progress dot)
- **React Three Fiber + drei + three.js** — the Hero's animated Ferris wheel scene and CTA particle field
- **Lenis** — buttery smooth scrolling
- **Embla Carousel (+ Autoplay plugin)** — testimonials slider
- **Radix UI** (`react-dialog`, `react-slot`) + **class-variance-authority** — accessible, variant-driven primitives (button, etc.)
- **Lucide React** — icon set
- **next/font** — self-hosted Google Fonts (Inter, Fraunces, JetBrains Mono)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm start       # run the production build
npm run lint    # run eslint
```

## Project Structure

```
app/
  layout.tsx          # Root layout — fonts, metadata, Loader, ParticleField, SmoothScroll wrapper
  page.tsx             # Landing page — composes every section in order
  globals.css          # CSS variables, base styles, utility classes (glass, code-chip, paper-grid, ...)

components/
  Navbar.tsx           # Fixed nav — transparent over Hero, blurred/opaque once scrolled
  Hero.tsx              # Full-viewport hero with the animated Ferris wheel (R3F) + headline reveal
  Stats.tsx             # Animated counters (attractions, families served, rating, days open)
  About.tsx              # Split layout about section
  Attractions.tsx        # Attraction cards grid
  Experience.tsx          # Featured experience showcase
  InteractiveMap.tsx      # Clickable park map with an animated train following an SVG track
  Timeline.tsx             # GSAP-pinned horizontal "adventure timeline" with scroll-scrubbed rail
  Gallery.tsx               # Masonry-style photo gallery with hover reveal captions
  OutdoorGym.tsx             # Outdoor fitness zone section
  Yoga.tsx                    # Yoga zone with a glowing circle illustration
  Testimonials.tsx             # Auto-sliding review carousel (Embla)
  Pricing.tsx                   # Ticket pricing tiers
  CTA.tsx                        # Full-screen call-to-action with particle backdrop
  Footer.tsx                      # Site footer — links, contact, socials

  SectionHeading.tsx      # Shared eyebrow + heading pattern used at the top of every section
  CornerFrame.tsx          # Decorative corner-bracket accent (light/dark tone variants)
  MagneticButton.tsx        # Cursor-following button wrapper (wraps the Shadcn-style Button)
  CursorGlow.tsx              # Custom cursor glow that follows the pointer
  ScrollProgress.tsx           # Top-of-page scroll progress bar
  SmoothScroll.tsx               # Lenis smooth-scroll provider
  Loader.tsx                      # Full-screen intro loader/splash
  ParticleField.tsx                 # Ambient background particles (CSS-driven, site-wide)
  ParticleScene.tsx                  # React Three Fiber particle canvas (used in CTA)
  FerrisWheelScene.tsx                 # React Three Fiber Ferris wheel scene (used in Hero)
  SceneIllustration.tsx                 # Hand-drawn SVG illustrations (Gallery placeholders)
  ui/button.tsx                          # cva-driven Button primitive (default/outline/ghost/glass variants)

hooks/
  useGSAP.ts             # gsap.context() wrapper scoped to a ref, registers ScrollTrigger
  useParallax.ts          # Scroll-linked translateX/Y parallax hook
  useMagnetic.ts            # Magnetic cursor-follow effect for buttons/links

lib/
  animations.ts           # Shared Framer Motion variants (fadeUp, staggerContainer, cardHover, ...)
  constants.ts              # All site content — nav links, stats, attractions, map locations, timeline
                             #   steps, gallery images, testimonials, pricing tiers, footer links
  utils.ts                   # `cn()` class-merging helper (clsx + tailwind-merge)
```

## Design System

### Color palette

The palette is a **premium green + white "nature park"** theme — bright, airy, and family-friendly by default, with a deep "ink"/forest counterpart tokenized for any section (CTA, hero-style panels, overlays) that wants a moody, high-contrast treatment. Every token lives in `tailwind.config.ts` under `theme.extend.colors` and is consumed as `bg-*` / `text-*` / `border-*` utilities. Nothing outside this token layer should hardcode brand color — the 3D scenes, SVG map/illustrations, and loader all pull their literal hex values from this same palette so a future rebrand only touches this table.

| Token | Value | Usage |
|---|---|---|
| `background` | `#F7FCF8` | Page base background |
| `background-secondary` | `#ECF7EF` | Alternate section background (visual rhythm between sections) |
| `card` | `#FFFFFF` | Card surfaces |
| `border` | `rgba(18,53,36,0.10)` | Hairline borders on light surfaces |
| `foreground` | `#123524` | Primary text on light surfaces |
| `muted` | `#607568` | Secondary/body text on light surfaces |
| `ink` (DEFAULT/secondary/card) | `#063B22` / `#07502E` / `#0B4A2A` | Dark "forest" section backgrounds & card surfaces |
| `ink-foreground` | `#F5FFF8` | Primary text on dark surfaces |
| `ink-muted` | `#B8D4C1` | Secondary text on dark surfaces |
| `ink-border` | `rgba(245,255,248,0.12)` | Hairline borders on dark surfaces |
| `accent` (DEFAULT/secondary/soft) | `#168A4A` / `#0F6B38` / `#DDF4E5` | Primary brand green — CTAs, links, highlights |
| `clay` (DEFAULT/secondary) | `#6FA83C` / `#4C8C2C` | Secondary accent, olive-green variety (icon rings, timeline steps) |
| `sage` (DEFAULT/secondary) | `#2F7A52` / `#1F5A38` | Secondary accent, forest-sage variety (map gradient, timeline steps) |
| `cloud` (DEFAULT/secondary) | `#1E8F6F` / `#14684F` | Secondary accent, teal-green variety (timeline steps) |
| `lime` | `#B8E85B` | Playful highlight (badges, small decorative accents) |
| `mint` | `#CFF7DC` | Soft decorative accent / glow tint |

**Rule of thumb:** on a light section use `foreground` / `muted` / `border`; on a dark ("ink"/forest) section use their `ink-*` counterparts. `accent` is the only color that should read identically on both. `clay`/`sage`/`cloud` exist purely for variety (e.g. Timeline's four step colors) — they're all greens at different hues/lightness, never a competing brand color.

### Typography

| Role | Font | CSS variable | Tailwind class |
|---|---|---|---|
| Headings / display | **Fraunces** (serif, variable axes: opsz, SOFT, WONK) | `--font-fraunces` | `font-heading` / `font-display` |
| Body | **Inter** | `--font-inter` | `font-body` (applied globally via `body`) |
| Mono (labels, eyebrows, chips, numbers) | **JetBrains Mono** | `--font-mono` | `font-mono` |

Headings lean large and editorial (`text-4xl` → `text-7xl/8xl` on hero copy), frequently paired with an italic accent word rendered via the `.text-gradient` utility (a deep-to-bright green gradient clipped to text). Eyebrow labels above headings are always `font-mono`, uppercase, wide-tracked (`tracking-[0.25em]`).

### Spacing & section rhythm

Every section follows the same vertical rhythm so scroll pacing feels consistent:

```
py-24 md:py-32 lg:py-40      /* section padding */
max-w-7xl mx-auto px-6 lg:px-8  /* content container */
```

`SectionHeading` is the shared entry point for every section's title block (`subtitle` eyebrow → `title`, with `align` and `tone` (`light`/`dark`) props), so heading style never has to be re-implemented per section.

### Shadows & glow

| Token | Value | Use |
|---|---|---|
| `shadow-glow` | `0 0 40px rgba(22,138,74,.18)` | Accent-colored glow on hover/active states |
| `shadow-glow-lg` | `0 0 80px rgba(22,138,74,.24)` | Larger glow (feature cards, primary buttons) |
| `shadow-card` | `0 4px 18px rgba(18,53,36,.06)` | Resting card elevation |
| `shadow-card-lg` | `0 20px 60px rgba(18,53,36,.10)` | Raised/hovered card elevation |
| `shadow-ink-glow` | `0 0 60px rgba(36,169,94,.22)` | Glow for accent elements on dark surfaces |

Cards should feel soft and elevated rather than heavy — favor the glow shadows over harsh dark ones.

### Gradients & texture

- `bg-gradient-accent` — the brand's signature green gradient (`#168A4A → #24A95E → #8BDFA7`), used for buttons and feature accents
- `bg-gradient-sunset` — the deep-to-bright green sweep (`#07552C → #168A4A → #45C878`) that powers `.text-gradient` headline words
- `bg-gradient-glow` — soft radial green glow used behind hero/CTA content
- `bg-gradient-ink` — the dark-section background gradient (radial green glows over the `#063B22` forest base)
- `.paper-grid` — a faint 36px grid overlay for texture on section backgrounds, tinted to `foreground` at low opacity
- `.noise-overlay` — an SVG fractal-noise grain layer (kept subtle — low overlay opacity, low internal turbulence opacity) for a clean-but-not-flat surface
- `.glass` / `.glass-light` — frosted-glass utility classes (dark/light variants) for nav pills, badges, and overlays

The overall texture intent shifted away from the old "printed paper" look toward something cleaner and more digital — grid lines and grain are present but faint, never competing with the green/white surfaces.

### Motion system

All entrance animation goes through a small shared vocabulary rather than ad-hoc transitions:

- **Framer Motion variants** (`lib/animations.ts`): `fadeUp`, `fadeIn`, `scaleUp`, `slideInLeft/Right`, `staggerContainer`, `staggerFast`, `letterReveal`, `cardHover` — all keyed to the same signature ease curve, `[0.25, 0.4, 0.25, 1]`, so every reveal feels like part of one system.
- **GSAP + ScrollTrigger** (`hooks/useGSAP.ts`) is reserved for scroll-driven, physically-scrubbed effects that Framer's `whileInView` can't express cleanly: the Hero headline mask-reveal, the Timeline's pinned horizontal scroll + progress rail/dot, and the InteractiveMap's train animating along an SVG path.
- **Tailwind keyframe utilities** (`tailwind.config.ts`): `animate-float`, `animate-pulse-glow`, `animate-gradient-shift`, `animate-spin-slow(-reverse)`, `animate-ferris-spin(-reverse)`, `animate-blink` — small looping details (floating illustrations, pulsing dots, the Ferris wheel's counter-rotating gondolas, the loader's blinking caret).
- Interactive elements (buttons, links, map pins) get a magnetic cursor-follow effect via `MagneticButton` / `useMagnetic`, plus a custom `CursorGlow` that trails the pointer site-wide.
- `prefers-reduced-motion: reduce` is respected globally — all animations/transitions collapse to near-instant.

### Component conventions

- **Buttons** (`components/ui/button.tsx`, `cva`-driven): `default` (solid accent), `outline`, `ghost`, `glass` variants × `sm`/`default`/`lg`/`icon` sizes. Always wrapped in `MagneticButton` for the cursor-follow interaction.
- **Cards**: `rounded-2xl`/`rounded-3xl`, `border border-border`, `bg-card`, hover state lifts (`-translate-y-1/2`) and swaps to `shadow-card-lg` or `shadow-glow-lg`.
- **Chips/eyebrows**: `.code-chip` utility — mono, uppercase, pill-shaped, bordered — used for step counters, labels, and badges throughout.
- **Corner brackets**: `CornerFrame` draws four small accent-colored corner brackets over a card/panel for a technical, blueprint-like accent (used in Gallery hovers, CTA, InteractiveMap).

## Performance

- Every below-the-fold section is code-split via `next/dynamic` in `app/page.tsx`
- Three.js scenes render on transparent canvases and are dynamically imported with `ssr: false`
- Fonts are self-hosted and subset via `next/font`
- `prefers-reduced-motion` support throughout for accessibility

## License

Private project for Children's Park Kurnool.
