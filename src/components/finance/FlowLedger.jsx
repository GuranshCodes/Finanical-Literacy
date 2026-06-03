import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const GROCERY_ITEMS = [
  'Chicken Breast (3-4kg) - $40',
  'Eggs 3 dozen - $14',
  'Greek Yogurt 4 tubs - $35',
  'Protein Bars (12-15 bars) - $30',
  'Protein Shakes (10-12 bottles / 1 tub) - $26',
  'Bread (4 loaves) - $12',
  'Rice (9KG bag) - $20',
  'Pasta (6 boxes) - $12',
  'Tortillas (2 packs) - $12',
  'Bagels (2 packs) - $15',
  'Oats (large container) - $8',
  'Bananas - $12',
  'Apples - $15',
  'Milk (3-4 jugs) - $24',
  'Cheese - $18',
  'Butter - $8',
  'Peanut Butter - $6',
  'Cooking Oil - $8',
  'Coffee - $12',
  'Spices set - $6',
];

type FlowItem = {
  id: number;
  desc: string;
  from: string;
  to: string;
  monthly: string;
  yearly: string;
  category: string;
};

const FLOWS: FlowItem[] = [
  { id: 1, desc: 'Nvidia SWE Salary', from: 'NVIDIA', to: 'BANK', monthly: '+$13,098.66', yearly: '+$157,184.00', category: 'INCOME' },
  { id: 2, desc: 'Investments', from: 'BANK', to: 'PORTFOLIO', monthly: '-$500.00', yearly: '-$6,000.00', category: 'INVESTMENTS' },
  { id: 3, desc: 'Return on Investments', from: 'PORTFOLIO', to: 'BANK', monthly: '+$4.00', yearly: '+$48.00', category: 'ROI' },
  { id: 4, desc: 'RRSP Contribution', from: 'BANK', to: 'RRSP', monthly: '-$2,357.04', yearly: '-$28,284.48', category: 'RETIREMENT' },
  { id: 5, desc: 'Student Loan Payment', from: 'BANK', to: 'LOAN', monthly: '-$1,526.25', yearly: '-$18,314.97', category: 'EDUCATION' },
  { id: 6, desc: 'Apartment Rent', from: 'BANK', to: 'LANDLORD', monthly: '-$825.00', yearly: '-$9,900.00', category: 'HOUSING' },
  { id: 7, desc: 'Health Insurance', from: 'BANK', to: 'POLICY_ME', monthly: '-$150.00', yearly: '-$1,800.00', category: 'HEALTH' },
  { id: 8, desc: 'Groceries', from: 'BANK', to: 'STORES', monthly: '-$475.00', yearly: '-$5,700.00', category: 'GROCERIES' },
  { id: 9, desc: 'Rogers Internet', from: 'BANK', to: 'ROGERS', monthly: '-$95.00', yearly: '-$1,140.00', category: 'INTERNET' },
];

export default function FlowLedger() {
  // ✅ FIXED TYPE (this was your error)
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section className="border-t-2 border-foreground">

      {/* HEADER */}
      <div className="p-6 border-b-2 border-foreground">
        <p className="text-[11px] font-mono tracking-[0.3em] text-accent mb-2">
          SALARY
        </p>
        <h2 className="text-4xl font-black uppercase">
          FLOW
        </h2>
      </div>

      {/* TABLE HEADER */}
      <div className="hidden md:grid grid-cols-12 px-6 py-3 bg-foreground text-background text-[10px] font-mono">
        <div className="col-span-3">DESCRIPTION</div>
        <div className="col-span-2">FLOW</div>
        <div className="col-span-2">CATEGORY</div>
        <div className="col-span-2 text-right">MONTHLY</div>
        <div className="col-span-2 text-right">YEARLY</div>
        <div className="col-span-1"></div>
      </div>

      {/* ROWS */}
      {FLOWS.map(tx => (
        <div key={tx.id} className="border-b border-foreground">

          {/* ROW */}
          <div
            className="grid grid-cols-12 px-6 py-4 cursor-pointer hover:bg-muted items-center"
            onClick={() =>
              setExpandedId(prev => (prev === tx.id ? null : tx.id))
            }
          >
            <div className="col-span-3 font-mono font-bold text-sm">
              {tx.desc}
            </div>

            <div className="col-span-2 text-xs font-mono">
              {tx.from} → {tx.to}
            </div>

            <div className="col-span-2 text-xs font-mono">
              {tx.category}
            </div>

            <div className="col-span-2 text-right font-mono">
              {tx.monthly}
            </div>

            <div className="col-span-2 text-right font-mono font-bold">
              {tx.yearly}
            </div>

            <div className="col-span-1 flex justify-end">
              <ChevronDown
                className={`transition-transform ${
                  expandedId === tx.id ? 'rotate-180' : ''
                }`}
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
                className="overflow-hidden px-6 py-4 bg-muted border-t"
              >

                {tx.category === 'GROCERIES' ? (
                  <div>
                    <p className="text-[10px] font-mono mb-3 text-muted-foreground">
                      Grocery Breakdown
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      {GROCERY_ITEMS.map(item => (
                        <div
                          key={item}
                          className="text-xs font-mono border p-2 bg-background"
                        >
                          • {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm font-mono text-muted-foreground">
                    No breakdown available
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      ))}

    </section>
  );
}