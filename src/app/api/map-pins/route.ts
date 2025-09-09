import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { sql } from '@vercel/postgres'

export async function GET() {
  try {
    if (process.env.NODE_ENV === 'production') {
      // Production: Read from Vercel Postgres database
      console.log('Loading map pins from database...')
      
      try {
        const result = await sql`
          SELECT id, title, story, lat, lng, type, category, country, city, created_at
          FROM map_pins
          ORDER BY created_at DESC
        `
        
        const pins = result.rows.map(row => ({
          id: row.id,
          title: row.title,
          story: row.story || '',
          lat: Number(row.lat),
          lng: Number(row.lng),
          type: row.type,
          category: row.category,
          country: row.country,
          city: row.city
        }))
        
        console.log(`Returning ${pins.length} pins from database`)
        return NextResponse.json({ pins })
      } catch (dbError) {
        console.error('Database error, using fallback pins:', dbError)
        // Fall through to fallback pins
      }
    } else {
      // Local development: Read from local JSON file
      console.log('Loading map pins from local file...')
      
      const filePath = path.join(process.cwd(), 'src/data/map-pins.json')
      const fileContents = await fs.readFile(filePath, 'utf8')
      const pins = JSON.parse(fileContents)
      
      console.log(`Returning ${pins.length} pins from local storage`)
      return NextResponse.json({ pins })
    }
  } catch (error) {
    console.error('Error loading map pins:', error)
  }
  
  // Return fallback pins if everything else fails
  const fallbackPins = [
    { title: 'NYC Healthcare Story', story: 'A healthcare access story from New York City', lat: 40.7128, lng: -74.0060, type: 'story', category: 'healthcare' },
    { title: 'LA Support Center', story: 'Supporting women in Los Angeles', lat: 34.0522, lng: -118.2437, type: 'story', category: 'support' },
    { title: 'London Workplace Rights', story: 'Fighting for workplace equality in London', lat: 51.5074, lng: -0.1278, type: 'story', category: 'workplace' }
  ]
  
  console.log('Using fallback pins due to error')
  return NextResponse.json({ pins: fallbackPins })
}
