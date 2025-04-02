'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function SomaticHealingPage() {
  return (
    <div className="font-sans text-white relative overflow-hidden min-h-screen">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image src="/bg-blobs.png" alt="Background Blobs" fill className="object-cover opacity-100" />
      </div>

      <div className="max-w-3xl mx-auto py-24 px-6">
        <h1 className="text-4xl font-extrabold text-center mb-6">
          🌿 Somatic & Body-Based Healing
        </h1>
        <p className="text-lg text-center mb-12">
          Reconnect with your body, release stored trauma, and find safety in your nervous system through movement, breath, and physical awareness.
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">What is Somatic Healing?</h2>
            <p>
              Somatic healing focuses on your body as the key to emotional healing. Rather than only talking through experiences,
              this path helps you tune into sensations, patterns, and physical signals that hold stress, trauma, or unprocessed emotion.
              Through modalities like breathwork, body scanning, and intuitive movement, you learn how to release and reset.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Who is this for?</h2>
            <p>
              If you've tried traditional therapy and still feel disconnected or on edge, somatic work can help you ground into your body
              and reclaim your sense of presence. It’s especially helpful for trauma, anxiety, burnout, and emotional numbness.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">What might a session look like?</h2>
            <p>
              A guide might lead you through grounding exercises, breathwork, movement, or gentle touch-based techniques to help you process
              what your body is holding. You’ll move slowly, intentionally, and always at your own pace.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Guides Who Practice Somatic Healing</h2>
            {/* Placeholder cards for guides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white text-gray-800 rounded-xl p-4 shadow">Guide 1</div>
              <div className="bg-white text-gray-800 rounded-xl p-4 shadow">Guide 2</div>
              <div className="bg-white text-gray-800 rounded-xl p-4 shadow">Guide 3</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}