'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const healingStyleMessages = {
    'Creative Expression & Art-Based Healing': "This path is for those who feel deeply and need to express what words can't. Whether through painting, journaling, music, or movement — this is about reconnecting with your inner voice and letting it speak freely.",
    'Somatic Therapy & Body-Based Work': "This path helps you come home to your body. Through breathwork, grounding practices, and somatic release, it's about feeling safe again in your physical self and gently unwinding what’s been held inside.",
    'Inner Child & Parts Work': "This path invites you to tend to the younger parts of you that still need love, safety, and care. It’s gentle, deep work — helping you rebuild inner trust and reconnect with forgotten pieces of your story.",
    'Cultural & Ancestral Healing': "This path honors where you come from. Through ancestral wisdom, storytelling, and cultural practices, it's about reclaiming identity, lineage, and the deep-rooted healing that can only come from knowing your roots.",
    'Spiritual & Energetic Healing': "This path connects you to something bigger — energy, spirit, intuition, or the unseen. It’s ideal for those feeling drawn toward meaning, soul work, or energetic alignment beyond traditional methods.",
    'Mindfulness-Based Healing': "This path supports presence and stillness. Through meditation, awareness, and gentle practices, it’s for those seeking peace, emotional regulation, and clarity in the moment-to-moment experience of life.",
    'Reflective Healing & Talk-Based Support': "This path is rooted in thoughtful conversation and reflective insight. Ideal if you want to talk things through with someone who sees you clearly, listens deeply, and holds gentle space for your process."
  };
  

const questions = [
    {
      question: 'When emotions come up, what feels most true for you?',
      options: [
        'I overthink or try to “fix” them',
        'I shut down or feel disconnected',
        'I want to feel them but don’t know how',
        'I try to stay present and let them move through me',
      ],
    },
    {
      question: 'Which kind of support feels most nourishing right now?',
      options: [
        'Exploring my inner child and unmet needs',
        'Grounding through body awareness and somatic work',
        'Expressing my emotions through creativity (art, writing, movement)',
        'Feeling gently held in 1-on-1 space with someone attuned to me',
      ],
    },
    {
      question: 'What kind of energy are you seeking in a guide?',
      options: [
        'Reflective and thoughtful',
        'Creative and expressive',
        'Somatic and grounding',
        'Soft, warm, and nurturing',
      ],
    },
    {
      question: 'What kind of healing guides are you open to?',
      options: [
        'Only licensed therapists',
        'Open to both licensed and non-licensed guides',
        'Prefer non-clinical, soulful healing guides',
      ],
    },
    {
      question: 'Do you prefer to connect online or in person?',
      options: ['Online', 'In person', 'I’m open to either'],
    },
    {
      question: 'Do you feel called to any specific healing paths?',
      options: [
        'Creative expression & art-based healing',
        'Somatic or body-based work',
        'Spiritual or ancestral healing',
        'Inner child or parts work',
        'Mindfulness & presence practices',
        'I’m not sure yet — I’m open to exploring',
      ],
    },
    {
      question: 'What’s something you’re hoping to feel more of through healing?',
      options: [
        'Peace or calm in my body',
        'Clarity around who I am',
        'Joy, lightness, or creative flow',
        'Trust in myself or others',
        'A sense of connection or meaning',
        'I’m not sure — just something different than now',
      ],
    },
    {
      question: 'Do you have a general range you’d like to stay within per session?',
      options: [
        'Under $75',
        '$75–$125',
        '$125–$175',
        'I’m flexible / open',
      ],
    },
    {
      question: 'Where are you in your healing journey?',
      options: [
        'I’m just beginning to explore this work',
        'I’ve done some therapy or healing before',
        'I’ve been on this path for a while and want to go deeper',
      ],
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
    "I'm healing from a breakup": "Breakups can shake your sense of self. This journey helps you heal, reconnect, and feel whole again.",
    "I feel anxious or unsettled all the time": "Anxiety is heavy to carry. We’ll explore gentle paths to bring your system back to peace and presence.",
    "I want to explore who I really am": "That’s a beautiful and brave intention. We’re here to support your unfolding and help you feel more like yourself.",
    "I'm burned out and disconnected from myself": "Burnout dims your light. Let’s guide you toward rest, reconnection, and the space to breathe again.",
    "I've been holding onto something heavy": "Even unnamed pain deserves care. This journey invites you to release, express, and begin to feel lighter.",
    "I feel creatively stuck": "Your creativity isn’t gone — it’s waiting. Let’s gently reconnect you to your voice, your spark, and your expression.",
    "I'm curious about my spiritual side": "Your curiosity is sacred. Let’s explore healing paths that align with your spirit, your questions, and your journey.",
    "I want to feel safe in my body again": "Reconnecting with your body is powerful. This journey offers somatic and grounding practices to help you come home to yourself.",
    "I'm learning to set boundaries with others": "Boundaries are a form of self-love. Let’s help you strengthen your voice and honor what feels right for you.",
    "I want to love and trust myself again": "You deserve your own tenderness. Let’s rediscover the parts of you that are deeply lovable and whole.",
    "I'm grieving someone or something important": "Grief takes many shapes. This space offers care and presence for the losses your heart still holds.",
    "I feel disconnected from who I used to be": "It’s okay to feel lost. Let’s help you remember — and reconnect with — the parts of you that still remain.",
    "I want to feel more present in my life": "Presence is a gift. We’ll help you find practices that return you to the moment, and to yourself.",
    "I'm overwhelmed, but I don’t know why": "Even without answers, your feelings matter. Let’s hold space and gently explore what’s beneath the surface.",
    "I'm trying to reconnect with joy": "Joy is still within reach. Let’s guide you toward healing that opens the door to lightness and aliveness again.",
    "I want to break old patterns and begin again": "You are not your past. This journey helps you release old stories and step into something new.",
    "I'm not sure what I need — but I know I need something": "You don’t need all the answers to begin. Let’s take the first step together, gently and with care."
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
                Based on what you shared, <span className="font-semibold">{therapy}</span> might be the path that most deeply supports where you are right now.
                </p>
                <p className="text-gray-700 italic mb-6">
                {healingStyleMessages[therapy]}
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
