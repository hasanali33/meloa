'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Link from 'next/link'

export default function UpcomingSessions({ userId, userRole }: { userId: string, userRole: 'client' | 'therapist' }) {
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSessions = async () => {
      const filterColumn = userRole === 'therapist' ? 'therapist_id' : 'client_id'

      const { data, error } = await supabase
        .from('sessions')
        .select(`
          *,
          booking_requests (
            client_name,
            therapist_id,
            client_id
          )
        `)
        .eq(filterColumn, userId)
        .gte('session_time', new Date().toISOString())
        .order('session_time', { ascending: true })

      if (error) console.error('Session fetch error:', error.message)
      else setSessions(data)

      setLoading(false)
    }

    if (userId) fetchSessions()
  }, [userId, userRole])

  if (loading) return <p>Loading upcoming sessions...</p>
  if (sessions.length === 0) return <p>No upcoming sessions found.</p>

  return (
    <div className="space-y-4">
      {sessions.map((session) => {
        const name =
          userRole === 'therapist'
            ? session.booking_requests?.client_name || 'N/A'
            : 'your guide' // you can replace with therapist name if needed

        const roomId = session.daily_room_url?.split('/').pop()

        return (
          <div key={session.id} className="border p-4 rounded-md shadow-sm bg-gray-50">
            <p className="font-semibold text-purple-700">
              📅 With {userRole === 'therapist' ? `Client: ${name}` : name}
            </p>
            <p className="text-sm text-gray-600">
              🕒 {new Date(session.session_time).toLocaleString()}
            </p>
            {roomId && (
              <Link
                href={`/session/${roomId}`}
                className="inline-block mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
              >
                Join Video Call
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}
