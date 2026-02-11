# Sprint 2: Individual Assessment & AI Analysis Engine

**Created:** 2026-02-11
**Status:** Ready for Execution

---

## Sprint Overview

**Goal:** Fully functional individual DISC test with AI-generated personalized analysis

**Scope:**
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

**Entry Criteria:**
- Sprint 1 complete and merged
- Claude API key obtained and documented
- `/disc-data/disc_assessment.json` readable
- `/disc-data` markdown theory files (~1.1MB) accessible
- `/disc-data/disc_ai_analysis_framework.json` readable

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

**Dependencies:** Sprint 1 (routes, design system)

---

## Features Breakdown

### Feature 1: Assessment Instrument & UI [MEDIUM]

**Domain Hints:** UI-heavy, data-loading, validation, state management

**Description:**
Load 24-question DISC assessment from JSON, render all questions on single scrollable page with forced-choice interface, validate answers, persist in-progress state to localStorage, provide progress indicator.

**Acceptance Criteria:**
- [ ] Load `disc-data/disc_assessment.json` successfully
- [ ] Display all 24 questions on single page (scrollable)
- [ ] Implement forced-choice interface (Most/Least selection)
- [ ] Validate answer completeness (all 24 answered)
- [ ] Progress indicator shows completion percentage
- [ ] In-progress answers persist to localStorage
- [ ] Restore in-progress assessment on page reload
- [ ] Loading states during data fetch
- [ ] TypeScript types for assessment data structure

**Recommended Model:** Sonnet
**Rationale:** Medium complexity with React state management, localStorage integration, and validation logic. Requires balanced judgment for UX patterns.

---

### Feature 2: DISC Scoring Engine [MEDIUM]

**Domain Hints:** Data-processing, algorithm implementation, unit testing

**Description:**
Implement DISC scoring algorithm that calculates D/I/S/C dimensions (0-24 each) from 24 forced-choice answers, maps to closest of 15 DISC patterns, includes comprehensive unit tests.

**Acceptance Criteria:**
- [ ] Scoring algorithm calculates D, I, S, C scores (0-24 range)
- [ ] Profile pattern mapping identifies closest of 15 patterns
- [ ] TypeScript strict types for scoring functions
- [ ] Unit tests cover all 15 profiles
- [ ] Unit tests cover edge cases (tied scores, extreme profiles)
- [ ] Pure functions (no side effects) for testability
- [ ] Documented scoring logic in code comments

**Recommended Model:** Sonnet
**Rationale:** Algorithm requires precision and testing rigor. Medium complexity with clear requirements but needs careful implementation and comprehensive test coverage.

---

### Feature 3: Results Visualization [MEDIUM]

**Domain Hints:** UI-heavy, charting library, responsive design, export functionality

**Description:**
Build results page displaying DISC scores with bar chart and radar chart using Recharts, implement JSON export and print functionality, follow design system aesthetic.

**Acceptance Criteria:**
- [ ] Results page layout with profile summary
- [ ] Bar chart visualizing D/I/S/C scores (Recharts)
- [ ] Radar chart showing profile pattern (Recharts)
- [ ] DISC accent colors integrated in charts
- [ ] JSON export downloads valid assessment result
- [ ] Print functionality with optimized layout (no header/footer)
- [ ] Responsive charts (mobile/tablet/desktop)
- [ ] Loading state while generating results
- [ ] Accessibility: chart text alternatives, ARIA labels

**Recommended Model:** Sonnet
**Rationale:** Recharts integration and responsive design require balanced implementation. Medium complexity with visualization library and accessibility considerations.

---

### Feature 4: AI Analysis Integration [COMPLEX]

**Domain Hints:** AI-heavy, RAG pattern, security-critical, streaming UI, error handling, prompt engineering

**Description:**
Integrate Claude API with RAG pattern loading DISC theory from `/disc-data`, generate personalized analysis based on exact scores, stream response to UI, handle errors gracefully. **Critical showcase feature.**

**Acceptance Criteria:**
- [ ] Claude API client configured with .env.local key
- [ ] RAG: Load relevant DISC theory files into context
- [ ] Prompt engineering: Include exact scores, request personalization
- [ ] Streaming UI: Display analysis as it generates
- [ ] AI generates UNIQUE insights (not template matching)
- [ ] Error handling: Network failures, invalid API key, rate limits
- [ ] Retry mechanism for transient failures
- [ ] Error boundaries prevent crash
- [ ] API key not exposed in client bundle logs
- [ ] Timeout handling (30s maximum)

**Recommended Model:** Opus
**Rationale:** COMPLEX feature requiring security awareness, prompt engineering expertise, streaming implementation, and robust error handling. Critical showcase feature demanding highest capability.

---

### Feature 5: Data Persistence [SIMPLE]

