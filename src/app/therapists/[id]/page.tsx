'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../../lib/supabaseClient';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function TherapistProfile() {
  const { id } = useParams();
  const [therapist, setTherapist] = useState(null);

  useEffect(() => {
    async function fetchTherapist() {
      const { data, error } = await supabase
        .from('therapists')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error(error);
      else setTherapist(data);
    }

    if (id) fetchTherapist();
  }, [id]);

  if (!therapist)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );

  return (
    <div className="relative min-h-screen text-gray-900">
      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/bg-blobs.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 text-white relative z-10">
        <Link href="/">
          <h1 className="text-xl font-bold cursor-pointer hover:opacity-80 transition">meloa</h1>
        </Link>
        <div className="space-x-4">
          <button className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
            Browse Therapists
          </button>
          <button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition">
            Join as Therapist
          </button>
        </div>
      </header>

      {/* Therapist Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10">
        {/* Header Image */}
        <img
          src={therapist.profile_image_url}
          alt={therapist.full_name}
          className="w-full h-64 object-cover"
        />

        {/* Profile Info */}
        <div className="p-8 space-y-4">
          <h1 className="text-3xl font-extrabold text-blue-700">
            {therapist.full_name}
          </h1>
          <p className="text-gray-700">{therapist.bio}</p>

          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="text-purple-600 font-bold mb-2">🎨 Modalities</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {therapist.modalities?.map((mod, idx) => (
                  <li key={idx}>{mod}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-pink-600 font-bold mb-2">💖 Specialties</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {therapist.specialties?.map((spec, idx) => (
                  <li key={idx}>{spec}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6">
            <a
              href={therapist.calendly_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-full hover:scale-105 hover:opacity-90 transition transform"
            >
              🚀 Book a Session
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
