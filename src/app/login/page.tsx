'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import Navbar from '../../components/NavBar';

export default function LoginLandingPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Default to /client/dashboard for now (or customize based on role if needed)
        router.push('/client/dashboard');
      } else {
        setChecking(false);
      }
    };

    checkUser();
  }, [router]);

  if (checking) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Navbar />
      <div className="flex flex-col justify-center items-center text-center px-6 h-[calc(100vh-80px)]">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Who’s logging in?</h1>
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button
            onClick={() => router.push('/login/client')}
            className="bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-600 transition"
          >
            I am a client
          </button>
          <button
            onClick={() => router.push('/login/healer')}
            className="bg-purple-500 text-white py-3 rounded-lg shadow hover:bg-purple-600 transition"
          >
            I’m a guide
          </button>
        </div>
      </div>
    </div>
  );
}
