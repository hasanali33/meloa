'use client'

import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '../../../lib/supabaseClient';
import TherapistProfileEditor from '../../components/TherapistProfileEditor';
import UpcomingSessions from '../../components/UpcomingSessions';
import MessagesDashboard from '../../components/MessagesDashboard';

export default function HealerDashboard() {
  const user = useUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
        <p className="text-xl text-gray-700">Please log in to access your dashboard.</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

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

      {/* Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h2 className="text-lg font-semibold text-purple-700 mb-2">🗓️ Upcoming Sessions
          </h2>
          <UpcomingSessions userId={user.id} userRole="therapist" />
        </div>

        {/* Messages Dashboard with Scroll */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h2 className="text-lg font-semibold text-purple-700 mb-2">🛍️ Messages
          </h2>
          <div className="h-[400px] overflow-y-auto border rounded-md">
            <MessagesDashboard userId={user.id} userRole="therapist" />
          </div>
        </div>
      </div>

      {/* Profile Editor Full Width */}
      <div className="bg-white rounded-2xl shadow-md p-5">
        <h2 className="text-lg font-semibold text-purple-700 mb-4">📝 Edit Profile
        </h2>
        <TherapistProfileEditor user={user} />
      </div>
    </div>
  );
}
