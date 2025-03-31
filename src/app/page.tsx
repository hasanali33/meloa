'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="font-sans text-gray-900">
      {/* Background blob overlay */}
      <div className="absolute top-0 left-0 w-full h-[120vh] -z-10">
      <Image src="/bg-blobs.png" alt="Background Blobs" fill className="object-cover scale-y-[1] opacity-100" />
      </div>

      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-transparent text-white z-10 relative">
        <h1 className="text-lg font-bold">meloa</h1>
        <div className="space-x-4">
        <Link href="/therapists">
          <button className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">Browse Therapists</button>
        </Link>
        <Link href="/signup">
          <button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition">Join as Therapist</button>
        </Link>
        </div>
      </header>
      

      {/* Hero Section */}
      <section className="text-center pt-40 pb-32 px-4 text-white">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Discover the Power of <br /> Creative Therapy
        </h2>
        <p className="mt-6 text-lg max-w-2xl mx-auto">
          Connect with licensed art, dance, drama, music and other creative therapists for
          meaningful, creative healing sessions.
        </p>

        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/therapists">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Browse Therapists
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
              Join as Therapist
            </button>
          </Link>
        </div>

        {/* Quiz Button */}
        <div className="mt-6">
          <Link href="/quiz">
            <button className="mt-4 px-5 py-2 bg-purple-600 text-white font-medium rounded-full hover:bg-purple-700 transition">
              🎨 Not sure what type of therapy you need? Take the Quiz
            </button>
          </Link>
        </div>
      </section>



      {/* Features */}
      <section className="bg-white py-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            {
              title: 'Creative Modalities',
              desc: 'Find therapists who specialize in art, dance, drama, and music.',
              icon: '/palette.png',
            },
            {
              title: 'Virtual Convenience',
              desc: 'Book sessions from home with seamless Calendly links.',
              icon: '/calendar.png',
            },
            {
              title: 'Personal Healing',
              desc: 'Find support that speaks your language and creative soul.',
              icon: '/healing.png',
            },
          ].map(({ title, desc, icon }) => (
            <div key={title} className="text-center">
              <Image src={icon} alt={title} width={64} height={64} className="mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      


      {/* CTA */}
      <section className="relative py-24 px-6 text-center text-gray-900 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/cta-blob.png" // replace with the correct blob asset once ready
            alt="CTA Background Blob"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <h3 className="text-2xl font-bold mb-6">Ready to start your healing journey?</h3>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center mx-auto hover:bg-blue-700 transition">
          Find Your Therapist <ArrowRight className="ml-2 h-4 w-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 max-w-6xl mx-auto">
        <div>
          <p className="text-purple-600 font-bold text-3xl">↑ Life Satisfaction</p>
          <p className="text-sm mt-2">
            Weekly creative activity improves mental health & happiness  
            <span className="block text-xs text-gray-400 mt-1">— BBC Creativity Test, 2019</span>
          </p>
        </div>
        <div>
          <p className="text-purple-600 font-bold text-3xl">↓ Trauma Symptoms</p>
          <p className="text-sm mt-2">
            Creative therapy helps process trauma and boost healing  
            <span className="block text-xs text-gray-400 mt-1">— National Institutes of Health</span>
          </p>
        </div>
        <div>
          <p className="text-purple-600 font-bold text-3xl">↑ Resilience</p>
          <p className="text-sm mt-2">
            Improves emotional regulation and self-esteem  
            <span className="block text-xs text-gray-400 mt-1">— American Psychological Association</span>
          </p>
        </div>
      </div>

      </section>


      {/* Testimonials */}
      <section className="bg-[#f7f9fc] py-20 px-6 text-center">
        <h3 className="text-2xl font-bold mb-12">What People Are Saying</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: 'Karen C.',
              quote: 'Creative therapy has been a game changer for anxiety.',
              image: '/testimonial1.png',
            },
            {
              name: 'Jillian T.',
              quote: 'I discovered new ways to express myself and heal.',
              image: '/testimonial2.png',
            },
            {
              name: 'Serena M.',
              quote: 'Finding a therapist who gets art has been so refreshing.',
              image: '/testimonial3.png',
            },
          ].map(({ name, quote, image }) => (
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
