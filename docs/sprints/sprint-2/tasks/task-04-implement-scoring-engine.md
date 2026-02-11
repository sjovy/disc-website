# Task 04: Implement Scoring Engine

**Agent Type:** backend-engineer
**Model:** sonnet
**Estimated Tokens:** ~40k

---

## Context

**Sprint 2A Goal:** Core Assessment Flow (Features 1, 2, 5)

**Why this task exists:**
Implement the DISC scoring engine that transforms 24 forced-choice answers into D/I/S/C dimension scores (0-24 each) and maps to one of 15 DISC personality patterns. This is the core logic that powers the assessment.

**What came before:**
- Task 03 explored scoring algorithm and pattern determination logic
- Task 02 created assessment UI with answer state structure
- `/disc-data/disc_assessment.json` contains scoring_key for dimension mapping

**How it fits:**
The scoring engine is used by the results page (Task 3.2, Sprint 2B) and AI integration (Task 4.2, Sprint 2B). It must be pure, testable, and handle all 15 patterns correctly.

**Dependencies:**
- Task 03 complete (exploration findings available)

---

## Objective

Build pure-function scoring engine in `/lib/scoring/` that calculates D/I/S/C scores from assessment answers and maps to closest of 15 DISC patterns, with comprehensive unit tests covering all patterns and edge cases.

---

## Steps

1. **Create TypeScript type definitions**
   - Create `/Users/thomas/ClaudeCode/coding/disc-website/lib/scoring/types.ts`
   - Define types:
     - `Dimension = 'D' | 'I' | 'S' | 'C'`
     - `DimensionScores = { D: number, I: number, S: number, C: number }`
     - `DISCPattern = { name: string, primary: Dimension, secondary?: Dimension, description: string }`
     - `ScoringKey = Record<string, Record<string, Dimension>>` (question ID → option → dimension)
     - `AnswerState = Map<number, { most: string, least: string }>` (from Task 02)
   - Export all types for use in other modules

2. **Implement dimension score calculation**
   - Create `/Users/thomas/ClaudeCode/coding/disc-website/lib/scoring/calculate-scores.ts`
   - Implement `calculateDimensionScores(answers: AnswerState, scoringKey: ScoringKey): DimensionScores`
   - Algorithm:
     - Initialize scores: { D: 0, I: 0, S: 0, C: 0 }
     - Iterate through all 24 answers
     - For each answer, look up dimension from scoringKey using question ID and "most" option
     - Increment that dimension's score by 1
     - Return final scores
   - Pure function: no side effects, no mutations of input
   - Handle missing answers gracefully (skip question if not answered)

3. **Implement pattern determination logic**
   - Create `/Users/thomas/ClaudeCode/coding/disc-website/lib/scoring/determine-pattern.ts`
   - Implement `determinePattern(scores: DimensionScores): DISCPattern`
   - Algorithm (based on Task 03 findings):
     - Define MIDLINE_THRESHOLD = 16
     - Identify high dimensions (scores >= 16)
     - Switch based on count of high dimensions:
       - 0 high: Return "Balanced" (default for flat profiles)
       - 1 high: Return pure style (Developer, Promoter, Specialist, Objective Thinker)
       - 2 high: Determine combination pattern (D+I, I+S, etc.)
       - 3 high: Check for Investigator (S+D+C) or Practitioner (C+I+S)
       - 4 high: Return highest score as primary (tie-breaker: D > I > S > C)
   - Helper functions:
     - `getHighDimensions(scores: DimensionScores, threshold: number): Dimension[]`
     - `getPrimaryDimension(scores: DimensionScores): Dimension`
     - `getSecondaryDimension(scores: DimensionScores, exclude: Dimension): Dimension`
     - `calculateGap(score1: number, score2: number): number`
   - D+I special case logic:
     - If D and I both high, calculate gap = |D - I|
     - Gap <= 3: Inspirational pattern
     - Gap > 3: Results-Oriented pattern (if D > I) or Persuader (if I > D)

