import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DISC Assessment | Team Analysis',
  description: 'Analyze team composition and dynamics with DISC profiles',
}

export default function TeamPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Team Analysis</h1>
        <p className="text-gray-600">Coming in Sprint 3</p>
      </div>
    </div>
  )
}
