'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import { AlertTriangle, Eye } from 'lucide-react';
import type { FlashCard as FlashCardType } from '@/types/checklist';

interface Props {
  card: FlashCardType;
  isFlipped: boolean;
  onFlip: () => void;
  cardIndex: number;
  totalCards: number;
}

export default function FlashCard({ card, isFlipped, onFlip, cardIndex, totalCards }: Props) {
  return (
    <div
      className="flashcard-surface cursor-pointer select-none"
      onClick={onFlip}
      role="button"
      aria-label={isFlipped ? 'Card revealed — tap to flip back' : 'Tap to reveal step'}
      tabIndex={0}
      onKeyDown={(e) => e.key === ' ' && onFlip()}
      style={{
        transition: 'box-shadow 0.2s ease',
      }}
    >
      {/* Card top row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="step-number text-primary">{card.sectionPhase}</span>
          <span className="text-xs text-muted-foreground opacity-50">·</span>
          <span className="text-xs text-muted-foreground">{card.sectionLabel}</span>
        </div>
        <span className="step-number text-muted-foreground">
          {cardIndex + 1}/{totalCards}
        </span>
      </div>

      {/* Step number */}
      <div className="mb-4">
        <span className="step-number text-muted-foreground">
          STEP {String(card.stepNumber).padStart(2, '0')}
        </span>
      </div>

      {/* Card content */}
      <AnimatePresence mode="wait">
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex-1 flex flex-col items-center justify-center py-8"
          >
            <div
              className="w-12 h-12 rounded-xl bg-muted/40 flex items-center justify-center mb-3"
              style={{ border: '1px solid rgba(42,48,53,0.6)' }}
            >
              <Eye size={20} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Recall this step, then tap to reveal
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1"
          >
            <p className="text-base font-medium text-foreground leading-relaxed">
              {card.text}
            </p>
            {card.severity && (
              <div className="mt-3">
                <Badge
                  variant={
                    card.severity === 'EMERGENCY' ? 'emergency'
                      : card.severity === 'WARNING' ? 'warning' : 'caution'
                  }
                  pulse={card.severity === 'EMERGENCY'}
                >
                  <AlertTriangle size={8} />
                  {card.severity}
                </Badge>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom hint */}
      <div className="mt-4 pt-3 border-t border-border/40">
        <p className="text-xs text-muted-foreground text-center">
          {isFlipped ? 'Choose an action below' : 'Tap anywhere to reveal'}
        </p>
      </div>
    </div>
  );
}