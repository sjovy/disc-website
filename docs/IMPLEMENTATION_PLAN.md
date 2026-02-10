# Implementation Plan
## DISC Personality Assessment Website

**Version:** 1.0
**Date:** 2026-02-10
**Status:** Sprint 0 Complete - Awaiting Approval for Sprint 1

---

## Overview

This document outlines the strategic implementation plan for the DISC assessment website. It references requirements defined in PRD.md and organizes them into four sprints designed to deliver incremental value while managing token budget and complexity.

**Key Principles:**
- Each sprint delivers shippable, testable functionality
- Sprints build progressively (foundation -> features -> polish)
- Token budgets managed via strategic planning
- Quality gates enforce standards at each milestone

---

## Architecture Decisions

### Technology Stack

**Frontend Framework:**
- Next.js 16 (App Router) for modern React patterns, server components support, and optimal routing
- React 19 for latest concurrent features and performance improvements
- TypeScript (strict mode) for type safety and maintainability

**Styling:**
- Tailwind CSS v4 for utility-first styling and design token management
- Custom configuration for monochromatic palette + DISC accent colors
- Stripe-inspired design system for professional SaaS aesthetic

**AI Integration:**
- Claude API (Anthropic) for personalized analysis generation
- RAG pattern: load /disc-data files into context window at runtime
- Client-side API calls (v1) for simplicity, documented migration path to API routes

**Data Visualization:**
- Recharts for React-friendly charting library
- Responsive charts with accessibility support
- DISC accent colors integrated

**Data Persistence:**
- localStorage for client-side storage (no backend database v1)
- JSON format for results export/import
- Privacy-first: no server-side storage

### Key Trade-offs

**Client-side AI calls vs API routes:**
- Chose: Client-side (.env.local) for v1
- Rationale: Simpler implementation, acceptable for portfolio showcase
- Trade-off: API key exposed in client bundle, rate limiting less controlled
- Migration path: Document API route pattern for production evolution

**Single-page assessment vs paginated:**
- Chose: Single scrollable page for all 24 questions
- Rationale: User requested explicitly, better UX (no state management between pages)
- Trade-off: Longer initial render, less "progress" feel
- Mitigation: Progress indicator shows % completion

**RAG-based analysis vs template matching:**
- Chose: RAG with Claude API
- Rationale: Showcase AI capability, differentiate from static tools, portfolio value
- Trade-off: More complex, token-intensive, requires API
- Mitigation: Streaming responses, error handling, fallback messaging

**localStorage vs IndexedDB:**
- Chose: localStorage
- Rationale: Sufficient for JSON storage, simpler API, widely supported
- Trade-off: 5-10MB limit (sufficient for use case), no structured queries
- Mitigation: Validate storage availability, handle quota exceeded

**Recharts vs D3.js:**
- Chose: Recharts
- Rationale: React-friendly API, faster implementation, good docs
- Trade-off: Less granular control than D3
- Mitigation: Recharts sufficient for bar/radar charts needed

**App Router vs Pages Router:**
- Chose: App Router (Next.js 16)
- Rationale: Modern pattern, better performance, future-proof
- Trade-off: Newer API, less Stack Overflow answers
- Mitigation: Next.js docs comprehensive, team familiar with pattern

---

## Sprint Breakdown

### Sprint 1: Foundation & Landing Page

**Goal:** Shippable landing page with navigation framework and core UI system

**Scope (Requirements):**
- REQ-INFRA-010: Next.js project setup
- REQ-INFRA-020: Tailwind CSS v4 configuration
- REQ-INFRA-030: ESLint configuration
- REQ-INFRA-040: Route structure
- REQ-INFRA-050: Environment configuration
- REQ-LAND-010: Landing page structure (three entry point cards)
- REQ-LAND-020: Brand header
- REQ-LAND-030: Footer information
- REQ-LAND-040: Visual design system
- REQ-LAND-050: Responsive layout

**Complexity Indicators:**
- [SIMPLE] Project initialization, Tailwind config, ESLint, routes, environment setup
- [MEDIUM] Landing page cards, design system tokens, responsive layout

**Domain Hints:**
- UI-heavy: Design system tokens, responsive grid, card components
- Design-focused: Stripe aesthetic implementation, color palette refinement
- Frontend framework setup: Next.js App Router patterns, TypeScript config

