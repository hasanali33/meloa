'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../../../lib/supabaseClient'

const healingIntentOptions = [
  "I'm navigating a breakup",
  "I'm feeling anxious all the time",
  "I want to explore my identity",
  "I'm burned out",
  "I need help processing trauma",
  "I'm stuck creatively",
  "I'm curious about spirituality",
  "I want to reconnect with my body",
  "I'm learning to set boundaries",
  "I want to love myself again",
  "I'm grieving someone or something",
  "I feel disconnected from who I am",
  "I want to feel more present",
  "I'm overwhelmed and don’t know why",
  "I want to rebuild trust in myself",
]

export default function ClientProfileEditPage() {
  const [name, setName] = useState('')
  const [healingIntent, setHealingIntent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchClient = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/login/client')

      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching client profile:', error)
      } else {
        setName(data.name || '')
        setHealingIntent(data.healing_intent || '')
      }

      setLoading(false)
    }

    fetchClient()
  }, [router])

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase
      .from('clients')
      .update({ name, healing_intent: healingIntent })
      .eq('id', user.id)

    if (error) {
      console.error(error)
      setMessage('❌ Error saving changes.')
    } else {
      setMessage('✅ Profile updated!')
      setTimeout(() => router.push('/client/dashboard'), 1200)
    }

    setSaving(false)
  }

  if (loading) return <p className="text-center mt-20">Loading profile...</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 px-6 py-12">
      <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-xl shadow-xl rounded-3xl p-8 space-y-8 border border-purple-100">
        <h1 className="text-2xl font-bold text-blue-700 text-center">✏️ Edit Your Profile</h1>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Healing Intention</span>
            <select
              value={healingIntent}
              onChange={(e) => setHealingIntent(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select your intention</option>
              {healingIntentOptions.map((intent, i) => (
                <option key={i} value={intent}>
                  {intent}
                </option>
              ))}
            </select>
          </label>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
          >
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>

          {message && (
            <p className="text-center text-sm text-gray-600 mt-2">{message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
