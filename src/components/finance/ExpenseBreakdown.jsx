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

const FILTERS = ['ALL', 'JOB', 'INVESTMENTS', 'ROI', 'HOUSING', 'RETIREMENT', 'EDUCATION', 'HEALTH', 'FOOD', 'TRANSPORT', 'PHONE', 'CREDIT', 'BANK', 'INTERNET', 'IPTV', 'TRAVEL'];

const GROCERY_LIST = [
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

export default function ExpenseBreakdown() {
  const [filter, setFilter] = useState('ALL');
  const [groceriesOpen, setGroceriesOpen] = useState(false);

  const filtered = filter === 'ALL'
    ? EXPENSES
    : EXPENSES.filter(e => e.category === filter || e.category.startsWith(filter));

  const grossIncome = EXPENSES.find(exp => exp.category === 'JOB');
  const expenseOnlyMonthly = EXPENSES.filter(exp => exp.monthly < 0).reduce((sum, exp) => sum + exp.monthly, 0);
  const expenseOnlyYearly = EXPENSES.filter(exp => exp.yearly < 0).reduce((sum, exp) => sum + exp.yearly, 0);
  const taxableMonthly = (grossIncome?.monthly ?? 0) + expenseOnlyMonthly;
  const taxableYearly = (grossIncome?.yearly ?? 0) + expenseOnlyYearly;
  const taxRate = 0.3816;
  const taxesMonthly = taxableMonthly * taxRate;
  const taxesYearly = taxableYearly * taxRate;
  const finalMonthly = taxableMonthly - taxesMonthly;
  const finalYearly = taxableYearly - taxesYearly;

  return (
    <section id="assets" className="border-t-2 border-foreground">
      {}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-foreground">
        <div className="lg:col-span-8 p-6 md:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground">
          <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">
            SECTION 02 
          </p>
          <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-[-0.05em] leading-[0.9]">
            EXPENSES
          </h2>
        </div>
        <div className="lg:col-span-4 p-6 flex flex-col justify-center">
          <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-3">
            Filter by category
          </p>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border-2 border-foreground transition-all btn-invert ${
                  filter === f ? 'bg-foreground text-background' : ''
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {}
      <div className="border-b-2 border-foreground px-6 py-8 bg-muted">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-accent text-[11px] font-mono tracking-[0.3em] uppercase mb-2">Grocery List</p>
            <h3 className="font-heading font-black text-3xl uppercase tracking-[-0.05em] leading-tight">Monthly Groceries</h3>
          </div>
          <div className="text-[10px] font-mono text-muted-foreground text-right">
            Total budget: <span className="text-foreground">$475 / mo</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {GROCERY_LIST.map(item => (
            <div key={item} className="text-[11px] font-mono text-muted-foreground border border-foreground/10 rounded-md p-3">
              • {item}
            </div>
          ))}
        </div>
      </div>

      {}
      <div className="hidden md:grid grid-cols-12 border-b-2 border-foreground bg-foreground text-background px-6 py-3">
        <div className="col-span-2 text-[10px] font-mono tracking-wider">CATEGORY</div>
        <div className="col-span-3 text-[10px] font-mono tracking-wider">ITEM</div>
        <div className="col-span-2 text-[10px] font-mono tracking-wider text-right">MONTHLY</div>
        <div className="col-span-2 text-[10px] font-mono tracking-wider text-right">YEARLY</div>
        <div className="col-span-3 text-[10px] font-mono tracking-wider">NOTE</div>
      </div>

      {filtered.map((exp, i) => {
        const isPositive = exp.monthly >= 0;
        const monthlySign = exp.monthly >= 0 ? '+' : '-';
        const yearlySign = exp.yearly >= 0 ? '+' : '-';
        const isGroceries = exp.category === 'GROCERIES';
        return (
          <div key={exp.item} className="space-y-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className={`grid grid-cols-1 md:grid-cols-12 gap-y-5 gap-x-5 px-6 py-6 border-b-2 border-foreground transition-colors items-center ${isGroceries ? 'cursor-pointer hover:bg-muted' : 'hover:bg-muted'}`}
              onClick={isGroceries ? () => setGroceriesOpen(prev => !prev) : undefined}
            >
              <div className="md:col-span-2">
                <span className="text-[10px] font-mono px-2 py-1 border border-foreground">
                  {exp.category}
                </span>
              </div>
              <div className="md:col-span-3 flex items-center gap-2">
                {exp.logo ? (
                  <img src={exp.logo} alt="" className="w-4 h-4 object-contain shrink-0" />
                ) : (
                  <div className="w-4 h-4 border border-muted-foreground/30 shrink-0" />
                )}
                <span className="text-sm font-mono font-bold leading-6">
                  {exp.item}
                </span>
                {isGroceries && (
                  <span className="text-[10px] font-mono text-muted-foreground">{groceriesOpen ? '▾' : '▸'}</span>
                )}
              </div>
              <div className={`md:col-span-2 text-sm font-mono text-right ${isPositive ? 'text-accent' : 'text-destructive'}`}>
                {monthlySign}${Math.abs(exp.monthly).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className={`md:col-span-2 text-sm font-mono font-bold text-right ${isPositive ? 'text-accent' : 'text-destructive'}`}>
                {yearlySign}${Math.abs(exp.yearly).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="md:col-span-3 text-[11px] font-mono text-muted-foreground leading-7 mt-3 md:text-right md:justify-self-end">{exp.note}</div>
            </motion.div>

            {isGroceries && groceriesOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.25 }}
                className="md:col-span-12 px-6 pb-6"
              >
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-destructive/80">Grocery Breakdown</p>
                      <p className="text-sm font-mono font-bold text-destructive">Monthly Food Expenses</p>
                    </div>
                    <span className="text-[10px] font-mono text-destructive">- $475.00 / mo</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {GROCERY_LIST.map(item => (
                      <div key={item} className="text-[11px] font-mono text-destructive leading-6 border border-destructive/10 rounded-lg bg-destructive/10 px-3 py-2">
                        - {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        );
      })}

      {}
      <div className="grid grid-cols-1 md:grid-cols-12 px-6 py-5 bg-foreground text-background items-center gap-y-1">
        <div className="md:col-span-2 text-[10px] font-mono tracking-wider">TOTAL</div>
        <div className="md:col-span-3 text-sm font-mono font-black uppercase">Total Expenses</div>
        <div className="md:col-span-2 text-sm font-mono font-black text-right text-destructive">${Math.abs(expenseOnlyMonthly).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        <div className="md:col-span-2 text-sm font-mono font-black text-right text-destructive">${Math.abs(expenseOnlyYearly).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        <div className="md:col-span-3 text-[11px] font-mono text-destructive text-right md:justify-self-end">Living costs</div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-5 px-6 py-5 items-start gap-y-4">
        <div className="md:col-span-1">
          <div className="text-[10px] font-mono text-muted-foreground">Gross Total Income</div>
          <div className="text-[10px] font-mono text-muted-foreground">Income from Job</div>
          <div className="text-sm font-mono font-black">${(grossIncome?.monthly ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })} / ${(grossIncome?.yearly ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <div className="text-[10px] font-mono text-muted-foreground">Gross INCOME</div>
        </div>
        <div className="md:col-span-1">
          <div className="text-[10px] font-mono text-muted-foreground">Taxable Income</div>
          <div className="text-[10px] font-mono text-muted-foreground">Taxable Income</div>
          <div className="text-sm font-mono font-black">${taxableMonthly.toLocaleString('en-US', { minimumFractionDigits: 2 })} / ${taxableYearly.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <div className="text-[10px] font-mono text-muted-foreground">After Expenses</div>
        </div>
        <div className="md:col-span-1">
          <div className="text-[10px] font-mono text-muted-foreground">Total Expenses</div>
          <div className="text-[10px] font-mono text-muted-foreground">Costs of living</div>
          <div className="text-sm font-mono font-black">${Math.abs(expenseOnlyMonthly).toLocaleString('en-US', { minimumFractionDigits: 2 })} / ${Math.abs(expenseOnlyYearly).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <div className="text-[10px] font-mono text-muted-foreground">Expenses</div>
        </div>
        <div className="md:col-span-1">
          <div className="text-[10px] font-mono text-muted-foreground">Taxes</div>
          <div className="text-[10px] font-mono text-muted-foreground">ALL Taxes: 38.16% (26% + 12.16%)</div>
          <div className="text-sm font-mono font-black">${taxesMonthly.toLocaleString('en-US', { minimumFractionDigits: 2 })} / ${taxesYearly.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <div className="text-[10px] font-mono text-muted-foreground">Taxes</div>
        </div>
        <div className="md:col-span-1">
          <div className="text-[10px] font-mono text-muted-foreground">Final Savings</div>
          <div className="text-[10px] font-mono text-muted-foreground">Money Left</div>
          <div className="text-sm font-mono font-black">${finalMonthly.toLocaleString('en-US', { minimumFractionDigits: 2 })} / ${finalYearly.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <div className="text-[10px] font-mono text-muted-foreground">Final Savings Left</div>
        </div>
      </div>
    </section>
  );
}