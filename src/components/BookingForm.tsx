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
  
    // Insert booking
    const { error } = await supabase.from('booking_requests').insert({
      therapist_id: therapistId,
      client_name: formData.clientName,
      client_email: formData.clientEmail,
      message: formData.message,
    });
  
    if (!error) {
      // Get therapist's info
      const { data: therapist, error: fetchError } = await supabase
        .from('therapists')
        .select('email, full_name')
        .eq('id', therapistId)
        .single();
  
      if (!fetchError && therapist?.email) {
        // Send notification email
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
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-purple-100">
        <p className="text-green-600 text-center text-lg font-medium">
          ✅ Request sent! The therapist will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl border border-purple-100">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">💌 Book a Session</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-700 font-medium">Your Name</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 font-medium">Your Email</label>
          <input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 font-medium">Describe what you're looking for</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
        >
          ✨ Send Request
        </button>
      </form>
    </div>
  );
}
