'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import TherapistProfileEditor from '../../components/TherapistProfileEditor';
import UpcomingSessions from '../../components/UpcomingSessions';
import MessagesDashboard from '../../components/MessagesDashboard';
import { useRouter } from 'next/navigation';

export default function HealerDashboard() {
  const [therapist, setTherapist] = useState<any>(null);
  const [supabaseUser, setSupabaseUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTherapist = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      setSupabaseUser(user); // 👈 This is the Supabase auth user

      const { data, error } = await supabase
        .from('therapists')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching therapist profile:', error);
      } else {
        setTherapist(data);
      }

      setLoading(false);
    };

    fetchTherapist();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!therapist || !supabaseUser) {
    return <p className="text-center mt-20 text-red-500">Therapist profile not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-800">🦜 Healer Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h2 className="text-lg font-semibold text-purple-700 mb-2">🗓️ Upcoming Sessions</h2>
          <UpcomingSessions userId={therapist.user_id} userRole="therapist" />
        </div>

        {/* Messages */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h2 className="text-lg font-semibold text-purple-700 mb-2">🛍️ Messages</h2>
          <div className="h-[400px] overflow-y-auto border rounded-md">
            <MessagesDashboard userId={therapist.user_id} userRole="therapist" />
          </div>
        </div>
      </div>

      {/* Profile Editor */}
      <div className="bg-white rounded-2xl shadow-md p-5">
        <h2 className="text-lg font-semibold text-purple-700 mb-4">📝 Edit Profile</h2>
        <TherapistProfileEditor user={supabaseUser} /> {/* ✅ Passing real auth user */}
      </div>
    </div>
  );
}
