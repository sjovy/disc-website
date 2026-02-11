# Task 03: Explore Scoring Requirements

**Agent Type:** backend-engineer
**Model:** sonnet
**Estimated Tokens:** ~25k

---

## Context

**Sprint 2A Goal:** Core Assessment Flow (Features 1, 2, 5)

**Why this task exists:**
Before implementing the DISC scoring algorithm, we need to thoroughly understand the scoring rules, pattern mapping logic, and test cases. The scoring engine is critical - it transforms 24 forced-choice answers into D/I/S/C dimension scores (0-24 each) and maps to one of 15 DISC personality patterns.

**What came before:**
- `/disc-data/disc_assessment.json` contains scoring_key mapping answers to dimensions
- Pattern determination algorithm defined in assessment JSON
- 15 DISC patterns documented in pattern_determination.pattern_mapping

**How it fits:**
This exploration provides the foundation for Task 04 (implement scoring engine). The backend-engineer will analyze scoring rules, plan pure function architecture, and identify comprehensive test cases.

---

## Objective

Understand DISC scoring algorithm from assessment data, document scoring rules and pattern mapping logic, plan pure function architecture with comprehensive test cases for all 15 patterns.

---

## Steps

1. **Read and analyze scoring rules**
   - Read `/Users/thomas/ClaudeCode/coding/disc-website/disc-data/disc_assessment.json`
   - Study scoring_key structure (lines 245-270):
     - Maps question ID → option letter → DISC dimension
     - Example: Question 1, option A → S, option B → D, option C → C, option D → I
   - Understand scoring algorithm:
     - User selects Most and Least for each question
     - Most selection: +1 point to that dimension
     - Least selection: +0 points (not -1, just not counted)
     - Each dimension (D/I/S/C) ranges 0-24 points

2. **Study pattern determination algorithm**
   - Read pattern_determination section (lines 299-321)
   - Understand midline_threshold: 16 points (65% of maximum 24)
   - Algorithm logic:
     - Count dimensions above 16 points
     - 1 dimension above: Pure style (Developer, Promoter, Specialist, Objective Thinker)
     - 2 dimensions above: Combination pattern (e.g., D+I, I+S, C+S)
     - Special case for D+I: calculate gap (large gap = Results-Oriented, small gap = Inspirational)
     - 3 dimensions: S+D+C = Investigator, C+I+S = Practitioner
   - Note pattern_mapping object for lookup

3. **Document scoring function architecture**
   - Plan pure functions (no side effects, testable):
     - `calculateDimensionScores(answers: AnswerState, scoringKey: ScoringKey): DimensionScores`
     - `determinePattern(scores: DimensionScores): DISCPattern`
     - Helper: `getHighDimensions(scores: DimensionScores, threshold: number): Dimension[]`
     - Helper: `calculateGap(score1: number, score2: number): number` (for D/I gap)
   - Define TypeScript types:
     - `DimensionScores` (D, I, S, C number values)
     - `DISCPattern` (pattern name string, primary/secondary dimensions)
     - `ScoringKey` (question id → option → dimension mapping)

4. **Identify comprehensive test cases**
   - Pure styles (1 dimension high):
     - D=20, I=10, S=8, C=12 → Developer
     - D=8, I=22, S=10, C=6 → Promoter
     - D=10, I=8, S=20, C=12 → Specialist
     - D=6, I=10, S=8, C=22 → Objective Thinker
   - Two-dimension patterns:
     - D=20, I=18, S=10, C=8 → Inspirational (small gap: 20-18=2)
     - D=22, I=16, S=8, C=6 → Results-Oriented (large gap: 22-16=6)
     - D=20, I=10, S=8, C=18 → Creative (D+C)
     - D=10, I=20, S=18, C=8 → Counselor (I+S)
     - D=10, I=20, S=8, C=16 → Appraiser (I+C)
     - D=20, I=8, S=16, C=10 → Achiever (S+D)
     - D=8, I=20, S=10, C=16 → Persuader (I+D)
     - D=8, I=10, S=20, C=18 → Perfectionist (C+S)
     - D=8, I=22, S=16, C=10 → Agent (S+I)
   - Three-dimension patterns:
     - D=18, I=10, S=18, C=18 → Investigator (S+D+C)
     - D=10, I=18, S=18, C=18 → Practitioner (C+I+S)
   - Edge cases:
     - All dimensions equal: D=12, I=12, S=12, C=12 (no dimension above threshold)
     - Tied scores: D=20, I=20, S=20, C=20 (all above threshold)
     - Boundary case: D=16, I=15, S=10, C=8 (exactly at threshold)

