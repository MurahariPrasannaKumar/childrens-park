# Children's Park Kurnool

A premium, cinematic landing page for Children's Park in Kurnool, India — designed with SaaS-level aesthetics inspired by Apple, Stripe, Linear, and Framer.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — UI animations
- **GSAP + ScrollTrigger** — cinematic scroll effects
- **React Three Fiber** — particle backgrounds
- **Lenis** — smooth scrolling
- **Embla Carousel** — testimonials slider
- **Lucide React** — icons
- **Shadcn UI** — button primitives

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  layout.tsx       # Root layout with fonts & smooth scroll
  page.tsx         # Main landing page
  globals.css      # Global styles & utilities
components/
  Navbar.tsx       # Sticky glassmorphism navigation
  Hero.tsx         # Full-viewport hero with Three.js particles
  Stats.tsx        # Animated counters
  About.tsx        # Split layout about section
  Attractions.tsx  # Premium attraction cards
  Experience.tsx   # Featured experience showcase
  InteractiveMap.tsx # Clickable park map
  Timeline.tsx     # GSAP horizontal scroll timeline
  Gallery.tsx      # Masonry photo gallery
  OutdoorGym.tsx   # Outdoor fitness section
  Yoga.tsx         # Yoga zone with glowing circle
  Testimonials.tsx # Auto-sliding reviews
  Pricing.tsx      # Ticket pricing cards
  CTA.tsx          # Full-screen call to action
  Footer.tsx       # Minimal footer
hooks/
  useGSAP.ts       # GSAP + ScrollTrigger hook
  useParallax.ts   # Parallax scroll hook
  useMagnetic.ts   # Magnetic button effect
lib/
  animations.ts    # Framer Motion variants
  constants.ts     # Content & data
  utils.ts         # Utility functions
```

## Design

- **Background:** `#050505`
- **Accent:** `#FFD400` (used sparingly)
- **Typography:** Space Grotesk (headings), Inter (body), Bebas Neue (numbers)
- **Style:** Dark luxury, glassmorphism, gradient borders, cinematic animations

## Performance

- Lazy-loaded sections via dynamic imports
- Optimized images with `next/image`
- Lightweight Three.js particle scenes
- Reduced motion support for accessibility

## License

Private project for Children's Park Kurnool.
