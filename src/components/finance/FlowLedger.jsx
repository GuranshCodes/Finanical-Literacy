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
  { id: 1, desc: 'Nvidia SWE Salary', logo: LOGOS.NVIDIA, from: 'NVIDIA', to: 'BANK', monthly: '+$13,098.66', yearly: '+$157,184.00', type: 'in', category: 'INCOME', note: 'Base salary low end · Levels.fyi' },
  { id: 2, desc: 'Investments', logo: null, from: 'BANK', to: 'PORTFOLIO', monthly: '-$500.00', yearly: '-$6,000.00', type: 'out', category: 'INVESTMENTS', note: 'Invested in AI / side business', },
  { id: 3, desc: 'Return on Investments', logo: null, from: 'PORTFOLIO', to: 'BANK', monthly: '+$4.00', yearly: '+$48.00', type: 'in', category: 'ROI', note: 'Only 0.8% of original investment', },
  { id: 4, desc: 'RRSP Contribution', logo: LOGOS.CIBC, from: 'BANK', to: 'RRSP', monthly: '-$2,357.04', yearly: '-$28,284.48', type: 'out', category: 'RETIREMENT', note: '18% of income' },
  { id: 5, desc: 'Student Loan Payment', logo: null, from: 'BANK', to: 'LOAN', monthly: '-$1,526.25', yearly: '-$18,314.97', type: 'out', category: 'EDUCATION', note: '$80,000 total · 5.45% · 5yr' },
  { id: 6, desc: 'Apartment Rent', logo: null, from: 'BANK', to: 'LANDLORD', monthly: '-$825.00', yearly: '-$9,900.00', type: 'out', category: 'HOUSING', note: 'Split with 4 roommates' },
  { id: 7, desc: 'Health Insurance', logo: null, from: 'BANK', to: 'POLICY_ME', monthly: '-$150.00', yearly: '-$1,800.00', type: 'out', category: 'HEALTH', note: 'Policy Me' },
  { id: 8, desc: 'Groceries', logo: null, from: 'BANK', to: 'STORES', monthly: '-$425.00', yearly: '-$5,100.00', type: 'out', category: 'GROCERIES', note: 'Remitbee' },
  { id: 9, desc: 'Rogers 2 Gigabit Internet', logo: LOGOS.ROGERS, from: 'BANK', to: 'ROGERS', monthly: '-$95.00', yearly: '-$1,140.00', type: 'out', category: 'INTERNET', note: 'Rogers' },
  { id: 10, desc: 'Presto Card (Bus)', logo: LOGOS.PRESTO, from: 'BANK', to: 'PRESTO', monthly: '-$50.00', yearly: '-$600.00', type: 'out', category: 'TRANSPORT', note: 'Rarely used' },
  { id: 11, desc: 'iPhone 17', logo: LOGOS.APPLE, from: 'BANK', to: 'APPLE', monthly: '-$106.31', yearly: '-$1,275.77', type: 'out', category: 'PHONE', note: 'Total: $1,275.77' },
  { id: 12, desc: 'Rogers 60GB Plan', logo: LOGOS.ROGERS, from: 'BANK', to: 'ROGERS', monthly: '-$60.00', yearly: '-$720.00', type: 'out', category: 'PHONE_PLAN', note: 'Rogers' },
  { id: 13, desc: 'Buying The IPTV BOX', logo: null, from: 'BANK', to: 'GLOUMBIA', monthly: '-$225.99', yearly: '+$0.00', type: 'out', category: 'IPTV', note: 'One Time Payment' },
  { id: 13, desc: 'IPTV BOX', logo: null, from: 'BANK', to: 'GLOUMBIA', monthly: '-$10.00', yearly: '-$120.00', type: 'out', category: 'IPTV', note: 'Gloumbia Video' },
  { id: 14, desc: '3-Week Vegas Trip', logo: LOGOS.EXPEDIA, from: 'BANK', to: 'EXPEDIA', monthly: '-$53.09', yearly: '-$637.08', type: 'out', category: 'TRAVEL', note: 'Summer · 3 weeks' },
  { id: 15, desc: 'Fast Food', logo: null, from: 'BANK', to: 'RESTAURANTS', monthly: '-$60.00', yearly: '-$720.00', type: 'out', category: 'FOOD', note: 'Restaurants Canada avg' },
];

