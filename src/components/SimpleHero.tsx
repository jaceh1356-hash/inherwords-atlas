import Image from 'next/image'

export default function SimpleHero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative" style={{ backgroundColor: '#c4b5d6' }} aria-label="InHerWords introduction">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo - Moderately Bigger */}
        <div className="mb-10 flex justify-center">
          <Image
            src="/logo.png"
            alt="InHerWords Logo - Global Gender Equality Atlas"
            width={140}
            height={140}
            className=""
            priority
          />
        </div>
        
        {/* Heading: Large but not overwhelming */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight" style={{ color: '#323232' }}>
          InHerWords
        </h1>
        {/* Subtitle: Prominent but readable */}
        <p className="text-xl md:text-2xl lg:text-3xl mb-14 font-medium leading-relaxed" style={{ color: '#323232' }}>
          Mapping Women's Rights to Health
        </p>

        {/* Button: Bigger but not overwhelming */}
        <a 
          href="/submit" 
          className="inline-flex items-center space-x-3 px-10 py-5 rounded-xl border transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl no-underline hover:opacity-90 hover:scale-105 transform"
          style={{ 
            backgroundColor: '#0f7c7c', 
            color: '#fcfcfc', 
            borderColor: '#0f7c7c',
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>Share Your Story</span>
        </a>

        {/* Scroll indicator positioned absolutely */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <svg className="w-10 h-10 animate-bounce" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
