'use client'

import { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/layout/Container'
import { ProgressBar } from '@/components/assessment/ProgressBar'
import { QuestionCard } from '@/components/assessment/QuestionCard'
import { loadAssessmentData } from '@/lib/assessment/loader'
import { validateAnswers } from '@/lib/assessment/validator'
import { loadProgress, saveProgress, clearProgress } from '@/lib/storage/persistence'
import type { AssessmentData, AnswerState, OptionLetter } from '@/lib/assessment/types'
import type { StoredAnswer } from '@/lib/storage/types'

// Note: metadata export doesn't work in client components
// This will be moved to a layout or handled differently if needed

export default function AssessmentPage() {
  // State management
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null)
  const [answers, setAnswers] = useState<AnswerState>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [storageError, setStorageError] = useState<string | null>(null)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize assessment data and answers
  useEffect(() => {
    try {
      const data = loadAssessmentData()
      setAssessmentData(data)

      // Initialize empty answer state for all 24 questions
      const initialAnswers: AnswerState = {}
      for (let i = 1; i <= 24; i++) {
        initialAnswers[i] = { most: null, least: null }
      }

      // Try to load saved progress
      const savedProgress = loadProgress()
      if (savedProgress) {
        // Merge saved progress with initialized answers
        Object.entries(savedProgress).forEach(([key, value]) => {
          const questionId = Number(key)
          initialAnswers[questionId] = {
            most: value.most as OptionLetter | null,
            least: value.least as OptionLetter | null,
          }
        })
      }

      setAnswers(initialAnswers)
      setIsLoading(false)
    } catch (err) {
      console.error('Failed to load assessment data:', err)
      setError('Failed to load assessment. Please refresh the page to try again.')
      setIsLoading(false)
    }
  }, [])

  // Debounced autosave on answers change
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(() => {
      if (Object.keys(answers).length > 0) {
        // Convert answers to stored format
        const answersToStore: Record<number, StoredAnswer> = {}
        Object.entries(answers).forEach(([key, value]) => {
          answersToStore[Number(key)] = {
            most: value.most,
            least: value.least,
          }
        })

        const success = saveProgress(answersToStore)
        if (!success) {
          setStorageError('Unable to save progress (storage full)')
        } else {
          setStorageError(null)
        }
      }
    }, 500)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [answers])

  // Handle Most selection
  const handleSelectMost = (questionId: number, option: OptionLetter) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        most: option,
        least: prev[questionId]?.least || null,
      },
    }))
  }

  // Handle Least selection
  const handleSelectLeast = (questionId: number, option: OptionLetter) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        most: prev[questionId]?.most || null,
        least: option,
      },
    }))
  }

  // Calculate completed count
  const completedCount = Object.values(answers).filter(
    (answer) => answer.most !== null && answer.least !== null && answer.most !== answer.least
  ).length

  // Handle clear progress
  const handleClearProgress = () => {
    if (confirm('Are you sure you want to start over? This will clear all your answers.')) {
      clearProgress()
      const initialAnswers: AnswerState = {}
      for (let i = 1; i <= 24; i++) {
        initialAnswers[i] = { most: null, least: null }
      }
      setAnswers(initialAnswers)
      setStorageError(null)
    }
  }

  // Handle submit
  const handleSubmit = () => {
    const validation = validateAnswers(answers)

    if (!validation.isComplete) {
      alert(
        `Please complete all questions before submitting. Missing or invalid: ${validation.missingQuestions.join(', ')}`
      )
      return
    }

    // Clear progress since assessment is complete
    clearProgress()

    // TODO: Navigate to results page with answers
    console.log('Assessment complete!', answers)
    alert('Assessment complete! Results page coming soon.')
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-disc-c mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assessment...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !assessmentData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'Failed to load assessment data'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-disc-c text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const validation = validateAnswers(answers)
  const canSubmit = validation.isComplete

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar - Sticky */}
      <ProgressBar completed={completedCount} total={24} />

      {/* Storage Error Banner */}
      {storageError && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-yellow-800">{storageError}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              DISC Assessment
            </h1>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              For each question, select the word that is <strong>MOST</strong> like you
              and the word that is <strong>LEAST</strong> like you. Answer honestly based
              on how you naturally are, not how you think you should be.
            </p>
          </div>

          {/* Questions */}
          <div className="space-y-6 mb-8">
            {assessmentData.questions.map((question) => (
              <QuestionCard
                key={question.id}
                questionId={question.id}
                options={question.options}
                mostSelected={answers[question.id]?.most || null}
                leastSelected={answers[question.id]?.least || null}
                onSelectMost={(option) => handleSelectMost(question.id, option)}
                onSelectLeast={(option) => handleSelectLeast(question.id, option)}
              />
            ))}
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg rounded-t-lg p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                {canSubmit ? (
                  <span className="text-green-600 font-medium">
                    ✓ All questions completed
                  </span>
                ) : (
                  <span>
                    {24 - completedCount} question{24 - completedCount !== 1 ? 's' : ''}{' '}
                    remaining
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleClearProgress}
                  className="px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:outline-none"
                >
                  Start Over
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`
                    px-8 py-3 rounded-lg font-medium transition-all duration-200
                    focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none
                    ${
                      canSubmit
                        ? 'bg-disc-c text-white hover:bg-blue-600 hover:shadow-lg active:scale-[0.98]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Submit Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
