'use client';

import TherapistLogin from '@/components/TherapistLogin';
import Link from 'next/link';

export default function TherapistLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
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

      {/* Login Form */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-purple-100">
        <TherapistLogin />
      </div>

    </div>
  );
}
