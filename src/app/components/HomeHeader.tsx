import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function HomeHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <AppLogo size={34} />
        <div>
          <h1 className="text-base font-bold text-foreground leading-tight tracking-tight">
            Pilot Checklist AI
          </h1>
          <p
            className="text-muted-foreground mt-0.5"
            style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            Aviation Procedure Parser
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="glass-card rounded-lg px-3 py-1.5 flex items-center gap-1.5"
          style={{ boxShadow: '0 0 12px rgba(0,196,140,0.12)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span
            className="text-success font-semibold tracking-wider"
            style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            AI Ready
          </span>
        </div>
      </div>
    </div>
  );
}