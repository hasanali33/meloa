'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import LoginModal from '@/components/LoginModal';
import BookingForm from '@/components/BookingForm';

const TherapistCard = ({ therapist }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false); // Booking form modal
  const [bookingSuccess, setBookingSuccess] = useState(false); // Track booking success
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const { data } = await supabase.auth.getUser(); // Check if the user is logged in
      setLoggedIn(!!data?.user); // Update login state
    };

    checkLogin();
  }, []);

  // Handle booking action, shows login modal if not logged in
  const handleBooking = (e, type) => {
    e.stopPropagation();
    if (loggedIn) {
      setShowBookingForm(true); // Show the booking form modal if logged in
    } else {
      setShowLoginModal(true); // Show login modal if not logged in
    }
  };

  // Handle successful login, opens booking form modal
  const handleLoginSuccess = () => {
    setShowLoginModal(false); // Close login modal upon successful login
    setShowBookingForm(true); // Open the booking form modal after login
  };

  // Handle successful booking, close the booking form modal and show success message
  const handleBookingSuccess = () => {
    setBookingSuccess(true); // Set booking success state
    setShowBookingForm(false); // Close the booking form modal
  };

  return (
    <>
      {/* Show login modal if not logged in */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLoginSuccess={handleLoginSuccess} />}

      <div
        onClick={() => router.push(`/therapists/${therapist.id}`)}
        className="cursor-pointer bg-gradient-to-r from-purple-100 to-blue-50 rounded-3xl shadow-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-5xl mx-auto mb-8 transition-transform hover:scale-105"
      >
        {/* Profile Image */}
        <img
          src={therapist.profile_image_url || '/fallback-avatar.png'}
          alt={`${therapist.full_name}'s profile`}
          className="w-24 h-24 rounded-full object-cover border-4 border-purple-200 mx-auto sm:mx-0"
        />

        {/* Info Section */}
        <div className="flex-1 sm:mx-6 mt-4 sm:mt-0 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
              {therapist.full_name}
            </h2>
            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${
                therapist.is_licensed
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {therapist.is_licensed ? 'Licensed Therapist' : 'Healing Practitioner (Non-Clinical)'}
            </span>
          </div>
          <p className="text-gray-600 text-sm text-center sm:text-left">{therapist.bio}</p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-sm">
            {therapist.specialties?.map((spec, idx) => (
              <span key={`spec-${idx}`} className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                {spec}
              </span>
            ))}
            {therapist.modalities?.map((mod, idx) => (
              <span key={`mod-${idx}`} className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                {mod}
              </span>
            ))}
            {therapist.vibe_tags?.map((vibe, idx) => (
              <span key={`vibe-${idx}`} className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
                {vibe}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex sm:flex-col flex-row justify-center sm:items-end items-center gap-3 mt-4 sm:mt-0"
        >
          <button
            onClick={(e) => handleBooking(e, 'intro')}
            className="px-4 py-2 text-sm rounded-full bg-green-500 text-white hover:bg-green-600 font-semibold transition"
          >
            Schedule a Free Intro Call
          </button>
          <button
            onClick={(e) => handleBooking(e, 'paid')}
            className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 font-semibold transition"
          >
            Book Session
          </button>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && !bookingSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <button onClick={() => setShowBookingForm(false)} className="absolute top-2 right-2">X</button>
            <BookingForm therapistId={therapist.user_id} onSubmit={handleBookingSuccess} />
          </div>
        </div>
      )}

      {/* Booking Success Message */}
      {bookingSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-green-200 p-6 rounded-xl shadow-xl w-96">
            <p className="text-center text-green-600 text-lg">✅ Your session has been booked! You'll receive a confirmation email shortly.</p>
            <button onClick={() => setBookingSuccess(false)} className="w-full bg-green-500 text-white py-2 rounded-full mt-4 font-medium text-sm hover:bg-green-600 transition">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TherapistCard;
