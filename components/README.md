# Design System

## Colors

**Monochromatic Base:** Gray scale for backgrounds, text, borders
- Use Tailwind's default gray palette (gray-50 through gray-900)
- Background: white (bg-background)
- Foreground: slate-900 (text-foreground)

**DISC Accents:** Strategic use of personality colors
- **Dominance (D):** Red - `text-disc-d` or `bg-disc-d` (#DC2626)
- **Influence (I):** Yellow - `text-disc-i` or `bg-disc-i` (#F59E0B)
- **Steadiness (S):** Green - `text-disc-s` or `bg-disc-s` (#10B981)
- **Compliance (C):** Blue - `text-disc-c` or `bg-disc-c` (#3B82F6)

## Typography

**Font:** Inter (loaded via next/font/google)
- Clean, professional, highly readable
- Optimized for web with variable font

**Scale:**
- `text-xs` - 12px / Captions, labels
- `text-sm` - 14px / Secondary text
- `text-base` - 16px / Body text (default)
- `text-lg` - 18px / Emphasized body
- `text-xl` - 20px / Small headings
- `text-2xl` - 24px / Section headings
- `text-3xl` - 30px / Page subheadings
- `text-4xl` - 36px / Page headings
- `text-5xl` - 48px / Hero headings

**Weights:**
- `font-normal` (400) - Body text
- `font-medium` (500) - Emphasized text
- `font-semibold` (600) - Headings (default)
- `font-bold` (700) - Strong emphasis

**Line Height:** Configured in font size definitions for optimal readability
- Body text: 1.5 (comfortable reading)
- Headings: Tighter for visual impact

## Spacing

Use Tailwind spacing scale - generous whitespace is key to Stripe aesthetic:
- `p-4` / `m-4` - 16px / Compact spacing
- `p-6` / `m-6` - 24px / Default spacing
- `p-8` / `m-8` - 32px / Comfortable spacing
- `p-12` / `m-12` - 48px / Generous spacing
- `p-16` / `m-16` - 64px / Section spacing
- `p-24` / `m-24` - 96px / Large section spacing

**Principle:** When in doubt, add more whitespace. Stripe's design breathes.

## Shadows

Subtle elevation for depth without distraction:
- `shadow-sm` - Cards, subtle elevation
- `shadow-md` - Elevated components, dropdowns
- `shadow-lg` - Modals, dialogs, popovers

## Border Radius

- `rounded-sm` - 4px / Subtle rounding
- `rounded` - 8px / Cards (default)
- `rounded-md` - 12px / Buttons, inputs
- `rounded-lg` - 16px / Large components
- `rounded-full` - Circular / Pills, avatars

## Components

### Container
Max width wrapper for all page content:
```tsx
import { Container } from '@/components/layout/Container';

<Container>
  {/* Content here */}
</Container>
```

**Properties:**
- `className` - Optional additional classes
- Max width: 1280px (max-w-7xl)
- Responsive padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)

## Design Principles

**Stripe-Inspired Aesthetic:**
1. **Whitespace:** Generous padding and margins create breathing room
2. **Typography:** Clear hierarchy with consistent scale
3. **Shadows:** Subtle elevation, never harsh
4. **Colors:** Low saturation grays + strategic accent colors
5. **Borders:** Minimal use, subtle when present (border-gray-200)
6. **Interactivity:** Smooth transitions (transition-all duration-200)

**DISC Color Usage:**
- Use DISC colors for personality indicators only
- Primary UI should remain monochromatic
- Accent colors draw attention to personality-specific content

## Accessibility

- Color contrast ratios meet WCAG AA standards (4.5:1 for normal text)
- Font sizes are legible (minimum 14px for body text)
- Interactive elements have clear focus states
- Semantic HTML used throughout

## Future Enhancements

- Dark mode support (CSS variables are prepared)
- Additional component patterns as needed
- Animation utilities for micro-interactions
