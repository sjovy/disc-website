// Type definitions for DISC assessment

export type OptionLetter = 'A' | 'B' | 'C' | 'D'
export type DISCDimension = 'D' | 'I' | 'S' | 'C'

export interface QuestionOptions {
  A: string
  B: string
  C: string
  D: string
}

export interface Question {
  id: number
  options: QuestionOptions
}

export interface AssessmentMetadata {
  name: string
  version: string
  source: string
  description: string
  psychometrics?: {
    cronbach_alpha: string
    test_retest_reliability: number
    validation_source: string
    pattern_agreement: string
  }
  total_combinations?: number
  patterns?: number
  languages?: string[]
}

export interface AssessmentStructure {
  format: string
  total_questions: number
  options_per_question: number
  scoring_range: string
  completion_time_minutes: string
}

export interface DimensionInfo {
  name: string
  color: string
  focus: string
  motto: string
}

export interface AssessmentData {
  metadata: AssessmentMetadata
  assessment_structure: AssessmentStructure
  questions: Question[]
  scoring_key: {
    [questionId: string]: {
      [key in OptionLetter]: DISCDimension
    }
  }
  dimensions: {
    [key in DISCDimension]: DimensionInfo
  }
}

export interface Answer {
  most: OptionLetter | null
  least: OptionLetter | null
}

export interface AnswerState {
  [questionId: number]: Answer
}

export interface ValidationResult {
  isComplete: boolean
  missingQuestions: number[]
}
