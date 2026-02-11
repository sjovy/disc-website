# Task: Landing Page Components

**Sprint:** 1
**Feature:** Landing Page Implementation [MEDIUM]
**Complexity:** MEDIUM
**Assigned Model:** sonnet
**Model Rationale:** Requires creative component design, responsive layout implementation, and aesthetic judgment to implement Stripe-inspired UI with DISC personality context. Medium complexity with React component architecture.

---

## Context

**Previous work:**
- Task 1.1: Next.js 16 project initialized
- Task 1.2: Routes created, ESLint configured
- Task 2.1: Design system established (Container, colors, typography, Tailwind tokens)

**Current state:**
- Design system exists with DISC accent colors and Stripe aesthetic
- Container component available for layout
- Inter font configured and working
- Routes exist but landing page (`app/page.tsx`) has placeholder content
- Header and footer components don't exist yet

**Purpose:** Build the landing page that serves as primary entry point to the application. Three cards guide users to Individual Test, Team Analysis, or Demo. Header and footer provide navigation and brand identity. This is the first impression users have of the application.

---

## Objective

Implement a production-ready landing page with three prominent entry point cards, a brand header with navigation, and an informational footer. Design should embody Stripe's clean aesthetic while incorporating DISC personality context. Fully responsive across mobile, tablet, and desktop.

---

## Steps

1. **Create Header component:**

   **File:** `components/layout/Header.tsx`

   Requirements:
   - Brand name: "DISC Personality Assessment"
   - Navigation links: Home, About DISC, Privacy
   - Responsive: Hamburger menu on mobile, full nav on desktop
   - Sticky positioning (optional, but recommended for UX)
   - Use Container component for consistent width
   - TypeScript typed props

   Design notes:
   - Clean, minimal header (Stripe-style)
   - Height: ~64px on desktop, ~56px on mobile
   - Background: white with subtle border-bottom
   - Logo/brand: left-aligned
   - Nav: right-aligned on desktop

2. **Create Footer component:**

   **File:** `components/layout/Footer.tsx`

   Requirements:
   - Copyright notice: "© 2026 DISC Assessment"
   - Links: Privacy Policy, About DISC Theory, Contact
   - Brief description: "Free, anonymous personality assessment"
   - Use Container component
   - TypeScript typed

   Design notes:
   - Minimal, 2-3 columns on desktop, stacked on mobile
   - Background: light gray (bg-gray-50)
   - Padding: generous (py-12)
   - Text: smaller size (text-sm), muted color (text-gray-600)

3. **Update root layout to include Header and Footer:**

   **File:** `app/layout.tsx`

   - Import Header and Footer
   - Structure: `<Header />`, `<main>{children}</main>`, `<Footer />`
   - Ensure main has min-height to push footer down
   - Apply Inter font to body

4. **Create EntryCard component:**

   **File:** `components/landing/EntryCard.tsx`

   Props:
   - `title: string` - Card title (e.g., "Take Individual Test")
   - `description: string` - Brief description
   - `href: string` - Link destination
   - `icon: React.ReactNode` - Optional icon/emoji
   - `accentColor: 'disc-d' | 'disc-i' | 'disc-s' | 'disc-c'` - DISC color accent

   Design:
   - Card appearance: subtle shadow, rounded corners (rounded-xl)
   - Hover state: lift effect (hover:shadow-lg, transition-all)
   - Accent color: left border or top border using DISC color
   - Padding: generous (p-8)
   - Background: white
   - Clickable: wrap in Next.js Link component

   Layout:
   - Icon at top (if provided)
   - Title: text-2xl font-semibold
   - Description: text-gray-600, text-base
   - Visual CTA: "Get started →" or arrow indicator

5. **Implement landing page:**

   **File:** `app/page.tsx`

   Structure:
   - Hero section with headline and subheadline
   - Three EntryCard components in grid layout
   - Brief "What is DISC?" section (optional, 2-3 sentences)

   Content:

   **Hero:**
   - Headline: "Discover Your Personality Profile"
   - Subheadline: "Free DISC assessment with AI-powered insights"

   **Cards:**
   1. **Individual Test** → `/test`
      - Title: "Take Individual Test"
      - Description: "Complete the 24-question assessment and get personalized AI analysis"
      - Accent: Blue (disc-c)

   2. **Team Analysis** → `/team`
      - Title: "Team Analysis"
      - Description: "Upload team results and discover dynamics and collaboration patterns"
      - Accent: Green (disc-s)

   3. **View Demo** → `/demo`
      - Title: "View Demo"
      - Description: "See sample results and explore the analysis without taking the test"
      - Accent: Yellow (disc-i)

   Layout:
   - Container for consistent width
   - Hero: centered, py-16 or py-24
   - Cards grid: 3 columns on desktop (grid-cols-3), 1 column on mobile
   - Gap between cards: gap-6 or gap-8
   - Generous padding throughout

