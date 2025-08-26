'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the map to avoid SSR issues
const InteractiveMapClient = dynamic(
  () => import('./InteractiveMapClient'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 md:h-[500px] rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 bg-teal-500 rounded-full"></div>
          </div>
          <p className="text-slate-600">Loading Interactive Map...</p>
        </div>
      </div>
    )
  }
)

export default function InteractiveMap() {
  return <InteractiveMapClient />
}
