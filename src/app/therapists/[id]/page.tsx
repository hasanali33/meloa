'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../../lib/supabaseClient';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import BookingForm from '../../../components/BookingForm';
import { DM_Serif_Display, Inter } from 'next/font/google';

const serif = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function TherapistProfile() {
  const { id } = useParams();
  const [therapist, setTherapist] = useState(null);
  const [showProviderMenu, setShowProviderMenu] = useState(false);

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
    <div className={`min-h-screen relative ${inter.variable} ${serif.variable} font-sans`}>
      <div className="absolute inset-0 -z-20">
        <img src="/bg-blobs.png" alt="Background Blobs" className="w-full h-full object-cover" />
      </div>

        {/* Navbar */}
        <header className="flex justify-between items-center px-6 py-4 bg-transparent text-white z-10 relative">
        <div className="flex items-center space-x-8 relative">
          <h1 className="text-3xl font-bold">meloa</h1>
          <Link href="/about">
            <span className="hover:underline cursor-pointer">About</span>
          </Link>
          <Link href="/how-it-works">
            <span className="hover:underline cursor-pointer">How It Works</span>
          </Link>
          <div className="relative">
            <span
              className="hover:underline cursor-pointer"
              onClick={() => setShowProviderMenu(!showProviderMenu)}
            >
              For Providers
            </span>
            {showProviderMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-md overflow-hidden z-50">
                <Link href="/signup">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Join as a Guide</div>
                </Link>
                <Link href="/login">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Log In</div>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="space-x-4">
          <Link href="/therapists">
            <button className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">Connect with a Guide</button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition">Join as a Guide</button>
          </Link>
        </div>
      </header>

      <div className="relative z-10 flex justify-center py-16 px-4">
        <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md rounded-[32px] shadow-2xl p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <section>
              <h2 className="text-4xl font-serif text-gray-900 mb-3">Welcome</h2>
              <p className="text-gray-700 text-[17px] leading-relaxed font-inter">
                I’m <span className="text-purple-600 font-semibold">{therapist.full_name.split(' ')[0]}</span>, and I’m here to help you reconnect with your body and your ancestral wisdom.
              </p>
            </section>

            <section className="bg-[#ffeef0] p-6 rounded-2xl">
              <h3 className="text-2xl font-serif text-pink-600 mb-3">💖 About</h3>
              <p className="text-gray-700 text-[16px] font-inter leading-relaxed">{therapist.bio}</p>
            </section>

            <section className="bg-[#eafaf0] p-6 rounded-2xl min-h-[380px]">
              <h3 className="text-2xl font-serif text-green-700 mb-3">🌿 My Approach</h3>
              <p className="text-gray-700 text-[16px] font-inter mb-4">
                Together, we’ll explore practices that support deep healing, embodiment, and wholeness.
              </p>
              <div className="text-[15px] text-gray-800 font-inter space-y-4">
                <div>
                  <p className="font-semibold mb-2">✨ Modalities:</p>
                  <ul className="space-y-2">
                    {therapist.modalities?.map((item, i) => (
                      <li key={i}>✨ {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">🌿 Specialties:</p>
                  <ul className="space-y-2">
                    {therapist.specialties?.map((item, i) => (
                      <li key={i}>🌿 {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">🌈 Healing Path:</p>
                  <ul className="space-y-2">
                  {Array.isArray(therapist.healing_path)
                    ? therapist.healing_path.map((item, i) => (
                        <li key={i}>💫 {item.trim()}</li>
                        ))
                    : typeof therapist.healing_path === 'string'
                    ? therapist.healing_path.split(',').map((item, i) => (
                        <li key={i}>💫 {item.trim()}</li>
                        ))
                    : null}
                  </ul>
                </div>
              </div>
              {therapist.vibe_tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {therapist.vibe_tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <img
                src={therapist.profile_image_url || '/default-profile.png'}
                alt={therapist.full_name}
                className="w-40 h-40 rounded-full object-cover border-4 border-purple-200"
              />
              <h1 className="text-3xl font-serif font-bold text-purple-700 mt-4 tracking-tight">{therapist.full_name}</h1>
              <p className="text-lg text-black font-semibold mt-1 font-inter">
                {therapist.is_licensed ? 'Licensed Therapist' : 'Healing Guide · Body-Centered'}
              </p>
            </div>

            <section className="bg-[#fff6e7] p-6 rounded-2xl">
              <h3 className="text-2xl font-serif text-orange-500 mb-3">🌸 Vibe + Availability</h3>
              <div className="text-[15px] text-gray-800 font-inter space-y-1">
                <p>🧘‍♀️ <strong>Offerings:</strong> Individual Sessions</p>
                <p>📅 <strong>Availability:</strong> {therapist.availability || '—'}</p>
                <p>💻 <strong>Session Type:</strong> {therapist.session_type || '—'}</p>
              </div>
              {therapist.vibe_tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {therapist.vibe_tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </section>

            <div className="bg-[#f7f4ff] p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-serif text-purple-700 mb-3">Start Your Healing Journey</h2>
              <p className="text-gray-700 text-sm mb-4 font-inter">
                Send me a message letting me know what you’d like or ask any questions you have.
              </p>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={therapist.profile_image_url || '/default-profile.png'}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-sm text-gray-600 italic font-inter">
                  {therapist.full_name.split(' ')[0]} typically replies within 24 hours.
                </p>
              </div>
              <BookingForm therapistId={therapist.user_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

