'use client'

import ClientAuthForm from '@/components/ClientAuthForm'
import { useRouter } from 'next/navigation'

export default function ClientLoginPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <ClientAuthForm onAuthSuccess={() => router.push('/client/dashboard')} />
    </div>
  )
}
