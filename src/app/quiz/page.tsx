'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    question: 'When emotions come up, what’s most true for you?',
    options: [
      'I overthink or try to “fix” them',
      'I shut down or dissociate',
      'I want to feel them but don’t know how',
      'I try to stay with them and let them move through me',
    ],
  },
  {
    question: 'Which of these sounds most supportive right now?',
    options: [
      'Exploring my inner child and unmet needs',
      'Grounding myself through body awareness',
      'Expressing emotions creatively (writing, art, etc.)',
      'Feeling held in a gentle 1-on-1 space',
    ],
  },
  {
    question: 'What kind of energy do you want in your sessions?',
    options: [
      'Reflective and thoughtful',
      'Creative and expressive',
      'Somatic and body-based',
      'Soft and nurturing',
    ],
  },
  {
    question: 'Do you prefer licensed therapists or alternative guides?',
    options: [
      'Licensed therapists only',
      'Open to both',
      'Non-clinical healing guides are more my vibe',
    ],
  },
  {
    question: 'Would you like therapy online or in person?',
    options: ['Online', 'In Person', 'Either'],
  },
];

const modalityMap = {
  'Creative Expression & Art-Based Healing': [
    'Art Therapy', 'Music Therapy', 'Dance Therapy', 'Creative Expression', 'Journaling',
  ],
  'Somatic Therapy & Body-Based Work': [
    'Somatic Therapy', 'Breathwork', 'Guided Visualization',
  ],
  'Inner Child & Parts Work': [
    'Inner Child Healing', 'Parts Work', 'EFT Tapping',
  ],
  'Reflective Healing & Talk-Based Support': [
    'Spiritual Counseling', 'Drama Therapy', 'Talk Therapy',
  ]
};

export default function QuizPage() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    const updatedAnswers = [...answers, option];
    setAnswers(updatedAnswers);

    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const recommendTherapy = () => {
    if (
      answers.includes('Creative and expressive') ||
      answers.includes('Expressing emotions creatively (writing, art, etc.)')
    ) return 'Creative Expression & Art-Based Healing';
    if (
      answers.includes('Somatic and body-based') ||
      answers.includes('Grounding myself through body awareness')
    ) return 'Somatic Therapy & Body-Based Work';
    if (
      answers.includes('Exploring my inner child and unmet needs')
    ) return 'Inner Child & Parts Work';
    return 'Reflective Healing & Talk-Based Support';
  };

  const therapy = recommendTherapy();
  const tags = modalityMap[therapy];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d5eefe] relative px-4">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/cta-blob.png"
          alt="Background"
          fill
          className="object-cover opacity-100"
        />
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        {!started ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl font-bold text-purple-700 mb-4">✨ Find Your Healing Style</h1>
            <p className="text-gray-700 mb-6">
              This short, reflective journey will help match you with healing styles that resonate with your emotional and spiritual needs.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
            >
              Begin Journey
            </button>
          </motion.div>
        ) : !showResult ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-snug">
                {questions[currentStep].question}
              </h2>
              <div className="grid gap-3">
                {questions[currentStep].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="border border-purple-500 text-purple-600 rounded-full px-4 py-2 hover:bg-purple-50 transition text-sm"
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-6">Step {currentStep + 1} of {questions.length}</p>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-purple-700 mb-4">💫 Your Healing Style</h2>
            <p className="text-gray-800 mb-6 leading-relaxed">
              Based on your answers, <span className="font-semibold">{therapy}</span> might be the most supportive for where you are right now.
            </p>
            <Link
              href={{
                pathname: '/therapists',
                query: { modality: tags.join(',') },
              }}
            >
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full hover:opacity-90 transition">
                Browse Guides →
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}