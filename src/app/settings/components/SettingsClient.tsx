'use client';

import React, { useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Moon,
  Sun,
  Zap,
  Shield,
  HelpCircle,
  ChevronRight,
  Lock,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import UpgradeModal from '@/components/ui/UpgradeModal';

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}

function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 tap-target ${
        checked ? 'bg-primary' : 'bg-muted/80'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
      style={checked ? { boxShadow: '0 0 10px rgba(0,82,204,0.35)' } : {}}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
      />
    </button>
  );
}

export default function SettingsClient() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [haptics, setHaptics] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2.5">
          <Settings size={20} className="text-primary" />
          <h1 className="text-lg font-bold text-foreground">Settings</h1>
        </div>

        {/* Account section */}
        <section className="space-y-2">
          <p
            className="text-muted-foreground px-1 font-semibold tracking-wider"
            style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            Account
          </p>
          <div
            className="glass-card rounded-xl overflow-hidden divide-y divide-border/40"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.25)' }}
          >
            <div className="flex items-center gap-3 px-4 py-4">
              <div
                className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shrink-0"
                style={{ boxShadow: '0 0 12px rgba(0,82,204,0.3)' }}
              >
                <User size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Guest User</p>
                <p className="text-xs text-muted-foreground mt-0.5">Sign in to sync your data</p>
              </div>
              <Badge variant="muted">FREE</Badge>
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/15 transition-colors duration-200 tap-target">
              <div className="w-10 h-10 bg-muted/40 rounded-xl flex items-center justify-center shrink-0">
                <Shield size={16} className="text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">Sign In / Create Account</p>
                <p className="text-xs text-muted-foreground mt-0.5">Save your checklists across devices</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground" />
            </button>
          </div>
        </section>

        {/* Subscription section */}
        <section className="space-y-2.5">
          <p
            className="text-muted-foreground px-1 font-semibold tracking-wider"
            style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            Subscription
          </p>
          <div
            className="relative gradient-primary rounded-xl p-5 overflow-hidden"
            style={{ boxShadow: '0 4px 20px rgba(0,82,204,0.3), 0 0 0 1px rgba(0,82,204,0.4)' }}
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/3 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={13} className="text-white/80" />
                  <span
                    className="text-white/70 font-semibold tracking-wider"
                    style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  >
                    Current Plan
                  </span>
                </div>
                <p className="text-base font-bold text-white">Free Plan</p>
                <p className="text-xs text-white/65 mt-0.5">5 generations/day · Basic study</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowUpgrade(true)}
                className="bg-white text-primary font-semibold text-xs px-4 py-2.5 rounded-lg hover:bg-white/90 transition-colors tap-target"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
              >
                Upgrade
              </motion.button>
            </div>
          </div>

          <div
            className="glass-card rounded-xl p-5"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,82,204,0.08)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-foreground">Student Pro Plan</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">₹99</span>
                <span className="text-xs text-muted-foreground">/mo</span>
              </div>
            </div>
            <ul className="space-y-2.5 mb-5">
              {[
                'Unlimited checklist generations',
                'Save & manage procedures',
                'Full study mode access',
                'Premium PDF exports',
                'Advanced AI analysis',
              ].map((f) => (
                <li
                  key={`settings-pro-${f.slice(0, 15).replace(/\s/g, '-')}`}
                  className="flex items-center gap-2.5 text-xs text-muted-foreground"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                    style={{ boxShadow: '0 0 4px rgba(0,82,204,0.5)' }}
                  />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowUpgrade(true)}
              className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
              style={{ minHeight: '48px' }}
            >
              <Zap size={14} />
              Upgrade to Pro
            </button>
          </div>
        </section>

        {/* Preferences section */}
        <section className="space-y-2">
          <p
            className="text-muted-foreground px-1 font-semibold tracking-wider"
            style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            Preferences
          </p>
          <div
            className="glass-card rounded-xl overflow-hidden divide-y divide-border/40"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.25)' }}
          >
            {[
              {
                icon: darkMode ? <Moon size={16} className="text-primary" /> : <Sun size={16} className="text-warning-amber" />,
                label: 'Dark Mode',
                desc: 'Cockpit-optimized dark interface',
                toggle: <Toggle checked={darkMode} onChange={setDarkMode} />,
                disabled: false,
              },
              {
                icon: <Bell size={16} className="text-muted-foreground" />,
                label: 'Study Reminders',
                desc: 'Daily study session prompts',
                toggle: <Toggle checked={notifications} onChange={setNotifications} />,
                disabled: false,
              },
              {
                icon: <Lock size={16} className="text-muted-foreground" />,
                label: 'Auto-Save Checklists',
                desc: 'Pro feature — save automatically',
                toggle: <Toggle checked={autoSave} onChange={setAutoSave} disabled />,
                disabled: true,
              },
              {
                icon: <Zap size={16} className="text-muted-foreground" />,
                label: 'Haptic Feedback',
                desc: 'Vibration on actions',
                toggle: <Toggle checked={haptics} onChange={setHaptics} />,
                disabled: false,
              },
            ].map((row) => (
              <div
                key={row.label}
                className={`flex items-center gap-3 px-4 py-4 tap-target ${row.disabled ? 'opacity-50' : ''}`}
              >
                <div className="w-10 h-10 bg-muted/40 rounded-xl flex items-center justify-center shrink-0">
                  {row.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{row.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{row.desc}</p>
                </div>
                {row.toggle}
              </div>
            ))}
          </div>
        </section>

        {/* Support section */}
        <section className="space-y-2">
          <p
            className="text-muted-foreground px-1 font-semibold tracking-wider"
            style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            Support
          </p>
          <div
            className="glass-card rounded-xl overflow-hidden"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.25)' }}
          >
            <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/15 transition-colors duration-200 tap-target">
              <div className="w-10 h-10 bg-muted/40 rounded-xl flex items-center justify-center shrink-0">
                <HelpCircle size={16} className="text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">Help & Documentation</p>
                <p className="text-xs text-muted-foreground mt-0.5">How to use Pilot Checklist AI</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-4 space-y-1.5">
          <p className="text-xs text-muted-foreground">Pilot Checklist AI</p>
          <p className="step-number text-muted-foreground opacity-50">v1.0.0 · For study purposes only</p>
        </div>
      </div>

      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </>
  );
}