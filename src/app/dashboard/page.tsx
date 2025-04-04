'use client';

import { useState } from 'react';
import TherapistProfileEditor from '../../components/TherapistProfileEditor';
import BookingRequests from '../../components/BookingRequests';
import MessagingPanel from '../../components/MessagingPanel';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '../../../lib/supabaseClient'; // Make sure you have supabase client setup

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'requests' | 'messages' | 'profile'>('requests');
  const user = useUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
        <p className="text-xl text-gray-700">Please log in to access your dashboard.</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Sign out the user
    window.location.href = '/'; // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-purple-50 to-blue-50">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">📬 Your Dashboard</h1>

      {/* Logout Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded-full font-medium transition ${
            activeTab === 'requests'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-purple-600 border border-purple-300'
          }`}
        >
          Requests
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-full font-medium transition ${
            activeTab === 'messages'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-purple-600 border border-purple-300'
          }`}
        >
          Messages
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-full font-medium transition ${
            activeTab === 'profile'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-purple-600 border border-purple-300'
          }`}
        >
          Edit Profile
        </button>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-xl">
        {activeTab === 'requests' && <BookingRequests userId={user?.id} />}
        {activeTab === 'messages' && (
          <div className="text-gray-500 text-center py-10">
            Messaging is coming soon!
          </div>
        )}

        {activeTab === 'profile' && <TherapistProfileEditor user={user} />}
      </div>
    </div>
  );
}