6. **Add metadata:**

   Update `app/page.tsx` metadata:
   ```tsx
   export const metadata: Metadata = {
     title: 'DISC Personality Assessment | Free AI-Powered Analysis',
     description: 'Discover your personality profile with our free DISC assessment. Get personalized AI insights powered by Claude.',
   }
   ```

7. **Implement responsive design:**
   - Test at 320px (mobile)
   - Test at 768px (tablet)
   - Test at 1024px+ (desktop)
   - Cards stack on mobile (grid-cols-1)
   - Cards 2-column on tablet (sm:grid-cols-2 lg:grid-cols-3)
   - Header collapses to hamburger on mobile
   - Footer columns stack on mobile

8. **Add interactive states:**
   - Hover effects on cards (shadow, transform)
   - Focus states for keyboard navigation (focus:ring-2 focus:ring-blue-500)
   - Active states for clicks (active:scale-[0.98])
   - Smooth transitions (transition-all duration-200)

9. **Verify accessibility:**
   - All interactive elements keyboard accessible
   - Focus indicators visible
   - Semantic HTML (header, main, footer, nav)
   - ARIA labels where needed (mobile menu button)

10. **Final verification:**
    ```bash
    npm run lint
    npm run build
    npm run dev
    ```
    - No errors or warnings
    - Test all three card links work
    - Test responsive behavior
    - Verify design matches Stripe aesthetic

---

## Patterns to Follow

**Design system (from Task 2.1):**
- Use Container component for consistent width
- Use DISC accent colors: `text-disc-d`, `border-disc-c`, etc.
- Use design tokens from `globals.css`
- Follow Stripe principles: whitespace, subtle shadows, minimal decoration

**Next.js patterns:**
- Use Link from 'next/link' for navigation (client-side routing)
- Server Components by default (no 'use client' unless needed for interactivity)
- Metadata export for SEO

**Component structure:**
- Props interface defined with TypeScript
- Functional components with proper typing
- Composition over complexity

---

## Acceptance Criteria

- [ ] Header component created with navigation
- [ ] Footer component created with links and info
- [ ] EntryCard component created and reusable
- [ ] Landing page renders with three cards
- [ ] All three cards link to correct routes (/test, /team, /demo)
- [ ] Header and footer consistent across all routes
- [ ] Design matches Stripe aesthetic (clean, minimal, professional)
- [ ] DISC accent colors used appropriately
- [ ] Responsive: works on mobile (320px), tablet (768px), desktop (1024px+)
- [ ] Interactive states: hover, focus, active
- [ ] Keyboard navigation works (tab through elements)
- [ ] Focus indicators visible
- [ ] TypeScript compiles with no errors
- [ ] ESLint passes with no warnings
- [ ] No console errors in browser

---

## Verification

**Command:**
```bash
cd /Users/thomas/ClaudeCode/coding/disc-website
npm run dev
```

**Expected Result:**
- Open http://localhost:3000
- Landing page displays with hero section and three cards
- Click each card → navigates to correct route
- Header visible at top with navigation
- Footer visible at bottom with links

**Responsive testing:**
- Resize browser to 320px width → cards stack vertically
- Resize to 768px → cards in 2-column grid
- Resize to 1024px+ → cards in 3-column grid
- Header adapts appropriately

**Interaction testing:**
- Hover over cards → shadow lifts, smooth transition
- Tab through elements → focus indicators visible
- Click cards → navigation works
- No console errors

**Design verification:**
- Compare to Stripe.com aesthetic
- Whitespace feels generous
- Typography hierarchy clear
- Colors professional and restrained
- Overall impression: clean, trustworthy, professional

---

## Notes

- **Stripe aesthetic checklist:**
  - ✓ Generous whitespace
  - ✓ Subtle shadows (not dramatic)
  - ✓ Professional typography (Inter font)
  - ✓ Minimal color (monochromatic + accents)
  - ✓ Clean hierarchy
  - ✓ High contrast text
  - ✓ Smooth interactions

- **DISC colors usage:** Use as subtle accents (borders, icons) not as dominant colors. Background should stay monochromatic.

- **Mobile-first approach:** Design for mobile, enhance for desktop.

- **Performance:** Keep components lightweight. No heavy libraries yet.

- **Content tone:** Professional but welcoming. Free and anonymous are key selling points.

- **Navigation:** Keep it simple. Main routes only. No mega-menus.

- **Icons/emojis:** Optional for cards. Can use simple unicode emojis or defer to icon library in later sprints.

- **CTA language:** "Take Individual Test" not "Start Test" - be specific about what user gets.

- **Link styling:** Links in footer should have hover states (hover:text-gray-900).

- **Card grid:** Use CSS Grid (grid) not Flexbox for card layout - easier responsive control.

---
