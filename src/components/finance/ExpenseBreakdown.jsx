// FinancialDashboard.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';

const LOGOS = {
  NVIDIA: 'https://www.nvidia.com/favicon.ico',
  APPLE: 'https://www.apple.com/favicon.ico',
  ROGERS: 'https://www.rogers.com/favicon.ico',
  PRESTO: 'https://www.prestocard.ca/favicon.ico',
  EXPEDIA: 'https://www.expedia.ca/favicon.ico',
  CIBC: 'https://www.cibc.com/favicon.ico',
};

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
  {
    id: 1,
    desc: 'Nvidia SWE Salary',
    logo: LOGOS.NVIDIA,
    from: 'NVIDIA',
    to: 'BANK',
    monthly: 13098.66,
    yearly: 157184.0,
    type: 'in',
    category: 'JOB',
    note: 'Base salary low end · Levels.fyi',
  },
  {
    id: 2,
    desc: 'Investments',
    from: 'BANK',
    to: 'PORTFOLIO',
    monthly: -500,
    yearly: -6000,
    type: 'out',
    category: 'INVESTMENTS',
    note: 'Invested in AI / side business',
  },
  {
    id: 3,
    desc: 'Return on Investments',
    from: 'PORTFOLIO',
    to: 'BANK',
    monthly: 4,
    yearly: 48,
    type: 'in',
    category: 'ROI',
    note: 'Only 0.8% of original investment',
  },
  {
    id: 4,
    desc: 'RRSP Contribution',
    logo: LOGOS.CIBC,
    from: 'BANK',
    to: 'RRSP',
    monthly: -2357.04,
    yearly: -28284.48,
    type: 'out',
    category: 'RETIREMENT',
    note: '18% of income',
  },
  {
    id: 5,
    desc: 'Student Loan Payment',
    from: 'BANK',
    to: 'LOAN',
    monthly: -1526.25,
    yearly: -18314.97,
    type: 'out',
    category: 'EDUCATION',
    note: '$80,000 total · 5.45% · 5yr',
  },
  {
    id: 6,
    desc: 'Apartment Rent',
    from: 'BANK',
    to: 'LANDLORD',
    monthly: -825,
    yearly: -9900,
    type: 'out',
    category: 'HOUSING',
    note: 'Split with 4 roommates',
  },
  {
    id: 7,
    desc: 'Health Insurance',
    from: 'BANK',
    to: 'POLICY_ME',
    monthly: -150,
    yearly: -1800,
    type: 'out',
    category: 'HEALTH',
    note: 'Policy Me',
  },
  {
    id: 8,
    desc: 'Groceries',
    from: 'BANK',
    to: 'STORES',
    monthly: -425,
    yearly: -5100,
    type: 'out',
    category: 'GROCERIES',
    note: 'Remitbee',
  },
  {
    id: 9,
    desc: 'Rogers 2 Gigabit Internet',
    logo: LOGOS.ROGERS,
    from: 'BANK',
    to: 'ROGERS',
    monthly: -95,
    yearly: -1140,
    type: 'out',
    category: 'INTERNET',
    note: 'Rogers',
  },
  {
    id: 10,
    desc: 'Presto Card',
    logo: LOGOS.PRESTO,
    from: 'BANK',
    to: 'PRESTO',
    monthly: -50,
    yearly: -600,
    type: 'out',
    category: 'TRANSPORT',
    note: 'Rarely used',
  },
  {
    id: 11,
    desc: 'iPhone 17',
    logo: LOGOS.APPLE,
    from: 'BANK',
    to: 'APPLE',
    monthly: -106.31,
    yearly: -1275.77,
    type: 'out',
    category: 'PHONE',
    note: 'Total: $1,275.77',
  },
  {
    id: 12,
    desc: 'Rogers 60GB Plan',
    logo: LOGOS.ROGERS,
    from: 'BANK',
    to: 'ROGERS',
    monthly: -60,
    yearly: -720,
    type: 'out',
    category: 'PHONE_PLAN',
    note: 'Rogers',
  },
  {
    id: 13,
    desc: 'Buying The IPTV BOX',
    from: 'BANK',
    to: 'GLOUMBIA',
    monthly: -225.99,
    yearly: 0,
    type: 'out',
    category: 'IPTV',
    note: 'One Time Payment',
  },
  {
    id: 14,
    desc: 'IPTV BOX',
    from: 'BANK',
    to: 'GLOUMBIA',
    monthly: -10,
    yearly: -120,
    type: 'out',
    category: 'IPTV',
    note: 'Gloumbia Video',
  },
  {
    id: 15,
    desc: '3-Week Vegas Trip',
    logo: LOGOS.EXPEDIA,
    from: 'BANK',
    to: 'EXPEDIA',
    monthly: -53.09,
    yearly: -637.08,
    type: 'out',
    category: 'TRAVEL',
    note: 'Summer · 3 weeks',
  },
  {
    id: 16,
    desc: 'Fast Food',
    from: 'BANK',
    to: 'RESTAURANTS',
    monthly: -60,
    yearly: -720,
    type: 'out',
    category: 'FOOD',
    note: 'Restaurants Canada avg',
  },
];

