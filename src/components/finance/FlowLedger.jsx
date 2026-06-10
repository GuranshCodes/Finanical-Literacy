import React, { useState } from 'react';

// Keep state untyped to avoid TS inference issues

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';

const FLOWS = [
  {
    id: 1,
    desc: 'Investments',
    from: 'BANK',
    to: 'PORTFOLIO',
    monthly: '-$500.00',
    yearly: '-$6,000.00',
    type: 'out',
    category: 'INVESTMENTS',
    note: 'Claude, ChatGPT, S&P 500 etc.',
  },
  {
    id: 2,
    desc: 'Return on Investments',
    from: 'PORTFOLIO',
    to: 'BANK',
    monthly: '+$4.00',
    yearly: '+$48.00',
    type: 'in',
    category: 'ROI',
    note: 'Only 0.8% of original investment.',
  },
  {
    id: 3,
    desc: 'Total Salary Left',
    from: 'EMPLOYER',
    to: 'BANK',
    monthly: '+$4,018.30',
    yearly: '+$49,896.64',
    type: 'in',
    category: 'SALARY',
    note: 'After taxes and expenses.',
  },
  {
    id: 4,
    desc: 'Savings Account',
    from: 'BANK',
    to: 'SAVINGS',
    monthly: '+$2,009.15',
    yearly: '+$24,477.00',
    type: 'in',
    category: 'SAVINGS',
    note: '50% of remaining salary invested monthly.',
  },
  {
    id: 5,
    desc: 'Chequing Account',
    from: 'BANK',
    to: 'CHEQUING',
    monthly: '+$2,009.15',
    yearly: '+$24,948.62',
    type: 'in',
    category: 'CHEQUING',
    note: 'Remaining 50% for liquidity.',
  },
  {
    id: 6,
    desc: 'Savings Growth Projection',
    from: 'SAVINGS',
    to: 'SAVINGS',
    monthly: '+$24,422.91',
    yearly: '+$24,477.00',
    type: 'in',
    category: 'SAVINGS_GROWTH',
    note: 'Compounded at 2.85% annual interest.',
  },
  {
    id: 7,
    desc: 'Total Profit (1 Year)',
    from: 'BANK',
    to: 'BANK',
    monthly: '+$26.09',
    yearly: '+$313.11',
    type: 'in',
    category: 'PROFIT',
    note: 'Interest earned from savings account.',
  },
];

export default function FlowLedger() {
  const [expandedId, setExpandedId] = useState(/** @type {number|null} */ (null));


  return (
    <section id="flow" className="border-t border-foreground/30 pt-10">
      <div className="px-6 md:px-12 pb-6">
        <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">
          CASHFLOW
        </p>
        <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-[-0.05em] leading-[0.9]">
          SALARY FLOW
        </h2>
      </div>

      <div className="hidden md:block px-6 md:px-12">
        <div className="grid grid-cols-12 border-b border-foreground/30 bg-foreground/20 text-background px-6 py-3 rounded-t-2xl">
          <div className="col-span-3 text-[10px] font-mono">DESCRIPTION</div>
          <div className="col-span-2 text-[10px] font-mono">FLOW</div>
          <div className="col-span-2 text-[10px] font-mono">CATEGORY</div>
          <div className="col-span-2 text-[10px] font-mono text-right">MONTHLY</div>
          <div className="col-span-2 text-[10px] font-mono text-right">YEARLY</div>
          <div className="col-span-1"></div>
        </div>
      </div>

      <div className="px-6 md:px-12">
        {FLOWS.map((tx) => (
          <div
            key={tx.id}
            className="border-b border-foreground/20"
          >
            <div
              className="grid grid-cols-1 md:grid-cols-12 px-2 md:px-6 py-4 cursor-pointer hover:bg-muted/30 items-center gap-y-1"
              // @ts-ignore
              onClick={() =>
                setExpandedId((prevId) => (prevId === tx.id ? null : tx.id))

              }
            >
            <div className="md:col-span-3 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md border border-foreground/25 bg-background/20">
                  {tx.type === 'in' ? '↗' : '↘'}
                </span>
                <span className="text-sm font-mono font-bold">{tx.desc}</span>
              </div>

              <div className="md:col-span-2 flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                <span>{tx.from}</span>
                {tx.type === 'in' ? (
                  <ArrowRight size={11} className="text-accent" />
                ) : (
                  <ArrowLeft size={11} className="text-destructive" />
                )}
                <span>{tx.to}</span>
              </div>

              <div className="md:col-span-2">
                <span className="text-[10px] font-mono px-2 py-1 border border-foreground/25 rounded-full">
                  {tx.category}
                </span>
              </div>

              <div
                className={`md:col-span-2 text-right font-mono ${
                  tx.type === 'in' ? 'text-accent' : 'text-destructive'
                }`}
              >
                {tx.monthly}
              </div>

              <div
                className={`md:col-span-2 text-right font-mono font-bold ${
                  tx.type === 'in' ? 'text-accent' : 'text-destructive'
                }`}
              >
                {tx.yearly}
              </div>

              <div className="md:col-span-1 flex justify-end">
                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    expandedId === tx.id ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>

            <AnimatePresence>
              {expandedId === tx.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-2 md:px-6 py-5 bg-background/40 backdrop-blur rounded-b-2xl border-t border-foreground/20">
                    {tx.category === 'SAVINGS' && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="border border-foreground/20 rounded-xl p-3 bg-background/30">
                          <p className="text-[10px] font-mono">Monthly Deposit</p>
                          <p className="font-mono font-bold">$2,009.15</p>
                        </div>
                        <div className="border border-foreground/20 rounded-xl p-3 bg-background/30">
                          <p className="text-[10px] font-mono">Annual Deposit</p>
                          <p className="font-mono font-bold">$24,477.00</p>
                        </div>
                        <div className="border border-foreground/20 rounded-xl p-3 bg-background/30">
                          <p className="text-[10px] font-mono">Rate</p>
                          <p className="font-mono font-bold">2.85%</p>
                        </div>
                        <div className="border border-foreground/20 rounded-xl p-3 bg-background/30">
                          <p className="text-[10px] font-mono">Monthly Rate</p>
                          <p className="font-mono font-bold">0.23445%</p>
                        </div>
                      </div>
                    )}

                    {tx.category === 'SAVINGS_GROWTH' && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div
                            key={i}
                            className="border border-foreground/20 rounded-xl p-2 bg-background/30"
                          >
                            <p className="text-[10px] font-mono">Month {i + 1}</p>
                            <p className="font-mono font-bold">
                              $
                              {(
                                2009.15 *
                                Math.pow(1.0023445, i + 1)
                              ).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {tx.category === 'PROFIT' && (
                      <div className="flex flex-col gap-2">
                        <p className="text-[10px] font-mono">Year Summary</p>
                        <p className="font-mono">Principal: $24,477.00</p>
                        <p className="font-mono">Interest: $313.11</p>
                        <p className="font-mono">Return: ~1.28%</p>
                      </div>
                    )}

                    {!['SAVINGS', 'SAVINGS_GROWTH', 'PROFIT'].includes(
                      tx.category
                    ) && (
                      <>
                        <p className="text-[10px] font-mono mb-1">NOTE</p>
                        <p className="font-mono text-sm">{tx.note}</p>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
