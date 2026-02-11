# Task 01: Explore Assessment Data & UI Patterns

**Agent Type:** frontend-engineer
**Model:** sonnet
**Estimated Tokens:** ~30k

---

## Context

**Sprint 2A Goal:** Core Assessment Flow (Features 1, 2, 5)

**Why this task exists:**
Sprint 2 implements the individual DISC test, starting with the assessment UI. Before building, we need to understand the data structure and identify UI patterns from the existing design system.

**What came before:**
- Sprint 1 established the landing page with EntryCard components demonstrating the design system
- DISC colors and typography are defined in tailwind.config.ts
- Assessment data lives in `/disc-data/disc_assessment.json` with 24 forced-choice questions

**How it fits:**
This exploration task provides the foundation for Task 02 (implement assessment UI). The frontend-engineer will analyze the assessment data structure and plan component architecture following established patterns.

---

## Objective

Understand assessment data structure from `disc_assessment.json`, identify UI component patterns from existing design system, and document component architecture plan for the 24-question assessment interface.

---

## Steps

1. **Read and analyze assessment data structure**
   - Read `/Users/thomas/ClaudeCode/coding/disc-website/disc-data/disc_assessment.json`
   - Understand question format: 24 questions, each with 4 options (A/B/C/D)
   - Note forced-choice interface requirement: user selects "Most like me" and "Least like me"
   - Identify scoring_key structure mapping answers to D/I/S/C dimensions

2. **Review existing design system patterns**
   - Read `/Users/thomas/ClaudeCode/coding/disc-website/app/page.tsx` for Server Component pattern
   - Read `/Users/thomas/ClaudeCode/coding/disc-website/components/landing/EntryCard.tsx` for component structure
   - Read `/Users/thomas/ClaudeCode/coding/disc-website/tailwind.config.ts` for DISC colors (disc-d, disc-i, disc-s, disc-c)
   - Note use of `cn()` utility from `/lib/utils.ts` for conditional classnames

3. **Document component architecture plan**
   - Propose component breakdown:
     - QuestionCard: Display single question with 4 options and Most/Least selection
     - ProgressBar: Show completion status (X of 24 questions answered)
     - Assessment page: Container orchestrating all questions on single scrollable page
   - Identify state management needs:
     - Track answers for all 24 questions (Most/Least pairs)
     - Validation logic (ensure all questions answered before submission)
     - localStorage persistence (save in-progress answers)
   - Document TypeScript type definitions needed:
     - Assessment data structure
     - Answer state structure
     - Question/option types

4. **Plan validation logic**
   - Define completeness check: all 24 questions must have both Most and Least selected
   - Identify edge cases: same option selected for Most and Least (invalid)
   - Plan error messaging approach

5. **Create exploration findings document**
   - Document findings in `/Users/thomas/ClaudeCode/coding/disc-website/docs/sprints/sprint-2/tasks/task-01-findings.md`
   - Include:
     - Data structure summary
     - Component architecture diagram (text-based)
     - TypeScript type definitions (draft)
     - State management approach
     - Validation rules
     - Design system patterns to follow

---

## Acceptance Criteria

- [ ] Assessment data structure fully understood and documented
- [ ] Component architecture plan documented with clear responsibilities
- [ ] TypeScript type definitions drafted for assessment data and answer state
- [ ] Validation rules clearly defined
- [ ] Findings document created with actionable implementation details for Task 02
- [ ] Design system patterns identified and documented for consistency

---

## Verification

```bash
# Verify findings document created
ls -la /Users/thomas/ClaudeCode/coding/disc-website/docs/sprints/sprint-2/tasks/task-01-findings.md
```

---

## Patterns to Follow

**Server Component Pattern:**
- Reference: `/Users/thomas/ClaudeCode/coding/disc-website/app/page.tsx`
- Default to Server Components, use 'use client' only when needed for state/effects

**Component Structure:**
- Reference: `/Users/thomas/ClaudeCode/coding/disc-website/components/landing/EntryCard.tsx`
- Props typed with TypeScript interfaces
- cn() utility for conditional classnames
- Generous spacing (p-8, p-12), shadow-sm with hover:shadow-lg

**DISC Colors:**
- Reference: `/Users/thomas/ClaudeCode/coding/disc-website/tailwind.config.ts`
- Use text-disc-[d|i|s|c], bg-disc-[d|i|s|c], border-disc-[d|i|s|c]
- Color map pattern for dynamic selection (see EntryCard borderColorMap)

**TypeScript Types:**
- Use explicit interface definitions
- Export types from component files or create shared types file

---

## Notes

**Critical Requirements:**
- REQ-IND-010: Assessment instrument data loading
- REQ-IND-020: Single-page question display
- REQ-IND-030: Question answer interface
- REQ-IND-040: Answer validation

**Data Source:**
- `/disc-data/disc_assessment.json` contains 24 questions with metadata and scoring key
- Questions have id (1-24) and options object with A/B/C/D keys
- Forced-choice format: user picks Most and Least from 4 options

**UI Requirement:**
- All 24 questions on single scrollable page (not paginated)
- Progress indicator to show completion status
- Clear visual feedback for selection state

**State Management:**
- Client-side state needed (use 'use client' directive)
- localStorage persistence for in-progress answers
- Consider React useState or useReducer for answer tracking

**Accessibility Considerations:**
- Keyboard navigation for option selection
- ARIA labels for screen readers
- Focus management for better UX

This is an exploration task - focus on understanding and planning, not implementing code.
