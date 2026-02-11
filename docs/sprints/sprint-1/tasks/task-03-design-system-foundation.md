# Task: Design System Foundation

**Sprint:** 1
**Feature:** Landing Page Implementation [MEDIUM]
**Complexity:** MEDIUM
**Assigned Model:** sonnet
**Model Rationale:** Requires aesthetic judgment and creative interpretation of Stripe's design language. Medium complexity with design system architecture decisions and Tailwind v4 custom token configuration.

---

## Context

**Previous work:** Task 1.1 completed - Next.js 16 with Tailwind CSS v4 configured and running.

**Current state:**
- Tailwind CSS v4 installed and configured
- Basic `globals.css` with Tailwind directives
- `tailwind.config.ts` exists with default configuration
- No custom design tokens or color system defined yet

**Purpose:** Establish Stripe-inspired design system with monochromatic base palette and DISC accent colors (Red, Yellow, Green, Blue). Create reusable design foundation that will be used across all components and pages. This design system defines the visual identity of the entire application.

---

## Objective

Create a comprehensive design system in Tailwind CSS v4 that captures Stripe's minimalist aesthetic (clean spacing, professional typography, subtle shadows) while incorporating DISC personality colors as accent options. Configure custom tokens, establish typography scale, define component patterns.

---

## Steps

1. **Research Stripe aesthetic (REQUIRED FIRST STEP):**
   - Visit https://stripe.com in browser
   - Note key characteristics:
     - Clean, spacious layouts (generous padding/margins)
     - Monochromatic base (grays, blacks, whites)
     - Subtle gradients and shadows
     - Professional sans-serif typography
     - High contrast for readability
     - Minimal decoration, maximum clarity

2. **Configure Tailwind v4 custom tokens in `tailwind.config.ts`:**

   Add design tokens for:

   **Colors:**
   - Monochromatic base: gray scale from 50-900
   - DISC accents:
     - Dominance Red: `#DC2626` (red-600 equivalent)
     - Influence Yellow: `#F59E0B` (amber-500 equivalent)
     - Steadiness Green: `#10B981` (emerald-500 equivalent)
     - Compliance Blue: `#3B82F6` (blue-500 equivalent)
   - Semantic colors: success, warning, error, info

   **Typography:**
   - Font families: Inter or similar professional sans-serif
   - Font sizes: Scale from xs to 5xl
   - Line heights: Comfortable reading (1.5-1.75 for body)
   - Letter spacing: Slightly tighter for headings

   **Spacing:**
   - Generous base spacing unit (4px)
   - Scale: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64

   **Shadows:**
   - Subtle: `shadow-sm` for cards
   - Medium: `shadow-md` for elevated elements
   - Large: `shadow-lg` for modals/dialogs

   **Border Radius:**
   - Subtle rounding: 4-8px for cards
   - Medium: 12px for buttons
   - Full: for circular elements

3. **Create base layout wrapper component:**

   **File:** `components/layout/Container.tsx`
   - Max width container (1200px)
   - Responsive padding
   - Centered content
   - TypeScript typed props

   ```tsx
   interface ContainerProps {
     children: React.ReactNode
     className?: string
   }

   export function Container({ children, className = '' }: ContainerProps) {
     return (
       <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
         {children}
       </div>
     )
   }
   ```

4. **Update `app/globals.css` with design system foundations:**

   ```css
   @import "tailwindcss";

   /* Design System Foundations */
   @layer base {
     :root {
       /* DISC Accent Colors */
       --color-disc-d: 220 38 38; /* red-600 */
       --color-disc-i: 245 158 11; /* amber-500 */
       --color-disc-s: 16 185 129; /* emerald-500 */
       --color-disc-c: 59 130 246; /* blue-500 */

       /* Semantic Colors */
       --color-background: 255 255 255;
       --color-foreground: 15 23 42; /* slate-900 */
     }

     body {
       @apply bg-background text-foreground;
       font-feature-settings: "rlig" 1, "calt" 1;
     }

     h1, h2, h3, h4, h5, h6 {
       @apply font-semibold tracking-tight;
     }
   }

   @layer utilities {
     .text-balance {
       text-wrap: balance;
     }
   }
   ```

