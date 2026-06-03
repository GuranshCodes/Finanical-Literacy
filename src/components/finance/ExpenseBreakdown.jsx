import React, { useState } from 'react';
import { motion } from 'framer-motion';

import appLogo from '@/assets/icons/app-logo.svg';
import cibcLogo from '@/assets/icons/cibc.svg';
import rogersLogo from '@/assets/icons/rogers.svg';
import prestoLogo from '@/assets/icons/presto.svg';
import appleLogo from '@/assets/icons/apple.svg';
import expediaLogo from '@/assets/icons/expedia.svg';
import defaultLogo from '@/assets/icons/default.svg';

const EXPENSES = [
  { category: 'JOB', item: 'Nvidia Software Engineer Salary', monthly: 13098.66, yearly: 157184.00, note: 'Base Salary (Low End) Levels', logo: appLogo },
  { category: 'INVESTMENTS', item: 'Investments & Side Business in AI', monthly: -500.00, yearly: -6000.00, note: 'Claude, ChatGPT, S&P 500 etc.', logo: defaultLogo },
  { category: 'ROI', item: 'Return on Investments', monthly: 4.00, yearly: 48.00, note: 'Only 0.8% of original investment', logo: defaultLogo },
  { category: 'PHONE', item: 'iPhone 17', monthly: -106.31, yearly: -1275.77, note: 'Total=$1,275.77', logo: appleLogo },
  { category: 'PHONE_PLAN', item: 'Rogers 60GB Data', monthly: -60.00, yearly: -720.00, note: 'Rogers', logo: rogersLogo },
  { category: 'IPTV', item: 'IPTV BOX', monthly: -10.00, yearly: -120.00, note: 'Gloumbia Video', logo: defaultLogo },
  { category: 'IPTV', item: 'Buying The IPTV BOX', monthly: -225.99, yearly: 0.00, note: 'One Time Payment', logo: defaultLogo },
  { category: 'INTERNET', item: 'Rogers 2 Gigabit', monthly: -95.00, yearly: -1140.00, note: 'Rogers Internet', logo: rogersLogo },
  { category: 'HOUSING', item: 'Apartment Rent', monthly: -825.00, yearly: -9900.00, note: 'Amount after split with 4 roommates', logo: defaultLogo },
  { category: 'GROCERIES', item: 'Groceries', monthly: -475.00, yearly: -5700.00, note: 'Remitbee', logo: defaultLogo },
  { category: 'FOOD', item: 'Average money spent on fast food', monthly: -60.00, yearly: -720.00, note: 'Restaurants Canada', logo: defaultLogo },
  { category: 'TRANSPORT', item: 'Presto Card', monthly: -50.00, yearly: -600.00, note: 'Rarely used (work from home)', logo: prestoLogo },
  { category: 'TRAVEL', item: '3 Week Summer Trip (VEGAS)', monthly: -53.09, yearly: -637.08, note: 'Expedia', logo: expediaLogo },
  { category: 'CREDIT', item: 'CIBC Adapta Card (30% used)', monthly: -300.00, yearly: -3600.00, note: '$0 Annual Fees · 21.99% Rate', logo: cibcLogo },
  { category: 'BANK', item: 'CIBC Bank Account', monthly: 0.00, yearly: 0.00, note: '$0 Annual Fees and Welcome Bonus', logo: cibcLogo },
  { category: 'EDUCATION', item: 'University Student Loans', monthly: -1333.33, yearly: -16000.00, note: 'Total: $80,000 (5 yr payment)', logo: defaultLogo },
  { category: 'HEALTH', item: 'Health Insurance', monthly: -150.00, yearly: -1800.00, note: 'Policy Me', logo: defaultLogo },
  { category: 'RETIREMENT', item: 'RRSP', monthly: -2357.04, yearly: -28284.48, note: '18% of my income invested in RRSP', logo: cibcLogo },
];

const FILTERS = [
  'ALL', 'JOB', 'INVESTMENTS', 'ROI', 'HOUSING', 'RETIREMENT',
  'EDUCATION', 'HEALTH', 'FOOD', 'TRANSPORT', 'PHONE',
  'CREDIT', 'BANK', 'INTERNET', 'IPTV', 'TRAVEL'
];

