/**
 * Type definitions for the DISC scoring engine.
 *
 * This module defines all core types used throughout the scoring system,
 * including dimensions, scores, patterns, and answer structures.
 */

/**
 * DISC dimension type - the four primary personality dimensions
 */
export type Dimension = 'D' | 'I' | 'S' | 'C'

/**
 * Option letter for multiple choice questions
 */
export type OptionLetter = 'A' | 'B' | 'C' | 'D'

/**
 * Scores for each DISC dimension (0-24 range per dimension)
 */
export interface DimensionScores {
  D: number
  I: number
  S: number
  C: number
}

/**
 * DISC personality pattern with primary and optional secondary dimensions
 */
export interface DISCPattern {
  name: string
  primary: Dimension
  secondary?: Dimension
  description: string
}

/**
 * Single question answer with most and least selections
 */
export interface QuestionAnswer {
  most: OptionLetter
  least: OptionLetter
}

/**
 * Answer state mapping question IDs to answers
 * Compatible with Map<number, QuestionAnswer> structure from Task 02
 */
export type AnswerState = Map<number, QuestionAnswer>

/**
 * Scoring key structure mapping question IDs to option-dimension mappings
 * Structure: questionId -> optionLetter -> dimension
 */
export type ScoringKey = {
  [questionId: string]: {
    [option in OptionLetter]: Dimension
  }
}

/**
 * Metadata for a single dimension
 */
export interface DimensionMetadata {
  name: string
  color: string
  focus: string
  motto: string
}

/**
 * Complete metadata for all dimensions
 */
export type DimensionsMetadata = {
  [key in Dimension]: DimensionMetadata
}
