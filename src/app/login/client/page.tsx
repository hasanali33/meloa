'use client';

import ClientAuthForm from '@/components/ClientAuthForm';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/NavBar';

export default function ClientLoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Navbar />
      {/* Login Form */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <ClientAuthForm onAuthSuccess={() => router.push('/client/dashboard')} />
      </main>
    </div>
  );
}