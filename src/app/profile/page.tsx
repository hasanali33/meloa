'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const vibeTagOptions = [
  'Gentle', 'Grounded', 'Intuitive', 'Energetic', 'Creative', 'Playful',
  'Insightful', 'Reflective', 'Calm', 'Centered', 'Empowering', 'Direct',
  'Nurturing', 'Warm', 'Mindful', 'Present'
];

type Therapist = {
  full_name: string;
  bio: string;
  calendly_link: string;
  modalities: string[];
  specialties: string[];
  vibe_tags: string[];
  email: string;
};

const TherapistProfilePage = () => {
  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchTherapist = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('therapists')
        .select('*')
        .eq('email', user.email)
        .single();

      if (error) console.error(error);
      else setTherapist(data);

      setLoading(false);
    };

    fetchTherapist();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTherapist((prev) => prev ? { ...prev, [name]: value } : prev);
  };

  const handleMultiSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Therapist
  ) => {
    const { value, checked } = e.target;
    setTherapist((prev) =>
      prev
        ? {
            ...prev,
            [field]: checked
              ? [...(prev[field] || []), value]
              : prev[field].filter((item: string) => item !== value),
          }
        : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!therapist) return;

    const { error } = await supabase
      .from('therapists')
      .update({
        full_name: therapist.full_name,
        bio: therapist.bio,
        calendly_link: therapist.calendly_link,
        modalities: therapist.modalities,
        specialties: therapist.specialties,
        vibe_tags: therapist.vibe_tags,
      })
      .eq('email', therapist.email);

    if (error) {
      console.error(error);
      setMessage('❌ Failed to update profile.');
    } else {
      setMessage('✅ Profile updated successfully!');
    }
  };

  if (loading || !therapist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin h-6 w-6 text-purple-500" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg-blobs.png"
          alt="Background"
          className="w-full h-full object-cover"
          fill
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-3xl mt-10 mb-20 border"
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-4">
          ✏️ Edit Your Profile
        </h1>

        <input
          type="text"
          name="full_name"
          value={therapist.full_name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        <textarea
          name="bio"
          value={therapist.bio}
          onChange={handleChange}
          placeholder="Short Bio"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        <input
          type="text"
          name="calendly_link"
          value={therapist.calendly_link}
          onChange={handleChange}
          placeholder="Calendly Link"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        <fieldset className="space-y-2">
          <legend className="font-semibold text-lg text-purple-600">🎨 Modalities</legend>
          {['Art Therapy', 'Music Therapy', 'Dance Therapy', 'Drama Therapy'].map((modality) => (
            <label key={modality} className="block text-sm">
              <input
                type="checkbox"
                name="modalities"
                value={modality}
                checked={therapist.modalities?.includes(modality)}
                onChange={(e) => handleMultiSelect(e, 'modalities')}
                className="mr-2"
              />
              {modality}
            </label>
          ))}
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="font-semibold text-lg text-purple-600">💖 Specialties</legend>
          {['Anxiety', 'Grief', 'Trauma', 'Kids', 'Depression'].map((specialty) => (
            <label key={specialty} className="block text-sm">
              <input
                type="checkbox"
                name="specialties"
                value={specialty}
                checked={therapist.specialties?.includes(specialty)}
                onChange={(e) => handleMultiSelect(e, 'specialties')}
                className="mr-2"
              />
              {specialty}
            </label>
          ))}
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="font-semibold text-lg text-green-700">🌿 Vibe Tags</legend>
          {vibeTagOptions.map((tag) => (
            <label key={tag} className="block text-sm">
              <input
                type="checkbox"
                name="vibe_tags"
                value={tag}
                checked={therapist.vibe_tags?.includes(tag)}
                onChange={(e) => handleMultiSelect(e, 'vibe_tags')}
                className="mr-2"
              />
              {tag}
            </label>
          ))}
        </fieldset>

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white w-full py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition"
        >
          💾 Save Changes
        </button>

        {message && <p className="text-center text-sm mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default TherapistProfilePage;