5. **Install professional typography font:**

   Update `app/layout.tsx`:
   ```tsx
   import { Inter } from 'next/font/google'

   const inter = Inter({
     subsets: ['latin'],
     display: 'swap',
   })

   // Apply to body: className={inter.className}
   ```

6. **Create design system documentation:**

   **File:** `components/README.md`
   ```markdown
   # Design System

   ## Colors
   - **Monochromatic Base:** Gray scale for backgrounds, text, borders
   - **DISC Accents:** Red (D), Yellow (I), Green (S), Blue (C)

   ## Typography
   - **Font:** Inter
   - **Scale:** text-sm to text-5xl
   - **Weights:** normal (400), medium (500), semibold (600), bold (700)

   ## Spacing
   - Use Tailwind spacing scale: p-4, p-6, p-8, p-12, p-16
   - Generous whitespace is key to Stripe aesthetic

   ## Components
   - Container: Max width wrapper for all pages
   - (More components in later tasks)
   ```

7. **Test design system:**
   - Update `app/page.tsx` to use Container and custom colors
   - Verify fonts load correctly
   - Verify colors render as expected
   - Test responsive spacing

8. **Verify TypeScript compilation:**
   ```bash
   npm run build
   ```

---

## Patterns to Follow

**Stripe design principles to emulate:**
- **Whitespace:** Generous padding (p-8, p-12, p-16)
- **Typography:** Clear hierarchy (text-5xl for h1, text-3xl for h2)
- **Shadows:** Subtle elevation (shadow-sm for cards)
- **Colors:** Low saturation grays + strategic accent colors
- **Borders:** Minimal use, subtle when present (border-gray-200)
- **Interactivity:** Smooth transitions (transition-all duration-200)

**Reference for inspiration:**
- Visit https://stripe.com/payments
- Note card layouts, button styles, color usage
- Adapt principles, don't copy exactly

---

## Acceptance Criteria

- [ ] Tailwind config includes DISC accent colors (Red, Yellow, Green, Blue)
- [ ] Monochromatic base palette defined (gray scale)
- [ ] Inter font (or similar professional sans-serif) installed and working
- [ ] Container component created and typed with TypeScript
- [ ] `globals.css` includes design system CSS variables
- [ ] Typography scale follows comfortable reading standards
- [ ] Spacing system uses generous whitespace (Stripe-inspired)
- [ ] Design system documentation created in `components/README.md`
- [ ] Test page uses new design tokens
- [ ] TypeScript compilation passes with no errors
- [ ] No ESLint warnings

---

## Verification

**Command:**
```bash
cd /Users/thomas/ClaudeCode/coding/disc-website
npm run dev
```

**Expected Result:**
- Open http://localhost:3000
- Verify Inter font loads (check browser DevTools)
- Inspect element to verify CSS custom properties exist
- Test page should show improved typography and spacing
- No console errors

**Design verification:**
- Text is readable with high contrast
- Spacing feels generous and clean
- Font rendering is professional
- Colors defined and accessible via Tailwind classes

---

## Notes

- **Stripe aesthetic is about restraint:** Less is more. Clean, minimal, professional.
- **DISC colors are accents only:** Use sparingly for personality indicators, not as primary UI colors.
- **Tailwind v4 syntax:** Use `@import "tailwindcss"` not `@tailwind` directives.
- **Font optimization:** Next.js automatically optimizes Google Fonts with `next/font`.
- **CSS variables:** Define in `:root` for easy theming in future (dark mode potential).
- **Don't over-design:** This is foundation layer. Components will build on these tokens.
- **Accessibility:** Ensure color contrast ratios meet WCAG AA standards (4.5:1 for normal text).
- **DO NOT implement components yet** - that's Task 2.2. Just establish the system.
- **Reference, don't copy:** Be inspired by Stripe, but create our own design system.

---
