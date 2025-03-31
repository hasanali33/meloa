'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const questions = [
  {
    question: 'What are you hoping to get out of therapy?',
    options: ['Self-expression', 'Stress relief', 'Healing trauma', 'Exploration'],
  },
  {
    question: 'What creative outlet appeals to you most?',
    options: ['Art', 'Music', 'Dance', 'Drama'],
  },
  {
    question: 'What emotions are you currently dealing with?',
    options: ['Anxiety', 'Grief', 'Burnout', 'Trauma'],
  },
  {
    question: 'Do you prefer solo or group sessions?',
    options: ['1-on-1 sessions', 'Group sessions'],
  },
  {
    question: 'Would you like therapy online or in person?',
    options: ['Online', 'In Person', 'Either'],
  },
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const recommendTherapy = () => {
    if (answers.includes('Art') || answers.includes('Self-expression')) return 'Art Therapy';
    if (answers.includes('Music') || answers.includes('Stress relief')) return 'Music Therapy';
    if (answers.includes('Dance')) return 'Dance Therapy';
    if (answers.includes('Drama')) return 'Drama Therapy';
    return 'Creative Therapy';
  };

  const therapy = recommendTherapy();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/cta-blob.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-100"
        />
      </div>

      {/* Quiz Container */}
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center">
        {!showResult ? (
          <>
            <h2 className="text-lg font-bold text-black mb-6">
              {questions[currentStep].question}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[currentStep].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="border border-purple-400 text-purple-600 rounded-full px-4 py-2 hover:bg-purple-100 transition"
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-6">Step {currentStep + 1} of {questions.length}</p>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">🎨 Your Recommended Therapy</h2>
            <p className="text-gray-700 mb-6">
              Based on your answers, <span className="font-semibold">{therapy}</span> may be a great fit for
              helping you express emotions, reduce stress, and heal through creativity.
            </p>
            <Link href="/therapists">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full hover:opacity-90 transition">
                Browse Therapists →
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}