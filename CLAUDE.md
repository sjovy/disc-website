# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Identity

DISC personality assessment website - portfolio showcase combining web development and AI capabilities.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Claude API, Recharts

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # ESLint check
npm test         # Run test suite
```

## Key Directories

- `/app` - Next.js App Router routes
- `/components` - React components
- `/lib` - Utilities, scoring engine, TypeScript types
- `/disc-data` - Assessment instrument & RAG context (24 questions, theory docs ~1.1MB)
- `/docs` - Planning documentation (PRD, Implementation Plan, Status)
- `/.claude` - Project infrastructure (PROTECTED - never modify without explicit request)

## Architecture Philosophy

**Single-page assessment:** All 24 questions on one scrollable page with live validation

**RAG-powered AI:** Personalized analysis using Claude API with DISC theory context (not template matching)

**localStorage persistence:** No server storage in v1 - all data client-side

**Client-side API calls:** Claude API called directly from browser using .env.local keys (migration path to API routes documented for production)

**Stripe-inspired design:** Monochromatic palette with DISC accent colors (Red/Yellow/Green/Blue)

## Requirements & Planning

- **93 requirements** tracked with REQ-XXX codes in `/docs/PRD.md`
- **4 sprints** defined in `/docs/IMPLEMENTATION_PLAN.md`
- **Current status** tracked in `/docs/PROJECT_STATUS.md`
- Sprint 0 (planning) complete, Sprint 1 ready to begin

## Quality Standards

- TypeScript strict mode, zero errors
- ESLint clean
- Lighthouse score >90 (all categories)
- WCAG AA accessibility compliance
- Unit tests required for scoring/validation logic

## Key Routes (Planned)

- `/` - Landing page with 3 entry points
- `/test` - Individual assessment flow
- `/team` - Team analysis (bulk import/comparison)
- `/demo` - Static demo with sample results
- `/privacy` - Privacy policy

## Data Sources

- `disc-data/disc_complete.json` - 24-question assessment instrument
- `disc-data/disc_example_analyses_enhanced.json` - RAG example analyses
- `disc-data/*.md` - DISC theory documentation for AI context

## Important Constraints

- Free, anonymous, no authentication
- No server persistence (localStorage only in v1)
- English only (v1)
- Client-side Claude API calls (v1)

## Sprint Workflow

Work one sprint at a time. Reference `/docs/PROJECT_STATUS.md` for current sprint status and next steps.
