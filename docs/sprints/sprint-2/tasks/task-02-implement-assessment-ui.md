# Task 02: Implement Assessment UI

**Agent Type:** frontend-engineer
**Model:** sonnet
**Estimated Tokens:** ~50k

---

## Context

**Sprint 2A Goal:** Core Assessment Flow (Features 1, 2, 5)

**Why this task exists:**
Build the 24-question DISC assessment interface that displays all questions on a single scrollable page with forced-choice selection (Most/Least), validation, and progress tracking.

**What came before:**
- Task 01 explored assessment data structure and planned component architecture
- Sprint 1 established design system with DISC colors and component patterns
- `/disc-data/disc_assessment.json` contains 24 questions ready to load

**How it fits:**
This task creates the core user-facing assessment interface. Task 05 will add localStorage persistence to this UI. Task 04 (scoring engine) will consume the answer data structure this task produces.

**Dependencies:**
- Task 01 complete (exploration findings available)

---

## Objective

Build working assessment page at `/test` with 24 questions displayed on single scrollable page, forced-choice interface (Most/Least selection), answer validation, and progress indicator, following design system patterns from Sprint 1.

---

## Steps

1. **Create TypeScript type definitions**
   - Create `/Users/thomas/ClaudeCode/coding/disc-website/lib/assessment/types.ts`
   - Define types based on `disc_assessment.json` structure:
     - `AssessmentData` (metadata, questions, scoring_key)
     - `Question` (id, options)
     - `QuestionOptions` (A, B, C, D string values)
     - `AnswerState` (question id → {most: string | null, least: string | null})
     - `ValidationResult` (isComplete, missingQuestions array)

2. **Create assessment data loader**
   - Create `/Users/thomas/ClaudeCode/coding/disc-website/lib/assessment/loader.ts`
   - Implement `loadAssessmentData()` function that reads and parses `disc_assessment.json`
   - Return typed `AssessmentData` object
   - Handle file read errors gracefully

3. **Create answer validation utility**
   - Create `/Users/thomas/ClaudeCode/coding/disc-website/lib/assessment/validator.ts`
   - Implement `validateAnswers(answers: AnswerState): ValidationResult`
   - Check all 24 questions have both Most and Least selected
   - Validate Most !== Least for each question
   - Return list of incomplete/invalid question IDs

4. **Build ProgressBar component**
   - Create `/Users/thomas/ClaudeCode/coding/disc-website/components/assessment/ProgressBar.tsx`
   - Props: `completed: number, total: number`
   - Display: "X of 24 questions answered" with progress bar visual
   - Use DISC color accent (disc-c blue for progress fill)
   - Follow design system: shadow-sm, rounded corners, generous padding

5. **Build QuestionCard component**
   - Create `/Users/thomas/ClaudeCode/coding/disc-website/components/assessment/QuestionCard.tsx`
   - Props: `questionId: number, options: QuestionOptions, mostSelected: string | null, leastSelected: string | null, onSelectMost: (option: string) => void, onSelectLeast: (option: string) => void`
   - Layout: Question number at top, 4 options in grid, Most/Least columns for selection
   - Visual feedback: selected state with DISC color accents, disabled state when invalid selection
   - Use cn() utility for conditional styling
   - Accessibility: ARIA labels, keyboard navigation (tab through options, space/enter to select)

6. **Build assessment page**
   - Create `/Users/thomas/ClaudeCode/coding/disc-website/app/test/page.tsx`
   - Mark as Client Component ('use client') for state management
   - Load assessment data using loader utility
   - Manage answer state with useState (Map<number, {most: string | null, least: string | null}>)
   - Render ProgressBar at top (sticky position)
   - Render all 24 QuestionCard components in scrollable container
   - Add "Submit Assessment" button at bottom (disabled until validation passes)
   - Implement validation on submit attempt
   - Show error messages for incomplete/invalid answers
   - Page metadata: title "DISC Assessment", description "Complete 24-question personality assessment"

7. **Add loading states**
   - Show loading spinner while assessment data loads
   - Use Tailwind spinner animation
   - Follow design system: centered, with "Loading assessment..." text

8. **Implement basic error handling**
   - Handle data loading failures (file not found, JSON parse error)
   - Display user-friendly error message with option to retry
   - Use error boundary pattern (wrap in try-catch for initial load)

9. **Verify design system consistency**
   - Use Container component from `/components/layout/Container.tsx`
   - Follow spacing patterns: p-8 for cards, p-12 for sections
   - Use shadow-sm for cards, shadow-lg on hover
   - Implement smooth transitions (duration-200)
   - DISC color accents for interactive elements

