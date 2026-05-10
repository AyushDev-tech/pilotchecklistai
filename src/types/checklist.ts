export type WarningSeverity = 'CAUTION' | 'WARNING' | 'EMERGENCY';

export interface ChecklistItem {
  id: string;
  step: number;
  text: string;
  isWarning: boolean;
  severity: WarningSeverity | null;
}

export interface ChecklistSection {
  id: string;
  phase: string;
  label: string;
  items: ChecklistItem[];
}

export interface GeneratedChecklist {
  id: string;
  title: string;
  generatedAt: string;
  sourceText: string;
  sections: ChecklistSection[];
  warningCount: number;
  stepCount: number;
}

export interface FlashCard {
  id: string;
  sectionPhase: string;
  sectionLabel: string;
  stepNumber: number;
  text: string;
  severity: WarningSeverity | null;
  status: 'unseen' | 'memorized' | 'practice';
}

export interface StudySession {
  checklistId: string;
  checklistTitle: string;
  cards: FlashCard[];
  currentIndex: number;
  memorizedCount: number;
  practiceCount: number;
}