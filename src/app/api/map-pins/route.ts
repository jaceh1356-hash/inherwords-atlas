import { NextRequest, NextResponse } from 'next/server'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

export async function GET() {
  try {
    console.log('Starting map pins API...')
    
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth)
    
    // Set a longer timeout and try to load faster
    await Promise.race([
      doc.loadInfo(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout after 30 seconds')), 30000)
      )
    ])
    
    console.log('Google Sheets loaded successfully')

    // Look for a "Map Pins" sheet (or create it if it doesn't exist)
    let mapPinsSheet = doc.sheetsByTitle['Map Pins']
    
    if (!mapPinsSheet) {
      console.log('Map Pins sheet not found, creating it...')
      // Create the sheet if it doesn't exist
      mapPinsSheet = await doc.addSheet({ 
        title: 'Map Pins',
        headerValues: ['Title', 'Latitude', 'Longitude', 'Type', 'Category', 'Status']
      })
      
      // Add a sample pin so your boss can see the format
      await mapPinsSheet.addRow({
        'Title': 'Sample Story Pin',
        'Latitude': '40.7128',
        'Longitude': '-74.0060',
        'Type': 'story',
        'Category': 'healthcare',
        'Status': 'published'
      })
      console.log('Map Pins sheet created with sample data')
    }

    console.log('Loading sheet data...')
    await mapPinsSheet.loadHeaderRow()
    const rows = await mapPinsSheet.getRows()
    console.log(`Found ${rows.length} rows in Map Pins sheet`)

    // Convert rows to pin format, only include published pins
    const pins = rows
      .filter(row => row.get('Status')?.toLowerCase() === 'published')
      .map(row => ({
        title: row.get('Title') || 'Untitled',
        lat: parseFloat(row.get('Latitude') || '0'),
        lng: parseFloat(row.get('Longitude') || '0'),
        type: row.get('Type') || 'story',
        category: row.get('Category') || 'general'
      }))
      .filter(pin => pin.lat !== 0 && pin.lng !== 0) // Only include pins with valid coordinates

    console.log(`Returning ${pins.length} published pins:`, pins)
    return NextResponse.json({ pins })
  } catch (error) {
    console.error('Error fetching map pins:', error)
    
    // Return fallback pins instead of failing completely
    const fallbackPins = [
      { title: 'NYC Healthcare Story', lat: 40.7128, lng: -74.0060, type: 'story', category: 'healthcare' },
      { title: 'LA Support Center', lat: 34.0522, lng: -118.2437, type: 'organization', category: 'support' },
      { title: 'London Workplace Rights', lat: 51.5074, lng: -0.1278, type: 'story', category: 'workplace' }
    ]
    
    console.log('Using fallback pins due to error')
    return NextResponse.json({ pins: fallbackPins })
  }
}
