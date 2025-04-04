// pages/api/create-session.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { clientId, therapistId, sessionTime } = req.body

  if (!clientId || !therapistId || !sessionTime) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // 1. Create Daily room
    const dailyRes = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          enable_chat: true,
          start_video_off: false,
          start_audio_off: false,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2, // expires in 2 hrs
        },
      }),
    })

    const dailyRoom = await dailyRes.json()
    if (!dailyRes.ok) {
      console.error('Daily error:', dailyRoom)
      return res.status(500).json({ error: 'Failed to create video room' })
    }

    const roomUrl = dailyRoom.url

    // 2. Insert session into Supabase
    const supabaseRes = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/sessions`, {
      method: 'POST',
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        client_id: clientId,
        therapist_id: therapistId,
        session_time: sessionTime,
        daily_room_url: roomUrl,
        status: 'scheduled',
      }),
    })

    const session = await supabaseRes.json()

    if (!supabaseRes.ok || !session?.[0]?.id) {
      console.error('Supabase insert error:', session)
      return res.status(500).json({ error: 'Failed to create session in Supabase' })
    }

    return res.status(200).json({ session: session[0] })
  } catch (err) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
