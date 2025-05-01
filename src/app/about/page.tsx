'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/NavBar';

export default function AboutPage() {
  return (
    <div className="relative font-sans text-white min-h-screen">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image src="/bg-blobs.png" alt="Background Blobs" fill className="object-cover scale-y-[1] opacity-100" />
      </div>

      <Navbar />

      {/* About Content */}
      <main className="max-w-5xl mx-auto pt-32 pb-20 px-6 text-center">
        <motion.h1
          className="text-5xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          We’re Not Just Another Wellness Platform.<br />We’re making space for healing that actually fits you.
        </motion.h1>

        <motion.p
          className="text-lg max-w-2xl mx-auto mb-4 text-white font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Gen Z is the most therapy-aware generation — but that doesn’t mean therapy always worked.
        </motion.p>

        <motion.p
          className="text-lg max-w-2xl mx-auto mb-16 text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          A lot of people try it, feel unseen, and quietly give up. Meloa is for the ones who heal differently — through movement, music, community, and culture. We’re building a space that actually meets you where you are.
        </motion.p>

        <motion.div
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-2">What is Meloa?</h2>
          <p className="text-white/90">
            Meloa helps you discover your healing style — then matches you with guides who actually get you.
            Whether that’s breathwork, journaling, somatic therapy, or ancestral healing, we help you find support that speaks your language.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {[
            {
              title: '🔵 Healing Needs a Redesign',
              text: 'Therapy shouldn’t feel like a cold couch and a checklist. We’re building something that honors who you are — your roots, your rituals, your creative spirit.'
            },
            {
              title: '🛠️ Not for Everyone. Just for You.',
              text: 'This isn’t about fitting people into systems. It’s about building a space where healing meets you where you are. Whether that’s through poetry, breathwork, prayer, or stillness.'
            },
            {
              title: '🌏 Real People. Real Healing.',
              text: 'Whether you’re a teen figuring it out, a healer in Peru sharing ancestral wisdom, or someone just tired of feeling alone — Meloa is where your story actually matters.'
            },
          ].map(({ title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.2 }}
            >
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-white/90 leading-relaxed">{text}</p>
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