'use client'

import { useState } from 'react'
import SimpleHeader from '@/components/SimpleHeader'
import SimpleFooter from '@/components/SimpleFooter'
import type { Metadata } from "next";

// Note: Since this is a client component, metadata will be handled by the parent layout
// For better SEO, we could convert this to a server component with client components for interactive parts

export default function SubmitPage() {
  return (
    <div style={{ backgroundColor: '#c4b5d6' }}>
      <SimpleHeader />

      {/* Hero Section */}
      <section className="py-12 px-6" style={{ backgroundColor: '#c4b5d6' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#1a1a1a' }}>
            Share Your Story
          </h1>

          <p className="text-lg max-w-2xl mx-auto leading-relaxed mb-8" style={{ color: '#1a1a1a' }}>
            Your experience can inspire others, create connections, and contribute to positive
            change. Share your story in a safe, supportive environment.
          </p>
        </div>
      </section>

      {/* Key Benefits - Compact */}
      <section className="py-12 px-6" style={{ backgroundColor: '#c4b5d6' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#1a1a1a' }}>
                Help Others
              </h3>
              <p className="text-sm" style={{ color: '#1a1a1a' }}>
                Provide comfort to women facing similar challenges
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#1a1a1a' }}>
                Stay Anonymous
              </h3>
              <p className="text-sm" style={{ color: '#1a1a1a' }}>
                Complete privacy protection with secure data handling
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#1a1a1a' }}>
                Create Impact
              </h3>
              <p className="text-sm" style={{ color: '#1a1a1a' }}>
                Contribute to a worldwide movement for women's rights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <SimpleShareStoryForm />

      <SimpleFooter />
    </div>
  )
}

function SimpleShareStoryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    // Store form reference before async operations
    const form = e.currentTarget

    try {
      const formData = new FormData(form)
      const data = {
        title: formData.get('title'),
        story: formData.get('story'),
        category: formData.get('category'),
        ageRange: formData.get('ageRange'),
        country: formData.get('country'),
        city: formData.get('city'),
        anonymous: formData.has('anonymous'),
        agreedToTerms: formData.has('agreedToTerms')
      }

      const response = await fetch('/api/submit-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitMessage('✅ Story submitted successfully! It will be reviewed before being added to the map.')
        // Reset form using stored reference
        if (form) {
          form.reset()
        }
        // Scroll to message
        setTimeout(() => {
          document.querySelector('[data-message]')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        setSubmitMessage(result.message || 'Failed to submit story. Please try again.')
      }
    } catch (error) {
      console.error('Fetch error:', error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setSubmitMessage('Network error: Please check your connection and try again.')
      } else {
        setSubmitMessage('Failed to submit story. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-12 px-6" style={{ backgroundColor: '#c4b5d6' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#1a1a1a' }}>Share Your Story</h2>
          <p className="max-w-2xl mx-auto text-base" style={{ color: '#1a1a1a' }}>
            Take the first step in making your voice heard. Your story matters and can create meaningful change.
          </p>
        </div>

        <div className="rounded-3xl p-6 md:p-8" style={{ backgroundColor: '#f3ecf8' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Story Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                Story Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="Give your story a meaningful title"
                className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-900 text-lg" 
                style={{ backgroundColor: '#f8f9fa' }}
              />
            </div>

            {/* Your Story */}
            <div className="mb-6">
              <label htmlFor="story" className="block text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                Your Story *
              </label>
              <textarea
                id="story"
                name="story"
                rows={10}
                required
                placeholder="Share your experience with healthcare access, reproductive rights, or related challenges. Your words have power."
                className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-900 text-lg resize-vertical min-h-[200px]"
                style={{ backgroundColor: '#f8f9fa' }}
              />
            </div>

            {/* Category */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="category" className="block text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-900 text-lg"
                  style={{ backgroundColor: '#f8f9fa' }}
                >
                  <option value="">Select a category</option>
                  <option value="reproductive-rights">Reproductive Rights</option>
                  <option value="healthcare-access">Healthcare Access</option>
                  <option value="maternal-health">Maternal Health</option>
                  <option value="mental-health">Mental Health</option>
                  <option value="workplace-discrimination">Workplace Discrimination</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="ageRange" className="block text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                  Age Range
                </label>
                <select
                  id="ageRange"
                  name="ageRange"
                  className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-900 text-lg"
                  style={{ backgroundColor: '#f8f9fa' }}
                >
                  <option value="prefer-not-to-say">Prefer not to say</option>
                  <option value="under-18">Under 18</option>
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55-64">55-64</option>
                  <option value="65+">65+</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="country" className="block text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="e.g., United States"
                  className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-900 text-lg"
                  style={{ backgroundColor: '#f8f9fa' }}
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                  City/Region (Optional)
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="e.g., New York"
                  className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-900 text-lg"
                  style={{ backgroundColor: '#f8f9fa' }}
                />
              </div>
            </div>

            {/* Privacy Options */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1a1a1a' }}>Privacy Settings</h3>
              
              <div className="space-y-4">
                <label className="flex items-start space-x-4 p-4 rounded-xl border" style={{ backgroundColor: '#f3ecf8', borderColor: '#d1b3e0' }}>
                  <input
                    type="checkbox"
                    name="anonymous"
                    defaultChecked
                    className="mt-1 w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <div>
                    <span className="font-medium" style={{ color: '#1a1a1a' }}>Share anonymously</span>
                    <p className="text-sm mt-1" style={{ color: '#4a4a4a' }}>Hide my personal information from public view</p>
                  </div>
                </label>

                <label className="flex items-start space-x-4 p-4 rounded-xl border" style={{ backgroundColor: '#f3ecf8', borderColor: '#d1b3e0' }}>
                  <input
                    type="checkbox"
                    name="agreedToTerms"
                    required
                    className="mt-1 w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <div>
                    <span className="font-medium" style={{ color: '#1a1a1a' }}>I agree to the terms and conditions *</span>
                    <p className="text-sm mt-1" style={{ color: '#4a4a4a' }}>
                      I consent to sharing my story and understand the{' '}
                      <a 
                        href="https://docs.google.com/forms/d/e/1FAIpQLSduN_qkl1yr1T1exCvWOzjHXMeeEenbY_3gQ23TDvtS4dxflw/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700 underline font-medium"
                      >
                        privacy policy
                      </a>
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Share My Story'}
              </button>
              
              {submitMessage && (
                <div 
                  data-message
                  className={`mt-6 p-4 rounded-lg text-center font-medium ${
                    submitMessage.includes('successfully') || submitMessage.includes('Story submitted successfully')
                      ? 'bg-green-100 border-2 border-green-300 text-green-800' 
                      : 'bg-red-100 border-2 border-red-300 text-red-800'
                  }`}
                >
                  {submitMessage.includes('successfully') || submitMessage.includes('Story submitted successfully') ? (
                    <div>
                      <div className="text-2xl mb-2">✅</div>
                      <div className="text-lg font-bold mb-1">Success!</div>
                      <div>{submitMessage}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-2xl mb-2">❌</div>
                      <div className="text-lg font-bold mb-1">Error</div>
                      <div>{submitMessage}</div>
                    </div>
                  )}
                </div>
              )}
              
              <p className="text-sm mt-4" style={{ color: '#4a4a4a' }}>
                Your story will be reviewed before being added to the map
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
