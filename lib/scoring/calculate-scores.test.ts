/**
 * Unit tests for calculateDimensionScores function
 */

import { describe, it, expect } from 'vitest'
import { calculateDimensionScores } from './calculate-scores'
import type { AnswerState, ScoringKey } from './types'

// Mock scoring key for testing
const mockScoringKey: ScoringKey = {
  '1': { A: 'S', B: 'D', C: 'C', D: 'I' },
  '2': { A: 'D', B: 'C', C: 'I', D: 'S' },
  '3': { A: 'S', B: 'I', C: 'D', D: 'C' },
  '4': { A: 'D', B: 'C', C: 'S', D: 'I' },
  '5': { A: 'C', B: 'I', C: 'S', D: 'D' },
}

describe('calculateDimensionScores', () => {
  it('should calculate correct scores from known answer set', () => {
    const answers: AnswerState = new Map([
      [1, { most: 'B', least: 'A' }], // Most: B → D
      [2, { most: 'A', least: 'D' }], // Most: A → D
      [3, { most: 'C', least: 'D' }], // Most: C → D
      [4, { most: 'A', least: 'B' }], // Most: A → D
      [5, { most: 'D', least: 'C' }], // Most: D → D
    ])

    const scores = calculateDimensionScores(answers, mockScoringKey)

    // All "most" selections map to D, so D should be 5
    expect(scores.D).toBe(5)
    expect(scores.I).toBe(0)
    expect(scores.S).toBe(0)
    expect(scores.C).toBe(0)
  })

  it('should calculate distributed scores correctly', () => {
    const answers: AnswerState = new Map([
      [1, { most: 'B', least: 'A' }], // Most: B → D
      [2, { most: 'C', least: 'A' }], // Most: C → I
      [3, { most: 'A', least: 'C' }], // Most: A → S
      [4, { most: 'B', least: 'D' }], // Most: B → C
      [5, { most: 'A', least: 'B' }], // Most: A → C
    ])

    const scores = calculateDimensionScores(answers, mockScoringKey)

    expect(scores.D).toBe(1)
    expect(scores.I).toBe(1)
    expect(scores.S).toBe(1)
    expect(scores.C).toBe(2)
  })

  it('should return zero scores for empty answers', () => {
    const answers: AnswerState = new Map()

    const scores = calculateDimensionScores(answers, mockScoringKey)

    expect(scores.D).toBe(0)
    expect(scores.I).toBe(0)
    expect(scores.S).toBe(0)
    expect(scores.C).toBe(0)
  })

  it('should handle partial answers (some questions unanswered)', () => {
    const answers: AnswerState = new Map([
      [1, { most: 'B', least: 'A' }], // Most: B → D
      [3, { most: 'B', least: 'A' }], // Most: B → I
      // Questions 2, 4, 5 not answered
    ])

    const scores = calculateDimensionScores(answers, mockScoringKey)

    expect(scores.D).toBe(1)
    expect(scores.I).toBe(1)
    expect(scores.S).toBe(0)
    expect(scores.C).toBe(0)
  })

  it('should ignore "least" selections (only "most" contributes)', () => {
    const answers: AnswerState = new Map([
      [1, { most: 'B', least: 'D' }], // Most: B → D, Least: D → I (ignored)
      [2, { most: 'A', least: 'C' }], // Most: A → D, Least: C → I (ignored)
    ])

    const scores = calculateDimensionScores(answers, mockScoringKey)

    // Only "most" should count, so D = 2, I = 0
    expect(scores.D).toBe(2)
    expect(scores.I).toBe(0)
    expect(scores.S).toBe(0)
    expect(scores.C).toBe(0)
  })

  it('should handle questions not in scoring key gracefully', () => {
    const answers: AnswerState = new Map([
      [1, { most: 'B', least: 'A' }], // Valid: B → D
      [99, { most: 'A', least: 'B' }], // Question 99 not in scoring key
    ])

    const scores = calculateDimensionScores(answers, mockScoringKey)

    // Should only count question 1
    expect(scores.D).toBe(1)
    expect(scores.I).toBe(0)
    expect(scores.S).toBe(0)
    expect(scores.C).toBe(0)
  })

  it('should verify score totals match answer count', () => {
    const answers: AnswerState = new Map([
      [1, { most: 'B', least: 'A' }],
      [2, { most: 'C', least: 'A' }],
      [3, { most: 'D', least: 'A' }],
      [4, { most: 'A', least: 'B' }],
      [5, { most: 'B', least: 'D' }],
    ])

    const scores = calculateDimensionScores(answers, mockScoringKey)
    const total = scores.D + scores.I + scores.S + scores.C

    // Total should equal number of answered questions
    expect(total).toBe(5)
  })
})
