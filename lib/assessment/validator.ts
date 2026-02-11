// Answer validation utility

import type { AnswerState, ValidationResult } from './types'

/**
 * Validates that all questions have both Most and Least selected
 * and that Most !== Least for each question
 * @param answers - Current answer state
 * @returns ValidationResult with completion status and list of invalid questions
 */
export function validateAnswers(answers: AnswerState): ValidationResult {
  const missingQuestions: number[] = []

  // Check all 24 questions
  for (let i = 1; i <= 24; i++) {
    const answer = answers[i]

    // Check if answer exists and has both most and least selected
    if (!answer || !answer.most || !answer.least) {
      missingQuestions.push(i)
      continue
    }

    // Check if most and least are different
    if (answer.most === answer.least) {
      missingQuestions.push(i)
    }
  }

  return {
    isComplete: missingQuestions.length === 0,
    missingQuestions
  }
}
