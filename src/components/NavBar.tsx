'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function Navbar() {
  const pathname = usePathname();
  const [showProviderMenu, setShowProviderMenu] = useState(false);
  const [user, setUser] = useState(null);

  const isLight = [
    '/dashboard',
    '/client/dashboard',
    '/login',
    '/quiz',
    '/login/client',
    '/login/healer',
    '/signup'
  ].some((route) => pathname.startsWith(route));

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <header
      className={`flex justify-between items-center px-6 py-4 z-50 relative ${
        isLight
          ? 'bg-white text-gray-800 border-b border-gray-100 shadow'
          : 'bg-transparent text-white'
      }`}
    >
      <div className="flex items-center space-x-8 relative">
        <Link
            href="/"
            className={`text-2xl font-bold ${
                isLight ? 'text-purple-700' : 'text-white'
            }`}
            >
        meloa
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
              <Link href="/why-join">
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Why Join?</div>
              </Link>
              <Link href="/signup">
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Join as a Guide</div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="space-x-4 flex items-center">
        {!user && (
          <Link href="/login">
            <button
              className={`px-4 py-2 font-medium rounded-full transition ${
                isLight
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-white text-purple-700 hover:bg-purple-100'
              }`}
            >
              Log In
            </button>
          </Link>
        )}
        <Link href="/therapists">
          <button
            className={`px-4 py-2 rounded-full border transition ${
              isLight
                ? 'border-purple-600 text-purple-600 hover:bg-purple-50'
                : 'border-white text-white hover:bg-white hover:text-black'
            }`}
          >
            Connect with a Guide
          </button>
        </Link>
      </div>
    </header>
  );
}
