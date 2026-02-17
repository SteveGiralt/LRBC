# Lone Rock Bible Church — Visual Redesign Plan

## Current State Audit

### Tech Stack
- **Framework**: Astro 5.x + React (interactive islands)
- **Styling**: Tailwind CSS 4.x
- **UI Library**: Flowbite (used only for dropdown toggles — heavy for the value)
- **Fonts**: Oswald + Source Serif 4 (via Google Fonts CSS @import — render-blocking)
- **Icons**: Font Awesome (3 packages for ~3 icons)
- **Deployment**: Vercel SSR
- **Other deps**: axios (for simple fetches), moment.js (unused)

### Pages to Redesign (10 pages)
| Page | Route | Current State |
|------|-------|---------------|
| Home | `/` | Text hero, 3 circular-image content cards, event/streaming grid, RMBM banner |
| Visit | `/visit` | ImageHeader + Q&A cards |
| Contact | `/contact` | ImageHeader + basic form |
| Youth | `/youth` | ImageHeader + info cards + event calendar |
| Beliefs | `/about/beliefs` | ImageHeader + doctrine cards |
| Pastors | `/about/pastors` | ImageHeader + pastor photo cards |
| Missions | `/about/missions` | ImageHeader + mission cards (domestic/international) |
| Constitution & Bylaws | `/about/constitution-and-bylaws` | Landing with links to sub-pages |
| Constitution | `/about/constitution` | Document content |
| Bylaws | `/about/bylaws` | Document content |
| 404 | N/A | Minimal text-only error page |

**Skipping**: `/events/vbs`, `/kids-club` (not linked, not in use)

---

## Design Problems Identified

