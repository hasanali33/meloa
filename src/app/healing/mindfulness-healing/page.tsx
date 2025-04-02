'use client';

import Image from 'next/image';
import Link from 'next/link'

export default function MindfulnessHealingPage() {
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
          🧘‍♀️ Mindfulness & Breath-Based Healing
        </h1>
        <p className="text-lg text-center mb-10">
          Learn to slow down, stay present, and gently observe your thoughts and body. This path brings clarity, peace, and grounded awareness.
        </p>

        <div className="bg-white bg-opacity-90 text-gray-900 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">What is Mindfulness-Based Healing?</h2>
            <p>
              Mindfulness and breath-based healing is about learning to be with your present moment — exactly as it is. It includes practices like conscious breathing, body scans, meditation, and gentle observation of thoughts and emotions, without judgment or analysis.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Who is this for?</h2>
            <p>
              This path is perfect for people dealing with anxiety, overthinking, burnout, or emotional overwhelm. It’s also for anyone wanting to create more spaciousness in their inner world, develop emotional regulation, or build a consistent inner practice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">What might a session look like?</h2>
            <p>
              A session may include guided meditation, breathwork, mindful inquiry, or simply holding space to slow down. Some sessions are silent and spacious, others gently led by a calm presence who helps you witness your inner world with kindness.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-8 mb-3">Guides for Mindfulness-Based Healing</h2>
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