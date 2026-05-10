import React from 'react';

type BadgeVariant = 'primary' | 'muted' | 'warning' | 'caution' | 'emergency' | 'success' | 'pro';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  primary: 'bg-primary/15 text-primary border border-primary/30',
  muted: 'bg-muted text-muted-foreground border border-border',
  warning: 'bg-warning-red/15 text-warning-red border border-warning-red/30',
  caution: 'bg-warning-amber/15 text-warning-amber border border-warning-amber/30',
  emergency: 'bg-warning-emergency/20 text-warning-red border border-warning-red/50',
  success: 'bg-success/15 text-success border border-success/30',
  pro: 'gradient-primary text-white border-0',
};

export default function Badge({
  variant = 'muted',
  children,
  className = '',
  pulse = false,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-section-label font-semibold ${VARIANT_CLASSES[variant]} ${pulse ? 'emergency-pulse' : ''} ${className}`}
    >
      {children}
    </span>
  );
}