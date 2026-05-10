'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, RotateCcw, ChevronRight, Trophy, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { FlashcardSkeleton } from '@/components/ui/LoadingSkeleton';
import StudyEmptyState from './StudyEmptyState';
import FlashCard from './FlashCard';
import StudyStats from './StudyStats';
import type { StudySession, FlashCard as FlashCardType } from '@/types/checklist';

// BACKEND: Replace with real session data from API or localStorage
function buildMockSession(): StudySession | null {
  // Returns null to show empty state (no checklist generated yet)
  // In production, this reads from localStorage or API
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('pilot-ai-last-checklist');
  if (!stored) return null;

  try {
    const checklist = JSON.parse(stored);
    const cards: FlashCardType[] = [];
    checklist.sections.forEach((section: { phase: string; label: string; items: { id: string; step: number; text: string; severity: string | null }[] }) => {
      section.items.forEach((item) => {
        cards.push({
          id: `card-${item.id}`,
          sectionPhase: section.phase,
          sectionLabel: section.label,
          stepNumber: item.step,
          text: item.text,
          severity: item.severity,
          status: 'unseen',
        });
      });
    });

    return {
      checklistId: checklist.id,
      checklistTitle: checklist.title,
      cards,
      currentIndex: 0,
      memorizedCount: 0,
      practiceCount: 0,
    };
  } catch {
    return null;
  }
}

export default function StudyModeClient() {
  const [session, setSession] = useState<StudySession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate brief load
    const t = setTimeout(() => {
      const s = buildMockSession();
      setSession(s);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const currentCard = session?.cards[session.currentIndex] ?? null;
  const totalCards = session?.cards.length ?? 0;
  const currentIndex = session?.currentIndex ?? 0;
  const memorizedCount = session?.memorizedCount ?? 0;
  const practiceCount = session?.practiceCount ?? 0;
  const completionPct = totalCards > 0 ? Math.round((currentIndex / totalCards) * 100) : 0;

  const handleAction = useCallback(
    (action: 'memorized' | 'practice') => {
      if (!session || !currentCard) return;

      setDirection('forward');

      const updatedCards = session.cards.map((c) =>
        c.id === currentCard.id ? { ...c, status: action } : c
      );

      const nextIndex = currentIndex + 1;
      const isLast = nextIndex >= totalCards;

      setSession({
        ...session,
        cards: updatedCards,
        currentIndex: isLast ? currentIndex : nextIndex,
        memorizedCount: action === 'memorized' ? memorizedCount + 1 : memorizedCount,
        practiceCount: action === 'practice' ? practiceCount + 1 : practiceCount,
      });

      setIsFlipped(false);

      if (isLast) {
        setIsComplete(true);
      }
    },
    [session, currentCard, currentIndex, totalCards, memorizedCount, practiceCount]
  );

  const handleRestart = useCallback(() => {
    if (!session) return;
    setSession({
      ...session,
      cards: session.cards.map((c) => ({ ...c, status: 'unseen' })),
      currentIndex: 0,
      memorizedCount: 0,
      practiceCount: 0,
    });
    setIsComplete(false);
    setIsFlipped(false);
  }, [session]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 mb-6">
          <BookOpen size={20} className="text-primary" />
          <h1 className="text-lg font-bold text-foreground">Study Mode</h1>
        </div>
        <FlashcardSkeleton />
      </div>
    );
  }

  if (!session) {
    return <StudyEmptyState />;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BookOpen size={20} className="text-primary" />
          <h1 className="text-lg font-bold text-foreground">Study Mode</h1>
        </div>
        <button
          onClick={handleRestart}
          className="btn-ghost flex items-center gap-1.5 text-xs py-2 px-3"
        >
          <RotateCcw size={13} />
          Restart
        </button>
      </div>

      {/* Checklist title */}
      <div
        className="glass-card rounded-xl px-3.5 py-2.5 flex items-center gap-2"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
      >
        <Layers size={13} className="text-primary shrink-0" />
        <p className="text-xs text-muted-foreground truncate">{session.checklistTitle}</p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span
            className="text-muted-foreground font-semibold tracking-wider"
            style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            Progress
          </span>
          <span className="step-number text-foreground">
            {currentIndex}/{totalCards} · {completionPct}%
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${completionPct}%` }} />
        </div>
      </div>

      {/* Stats row */}
      <StudyStats
        total={totalCards}
        memorized={memorizedCount}
        practice={practiceCount}
        remaining={totalCards - currentIndex}
      />

      {/* Completion state */}
      <AnimatePresence mode="wait">
        {isComplete ? (
          <CompletionScreen
            memorized={memorizedCount}
            practice={practiceCount}
            total={totalCards}
            onRestart={handleRestart}
          />
        ) : (
          currentCard && (
            <motion.div
              key={`card-${currentCard.id}`}
              initial={{ opacity: 0, x: direction === 'forward' ? 40 : -40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction === 'forward' ? -40 : 40, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-4"
            >
              <FlashCard
                card={currentCard}
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped((f) => !f)}
                cardIndex={currentIndex}
                totalCards={totalCards}
              />

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAction('practice')}
                  disabled={!isFlipped}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-warning-amber/30 font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-warning-amber/12 active:scale-95 tap-target"
                  style={{
                    background: 'rgba(255,143,0,0.07)',
                    color: '#FF8F00',
                    padding: '14px 12px',
                    boxShadow: '0 2px 8px rgba(255,143,0,0.08)',
                  }}
                >
                  <RotateCcw size={18} />
                  <span>Need Practice</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAction('memorized')}
                  disabled={!isFlipped}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-success/30 font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-success/12 active:scale-95 tap-target"
                  style={{
                    background: 'rgba(0,196,140,0.07)',
                    color: '#00C48C',
                    padding: '14px 12px',
                    boxShadow: '0 2px 8px rgba(0,196,140,0.08)',
                  }}
                >
                  <ChevronRight size={18} />
                  <span>Memorized</span>
                </motion.button>
              </div>

              {!isFlipped && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-xs text-muted-foreground"
                >
                  Tap the card to reveal the full step
                </motion.p>
              )}
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

interface CompletionScreenProps {
  memorized: number;
  practice: number;
  total: number;
  onRestart: () => void;
}

function CompletionScreen({ memorized, practice, total, onRestart }: CompletionScreenProps) {
  const pct = total > 0 ? Math.round((memorized / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="space-y-5"
    >
      <div
        className="glass-card rounded-2xl p-6 text-center"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,82,204,0.12), 0 0 24px rgba(0,82,204,0.06)' }}
      >
        <div
          className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ boxShadow: '0 0 20px rgba(0,82,204,0.4)' }}
        >
          <Trophy size={24} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">Session Complete!</h2>
        <p className="text-sm text-muted-foreground mb-5">
          You reviewed all {total} cards in this session.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Memorized', value: memorized, color: 'text-success' },
            { label: 'Practice', value: practice, color: 'text-warning-amber' },
            { label: 'Score', value: `${pct}%`, color: 'text-primary' },
          ].map((stat) => (
            <div key={stat.label} className="bg-muted/40 rounded-xl p-3">
              <p className={`text-xl font-bold font-mono-data ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <button onClick={onRestart} className="btn-primary w-full flex items-center justify-center gap-2 text-sm">
          <RotateCcw size={15} />
          Study Again
        </button>
      </div>
    </motion.div>
  );
}