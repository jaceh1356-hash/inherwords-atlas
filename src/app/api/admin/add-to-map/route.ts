import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Simple geocoding function with fallback
async function getCoordinates(city: string, country: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const location = city ? `${city}, ${country}` : country
    
    // Add User-Agent header to avoid blocking
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`, {
      headers: {
        'User-Agent': 'InHerWords/1.0'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      }
    }
  } catch (error) {
    console.error('Geocoding error:', error)
  }
  
  // Fallback: return approximate coordinates for some major countries
  const countryFallbacks: { [key: string]: { lat: number; lng: number } } = {
    'United States': { lat: 39.8283, lng: -98.5795 },
    'Canada': { lat: 56.1304, lng: -106.3468 },
    'United Kingdom': { lat: 55.3781, lng: -3.4360 },
    'Australia': { lat: -25.2744, lng: 133.7751 },
    'Germany': { lat: 51.1657, lng: 10.4515 },
    'France': { lat: 46.2276, lng: 2.2137 },
    'India': { lat: 20.5937, lng: 78.9629 },
    'Brazil': { lat: -14.2350, lng: -51.9253 },
    'Mexico': { lat: 23.6345, lng: -102.5528 },
    'Ireland': { lat: 53.1424, lng: -7.6921 },
    'Italy': { lat: 41.8719, lng: 12.5674 },
    'Spain': { lat: 40.4637, lng: -3.7492 },
    'Netherlands': { lat: 52.1326, lng: 5.2913 },
    'Japan': { lat: 36.2048, lng: 138.2529 },
    'South Korea': { lat: 35.9078, lng: 127.7669 }
  }
  
  const fallback = countryFallbacks[country]
  if (fallback) {
    console.log(`Using fallback coordinates for ${country}`)
    return fallback
  }
  
  // Ultimate fallback: center of the world
  console.log(`No coordinates found for ${location}, using world center`)
  return { lat: 0, lng: 0 }
}

export async function POST(request: NextRequest) {
  try {
    const { storyId, title, country, city, category } = await request.json()

    // Get coordinates for the location
    const coordinates = await getCoordinates(city || '', country)
    if (!coordinates) {
      return NextResponse.json({ error: 'Could not find coordinates for location' }, { status: 400 })
    }

    // Create new pin object
    const newPin = {
      id: storyId,
      title: title,
      lat: coordinates.lat,
      lng: coordinates.lng,
      type: 'story',
      category: category || 'general',
      country: country,
      city: city || ''
    }

    // Read existing pins
    const filePath = path.join(process.cwd(), 'src/data/map-pins.json')
    let pins = []
    
    try {
      const fileContents = await fs.readFile(filePath, 'utf8')
      pins = JSON.parse(fileContents)
    } catch (error) {
      // File doesn't exist yet, start with empty array
      console.log('Creating new map-pins.json file')
    }

    // Add new pin (avoid duplicates)
    const existingIndex = pins.findIndex((pin: any) => pin.id === storyId)
    if (existingIndex >= 0) {
      pins[existingIndex] = newPin // Update existing
    } else {
      pins.push(newPin) // Add new
    }

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(pins, null, 2))
    
    console.log(`Added pin for ${title} at ${coordinates.lat}, ${coordinates.lng}`)
    console.log(`Total pins: ${pins.length}`)

    return NextResponse.json({ success: true, coordinates, pin: newPin })
  } catch (error) {
    console.error('Error adding to map:', error)
    return NextResponse.json({ error: 'Failed to add to map' }, { status: 500 })
  }
}
