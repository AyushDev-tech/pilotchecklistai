import React from 'react';
import AppLayout from '@/components/AppLayout';
import SettingsClient from './components/SettingsClient';

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="px-4 pt-12 pb-4">
        <SettingsClient />
      </div>
    </AppLayout>
  );
}