// File: app/healing/[slug]/page.tsx

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import Link from 'next/link';
import { healingPaths } from '../../data/healingPaths';
import TherapistCard from '@/components/TherapistCard';



export default function HealingPathPage() {
  const { slug } = useParams();
  const path = healingPaths[slug as string];

  const [therapists, setTherapists] = useState([]);
  const [showAll, setShowAll] = useState(false);
  

  useEffect(() => {
    const fetchTherapists = async () => {
      const { data } = await supabase
        .from('therapists')
        .select('*')
        .contains('healing_path', [path.supabaseKey]);

      setTherapists(data || []);
    };

    if (path) fetchTherapists();
  }, [slug]);

  if (!path) return <div className="text-center p-10 text-xl">Healing path not found.</div>;

  return (
    <div className="relative min-h-screen text-white">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <img src="/bg-blobs.png" alt="Background" className="w-full h-full object-cover opacity-100" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-28">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">{path.title}</h1>
        <p className="text-lg text-center mb-10">{path.description.intro}</p>

        <div className="bg-white bg-opacity-90 text-gray-900 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">What is this healing path?</h2>
            <p>{path.description.what}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Who is this for?</h2>
            <p>{path.description.who}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">What might a session look like?</h2>
            <p>{path.description.session}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-8 mb-3">Guides Who Practice This</h2>
            <div className="space-y-6">
                {(showAll ? therapists : therapists.slice(0, 2)).map((t) => (
                    <TherapistCard key={t.id} therapist={t} />
                ))}
            </div>


            {therapists.length > 2 && !showAll && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                >
                  See More Guides
                </button>
              </div>
            )}
            {therapists.length > 0 && (
            <div className="text-center mt-8">
                <Link
                href={{
                    pathname: '/therapists',
                    query: { healingPath: path.supabaseKey }, // match what's stored in supabase
                }}
                >
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-medium shadow hover:opacity-90 transition">
                    ✨ Explore More Guides on This Path
                </button>
                </Link>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