10. **Test functionality manually**
    - Start dev server: `npm run dev`
    - Navigate to http://localhost:3000/test
    - Verify all 24 questions render
    - Test Most/Least selection for several questions
    - Verify progress indicator updates
    - Test validation: attempt submit with incomplete answers
    - Verify error messages display correctly

---

## Acceptance Criteria

- [ ] Assessment page accessible at `/test` route
- [ ] All 24 questions from `disc_assessment.json` render on single scrollable page
- [ ] Forced-choice interface allows Most/Least selection for each question
- [ ] Cannot select same option for both Most and Least (validation enforced)
- [ ] Progress indicator shows "X of 24 questions answered" with visual progress bar
- [ ] Submit button disabled until all questions validly answered
- [ ] Validation errors display clearly with question numbers
- [ ] Loading state shows while data fetches
- [ ] Error handling for data loading failures
- [ ] TypeScript strict mode with no errors
- [ ] Design system patterns followed (spacing, colors, shadows, transitions)
- [ ] Keyboard navigation works (tab through options, select with space/enter)
- [ ] ARIA labels present for accessibility

---

## Verification

```bash
# Run linter
npm run lint

# Build check
npm run build

# Manual testing
npm run dev
# Navigate to http://localhost:3000/test
# Complete assessment flow, verify all criteria
```

---

## Patterns to Follow

**Page Structure (Server Component transitioning to Client Component):**
- Reference: `/Users/thomas/ClaudeCode/coding/disc-website/app/page.tsx`
- Use 'use client' directive at top for state management
- Import Container from `@/components/layout/Container`
- Export metadata for SEO

**Component Pattern:**
- Reference: `/Users/thomas/ClaudeCode/coding/disc-website/components/landing/EntryCard.tsx`
- TypeScript interface for props
- cn() utility for conditional classnames
- Generous padding and smooth transitions

**DISC Colors:**
- Reference: `/Users/thomas/ClaudeCode/coding/disc-website/tailwind.config.ts`
- Progress bar: bg-disc-c (blue) for fill
- Selected state: border-disc-c or bg-disc-c/10 for subtle highlight
- Error state: border-red-500 or text-red-600

**State Management Pattern:**
```tsx
const [answers, setAnswers] = useState<Map<number, {most: string | null, least: string | null}>>(new Map())

const handleSelectMost = (questionId: number, option: string) => {
  setAnswers(prev => new Map(prev).set(questionId, {
    most: option,
    least: prev.get(questionId)?.least ?? null
  }))
}
```

**Validation Pattern:**
```tsx
const validateAnswers = (): ValidationResult => {
  const missing: number[] = []
  for (let i = 1; i <= 24; i++) {
    const answer = answers.get(i)
    if (!answer?.most || !answer?.least || answer.most === answer.least) {
      missing.push(i)
    }
  }
  return { isComplete: missing.length === 0, missingQuestions: missing }
}
```

---

## Notes

**Critical Requirements:**
- REQ-IND-010: Assessment instrument data loading
- REQ-IND-020: Single-page question display (all 24 questions, scrollable)
- REQ-IND-030: Question answer interface (forced-choice Most/Least)
- REQ-IND-040: Answer validation (completeness check)
- REQ-INFRA-070: Loading states

**Data Structure:**
- `/disc-data/disc_assessment.json` has questions array with id and options
- Options object has A/B/C/D keys with descriptive strings
- Forced-choice: user picks one Most and one Least from 4 options

**UI/UX Details:**
- All questions on single page (no pagination)
- Sticky progress bar at top for persistent feedback
- Clear visual distinction between Most and Least columns
- Disabled state when same option selected for both (prevent invalid state)
- Submit button at bottom, enabled only when valid

**Accessibility:**
- Use semantic HTML (fieldset for question groups, radio buttons for options)
- ARIA labels: "Most like me" and "Least like me" for each option group
- Keyboard navigation: tab through options, space/enter to select
- Focus indicators visible (ring-2 ring-blue-500)

**Performance:**
- Client Component needed for state, but lazy load if possible
- Consider virtualization if performance issues (unlikely with 24 questions)

**State Management:**
- useState for answer tracking (Map for O(1) lookup)
- No need for complex state management (Redux/Zustand) at this stage
- localStorage persistence added in Task 05 (not this task)

**No localStorage persistence yet:**
This task focuses on UI and validation. Task 05 will add persistence layer.
