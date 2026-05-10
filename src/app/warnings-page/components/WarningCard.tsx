'use client';

import React, { useState } from 'react';
import { AlertTriangle, Zap, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import type { WarningSeverity } from '@/types/checklist';
import Icon from '@/components/ui/AppIcon';


interface ExtractedWarning {
  id: string;
  text: string;
  severity: WarningSeverity;
  sourcePhase: string;
  sourceLabel: string;
}

interface Props {
  warning: ExtractedWarning;
}

const SEVERITY_CONFIG: Record<
  WarningSeverity,
  { containerClass: string; iconColor: string; icon: React.ElementType; badge: 'warning' | 'caution' | 'emergency' }
> = {
  EMERGENCY: {
    containerClass: 'warning-card-emergency emergency-pulse',
    iconColor: 'text-warning-red',
    icon: Zap,
    badge: 'emergency',
  },
  WARNING: {
    containerClass: 'warning-card-warning',
    iconColor: 'text-warning-red',
    icon: ShieldAlert,
    badge: 'warning',
  },
  CAUTION: {
    containerClass: 'warning-card-caution',
    iconColor: 'text-warning-amber',
    icon: AlertTriangle,
    badge: 'caution',
  },
};

export default function WarningCard({ warning }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const config = SEVERITY_CONFIG[warning.severity];
  const Icon = config.icon;

  return (
    <div className={config.containerClass}>
      {/* Header row */}
      <button
        className="w-full flex items-start gap-3 text-left"
        onClick={() => setIsExpanded((e) => !e)}
        aria-expanded={isExpanded}
      >
        <div className="shrink-0 mt-0.5">
          <Icon size={16} className={config.iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Badge variant={config.badge} pulse={warning.severity === 'EMERGENCY'}>
              {warning.severity === 'EMERGENCY' && <Zap size={8} />}
              {warning.severity}
            </Badge>
            <span className="step-number text-muted-foreground">{warning.sourcePhase}</span>
            <span className="text-xs text-muted-foreground opacity-60">·</span>
            <span className="text-xs text-muted-foreground truncate">{warning.sourceLabel}</span>
          </div>
        </div>
        <div className="shrink-0 mt-0.5">
          {isExpanded ? (
            <ChevronUp size={14} className="text-muted-foreground" />
          ) : (
            <ChevronDown size={14} className="text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expandable text */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-foreground leading-relaxed pt-2 pl-7">
              {warning.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}