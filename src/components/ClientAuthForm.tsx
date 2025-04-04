import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

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

export default function AuthForm({ onAuthSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [healingIntent, setHealingIntent] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    let authResponse

    if (isSignUp) {
      authResponse = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { user_type: 'client' },
        },
      })

      const { data, error: signUpError } = authResponse

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      const user = data?.user
      if (user) {
        // Insert into clients table
        const { error: insertError } = await supabase.from('clients').insert({
          id: user.id,
          email: user.email,
          user_type: 'client',
          name,
          healing_intent: healingIntent,
        })

        if (insertError) {
          console.error('Error inserting into clients table:', insertError)
        }
      }
    } else {
      authResponse = await supabase.auth.signInWithPassword({ email, password })

      console.log('LOGIN:', authResponse.error)

      if (authResponse.error) {
        setError(authResponse.error.message)
        setLoading(false)
        return
      }
    }

    setLoading(false)

    if (onAuthSuccess) onAuthSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold">{isSignUp ? 'Create Account' : 'Login'}</h2>
      {error && <p className="text-red-500">{error}</p>}

      {isSignUp && (
        <>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />

          <select
            value={healingIntent}
            onChange={(e) => setHealingIntent(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select your intention</option>
            {healingIntentOptions.map((intent, i) => (
              <option key={i} value={intent}>
                {intent}
              </option>
            ))}
          </select>
        </>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Login'}
      </button>

      <p className="text-sm text-center mt-2">
        {isSignUp ? "Already have an account?" : "Don’t have an account?"}
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-500 ml-1"
        >
          {isSignUp ? 'Login' : 'Sign up'}
        </button>
      </p>
    </form>
  )
}
