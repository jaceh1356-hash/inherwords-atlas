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
    // Get or create Form Submissions sheet
    let sheet = doc.sheetsByTitle['Form Submissions']
    if (!sheet) {
      sheet = await doc.addSheet({ 
        title: 'Form Submissions',
        headerValues: [
          'Submitted At',
          'Story Title',
          'Story',
          'Email',
          'Country',
          'City',
          'Anonymous',
          'Agreed to Terms',
          'Status'
        ]
      })
    }

    // Add the new row
    await sheet.addRow({
      'Submitted At': new Date().toISOString(),
      'Story Title': formData.title,
      'Story': formData.story,
      'Email': formData.email || '',
      'Country': formData.country,
      'City': formData.city || '',
      'Anonymous': formData.anonymous ? 'true' : 'false',
      'Agreed to Terms': formData.agreedToTerms ? 'true' : 'false',
      'Status': 'pending'
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
