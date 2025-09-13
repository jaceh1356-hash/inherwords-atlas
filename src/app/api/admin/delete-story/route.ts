import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function POST(request: NextRequest) {
  try {
    const { storyId } = await request.json()

    if (!storyId) {
      return NextResponse.json({ error: 'Story ID is required' }, { status: 400 })
    }

    // First, remove from map_pins if it exists
    await sql`DELETE FROM map_pins WHERE id = ${storyId}`

    // Then delete from stories table
    const result = await sql`DELETE FROM stories WHERE id = ${storyId}`

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }

    console.log(`✅ Story ${storyId} completely deleted`)
    return NextResponse.json({ 
      success: true, 
      message: 'Story deleted successfully',
      deletedFromMap: true,
      deletedFromStories: true
    })

  } catch (error) {
    console.error('Error deleting story:', error)
    return NextResponse.json({ 
      error: 'Failed to delete story',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}