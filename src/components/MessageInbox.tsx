'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useUser } from '@supabase/auth-helpers-react';
import { Loader2 } from 'lucide-react';

export default function MessageInbox() {
  const user = useUser();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('booking_requests')
        .select('*')
        .eq('therapist_id', user.id)
        .order('created_at', { ascending: false });

      if (error) console.error('Fetch error:', error);
      else setRequests(data);
      setLoading(false);
    }

    fetchRequests();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">📥 Messages</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">No messages yet.</p>
      ) : (
        <div className="space-y-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="border border-purple-100 rounded-xl p-4 shadow-sm bg-white"
            >
              <p className="text-sm text-gray-500 mb-1">{new Date(req.created_at).toLocaleString()}</p>
              <p className="font-semibold">{req.client_name} ({req.client_email})</p>
              <p className="mt-2 text-gray-800">{req.message}</p>
              <div className="mt-4">
                {/* Reply feature will go here */}
                <button className="text-sm text-blue-600 underline hover:text-blue-800">
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
