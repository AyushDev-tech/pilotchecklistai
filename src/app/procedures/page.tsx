import React from 'react';
import AppLayout from '@/components/AppLayout';
import ProceduresEmptyState from './components/ProceduresEmptyState';

export default function ProceduresPage() {
  return (
    <AppLayout>
      <div className="px-4 pt-12 pb-4">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-5 h-5 text-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <h1 className="text-lg font-bold text-foreground">Procedures</h1>
        </div>
        <ProceduresEmptyState />
      </div>
    </AppLayout>
  );
}