### Visual / Aesthetic
1. **Generic, template-like look** — indistinguishable from any default Tailwind site
2. **No hero imagery on homepage** — just centered text, no visual impact above the fold
3. **Circular cropped images** in ContentCards — awkward for landscape photos, wastes visual real estate
4. **Flat, single-color palette** — only `lrbc-red` (#A02040) + neutral gray background
5. **ImageHeader is underwhelming** — fixed 256px, simple black overlay, no depth
6. **No animations, transitions, or scroll effects** — completely static feel
7. **Footer is plain** — basic 3-column grid, no visual hierarchy
8. **Navbar feels utilitarian** — red bar with basic links, no polish

### Typography
9. **Oswald + Source Serif 4** — functional but generic, no character
10. **Font loading via CSS @import** — render-blocking, causes FOUT

### Technical / Performance
11. **Flowbite** dependency loads JS bundle for one dropdown — replace with vanilla CSS/JS
12. **Axios** dependency for simple GET requests — native `fetch` is sufficient
13. **moment.js** in package.json but unused — dead weight
14. **`dangerouslySetInnerHTML`** in EventCard.tsx — XSS risk
15. **No Astro View Transitions** — full page reloads on every navigation
16. **EventCard shows infinite spinner** when no events exist — no empty state
17. **Stale dark: classes** in some components with no dark mode implementation
18. **Font Awesome** loads 3 packages for 3 icons — replace with inline SVGs

### Component Architecture
19. **`BeliefCard`** reused on Youth page for non-belief content — needs renaming or generic card
20. **Inconsistent image handling** across components
21. **No shared animation/transition system**

---

## Design Direction

### Aesthetic: "Mountain Modern"
A warm, grounded aesthetic inspired by Montana's Bitterroot Valley — clean lines with natural warmth. Think modern lodge architecture: wood, stone, warmth, but with editorial-quality typography and generous whitespace.

### Color Palette
```
--color-primary:     #9B2335    (Heritage Red — refined from current lrbc-red)
--color-primary-dark: #7A1C2A   (Deep red for hover/active)
--color-accent:      #C8956C    (Warm copper/saddle — Montana earth)
--color-stone:       #3D3832    (Warm charcoal — text, dark sections)
--color-cream:       #FAF7F2    (Warm off-white — page background)
--color-sand:        #EDE8E0    (Warm gray — card backgrounds, borders)
--color-sage:        #7A8B6F    (Muted sage green — nature accent)
--color-white:       #FFFFFF    (Pure white — card surfaces)
```

### Typography
- **Display/Headings**: **DM Serif Display** — warm, editorial serif with personality
- **Body**: **DM Sans** — clean geometric sans that pairs perfectly, highly legible
- Both from the same family ecosystem, excellent font pairing with Google Fonts

### Key Design Principles
1. **Full-bleed hero imagery** with text overlays and gradient scrims
2. **Generous whitespace** — let content breathe
3. **Alternating content sections** — image-left/text-right pattern instead of stacked center
4. **Subtle scroll-triggered reveals** using CSS `@keyframes` + Intersection Observer
5. **View transitions** between pages for SPA-like smoothness
6. **Warm, layered backgrounds** — subtle textures, gradient washes
7. **Cards with depth** — soft shadows, warm borders, hover lift effects

---

## Implementation Plan

### Phase 1: Foundation (Infrastructure)

#### 1.1 Remove dead dependencies
- Remove `flowbite` and `flowbite/plugin` from Tailwind config + package.json
- Remove `axios` — replace with native `fetch`
- Remove `moment` — unused
- Remove `@fortawesome/*` packages — replace with inline SVGs
- Remove `astro-seo` — unused (custom SEOHead already exists)

#### 1.2 Update Tailwind config
- New color palette with CSS custom properties
- New font family definitions (DM Serif Display + DM Sans)
- Extended spacing, border-radius, and shadow scales
- Custom animation utilities for scroll reveals

#### 1.3 Update global styles
- CSS custom properties for the full color system
- Base typography styles
- Scroll-reveal animation keyframes
- Smooth scroll behavior
- Selection color styling

#### 1.4 Update Layout.astro
- Switch Google Fonts from CSS @import to `<link>` tags with `preconnect`
- Add `<ClientRouter />` from `astro:transitions` for view transitions
- Remove Flowbite script tag
- Add scroll-reveal Intersection Observer script
- Update body background to warm cream

#### 1.5 Build custom mobile menu
- CSS-only or minimal JS dropdown/hamburger menu (replacing Flowbite)
- Slide-in mobile drawer with smooth animation
- Proper focus trapping and accessibility

---

### Phase 2: Shared Components

#### 2.1 Navbar.astro — Complete redesign
- Sticky navbar with scroll-aware background (transparent → solid on scroll)
- Refined typography and spacing
- Custom dropdown menus (no Flowbite)
- Animated hamburger icon for mobile
- Mobile slide-out drawer menu
- View transition persistence (`transition:persist`)

#### 2.2 Footer.astro — Redesign
- Warm stone-colored background with subtle texture
- Better visual hierarchy with larger headings
- Inline SVG icons for social links (replace Font Awesome)
- Add a subtle top decorative border or mountain silhouette
- Proper link styling with hover effects

#### 2.3 Hero.astro — Complete rebuild
- Full-viewport hero with background image
- Gradient scrim overlay for text readability
- Church name + tagline with entrance animation
- CTA buttons (Visit Us / Watch Online)
- Responsive sizing (vh units with min/max)

#### 2.4 ImageHeader.astro — Enhance
- Taller image area (h-80 or h-96 instead of h-64)
- Parallax scroll effect on the background image
- Better gradient overlay (bottom-up gradient instead of centered box)
- Typography upgrade — larger, more dramatic title treatment
- Subtle entrance animation on the title

#### 2.5 ContentCard.astro — Redesign as alternating sections
- Horizontal layout: image on one side, text on the other
- Alternating left/right pattern (odd/even)
- Full-width image (no circular crop)
- Scroll-reveal entrance animation
- Generous padding and refined typography

#### 2.6 New: SectionCard.astro (replace BeliefCard for generic use)
- Clean card component for text content sections
- Used on Youth, Visit, Beliefs pages
- Subtle background, warm border accent
- Scroll-reveal animation

#### 2.7 EventCard.tsx — Improve
- Replace axios with native fetch
- Add empty state (no events message instead of infinite spinner)
- Better card styling with warm color accents
- Date/time with refined typography
- Sanitize HTML output (remove dangerouslySetInnerHTML)

#### 2.8 PastorCard.astro — Redesign
- Refined card with hover lift effect
- Better image treatment (rounded rectangle instead of circle for better visibility)
- Name/title with accent color underline
- Email link with subtle icon

#### 2.9 MissionCard.astro — Redesign
- Warm card background
- "Serving in" field with accent color highlight
- Better contact info layout
- Expandable description for long text

#### 2.10 QandACard.astro — Redesign
- Accordion or elegant reveal pattern
- Question styled as prominent heading
- Answer with comfortable reading width
- Subtle divider between items

---

### Phase 3: Page-by-Page Redesign

#### 3.1 Homepage (`/`)
- Full-bleed Hero with Montana landscape + church tagline
- "Love God / Love Others / Impact the World" as alternating horizontal sections
- Events + Streaming in a cleaner 2-column layout with warm card styling
- RMBM banner with better integration (or remove if not needed)
- Add a brief "Plan Your Visit" CTA section before the footer

#### 3.2 Visit (`/visit`)
- Enhanced ImageHeader with welcoming church photo
- Clean Q&A section with refined typography
- Activity schedule in a styled list/table
- Embedded Google Map (optional — good for SEO)
- CTA to contact page

#### 3.3 Contact (`/contact`)
- Enhanced ImageHeader
- Form with better field styling, floating labels or refined bordered inputs
- Warm card background for the form
- Side-by-side: form + church info (address, phone, map)
- Better success/error states

#### 3.4 Youth (`/youth`)
- Vibrant, slightly more energetic version of the site's style
- Better section cards (replace BeliefCard with SectionCard)
- Event calendar with improved empty state
- Contact info styled as a CTA card

#### 3.5 Beliefs (`/about/beliefs`)
- Refined doctrine cards with subtle numbering or icons
- Better scripture reference styling (italic, muted)
- Comfortable reading width
- Section dividers between beliefs

#### 3.6 Pastors (`/about/pastors`)
- Redesigned PastorCards in a responsive grid
- Better photo treatment
- Bio text with comfortable line height
- Email links with icon

#### 3.7 Missions (`/about/missions`)
- Quote block with refined typography
- Better Domestic/International section headers (accent color bar)
- Redesigned MissionCards
- Map or region indicators (optional)

#### 3.8 Constitution & Bylaws pages
- Clean document styling
- Better navigation between constitution/bylaws
- Proper heading hierarchy
- Print-friendly styling

#### 3.9 404 Page
- On-brand error page with Montana imagery or illustration
- Clear "Return Home" CTA with styled button
- Warm, friendly messaging

---

### Phase 4: Polish & Performance

#### 4.1 View Transitions
- Add `<ClientRouter />` to Layout
- Smooth fade transitions between pages
- Persistent navbar during transitions
- Named transitions for hero images across pages

#### 4.2 Scroll Animations
- Intersection Observer utility (small vanilla JS)
- Fade-up reveal for content sections
- Staggered entrance for card grids
- Subtle parallax on hero/header images

#### 4.3 Micro-interactions
- Button hover states with smooth transitions
- Card hover lift effects
- Nav link underline animations
- Form field focus states with brand colors

#### 4.4 Performance
- Font loading: `<link rel="preconnect">` + `font-display: swap`
- Proper image `loading="lazy"` on below-fold content
- Remove unused CSS (Flowbite plugin classes)
- Verify responsive image `sizes` attributes

#### 4.5 SEO
- Verify all meta tags are correct
- Ensure structured data is accurate
- Check canonical URLs
- Validate Open Graph tags
- Ensure all images have meaningful alt text

---

## Files to Create/Modify

### New Files
- `src/components/SectionCard.astro` — Generic section card (replaces BeliefCard abuse)
- `src/components/MobileMenu.astro` — Custom mobile navigation drawer
- `src/components/ScrollReveal.astro` — Scroll-triggered animation wrapper
- `src/components/SocialIcons.astro` — Inline SVG social media icons

### Modified Files
- `tailwind.config.mjs` — Full color/font/animation overhaul
- `src/styles/global.css` — Base styles, animations, typography
- `src/layouts/Layout.astro` — Font loading, view transitions, remove Flowbite
- `src/components/Navbar.astro` — Complete redesign
- `src/components/NavBar/DropdownMenu.astro` — Remove Flowbite dependency
- `src/components/NavBar/MainMenuItem.astro` — Style update
- `src/components/Footer.astro` — Complete redesign
- `src/components/Hero.astro` — Complete rebuild with hero image
- `src/components/ImageHeader.astro` — Enhanced with parallax/gradient
- `src/components/ContentCard.astro` — Horizontal alternating layout
- `src/components/BeliefCard.astro` — Restyle
- `src/components/QandACard.astro` — Restyle
- `src/components/PastorCard.astro` — Redesign
- `src/components/MissionCard.astro` — Redesign
- `src/components/EventCard.tsx` — Replace axios, fix XSS, restyle
- `src/components/YouthEventCard.tsx` — Same improvements
- `src/components/Streaming.astro` — Restyle
- `src/components/Spinner.tsx` — Update styling
- `src/components/IconButton.astro` — Update styling
- `src/components/SEOHead.astro` — Minor updates
- `src/pages/index.astro` — Homepage redesign
- `src/pages/visit.astro` — Page redesign
- `src/pages/contact.astro` — Page redesign
- `src/pages/youth/index.astro` — Page redesign
- `src/pages/about/beliefs.astro` — Page redesign
- `src/pages/about/pastors.astro` — Page redesign
- `src/pages/about/missions.astro` — Page redesign
- `src/pages/about/constitution-and-bylaws.astro` — Style update
- `src/pages/about/constitution.astro` — Style update
- `src/pages/about/bylaws.astro` — Style update
- `src/pages/404.astro` — Redesign
- `package.json` — Remove dead deps, update as needed
- `astro.config.mjs` — Minor updates

### Files to Delete
- `src/components/NavBar/Divider.astro` — Unnecessary (just an empty `<ul>`)
- `src/components/events/VBSBullet.astro` — VBS not in scope

---

## Execution Order

1. **Foundation first** — Tailwind config, global styles, Layout.astro, font loading
2. **Navbar + Footer** — These frame every page, so fix them first
3. **Shared components** — Hero, ImageHeader, ContentCard, cards
4. **Homepage** — The first impression
5. **Interior pages** — Visit, Contact, Youth, About pages
6. **Polish** — View transitions, scroll animations, micro-interactions
7. **Cleanup** — Remove dead deps, test everything, verify SEO

Each phase should result in a working site — no broken intermediate states.
