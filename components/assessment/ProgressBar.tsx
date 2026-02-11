// Progress indicator for assessment completion

interface ProgressBarProps {
  completed: number
  total: number
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = (completed / total) * 100

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {completed} of {total} questions answered
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(percentage)}%
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={completed}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`${completed} of ${total} questions completed`}
          className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-disc-c transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
