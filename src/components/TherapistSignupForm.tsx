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
  credentialsFile: File | null;
};

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
    credentialsFile: null,
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
      // Sign up the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      const profileImageUrl = formData.profileImage
        ? await uploadFile(formData.profileImage, {
            bucket: 'profile-images',
            folder: 'therapists',
          })
        : '';

      const credentialsUrl = formData.credentialsFile
        ? await uploadFile(formData.credentialsFile, {
            bucket: 'credentials',
            folder: 'therapists',
          })
        : '';

      // Insert into therapists table
      const { error } = await supabase.from('therapists').insert({
        full_name: formData.fullName,
        email: formData.email,
        bio: formData.bio,
        profile_image_url: profileImageUrl,
        credentials_url: credentialsUrl,
        modalities: formData.modalities,
        specialties: formData.specialties,
        calendly_link: formData.calendlyLink,
        is_virtual: formData.isVirtual,
        user_id: authData.user?.id,
      });

      if (error) throw error;

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
        credentialsFile: null,
      });
    } catch (err: any) {
      console.error('❌ ERROR:', err.message || err);
      setMessage('❌ There was an error submitting your profile.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img src="/bg-blobs.png" alt="Blobs" className="w-full h-full object-cover" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-2xl w-full p-8 bg-white shadow-xl rounded-3xl mt-10 mb-20 border"
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-4">🌟 Therapist Signup</h1>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <textarea
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <fieldset className="space-y-2">
          <legend className="font-semibold text-lg text-purple-600">🎨 Modalities</legend>
          {['Art Therapy', 'Music Therapy', 'Dance Therapy', 'Drama Therapy'].map((modality) => (
            <label key={modality} className="block text-sm">
              <input
                type="checkbox"
                name="modalities"
                value={modality}
                checked={formData.modalities.includes(modality)}
                onChange={handleChange}
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
                checked={formData.specialties.includes(specialty)}
                onChange={handleChange}
                className="mr-2"
              />
              {specialty}
            </label>
          ))}
        </fieldset>

        <div>
          <label className="block text-sm font-medium">🖼️ Profile Image</label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
            required
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">📄 Credentials File</label>
          <input
            type="file"
            name="credentialsFile"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            required
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <input
          type="text"
          name="calendlyLink"
          placeholder="Calendly Booking Link"
          value={formData.calendlyLink}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <label className="block text-sm">
          <input
            type="checkbox"
            name="isVirtual"
            checked={formData.isVirtual}
            onChange={handleChange}
            className="mr-2"
          />
          🌐 Offers virtual sessions
        </label>

        <button
          type="submit"
          disabled={uploading}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white w-full py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition"
        >
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
