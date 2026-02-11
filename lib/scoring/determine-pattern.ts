/**
 * Determine DISC Pattern
 *
 * Pure function that maps dimension scores to one of 15 DISC personality patterns.
 * Uses midline threshold and combination logic to identify patterns.
 */

import type { DimensionScores, DISCPattern, Dimension } from './types'
import { PATTERN_DEFINITIONS } from './pattern-definitions'

/**
 * Midline threshold for determining "high" dimensions
 * Dimensions scoring >= 16 are considered above midline (65% of max 24)
 */
const MIDLINE_THRESHOLD = 16

/**
 * Gap threshold for D/I pattern differentiation
 * Gap <= 3: Inspirational (balanced D/I)
 * Gap > 3: Results-Oriented (D dominant) or Persuader (I dominant)
 */
const DI_GAP_THRESHOLD = 3

/**
 * Determine DISC pattern from dimension scores
 *
 * Algorithm:
 * 1. Identify dimensions above threshold (>= 16)
 * 2. Based on count of high dimensions:
 *    - 1 high: Pure style (Developer, Promoter, Specialist, Objective Thinker)
 *    - 2 high: Combination pattern (9 patterns including D/I gap logic)
 *    - 3 high: Investigator (S+D+C) or Practitioner (C+I+S)
 *    - 0 or 4 high: Edge case handling
 *
 * @param scores - Dimension scores (D, I, S, C)
 * @returns DISC pattern with name, primary, and optional secondary dimension
 */
export function determinePattern(scores: DimensionScores): DISCPattern {
  const highDimensions = getHighDimensions(scores, MIDLINE_THRESHOLD)
  const count = highDimensions.length

  // Handle based on count of high dimensions
  if (count === 1) {
    // Pure style: single dimension dominant
    const dimension = highDimensions[0]
    if (!dimension) {
      throw new Error('Expected one high dimension but found none')
    }
    return mapPureStyle(dimension)
  } else if (count === 2) {
    // Two-dimension combination
    return mapTwoDimensionPattern(highDimensions, scores)
  } else if (count === 3) {
    // Three-dimension combination
    return mapThreeDimensionPattern(highDimensions)
  } else {
    // Edge case: 0 or 4 dimensions high
    return handleEdgeCase(scores)
  }
}

/**
 * Get dimensions scoring above threshold, sorted by score (descending)
 */
function getHighDimensions(scores: DimensionScores, threshold: number): Dimension[] {
  const dimensions: Dimension[] = ['D', 'I', 'S', 'C']
  return dimensions
    .filter((dim) => scores[dim] >= threshold)
    .sort((a, b) => scores[b] - scores[a])
}

/**
 * Calculate absolute gap between two scores
 */
function calculateGap(score1: number, score2: number): number {
  return Math.abs(score1 - score2)
}

/**
 * Map single dimension to pure style pattern
 */
function mapPureStyle(dimension: Dimension): DISCPattern {
  const purePatterns: Record<Dimension, string> = {
    D: 'Developer',
    I: 'Promoter',
    S: 'Specialist',
    C: 'Objective Thinker',
  }
  const patternName = purePatterns[dimension]
  const pattern = PATTERN_DEFINITIONS[patternName]
  if (!pattern) {
    throw new Error(`Pattern not found for dimension: ${dimension}`)
  }
  return pattern
}

/**
 * Map two high dimensions to combination pattern
 *
 * Special handling for D/I combination:
 * - Small gap (≤3): Inspirational
 * - Large gap (>3): Results-Oriented (D>I) or Persuader (I>D)
 */
