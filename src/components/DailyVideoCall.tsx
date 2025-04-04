'use client'

import { useEffect, useRef } from 'react'
import DailyIframe from '@daily-co/daily-js'

export default function DailyVideoCall({ roomUrl }: { roomUrl: string }) {
  const callRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!roomUrl || !callRef.current) return

    const frame = DailyIframe.createFrame(callRef.current, {
      showLeaveButton: true,
      iframeStyle: {
        width: '100%',
        height: '100%',
        border: '0',
        borderRadius: '16px',
      },
    })

    frame.join({ url: roomUrl })

    return () => {
      frame.destroy()
    }
  }, [roomUrl])

  return (
    <div className="w-full h-screen bg-white">
      <div ref={callRef} className="w-full h-full" />
    </div>
  )
}
