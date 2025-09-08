import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Validate required fields
    if (!formData.title || !formData.story || !formData.country) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    const storyId = `story_${uuidv4()}`

    if (process.env.NODE_ENV === 'production') {
      // Production: Save to Vercel Postgres database
      try {
        await sql`
          INSERT INTO stories (id, title, story, country, city, email, anonymous, status, submitted_at)
          VALUES (
            ${storyId},
            ${formData.title},
            ${formData.story},
            ${formData.country},
            ${formData.city || ''},
            ${formData.email || ''},
            ${formData.anonymous || false},
            'pending',
            NOW()
          )
        `
        
        console.log(`✅ Story submitted to database: ${storyId}`)
        
        return NextResponse.json({ 
          success: true, 
          message: 'Story submitted successfully! It will be reviewed before being added to the map.',
          storyId
        })
      } catch (dbError) {
        console.error('Database error:', dbError)
        return NextResponse.json(
          { success: false, message: 'Failed to submit story. Please try again.' },
          { status: 500 }
        )
      }
    } else {
      // Local development: You can add local storage here
      console.log('Development mode: Story would be saved to database in production')
      return NextResponse.json({ 
        success: true, 
        message: 'Story submitted successfully! (Development mode)',
        storyId
      })
    }

  } catch (error) {
    console.error('Error submitting story:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { success: false, message: 'Failed to submit story. Please try again.' },
      { status: 500 }
    )
  }
}
