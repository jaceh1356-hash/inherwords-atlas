import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
  try {
    if (process.env.NODE_ENV === 'production') {
      // Production: Read from Vercel Postgres database
      console.log('Loading stories from database...')
      
      try {
        const result = await sql`
          SELECT id, title, story, country, city, email, anonymous, status, submitted_at, updated_at
          FROM stories
          ORDER BY submitted_at DESC
        `
        
        const stories = result.rows.map(row => ({
          id: row.id,
          title: row.title,
          story: row.story,
          country: row.country,
          city: row.city || '',
          email: row.email || '',
          anonymous: Boolean(row.anonymous),
          status: row.status,
          submittedAt: row.submitted_at,
          updatedAt: row.updated_at
        }))
        
        console.log(`Returning ${stories.length} stories from database`)
        return NextResponse.json({ stories })
      } catch (dbError) {
        console.error('Database error:', dbError)
        return NextResponse.json({ stories: [] })
      }
    } else {
      // Local development: You can add local storage here or keep Google Sheets for dev
      console.log('Development mode: Add local story storage or use database')
      return NextResponse.json({ stories: [] })
    }
  } catch (error) {
    console.error('Error fetching stories:', error)
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 })
  }
}