const FILTERS = [
  'ALL',
  'JOB',
  'INVESTMENTS',
  'ROI',
  'HOUSING',
  'RETIREMENT',
  'EDUCATION',
  'HEALTH',
  'FOOD',
  'TRANSPORT',
  'PHONE',
  'INTERNET',
  'IPTV',
  'TRAVEL',
];

export default function FinancialDashboard() {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('ALL');


  const filtered =
    filter === 'ALL'
      ? FLOWS
      : FLOWS.filter((x) => x.category.startsWith(filter));

  const incomeMonthly = FLOWS.filter((f) => f.monthly > 0).reduce(
    (a, b) => a + b.monthly,
    0
  );

  const incomeYearly = FLOWS.filter((f) => f.yearly > 0).reduce(
    (a, b) => a + b.yearly,
    0
  );

  const expensesMonthly = Math.abs(
    FLOWS.filter((f) => f.monthly < 0).reduce((a, b) => a + b.monthly, 0)
  );

  const expensesYearly = Math.abs(
    FLOWS.filter((f) => f.yearly < 0).reduce((a, b) => a + b.yearly, 0)
  );

  const taxableMonthly = incomeMonthly - expensesMonthly;
  const taxableYearly = incomeYearly - expensesYearly;

  const taxRate = 0.3816;

  const taxesMonthly = taxableMonthly * taxRate;
  const taxesYearly = taxableYearly * taxRate;

  const finalMonthly = taxableMonthly - taxesMonthly;
  const finalYearly = taxableYearly - taxesYearly;

  return (
    <section id="assets" className="border-t-2 border-foreground">
      {/* Header */}
      <div className="grid lg:grid-cols-12 border-b-2 border-foreground">
        <div className="lg:col-span-8 p-6 md:p-12 border-r-2 border-foreground">
          <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">
            SECTION 02
          </p>
          <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-[-0.05em]">
            FLOW & EXPENSES
          </h2>
        </div>

        <div className="lg:col-span-4 p-6">
          <p className="text-[10px] font-mono mb-3">
            Filter by category
          </p>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 border ${
                  filter === f
                    ? 'bg-foreground text-background'
                    : ''
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      {filtered.map((tx) => (
        <div key={tx.id} className="border-b-2 border-foreground">
          <div
            className="grid md:grid-cols-12 px-6 py-4 cursor-pointer hover:bg-muted items-center"
// @ts-ignore
onClick={() => setExpandedId(prevId => (prevId === tx.id ? null : tx.id))}

          >
            <div className="md:col-span-3 flex items-center gap-2">
              {tx.logo ? (
                <img src={tx.logo} className="w-4 h-4" />
              ) : (
                <div className="w-4 h-4 border" />
              )}
              <span className="font-mono font-bold">{tx.desc}</span>
            </div>

            <div className="md:col-span-2 flex items-center gap-2">
              <span>{tx.from}</span>
              {tx.type === 'in' ? (
                <ArrowRight size={12} />
              ) : (
                <ArrowLeft size={12} />
              )}
              <span>{tx.to}</span>
            </div>

            <div className="md:col-span-2">
              <span className="border px-2 py-1 text-[10px]">
                {tx.category}
              </span>
            </div>

            <div
              className={`md:col-span-2 text-right ${
                tx.monthly >= 0
                  ? 'text-accent'
                  : 'text-destructive'
              }`}
            >
              {tx.monthly >= 0 ? '+' : '-'}$
              {Math.abs(tx.monthly).toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}
            </div>

            <div
              className={`md:col-span-2 text-right font-bold ${
                tx.yearly >= 0
                  ? 'text-accent'
                  : 'text-destructive'
              }`}
            >
              {tx.yearly >= 0 ? '+' : '-'}$
              {Math.abs(tx.yearly).toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}
            </div>

            <div className="md:col-span-1 flex justify-end">
              <ChevronDown
                className={
                  expandedId === tx.id ? 'rotate-180' : ''
                }
              />
            </div>
          </div>

          <AnimatePresence>
            {expandedId === tx.id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-muted">
                  {tx.category === 'GROCERIES' ? (
                    <div className="grid md:grid-cols-2 gap-2">
                      {GROCERY_ITEMS.map((item) => (
                        <div
                          key={item}
                          className="border rounded-lg p-2"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{tx.note}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Summary */}
      <div className="grid md:grid-cols-5 px-6 py-6 border-t-2 border-foreground">
        <div>
          <div className="text-xs">Income</div>
          <div className="font-bold">
            ${incomeMonthly.toLocaleString()} / $
            {incomeYearly.toLocaleString()}
          </div>
        </div>

        <div>
          <div className="text-xs">Expenses</div>
          <div className="font-bold">
            ${expensesMonthly.toLocaleString()} / $
            {expensesYearly.toLocaleString()}
          </div>
        </div>

        <div>
          <div className="text-xs">Taxable</div>
          <div className="font-bold">
            ${taxableMonthly.toLocaleString()} / $
            {taxableYearly.toLocaleString()}
          </div>
        </div>

        <div>
          <div className="text-xs">Taxes</div>
          <div className="font-bold">
            ${taxesMonthly.toLocaleString()} / $
            {taxesYearly.toLocaleString()}
          </div>
        </div>

        <div>
          <div className="text-xs">Final Savings</div>
          <div className="font-bold">
            ${finalMonthly.toLocaleString()} / $
            {finalYearly.toLocaleString()}
          </div>
        </div>
      </div>
    </section>
  );
}