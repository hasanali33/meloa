'use client';

import { useEffect, useState } from 'react';
import { supabase } from "../../lib/supabaseClient";

export default function BookingRequests({ userId }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      const { data, error } = await supabase
        .from('booking_requests')
        .select('*')
        .eq('therapist_id', userId)
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching requests:', error);
      else setRequests(data);
    }

    if (userId) fetchRequests();
  }, [userId]);

  return (
    <div className="space-y-4">
      {requests.length === 0 && (
        <p className="text-sm text-gray-500">No booking requests yet.</p>
      )}
      {requests.map((req) => (
        <div
          key={req.id}
          className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
        >
          <p className="font-semibold">{req.client_name}</p>
          <p className="text-xs text-gray-500">{req.client_email}</p>
          <p className="mt-1 text-sm">{req.message}</p>
        </div>
      ))}
    </div>
  );
}
