'use client';

import React, { useState } from 'react';
import { Zap, Check, X, Bell, Sparkles, Shield, BookOpen, FileDown, Brain, Infinity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRO_FEATURES = [
  { icon: Infinity, label: 'Unlimited checklist generations', desc: 'No daily limits, ever' },
  { icon: BookOpen, label: 'Unlimited study mode', desc: 'Learn at your own pace' },
  { icon: Shield, label: 'Saved procedures', desc: 'Build your personal library' },
  { icon: FileDown, label: 'Premium exports', desc: 'PDF, print-ready formats' },
  { icon: Brain, label: 'Advanced AI analysis', desc: 'Deeper procedure insights' },
];

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [notified, setNotified] = useState(false);

  const handleNotifyMe = () => {
    setNotified(true);
    setTimeout(() => {
      setNotified(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #141920 0%, #0F1415 100%)',
                border: '1px solid rgba(0,82,204,0.25)',
                boxShadow: '0 0 60px rgba(0,82,204,0.2), 0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
                maxHeight: '92vh',
                overflowY: 'auto',
              }}
            >
              {/* Ambient glow top */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(0,82,204,0.18) 0%, transparent 70%)' }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.9)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)'; }}
              >
                <X size={14} />
              </button>

              <div className="p-6 space-y-5">
                {/* Header */}
                <div className="text-center pt-2">
                  {/* Logo mark */}
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 relative"
                    style={{
                      background: 'linear-gradient(135deg, #0052CC 0%, #0066FF 100%)',
                      boxShadow: '0 0 32px rgba(0,82,204,0.55), 0 8px 24px rgba(0,0,0,0.4)',
                    }}
                  >
                    <Zap size={28} className="text-white" fill="white" />
                    <div
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', boxShadow: '0 2px 8px rgba(255,165,0,0.5)' }}
                    >
                      <Sparkles size={10} className="text-white" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-xl font-bold text-white tracking-tight">AeroMind</span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #0052CC, #0066FF)',
                          color: 'white',
                          boxShadow: '0 0 12px rgba(0,82,204,0.5)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        PRO
                      </span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">
                      You&apos;ve reached your free generation limit.
                    </p>
                    <p className="text-sm text-white/50">Unlock the full experience.</p>
                  </motion.div>
                </div>

                {/* Pricing card */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative rounded-2xl p-5 overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,82,204,0.25) 0%, rgba(0,102,255,0.12) 100%)',
                    border: '1px solid rgba(0,82,204,0.4)',
                    boxShadow: '0 4px 24px rgba(0,82,204,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2" style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 70%)' }} />
                  <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full translate-y-1/2 -translate-x-1/2" style={{ background: 'radial-gradient(circle, rgba(0,82,204,0.1) 0%, transparent 70%)' }} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: 'rgba(100,160,255,0.8)' }}
                      >
                        Student Pro Plan
                      </span>
                      {/* Payments Coming Soon badge */}
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          background: 'rgba(255,143,0,0.15)',
                          color: '#FF8F00',
                          border: '1px solid rgba(255,143,0,0.3)',
                        }}
                      >
                        Payments Coming Soon
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-4xl font-bold text-white tracking-tight">₹99</span>
                      <span className="text-white/50 text-sm">/month</span>
                    </div>
                    <p className="text-white/45 text-xs">Affordable pricing for student pilots · Cancel anytime</p>
                  </div>
                </motion.div>

                {/* Premium features */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-2"
                >
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/35 mb-3">
                    Everything in Pro
                  </p>
                  {PRO_FEATURES.map((feature, i) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.28 + i * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: 'rgba(0,82,204,0.2)',
                          border: '1px solid rgba(0,82,204,0.3)',
                        }}
                      >
                        <feature.icon size={14} style={{ color: '#4D94FF' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white/90 leading-tight">{feature.label}</p>
                        <p className="text-xs text-white/35 mt-0.5">{feature.desc}</p>
                      </div>
                      <Check size={14} style={{ color: '#4D94FF' }} className="shrink-0" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3 pt-1"
                >
                  <AnimatePresence mode="wait">
                    {notified ? (
                      <motion.div
                        key="notified"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold"
                        style={{
                          background: 'rgba(0,200,100,0.15)',
                          border: '1px solid rgba(0,200,100,0.3)',
                          color: '#00C864',
                        }}
                      >
                        <Check size={16} />
                        We&apos;ll notify you when payments launch!
                      </motion.div>
                    ) : (
                      <motion.button
                        key="notify"
                        whileTap={{ scale: 0.97 }}
                        onClick={handleNotifyMe}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200"
                        style={{
                          background: 'linear-gradient(135deg, #0052CC 0%, #0066FF 100%)',
                          color: 'white',
                          boxShadow: '0 0 24px rgba(0,82,204,0.45), 0 4px 16px rgba(0,0,0,0.3)',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 36px rgba(0,82,204,0.65), 0 4px 20px rgba(0,0,0,0.3)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 24px rgba(0,82,204,0.45), 0 4px 16px rgba(0,0,0,0.3)'; }}
                      >
                        <Bell size={16} />
                        Notify Me When Available
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={onClose}
                    className="w-full py-3 rounded-2xl text-sm font-medium transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.45)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)'; }}
                  >
                    Maybe Later
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}