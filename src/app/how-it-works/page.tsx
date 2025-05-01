'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../../components/NavBar';

export default function HowItWorksPage() {
  return (
    <div className="relative font-sans text-white min-h-screen">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image
          src="/bg-blobs.png"
          alt="Background Blobs"
          fill
          className="object-cover opacity-100"
        />
      </div>

      <Navbar />

      <main className="max-w-5xl mx-auto pt-32 pb-20 px-6 text-center">
        <motion.h1
          className="text-5xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Healing isn’t one-size-fits-all. But it can start here.
        </motion.h1>

        <motion.p
          className="text-lg max-w-2xl mx-auto mb-16 text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Meloa helps you discover your healing style, connect with the right guide, and begin your own path — at your pace. It’s not about quick fixes. It’s about real support, when and how you need it.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {[
            {
              step: '1',
              title: 'Take the Quiz',
              text: 'Answer a few simple questions to uncover your unique healing style — somatic, creative, spiritual, or culturally rooted.',
            },
            {
              step: '2',
              title: 'Meet Your Match',
              text: 'We’ll recommend guides who align with your style, your values, and your emotional needs — no filters or algorithms needed.',
            },
            {
              step: '3',
              title: 'Book a Session',
              text: 'Intro calls, one-off sessions, or long-term journeys — choose what feels right and start when you\'re ready.',
            },
            {
              step: '4',
              title: 'Grow at Your Own Pace',
              text: 'Healing takes time. Meloa supports your journey with creative prompts, personalized suggestions, and space to reflect.',
            },
          ].map(({ step, title, text }, i) => (
            <motion.div
              key={title}
              className="bg-white/10 p-6 rounded-lg backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.2 }}
            >
              <div className="text-xl font-bold mb-2 text-purple-200">Step {step}</div>
              <h3 className="text-2xl font-bold mb-2">{title}</h3>
              <p className="text-white/90 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 max-w-2xl mx-auto">
          <motion.p
            className="text-lg italic text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Healing isn’t instant. And it’s not always linear. Meloa is here to support your process — gently, creatively, and at your pace.
          </motion.p>
        </div>
      </main>
    </div>
  );
}
