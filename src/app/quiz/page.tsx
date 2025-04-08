'use client';

import { Suspense } from 'react';
import QuizPage from './QuizPage';
import Navbar from '../../components/NavBar';

export default function QuizWrapper() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <Navbar />
      <Suspense fallback={<div className="text-center mt-10 text-purple-600">Loading...</div>}>
        <QuizPage />
      </Suspense>
    </div>
  );
}