4. **Create pattern definitions**
   - Create `/Users/thomas/ClaudeCode/coding/disc-website/lib/scoring/pattern-definitions.ts`
   - Define const object mapping pattern names to metadata:
     - All 15 patterns: Developer, Promoter, Specialist, Objective Thinker, Results-Oriented, Inspirational, Creative, Persuader, Counselor, Appraiser, Agent, Achiever, Perfectionist, Investigator, Practitioner
     - Each pattern: `{ name: string, primary: Dimension, secondary?: Dimension, description: string }`
     - Example: `{ name: "Developer", primary: "D", description: "Direct, results-oriented, problem-solver" }`
   - Export as `PATTERN_DEFINITIONS` constant

5. **Create main scoring API**
   - Create `/Users/thomas/ClaudeCode/coding/disc-website/lib/scoring/index.ts`
   - Implement `scoreAssessment(answers: AnswerState): { scores: DimensionScores, pattern: DISCPattern }`
   - Load scoring key from `/disc-data/disc_assessment.json`
   - Call `calculateDimensionScores` and `determinePattern`
   - Return combined result
   - Export all types and functions from this module

6. **Write comprehensive unit tests**
   - Create `/Users/thomas/ClaudeCode/coding/disc-website/lib/scoring/calculate-scores.test.ts`
   - Test `calculateDimensionScores`:
     - Test known answer set produces expected scores
     - Test empty answers returns zero scores
     - Test partial answers (only some questions answered)
   - Create `/Users/thomas/ClaudeCode/coding/disc-website/lib/scoring/determine-pattern.test.ts`
   - Test `determinePattern` for all 15 patterns (use test cases from Task 03 findings):
     - Pure styles: D=20/I=10/S=8/C=12 → Developer
     - Combinations: D=20/I=18/S=10/C=8 → Inspirational
     - Three-dimension: D=18/I=10/S=18/C=18 → Investigator
     - Edge cases: D=12/I=12/S=12/C=12 → Balanced
     - Tied scores: D=20/I=20/S=10/C=10 → Test tie-breaker logic
     - Boundary: D=16/I=15/S=10/C=8 → Developer (exactly at threshold)

7. **Install testing dependencies if needed**
   - Check if vitest or jest installed: `ls node_modules/vitest` or `ls node_modules/jest`
   - If not installed, add to package.json:
     - `npm install --save-dev vitest @vitest/ui` (recommended for modern Next.js)
   - Configure test script in package.json: `"test": "vitest"`
   - Create `vitest.config.ts` if needed (basic config for TypeScript)

8. **Run tests and verify coverage**
   - Run tests: `npm test`
   - Verify all 15 patterns have passing tests
   - Verify edge cases covered
   - Aim for 100% coverage on scoring logic (critical business logic)

9. **Document scoring logic**
   - Add comprehensive JSDoc comments to all functions
   - Document algorithm decisions (e.g., gap threshold = 3 for D/I)
   - Add inline comments for complex logic (pattern determination switch)
   - Document edge case handling

10. **Integration verification**
    - Create simple test script to verify scoring with known answers
    - Test with disc_assessment.json scoring_key
    - Manually verify a few sample answer sets produce correct patterns

---

## Acceptance Criteria

- [ ] `calculateDimensionScores` function correctly calculates D/I/S/C scores (0-24 each)
- [ ] `determinePattern` function identifies correct pattern for all 15 DISC patterns
- [ ] Pure functions with no side effects (testable, deterministic)
- [ ] TypeScript strict types for all functions and data structures
- [ ] Unit tests cover all 15 patterns with known score inputs
- [ ] Unit tests cover edge cases (tied scores, flat profile, boundary values)
- [ ] All tests pass with 100% coverage on scoring logic
- [ ] JSDoc comments document algorithm and decision rationale
- [ ] Main API (`scoreAssessment`) integrates calculate + determine functions
- [ ] Pattern definitions exported with metadata for all 15 patterns

---

## Verification

```bash
# Install test dependencies (if needed)
npm install --save-dev vitest @vitest/ui

# Run tests
npm test

# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Build check
npm run build
```

---

## Patterns to Follow

**Pure Function Pattern:**
```typescript
export function calculateDimensionScores(
  answers: AnswerState,
  scoringKey: ScoringKey
): DimensionScores {
  const scores: DimensionScores = { D: 0, I: 0, S: 0, C: 0 }

  answers.forEach((answer, questionId) => {
    const dimension = scoringKey[questionId]?.[answer.most]
    if (dimension) {
      scores[dimension]++
    }
  })

  return scores
}
```

