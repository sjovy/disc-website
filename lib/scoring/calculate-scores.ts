/**
 * Calculate Dimension Scores
 *
 * Pure function that calculates DISC dimension scores from assessment answers.
 * Each "Most" selection contributes +1 point to its corresponding dimension.
 * "Least" selections do not contribute points.
 */

import type { AnswerState, ScoringKey, DimensionScores, Dimension } from './types'

/**
 * Calculate dimension scores from assessment answers
 *
 * Algorithm:
 * 1. Initialize all dimension scores to 0
 * 2. For each of 24 questions:
 *    - Look up the "most" selection
 *    - Find the dimension mapped to that option
 *    - Increment that dimension's score by 1
 * 3. Return final scores (each dimension 0-24 range)
 *
 * @param answers - Map of question IDs to answer selections
 * @param scoringKey - Mapping of question IDs and options to dimensions
 * @returns Dimension scores (D, I, S, C) ranging from 0-24 each
 */
export function calculateDimensionScores(
  answers: AnswerState,
  scoringKey: ScoringKey
): DimensionScores {
  // Initialize all scores to zero
  const scores: DimensionScores = { D: 0, I: 0, S: 0, C: 0 }

  // Iterate through all answers
  answers.forEach((answer, questionId) => {
    // Get the "most" selection for this question
    const mostSelection = answer.most

    // Look up the dimension for this question and option
    const questionKey = String(questionId)
    const dimension = scoringKey[questionKey]?.[mostSelection]

    // Increment the dimension score if valid
    if (dimension && (dimension === 'D' || dimension === 'I' || dimension === 'S' || dimension === 'C')) {
      scores[dimension as Dimension]++
    }
  })

  return scores
}
