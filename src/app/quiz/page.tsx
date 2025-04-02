'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
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
  'Mindfulness-Based Healing': [
    'Spiritual Counseling', 'Drama Therapy', 'Talk Therapy',
  ],
  'Cultural & Ancestral Healing': [
    'Storytelling', 'Ritual', 'Chanting', 'Herbalism', 'Ceremony',
  ],
  'Spiritual & Energetic Healing': [
    'Energy Clearing', 'Reiki', 'Channeling', 'Sound Healing', 'Spiritual Coaching',
  ],
};

const slugMap = {
  'Creative Expression & Art-Based Healing': 'creative-expression',
  'Somatic Therapy & Body-Based Work': 'somatic',
  'Inner Child & Parts Work': 'inner-child',
  'Cultural & Ancestral Healing': 'cultural',
  'Spiritual & Energetic Healing': 'spiritual',
  'Mindfulness-Based Healing': 'mindfulness',
};

const intentionMessages = {
    "I'm navigating a breakup": "Breakups can shake our sense of self. This journey will help you begin to heal, reconnect, and feel whole again.",
    "I'm feeling anxious all the time": "Anxiety is heavy to carry. Let’s explore gentle practices that calm your system and bring back peace.",
    "I want to explore my identity": "That’s a beautiful and brave intention. This space is here to support your unfolding and self-discovery.",
    "I'm burned out": "We know burnout can be overwhelming. Let’s discover how we can help you recharge and reconnect.",
    "I need help processing trauma": "You're not alone in carrying your pain. This journey offers compassionate paths to gently process and heal.",
    "I'm stuck creatively": "Feeling blocked is frustrating — but your creativity is still there. Let’s reconnect with it together.",
    "I'm curious about spirituality": "Your curiosity is sacred. Let’s explore healing paths that align with your spiritual questions and desires.",
    "I want to reconnect with my body": "It’s powerful to seek connection with your body. This journey will guide you to modalities that support that reconnection.",
    "I'm learning to set boundaries": "Setting boundaries is an act of self-love. Let’s find support that empowers you to honor your needs.",
    "I want to love myself again": "You deserve your own tenderness. Let’s rediscover the parts of you that are deeply lovable and whole.",
    "I'm grieving someone or something": "Grief takes many forms. This journey will help you hold that grief with care and compassion.",
    "I feel disconnected from who I am": "It’s okay to feel lost. We’ll help you find healing paths that bring you back to yourself.",
    "I want to feel more present": "Presence is a gift. Let’s find modalities that support groundedness and connection in your daily life.",
    "I'm overwhelmed and don’t know why": "That feeling matters. Let’s gently explore what’s beneath the overwhelm and find soothing support.",
    "I want to rebuild trust in myself": "You’re worthy of trust — especially from yourself. Let’s begin a healing journey to restore that inner bond.",
  };
  

export default function QuizPage() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const searchParams = useSearchParams();
  const selectedIntention = searchParams.get('intention');

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
  const slug = slugMap[therapy];

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
          <p className="text-gray-700 mb-2">What’s on your heart today?</p>
        
          {selectedIntention && (
            <>
              <p className="text-lg font-semibold text-purple-700 mb-2">“{selectedIntention}”</p>
              <p className="text-gray-700 mb-6 italic">
                {intentionMessages[selectedIntention] ||
                  `I see you’re feeling ${selectedIntention}. That’s important to acknowledge. This journey is here to guide you through your unique healing needs and support you with styles that resonate deeply with your emotional and spiritual self.`}
              </p>
            </>
          )}
        
          {!selectedIntention && (
            <p className="text-gray-700 mb-6 italic">
              You deserve your own tenderness. Let’s rediscover the parts of you that are deeply lovable and whole.
            </p>
          )}
        
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
            <div className="flex flex-col gap-4">
              <Link
                href={{ pathname: '/therapists', query: { modality: tags.join(',') } }}
              >
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full hover:opacity-90 transition">
                  Browse Guides →
                </button>
              </Link>
              <Link
                href={`/healing/${slug}`}
              >
                <button className="px-6 py-3 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition">
                  Learn More About This Path →
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
