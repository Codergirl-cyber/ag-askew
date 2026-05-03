# Askew — Agent Handover (ANTIGRAVITY INSTANCE)
# Standalone Vite Migration from Framer

---

## ⚠️ ISOLATION RULES — READ BEFORE DOING ANYTHING

You are **Antigravity**, one of three agents running this migration simultaneously in separate folders. You must operate with complete isolation:

- Your working directory is **`Askew-Antigravity/`** — this is the ONLY folder you touch
- Your dev server runs on port **`5175`**
- You must **never** read from, write to, or reference `askew-Codex/` or `askew-Cursor/`
- All source files are in the shared read-only parent directories: `tsx-components/`, `fg-assets/`, `bg-assets/` — **copy** from these, never modify them
- If you need to install packages, `cd Askew-Antigravity` first if you are in the parent directory `Askew-Agents` — never run `npm install` from the parent directory

---

## 0. SCAFFOLD YOUR ISOLATED PROJECT

Run this exactly, in order:

```bash
mkdir Askew-Antigravity
cd Askew-Antigravity
npm create vite@latest . -- --template react-ts
npm install
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then create the following directory structure inside `src/`:

```
src/
  components/
  assets/
    fg-assets/
    bg-assets/
  App.tsx
  index.css
  main.tsx
```

Copy assets and components:
```bash
cp -r ../fg-assets/* src/assets/fg-assets/
cp -r ../bg-assets/* src/assets/bg-assets/
cp ../tsx-components/*.tsx src/components/
```

Start the dev server:
```bash
npm run dev -- --port 5175
```

---

## 1. PROJECT IDENTITY

**Site name:** Askew
**Tagline:** You already trade. Start getting paid for it.
**Product:** A cashback platform for crypto/trading platforms (Bybit, Binance, Roobet, Stake, etc.)
**Font:** Sora — load via Google Fonts in `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```
Apply globally in `index.css`:
```css
* { font-family: 'Sora', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
```

---

## 2. SITE BACKGROUND

The entire page background is a **vertical linear gradient**:
```css
background: linear-gradient(180deg, #008CFF 0%, #9AC1F4 100%);
min-height: 100vh;
```

Apply this to the `<body>` or the root `<div>` in `App.tsx`. All section components sit on top of this gradient — do not give individual sections opaque white or dark backgrounds unless specified below. Sections should feel like they float within the gradient.

At **3 evenly spaced vertical intervals** on the page, place a cloud image from `bg-assets/` as a full-width backdrop layer (`position: absolute`, `z-index: 0`, `opacity: 0.18`, `width: 100%`, `object-fit: cover`). Stagger different cloud images so they don't repeat consecutively. These clouds scroll with the page (not fixed) and serve as subtle atmospheric texture.

---

## 3. COMPONENT FILES — FRAMER REMOVAL INSTRUCTIONS

All files in `tsx-components/` were built as **Framer code components**. They contain Framer-specific patterns that must be stripped and replaced. For **every component file**, do the following:

### 3a. Remove all Framer imports
Delete any line that imports from `"framer"` or `"framer-motion"` **except** in `MarqueeRail.tsx` where `framer-motion` is intentionally used and must be kept.

```ts
// DELETE lines like these (except in MarqueeRail):
import { motion, animate } from "framer-motion"
import type { ComponentType } from "framer"
import { addPropertyControls, ControlType } from "framer"
```

### 3b. Remove Framer property controls
Delete all `addPropertyControls(...)` blocks entirely. Props should be typed with a standard TypeScript interface or driven from the `CONFIG` object.

### 3c. Remove font injection useEffects
Each component uses a `useEffect` that injects a `<link>` tag for Sora. Since Sora is now loaded globally in `index.html`, remove these blocks from every component.

### 3d. Fix exports
Ensure every component has a clean `export default function ComponentName()` with no Framer wrapper HOCs.

### 3e. Asset imports
Replace any hardcoded CDN or Framer asset URLs with proper Vite static imports:
```ts
import heroImage from "../assets/fg-assets/hero-dashboard.png"
```

---

## 4. COMPONENT INVENTORY & SECTION ORDER

Wire `App.tsx` to render sections in this exact vertical order:

| Order | Component File | Section Role |
|-------|---------------|--------------|
| 1 | `NavbarScroll.tsx` | Fixed top navbar |
| 2 | `ShimmerHeroText.tsx` | Hero section |
| 3 | `MarqueeRail.tsx` | Platform ticker |
| 4 | `ClearView.tsx` | How It Works |
| 5 | `Step_01.tsx` | Step 1 — Sign Up |
| 6 | `Step_02.tsx` | Step 2 — Connect Platforms |
| 7 | `Step_03.tsx` | Step 3 — Cashback |
| 8 | `SignOff.tsx` | Dashboard showcase |
| 9 | `BulletMarker.tsx` | Decorative divider |
| 10 | `Footer.tsx` | Get Started + nav links |

Section IDs:
```tsx
<section id="hero-section">   {/* ShimmerHeroText */}
<section id="how-it-works">   {/* ClearView */}
<section id="dashboard">      {/* SignOff */}
<section id="get-started">    {/* Footer */}
```

---

## 5. NAVBAR

`NavbarScroll.tsx` was a Framer code override — rebuild as a proper fixed React component:

```
- Position: fixed, top 0, full width, z-index 100
- Default: fully transparent background
- On scroll > 10px: background rgba(0,0,0,0.15), backdropFilter blur(12px)
- Transition: 0.3s ease
- No border, no box-shadow
- Links: Home, How It Works, Dashboard, Get Started
- onClick: scrollIntoView({ behavior: 'smooth', block: 'start' })
  IDs: hero-section, how-it-works, dashboard, get-started
