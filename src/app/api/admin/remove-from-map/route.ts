import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { sql } from '@vercel/postgres'

export async function POST(request: NextRequest) {
  try {
    const { storyId } = await request.json()

    console.log('🗑️ Removing from map:', { storyId })

    // Validate required fields
    if (!storyId) {
      console.error('❌ Missing required field: storyId')
      return NextResponse.json({ error: 'Missing required field: storyId' }, { status: 400 })
    }

    if (process.env.NODE_ENV === 'production') {
      // Production: Remove from Vercel Postgres database
      try {
        const result = await sql`
          DELETE FROM map_pins 
          WHERE id = ${storyId}
        `
        
        console.log(`✅ Removed pin from database for story ${storyId}`)
        console.log(`📊 Rows affected: ${result.rowCount}`)
        
        if (result.rowCount === 0) {
          return NextResponse.json({ error: 'Pin not found on map' }, { status: 404 })
        }
        
        return NextResponse.json({ success: true, message: 'Pin removed from map' })
      } catch (dbError) {
        console.error('❌ Database error:', dbError)
        return NextResponse.json({ error: 'Failed to remove pin from database' }, { status: 500 })
      }
    } else {
      // Local development: Remove from file system
      const filePath = path.join(process.cwd(), 'src/data/map-pins.json')
      let pins = []
      
      try {
        const fileContents = await fs.readFile(filePath, 'utf8')
        pins = JSON.parse(fileContents)
      } catch (error) {
        console.log('No map-pins.json file found')
        return NextResponse.json({ error: 'No pins file found' }, { status: 404 })
      }

      // Find and remove the pin
      const initialLength = pins.length
      pins = pins.filter((pin: { id: string }) => pin.id !== storyId)
      
      if (pins.length === initialLength) {
        return NextResponse.json({ error: 'Pin not found on map' }, { status: 404 })
      }

      // Write back to file
      await fs.writeFile(filePath, JSON.stringify(pins, null, 2))
      
      console.log(`✅ Removed pin for story ${storyId}`)
      console.log(`📊 Total pins remaining: ${pins.length}`)

      return NextResponse.json({ success: true, message: 'Pin removed from map' })
    }
  } catch (error) {
    console.error('❌ Error removing from map:', error)
    return NextResponse.json({ error: 'Failed to remove from map', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
