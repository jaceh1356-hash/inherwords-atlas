#!/usr/bin/env node

// Simple migration runner script
const https = require('https')

const DOMAIN = process.env.VERCEL_URL || 'YOUR-DOMAIN.vercel.app'
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'YOUR_ADMIN_SECRET'

if (DOMAIN.includes('YOUR-DOMAIN') || ADMIN_SECRET.includes('YOUR_ADMIN_SECRET')) {
  console.log(`
❌ Please set your environment variables first:

export VERCEL_URL="your-actual-domain.vercel.app"
export ADMIN_SECRET="your-actual-admin-secret"

Then run: node scripts/run-migration.js

OR run the curl command directly:
curl -X POST https://your-domain.vercel.app/api/admin/migrate \\
  -H "Authorization: Bearer your-admin-secret"
`)
  process.exit(1)
}

const postData = JSON.stringify({})

const options = {
  hostname: DOMAIN,
  port: 443,
  path: '/api/admin/migrate',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${ADMIN_SECRET}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
}

console.log(`🔄 Running migration on https://${DOMAIN}/api/admin/migrate`)

const req = https.request(options, (res) => {
  console.log(`📡 Status: ${res.statusCode}`)
  
  let data = ''
  res.on('data', (chunk) => {
    data += chunk
  })
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data)
      console.log('✅ Migration result:', result)
    } catch (e) {
      console.log('📄 Raw response:', data)
    }
  })
})

req.on('error', (e) => {
  console.error('❌ Error:', e.message)
})

req.write(postData)
req.end()
