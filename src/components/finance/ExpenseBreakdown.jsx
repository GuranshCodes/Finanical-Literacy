// FinancialDashboard.jsx

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ChevronDown, CreditCard, HandCoins } from 'lucide-react';


/** @type {Record<string, { emoji: string; ring: string; glow: string; text: string }>} */

const ICON_META = {
  JOB: { emoji: '💼', ring: 'border-accent/30', glow: 'bg-accent/10', text: 'text-accent' },
  INVESTMENTS: { emoji: '📈', ring: 'border-foreground/25', glow: 'bg-foreground/10', text: 'text-foreground' },
  ROI: { emoji: '🧮', ring: 'border-accent/20', glow: 'bg-accent/10', text: 'text-accent' },
  RETIREMENT: { emoji: '🏦', ring: 'border-foreground/25', glow: 'bg-foreground/10', text: 'text-foreground' },
  EDUCATION: { emoji: '🎓', ring: 'border-foreground/25', glow: 'bg-foreground/10', text: 'text-foreground' },
  HOUSING: { emoji: '🏠', ring: 'border-foreground/25', glow: 'bg-foreground/10', text: 'text-foreground' },
  HEALTH: { emoji: '🩺', ring: 'border-foreground/25', glow: 'bg-foreground/10', text: 'text-foreground' },
  GROCERIES: { emoji: '🛒', ring: 'border-foreground/25', glow: 'bg-foreground/10', text: 'text-foreground' },
  INTERNET: { emoji: '📡', ring: 'border-foreground/25', glow: 'bg-foreground/10', text: 'text-foreground' },
  TRANSPORT: { emoji: '🚌', ring: 'border-foreground/25', glow: 'bg-foreground/10', text: 'text-foreground' },
  PHONE: { emoji: '📱', ring: 'border-foreground/25', glow: 'bg-foreground/10', text: 'text-foreground' },
  PHONE_PLAN: { emoji: '📶', ring: 'border-foreground/25', glow: 'bg-foreground/10', text: 'text-foreground' },
  IPTV: { emoji: '📺', ring: 'border-foreground/25', glow: 'bg-foreground/10', text: 'text-foreground' },
  TRAVEL: { emoji: '✈️', ring: 'border-foreground/25', glow: 'bg-foreground/10', text: 'text-foreground' },
  FOOD: { emoji: '🍔', ring: 'border-foreground/25', glow: 'bg-foreground/10', text: 'text-foreground' },
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
    // logo removed (emoji icons only)
    logo: undefined,

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
    // logo removed (emoji icons only)
    logo: undefined,
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
    logo: undefined,
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
    logo: undefined,
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
    logo: undefined,
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
    logo: undefined,
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

/** @param {number} n */
function money(n) {
  return Number(n).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}


export default function ExpenseBreakdown() {
  const [expandedId, setExpandedId] = useState(/** @type {number | null} */ (null));

  const [filter, setFilter] = useState('ALL');

  const filtered = useMemo(() => {
    if (filter === 'ALL') return FLOWS;
    return FLOWS.filter((x) => x.category.startsWith(filter));
  }, [filter]);

  const incomeMonthly = useMemo(
    () => FLOWS.filter((f) => f.monthly > 0).reduce((a, b) => a + b.monthly, 0),
    []
  );

  const incomeYearly = useMemo(
    () => FLOWS.filter((f) => f.yearly > 0).reduce((a, b) => a + b.yearly, 0),
    []
  );

  const expensesMonthly = useMemo(
    () => Math.abs(FLOWS.filter((f) => f.monthly < 0).reduce((a, b) => a + b.monthly, 0)),
    []
  );

  const expensesYearly = useMemo(
    () => Math.abs(FLOWS.filter((f) => f.yearly < 0).reduce((a, b) => a + b.yearly, 0)),
    []
  );

  const taxableMonthly = incomeMonthly - expensesMonthly;
  const taxableYearly = incomeYearly - expensesYearly;

  const taxRate = 0.3816;
  const taxesMonthly = taxableMonthly * taxRate;
  const taxesYearly = taxableYearly * taxRate;

  // keep for parity with calculations (UI uses SUMMARY literal), but avoid lint unused warnings
  const _finalMonthly = taxableMonthly - taxesMonthly;
  const _finalYearly = taxableYearly - taxesYearly;


  // NOTE: you asked for exact values. Keep them literal (UI design work) while calculations exist above.
  const SUMMARY = {
    incomeMonthly: 13102.66,
    incomeYearly: 157232,
    expensesMonthly: 6443.68,
    expensesYearly: 74612.3,
    taxableMonthly: 6658.98,
    taxableYearly: 82619.7,
    taxesMonthly: 2541.067,
    taxesYearly: 31527.678,
    finalMonthly: 4117.913,
    finalYearly: 51092.022,
  };

  const summaryItems = [
    {
      label: 'Income',
      valueA: SUMMARY.incomeMonthly,
      valueB: SUMMARY.incomeYearly,
      accent: true,
      icon: <HandCoins size={16} />,
    },
    {
      label: 'Expenses',
      valueA: SUMMARY.expensesMonthly,
      valueB: SUMMARY.expensesYearly,
      accent: false,
      icon: <CreditCard size={16} />,
    },
    {
      label: 'Taxable',
      valueA: SUMMARY.taxableMonthly,
      valueB: SUMMARY.taxableYearly,
      accent: false,
      icon: <span className="text-[10px] font-mono">TX</span>,
    },
    {
      label: 'Taxes',
      valueA: SUMMARY.taxesMonthly,
      valueB: SUMMARY.taxesYearly,
      accent: false,
      icon: <span className="text-[10px] font-mono">%</span>,
    },
    {
      label: 'Final Savings',
      valueA: SUMMARY.finalMonthly,
      valueB: SUMMARY.finalYearly,
      accent: true,
      icon: <span className="text-[10px] font-mono">$</span>,
    },
  ];

  return (
    <section id="assets" className="border-t border-foreground/30 pt-10">
      <div className="px-6 md:px-12 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">SECTION 02</p>
            <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-[-0.05em]">
              FLOW & EXPENSES
            </h2>
          </div>

          <div className="lg:min-w-[320px]">
            <p className="text-[10px] font-mono mb-3">Filter by category</p>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 border border-foreground/25 rounded-full text-[10px] font-mono transition-colors ${
                    filter === f
                      ? 'bg-foreground text-background'
                      : 'bg-background/10 text-muted-foreground hover:bg-background/20'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Circular / rounded flow list */}
      <div className="px-6 md:px-12">
        <div className="relative">
          <div className="absolute left-1 md:left-4 top-4 bottom-4 w-[1px] bg-foreground/10 hidden md:block" />

          <div className="space-y-3">
            {filtered.map((tx) => {
              const isOpen = expandedId === tx.id;
              const tone = tx.monthly >= 0 ? 'text-accent' : 'text-destructive';
              return (
                <div key={tx.id} className="relative">
                  <div
                    className="group cursor-pointer rounded-3xl border border-foreground/25 bg-background/20 backdrop-blur-md px-4 py-4 md:px-6 md:py-5 hover:bg-background/30"
                    onClick={() =>
                      setExpandedId((prevId) => (prevId === tx.id ? null : tx.id))
                    }
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full border border-foreground/25 bg-background/30 flex items-center justify-center relative">
                          <div
                            className="absolute inset-0 rounded-full wf-nodePulse"
                            style={{ opacity: 0.35 }}
                          />
                          {tx.type === 'in' ? (
                            <ArrowRight size={14} className="text-accent" />
                          ) : (
                            <ArrowLeft size={14} className="text-destructive" />
                          )}
                        </div>
                        <div className="mt-2 w-2 h-2 rounded-full bg-foreground/10" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 md:w-5 md:h-5 rounded-full border flex items-center justify-center ${
                              ICON_META[tx.category]?.ring || 'border-foreground/25'
                            } bg-background/20`} aria-hidden>
                              <span
                                className={`text-[14px] ${
                                  ICON_META[tx.category]?.text || 'text-foreground'
                                }`}
                              >
                                {(ICON_META[tx.category]?.emoji || '💠')}
                              </span>
                            </div>
                            <span className="font-mono font-bold text-sm md:text-base">
                              {tx.desc}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`text-[11px] font-mono ${tone}`}>MONTHLY</span>
                            <span className={`text-[11px] font-mono ${tone} font-bold`}>
                              {tx.monthly >= 0 ? '+' : '-'}$
                              {Math.abs(tx.monthly).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-foreground/25 bg-background/15">
                            {tx.category}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {tx.from} → {tx.to}
                          </span>
                          <span
                            className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-foreground/25 bg-background/15 ${tone}`}
                          >
                            YEARLY {tx.yearly >= 0 ? '+' : '-'}$
                            {Math.abs(tx.yearly).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-[10px] font-mono text-muted-foreground">click to expand</p>
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 rounded-3xl border border-foreground/20 bg-muted px-4 py-4 md:px-6 md:py-5">
                          {tx.category === 'GROCERIES' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {GROCERY_ITEMS.map((item) => (
                                <div
                                  key={item}
                                  className="rounded-2xl border border-foreground/15 p-3 bg-background/20"
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full border border-foreground/20 bg-background/20 flex items-center justify-center">
                                {ICON_META[tx.category]?.emoji || '💠'}
                              </div>
                              <p className="font-mono text-sm text-muted-foreground">
                                {tx.note}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary - redesigned to match new circular design */}
      <div className="px-6 md:px-12 pt-8 pb-6">
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute left-1/2 top-1/2 w-[540px] h-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/5 blur-[1px]" />
          </div>

          <div className="grid md:grid-cols-5 gap-4 items-stretch relative w-full">
            {summaryItems.map((item, idx) => {
              const ringTone = item.accent ? 'border-accent/30 bg-accent/10' : 'border-foreground/20 bg-foreground/10';
              return (
                <div
                  key={item.label}
                  className={`rounded-full md:rounded-3xl border ${ringTone} p-4 md:p-6 flex flex-col justify-center items-start overflow-hidden`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-foreground/25 bg-background/20 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-muted-foreground tracking-wider">{item.label}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 font-heading font-black text-[18px] sm:text-2xl tracking-[-0.03em] leading-tight">
                    <span className={item.accent ? 'text-accent' : 'text-foreground'}>
                      ${money(item.valueA)}
                    </span>
                    <span className="text-muted-foreground font-mono"> / </span>
                    <span className="text-foreground">${item.valueB.toLocaleString('en-US', { maximumFractionDigits: 3 })}</span>
                  </div>

                  {/* small divider / glow */}
                  <div className="mt-4 w-full h-px bg-foreground/15" />
                  <div className="mt-3 text-[10px] font-mono text-muted-foreground">
                    Monthly / Yearly
                  </div>

                  {/* subtle positional shimmer */}
                  <div
                    className={`absolute -right-10 top-6 w-24 h-24 rounded-full blur-2xl ${item.accent ? 'bg-accent/20' : 'bg-foreground/10'}`}
                    style={{ opacity: 0.6 + idx * 0.02 }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

