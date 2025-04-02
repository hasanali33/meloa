'use client';

import Image from 'next/image';
import Link from 'next/link'

export default function CreativeExpressionHealing() {
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
          🎨 Creative Expression & Art-Based Healing
        </h1>
        <p className="text-lg text-center mb-10">
          Express what words can't. Tap into healing through painting, poetry, movement, and more — and reconnect with your inner voice.
        </p>

        <div className="bg-white bg-opacity-90 text-gray-900 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">What is Creative Healing?</h2>
            <p>
              This path uses expressive arts like drawing, dance, music, poetry, or storytelling as a way to release emotion, understand yourself, and reconnect with parts of your story that are hard to talk about. It’s not about being an artist — it’s about expressing something real.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Who is this for?</h2>
            <p>
              If traditional talk therapy feels limiting, or you find it easier to express yourself through creation rather than conversation, this path may speak to you. It's great for emotional release, self-discovery, and healing deep inner wounds.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">What might a session look like?</h2>
            <p>
              A guide might invite you to paint your emotions, free-write a memory, or move your body to release stuck energy. Sessions are intuitive, guided, and centered around you finding your truth through creative flow.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-8 mb-3">Guides Who Practice Creative Healing</h2>
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