export default function FlowLedger() {
  const [expandedId, setExpandedId] = useState(0);

  return (
    <section id="flow" className="border-t-2 border-foreground">
      <div className="p-6 md:p-12 border-b-2 border-foreground">
        <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">
          SALARY
        </p>
        <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-[-0.05em] leading-[0.9]">
          FLOW
        </h2>
      </div>

      {}
      <div className="hidden md:grid grid-cols-12 border-b-2 border-foreground bg-foreground text-background px-6 py-3">
        <div className="col-span-3 text-[10px] font-mono tracking-wider">DESCRIPTION</div>
        <div className="col-span-2 text-[10px] font-mono tracking-wider">FLOW</div>
        <div className="col-span-2 text-[10px] font-mono tracking-wider">CATEGORY</div>
        <div className="col-span-2 text-[10px] font-mono tracking-wider text-right">MONTHLY</div>
        <div className="col-span-2 text-[10px] font-mono tracking-wider text-right">YEARLY</div>
        <div className="col-span-1"></div>
      </div>

      {FLOWS.map((tx) => (
        <div key={tx.id} className="border-b-2 border-foreground">
          <div
            className="grid grid-cols-1 md:grid-cols-12 px-6 py-4 cursor-pointer hover:bg-muted transition-colors items-center gap-y-1"
            onClick={() => setExpandedId(expandedId === tx.id ? null : tx.id)}
          >
            <div className="md:col-span-3 flex items-center gap-2">
              {tx.logo ? (
                <img src={tx.logo} alt="" className="w-4 h-4 object-contain" />
              ) : (
                <div className="w-4 h-4 border border-muted-foreground/40" />
              )}
              <span className="text-sm font-mono font-bold">{tx.desc}</span>
            </div>
            <div className="md:col-span-2 flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
              <span className="truncate max-w-[52px]">{tx.from}</span>
              {tx.type === 'in'
                ? <ArrowRight size={11} className="text-accent shrink-0" />
                : <ArrowLeft size={11} className="text-destructive shrink-0" />
              }
              <span className="truncate max-w-[52px]">{tx.to}</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-[10px] font-mono px-2 py-1 border border-foreground">
                {tx.category}
              </span>
            </div>
            <div className={`md:col-span-2 text-sm font-mono text-right ${tx.type === 'in' ? 'text-accent' : 'text-destructive'}`}>
              {tx.monthly}
            </div>
            <div className={`md:col-span-2 text-sm font-mono font-bold text-right ${tx.type === 'in' ? 'text-accent' : 'text-destructive'}`}>
              {tx.yearly}
            </div>
            <div className="md:col-span-1 flex justify-end">
              <ChevronDown
                size={14}
                className={`text-muted-foreground transition-transform ${expandedId === tx.id ? 'rotate-180' : ''}`}
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
                <div className="px-6 py-5 bg-muted border-t border-foreground">
                  {tx.category === 'GROCERIES' ? (
                    <>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-destructive/80 mb-1">Grocery Breakdown</p>
                            <p className="text-sm font-mono font-bold text-destructive">Groceries · BANK → STORES</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-mono text-muted-foreground">Monthly total</p>
                            <p className="text-sm font-mono font-bold text-destructive">{tx.monthly}</p>
                            <p className="text-[10px] font-mono text-muted-foreground">Yearly total</p>
                            <p className="text-sm font-mono font-bold text-destructive">{tx.yearly}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {GROCERY_ITEMS.map(item => (
                            <div key={item} className="rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2">
                              <p className="text-[11px] font-mono text-destructive">- {item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-1">NOTE</p>
                      <p className="text-sm font-mono">{tx.note}</p>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </section>
  );
}