**Entry Criteria:**
- Empty project directory at /Users/thomas/ClaudeCode/coding/disc-website
- Access to Stripe website for design reference
- /disc-data directory available (for later sprints)

**Exit Criteria:**
- Development server runs without errors (`npm run dev`)
- Landing page renders with three interactive, styled cards
- Navigation to /test, /team, /demo routes works (placeholder pages acceptable)
- Tailwind configured with monochromatic base + DISC accent colors defined
- Header and footer consistent across routes
- TypeScript strict mode enabled, no compilation errors
- ESLint passing with no warnings
- Responsive design validated on mobile/tablet/desktop
- Interactive elements have proper hover/focus states

**Quality Gates:**
- ESLint passes with zero errors/warnings
- TypeScript strict mode, zero compilation errors
- Mobile (320px), tablet (768px), desktop (1024px) tested
- Keyboard navigation works for all interactive elements
- Focus indicators visible on tab navigation
- Git repository initialized with .gitignore (.env.local, node_modules, .next)

**Token Estimate:** Low (minimal logic, primarily UI setup)

**Dependencies:**
- None (foundation sprint)

**Risks:**
- Tailwind v4 API changes from v3: mitigate with v4 docs review
- Next.js 16 App Router unfamiliarity: mitigate with official examples

---

### Sprint 2: Individual Assessment & AI Analysis Engine

**Goal:** Fully functional individual DISC test with AI-generated personalized analysis

**Scope (Requirements):**
- REQ-IND-010: Assessment instrument data loading
- REQ-IND-020: Single-page question display
- REQ-IND-030: Question answer interface
- REQ-IND-040: Answer validation
- REQ-IND-050: DISC scoring algorithm
- REQ-IND-060: Profile pattern mapping
- REQ-IND-070: AI RAG integration
- REQ-IND-080: AI personalized generation
- REQ-IND-090: Results visualization (charts)
- REQ-IND-100: Results page layout
- REQ-IND-110: JSON export
- REQ-IND-120: Print/save functionality
- REQ-IND-130: localStorage persistence (in-progress)
- REQ-IND-140: localStorage persistence (completed results)
- REQ-IND-150: Error handling for API failures
- REQ-INFRA-060: Error boundaries
- REQ-INFRA-070: Loading states
- REQ-QUALITY-040: Unit tests for scoring logic

**Complexity Indicators:**
- [SIMPLE] Data loading, validation, JSON export, error boundaries
- [MEDIUM] Question UI, scoring algorithm, results page, charts, localStorage, loading states, unit tests
- [COMPLEX] AI RAG integration, AI personalized generation (critical showcase feature)

**Domain Hints:**
- AI-heavy: RAG pattern critical, streaming responses, prompt engineering for personalization
- Data-processing: Scoring algorithm, profile mapping, JSON parsing
- Security-critical: API key handling, .env.local setup
- Performance-sensitive: Streaming UI, Recharts optimization, lazy loading charts

**Entry Criteria:**
- Sprint 1 complete and merged
- Claude API key obtained and documented
- /disc-data/disc_complete.json readable
- /disc-data markdown theory files (~1.1MB) accessible
- /disc-data/disc_example_analyses_enhanced.json readable

**Exit Criteria:**
- 24-question assessment completable on single scrollable page
- Scoring correctly calculates D-I-S-C dimensions (0-24 each)
- Profile pattern mapping identifies closest of 15 patterns
- AI generates UNIQUE analysis (verified with multiple test runs, not template matching)
- Results page displays with bar chart and radar chart
- JSON export downloads valid file
- Print functionality opens print dialog with optimized layout
- In-progress answers persist to localStorage and restore on reload
- Completed results save to localStorage
- API errors handled gracefully with retry option
- Streaming UI shows progress during AI generation
- Unit tests pass for scoring logic (all 15 profiles testable)
- TypeScript strict, ESLint clean
- Keyboard navigation and ARIA labels implemented

**Quality Gates:**
- Scoring algorithm unit tested with known inputs and edge cases
- AI produces personalized insights verified (run same scores twice, compare outputs)
- Streaming UI provides feedback (not blank screen during generation)
- Error handling tested (disconnect network, invalid API key, rate limit)
- Accessibility: keyboard nav, ARIA labels, focus management
- TypeScript strict mode, zero errors
- ESLint zero warnings
- localStorage quota exceeded handled gracefully

