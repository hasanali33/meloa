'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../../lib/supabaseClient';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import BookingForm from '../../../components/BookingForm';

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
      <div className="min-h-screen flex items-center justify-center bg-[#fcfaff]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );

  return (
    <div className="min-h-screen relative text-gray-900 text-[17px] leading-relaxed">
      <div className="absolute inset-0 -z-10">
        <img src="/bg-blobs.png" alt="Background Blobs" className="w-full h-full object-cover" />
      </div>

      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm z-10 relative">
        <Link href="/">
          <h1 className="text-xl font-bold text-purple-600 cursor-pointer">meloa</h1>
        </Link>
        <div className="space-x-4">
          <Link href="/therapists">
            <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition">Browse</button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">Join</button>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto mt-10 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-12 space-y-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <img
            src={therapist.profile_image_url || '/default-profile.png'}
            alt={therapist.full_name}
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-200"
          />
          <h1 className="text-3xl font-bold text-blue-700">{therapist.full_name}</h1>
          <p className="text-base text-gray-500 italic">
            {therapist.is_licensed ? 'Licensed Therapist' : 'Healing Practitioner (Non-Clinical)'}
          </p>
          <a href="#book" className="mt-2 inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium px-5 py-2 rounded-full hover:opacity-90 transition">
            ✨ Book a Session
          </a>

          <div className="flex flex-wrap justify-center gap-6 mt-6 text-[16px]">
            <a href="#about" className="text-purple-600 hover:underline">About</a>
            <a href="#approach" className="text-purple-600 hover:underline">My Approach</a>
            <a href="#certifications" className="text-purple-600 hover:underline">Certifications</a>
            <a href="#vibe" className="text-purple-600 hover:underline">Vibe + Availability</a>
            <a href="#book" className="text-purple-600 hover:underline">Book a Session</a>
          </div>
        </div>

        <div className="space-y-20 text-[17px] text-gray-700">
          <section id="about">
            <h2 className="text-2xl font-semibold text-purple-700 mb-3">🧠 About</h2>
            <p>{therapist.bio}</p>
          </section>

          <section id="approach">
            <h2 className="text-2xl font-semibold text-purple-700 mb-3">🎨 My Approach</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-indigo-600 mb-1">Modalities</h3>
                <ul className="list-disc list-inside ml-4">
                  {therapist.modalities?.map((mod, idx) => (
                    <li key={idx}>{mod}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-pink-600 mb-1">Specialties</h3>
                <ul className="list-disc list-inside ml-4">
                  {therapist.specialties?.map((spec, idx) => (
                    <li key={idx}>{spec}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-600 mb-1">Healing Path</h3>
                <p>{therapist.healing_path || "No specific healing path selected"}</p>
              </div>
            </div>
          </section>

          {therapist.certifications && (
            <section id="certifications">
              <h2 className="text-2xl font-semibold text-purple-700 mb-3">📚 Certifications</h2>
              <ul className="list-disc list-inside ml-4">
                {therapist.certifications.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </section>
          )}

          <section id="vibe">
            <h2 className="text-2xl font-semibold text-purple-700 mb-3">🌿 Vibe + Availability</h2>
            <p className="mb-2"><strong className="text-green-600">Session Type:</strong> {therapist.session_type}</p>
            <p className="mb-2"><strong className="text-yellow-600">Session Cost:</strong> {therapist.session_cost}</p>
            {therapist.availability && (
              <p><strong className="text-teal-600">Available:</strong> {therapist.availability}</p>
            )}
            {therapist.vibe_tags?.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-green-700 mb-2">Vibe Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {therapist.vibe_tags.map((tag, idx) => (
                    <span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section id="book">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">📬 Book a Session</h2>
            <div className="mt-4">
              <BookingForm therapistId={therapist.user_id} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
