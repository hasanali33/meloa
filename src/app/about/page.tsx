'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [showProviderMenu, setShowProviderMenu] = useState(false);
  return (
    <div className="relative font-sans text-white min-h-screen">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image src="/bg-blobs.png" alt="Background Blobs" fill className="object-cover scale-y-[1] opacity-100" />
      </div>

      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-transparent text-white z-10 relative">
        <div className="flex items-center space-x-8 relative">
        <Link href="/"><h1 className="text-3xl font-bold">meloa</h1></Link>
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
                <Link href="/signup">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Join as a Guide</div>
                </Link>
                <Link href="/login">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Log In</div>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="space-x-4">
          <Link href="/therapists">
            <button className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">Connect with a Guide</button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition">Join as a Guide</button>
          </Link>
        </div>
      </header>

      {/* About Content */}
      <main className="max-w-5xl mx-auto pt-32 pb-20 px-6 text-center">
        <motion.h1
          className="text-5xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          We’re Not Just Building a Platform.<br />We’re Building a Movement.
        </motion.h1>
        <motion.p
          className="text-lg max-w-2xl mx-auto mb-16 text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Meloa exists because traditional therapy left too many people behind. Because healing isn’t one-size-fits-all. Because your culture, creativity, and spirit deserve to be part of your healing journey.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {[
            {
              title: '🎭 Healing Needs a Rebrand',
              text: 'When people think of therapy, they often imagine cold couches, clinical checklists, or outdated systems. We’re here to flip that. Meloa is where ancestral wisdom meets modern design. Where your favorite breathwork coach, inner child healer, or dancing monk finally has a home — and so do you.'
            },
            {
              title: '🌏 Global. Personal. Human.',
              text: 'A trans teen seeking queer-affirming support. A spiritual healer in Peru guiding through plant medicine. A Japanese monk blending Zen with journaling. Meloa is where they’re all seen — and where you can find your path.'
            },
            {
              title: '🌟 We’re for the Ones Who Do It Differently',
              text: 'We’re here for the spiritual guide who never felt welcome on traditional therapy sites. For the somatic facilitator blending trauma release with movement. For the person healing through art, not algorithms. Meloa honors the spectrum of what healing can be — and we help you find what resonates.'
            },
            {
              title: '🌈 For Healers, It’s About Being Seen',
              text: 'Most platforms ask healers to fit in a box. Meloa lets them show up fully — with all their creative, cultural, and spiritual nuance. Whether you’re licensed or not, we believe in your power to hold space and transform lives.'
            },
          ].map(({ title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.2 }}
            >
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-white/90">{text}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 flex justify-center space-x-4">
          <Link href="/signup">
            <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition">
              Join as a Guide
            </button>
          </Link>
          <Link href="/therapists">
            <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition">
              Connect with a Guide
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