**Token Estimate:** High (AI integration, complex state management, visualization)

**Dependencies:**
- Sprint 1 (routes, design system)

**Risks:**
- RAG context size exceeds Claude limits: mitigate with selective data loading, summarization
- AI generates template-like responses: mitigate with prompt engineering, multiple test runs, exact score inclusion
- API rate limiting: mitigate with error handling, retry logic, user messaging
- Recharts bundle size: mitigate with lazy loading, code splitting

---

### Sprint 3: Team Analysis Mode

**Goal:** Upload 2-7 JSON files, visualize team, receive AI team dynamics analysis

**Scope (Requirements):**
- REQ-TEAM-010: Multi-file upload UI
- REQ-TEAM-020: File upload validation
- REQ-TEAM-030: Team size enforcement (hard blocks)
- REQ-TEAM-040: Team size warnings
- REQ-TEAM-050: Team data aggregation
- REQ-TEAM-060: Team visualization (aggregate distribution)
- REQ-TEAM-070: Team visualization (individual members)
- REQ-TEAM-080: AI team dynamics analysis
- REQ-TEAM-090: AI hiring recommendation
- REQ-TEAM-100: Team report layout
- REQ-TEAM-110: Team report print/save
- REQ-TEAM-120: localStorage persistence (team results)
- REQ-QUALITY-050: Unit tests for data validation

**Complexity Indicators:**
- [SIMPLE] File validation, team size rules, print functionality, unit tests
- [MEDIUM] Upload UI (drag-drop), team data aggregation, team charts, individual member cards, localStorage
- [COMPLEX] AI team dynamics analysis (multi-person context), AI hiring recommendation

**Domain Hints:**
- Data-processing heavy: JSON parsing, validation, aggregation logic
- AI-heavy: Multi-person analysis, gap identification, hiring recommendations
- UI-heavy: Drag-drop upload, team composition charts, mini-profile cards

**Entry Criteria:**
- Sprint 2 complete and merged
- JSON export format defined and validated
- Sample JSON files available for testing (3-5 files recommended)
- Individual assessment generates valid JSON

**Exit Criteria:**
- Upload 2-7 files successfully via drag-drop or file picker
- Validation catches malformed JSON and displays error per file
- Team size rules enforced: <2 or >7 blocked, 2/6-7 warned, 3-5 no warning
- Team charts render: aggregate D-I-S-C distribution, average profile radar
- Individual member mini-profiles display with primary pattern
- AI generates team-specific insights: gaps, overlaps, synergies, conflicts
- AI provides hiring recommendation with reasoning
- Team report print works with optimized layout
- Team results persist to localStorage
- Unit tests pass for aggregation and validation logic
- TypeScript strict, ESLint clean
- Accessibility implemented (keyboard upload, chart alternatives)

**Quality Gates:**
- File validation prevents crashes on malformed input
- Team size logic tested (1, 2, 5, 7, 8 files)
- AI addresses all team members in analysis (no omissions)
- Charts handle edge cases (all same profile, extreme outliers)
- Accessibility: keyboard file selection, chart text alternatives, ARIA labels
- TypeScript strict mode, zero errors
- ESLint zero warnings
- Error states for upload failures (file too large, read error)

**Token Estimate:** High (AI multi-person analysis, complex UI)

**Dependencies:**
- Sprint 2 (JSON export format, results structure)

**Risks:**
- Drag-drop browser compatibility: mitigate with file picker fallback, progressive enhancement
- AI handling 7 profiles in context: mitigate with summarization if needed, test with max size
- Chart readability with 7 data points: mitigate with responsive design, tooltip details

---

### Sprint 4: Demo Mode, Polish & Production Readiness

**Goal:** Static demo, design polish, performance optimization, production prep

