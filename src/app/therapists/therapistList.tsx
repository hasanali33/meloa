"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import TherapistCard from '@/components/TherapistCard';
import Navbar from '../../components/NavBar';
import { useSearchParams, useRouter } from 'next/navigation';

export default function TherapistList() {
  const [therapists, setTherapists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const therapistsPerPage = 15;
  const searchParams = useSearchParams();
  const router = useRouter();

  const modalityParam = searchParams.get('modality');
  const specialtyParam = searchParams.get('specialty');
  const healingPathParam = searchParams.get('healingPath');

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
      t.healing_path?.some((path) => selectedHealingPaths.includes(path));

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

  const clearFilters = () => {
    router.push('/therapists');
    setCurrentPage(1);
  };

  const hasFilters = selectedModalities.length > 0 || selectedSpecialties.length > 0 || selectedHealingPaths.length > 0;

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10">
        <img src="/bg-blobs.png" alt="Background" className="w-full h-full object-cover" />
      </div>

      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-white my-8">Meet Your Healing Guides</h2>

        {hasFilters && (
          <div className="flex justify-center mb-4">
            <button
              onClick={clearFilters}
              className="text-sm underline text-white hover:text-pink-200 transition"
            >
              ✕ Clear All Filters
            </button>
          </div>
        )}

        <div className="px-6 mb-8 space-y-4 max-w-3xl mx-auto">
          <details className="bg-white/80 rounded-md shadow p-4 transition-all duration-300 ease-in-out" open={selectedModalities.length > 0}>
            <summary className="font-semibold cursor-pointer">🧘 Modalities</summary>
            <div className="flex flex-wrap gap-2 mt-3">
              {allModalities.map((modality) => (
                <button
                  key={modality}
                  onClick={() => updateQuery('modality', modality)}
                  className={`px-3 py-1 rounded-full border text-sm transition ${
                    selectedModalities.includes(modality)
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-purple-600 border-purple-300'
                  }`}
                >
                  {modality}
                </button>
              ))}
            </div>
          </details>

          <details className="bg-white/80 rounded-md shadow p-4 transition-all duration-300 ease-in-out" open={selectedSpecialties.length > 0}>
            <summary className="font-semibold cursor-pointer">🌿 Goals</summary>
            <div className="flex flex-wrap gap-2 mt-3">
              {allSpecialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => updateQuery('specialty', specialty)}
                  className={`px-3 py-1 rounded-full border text-sm transition ${
                    selectedSpecialties.includes(specialty)
                      ? 'bg-pink-500 text-white'
                      : 'bg-white text-pink-500 border-pink-300'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </details>

          <details className="bg-white/80 rounded-md shadow p-4 transition-all duration-300 ease-in-out" open={selectedHealingPaths.length > 0}>
            <summary className="font-semibold cursor-pointer">🌀 Healing Paths</summary>
            <div className="flex flex-wrap gap-2 mt-3">
              {allHealingPaths.map((path) => (
                <button
                  key={path}
                  onClick={() => updateQuery('healingPath', path)}
                  className={`px-3 py-1 rounded-full border text-sm transition ${
                    selectedHealingPaths.includes(path)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 border-blue-300'
                  }`}
                >
                  {path}
                </button>
              ))}
            </div>
          </details>
        </div>

        <div className="px-4 pb-12 space-y-8">
          {currentTherapists.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} />
          ))}
        </div>

        <div className="flex justify-center space-x-2 mb-16">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                currentPage === index + 1 ? 'bg-white text-purple-600' : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}