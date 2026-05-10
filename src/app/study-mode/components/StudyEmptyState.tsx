import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Cpu } from 'lucide-react';

export default function StudyEmptyState() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen size={20} className="text-primary" />
        <h1 className="text-lg font-bold text-foreground">Study Mode</h1>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-center space-y-5">
        <div className="relative">
          <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center glow-blue">
            <BookOpen size={32} className="text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-muted rounded-xl flex items-center justify-center border border-border">
            <Cpu size={13} className="text-primary" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">No checklist to study yet</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Generate a checklist from a flight procedure first. Your study flashcards will appear here automatically.
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
    </div>
  );
}