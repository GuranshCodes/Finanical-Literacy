import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell,
} from 'recharts';


const INCOME_VS_EXPENSE = [
  { label: 'GROSS', value: 157184, color: 'hsl(136,100%,50%)' },
  { label: 'EXPENSES', value: 76497.33, color: 'hsl(0,0%,30%)' },
  { label: 'TAXES', value: 30790.03, color: 'hsl(14,100%,50%)' },
  { label: 'SAVINGS', value: 49896.64, color: 'hsl(136,100%,70%)' },
];


const EXPENSE_ALLOCATION = [
  { name: 'RRSP', value: 28284.48, color: 'hsl(136, 100%, 50%)' },
  { name: 'STUDENT LOAN', value: 16000.00, color: 'hsl(0, 0%, 20%)' },
  { name: 'RENT', value: 9900.00, color: 'hsl(0, 0%, 35%)' },
  { name: 'INVESTMENTS', value: 6000.00, color: 'hsl(220, 100%, 50%)' },
  { name: 'CREDIT', value: 3600.00, color: 'hsl(0, 0%, 40%)' },
  { name: 'GROCERIES', value: 5700.00, color: 'hsl(0, 0%, 60%)' },
  { name: 'PHONE', value: 1275.77, color: 'hsl(0, 0%, 78%)' },
  { name: 'INTERNET', value: 1140.00, color: 'hsl(0, 0%, 68%)' },
  { name: 'FOOD', value: 720.00, color: 'hsl(0, 0%, 70%)' },
  { name: 'TRANSPORT', value: 600.00, color: 'hsl(0, 0%, 75%)' },
  { name: 'TRAVEL', value: 637.08, color: 'hsl(0, 0%, 80%)' },
  { name: 'OTHER', value: 840.00, color: 'hsl(0, 0%, 88%)' },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-foreground text-background px-3 py-2 border-2 border-foreground">
      <p className="text-[11px] font-mono">
        {payload[0]?.payload?.label || payload[0]?.name}: ${Number(payload[0]?.value).toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
};

export default function MetricsPanel() {
  const savingsRate = ((49896.64 / 157184) * 100).toFixed(1);

  return (
    <section id="metrics" className="border-t-2 border-foreground">
      <div className="p-6 md:p-12 border-b-2 border-foreground">
        <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">
          SECTION 04 
        </p>
        <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-[-0.05em] leading-[0.9]">
          DASH<br />STATS
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 border-b-2 lg:border-r-2 border-foreground"
        >
          <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-6">
            Gross Income
          </p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INCOME_VS_EXPENSE} barGap={4}>
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: 'hsl(0,0%,40%)' }}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={0}>
                  {INCOME_VS_EXPENSE.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 border-b-2 border-foreground"
        >
          <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-4">
            Where the Income Goes
          </p>
          <div className="flex items-center gap-4">
            <div className="h-48 w-48 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={EXPENSE_ALLOCATION}
                    cx="50%"
                    cy="50%"
                    innerRadius={46}
                    outerRadius={76}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {EXPENSE_ALLOCATION.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 flex-1">
              {EXPENSE_ALLOCATION.map((a) => (
                <div key={a.name} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 shrink-0" style={{ backgroundColor: a.color }} />
                    <span className="text-[10px] font-mono">{a.name}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold">
                    ${a.value.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {[
          { label: 'SAVINGS_RATE', value: `${savingsRate}%` },
          { label: 'STUDENT_LOAN', value: '$80,000' },
          { label: 'TAX_RATE', value: '38.16%' },
          { label: 'RRSP_ANNUAL', value: '$28,284' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 border-b-2 border-r-2 border-foreground cell-pop"
          >
            <p className="text-[9px] font-mono text-muted-foreground tracking-wider mb-2">
              {stat.label}
            </p>
            <p className="font-heading font-black text-2xl md:text-3xl tracking-tight">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}