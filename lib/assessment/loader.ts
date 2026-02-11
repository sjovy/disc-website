// Assessment data loader utility

import type { AssessmentData } from './types'
import assessmentData from '@/disc-data/disc_assessment.json'

/**
 * Loads assessment data from the JSON file
 * @returns Typed AssessmentData object
 */
export function loadAssessmentData(): AssessmentData {
  return assessmentData as AssessmentData
}
