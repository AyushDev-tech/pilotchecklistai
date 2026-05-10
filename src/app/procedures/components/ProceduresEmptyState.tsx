import React from 'react';
import Link from 'next/link';
import { FileText, Lock, ArrowRight, Sparkles } from 'lucide-react';
import Badge from '@/components/ui/Badge';

export default function ProceduresEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center space-y-5">
      <div className="relative">
        <div className="w-20 h-20 bg-muted/40 border border-border rounded-3xl flex items-center justify-center">
          <FileText size={32} className="text-muted-foreground" />
        </div>
        <div className="absolute -top-2 -right-2">
          <Badge variant="pro">
            <Lock size={8} />
            PRO
          </Badge>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold text-foreground mb-2">No saved procedures yet</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
          Save and manage your generated checklists with a Pro subscription. Free users can generate checklists but cannot save them.
        </p>
      </div>
      <div className="w-full max-w-xs bg-primary/8 border border-primary/20 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-primary" />
          <span className="text-xs font-semibold text-primary">Pro Feature</span>
        </div>
        <ul className="space-y-1.5 text-left">
          {[
            'Save unlimited procedures',
            'Organize by aircraft type',
            'Export as PDF',
            'Sync across devices',
          ]?.map((f) => (
            <li key={`proc-feat-${f?.slice(0, 15)?.replace(/\s/g, '-')}`} className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <button className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-xs">
          <Sparkles size={13} />
          Upgrade to Pro — ₹99/month
        </button>
      </div>
      <Link
        href="/"
        className="btn-ghost inline-flex items-center gap-2 text-sm"
      >
        Generate a checklist first
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}