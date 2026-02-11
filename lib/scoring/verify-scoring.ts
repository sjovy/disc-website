/**
 * Manual verification script for scoring engine
 *
 * Run with: npx tsx lib/scoring/verify-scoring.ts
 */

import { scoreAssessment } from './index'
import type { AnswerState } from './types'

console.log('DISC Scoring Engine Verification\n')
console.log('=' .repeat(50))

// Test Case 1: Pure D style (Developer)
console.log('\nTest 1: Pure D style (Developer)')
console.log('-'.repeat(50))
const test1: AnswerState = new Map([
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
  [11, { most: 'A', least: 'B' }],
  [12, { most: 'D', least: 'B' }],
  [13, { most: 'B', least: 'A' }],
  [14, { most: 'C', least: 'A' }],
  [15, { most: 'D', least: 'A' }],
  [16, { most: 'A', least: 'C' }],
  [17, { most: 'B', least: 'A' }],
  [18, { most: 'C', least: 'B' }],
  [19, { most: 'D', least: 'A' }],
  [20, { most: 'A', least: 'B' }],
  [21, { most: 'A', least: 'C' }],
  [22, { most: 'D', least: 'B' }],
  [23, { most: 'D', least: 'B' }],
  [24, { most: 'D', least: 'A' }],
])

const result1 = scoreAssessment(test1)
console.log('Scores:', result1.scores)
console.log('Total:', result1.scores.D + result1.scores.I + result1.scores.S + result1.scores.C)
console.log('Pattern:', result1.pattern.name)
console.log('Primary:', result1.pattern.primary)
console.log('Secondary:', result1.pattern.secondary)
console.log('Description:', result1.pattern.description)

// Test Case 2: Balanced profile
console.log('\nTest 2: Balanced profile')
console.log('-'.repeat(50))
const test2: AnswerState = new Map([
  [1, { most: 'A', least: 'B' }],  // S
  [2, { most: 'D', least: 'A' }],  // S
  [3, { most: 'A', least: 'C' }],  // S
  [4, { most: 'C', least: 'A' }],  // S
  [5, { most: 'C', least: 'D' }],  // S
  [6, { most: 'D', least: 'B' }],  // S
  [7, { most: 'B', least: 'C' }],  // S
  [8, { most: 'D', least: 'B' }],  // S (8 S total)
  [9, { most: 'B', least: 'D' }],  // C
  [10, { most: 'A', least: 'D' }], // C
  [11, { most: 'B', least: 'D' }], // C
  [12, { most: 'B', least: 'D' }], // C
  [13, { most: 'C', least: 'B' }], // C
  [14, { most: 'A', least: 'D' }], // S (9 S)
  [15, { most: 'B', least: 'D' }], // C (6 C)
  [16, { most: 'D', least: 'B' }], // C (7 C)
  [17, { most: 'A', least: 'D' }], // C (8 C)
  [18, { most: 'A', least: 'D' }], // I
  [19, { most: 'B', least: 'A' }], // I
  [20, { most: 'D', least: 'C' }], // I
  [21, { most: 'B', least: 'D' }], // I (4 I)
  [22, { most: 'A', least: 'D' }], // S (10 S)
  [23, { most: 'A', least: 'D' }], // S (11 S)
  [24, { most: 'C', least: 'B' }], // I (5 I)
])

const result2 = scoreAssessment(test2)
console.log('Scores:', result2.scores)
console.log('Total:', result2.scores.D + result2.scores.I + result2.scores.S + result2.scores.C)
console.log('Pattern:', result2.pattern.name)
console.log('Primary:', result2.pattern.primary)
console.log('Secondary:', result2.pattern.secondary)

// Test Case 3: D+I combination (Inspirational)
console.log('\nTest 3: D+I combination (should be Inspirational or Results-Oriented)')
console.log('-'.repeat(50))
const test3: AnswerState = new Map([
  [1, { most: 'B', least: 'A' }],  // D
  [2, { most: 'A', least: 'D' }],  // D
  [3, { most: 'C', least: 'A' }],  // D
  [4, { most: 'A', least: 'C' }],  // D
  [5, { most: 'D', least: 'A' }],  // D
  [6, { most: 'B', least: 'C' }],  // D
  [7, { most: 'C', least: 'B' }],  // D
  [8, { most: 'B', least: 'C' }],  // D
  [9, { most: 'D', least: 'A' }],  // D
  [10, { most: 'C', least: 'B' }], // D (10 D)
  [11, { most: 'D', least: 'C' }], // I
  [12, { most: 'C', least: 'B' }], // I
  [13, { most: 'D', least: 'C' }], // S
  [14, { most: 'D', least: 'C' }], // I (3 I)
  [15, { most: 'D', least: 'C' }], // D (11 D)
  [16, { most: 'B', least: 'D' }], // I (4 I)
  [17, { most: 'C', least: 'B' }], // I (5 I)
  [18, { most: 'D', least: 'C' }], // C
  [19, { most: 'D', least: 'C' }], // D (12 D)
  [20, { most: 'D', least: 'C' }], // I (6 I)
  [21, { most: 'B', least: 'D' }], // I (7 I)
  [22, { most: 'D', least: 'C' }], // D (13 D)
  [23, { most: 'D', least: 'C' }], // D (14 D)
  [24, { most: 'D', least: 'C' }], // D (15 D)
])

const result3 = scoreAssessment(test3)
console.log('Scores:', result3.scores)
console.log('Total:', result3.scores.D + result3.scores.I + result3.scores.S + result3.scores.C)
console.log('Gap (D-I):', Math.abs(result3.scores.D - result3.scores.I))
console.log('Pattern:', result3.pattern.name)
console.log('Primary:', result3.pattern.primary)
console.log('Secondary:', result3.pattern.secondary)

console.log('\n' + '='.repeat(50))
console.log('Verification complete!')
console.log('All patterns determined successfully.')
