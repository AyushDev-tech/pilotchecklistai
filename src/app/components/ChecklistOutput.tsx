'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Save, Share2, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import type { GeneratedChecklist, ChecklistItem } from '@/types/checklist';
import { useRouter } from 'next/navigation';

interface Props {
  checklist: GeneratedChecklist;
}

export default function ChecklistOutput({ checklist }: Props) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(checklist.sections.map((s) => s.id))
  );
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const router = useRouter();

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalItems = checklist.sections.reduce((acc, s) => acc + s.items.length, 0);
  const completedCount = checkedItems.size;
  const completionPct = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  return (
    <div className="space-y-5">
      {/* Output header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="primary">
              <CheckCircle2 size={9} />
              CHECKLIST GENERATED
            </Badge>
          </div>
          <h2 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
            {checklist.title}
          </h2>
          <p className="step-number text-muted-foreground mt-1.5">
            {checklist.stepCount} STEPS · {checklist.warningCount} WARNINGS
          </p>
        </div>
      </div>

      {/* Completion bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span
            className="text-muted-foreground font-semibold tracking-wider"
            style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            Review Progress
          </span>
          <span className="step-number text-foreground">
            {completedCount}/{totalItems} · {completionPct}%
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${completionPct}%` }} />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {checklist.sections.map((section, sIdx) => {
          const isExpanded = expandedSections.has(section.id);
          const sectionWarnings = section.items.filter((i) => i.isWarning).length;

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sIdx * 0.09, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="section-card"
            >
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-muted/15 transition-colors duration-200 tap-target"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-2.5">
                  <span className="step-number text-primary">{section.phase}</span>
                  <span className="text-sm font-medium text-foreground">
                    {section.label}
                  </span>
                  {sectionWarnings > 0 && (
                    <Badge variant="warning">
                      <AlertTriangle size={8} />
                      {sectionWarnings}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="step-number text-muted-foreground">
                    {section.items.length}
                  </span>
                  {isExpanded ? (
                    <ChevronUp size={14} className="text-muted-foreground" />
                  ) : (
                    <ChevronDown size={14} className="text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* Section items */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border/40 divide-y divide-border/30">
                      {section.items.map((item) => (
                        <ChecklistItemRow
                          key={item.id}
                          item={item}
                          isChecked={checkedItems.has(item.id)}
                          onToggle={() => toggleItem(item.id)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={() => router.push('/study-mode')}
          className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm"
          style={{ minHeight: '48px' }}
        >
          <BookOpen size={15} />
          Study This
        </button>
        <button
          className="btn-secondary flex items-center justify-center gap-2 px-4 text-sm"
          style={{ minHeight: '48px' }}
          onClick={() => {}}
          title="Save procedure — Pro feature"
        >
          <Lock size={13} className="text-muted-foreground" />
          <Save size={14} />
        </button>
        <button
          className="btn-secondary flex items-center justify-center gap-2 px-4 text-sm"
          style={{ minHeight: '48px' }}
          onClick={() => {}}
          title="Export — Pro feature"
        >
          <Lock size={13} className="text-muted-foreground" />
          <Share2 size={14} />
        </button>
      </div>

      {/* Pro upsell hint */}
      <div
        className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-primary/15"
        style={{ background: 'rgba(0,82,204,0.05)' }}
      >
        <Lock size={12} className="text-primary shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="text-primary font-medium">Save & Export</span> are Pro features.{' '}
          <span className="text-primary font-medium">Upgrade for ₹99/month</span> to unlock unlimited access.
        </p>
      </div>
    </div>
  );
}

interface ChecklistItemRowProps {
  item: ChecklistItem;
  isChecked: boolean;
  onToggle: () => void;
}

function ChecklistItemRow({ item, isChecked, onToggle }: ChecklistItemRowProps) {
  const warningStyles: Record<string, string> = {
    WARNING: 'bg-warning-red/[0.06] border-l-2 border-warning-red',
    CAUTION: 'bg-warning-amber/[0.06] border-l-2 border-warning-amber',
    EMERGENCY: 'bg-warning-emergency/[0.08] border-l-2 border-warning-emergency emergency-pulse',
  };

  const containerClass = item.severity ? warningStyles[item.severity] ?? '' : '';

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3.5 transition-all duration-150 hover:bg-muted/15 cursor-pointer tap-target ${containerClass}`}
      onClick={onToggle}
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      onKeyDown={(e) => e.key === ' ' && onToggle()}
    >
      {/* Step number / checkbox */}
      <div className="shrink-0 mt-0.5">
        {isChecked ? (
          <div
            className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center"
            style={{ boxShadow: '0 0 8px rgba(0,82,204,0.4)' }}
          >
            <CheckCircle2 size={12} className="text-white" />
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-border/80 flex items-center justify-center">
            <span className="step-number text-muted-foreground" style={{ fontSize: '0.55rem' }}>
              {String(item.step).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm leading-relaxed ${
            isChecked ? 'text-muted-foreground line-through' : 'text-foreground'
          }`}
        >
          {item.text}
        </p>
        {item.severity && (
          <div className="mt-1.5">
            <Badge
              variant={
                item.severity === 'EMERGENCY' ? 'emergency'
                  : item.severity === 'WARNING' ? 'warning' : 'caution'
              }
              pulse={item.severity === 'EMERGENCY'}
            >
              <AlertTriangle size={8} />
              {item.severity}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}