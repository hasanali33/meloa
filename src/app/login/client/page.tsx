'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabaseClient';
import ClientAuthForm from '@/components/ClientAuthForm';
import { sendWelcomeIfNeeded } from '@/utils/sendWelcomeIfNeeded';

export default function ClientLoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
      <ClientAuthForm
        onAuthSuccess={async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
            await sendWelcomeIfNeeded(user);
            router.push('/client/dashboard');
            }
        }}
        />
    </div>
  );
}
