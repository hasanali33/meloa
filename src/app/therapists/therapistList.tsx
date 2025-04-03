'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import TherapistCard from '@/components/TherapistCard';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

export default function TherapistList() {
  const [therapists, setTherapists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showProviderMenu, setShowProviderMenu] = useState(false);
  const therapistsPerPage = 15;
  const searchParams = useSearchParams();
  const router = useRouter();

  const modalityParam = searchParams.get('modality');
  const specialtyParam = searchParams.get('specialty');
  const healingPathParam = searchParams.get('healingPath'); // ✅ changed here

  const selectedModalities = modalityParam ? decodeURIComponent(modalityParam).split(',') : [];
  const selectedSpecialties = specialtyParam ? decodeURIComponent(specialtyParam).split(',') : [];
  const selectedHealingPaths = healingPathParam ? decodeURIComponent(healingPathParam).split(',') : [];

  useEffect(() => {
    async function fetchTherapists() {
      let { data, error } = await supabase.from('therapists').select('*');
      if (error) console.error('❌', error);
      else setTherapists(data);
    }
    fetchTherapists();
  }, []);

  const filteredTherapists = therapists.filter((t) => {
    const matchesModality =
      selectedModalities.length === 0 ||
      t.modalities?.some((mod) => selectedModalities.includes(mod));
    const matchesSpecialty =
      selectedSpecialties.length === 0 ||
      t.specialties?.some((spec) => selectedSpecialties.includes(spec));
    const matchesHealingPath =
      selectedHealingPaths.length === 0 ||
      t.healing_path?.some((path) => selectedHealingPaths.includes(path)); // ✅ this matches the supabase field

    return matchesModality && matchesSpecialty && matchesHealingPath;
  });

  const indexOfLast = currentPage * therapistsPerPage;
  const indexOfFirst = indexOfLast - therapistsPerPage;
  const currentTherapists = filteredTherapists.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTherapists.length / therapistsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const allModalities = [
    'Art Therapy', 'Music Therapy', 'Dance Therapy', 'Drama Therapy',
    'Breathwork', 'Somatic Therapy', 'Parts Work', 'Journaling',
    'Inner Child Healing', 'Creative Expression', 'Guided Visualization',
    'EFT Tapping', 'Spiritual Counseling'
  ];

  const allSpecialties = [
    'Anxiety', 'Grief', 'Trauma', 'Depression', 'Relationships',
    'Self-Esteem', 'Burnout', 'Creative Blocks', 'Spiritual Exploration',
    'Life Transitions', 'PTSD', 'LGBTQ+', 'Cultural Identity'
  ];

  const allHealingPaths = [
    'Somatic Healing',
    'Creative Expression',
    'Inner Child Work',
    'Spiritual Healing',
    'Cultural Healing',
    'Mindfulness-Based Healing'
  ];

  const updateQuery = (type, value) => {
    const selected = type === 'modality' ? selectedModalities : type === 'specialty' ? selectedSpecialties : selectedHealingPaths;
    const updated = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(type, encodeURIComponent(updated.join(',')));
    router.push(`/therapists?${newParams.toString()}`);
    setCurrentPage(1);
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10">
        <img src="/bg-blobs.png" alt="Background" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Navbar */}
        <header className="flex justify-between items-center px-6 py-4 bg-transparent text-white z-10 relative">
          <div className="flex items-center space-x-8 relative">
            <Link href="/">
            <h1 className="text-3xl font-bold">meloa</h1>
            </Link>
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

        <h2 className="text-4xl font-extrabold text-center text-white my-8">Meet Your Healing Guides</h2>

        {/* Modality Buttons */}
        <div className="px-6 mb-4 flex flex-wrap gap-2 justify-center">
          {allModalities.map((modality) => (
            <button
              key={modality}
              onClick={() => updateQuery('modality', modality)}
              className={`px-3 py-1 rounded-full border text-sm transition ${selectedModalities.includes(modality) ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border-purple-300'}`}
            >
              {modality}
            </button>
          ))}
        </div>

        {/* Specialty Buttons */}
        <div className="px-6 mb-8 flex flex-wrap gap-2 justify-center">
          {allSpecialties.map((specialty) => (
            <button
              key={specialty}
              onClick={() => updateQuery('specialty', specialty)}
              className={`px-3 py-1 rounded-full border text-sm transition ${selectedSpecialties.includes(specialty) ? 'bg-pink-500 text-white' : 'bg-white text-pink-500 border-pink-300'}`}
            >
              {specialty}
            </button>
          ))}
        </div>

        {/* Healing Path Buttons */}
        <div className="px-6 mb-4 flex flex-wrap gap-2 justify-center">
          {allHealingPaths.map((path) => (
            <button
              key={path}
              onClick={() => updateQuery('healingPath', path)} // ✅ changed here
              className={`px-3 py-1 rounded-full border text-sm transition ${selectedHealingPaths.includes(path) ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-300'}`}
            >
              {path}
            </button>
          ))}
        </div>

        {/* Therapist Cards */}
        <div className="px-4 pb-12 space-y-8">
          {currentTherapists.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center space-x-2 mb-16">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${currentPage === index + 1 ? 'bg-white text-purple-600' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
