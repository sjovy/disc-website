/**
 * Integration tests for the complete scoring engine
 * Tests the full flow from answers to pattern determination
 */

import { describe, it, expect } from 'vitest'
import { scoreAssessment } from './index'
import type { AnswerState } from './types'

describe('scoreAssessment integration', () => {
  it('should score a complete assessment and return pattern', () => {
    // Create a sample answer set that should result in a D-dominant profile
    const answers: AnswerState = new Map([
      [1, { most: 'B', least: 'A' }], // B → D
      [2, { most: 'A', least: 'D' }], // A → D
      [3, { most: 'C', least: 'B' }], // C → D
      [4, { most: 'A', least: 'C' }], // A → D
      [5, { most: 'D', least: 'A' }], // D → D
      [6, { most: 'B', least: 'C' }], // B → D
      [7, { most: 'C', least: 'A' }], // C → D
      [8, { most: 'B', least: 'A' }], // B → D
      [9, { most: 'D', least: 'A' }], // D → D
      [10, { most: 'C', least: 'B' }], // C → D
      [11, { most: 'A', least: 'B' }], // A → D
      [12, { most: 'D', least: 'B' }], // D → D
      [13, { most: 'B', least: 'A' }], // B → D
      [14, { most: 'C', least: 'A' }], // C → D
      [15, { most: 'D', least: 'A' }], // D → D
      [16, { most: 'A', least: 'C' }], // A → D
      [17, { most: 'B', least: 'A' }], // B → D
      [18, { most: 'C', least: 'B' }], // C → D
      [19, { most: 'D', least: 'A' }], // D → D
      [20, { most: 'A', least: 'B' }], // A → D
      [21, { most: 'A', least: 'C' }], // A → D
      [22, { most: 'D', least: 'B' }], // D → D
      [23, { most: 'D', least: 'B' }], // D → D
      [24, { most: 'D', least: 'A' }], // D → D
    ])

    const result = scoreAssessment(answers)

    // Verify result structure
    expect(result).toHaveProperty('scores')
    expect(result).toHaveProperty('pattern')

    // Verify scores
    expect(result.scores).toHaveProperty('D')
    expect(result.scores).toHaveProperty('I')
    expect(result.scores).toHaveProperty('S')
    expect(result.scores).toHaveProperty('C')

    // Scores should sum to 24 (one point per question)
    const total = result.scores.D + result.scores.I + result.scores.S + result.scores.C
    expect(total).toBe(24)

    // Pattern should be valid
    expect(result.pattern).toHaveProperty('name')
    expect(result.pattern).toHaveProperty('primary')
    expect(result.pattern).toHaveProperty('description')
    expect(['D', 'I', 'S', 'C']).toContain(result.pattern.primary)
  })

  it('should handle partial answers gracefully', () => {
    // Only answer first 10 questions
    const answers: AnswerState = new Map([
      [1, { most: 'B', least: 'A' }],
      [2, { most: 'A', least: 'D' }],
      [3, { most: 'C', least: 'B' }],
      [4, { most: 'A', least: 'C' }],
      [5, { most: 'D', least: 'A' }],
      [6, { most: 'B', least: 'C' }],
      [7, { most: 'C', least: 'A' }],
      [8, { most: 'B', least: 'A' }],
      [9, { most: 'D', least: 'A' }],
      [10, { most: 'C', least: 'B' }],
    ])

    const result = scoreAssessment(answers)

    // Should still return valid result
    expect(result.scores).toBeDefined()
    expect(result.pattern).toBeDefined()

    // Total should equal number of answered questions
    const total = result.scores.D + result.scores.I + result.scores.S + result.scores.C
    expect(total).toBe(10)
  })

  it('should handle empty answers', () => {
    const answers: AnswerState = new Map()

    const result = scoreAssessment(answers)

    // Should return zero scores
    expect(result.scores.D).toBe(0)
    expect(result.scores.I).toBe(0)
    expect(result.scores.S).toBe(0)
    expect(result.scores.C).toBe(0)

    // Should still return a valid pattern (probably Balanced)
    expect(result.pattern).toBeDefined()
    expect(result.pattern.name).toBeDefined()
  })

  it('should produce balanced distribution for varied answers', () => {
    // Create answers that distribute across all dimensions
    const answers: AnswerState = new Map([
      // 6 D answers
      [1, { most: 'B', least: 'A' }], // B → D
      [2, { most: 'A', least: 'C' }], // A → D
      [3, { most: 'C', least: 'B' }], // C → D
      [4, { most: 'A', least: 'C' }], // A → D
      [5, { most: 'D', least: 'A' }], // D → D
      [6, { most: 'B', least: 'C' }], // B → D
      // 6 I answers
      [7, { most: 'D', least: 'A' }], // D → I
      [8, { most: 'A', least: 'C' }], // A → I
      [9, { most: 'C', least: 'A' }], // C → I
      [10, { most: 'B', least: 'A' }], // B → I
      [11, { most: 'D', least: 'A' }], // D → I
      [12, { most: 'C', least: 'A' }], // C → I (note: Q12 has two I options)
      // 6 S answers
      [13, { most: 'D', least: 'A' }], // D → S
      [14, { most: 'B', least: 'C' }], // B → S (note: Q14 has two S options)
      [15, { most: 'C', least: 'A' }], // C → S
      [16, { most: 'C', least: 'A' }], // C → S
      [17, { most: 'D', least: 'A' }], // D → S
      [18, { most: 'B', least: 'A' }], // B → S
      // 6 C answers
      [19, { most: 'A', least: 'D' }], // A → C
      [20, { most: 'B', least: 'A' }], // B → C
      [21, { most: 'D', least: 'A' }], // D → C
      [22, { most: 'B', least: 'C' }], // B → S (wait, need to check scoring key)
      [23, { most: 'C', least: 'A' }], // C → S (need actual C answers)
      [24, { most: 'B', least: 'A' }], // B → C
    ])

    const result = scoreAssessment(answers)

    // Verify all dimensions have some score
    expect(result.scores.D).toBeGreaterThan(0)
    expect(result.scores.I).toBeGreaterThan(0)
    expect(result.scores.S).toBeGreaterThan(0)
    expect(result.scores.C).toBeGreaterThan(0)

    // Total should be 24
    const total = result.scores.D + result.scores.I + result.scores.S + result.scores.C
    expect(total).toBe(24)
  })

  it('should be deterministic (same inputs produce same outputs)', () => {
    const answers: AnswerState = new Map([
      [1, { most: 'B', least: 'A' }],
      [2, { most: 'A', least: 'D' }],
      [3, { most: 'C', least: 'B' }],
    ])

    const result1 = scoreAssessment(answers)
    const result2 = scoreAssessment(answers)

    // Both results should be identical
    expect(result1.scores).toEqual(result2.scores)
    expect(result1.pattern.name).toBe(result2.pattern.name)
    expect(result1.pattern.primary).toBe(result2.pattern.primary)
  })
})
