import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function POST(request: NextRequest) {
  try {
    // Simple auth check - only allow in development or with admin token
    const authHeader = request.headers.get('authorization')
    const isDev = process.env.NODE_ENV === 'development'
    const hasValidToken = authHeader === `Bearer ${process.env.ADMIN_SECRET}`
    
    if (!isDev && !hasValidToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    console.log('🔄 Starting database migration...')
    
    // Check if story column already exists
    const checkColumn = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'map_pins' AND column_name = 'story'
    `
    
    if (checkColumn.rows.length > 0) {
      console.log('✅ Story column already exists!')
      return NextResponse.json({ 
        success: true, 
        message: 'Story column already exists',
        columnExists: true 
      })
    }
    
    // Add story column
    await sql`
      ALTER TABLE map_pins 
      ADD COLUMN story TEXT DEFAULT ''
    `
    
    console.log('✅ Successfully added story column to map_pins table')
    
    // Update existing pins to have empty story if needed
    await sql`
      UPDATE map_pins 
      SET story = '' 
      WHERE story IS NULL
    `
    
    console.log('✅ Migration completed successfully')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully added story column to database',
      columnExists: false,
      migrated: true
    })
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    return NextResponse.json({ 
      error: 'Migration failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
