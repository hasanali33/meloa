'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import TherapistCard from '@/components/TherapistCard';
import Link from 'next/link'; // make sure this is at the top

export default function TherapistList() {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    async function fetchTherapists() {
      const { data, error } = await supabase.from('therapists').select('*');
      if (error) console.error('❌', error);
      else setTherapists(data);
    }
    fetchTherapists();
  }, []);

  return (
    <div className="relative min-h-screen">
  {/* Full-page background blob */}
  <div className="absolute inset-0">
    <img
      src="/bg-blobs.png"
      alt="Background"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Everything else */}
  <div className="relative z-10">
    {/* Header */}
    <header className="flex justify-between items-center px-6 py-4 text-white">
      <Link href="/"> 
        <h1 className="text-xl font-bold">meloa</h1>
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

    {/* Title */}
    <h2 className="text-4xl font-extrabold text-center text-white my-12 drop-shadow">
      Meet Our Therapists
    </h2>

    {/* Grid */}
    <div className="px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {therapists.map((therapist) => (
        <TherapistCard key={therapist.id} therapist={therapist} />
      ))}
    </div>
  </div>
</div>
  );
}
