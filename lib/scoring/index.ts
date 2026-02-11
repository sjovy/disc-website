/**
 * DISC Scoring Engine
 *
 * Main API for scoring DISC assessments and determining personality patterns.
 * Pure functions with no side effects - deterministic and testable.
 *
 * Usage:
 * ```typescript
 * import { scoreAssessment } from '@/lib/scoring'
 *
 * const answers = new Map([
 *   [1, { most: 'B', least: 'A' }],
 *   [2, { most: 'D', least: 'C' }],
 *   // ... 24 questions total
 * ])
 *
 * const result = scoreAssessment(answers)
 * console.log(result.scores)  // { D: 18, I: 12, S: 6, C: 8 }
 * console.log(result.pattern) // { name: 'Developer', primary: 'D', ... }
 * ```
 */

import type { AnswerState, DimensionScores, DISCPattern, ScoringKey } from './types'
import { calculateDimensionScores } from './calculate-scores'
import { determinePattern } from './determine-pattern'

// Import scoring key from assessment data
import assessmentData from '../../disc-data/disc_assessment.json'

/**
 * Score a complete DISC assessment
 *
 * Takes answer state and returns both dimension scores and identified pattern.
 * This is the main entry point for scoring an assessment.
 *
 * @param answers - Map of question IDs (1-24) to answer selections
 * @returns Object with dimension scores and DISC pattern
 */
export function scoreAssessment(answers: AnswerState): {
  scores: DimensionScores
  pattern: DISCPattern
} {
  // Load scoring key from assessment data
  const scoringKey = assessmentData.scoring_key as ScoringKey

  // Calculate dimension scores
  const scores = calculateDimensionScores(answers, scoringKey)

  // Determine pattern from scores
  const pattern = determinePattern(scores)

  return {
    scores,
    pattern,
  }
}

// Re-export types and functions for external use
export type {
  AnswerState,
  DimensionScores,
  DISCPattern,
  Dimension,
  OptionLetter,
  QuestionAnswer,
  ScoringKey,
} from './types'

export { calculateDimensionScores } from './calculate-scores'
export { determinePattern } from './determine-pattern'
export { PATTERN_DEFINITIONS } from './pattern-definitions'
