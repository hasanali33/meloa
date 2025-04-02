import React from 'react';
import Link from 'next/link';
import TherapistCard from '@/components/TherapistCard';


const TherapistCard = ({ therapist }) => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-50 rounded-3xl shadow-xl p-6 flex items-center justify-between max-w-5xl mx-auto mb-8 transition-transform hover:scale-105">
      {/* Profile Image */}
      <img
        src={therapist.profile_image_url || '/fallback-avatar.png'}
        alt={`${therapist.full_name}'s profile`}
        className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
      />

      {/* Info Section */}
      <div className="flex-1 mx-6 space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-gray-800">{therapist.full_name}</h2>
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
        <p className="text-gray-600 text-sm">{therapist.bio}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-sm">
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
      <div className="flex flex-col items-end gap-2">
        <Link
          href={`/therapists/${therapist.id}`}
          className="text-sm text-purple-600 hover:underline font-medium"
        >
          View Profile
        </Link>
        <a
          href={therapist.calendly_link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 text-sm rounded-full hover:opacity-90 transition"
        >
          Book Session
        </a>
      </div>
    </div>
  );
};

export default TherapistCard;

