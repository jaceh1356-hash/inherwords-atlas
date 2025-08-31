'use client'

import { useState } from 'react'
import SimpleHeader from '@/components/SimpleHeader'
import SimpleFooter from '@/components/SimpleFooter'
import type { Metadata } from "next";

// Note: Since this is a client component, metadata will be handled by the parent layout
// For better SEO, we could convert this to a server component with client components for interactive parts

export default function SubmitPage() {
  return (    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#c4b5d6' }}>
      <div className="flex-grow">
        <SimpleHeader />

        {/* Hero Section */}
        <section className="py-12 px-6" style={{ backgroundColor: '#c4b5d6' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#1a1a1a' }}>
              Share Your Story
            </h1>

            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#1a1a1a' }}>
              Your experience can inspire others, create connections, and contribute to positive
              change. Share your story in a safe, supportive environment. Your story will be published on our interactive map to help others around the world.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-6 pt-2" style={{ backgroundColor: '#c4b5d6' }}>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Help Others Feel Less Alone - Left */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0f7c7c' }}>
                  <svg className="w-8 h-8" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                  Reduce Others' Isolation
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#1a1a1a' }}>
                  Connect with others who share similar experiences and build a supportive community.
                </p>
              </div>

              {/* Create Global Impact - Center */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0f7c7c' }}>
                  <svg className="w-8 h-8" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                  Create Global Impact
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#1a1a1a' }}>
                  Your story contributes to raising awareness and driving positive change worldwide.
                </p>
              </div>

              {/* Complete Privacy Protection - Right */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0f7c7c' }}>
                  <svg className="w-8 h-8" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                  Complete Privacy Protection
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#1a1a1a' }}>
                  Share your story anonymously with full control over your personal information.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Form Section */}
        <SimpleShareStoryForm />
      </div>

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
        email: formData.get('email'),
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
        
        // If email was provided, mention they'll get a confirmation
        const emailValue = formData.get('email')
        if (emailValue && emailValue.toString().trim()) {
          setSubmitMessage('✅ Story submitted successfully! It will be reviewed before being added to the map. A confirmation email will be sent to you.')
        }
        
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
    <section className="pb-12 px-6" style={{ backgroundColor: '#c4b5d6' }}>
      <div className="max-w-4xl mx-auto">
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

            {/* Email for Confirmation */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-900 text-lg"
                style={{ backgroundColor: '#f8f9fa' }}
              />
              <p className="text-xs mt-1" style={{ color: '#4a4a4a' }}>
                Put your email if you want a copy emailed to yourself
              </p>
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="country" className="block text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  required
                  placeholder="e.g., United States"
                  className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-900 text-lg"
                  style={{ backgroundColor: '#f8f9fa' }}
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                  City/Region
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
                    : 'text-white'
                }`}
                style={{
                  backgroundColor: isSubmitting ? undefined : '#0f7c7c'
                }}
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
