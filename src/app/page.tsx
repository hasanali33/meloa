'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProviderMenu, setShowProviderMenu] = useState(false);

  const userIntentOptions = [
    "I'm navigating a breakup",
    "I'm feeling anxious all the time",
    "I want to explore my identity",
    "I'm burned out",
    "I need help processing trauma",
    "I'm stuck creatively",
    "I'm curious about spirituality",
    "I want to reconnect with my body",
    "I'm learning to set boundaries",
    "I want to love myself again",
    "I'm grieving someone or something",
    "I feel disconnected from who I am",
    "I want to feel more present",
    "I'm overwhelmed and don’t know why",
    "I want to rebuild trust in myself"
  ];
  

  const healingExamples = [
    { emoji: '🌿', text: 'A monk in Japan who teaches healing through silence and ritual.' },
    { emoji: '🌺', text: 'A woman in Mexico who guides through curanderismo and ancestral practices.' },
    { emoji: '🕊️', text: 'A breathwork facilitator who studied under elders in Peru.' },
    { emoji: '🖤', text: 'A Black somatic healer using dance to process generational trauma.' },
    { emoji: '📖', text: 'A licensed therapist who also uses poetry and bodywork in sessions.' },
    { emoji: '🌈', text: 'A trans guide teaching journaling and self-love in a safe container.' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % healingExamples.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (selectedSpecialty) query.append('goal', selectedSpecialty);
    router.push(`/quiz?${query.toString()}`);
  };

  return (
    <div className="font-sans text-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-10">
        <Image src="/bg-blobs.png" alt="Background Blobs" fill className="object-cover opacity-100" />
      </div>

      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-transparent text-white z-10 relative">
        <div className="flex items-center space-x-8 relative">
          <h1 className="text-3xl font-bold">meloa</h1>
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

      {/* Hero Section */}
      <section className="text-center pt-40 px-4 text-white relative z-10">
        <h1 className="text-5xl font-extrabold mb-6">
          Healing should feel <span className="text-pink-500">creative</span>, <span className="text-blue-400">human</span>,<br />
          and <span className="text-green-400">soulful</span> — not clinical.
        </h1>
        <p className="mt-4 text-lg max-w-xl mx-auto text-white/90">
          Meloa is the first platform where <strong>licensed therapists</strong>, <strong>creative guides</strong>, <strong>spiritual teachers</strong>, and <strong>cultural healers</strong> come together — to help you heal through <strong>somatic work</strong>, <strong>expression</strong>, <strong>ritual</strong>, and <strong>personalized guidance</strong> in a safe, supportive space.
        </p>

        {/* New Emotion-Based Dropdown */}
        <div className="mt-12 max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl text-gray-800 space-y-6">
          <h4 className="text-lg font-semibold text-center text-gray-700">
            🌱 What's on your heart today?
          </h4>
          <select
            className="w-full p-3 border rounded-md"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option value="">Select your intention</option>
            {userIntentOptions.map((intent) => (
              <option key={intent} value={intent}>{intent}</option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="w-full mt-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
          >
            ✨ Start My Healing Journey
          </button>
        </div>
      </section>
      <div className="mt-6 flex flex-col sm:flex-row justify-center pb-32 items-center gap-4">
        <Link href="/quiz">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 border border-purple-600 rounded-full shadow hover:bg-purple-50 transition text-sm sm:text-base">
            👉 Not sure where to start? <span className="underline">Take the Quiz</span>
          </button>
        </Link>
        <Link href="/therapists">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 border border-purple-600 rounded-full shadow hover:bg-purple-50 transition text-sm sm:text-base">
            👀 Wanna explore? <span className="underline">Browse Guides</span>
          </button>
        </Link>
      </div>


      {/* Why Meloa (Typing Animation) */}
      <section className="bg-[#f5f7fa] py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">What Makes Meloa Different</h2>
        <p className="max-w-2xl mx-auto text-gray-700 mb-6">
          Traditional therapy isn’t for everyone. Meloa is for those seeking healing that feels <strong>creative</strong>, <strong>cultural</strong>, and <strong>soulful</strong>. From licensed professionals to spiritual guides, artists, and ancestral teachers — we honor the full spectrum of healing.
        </p>

        <div className="text-xl font-medium text-gray-800 min-h-[40px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
            >
              {healingExamples[currentIndex].emoji} {healingExamples[currentIndex].text}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>


      {/* Healing Paths Grid */}
      <section className="px-6 py-20 text-center bg-white">
        <h2 className="text-3xl font-bold mb-6">What Kind of Healing Speaks to You?</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Explore different healing journeys — from body-based to creative, ancestral to spiritual.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[{
            emoji: '🌿', title: 'Somatic Healing', href: '/healing/somatic', desc: 'Reconnect with your body and release stored tension.'
          }, {
            emoji: '🎨', title: 'Creative Expression', href: '/healing/creative-expression', desc: 'Heal through painting, music, dance, and poetry.'
          }, {
            emoji: '🧸', title: 'Inner Child Work', href: '/healing/inner-child', desc: 'Nurture the younger parts of you that still need love.'
          }, {
            emoji: '🔮', title: 'Spiritual Healing', href: '/healing/spiritual-healing', desc: 'Explore intuitive, energetic, and ancestral practices.'
          }, {
            emoji: '🌍', title: 'Cultural Healing', href: '/healing/cultural-healing', desc: 'Honor your roots and reconnect with your lineage.'
          }, {
            emoji: '🧘‍♀️', title: 'Mindfulness-Based Healing', href: '/healing/mindfulness-healing', desc: 'Breathe, slow down, and return to the present moment.'
          }].map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="bg-white border rounded-xl p-6 text-left shadow hover:shadow-md transition"
            >
              <div className="text-3xl mb-2">{path.emoji}</div>
              <h3 className="text-lg font-semibold mb-1">{path.title}</h3>
              <p className="text-gray-600 text-sm">{path.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Keep the rest of your sections the same */}
      {/* How It Works, Features, Practitioner CTA, Disclaimer, Testimonials, Footer */}

      {/* How It Works */}
      <section className="bg-white px-6 pt-10 pb-20 text-center">
        <h3 className="text-2xl font-bold mb-12">How Meloa Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div>
            <h4 className="text-lg font-semibold mb-2">1. Discover Your Style of Healing</h4>
            <p className="text-sm text-gray-600">We’ll gently guide you through questions to understand your emotional style..</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">2. Get Matched</h4>
            <p className="text-sm text-gray-600">We’ll show you licensed therapists and soulful guides aligned with your needs.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">3. Book a Session</h4>
            <p className="text-sm text-gray-600">Start your journey with someone who truly gets you.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#f7f9fc] py-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[{
            title: 'Modality-First Healing',
            desc: 'Search based on what feels right: somatic, journaling, parts work, inner child, or creative expression.',
            icon: '/palette.png',
          }, {
            title: 'Licensed + Trusted Guides',
            desc: 'Connect with licensed therapists or carefully vetted non-clinical healing practitioners.',
            icon: '/calendar.png',
          }, {
            title: 'Safe, Soulful Experiences',
            desc: 'Healing should feel human — not clinical. Our platform is built on emotional resonance, not checklists.',
            icon: '/healing.png',
          }].map(({ title, desc, icon }) => (
            <div key={title} className="text-center">
              <Image src={icon} alt={title} width={64} height={64} className="mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Practitioner CTA */}
      <section className="bg-white py-24 px-6 text-center">
        <h3 className="text-2xl font-bold mb-6">For Healers Who Practice Differently</h3>
        <p className="text-lg max-w-3xl mx-auto text-gray-600">
          Meloa is for therapists and healers who use somatic practices, parts work, journaling, inner child work, and creative techniques — but feel boxed in by traditional platforms. If you’re ready to show up as your full self, this is your space.
        </p>
        <Link href="/signup">
          <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Join as a Guide
          </button>
        </Link>
      </section>

      {/* Disclaimer */}
      <section className="bg-[#f1f5f9] py-12 px-6 text-center text-sm text-gray-600">
        <p>
          Meloa includes both licensed mental health professionals and non-clinical healing practitioners. We clearly label each provider and encourage you to choose what feels aligned for your journey.
        </p>
      </section>

      {/* Testimonials */}
      <section className="bg-[#f7f9fc] py-20 px-6 text-center">
        <h3 className="text-2xl font-bold mb-12">Stories of Real Healing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[{
            name: 'Karen C.',
            quote: 'Talk therapy helped, but somatic work through Meloa helped me actually *feel* safe in my body.',
            image: '/testimonial1.png',
          }, {
            name: 'Jillian T.',
            quote: 'My practitioner used inner child work and breathwork in a way I’ve never experienced before.',
            image: '/testimonial2.png',
          }, {
            name: 'Serena M.',
            quote: 'It’s the first time I felt like someone actually got how I process emotion. Not just with my mind, but with my whole self.',
            image: '/testimonial3.png',
          }].map(({ name, quote, image }) => (
            <div key={name} className="bg-white p-6 rounded-lg shadow text-left">
              <Image src={image} alt={name} width={64} height={64} className="rounded-full mb-4" />
              <p className="italic text-sm">"{quote}"</p>
              <p className="mt-4 font-bold text-sm">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-purple-100 to-blue-50 py-6 text-sm text-center text-gray-500">
        &copy; 2025 meloa. All rights reserved.
      </footer>
    </div>
  );
}