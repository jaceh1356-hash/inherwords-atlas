import { sql } from '@vercel/postgres'

// Database migration to add story column
export async function addStoryColumn() {
  try {
    console.log('🔄 Starting database migration...')
    
    // Check if story column already exists
    const checkColumn = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'map_pins' AND column_name = 'story'
    `
    
    if (checkColumn.rows.length > 0) {
      console.log('✅ Story column already exists!')
      return
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
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  }
}
