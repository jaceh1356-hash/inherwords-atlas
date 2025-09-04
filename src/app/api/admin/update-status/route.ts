import { NextRequest, NextResponse } from 'next/server'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

export async function POST(request: NextRequest) {
  try {
    const { storyId, status } = await request.json()

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth)
    await doc.loadInfo()

    // Update the story status in Form Submissions sheet
    const submissionsSheet = doc.sheetsByTitle['Form Submissions']
    if (!submissionsSheet) {
      return NextResponse.json({ error: 'Submissions sheet not found' }, { status: 404 })
    }

    await submissionsSheet.loadHeaderRow()
    const rows = await submissionsSheet.getRows()
    
    // Find the story row by ID (extract index from story_X format)
    const storyIndex = parseInt(storyId.replace('story_', ''))
    if (rows[storyIndex]) {
      rows[storyIndex].set('Status', status)
      await rows[storyIndex].save()
      
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error updating status:', error)
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}
