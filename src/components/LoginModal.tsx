'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAuth = async () => {
    setLoading(true)
    setError('')

    const { data, error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      onClose() // close modal
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-bold text-center">
          {isSignUp ? 'Create Account' : 'Log In to Meloa'}
        </h2>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold"
        >
          {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Log In'}
        </button>

        <p className="text-sm text-center text-gray-500">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 underline"
          >
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  )
}
