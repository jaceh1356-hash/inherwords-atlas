import InteractiveMap from './InteractiveMap'

export default function SimpleMapSection() {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: '#c4b5d6' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide" style={{ color: '#323232' }}>
            Explore Stories & Support
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed font-light" style={{ color: '#323232' }}>
            Discover personal stories and supportive organizations across the globe. Each pin
            represents a voice in our community, overlaid on a map of global gender inequality.
          </p>
        </div>

        {/* Map Container */}
        <div className="rounded-xl shadow-lg overflow-hidden border" style={{ backgroundColor: '#fcfcfc', borderColor: '#75bfca' }}>
          <InteractiveMap />
        </div>
      </div>
    </section>
  )
}
