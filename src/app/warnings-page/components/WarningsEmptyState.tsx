import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, Cpu } from 'lucide-react';

export default function WarningsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-5">
      <div className="relative">
        <div className="w-20 h-20 bg-warning-red/10 border border-warning-red/20 rounded-3xl flex items-center justify-center">
          <AlertTriangle size={32} className="text-warning-red" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-foreground mb-2">No warnings extracted yet</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
          Warnings and critical items are automatically extracted when you generate a checklist from a flight procedure.
        </p>
      </div>

      <Link
        href="/"
        className="btn-primary inline-flex items-center gap-2 py-3 px-6 text-sm"
      >
        <Cpu size={15} />
        Generate a Checklist
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}