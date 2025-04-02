'use client';

import Image from 'next/image';
import Link from 'next/link'

export default function InnerChildHealing() {
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
          🧸 Inner Child & Parts Work Healing
        </h1>
        <p className="text-lg text-center mb-10">
          Heal the younger versions of you who needed love, safety, and care. Reconnect with your inner child and uncover the roots of your emotional patterns.
        </p>

        <div className="bg-white bg-opacity-90 text-gray-900 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">What is Inner Child Work?</h2>
            <p>
              Inner child work is a way to reconnect with the vulnerable, playful, hurt, or unseen parts of you that developed in childhood. It helps you access emotions or beliefs you may have hidden away, and meet them with compassion, curiosity, and care.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Who is this for?</h2>
            <p>
              This path is powerful for anyone who feels stuck in repeated emotional patterns, experiences self-doubt, or struggles with boundaries, relationships, or self-worth. It's especially helpful if you grew up in emotionally unstable, neglectful, or high-pressure environments.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">What might a session look like?</h2>
            <p>
              Your guide might lead you in visualizing a younger version of yourself, journaling letters to your inner child, using voice dialogue, or working with “parts” (from IFS or similar models). You may speak to and care for different parts of your psyche in a safe, supportive space.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-8 mb-3">Guides Who Practice Inner Child Healing</h2>
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