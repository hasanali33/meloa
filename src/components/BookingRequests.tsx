// components/BookingRequests.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function BookingRequests({ userId, userRole, onSelect }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      const column = userRole === 'therapist' ? 'therapist_id' : 'client_id';   
      const { data, error } = await supabase
        .from('booking_requests')
        .select('*')
        .eq(column, userId)
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching requests:', error);
      else setRequests(data);
    }

    if (userId) fetchRequests();
  }, [userId, userRole]);

  return (
    <div className="space-y-4">
      {requests.length === 0 && (
        <p className="text-sm text-gray-500">No booking requests yet.</p>
      )}
      {requests.map((req) => (
        <div
        key={req.id}
        onClick={() => onSelect(req)}
        className="cursor-pointer p-4 border border-purple-100 rounded-xl shadow-sm bg-white hover:shadow-md hover:bg-purple-50 transition-all"
      >
        <p className="font-semibold text-gray-800 text-base">{req.client_name}</p>
        <p className="text-xs text-gray-500 break-all">{req.client_email}</p>
        <p className="mt-2 text-sm text-gray-700 line-clamp-3 break-words">
          {req.message}
        </p>
      </div>      
      ))}
    </div>
  );
}