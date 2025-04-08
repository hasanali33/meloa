'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginLandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* 💡 Light Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow border-b border-gray-100">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-purple-700">
            meloa
          </Link>
          <Link href="/about" className="text-sm text-gray-600 hover:text-purple-600">
            About
          </Link>
          <Link href="/how-it-works" className="text-sm text-gray-600 hover:text-purple-600">
            How It Works
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/signup"
            className="text-sm px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
          >
            Join as a Guide
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-col justify-center items-center text-center px-6 py-20">
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
      </main>
    </div>
  );
}
