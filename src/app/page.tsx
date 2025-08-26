// Main components
import SimpleHeader from '@/components/SimpleHeader'
import SimpleHero from '@/components/SimpleHero'
import SimpleMissionStatement from '@/components/SimpleMissionStatement'
import SimpleMapSection from '@/components/SimpleMapSection'
import SimpleFooter from '@/components/SimpleFooter'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Gender Equality Atlas - Visualize Global Women's Rights Data",
  description: "Explore real-time Gender Inequality Index data through our interactive world map. Discover how gender equality varies globally, read inspiring women's stories, and join the movement for change.",
  openGraph: {
    title: "Interactive Gender Equality Atlas - Visualize Global Women's Rights Data",
    description: "Explore real-time Gender Inequality Index data through our interactive world map. Discover inspiring women's stories and join the movement.",
    url: "https://inherwords.org",
  },
  alternates: {
    canonical: "https://inherwords.org",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#c4b5d6' }}>
      <SimpleHeader />
      <main role="main" aria-label="Interactive Gender Equality Atlas">
        <SimpleHero />
        <SimpleMissionStatement />
        <SimpleMapSection />
      </main>
      <SimpleFooter />
    </div>
  )
}
