import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json()

    // Check credentials
    if (identifier === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create JWT token
      const token = jwt.sign(
        { 
          admin: true, 
          username: ADMIN_USERNAME,
          timestamp: Date.now() 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      )

      return NextResponse.json({ 
        success: true, 
        token,
        message: 'Authentication successful'
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid username or password' 
      }, { status: 401 })
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Authentication failed' 
    }, { status: 500 })
  }
}

// Verify token endpoint
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    return NextResponse.json({ valid: true, decoded })
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
}
