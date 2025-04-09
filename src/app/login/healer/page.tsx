'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabaseClient';
import TherapistLogin from '@/components/TherapistLogin';
import Navbar from '../../../components/NavBar';

export default function TherapistLoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-purple-100">
        <TherapistLogin />
      </div>
    </div>
  );
}
