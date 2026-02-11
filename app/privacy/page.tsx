import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DISC Assessment | Privacy Policy',
  description: 'Privacy policy and data handling information',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-gray">
        <p>Your privacy is important to us.</p>
        <h2>Data Collection</h2>
        <p>This application stores all assessment data locally in your browser using localStorage. No data is sent to servers or third parties.</p>
        <h2>AI Analysis</h2>
        <p>When you request AI analysis, your responses are sent to Anthropic's Claude API. This data is processed according to Anthropic's privacy policy.</p>
      </div>
    </div>
  )
}
