import React from 'react';

interface Props {
  total: number;
  memorized: number;
  practice: number;
  remaining: number;
}

export default function StudyStats({ total, memorized, practice, remaining }: Props) {
  const stats = [
    { key: 'stat-total', label: 'Total', value: total, color: 'text-foreground' },
    { key: 'stat-remaining', label: 'Remaining', value: remaining, color: 'text-primary' },
    { key: 'stat-memorized', label: 'Memorized', value: memorized, color: 'text-success' },
    { key: 'stat-practice', label: 'Practice', value: practice, color: 'text-warning-amber' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {stats.map((stat) => (
        <div key={stat.key} className="glass-card rounded-xl p-3 text-center">
          <p className={`text-xl font-bold font-mono-data ${stat.color}`}>{stat.value}</p>
          <p className="text-section-label text-muted-foreground mt-0.5" style={{ fontSize: '0.58rem' }}>
            {stat.label.toUpperCase()}
          </p>
        </div>
      ))}
    </div>
  );
}