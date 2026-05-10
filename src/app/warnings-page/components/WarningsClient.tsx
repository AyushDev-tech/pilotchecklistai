'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { AlertTriangle, ShieldAlert, Zap, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import WarningsEmptyState from './WarningsEmptyState';
import WarningCard from './WarningCard';
import type { ChecklistItem, WarningSeverity } from '@/types/checklist';
import Icon from '@/components/ui/AppIcon';


interface ExtractedWarning {
  id: string;
  text: string;
  severity: WarningSeverity;
  sourcePhase: string;
  sourceLabel: string;
}

type FilterOption = 'ALL' | WarningSeverity;

function extractWarnings(): ExtractedWarning[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('pilot-ai-last-checklist');
  if (!stored) return [];

  try {
    const checklist = JSON.parse(stored);
    const warnings: ExtractedWarning[] = [];
    checklist.sections.forEach((section: { phase: string; label: string; items: ChecklistItem[] }) => {
      section.items.forEach((item) => {
        if (item.isWarning && item.severity) {
          warnings.push({
            id: `warn-${item.id}`,
            text: item.text,
            severity: item.severity,
            sourcePhase: section.phase,
            sourceLabel: section.label,
          });
        }
      });
    });
    return warnings;
  } catch {
    return [];
  }
}

const FILTER_OPTIONS: { key: FilterOption; label: string; icon: React.ElementType }[] = [
  { key: 'ALL', label: 'All', icon: Filter },
  { key: 'EMERGENCY', label: 'Emergency', icon: Zap },
  { key: 'WARNING', label: 'Warning', icon: ShieldAlert },
  { key: 'CAUTION', label: 'Caution', icon: AlertTriangle },
];

export default function WarningsClient() {
  const [warnings, setWarnings] = useState<ExtractedWarning[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterOption>('ALL');

  useEffect(() => {
    const t = setTimeout(() => {
      setWarnings(extractWarnings());
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === 'ALL') return warnings;
    return warnings.filter((w) => w.severity === activeFilter);
  }, [warnings, activeFilter]);

  const counts = useMemo(() => ({
    EMERGENCY: warnings.filter((w) => w.severity === 'EMERGENCY').length,
    WARNING: warnings.filter((w) => w.severity === 'WARNING').length,
    CAUTION: warnings.filter((w) => w.severity === 'CAUTION').length,
  }), [warnings]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <AlertTriangle size={20} className="text-warning-red" />
          <h1 className="text-lg font-bold text-foreground">Warnings</h1>
        </div>
        {warnings.length > 0 && (
          <Badge variant="warning">
            {warnings.length} extracted
          </Badge>
        )}
      </div>

      {/* Severity summary cards */}
      {!isLoading && warnings.length > 0 && (
        <div className="grid grid-cols-3 gap-2.5">
          <div
            className="warning-card-emergency rounded-xl p-3.5 text-center"
            style={{ boxShadow: '0 2px 12px rgba(227,19,44,0.12)' }}
          >
            <p className="text-2xl font-bold font-mono-data text-warning-red">{counts.EMERGENCY}</p>
            <p
              className="text-warning-red mt-1 font-semibold tracking-wider"
              style={{ fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Emergency
            </p>
          </div>
          <div
            className="warning-card-warning rounded-xl p-3.5 text-center"
            style={{ boxShadow: '0 2px 8px rgba(227,19,44,0.08)' }}
          >
            <p className="text-2xl font-bold font-mono-data text-warning-red">{counts.WARNING}</p>
            <p
              className="text-warning-red mt-1 font-semibold tracking-wider"
              style={{ fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Warning
            </p>
          </div>
          <div
            className="warning-card-caution rounded-xl p-3.5 text-center"
            style={{ boxShadow: '0 2px 8px rgba(255,143,0,0.08)' }}
          >
            <p className="text-2xl font-bold font-mono-data text-warning-amber">{counts.CAUTION}</p>
            <p
              className="text-warning-amber mt-1 font-semibold tracking-wider"
              style={{ fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Caution
            </p>
          </div>
        </div>
      )}

      {/* Filter chips */}
      {!isLoading && warnings.length > 0 && (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {FILTER_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isActive = activeFilter === opt.key;
            return (
              <button
                key={`filter-${opt.key}`}
                onClick={() => setActiveFilter(opt.key)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 border tap-target ${
                  isActive
                    ? opt.key === 'EMERGENCY' || opt.key === 'WARNING' ?'bg-warning-red/15 text-warning-red border-warning-red/40'
                      : opt.key === 'CAUTION' ?'bg-warning-amber/15 text-warning-amber border-warning-amber/40' :'bg-primary/15 text-primary border-primary/40' :'bg-muted/30 text-muted-foreground border-border/60 hover:border-border hover:text-foreground'
                }`}
              >
                <Icon size={12} />
                {opt.label}
                {opt.key !== 'ALL' && counts[opt.key as WarningSeverity] > 0 && (
                  <span className="ml-0.5 opacity-70">{counts[opt.key as WarningSeverity]}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={`skel-warn-${n}`} className="h-20 skeleton rounded-xl" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && warnings.length === 0 && <WarningsEmptyState />}

      {/* Warning cards */}
      {!isLoading && warnings.length > 0 && (
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="no-filter-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <p className="text-sm text-muted-foreground">
                No {activeFilter.toLowerCase()} items found in this checklist.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filtered.map((warning, idx) => (
                <motion.div
                  key={warning.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ delay: idx * 0.06, duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <WarningCard warning={warning} />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      )}

      {/* Aviation notice */}
      {!isLoading && warnings.length > 0 && (
        <div
          className="glass-card rounded-xl p-3.5 flex items-start gap-2.5 mt-2"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
        >
          <ShieldAlert size={14} className="text-warning-amber shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Always verify warnings against your official aircraft documentation. This AI-generated output is for study purposes only and should not replace approved flight manuals.
          </p>
        </div>
      )}
    </div>
  );
}