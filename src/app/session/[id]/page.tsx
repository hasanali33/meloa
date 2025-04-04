'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '../../../../lib/supabaseClient'
import DailyVideoCall from '@/components/DailyVideoCall'

export default function SessionPage() {
  const { id } = useParams()
  const router = useRouter()
  const [roomUrl, setRoomUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/login/client')

      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', id)
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

      setRoomUrl(data.daily_room_url)
      setLoading(false)
    }

    fetchSession()
  }, [id, router])

  if (loading) return <p className="text-center mt-20">Loading session...</p>
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>
  if (!roomUrl) return <p className="text-center mt-20">No video room set for this session.</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <h1 className="text-xl font-bold mb-4 text-center text-blue-700">🎥 Your Healing Session</h1>
      <DailyVideoCall roomUrl={roomUrl} />
    </div>
  )
}
