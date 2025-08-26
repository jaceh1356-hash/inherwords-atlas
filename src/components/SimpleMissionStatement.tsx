import Image from 'next/image'

export default function SimpleMissionStatement() {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: '#c4b5d6' }}>
      <div className="max-w-6xl mx-auto">
        {/* Main Heading: font-weight 500-900, line-height < 1.5 */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight leading-tight" style={{ color: '#323232' }}>
          WOMEN'S RIGHTS ARE HUMAN RIGHTS
        </h2>

        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Content - Main Text: font-weight 300-400, line-height 1.5-2 */}
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed font-normal" style={{ color: '#323232' }}>
              WE BELIEVE IN PROTECTING A WOMAN'S RIGHT TO HEALTHCARE,
              AUTONOMY, AND EQUALITY. ANYWHERE IN THE WORLD, WHEN A WOMAN'S RIGHTS ARE VIOLATED OR
              DENIED, ALL OF US ARE HARMED.
            </p>
            <p className="text-lg leading-relaxed font-normal mt-4" style={{ color: '#323232' }}>
              WE'VE CREATED THIS INTERACTIVE MAP TO CALL OUT THESE VIOLATIONS AND UPLIFT WOMEN'S
              VOICES WITH THE GOAL OF ACHIEVING HEALTH JUSTICE AND EQUALITY FOR ALL.
            </p>
          </div>

          {/* Right Content - Quote with proper box model */}
          <div className="lg:col-span-5 relative">
            <div className="pl-6 p-6 rounded-r-lg border-l-4" style={{ backgroundColor: '#f8f9fa', borderLeftColor: '#55a4af' }}>
              {/* Quote indicator positioned absolutely */}
              <div className="absolute -top-2 -left-2 w-5 h-5 flex items-center justify-center text-xs font-bold rounded" style={{ backgroundColor: '#55a4af', color: '#fcfcfc' }}>
                "
              </div>
              {/* Quote text: smaller font-size, italic font-style */}
              <p className="text-sm italic leading-relaxed font-normal mb-4" style={{ color: '#323232' }}>
                BY EMPOWERING A WOMAN, WE EMPOWER A CHILD. BY EDUCATING A GIRL, WE MAKE IT
                POSSIBLE FOR HER TO GROW UP TO BECOME AN EMPOWERED WOMAN.
              </p>
              {/* Attribution: text-transform uppercase */}
              <cite className="font-bold text-xs uppercase not-italic" style={{ color: '#124e68' }}>
                — WINNIE BYANYIMA
              </cite>
            </div>
            {/* Until.png image under the quote */}
            <div className="mt-1 flex justify-start -ml-2">
              <Image
                src="/until.png"
                alt="Until"
                width={120}
                height={60}
                className="opacity-80"
              />
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}
