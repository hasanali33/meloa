'use client';

import React from 'react';
import TherapistProfileEditor from '@/components/TherapistProfileEditor';
import { useUser } from '@supabase/auth-helpers-react';

export default function EditPage() {
  const user = useUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
        <p className="text-xl text-gray-700">Please log in to edit your profile.</p>
      </div>
    );
  }

  return <TherapistProfileEditor user={user} />;
}