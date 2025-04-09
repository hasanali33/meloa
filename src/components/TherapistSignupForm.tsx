'use client';

import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

type TherapistFormData = {
  fullName: string;
  email: string;
  password: string;
  bio: string;
  modalities: string[];
  specialties: string[];
  calendlyLink: string;
  isVirtual: boolean;
  profileImage: File | null;
  vibeTags: string[];
  healingPath: string[]; // ✅ added
};

const healingPaths = [
  'Somatic Healing',
  'Inner Child Work',
  'Creative Expression',
  'Spiritual Healing',
  'Cultural Healing',
  'Mindfulness-Based Healing'
];

const TherapistSignupForm = () => {
  const [formData, setFormData] = useState<TherapistFormData>({
    fullName: '',
    email: '',
    password: '',
    bio: '',
    modalities: [],
    specialties: [],
    calendlyLink: '',
    isVirtual: false,
    profileImage: null,
    vibeTags: [],
    healingPath: [], // ✅ added
  });

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    if (type === 'checkbox' && name === 'modalities') {
      setFormData((prev) => ({
        ...prev,
        modalities: checked
          ? [...prev.modalities, value]
          : prev.modalities.filter((item) => item !== value),
      }));
    } else if (type === 'checkbox' && name === 'specialties') {
      setFormData((prev) => ({
        ...prev,
        specialties: checked
          ? [...prev.specialties, value]
          : prev.specialties.filter((item) => item !== value),
      }));
    } else if (type === 'checkbox' && name === 'vibeTags') {
      setFormData((prev) => ({
        ...prev,
        vibeTags: checked
          ? [...prev.vibeTags, value]
          : prev.vibeTags.filter((item) => item !== value),
      }));
    } else if (type === 'checkbox' && name === 'healingPath') {
      setFormData((prev) => ({
        ...prev,
        healingPath: checked
          ? [...prev.healingPath, value]
          : prev.healingPath.filter((item) => item !== value),
      }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files?.[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadFile = async (file: File, path: { bucket: string; folder: string }) => {
    const { error } = await supabase.storage
      .from(path.bucket)
      .upload(`${path.folder}/${file.name}`, file, { upsert: true });

    if (error) throw error;

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path.bucket}/${path.folder}/${file.name}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');
  
    try {
      // 1. Create Supabase auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.fullName,
          },
        },
      });
  
      if (authError) throw authError;
  
      const user = authData.user;
      const email = user?.email || formData.email;
      const name = formData.fullName;
  
      // 2. Upload profile image (if any)
      const profileImageUrl = formData.profileImage
        ? await uploadFile(formData.profileImage, {
            bucket: 'profile-images',
            folder: 'therapists',
          })
        : '';
  
      // 3. Send welcome email
      try {
        const res = await fetch('/api/sendWelcomeEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name,
            role: 'healer',
          }),
        });
  
        if (!res.ok) {
          const errText = await res.text();
          console.error('❌ Failed to send welcome email:', errText);
        }
      } catch (err) {
        console.error('❌ Network error sending welcome email:', err);
      }
  
      // 4. Insert into therapists table
      const { error: dbError } = await supabase.from('therapists').insert({
        full_name: name,
        email,
        bio: formData.bio,
        profile_image_url: profileImageUrl,
        modalities: formData.modalities,
        specialties: formData.specialties,
        calendly_link: formData.calendlyLink,
        is_virtual: formData.isVirtual,
        user_id: user?.id,
        vibe_tags: formData.vibeTags,
        healing_path: formData.healingPath,
        welcome_email_sent: true, // ✅ mark as sent immediately
      });
  
      if (dbError) throw dbError;
  
      // 5. Done
      setMessage('✅ Signup complete! Your profile has been submitted.');
      setFormData({
        fullName: '',
        email: '',
        password: '',
        bio: '',
        modalities: [],
        specialties: [],
        calendlyLink: '',
        isVirtual: false,
        profileImage: null,
        vibeTags: [],
        healingPath: [],
      });
    } catch (err: any) {
      console.error('❌ ERROR:', err.message || err);
      setMessage('❌ There was an error submitting your profile.');
    } finally {
      setUploading(false);
    }
  };
  

  const modalityOptions = [
    'Art Therapy', 'Music Therapy', 'Dance Therapy', 'Drama Therapy', 'Breathwork',
    'Somatic Therapy', 'Parts Work', 'Journaling', 'Inner Child Healing',
    'Creative Expression', 'Guided Visualization', 'EFT Tapping', 'Spiritual Counseling'
  ];

  const specialtyOptions = [
    'Anxiety', 'Grief', 'Trauma', 'Depression', 'Relationships', 'Self-Esteem',
    'Burnout', 'Creative Blocks', 'Spiritual Exploration', 'Life Transitions',
    'PTSD', 'LGBTQ+', 'Cultural Identity'
  ];

  const vibeOptions = [
    'Gentle', 'Grounded', 'Intuitive', 'Energetic', 'Creative', 'Playful',
    'Insightful', 'Reflective', 'Calm', 'Centered', 'Empowering', 'Direct',
    'Nurturing', 'Warm', 'Mindful', 'Present'
  ];

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center px-4">
      <div className="absolute inset-0 -z-10">
        <img src="/bg-blobs.png" alt="Blobs" className="w-full h-full object-cover" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl w-full p-10 bg-white shadow-xl rounded-3xl mt-10 mb-20 border">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-4">🌟 Therapist Signup</h1>

        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" required />
        <input type="password" name="password" placeholder="Create Password" value={formData.password} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" required />
        <textarea name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" required />

        <fieldset>
          <legend className="font-semibold text-lg text-purple-600 mb-2">🎨 Modalities</legend>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
            {modalityOptions.map((modality) => (
              <label key={modality} className="text-sm flex items-center">
                <input type="checkbox" name="modalities" value={modality} checked={formData.modalities.includes(modality)} onChange={handleChange} className="mr-2" />
                {modality}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-semibold text-lg text-purple-600 mb-2">💖 Specialties</legend>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
            {specialtyOptions.map((specialty) => (
              <label key={specialty} className="text-sm flex items-center">
                <input type="checkbox" name="specialties" value={specialty} checked={formData.specialties.includes(specialty)} onChange={handleChange} className="mr-2" />
                {specialty}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-semibold text-lg text-green-600 mb-2">🌿 Vibe Tags</legend>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
            {vibeOptions.map((tag) => (
              <label key={tag} className="text-sm flex items-center">
                <input type="checkbox" name="vibeTags" value={tag} checked={formData.vibeTags.includes(tag)} onChange={handleChange} className="mr-2" />
                {tag}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-semibold text-lg text-blue-600 mb-2">🌀 Healing Paths</legend>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
            {healingPaths.map((path) => (
              <label key={path} className="text-sm flex items-center">
                <input
                  type="checkbox"
                  name="healingPath"
                  value={path}
                  checked={formData.healingPath.includes(path)}
                  onChange={handleChange}
                  className="mr-2"
                />
                {path}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label className="block text-sm font-medium">🖼️ Profile Image (optional)</label>
          <input type="file" name="profileImage" accept="image/*" onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
        </div>

        <input type="text" name="calendlyLink" placeholder="Calendly Booking Link" value={formData.calendlyLink} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" required />

        <label className="block text-sm">
          <input type="checkbox" name="isVirtual" checked={formData.isVirtual} onChange={handleChange} className="mr-2" />
          🌐 Offers virtual sessions
        </label>

        <button type="submit" disabled={uploading} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white w-full py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition">
          {uploading ? (
            <span className="flex justify-center items-center">
              <Loader2 className="animate-spin mr-2 h-5 w-5" /> Submitting...
            </span>
          ) : (
            '🚀 Submit Profile'
          )}
        </button>

        {message && (
          <p className={`mt-4 text-center text-sm font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default TherapistSignupForm;
