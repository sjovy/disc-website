/**
 * DISC Pattern Definitions
 *
 * Defines all 15 DISC personality patterns with their characteristics.
 * These patterns are determined by combinations of high-scoring dimensions.
 */

import type { DISCPattern, Dimension } from './types'

/**
 * Pattern definitions for all 15 DISC personality patterns
 */
export const PATTERN_DEFINITIONS: Record<string, DISCPattern> = {
  // Pure styles (single dimension dominant)
  Developer: {
    name: 'Developer',
    primary: 'D',
    description: 'Direct, results-oriented, problem-solver who accepts challenges and gets things done',
  },
  Promoter: {
    name: 'Promoter',
    primary: 'I',
    description: 'Enthusiastic, optimistic, persuasive communicator who enjoys social interaction',
  },
  Specialist: {
    name: 'Specialist',
    primary: 'S',
    description: 'Patient, loyal, supportive team player who provides stability and consistency',
  },
  'Objective Thinker': {
    name: 'Objective Thinker',
    primary: 'C',
    description: 'Analytical, precise, detail-oriented thinker who values accuracy and quality',
  },

  // Two-dimension patterns
  'Results-Oriented': {
    name: 'Results-Oriented',
    primary: 'D',
    secondary: 'I',
    description: 'Decisive leader focused on achieving results while influencing others',
  },
  Inspirational: {
    name: 'Inspirational',
    primary: 'D',
    secondary: 'I',
    description: 'Charismatic leader who balances drive for results with people skills',
  },
  Creative: {
    name: 'Creative',
    primary: 'D',
    secondary: 'C',
    description: 'Innovative problem-solver who combines big-picture thinking with attention to detail',
  },
  Persuader: {
    name: 'Persuader',
    primary: 'I',
    secondary: 'D',
    description: 'Influential communicator who drives action through enthusiasm and persuasion',
  },
  Counselor: {
    name: 'Counselor',
    primary: 'I',
    secondary: 'S',
    description: 'Supportive, empathetic communicator who builds strong relationships',
  },
  Appraiser: {
    name: 'Appraiser',
    primary: 'I',
    secondary: 'C',
    description: 'Thoughtful communicator who balances enthusiasm with careful analysis',
  },
  Agent: {
    name: 'Agent',
    primary: 'S',
    secondary: 'I',
    description: 'Dependable team player who maintains harmony and supports group goals',
  },
  Achiever: {
    name: 'Achiever',
    primary: 'S',
    secondary: 'D',
    description: 'Steady, determined worker who pursues goals with patience and persistence',
  },
  Perfectionist: {
    name: 'Perfectionist',
    primary: 'C',
    secondary: 'S',
    description: 'Meticulous professional who values quality, accuracy, and systematic approaches',
  },

  // Three-dimension patterns
  Investigator: {
    name: 'Investigator',
    primary: 'S',
    secondary: 'D',
    description: 'Thorough researcher who combines persistence, drive, and attention to detail (S+D+C)',
  },
  Practitioner: {
    name: 'Practitioner',
    primary: 'C',
    secondary: 'I',
    description: 'Skilled professional who blends precision with people skills and steadiness (C+I+S)',
  },

  // Edge case pattern
  Balanced: {
    name: 'Balanced',
    primary: 'D' as Dimension,
    description: 'Adaptable profile with no single dominant dimension, able to adjust style as needed',
  },
}
