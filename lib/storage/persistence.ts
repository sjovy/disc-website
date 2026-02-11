/**
 * localStorage persistence utilities for DISC assessment
 *
 * Handles saving/loading in-progress assessments and completed results
 * with graceful error handling for quota exceeded and corrupted data
 */

import type { DimensionScores, DISCPattern } from '@/lib/scoring/types'
import type { StoredAnswer, StoredAssessment, StoredResult } from './types'

// Storage keys
export const STORAGE_KEY_PROGRESS = 'disc-assessment-progress'
export const STORAGE_KEY_RESULTS = 'disc-assessment-results'

/**
 * Save in-progress assessment answers to localStorage
 * Returns true on success, false on quota exceeded or error
 */
export function saveProgress(
  answers: Record<number, StoredAnswer>
): boolean {
  try {
    const data: StoredAssessment = {
      answers,
      timestamp: Date.now(),
    }

    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(data))
    return true
  } catch (error) {
    if (error instanceof DOMException && error.code === 22) {
      console.warn('localStorage quota exceeded')
    } else {
      console.warn('Failed to save progress', error)
    }
    return false
  }
}

/**
 * Load in-progress assessment answers from localStorage
 * Returns null if not found or invalid data
 */
export function loadProgress(): Record<number, StoredAnswer> | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY_PROGRESS)
    if (!data) return null

    const parsed: StoredAssessment = JSON.parse(data)
    return parsed.answers
  } catch (error) {
    console.warn('Failed to load progress', error)
    return null
  }
}

/**
 * Clear in-progress assessment data from localStorage
 */
export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_PROGRESS)
  } catch (error) {
    console.warn('Failed to clear progress', error)
  }
}

/**
 * Save completed assessment results to localStorage
 * Returns true on success, false on quota exceeded or error
 */
export function saveResults(
  scores: DimensionScores,
  pattern: DISCPattern
): boolean {
  try {
    const data: StoredResult = {
      scores,
      pattern,
      timestamp: Date.now(),
    }

    localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(data))
    return true
  } catch (error) {
    if (error instanceof DOMException && error.code === 22) {
      console.warn('localStorage quota exceeded')
    } else {
      console.warn('Failed to save results', error)
    }
    return false
  }
}

/**
 * Load completed assessment results from localStorage
 * Returns null if not found or invalid data
 */
export function loadResults(): StoredResult | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY_RESULTS)
    if (!data) return null

    const parsed: StoredResult = JSON.parse(data)
    return parsed
  } catch (error) {
    console.warn('Failed to load results', error)
    return null
  }
}

/**
 * Clear completed assessment results from localStorage
 */
export function clearResults(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_RESULTS)
  } catch (error) {
    console.warn('Failed to clear results', error)
  }
}

/**
 * Clear all assessment data from localStorage
 */
export function clearAll(): void {
  clearProgress()
  clearResults()
}