**Scope (Requirements):**
- REQ-DEMO-010: Static demo data
- REQ-DEMO-020: Demo route
- REQ-DEMO-030: Demo visual consistency
- REQ-QUALITY-010: Accessibility (keyboard navigation)
- REQ-QUALITY-020: Accessibility (ARIA labels)
- REQ-QUALITY-030: Accessibility (color contrast)
- REQ-QUALITY-060: Performance (code splitting)
- REQ-QUALITY-070: Performance (Lighthouse score)
- REQ-QUALITY-080: SEO meta tags
- REQ-PRIVACY-010: Privacy policy page
- REQ-PRIVACY-020: Data storage transparency
- REQ-PRIVACY-030: API key security notes
- REQ-DOC-010: README setup instructions
- REQ-DOC-020: README project overview
- REQ-DOC-030: README architecture notes

**Complexity Indicators:**
- [SIMPLE] Demo data/route, error boundaries, SEO, privacy page, README sections, API key docs
- [MEDIUM] Design polish pass, performance optimization, accessibility validation, responsive design review

**Domain Hints:**
- UI-heavy: Design polish, Stripe aesthetic refinement, visual consistency
- Performance-sensitive: Code splitting, lazy loading, Lighthouse optimization
- Documentation: README clarity, architecture notes, setup instructions

**Entry Criteria:**
- Sprints 1-3 complete and merged
- Example AI-generated analysis available for demo (from Sprint 2 testing)
- All core features functional

**Exit Criteria:**
- Demo accessible from landing page "View Demo" button
- Demo uses pre-generated analysis (no API calls)
- Demo layout identical to live individual results
- Stripe-inspired design consistent and polished across all pages
- Lighthouse Performance >90
- Lighthouse Accessibility >90
- Lighthouse Best Practices >90
- Lighthouse SEO >90
- No console errors or warnings in production build
- README complete with setup, overview, architecture notes
- Privacy policy explains localStorage-only approach
- Loading states on all async routes
- Production build succeeds (`npm run build`)
- All quality gates from previous sprints re-validated

**Quality Gates:**
- Visual consistency audit: all pages match design system
- Lighthouse CI passing (>90 all categories)
- All user flows tested end-to-end (Individual, Team, Demo)
- Accessibility audit: WCAG AA compliance verified
- TypeScript strict mode, zero errors
- ESLint zero warnings
- No dead links (all nav functional)
- README instructions validated (fresh install test)
- .env.example provided with clear instructions
- Production build size analyzed and optimized

**Token Estimate:** Medium (polish and documentation, less logic)

**Dependencies:**
- Sprints 1-3 (all core features)

**Risks:**
- Lighthouse score below 90: mitigate with performance budget, iterative optimization
- Design inconsistencies: mitigate with design system audit, component review
- README outdated: mitigate with step-by-step validation during sprint

---

## Testing Strategy

### Unit Tests
- Scoring algorithm (all 15 profiles, edge cases)
- File validation logic (valid/invalid JSON, team size rules)
- Data aggregation (team statistics calculation)

### Integration Tests
- localStorage persistence (save/restore flow)
- JSON export/import (round-trip validation)
- API error handling (mock failures)

### End-to-End Flows
- Individual assessment: start -> answer -> results -> export
- Team analysis: upload -> validate -> analyze -> report
- Demo: land -> view -> navigate away

### Accessibility Tests
- Keyboard navigation (all interactive elements)
- Screen reader compatibility (ARIA labels, landmarks)
- Color contrast (WCAG AA compliance)

### Performance Tests
- Lighthouse CI (>90 all categories)
- Bundle size analysis (code splitting verification)
- API streaming (progress feedback)

### Browser Compatibility
- Chrome/Edge (primary)
- Firefox (secondary)
- Safari (secondary)
- Mobile Safari (responsive validation)

---

## Quality Standards

### Code Quality
- TypeScript strict mode enforced
- ESLint with Next.js recommended rules
- Consistent formatting (Prettier optional)
- Meaningful variable/function names
- Comments for complex logic only

### Accessibility
- WCAG AA compliance
- Keyboard navigation complete
- ARIA labels on all inputs/buttons
- Focus management for modals/overlays
- Color contrast 4.5:1 (text), 3:1 (interactive)

### Performance
- Lighthouse Performance >90
- Code splitting for routes and heavy libraries
- Lazy loading for charts
- Streaming for AI responses
- Optimized images (if added)

### Security
- API key in .env.local (never committed)
- .gitignore configured
- No sensitive data in localStorage
- XSS prevention (React default escaping)

### UX
- No blank screens (loading states everywhere)
- Error messages user-friendly
- Progress indicators for async operations
- Confirmation for destructive actions
- Responsive on all devices