function mapTwoDimensionPattern(
  highDimensions: Dimension[],
  scores: DimensionScores
): DISCPattern {
  const [first, second] = highDimensions // Already sorted by score

  // Special D/I handling with gap logic
  const hasD = highDimensions.includes('D')
  const hasI = highDimensions.includes('I')

  if (hasD && hasI) {
    const gap = calculateGap(scores.D, scores.I)
    const patternName = gap <= DI_GAP_THRESHOLD
      ? 'Inspirational'
      : (scores.D > scores.I ? 'Results-Oriented' : 'Persuader')
    const pattern = PATTERN_DEFINITIONS[patternName]
    if (!pattern) {
      throw new Error(`Pattern not found: ${patternName}`)
    }
    return pattern
  }

  // Standard two-dimension mappings
  const combination = `${first}_${second}`
  const patternMap: Record<string, string> = {
    D_C: 'Creative',
    D_S: 'Achiever',
    I_S: 'Counselor',
    I_C: 'Appraiser',
    S_I: 'Agent',
    S_D: 'Achiever',
    C_S: 'Perfectionist',
    C_D: 'Creative',
    C_I: 'Appraiser',
  }

  const patternName = patternMap[combination]
  if (patternName) {
    const pattern = PATTERN_DEFINITIONS[patternName]
    if (!pattern) {
      throw new Error(`Pattern not found: ${patternName}`)
    }
    return pattern
  }

  // Fallback: shouldn't reach here
  const balancedPattern = PATTERN_DEFINITIONS['Balanced']
  if (!balancedPattern) {
    throw new Error('Balanced pattern not found')
  }
  return balancedPattern
}

/**
 * Map three high dimensions to specific patterns
 *
 * Only two valid three-dimension patterns:
 * - S+D+C: Investigator
 * - C+I+S: Practitioner
 */
function mapThreeDimensionPattern(highDimensions: Dimension[]): DISCPattern {
  const sorted = [...highDimensions].sort().join('')

  // Check for specific three-dimension patterns
  if (sorted === 'CDS') {
    const pattern = PATTERN_DEFINITIONS['Investigator'] // S+D+C
    if (!pattern) {
      throw new Error('Investigator pattern not found')
    }
    return pattern
  }
  if (sorted === 'CIS') {
    const pattern = PATTERN_DEFINITIONS['Practitioner'] // C+I+S
    if (!pattern) {
      throw new Error('Practitioner pattern not found')
    }
    return pattern
  }

  // Fallback: use top 2 dimensions
  // (shouldn't normally reach here, but defensive coding)
  const scores: DimensionScores = { D: 0, I: 0, S: 0, C: 0 }
  highDimensions.forEach((dim) => {
    scores[dim] = 20 // Arbitrary high value for sorting
  })
  return mapTwoDimensionPattern(highDimensions.slice(0, 2), scores)
}

/**
 * Handle edge cases (0 or 4 dimensions above threshold)
 *
 * Strategy:
 * - No dimensions high: Select highest dimension (pure style)
 * - All dimensions high: Select top 2 dimensions
 * - Tie-breaker precedence: D > I > S > C
 */
function handleEdgeCase(scores: DimensionScores): DISCPattern {
  const dimensions: Dimension[] = ['D', 'I', 'S', 'C']
  const sorted = [...dimensions].sort((a, b) => scores[b] - scores[a])

  // Get top dimensions (must exist since we have all 4 dimensions)
  const primary = sorted[0]!
  const secondary = sorted[1]!

  // Check if top two are tied or both high
  const primaryScore = scores[primary]
  const secondaryScore = scores[secondary]

  // If scores are close, use two-dimension logic
  if (primaryScore >= MIDLINE_THRESHOLD && secondaryScore >= MIDLINE_THRESHOLD) {
    return mapTwoDimensionPattern([primary, secondary], scores)
  }

  // If all scores equal, use precedence order D > I > S > C
  if (scores.D === scores.I && scores.I === scores.S && scores.S === scores.C) {
    const balancedPattern = PATTERN_DEFINITIONS['Balanced']
    if (!balancedPattern) {
      throw new Error('Balanced pattern not found')
    }
    return balancedPattern
  }

  // Otherwise, assign to highest dimension
  return mapPureStyle(primary)
}
