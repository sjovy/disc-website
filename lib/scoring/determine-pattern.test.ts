/**
 * Unit tests for determinePattern function
 * Tests all 15 DISC patterns plus edge cases
 */

import { describe, it, expect } from 'vitest'
import { determinePattern } from './determine-pattern'
import type { DimensionScores } from './types'

describe('determinePattern', () => {
  describe('Pure styles (1 dimension above 16)', () => {
    it('should identify Developer pattern (D only)', () => {
      const scores: DimensionScores = { D: 20, I: 10, S: 8, C: 12 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Developer')
      expect(result.primary).toBe('D')
    })

    it('should identify Promoter pattern (I only)', () => {
      const scores: DimensionScores = { D: 8, I: 22, S: 10, C: 6 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Promoter')
      expect(result.primary).toBe('I')
    })

    it('should identify Specialist pattern (S only)', () => {
      const scores: DimensionScores = { D: 10, I: 8, S: 20, C: 12 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Specialist')
      expect(result.primary).toBe('S')
    })

    it('should identify Objective Thinker pattern (C only)', () => {
      const scores: DimensionScores = { D: 6, I: 10, S: 8, C: 22 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Objective Thinker')
      expect(result.primary).toBe('C')
    })
  })

  describe('Two-dimension patterns', () => {
    describe('D+I combinations', () => {
      it('should identify Inspirational pattern (D+I small gap)', () => {
        const scores: DimensionScores = { D: 20, I: 18, S: 10, C: 8 }
        const result = determinePattern(scores)
        expect(result.name).toBe('Inspirational')
        expect(result.primary).toBe('D')
        expect(result.secondary).toBe('I')
      })

      it('should identify Inspirational pattern (D+I gap exactly 3)', () => {
        const scores: DimensionScores = { D: 19, I: 16, S: 10, C: 8 }
        const result = determinePattern(scores)
        expect(result.name).toBe('Inspirational')
      })

      it('should identify Results-Oriented pattern (D+I large gap, D>I)', () => {
        const scores: DimensionScores = { D: 22, I: 16, S: 8, C: 6 }
        const result = determinePattern(scores)
        expect(result.name).toBe('Results-Oriented')
        expect(result.primary).toBe('D')
        expect(result.secondary).toBe('I')
      })

      it('should identify Persuader pattern (D+I large gap, I>D)', () => {
        const scores: DimensionScores = { D: 16, I: 22, S: 10, C: 8 }
        const result = determinePattern(scores)
        expect(result.name).toBe('Persuader')
        expect(result.primary).toBe('I')
        expect(result.secondary).toBe('D')
      })

      it('should identify Inspirational pattern (I+D both high, gap 2)', () => {
        const scores: DimensionScores = { D: 18, I: 20, S: 10, C: 8 }
        const result = determinePattern(scores)
        expect(result.name).toBe('Inspirational')
      })
    })

    it('should identify Creative pattern (D+C)', () => {
      const scores: DimensionScores = { D: 20, I: 10, S: 8, C: 18 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Creative')
      expect(result.primary).toBe('D')
      expect(result.secondary).toBe('C')
    })

    it('should identify Counselor pattern (I+S)', () => {
      const scores: DimensionScores = { D: 10, I: 20, S: 18, C: 8 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Counselor')
      expect(result.primary).toBe('I')
      expect(result.secondary).toBe('S')
    })

    it('should identify Appraiser pattern (I+C)', () => {
      const scores: DimensionScores = { D: 10, I: 20, S: 8, C: 16 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Appraiser')
      expect(result.primary).toBe('I')
      expect(result.secondary).toBe('C')
    })

    it('should identify Agent pattern (S+I)', () => {
      const scores: DimensionScores = { D: 8, I: 16, S: 20, C: 10 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Agent')
      expect(result.primary).toBe('S')
      expect(result.secondary).toBe('I')
    })

    it('should identify Achiever pattern (S+D)', () => {
      const scores: DimensionScores = { D: 18, I: 8, S: 20, C: 10 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Achiever')
      expect(result.primary).toBe('S')
      expect(result.secondary).toBe('D')
    })

    it('should identify Perfectionist pattern (C+S)', () => {
      const scores: DimensionScores = { D: 8, I: 10, S: 18, C: 20 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Perfectionist')
      expect(result.primary).toBe('C')
      expect(result.secondary).toBe('S')
    })
  })

  describe('Three-dimension patterns', () => {
    it('should identify Investigator pattern (S+D+C)', () => {
      const scores: DimensionScores = { D: 18, I: 10, S: 18, C: 18 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Investigator')
      expect(result.primary).toBe('S')
    })

    it('should identify Practitioner pattern (C+I+S)', () => {
      const scores: DimensionScores = { D: 10, I: 18, S: 18, C: 18 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Practitioner')
      expect(result.primary).toBe('C')
    })

    it('should identify Investigator with different score distribution', () => {
      const scores: DimensionScores = { D: 17, I: 10, S: 16, C: 19 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Investigator')
    })

    it('should identify Practitioner with different score distribution', () => {
      const scores: DimensionScores = { D: 12, I: 19, S: 17, C: 16 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Practitioner')
    })
  })

  describe('Edge cases', () => {
    it('should handle flat profile (no dimension above 16)', () => {
      const scores: DimensionScores = { D: 12, I: 12, S: 12, C: 12 }
      const result = determinePattern(scores)
      // Should return a valid pattern (highest by precedence or balanced)
      expect(result.name).toBeDefined()
      expect(result.primary).toBeDefined()
    })

    it('should handle all dimensions above threshold', () => {
      const scores: DimensionScores = { D: 20, I: 20, S: 20, C: 20 }
      const result = determinePattern(scores)
      // Should select a valid pattern (top 2 by precedence)
      expect(result.name).toBeDefined()
      expect(result.primary).toBeDefined()
    })

    it('should handle tied scores for top two dimensions', () => {
      const scores: DimensionScores = { D: 20, I: 20, S: 10, C: 8 }
      const result = determinePattern(scores)
      // D and I both 20, gap = 0, should be Inspirational
      expect(result.name).toBe('Inspirational')
      expect(['D', 'I']).toContain(result.primary)
    })

    it('should handle boundary case (exactly at threshold)', () => {
      const scores: DimensionScores = { D: 16, I: 15, S: 10, C: 8 }
      const result = determinePattern(scores)
      // D is at 16 (>= threshold), should be Developer
      expect(result.name).toBe('Developer')
      expect(result.primary).toBe('D')
    })

    it('should handle two dimensions exactly at threshold', () => {
      const scores: DimensionScores = { D: 16, I: 16, S: 10, C: 8 }
      const result = determinePattern(scores)
      // D and I both at 16, gap = 0, should be Inspirational
      expect(result.name).toBe('Inspirational')
    })

    it('should handle minimal variation in scores', () => {
      const scores: DimensionScores = { D: 13, I: 12, S: 11, C: 10 }
      const result = determinePattern(scores)
      // No dimension above 16, should default to highest
      expect(result.name).toBeDefined()
      expect(result.primary).toBe('D')
    })

    it('should handle extreme scores', () => {
      const scores: DimensionScores = { D: 24, I: 0, S: 0, C: 0 }
      const result = determinePattern(scores)
      expect(result.name).toBe('Developer')
      expect(result.primary).toBe('D')
    })

    it('should handle three dimensions at threshold boundary', () => {
      const scores: DimensionScores = { D: 16, I: 16, S: 16, C: 10 }
      const result = determinePattern(scores)
      // Three dimensions at threshold, should identify as three-dimension pattern or fallback
      expect(result.name).toBeDefined()
      expect(result.primary).toBeDefined()
    })
  })

  describe('Pattern metadata validation', () => {
    it('should return pattern with all required fields', () => {
      const scores: DimensionScores = { D: 20, I: 10, S: 8, C: 12 }
      const result = determinePattern(scores)

      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('primary')
      expect(result).toHaveProperty('description')
      expect(typeof result.name).toBe('string')
      expect(['D', 'I', 'S', 'C']).toContain(result.primary)
    })

    it('should include secondary dimension for combination patterns', () => {
      const scores: DimensionScores = { D: 20, I: 18, S: 10, C: 8 }
      const result = determinePattern(scores)

      expect(result.secondary).toBeDefined()
      expect(['D', 'I', 'S', 'C']).toContain(result.secondary)
    })
  })
})
