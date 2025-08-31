import Link from 'next/link'
import Image from 'next/image'

export default function SimpleHeader() {
  return (
    <header className="border-b px-12 py-4" style={{ backgroundColor: '#323232', borderBottomColor: '#75bfca' }}>
      <div className="flex items-center justify-between w-full">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center space-x-3" aria-label="InHerWords Home">
          <Image
            src="/logo.png"
            alt="InHerWords Logo - Global Gender Equality Atlas"
            width={40}
            height={40}
            className="rounded-lg"
            priority
          />
          <div>
            <h1 className="text-lg font-bold" style={{ color: '#fcfcfc' }}>InHerWords</h1>
            <p className="text-xs" style={{ color: '#fcfcfc' }}>Mapping Women's Rights to Health</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 mr-8" role="navigation" aria-label="Main navigation">
          <Link
            href="/"
            className="flex items-center space-x-2 transition-colors font-medium hover:opacity-80"
            style={{ color: '#fcfcfc' }}
            aria-label="View interactive gender equality map"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Interactive Map</span>
          </Link>

          <Link
            href="/submit"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all font-medium shadow-sm hover:shadow-md hover:opacity-90"
            style={{ 
              backgroundColor: '#0f7c7c', 
              color: '#fcfcfc'
            }}
            aria-label="Share your story and contribute to the movement"
          >
            <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span>Share Your Story</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
