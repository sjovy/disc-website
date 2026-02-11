import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DISC Assessment | Demo',
  description: 'Explore sample DISC analysis results and insights',
}

export default function DemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Demo Experience</h1>
        <p className="text-gray-600">Coming in Sprint 2</p>
      </div>
    </div>
  )
}
