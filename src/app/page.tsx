'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedModality, setSelectedModality] = useState('');

  const modalityOptions = [
    'Art Therapy', 'Music Therapy', 'Dance Therapy', 'Drama Therapy', 'Breathwork', 'Somatic Therapy',
    'Parts Work', 'Journaling', 'Inner Child Healing', 'Creative Expression', 'Guided Visualization',
    'EFT Tapping', 'Spiritual Counseling'
  ];

  const specialtyOptions = [
    'Anxiety', 'Grief', 'Trauma', 'Depression', 'Relationships', 'Self-Esteem', 'Burnout', 'Creative Blocks',
    'Spiritual Exploration', 'Life Transitions', 'PTSD', 'LGBTQ+', 'Cultural Identity'
  ];

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (selectedModality) query.append('modality', selectedModality);
    if (selectedSpecialty) query.append('goal', selectedSpecialty);
    router.push(`/quiz?${query.toString()}`);
  };

  return (
    <div className="font-sans text-gray-900">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-10">
        <Image src="/bg-blobs.png" alt="Background Blobs" fill className="object-cover scale-y-[1] opacity-100" />
      </div>

      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-transparent text-white z-10 relative">
        <h1 className="text-3xl font-bold">meloa</h1>
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
      <section className="text-center pt-40 pb-32 px-4 text-white">
        <h1 className="text-5xl font-extrabold">Begin Your Healing Journey</h1>
        <p className="mt-4 text-lg max-w-xl mx-auto">
          Meloa connects you with licensed therapists and soulful healing guides through a personalized journey.
          Whether you're feeling stuck, numb, anxious, or just craving connection — we'll help you find the right support.
        </p>


        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/therapists">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Connect with a Guide
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
              Join as a Guide
            </button>
          </Link>
        </div>

        {/* Guided Search Bar */}
        <div className="mt-12 max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl text-gray-800 space-y-4">
          <h4 className="text-lg font-semibold text-center text-gray-700">
            🌱 What are you seeking support for?
          </h4>
          <select
            className="w-full p-3 border rounded-md"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option value="">Select your healing intention</option>
            {specialtyOptions.map((specialty) => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>

          <h4 className="text-lg font-semibold text-center text-gray-700 mt-4">
            🎨 What kind of healing resonates with you?
          </h4>
          <select
            className="w-full p-3 border rounded-md"
            value={selectedModality}
            onChange={(e) => setSelectedModality(e.target.value)}
          >
            <option value="">Select a healing style</option>
            {modalityOptions.map((modality) => (
              <option key={modality} value={modality}>{modality}</option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="w-full mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
          >
            ✨ Start My Healing Journey
          </button>
        </div>
      </section>

      {/* Keep the rest of your sections the same */}
      {/* How It Works, Features, Practitioner CTA, Disclaimer, Testimonials, Footer */}


      {/* How It Works */}
      <section className="bg-white py-24 px-6 text-center">
        <h3 className="text-2xl font-bold mb-12">How Meloa Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div>
            <h4 className="text-lg font-semibold mb-2">1. Take the Quiz</h4>
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