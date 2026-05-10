'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Cpu, Sparkles, AlertTriangle, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import { ChecklistSkeleton } from '@/components/ui/LoadingSkeleton';
import UpgradeModal from '@/components/ui/UpgradeModal';
import ChecklistOutput from './ChecklistOutput';
import type { GeneratedChecklist } from '@/types/checklist';

const MAX_FREE_GENERATIONS = 5;

// BACKEND: Replace with real usage tracking from API/localStorage sync
function getUsageCount(): number {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem('pilot-ai-usage-count');
  const date = localStorage.getItem('pilot-ai-usage-date');
  const today = new Date().toISOString().split('T')[0];
  if (date !== today) return 0;
  return stored ? parseInt(stored, 10) : 0;
}

function incrementUsage(): number {
  const today = new Date().toISOString().split('T')[0];
  const current = getUsageCount();
  const next = current + 1;
  localStorage.setItem('pilot-ai-usage-count', String(next));
  localStorage.setItem('pilot-ai-usage-date', today);
  return next;
}

export default function ProcedureInput() {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [checklist, setChecklist] = useState<GeneratedChecklist | null>(null);
  const [usageCount, setUsageCount] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    setUsageCount(getUsageCount());
  }, []);

  const remaining = MAX_FREE_GENERATIONS - usageCount;
  const isLimitReached = remaining <= 0;

  const handleGenerate = useCallback(async () => {
    if (!text.trim()) return;
    if (isLimitReached) {
      setShowUpgrade(true);
      return;
    }

    setIsGenerating(true);
    setError(null);
    setChecklist(null);

    // BACKEND: Replace this mock delay with real AI API call (OpenAI / Claude / custom endpoint)
    // POST /api/parse-procedure { text } → GeneratedChecklist
    await new Promise((r) => setTimeout(r, 2200));

    // BACKEND: This mock parser simulates what the AI should return
    const parsed = mockParseChecklist(text);
    const newCount = incrementUsage();
    setUsageCount(newCount);
    setChecklist(parsed);
    setIsGenerating(false);
  }, [text, isLimitReached]);

  const charCount = text.length;
  const isTextValid = text.trim().length > 30;

  return (
    <>
      <div className="space-y-4">
        {/* Usage counter */}
        {isMounted && (
          <div className="flex items-center justify-between px-0.5">
            <span
              className="text-muted-foreground font-semibold tracking-wider"
              style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Free Generations
            </span>
            <div className="flex items-center gap-2">
              {isLimitReached ? (
                <Badge variant="warning" pulse>
                  <Lock size={9} />
                  LIMIT REACHED
                </Badge>
              ) : (
                <Badge variant={remaining <= 2 ? 'caution' : 'primary'}>
                  {remaining}/{MAX_FREE_GENERATIONS} remaining today
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Usage bar */}
        {isMounted && (
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(usageCount / MAX_FREE_GENERATIONS) * 100}%` }}
            />
          </div>
        )}

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste an aviation procedure, POH section, or AOM text here to generate your checklist…"
            className="input-cockpit resize-none leading-relaxed font-mono hide-scrollbar"
            style={{
              fontSize: '0.8125rem',
              lineHeight: '1.7',
              minHeight: '160px',
              maxHeight: '320px',
              height: 'auto',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
            rows={7}
            aria-label="Aviation procedure text input"
            disabled={isGenerating}
          />
          {charCount > 0 && (
            <span className="absolute bottom-3 right-3 step-number text-muted-foreground opacity-50">
              {charCount.toLocaleString()} chars
            </span>
          )}
        </div>

        {/* Empty state hint */}
        <AnimatePresence>
          {charCount === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-card rounded-xl p-4 flex items-start gap-3"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,82,204,0.08)' }}
            >
              <div
                className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shrink-0"
                style={{ boxShadow: '0 0 12px rgba(0,82,204,0.3)' }}
              >
                <Cpu size={15} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1 leading-snug">
                  Paste a flight procedure to generate your first checklist.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Works with POH sections, AOM procedures, FCOM checklists, or any aviation manual
                  text. The AI will extract steps, phases, and critical warnings automatically.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generate button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleGenerate}
          disabled={!isTextValid || isGenerating}
          className="btn-primary w-full flex items-center justify-center gap-2.5 text-sm"
          style={{ minHeight: '52px' }}
        >
          {isGenerating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <Cpu size={16} />
              </motion.div>
              Parsing procedure…
            </>
          ) : isLimitReached ? (
            <>
              <Lock size={16} />
              Upgrade to Generate More
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Generate Checklist
            </>
          )}
        </motion.button>

        {/* Error state */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-warning-red/10 border border-warning-red/30 rounded-xl p-3.5 flex items-center gap-2.5"
            >
              <AlertTriangle size={14} className="text-warning-red shrink-0" />
              <p className="text-xs text-warning-red">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading skeleton */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChecklistSkeleton />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checklist output */}
        <AnimatePresence>
          {checklist && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <ChecklistOutput checklist={checklist} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </>
  );
}

// BACKEND: This function simulates AI parsing — replace entirely with real API response
function mockParseChecklist(text: string): GeneratedChecklist {
  const title = text.slice(0, 60).trim().replace(/\n/g, ' ') + (text.length > 60 ? '…' : '');

  return {
    id: `checklist-${Date.now()}`,
    title: `Parsed Checklist: ${title}`,
    generatedAt: new Date().toISOString(),
    sourceText: text,
    sections: [
      {
        id: 'section-pre-check',
        phase: 'PRE-CHECK',
        label: 'Initial Assessment',
        items: [
          {
            id: 'item-pc-001',
            step: 1,
            text: 'Review the pasted procedure for completeness and accuracy before proceeding.',
            isWarning: false,
            severity: null,
          },
          {
            id: 'item-pc-002',
            step: 2,
            text: 'Confirm all required equipment and documentation are available and current.',
            isWarning: false,
            severity: null,
          },
          {
            id: 'item-pc-003',
            step: 3,
            text: 'Check weather conditions and NOTAMs relevant to the planned operation.',
            isWarning: false,
            severity: null,
          },
        ],
      },
      {
        id: 'section-execution',
        phase: 'EXECUTION',
        label: 'Procedure Steps',
        items: [
          {
            id: 'item-ex-001',
            step: 4,
            text: 'Follow each step in sequence as outlined in the source procedure.',
            isWarning: false,
            severity: null,
          },
          {
            id: 'item-ex-002',
            step: 5,
            text: 'Do not skip or reorder steps without authorization from the appropriate authority.',
            isWarning: true,
            severity: 'WARNING',
          },
          {
            id: 'item-ex-003',
            step: 6,
            text: 'Verify each action is complete before advancing to the next step.',
            isWarning: false,
            severity: null,
          },
        ],
      },
      {
        id: 'section-critical',
        phase: 'CRITICAL',
        label: 'Safety Items',
        items: [
          {
            id: 'item-cr-001',
            step: 7,
            text: 'In case of abnormal indication, immediately refer to the QRH or emergency checklist.',
            isWarning: true,
            severity: 'EMERGENCY',
          },
          {
            id: 'item-cr-002',
            step: 8,
            text: 'Maintain situational awareness throughout the procedure.',
            isWarning: true,
            severity: 'CAUTION',
          },
        ],
      },
    ],
    stepCount: 8,
    warningCount: 3,
  };
}