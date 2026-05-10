'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, BookOpen, AlertTriangle, FileText, Settings } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const NAV_ITEMS = [
  { key: 'nav-home', label: 'Home', icon: Home, href: '/' },
  { key: 'nav-study', label: 'Study', icon: BookOpen, href: '/study-mode' },
  { key: 'nav-warnings', label: 'Warnings', icon: AlertTriangle, href: '/warnings-page' },
  { key: 'nav-procedures', label: 'Procedures', icon: FileText, href: '/procedures' },
  { key: 'nav-settings', label: 'Settings', icon: Settings, href: '/settings' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 glass-surface border-t border-border/60"
      style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex items-stretch h-[60px] px-2 max-w-screen-sm mx-auto">
        {NAV_ITEMS?.map((item) => {
          const Icon = item?.icon;
          const isActive =
            item?.href === '/' ? pathname === '/' : pathname?.startsWith(item?.href);
          return (
            <button
              key={item?.key}
              onClick={() => router?.push(item?.href)}
              className={`nav-tab relative ${isActive ? 'nav-tab-active' : 'nav-tab-inactive'}`}
              aria-label={item?.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active background pill */}
              {isActive && (
                <span
                  className="absolute inset-x-1.5 inset-y-1 rounded-lg bg-primary/10 border border-primary/20"
                  style={{ boxShadow: '0 0 12px rgba(0,82,204,0.15)' }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-0.5">
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className={`transition-all duration-200 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <span
                  className={`transition-colors duration-200 font-semibold tracking-wider uppercase ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  style={{ fontSize: '0.58rem', letterSpacing: '0.08em' }}
                >
                  {item?.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}