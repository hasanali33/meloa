'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function BookingRequests({ userId, userRole, onSelect }) {
  const [requests, setRequests] = useState([]);
  const [loadingNames, setLoadingNames] = useState(true); // Track if names are still loading

  useEffect(() => {
    async function fetchRequests() {
      const column = userRole === 'therapist' ? 'therapist_id' : 'client_id';
      const { data, error } = await supabase
        .from('booking_requests')
        .select('*')
        .eq(column, userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching requests:', error);
        return;
      }

      // Dynamically fetch the OTHER person's name
      const enriched = await Promise.all(
        data.map(async (req) => {
          const otherId = userRole === 'therapist' ? req.client_id : req.therapist_id;
          const table = userRole === 'therapist' ? 'clients' : 'therapists';
          const field = userRole === 'therapist' ? 'name' : 'full_name';

          const { data: other, error: otherErr } = await supabase
            .from(table)
            .select(field)
            .eq('id', otherId)
            .single();

          return {
            ...req,
            otherName: other?.[field] || 'Unknown',
          };
        })
      );

      setRequests(enriched);
      setLoadingNames(false); // Set loading to false after names are fetched
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
          <p className="font-semibold text-gray-800 text-base">
            {userRole === 'therapist'
              ? `${loadingNames ? 'Loading...' : req.otherName} has booked a session with you`
              : `You have booked a session with ${loadingNames ? 'Loading...' : req.otherName}`}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            🗓️ {new Date(req.session_time).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 mt-1">Feel free to talk here.</p>
        </div>
      ))}
    </div>
  );
}
