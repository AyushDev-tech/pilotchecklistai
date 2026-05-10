import React from 'react';
import AppLayout from '@/components/AppLayout';
import WarningsClient from './components/WarningsClient';

export default function WarningsPage() {
  return (
    <AppLayout>
      <div className="px-4 pt-12 pb-4">
        <WarningsClient />
      </div>
    </AppLayout>
  );
}