5. **Define gap calculation logic for D/I combination**
   - Analyze D/I pattern determination:
     - "large gap" vs "small gap" not precisely defined in JSON
     - Propose threshold: gap <= 3 points = small gap (Inspirational), gap > 3 = large gap (Results-Oriented)
     - Document this as implementation decision with rationale

6. **Plan test file structure**
   - Test file: `/lib/scoring/algorithm.test.ts`
   - Test suites:
     - "calculateDimensionScores" suite (verify correct point accumulation)
     - "determinePattern" suite (all 15 patterns + edge cases)
     - "integration" suite (full answer set → pattern result)
   - Use known answer sets to verify expected patterns

7. **Create exploration findings document**
   - Document findings in `/Users/thomas/ClaudeCode/coding/disc-website/docs/sprints/sprint-2/tasks/task-03-findings.md`
   - Include:
     - Scoring algorithm summary
     - Pattern determination logic with flowchart (text-based)
     - Function architecture plan
     - TypeScript type definitions (draft)
     - Comprehensive test cases with expected results
     - Gap calculation decision and rationale
     - Edge case handling strategy

---

## Acceptance Criteria

- [ ] Scoring algorithm fully understood and documented
- [ ] Pattern determination logic documented with clear decision tree
- [ ] Pure function architecture planned with clear responsibilities
- [ ] TypeScript type definitions drafted for scores, patterns, scoring key
- [ ] Comprehensive test cases identified covering all 15 patterns
- [ ] Edge cases documented with expected behavior
- [ ] Gap calculation logic defined for D/I pattern determination
- [ ] Findings document created with actionable implementation details for Task 04

---

## Verification

```bash
# Verify findings document created
ls -la /Users/thomas/ClaudeCode/coding/disc-website/docs/sprints/sprint-2/tasks/task-03-findings.md
```

---

## Patterns to Follow

**Pure Function Pattern:**
- No side effects (no console.log, no external state mutation)
- Deterministic (same input always produces same output)
- Testable (easy to write unit tests)
- Example:
```typescript
export function calculateDimensionScores(
  answers: AnswerState,
  scoringKey: ScoringKey
): DimensionScores {
  const scores = { D: 0, I: 0, S: 0, C: 0 }
  // Logic here
  return scores
}
```

**TypeScript Type Safety:**
- Use explicit types for function signatures
- Union types for dimensions: `type Dimension = 'D' | 'I' | 'S' | 'C'`
- Readonly properties where appropriate
- No `any` types

**Test-Driven Approach:**
- Document test cases during exploration
- Include edge cases (tied scores, boundary values, invalid input)
- Plan for integration tests (end-to-end scoring flow)

---

## Notes

**Critical Requirements:**
- REQ-IND-050: DISC scoring algorithm (0-24 range per dimension)
- REQ-IND-060: Profile pattern mapping (15 patterns)
- REQ-QUALITY-040: Unit tests for scoring logic

**Scoring Rules:**
- 24 questions, each contributes 1 point to a dimension based on "Most" selection
- "Least" selection does not contribute points (not negative scoring)
- Each dimension ranges 0-24 (theoretical max if all Most selections map to one dimension)
- Realistic range: scores will be distributed across dimensions

**Pattern Determination:**
- Primary logic: count dimensions above 16 (midline threshold)
- Secondary logic: identify primary (highest) and secondary (second-highest)
- Special handling for D/I combination (gap-based differentiation)
- Three-dimension patterns require specific combinations (S+D+C or C+I+S)

**Gap Calculation:**
- JSON mentions "large gap" vs "small gap" but doesn't specify threshold
- Propose 3-point threshold as implementation decision
- Document rationale: small gap (<=3) suggests balanced D/I → Inspirational, large gap (>3) suggests D dominance → Results-Oriented

**Edge Case Considerations:**
- What if no dimension above 16? (flat profile) → Need default pattern or "Balanced" designation
- What if all 4 dimensions above 16? (high energy profile) → Tie-breaker logic needed
- What if 2 dimensions tied for highest? → Order of precedence (D > I > S > C) or alphabetical

**Test Coverage Goals:**
- All 15 patterns must have at least one test case
- Edge cases: tied scores, boundary values, flat profiles
- Invalid input: missing answers, out-of-range scores

**Reference Data:**
- Scoring key: lines 245-270 of disc_assessment.json
- Pattern mapping: lines 304-320 of disc_assessment.json
- Midline threshold: 16 points (line 301)

This is an exploration task - focus on understanding and planning, not implementing code.