- Right side: "Get Started" CTA pill button (dark bg, white text)
- Font: Sora 500, text white always
```

---

## 6. FOOTER SCROLL LINKS

`Footer.tsx` already has `scrollToSection(id)` wired up. Confirm IDs:

```ts
{ label: "Home",         id: "hero-section" }
{ label: "How It Works", id: "how-it-works" }
{ label: "Dashboard",    id: "dashboard" }
{ label: "Get Started",  id: "get-started" }
{ label: "Privacy Policy",   id: "" }  // shell — no-ops
{ label: "Terms of Service", id: "" }  // shell — no-ops
```

---

## 7. ANIMATIONS — PREMIUM FEEL REQUIREMENTS

### 7a. Scroll reveal
`IntersectionObserver` at `threshold: 0.25`, fires once then disconnects. Stagger children 80–100ms each.

### 7b. Fade + lift entrance
```
opacity: 0 → 1
transform: translateY(28px) → translateY(0)
duration: 600–700ms
easing: cubic-bezier(0.16, 1, 0.3, 1)
```

### 7c. Count-up numbers
Ease-out cubic over 3000ms: `const eased = 1 - Math.pow(1 - progress, 3)`
Trigger on scroll entry via IntersectionObserver.

### 7d. Floating cards
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```
Use durations 4.5s, 5s, 5.8s on nested elements.

### 7e. Shimmer text
Already in `ShimmerHeroText.tsx` via `background-clip: text`. Preserve exactly — 6s total, 3s sweep + 3s hold. Do not replace.

### 7f. Marquee
Keep `framer-motion` in `MarqueeRail.tsx` only.

### 7g. Progress bars
Animate width 0 → final over 1200ms on scroll entry, ease-out.

### 7h. Hover micro-interactions
- Buttons: `scale(1.03)` on hover
- Nav links: `translateX(3px)` on hover
- Cards: `translateY(-3px)` + deeper shadow on hover
- All: `transition: transform 0.2s ease, box-shadow 0.2s ease`

### 7i. Live indicators
Pulse via CSS keyframes: `opacity 1 → 0.2 → 1` over 2s infinite.

---

## 8. GLOBAL CONVENTIONS — DO NOT DEVIATE

- All tweakable values in a `CONFIG` object at top of each file
- No Framer Motion except `MarqueeRail.tsx`
- Count-up duration: **3000ms** everywhere
- IntersectionObserver threshold: **0.25**, fires once, then `obs.disconnect()`
- Ease-out cubic: `1 - Math.pow(1 - p, 3)`
- SVG filters: `filterUnits="userSpaceOnUse"` with explicit pixel bounds — never percentage-based
- CSS `transform` and SVG `transform` attribute must **never coexist on the same element** — use nested `<g>` elements to separate position from animation
- Card shadows: `<feDropShadow>` on the `<rect>` only — never CSS `drop-shadow()` on a `<g>`

---

## 9. ASSET USAGE

**`fg-assets/`** — foreground UI assets (step cards, hero dashboard image). Import via Vite static imports.

**`bg-assets/`** — cloud PNGs. Place at 25%, 55%, 80% vertical positions. `position: absolute`, `opacity: 0.18`, `z-index: 0`, `pointer-events: none`. Wrap sections in `position: relative`, `z-index: 1`.

---

## 10. VISUAL REFERENCE

Accompanied by screenshot images from the live Framer render. Use as visual ground truth for spacing, typography hierarchy, card layouts, and color relationships. When output diverges from a screenshot, match the screenshot in the folder `framer-inspo`

---

## 11. SANITY CHECK BEFORE FINISHING

- [ ] `npm run dev -- --port 5175` runs with zero console errors
- [ ] All 10 components render in correct order
- [ ] Navbar transparent on load, darkens on scroll
- [ ] All scroll links work (navbar + footer)
- [ ] Count-up triggers on scroll, not page load
- [ ] No Framer imports remain except `MarqueeRail.tsx`
- [ ] Cloud backgrounds at intervals, not covering text
- [ ] Vertical gradient runs full page length
- [ ] All hover states respond
- [ ] No rectangular filter artifacts on SVG glow effects
- [ ] Floating card animations use nested `<g>` for position vs animation
- [ ] Only files inside `Askew-Antigravity/` were modified

---

*Antigravity instance — operates exclusively in `Askew-Antigravity/` on port 5175.*
