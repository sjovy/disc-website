/**
 * Type definitions for localStorage persistence
 */

import type { DimensionScores, DISCPattern } from '@/lib/scoring/types'

/**
 * Single answer with most and least selections
 */
export interface StoredAnswer {
  most: string | null
  least: string | null
}

/**
 * In-progress assessment data stored in localStorage
 */
export interface StoredAssessment {
  answers: Record<number, StoredAnswer>
  timestamp: number
}

/**
 * Completed assessment result stored in localStorage
 */
export interface StoredResult {
  scores: DimensionScores
  pattern: DISCPattern
  timestamp: number
}
