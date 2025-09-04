'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Story {
  id: string
  title: string
  story: string
  country: string
  city: string
  email: string
  anonymous: boolean
  status: string
  submittedAt: string
}

export default function AdminPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token')
    
    if (!token) {
      router.push('/admin/login')
      return
    }

    try {
      const response = await fetch('/api/admin/auth', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        setIsAuthenticated(true)
        fetchStories()
      } else {
        localStorage.removeItem('admin_token')
        router.push('/admin/login')
      }
    } catch (error) {
      localStorage.removeItem('admin_token')
      router.push('/admin/login')
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/admin/stories')
      const data = await response.json()
      setStories(data.stories || [])
    } catch (error) {
      console.error('Failed to fetch stories:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToMap = async (story: Story) => {
    setProcessingId(story.id)
    try {
      const response = await fetch('/api/admin/add-to-map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storyId: story.id,
          title: story.title,
          country: story.country,
          city: story.city,
          category: 'story' // You can make this dynamic
        })
      })

      if (response.ok) {
        // Refresh the stories list
        fetchStories()
        alert('✅ Story added to map successfully!')
      } else {
        alert('❌ Failed to add story to map')
      }
    } catch (error) {
      console.error('Error adding to map:', error)
      alert('❌ Error adding story to map')
    } finally {
      setProcessingId(null)
    }
  }

  const updateStatus = async (storyId: string, newStatus: string) => {
    setProcessingId(storyId)
    try {
      const response = await fetch('/api/admin/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storyId, status: newStatus })
      })

      if (response.ok) {
        fetchStories()
        alert(`✅ Story ${newStatus}!`)
      } else {
        alert(`❌ Failed to ${newStatus} story`)
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('❌ Error updating story status')
    } finally {
      setProcessingId(null)
    }
  }

  const approveAndAddToMap = async (story: Story) => {
    setProcessingId(story.id)
    try {
      // First approve the story
      const approveResponse = await fetch('/api/admin/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storyId: story.id, status: 'approved' })
      })

      if (!approveResponse.ok) {
        throw new Error('Failed to approve story')
      }

      // Then add to map
      const mapResponse = await fetch('/api/admin/add-to-map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storyId: story.id,
          title: story.title,
          country: story.country,
          city: story.city,
          category: 'story'
        })
      })

      if (mapResponse.ok) {
        fetchStories()
        alert('✅ Story approved and added to map!')
      } else {
        alert('❌ Story approved but failed to add to map')
      }
    } catch (error) {
      console.error('Error in approve and add to map:', error)
      alert('❌ Error processing story')
    } finally {
      setProcessingId(null)
    }
  }

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#c4b5d6' }}>
        <div className="text-center">
          <div className="text-2xl font-bold mb-4" style={{ color: '#1a1a1a' }}>
            {!isAuthenticated ? 'Checking authentication...' : 'Loading Stories...'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#c4b5d6' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-start mb-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#1a1a1a' }}>
              Story Admin Panel
            </h1>
            <p className="text-lg" style={{ color: '#1a1a1a' }}>
              Review submitted stories and add them to the map
            </p>
          </div>
          
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6">
          {stories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: '#1a1a1a' }}>No stories submitted yet</p>
            </div>
          ) : (
            stories.map((story) => (
              <div
                key={story.id}
                className="rounded-xl p-6 shadow-lg"
                style={{ backgroundColor: '#f3ecf8' }}
              >
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Story Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold" style={{ color: '#1a1a1a' }}>
                        {story.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          story.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : story.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : story.status === 'on-map'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {story.status}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <strong>Location:</strong> {story.city ? `${story.city}, ` : ''}{story.country}
                    </div>
                    
                    <div className="mb-4">
                      <strong>Story:</strong>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: '#4a4a4a' }}>
                        {story.story.length > 300 
                          ? `${story.story.substring(0, 300)}...` 
                          : story.story
                        }
                      </p>
                    </div>

                    {story.email && !story.anonymous && (
                      <div className="mb-4">
                        <strong>Contact:</strong> {story.email}
                      </div>
                    )}

                    <div className="text-sm" style={{ color: '#6b7280' }}>
                      Submitted: {new Date(story.submittedAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    {story.status === 'pending' && (
                      <>
                        <button
                          onClick={() => approveAndAddToMap(story)}
                          disabled={processingId === story.id}
                          className="px-4 py-2 text-white rounded-lg hover:opacity-90 disabled:opacity-50"
                          style={{ backgroundColor: '#0f7c7c' }}
                        >
                          {processingId === story.id ? 'Processing...' : '✅ Approve & Add to Map'}
                        </button>
                        <button
                          onClick={() => updateStatus(story.id, 'approved')}
                          disabled={processingId === story.id}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                          {processingId === story.id ? 'Processing...' : '✅ Approve Only'}
                        </button>
                        <button
                          onClick={() => updateStatus(story.id, 'rejected')}
                          disabled={processingId === story.id}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                        >
                          {processingId === story.id ? 'Processing...' : '❌ Reject'}
                        </button>
                      </>
                    )}

                    {story.status === 'approved' && (
                      <button
                        onClick={() => addToMap(story)}
                        disabled={processingId === story.id}
                        className="px-4 py-2 text-white rounded-lg hover:opacity-90 disabled:opacity-50"
                        style={{ backgroundColor: '#0f7c7c' }}
                      >
                        {processingId === story.id ? 'Adding...' : '📍 Add to Map'}
                      </button>
                    )}

                    {story.status === 'on-map' && (
                      <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-center">
                        ✅ On Map
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
