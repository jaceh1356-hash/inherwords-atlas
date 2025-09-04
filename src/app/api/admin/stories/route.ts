import { NextResponse } from 'next/server'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

export async function GET() {
  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth)
    await doc.loadInfo()

    // Get the submissions sheet
    const sheet = doc.sheetsByTitle['Form Submissions']
    if (!sheet) {
      return NextResponse.json({ stories: [] })
    }

    await sheet.loadHeaderRow()
    const rows = await sheet.getRows()

    const stories = rows.map((row, index) => ({
      id: `story_${index}`,
      title: row.get('Story Title') || 'Untitled',
      story: row.get('Story') || '',
      country: row.get('Country') || '',
      city: row.get('City') || '',
      email: row.get('Email') || '',
      anonymous: row.get('Anonymous') === 'true',
      status: row.get('Status') || 'pending',
      submittedAt: row.get('Submitted At') || new Date().toISOString(),
      rowIndex: index // Store for updates
    }))

    return NextResponse.json({ stories })
  } catch (error) {
    console.error('Error fetching stories:', error)
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 })
  }
}
