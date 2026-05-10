import React from 'react';
import AppLayout from '@/components/AppLayout';
import HomeHeader from './components/HomeHeader';
import ProcedureInput from './components/ProcedureInput';

export default function HomePage() {
  return (
    <AppLayout>
      <div className="px-4 pt-12 pb-4 space-y-5">
        <HomeHeader />
        <ProcedureInput />
      </div>
    </AppLayout>
  );
}