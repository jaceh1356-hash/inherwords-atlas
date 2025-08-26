import { NextRequest, NextResponse } from 'next/server'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Initialize Google Sheets connection
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth)
    await doc.loadInfo()

    // Get or create the worksheet
    let sheet = doc.sheetsByIndex[0]
    if (!sheet) {
      sheet = await doc.addSheet({ title: 'Story Submissions' })
    }

    // Set headers if this is the first row
    const rows = await sheet.getRows()
    if (rows.length === 0) {
      await sheet.setHeaderRow([
        'Timestamp',
        'Title',
        'Story',
        'Category',
        'Age Range',
        'Country',
        'City',
        'Anonymous',
        'Agreed to Terms',
        'Status'
      ])
    }

    // Add the new row
    await sheet.addRow({
      'Timestamp': new Date().toISOString(),
      'Title': formData.title,
      'Story': formData.story,
      'Category': formData.category,
      'Age Range': formData.ageRange,
      'Country': formData.country,
      'City': formData.city || '',
      'Anonymous': formData.anonymous ? 'Yes' : 'No',
      'Agreed to Terms': formData.agreedToTerms ? 'Yes' : 'No',
      'Status': 'Pending Review'
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Story submitted successfully! It will be reviewed before being added to the map.' 
    })

  } catch (error) {
    console.error('Error submitting story:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { success: false, message: 'Failed to submit story. Please try again.' },
      { status: 500 }
    )
  }
}
