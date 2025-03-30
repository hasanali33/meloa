// TherapistCard.tsx
import React from 'react';
import Link from 'next/link';

const TherapistCard = ({ therapist }) => {
  return (
    <div className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white">
      <img
        src={therapist.profile_image_url}
        alt={`${therapist.full_name}'s profile`}
        className="w-full h-36 object-cover"
      />
      <div className="p-4 space-y-1">
        <h2 className="text-md font-semibold">{therapist.full_name}</h2>
        <p className="text-sm text-gray-500">{therapist.bio}</p>
        <p className="text-sm">
          <span className="font-semibold text-pink-600">🎨 Modalities:</span>{' '}
          {therapist.modalities?.join(', ')}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-pink-600">💖 Specialties:</span>{' '}
          {therapist.specialties?.join(', ')}
        </p>
        <div className="mt-2 flex justify-between items-center">
          <a
            href={therapist.calendly_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline"
          >
            Book a session →
          </a>
          <Link
            href={`/therapists/${therapist.id}`}
            className="text-sm text-purple-600 font-medium hover:underline"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TherapistCard;
