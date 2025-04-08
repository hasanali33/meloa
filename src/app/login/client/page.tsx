'use client';

import ClientAuthForm from '@/components/ClientAuthForm';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ClientLoginPage() {
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

      {/* Login Form */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <ClientAuthForm onAuthSuccess={() => router.push('/client/dashboard')} />
      </main>
    </div>
  );
}
