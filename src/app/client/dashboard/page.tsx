'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import MessagesDashboard from '@/components/MessagesDashboard'
import { supabase } from '../../../../lib/supabaseClient'
import UpcomingSessions from '@/components/UpcomingSessions';


export default function ClientDashboard() {
  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/"; // Redirect to homepage or login page
  };

  useEffect(() => {
    const fetchClient = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login/client')
        return
      }

      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching client:', error)
      } else {
        setClient(data)
      }

      setLoading(false)
    }

    fetchClient()
  }, [router])

  if (loading) return <p className="text-center mt-20">Loading...</p>
  if (!client) return <p className="text-center mt-20">Client profile not found.</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 space-y-10 border border-purple-100">
        <h1 className="text-3xl font-extrabold text-blue-700">
          👋 Welcome back, {client.name?.split(' ')[0] || 'Friend'}!
        </h1>

        {/* Healing Intention */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">🎯 Your Healing Intention</h2>
          <div className="flex items-center gap-3">
            <span className="bg-purple-200 text-purple-800 px-4 py-2 rounded-full text-sm">
              {client.healing_intent || 'Not set'}
            </span>
            <button
              onClick={() => router.push('/client/profile/edit')}
              className="text-sm text-blue-600 underline"
            >
              Edit My Intention
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="border-t pt-6 space-y-2">
          <h2 className="text-lg font-semibold">💬 Messages</h2>
          <MessagesDashboard userId={client.id} userRole="client" />
        </div>

        {/* Sessions */}
        <div className="border-t pt-6 space-y-4">
            <h2 className="text-lg font-semibold">📆 Upcoming Sessions</h2>
            <UpcomingSessions userId={client.id} userRole="client" />
        </div>


        {/* Guides */}
        <div className="border-t pt-6 space-y-2">
          <h2 className="text-lg font-semibold">🧑‍🎨 Matched Guides</h2>
          <p className="text-sm text-gray-600">
            We’ll show you recommended guides based on your intention.
          </p>
          <button
            onClick={() => router.push('/therapists')}
            className="inline-block text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Browse Guides
          </button>

          <div className="mt-6">
            <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
            Log Out
            </button>
        </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 pt-8">
          Your healing space. Built with 💜 by Meloa.
        </p>
      </div>
    </div>
  )
}
