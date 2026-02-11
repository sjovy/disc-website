// Individual question card with forced-choice interface

import { cn } from '@/lib/utils'
import type { QuestionOptions, OptionLetter } from '@/lib/assessment/types'

interface QuestionCardProps {
  questionId: number
  options: QuestionOptions
  mostSelected: OptionLetter | null
  leastSelected: OptionLetter | null
  onSelectMost: (option: OptionLetter) => void
  onSelectLeast: (option: OptionLetter) => void
}

export function QuestionCard({
  questionId,
  options,
  mostSelected,
  leastSelected,
  onSelectMost,
  onSelectLeast,
}: QuestionCardProps) {
  const optionKeys: OptionLetter[] = ['A', 'B', 'C', 'D']

  // Check if there's a conflict (same option selected for both)
  const hasConflict = mostSelected !== null && mostSelected === leastSelected

  return (
    <div
      role="group"
      aria-labelledby={`question-${questionId}-label`}
      className={cn(
        'bg-white rounded-lg border-2 p-6 shadow-sm transition-all duration-200',
        hasConflict ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:shadow-md'
      )}
    >
      {/* Question Number */}
      <h3
        id={`question-${questionId}-label`}
        className="text-lg font-semibold text-gray-900 mb-4"
      >
        Question {questionId}
      </h3>

      {/* Error Message for Conflict */}
      {hasConflict && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-md">
          <p className="text-sm text-red-700">
            Most and Least must be different options
          </p>
        </div>
      )}

      {/* Two-Column Layout for Most/Least */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Most Like Me Column */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Most like me
          </h4>
          <div
            role="radiogroup"
            aria-label="Most like me"
            className="space-y-2"
          >
            {optionKeys.map((key) => (
              <button
                key={`most-${key}`}
                type="button"
                role="radio"
                aria-checked={mostSelected === key}
                aria-label={`${key}: ${options[key]}`}
                onClick={() => onSelectMost(key)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200',
                  'hover:shadow-md active:scale-[0.98]',
                  'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none',
                  mostSelected === key
                    ? 'border-disc-s bg-green-50 shadow-sm'
                    : 'border-gray-300 hover:border-gray-400'
                )}
              >
                <span className="font-medium text-gray-900">{key}.</span>{' '}
                <span className="text-gray-700">{options[key]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Least Like Me Column */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Least like me
          </h4>
          <div
            role="radiogroup"
            aria-label="Least like me"
            className="space-y-2"
          >
            {optionKeys.map((key) => (
              <button
                key={`least-${key}`}
                type="button"
                role="radio"
                aria-checked={leastSelected === key}
                aria-label={`${key}: ${options[key]}`}
                onClick={() => onSelectLeast(key)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200',
                  'hover:shadow-md active:scale-[0.98]',
                  'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none',
                  leastSelected === key
                    ? 'border-disc-d bg-red-50 shadow-sm'
                    : 'border-gray-300 hover:border-gray-400'
                )}
              >
                <span className="font-medium text-gray-900">{key}.</span>{' '}
                <span className="text-gray-700">{options[key]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