---

## Data Flow Architecture

### Individual Assessment Flow
1. User starts test -> load disc_complete.json
2. User answers 24 questions -> auto-save to localStorage
3. User submits -> calculate D-I-S-C scores
4. Map to closest of 15 profile patterns
5. Load RAG context (theory markdown + example analyses)
6. Call Claude API with RAG + exact scores -> stream response
7. Render results page: analysis + charts
8. Save completed results to localStorage
9. User exports JSON or prints report

### Team Analysis Flow
1. User uploads 2-7 JSON files
2. Validate each file structure
3. Enforce size rules (block <2 or >7, warn 2/6-7)
4. Aggregate D-I-S-C scores across team
5. Calculate team statistics
6. Call Claude API with team data -> stream response
7. Render team report: aggregate charts + individual cards + AI insights
8. Save team results to localStorage
9. User prints team report

### Demo Flow
1. User clicks "View Demo" on landing
2. Load static demo data (pre-generated analysis)
3. Render results page with demo data
4. User can print/export demo (clearly labeled)

---

## Environment Setup

### Required Environment Variables
```
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-...
```

### .env.example Template
```
# Claude API Key (Anthropic)
# Get your key at: https://console.anthropic.com/
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_key_here
```

### Security Notes (v1)
- Client-side API key acceptable for portfolio showcase
- Document migration path to API routes for production
- README warns about API key exposure in client bundle
- Rate limiting handled by Anthropic, not enforced client-side

---

## Deployment Considerations (Out of Sprint 0)

### Hosting Options
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Self-hosted (Docker)

### Build Process
- `npm run build` for production build
- Static export NOT suitable (needs API routes for future)
- Environment variables configured in hosting platform

### Monitoring
- Vercel Analytics (if using Vercel)
- Google Analytics (optional, privacy considerations)
- Sentry for error tracking (optional)

---

## Future Evolution (Post-v1)

### API Route Migration
- Move Claude API calls to Next.js API routes
- Implement rate limiting
- Add request validation
- Secure API key server-side

### Backend Database
- Replace localStorage with PostgreSQL/MongoDB
- User accounts with authentication
- Persistent team dashboards
- Saved analysis history

### Advanced Features
- Multi-language support (i18n)
- Email reports
- Team collaboration features
- Custom profile pattern creation
- Admin panel for content management

### Internationalization
- Extract strings to locale files
- Translate UI and analysis templates
- Support for RTL languages

---

## Success Metrics

### Portfolio Value
- Modern, professional aesthetic achieved
- AI capability clearly demonstrated
- Clean, maintainable codebase
- Strong technical showcase

### Functional Completeness
- All three modes functional (Individual, Team, Demo)
- AI generates genuine insights (not templates)
- Privacy-first design implemented
- Responsive across devices

### Technical Quality
- Lighthouse >90 all categories
- TypeScript strict, zero errors
- ESLint clean
- Accessibility compliant
- Unit tests passing

### User Experience
- Fast, responsive interactions
- Clear, professional tone
- No confusing states
- Helpful error messages

---

## Appendix: Requirement Coverage

### Sprint 1 Requirements
REQ-INFRA-010, REQ-INFRA-020, REQ-INFRA-030, REQ-INFRA-040, REQ-INFRA-050, REQ-LAND-010, REQ-LAND-020, REQ-LAND-030, REQ-LAND-040, REQ-LAND-050

### Sprint 2 Requirements
REQ-IND-010 through REQ-IND-150, REQ-INFRA-060, REQ-INFRA-070, REQ-QUALITY-040

### Sprint 3 Requirements
REQ-TEAM-010 through REQ-TEAM-120, REQ-QUALITY-050

### Sprint 4 Requirements
REQ-DEMO-010, REQ-DEMO-020, REQ-DEMO-030, REQ-QUALITY-010, REQ-QUALITY-020, REQ-QUALITY-030, REQ-QUALITY-060, REQ-QUALITY-070, REQ-QUALITY-080, REQ-PRIVACY-010, REQ-PRIVACY-020, REQ-PRIVACY-030, REQ-DOC-010, REQ-DOC-020, REQ-DOC-030

### Total Coverage
All 93 requirements from PRD.md covered across 4 sprints.
