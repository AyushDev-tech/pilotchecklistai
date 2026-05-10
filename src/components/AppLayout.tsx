import React from 'react';
import BottomNav from './BottomNav';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background cockpit-grid">
      {/* Ambient glow blobs */}
      <div
        className="blob-primary fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] -z-0 animate-glow-pulse"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-24 right-0 w-[300px] h-[300px] -z-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,82,204,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />
      <main
        className="relative z-10 min-h-screen max-w-screen-sm mx-auto scroll-smooth-ios"
        style={{ paddingBottom: 'calc(60px + max(8px, env(safe-area-inset-bottom, 0px)) + 8px)' }}
      >
        {children}
      </main>
      <BottomNav />
    </div>
  );
}