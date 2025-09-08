import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function POST(request: NextRequest) {
  try {
    const { storyId, status } = await request.json()

    console.log('🔄 Updating story status:', { storyId, status })

    if (!storyId || !status) {
      return NextResponse.json({ error: 'Missing storyId or status' }, { status: 400 })
    }

    if (process.env.NODE_ENV === 'production') {
      // Production: Update in Vercel Postgres database
      try {
        const result = await sql`
          UPDATE stories 
          SET status = ${status}, updated_at = NOW() 
          WHERE id = ${storyId}
        `
        
        console.log(`✅ Updated story ${storyId} status to ${status}`)
        console.log(`📊 Rows affected: ${result.rowCount}`)
        
        if (result.rowCount === 0) {
          return NextResponse.json({ error: 'Story not found' }, { status: 404 })
        }
        
        return NextResponse.json({ success: true })
      } catch (dbError) {
        console.error('Database error:', dbError)
        return NextResponse.json({ error: 'Failed to update status in database' }, { status: 500 })
      }
    } else {
      // Local development: Mock success
      console.log('Development mode: Status update would be saved to database in production')
      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error('Error updating status:', error)
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}
