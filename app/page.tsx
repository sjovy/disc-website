import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { EntryCard } from '@/components/landing/EntryCard'

export const metadata: Metadata = {
  title: 'DISC Personality Assessment | Free AI-Powered Analysis',
  description: 'Discover your personality profile with our free DISC assessment. Get personalized AI insights powered by Claude.',
}

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Container>
        <div className="text-center py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            Discover Your Personality Profile
          </h1>
          <p className="text-lg md:text-xl text-gray-600 text-balance max-w-2xl mx-auto">
            Free DISC assessment with AI-powered insights
          </p>
        </div>
      </Container>

      {/* Entry Cards */}
      <Container>
        <div className="pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <EntryCard
              title="Take Individual Test"
              description="Complete the 24-question assessment and get personalized AI analysis"
              href="/test"
              icon="📊"
              accentColor="disc-c"
            />
            <EntryCard
              title="Team Analysis"
              description="Upload team results and discover dynamics and collaboration patterns"
              href="/team"
              icon="👥"
              accentColor="disc-s"
            />
            <EntryCard
              title="View Demo"
              description="See sample results and explore the analysis without taking the test"
              href="/demo"
              icon="✨"
              accentColor="disc-i"
            />
          </div>
        </div>
      </Container>

      {/* What is DISC Section */}
      <div className="bg-gray-50 border-t border-gray-200">
        <Container>
          <div className="py-16 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              What is DISC?
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              DISC is a behavior assessment tool based on four personality traits:
              Dominance, Influence, Steadiness, and Compliance. Understanding your
              DISC profile helps you communicate better, work more effectively with
              others, and leverage your natural strengths.
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}
