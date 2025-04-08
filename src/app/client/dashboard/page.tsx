'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import MessagesDashboard from '@/components/MessagesDashboard';
import UpcomingSessions from '@/components/UpcomingSessions';
import Link from 'next/link';

export default function ClientDashboard() {
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchClient = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login/client');
        return;
      }

      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) console.error('Error fetching client:', error);
      else setClient(data);

      setLoading(false);
    };

    fetchClient();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!client) return <p className="text-center mt-20 text-red-500">Client profile not found.</p>;

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
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="p-4 md:p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">
            👋 Welcome back, {client.name?.split(' ')[0] || 'Friend'}!
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Healing Intention */}
          <div className="col-span-6 bg-white p-6 rounded-xl shadow border border-purple-100">
            <h2 className="text-lg font-bold text-purple-700 mb-2">🎯 Your Healing Intention</h2>
            <div className="flex flex-wrap gap-3 items-center">
              <span className="bg-purple-200 text-purple-800 px-4 py-2 rounded-full text-sm">
                {client.healing_intent || 'Not set'}
              </span>
              <button
                onClick={() => router.push('/client/profile/edit')}
                className="text-sm text-blue-600 underline"
              >
                Edit My Intention
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="col-span-6 md:col-span-4 bg-white p-6 rounded-xl shadow border border-purple-100">
            <h2 className="text-lg font-bold text-purple-700 mb-4">💬 Messages</h2>
            <MessagesDashboard userId={client.id} userRole="client" />
          </div>

          {/* Upcoming Sessions */}
          <div className="col-span-6 md:col-span-2 bg-white p-6 rounded-xl shadow border border-purple-100">
            <h2 className="text-lg font-bold text-purple-700 mb-4">📆 Upcoming Sessions</h2>
            <UpcomingSessions userId={client.id} userRole="client" />
          </div>

          {/* Matched Guides */}
          <div className="col-span-6 bg-white p-6 rounded-xl shadow border border-purple-100">
            <h2 className="text-lg font-bold text-purple-700 mb-2">🧑‍🎨 Matched Guides</h2>
            <p className="text-sm text-gray-600 mb-4">
              We’ll show you recommended guides based on your intention.
            </p>
            <button
              onClick={() => router.push('/therapists')}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg"
            >
              Browse Guides
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-10">
          Your healing space. Built with 💜 by Meloa.
        </p>
      </main>
    </div>
  );
}
