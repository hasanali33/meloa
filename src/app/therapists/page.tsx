import { Suspense } from 'react';
import TherapistList from './therapistList';

export default function TherapistsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-purple-600">Loading therapists...</div>}>
      <TherapistList />
    </Suspense>
  );
}
