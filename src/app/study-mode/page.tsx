import React from 'react';
import AppLayout from '@/components/AppLayout';
import StudyModeClient from './components/StudyModeClient';

export default function StudyModePage() {
  return (
    <AppLayout>
      <div className="px-4 pt-12 pb-4">
        <StudyModeClient />
      </div>
    </AppLayout>
  );
}