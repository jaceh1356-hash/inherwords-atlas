import { NextRequest, NextResponse } from 'next/server'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/spreadsheets']
})

export async function GET() {
  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth)
    await doc.loadInfo()

    // Look for a "Map Pins" sheet (or create it if it doesn't exist)
    let mapPinsSheet = doc.sheetsByTitle['Map Pins']
    
    if (!mapPinsSheet) {
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
    }

    await mapPinsSheet.loadHeaderRow()
    const rows = await mapPinsSheet.getRows()

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

    return NextResponse.json({ pins })
  } catch (error) {
    console.error('Error fetching map pins:', error)
    return NextResponse.json({ pins: [] }, { status: 500 })
  }
}
