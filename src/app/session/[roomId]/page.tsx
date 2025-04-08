'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '../../../../lib/supabaseClient'
import DailyVideoCall from '@/components/DailyVideoCall'
import Navbar from '../../../components/NavBar'

export default function SessionPage() {
  const { roomId } = useParams()
  const router = useRouter()
  const [roomUrl, setRoomUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dashboardRoute, setDashboardRoute] = useState<string | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/login/client')

      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('daily_room_url', `https://meloa.daily.co/${roomId}`)
        .single()

      if (error || !data) {
        setError('Session not found or you don’t have access.')
        setLoading(false)
        return
      }

      const isClient = data.client_id === user.id
      const isTherapist = data.therapist_id === user.id

      if (!isClient && !isTherapist) {
        setError('You are not part of this session.')
        setLoading(false)
        return
      }

      // Set dashboard route
      setDashboardRoute(isClient ? '/client/dashboard' : '/dashboard')
      setRoomUrl(data.daily_room_url)
      setLoading(false)
    }

    fetchSession()
  }, [roomId, router])

  if (loading) return <p className="text-center mt-20">Loading session...</p>
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>
  if (!roomUrl) return <p className="text-center mt-20">No video room set for this session.</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <Navbar />

      <main className="p-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 mb-6">
          {dashboardRoute && (
            <button
              onClick={() => router.push(dashboardRoute)}
              className="text-sm px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
            >
              ← Go Back to Dashboard
            </button>
          )}
          <h1 className="text-xl font-bold text-center text-blue-700">🎥 Your Healing Session</h1>
        </div>

        <div className="max-w-6xl mx-auto">
          <DailyVideoCall roomUrl={roomUrl} />
        </div>
      </main>
    </div>
  )
}
