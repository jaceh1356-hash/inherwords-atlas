// Simple script to check what's in the production database
const { sql } = require('@vercel/postgres')

async function checkDatabase() {
  try {
    console.log('🔍 Checking database structure...')
    
    // Check if table exists and what columns it has
    const tableInfo = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'map_pins'
      ORDER BY ordinal_position
    `
    
    console.log('📋 Table structure:', tableInfo.rows)
    
    // Check current data
    const currentData = await sql`
      SELECT * FROM map_pins 
      ORDER BY created_at DESC 
      LIMIT 5
    `
    
    console.log('📊 Current data (last 5 rows):', currentData.rows)
    
  } catch (error) {
    console.error('❌ Database error:', error)
  }
}

checkDatabase()
