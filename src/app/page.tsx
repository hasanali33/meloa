'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/NavBar';


export default function LandingPage() {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const userIntentOptions = [
    "I'm healing from a breakup",
    "I feel anxious or unsettled all the time",
    "I want to explore who I really am",
    "I'm burned out and disconnected from myself",
    "I've been holding onto something heavy",
    "I feel creatively stuck",
    "I'm curious about my spiritual side",
    "I want to feel safe in my body again",
    "I'm learning to set boundaries with others",
    "I want to love and trust myself again",
    "I'm grieving someone or something important",
    "I feel disconnected from who I used to be",
    "I want to feel more present in my life",
    "I'm overwhelmed, but I don’t know why",
    "I'm trying to reconnect with joy",
    "I want to break old patterns and begin again",
    "I'm not sure what I need — but I know I need something"
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
    if (selectedSpecialty) query.append('intention', selectedSpecialty);
    router.push(`/quiz?${query.toString()}`);
  };  

  return (
    <div className="font-sans text-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-10">
        <Image src="/bg-blobs.png" alt="Background Blobs" fill className="object-cover opacity-100" />
      </div>

      {/* Navbar */}
      <Navbar variant="dark" />

      {/* Hero Section */}
      <section className="text-center pt-40 px-4 text-white relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
        Healing should feel <span className="text-pink-500">creative</span>, <span className="text-blue-400">human</span>,<br />
        and <span className="text-green-400">soulful</span> — not clinical.
      </h1>

      <p className="mt-4 text-lg max-w-xl mx-auto text-white/90 text-center leading-relaxed">
        Meloa connects you with <strong>licensed therapists</strong>, <strong>spiritual teachers</strong>, <strong>creative coaches</strong>, and <strong>cultural healers</strong> — guides who help you heal through <strong>movement</strong>, <strong>expression</strong>, and <strong>soul work</strong>.
        <br />
        <span className="block mt-3">Because therapy isn’t the only path. You deserve something that fits.</span>
      </p>

      <p className="mt-6 text-base max-w-lg mx-auto text-white/70 text-center">
        Your way. Your vibe. Your healing.
      </p>

        {/* New Emotion-Based Dropdown */}
        <div className="mt-12 max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl text-gray-800 space-y-6">
          <h4 className="text-lg font-semibold text-center text-gray-700">
            🌱 What's on your heart today?
          </h4>
          <select
            className="w-full p-3 border-2 border-black rounded-md"
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
      <section className="bg-[#f9f7f3] py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">What Makes Meloa Different</h2>
          <p className="max-w-2xl mx-auto text-gray-700 mb-6">
            Traditional therapy isn’t for everyone. Meloa is for people who’ve tried therapy and still felt stuck — and want to heal through <strong>creativity</strong>, <strong>culture</strong>, and <strong>soul</strong>.  
            <br /><br />
            From licensed professionals to spiritual teachers, artists, coaches, and ancestral healers — we honor the full spectrum of what healing can look like.
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

      {/* Visual Strip – Healing Imagery */}
      <section className="bg-[#f9f7f3] w-full py-12 px-4 bg-[#f8fafc] flex justify-center">
        <div className="w-full max-w-5xl">
          <div className="max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg">
          <img
            src="/healing-header.png"
            alt="Healing through movement, creativity, and mindfulness"
            className="w-full object-cover h-[260px] md:h-[300px]"
          />
        </div>
          {/* Optional caption */}
          {/* <p className="text-sm text-gray-500 text-center mt-3 italic">Real ways people heal — in their own rhythm.</p> */}
        </div>
      </section>


      {/* Healing Paths Grid */}
      <section className="bg-white py-24 px-6 text-center">
      <h2 className="text-3xl font-bold mb-6">Your Healing, Your Way</h2>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        Choose how you want to heal — not based on symptoms, but on what your soul needs right now.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[{
          emoji: '🌿', title: 'Somatic Healing', href: '/healing/somatic', desc: 'Reconnect with your body and release stored tension.'
        }, {
          emoji: '🎨', title: 'Creative Expression', href: '/healing/creative-expression', desc: 'Heal through painting, music, dance, and poetry.'
        }, {
          emoji: '🧸', title: 'Inner Child Work', href: '/healing/inner-child', desc: 'Nurture the younger parts of you that still need love.'
        }, {
          emoji: '🔮', title: 'Spiritual Healing', href: '/healing/spiritual', desc: 'Explore intuitive, energetic, and ancestral practices.'
        }, {
          emoji: '🌍', title: 'Cultural Healing', href: '/healing/cultural', desc: 'Honor your roots and reconnect with your lineage.'
        }, {
          emoji: '🧘‍♀️', title: 'Mindfulness-Based Healing', href: '/healing/mindfulness', desc: 'Breathe, slow down, and return to the present moment.'
        }].map((path) => (
          <Link
            key={path.href}
            href={path.href}
            className="bg-white border rounded-xl p-6 text-left shadow hover:shadow-md transition border-1.5 border-black"
          >
            <div className="text-3xl mb-2">{path.emoji}</div>
            <h3 className="text-lg font-semibold mb-1">{path.title}</h3>
            <p className="text-gray-600 text-sm">{path.desc}</p>
          </Link>
        ))}
      </div>
    </section>

    {/* How It Works */}
    <section className="bg-[#f3f4f6] py-24 px-6 text-center">
      {/* Top Headline */}
      <h2 className="text-3xl md:text-4xl font-bold mb-2">You don't need to be fixed.</h2>
      <h3 className="text-xl md:text-2xl text-gray-600 mb-12">You just need the right guide.</h3>

      {/* 3-Step Process */}
      <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-12 max-w-5xl mx-auto text-left">
        {/* Step 1 */}
        <div className="flex-1">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300">
              <span className="text-2xl">🌀</span>
            </div>
          </div>
          <h4 className="text-lg font-semibold flex justify-center items-center gap-2">
            <span className="text-yellow-500 text-xl">1</span> Feel something
          </h4>
          <p className="mt-2 text-sm text-gray-600 text-center max-w-xs mx-auto">
            Search by how you want a heal — journaling, parts work, grief, or creative blocks. No wrong doors.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex-1">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300">
              <span className="text-2xl">🌱</span>
            </div>
          </div>
          <h4 className="text-lg font-semibold flex justify-center items-center gap-2">
            <span className="text-yellow-500 text-xl">2</span> Meet your guide
          </h4>
          <p className="mt-2 text-sm text-gray-600 text-center max-w-xs mx-auto">
            We'll match you with someone who gets you — therapist or trusted guide.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex-1">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300">
              <span className="text-2xl">💬</span>
            </div>
          </div>
          <h4 className="text-lg font-semibold flex justify-center items-center gap-2">
            <span className="text-gray-700 text-xl">3</span> DM. Book. Heal.
          </h4>
          <p className="mt-2 text-sm text-gray-600 text-center max-w-xs mx-auto">
            Start your journey. Message them, book, and heal.
          </p>
        </div>
      </div>

      {/* Downward Arrow Divider */}
      <div className="flex justify-center my-12">
        <div className="w-px h-6 bg-gray-300 relative">
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Why Meloa Feels Different */}
      <h3 className="text-2xl md:text-3xl font-bold mb-10">Why Meloa Feels Different</h3>
        {/* Card 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="rounded-xl bg-[#f9fafb] border border-gray-200 p-6 text-center shadow-sm transition-all hover:shadow-md hover:scale-[1.02]">
          <div className="text-3xl mb-3">🎨</div>
          <h4 className="font-semibold text-lg mb-1">Modality-First</h4>
          <p className="text-sm text-gray-600">
              Most platforms ask what kind of provider you want. <br />
              We ask how you want to <em>feel</em>. <br />
              Then we guide you toward a healing path — somatic, creative, cultural, or spiritual — that actually speaks to your soul.
            </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl bg-[#f9fafb] border border-gray-200 p-6 text-center shadow-sm transition-all hover:shadow-md hover:scale-[1.02]">
          <div className="text-3xl mb-3">🌿</div>
          <h4 className="font-semibold text-lg mb-1">Not Just Titles</h4>
          <p className="text-sm text-gray-600">Licensed therapist. Spiritual teacher. Ancestral guide.
          We don’t box healing in. You connect with people who resonate — not just those who are credentialed.</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl bg-[#f9fafb] border border-gray-200 p-6 text-center shadow-sm transition-all hover:shadow-md hover:scale-[1.02]">
          <div className="text-3xl mb-3">🧭</div>
          <h4 className="font-semibold text-lg mb-1">Feels Human</h4>
          <p className="text-sm text-gray-600">
              No intake forms asking what’s wrong with you. <br />
              No cold clinical language. <br />
              Just a soulful space to move, feel, create, breathe — and be seen.
            </p>
        </div>
      </div>
    </section>

      {/* Practitioner CTA */}
      <section className="bg-[#fef3f7] py-20 px-6 text-center">
        <h3 className="text-2xl font-bold mb-6">For Healers Who Practice Differently</h3>
        <p className="text-lg max-w-3xl mx-auto text-gray-600">
          Meloa is where therapists and healers—using somatic, creative, and alternative techniques—can break free from the norms and truly show up as their full selves.
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
      <section className="bg-[#f9f7f3] py-20 px-6 text-center">
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