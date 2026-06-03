import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';

// Company logo URLs
const LOGOS = {
  NVIDIA: 'https://www.nvidia.com/favicon.ico',
  APPLE: 'https://www.apple.com/favicon.ico',
  ROGERS: 'https://www.rogers.com/favicon.ico',
  PRESTO: 'https://www.prestocard.ca/favicon.ico',
  EXPEDIA: 'https://www.expedia.ca/favicon.ico',
  CIBC: 'https://www.cibc.com/favicon.ico',
};

const FLOWS = [
  { id: 1, desc: 'Nvidia SWE Salary', logo: LOGOS.NVIDIA, from: 'NVIDIA', to: 'BANK', monthly: '+$13,098.66', yearly: '+$157,184.00', type: 'in', category: 'INCOME', note: 'Base salary low end · Levels.fyi' },
  { id: 2, desc: 'Investments', logo: null, from: 'BANK', to: 'PORTFOLIO', monthly: '-$500.00', yearly: '-$6,000.00', type: 'out', category: 'INVESTMENTS', note: 'Invested in AI / side business' },
  { id: 3, desc: 'Return on Investments', logo: null, from: 'PORTFOLIO', to: 'BANK', monthly: '+$4.00', yearly: '+$48.00', type: 'in', category: 'ROI', note: 'Only 0.8% of original investment' },
  { id: 4, desc: 'RRSP Contribution', logo: LOGOS.CIBC, from: 'BANK', to: 'RRSP', monthly: '-$2,357.04', yearly: '-$28,284.48', type: 'out', category: 'RETIREMENT', note: '18% of income' },
  { id: 5, desc: 'Student Loan Payment', logo: null, from: 'BANK', to: 'LOAN', monthly: '-$1,526.25', yearly: '-$18,314.97', type: 'out', category: 'EDUCATION', note: '$80,000 total · 5.45% · 5yr' },
  { id: 6, desc: 'Apartment Rent', logo: null, from: 'BANK', to: 'LANDLORD', monthly: '-$825.00', yearly: '-$9,900.00', type: 'out', category: 'HOUSING', note: 'Split with 4 roommates' },
  { id: 7, desc: 'Health Insurance', logo: null, from: 'BANK', to: 'POLICY_ME', monthly: '-$150.00', yearly: '-$1,800.00', type: 'out', category: 'HEALTH', note: 'Policy Me' },
  { id: 8, desc: 'Groceries', logo: null, from: 'BANK', to: 'STORES', monthly: '-$425.00', yearly: '-$5,100.00', type: 'out', category: 'GROCERIES', note: 'Remitbee' },
  { id: 9, desc: 'Rogers Internet', logo: LOGOS.ROGERS, from: 'BANK', to: 'ROGERS', monthly: '-$95.00', yearly: '-$1,140.00', type: 'out', category: 'INTERNET', note: 'Rogers' },
];

export default function FlowLedger() {
  // FIX: must NOT be typed as null-only
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section id="flow" className="border-t-2 border-foreground">

      {/* HEADER */}
      <div className="p-6 md:p-12 border-b-2 border-foreground">
        <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">
          SALARY
        </p>
        <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-[-0.05em] leading-[0.9]">
          FLOW
        </h2>
      </div>

      {/* TABLE HEADER */}
      <div className="hidden md:grid grid-cols-12 border-b-2 border-foreground bg-foreground text-background px-6 py-3">
        <div className="col-span-3 text-[10px] font-mono">DESCRIPTION</div>
        <div className="col-span-2 text-[10px] font-mono">FLOW</div>
        <div className="col-span-2 text-[10px] font-mono">CATEGORY</div>
        <div className="col-span-2 text-[10px] font-mono text-right">MONTHLY</div>
        <div className="col-span-2 text-[10px] font-mono text-right">YEARLY</div>
        <div className="col-span-1"></div>
      </div>

      {/* ROWS */}
      {FLOWS.map((tx) => (
        <div key={tx.id} className="border-b-2 border-foreground">

          <div
            className="grid grid-cols-12 px-6 py-4 cursor-pointer hover:bg-muted items-center"
            onClick={() =>
              setExpandedId((prev) => (prev === tx.id ? null : tx.id))
            }
          >
            {/* DESCRIPTION */}
            <div className="col-span-3 flex items-center gap-2">
              {tx.logo ? (
                <img src={tx.logo} className="w-4 h-4" />
              ) : (
                <div className="w-4 h-4 border border-muted-foreground/40" />
              )}
              <span className="text-sm font-mono font-bold">{tx.desc}</span>
            </div>

            {/* FLOW */}
            <div className="col-span-2 flex items-center gap-1 text-[11px] font-mono">
              <span className="truncate">{tx.from}</span>
              {tx.type === 'in' ? (
                <ArrowRight size={12} className="text-accent" />
              ) : (
                <ArrowLeft size={12} className="text-destructive" />
              )}
              <span className="truncate">{tx.to}</span>
            </div>

            {/* CATEGORY */}
            <div className="col-span-2 text-[10px] font-mono px-2 py-1 border border-foreground w-fit">
              {tx.category}
            </div>

            {/* MONTHLY */}
            <div className="col-span-2 text-right font-mono text-sm">
              {tx.monthly}
            </div>

            {/* YEARLY */}
            <div className="col-span-2 text-right font-mono font-bold text-sm">
              {tx.yearly}
            </div>

            {/* CHEVRON */}
            <div className="col-span-1 flex justify-end">
              <ChevronDown
                className={`transition-transform ${
                  expandedId === tx.id ? 'rotate-180' : ''
                }`}
                size={14}
              />
            </div>
          </div>

          {/* DROPDOWN */}
          <AnimatePresence>
            {expandedId === tx.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden px-6 py-4 bg-muted"
              >
                <p className="text-sm font-mono text-muted-foreground">
                  {tx.note}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      ))}
    </section>
  );
}