**Pattern Determination Example:**
```typescript
export function determinePattern(scores: DimensionScores): DISCPattern {
  const high = getHighDimensions(scores, MIDLINE_THRESHOLD)

  if (high.length === 0) {
    return PATTERN_DEFINITIONS['Balanced']
  }

  if (high.length === 1) {
    const primary = high[0]
    const purePatterns = {
      D: 'Developer',
      I: 'Promoter',
      S: 'Specialist',
      C: 'Objective Thinker'
    }
    return PATTERN_DEFINITIONS[purePatterns[primary]]
  }

  // Handle 2-dimension patterns
  if (high.length === 2) {
    // D+I special case with gap logic
    if (high.includes('D') && high.includes('I')) {
      const gap = Math.abs(scores.D - scores.I)
      if (gap <= 3) {
        return PATTERN_DEFINITIONS['Inspirational']
      }
      return scores.D > scores.I
        ? PATTERN_DEFINITIONS['Results-Oriented']
        : PATTERN_DEFINITIONS['Persuader']
    }
    // Other combinations...
  }

  // Handle 3-dimension patterns
  // ...
}
```

**Unit Test Pattern:**
```typescript
import { describe, it, expect } from 'vitest'
import { determinePattern } from './determine-pattern'

describe('determinePattern', () => {
  describe('pure styles', () => {
    it('identifies Developer pattern', () => {
      const scores = { D: 20, I: 10, S: 8, C: 12 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Developer')
      expect(result.primary).toBe('D')
    })

    it('identifies Promoter pattern', () => {
      const scores = { D: 8, I: 22, S: 10, C: 6 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Promoter')
      expect(result.primary).toBe('I')
    })
  })

  describe('combination patterns', () => {
    it('identifies Inspirational pattern (D+I small gap)', () => {
      const scores = { D: 20, I: 18, S: 10, C: 8 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Inspirational')
    })
  })

  describe('edge cases', () => {
    it('handles flat profile (all scores below midline)', () => {
      const scores = { D: 12, I: 12, S: 12, C: 12 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Balanced')
    })
  })
})
```

---

## Notes

**Critical Requirements:**
- REQ-IND-050: DISC scoring algorithm (0-24 range per dimension)
- REQ-IND-060: Profile pattern mapping (15 patterns)
- REQ-QUALITY-040: Unit tests for scoring logic (comprehensive coverage)

**Scoring Algorithm:**
- Only "Most" selection contributes points (+1 to dimension)
- "Least" selection does not contribute (not negative scoring)
- 24 questions × 1 point each = 24 points distributed across D/I/S/C
- Typical result: scores distributed (e.g., D=10, I=6, S=5, C=3)

**Pattern Determination Algorithm:**
- Midline threshold: 16 points (65% of maximum 24)
- Logic based on count of dimensions above threshold
- Special handling for D+I combination (gap-based)
- Default to "Balanced" if no dimension above threshold

**Gap Threshold Decision:**
- Gap <= 3 points: small gap → Inspirational pattern
- Gap > 3 points: large gap → Results-Oriented (D > I) or Persuader (I > D)
- Document this decision in code comments

**15 DISC Patterns:**
1. Developer (D only)
2. Promoter (I only)
3. Specialist (S only)
4. Objective Thinker (C only)
5. Results-Oriented (D+I, large gap, D > I)
6. Inspirational (D+I, small gap)
7. Creative (D+C)
8. Persuader (I+D)
9. Counselor (I+S)
10. Appraiser (I+C)
11. Agent (S+I)
12. Achiever (S+D)
13. Perfectionist (C+S)
14. Investigator (S+D+C)
15. Practitioner (C+I+S)

**Test Coverage Goals:**
- All 15 patterns: at least one test case each
- Edge cases: tied scores, boundary values, flat profiles
- Invalid scenarios: empty answers, partial answers
- Integration: full answer set → scores → pattern

**Data Source:**
- Scoring key: `/disc-data/disc_assessment.json` (lines 245-270)
- Load dynamically or copy into constants file

**Performance:**
- Pure functions are fast (no I/O, just computation)
- Scoring 24 questions should be < 1ms
- No optimization needed at this scale

**Code Quality:**
- TypeScript strict mode (no `any` types)
- ESLint clean (zero warnings)
- Comprehensive JSDoc comments
- Descriptive variable names
- Extract magic numbers to named constants (e.g., MIDLINE_THRESHOLD)
