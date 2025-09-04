import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    console.log('Loading map pins from local file...')
    
    // Read pins from local JSON file
    const filePath = path.join(process.cwd(), 'src/data/map-pins.json')
    const fileContents = await fs.readFile(filePath, 'utf8')
    const pins = JSON.parse(fileContents)
    
    console.log(`Returning ${pins.length} pins from local storage:`, pins)
    return NextResponse.json({ pins })
  } catch (error) {
    console.error('Error loading map pins:', error)
    
    // Return fallback pins if file doesn't exist or has issues
    const fallbackPins = [
      { title: 'NYC Healthcare Story', lat: 40.7128, lng: -74.0060, type: 'story', category: 'healthcare' },
      { title: 'LA Support Center', lat: 34.0522, lng: -118.2437, type: 'story', category: 'support' },
      { title: 'London Workplace Rights', lat: 51.5074, lng: -0.1278, type: 'story', category: 'workplace' }
    ]
    
    console.log('Using fallback pins due to error')
    return NextResponse.json({ pins: fallbackPins })
  }
}
