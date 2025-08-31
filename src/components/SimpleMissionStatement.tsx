import Image from 'next/image'

export default function SimpleMissionStatement() {
  return (
    <section className="py-12 px-6" style={{ backgroundColor: '#c4b5d6' }}>
      <div className="max-w-6xl mx-auto">
        {/* Main Heading: font-weight 500-900, line-height < 1.5 */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-wide" style={{ color: '#323232' }}>
          Women's Rights Are Human Rights
        </h2>

        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Content - Main Text: font-weight 300-400, line-height 1.5-2 */}
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed font-normal" style={{ color: '#323232' }}>
              We believe in protecting a woman's right to healthcare,
              autonomy, and equality. Anywhere in the world, when a woman's rights are violated or
              denied, all of us are harmed.
            </p>
            <p className="text-lg leading-relaxed font-normal mt-4" style={{ color: '#323232' }}>
              We've created this interactive map to call out these violations and uplift women's
              voices with the goal of achieving health justice and equality for all.
            </p>
          </div>

          {/* Right Content - Quote with proper box model */}
          <div className="lg:col-span-5 relative">
            <div className="pl-6 p-6 rounded-r-lg border-l-4" style={{ backgroundColor: '#f8f9fa', borderLeftColor: '#0f7c7c' }}>
              {/* Quote indicator positioned absolutely */}
              <div className="absolute -top-2 -left-2 w-5 h-5 flex items-center justify-center text-xs font-bold rounded" style={{ backgroundColor: '#0f7c7c', color: '#fcfcfc' }}>
                "
              </div>
              {/* Quote text: smaller font-size, italic font-style */}
              <p className="text-sm italic leading-relaxed font-normal mb-4" style={{ color: '#323232' }}>
                By empowering a woman, we empower a child. By educating a girl, we make it
                possible for her to grow up to become an empowered woman.
              </p>
              {/* Attribution: text-transform uppercase */}
              <cite className="font-bold text-xs uppercase not-italic" style={{ color: '#124e68' }}>
                — Winnie Byanyima
              </cite>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}
