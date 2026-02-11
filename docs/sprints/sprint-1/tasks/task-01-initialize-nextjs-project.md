# Task: Initialize Next.js Project

**Sprint:** 1
**Feature:** Project Foundation [SIMPLE]
**Complexity:** SIMPLE
**Assigned Model:** haiku
**Model Rationale:** Well-defined setup tasks following Next.js 16 conventions with TypeScript and Tailwind CSS v4. Minimal creative decision-making required.

---

## Context

**Previous work:** Sprint 0 completed planning and documentation. Project directory exists but is empty except for `/disc-data` and `/docs` directories.

**Current state:**
- Empty project root at `/Users/thomas/ClaudeCode/coding/disc-website`
- Git repository initialized with Sprint 0 commit
- Planning docs exist in `/docs` folder
- DISC data package exists in `/disc-data` folder

**Purpose:** Establish Next.js 16 project foundation with TypeScript strict mode and Tailwind CSS v4, enabling subsequent development work. This is the critical path task - all other Sprint 1 tasks depend on this completion.

---

## Objective

Initialize a production-ready Next.js 16 project with TypeScript strict mode, Tailwind CSS v4, and App Router structure. Project must run `npm run dev` successfully and compile without TypeScript errors.

---

## Steps

1. **Initialize Next.js project:**
   ```bash
   npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
   ```
   - Use current directory (`.`)
   - Enable TypeScript
   - Enable Tailwind CSS
   - Use App Router (`--app`)
   - No src directory (`--no-src-dir`)
   - Import alias `@/*` for clean imports

2. **Verify and upgrade to Next.js 16:**
   - Check `package.json` for Next.js version
   - If not 16.x, upgrade: `npm install next@16 react@19 react-dom@19`

3. **Configure TypeScript strict mode:**
   - Edit `tsconfig.json`
   - Set `"strict": true` in `compilerOptions`
   - Set `"noUncheckedIndexedAccess": true` for additional safety
   - Verify path mappings include `"@/*": ["./*"]`

4. **Install and configure Tailwind CSS v4:**
   - Install Tailwind v4: `npm install tailwindcss@next @tailwindcss/postcss@next`
   - Create `tailwind.config.ts` with TypeScript export
   - Configure content paths: `["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"]`
   - Create `app/globals.css` with Tailwind directives

5. **Create base app structure:**
   - `app/layout.tsx` - Root layout with HTML structure, metadata
   - `app/page.tsx` - Landing page placeholder (will be implemented in Task 2.2)
   - Ensure layout includes `globals.css` import

6. **Configure Git ignore:**
   - Verify `.gitignore` includes: `.env.local`, `node_modules`, `.next`, `out`, `*.log`

7. **Create environment template:**
   - Create `.env.example` file with:
     ```
     # Claude API Configuration
     NEXT_PUBLIC_ANTHROPIC_API_KEY=your_api_key_here
     ```
   - Add comment noting this is for client-side API calls (v1 approach)

8. **Install dependencies and verify:**
   ```bash
   npm install
   npm run dev
   ```
   - Verify server starts without errors
   - Verify TypeScript compilation succeeds
   - Verify no console errors in terminal

---

## Patterns to Follow

No existing code patterns yet (foundation task). Follow Next.js 16 conventions:
- **App Router:** Use `app/` directory structure
- **TypeScript:** All files use `.tsx` or `.ts` extensions
- **Server/Client Components:** Default to Server Components (no 'use client' unless needed)
- **Metadata API:** Use Next.js metadata exports for SEO

---

## Acceptance Criteria

- [ ] `package.json` exists with Next.js 16.x, React 19, Tailwind CSS v4
- [ ] `npm run dev` starts development server without errors
- [ ] TypeScript strict mode enabled in `tsconfig.json`
- [ ] `app/layout.tsx` and `app/page.tsx` exist and compile
- [ ] Tailwind CSS configured with v4 syntax in `tailwind.config.ts`
- [ ] Development server accessible at http://localhost:3000
- [ ] No TypeScript compilation errors
- [ ] `.gitignore` properly configured
- [ ] `.env.example` created (not `.env.local` - that's user-specific)

---

## Verification

**Command:**
```bash
cd /Users/thomas/ClaudeCode/coding/disc-website
npm run dev
```

**Expected Result:**
- Terminal shows: `✓ Ready in [X]ms`
- Server running at `http://localhost:3000`
- Browser shows default Next.js welcome page (or simple placeholder)
- No TypeScript errors in terminal
- No console errors in browser console

**Additional checks:**
```bash
npm run build
```
- Should compile successfully with no errors

---

## Notes

- **Tailwind v4 breaking changes:** Tailwind v4 uses `@import "tailwindcss"` instead of v3's `@tailwind` directives. Ensure `globals.css` uses correct v4 syntax.
- **Next.js 16:** App Router is stable, use it exclusively (no Pages Router).
- **Import alias:** `@/` alias maps to project root for clean imports: `import { foo } from "@/lib/utils"`
- **DO NOT install additional dependencies** beyond what's specified - keep foundation minimal.
- **DO NOT implement landing page design** - that's Task 2.2. Just create functional structure.
- **Server Component by default:** Don't add 'use client' unless absolutely necessary (e.g., useState, useEffect).

---
