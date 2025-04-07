'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Loader2, User, Info, LinkIcon } from 'lucide-react';

const modalityOptions = [
  'Art Therapy', 'Music Therapy', 'Dance Therapy', 'Drama Therapy',
  'Breathwork', 'Somatic Therapy', 'Parts Work', 'Journaling',
  'Inner Child Healing', 'Creative Expression', 'Guided Visualization',
  'EFT Tapping', 'Spiritual Counseling'
];

const specialtyOptions = [
  'Anxiety', 'Grief', 'Trauma', 'Depression', 'Relationships', 'Self-Esteem',
  'Burnout', 'Creative Blocks', 'Spiritual Exploration', 'Life Transitions',
  'PTSD', 'LGBTQ+', 'Cultural Identity'
];

const vibeTagOptions = [
  'Gentle', 'Grounded', 'Intuitive', 'Energetic', 'Creative', 'Playful',
  'Insightful', 'Reflective', 'Calm', 'Centered', 'Empowering', 'Direct',
  'Nurturing', 'Warm', 'Mindful', 'Present'
];

export default function TherapistProfileEditor({ user }) {
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchTherapist() {
      console.log('🔍 Logged in user ID:', user.id);

      const { data, error } = await supabase
        .from('therapists')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle(); // Safely handles "no match" cases

      if (error) {
        console.error('❌ Supabase error:', error);
      }

      if (!data) {
        console.warn('⚠️ No therapist profile found for this user.');
        setTherapist(null);
      } else {
        setTherapist({
          ...data,
          modalities: data.modalities || [],
          specialties: data.specialties || [],
          vibe_tags: data.vibe_tags || [],
        });
      }

      setLoading(false);
    }

    if (user) fetchTherapist();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTherapist((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e, field) => {
    const { value, checked } = e.target;
    setTherapist((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field] || []), value]
        : prev[field].filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const { error } = await supabase
      .from('therapists')
      .update({
        full_name: therapist?.full_name,
        bio: therapist?.bio,
        calendly_link: therapist?.calendly_link,
        modalities: therapist?.modalities,
        specialties: therapist?.specialties,
        vibe_tags: therapist?.vibe_tags,
      })
      .eq('user_id', user.id);

    if (error) {
      console.error(error);
      setMessage('❌ Error updating profile.');
    } else {
      setMessage('✅ Profile updated successfully!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <p className="text-lg">No therapist profile found for your account.</p>
        <p className="text-sm mt-2 text-purple-700">
          You may need to complete onboarding or create your profile manually.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-purple-100">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">🧑‍🎨 Edit Your Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700 flex items-center gap-1">
            <User className="w-4 h-4" /> Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={therapist?.full_name || ''}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700 flex items-center gap-1">
            <Info className="w-4 h-4" /> Short Bio
          </label>
          <textarea
            name="bio"
            value={therapist?.bio || ''}
            onChange={handleChange}
            placeholder="Tell us a bit about your background..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Calendly Link */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700 flex items-center gap-1">
            <LinkIcon className="w-4 h-4" /> Calendly Link
          </label>
          <input
            type="text"
            name="calendly_link"
            value={therapist?.calendly_link || ''}
            onChange={handleChange}
            placeholder="https://calendly.com/your-link"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Modalities */}
        <CheckboxGroup
          title="🎨 Modalities"
          name="modalities"
          options={modalityOptions}
          selected={therapist?.modalities}
          onChange={(e) => handleMultiSelect(e, 'modalities')}
        />

        {/* Specialties */}
        <CheckboxGroup
          title="💖 Specialties"
          name="specialties"
          options={specialtyOptions}
          selected={therapist?.specialties}
          onChange={(e) => handleMultiSelect(e, 'specialties')}
        />

        {/* Vibe Tags */}
        <CheckboxGroup
          title="🌿 Vibe Tags"
          name="vibe_tags"
          options={vibeTagOptions}
          selected={therapist?.vibe_tags}
          onChange={(e) => handleMultiSelect(e, 'vibe_tags')}
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
        >
          💾 Save Changes
        </button>

        {message && (
          <p className="text-center text-sm font-medium mt-2 text-blue-600">{message}</p>
        )}
      </form>
    </div>
  );
}

// ✅ Safe reusable checkbox group
function CheckboxGroup({ title, name, options, selected = [], onChange }) {
  return (
    <fieldset className="space-y-1">
      <legend className="font-semibold text-lg text-purple-600">{title}</legend>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
        {options.map((opt) => (
          <label key={opt} className="text-sm flex items-center gap-2">
            <input
              type="checkbox"
              name={name}
              value={opt}
              checked={selected?.includes(opt)}
              onChange={onChange}
              className="accent-purple-600"
            />
            {opt}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
