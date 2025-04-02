import { Suspense } from 'react';
import QuizPage from './QuizPage';

export default function QuizWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizPage />
    </Suspense>
  );
}
