'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const TherapistCard = ({ therapist }) => {
  const router = useRouter();

  const handleRedirect = (e) => {
    e.stopPropagation();
    router.push(`/therapists/${therapist.id}`);
  };

  return (
    <>
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
            onClick={handleRedirect}
            className="px-4 py-2 text-sm rounded-full bg-green-500 text-white hover:bg-green-600 font-semibold transition"
          >
            Schedule a Free Intro Call
          </button>
          <button
            onClick={handleRedirect}
            className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 font-semibold transition"
          >
            Book Session
          </button>
        </div>
      </div>
    </>
  );
};

export default TherapistCard;