**Domain Hints:** localStorage, data serialization

**Description:**
Persist in-progress assessments and completed results to localStorage, handle quota exceeded errors, provide clear data model.

**Acceptance Criteria:**
- [ ] In-progress answers saved to localStorage on change
- [ ] Completed results saved with timestamp
- [ ] Restore functionality on page load
- [ ] Handle localStorage quota exceeded gracefully
- [ ] Clear localStorage option (reset assessment)
- [ ] TypeScript types for persisted data structure

**Recommended Model:** Haiku
**Rationale:** Simple localStorage operations with clear requirements. Well-defined CRUD pattern.

---

## Task Breakdown Suggestions

### Feature 1: Assessment Instrument & UI

**Task 1.1: Explore Assessment Data & UI Patterns**
- Agent type: frontend-engineer
- Model: sonnet
- Estimated tokens: ~30k
- Purpose: Understand assessment data structure, identify UI patterns from design system
- Outputs: Data structure analysis, UI component plan

**Task 1.2: Implement Assessment UI**
- Agent type: frontend-engineer
- Model: sonnet
- Estimated tokens: ~50k
- Purpose: Build question display, forced-choice interface, validation, progress indicator
- Dependencies: Task 1.1 complete
- Outputs: Working assessment page at `/test`

---

### Feature 2: DISC Scoring Engine

**Task 2.1: Explore Scoring Requirements**
- Agent type: backend-engineer
- Model: sonnet
- Estimated tokens: ~25k
- Purpose: Understand scoring algorithm from DISC data, plan pure function architecture
- Outputs: Scoring algorithm design, test cases identified

**Task 2.2: Implement Scoring Engine**
- Agent type: backend-engineer
- Model: sonnet
- Estimated tokens: ~40k
- Purpose: Build scoring functions, pattern mapping, comprehensive unit tests
- Dependencies: Task 2.1 complete
- Outputs: `/lib/scoring.ts` with tests

---

### Feature 3: Results Visualization

**Task 3.1: Explore Recharts & Design System Integration**
- Agent type: frontend-engineer
- Model: sonnet
- Estimated tokens: ~30k
- Purpose: Research Recharts API, plan chart components with DISC colors
- Outputs: Chart component designs, responsive strategy

**Task 3.2: Implement Results Page**
- Agent type: frontend-engineer
- Model: sonnet
- Estimated tokens: ~50k
- Purpose: Build results layout, bar/radar charts, export/print functionality
- Dependencies: Task 3.1, Task 2.2 (scoring complete)
- Outputs: Results page with visualizations

---

### Feature 4: AI Analysis Integration

**Task 4.1: Explore RAG Architecture & Security**
- Agent type: backend-engineer
- Model: opus
- Estimated tokens: ~40k
- Purpose: Research Claude API, RAG pattern, security best practices, prompt engineering
- Outputs: API client architecture, RAG strategy, prompt templates

**Task 4.2: Implement AI Integration**
- Agent type: backend-engineer
- Model: opus
- Estimated tokens: ~70k
- Purpose: Build Claude API client, RAG loading, streaming UI, error handling
- Dependencies: Task 4.1 complete
- Outputs: AI analysis generation with streaming

**Task 4.3: Test & Validate AI Personalization**
- Agent type: test-engineer
- Model: sonnet
- Estimated tokens: ~40k
- Purpose: Verify AI uniqueness, error scenarios, edge cases
- Dependencies: Task 4.2 complete
- Outputs: AI validation report

---

### Feature 5: Data Persistence

**Task 5.1: Implement localStorage Persistence**
- Agent type: code-engineer
- Model: haiku
- Estimated tokens: ~20k
- Purpose: Build persistence layer for in-progress and completed assessments
- Dependencies: Task 1.2 (assessment UI exists)
- Outputs: localStorage utilities in `/lib/storage.ts`

---

## PM Orchestrator Notes

**Delegation Strategy:**
- **Round 1 (parallel):** Task 1.1, Task 2.1, Task 3.1, Task 4.1 (all exploration tasks)
- **Round 2 (parallel):** Task 1.2, Task 2.2 (assessment UI & scoring can proceed independently)
- **Round 3 (sequential):** Task 3.2 (depends on scoring), Task 5.1 (depends on assessment UI)
- **Round 4 (sequential):** Task 4.2 (AI integration - needs scoring complete)
- **Round 5 (sequential):** Task 4.3 (AI validation - must run after 4.2)

**Coordination Points:**
- Scoring engine (Task 2.2) must complete before results page (Task 3.2) and AI integration (Task 4.2)
- Assessment UI (Task 1.2) must complete before persistence (Task 5.1)
- AI integration (Task 4.2) is critical path - allocate Opus and monitor closely