export default function ExpenseBreakdown() {
  const [filter, setFilter] = useState('ALL');

  const filtered =
    filter === 'ALL'
      ? EXPENSES
      : EXPENSES.filter(e => e.category === filter);

  const grossIncome = EXPENSES.find(exp => exp.category === 'JOB');

  const expenseOnlyMonthly = EXPENSES
    .filter(exp => exp.monthly < 0)
    .reduce((sum, exp) => sum + exp.monthly, 0);

  const expenseOnlyYearly = EXPENSES
    .filter(exp => exp.yearly < 0)
    .reduce((sum, exp) => sum + exp.yearly, 0);

  const taxableMonthly = (grossIncome?.monthly ?? 0) + expenseOnlyMonthly;
  const taxableYearly = (grossIncome?.yearly ?? 0) + expenseOnlyYearly;

  const taxRate = 0.3816;
  const taxesMonthly = taxableMonthly * taxRate;
  const taxesYearly = taxableYearly * taxRate;

  const finalMonthly = taxableMonthly - taxesMonthly;
  const finalYearly = taxableYearly - taxesYearly;

  return (
    <section id="assets" className="border-t-2 border-foreground">

      {/* HEADER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-foreground">
        <div className="lg:col-span-8 p-6 md:p-12">
          <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">
            SECTION 02 // SPEND
          </p>
          <h2 className="font-heading font-black text-4xl md:text-6xl uppercase">
            EXPENSES
          </h2>
        </div>

        <div className="lg:col-span-4 p-6">
          <p className="text-[10px] font-mono text-muted-foreground mb-3">
            Filter by category
          </p>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase border-2 ${
                  filter === f ? 'bg-foreground text-background' : ''
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE HEADER */}
      <div className="hidden md:grid grid-cols-12 border-b-2 border-foreground bg-foreground text-background px-6 py-3">
        <div className="col-span-2 text-[10px] font-mono">CATEGORY</div>
        <div className="col-span-3 text-[10px] font-mono">ITEM</div>
        <div className="col-span-2 text-[10px] font-mono text-right">MONTHLY</div>
        <div className="col-span-2 text-[10px] font-mono text-right">YEARLY</div>
        <div className="col-span-3 text-[10px] font-mono">NOTE</div>
      </div>

      {/* ROWS */}
      {filtered.map((exp, i) => {
        const isPositive = exp.monthly >= 0;

        return (
          <motion.div
            key={exp.item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            className="grid grid-cols-1 md:grid-cols-12 px-6 py-6 border-b-2 hover:bg-muted"
          >
            <div className="md:col-span-2">
              <span className="text-[10px] font-mono border px-2 py-1">
                {exp.category}
              </span>
            </div>

            <div className="md:col-span-3 flex items-center gap-2">
              {exp.logo ? (
                <img src={exp.logo} className="w-4 h-4" />
              ) : (
                <div className="w-4 h-4 border" />
              )}
              <span className="text-sm font-mono font-bold">{exp.item}</span>
            </div>

            <div className={`md:col-span-2 text-right font-mono ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}>
              ${Math.abs(exp.monthly).toLocaleString()}
            </div>

            <div className={`md:col-span-2 text-right font-mono font-bold ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}>
              ${Math.abs(exp.yearly).toLocaleString()}
            </div>

            <div className="md:col-span-3 text-sm font-mono text-muted-foreground">
              {exp.note}
            </div>
          </motion.div>
        );
      })}

      {/* TOTAL */}
      <div className="grid grid-cols-1 md:grid-cols-12 px-6 py-5 bg-foreground text-background">
        <div className="md:col-span-2">TOTAL</div>
        <div className="md:col-span-3">Total Expenses</div>
        <div className="md:col-span-2 text-right">
          ${Math.abs(expenseOnlyMonthly).toLocaleString()}
        </div>
        <div className="md:col-span-2 text-right">
          ${Math.abs(expenseOnlyYearly).toLocaleString()}
        </div>
        <div className="md:col-span-3">Living costs</div>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-5 px-6 py-5 gap-4 text-sm font-mono">
        <div>
          Gross Income<br />
          ${grossIncome?.monthly} / ${grossIncome?.yearly}
        </div>

        <div>
          Taxable<br />
          ${taxableMonthly} / ${taxableYearly}
        </div>

        <div>
          Expenses<br />
          ${Math.abs(expenseOnlyMonthly)} / ${Math.abs(expenseOnlyYearly)}
        </div>

        <div>
          Taxes<br />
          ${taxesMonthly.toFixed(2)} / ${taxesYearly.toFixed(2)}
        </div>

        <div>
          Final Savings<br />
          ${finalMonthly.toFixed(2)} / ${finalYearly.toFixed(2)}
        </div>
      </div>

    </section>
  );
}