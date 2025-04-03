'use client';

import { useState } from 'react';
import { supabase } from "../../lib/supabaseClient";

export default function BookingForm({ therapistId }) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('booking_requests').insert({
      therapist_id: therapistId,
      client_name: formData.clientName,
      client_email: formData.clientEmail,
      message: formData.message,
    });

    if (!error) {
      const { data: therapist, error: fetchError } = await supabase
        .from('therapists')
        .select('email, full_name')
        .eq('id', therapistId)
        .single();

      if (!fetchError && therapist?.email) {
        await fetch('/api/sendBookingEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            therapistEmail: therapist.email,
            therapistName: therapist.full_name,
            clientName: formData.clientName,
            clientEmail: formData.clientEmail,
          }),
        });
      }

      setSubmitted(true);
    } else {
      console.error('Booking error:', error.message);
    }
  };

  if (submitted) {
    return (
      <div className="p-4 rounded-xl shadow-md border border-purple-100 bg-white text-center">
        <p className="text-green-600 text-sm font-medium">
          ✅ Request sent! The therapist will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl p-4 shadow-md border border-gray-100 space-y-4"
        >
        <div className="space-y-1">
            <label className="text-xs text-gray-700 font-medium">Name</label>
            <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="w-full px-3 py-2 rounded-md bg-[#fdfcfa] border border-gray-200 shadow-inner text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
        </div>

        <div className="space-y-1">
            <label className="text-xs text-gray-700 font-medium">Email</label>
            <input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="w-full px-3 py-2 rounded-md bg-[#fdfcfa] border border-gray-200 shadow-inner text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
        </div>

        <div className="space-y-1">
            <label className="text-xs text-gray-700 font-medium">Message</label>
            <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            required
            placeholder="How can I support you?"
            className="w-full px-3 py-2 rounded-md bg-[#fdfcfa] border border-gray-200 shadow-inner text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
        </div>

        <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium py-2 rounded-lg hover:opacity-90 transition text-sm shadow"
        >
            Send Message
        </button>
        </form>
  );
} 