**Parallel vs Sequential:**
- **Exploration phase (Round 1):** All exploration tasks run in parallel to gather information
- **Core implementation (Round 2-3):** Independent features (assessment, scoring, visualization) can overlap
- **AI integration (Round 4-5):** Sequential due to complexity and testing needs

**Risk Factors:**
- **AI RAG context size:** Monitor token usage, may need selective data loading
- **AI template responses:** Critical risk - validate personalization with multiple runs
- **API rate limiting:** Implement exponential backoff, user-friendly error messages
- **Recharts bundle size:** Use lazy loading, code splitting if needed
- **Security:** .env.local key handling, no client-side exposure in logs

**Model Allocation Summary:**
- Haiku tasks: 1 → Total: ~20k tokens
- Sonnet tasks: 7 → Total: ~275k tokens (exploration + implementation + validation)
- Opus tasks: 2 → Total: ~110k tokens (AI critical path)
- PM coordination: ~15k tokens
- Quality verification: ~10k tokens
- **Total sprint estimate:** ~430k tokens

---

## Quality Gates

- [ ] Scoring algorithm unit tested with known inputs and edge cases
- [ ] AI produces personalized insights verified (run same scores twice, compare outputs)
- [ ] Streaming UI provides feedback (not blank screen during generation)
- [ ] Error handling tested (disconnect network, invalid API key, rate limit)
- [ ] Accessibility: keyboard nav, ARIA labels, focus management
- [ ] TypeScript strict mode, zero errors
- [ ] ESLint zero warnings
- [ ] localStorage quota exceeded handled gracefully

---

## Files to Create/Modify

**New files:**
- `app/test/page.tsx` - Assessment page
- `components/assessment/QuestionCard.tsx` - Question display component
- `components/assessment/ProgressBar.tsx` - Completion indicator
- `lib/assessment/loader.ts` - Load assessment data
- `lib/assessment/validator.ts` - Answer validation
- `lib/scoring/algorithm.ts` - DISC scoring engine
- `lib/scoring/pattern-mapping.ts` - 15 pattern matching
- `lib/scoring/algorithm.test.ts` - Unit tests
- `lib/ai/claude-client.ts` - Claude API client
- `lib/ai/rag-loader.ts` - RAG context builder
- `lib/ai/prompt-templates.ts` - Prompt engineering
- `lib/storage/persistence.ts` - localStorage utilities
- `app/test/results/page.tsx` - Results page
- `components/results/ScoreChart.tsx` - Bar chart (Recharts)
- `components/results/RadarChart.tsx` - Radar chart (Recharts)
- `components/results/ProfileSummary.tsx` - Profile display
- `components/results/AIAnalysis.tsx` - Streaming AI content
- `.env.example` - Update with NEXT_PUBLIC_ANTHROPIC_API_KEY

**Packages to install:**
- `npm install @anthropic-ai/sdk` - Claude API client
- `npm install recharts` - Charts library
- `npm install @testing-library/react` - Unit testing (if not installed)
- `npm install vitest` - Test runner (if not using Jest)

---

## Strategic Sprint Tasks

From IMPLEMENTATION_PLAN.md (for reference):

- [ ] REQ-IND-010: Assessment instrument data loading
- [ ] REQ-IND-020: Single-page question display
- [ ] REQ-IND-030: Question answer interface
- [ ] REQ-IND-040: Answer validation
- [ ] REQ-IND-050: DISC scoring algorithm
- [ ] REQ-IND-060: Profile pattern mapping
- [ ] REQ-IND-070: AI RAG integration
- [ ] REQ-IND-080: AI personalized generation
- [ ] REQ-IND-090: Results visualization (charts)
- [ ] REQ-IND-100: Results page layout
- [ ] REQ-IND-110: JSON export
- [ ] REQ-IND-120: Print/save functionality
- [ ] REQ-IND-130: localStorage persistence (in-progress)
- [ ] REQ-IND-140: localStorage persistence (completed results)
- [ ] REQ-IND-150: Error handling for API failures
- [ ] REQ-INFRA-060: Error boundaries
- [ ] REQ-INFRA-070: Loading states
- [ ] REQ-QUALITY-040: Unit tests for scoring logic

---

## Token Budget Tracking

**Estimates:**
- PM Orchestrator coordination: ~15k tokens
- Task file creation: ~5k tokens
- Exploration tasks (Round 1): ~125k tokens
- Implementation tasks (Round 2-4): ~230k tokens
- Testing tasks (Round 5): ~40k tokens
- Quality verification: ~10k tokens
- Buffer (15%): ~65k tokens
- **Total: ~490k tokens**

**Actuals:** (Fill in during/after sprint)
- Actual PM tokens: [TBD]
- Actual sub-agent tokens: [TBD]
- Variance: [TBD]

**Learnings for next sprint:**
- [To be filled after sprint completion]

---
