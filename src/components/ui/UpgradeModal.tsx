'use client';

import React from 'react';
import { Zap, Check } from 'lucide-react';
import Modal from './Modal';
import { motion } from 'framer-motion';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FREE_FEATURES = [
  '5 checklist generations per day',
  'Basic study mode',
  'Limited exports',
];

const PRO_FEATURES = [
  'Unlimited checklist generations',
  'Unlimited study mode sessions',
  'Save & manage procedures',
  'Premium PDF exports',
  'Advanced AI analysis',
  'Priority support',
];

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="space-y-5">
        {/* Header */}
        <div className="text-center">
          <div
            className="inline-flex items-center justify-center w-14 h-14 gradient-primary rounded-2xl mb-4"
            style={{ boxShadow: '0 0 24px rgba(0,82,204,0.45), 0 4px 12px rgba(0,0,0,0.3)' }}
          >
            <Zap size={24} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-1.5">
            Upgrade to Pro
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You&apos;ve reached your free generation limit for today.
          </p>
        </div>

        {/* Pricing card */}
        <div
          className="relative gradient-primary rounded-2xl p-5 overflow-hidden"
          style={{ boxShadow: '0 4px 20px rgba(0,82,204,0.35), 0 0 0 1px rgba(0,82,204,0.4)' }}
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/3 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="text-white/70 font-semibold tracking-wider"
                style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                Student Pro Plan
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="text-3xl font-bold text-white">₹99</span>
              <span className="text-white/65 text-sm">/month</span>
            </div>
            <p className="text-white/75 text-xs leading-relaxed">
              Affordable pricing for student pilots. Cancel anytime.
            </p>
          </div>
        </div>

        {/* Feature comparison */}
        <div className="grid grid-cols-2 gap-3">
          {/* Free */}
          <div
            className="bg-muted/30 rounded-xl p-3.5 border border-border/60"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
          >
            <p
              className="text-muted-foreground mb-3 font-semibold tracking-wider"
              style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Free
            </p>
            <ul className="space-y-2">
              {FREE_FEATURES.map((f) => (
                <li
                  key={`free-feat-${f.slice(0, 20).replace(/\s/g, '-')}`}
                  className="flex items-start gap-1.5 text-xs text-muted-foreground"
                >
                  <Check size={11} className="mt-0.5 shrink-0 text-muted-foreground" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          {/* Pro */}
          <div
            className="rounded-xl p-3.5 border border-primary/30"
            style={{
              background: 'rgba(0,82,204,0.08)',
              boxShadow: '0 1px 8px rgba(0,82,204,0.1), 0 0 0 1px rgba(0,82,204,0.15)',
            }}
          >
            <p
              className="text-primary mb-3 font-semibold tracking-wider"
              style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Pro
            </p>
            <ul className="space-y-2">
              {PRO_FEATURES.map((f) => (
                <li
                  key={`pro-feat-${f.slice(0, 20).replace(/\s/g, '-')}`}
                  className="flex items-start gap-1.5 text-xs text-foreground"
                >
                  <Check size={11} className="mt-0.5 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
          style={{ minHeight: '52px' }}
          onClick={() => {
            /* BACKEND: Integrate payment gateway (Razorpay/Stripe) here */
            onClose();
          }}
        >
          <Zap size={16} />
          Upgrade to Pro — ₹99/month
        </motion.button>

        <p className="text-center text-xs text-muted-foreground">
          Secure payment · Cancel anytime · Student pricing
        </p>
      </div>
    </Modal>
  );
}