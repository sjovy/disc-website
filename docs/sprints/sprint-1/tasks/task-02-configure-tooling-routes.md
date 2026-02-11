# Task: Configure Tooling & Routes

**Sprint:** 1
**Feature:** Project Foundation [SIMPLE]
**Complexity:** SIMPLE
**Assigned Model:** haiku
**Model Rationale:** Configuration tasks following standard conventions (ESLint, route files). Well-defined requirements with minimal decision-making.

---

## Context

**Previous work:** Task 1.1 completed - Next.js 16 project initialized with TypeScript and Tailwind CSS v4.

**Current state:**
- Next.js 16 dev server runs successfully
- Base `app/layout.tsx` and `app/page.tsx` exist
- TypeScript strict mode enabled
- Tailwind CSS v4 configured

**Purpose:** Configure ESLint for code quality enforcement, create route structure for all pages (/, /test, /team, /demo, /privacy), and ensure consistent tooling setup. This enables quality gates and provides navigation framework.

---

## Objective

Configure ESLint with TypeScript and Next.js rules, create route files for all planned pages with placeholder content, ensure all routes are accessible and TypeScript compilation passes with zero errors/warnings.

---

## Steps

1. **Install ESLint dependencies:**
   ```bash
   npm install -D eslint eslint-config-next @typescript-eslint/parser @typescript-eslint/eslint-plugin
   ```

2. **Create `.eslintrc.json` configuration:**
   ```json
   {
     "extends": [
       "next/core-web-vitals",
       "eslint:recommended",
       "plugin:@typescript-eslint/recommended"
     ],
     "parser": "@typescript-eslint/parser",
     "parserOptions": {
       "ecmaVersion": "latest",
       "sourceType": "module",
       "project": "./tsconfig.json"
     },
     "rules": {
       "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
       "@typescript-eslint/no-explicit-any": "error"
     }
   }
   ```

3. **Add lint script to `package.json`:**
   - Add to `"scripts"`: `"lint": "next lint"`

4. **Create route structure:**

   **Test route:** `app/test/page.tsx`
   ```tsx
   export default function TestPage() {
     return (
       <div className="min-h-screen flex items-center justify-center">
         <div className="text-center">
           <h1 className="text-4xl font-bold mb-4">Individual DISC Assessment</h1>
           <p className="text-gray-600">Coming in Sprint 2</p>
         </div>
       </div>
     )
   }
   ```

   **Team route:** `app/team/page.tsx`
   ```tsx
   export default function TeamPage() {
     return (
       <div className="min-h-screen flex items-center justify-center">
         <div className="text-center">
           <h1 className="text-4xl font-bold mb-4">Team Analysis</h1>
           <p className="text-gray-600">Coming in Sprint 3</p>
         </div>
       </div>
     )
   }
   ```

   **Demo route:** `app/demo/page.tsx`
   ```tsx
   export default function DemoPage() {
     return (
       <div className="min-h-screen flex items-center justify-center">
         <div className="text-center">
           <h1 className="text-4xl font-bold mb-4">Demo Experience</h1>
           <p className="text-gray-600">Coming in Sprint 2</p>
         </div>
       </div>
     )
   }
   ```

   **Privacy route:** `app/privacy/page.tsx`
   ```tsx
   export default function PrivacyPage() {
     return (
       <div className="min-h-screen max-w-4xl mx-auto px-4 py-16">
         <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
         <div className="prose prose-gray">
           <p>Your privacy is important to us.</p>
           <h2>Data Collection</h2>
           <p>This application stores all assessment data locally in your browser using localStorage. No data is sent to servers or third parties.</p>
           <h2>AI Analysis</h2>
           <p>When you request AI analysis, your responses are sent to Anthropic's Claude API. This data is processed according to Anthropic's privacy policy.</p>
         </div>
       </div>
     )
   }
   ```

5. **Add metadata to each route:**
   - Export `metadata` object from each page with appropriate `title` and `description`
   - Example for test page:
     ```tsx
     import type { Metadata } from 'next'

     export const metadata: Metadata = {
       title: 'DISC Assessment | Take Test',
       description: 'Complete your individual DISC personality assessment',
     }
     ```

6. **Run ESLint:**
   ```bash
   npm run lint
   ```
   - Fix any linting errors
   - Ensure zero warnings

7. **Verify TypeScript compilation:**
   ```bash
   npm run build
   ```
   - Should compile with no errors

8. **Test navigation:**
   - Start dev server: `npm run dev`
   - Manually test routes:
     - http://localhost:3000/
     - http://localhost:3000/test
     - http://localhost:3000/team
     - http://localhost:3000/demo
     - http://localhost:3000/privacy
   - Verify each route renders without errors

---

## Patterns to Follow

**Metadata pattern (from Next.js 16 App Router):**
```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
}
```

**Server Component pattern (default):**
- No 'use client' directive needed
- Direct async/await support
- No useState/useEffect in these placeholder pages

---

## Acceptance Criteria

- [ ] ESLint configured with Next.js and TypeScript rules
- [ ] `npm run lint` passes with zero errors and zero warnings
- [ ] All routes created: /, /test, /team, /demo, /privacy
- [ ] Each route has appropriate metadata (title, description)
- [ ] All routes render successfully (no 404s)
- [ ] TypeScript compilation passes (`npm run build` succeeds)
- [ ] No console errors when navigating between routes
- [ ] Placeholder content appropriate for each route

---

## Verification

**Command:**
```bash
cd /Users/thomas/ClaudeCode/coding/disc-website
npm run lint
npm run build
```

**Expected Result:**
- `npm run lint`: ✓ No ESLint warnings or errors
- `npm run build`: Successful production build
- All 5 routes compiled successfully

**Manual test:**
```bash
npm run dev
```
- Navigate to each route in browser
- Verify no 404 errors
- Verify placeholder content displays correctly

---

## Notes

- **Placeholder content:** Keep it simple - these pages will be fully implemented in later sprints. Just need functional routes.
- **Metadata:** Required for SEO and browser tab titles. Use meaningful titles for each route.
- **ESLint rules:** Strict rules prevent common issues. Fix all warnings - don't disable rules.
- **Privacy page:** Basic content provided, will be enhanced with legal review if needed.
- **DO NOT implement full landing page** - that's Task 2.2. Just ensure route exists.
- **Server Components:** All these pages are Server Components (no interactivity yet).
- **Prose typography:** Tailwind's prose classes work well for privacy/legal text (will be enhanced with @tailwindcss/typography plugin if needed in later sprints).

---
