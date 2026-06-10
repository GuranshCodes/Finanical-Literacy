import React from 'react';

const TICKER_ITEMS = [
  'Gross Income: $157,184/YR',
  'FINAL_SAVINGS: $49,896.64/YR',
  'TOTAL_EXPENSES: $76,497.33/YR',
  'TAXES: $30,790.03/YR',
  'RRSP: $28,284.48/YR',
  'STUDENT_LOAN: $80,000 @ 5.45%',
  'SAVINGS_RATE: 31.7%',
  'EMPLOYER: NVIDIA',
  'NET_MONTHLY: $4,018.30',
];

export default function MetadataTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="border-y border-foreground/30 bg-foreground/60 text-background/90 overflow-hidden py-2">
      <div className="ticker-animate flex whitespace-nowrap gap-8 relative">
        {items.map((item, i) => (
          <span
            key={i}
            className="text-[11px] font-mono tracking-wider flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 bg-accent inline-block" />
            <span className="opacity-90">{item}</span>
          </span>
        ))}

        {/* gradient mask to fade edges */}
        <div className="pointer-events-none absolute inset-0" />
      </div>
    </div>
  );
}
