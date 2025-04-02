'use client';

import Image from 'next/image';
import Link from 'next/link'

export default function CulturalHealingPage() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image src="/bg-blobs.png" alt="Background Blobs" fill className="object-cover opacity-100" />
      </div>

      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 text-white z-10 relative">
        <h1 className="text-3xl font-bold">
          <span className="flex justify-between items-center px-6 py-4 text-white z-10 relative">meloa</span>
        </h1>
        <div className="space-x-4">
          <Link href="/">
            <button className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">Home</button>
          </Link>
          <Link href="/therapists">
            <button className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">Connect with a Guide</button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition">Join as a Guide</button>
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-28">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          🌍 Cultural & Ancestral Healing
        </h1>
        <p className="text-lg text-center mb-10">
          Reconnect with your roots. Heal through the traditions, wisdom, and rituals passed down from your ancestors and culture.
        </p>

        <div className="bg-white bg-opacity-90 text-gray-900 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">What is Cultural Healing?</h2>
            <p>
              Cultural & ancestral healing is about returning to practices that were often lost, suppressed, or disconnected due to colonization, assimilation, or migration. This healing honors identity, lineage, storytelling, and community-based practices to help you feel whole again.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Who is this for?</h2>
            <p>
              This is for anyone feeling disconnected from their heritage, lineage, or cultural identity. It’s powerful for children of immigrants, diasporic communities, and those looking to explore healing through the lens of their ancestors and traditions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">What might a session look like?</h2>
            <p>
              A session might include storytelling, ritual, drumming, chanting, herbalism, ceremony, or spiritual mentoring grounded in your culture. Your guide may help you remember and reclaim parts of your identity and ancestral strength.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-8 mb-3">Guides for Cultural Healing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-36 bg-gray-200 rounded-xl"></div>
              <div className="h-36 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
