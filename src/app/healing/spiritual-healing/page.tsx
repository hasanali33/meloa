'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function SpiritualHealingPage() {
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
          🔮 Spiritual & Energetic Healing
        </h1>
        <p className="text-lg text-center mb-10">
          Tap into unseen wisdom. Discover healing through intuition, energy work, ancestral practices, and spiritual connection.
        </p>

        <div className="bg-white bg-opacity-90 text-gray-900 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">What is Spiritual Healing?</h2>
            <p>
              Spiritual healing focuses on connecting with something greater than yourself — whether that's intuition, ancestors, energy, or a higher power. It includes practices like energy clearing, reiki, channeling, ritual, sound healing, and spiritual coaching. It's about feeling deeply seen, guided, and realigned.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Who is this for?</h2>
            <p>
              This path is for people who feel called to explore meaning, purpose, or personal evolution beyond just the mental and emotional. It’s especially helpful when you're going through transitions, feeling lost, or craving deeper spiritual connection.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">What might a session look like?</h2>
            <p>
              A session might include energy healing, chakra balancing, connecting with spiritual guides, or ancestral wisdom practices. You may engage in breathwork, visualization, or receive messages that resonate on a soul level.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-8 mb-3">Guides Who Practice Spiritual Healing</h2>
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
