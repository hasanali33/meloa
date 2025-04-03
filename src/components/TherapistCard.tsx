import React from 'react';
import Link from 'next/link';

const TherapistCard = ({ therapist }) => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-50 rounded-3xl shadow-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-5xl mx-auto mb-8 transition-transform hover:scale-105">
      {/* Profile Image */}
      <img
        src={therapist.profile_image_url || '/fallback-avatar.png'}
        alt={`${therapist.full_name}'s profile`}
        className="w-24 h-24 rounded-full object-cover border-4 border-purple-200 mx-auto sm:mx-0"
      />

      {/* Info Section */}
      <div className="flex-1 sm:mx-6 mt-4 sm:mt-0 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">{therapist.full_name}</h2>
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold text-center sm:text-left ${
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
            <span
              key={`spec-${idx}`}
              className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full"
            >
              {spec}
            </span>
          ))}
          {therapist.modalities?.map((mod, idx) => (
            <span
              key={`mod-${idx}`}
              className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full"
            >
              {mod}
            </span>
          ))}
          {therapist.vibe_tags?.map((vibe, idx) => (
            <span
              key={`vibe-${idx}`}
              className="bg-green-100 text-green-600 px-3 py-1 rounded-full"
            >
              {vibe}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex sm:flex-col flex-row justify-center sm:items-end items-center gap-3 mt-4 sm:mt-0">
        <Link
          href={`/therapists/${therapist.id}`}
          className="px-4 py-2 text-sm rounded-full border border-purple-500 text-purple-600 hover:bg-purple-50 font-semibold transition"
        >
          View Profile
        </Link>
        <Link
          href={`/therapists/${therapist.id}#booking-form`}
          className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 font-semibold transition"
        >
          Book Session
        </Link>
      </div>
    </div>
  );
};

export default TherapistCard;
