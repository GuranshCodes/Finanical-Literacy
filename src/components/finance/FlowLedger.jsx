import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const GROCERY_ITEMS = [
  'Chicken Breast (3-4kg) - $40',
  'Eggs 3 dozen - $14',
  'Premium Greek Yogurt 4 tubs - $35',
  'Protein Bars (12-15 bars) - $30',
  'Protein Shakes (10-12 bottles / 1 tub powder) - $26',
  'Bread (4 Loaves) - $12',
  'Rice (9KG bag) - $20',
  'Pasta (6 boxes) - $12',
  'Large Tortillas (2 packs) - $12',
  'Bagels (2 packs) - $15',
  'Oats (1 large container) - $8',
  'Maggi (2 big packs) - $8',
  'Bananas (34) - $12',
  'Apples (10) - $15',
  'Oranges (8) - $12',
  'Potatoes (2 large bags) - $14',
  'Onions (1 bag) - $8',
  'Lettuce (2-3 heads) - $8',
  'Bell Peppers (3-4) - $12',
  'Grapes (1 pack) - $9',
  'Milk (3-4 large jugs) - $24',
  'Cheese (Mozzarella + Cheddar) - $18',
  'Butter (5 sticks) - $8',
  'Peanut Butter (1 jar) - $6',
  'Cooking Oil (1 bottle) - $8',
  'Pasta Sauce (2 jars) - $8',
  'Cereal (1-2 boxes) - $20',
  'Coffee (1 big container) - $12',
  'Spices (set) - $6',
  'Chips (2-3 bags) - $12',
  'Chocolate (5 bars) - $10',
  'Popcorn (2 bags) - $8',
  'Ice Cream (2 tubs) - $10',
  'Frozen Meals (6) - $10',
];

const FLOWS = [
  { id: 1, desc: 'Nvidia SWE Salary', from: 'NVIDIA', to: 'BANK', monthly: '+$13,098.66', yearly: '+$157,184.00', category: 'INCOME' },
  { id: 2, desc: 'Investments', from: 'BANK', to: 'PORTFOLIO', monthly: '-$500.00', yearly: '-$6,000.00', category: 'INVESTMENTS' },
  { id: 3, desc: 'Return on Investments', from: 'PORTFOLIO', to: 'BANK', monthly: '+$4.00', yearly: '+$48.00', category: 'ROI' },
  { id: 4, desc: 'RRSP Contribution', from: 'BANK', to: 'RRSP', monthly: '-$2,357.04', yearly: '-$28,284.48', category: 'RETIREMENT' },
  { id: 5, desc: 'Student Loan Payment', from: 'BANK', to: 'LOAN', monthly: '-$1,526.25', yearly: '-$18,314.97', category: 'EDUCATION' },
  { id: 6, desc: 'Apartment Rent', from: 'BANK', to: 'LANDLORD', monthly: '-$825.00', yearly: '-$9,900.00', category: 'HOUSING' },
  { id: 7, desc: 'Health Insurance', from: 'BANK', to: 'POLICY_ME', monthly: '-$150.00', yearly: '-$1,800.00', category: 'HEALTH' },
  { id: 8, desc: 'Groceries', from: 'BANK', to: 'STORES', monthly: '-$425.00', yearly: '-$5,100.00', category: 'GROCERIES' },
  { id: 9, desc: 'Rogers Internet', from: 'BANK', to: 'ROGERS', monthly: '-$95.00', yearly: '-$1,140.00', category: 'INTERNET' },
];

export default function FlowLedger() {
  const [expandedId, setExpandedId] = useState(
    /** @type {number | null} */ (null)
  );

  return (
    <section className="border-t-2 border-foreground">

      {FLOWS.map((tx) => (
        <div key={tx.id} className="border-b-2 border-foreground">

          {/* ROW */}
          <div
            className="grid grid-cols-12 px-6 py-4 cursor-pointer hover:bg-muted"
            onClick={() =>
              setExpandedId((prev) => (prev === tx.id ? null : tx.id))
            }
          >
            <div className="col-span-3 font-mono font-bold text-sm">
              {tx.desc}
            </div>

            <div className="col-span-2 font-mono text-xs">
              {tx.from} → {tx.to}
            </div>

            <div className="col-span-2 font-mono text-xs">
              {tx.category}
            </div>

            <div className="col-span-2 text-right font-mono">
              {tx.monthly}
            </div>

            <div className="col-span-2 text-right font-mono font-bold">
              {tx.yearly}
            </div>

            <div className="col-span-1 text-right">
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
                className="overflow-hidden px-6 py-4 bg-muted"
              >
                {tx.category === 'GROCERIES' ? (
                  <div className="grid grid-cols-2 gap-2">
                    {GROCERY_ITEMS.map((item) => (
                      <div key={item} className="text-xs font-mono">
                        - {item}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm font-mono">
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