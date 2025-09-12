import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Validate required fields based on type
    if (!formData.type || !formData.country) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    // Type-specific validation
    if (formData.type === 'personal') {
      if (!formData.title || !formData.story) {
        return NextResponse.json(
          { success: false, message: 'Please fill in title and story for personal submissions.' },
          { status: 400 }
        )
      }
    } else if (formData.type === 'organization') {
      if (!formData.organizationName || !formData.organizationDescription) {
        return NextResponse.json(
          { success: false, message: 'Please fill in organization name and description.' },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid submission type.' },
        { status: 400 }
      )
    }

    const submissionId = `${formData.type}_${uuidv4()}`

    if (process.env.NODE_ENV === 'production') {
      // Production: Save to Vercel Postgres database
      try {
        if (formData.type === 'personal') {
          await sql`
            INSERT INTO stories (id, title, story, country, city, email, anonymous, status, submitted_at)
            VALUES (
              ${submissionId},
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
        } else {
          // For organizations, try to use existing columns and add missing ones if needed
          try {
            // First, try to add missing columns if they don't exist
            await sql`ALTER TABLE stories ADD COLUMN IF NOT EXISTS type VARCHAR(20) DEFAULT 'personal'`
            await sql`ALTER TABLE stories ADD COLUMN IF NOT EXISTS organization_name VARCHAR(255)`
            await sql`ALTER TABLE stories ADD COLUMN IF NOT EXISTS organization_description TEXT`
            await sql`ALTER TABLE stories ADD COLUMN IF NOT EXISTS website VARCHAR(500)`
            await sql`ALTER TABLE stories ADD COLUMN IF NOT EXISTS focus_areas TEXT[]`
            
            await sql`
              INSERT INTO stories (id, type, organization_name, organization_description, website, focus_areas, country, city, email, status, submitted_at)
              VALUES (
                ${submissionId},
                ${formData.type},
                ${formData.organizationName},
                ${formData.organizationDescription},
                ${formData.website || ''},
                ${formData.focusAreas || []},
                ${formData.country},
                ${formData.city || ''},
                ${formData.email || ''},
                'pending',
                NOW()
              )
            `
          } catch (orgError) {
            console.log('Organization columns missing, storing as regular story format')
            // Fallback: store organization data in existing columns
            await sql`
              INSERT INTO stories (id, title, story, country, city, email, anonymous, status, submitted_at)
              VALUES (
                ${submissionId},
                ${formData.organizationName},
                ${'Organization: ' + formData.organizationDescription + (formData.website ? '\nWebsite: ' + formData.website : '') + (formData.focusAreas?.length ? '\nFocus Areas: ' + formData.focusAreas.join(', ') : '')},
                ${formData.country},
                ${formData.city || ''},
                ${formData.email || ''},
                false,
                'pending',
                NOW()
              )
            `
          }
        }
        
        console.log(`✅ ${formData.type === 'organization' ? 'Organization' : 'Story'} submitted to database: ${submissionId}`)
        
        return NextResponse.json({ 
          success: true, 
          message: `${formData.type === 'organization' ? 'Organization' : 'Story'} submitted successfully! It will be reviewed before being added to the map.`,
          submissionId
        })
      } catch (dbError) {
        console.error('Database error:', dbError)
        return NextResponse.json(
          { success: false, message: `Failed to submit ${formData.type === 'organization' ? 'organization' : 'story'}. Please try again.` },
          { status: 500 }
        )
      }
    } else {
      // Local development: You can add local storage here
      console.log(`Development mode: ${formData.type === 'organization' ? 'Organization' : 'Story'} would be saved to database in production`)
      return NextResponse.json({ 
        success: true, 
        message: `${formData.type === 'organization' ? 'Organization' : 'Story'} submitted successfully! (Development mode)`,
        submissionId
      })
    }

  } catch (error) {
    console.error('Error submitting:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { success: false, message: 'Failed to submit. Please try again.' },
      { status: 500 }
    )
  }
}
