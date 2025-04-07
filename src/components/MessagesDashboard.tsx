'use client';

import { useState } from 'react';
import BookingRequests from '@/components/BookingRequests';
import MessagingPanel from '@/components/MessagingPanel';

export default function MessagesDashboard({ userId, userRole }) {
  const [selectedBooking, setSelectedBooking] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      <div className="md:col-span-1">
        <h2 className="font-bold mb-2">Your Conversations</h2>
        <BookingRequests userId={userId} userRole={userRole} onSelect={setSelectedBooking} />
      </div>

      <div className="md:col-span-2">
        <MessagingPanel booking={selectedBooking} userRole={userRole} />
      </div>
    </div>
  );
}
