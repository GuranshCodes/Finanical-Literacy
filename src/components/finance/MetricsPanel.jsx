import React, { useEffect, useMemo, useRef, useState } from 'react';
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

// keep tooltip untyped to avoid TS inference noise in this repo
// (this file is .jsx, so avoid TS-only annotations)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
const CustomTooltip = (props) => {
  const { active, payload } = props;

  if (!active || !payload?.length) return null;
  return (
    <div className="bg-foreground text-background px-3 py-2 border-2 border-foreground">
      <p className="text-[11px] font-mono">
        {payload[0]?.payload?.label || payload[0]?.name}: ${Number(
          payload[0]?.value
        ).toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
};


export default function MetricsPanel() {
  const savingsRateNum = useMemo(() => (49896.64 / 157184) * 100, []);
  const savingsRate = savingsRateNum.toFixed(1);



  const [visible, setVisible] = useState(false);
  const visRef = useRef(null);

  useEffect(() => {
    const el = visRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="metrics" className="border-t border-foreground/30 pt-10">
      <div className="px-6 md:px-12 pb-6">
        <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">SECTION 04</p>
        <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-[-0.05em] leading-[0.9]">
          DASH
          <br />
          STATS
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Circular outer wrapper: keeps existing charts but applies new “pill ring” framing */}
        <div className="rounded-3xl border border-foreground/25 bg-foreground/5 backdrop-blur p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-accent/10 blur-2xl" aria-hidden />
          <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-6 wf-shimmer-stripe">
            Gross Income
          </p>
          <div className="h-56 wf-reveal wf-in">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INCOME_VS_EXPENSE} barGap={6}>
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fontFamily: 'JetBrains Mono',
                    fill: 'hsl(0,0%,40%)',
                  }}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={18}>
                  {INCOME_VS_EXPENSE.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {INCOME_VS_EXPENSE.map((x) => (
              <div
                key={x.label}
                className="flex items-center gap-2 rounded-full border border-foreground/15 bg-background/10 px-3 py-1"
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: x.color }} />
                <span className="text-[10px] font-mono">{x.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-foreground/25 bg-foreground/5 backdrop-blur p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -right-14 -top-10 w-44 h-44 rounded-full bg-foreground/10 blur-2xl" aria-hidden />
          <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-4 wf-shimmer-stripe">
            Where the Income Goes
          </p>

          <div className="relative">
            <div className="flex items-center gap-5">
              <div className="h-52 w-52 shrink-0 rounded-full border border-foreground/15 bg-background/10 p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={EXPENSE_ALLOCATION}
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={86}
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
                      <div className="relative">
                        <div className="w-2.5 h-2.5 shrink-0 rounded-full" style={{ backgroundColor: a.color }} />
                        <div
                          className="wf-node wf-nodePulse absolute -top-1 -left-1"
                          style={{ backgroundColor: a.color }}
                        />
                      </div>
                      <span className="text-[10px] font-mono">{a.name}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold">
                      ${a.value.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-foreground/20 pt-4 wf-diagram-rail">
            <p className="text-[10px] font-mono text-muted-foreground">
              Diagram insight: each slice represents how income is routed into expenses & savings.
            </p>
          </div>
        </div>
      </div>

      {/* Number-appear tiles (circular/pill redesign) */}
      <div ref={visRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-0">
        {[
          { label: 'SAVINGS_RATE', value: `${savingsRate}%`, delayMs: 0, accent: true },
          { label: 'STUDENT_LOAN', value: '$80,000', delayMs: 90, accent: false },
          { label: 'TAX_RATE', value: '38.16%', delayMs: 180, accent: false },
          { label: 'RRSP_ANNUAL', value: '$28,284', delayMs: 270, accent: true },
        ].map((stat, idx) => (
          <div
            key={stat.label}
            className={
              'relative p-5 md:p-6 rounded-full md:rounded-3xl border border-foreground/20 bg-foreground/5 overflow-hidden cell-pop ' +
              (stat.accent ? 'shadow-[0_0_0_1px_hsl(var(--accent)/.10)]' : '')
            }
          >
            <div
              className={
                'absolute -right-8 -top-10 w-24 h-24 rounded-full blur-2xl ' +
                (stat.accent ? 'bg-accent/20' : 'bg-foreground/10')
              }
              aria-hidden
              style={{ opacity: 0.55 + idx * 0.05 }}
            />

            <p className="relative text-[9px] font-mono text-muted-foreground tracking-wider mb-3">
              {stat.label}
            </p>
            <p
              style={{ animationDelay: `${stat.delayMs}ms` }}
              className={
                'relative font-heading font-black text-2xl md:text-3xl tracking-tight ' +
                (visible
                  ? 'wf-animate-countIn'
                  : 'opacity-70')
              }
            >
              <span className={stat.accent ? 'text-accent' : 'text-foreground'}>
                {stat.value}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

